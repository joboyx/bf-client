<template>
    <div>

    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    v-if="search_items"
  >
<v-layout justify-center>

    <v-flex xs12 sm4 class="ma-2">
        <v-text-field
        label="Tag"
        outline
          color="grey "
          v-model="suggestedTag"
        :rules="tagRules"
        required
        @keyup.enter="$refs.description.focus()"
        
        ></v-text-field>
    </v-flex>

    <v-flex xs12 sm6 class="ma-2">
        <v-text-field
        ref="description"
          outline
          name="input-7-4"
          label="Description of the tag. (e.g. 'The subject is wearing glasses.')"
          color="grey "
          v-model="suggestedDesc"
          :rules="descRules"
          required
        @keyup.enter="validate"

        ></v-text-field>
      </v-flex>

    <v-flex xs12 sm2 class="ma-2">
        <v-btn outline large @click="validate">
            Add tag
        </v-btn>
    </v-flex>



</v-layout>
    </v-form>

<v-layout>

<v-card width="100%" >
    <v-card-title>
      Suggested tags
      <v-spacer></v-spacer>
            <v-checkbox
            v-model="unvoted"
            label="Show only unvoted"
            dark
            color="#B29126"
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
        <v-data-table
        :headers="headers"
        :items="tags"
        :search="search"
        class="elevation-1"
        :rows-per-page-items='[50,100,200,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
        v-bind:pagination.sync="pagination"
        v-if="tags.length>0"
        
        >
        <template v-slot:items="props">
            <td>{{ props.item.tag }}</td>
            <td class="text-xs-centre" style="height:30px">{{ props.item.description }}</td>

                <td>
                    <v-layout justify-center align-center class="mt-1">
                        {{props.item.upvotes}}

                        <v-icon
                            v-if="props.item.like"
                            small
                            class="ml-2 mr-2"
                            @click="unlike(props.item)"
                            color="amber"
                        >
                            thumb_up
                        </v-icon>

                        <v-icon
                            v-else
                            small
                            class="ml-2 mr-2"
                            @click="like(props.item)"
                        >
                            thumb_up
                        </v-icon>
                        {{props.item.downvotes}}

                        <v-icon
                        v-if="props.item.dislike"
                            small
                            class="ml-2 mr-2"
                            @click="undislike(props.item)"
                            color="amber"
                        >
                            thumb_down
                        </v-icon>
                        <v-icon
                        v-else
                            class="ml-2 mr-2"
                            small
                            @click="dislike(props.item)"
                        >
                            thumb_down
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
    </div>
</template>

<script>
// import { search_items } from '@/data/search_items_sorted'
import axios from 'axios'
import { mapGetters } from 'vuex'

/**
 * @vuese
 * This component allows people to suggest new tags and vote on suggested tags.
 * @group moderation
 */
