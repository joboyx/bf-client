<template>
<div>
    
<v-container v-if="true" fill-height class="pa-2 hidden-md-and-up">
        <BunnyLovePromo ref="blp"></BunnyLovePromo>
    <v-layout row wrap justify-center class="text-xs-center">

        <v-flex xs6 v-if="true">
            <v-btn @click="filter_show=!filter_show" flat >
            <v-icon id="mobileFilter">filter_list</v-icon>
            Filter
            </v-btn>
        </v-flex>
<!-- ['search', 'favourites', 'Like', 'seen', 'tags', ] -->
<!-- [favourites', 'Like', 'seen' ] -->
        <v-flex xs6 v-if="['favourites', 'Like', 'seen', 'Betterfap' ].includes(title)">
        <!-- <v-flex xs6 v-if="true"> -->
            <v-btn @click="toggleShuffle" flat v-if="!shuffle ">
            <v-icon>shuffle</v-icon>
            Shuffle
            </v-btn>

            <v-btn @click="toggleShuffle" flat v-else>
            <v-icon>reorder</v-icon>
            Unshuffle
            </v-btn>
        </v-flex>


    </v-layout>
</v-container>

<v-container v-if="true" fill-height class="pa-2 hidden-sm-and-down" >
    <v-layout row wrap justify-end style="margin-top:-60px">
        <v-flex xs1 v-if="true" >
            <v-btn @click="filter_show=!filter_show" flat >
            <v-icon id="landingStep-2">filter_list</v-icon>
            Filter                
            </v-btn>

        </v-flex>
        <!-- <v-flex xs1 v-if="true" class="ml-2"> -->
        <v-flex xs1 v-if="['favourites', 'Like', 'seen', 'Betterfap'  ].includes(title)" class="ml-2">
            <v-btn @click="toggleShuffle" flat v-if="!shuffle">
                <v-icon>shuffle</v-icon>
                Shuffle                        
            </v-btn>
            <v-btn @click="toggleShuffle" flat v-else>
                <v-icon>reorder</v-icon>
                Unshuffle                        
            </v-btn>
        </v-flex>
    </v-layout>
    
</v-container>


<v-container grid-list-xl fill-height fluid v-if="filter_show">

    <v-layout row wrap justify-center align-start >
    <v-flex xs10 offset-xs1 class="text-xs-start" v-if="false">
        <h1 class="headline font-weight-thin">Filter</h1>
    </v-flex>

        <v-flex xs10 sm10 md10 lg4 class="pr-0 mr-0">
              <!-- box -->
              <v-layout align-center>

                  <v-flex xs10>


<!-- 
            <multiselect v-model="categories" 
                        :taggable="true" 
                        :multiple="true" 
                        :options="genres" 
                        tag-position="bottom" 
                        tag-placeholder="This category does not exist"
                        :close-on-select="false"
                        :show-labels="true"
                        @input="set_refresh_true()"
                        placeholder="Select and combine categories"
                        ></multiselect> -->

            
            <multiselect v-model="categories" 
            v-if="show_filter_method()"
                    :options="category_items" 
                    group-values="items" 
                    group-label="sort"
                    :taggable="true" 
                    :multiple="true" 
                    :close-on-select="false"
                    :group-select="false" 
                    :show-labels="true"
                    placeholder="Combine categories and tags" 
                    @select="set_refresh_true();addFilterItem($event); "
                    @remove="set_refresh_true();removeFilterItem($event)"
                    @input="removeDups()"
                    >
                    <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                    <!-- @search-change="update_search_query" -->
                    </multiselect>

                  </v-flex>

                  <v-tooltip top>
                      <template  v-slot:activator="{ on }">

                    <v-flex xs1 v-if="seen_filter!=null && title!='Recommended'" v-on="on">

                    <!-- <v-img 
                        :src="require('assets/images/seen-white-clicked.png')"
                        style="margin:auto; cursor:pointer;"
                        height="40px"
                        width="40px"
                        contain
                        v-if="!seen_filter && night_mode"
                        @click="toggleSeenFilter"
                        ></v-img>


                    <v-img 
                        :src="require('assets/images/seen-white.png')"
                        style="margin:auto; cursor:pointer;"
                        height="40px"
                        width="40px"
                        contain
                        v-else-if="night_mode"
                        @click="toggleSeenFilter"
                        ></v-img> -->

                    <v-img 
                        :src="require('assets/images/seen-dark-clicked.png')"
                        style="margin:auto; cursor:pointer;"
                        height="40px"
                        width="40px"
                        contain
                        v-if="!seen_filter "
                        @click="toggleSeenFilter"
                        ></v-img>

                    <v-img 
                        :src="require('assets/images/seen-white-clicked.png')"
                        style="margin:auto; cursor:pointer;"
                        height="40px"
                        width="40px"
                        contain
                        v-else
                        @click="toggleSeenFilter"
                        ></v-img>

                    </v-flex>
                      </template>
                      <span v-if="seen_filter">Displaying seen items</span>
                      <span v-else>Not displaying seen items</span>
                  </v-tooltip>

                <v-flex xs1>
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
                    @click="()=>{reset(); loading=true;get_data(true);save_preferences();filter_show=!filter_show;}"
                    ><v-icon>refresh</v-icon></v-btn>
                </v-flex>

              </v-layout>

              <v-layout v-if="show_filter_method()">
                  
            <div v-if="star_categories.length==0 && star_tags.length == 0">
                You can star categories and tags <nuxt-link to="/cct"  style="color:inherit">here</nuxt-link>!
            </div>     
            <div v-else>

            <v-chip v-for="(item,index) in star_categories" :key='index + String(item)' @click="addStarCategory(item)" class="ml-3">
               <v-icon color="amber" small class="mr-1">star</v-icon> {{item}}
            </v-chip>
            <v-chip v-for="(item,index) in star_tags" :key='index + String(item)' @click="addStarTag(item)" class="ml-3">
               <v-icon color="amber" small class="mr-1">star</v-icon> {{item}}
            </v-chip>
            </div>
              </v-layout>

        </v-flex>


                        <!-- v-if="!item.active" -->

        <v-flex xs12 md4 sm4 lg2 justify-center class="mt-4 pl-0">

            <v-layout justify-center> 


                <v-flex xs6>
                <p class="subtitle-1 text-uppercase font-weight-medium text-xs-center">Art style</p> 
            <v-divider></v-divider>
                </v-flex>
                </v-layout>
                
            
            <v-layout row v-for="(item, index) in art_styles" :key="index + String(item)" justify-center style="background-color:">
                <v-flex xs6>
                    <v-layout row wrap align-center   width='100%' style="cursor:pointer" justify-end
                        @click="()=>{item.active=!item.active; if(!refresh){get_data()};;set_refresh_true()}"
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
                
            <v-layout row v-for="(item, index) in orientation_styles" :key="index + String(item)" justify-center style="background-color:">
                <v-flex xs6>
                    <v-layout row wrap align-center   width='100%' style="cursor:pointer" justify-end
                        @click="()=>{item.active=!item.active; if(!refresh){get_data()}; ;set_refresh_true()}"
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
                
            <v-layout row v-for="(item, index) in media_types" :key="index + String(item)" justify-center style="background-color:">
                <v-flex xs6>
                    <v-layout row wrap align-center   width='100%' style="cursor:pointer" justify-end
                        @click="()=>{item.active=!item.active; if(!refresh){get_data()}; ;set_refresh_true()}"
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


                    <v-btn class="ml-2 hidden-sm-and-up" v-if="show_refresh ||true" 
                    fab right top
                    color="transparent" 
                    depressed 
                    @click="()=>{if(refresh){reset();loading=true;get_data(true);save_preferences();filter_show=!filter_show}}"
                    ><v-icon>refresh</v-icon></v-btn>


    </v-layout>
    
</v-container>
    <v-layout justify-center>
    {{loading_message}}

    </v-layout>

    <!-- v-if="resources && getting_data && " --> 
    
    <ImageRow 
    :data="resources" 
    @seen="seen($event) " 
    @like="like($event)"
    @dislike="dislike($event)"
    @favourite="favourite($event)"
    v-if="resources.data.length > 0"
    :id='title'
    @get_more_data="get_more_data"
    :description="description"
    :tagline="tagline"
    :betterfap="betterfap"
    :no_first_card="no_first_card"
    ref="ir"
    ></ImageRow> 
        <v-layout justify-center v-if="loading" class="mt-5 mb-5">
            <v-progress-circular
            :size="70"
            :width="7"
            color="#B29126"
            indeterminate
            ></v-progress-circular>
        </v-layout>
        
        <v-layout justify-center v-if="loading && !resources && name==='Recommended'" class="mt-5">
        <Typer></Typer>
        </v-layout>


                    <v-btn
                class="hidden-xs-only"
              fixed
              dark
              fab
              bottom
              right
              color="#B29126"
              @click="scrollToTop"
              
            >
              <v-icon style="display: inline-flex !important;">arrow_upward</v-icon>
            </v-btn>


                    <v-btn
                class="hidden-sm-and-up"
              fixed
              dark
              fab
              bottom
              right
              small
              color="lime darken-3"
              
              @click="scrollToTop"
            >
              <v-icon style="display: inline-flex !important;"> arrow_upward</v-icon>
            </v-btn>

</div>
    


</template>

<script>
// import { genres } from '@/data/genres'
import ImageRow from '@/components/content/ImageRow'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Typer from '@/components/modules/Typer'
// import { categorization } from '@/data/search_items_sorted'
import BunnyLovePromo from '@/components/modules/BunnyLovePromo'



/**
 * @vuese
 * One of the major components. Shows a grid of resources, automatically fetches data from the server, and allows users to set filtering preferences.
 * @group Content
 */

export default {
    props:['title','data_endpoint', 'data_endpoint_auth', 'description', 'search', 'tagline', 'cats', 'tags_imported', 'betterfap', 'no_first_card', 'data', 'index'],
    mounted(){
        self = this

        window.onscroll = function(ev) {
        //if ((window.innerHeight + (document.documentElement.scrollTop)) >= (document.body.scrollHeight)) {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 500) {
            
        // you're at the bottom of the page
        self.get_more_data()
        self.data_lock+=1
        }
    };
    },
    data(){

        return {
            // @vuese
            // The description of the current page.
            name:this.description,
            // @vuese
            // Deprecated.
            show_filter: false,
            // @vuese
            // Whether the filter bar and additional preferences are visible.
            filter_show:false,
            // @vuese
            // List of pages for which filter options are not available.
            hide_filter_for:['Recommended', 'Explore'],
            // @vuese
            // List of resources sent by the server.
            resources:{data:[]},
            // @vuese
            // Deprecated. The media types available. 
            media_type: ['img', 'gif', 'web_video'],
            // @vuese
            // The user orientations.
            orientation : [],
            // @vuese
            // The user art preferences.
            art: [],
            // @vuese
            // List of resource ids which the user has already seen, so that we can grey it.
            seen_resources:[],
            // @vuese
            // Sent to the server to keep track of which resources are already sent.
            page:0,
            // @vuese
            // Whether the data is still being loaded.
            loading:true,
            // @vuese
            // The endpoint to fetch the data from. Used when the user wasn't logged in. Now there is no difference.
            endpoint_unauth: this.data_endpoint,
            // @vuese
            // The endpoint to fetch the data from. 
            endpoint_auth: this.data_endpoint_auth,
            // @vuese
            // Whether the user has submitted a search query.
            searching:false,
            // @vuese
            // The search string by the user.
            search_string: "",
            // @vuese
            // Deprecated.
            category_search:'',
            // @vuese
            // The tagline related to the page, shows on the first thumbnail.
            subtitle: this.tagline,
            // @vuese
            // List of categories selected by the user to be sent to the server.
            categories: this.cats || this.tags_imported || [],
            // @vuese
            // Deprecated.
            buffer: null,
            // @vuese
            // Whether the data is still loading.
            loading_data:false,
            // @vuese
            // Deprecated.
            loading_message:'',
            // @vuese
            // Whether data is being fetched from the server at the moment.
            getting_data:false,
            // @vuese
            // The data lock is used to coordinate fetching data from the server. If this is not 0, then no data will be fetched.
            data_lock:0,
            // @vuese
            // List of all resource ids
            all_ids: [],
            // @vuese
            // Deprecated.
            outstanding_server : [],
            // @vuese
            // Data from the server that we are echoing to make sure we receive the corrent resources.
            outstanding: [],
            // @vuese
            // List of resource ids seen by the user.
            seen_ids:[],
            // @vuese
            // Used for automatic refreshing. Currently the user has to manually refresh to avoid taxing the server.
            refresh:true,
            // @vuese
            // If true, then add a blinking icon to the refresh button to fetch new data. Is true when the user changes preferences.
            show_refresh:false,
            // @vuese
            // Deprecated.
            night_mode:true,
            // @vuese
            // Whether the user wants to view already seen resources or not.
            seen_filter:null,
            // @vuese
            // List of starred categories.
            star_categories:[],
            // @vuese
            // List of starred tags.
            star_tags : [],
            // @vuese
            // Whether the user wants to shuffle the order of the resources. Is used in the library.
            shuffle:false,
            // @vuese
            // List of categories.
            category_items:[],
            // @vuese
            // List of tags selected by the user to be sent to the server.
            searchTag:this.tags_imported || [],
            // @vuese
            // List of searchable categories.
            searchCat:this.cats || [],
            // @vuese
            // The user data.
            user:false,
            // @vuese
            // Whether the user has been redirected from the login page. (Old)
            from_home_page:false,
            // @vuese
            // List of art styles and their icons (for the preferences).
            art_styles:[
                    {type:"real-life", label:"Real-life", thumbnail:require('assets/images/type-real.png'), thumbnail_clicked:require('assets/images/type-real-clicked.png'), active:false},
                    {type:"comic", label:"Hentai", thumbnail:require('assets/images/type-draw.png'),thumbnail_clicked:require('assets/images/type-draw-clicked.png'), active:false},
                    {type:"three-d", label:"3D", thumbnail:require('assets/images/type-3d.png'),thumbnail_clicked:require('assets/images/type-3d-clicked.png'), active:false},
                    {type:"other", label:"Other", thumbnail:require('assets/images/type-other.png'),thumbnail_clicked:require('assets/images/type-other-clicked.png'), active:false},

                ],
            // @vuese
            // List of orientations and their icons (for the preferences).
            orientation_styles:[
                    {type:"straight", label:"Straight", thumbnail:require('assets/images/gender-straight.png'),thumbnail_clicked:require('assets/images/gender-straight-clicked.png'), active:false},
                    {type:"solo-woman", label:"Solo Woman", thumbnail:require('assets/images/solo-woman.png'),thumbnail_clicked:require('assets/images/solo-woman-clicked.png'), active:false},
                    {type:"lesbian", label:"Lesbian", thumbnail:require('assets/images/gender-lesbian.png'),thumbnail_clicked:require('assets/images/gender-lesbian-clicked.png'), active:false},
                    {type:"gay", label:"Gay", thumbnail:require('assets/images/gender-gay.png'),thumbnail_clicked:require('assets/images/gender-gay-clicked.png'), active:false},
                    {type:"solo-man", label:"Solo Man", thumbnail:require('assets/images/solo-man.png'),thumbnail_clicked:require('assets/images/solo-man-clicked.png'), active:false},
                    {type:"trans", label:"Trans", thumbnail:require('assets/images/gender-trans.png'),thumbnail_clicked:require('assets/images/gender-trans-clicked.png'), active:false},
                    {type:"other", label:"Other", thumbnail:require('assets/images/gender-other.png'),thumbnail_clicked:require('assets/images/gender-other-clicked.png'), active:false},
                ],
            // @vuese
            // List of media types and their icons (for the preferences).
            media_types:[
                    {type:"img", label:"Images", thumbnail:require('assets/images/media-img.png'),thumbnail_clicked:require('assets/images/media-img-clicked.png'), active:false},
                    {type:"gif", label:"Gifs", thumbnail:require('assets/images/media-gif.png'),thumbnail_clicked:require('assets/images/media-gif-clicked.png'), active:false},
                    {type:"web_video", label:"WebMs", thumbnail:require('assets/images/media-webm.png'),thumbnail_clicked:require('assets/images/media-webm-clicked.png'), active:false},
                    {type:"video", label:"Videos", thumbnail:require('assets/images/media-vid.png'),thumbnail_clicked:require('assets/images/media-vid-clicked.png'), active:false},
                ],
            // genres:genres.data,

        }
    },
    components:{ImageRow,Typer,BunnyLovePromo},
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
            // @vuese
            // Scroll to the top of the page.
        scrollToTop () {
            window.scrollTo({top: 0, behavior: 'smooth'});
        },
        // @vuese
        // Get the user preferences and format them for the front-end.
        async get_pref(type){
            // console.log("Getting art styles")
            let art = ''
            let x = await this.$axios.$get('api/user',this.get_headers())
                // .then((res)=>{
                //     if(res.success){
                //         art = res.user.art
                        
                //     }
                // })
                // .catch((err)=>{
                //     console.log(err)
                // })  


            if(type==='art'){
                let art = x.data.user.art
                this.art_styles=[
                    {type:"real-life", label:"Real-life", thumbnail:require('assets/images/type-real.png'), thumbnail_clicked:require('assets/images/type-real-clicked.png'), active:art.includes('real-life')},
                    {type:"comic", label:"Hentai", thumbnail:require('assets/images/type-draw.png'),thumbnail_clicked:require('assets/images/type-draw-clicked.png'), active:art.includes('comic')},
                    {type:"three-d", label:"3D", thumbnail:require('assets/images/type-3d.png'),thumbnail_clicked:require('assets/images/type-3d-clicked.png'), active:art.includes('three-d')},
                    {type:"other", label:"Other", thumbnail:require('assets/images/type-other.png'),thumbnail_clicked:require('assets/images/type-other-clicked.png'), active:art.includes('three-d')},

                ]
                return art_styles
            } else if (type==='orientation'){
                let orientation = x.data.user.orientation
                let orientation_styles=[
                    {type:"straight", label:"Straight", thumbnail:require('assets/images/gender-straight.png'),thumbnail_clicked:require('assets/images/gender-straight-clicked.png'), active:orientation.includes('straight')},
                    {type:"solo-woman", label:"Solo Woman", thumbnail:require('assets/images/solo-woman.png'),thumbnail_clicked:require('assets/images/solo-woman-clicked.png'), active:orientation.includes('solo-woman')},
                    {type:"lesbian", label:"Lesbian", thumbnail:require('assets/images/gender-lesbian.png'),thumbnail_clicked:require('assets/images/gender-lesbian-clicked.png'), active:orientation.includes('lesbian')},
                    {type:"gay", label:"Gay", thumbnail:require('assets/images/gender-gay.png'),thumbnail_clicked:require('assets/images/gender-gay-clicked.png'), active:orientation.includes('gay')},
                    {type:"solo-man", label:"Solo Man", thumbnail:require('assets/images/solo-man.png'),thumbnail_clicked:require('assets/images/solo-man-clicked.png'), active:orientation.includes('solo-man')},
                    {type:"trans", label:"Trans", thumbnail:require('assets/images/gender-trans.png'),thumbnail_clicked:require('assets/images/gender-trans-clicked.png'), active:orientation.includes('trans')},
                    {type:"other", label:"Other", thumbnail:require('assets/images/gender-other.png'),thumbnail_clicked:require('assets/images/gender-other-clicked.png'), active:orientation.includes('trans')},

                ]
            return orientation_styles
            } else if (type==='media'){
                let media = x.data.user.type
                let media_types=[
                    {type:"img", label:"Images", thumbnail:require('assets/images/media-img.png'),thumbnail_clicked:require('assets/images/media-img-clicked.png'), active:media.includes('img')},
                    {type:"gif", label:"Gifs", thumbnail:require('assets/images/media-gif.png'),thumbnail_clicked:require('assets/images/media-gif-clicked.png'), active:media.includes('gif')},
                    {type:"web_video", label:"WebMs", thumbnail:require('assets/images/media-webm.png'),thumbnail_clicked:require('assets/images/media-webm-clicked.png'), active:media.includes('web_video')},
                    {type:"video", label:"Videos", thumbnail:require('assets/images/media-vid.png'),thumbnail_clicked:require('assets/images/media-vid-clicked.png'), active:media.includes('web_video')},
                ]
            return media_types
            }
        },
            // @vuese
            // Flush the data.
        reset(){
            this.resources = {data:[]}
        },
            // @vuese
            // Sets the refresh icon to true, so that the user can fetch new data.
        set_refresh_true(){
            // console.log("CHANGING CATEGORY")
            this.show_refresh = true
        },
            // @vuese
            // Push a new category to the user's list of categories to send to the server, so that data for this category is fetched.
        pushcat(t){
            this.categories.push(t)
        },
            // @vuese
            // Logging function for degugging.
        log(){
            console.log("test")
        },
            // @vuese
            // Returns whether the filter option should be visible or not.
        show_filter_method(){
            if(this.hide_filter_for.includes(this.title)){
                return false
            }else{
                return true
            }
        },
            // @vuese
            // Toggle the seen icon.
        toggleSeenFilter(){
            this.seen_filter = !this.seen_filter
            this.save_preferences();
            this.show_refresh = true

        },
            // @vuese
            // Toggle the shuffle button.
        toggleShuffle(){
            this.shuffle = !this.shuffle
            this.reset()
            this.get_data()
        },
            // @vuese
            // Get data from the server for the first time, when the page loads.
        get_data(reset_blocked=false){
            this.outstanding = []
            this.getting_data = true
            this.seen_ids = []

            this.page = 0
            let res = null
            let data = 0;
            let self = this
            this.category_search = ''
            this.show_refresh = false

            // console.log("Getting data")

            this.$axios.$post(this.get_endpoint(), this.get_body(), this.get_headers())
                .then((res)=>{
                    // console.log(res)
                    if(res.data.length>0){
                        self.loading_message = ''
                        if(self.resources.data.length > 0){
                            for (let item of res.data){
                                self.resources.data.splice(-1,0,item)
                            }
                        }else{
                            self.resources = {data:res.data}
                        }
                        self.loading = false
                        

                        if(res.outstanding){
                                self.outstanding = res.outstanding
                        }

                        // self.outstanding_server = res.outstanding
                        for(let x of res.data){
                            self.all_ids.push(x._id)
                        }

                        if (document.body.scrollHeight === window.innerHeight){
                            //Uncomment if shit breaks
                            //self.data_lock=0
                            //self.get_more_data()
                        }

                        self.data_lock = 0


                    }           
                    else{
                        self.loading = false
                        self.loading_message = 'Unfortunately there are no results to your search query :('
                    self.data_lock = 0
                    }

                })
                .catch((err)=>{
                    console.log(err)
                })

        },
            // @vuese
            // Get more data from the server, as soon as the bottom of the page is hit.
        get_more_data(){
            //this.loading_data = true
            //this.resources = {data: this.resources.data.concat(this.buffer)}
            //this.buffer = null

            if(this.data_lock===0){
            // console.log("Getting more data")
            this.$bus.$emit('getting_more_data')

            this.data_lock = +1
            this.loading = true

                this.page+=1
                // console.log(this.page)
                let self = this
                // console.log("Getting more data")
                this.$axios.$post(this.get_endpoint(), this.get_body(), this.get_headers())
                    .then((res)=>{
                        if(res.data.length>0){

                            // for(let x of res.data){
                            //     if(!self.resources.data.includes(x)){
                            //         self.resources.data.push(x)
                            //     }
                            // }

                            for(let x of res.data){
                                // if(self.all_ids.includes(x._id)){
                                //     console.log("DUPLICATE")

                                // }else{
                                    self.all_ids.push(x._id)
                                // }
                            }

                            if(res.outstanding){
                                self.outstanding = res.outstanding
                            }

                            self.resources = {data: self.resources.data.concat(res.data)}
                            self.data_lock = 0
                            // self.outstanding_server = res.outstanding

                        } else{
                                // End of data stream
                                this.$bus.$emit('data_end')
                            }
                        //self.buffer = res.data
                        //this.loading_data = false
                        self.loading = false
                        // self.data_lock = 0

                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                
            }

        },
            // @vuese
            // Saves the user preferences.
        save_preferences(){
            // console.log("save")
            this.$axios.$post('/api/user/preferences', this.get_body(), this.get_headers())
                .catch((err)=>{
                    
                })
        },
            // @vuese
            // Add a category to the preferences from the starred list of categories.
        addStarCategory(category){
            if(this.user.tier===0){
                this.$refs.blp.open_dialog()
            } else{
                if(!this.categories.includes(category)){
                    this.categories.push(category)
                    this.searchCat.push(category)
                    this.set_refresh_true()
    
                }
            }

            // this.star_categories.splice(this.star_categories.indexOf(category),1)
        },
            // @vuese
            // Add a tag to the preferences from the starred list of tags.
        addStarTag(tag){
            if(this.user.tier===0){
                this.$refs.blp.open_dialog()
            } else{
                if(!this.categories.includes(tag)){
                    this.categories.push(tag)
                    this.searchTag.push(tag)

                    this.set_refresh_true()
                }
            }

            // this.star_categories.splice(this.star_categories.indexOf(category),1)
        },
            // @vuese
            // Get the api enpoint.
        get_endpoint(){
            if(this.isLoggedIn()){
                return this.endpoint_auth
            }else{
                return this.endpoint_unauth
            }
        },
            // @vuese
            // Get the api endpont body data; namely, the preferences, and paging data.
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

            let res = {}
            let offset_list = ['Explore', 'Recommended', 'Betterfap', 'New', 'Top', 'tags', 'search', 'channels']
            if(this.shuffle || this.from_home_page || offset_list.includes(this.title)){
                if(this.outstanding.length === 0){
                    this. outstanding = this.get_outstanding()
                }
                return  {
                    "index":this.page, 
                    "orientation": orientation,
                    "art": art,
                    "type": media,
                    "categories":this.searchCat,
                    "tags":this.searchTag,
                    // "outstanding":this.outstanding_server
                    "outstanding":this.outstanding,
                    "display_seen":this.seen_filter
                    // "outstanding":outstanding
                    
                }
                this.outstanding = this.all_ids
            }else{
                return {
                    "index":this.page, 
                    "orientation": orientation,
                    "art": art,
                    "type": media,
                    "tags":this.searchTag,
                    "categories":this.searchCat,
                    // "outstanding":this.outstanding_server
                    "display_seen":this.seen_filter
                    // "outstanding":outstanding
                    
                }
            }





        // return res
        },
            // @vuese
            // Get api endpoint authorisation headers.
        get_headers(){
            if(this.isLoggedIn()){
                return {headers:{Authorization : this.authenticationToken()}}
            }else{
                return {headers:{Authorization : this.authenticationToken()}}
            }
        },
            // @vuese
            // Gets list of resources already sent by the server, which the user has not yet seen. 
        get_outstanding(){
            let res = []
            for(let x of this.resources.data){
                if(!this.seen_ids.includes(x._id)){
                    res.push(x._id)
                }
            }
            // console.log(res)

            // for(let x of this.resources.data){
            //     res.push(x._id)
            // }
            return res
        },
            // @vuese
            // Called if the sees a resource.
        seen(index){
            if(this.resources.data[index].seen != true){
                this.seen_ids.push(this.resources.data[index]._id)
                // console.log(this.resources.data[index]._id)
                if(!this.seen_resources.includes(index)){
                    this.seen_resources.push(index)
                }
            this.$set(this.resources.data[index], 'seen', true)
            }

        },
            // @vuese
            // Called if the user likes a resource.
        like(index){
            if(this.resources.data[index].like){
                this.resources.data[index].like = false
            }else{
                this.resources.data[index].like = true
                this.resources.data[index].dislike = false
                this.resources.data[index].favourite = false
            }
        },
            // @vuese
            // Called if the user dislikes a resource.
        dislike(index){
            if(this.resources.data[index].dislike){
                this.resources.data[index].dislike = false
            }else{
                this.resources.data[index].dislike = true
                this.resources.data[index].like = false
                this.resources.data[index].favourite = false

            }
        },
            // @vuese
            // Called if the user favourites a resource.
        favourite(index){
            if(this.resources.data[index].favourite){
                this.resources.data[index].favourite = false
            }else{
                this.resources.data[index].favourite = true
                this.resources.data[index].like = false
                this.resources.data[index].dislike = false

            }
        },
            // @vuese
            // Called when the user searches for something in the preferences.
        search(input){
            if(input===null || input===''){
                this.subtitle = this.tagline
                this.searching = false
                this.name = this.description
                if(this.isLoggedIn()){
                    this.endpoint_auth = this.data_endpoint_auth
                }else{
                    this.endpoint_unauth = this.data_endpoint
                }
            }else{
                this.subtitle = input
                this.name = "Searching"
                this.searching = true
                //Change this once the endpoints are known
                if(this.isLoggedIn()){
                    this.endpoint_auth = this.data_endpoint_auth
                }else{
                    this.endpoint_unauth = this.data_endpoint
                }
            }
            this.get_data()
        },
            // @vuese
            // Called when the user adds an item from the dropdown menu in the filter preferences.
        addFilterItem(item){

            if(this.category_items[1].items.includes(item)){
                this.searchTag.push(item)
            } else{
                this.searchCat.push(item)
                
            }
        },
            // @vuese
            // Removes any duplicate categories the user tries to add.
        removeDups() {
            // console.log("Removing dupes")
            this.categories = [...new Set(this.categories)];            
            // console.log(this.categories)

        },
            // @vuese
            // Removes an item from the user selected items from the dropdown menu in the filter preferences.
        removeFilterItem(item){
            if(this.category_items[1].items.includes(item)){
                this.searchTag.splice(this.searchTag.indexOf(item),1)
            } else{
                this.searchCat.splice(this.searchCat.indexOf(item),1)
                
            }
        },
            // @vuese
            // Removes a category from the user selected items from the dropdown menu in the filter preferences.
        remove_category(item){
            const index = this.categories.indexOf(item)
            if (index >= 0) this.categories.splice(index, 1)
            if(!this.refresh){
                this.get_data()
            }
        },
            // @vuese
            // Opens the theatre.
        openTheatre(i){
            setTimeout(() => this.$refs.ir.lightbox(i), 0);
            
        }
        
    },
    created(){ 
        let self = this
        this.$bus.on('user', function(arg){
            self.user = arg
        })

        this.$bus.emit('get_user')

        if('data' in this.$route.params){
            this.from_home_page = true
            this.resources['data'] = this.$route.params.data
            this.openTheatre(this.$route.params.index)
            for (let item of this.resources['data']){
                this.outstanding.push(item._id)
            }
            this.loading = false
            this.getting_data = true
            this.data_lock = 1
        }

        this.$axios.$get('/api/user',this.get_headers())
            .then((res)=>{
                if(res.success){
                    self.art = res.user.art
                    self.orientation = res.user.orientation
                    self.type = res.user.type
                    self.seen_filter = res.user.display_seen
                    self.star_categories = res.user.star_categories
                    self.star_tags = res.user.star_tags

                    for(let i=0;i<self.art_styles.length;i++){
                        if(res.user.art.includes(self.art_styles['type'])){
                            self.art_styles['active'] = true
                        }
                    }

                    for(let i=0;i<self.orientation_styles.length;i++){
                        if(res.user.orientation.includes(self.orientation_styles['type'])){
                            self.orientation_styles['active'] = true
                        }
                    }

                    for(let i=0;i<self.media_types.length;i++){
                        if(res.user.type.includes(self.media_types['type'])){
                            self.media_types['active'] = true
                        }
                    }

                }

                self.art_styles=[
                    {type:"real-life", label:"Real-life", thumbnail:require('assets/images/type-real.png'), thumbnail_clicked:require('assets/images/type-real-clicked.png'), active:res.user.art.includes('real-life')},
                    {type:"comic", label:"Hentai", thumbnail:require('assets/images/type-draw.png'),thumbnail_clicked:require('assets/images/type-draw-clicked.png'), active:res.user.art.includes('comic')},
                    {type:"three-d", label:"3D", thumbnail:require('assets/images/type-3d.png'),thumbnail_clicked:require('assets/images/type-3d-clicked.png'), active:res.user.art.includes('three-d')},
                    {type:"other", label:"Other", thumbnail:require('assets/images/type-other.png'),thumbnail_clicked:require('assets/images/type-other-clicked.png'), active:res.user.art.includes('other')},

                ]

                self.orientation_styles=[
                    {type:"straight", label:"Straight", thumbnail:require('assets/images/gender-straight.png'),thumbnail_clicked:require('assets/images/gender-straight-clicked.png'), active:res.user.orientation.includes('straight')},
                    {type:"solo-woman", label:"Solo Woman", thumbnail:require('assets/images/solo-woman.png'),thumbnail_clicked:require('assets/images/solo-woman-clicked.png'), active:res.user.orientation.includes('solo-woman')},
                    {type:"lesbian", label:"Lesbian", thumbnail:require('assets/images/gender-lesbian.png'),thumbnail_clicked:require('assets/images/gender-lesbian-clicked.png'), active:res.user.orientation.includes('lesbian')},
                    {type:"gay", label:"Gay", thumbnail:require('assets/images/gender-gay.png'),thumbnail_clicked:require('assets/images/gender-gay-clicked.png'), active:res.user.orientation.includes('gay')},
                    {type:"solo-man", label:"Solo Man", thumbnail:require('assets/images/solo-man.png'),thumbnail_clicked:require('assets/images/solo-man-clicked.png'), active:res.user.orientation.includes('solo-man')},
                    {type:"trans", label:"Trans", thumbnail:require('assets/images/gender-trans.png'),thumbnail_clicked:require('assets/images/gender-trans-clicked.png'), active:res.user.orientation.includes('trans')},
                    {type:"other", label:"Other", thumbnail:require('assets/images/gender-other.png'),thumbnail_clicked:require('assets/images/gender-other-clicked.png'), active:res.user.orientation.includes('other')},

                ]

                self.media_types=[
                    {type:"img", label:"Images", thumbnail:require('assets/images/media-img.png'),thumbnail_clicked:require('assets/images/media-img-clicked.png'), active:res.user.type.includes('img')},
                    {type:"gif", label:"Gifs", thumbnail:require('assets/images/media-gif.png'),thumbnail_clicked:require('assets/images/media-gif-clicked.png'), active:res.user.type.includes('gif')},
                    {type:"web_video", label:"WebMs", thumbnail:require('assets/images/media-webm.png'),thumbnail_clicked:require('assets/images/media-webm-clicked.png'), active:res.user.type.includes('web_video')},
                    {type:"video", label:"Videos", thumbnail:require('assets/images/media-vid.png'),thumbnail_clicked:require('assets/images/media-vid-clicked.png'), active:res.user.type.includes('video')},
                ]
                    self.get_data()
            })
            .catch((err)=>{
                console.log(err)
            })



        this.$axios.$get('/api/tag/existing/search', this.get_headers())
            .then((res)=>{
                res.data.splice(2,1)
                this.category_items = res.data
            })
            .catch((err)=>{
                console.log(err)
            })
    },
    computed:{
        get_resources(){  
            return this.resources
        }
    },
    watch:{

    },
    beforeDestroy(){
        window.onscroll = function(ev) {
        return false
    };
    }
    
}
</script>

<style scoped>
.clicked {
   padding:10px;
   border:1px solid blue;
}

.underline {
  text-decoration: underline;
}

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

.v-btn--floating .v-icon {
    height: inherit;
    width: inherit;
}
</style>
