<template>
    <div>
        <BunnyLovePromo ref="blp"></BunnyLovePromo>
<v-layout class="mt-5">

<v-card width="100%" v-if="tags.length>0" class="pl-5 pr-5">
    <v-card-title>
      All tags
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        color="#B29126"
      ></v-text-field>
    </v-card-title>
        <v-data-table
        :headers="headers"
        :items="tags"
        :search="search"
        :rows-per-page-items='[50,100,200,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
        v-bind:pagination.sync="pagination"
        
        >
        <!-- class="elevation-1" -->
        <template v-slot:items="props">
            <td>
                <nuxt-link :to="'/tags/' + props.item.tag"  target="_blank" rel="noopener noreferrer"
                    style="color:inherit"
                >{{ props.item.tag }}</nuxt-link>

            </td>
            <td class="text-xs-centre" style="height:30px">{{ props.item.description }}</td>

                <td>
                    <v-layout justify-center>
                        <v-icon @click="star(props.item)" v-if="!props.item.star">star_outline</v-icon>
                        <v-icon @click="star(props.item)" v-else color="#B29126">star</v-icon>
                    </v-layout>
                </td>

                <td>
                    <v-layout justify-center>
                        <v-icon @click="ban(props.item)" v-if="!props.item.block">block</v-icon>
                        <v-icon @click="ban(props.item)" v-else color="black">block</v-icon>
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
{{all_tags}}
    </div>
</template>

<script>
// import { tags } from '@/data/search_items'
import axios from 'axios'
import { mapGetters } from 'vuex'
import BunnyLovePromo from '@/components/modules/BunnyLovePromo'

/**
 * @vuese
 * This component shows all the available tags, and allows users to star and block specific tags.
 * @group Pages
 */
export default {
    components:{ BunnyLovePromo},
    data(){
        return { // @vuese
            // Table hearders.
            headers:[
                {text: 'Tag', value: 'tag', width: '20%'},
                {text: 'Description', value: 'description', width: '60%'},
                // {text: 'Upvotes', value: 'upvotes'},
                // {text: 'Downvotes', value: 'downvotes'},
                // {text: 'Score', value: 'score'},
                // {text: 'Vote', value: 'vote'},
                {text: 'Starred', value: 'star', align:'center',width: '20%'},
                {text: 'Banned', value: 'block', align:'center',width: '20%'},
            ], // @vuese
            // List of all tags.
            tags:[

            ], // @vuese
            // Search string of the user.
            search:'', // @vuese
            // Table pagination parameters.
            pagination: {
                rowsPerPage: 50,
                sortBy: 'star',
                descending: true,
            }, // @vuese
            // Not used.
            tagRules: [
                v => !!v || 'Tag is required',
                v => (v && v.length >= 3) || 'Tag must be at least 3 characters',
                v => !v.includes(' ') || 'A tag cannot contain whitespace',
                v => !tags.data.includes(v) || 'This tag already exists',
            ], // @vuese
            // Not used.
            descRules: [
                v => !!v || 'Description is required',
                v => (v && v.length >= 20) || 'The description must be at least 20 characters'
            ], // @vuese
            // Not used.
            suggestedTag:'', // @vuese
            // Not used.
            suggestedDesc:'', // @vuese
            // Not used.
            snackbar:false, // @vuese
            // Determines if the user/tag data is loaded.
            user:false
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        // @vuese
        // Called when the user wants to star a tag (requires premium membership).
        star(item){
            if(this.user.tier === 0 || this.user.tier === 1){
                this.blp()
            } else{
                let index = this.tags.indexOf(item)
                this.$set(this.tags[index], 'star', !this.tags[index].star)
                this.$set(this.tags[index], 'block', false)
              this.$axios.$post('/api/user/star_tag/' + item.tag, null, {headers:{Authorization : this.authenticationToken()}})
                .then((res)=>{
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
            }

        },
        // @vuese
        // Shows the bunny love promotion if a non-premium member tries to star or ban tags.
        blp(){
            this.$refs.blp.open_dialog()
        },
        // @vuese
        // Bans a specific tag and sends this to the server (requires premium).
        ban(item){
            if(this.user.tier === 0){
                this.blp()
            } else{

            let index = this.tags.indexOf(item)
            this.$set(this.tags[index], 'block', !this.tags[index].block)
            this.$set(this.tags[index], 'star', false)
            this.$axios.$post('/api/user/block_tag/' + item.tag, null, {headers:{Authorization : this.authenticationToken()}})
                .then((res)=>{
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        }
    },
    mounted(){

        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/tag/existing', h)
            .then((res)=>{
                this.tags = res.tags
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    created(){
        let self = this
        this.$bus.on('user', function(arg){
            self.user = arg
        })

        this.$bus.emit('get_user')

    }
}
</script>

<style scoped>

tr {
    height: 75px;    
}
</style>
