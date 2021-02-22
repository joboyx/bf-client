<template>
    
    <div>
        <BunnyLovePromo ref="blp"></BunnyLovePromo>

        <LibraryTabs></LibraryTabs>
<!-- Remove v-if='false' -->
 <v-container  fluid class="pa-0 mt-3" v-if="true">
        <v-layout row wrap class="pa-0">
            <v-flex xs6 md4 lg3 class="ml-4">
                <v-btn color="" flat @click="create_new_flick()"> Create new list<v-icon right>playlist_add</v-icon></v-btn>
            </v-flex>
            <!-- <v-flex xs6 md6 lg3>
                <v-select solo :items="['First', 'Second', 'Third']" label="Sort by" color="white"></v-select>
            </v-flex> -->
        </v-layout>
        <!-- <FlickRow></FlickRow> -->
            <MediaFlix 
    :title="title" 
    :data_endpoint="data_endpoint" 
    :data_endpoint_auth="data_endpoint_auth" 
    :description="description" 
    :search="search"
    :tagline="tagline"
    ref='media_flix'
    ></MediaFlix>
</v-container>


<v-dialog
      v-model="create_flick_dialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline"
        >
          Create new List
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="new_flick_title"
            :counter="100"
            label="List title"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            :disabled='new_flick_title.length<1'
            @click="create_flick_dialog = false;new_flick()"
          >
            Create
          </v-btn>
          <v-btn
            flat
            @click="create_flick_dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-snackbar
      v-model="snackbar_add_flick_suc"
      top
      :timeout="1500"
    >
Successfully created new list
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
     <v-snackbar
      v-model="snackbar_add_flick_err"
      top
      :timeout="1500"
    >
Failed to create new list
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
     <v-snackbar
      v-model="max_flix"
      top
      :timeout="3000"
    >
You have reached the maximum number of lists.
      <v-btn
        color="error"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
     <v-snackbar
      v-model="snackbar_error"
      top
      :timeout="1500"
    >
Please try again in a few seconds.
      <v-btn
        color="error"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </div>
</template>
<script>

import FlickRow from '@/components/content/FlickRow'
import LibraryTabs from '@/components/infrastructure/LibraryTabs'
import { mapGetters } from 'vuex'
import MediaFlix from '@/components/content/MediaFlix'
import axios from 'axios'
import BunnyLovePromo from '@/components/modules/BunnyLovePromo'

export default {
components:{FlickRow, LibraryTabs, MediaFlix, BunnyLovePromo},
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        new_flick(){
            
          let h = {headers:{Authorization : this.authenticationToken()}}

            this.$axios.$post('/api/flix/create',{'title':this.new_flick_title}, h)
            .then((res)=>{
                if(res.success){
                    this.snackbar_add_flick_suc = true
                    this.flicks = res.flix
                    this.$refs.media_flix.get_data()
                    this.new_flick_title = 'My New List'
                    this.user.flix_count+=1
                }else{
                    this.snackbar_add_flick_err = true
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        create_new_flick(){
          // console.log(this.user.tier)
          // console.log(this.user.flix_count)
            if((this.user.tier === 0 || this.user.tier === 1) && this.user.flix_count === 5){
              this.blp()
            } else if(this.user.tier > 1 && this.user.flix_count === 20 ){
              this.max_flix = true
            } else{
              this.create_flick_dialog=true
            }
        },
        blp(){
            this.$refs.blp.open_dialog()
        },
    },
    data(){
        return{
                title:'library',
                description:"My favourites",
                tagline:"This made it happen for you",
                search:true,
                data_endpoint:'/api/flix/unpublished',
                data_endpoint_auth:'/api/flix/unpublished',
                create_flick_dialog:false,
                new_flick_title:'My New List',
                snackbar_add_flick_suc:false,
                snackbar_add_flick_err:false,
                snackbar_error:false,
                user:false,
                max_flix:false,
        }
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

</style>
