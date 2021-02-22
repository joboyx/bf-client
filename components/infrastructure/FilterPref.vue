<template>
    <div>
        

<v-container v-if="true" fill-height class="pa-2 hidden-md-and-up">

    <v-layout row wrap justify-center class="text-xs-center">
                <v-flex xs1 style="margin-top:-5px">
                                    <!-- Circle animation -->
                    <div class="marker" style="position:absolute;margin-top:28px; margin-left:14px" v-if="show_refresh && false">
                        <div class="pulse_0"></div>
                        <div class="pulse_1"></div>
                    </div>
                    <!-- fab -->
                    <v-btn v-if="show_refresh || true" 
                    icon
                    large
                    color="transparent" 
                    depressed 
                    @click="()=>{get_new_resource(true);save_preferences();filter_show=false}"
                    ><v-icon>refresh</v-icon></v-btn>
                </v-flex>
        <v-flex xs6 v-if="true">
            <v-btn @click="filter_show=!filter_show" flat>
            <v-icon>filter_list</v-icon>
            Filter
            </v-btn>
        </v-flex>
    </v-layout>
</v-container>


<v-container v-if="true" fill-height class="pa-2 hidden-sm-and-down" style="margin-top:-52px">
    <v-layout row wrap justify-end>
                <v-flex xs1 style="margin-top:-5px">
                                    <!-- Circle animation -->
                    <div class="marker" style="position:absolute;margin-top:28px; margin-left:12px" v-if="show_refresh">
                        <div class="pulse_0"></div>
                        <div class="pulse_1"></div>
                    </div>
                    <!-- fab -->
                    <v-btn v-if="show_refresh || true" 
                    icon
                    large
                    color="transparent" 
                    depressed 
                    @click="()=>{get_new_resource(true);save_preferences();filter_show=false}"
                    ><v-icon>refresh</v-icon></v-btn>
                </v-flex>
        <v-flex xs1 v-if="true">
            <v-btn @click="filter_show=!filter_show" flat>
            <v-icon>filter_list</v-icon>
            Filter                        

            </v-btn>
        </v-flex>

    </v-layout>
    
