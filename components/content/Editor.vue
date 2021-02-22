<template>
<div>
    <div v-if="resources.length > 0">
    <!-- :endpoint_url="get_endpoint() -->
    <FlixPlayer
    ref="fp_editor"
    player_id="flix_player_editor_id"
    @close_modal="closeModal"
    :resources="resources"
    ></FlixPlayer>
        <v-btn
              color="#B29126"
              dark
              bottom
              fab
              fixed
              right
              :loading="loading_save"
              :disabled="loading_save"
              @click="calculate_duration(0)"
            ><v-icon large  style="display: inline-flex !important;">save</v-icon>
            </v-btn>

<v-card color='transparent' class="mt-4" flat >

    <!-- Mobile version -->
    <v-layout class="headline font-weight-light" row wrap width="100%" id="mobileEditorSelect">

              <!--
              <v-flex xs12 class="mt-2 mb-2">

              {{current_resource.title}}
              </v-flex>
              -->
        <v-card max-height="50vh" width="100%" style="overflow:scroll;margin:auto" class="hidden-sm-and-up mt-2" >

            <draggable v-model="resources" @start="drag=true" @end="drag=false" handle=".handle" class="d-flex">

            <div v-for="element in resources" :key="element.flix_resource_id+'_blaze'" class="mr-1">

                <v-layout>
                    <v-img
                    :src="element.thumbnail"
                    height="100px"
                    width="100px"
                    cover
                    @click="set_current_resource(element)"
                    >
                    <v-layout>

                        <v-icon class="handle" style="cursor: -webkit-grabbing; cursor: grabbing;">
                            drag_handle
                        </v-icon>

                        <v-spacer></v-spacer>

                        <v-icon style="cursor:pointer" @click="duplicate(element)">
                            file_copy
                        </v-icon>
                        </v-layout>
                        <v-layout class="mt-5">
                        <v-icon style="cursor:pointer" @click="remove(element)">
                            delete
                        </v-icon>

                    </v-layout>
                    </v-img>

                        </v-layout>

                </div>
            </draggable>
        </v-card>

    </v-layout>

    <!-- Desktop version -->
    <v-layout class="mt-1 ml-2 mr-1" row wrap >
        <v-flex xs12 sm4 md3 class="">
            <v-card max-height="70vh" width="100%" flat style="overflow-y:scroll;margin:auto;background-color:#282828!important;padding:5px" class="hidden-xs-only scrollbar-style" color="transparent" id="editorStep-1">

                <draggable v-model="resources" @start="drag=true" @end="drag=false" handle=".handle">

                    <div v-for="(element, index) in resources" :key="element.flix_resource_id+'_blaze'" class="mb-4">
                        <span class="subheading font-weight-thin" v-if="element==current_resource" style="color: #B29126">
                        {{index + 1}}. {{element.title}}
                        </span>
                        <span class="subheading font-weight-thin" v-else>
                        {{index + 1}}. {{element.title}}
                        </span>
                        <v-layout class="mt-1 mb-2">
                            <v-icon class="handle mr-3" style="cursor: -webkit-grabbing; cursor: grabbing;">
                                drag_handle
                            </v-icon>
                            <v-icon style="cursor:pointer" @click="duplicate(element)" class="mr-3">
                                file_copy
                            </v-icon>
                            <v-icon style="cursor:pointer" @click="remove(element)">
                                delete
                            </v-icon>
                        </v-layout>
                        <v-layout v-bind="{'outline':(element===current_resource )}">
                            <v-img
                            :src="element.thumbnail"
                            height="200px"
                            width="auto"

                            cover
                            @click="set_current_resource(element)"
                            >
                            <v-container fill-height justify-center align-center>
                                <v-layout justify-center align-center row class="text-xs-center">
                                    <v-flex>

                                        <v-icon x-large color='#B29126' v-if="element.type==='video'">play_circle_outline</v-icon>
                                        <v-icon x-large v-else-if="element.type==='web_video'">play_circle_outline</v-icon>
                                        <v-icon x-large v-else>zoom_in</v-icon>

                                    </v-flex>
                                </v-layout>
                            </v-container>
                            </v-img>
                        </v-layout>

                    </div>
                </draggable>
            </v-card>



        </v-flex>
        <v-flex xs12 sm8 md9 >
            <v-layout>
                <video v-if="current_resource.type==='web_video'" width="80%" controls style="object-fit: contain; height:50vh; margin:0 auto;display:block "
                :src="current_resource.url"
                autoplay loop
                id="myVid"
                ref="blaze_media"
                :onloadedmetadata="load_metadata()"
                playsinline
                > <source></video>

                <v-img v-else-if="current_resource.type==='img' || current_resource.type==='gif'" :src="current_resource.url" contain height="50vh" ></v-img>

                <iframe v-if="current_resource.type==='video'" :src="current_resource.url+'?autoplay=1'" allow="autoplay" frameborder="0" width="100%"  style="object-fit: contain; height:50vh; margin:0 auto;display:block " scrolling="no" allowfullscreen

                ></iframe>
            </v-layout>

            <v-layout class="text-xs-center headline font-weight-light" row wrap width="100%">
              <v-flex xs12 class="mt-2 mb-2" id="editorStep-2">

              {{current_resource.title}}
              </v-flex>
            </v-layout>

            <v-layout>

                    <v-layout v-if="['gif', 'video', 'img'].includes(current_resource.type)">
                        <v-flex xs10 offset-xs1 class="mt-3" v-if="current_resource.type!='video'">
                            <v-layout>
                            <v-slider
                              color="#B29126"
                              v-model="current_resource.duration"
                              :max="60"
                              :min="0.5"
                              :step="0.5"
                              thumb-label="always"
                              class="mt-2"
                              label="Duration"
                              always-dirty

                            ></v-slider>
                                </v-layout>

                          </v-flex>
                          <v-flex xs10 offset-xs1 class="mt-3" v-else>
                              <v-flex xs12>
                            <v-slider
                              color="#B29126"
                              v-model="current_resource.duration"
                              :max="3600"
                              :min="1"
                              :step="1"
                              thumb-label="always"
                              class="mt-2"
                              label="Duration"
                              always-dirty

                            ></v-slider>
                            </v-flex>

                        </v-flex>
                    </v-layout>

                    <v-layout v-else-if="current_resource != null">
                          <v-flex xs10 offset-xs1 class="mt-3" >
                              <v-flex xs12 v-if="current_resource.end==-1">
                            <v-range-slider
                              color="#B29126"
                              :max="60"
                              :min="1"
                              :step="1"
                              class="mt-2"
                              v-model="default_range"
                              readonly
                            >

                            <template v-slot:prepend>
                                <v-subheader class="pb-4">0:00</v-subheader>
                            </template>
                            <template v-slot:append>
                                <v-subheader class="pb-4">end</v-subheader>
                            </template>


                            </v-range-slider>
                            </v-flex>
                            <v-flex xs12 v-else>

                            <v-range-slider
                              v-model="current_range"
                              @input="change_range"
                              color="#B29126"
                              :max="current_resource.duration"
                              :min="0.1"
                              :step="0.1"
                              class="mt-2"
                            >

                            <template v-slot:prepend>
                                <v-subheader class="pb-4">{{get_minutes(current_resource.start)}}</v-subheader>
                            </template>
                            <template v-slot:append>
                                <v-subheader class="pb-4" v-if="current_resource.end">{{get_minutes(current_resource.end)}}   </v-subheader>
                            </template>


                            </v-range-slider>


                            </v-flex>
                              </v-flex>
                    </v-layout>

            </v-layout>

            <v-layout class="text-xs-center" align-center justify-center>

                <v-btn flat outline @click="openModal(resources.indexOf(current_resource))">
                    <v-icon left>play_arrow</v-icon>
                    Play from here
                </v-btn>
                <v-btn flat outline @click="duplicate(current_resource)" :disabled='duration_loading' :loading="duration_loading">
                    Duplicate
                <v-icon right>
                    file_copy
                </v-icon>

                </v-btn>
                <v-btn flat outline @click="remove(current_resource)" :disabled='duration_loading' :loading='duration_loading'>
                    Delete
                <v-icon  right>
                    delete
                </v-icon>
                </v-btn>
            </v-layout>

        </v-flex>




    </v-layout>

    <v-layout align-centern justify-center class="mt-5">
        <span class="font-weight-thin">
            Items in current flick: <span class="font-weight-medium">{{resources.length}}</span>.
            Total duration: <span class="font-weight-medium"> {{total_duration}} </span>.
        <!-- <v-btn flat small @click="calculate_duration(0)" :disabled='duration_loading' :loading="duration_loading">
            Calculate duration
        </v-btn> -->

        </span>

    </v-layout>

        <!-- <li v-for="item in resources">
            {{item}}
        </li> -->
          </v-card>

    </div>
    <div v-else-if="!loading_data">
        <v-layout style="height:50vh" align-center fill-height class="font-weight-light title" justify-center>You don't have any items added to your list! </v-layout>
    </div>
    <v-layout v-else justify-center>
            <v-progress-circular
            :size="70"
            :width="7"
            color="#B29126"
            indeterminate
            class="mt-5"
            ></v-progress-circular>
    </v-layout>
        <video src="" muted id="duration_id" preload="metadata" v-show="false"></video>
        <v-tour name="editor" :steps="tutorialEditorSteps" v-show="$route.name==='flix-private-flick'" :callbacks='tutorialCallBackEditor' :options="tutorialOptions"></v-tour>
