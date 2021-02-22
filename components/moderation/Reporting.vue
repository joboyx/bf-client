<template>

    <div>

        
            <!-- width="auto" -->
            <!-- @keydown.tab="next" -->

        <v-dialog
            v-model="open"
            persistent
            @keydown.esc="close"
            @keydown.r="close"
            @keydown.enter="send_report('key')"
            @keydown.f="send_report('key')"
            max-width="800"
            @keydown="key($event)"
            id='diag'
            style="height:'441px'"
            scrollable
            @keydown.tab="next"
        >

        

        <v-card class="title font-weight-light">
            <v-card-title
            class="headline font-weight-light text-xs-center"
            primary-title
            >
            <v-layout justify-center>
            What seems to be the issue?
            </v-layout>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
<!-- 
                <v-layout justify-center class="text-xs-center title font-weight-light text-uppercase mb-3">
                    <v-flex xs3 @click="set_page('Orientation')" style="cursor:pointer">
                            <p>Orientation</p> 
                            <v-divider class="mt-2" color="black" v-if="current_page==='Orientation'"></v-divider> 
                    </v-flex>
                    
                    <v-flex xs3 @click="set_page('Art')" style="cursor:pointer">
                            <p>Art</p> 
                            <v-divider class="mt-2" color="black" v-if="current_page==='Art'"></v-divider> 
                    </v-flex>
                    <v-flex xs3 @click="set_page('Type')" style="cursor:pointer">
                            <p>Type</p> 
                            <v-divider class="mt-2" color="black" v-if="current_page==='Type'"></v-divider> 
                    </v-flex>
                    <v-flex xs3 @click="set_page('MD')" style="cursor:pointer">
                            <p>Content</p> 
                            <v-divider class="mt-2" color="black" v-if="current_page==='MD'"></v-divider> 
                    </v-flex>
                </v-layout> -->

                <!-- <v-tabs v-model="tabs" slider-color="#B29126" centered color="transparent" fixed-tabs class="mb-4">
                    <v-tab @click="set_page('Orientation')">Orientation</v-tab>
                    <v-tab @click="set_page('Art')">Art</v-tab>
                    <v-tab @click="set_page('Type')">Type</v-tab>
                    <v-tab @click="set_page('MD')">Content</v-tab>
                    <!-- <v-tab nuxt to="/playground">Playground</v-tab> 
                </v-tabs> -->

        <v-layout row wrap>   
            <v-flex xs12 sm6 md3 justify-center>
            <!-- <p class="flex-center" style="width=100%"> -->
                <p>Orientation</p>
                <v-radio-group v-model="orientation_suggestion" :mandatory="'false'" column class="large" value="orientation" :class="mode">
                    <v-radio v-if="current_page!='Orientation'" label="Straight" value="straight" color="black"></v-radio>
                    <v-radio v-else label="Straight (1)" value="straight" color="black"></v-radio>
                    <v-radio v-if="current_page!='Orientation'" label="Gay" value="gay" color="black"></v-radio>
                    <v-radio v-else label="Gay (2)" value="gay" color="black"></v-radio>
                    <v-radio v-if="current_page!='Orientation'" label="Lesbian" value="lesbian" color="black"></v-radio>
                    <v-radio v-else label="Lesbian (3)" value="lesbian" color="black"></v-radio>
                    <v-radio v-if="current_page!='Orientation'" label="Trans" value="trans" color="black"></v-radio>
                    <v-radio v-else label="Trans (4)" value="trans" color="black"></v-radio>
                    <v-radio v-if="current_page!='Orientation'" label="Solo man" value="solo-man" color="black"></v-radio>
                    <v-radio v-else label="Solo man (5)" value="solo-man" color="black"></v-radio>
                    <v-radio v-if="current_page!='Orientation'" label="Solo woman" value="solo-woman" color="black"></v-radio>
                    <v-radio v-else label="Solo woman (6)" value="solo-woman" color="black"></v-radio>
                </v-radio-group>
            <!-- </p> -->
            </v-flex>
            <v-flex xs12 sm6 md3 justify-center>
                <p>Art</p>
                <v-radio-group v-model="art_suggestion" column class="large" value="art" :mandatory="'false'" >
                    <v-radio v-if="current_page!='Art'" label="Real-life" value="real-life" color="black" key="5"></v-radio>
                    <v-radio v-else label="Real-life (1)" value="real-life" color="black" key="5"></v-radio>
                    <v-radio v-if="current_page!='Art'" label="Hentai" value="comic" color="black" key="7"></v-radio>
                    <v-radio v-else label="Hentai (2)" value="comic" color="black" key="7"></v-radio>
                    <v-radio v-if="current_page!='Art'" label="3D" value="three-d" color="black" key="8"></v-radio>
                    <v-radio v-else label="3D (3)" value="three-d" color="black" key="8"></v-radio>
                </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md3 justify-center>
                <p>Type</p>
                <v-radio-group v-model="media_suggestion" column class="large" value="type" :mandatory="'false'" >
                    <v-radio v-if="current_page!='Type'" label="Image" value="img" color="black"></v-radio>
                        <v-radio v-else label="Image (1)" value="img" color="black"></v-radio>
                    <v-radio v-if="current_page!='Type'" label="Gif" value="gif" color="black"></v-radio>
                        <v-radio v-else label="Gif (2)" value="gif" color="black"></v-radio>
                    <v-radio v-if="current_page!='Type'" label="WebM" value="web_video" color="black"></v-radio>
                        <v-radio v-else label="WebM (3)" value="web_video" color="black"></v-radio>
                    <v-radio v-if="current_page!='Type'" label="Video" value="video" color="black"></v-radio>
                        <v-radio v-else label="Video (4)" value="video" color="black"></v-radio>
                </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md3 justify-center>
                <p>Content</p>
                <v-radio-group v-model="del" column class="large" value="md" :mandatory="'false'" >
                    <v-radio v-if="current_page!='MD'" label="Missing" value="missing" color="black" key="m"></v-radio>
                        <v-radio v-else label="Missing (1)" value="missing" color="black" key="m"></v-radio>
                    <v-radio v-if="current_page!='MD'" label="Duplicate" value="duplicate" color="black" key="d"></v-radio>
                        <v-radio v-else label="Duplicate (2)" value="duplicate" color="black" key="d"></v-radio>
                    <v-radio v-if="current_page!='MD'" label="Not porn" value="np" color="black" key="np"></v-radio>
                        <v-radio v-else label="Not porn (3)" value="np" color="black" key="np"></v-radio>
                    <v-radio v-if="current_page!='MD'" label="Nothing wrong here" value="fine" color="black" key="n"></v-radio>
                        <v-radio v-else label="Nothing wrong here (4)" value="fine" color="black" key="n"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>


            </v-card-text>


            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                flat
                @click="$emit('close_report_button')"
                >
                Close
                </v-btn>
            <v-btn
                flat
                @click="send_report('mouse')"
            >
                Send report
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog> 
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
/**
 * @vuese
 * Reporting modal, which is available in the theatre. This component allows people to suggest changes to a current resource. This component has replaced `Reporting_old`. It imitates the `ModerationAdmin` in a way that everything is visible on a single page.
 * @group moderation
 */