</v-container>
    <v-layout row wrap justify-center align-start v-if="filter_show">

        <v-flex xs12 md4 sm4 lg2 justify-center class="mt-4 pl-0">

            <v-layout justify-center> 


                <v-flex xs6>
                <p class="subtitle-1 text-uppercase font-weight-medium text-xs-center">Art style</p> 
            <v-divider></v-divider>
                </v-flex>
                </v-layout>
                
            
            <v-layout row v-for="(item, index) in art_styles" :key="index" justify-center style="background-color:">
                <v-flex xs6>
                    <v-layout row wrap align-center   width='100%' style="cursor:pointer" justify-end
                        @click="()=>{item.active=!item.active; set_refresh_true();}"
                    >

                        <v-flex xs6 class="pa-1">

                        <v-img 
                        v-if="!item.active"
                        :src="item.thumbnail"
                        contain 
                        style="margin:; cursor:pointer"
                        height="40px"
                        width="40px"
                        
                        ></v-img>
                    
                        <v-img 
                        v-if="item.active"
                        :src="item.thumbnail_clicked"
                        contain 
                        style="margin:; cursor:pointer"
                        height="40px"
                        width="40px"
                        ></v-img>
                        </v-flex>
                        <v-flex xs6 class="pa-0">

                        <span>{{item.label}}</span>
                        </v-flex>
                    </v-layout>
                    
                    
                    </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 md4 sm4 lg2 justify-center class="mt-4 pl-0">
            <v-layout justify-center> 
                <v-flex xs6>
                <p class="subtitle-1 text-uppercase font-weight-medium text-xs-center">Orientation</p> 
            <v-divider></v-divider>
                </v-flex>
                </v-layout>
                
            <v-layout row v-for="(item, index) in orientation_styles" :key="index" justify-center style="background-color:">
                <v-flex xs6>
                    <v-layout row wrap align-center   width='100%' style="cursor:pointer" justify-end
                        @click="()=>{item.active=!item.active; set_refresh_true()}"
                    >

                        <v-flex xs6 class="pa-1">

                        <v-img 
                        v-if="!item.active"
                        :src="item.thumbnail"
                        contain 
                        style="margin:; cursor:pointer"
                        height="40px"
                        width="40px"
                        
                        ></v-img>
                    
                        <v-img 
                        v-if="item.active"
                        :src="item.thumbnail_clicked"
                        contain 
                        style="margin:; cursor:pointer"
                        height="40px"
                        width="40px"
                        ></v-img>
                        </v-flex>
                        <v-flex xs6 class="pa-0">

                        <span>{{item.label}}</span>
                        </v-flex>
                    </v-layout>
                    
                    
                    </v-flex>
            </v-layout>
        </v-flex>


        <v-flex xs12 md4 sm4 lg2 justify-center class="mt-4 pl-0 pr-0">
            <v-layout justify-center> 
                <v-flex xs6>
                <p class="subtitle-1 text-uppercase font-weight-medium text-xs-center">Media type</p> 
            <v-divider></v-divider>
                </v-flex>
                </v-layout>
                
            <v-layout row v-for="(item, index) in media_types" :key="index" justify-center style="background-color:">
                <v-flex xs6>
                    <v-layout row wrap align-center   width='100%' style="cursor:pointer" justify-end
                        @click="()=>{item.active=!item.active; set_refresh_true()}"
                    >

                        <v-flex xs6 class="pa-1">

                        <v-img 
                        v-if="!item.active"
                        :src="item.thumbnail"
                        contain 
                        style="margin:; cursor:pointer"
                        height="40px"
                        width="40px"
                        
                        ></v-img>
                    
                        <v-img 
                        v-if="item.active"
                        :src="item.thumbnail_clicked"
                        contain 
                        style="margin:; cursor:pointer"
                        height="40px"
                        width="40px"
                        ></v-img>
                        </v-flex>
                        <v-flex xs6 class="pa-0">

                        <span>{{item.label}}</span>
                        </v-flex>
                    </v-layout>
                    
                    
                    </v-flex>
            </v-layout>

        </v-flex>
    </v-layout>
    </div>



</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

