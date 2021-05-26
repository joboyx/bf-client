<template>
<div id='top'>
  <div :id="player_id"  class="modal" v-bind:style="{display:displayStyle}" ref="model_id" >


    <span class="close cursor" @click="closeModal()">&times;</span>
    <div class="modal-content white--text child">
      


<div  class="parent" style="width:100%;height:100%;">

            <v-btn @click="next('resource_'+sliderValue)" absolute dark fab right large color="transparent" depressed :style="{top: '50%'}">
             <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>

            <v-btn @click="previous" absolute dark fab large left color="transparent" depressed :style="{top: '50%'}">
             <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
<!-- v-on:doubletap="reaction(like)" -->
<v-touch v-on:swipeleft="next('resource_'+sliderValue)" v-on:swiperight="previous"    class="child" ref="swiper" 
v-bind:enabled="{ swipe: true, swipeup:false, rotate: false }"
>
    <v-bottom-nav
        v-if="resources"
        :value="controls_menu"
        absolute
        dark
        color="transparent"
        style="z-index:100; opacity:1.0; box-shadow:none"
        flat
        shift
        :active.sync="bottomNav"
      >

        <!-- <v-btn flat value='play' v-if="!autoPlayToggle" @click="sliderChange(sliderValue)"><span>Play</span><v-icon>play_circle_outline</v-icon></v-btn> -->
        <!-- <v-btn flat value='pause' v-else @click="autoPlayToggle=!autoPlayToggle"><span>Pause</span><v-icon>pause_circle_outline</v-icon></v-btn> -->
        
      <v-layout class="ml-2 mr-2" align-center>
        <v-card
          color="transparent"
          flat
        >
        <v-icon flat large value='play' v-if="!autoPlayToggle" @click="sliderChange(sliderValue)">play_circle_outline</v-icon>
        <v-icon flat large value='pause' v-else @click="autoPlayToggle=!autoPlayToggle">pause_circle_outline</v-icon>
        </v-card>

        <v-card
          color="transparent"
          flat
        >
        <v-icon flat large @click="mute=!mute" v-if="!mute">volume_off</v-icon>
        <v-icon flat large @click="mute=!mute" v-else>volume_up</v-icon>
        </v-card>
        
        <v-slider
          v-model="sliderValue"
          always-dirty
          :thumb-size="24"
          :thumb-label="controls_menu"
            color="#B29126"
            :max="resources.length"
            @change="sliderChange"
            class="mr-2 ml-2"
        ></v-slider>
        <!-- <span class="font-weight-light caption"> {{resources.length}}</span>  -->
        <v-subheader>{{resources.length}}</v-subheader>
      </v-layout>

      </v-bottom-nav>
  <v-carousel
  v-model="sliderValue"
  :cycle='false'
  height='100%'
hide-delimiters
hide-controls
touchless

  >
  <!-- 
  -->
    <v-carousel-item
  reverse-transition="fade"
  transition="fade"
     v-for="(item, index) in resources"
     :key="index"
     class="child"
     
    >
    <template v-if="modalOpen && index<(sliderValue+window_size+1)">
        
        <v-img  v-if="item.type==='img' && item"  :src="item.url" contain height="100%" :id="'resource_'+index"></v-img>
        <v-img v-else-if="item.type==='gif'" :src="item.url" contain height="100%" :id="'resource_'+index"></v-img>
        <video v-else-if="item.type==='web_video'" width="100%" style="object-fit: contain;" height="100%" :ref="item.url" :id="'resource_'+index"  
        :src="item.url"   preload="auto" :muted='!mute'
        playsinline
        > <source></video>
        <!-- autoplay -->
        <!-- :muted='!mute'-->
        <!-- <iframe v-if="item.type==='video'" :src="item.url" allow="autoplay" frameborder="0" :width="getWindowHeight()*1.647" height="100%" scrolling="no" allowfullscreen
        style="margin-left:auto; margin-right:auto; display:block" :id="'resource_'+index" class="hidden-sm-and-down"
        ></iframe>

         +'?autoplay=1' --> 
         <iframe v-if="item.type==='video'" :src="item.url" frameborder="0" width="100%" height="100%" scrolling="no" allowfullscreen
        style="margin-left:auto; margin-right:auto; display:block" :id="'resource_'+index" class="hidden-md-and-up" autoplay
        ></iframe>


    </template>
      </v-carousel-item>  
  </v-carousel>    
      </v-touch>

      <!--
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
      -->

  </div> 


    </div>
  </div>


</div>

</template>

<script>

import { mapGetters } from 'vuex'
import { setInterval, setTimeout } from 'timers';

/**
 * @vuese
 * The FlixPlayer. Once a user publishes a list, and turns it into a flick, this component is used to play the list of resources like a movie.
 * @group Content
 */
