<template>
    <div>

<v-layout class="mt-5">

<v-card width="100%">
    <v-card-title>
      All tags
      <v-spacer></v-spacer>
            <v-checkbox
            v-model="unvoted"
            label="Show only unvoted"
            dark
            color="amber darken-4"
            @change="checkbox"
            ></v-checkbox>

        <v-spacer></v-spacer>  
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        color="black"
      ></v-text-field>
    </v-card-title>
    <div  v-if="tags.length>0">

        <v-data-table
        :headers="headers"
        :items="tags"
        :search="search"
        class="elevation-1"
        :rows-per-page-items='[50,100,200,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
        v-bind:pagination.sync="pagination"
        >
        <template v-slot:items="props">
            <td>{{ props.item.tag }}</td>
            <td class="text-xs-centre" style="height:30px">{{ props.item.description }}</td>

                <td>
                    <v-layout justify-center>
                        {{props.item.upvotes}}

                        <v-icon
                            v-if="props.item.like"
                            small
                            class="ml-2 mr-2"
                            @click="unlike(props.item)"
                            color="black"
                        >
                            check
                        </v-icon>

                        <v-icon
                            v-else
                            small
                            class="ml-2 mr-2"
                            @click="like(props.item)"
                        >
                            check
                        </v-icon>
                        {{props.item.downvotes}}

                        <v-icon
                        v-if="props.item.dislike"
                            small
                            class="ml-2 mr-2"
                            @click="undislike(props.item)"
                            color="black"
                        >
                            clear
                        </v-icon>
                        <v-icon
                        v-else
                            class="ml-2 mr-2"
                            small
                            @click="dislike(props.item)"
                        >
                            clear
                        </v-icon>
                    </v-layout>
                    <v-layout>

                        <v-progress-linear v-if="props.item.upvotes!=0 || props.item.downvotes!=0" :value="(props.item.upvotes/(props.item.downvotes+props.item.upvotes))*100" height="4" color="#B29126"></v-progress-linear>
                        <v-progress-linear v-else value="50" height="4" color="#B29126"></v-progress-linear>
                    </v-layout>
                </td>

        </template>

      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>

        </v-data-table>
    </div>

  </v-card>

</v-layout>
<v-snackbar
        v-model="snackbar"
        timeout='2000'
        top
      >
      <v-container fluid text-xs-center class="ma-0 pa-0">
        <v-layout justify-center>
        Thank you for your suggestions!

        </v-layout>
      </v-container>
</v-snackbar>
{{all_tags}}
    </div>
</template>

<script>
// import { tags } from '@/data/search_items'
import axios from 'axios'
import { mapGetters } from 'vuex'

/**
 * @vuese
 * This component allows people to vote on existing tags. Documentation is similar `TagModerationAdd`, except that new tags cannot be added here.
 * @group moderation
 */
export default {
    data(){
        return {
            headers:[
                {text: 'Tag', value: 'tag', width: '10%'},
                {text: 'Description', value: 'description', width: '75%'},
                // {text: 'Upvotes', value: 'upvotes'},
                // {text: 'Downvotes', value: 'downvotes'},
                // {text: 'Score', value: 'score'},
                // {text: 'Vote', value: 'vote'},
                {text: 'Score', value: 'score', align:'center',width: '15%'},
            ],
            tags:[

            ],
            search:'',
            pagination: {
                rowsPerPage: 50,
                sortBy: 'score',
                descending: true,
            },
            tagRules: [
                v => !!v || 'Tag is required',
                v => (v && v.length >= 3) || 'Tag must be at least 3 characters',
                v => !v.includes(' ') || 'A tag cannot contain whitespace',
                v => !tags.data.includes(v) || 'This tag already exists',
            ],
            descRules: [
                v => !!v || 'Description is required',
                v => (v && v.length >= 20) || 'The description must be at least 20 characters'
            ],
            suggestedTag:'',
            suggestedDesc:'',
            snackbar:false,
            unvoted:true
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        validate () {

            if (this.$refs.form.validate()) {
                this.addTag()
            }
        },
        addTag(){
            this.tags.push({tag:this.suggestedTag, description:this.suggestedDesc,upvotes:1,downvotes:0,score:0, like:true})
            this.suggestedTag = ''
            this.suggestedDesc = ''
            this.$refs.description.blur()
            this.resetValidation()
            this.snackbar = true
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        like(item){
            let h = {headers:{Authorization : this.authenticationToken()}}
            const index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'like', true);
            if(this.tags[index].dislike){
                this.$set(this.tags[index], 'downvotes', this.tags[index].downvotes - 1);
            }
            this.$set(this.tags[index], 'dislike', false);
            this.$set(this.tags[index], 'upvotes', this.tags[index].upvotes + 1);
            this.$axios.$post('/api/tag/existing/'+item._id + '/reaction/up',{}, h)
            .then((res)=>{
            })
            .catch((err)=>{
                console.log(err)
            })

        },
        dislike(item){
            const index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'dislike', true);

            if(this.tags[index].like){
                this.$set(this.tags[index], 'upvotes', this.tags[index].upvotes - 1);
            }
            this.$set(this.tags[index], 'like', false);

            this.$set(this.tags[index], 'downvotes', this.tags[index].downvotes + 1);

            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/tag/existing/'+item._id + '/reaction/down',{}, h)
            .then((res)=>{
            })
            .catch((err)=>{
                console.log(err)
            })

        },
        unlike(item){
            const index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'like', false);
            this.$set(this.tags[index], 'upvotes', this.tags[index].upvotes - 1);

            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/tag/existing/'+item._id + '/reaction/up',{}, h)
            .then((res)=>{
            })
            .catch((err)=>{
                console.log(err)
            })

        },
        undislike(item){
            const index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'dislike', false);
            this.$set(this.tags[index], 'downvotes', this.tags[index].downvotes - 1);

            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/tag/existing/'+item._id + '/reaction/down',{}, h)
            .then((res)=>{
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        setFilteredTags(){
            this.tags_filtered = []
            for (let tag of this.tags_all){
                if(!tag.like && !tag.dislike){
                    this.tags_filtered.push(tag)
                }
            }
        },
        checkbox(){
            this.setFilteredTags()
            if(this.unvoted){
                this.tags = this.tags_filtered
            } else{
                this.tags = this.tags_all
            }
        },
    },
    mounted(){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/tag/existing/moderation', h)
            .then((res)=>{
                // this.tags = res.tags
                this.tags_all = res.tags
                this.setFilteredTags() 
                this.tags = this.tags_filtered
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}
</script>

<style scoped>

tr {
    height: 75px;    
}
</style>
