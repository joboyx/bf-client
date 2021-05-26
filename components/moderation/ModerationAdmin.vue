<template>
<div>
<FilterPref @get_new_resource='get_data'></FilterPref>
    <div v-if="current_resource">
        <v-container grid-list-xs fluid>

            <v-layout v-if="current_resource" row wrap reverse style="width=100%" >
                <v-flex xs12 class="text-xs-center mb-3"><h1 class="headline font-weight-thin" id="moderationStep-0">{{current_resource.title}}
                    
                    </h1></v-flex>

                <v-flex xs12 sm12 md6 >
                    <video v-if="current_resource.type==='web_video'" width="100%" controls style="object-fit: contain; max-height:500px"
                    :src="current_resource.url" 
                    muted="muted" autoplay loop playsinline
                    > <source></video>

                    <v-img v-else-if="current_resource.type==='img' || current_resource.type==='gif'" :src="current_resource.url" contain max-height="500px" ></v-img>
                    
                            <!-- <iframe v-else-if="current_resource==='video'" :src="current_resource.url" frameborder="0" width="100%" height="100%" scrolling="no" allowfullscreen
                            ></iframe> -->

                    <iframe v-if="current_resource.type==='video'" :src="current_resource.url+'?autoplay=1'" allow="autoplay" frameborder="0" width="100%"  height="500px" scrolling="no" allowfullscreen
                    
                    ></iframe>
                    

                    <v-flex xs12 class="text-xs-center" justify-center>
                              <v-btn icon @click="reaction('like')" class="text-xs-center">

                                <v-icon color="#B29126" v-if="current_resource.like===true">thumb_up</v-icon>
                                <v-icon v-else>thumb_up</v-icon>
                            </v-btn>

                                
                            <v-btn large icon @click="reaction('favourite')" class="ml-3 mr-3" id="moderationStep-4">
                                <v-icon large color="red" v-if="current_resource.favourite">favorite</v-icon>
                                <v-icon medium v-else>favorite</v-icon>        
                            </v-btn>


                            <v-btn icon @click="reaction('dislike')">

                                <v-icon  v-if="current_resource.dislike===true" color="#B29126">thumb_down</v-icon>
                                <v-icon  v-else>thumb_down</v-icon>
                            </v-btn>
                    </v-flex>

                            

                </v-flex>
                
                <v-flex xs12 sm12 md6>
                <!-- Tags and stuff -->
                    <v-layout class="mb-3" row wrap>
                        <v-flex xs12>

                            <h2 class="headline font-weight-medium" > <span id="moderationStep-1"> Tags </span> 
                                <v-icon color="green darken-1" v-if="tags_done">done_all</v-icon>
                                <v-icon color="grey lighten-1" v-else>done</v-icon>
                            </h2>
                        </v-flex>
                            <v-layout row justify-start wrap>

                            <!-- {{current_resource.tags_map}} -->
                            <v-flex xs10>
                                <span v-for="(tag, index) in good_tags" :key="index"> 
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-chip close  @input="remove_tag(index)" v-on="on">
                                                {{tag}}
                                            </v-chip>
                                        </template>
                                        <span>
                                            <span v-if="current_resource.tags_map[tag]==''">This tag has no description yet.</span>
                                            <span v-else>{{current_resource.tags_map[tag]}}</span>
                                        </span>
                                    </v-tooltip>
                                </span>
                            </v-flex>