</div>
</template>

<script>
//#B29126
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import draggable from 'vuedraggable'
import FlixPlayer from '@/components/content/FlixPlayer'

/**
 * @vuese
 * The flix/list editor. This component allows users to edit individual resources into a longer movie.
 * @group Content
 */
export default{
    props:['endpoint_auth', 'endpoint_unauth'],
    components:{draggable, FlixPlayer},
    data(){
        return { // @vuese
            // The original list of resources as part of this list.
            data:[], // @vuese
            // The copied list of resources, which can be used for editing.
            resources:[], // @vuese
            // The default range length for the duration of images.
            default_range:[1,60], // @vuese
            // Whether the flix is currently being saved, in which case it will show a loading icon.
            loading_save:false, // @vuese
            // Deprecated. Used to be the flix editor engine.
            blaze_editor:false, // @vuese
            // The current selected resource.
            current_resource:{}, // @vuese
            // The duration selected by the user. We're using a range for programmtic convenience and because it works with vuetify.
            current_range:[0,1], // @vuese
            // The total duration of the flick.
            total_duration:'?', // @vuese
            // Duration variable used for calculations.
            duration:0, // @vuese
            // Indicates whether the duration of the flick is currently being calculated.
            duration_loading:false, // @vuese
            // Indicated that the data is still being fetched from the server.
            loading_data:true, // @vuese
            // The tutorial dialogue box data.
            tutorialEditorSteps: [
                {
                    target: '#editorStep-0',
                    content: '<strong>What is going on here?</strong><br>This is where the magic happens. The editor is an extremely powerful engine to customise content. You can take your existing lists and create a beautiful Flick out of it. You can edit and customise it entirely to your liking! ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#editorStep-1',
                    content: '<strong>Selecting media</strong><br>Here we show all the items in your list. By clicking on them, you select them in the main editor pane. You can also duplicate, reorder, and delete elements by clicking on the icons.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#editorStep-2',
                    content: '<strong>Customising</strong><br>You can customise where webms are supposed to start and end, and how long images should be shown.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#editorStep-3',
                    content: '<strong>Publish it</strong><br>Once you are happy with your flick, publish it for the rest of the world to see it! This way you can earn carrots!',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
            ], 
            // @vuese
            // Callback functions for when the tutorial ends or is skipped.
            tutorialCallBackEditor:{
                    onSkip: this.skipTour,
                    onFinish: this.finishEditorTutorial
                }, 
            // @vuese
            // Additional options for the tutorial.
            tutorialOptions:{
                useKeyboardNavigation:false,
                labels:{
                    buttonSkip: 'Skip all tutorials',
                    buttonPrevious: 'Previous',
                    buttonNext: 'Next',
                    buttonStop: 'Finish'
                }
            },
            
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'getUser']),
      ...mapActions('auth',['finishTutorial']), 
        // @vuese
        // Called when the tutorial is skipped.
        skipTour(){
            for (let x in this.getUser().tutorial){
                this.finishSingleTutorial(x)
            }
            
            for (let x in this.$tours){
              this.$tours[x].stop()
            }
        },
        // @vuese
        // Called when the tutorial ends by `finishEditorTutorial`.
        finishSingleTutorial(){
            this.finishTutorial('editor')
        },
        // @vuese
        // Called when the tutorial ends.
        finishEditorTutorial(){
          this.finishTutorial('editor')
            this.$axios.$post('/api/user/tutorial', {"tutorial":'editor'}, {headers:{Authorization : this.authenticationToken()}})
                // .then((res)=>{console.log("You finished a tutorial!")})
                .catch((err)=>{console.log(err)})
        },
        // @vuese
        // Gets the authorisation data to call the api endpoints.
        get_endpoint(){
            if(this.isLoggedIn()){
                return this.endpoint_auth
            }else{
                return this.endpoint_unauth
            }

        },
        // @vuese
        // Calculates the total duration of the flick.
        calculate_duration(count=0){

            let self = this
            if(count===0){
                this.duration_loading = true
                this.loading_save = true
                this.duration = 0
            }
            if(count === this.resources.length){
                // console.log(this.resources)
                let measuredTime = new Date(null);
                measuredTime.setSeconds(this.duration); // specify value of SECONDS
                this.total_duration = measuredTime.toISOString().substr(11, 8);
                this.save()
                this.duration_loading = false
                return true
            }else if (this.resources[count].type != 'web_video'){
                this.duration+=this.resources[count].duration
                this.calculate_duration(count+1)
            } else{
                if(this.resources[count].start!=-1){
                    // this.resources[count].duration = this.resources[count].end - this.resources[count].start
                    this.duration += this.resources[count].end - this.resources[count].start
                    this.calculate_duration(count+1)
                }else{
                    let vid = document.getElementById('duration_id')
                    vid.src = this.resources[count].url
                    vid.onloadedmetadata = function() {
                        
                        // console.log(vid.duration)
                        self.duration += vid.duration
                        // self.resources[count].start = 0.1
                        // self.resources[count].end = vid.duration
                        self.$set(self.resources[count], 'start', 0.1)
                        self.$set(self.resources[count], 'end', vid.duration)
                        self.$set(self.resources[count], 'duration', vid.duration)
                        // vid.parentNode.removeChild(vid);
                        vid.src = ""
                        self.calculate_duration(count+1)
                    };
                }
                
            }
        },
        // @vuese
        // Deprecated.
        calculate_duration_old(){
            let duration = 0
            for(let x of this.resources){
                // console.log(x)
                if(x.duration != -1){
                    // console.log(x)
                    // console.log(x.duration)
                    if(x.type === 'web_video'){
                        duration += (x.end - x.start)
                    }else{
                        duration += x.duration
                    }
                }
            }

            let measuredTime = new Date(null);
            measuredTime.setSeconds(duration); // specify value of SECONDS
            this.total_duration = measuredTime.toISOString().substr(11, 8);

            // this.total_duration = duration
        },
        // @vuese
        // Opens the FlixPlayer when the user wants to play the flick from the editor, from a specified resource.
        openModal(index){
            if(!index){
                index = 0
            }
            // console.log("Index  = " + index)
            this.$refs.fp_editor.openModal(index)
        },
        // @vuese
        // Closes the FlixPlayer.
        closeModal(){
            this.$emit('close_modal')
        },
        // @vuese
        // Get the type of the image location of the type of the current resource.
        get_type(type){
            if(type==='web_video'){
                return require('assets/images/media-webm.png')
            }else if(type==='gif'){
                return require('assets/images/media-gif.png')
            }else if(type==='video'){
                return require('assets/images/media-vid.png')
            }else if(type==='img'){
                return require('assets/images/media-img.png' )
            }
        },
        // @vuese
        // Called when the user adjusts the duration of a resource.
        change_range(x){

            let idx = 0
            if(this.current_resource.start == this.current_range[0]){
               idx = 1
            }

            this.current_resource.start = this.current_range[0]
            this.current_resource.end = this.current_range[1]
            let vid = document.getElementById('myVid')
            vid.pause()
            if(vid.currentTime !=0)
            vid.currentTime = x[idx]
            else{
                vid.currentTime = this.current_resource.start
            }
        },
        // @vuese
        // Convert the number of seconds to minutes + seconds.
        get_minutes(seconds){
            let minutes = Math.floor(seconds/60)
            let res = (seconds - minutes * 60).toFixed(1)
            if(res < 10){
                res = '0' + String(res)
            }
            return String(minutes) + ":" + String(res)
        },
        // @vuese
        // Called when the user hits the duplicate button, and duplicates the current resource and inserts it below. This automatically saves it in the server.
        duplicate(element){
            this.duration_loading = true
            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/flix/add/'+this.data._id + '/resource/'+element._id,{is_return:true}, h)
                .then((res)=>{
                    let idx = this.resources.indexOf(element)
                    let copy=JSON.parse(JSON.stringify(element));
                    copy.flix_resource_id = res.resource_data._id
                    copy._id = res.resource_data.resource_id
                    // console.log(res)
                    // console.log(copy.flix_resource_id)
                    // console.log(copy._id)
                    this.resources.splice(idx,0,copy)
                    this.calculate_duration()
                })
                .catch((err)=>{
                    this.duration_loading = false
                })
        },
        // @vuese
        // Removes a resource from the list, does not automatically save it.
        remove(element){
            this.duration_loading = true
            let idx = this.resources.indexOf(element)
            this.set_current_resource(this.resources[(idx+1)%this.resources.length])
            this.resources.splice(idx,1)
            this.calculate_duration()
            if(this.resources.length === 0){
                this.save()
            }
        },
        // @vuese
        // Saves the current list (and flix).
        save(){
            this.loading_save = true
            let h = {headers:{Authorization : this.authenticationToken()}}
            let res = []
            let thumbnails = []

            for(let item of this.resources){
                res.push({
                    _id:item.flix_resource_id,
                    resource_id:item._id,
                    duration:item.duration,
                    start:item.start,
                    end:item.end,
                })
                thumbnails.push(item.thumbnail)
            }
            thumbnails.splice(5, this.resources.length)
            let ret = {thumbnails:thumbnails, resources:res}
            this.$axios.$post('/api/flix/update/'+this.data._id,ret, h)
                .then((res)=>{
                    this.loading_save = false
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        // @vuese
        // Gets the current resource data and sets it in the editor.
        set_current_resource(element){

            //console.log("setting current resource")
            this.current_resource = element
            this.load_metadata()
            //this.current_range[0] = this.current_resource.start
            this.current_range.splice(0,1,this.current_resource.start)
                if(this.current_resource.end==0.1){
                    // console.log("in if")
                    this.current_resource.end = this.current_resource.duration
                    // console.log(this.current_resource.end)
                }
            //this.current_range[1] = this.current_resource.end
            this.current_range.splice(1,1,this.current_resource.end)
                // console.log(this.current_resource.end)

            this.calculate_duration(0)


        },
        // @vuese
        // Load metadata related to a video, for duration calculation purposes.
        load_metadata(){
            // console.log("Loading metadata")
            if(this.resources.length != 0){
            let self = this
            if(this.current_resource.end == -1){
            // console.log("Setting time for first time")

                setTimeout(()=>{
                    let vid = document.getElementById('myVid')
                    if ( vid.readyState === 4 ) {
                        // console.log("Already loaded video, setting config")
                        self.current_resource.duration = vid.duration
                        self.current_resource.end = vid.duration
                        self.current_resource.start = 0.1
                        self.set_current_resource(self.current_resource)
                    } else{
                    let func = ()=>{
                        self.current_resource.duration = vid.duration
                        self.current_resource.end = vid.duration
                            // console.log("Vid duration: " + vid.duration)
                        self.current_resource.start = 0.1
                        self.set_current_resource(self.current_resource)
                        // for(let item of self.resources){
                        //     if(item.end==-1){
                        //         item.end = vid.duration
                        //         item.duration = vid.duration
                        //         item.start = 0.1
                        //     }
                        // }


                        vid.removeEventListener('loadedmetadata',func, false)

                    }
                    myVid.addEventListener('loadedmetadata', func, false);
                    }
                    self.save()
                },0)

            }else{

            setTimeout(()=>{
                let vid = document.getElementById('myVid')
                myVid.addEventListener('loadedmetadata', function() {
                    myVid.currentTime = self.current_resource.start
                    myVid.pause()
                    // Delete?
                    //self.set_current_resource(self.current_resource)
             });

            },0)
            }
            }
        },
        // @vuese
        // Deprecated. Used to be the former editor engine.
        open_blaze(element){
            this.set_current_resource(element)
            this.blaze_editor = true
        },
        // @vuese
        // Deprecated. Closed the former editor engine.
        close(){
            this.blaze_editor = false
            if(document.getElementById('myVid')!=null){
                document.getElementById('myVid').pause()
            }
        }
    },
    created(){

       let h = {headers:{Authorization : this.authenticationToken()}}

       this.$axios.$post(this.get_endpoint(), {}, h)
            .then((res)=>{
                this.data = res.data
                this.resources = this.data.resources
                if(this.resources.length != 0){
                    this.set_current_resource(this.resources[0])
                }
                this.loading_data = false

                if(this.getUser().tutorial.editor && this.resources.length != 0){
                    if(document.documentElement.clientWidth < 960){
                        setTimeout(()=>{
                            document.getElementById('editorStep-1').id = 'desktopEditorSelect'
                            document.getElementById('mobileEditorSelect').id = 'editorStep-1'
                            this.$tours['editor'].start()
                        });

                    } else{
                        this.$tours['editor'].start()
                    }
                }

                // this.calculate_duration()
            })
            .catch((err)=>{
                console.log(err)
            })
    },
        mounted(){
            



    }
}

/*
<!-- LEGACY CODE - OLD EDITOR -->
        <draggable v-model="resources" @start="drag=true" @end="drag=false" handle=".handle" v-if="false">
           <v-flex row wrap xs12 sm12 md10 lg8  offset-lg2 offset-md1 v-for="element in resources" :key="element.flix_resource_id + '_blaze'" class="mb-2">
                    <v-card width="auto" raised color="">

                   <v-layout row wrap>
                       <v-flex xs12 sm3 md4 class="pa-2">
                          <v-img
                           :src="element.thumbnail"
                            height="200px"
                            width="200px"
                            cover
                            @click="open_blaze(element)"
                            style="cursor:pointer"
                            class="hidden-sm-and-down"
                          >

                            <v-container fill-height justify-center align-center>
                                <v-layout justify-center align-center row class="text-xs-center">
                                    <v-flex>

                                        <v-icon x-large color='#B29126' v-if="element.type==='video'">play_circle_outline</v-icon>
                                        <v-icon x-large v-else-if="element.type==='web_video'">play_circle_outline</v-icon>
                                        <v-icon x-large v-else>zoom_in</v-icon>

                                    </v-flex>
                                </v-layout>
                            </v-container>
                          </v-img>
                          <v-img
                           :src="element.thumbnail"
                            height="150px"
                            width="150px"
                            cover
                            @click="open_blaze(element)"
                            style="cursor:pointer"
                            class="hidden-md-and-up hidden-xs-only"
                          ></v-img>
                          <v-img

                           :src="element.thumbnail"
                            height="200px"
                            width="100%"
                            contain
                            @click="open_blaze(element)"
                            style="cursor:pointer; background-color:black"
                            class="hidden-sm-and-up"
                          ></v-img>
                        </v-flex>

                        <v-flex sm9 md8>
                    <v-layout class="ma-1 ml-3">
                        <v-flex sm10 xs9 >
                            <span class="headline font-weight-light">{{element.title}}</span>
                        </v-flex>
                        <v-flex sm3 md2 xs3  class="text-xs-right mt-2 mr-1" >
                            <v-spacer>
                                </v-spacer>
                            <v-icon class="handle" style="cursor: -webkit-grabbing; cursor: grabbing;">
                                drag_handle
                            </v-icon>

                            <v-icon style="cursor:pointer" @click="duplicate(element)">
                                file_copy
                            </v-icon>
                            <v-icon style="cursor:pointer" @click="remove(element)">
                                delete
                            </v-icon>
                        </v-flex>
                   </v-layout>

                    <v-layout row wrap class="mt-1 ml-3">
                        <v-flex>
                        <v-img
                           :src="get_type(element.type)"
                            height="30px"
                            width="30px"
                            >

                        </v-img>
                            </v-flex>
                    </v-layout>


                    <v-layout v-if="['gif', 'video', 'img'].includes(element.type)">

                        <v-flex sm10 xs12 offset-xs class="mt-3" v-if="element.type!='video'">
                            <v-layout>
                            <v-slider
                              color="#B29126"
                              v-model="element.duration"
                              :max="60"
                              :min="0.5"
                              :step="0.5"
                              thumb-label="always"
                              class="mt-2"
                              label="Duration"
                              always-dirty

                            ></v-slider>
                                </v-layout>

                          </v-flex>
                          <v-flex sm10 xs12 offset-xs class="mt-3" v-else>
                              <v-flex xs12>
                            <v-slider
                              color="#B29126"
                              v-model="element.duration"
                              :max="3600"
                              :min="1"
                              :step="1"
                              thumb-label="always"
                              class="mt-2"
                              label="Duration"
                              always-dirty

                            ></v-slider>
                            </v-flex>

                        </v-flex>
                    </v-layout>

                    <v-layout v-else>
                          <v-flex sm10 xs12 offset-xs class="mt-3" >
                              <v-flex xs12 v-if="element.start==-1">
                            <v-range-slider
                              color="#B29126"
                              :max="60"
                              :min="1"
                              :step="1"
                              class="mt-2"
                              v-model="default_range"
                              readonly
                            >

                            <template v-slot:prepend>
                                <v-subheader class="pb-4">0:00</v-subheader>
                            </template>
                            <template v-slot:append>
                                <v-subheader class="pb-4">end</v-subheader>
                            </template>


                            </v-range-slider>
                            </v-flex>
                            <v-flex xs12 v-else>

                            <v-range-slider
                              color="#B29126"
                              :max="element.duration"
                              :min="0.1"
                              class="mt-2"
                              step="1"
                              readonly
                              :value="[element.start,element.end]"
                            >

                            <template v-slot:prepend>
                                <v-subheader class="pb-4">{{get_minutes(element.start)}}</v-subheader>
                            </template>
                            <template v-slot:append>
                                <v-subheader class="pb-4">{{get_minutes(element.end)}}   </v-subheader>
                            </template>


                            </v-range-slider>

                            </v-flex>
                              </v-flex>
                    </v-layout>

                        </v-flex>
                    </v-layout>

                   </v-card>
                </v-flex>
        </draggable>

    <v-dialog v-model="blaze_editor" persistent fullscreen hide-overlay transition="dialog-bottom-transition" v-if="false">
      <v-card>
          <v-toolbar dark color="grey darken-4">
              <v-toolbar-title>
                  <span class="display-1 font-weight-light">Blaze</span>
                  </v-toolbar-title>


                  <v-spacer></v-spacer>

            <v-toolbar-items>
            <v-btn dark flat @click="save()">Save</v-btn>
          </v-toolbar-items>
          <v-btn icon dark @click="close">
            <v-icon>close</v-icon>
          </v-btn>
          </v-toolbar>

          <v-layout class="headline font-weight-light" row wrap width="100%">
              <!--
              <v-flex xs12 class="mt-2 mb-2">

              {{current_resource.title}}
              </v-flex>
              -->
                    <v-card max-height="50vh" width="100%" style="overflow:scroll;margin:auto" class="hidden-sm-and-up mt-2" >

        <draggable v-model="resources" @start="drag=true" @end="drag=false" handle=".handle" class="d-flex">

           <div v-for="element in resources" :key="element.flix_resource_id+'_blaze'" class="mr-1">

               <v-layout>
                <v-img
                 :src="element.thumbnail"
                  height="100px"
                  width="100px"
                  cover
                  @click="set_current_resource(element)"
                >
                <v-layout>

                    <v-icon class="handle" style="cursor: -webkit-grabbing; cursor: grabbing;">
                        drag_handle
                    </v-icon>

                    <v-spacer></v-spacer>

                    <v-icon style="cursor:pointer" @click="duplicate(element)">
                        file_copy
                    </v-icon>
                    </v-layout>
                    <v-layout class="mt-5">
                    <v-icon style="cursor:pointer" @click="remove(element)">
                        delete
                    </v-icon>

                </v-layout>
                </v-img>

                    </v-layout>

            </div>
        </draggable>
                    </v-card>

          </v-layout>


          <v-layout class="mt-1 ml-2 mr-1" row wrap>

                <v-flex xs12 sm8 md10 >
                    <video v-if="current_resource.type==='web_video'" width="100%" controls style="object-fit: contain; height:50vh; margin:0 auto;display:block "
                    :src="current_resource.url"
                    autoplay loop
                    id="myVid"
                    ref="blaze_media"
                    :onloadedmetadata="load_metadata()"
                    playsinline
                    > <source></video>

                    <v-img v-else-if="current_resource.type==='img' || current_resource.type==='gif'" :src="current_resource.url" contain height="50vh" ></v-img>

                    <iframe v-if="current_resource.type==='video'" :src="current_resource.url+'?autoplay=1'" allow="autoplay" frameborder="0" width="100%"  height="100%" scrolling="no" allowfullscreen

                    ></iframe>
                    </v-flex>

                <v-flex xs12 sm4 md2 class="">
                    <v-card max-height="50vh" width="150px" style="overflow:scroll;margin:auto" class="hidden-xs-only">

        <draggable v-model="resources" @start="drag=true" @end="drag=false" handle=".handle">

           <div v-for="element in resources" :key="element.flix_resource_id+'_blaze'" class="mb-2">

               <v-layout v-bind="{'outline':(element===current_resource )}">
                <v-img
                 :src="element.thumbnail"
                  height="100px"
                  width="100px"
                  cover
                  @click="set_current_resource(element)"
                >

                <v-layout>
                    <v-icon class="handle" style="cursor: -webkit-grabbing; cursor: grabbing;">
                        drag_handle
                    </v-icon>

                    <v-spacer></v-spacer>

                    <v-icon style="cursor:pointer" @click="duplicate(element)">
                        file_copy
                    </v-icon>

                    </v-layout>
                    <v-layout class="mt-5">
                    <v-icon style="cursor:pointer" @click="remove(element)">
                        delete
                    </v-icon>
                    </v-layout>
                </v-img>

                    </v-layout>

            </div>
        </draggable>
                    </v-card>



                </v-flex>
          </v-layout>

          <v-layout class="text-xs-center headline font-weight-light" row wrap width="100%">
              <v-flex xs12 class="mt-2 mb-2">

              {{current_resource.title}}
              </v-flex>
          </v-layout>

          <v-layout>

                    <v-layout v-if="['gif', 'video', 'img'].includes(current_resource.type)">

                        <v-flex xs10 offset-xs1 class="mt-3" v-if="current_resource.type!='video'">
                            <v-layout>
                            <v-slider
                              color="#B29126"
                              v-model="current_resource.duration"
                              :max="60"
                              :min="0.5"
                              :step="0.5"
                              thumb-label="always"
                              class="mt-2"
                              label="Duration"
                              always-dirty

                            ></v-slider>
                                </v-layout>

                          </v-flex>
                          <v-flex xs10 offset-xs1 class="mt-3" v-else>
                              <v-flex xs12>
                            <v-slider
                              color="#B29126"
                              v-model="current_resource.duration"
                              :max="3600"
                              :min="1"
                              :step="1"
                              thumb-label="always"
                              class="mt-2"
                              label="Duration"
                              always-dirty

                            ></v-slider>
                            </v-flex>

                        </v-flex>
                    </v-layout>

                    <v-layout v-else-if="current_resource != null">
                          <v-flex xs10 offset-xs1 class="mt-3" >
                              <v-flex xs12 v-if="current_resource.end==-1">
                            <v-range-slider
                              color="#B29126"
                              :max="60"
                              :min="1"
                              :step="1"
                              class="mt-2"
                              v-model="default_range"
                              readonly
                            >

                            <template v-slot:prepend>
                                <v-subheader class="pb-4">0:00</v-subheader>
                            </template>
                            <template v-slot:append>
                                <v-subheader class="pb-4">end</v-subheader>
                            </template>


                            </v-range-slider>
                            </v-flex>
                            <v-flex xs12 v-else>

                            <v-range-slider
                              v-model="current_range"
                              @input="change_range"
                              color="#B29126"
                              :max="current_resource.duration"
                              :min="0.1"
                              :step="0.1"
                              class="mt-2"
                            >

                            <template v-slot:prepend>
                                <v-subheader class="pb-4">{{get_minutes(current_resource.start)}}</v-subheader>
                            </template>
                            <template v-slot:append>
                                <v-subheader class="pb-4" v-if="current_resource.end">{{get_minutes(current_resource.end)}}   </v-subheader>
                            </template>


                            </v-range-slider>

                            <v-layout>


                                <v-btn icon @click="duplicate(current_resource)">
                                <v-icon style="cursor:pointer" >
                                    file_copy
                                </v-icon>

                                </v-btn>
                                <v-btn icon @click="remove(current_resource)">
                                <v-icon style="cursor:pointer" >
                                    delete
                                </v-icon>
                                </v-btn>
                            </v-layout>
                            </v-flex>
                              </v-flex>
                    </v-layout>
          </v-layout>

          </v-card>

        </v-dialog>
*/
</script>


<style scoped>

.outline{
    border: 2px solid #B29126;
}
.scrollbar-style::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}

.scrollbar-style::-webkit-scrollbar
{
    width: 12px;
    background-color: #F5F5F5;
}

.scrollbar-style::-webkit-scrollbar-thumb
{

    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #B29126;
}
</style>