export default {
    data(){
        return { // @vuese
            // The table headers.
            headers:[
                {text: 'Tag', value: 'tag', width: '10%'},
                {text: 'Description', value: 'description', width: '75%'},
                // {text: 'Upvotes', value: 'upvotes'},
                // {text: 'Downvotes', value: 'downvotes'},
                // {text: 'Score', value: 'score'},
                // {text: 'Vote', value: 'vote'},
                {text: 'Score', value: 'score', align:'center',width: '15%'},
            ],// @vuese
            // List of all suggested tags.
            tags:[],// @vuese
            // The user search query string.
            search:'',// @vuese
            // Pagination details for the table.
            pagination: {
                rowsPerPage: 50,
                sortBy: 'score',
                descending: true,
            },// @vuese
            // Tag rules to determine which tags are acceptable. 
            tagRules: [
                v => !!v || 'Tag is required',
                v => (v && v.length >= 3) || 'Tag must be at least 3 characters',
                v => !v.includes(' ') || 'A tag cannot contain whitespace',
                v => !this.search_items.includes(v) || 'This tag already exists',
            ],// @vuese
            // Description requirements to determine which descriptions are valid.
            descRules: [
                v => !!v || 'Description is required',
                v => (v && v.length >= 20) || 'The description must be at least 20 characters'
            ],// @vuese
            // The suggested tag by the user.
            suggestedTag:'',// @vuese
            // The suggested description by the user.
            suggestedDesc:'',// @vuese
            // The pop notification at the top of the page when the user submits something.
            snackbar:false,// @vuese
            // List of all tags?
            tags_all : [],// @vuese
            // Filtered tags based on whether the user voted on them.
            tags_filtered : [],// @vuese
            // Whether the user wants to view all tags or just the unvoted ones.
            unvoted:true,// @vuese
            // List of searchable tags.
            search_items:[]

        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        // @vuese 
        // Called before submitting the form, to make sure the tag name and description follow the rules.
        validate () {

            if (this.$refs.form.validate()) {
                this.addTag()
            }
        },
        // @vuese 
        // Called when the user wants to add a tag.
        addTag(){
            // console.log("Successfully added tag")
            this.tags.push({tag:this.suggestedTag, description:this.suggestedDesc,upvotes:1,downvotes:0,score:1, like:true})
            let h = {headers:{Authorization : this.authenticationToken()}}

            this.$axios.$post('/api/tag/suggested/add',{tag:this.suggestedTag, description:this.suggestedDesc}, h)
            .then((res)=>{
            })
            .catch((err)=>{
                console.log(err)
            })

            this.suggestedTag = ''
            this.suggestedDesc = ''
            this.$refs.description.blur()
            this.resetValidation()
            this.snackbar = true
        },
        // @vuese 
        // Resets the form validation.
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        // @vuese 
        // Called when the user likes a suggested tag.
        like(item){
            let h = {headers:{Authorization : this.authenticationToken()}}
            const index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'like', true);
            if(this.tags[index].dislike){
                this.$set(this.tags[index], 'downvotes', this.tags[index].downvotes - 1);
            }
            this.$set(this.tags[index], 'dislike', false);
            this.$set(this.tags[index], 'upvotes', this.tags[index].upvotes + 1);
            this.$axios.$post('/api/tag/suggested/'+item._id + '/reaction/up',{}, h)
            .then((res)=>{
                // console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })

        },
        // @vuese 
        // Called when a user disliked a suggested tag.
        dislike(item){
            const index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'dislike', true);
            if(this.tags[index].like){
                this.$set(this.tags[index], 'upvotes', this.tags[index].upvotes - 1);
            }
            this.$set(this.tags[index], 'like', false);
            this.$set(this.tags[index], 'downvotes', this.tags[index].downvotes + 1);

            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/tag/suggested/'+item._id + '/reaction/down',{}, h)
            .then((res)=>{
            })
            .catch((err)=>{
                console.log(err)
            })

        },
        // @vuese 
        // Called when the user liked a suggested tag, but now removes that like.
        unlike(item){
            const index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'like', false);
            this.$set(this.tags[index], 'upvotes', this.tags[index].upvotes - 1);

            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/tag/suggested/'+item._id + '/reaction/up',{}, h)
            .then((res)=>{
                // console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })

        },
        // @vuese 
        // Called when the user disliked a suggested tag, but now removes that dislike.
        undislike(item){
            const index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'dislike', false);
            this.$set(this.tags[index], 'downvotes', this.tags[index].downvotes - 1);

            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/tag/suggested/'+item._id + '/reaction/down',{}, h)
            .then((res)=>{
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        // @vuese 
        // Go over all suggested tags to see if the user voted on them or not, in order to filter them.
        setFilteredTags(){
            this.tags_filtered = []
            for (let tag of this.tags_all){
                if(!tag.like && !tag.dislike){
                    this.tags_filtered.push(tag)
                }
            }
        },
        // @vuese 
        // If selected, only show filtered tags.
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

        this.$axios.$get('/api/tag/suggested', h)
            .then((res)=>{
                this.tags_all = res.data
                this.setFilteredTags() 
                this.tags = this.tags_filtered
            })
            .catch((err)=>{
                console.log(err)
            })


    },
    created(){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/tag/existing/clean', h)
            .then((res)=>{
                this.search_items = res.tags
                
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
