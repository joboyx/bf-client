<template>
<div class="main">
    <FlixPlayer
    ref="fp"
    player_id="flix_player_id"
    @close_modal="close_modal"
    :resources="resources"
    ></FlixPlayer>
    
    <!--@open_modal="open_modal"-->
    <!--<FlixTabs></FlixTabs>-->
        <v-layout row wrap class="pa-0" >
            <v-flex xs12 class="text-xs-center font-weight-light display-1">
            <v-badge color="">
              <span class="text-xs-center">
                    {{title}}
              </span>
              <template v-slot:badge>
                <v-icon dark small bottom @click="edit_title=true" class="mt-3"> create</v-icon>
              </template>
            </v-badge>
            </v-flex>
            <v-flex xs12   class="ml-4">
                <v-btn icon nuxt to="/library/flicks/flicks"><v-icon>keyboard_return</v-icon></v-btn>
                <v-btn flat @click="open_modal" :disabled="loading_play" :loading="loading_play"> <v-icon left>play_arrow</v-icon>Play</v-btn>
                <v-btn flat v-bind="{outline: current_page=='list_view'}" @click="set_page('list_view')"> <v-icon left>list</v-icon>List view</v-btn>
                <v-btn flat v-bind="{outline: current_page=='editor'}" @click="set_page('editor')" id="editorStep-0"> <v-icon left>edit</v-icon>Edit mode</v-btn>
                <v-btn flat v-if="published" v-bind="{outline: current_page=='publish'}" @click="set_page('publish')"> <v-icon left>publish</v-icon>Update flick</v-btn>
                <v-btn flat v-else v-bind="{outline: current_page=='publish'}" @click="set_page('publish')" id="editorStep-3"> <v-icon left>publish</v-icon>Publish</v-btn>
                <v-btn flat v-if="published" v-bind="{outline: current_page=='publish'}" @click="delete_publication"> <v-icon left>delete_outline</v-icon>Unpublish</v-btn>
                <!--<v-btn flat> <v-icon left>videocam</v-icon>My flix</v-btn>-->
            </v-flex>
        </v-layout>
    <Media :title="title"
    :data_endpoint="get_endpoint()" 
    :data_endpoint_auth="get_endpoint()"
    :description="description"
    :tagline="tagline"
    :no_first_card="true"
    v-if="current_page=='list_view'"
    ></Media>
    
    
    <Editor
        :endpoint_unauth="get_endpoint()" 
        :endpoint_auth="get_endpoint()"
        ref="editor"
        @close_modal="close_modal"
        v-if="current_page=='editor'"
    >
    </Editor>

    <Publish v-if="current_page==='publish'" 
      >
      </Publish>
                          <v-dialog
      v-model="edit_title"
      width="500"
      persistent
      :flick_id='name'
      @published='published'
    >

      <v-card>
        <v-card-title
          class="headline"
        >
           Edit flick title
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="title"
            :counter="100"
            label="Flick title"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            :disabled='title.length<1'
            @click="edit_title = false;save_title()"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import Media from '@/components/content/Media'
import FlixTabs from '@/components/infrastructure/FlixTabs'
import FlixPlayer from '@/components/content/FlixPlayer'
import Editor from '@/components/content/Editor'
import Publish from '@/components/content/Publish'
import axios from 'axios'
import { mapGetters } from 'vuex'


export default {
    components:{Media, FlixTabs, Editor, FlixPlayer, Publish},
    data(){
        return{
            name:this.$route.params.flick,
            title:' ',
            description: 'Category',
            tagline: "\"" + this.$route.params.flick + "\"",
            category:[this.$route.params.flick],
            edit_title:false,
            resources:null,
            loading_play:false,
            current_page:'list_view',
            published:false
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        delete_publication(){
          let h = {headers:{Authorization : this.authenticationToken()}}
          this.$axios.$post('/api/flix/published/'+this.$route.params.flick + '/remove' ,{title:this.title},h)
            .then((res)=>{
              this.published = false
            })
            .catch((err)=>{
              console.log(err)
            })

          
        },
        save_title(){

       let h = {headers:{Authorization : this.authenticationToken()}}
        this.$axios.$post('/api/flix/unpublished/'+this.$route.params.flick + '/update_title',{title:this.title},h)
            .then((res)=>{

            })
                .catch((err)=>{

                })
        },

        set_page(page){
          this.current_page = page
        },
        published(){
          // console.log("Published")
          this.set_page('list_view')
        },

        open_modal(){
            this.loading_play = true
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";
            this.modal_closed = true
            

            if(this.resources===null){

           let h = {headers:{Authorization : this.authenticationToken()}}
            
           this.$axios.$post('/api/flix/edit/'+this.$route.params.flick, {}, h)
                .then((res)=>{
                    this.resources = res.data.resources
                    let self = this
                    setTimeout(() => self.$refs.fp.openModal(), 0);
                    this.loading_play = false
                })
                .catch((err)=>{
                    console.log(err)
                })

            }else{
                let self = this
                setTimeout(() => this.$refs.fp.openModal(), 0);
                this.loading_play = false

            }


        },
       close_modal(){
            document.documentElement.style.overflow = 'auto';
            document.body.scroll = "yes";
            this.modal_closed = false
           this.loading_play = false

        },
        get_endpoint(){
            if(this.isLoggedIn()){
                if(this.current_page=='editor'){
                  return '/api/flix/edit/'+this.$route.params.flick
                }else{
                  return '/api/flix/resources/'+this.$route.params.flick
                }
            }else{
                if(this.current_page=='editor'){
                  return '/api/flix/edit/'+this.$route.params.flick
                }else{
                  return '/api/flix/resources/'+this.$route.params.flick
                }
            }
            
        },
    },


    created(){
       let h = {headers:{Authorization : this.authenticationToken()}}
        
        this.$axios.$post('/api/flix/metadata/'+this.$route.params.flick,{},h)
            .then((res)=>{
                this.title = res.title
                if(res.published_title){
                  this.published = true
                }
            })
    }
}
</script>

<style scoped>

.main{
    overflow: hidden;
}
</style>
