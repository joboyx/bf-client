<template>
    <div v-if="!betterfap">
        <BunnyLovePromo ref="blp"></BunnyLovePromo>

  <v-card class="tb pt-0 pb-0" height="" color="grey darken-4" dark >

      <v-layout row wrap justify-center align-center fill-height >
        <v-flex xs12 sm12 md4 align-content-center justify-center class="hidden-xs-only text-xs-center">
          <h1 class="title font-weight-thin ml-5">{{current_resource.title}}</h1>
         </v-flex>


      <v-flex xs12 sm6 md4 align-content-center justify-center class="text-xs-center">

      <v-btn icon @click="$emit('reaction','like')" :disabled="!loggedIn" class="text-xs-center">

        <v-icon color="#B29126" v-if="current_resource.like===true">thumb_up</v-icon>
        <v-icon v-else>thumb_up</v-icon>
      </v-btn>


        
      <v-btn large icon @click="$emit('reaction','favourite')" :disabled="!loggedIn" class="ml-3 mr-3" id="theatreStep-0">
        <v-icon large color="red" v-if="current_resource.favourite">favorite</v-icon>
        <v-icon medium v-else>favorite</v-icon>        
      </v-btn>


      <v-btn icon @click="$emit('reaction','dislike')" :disabled="!loggedIn">

        <v-icon  v-if="current_resource.dislike===true" color="#B29126">thumb_down</v-icon>
        <v-icon  v-else>thumb_down</v-icon>
      </v-btn>
      
      

        </v-flex>
        
        <v-flex xs12 sm6 md4 align-content-center justify-center class="hidden-sm-and-up text-xs-center">
          <h1 class="title font-weight-thin">{{current_resource.title}}</h1>
        </v-flex>
        
        <v-flex xs4 sm2 md2 align-content-center justify-center >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
          <v-switch v-on="on" v-model="autoPlayToggle" height="100%" dark label="Autofap" class="white--text d-flex" @change="$emit('toggleAutoPlay',autoPlayDuration)" color="#B29126" id="theatreStep-1">

          </v-switch>
            </template>
            <span>Shortcut: e</span>
          </v-tooltip>


        </v-flex>

      <v-flex xs6 sm3 md1>
        <v-layout>
          <v-btn icon @click="$emit('mute')" >
            <v-icon  v-if="mute!=true">volume_off</v-icon>
            <v-icon  v-else>volume_up</v-icon>
          </v-btn>
          <v-menu v-if='true' top offset-y id="theatreStep-2">
                    <template v-slot:activator="{ on }">
                        <v-btn icon flat v-on="on">
                            <v-icon class="text-xs-center">
                              add

                            </v-icon>
                      </v-btn>
                </template>
                        <v-card class="text-xs-center">
                                  <!-- <v-list>
                            <v-list-tile>
                              <v-list-tile-title>Add to playlist</v-list-tile-title>
                              <v-list-tile-action>
                                      <v-btn flat icon disabled>
                                        <v-icon>add</v-icon>
                                      </v-btn>
                              </v-list-tile-action>
                            </v-list-tile>
                                  </v-list>
                          <v-divider></v-divider> -->

                          <v-list>
                              <v-list-tile
                                v-for="(item, index) in flicks"
                                :key="index"
                                @click="add_to_flick(item)"
                              >
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                              </v-list-tile>
                              
                            <v-divider></v-divider>
                            <v-list-tile @click.stop="dialog=true;$emit('openFlickCreation');flick_title=''">
                                    <v-dialog
                v-model="dialog"
                width="500"
                persistent
              >
                <template v-slot:activator="{ on }">
                              <v-icon class='mr-1'>playlist_add</v-icon>
                  <v-list-tile-title
                      >
                    Create new list
                    </v-list-tile-title>
                </template>

                <v-card>
                  <v-card-title
                    class="headline"
                  >
                    Create a new list
                  </v-card-title>

                  <v-card-text>
                    <v-text-field
                      v-model="flick_title"
                      :counter="100"
                      label="List name"
                      color="#B29126"
                    ></v-text-field>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      :disabled='flick_title.length<1'
                      @click="dialog = false;$emit('closeFlickCreation');new_flick()"
                    >
                      Create
                    </v-btn>
                    <v-btn
                      flat
                      @click="dialog = false;$emit('closeFlickCreation')"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
                              </v-list-tile>

                          </v-list>

                        </v-card>
          </v-menu>
          <v-menu top offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <v-btn flat icon v-on="on" :disabled="!loggedIn">
                  <v-icon>menu</v-icon>
                </v-btn>
              </template>

              <v-card>
                        <!-- <v-list>
                  <v-list-tile>
                    <v-list-tile-title>Add to playlist</v-list-tile-title>
                    <v-list-tile-action>
                            <v-btn flat icon disabled>
                              <v-icon>add</v-icon>
                            </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                        </v-list>
                <v-divider></v-divider> -->

                <v-list>

                  <v-list-tile>
                    <v-list-tile-content>
                      Autoplay duration
                  <v-select :items="items" label="Autoplay duration" v-model="autoPlayDuration" @change="$emit('setAutoPlayDuration',autoPlayDuration)">

                  </v-select>
                    </v-list-tile-content>

                  </v-list-tile>

                  <v-divider></v-divider>

                  <v-list-tile v-if="autoPlayToggle">
                    <v-list-tile-content>
                      <v-switch    v-model="skipDisliked" label="Skip disliked"> </v-switch>
                    </v-list-tile-content>
                  </v-list-tile>

                </v-list>

              </v-card>


            </v-menu>
        </v-layout>
      </v-flex>
        <!-- <v-flex xs1 sm1 justify-center class="text-xs-center" align-content-center>

            
 
        </v-flex> -->

      </v-layout>

  </v-card>

  <v-card class="tb pt-3 pb-3" height="" color="grey darken-3" dark>

      <v-layout class="ml-4" row wrap fill-height>

        <v-flex xs8 align-content-center wrap>

        <v-layout class="mb-1" wrap align-center>
          <span  class="font-weight-light subheading" id="theatreStep-3">Tags:</span>
                          <v-flex xs10 sm6  id='tagContainer' style="visibility:hidden">
                    <multiselect 
                    v-model="tags"
                  ref="tagger"
                  id="tagster"
                  :taggable="true" 
                  :multiple="true" 
                  :options="tag_options" 
                  tag-position="bottom" 
                  tag-placeholder="This category does not exist"
                  :close-on-select="false"
                  :show-labels="true"
                  placeholder="Select tags to add"
                  @close="closeTagger"
                  @search-change="search_change"
                  @select='check_submit'
                  open-direction="top"
                  class="ml-3 mb-2"
                  
                  >
                  <!-- v-focus="focused" v-if="taggingOpen || true"
                  @focus="focused = true" @blur="focused = false" -->
                  
                  <template slot="noOptions" slot-scope="" v-on:keyup.enter="log">
                    Start typing to show tags or submit
                  </template>

                  </multiselect>

                </v-flex>
        </v-layout>
          <v-layout class="mb-2" wrap>
            <span v-for="(tag,index) in current_resource.tags"  :key="tag">

              <v-tooltip top>
                <template v-slot:activator="{ on }">
            <v-chip close @input="!isGuest() ? $emit('removeTag',index) : $bus.emit('signupPrompt')"  class="text-xs-center" v-if="!current_resource.r_tags.includes(tag)" v-on="on">
              
              <a class="tag_link" :href="'/tags/'+tag" target="_blank" rel="noopener noreferrer"> {{tag}} </a>
            </v-chip>
                </template>
                <span>
                    <span v-if="current_resource.tags_map[tag]==''">This tag has no description yet.</span>
                    <span v-else>{{current_resource.tags_map[tag]}}</span>
                </span>
          </v-tooltip>
            </span>
            <!-- <v-chip color="amber darken-4" v-for="(tag,index) in current_resource.suggested_tags"  :key="index" class="text-xs-center">
              <a class="tag_link" :href="'/tags/'+tag.tag" target="_blank" rel="noopener noreferrer"> {{tag.tag}} </a>
                <v-icon class="ml-2" small  style="width:20px" @click="vote_tag(index, 'up')" :disabled="!loggedIn">thumb_up</v-icon>
                {{parseInt(tag.score)}}
                <v-icon small style="width:20px"  @click="vote_tag(index, 'down')" :disabled="!loggedIn">thumb_down</v-icon>
            </v-chip> -->
            


            <span v-for="(tag,index) in current_resource.s_tags"  :key="tag">

            <v-tooltip top v-if="!isGuest()">
                <template v-slot:activator="{ on }">
            

            <v-chip color="#B29126"  class="text-xs-center" v-on="on">
              <a class="tag_link" :href="'/tags/'+tag.tag" target="_blank" rel="noopener noreferrer"> {{tag.tag}} </a>
                <v-icon class="ml-2" small color="black" style="width:20px" @click="$emit('vote_s_tag_up',index)" :disabled="!loggedIn" v-if="tag.upvote">check</v-icon>
                <v-icon class="ml-2" small v-else style="width:20px" @click="$emit('vote_s_tag_up',index)" :disabled="!loggedIn">check</v-icon>
                <!-- {{parseInt(tag.score)}} -->
                <v-icon small style="width:20px" color="black" @click="$emit('vote_s_tag_down',index)" :disabled="!loggedIn" v-if="tag.downvote">clear</v-icon>
                <v-icon small style="width:20px"  @click="$emit('vote_s_tag_down',index)" :disabled="!loggedIn" v-else>clear</v-icon>
            </v-chip>
              </template>
               <span>
                    <span v-if="tag.description==''">This tag has no description yet.</span>
                    <span v-else>{{tag.description}}</span>
                </span>
          </v-tooltip>

            <v-tooltip top v-else>
                <template v-slot:activator="{ on }">
                  <v-chip color="#B29126"  class="text-xs-center" v-on="on">
                    <a class="tag_link" :href="'/tags/'+tag.tag" target="_blank" rel="noopener noreferrer"> {{tag.tag}} </a>
                      <v-icon class="ml-2" small color="black" style="width:20px" @click="$bus.emit('signupPrompt')" :disabled="!loggedIn" v-if="tag.upvote">check</v-icon>
                      <v-icon class="ml-2" small v-else style="width:20px" @click="$bus.emit('signupPrompt')" :disabled="!loggedIn">check</v-icon>
                      <!-- {{parseInt(tag.score)}} -->
                      <v-icon small style="width:20px" color="black" @click="$bus.emit('signupPrompt')" :disabled="!loggedIn" v-if="tag.downvote">clear</v-icon>
                      <v-icon small style="width:20px"  @click="$bus.emit('signupPrompt')" :disabled="!loggedIn" v-else>clear</v-icon>
                  </v-chip>
                </template>
                <span>
                    <span v-if="tag.description==''">This tag has no description yet.</span>
                    <span v-else>{{tag.description}}</span>
                </span>
          </v-tooltip>

            </span>
            <!-- "$emit('openTagSuggestion')" -->
            <v-btn v-if="!taggingOpen" small round outline @click="!isGuest() ? $emit('openTagger') : $bus.emit('signupPrompt')" id='tagger'> Add tag</v-btn>
                    <!-- v-model=""  -->

              <!-- <template v-else-if="tags.length>0">
                <v-chip close color="amber" v-for="(tag,index) in tags"  :key="index" class="text-xs-center" @input="tags.splice(index,1)" style="color:black">
                  {{tag}}
                </v-chip>
                
                <v-btn v-if="!taggingOpen" small round outline color="amber">Submit</v-btn>
              </template> -->

          </v-layout>
          
          <v-layout>



          </v-layout>

          <v-layout class="mb-1" wrap>
            <span class="font-weight-light subheading" id="theatreStep-4">Channels:</span>
          </v-layout>
          <v-layout wrap>
            <v-chip v-for="(tag,index) in current_resource.channel"  :key="tag" class="text-xs-center">
              
              <a class="tag_link" :href="'/channels/'+tag" target="_blank" rel="noopener noreferrer"> {{tag}} </a>
            </v-chip>
          </v-layout>



        </v-flex>

      <v-flex xs4 wrap>
        <v-layout wrap>
            <v-btn flat dark :href="current_resource.source" target="_blank" rel="noopener noreferrer" outline>
            Source
          </v-btn>

          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click="copy_source"><v-icon> file_copy</v-icon></v-btn>
            </template>
            <span>Copy source</span>
          </v-tooltip>


        </v-layout>
        <v-layout wrap >
          <span id="theatreStep-5">
          <v-btn v-if="!isGuest()" color="" flat @click="$emit('openReport')" outline >
            Report
            <!-- <v-icon right> error</v-icon> -->
            </v-btn>
          <v-btn v-else color="" flat @click="$bus.emit('signupPrompt')" outline>
            Report
            <!-- <v-icon right> error</v-icon> -->
            </v-btn></span>
        </v-layout>
        <v-layout wrap >

          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn v-if="!isGuest()" flat dark outline v-on="on" @click="$emit('missing_report')">Missing</v-btn>
              <v-btn v-else flat dark outline v-on="on" @click="$bus.emit('signupPrompt')">Missing</v-btn>
            </template>
            <!-- <v-icon right> error</v-icon> -->
            <span>This item is not showing</span>
          </v-tooltip>
        </v-layout>
      </v-flex>

      </v-layout>
  
  </v-card>
     <v-snackbar
      v-model="snackbar"
      top
      :timeout="1500"
    >
    Added this item to {{selected_flick}}  
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
     <v-snackbar
      v-model="snackbar_add_flick_suc"
      top
      :timeout="1500"
    >