export default {
    props:['resource', 'open', 'mode'],
    data(){
        return { // @vuese
            // Whether the modal is open or not.
            open:false, // @vuese
            // Which tab is currently selected, for the underscore.
            tabs:0, // @vuese
            // The which is currently loaded.
            current_page:"Orientation", // @vuese
            // What the user suggests the orientation should be.
            orientation_suggestion:'', // @vuese
            // What the user suggests the art type should be.
            art_suggestion: '', // @vuese
            // What the user suggest the media type should be.
            media_suggestion:'', // @vuese
            // Whether the user suggests the resource should be deleted.
            del:'fine', // @vuese
            // List of all media types.
            media_types:['img', 'gif', 'web_video', 'video'], // @vuese
            // List of orientations.
            orientations:['straight', 'gay', 'lesbian', 'trans', 'solo-man', 'solo-woman'], // @vuese
            // List of art styles.
            art_styles:['real-life', 'comic', 'three-d'], // @vuese
            // All the pages of the reporting modal.
            pages:['Orientation', 'Art', 'Type', 'MD']
        }
    },
    methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
      // @vuese
      // Called when the user selects a different tab/page.
        set_page(x){
            this.current_page = x
        },
      // @vuese
      // Called when the user scrolls the pages using the keyboard.
        set_tab(index){
            let page = this.pages[index]
            this.set_page(page)
            // console.log(this.current_page)
        },
      // @vuese
      // Used to detect keyboard input.
        key(input){
            let k = parseInt(input.key)

            // console.log(this.orientations.length)
            if(this.current_page==='Orientation'){
                if(k && k>0 && k <= this.orientations.length){
                    // console.log(this.orientations[k-1])
                    this.orientation_suggestion = this.orientations[k-1]
                }
            } else if(this.current_page==='Art'){
                if(k && k>0 && k <= this.art_styles.length){
                    // console.log(this.orientations[k-1])
                    this.art_suggestion = this.art_styles[k-1]
                }
            } else if(this.current_page==='Type'){
                if(k && k>0 && k <= this.media_types.length){
                    // console.log(this.orientations[k-1])
                    this.media_suggestion = this.media_types[k-1]
                }  
            } else if(this.current_page==='MD'){
                if(k===1){
                    this.del = 'missing'
                } else if(k===2){
                    this.del = 'duplicate'
                } else if(k==3){
                    this.del = 'np'
                } else if(k==4){
                    this.del = 'fine'
                } 
            } 
        },
      // @vuese
      // When the user wants to go to the next page.
        next(){
            this.tabs +=1
            if(this.tabs === 4){
                this.tabs = 0
            }
            this.set_tab(this.tabs)
        },
      // @vuese
      // Called when the user closes the reporting modal.
        close(){
            this.open = false
            // Sends a message to the theatre that the keyboard funcationly should be reverted to how the theathre wants it.
            this.$emit('close_report')
            this.tabs=0
            // document.removeEventListener('keydown', this.tab_handler, false);
            // document.onkeydown = null

        },
      // @vuese
      // Send the report to the server.
        send_report(how){
            if(this.isLoggedIn && this.open){
            let id = this.resource._id
                if(this.art_suggestion!=this.resource.art){
                    this.$axios.$post('/api/moderate/' + id + '/inappropriate/art/'+this.art_suggestion, null, {headers:{Authorization : this.authenticationToken()}})
                    .then((res)=>{
                        // console.log(res)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
                if(this.orientation_suggestion!=this.resource.orientation){
                    this.$axios.$post('/api/moderate/' + id + '/inappropriate/orientation/'+this.orientation_suggestion, null, {headers:{Authorization : this.authenticationToken()}})
                    .then((res)=>{
                        // console.log(res)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
                if(this.media_suggestion!=this.resource.type){
                    this.$axios.$post('/api/moderate/' + id + '/inappropriate/type/'+this.media_suggestion, null, {headers:{Authorization : this.authenticationToken()}})
                    .then((res)=>{
                        // console.log(res)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
                if(this.del!='fine'){
                    if(this.del=='np')
                    this.del='missing'
                    this.$axios.$post('/api/moderate/' + id + '/inappropriate/'+this.del, null, {headers:{Authorization : this.authenticationToken()}})
                    .then((res)=>{
                        // console.log(res)
                        this.mySwiper.slideNext()
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
            // Sends a message to the theathre that the user is done reporting, and that functionality can be reverted to how the theatre needs it.
            this.$emit('send_report',how)
            }
            this.open = false
        },
      // @vuese
      // Opens the reporting modal.
        open_dialog(){
            setTimeout(()=>{
                    this.orientation_suggestion = this.resource.orientation
                    this.art_suggestion = this.resource.art
                    this.media_suggestion = this.resource.type

                    this.del = 'fine'
                    this.current_page = 'Orientation'
                    // this.current_page = 'Art'
                    // this.current_page = 'Orientation'
                },0)
                // this.$nextTick(()=>{
                //     this.del = 'fine'
                //     this.current_page = 'Orientation'
                //     this.current_page = 'Art'
                //     this.current_page = 'Orientation'
                // })
                // console.log("Dialog opened")

                this.tab_handler = function (event) {
                    if (event.keyCode === 9) {
                            // console.log("Tab intervention")
                            event.preventDefault();
                        return false;
                        }

                }
                document.addEventListener('keydown', this.tab_handler, false);
        }
    },
    mounted(){
        this.orientation_suggestion = this.resource.orientation
        this.art_suggestion = this.resource.art
            this.media_suggestion = this.resource.type


        // console.log(this.orientation_suggestion)


    },
    watch:{
        resource:function(){
            this.art_suggestion = this.resource.art
            this.orientation_suggestion = this.resource.orientation
            this.media_suggestion = this.resource.type
            // this.art_suggestion = '.'
            // this.art_suggestion = 'real-life'

            // this.art_suggestion = ''
        },
        open:function(){
            if(this.open){
                // this.$nextTick(()=>{
                //     this.del = 'fine'
                //     this.current_page = 'Orientation'
                //     this.current_page = 'Art'
                //     this.current_page = 'Orientation'
                // })
                // // console.log("Dialog opened")

                // this.tab_handler = function (event) {
                //     if (event.keyCode === 9) {
                //             // console.log("Tab intervention")
                //             event.preventDefault();
                //         return false;
                //         }

                // }
                // document.addEventListener('keydown', this.tab_handler, false);
            } else{
                // console.log("Dialog closed")
                document.removeEventListener('keydown', this.tab_handler, false);
                
            }
        },
    },
    computed:{
        get_orientation_type(){
            let type = this.resource.orientation
            if(type==='straight'){
                return 'Straight'
            }else if(type==='gay'){
                return 'Gay'

            }else if(type==='lesbian'){
                return 'Lesbian'

            }else if(type==='trans'){
                return 'Trans'

            }
        },
        get_art_type(){
            let type = this.resource.art

            if(type==='real-life'){
                return 'Real-life'
            } else if(type==='comic'){
                return 'Hentai'
            }
        },
        get_media_type(){
            let type = this.resource.type
            if(type==='img'){
                return 'Image'

            }else if(type==='web_video'){
                return 'WebM'

            }
        }
    }
}
</script>

<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  }

.large .v-radio {
    padding: 10px;
  }
  
  .large i {
    font-size: 24px;
  }
  
  .light .large label {
    padding-left: 10px;
    font-size: 24px;
    color:black !important;

  }

.large label {
    padding-left: 10px;
    font-size: 24px;

  }

  .dark .large label {
    padding-left: 10px;
    font-size: 24px;
    color:white !important;

  }
  
  .large [class*="__ripple"] {
    left: 0;
  }

  .u {
       text-decoration: underline;
       width:100%;
  }

</style>