<!-- .sort(Comparator).reverse() -->
                            <v-flex xs10  >
                                <span v-for="(tag, index) in moderation_data.i_tags" :key="tag[0]">
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                <v-chip  color="#B29126" class="white--text" v-on="on">
                                     <v-icon class="" small style="width:20px" @click="approve_i_tag(index)" >check</v-icon>
                                    <v-icon small style="width:20px" class="mr-1" @click="reject_i_tag(index)" >clear</v-icon>
                                      {{tag[0]}}
                                    <!-- Uncomment below to enable number of upvotes -->
                                    <!-- <v-avatar class="red darken-1 ml-0">-{{tag[1]}}</v-avatar> -->
                                </v-chip>
                                        </template>
                                        <span>
                                            <span v-if="current_resource.tags_map[tag[0]]==''">This tag has no description yet.</span>
                                            <span v-else>{{current_resource.tags_map[tag[0]]}}</span>
                                        </span>
                                    </v-tooltip>
                                </span>
                                
                            </v-flex>
                            <v-flex xs10  >
                                <span v-for="(tag, index) in current_resource.s_tags" :key="tag">
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                <v-chip  color="#B29126" class="black--text" v-on="on">
                                     <v-icon class="" small style="width:20px" @click="approve_s_tag(index)" >check</v-icon>
                                    <v-icon small style="width:20px" class="mr-1" @click="reject_s_tag(index)" >clear</v-icon>
                                    {{tag['tag']}}
                                    <!-- Uncomment below to enable number of upvotes -->
                                     <!-- <v-avatar class="amber ml-0">{{tag[1]}}</v-avatar>  --> 
                                </v-chip>
                                        </template>
                                        <span>
                                            <span v-if="tag['description']==''">This tag has no description yet.</span>
                                            <span v-else>{{tag['description']}}</span>
                                        </span>
                                    </v-tooltip>
