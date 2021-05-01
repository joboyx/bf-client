<template>
<div id='top'>
  <div ></div>
  <div :id="id" class="modal" v-bind:style="{display:displayStyle}" :ref="id">
    
    <span class="close cursor" @click="closeModal()">&times;</span>
    <div class="modal-content white--text child">
      


<div :style="{height:lb_height}" class="parent" style="width:100%">

            <v-btn   @click="next" absolute dark fab right large color="transparent" depressed :style="{top: '50%'}">
             <v-icon style="display: inline-flex !important;text-shadow: 0px 0px 5px rgba(0, 0, 0,0.3);">keyboard_arrow_right</v-icon>
            </v-btn>

            <v-btn  @click="previous" absolute dark fab large left color="transparent" depressed :style="{top: '50%'}">
             <v-icon  style="display: inline-flex !important;text-shadow: 0px 0px 5px rgba(0, 0, 0,0.3);" color="white">keyboard_arrow_left</v-icon>
            </v-btn>
<!-- v-on:doubletap="reaction(like)" -->
<v-touch v-on:swipeleft="next" v-on:swiperight="previous"    class="child" ref="swiper" 
v-bind:enabled="{ swipe: true, swipeup:false, rotate: false }"
>
  <v-carousel
  v-model="sliderValue"
  :cycle='false'
  height='100%'
     v-if="window[2]"
  hide-delimiters
  hide-controls
  touchless
  >
    
    <v-carousel-item
  reverse-transition="fade"
  transition="fade-transition"
     v-for="(item, index) in window"
     :key="index"
     class="child"
    >
        
        <v-img  v-if="item.type==='img' && item"  :src="item.url" contain height="100%" :id="item.url"></v-img>
        <v-img v-else-if="item.type==='gif'" :src="item.url" contain height="100%" :id="item.url"></v-img>
        <video v-else-if="item.type==='web_video'" width="100%" controls style="object-fit: contain;" height="100%" :ref="item.url" :id="item.url"  
        :src="item.url" autoplay :muted='!mute' playsinline
        > <source></video>
        <iframe v-if="item.type==='video'" :src="item.url" allow="autoplay" frameborder="0" :width="getWindowHeight()*1.647" height="100%" scrolling="no" allowfullscreen
        style="margin-left:auto; margin-right:auto; display:block" :id="item.url" name="video_iframe"
        ></iframe>
<!-- +'?autoplay=1' -->
        <!-- <iframe v-if="item.type==='video'" :src="item.url" frameborder="0" width="100%" height="100%" scrolling="no" allowfullscreen
        style="margin-left:auto; margin-right:auto; display:block" :id="item.url" class="hidden-md-and-up" autoplay
        ></iframe> -->

      </v-carousel-item>  
  </v-carousel>    
      </v-touch>

    <v-btn
    v-if="current_index===data.length-1 && !data_end"
      absolute
    dark
    fab
    bottom
    right
    color="transparent"
    flat
    class="mb-5"
    >
    <v-progress-circular
      indeterminate
      color="#B29126"
      fab
      bottom right
    ></v-progress-circular>

    </v-btn>

  </div> 

<!-- <iframe src="https://www.pornhub.com/embed/ph5d19bcb3c259a" frameborder="0" width="560" height="340" scrolling="no" allowfullscreen></iframe> -->


  
<TitleBar 
:autoPlayToggle='autoPlayToggle'
:current_resource='current_resource'
:loggedIn='loggedIn'
:betterfap="betterfap"
@openTagSuggestion='openTagSuggestion'
@toggleAutoPlay='toggleAutoPlay($event)'
@removeTag='removeTag($event)'
@vote_s_tag_up="(vote_s_tag($event,'up'))"
@vote_s_tag_down="(vote_s_tag($event,'down'))"
@openReport='openReport'
@reaction='reaction($event)'
ref='titlebar'
@missing_report='missing_report'
@setAutoPlayDuration='setAutoPlayDuration($event)'
:mute='mute'
@mute='toggleMute'
@closeTagger='closeTagger'
@suggestion_sent='tagSuggestionSent($event)'
@openTagger='openTagger'
@openFlickCreation='openFlickCreation'
@closeFlickCreation='closeFlickCreation'
></TitleBar>


  <!-- :resource='current_resource' -->
<Reporting
  :resource='current_resource'
  :open="report_dialog"
  :mode='night_mode'
  @close_report="closeReport"
  @close_report_button="closeReportButton"
  @send_report="send_report($event)"
  ref="report_dialog"
  >
</Reporting>

    </div>
  </div>

<v-snackbar
        v-model="suggestion_snackbar"
        timeout='2000'
        top
      >
      <v-container fluid text-xs-center class="ma-0 pa-0">
        <v-layout justify-center>
        Thank you for your suggestions!

        </v-layout>
      </v-container>
</v-snackbar>
<v-snackbar
        v-model="report_snackbar"
        timeout='2000'
        top
      >
      <v-container fluid text-xs-center class="ma-0 pa-0">
        <v-layout justify-center>
        Thank you for your feedback!

        </v-layout>
      </v-container>