// This `FilterPref` component is only used in `moderation/ModerationAdmin.vue`. This the page where users can moderate resources. This components provides users the functionality to set preferences for the type of resources they see (media type, orientation, etc.). This same module is also available on all media pages (for example the recommended and top); however in these places this filter is already included in the component.
// @group infrastructure
export default {
    data(){
        return{ // @vuese
            // If this is true, the filter preferences will be expanded and visible to the user.
            filter_show:false, // @vuese
            // If this is true, then the refresh icon will start blinking. This is set to true once the user makes changes to their preferences.
            show_refresh: false,// @vuese
            // List of art styles, and their icon locations.
            art_styles:[
                    {type:"real-life", label:"Real-life", thumbnail:require('assets/images/type-real.png'), thumbnail_clicked:require('assets/images/type-real-clicked.png'), active:false},
                    {type:"comic", label:"Hentai", thumbnail:require('assets/images/type-draw.png'),thumbnail_clicked:require('assets/images/type-draw-clicked.png'), active:false},
                    {type:"three-d", label:"3D", thumbnail:require('assets/images/type-3d.png'),thumbnail_clicked:require('assets/images/type-3d-clicked.png'), active:false},

                ],// @vuese
            // List of orientations, and their icon locations.
            orientation_styles:[
                    {type:"straight", label:"Straight", thumbnail:require('assets/images/gender-straight.png'),thumbnail_clicked:require('assets/images/gender-straight-clicked.png'), active:false},
                    {type:"solo-woman", label:"Solo Woman", thumbnail:require('assets/images/solo-woman.png'),thumbnail_clicked:require('assets/images/solo-woman-clicked.png'), active:false},
                    {type:"lesbian", label:"Lesbian", thumbnail:require('assets/images/gender-lesbian.png'),thumbnail_clicked:require('assets/images/gender-lesbian-clicked.png'), active:false},
                    {type:"gay", label:"Gay", thumbnail:require('assets/images/gender-gay.png'),thumbnail_clicked:require('assets/images/gender-gay-clicked.png'), active:false},
                    {type:"solo-man", label:"Solo Man", thumbnail:require('assets/images/solo-man.png'),thumbnail_clicked:require('assets/images/solo-man-clicked.png'), active:false},
                    {type:"trans", label:"Trans", thumbnail:require('assets/images/gender-trans.png'),thumbnail_clicked:require('assets/images/gender-trans-clicked.png'), active:false},
                ],// @vuese
            // List of media types, and their icon locations.
            media_types:[
                    {type:"img", label:"Images", thumbnail:require('assets/images/media-img.png'),thumbnail_clicked:require('assets/images/media-img-clicked.png'), active:false},
                    {type:"gif", label:"Gifs", thumbnail:require('assets/images/media-gif.png'),thumbnail_clicked:require('assets/images/media-gif-clicked.png'), active:false},
                    {type:"web_video", label:"WebMs", thumbnail:require('assets/images/media-webm.png'),thumbnail_clicked:require('assets/images/media-webm-clicked.png'), active:false},
                    {type:"video", label:"Videos", thumbnail:require('assets/images/media-vid.png'),thumbnail_clicked:require('assets/images/media-vid-clicked.png'), active:false},
                ],
        }
    },
    created(){
        let self = this
        this.$axios.$get('/api/user',this.get_headers())
            .then((res)=>{

                self.art_styles=[
                    {type:"real-life", label:"Real-life", thumbnail:require('assets/images/type-real.png'), thumbnail_clicked:require('assets/images/type-real-clicked.png'), active:res.user.art.includes('real-life')},
                    {type:"comic", label:"Hentai", thumbnail:require('assets/images/type-draw.png'),thumbnail_clicked:require('assets/images/type-draw-clicked.png'), active:res.user.art.includes('comic')},
                    {type:"three-d", label:"3D", thumbnail:require('assets/images/type-3d.png'),thumbnail_clicked:require('assets/images/type-3d-clicked.png'), active:res.user.art.includes('three-d')},
                    {type:"other", label:"Other", thumbnail:require('assets/images/type-other.png'),thumbnail_clicked:require('assets/images/type-other-clicked.png'), active:res.user.art.includes('three-d')},

                ]

                self.orientation_styles=[
                    {type:"straight", label:"Straight", thumbnail:require('assets/images/gender-straight.png'),thumbnail_clicked:require('assets/images/gender-straight-clicked.png'), active:res.user.orientation.includes('straight')},
                    {type:"solo-woman", label:"Solo Woman", thumbnail:require('assets/images/solo-woman.png'),thumbnail_clicked:require('assets/images/solo-woman-clicked.png'), active:res.user.orientation.includes('solo-woman')},
                    {type:"lesbian", label:"Lesbian", thumbnail:require('assets/images/gender-lesbian.png'),thumbnail_clicked:require('assets/images/gender-lesbian-clicked.png'), active:res.user.orientation.includes('lesbian')},
                    {type:"gay", label:"Gay", thumbnail:require('assets/images/gender-gay.png'),thumbnail_clicked:require('assets/images/gender-gay-clicked.png'), active:res.user.orientation.includes('gay')},
                    {type:"solo-man", label:"Solo Man", thumbnail:require('assets/images/solo-man.png'),thumbnail_clicked:require('assets/images/solo-man-clicked.png'), active:res.user.orientation.includes('solo-man')},
                    {type:"trans", label:"Trans", thumbnail:require('assets/images/gender-trans.png'),thumbnail_clicked:require('assets/images/gender-trans-clicked.png'), active:res.user.orientation.includes('trans')},
                    {type:"other", label:"Other", thumbnail:require('assets/images/gender-other.png'),thumbnail_clicked:require('assets/images/gender-other-clicked.png'), active:res.user.orientation.includes('trans')},

                ]

                self.media_types=[
                    {type:"img", label:"Images", thumbnail:require('assets/images/media-img.png'),thumbnail_clicked:require('assets/images/media-img-clicked.png'), active:res.user.type.includes('img')},
                    {type:"gif", label:"Gifs", thumbnail:require('assets/images/media-gif.png'),thumbnail_clicked:require('assets/images/media-gif-clicked.png'), active:res.user.type.includes('gif')},
                    {type:"web_video", label:"WebMs", thumbnail:require('assets/images/media-webm.png'),thumbnail_clicked:require('assets/images/media-webm-clicked.png'), active:res.user.type.includes('web_video')},
                    {type:"video", label:"Videos", thumbnail:require('assets/images/media-vid.png'),thumbnail_clicked:require('assets/images/media-vid-clicked.png'), active:res.user.type.includes('video')},
                ]
            })
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        // @vuese
        // Set the `show_refresh` variable to true, so that the refresh icon starts blinking, indicating that the user has made changes to the preference and that a new resource should be pulled according to the new preferences.
        set_refresh_true(){
            this.show_refresh = true
        },
        // @vuese
        // Get the authorization headers from the vuex store for the http request (through axios). 
        get_headers(){
            if(this.isLoggedIn()){
                return {headers:{Authorization : this.authenticationToken()}}
            }else{
                return {}
            }
        },
        // @vuese
        // Push the new preferences to the server, so that they are stored in the user account. Once this is completed, the `this.$emit('get_new_resource')` event is fired. This signals to the `ModerationAdmin` that a new resource can be fetched.
        save_preferences(){
            this.$axios.$post('/api/user/preferences', this.get_body(), this.get_headers())
                .then(()=>{
                    // Signals to the `ModerationAdmin` that a new resource can be fetched.
                    this.$emit('get_new_resource')
                })
                .catch((err)=>{
                    
                })
        },
        // @vuese
        // Once the refresh button is hit, this function is called. Despite its name, it only turns off the blinking refresh icon.
        get_new_resource(){
            this.show_refresh = false
        },
        // @vuese
        // Format the body of the preferences, so that it can be sent to the server.
        get_body(){
            let art = []
            let media = []
            let orientation = []



            for(let i=0;i<this.art_styles.length;i++){
                if(this.art_styles[i].active){
                    art.push(this.art_styles[i].type)
                }
            }
            for(let i=0;i<this.media_types.length;i++){
                if(this.media_types[i].active){
                    media.push(this.media_types[i].type)
                }
            }
            for(let i=0;i<this.orientation_styles.length;i++){
                if(this.orientation_styles[i].active){
                    orientation.push(this.orientation_styles[i].type)
                }
            }

                return  {
                    "orientation": orientation,
                    "art": art,
                    "type": media,                    
                }

        }
    }
}
</script>
<style scoped>
.marker {
  margin: auto;
  width: 36px;
  height: 36px;
  position: absolute;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);

}
@-webkit-keyframes pulse {0%{-webkit-transform:scale(0.1,.1);opacity:0}50%{opacity:1}100%{-webkit-transform:scale(1.2,1.2);opacity:0}}

.marker .pulse_0 {
  border: 2px solid white;
  -webkit-border-radius: 40px;
  height: 36px;
  width: 36px;
  position: absolute;
  -webkit-animation: pulse 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  animation: pulse 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;

}

.marker .pulse_1 {
  border: 2px solid #212121;
  -webkit-border-radius: 40px;
  height: 36px;
  width: 36px;
  position: absolute;
  -webkit-animation: pulse 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  animation: pulse 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;

}

  .marker [class*=pulse_].pulse_1 {
  animation-delay: .3s;
  -webkit-animation-delay: .3s;
}
</style>