<!-- .sort(Comparator) -->      </span>
                                
                            </v-flex>
                            <!-- <v-flex xs6></v-flex> -->
                            </v-layout>
                            <v-flex xs11 v-shortkey.avoid>

                                <v-autocomplete
                                
                                v-model="suggested_tags"
                                :search-input.sync="suggest_tag_search"
                                multiple
                                chips
                                deletable-chips
                                :items="tags"
                                color="blue-grey lighten-2"
                                label="Tag"
                                @input="suggest_tag"
                                @change="suggest_tag_search=''"
                                >
                            </v-autocomplete>
                            </v-flex>

                    </v-layout>

                    <!-- Type -->
                    <v-layout row wrap justify-start>
                            <div class="mr-5" xs12>
                            <h2 class="headline font-weight-medium"> <span id="moderationStep-2"> Type</span> 
                                <v-icon color="green darken-1" v-if="type_confirmed">done_all</v-icon>
                                <v-icon color="grey lighten-1" v-else>done</v-icon>
                            </h2>

                            <v-radio-group v-model="type" @change="type_confirmed=false">
                                <v-radio value="img">
                                <template slot="label" v-if="i_types.includes('img')">
                                    Image <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_type_to_score['img']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Image
                                </template>

                                </v-radio>

                                <v-radio value="gif">
                                <template slot="label" v-if="i_types.includes('gif')">
                                    Gif <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_type_to_score['gif']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Gif
                                </template>

                                </v-radio>

                                <v-radio value="web_video">
                                <template slot="label" v-if="i_types.includes('web_video')">
                                    WebM <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_type_to_score['web_video']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    WebM
                                </template>

                                </v-radio>

                                

                                <v-radio value="video">
                                <template slot="label" v-if="i_types.includes('video')">
                                    Video <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_type_to_score['video']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Video
                                </template>

                                </v-radio>


                            </v-radio-group>
                            <v-btn color="green lighten-1" class="white--text" @click="confirm_type" v-if="!type_confirmed">Confirm</v-btn>

                        </div>
                    <!-- </v-layout> -->
                    <!-- Orientation -->
                    <!-- <v-layout> -->
                        <div xs12 class="mr-5">
                            <h2 class="headline font-weight-medium"> Orientation
                                <v-icon color="green darken-1" v-if="orientation_confirmed">done_all</v-icon>
                                <v-icon color="grey lighten-1" v-else>done</v-icon>
                            </h2>

                            <v-radio-group v-model="orientation" @change="orientation_confirmed=false">
                                <v-radio value="straight">
                                <template slot="label" v-if="i_orientations.includes('straight')">
                                    Straight <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_orientation_to_score['straight']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Straight
                                </template>

                                </v-radio>

                                <v-radio value="gay">
                                <template slot="label" v-if="i_orientations.includes('gay')">
                                    Gay <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_orientation_to_score['gay']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Gay
                                </template>

                                </v-radio>

                                <v-radio value="lesbian">
                                <template slot="label" v-if="i_orientations.includes('lesbian')">
                                    Lesbian <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_orientation_to_score['lesbian']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Lesbian
                                </template>

                                </v-radio>


                                <v-radio value="trans">
                                <template slot="label" v-if="i_orientations.includes('trans')">
                                    Trans <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_orientation_to_score['trans']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Trans
                                </template>

                                </v-radio>

                                <v-radio value="solo-man">
                                <template slot="label" v-if="i_orientations.includes('solo-man')">
                                    Solo man <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_orientation_to_score['solo-man']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Solo man
                                </template>

                                </v-radio>

                                <v-radio value="solo-woman">
                                <template slot="label" v-if="i_orientations.includes('solo-woman')">
                                    Solo woman <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_orientation_to_score['solo-woman']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Solo woman
                                </template>

                                </v-radio>
                            </v-radio-group>
                            <v-btn color="green lighten-1" class="white--text" @click="confirm_orientation" v-if="!orientation_confirmed">Confirm</v-btn>

                        </div>
                    <!-- </v-layout> -->
                    <!-- Art -->
                    <!-- <v-layout> -->
                        <div xs12 >
                            <h2 class="headline font-weight-medium"> Art 
                                <v-icon color="green darken-1" v-if="art_confirmed">done_all</v-icon>
                                <v-icon color="grey lighten-1" v-else>done</v-icon>
                            </h2>
                            <v-radio-group v-model="art" @change="art_confirmed=false">
                                <v-radio value="real-life" >
                                <template slot="label" v-if="i_arts.includes('real-life')">
                                    Real-life <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_art_to_score['real-life']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Real-life
                                </template>

                                </v-radio>

                                <v-radio value="comic">
                                <template slot="label" v-if="i_arts.includes('comic')">
                                    Hentai <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_art_to_score['comic']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    Hentai
                                </template>

                                </v-radio>

                                <v-radio value="three-d">
                                <template slot="label" v-if="i_arts.includes('three-d')">
                                    3D <v-avatar size="24" class="green lighten-2 ml-3 white--text">{{i_art_to_score['three-d']}}</v-avatar>
                                </template>

                                <template slot="label" v-else>
                                    3D
                                </template>

                                </v-radio>

                            </v-radio-group>
                            <v-btn color="green lighten-1" class="white--text" @click="confirm_art" v-if="!art_confirmed">Confirm</v-btn>

                        </div>
                    </v-layout>

                    <!-- Actions -->
                    
                </v-flex>


            <v-layout>
                <!-- {{current_resource}}
                {{moderation_data}} -->
                <div v-if="moderation_data.missing[0]">
                    <h3 class="headline font-weight-thin">Note: this item is reported missing or as 'not porn'. <v-icon medium color="red">error</v-icon></h3>
                    
                </div>

                <div v-if="moderation_data.duplicate[0]">
                    <h3 class="headline font-weight-thin">Note: this item is reported as a duplicate. <v-icon medium color="red">error</v-icon></h3>
                </div>
            </v-layout>

            </v-layout>
            <v-layout>
                            <h2 class="headline font-weight-medium" id="moderationStep-3"> Actions  </h2>
            </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm8>
                            <v-btn v-shortkey.once="['s']" @shortkey="save()" color="primary" @click="save" :disabled="!save_validate"><v-icon left >save</v-icon> Save (s)</v-btn>                   
                            <v-btn color="primary" @click="remove('missing')" v-if="moderation_data.missing[0]"><v-icon left >help_outline</v-icon> Missing/Not porn</v-btn>                   
                            <v-btn color="primary" @click="remove('duplicate')" v-if="moderation_data.duplicate[0]"><v-icon left >file_copy</v-icon> Duplicate</v-btn>                   
                            <v-btn color="primary" @click="reset" v-shortkey.once="['r']" @shortkey="reset()"><v-icon left >refresh</v-icon> Reset (r)</v-btn>
                            <v-btn color="warning" v-shortkey.once="['x']" @shortkey="skip()" @click="skip"><v-icon left >skip_next</v-icon> Skip (x)</v-btn>
                        </v-flex>
                        <v-flex sm2 xs4>
                    <v-btn flat :href="current_resource.source" target="_blank" rel="noopener noreferrer" outline>
                        Source
                    </v-btn>
                        </v-flex>
                        <v-flex sm2 xs4>
                            <v-btn color="error" @click="remove('missing')" v-if="!moderation_data.missing[0]"><v-icon left >remove_circle_outline</v-icon> Report missing</v-btn>
                        </v-flex>
                    </v-layout>
        </v-container>
    </div>
    <div v-else-if="!current_resource && msg===''">
        <v-layout justify-center>
                <v-progress-circular
                :size="70"
                :width="7"
                color="#B29126"
                indeterminate
                class="mt-5"
                ></v-progress-circular>
        </v-layout>
        
    </div>
    <div v-else>
        <v-layout justify-center>
        <h2 class="headline font-weight-light mt-5"> {{msg}} </h2>
        </v-layout>
    </div>