</v-snackbar>

</div>

</template>

<script>

import { mapGetters } from 'vuex'
import axios from 'axios'
import { setInterval, setTimeout } from 'timers';
// import { tags } from '@/data/tags'
const Tagging = () => import('@/components/moderation/Tagging')
// import Tagging from '@/components/moderation/Tagging'
const Reporting = () => import('@/components/moderation/Reporting')
// import Reporting from '@/components/moderation/Reporting'
const TitleBar = () => import('@/components/content/TitleBar')
// import TitleBar from '@/components/content/TitleBar'
// import goTo from '@/node_modules/vuetify/lib/components/Vuetify/goTo'

// import { Slider, SliderItem } from 'vue-easy-slider'


/**
 * @vuese
 * The theatre player which views resources in detail and allows users to toggle between them. This is another major and complex component.
 * @group Content
 */
export default {
  components:{Tagging, Reporting,TitleBar},
  mounted(){
    const self = this
    document.onclick = function(event) {
      if(event.target.id ===self.id){
        self.closeModal()
      }

      }

    window.addEventListener('resize', function(){
      self.resize_window()
    },true)

    // console.log(this.$refs.swiper)
    // this.$refs.swiper.get('swipe').set({ enable: false })
    // this.$refs.swiper.disable('swipe')


  },
  props:['data', 'id', 'betterfap'],
  methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'isGuest', 'getUser']),
      // @vuese
      // Deprecated.
      openTitle(e){
        // // contole.log("Setting title")
        this.lb_height = this.resize_window()
        let self = this
        setTimeout(function(){
          // // contole.log("Closing title")
          self.lb_height = String(window.innerHeight) + 'px'
          //self.lb_height = '200px'
        },4000)
      },
      // @vuese
      // For debugging.
      log(){
        console.log("Log test")
      },
      // @vuese
      // Returns the window height, used for recalculations when the user resizes the screen.
      getWindowHeight(){
        return window.innerHeight - 65
      },
      // @vuese
      // Deprecated
      scrollDown(ev){
        // console.log("Trying to scroll down:" + ev)
        // ev.preventDefault()
        // ev.stopPropagation()
      },
      // @vuese
      // Go to next resource.
      next(){
        this.resetAutoPlay()
        if(this.current_index == (this.data.length - 1)){
          // Do nothing
        } else{
            this.pauseVideo(this.current_index)
            // Not last tile
            this.current_index += 1
            // This will change the title bar and other modules which make use of the current_resource property
            this.setCurrentResource()
            // Next we need to check that the next item that is preloaded is indeed the next item in data. This will not be
            // so if the we are currently at the last item, after which new data comes in. In this case.       
                        
            this.vw_index = (this.vw_index + 1)%this.window.length

            // If the current and next items on the list are wrong, load them properly again.
            let count = 0

            // Iterate over all values from the current window view to the last item of the window.
            for(let i = this.vw_index;i< this.vw_index + this.slide_value+1;i++){
              // Make sure that we only do this while we are below the last item of all data.
              if((this.data.length - 1) >= (this.current_index + count)){

                // If the id of this item in data does not equal 
                if(this.data[this.current_index+count]._id != this.window[i%this.window.length]._id){
                  this.setWindowElem(i%this.window.length, (this.current_index + count))
                  // Setting first resource if it was wrong
                  if(count == 0){
                    setTimeout(() => {
                        this.playVideo()
                      }, 0);
                  }

                }
              }
              count += 1
            }

              setTimeout(() => {
                  this.playVideo()
                }, 0);


          setTimeout(() => {document.getElementById(this.id).scrollTop = 0;}, 0);
          this.getMoreResources()
          this.sliderValue= (this.sliderValue + 1)%this.window.length
          this.sendSeen()
        }
      },
      // @vuese
      // Go to previous resource.
      previous(){

        this.resetAutoPlay()
        if(this.current_index == 0){
          // Do nothing
        } else{
              this.pauseVideo(this.current_index)
            // Not last tile
            this.current_index -= 1
            // This will change the title bar and other modules which make use of the current_resource property
            this.setCurrentResource()
            // Next we need to check that the next item that is preloaded is indeed the next item in data. This will not be
            // so if the we are currently at the last item, after which new data comes in. In this case.       
            
            
            this.vw_index = this.mod((this.vw_index - 1),this.window.length)

            // console.log("New VW index: " + this.vw_index)

            // If the current and next items on the list are wrong, load them properly again.
            let count = 0

            // Iterate over all values from the current window view to the last item of the window.
            // i: 2. this.vw_index:2. this.vw_index - slide_value = -1
            for(let i = this.vw_index;i> this.vw_index - this.slide_value - 1;i--){
              // Make sure that we only do this while we are below the last item of all data.
              if((this.current_index - count) >= 0){
                // If the id of this item in data does not equal 
                if(this.data[this.current_index-count]._id != this.window[this.mod(i,this.window.length)]._id){
                  this.setWindowElem(this.mod(i,this.window.length), (this.current_index - count))
                  // Setting first resource if it was wrong
                  if(count == 0){
                    setTimeout(() => {
                        this.playVideo()
                      }, 0);
                  }

                }
              }
              count += 1
            }

            // Now we need to change the visibilities
              setTimeout(() => {
                  this.playVideo()
                }, 0);

        
          setTimeout(() => {document.getElementById(this.id).scrollTop = 0;}, 0);
          this.sliderValue = this.mod(this.sliderValue - 1, this.window.length)
          this.sendSeen()

        }
      },
      // @vuese
      // Deprecated.
      slideChange(e){
        // console.log(e)
      },
      // @vuese
      // Preloads the first x resources to prevent buffering.
      setWindowElem(window_index, data_index){
            // this.window[window_index] = this.data[data_index]
            this.window.splice(window_index,1)
            this.window.splice(window_index,0,this.data[data_index])
            if(this.data[data_index].type === 'web_video'){
              setTimeout(()=>{
                // console.log(document.getElementById(this.data[data_index].url))
                // console.log("test")
                if(document.getElementById(this.data[data_index].url)){
                  document.getElementById(this.data[data_index].url).play()
                  document.getElementById(this.data[data_index].url).pause()
                }
              },0)
            }

      },
      // @vuese
      // Loads the very first resource.
      setFirstResource(index){
        // this.window[this.vw_index] = this.current_resource
        this.window.splice(this.vw_index,1)
        this.window.splice(this.vw_index,0,this.current_resource)

        // console.log(this.window[this.vw_index])
        this.playVideo()
        let count = 0
        for(let i= this.vw_index+1;i<this.window.length;i++){
          count += 1
          if((this.data.length - 1) >= (this.current_index + count)){
            this.setWindowElem(i, (this.current_index + count))
          }
        }

        count = 0

        for(let i= this.vw_index-1;i>=0;i--){
          count += 1
          if((this.current_index - count) >= 0){
            // console.log("Current index: " + this.current_index + ". Setting: " + (this.current_index - count))
            // console.log("Current index: " + (this.current_index + count))
            this.setWindowElem(i, (this.current_index - count))
          }
        }
        this.sendSeen()


        // console.log(count)


        // console.log(document.getElementById('b'))
        // document.getElementById('b').style.display = 'block'
      },
      // @vuese
      // Debugging.
      test(){
        let ifrm = document.getElementById('ph')
        // var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
        // console.log(doc)
      },
      // @vuese
      // Opens the Theatre. 
      openModal(index){
        if(this.getUser().tutorial['theater']){
          if(!this.$tours['theatre'].started){
            this.$tours['theatre'].start()
            this.$tours['theatre'].started = true
            // console.log(this.$tours['theatre'].started)
          }
        }

        this.test()


        this.sliderValue = 2
        this.vw_index = 2



        setTimeout(() => {document.getElementById(this.id).scrollTop = 0;}, 0);
        this.$router.push('#');
        this.$emit('open_modal')
        this.loggedIn = this.isLoggedIn() || this.isGuest()
        this.modalOpen = true
        //this.checkLoginAd()
        this.displayStyle = "block"
        this.current_index = index
        this.render()
        document.getElementById(this.id).style.display = "block";
        this.setCurrentResource()
        this.setFirstResource(index)
        this.startKeyboardListener()

        if(this.autoPlayToggle){
          this.autoPlayToggle = false
          this.toggleAutoPlay()
        }
        
      },
      // @vuese
      // Closes the theatre.
      
      closeModal(){
        this.$emit('close_modal')
        this.modalOpen = false
        this.displayStyle = "none"

        this.closeKeyboardListener();
        setTimeout(() => {document.getElementById(this.vw_index.toString()).style.visibility = 'hidden'}, 0);
        for(let i = 0; i<6;i++){
          this.window.pop()
        }
        
        for(let i = 0; i<5;i++){
          this.window.push(false)
        }
        // console.log(this.window)
        if(this.autoPlayToggle){
          window.clearInterval(this.autoFap)
        }

        this.sliderValue = 2
        
        this.closeKeyboardListener()

      },
      // @vuese
      // Plays a specific video.
      playVideo(){
        if(this.current_resource.type==='web_video'){
          setTimeout(() => {
            let self = this
            let vi = document.getElementById(this.current_resource.url)
            // if(document.getElementById(this.data[data_index].url)){
              document.getElementById(this.current_resource.url).play()
            // }
                  document.getElementById(this.current_resource.url).onended = function(e){
                  // console.log("Video has ended")
                  // console.log(self.autoPlayToggle)
                  if(self.autoPlayToggle){
                    self.next()
                  } else{
                    vi.play()
                  }
                }
          }, 0);
        } else if(this.current_resource.type==='video'){
          this.$set( this.current_resource, 'url', this.current_resource.url + '?autoplay=1' )
        }
      },
      // @vuese
      // Pauses a video.
      pauseVideo(index){
        if(this.current_resource.type==='web_video'){
          setTimeout(() => {
            document.getElementById(this.data[index].url).pause()
            }, 0);
        } else if(this.current_resource.type==='video'){
          setTimeout(() => {
          var iframe = document.getElementById(this.data[index].url)
          // this.$set(this.data[index], 'url', this.data[index].url + '?autoplay=1' )
          this.data[index].url = this.data[index].url.replace('?autoplay=1', '') 

          iframe.src = iframe.src
            }, 0);
        }
      },
      // @vuese
      // Sets the duration between resources when auto play is toggled.
      setAutoPlayDuration(duration){
        this.autoPlayDuration = duration
        this.resetAutoPlay()
      },
      // @vuese
      // Used when the user resizes the windo.
      resize_window(){
        let height = parseInt(window.innerHeight) - 65
        if(this.betterfap){
          height = parseInt(window.innerHeight)
        }
        let res = String(height) + 'px'
        this.lb_height = res
        return res
      },
      // @vuese
      // Open a dialog box to create a new list for the user.
      openFlickCreation(){
            this.closeKeyboardListener()
        if(this.autoPlayToggle){
          this.toggleAutoPlay()
        }
        this.$nextTick(()=>{
            this.closeKeyboardListener()
        })
      },
      // @vuese
      // Closes the new list creation dialog box.
      closeFlickCreation(){
        this.startKeyboardListener()
      },
      // @vuese
      // Deprecated? Opens the tag suggestion interface and shuts off the keyboard listener, allowing the user to type.
      openTagSuggestion(){
        // this.suggested_tags = []
        this.suggestion_dialog = true
        
        this.closeKeyboardListener()
      },
      // @vuese
      // Opens the tag suggestion interface and shuts off the keyboard listener, allowing the user to type.
      openTagger(){
        if(this.autoPlayToggle){
          this.toggleAutoPlay()
        }
        this.$nextTick(()=>{
        this.taggerOpen = true
        this.closeKeyboardListener()
          this.$refs.titlebar.toggleTagger()

        })
      },
      // @vuese
      // Closes the tagger.
      closeTagger(){
        setTimeout(()=>{
          this.startKeyboardListener()
          // this.taggerOpen = false
        })
      },
      // @vuese
      // Closes the tagger.
     closeTagSuggestion(){
        // this.suggestion_dialog = false
        this.startKeyboardListener()
      }, 
      // @vuese
      // Closes the tagging interface.
     closeTagSuggestionButton(){
        this.suggestion_dialog = false
        this.startKeyboardListener()
      },
      // @vuese
      // Sends tag suggestions to the server.
      tagSuggestionSent(x){
        if(this.isLoggedIn()){
            for(let i of x){
              this.$axios.$post('/api/moderate/' + this.current_resource._id + '/suggest/tag/'+i,null,{headers:{Authorization : this.authenticationToken()}})
              .then((res)=>{

              })
            .catch((err)=>{
              console.log(err)
            })
          }
        }

        this.suggestion_snackbar = true
        // this.closeTagSuggestion()
        this.suggestion_dialog = false


        let s_tags = []
        for(let s of this.data[this.current_index].s_tags){
          s_tags.push(s.tag)
        }


        for(let tag of x){
          if(!this.current_resource.tags.includes(tag) && !s_tags.includes(tag)){
            this.data[this.current_index].s_tags.push({'tag':tag,'score':1,'voters':0, 'upvote':true})
          }
        }

      },
      // @vuese
      // Open the resporting interface.
      openReport(){
        if(this.autoPlayToggle){
          this.toggleAutoPlay()
        }
        this.report_items = []
        this.report_dialog = true
        this.$refs.report_dialog.open_dialog()
        this.closeKeyboardListener()
      },
      // @vuese
      // Closes the reporting interface.
      closeReport(){
        // this.report_dialog = false
        this.startKeyboardListener()
      },
      // @vuese
      // Closes the reporting interface.
      closeReportButton(){
        this.report_dialog = false
        this.startKeyboardListener()
      },
      // @vuese
      // Called when the user downvotes/removes a suggested tag.
      removeTag(index){
        if(this.isLoggedIn){
          let bunny = this.data[this.current_index]
          let id = bunny._id
          let tag = bunny.tags[index]
          this.$axios.$post('/api/moderate/' + id + '/inappropriate/tag/'+tag, null, {headers:{Authorization : this.authenticationToken()}})
            .then((res)=>{
              // // contole.log(res)
            })
            .catch((err)=>{
              // contole.log(err)
            })
        }
        this.data[this.current_index].tags.splice(index,1)
        this.report_snackbar = true
      },
      // @vuese
      // Deprecated. Called when the user votes on a suggested tag.
      vote_tag(index, reaction){
        if(this.isLoggedIn){
          let bunny = this.data[this.current_index]
          let id = bunny._id
          let tag = bunny.suggested_tags[index].tag
          this.$axios.$post('/api/moderate/' + id + '/suggest/tag/'+tag + '/' + reaction, null, {headers:{Authorization : this.authenticationToken()}})
            .then((res)=>{
              // contole.log(res.success)
                // // contole.log(this.current_resource.suggested_tags[index])

              if(res.success==true){
                if(reaction === 'up'){
                  this.data[this.current_index].suggested_tags[index].score += 1
                } else if(reaction==='down'){
                  this.data[this.current_index].suggested_tags[index].score -= 1
                }
                this.setCurrentResource()
                // // contole.log(this.current_resource.suggested_tags[index].score)
              }
            })
            .catch((err)=>{
              // contole.log(err)
            })
        }
        this.suggestion_snackbar = true
      },
      // @vuese
      // Called when the user votes on a suggested tag.
      vote_s_tag(index, reaction){
        if(this.isLoggedIn){
          let bunny = this.data[this.current_index]
          let id = bunny._id
          let tag = bunny.s_tags[index].tag
              if(reaction === 'up' && bunny.s_tags[index].upvote){
                this.data[this.current_index].s_tags[index].score -= 1
                this.data[this.current_index].s_tags[index].upvote = false
              } else if(reaction === 'up' && bunny.s_tags[index].downvote){
                this.data[this.current_index].s_tags[index].score += 2
                this.data[this.current_index].s_tags[index].upvote = true
                this.data[this.current_index].s_tags[index].downvote = false
              } else if(reaction==='down' && bunny.s_tags[index].upvote){
                this.data[this.current_index].s_tags[index].score -= 2
                this.data[this.current_index].s_tags[index].upvote = false
                this.data[this.current_index].s_tags[index].downvote = true
              } else if(reaction==='down' && bunny.s_tags[index].downvote){
                this.data[this.current_index].s_tags[index].score += 1
                this.data[this.current_index].s_tags[index].downvote = false
              } else if(reaction === 'up'){
                this.data[this.current_index].s_tags[index].score += 1
                this.data[this.current_index].s_tags[index].upvote = true
              }else if(reaction === 'down'){
                this.data[this.current_index].s_tags[index].score -= 1
                this.data[this.current_index].s_tags[index].downvote = true
              }
              this.setCurrentResource()
          this.$axios.$post('/api/moderate/' + id + '/suggest/tag/'+tag + '/' + reaction, null, {headers:{Authorization : this.authenticationToken()}})
            .then((res)=>{
              // contole.log(res.success)
                // // contole.log(this.current_resource.s_tags[index])

              if(res.success==true){
                // // contole.log(this.current_resource.s_tags[index].score)
              }
            })
            .catch((err)=>{
              // contole.log(err)
            })
        }
        this.suggestion_snackbar = true
      },
      // @vuese
      // Deprecated.
      checkLoginAd(){
        if(!this.isLoggedIn()){
          this.$emit('signup')
        }
      },
      // @vuese
      // Deprecated.
      remove_tag(item){
          const index = this.suggested_tags.indexOf(item)
          if (index >= 0) this.suggested_tags.splice(index, 1)
      },
      // @vuese
      // Deprecated.
      suggest_tags(){
        /* Implement api call to suggest tags */
        if(this.isLoggedIn){
          let id = this.data[this.current_index]._id          
          for(let i=0;i<this.suggested_tags.length;i++){
            this.$axios.$post('/api/moderate/' + id + '/suggest/tag/'+this.suggested_tags[i],null,{headers:{Authorization : this.authenticationToken()}})
            .then((res)=>{
              // // contole.log(res)
            })
            .catch((err)=>{
              // contole.log(err)
            })
          }
        }
        this.suggestion_snackbar = true
        this.closeTagSuggestion()
      },
      // @vuese
      // Called when a resport is sent, so that the interface is closed.
      send_report(how){
        /* Implement api call to suggest tags */
        this.report_snackbar = true
        // this.report_dialog = false

        this.closeReport()
        if(how==='mouse'){
          this.report_dialog=false
        }
        // this.next()
      },
      // @vuese
      // Called when the user indicated that this resource is missing.
      missing_report(){
         let id = this.data[this.current_index]._id   
         this.$axios.$post('/api/moderate/' + id + '/inappropriate/missing', null, {headers:{Authorization : this.authenticationToken()}})
              .then((res)=>{
                  this.next()
              })
              .catch((err)=>{
                  // contole.log(err)
              })
        this.report_snackbar = true

        // this.send_report()
        //this.next()
      },
      // @vuese
      // To set the like/dislike before emitting, so that it is fast. This function can be safely removed.
      set_reaction(reaction){
        // // contole.log(reaction)
        if(reaction === 'like'){
          
          this.current_resource.like = true
          this.current_resource.dislike = false
          this.current_resource.favourite = false
          // // contole.log(this.current_resource)
        } else if(reaction === 'dislike'){
          this.data[this.current_index].like = false
          this.data[this.current_index].dislike = true
          this.data[this.current_index].favourite = false
        } else if(reaction === 'favourite'){
          this.data[this.current_index].like = false
          this.data[this.current_index].dislike = false
          this.data[this.current_index].favourite = true
        }
          // // contole.log(this.current_resource.like)

      },
      // @vuese
      // Sends a reaction of a resource to the server.
      reaction(reaction){
        if(!this.betterfap){

          // this.set_reaction(reaction)

        //This should be within the response ideally 
          this.$emit(reaction, this.current_index)
          // setTimeout(function(){
            
            this.setCurrentResource()
          this.render()
          this.$refs.titlebar.set_resource()
          // },0)

        if(this.isLoggedIn() || this.isGuest()){
          this.$axios.$post('/api/resource/single/' + this.data[this.current_index]._id + '/reaction/' + reaction, null, {headers:{Authorization : this.authenticationToken()}})
            .then((res)=>{
              if(res.success){
                }
            })
            .catch((error)=>{
              // contole.log(error)
                // contole.log("Reaction failed")
            })
        }
          if(reaction==='dislike' && this.$refs.titlebar.skipDisliked && this.autoPlayToggle){
            this.next()
          }
        }
      },
      // @vuese
      // Makes sure that the keyboard shortcuts are enabled.
      startKeyboardListener(){
          let self = this
          document.onkeyup = function(evt) {
            self.keyboard(evt)
          };

      },
      // @vuese
      // Closes keyboard input
      closeKeyboardListener(){
        document.onkeyup = null
      },
      // @vuese
      // Deprecated.
      videoLoader(){
        let image = this.data[parseInt(this.current_index)]
        let prev_image = this.data[parseInt(this.mySwiper.previousIndex)]
        if(image){
          let id = String(image.url + this.id + this.data.indexOf(image))
          let image_type = image.type
          if(image_type === 'web_video'){
          //// contole.log("-----------------------------------------------")
          let vi = document.getElementById(id)
          vi.play();
          let self = this
          let autoPlay = this.autoPlayToggle
          vi.onended = function(e){
        //   // contole.log(autoPlay)
            if(autoPlay){
              self.next()
            } else{
              vi.play();
              // contole.log("ATTEMPTING PLAY")
            }
          }
          //// contole.log("-----------------------------------------------")
          }


        }

        if(prev_image){
          let id = String(prev_image.url + this.id + this.data.indexOf(prev_image))
          let image_type = prev_image.type
          if(image_type === 'web_video'){
          //  // contole.log("-----------------------------------------------")
            let vi = document.getElementById(id)
            vi.pause();

          //  // contole.log("-----------------------------------------------")
          }
        }
      },
      // @vuese
      // Deprecated.
      videoPause(){
        let image = this.data[parseInt(this.current_index)]
        if(image){
          let id = String(image.url)
          let image_type = image.type
          if(image_type === 'web_video'){
          let vi = document.getElementById(id)
          // vi.muted = true
          // vi.pause();
          // vi.currentTime = 0;
          vi.pause();
          // vi.load();
          }


        }
      },
      // @vuese
      // Deprecated.
      checkVideoPlay(){
        if(this.modalOpen){
          let index = this.current_index
          if(this.data[index].type==='web_video'){
            // // contole.log("Video" + index)
            let vi = document.getElementById(String(this.data[index].url))
            vi.play()
          }
        }
      },
      // @vuese
      // Toggles the autoplay feature.
      toggleAutoPlay(duration){
        if(duration==null){
          duration = this.autoPlayDuration
        }
        this.autoPlayToggle=!this.autoPlayToggle
        // console.log(this.autoPlayToggle)
        this.$refs.titlebar.set_autoplay_toggle(this.autoPlayToggle)
        let self = this
        if(this.autoPlayToggle){
          // console.log("Toggling autoplay. Duration: " + duration)
          this.autoFap = window.setInterval(function(){
            if(self.current_resource.type != 'web_video' && self.current_resource.type != 'video'){
              self.next()
            }
          },duration*1000)
        } else{
          // console.log("Clearing autoplay")
          window.clearInterval(this.autoFap)
        }

      },
      // @vuese
      // Reset function for autoplay.
      resetAutoPlay(){
        // console.log("resetting autoplay")
        if(this.autoPlayToggle){
          // console.log("Autoplay is true")
           this.toggleAutoPlay(this.autoPlayDuration)
           this.toggleAutoPlay(this.autoPlayDuration)
         }
      },
      // @vuese
      // If the last resource is reached, ask for more data.
      getMoreResources(){
        if(this.modalOpen){

          let index = parseInt(this.current_index)
  
          if(index>=(parseInt(this.data.length)-3)){
            this.$emit('get_more_data')
            this.render()
          }
        }

      },
      // @vuese
      // Sends a seen event to the server.
      sendSeen(){
          if((this.isLoggedIn() || this.isGuest()) && this.modalOpen && !this.betterfap){
            this.$axios.$post('/api/resource/single/' + this.data[this.current_index]._id + '/reaction/see', null, {headers:{Authorization : this.authenticationToken()}})
              .then((res)=>{
                  if(res.success){
                    //// contole.log("Seen sent!: " + this.current_index)
                    this.$emit('seen', this.current_index)
                }
              })
              .catch((error)=>{
                  // contole.log(error)
              })
          }else if(this.modalOpen){
            this.$emit('seen', this.current_index)
          }
      },
      // @vuese
      // Quick helper function to make sure everything is displayed properly.
      render(){
        if(this.modalOpen){
          this.displayStyle = "inline-block"
          this.displayStyle = "block"
        }
      },
      // @vuese
      // Loads the data for the current resource.
      setCurrentResource(){
        if(this.modalOpen){
          this.current_resource =this.data[this.current_index]
        }
      },
      // @vuese
      // Parses keyboard input.
      keyboard(key){
        if(this.modalOpen){
          // console.log(key)
          key.preventDefault();
        }
        if((key.key==='Escape' || key.key==='q') && this.modalOpen){
          // console.log(this.suggestion_dialog + " " + this.report_dialog)
          if(!this.suggestion_dialog && !this.report_dialog){

            this.closeModal()
          } else if(this.report_dialog){
            this.report_dialog = false
          } 
          else if (this.suggestion_dialog){
            this.suggestion_dialog = false
          }
        }else if(this.modalOpen && (key.key==='ArrowDown' || key.key ==='s')){
          this.reaction('dislike')
        }else if(this.modalOpen && key.key==='ArrowUp' || key.key ==='w'){
          this.$nextTick(function(){
            this.reaction('like')
          })
        }else if(this.modalOpen && key.key==='Enter' || key.key ==='f'){
          if(this.report_dialog){
            this.report_dialog = false
          } else if(this.taggerOpen){
              this.taggerOpen = false
          } else{
            this.reaction('favourite')
          }
        } else if(this.modalOpen && (key.key==='a' || key.key==='ArrowLeft')){
            this.previous()
        } else if(this.modalOpen && (key.key==='d' || key.key==='ArrowRight')){
            this.next()
        } else if(this.modalOpen && key.key==='m'){
          if(!this.isGuest()){

            this.missing_report()
          } else{
            this.$bus.emit('signupPrompt')
            this.closeModal()
          }
            // this.next()
        } else if(this.modalOpen && key.key==='e'){
          // <v-switch v-model="autoPlayToggle" height="100%" dark label="Autofap" class="white--text d-flex" @change="toggleAutoPlay" color="amber">
          // this.autoPlayToggle = !this.autoPlayToggle
          this.toggleAutoPlay(this.autoPlayDuration)
        } else if(this.modalOpen && key.key==='t'){
          // this.openTagSuggestion()         
          // this.suggestion_dialog = true
          // this.closeKeyboardListener()
          if(!this.isGuest()){
            this.openTagger()
          } else{
            this.$bus.emit('signupPrompt')
            this.closeModal()

          }
        } else if(this.modalOpen && key.key==='r'){
          if(!this.isGuest()){

            if(!this.report_dialog){
                this.openReport()
            } else{
              this.report_dialog = false
              this.closeReport()
            }
          }else{
            this.$bus.emit('signupPrompt')
            this.closeModal()

          }
        } else if(this.modalOpen && key.key==='Shift'){

        }
      },
      // @vuese
      // Router helper function.
      route(r){
        this.$router.push(r)
      },
          get_lb_height(){
      // // contole.log("Windows height")
      // // contole.log(window.innerHeight)
      let height = parseInt(window.innerHeight) - 65
      let res = String(height) + 'px'
      return res
    },
      // @vuese
      // Modulo function.
    mod(n,m){
      return ((n % m) + m) % m;
    },
      // @vuese
      // Used to toggle the sound on and off; pushes the preference to the server.
    toggleMute(){
      let h = {headers:{Authorization : this.authenticationToken()}}
      this.mute = !this.mute
      if(this.mute){
          this.$axios.$post('/api/user/sound/on', {}, h)
            .then((res)=>{
              // console.log(res)
            })
            .catch((err)=>{
              console.log(err)
            })
      } else{
          this.$axios.$post('/api/user/sound/off', {}, h)
            .then((res)=>{
              // console.log(res)
            })
            .catch((err)=>{
              console.log(err)
            })
      }
    },
  },
  computed:{
    get_data(){
      if(this.data){

        return this.data
      } else{
        return {}
      }
    },
    get_show(){
      if(this.show_list[this.current_index] === 'show'){
        return true
      }else{
        return false
      }
    },

  },
  created(){
    
    this.data[0].url_lazy = this.data[0].url
    this.$router.push('#');

    let h = {headers:{Authorization : this.authenticationToken()}}

    this.$axios.$get('/api/user', h)
        .then((res)=>{
            if(res.success){
              // console.log(res.user.sound)
              if(res.user.sound === 'on'){
                this.mute = true
              } else{
                this.mute = false
              }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    
    let self = this
    this.$bus.$on('getting_more_data', function () { 
      // console.log("Getting more data ")
          self.data_end = false

      })

    this.$bus.$on('data_end', function () { 
        // console.log("Setting data_end to true")
        // this.data_end = true
      
      })

    this.$bus.$on('close_modal', function(){
      self.closeModal()
    })

  },
  watch:{
    $route (to, from){
        if(this.modalOpen){
          if(from.hash==="#"){
            this.closeModal()
            this.closeTagSuggestion()
          }
        }
    },
    data : function(){
      while(this.show_list.length<this.data.length){
        this.show_list.push('hide')
      }
    },
  },
  data(){
    return {
      // @vuese
      // Deprecated?
      show_list:[],
      // @vuese
      // The index of the resource being viewed.
      current_index: 0,
      // @vuese
      // The current resource data. Duplicate.
      current_resource : {favourite : false, like:false, dislike:false},
      // @vuese
      // Whether the user is logged in or not.
      loggedIn : this.isLoggedIn(),
      // @vuese
      // The current resource data.
      current_resource : this.data,
      // @vuese
      // Deprecated.
      items:[1,2,3,4,5, 7, 10, 12, 15, 20],
      // @vuese
      // The duration between resources in seconds if autoplay is toggled on.
      autoPlayDuration:4,
      // @vuese
      // Whether autoplay is enabled or not.
      autoPlayToggle:false,
      // @vuese
      // Debug message. Not used.
      autoPlayMsg: "off",
      // @vuese
      // Display style of the Theatre; if none it means the theatre is not visible.
      displayStyle : "none",
      // @vuese
      // Whether the theatre is open or not.
      modalOpen:false,
      // @vuese
      // Deprecated.
      test_tags:["one","two"],
      // @vuese
      // Deprecated.
      suggested_tags:[],
      // @vuese
      // Tagging interface.
      suggestion_dialog:false,
      // @vuese
      // Small popup dialog at the top of the screen.
      suggestion_snackbar:false,
      // @vuese
      // Reporting interface.
      report_dialog: false,
      // @vuese
      // Small popup dialog at the top of the screen when a report is sent.
      report_snackbar:false,
      // @vuese
      // Deprecated.
      report_items:[],
      // @vuese
      // The window height; used for manual resizing.
      lb_height:this.resize_window(),
      // @vuese
      // Deprecated.
      tag_input_value:'',
      // @vuese
      // Deprecated.
      night_mode:'dark',
      // @vuese
      // Deprecated.
      window_old:['a','b','c'],
      // @vuese
      // The resources to be preloaded when the theater opens. 
      window:[false,false,false,false,false],
      // @vuese
      // Deprecated.
      item_A:false,
      // @vuese
      // Deprecated.
      item_B:false,
      // @vuese
      // Deprecated.
      item_C:false,
      // @vuese
      // Deprecated.
      visible_window: '',
      // @vuese
      // The index in the `window` of the current resource; i.e., the resource is which is visible to the user. Generally this is the center resource, so that the resources around it can be pre-loaded.
      vw_index:2,
      // @vuese
      // The actual index of the current resource which is visible, in the `window`.
      slide_value:2,
      // @vuese
      // The side of `window`.
      window_size:5,
      // @vuese
      // Whether autoplay is enabled or not.
      autoFap:false,
      // @vuese
      // Whether the audio is muted or not.
      mute:null,
      // @vuese
      // The model variable used for the v-carousel to display the resources. 
      sliderValue: 2,
      // @vuese
      // Whether the tagging interface is open or not.
      taggerOpen:false,
      // @vuese
      // Whether the end of the resource list is reached. When true, more data can be fetched.
      data_end:true,
      // tags:tags.data,

  }
  }
}



</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.my-swiper{
  height: 200px;
}

.tags{
  margin: auto;
}

/* The Modal (background) */
.modal {
  display: none;
  position: fixed;
  z-index: 10;
  /*padding-top: 100px;*/
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: black;

}

/* Modal Content */
.modal-content {
  position: relative;
  /*background-color: #fefefe;*/
  background-color:black;
  margin: auto;
  padding: 0;
  width: 100%;
  /*max-width: 2400px;*/
}

/* The Close Button */
.close {
  color: white;
  position: absolute;
  top: 10px;
  right: 50px;
  font-size: 35px;
  font-weight: bold;
  z-index: 100;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}

/* Hide the slides by default */
.mySlides {
  display: none;
}

.v-input__slot .v-label{
color: white!important
}

.clickable{
  cursor: pointer;
}

.tag_link{
  text-decoration: none;
  color: inherit;
  /* color: white; */
}
.tag_link :hover{
  text-decoration: underline;
}

.parent{
  position:relative;
}
.child{
  position: absolute;
  width:100%;
  height:100%;
}

iframe[name="video_iframe"] {
  width: 100vw;
}

</style>