export default {
  components:{},
  mounted(){
    const self = this


    window.addEventListener('resize', function(){
      self.resize_window()
    },true)


  },
  props:['player_id', 'resources'],
  methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
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
        // Returns the window height, used for recalculations when the user resizes the screen.
      getWindowHeight(){
        return window.innerHeight - 65
      },
        // @vuese
        // For debugging.
      log(){
        // console.log("Log test")
      },
        // @vuese
        // Duplicate,
      getWindowHeight(){
        return window.innerHeight - 65
      },
      
        // @vuese
        // Called when the slide/resource changes.
      sliderChange(s){
        // if(!this.autoPlayToggle)
          this.autoPlayToggle = true
        if(this.resources[this.sliderValue].set){

          if(this.resources[this.sliderValue].type==='web_video'){
            let elem = document.getElementById('resource_' + this.sliderValue)
            setTimeout(() => elem.play(), 0);
            
        }
        }else{
          setTimeout(() => this.setFirstResource(0), 0);
        }
      },
        // @vuese
        // Loads the first set of resources, so that when the next resource is supposed to be played, it doesn't have to buffer. This function is called at the beginning.
      setWindowElements(start=1){
          let self = this
          for(let i= this.sliderValue+start; i<this.sliderValue+this.window_size && i< this.resources.length; i++){

              if(this.resources[i].type === 'web_video' && !this.resources[i].set){

                  let elem = document.getElementById('resource_' + i)
                  if(i != this.sliderValue){
                    elem.currentTime = self.resources[i].start
                    elem.pause()
                  } else{
                    elem.play()
                  }
                  if(this.resources[i].start != -1){
                    elem.currentTime = this.resources[i].start
                  } else{
                    elem.currentTime = 0.1
                  }

                    if(this.resources[i].end == -1){
                      
                      document.getElementById('resource_' + i).addEventListener('ended',
                      ()=>{
                        elem.pause()
                        self.next('resource_'+i);
                        elem.currentTime = self.resources[i].start
                      },false);
                    } else{
                      elem.ontimeupdate = function(){                    
                          if(elem.currentTime >= self.resources[i].end) {
                            elem.pause();
                              self.next('resource_'+i);
                              elem.currentTime = self.resources[i].start
                          }
                      }
                    }

                  this.resources[i].set = true
              }else{
                  
              }
              
          }



      },
        // @vuese
        // Sets the very first resource in the flick.
      setFirstResource(index){
          // this.setWindowElements(0)
          this.setWindowElements(0)

          let self = this
          if(this.resources[this.sliderValue].type!='web_video'){
              setTimeout(()=>self.next('resource_'+this.sliderValue),self.resources[self.sliderValue].duration*1000 - 150)
          }

      },
        // @vuese
        // Called when the user wants to view the previous resource.
      previous(){
          if(this.sliderValue != 0){

              this.sliderValue--;
              if(this.resources[this.sliderValue+1].type==='web_video'){
                document.getElementById('resource_'+(this.sliderValue+1)).pause()
              }
          }
          if(this.resources[this.sliderValue].type==='web_video'){
              document.getElementById('resource_'+this.sliderValue).play()
          }

          this.autoPlayToggle = false
      },
        // @vuese
        // Called when the flick progresses to the next slide.
      next(slide){

          if(this.modalOpen){

              // console.log(slide)
              let self = this
              if(this.autoPlayToggle){

                  if(('resource_' + this.sliderValue === slide ) && (this.sliderValue+1)<this.resources.length){
                          //document.getElementById('resource_'+(this.sliderValue+1)).currentTime = this.resources[this.sliderValue+1].start
                      if(this.resources[this.sliderValue+1].type==='web_video'){
                          document.getElementById('resource_'+(this.sliderValue+1)).play()
                      }


                      this.sliderValue=this.sliderValue + 1;


                      if(this.resources[this.sliderValue].type==='web_video'){
                          document.getElementById('resource_'+this.sliderValue).play()
                      }else{
                          let tmp = this.sliderValue
                          setTimeout(()=>self.next('resource_'+tmp),self.resources[tmp].duration*1000 - 0)
                      }



                      if(this.resources[this.sliderValue-1].type==='web_video'){
                        document.getElementById('resource_'+(this.sliderValue - 1)).pause()
                      }
                      




                  }else if((this.sliderValue+1) >=  this.resources.length){
                      this.closeModal()
                  }
                  
              }else if(this.resources[this.sliderValue].type==='web_video'){
                          setTimeout(()=>{document.getElementById('resource_'+this.sliderValue).play()},)

                  
              }


              this.setWindowElements()

          }

      },
        // @vuese
        // Called when the FlixPlayer opens.
      
      openModal(index){
        if(!index){
          index = 0
        }
        for (let item of this.resources){
          item.set = false
        }

          if(index){
              this.sliderValue = index
          }else{

              this.sliderValue = 0
          }
        this.$router.push('#');

        this.loggedIn = this.isLoggedIn()
        this.modalOpen = true
        //this.checkLoginAd()
        this.displayStyle = "block"
        this.render()
        document.getElementById(this.player_id).style.display = "block";
        setTimeout(() => this.setFirstResource(index), 0);
        //this.setFirstResource(index)
        
          let self = this
          document.onkeyup = function(evt) {
            self.keyboard(evt)
          };
      },
        // @vuese
        // Called when the FlixPlayer closes.
      
      closeModal(){
        this.$emit('close_modal')
        this.modalOpen = false
        this.displayStyle = "none"

          if(this.resources[this.sliderValue].type==='web_video'){
              document.getElementById('resource_'+this.sliderValue).pause()
          }
        document.onkeyup = null
        //setTimeout(() => {document.getElementById(this.vw_index.toString()).style.visibility = 'hidden'}, 0);

      },
        // @vuese
        // Used for when the user resizes the screen.
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
        // Quick helper function to make sure everything is displayed properly.
      render(){
        if(this.modalOpen){
          this.displayStyle = "inline-block"
          this.displayStyle = "block"
        }
      },
        // @vuese
        // Sets the keyboard input; so that the arrow keys and other keyboard shortcuts can be used.
      keyboard(key){
        if(this.modalOpen){
          // console.log(key)
          key.preventDefault();
        }
        if((key.key==='Escape' || key.key==='q') && this.modalOpen){
            this.closeModal()
          // console.log(this.suggestion_dialog + " " + this.report_dialog)
        }else if(this.modalOpen && (key.key==='a' || key.key==='ArrowLeft')){
            this.previous()
        } else if(this.modalOpen && (key.key==='d' || key.key==='ArrowRight')){
            this.autoPlayToggle = true
            this.next('resource_'+this.sliderValue)
        }
      },
        // @vuese
        // Pushes to a different route

      route(r){
        this.$router.push(r)
      },
          get_lb_height(){
      let height = parseInt(window.innerHeight) - 65
      let res = String(height) + 'px'
      return res
    },
        // @vuese
        // Returns the mod of `n`,`m`
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
        // @vuese
        // When the mouse stops moving, remove the menu bar at the bottom of the screen.
    mouseStopped(){
      this.controls_menu = false
    },
        // @vuese
        // When the mouse hovers, show the menu at the bottom of the screen, so that the user can pause, play, and navigate the flick.
    mouseHover(){
      if(this.modalOpen){
          this.controls_menu = true
          // console.log("Mouse moving")
            window.clearTimeout(this.timer);
            this.timer=window.setTimeout(()=>{this.mouseStopped()},2000);
        }
    }
  },
  created(){
    this.$router.push('#');
    // let self = this
    window.addEventListener("mousemove",this.mouseHover);
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
  },
  watch:{
    $route (to, from){
        if(this.modalOpen){
          if(from.hash==="#"){
            this.closeModal()
          }
        }
    },
  },
  mounted(){

  },
  data(){
    return {
      // @vuese
      // Whether the user is logged in.
      loggedIn : this.isLoggedIn(),
      // @vuese
      // Whether the flick should automatically go to the next resource. Is `true` if user hasn't gone to the previous slide.
      autoPlayToggle:true,
      // @vuese
      // Whether the FlixPlayer is visible or not.
      displayStyle : "none",
      // @vuese
      // Whether the FlixPlayer is opened or not.
      modalOpen:false,
      // @vuese
      // The height of the window.
      lb_height:this.resize_window(),
      // @vuese
      // The index number of the current resource.
      sliderValue: 0,
      // @vuese
      // The number of resources to load in advance.
      window_size:5,
      // @vuese
      // Used for the mouse hover; if the mouse hovers, the bottom menu is displayed. 
      timer:false,
      // @vuese
      // Whether the bottom control menu bar is shown.
      controls_menu:false,
      // @vuese
      // The current play/pause state of the player.
      bottomNav: 'pause',
      // @vuese
      // Whether the audio is muted or not.
      mute:false
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

#example-custom-transition .fade-enter-active,
#example-custom-transition .fade-leave-active,
#example-custom-transition .fade-leave-to {
  transition: 0.3s ease-out;
  position: absolute;
  top: 0;
  left: 0;
}
#example-custom-transition .fade-enter,
#example-custom-transition .fade-leave,
#example-custom-transition .fade-leave-to {
  opacity: 0;
}
</style>