</div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
// import { tags } from '@/data/tags'
import FilterPref from '@/components/infrastructure/FilterPref'

/**
 * @vuese
 * The main user moderation page, where users can moderate individual resources.
 * @group moderation
 */
export default {
    components:{FilterPref},
    data(){
        return{ //@vuese
            // List of all existing tags.
            tags:[], // @vuese
            // The current resource the user is viewing. 
            current_resource:null, // @vuese
            // The string in the tag search box for adding new tags, representing the tag the user is typing at the moment. 
            suggest_tag_search:'', // @vuese
            // The media type of the current resource [gif, video, webm, pic].
            media_type:null, // @vuese
            // The orientation of the current resource [straight, gay, lesbian, trans, solo...].
            orientation:null, // @vuese
            // The art type of the current resource [real-life, hentai, etc.].
            art:null, // @vuese
            // Not sure.
            type:null, // @vuese
            // The list of tags suggested to be added by the community.
            suggested_tags:[], // @vuese
            // Debug helper.
            msg:"", // @vuese
            // All the reporting data associated with this resource.
            moderation_data:null, // @vuese
            // A backup of the moderation data, in case the user resets it.
            moderation_backup:null, // @vuese
            // Back up of the resource for the reset.
            current_resource_backup:null, // @vuese
            // List of suggested tags which are upvoted by the users.
            good_tags: [], // @vuese
            // Deprecated.
            tag_input_value:'', // @vuese
            // Deprecated.
            extra_tags:[], // @vuese
            // Whether the user has confirmed the Art properties.
            art_confirmed:false, // @vuese
            // Whether the user has confirmed the Orientation properties.
            orientation_confirmed:false, // @vuese
            // Whether the user has confirmed the Media Type properties.
            type_confirmed:false, // @vuese
            
        }
    },
    methods:{ 
        //@vuese
        // Helper function to compare two values.
        Comparator(a, b) {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
        },
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        ...mapGetters('user',['getUser']),
        // @vuese
        // Set the resource data once it has been received from the server.
        set_resource(index){
            this.current_resource = index
            this.media_type = this.current_resource.type
            this.orientation = this.current_resource.orientation
            this.art = this.current_resource.art
        },
        // @vuese
        // Pull the resource data from the server.
        get_data(input){
            this.current_resource = false
            this.loading = true
            this.resources = null
            this.resources
            this.offset = 0
            this.page = 0
            let res = null
            let data = 0;
            this.msg = ''
            let self = this

            this.$axios.$get(this.get_endpoint(), this.get_headers())
                .then((res)=>{
                    if(res.resource){
                        if(this.getUser().tutorial.moderation_main){
                            this.$tours['moderation'].start()
                        }
                        self.resources = res.resource
                        self.moderation_data = res.moderation_data
                        self.moderation_backup = JSON.parse(JSON.stringify(res.moderation_data))  
                        self.current_resource_backup = JSON.parse(JSON.stringify(res.resource))  
                        // console.log(res.moderation_data)
                        self.set_resource(self.resources)
                        self.loading = false
                        self.set_tag_data()
                        self.set_art_data()
                        self.set_orientation_data()
                        self.set_type_data()
                    } else{
                        self.msg='Nothing to see here :)'

                    }
                })
                .catch((err)=>{
                    console.log(err)
                })

        },
        // @vuese
        // Reset all the data to how it was before the user made any changes.
        reset(){
            this.moderation_data = JSON.parse(JSON.stringify(this.moderation_backup))  
            this.current_resource = JSON.parse(JSON.stringify(this.current_resource_backup))  

            this.set_tag_data()
            this.set_art_data()
            this.set_orientation_data()
            this.set_type_data()
            // this.art_confirmed = false
            // this.orientation_confirmed = false
            // this.type_confirmed = false
        },
        // @vuese
        // Iterate over all tags from the moderation data and compare them with the data from the current resource.
        set_tag_data(){
            this.good_tags = []
            let i_tags = []
            for(let i_tag of this.moderation_data.i_tags){
                i_tags.push(i_tag[0])
            }

            // console.log(this.moderation_data.s_tags.sort(this.Comparator))

            for(let tag of this.current_resource.tags){
                if(!i_tags.includes(tag)){
                    this.good_tags.push(tag)
                }
            }

        },
        // @vuese
        // Set the art type data.
        set_art_data(){
            if(this.moderation_data.art.length == 0){
                this.art_confirmed = true
            } else{
                this.art_confirmed = false
            }
            this.art = this.resources.art
            this.i_art_to_score = {}
            this.i_arts = []
            for(let art of this.moderation_data.art){
                this.i_art_to_score[art[0]] = art[1]
                this.i_arts.push(art[0])
            }


        },
        // @vuese
        // Set the orientation type data.
        set_orientation_data(){
            if(this.moderation_data.orientation.length == 0){
                this.orientation_confirmed = true
            } else{
                this.orientation_confirmed = false

            }
            this.orientation = this.resources.orientation
            this.i_orientation_to_score = {}
            this.i_orientations = []
            for(let orientation of this.moderation_data.orientation){
                this.i_orientation_to_score[orientation[0]] = orientation[1]
                this.i_orientations.push(orientation[0])
            }


        },
        // @vuese
        // Set the media type data.
        set_type_data(){
            if(this.moderation_data.type.length == 0){
                this.type_confirmed = true
            } else{
                this.type_confirmed = false
            }
            this.type = this.resources.type
            this.i_type_to_score = {}
            this.i_types = []
            for(let type of this.moderation_data.type){
                this.i_type_to_score[type[0]] = type[1]
                this.i_types.push(type[0])
            }


        },
        // @vuese
        // Currently returns only `/api/moderate/`.
        get_endpoint(){
            if(this.isLoggedIn()){
                return '/api/moderate/'
            }else{
                return '/api/moderate/'
            }
        },
        // @vuese
        // Get the authorisation headers for the api calls.
        get_headers(){
            if(this.isLoggedIn()){
                return {headers:{Authorization : this.authenticationToken()}}
            }else{
                return {}
            }
        },
        // @vuese
        // Called when a user approves of a suggested inappropriate tag.
        approve_i_tag(index){
            let tag = this.moderation_data.i_tags[index][0]
            this.moderation_data.i_tags.splice(index,1)
            this.good_tags.push(tag)
        },
        // @vuese
        // Called when a user rejects a suggested inappropriate tag.
        reject_i_tag(index){
            let tag = this.moderation_data.i_tags[index]
            this.moderation_data.i_tags.splice(index,1)

        },
        // @vuese
        // Called when a user approves a suggested tag.
        approve_s_tag(index){
            // console.log(this.current_resource.s_tags[index]['tag'])
            let tag = this.current_resource.s_tags[index]['tag']
            if (this.current_resource.tags_map === undefined){
                this.current_resource.tags_map = {}
            }
            this.current_resource.tags_map[tag] = this.current_resource.s_tags[index]['description']
            this.good_tags.push(tag)
            this.current_resource.s_tags.splice(index,1)
            this.moderation_data.s_tags.splice(index,1)

        },
        // @vuese
        // Called when a user rejects a suggested tag.
        reject_s_tag(index){
            // let tag = this.moderation_data.s_tags[index]
            this.current_resource.s_tags.splice(index,1)
            this.moderation_data.s_tags.splice(index,1)
        },
        // @vuese
        // Remove tags from the list
        remove_tag(index){
            this.good_tags.splice(index,1)
        },
        // @vuese
        // Called when the user confirms the art type.
        confirm_art(){
            this.art_confirmed = true
        },
        // @vuese
        // Called when the user confirms the orientation.
        confirm_orientation(){
            this.orientation_confirmed = true
        },
        // @vuese
        // Called when the user confirms the media type.
        confirm_type(){
            this.type_confirmed = true
        },
        // @vuese
        // Called when a user suggests to delete the resource,.
        remove(reason){
            this.$axios.$post('/api/moderate/' + this.current_resource._id + '/delete/'+reason, null, this.get_headers())
            .then((res)=>{
                this.reset()
                this.get_data()
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        // @vuese
        // Called when the user is happy with the changes and saves the resource.
        save(){
            // this.current_resource['i_tags'] = []
            // this.current_resource['i_art'] = false
            // this.current_resource['i_orientation'] = false
            // this.current_resource['i_missing'] = false
            // this.current_resource['i_type'] = false
            if(this.save_validate){

                this.current_resource['suggested_tags'] = []
            this.current_resource.art = this.art
            this.current_resource.orientation = this.orientation
            this.current_resource.type = this.type
            this.current_resource.tags = this.good_tags
            this.$axios.$post('/api/moderate/' + this.current_resource._id + '/approve',{'resource': this.current_resource}, this.get_headers())
            .then((res)=>{
                this.reset()
                this.get_data()
                // console.log(res)

            })          
            .catch((err)=>{
                console.log(err)
            })
            } else{
                // console.log("Not yet done moderating.")
            }
        },
        // @vuese
        // Called when the user wants to skip this particular resource.
        skip(){
            this.$axios.$post('/api/moderate/' + this.current_resource._id + '/skip',{}, this.get_headers())   
            .then((res)=>{
                // console.log(res)
                this.get_data()
            })
            .catch((res)=>{
                console.log(err)
            })
        },
        // @vuese
        // Called when the user adds a new tag.
        suggest_tag(tag){
            if(!this.good_tags.includes(tag[0])){
                this.good_tags.push(tag[0])
            }
            this.suggested_tags = []
        },
        // @vuese
        // Called when the user wants to leave a reaction to resource.
        reaction(reaction){
            if(reaction==='like' && !this.current_resource.like){
                this.$set(this.current_resource,'like',true)
                this.$set(this.current_resource,'dislike',false)
                this.$set(this.current_resource,'favourite',false)
            } else if(reaction==='favourite' && !this.current_resource.favourite){
                this.$set(this.current_resource,'like',false)
                this.$set(this.current_resource,'dislike',false)
                this.$set(this.current_resource,'favourite',true)
            } else if(reaction==='dislike' && !this.current_resource.dislike){
                this.$set(this.current_resource,'like',false)
                this.$set(this.current_resource,'dislike',true)
                this.$set(this.current_resource,'favourite',false)
            } else if(reaction==='like' && this.current_resource.like===true){
                this.$set(this.current_resource,'like',false)
            } else if(reaction==='favourite' && this.current_resource.favourite===true){
                this.$set(this.current_resource,'favourite',false)
            } else if(reaction==='dislike' && this.current_resource.dislike===true){
                this.$set(this.current_resource,'dislike',false)
            }

          this.$axios.$post('/api/resource/single/' + this.current_resource._id + '/reaction/' + reaction, null, {headers:{Authorization : this.authenticationToken()}})
            .then((res)=>{
            })
            .catch((error)=>{
                contole.log(error)
            })
        
        },
    },
    created(){
        this.get_data()
        let h = {headers:{Authorization : this.authenticationToken()}}

      this.$axios.$get('/api/tag/existing/clean', h)
        .then((res)=>{
            // console.log(res.tags)
            // console.log(tags.data)
            this.tags = res.tags
            // console.log(this.search_items)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    computed:{
        get_good_tags(){
            return this.good_tags
        },
        tags_done(){
            if(this.moderation_data.s_tags.length==0 && this.moderation_data.i_tags.length==0){
                return true
            } else{
                return false
            }
        },
        save_validate(){
            return (this.moderation_data.s_tags.length==0 && this.moderation_data.i_tags.length==0) && this.art_confirmed && this.orientation_confirmed && this.type_confirmed
        }
    }
}

</script>

<style scoped>

</style>
