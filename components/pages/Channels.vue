<template>
    <div>
        <BunnyLovePromo ref="blp"></BunnyLovePromo>
<v-layout class="mt-5">

<v-card width="100%" v-if="channels.length>0" class="pl-5 pr-5">
    <v-card-title>
      All channels
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
        :items="channels"
        :search="search"
        :rows-per-page-items='[50,100,200,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
        v-bind:pagination.sync="pagination"
        
        >
        <!-- class="elevation-1" -->
        <template v-slot:items="props">
            <td>
                <nuxt-link :to="'/channels/' + props.item.channel"  target="_blank" rel="noopener noreferrer"
                    style="color:inherit"
                >{{ props.item.channel }}</nuxt-link>

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
{{all_channels}}
    </div>
</template>

<script>
// import { channels } from '@/data/search_items'
import axios from 'axios'
import { mapGetters } from 'vuex'
import BunnyLovePromo from '@/components/modules/BunnyLovePromo'

/**
 * @vuese
 * The component shows all the available channels/subreddits. Users have the option to block specific channels as well - however, this requires a premium membership.
 * @group Pages
 */
export default {
    components:{ BunnyLovePromo},
    data(){
        return { // @vuese
            // The table headers.
            headers:[
                {text: 'channel', value: 'channel', width: '20%'},
                // {text: 'Upvotes', value: 'upvotes'},
                // {text: 'Downvotes', value: 'downvotes'},
                // {text: 'Score', value: 'score'},
                // {text: 'Vote', value: 'vote'},
                {text: 'Banned', value: 'block', align:'center',width: '20%'},
            ], // @vuese
            // List of all channels.
            channels:[

            ], // @vuese
            // Search string of the user for specific channels.
            search:'', // @vuese
            // Table pagination parameters.
            pagination: {
                rowsPerPage: 50,
                sortBy: 'star',
                descending: true,
            }, // @vuese
            // Not used.
            channelRules: [
                v => !!v || 'channel is required',
                v => (v && v.length >= 3) || 'channel must be at least 3 characters',
                v => !v.includes(' ') || 'A channel cannot contain whitespace',
                v => !channels.data.includes(v) || 'This channel already exists',
            ], // @vuese
            // Not used.
            descRules: [
                v => !!v || 'Description is required',
                v => (v && v.length >= 20) || 'The description must be at least 20 characters'
            ], // @vuese
            // Not used
            suggestedchannel:'', // @vuese
            // Not used.
            suggestedDesc:'', // @vuese
            // Not used.
            snackbar:false, // @vuese
            // Checks if the user data/channel data is loaded.
            user:false
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
         // @vuese
        // Not used.
        star(item){
            if(this.user.tier === 0 || this.user.tier === 1){
                this.blp()
            } else{
                let index = this.channels.indexOf(item)
                this.$set(this.channels[index], 'star', !this.channels[index].star)
                this.$set(this.channels[index], 'block', false)
              this.$axios.$post('/api/user/star_channel/' + item.channel, null, {headers:{Authorization : this.authenticationToken()}})
                .then((res)=>{
                    
                })
                .catch((err)=>{
                    console.log(err)
                })
            }

        },
         // @vuese
        // Shows the bunny love promotion if a non-premium member tries to ban channels.
        blp(){
            this.$refs.blp.open_dialog()
        },
         // @vuese
        // Bans a specific channel and sends this to the server.
        ban(item){
            if(this.user.tier === 0){
                this.blp()
            } else{

            let index = this.channels.indexOf(item)
            this.$set(this.channels[index], 'block', !this.channels[index].block)
            this.$axios.$post('/api/user/block_channel/' + item.channel, null, {headers:{Authorization : this.authenticationToken()}})
                .then((res)=>{
                    // console.log(res)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        }
    },
    mounted(){

        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/tag/channels-preferences', h)
            .then((res)=>{
                // console.log(res)
                this.channels = res.channels
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