Successfully created new list and added item
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
        <v-tour name="theatre" :steps="tutorialTheatreSteps" tutorialTheatreSteps :callbacks="tutorialCallBackTheatre" :options="tutorialOptions"></v-tour>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { focus } from 'vue-focus';
import axios from 'axios'
// import { tags } from '@/data/tags'
import BunnyLovePromo from '@/components/modules/BunnyLovePromo'

/**
 * @vuese
 * The databar at the bottom of the Theatre, allowing people to like, dislike, add to list, view tags, etc.
 * @group Content
 */
export default {
    components:{BunnyLovePromo},
    directives: { focus: focus },
    props:['current_resource', 'loggedIn', 'mute', 'betterfap'],
    data(){
        return{
            // @vuese
            // The autofap timer between images.
            autoPlayDuration:4,
            // @vuese
            // The `autoPlayDuration` options.
            items:[1,2,3,4,5,7,10,15,20],
            // @vuese
            // Whether autoplay is true or not.
            autoPlayToggle:false,
            // @vuese
            // Whether skipping disliked resources in AutoFap mode is on or not.
            skipDisliked:false,
            // @vuese
            // Whether the tagging box is open or not.
            taggingOpen:false,
            // @vuese
            // The list of tags by the user.
            tags:[],
            // @vuese
            // List of all tags used for the dropdown select.
            tag_options:[],
            // @vuese
            // Used for auto focus for typing.
            focused:false,
            // @vuese
            // List of all tags.
            all_tags:[],
            // @vuese
            // Default flick names and titles. Is not used.
            flicks:[
                {'title':'Flick 1', '_id':'asdf'},
                {'title':'Flick 3', '_id':'asdf'},
                {'title':'Flick 2', '_id':'asdf'},
            ],
            // @vuese
            // Popup dialog at the top of the screen.
            snackbar:false,
            // @vuese
            // Popup dialog at the top of the screen if the user added a new flick.
            snackbar_add_flick_suc:false,
            // @vuese
            // Popup dialog at the top of the screen if adding a new flick failed.
            snackbar_add_flick_err:false,
            // @vuese
            // The flick the user added the current resource to.
            selected_flick:'',
            // @vuese
            // Whether the dialog box for adding a new flick is open.
            dialog:false,
            // @vuese
            // The user input title for a new flick.
            flick_title:'',
            // @vuese
            // The user data.
            user: false,
            // @vuese
            // The tutorial data.
            tutorialTheatreSteps: [
                {
                    target: '#theatreStep-0',
                    content: '<strong>The Globe Theatre</strong><br>Welcome to theatre view. Here you can view media elements in all of their glory. It is important to like and dislike content, so that we can show you what you want to see. These can later also be viewed in “My Library”.',
                    params:{
                        position:"top",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-1',
                    content: '<strong>Just. Keep. Hopping.</strong><br>By enabling Autofap, we will automatically show you the next item as soon as this one is done playing. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-2',
                    content: '<strong>Custom lists</strong><br>You can also create lists which contain a collection of images/videos. These will be available in My Library. Lists can be published as a Flix for everyone to see!',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-3',
                    content: '<strong>Tags</strong><br>You can click on tags to see only content from the tag in a new tab. Tags which are in an orange color, have not yet been moderated. Click on the tick if you think this tag suits the content or click the cross if you think the tag does not suit the content.',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-4',
                    content: '<strong>Channels</strong><br>Below are the channels where the content originates. You can view more items from this channel by clicking on them. ',
                    params:{
                        position:"bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: '#theatreStep-5',
                    content: '<strong>Report</strong><br> Lastly, if you feel that something is not right, either the content is missing, or it is wrongly categorised, then you can report this, which would help us a lot!',
                    params:{
                        position:"left",
                        enableScrolling: false
                    }
                }
            ],
            // @vuese
            // Tutorial call back functions.
            tutorialCallBackTheatre:{
                    onSkip: this.skipTour,
                    onFinish: this.finishTheaterTutorial
                },
            // @vuese
            // Additional tutorial options.
            tutorialOptions:{
                useKeyboardNavigation:false,
                labels:{
                    buttonSkip: 'Skip tutorial',
                    buttonPrevious: 'Previous',
                    buttonNext: 'Next',
                    buttonStop: 'Finish'
                }
            },
        }
    },
    methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'isGuest', 'getUser']),
      ...mapActions('auth',['finishTutorial']),
        // @vuese
        // Called when the user wants to skip the tutorial.
        skipTour(){
            for (let x in this.getUser().tutorial){
                this.finishSingleTutorial(x)
            }
            
            for (let x in this.$tours){
              this.$tours[x].stop()
            }
            // console.log(this.getUser())
        },
        // @vuese
        // Called when the user finished a single tutorial.
        finishSingleTutorial(tutorial){
            this.finishTutorial(tutorial)
        },
        // @vuese
        // Called when the user finished a single tutorial.
        finishTheaterTutorial(){
          this.finishTutorial('theater')
          this.$axios.$post('/api/user/tutorial', {"tutorial":'theater'}, {headers:{Authorization : this.authenticationToken()}})
              // .then((res)=>{console.log("You finished a tutorial!")})
              .catch((err)=>{console.log(err)})
        },        
        // @vuese
        // Used for logging purposes.
      log(e){
        // console.log("log:" + this.$refs.tagger.search)
      }, 
        // @vuese
        // The BunnyLove promotion popup dialog, when the user tries to use a feature for premium members.
        blp(){
            this.$refs.blp.open_dialog()
        },
        // @vuese
        // Called when the user wants to create a new flick.
        new_flick(){
          // console.log(this.user.flix_count)
            if((this.user.tier === 0 || this.user.tier === 1) && this.user.flix_count >= 5){
              this.blp()
            } else{
                let h = {headers:{Authorization : this.authenticationToken()}}

                this.$axios.$post('/api/flix/create',{'title':this.flick_title}, h)
                .then((res)=>{
                    if(res.success){
                        this.snackbar_add_flick_suc = true
                        this.flicks = res.flix
                        this.user.flix_count+=1
                        for(let f of this.flicks){
                          if (f.title === this.flick_title){
                            this.add_to_flick(f)
                          }
                        }
                        this.flick_title = ''
                    }else{
                        this.snackbar_add_flick_err = true
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
          
        },
        // @vuese
        // Called when the user adds this resource to a flick.
        add_to_flick(flix){
          this.selected_flick = flix.title
          this.snackbar = true
          let h = {headers:{Authorization : this.authenticationToken()}}

            this.$axios.$post('/api/flix/add/'+flix._id + '/resource/'+this.current_resource._id,{is_return:false}, h)
            .then((res)=>{
              // console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        // @vuese
        // Called for copying something to the clipboard.
    copy_source(){
        let text = this.current_resource.url
        var textArea = document.createElement("textarea");
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';


        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
          // contole.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
      },
        // @vuese
        // Called when when a new resource is loaded.
      set_resource(resource){
          this.current_resource = resource
      },
        // @vuese
        // Toggles the autoplay button.
      set_autoplay_toggle(toggle){
        this.autoPlayToggle = toggle
      },
        // @vuese
        // Called when the user's search string for adding a new tag changes.
      search_change(s){
        if(s.length>0){
          let tmp = this.all_tags.slice()
          for(let t in this.current_resource.tags){
            if(tmp.indexOf(this.current_resource.tags[t]) != -1)
              tmp.splice(tmp.indexOf(this.current_resource.tags[t]),1)
          }

          for(let t in this.current_resource.s_tags){
            if(tmp.indexOf(this.current_resource.s_tags[t].tag) != -1)
              tmp.splice(tmp.indexOf(this.current_resource.s_tags[t].tag),1)
          }


          this.tag_options = tmp
        } else{
          if(this.tags.length>0){
            this.tag_options = ['Submit']
          } else{
            this.tag_options = []
          }
        }
      },
        // @vuese
        // Submits the tags.
      check_submit(s){
        if(s === 'Submit'){          
          this.closeTagger()
          this.submit()
        }
      },
        // @vuese
        // Opens the tagging interface.
      openTagger(){
        if(!this.isGuest()){

          this.tag_options = []
          this.tags = []
          this.taggingOpen = true
          // this.focused = true
          setTimeout(function(){
                document.getElementById("tagster").focus();
          },0)

          this.$nextTick(function(){
                  // console.log(document.getElementById("tagster")) 
                document.getElementById("tagster").focus();
                document.getElementById("tagContainer").style.visibility = 'visible';
          })
        } else{
          this.$bus.emit('signupPrompt')
        }

      },
        // @vuese
        // Closes the tagging interface.
      closeTagger(){
        if(this.taggingOpen){
          this.taggingOpen = false
          this.$emit('closeTagger')
          this.$nextTick(function(){
                document.getElementById("tagContainer").style.visibility = 'hidden';
          })
        }
      },
        // @vuese
        // Toggle the tagging options.
      toggleTagger(){
        if(this.taggingOpen){
          this.closeTagger()
        } else{
          this.openTagger()
        }
      },
        // @vuese
        // Sends the list of proposed tags to the parent `Theatre`, which handles it further.
      submit(){

        // if(this.isLoggedIn()){
        //   console.log("logged in")     
        //     for(let i of this.tags){
        //       this.$axios.$post('/api/moderate/' + this.current_resource._id + '/suggest/tag/'+i,null,{headers:{Authorization : this.authenticationToken()}})
        //       .then((res)=>{

        //       })
        //     .catch((err)=>{
        //       console.log(err)
        //     })
        //   }
        // }


        this.$emit('suggestion_sent', this.tags)
      }
    },
    created(){
        let self = this
        this.$bus.on('user', function(arg){
            self.user = arg
        })

        this.$bus.emit('get_user')

        let h = {headers:{Authorization : this.authenticationToken()}}

      this.$axios.$get('/api/tag/existing/clean', h)
        .then((res)=>{
            // console.log(res.tags)
            // console.log(tags.data)
            this.tag_options = res.tags
            this.all_tags = res.tags
            // console.log(this.search_items)
        })
        .catch((err)=>{
            console.log(err)
        })

        this.$axios.$post('/api/flix/unpublished_list',{} ,h)
            .then((res)=>{
                this.flicks = res.flix_list
            })
            .catch((err)=>{
                console.log(err)
            })
          
    },
    watch:{
        current_resource:function(){
            if(!this.current_resource.like){
                this.current_resource.like=false
            }
            if(!this.current_resource.dislike){
                this.current_resource.dislike=false
            }
            if(!this.current_resource.favourite){
                this.current_resource.favourite=false
            }
        }
    },
    // mounted(){
    //   setTimeout(()=>{
    //   this.$tours['theatre'].start()
    //   this.$tours['theatre'].currentStep++
    //   },0)
    // }
}
</script>

<style scoped>
.tag_link{
  text-decoration: none;
  color:inherit;
}
</style>
