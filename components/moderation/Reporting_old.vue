<template>

    <div>

        
            <!-- width="auto" -->
        <v-dialog
            v-model="open"
            persistent
            @keydown.esc="close"
            @keydown.r="close"
            @keydown.enter="send_report('key')"
            @keydown.f="send_report('key')"
            max-width="800"
            @keydown="key($event)"
            @keydown.tab="next"
            id='diag'
            style="height:'441px'"
            scrollable
            
        >

        

        <v-card class="title font-weight-light">
            <v-card-title
            class="headline font-weight-medium"
            primary-title
            >
            What seems to be the issue?
            </v-card-title>
            <!-- <v-divider></v-divider> -->

            <v-card-text>

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
                </v-layout>

                <!-- <v-tabs v-model="tabs" slider-color="#B29126" centered color="transparent" fixed-tabs class="mb-4">
                    <v-tab @click="set_page('Orientation')">Orientation</v-tab>
                    <v-tab @click="set_page('Art')">Art</v-tab>
                    <v-tab @click="set_page('Type')">Type</v-tab>
                    <v-tab @click="set_page('MD')">Content</v-tab>
                    <!-- <v-tab nuxt to="/playground">Playground</v-tab> 
                </v-tabs> -->

        <v-layout row v-if="current_page==='Orientation'" wrap>
            <v-flex xs12>
            <p>
                The current orientation is: <span class="font-weight-bold">{{get_orientation_type}}</span>. You propose:
            </p>
            </v-flex>
            
            <v-flex xs12 justify-center>
            <p class="flex-center" style="width=100%">
                <v-radio-group v-model="orientation_suggestion" :mandatory="'false'" row class="large" value="orientation" :class="mode">
                    <v-radio label="Straight (1)" value="straight" color="black"></v-radio>
                    <v-radio label="Gay (2)" value="gay" color="black"></v-radio>
                    <v-radio label="Lesbian (3)" value="lesbian" color="black"></v-radio>
                    <v-radio label="Trans (4)" value="trans" color="black"></v-radio>
                    <v-radio label="Solo man (5)" value="solo-man" color="black"></v-radio>
                    <v-radio label="Solo woman (6)" value="solo-woman" color="black"></v-radio>
                </v-radio-group>
            </p>

            <p class="subheading font-weight-light">
                Tip: use the tab key to navigate the tabs. And use the number keys to assign values. Use the <span class="font-weight-bold">r</span> key to open and close this dialog. Hit <span class="font-weight-bold">f</span> to send the report. ;)
            </p>

            </v-flex>
        </v-layout>

        <v-layout row v-if="current_page==='Art'" wrap>
            <v-flex xs12>
            <p>
                The current art style is: <span class="font-weight-bold">{{get_art_type}}</span>. You propose:
            </p>
            </v-flex>
            
            <v-flex xs12 justify-center>
            <p class="flex-center" style="width=100%">
                <v-radio-group v-model="art_suggestion" row class="large" value="art" :mandatory="'false'" >
                    <v-radio label="Real-life (1)" value="real-life" color="black" key="5"></v-radio>
                    <v-radio label="Hentai (2)" value="comic" color="black" key="7"></v-radio>
                    <v-radio label="3D (3)" value="three-d" color="black" key="8"></v-radio>
                </v-radio-group>
            </p>


            </v-flex>
        </v-layout>

        <v-layout row v-if="current_page==='Type'" wrap>
            <v-flex xs12>
            <p>
                The current media type is: <span class="font-weight-bold">{{get_media_type}}</span>. You propose:
            </p>
            </v-flex>
            
            <v-flex xs12 justify-center>
            <p class="flex-center" style="width=100%">
                <v-radio-group v-model="media_suggestion" row class="large" value="type" :mandatory="'false'" >
                    <v-radio label="Image (1)" value="img" color="black"></v-radio>
                    <v-radio label="Gif (2)" value="gif" color="black"></v-radio>
                    <v-radio label="WebM (3)" value="web_video" color="black"></v-radio>
                    <v-radio label="Video (4)" value="video" color="black"></v-radio>
                    
                </v-radio-group>
            </p>

            </v-flex>
        </v-layout>

        <v-layout row v-if="current_page==='MD'" wrap>
            <v-flex xs12>
            <p>
                This item is:
            </p>
            </v-flex>
            
            <v-flex xs12 justify-center>
            <p class="flex-center" style="width=100%">
                <v-radio-group v-model="del" row class="large" value="md" :mandatory="'false'" >
                    <v-radio label="Missing (1)" value="missing" color="black" key="m"></v-radio>
                    <v-radio label="Duplicate (2)" value="duplicate" color="black" key="d"></v-radio>
                    <v-radio label="Not porn (3)" value="np" color="black" key="np"></v-radio>
                    <v-radio label="Nothing wrong here (4)" value="fine" color="black" key="n"></v-radio>
                </v-radio-group>
            </p>

            <p class="subheading font-weight-light">
                <span class="font-weight-bold">Warning:</span> Duplicate does not mean that the same item appeared in the feed multiple times. It means that
                the same image/video/gif exists under multiple names.  
            </p>

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
 * Deprecated. Used to be the old reporting modal.
 * @group moderation
 */
export default {
    props:['resource', 'open', 'mode'],
    data(){
        return {
            open:false,
            tabs:0,
            current_page:"Orientation",
            orientation_suggestion:'',
            art_suggestion: '',
            media_suggestion:'',
            del:'fine',
            media_types:['img', 'gif', 'web_video', 'video'],
            orientations:['straight', 'gay', 'lesbian', 'trans', 'solo-man', 'solo-woman'],
            art_styles:['real-life', 'comic', 'three-d'],
            pages:['Orientation', 'Art', 'Type', 'MD']
        }
    },
    methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        set_page(x){
            this.current_page = x
        },
        set_tab(index){
            let page = this.pages[index]
            this.set_page(page)
        },
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
        next(){
            this.tabs +=1
            if(this.tabs === 4){
                this.tabs = 0
            }
            this.set_tab(this.tabs)
        },
        close(){
            this.$emit('close_report')
            this.tabs=0
            // document.onkeydown = null

        },
        send_report(how){
            if(this.isLoggedIn){
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
                
            }
            this.$emit('send_report',how)
        },
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
                this.$nextTick(()=>{
                    this.del = 'fine'
                    this.current_page = 'Orientation'
                    this.current_page = 'Art'
                    this.current_page = 'Orientation'
                })
                // console.log("Dialog opened")

                this.tab_handler = function (event) {
                    if (event.keyCode === 9) {
                            // console.log("Tab intervention")
                            event.preventDefault();
                        return false;
                        }

                }
                document.addEventListener('keydown', this.tab_handler, false);
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
