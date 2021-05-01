<template>
<div>

<v-container v-if="true" fill-height class="pa-2 hidden-md-and-up" >
    <v-layout row wrap justify-end  class="text-xs-center mt-3">
        <v-flex xs6 sm3 v-if="title==='store'" >
                    <v-select
                    v-model="current_sort"
                :items="sort_by"
                label="Sort by"
                solo
                background-color=""
                dense
                style="width:140px"
                flat
                color='#B29126'
                @change="get_data()"
                id="mobileSelectFlix"
                ></v-select>
        </v-flex>

        <v-flex xs6 sm3 v-if="title==='store'">

            <v-btn @click="filter_show=!filter_show" flat>
            <v-icon>filter_list</v-icon>
            Filter
            </v-btn>
        </v-flex>
        <v-flex xs6 v-else>

            <v-btn @click="filter_show=!filter_show" flat>
            <v-icon>filter_list</v-icon>
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


<v-container v-if="true" fill-height class="pa-2 hidden-sm-and-down" style="margin-top:-55px">
    <v-layout row wrap justify-end style="">
        <v-flex xs2 v-if="title==='store'" class="mr-">
                <v-select
                    v-model="current_sort"
                :items="sort_by"
                solo
                label="Sort by"
                background-color=""
                dense
                flat
                style="width:140px"
                color='#B29126'
                @change="get_data()"
                id="flixStep-2"
                ></v-select>
        </v-flex>
        
        <v-flex xs1 v-if="true">

            <v-btn @click="filter_show=!filter_show" flat>
            <v-icon>filter_list</v-icon>
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
                    @click="()=>{get_data(true);save_preferences();}"
                    ><v-icon>refresh</v-icon></v-btn>
                </v-flex>

              </v-layout>

              <v-layout>
                  
            <div v-if="star_categories.length==0 && star_tags.length == 0">
                You can star categories and tags <nuxt-link to="/cct"  style="color:inherit">here</nuxt-link>!
            </div>     
            <div v-else>

            <v-chip v-for="(item,index) in star_categories" :key='index' @click="addStarCategory(item)" class="ml-3">
               <v-icon color="amber" small class="mr-1">star</v-icon> {{item}}
            </v-chip>
            <v-chip v-for="(item,index) in star_tags" :key='index' @click="addStarTag(item)" class="ml-3">
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
                
            
            <v-layout row v-for="(item, index) in art_styles" :key="index" justify-center style="background-color:">
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
                
            <v-layout row v-for="(item, index) in orientation_styles" :key="index" justify-center style="background-color:">
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
                
            <v-layout row v-for="(item, index) in media_types" :key="index" justify-center style="background-color:">
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
                    @click="()=>{if(refresh){get_data(true);save_preferences();}}"
                    ><v-icon>refresh</v-icon></v-btn>


    </v-layout>
    
</v-container>
    <v-layout justify-center>
    {{loading_message}}

    </v-layout>
        <FlickRow v-if="resources.length > 0"
         :flix='resources' 
         @delete="delete_flick_item"
         :title='title'
        ></FlickRow>

    <!-- v-if="resources" --> 
        <v-layout justify-center v-if="loading" class="mt-5 mb-5">
            <v-progress-circular
            :size="70"
            :width="7"
            color="#B29126"
            indeterminate
            ></v-progress-circular>
        </v-layout>
<!--         
        <v-layout justify-center v-if="loading && !resources && name==='Recommended'" class="mt-5">
        <Typer></Typer>
        </v-layout> -->


                    <v-btn
                class="hidden-xs-only"
              fixed
              dark
              fab
              bottom
              right
              color="lime darken-3"
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
              <v-icon  style="display: inline-flex !important;">arrow_upward</v-icon>
            </v-btn>
        <BunnyLovePromo ref="blp"></BunnyLovePromo>
</div>
    


</template>

<script>
// import { genres } from '@/data/genres'
import ImageRow from '@/components/content/ImageRow'
import FlickRow from '@/components/content/FlickRow'
import axios from 'axios'
import { mapGetters } from 'vuex'
// import { categorization } from '@/data/search_items_sorted'
import BunnyLovePromo from '@/components/modules/BunnyLovePromo'

/**
 * @vuese
 * Shows a list of flix; see `components/content/Media.vue` for similar functionality and documentation.
 * @group Content
 */
export default {
    props:['title','data_endpoint', 'data_endpoint_auth', 'description', 'search', 'tagline', 'cats', 'tags_imported', 'betterfap'],
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
            name:this.description,
            show_filter: false,
            filter_show:false,
            resources:[],
            media_type: ['img', 'gif', 'web_video'],
            orientation : [],
            art: [],
            seen_resources:[],
            page:0,
            loading:true,
            endpoint_unauth: this.data_endpoint,
            endpoint_auth: this.data_endpoint_auth,
            searching:false,
            search_string: "",
            category_search:'',
            subtitle: this.tagline,
            categories: this.cats || this.tags_imported || [],
            // genres:genres.data,
            buffer: null,
            loading_data:false,
            loading_message:'',
            getting_data:false,
            data_lock:0,
            cluster_counts: null,
            all_ids: [],
            outstanding_server : [],
            outstanding: [],
            seen_ids:[],
            refresh:true,
            show_refresh:false,
            night_mode:true,
            seen_filter:null,
            star_categories:[],
            star_tags : [],
            shuffle:false,
            category_items:[],
            searchTag:this.tags_imported || [],
            searchCat:this.cats || [],
            user:false,
            art_styles:[
                    {type:"real-life", label:"Real-life", thumbnail:require('assets/images/type-real.png'), thumbnail_clicked:require('assets/images/type-real-clicked.png'), active:false},
                    {type:"comic", label:"Hentai", thumbnail:require('assets/images/type-draw.png'),thumbnail_clicked:require('assets/images/type-draw-clicked.png'), active:false},
                    {type:"three-d", label:"3D", thumbnail:require('assets/images/type-3d.png'),thumbnail_clicked:require('assets/images/type-3d-clicked.png'), active:false},
                    {type:"other", label:"Other", thumbnail:require('assets/images/type-other.png'),thumbnail_clicked:require('assets/images/type-other-clicked.png'), active:false},

                ],
            orientation_styles:[
                    {type:"straight", label:"Straight", thumbnail:require('assets/images/gender-straight.png'),thumbnail_clicked:require('assets/images/gender-straight-clicked.png'), active:false},
                    {type:"solo-woman", label:"Solo Woman", thumbnail:require('assets/images/solo-woman.png'),thumbnail_clicked:require('assets/images/solo-woman-clicked.png'), active:false},
                    {type:"lesbian", label:"Lesbian", thumbnail:require('assets/images/gender-lesbian.png'),thumbnail_clicked:require('assets/images/gender-lesbian-clicked.png'), active:false},
                    {type:"gay", label:"Gay", thumbnail:require('assets/images/gender-gay.png'),thumbnail_clicked:require('assets/images/gender-gay-clicked.png'), active:false},
                    {type:"solo-man", label:"Solo Man", thumbnail:require('assets/images/solo-man.png'),thumbnail_clicked:require('assets/images/solo-man-clicked.png'), active:false},
                    {type:"trans", label:"Trans", thumbnail:require('assets/images/gender-trans.png'),thumbnail_clicked:require('assets/images/gender-trans-clicked.png'), active:false},
                    {type:"other", label:"Other", thumbnail:require('assets/images/gender-other.png'),thumbnail_clicked:require('assets/images/gender-other-clicked.png'), active:false},
                ],
            media_types:[
                    {type:"img", label:"Images", thumbnail:require('assets/images/media-img.png'),thumbnail_clicked:require('assets/images/media-img-clicked.png'), active:false},
                    {type:"gif", label:"Gifs", thumbnail:require('assets/images/media-gif.png'),thumbnail_clicked:require('assets/images/media-gif-clicked.png'), active:false},
                    {type:"web_video", label:"WebMs", thumbnail:require('assets/images/media-webm.png'),thumbnail_clicked:require('assets/images/media-webm-clicked.png'), active:false},
                    {type:"video", label:"Videos", thumbnail:require('assets/images/media-vid.png'),thumbnail_clicked:require('assets/images/media-vid-clicked.png'), active:false},
                ],
            sort_by: ['Top', 'New', 'Most sold', 'Price high', 'Price low', 'Random', 'Long', 'Short'],
            current_sort:"Top"
        }
    },
    components:{ImageRow, FlickRow,BunnyLovePromo},
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'getUser']),
        scrollToTop () {
            window.scrollTo({top: 0, behavior: 'smooth'});
        },
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
        set_refresh_true(){
            // console.log("CHANGING CATEGORY")
            this.show_refresh = true
        },
        pushcat(t){
            this.categories.push(t)
        },
        log(){
            console.log("test")
        },
        toggleSeenFilter(){
            this.seen_filter = !this.seen_filter
            this.save_preferences();
            this.show_refresh = true
            // if(this.isLoggedIn()){
            //     console.log("Setting seen")
            //     this.$axios.$post('/api/user/preferences', {display_seen:this.seen_filter}, this.get_headers())
            // }
        },
        toggleShuffle(){
            this.shuffle = !this.shuffle
            this.get_data()
        },
        get_data(reset_blocked=false){
            // console.log("Getting data")
            this.outstanding = []
            this.getting_data = true
            this.seen_ids = []
            this.loading = true
            this.resources = []
            this.page = 0
            let res = null
            let data = 0;
            let self = this
            this.category_search = ''
            this.show_refresh = false

            this.cluster_counts = null
            // console.log(this.get_endpoint())
            this.$axios.$post(this.get_endpoint(), this.get_body(), this.get_headers())
                .then((res)=>{
                    // console.log(this.get_endpoint())
                    // console.log(res)
                    if(res.flix_list.length > 0){
                        if(this.getUser().tutorial.flix){
                            if(document.documentElement.clientWidth < 960){
                                document.getElementById('flixStep-2').id = 'desktopSelectFlix'
                                document.getElementById('mobileSelectFlix').id = 'flixStep-2'
                                 this.$tours['flix'].start()

                            } else{
                                this.$tours['flix'].start()
                            }
                            
                        }

                        self.loading_message = ''
                        self.resources = res.flix_list || res.data
                        self.loading = false
                        self.cluster_counts = res.counts
                        
                        // if(res.outstanding != null){
                        //     self.outstanding = res.outstanding
                        // }

                        if(res.outstanding){
                                self.outstanding = res.outstanding
                        }

                        // self.outstanding_server = res.outstanding
                        for(let x of res.flix_list){
                            self.all_ids.push(x._id)
                        }

                        if (document.body.scrollHeight === window.innerHeight){
                            self.data_lock=0
                            self.get_more_data()
                        }
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
        get_more_data(){
            // console.log("Getting more data")
            //this.loading_data = true
            //this.resources = {data: this.resources.data.concat(this.buffer)}
            //this.buffer = null

            if(this.data_lock===0){

            // this.$bus.$emit('getting_more_data')

            this.data_lock = +1
            this.loading = true

                this.page+=1
                // console.log(this.page)
                let self = this
                this.$axios.$post(this.get_endpoint(), this.get_body(), this.get_headers())
                    .then((res)=>{
                        if(res.flix_list.length > 0){
                            // for(let x of res.data){
                            //     if(!self.resources.data.includes(x)){
                            //         self.resources.data.push(x)
                            //     }
                            // }

                            for(let x of res.flix_list){
                                // if(self.all_ids.includes(x._id)){
                                //     console.log("DUPLICATE")

                                // }else{
                                    self.all_ids.push(x._id)
                                // }

                                self.resources.push(x)
                            }

                            if(res.outstanding){
                                self.outstanding = res.outstanding
                            }



                            // self.resources = {data: self.resources.data.concat(res.data)}
                            self.data_lock = 0
                            self.cluster_counts = res.counts
                            // self.outstanding_server = res.outstanding

                        }  else{
                                // console.log("End of data stream")
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
        save_preferences(){
            // console.log("save")
            this.$axios.$post('/api/user/preferences', this.get_body(), this.get_headers())
                .catch((err)=>{
                    
                })
        },
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
        get_endpoint(){
            if(this.title==='store'){
                if(this.current_sort==='Top'){
                    return '/api/flix/published/top'
                } if(this.current_sort==='New'){
                    return '/api/flix/published/new'
                }if(this.current_sort==='Most sold'){
                    return '/api/flix/published/most_purchased'
                }if(this.current_sort==='Price high'){
                    return '/api/flix/published/price_high'
                }if(this.current_sort==='Price low'){
                    return '/api/flix/published/price_low'
                }if(this.current_sort==='Random'){
                    return '/api/flix/published/random'
                }if(this.current_sort==='Short'){
                    return '/api/flix/published/duration_short'
                }if(this.current_sort==='Long'){
                    return '/api/flix/published/duration_long'
                } else{
                    return '/api/flix/published/top'
                }
            }
            else if(this.isLoggedIn()){
                return this.endpoint_auth
            }else{
                return this.endpoint_unauth
            }
        },
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

            // let outstanding = []
            // if(this.name == 'Recommended' && this.resources){
            //     outstanding = this.get_outstanding()
            // } else{
            //     outstanding = []
            // }


            // , 'tags', 'Top', 'channels', 'search'

            let res = {}
            let offset_list = ['Explore', 'Recommended', 'Betterfap', 'New', 'Top', 'tags', 'search', 'channels']
            if(this.shuffle || offset_list.includes(this.title)){
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
        get_headers(){
            if(this.isLoggedIn()){
                return {headers:{Authorization : this.authenticationToken()}}
            }else{
                return {headers:{Authorization : this.authenticationToken()}}
            }
        },
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
        seen(index){
            if(this.resources.data[index].seen != true){
                this.seen_ids.push(this.resources.data[index]._id)
                // console.log(this.resources.data[index]._id)
                if(!this.seen_resources.includes(index)){
                    this.seen_resources.push(index)
                }
            this.$set(this.resources.data[index], 'seen', true)
            
            // console.log(this.get_outstanding())
            }
        },
        like(index){
            if(this.resources.data[index].like){
                this.resources.data[index].like = false
            }else{
                this.resources.data[index].like = true
                this.resources.data[index].dislike = false
                this.resources.data[index].favourite = false
            }
        },
        dislike(index){
            if(this.resources.data[index].dislike){
                this.resources.data[index].dislike = false
            }else{
                this.resources.data[index].dislike = true
                this.resources.data[index].like = false
                this.resources.data[index].favourite = false

            }
        },
        favourite(index){
            if(this.resources.data[index].favourite){
                this.resources.data[index].favourite = false
            }else{
                this.resources.data[index].favourite = true
                this.resources.data[index].like = false
                this.resources.data[index].dislike = false

            }
        },
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
        addFilterItem(item){

            if(this.category_items[1].items.includes(item)){
                this.searchTag.push(item)
            } else{
                this.searchCat.push(item)
                
            }
        },
        removeDups() {
            // console.log("Removing dupes")
            this.categories = [...new Set(this.categories)];            
            // console.log(this.categories)

        },
        removeFilterItem(item){
            if(this.category_items[1].items.includes(item)){
                this.searchTag.splice(this.searchTag.indexOf(item),1)
            } else{
                this.searchCat.splice(this.searchCat.indexOf(item),1)
                
            }
        },
        remove_category(item){
            const index = this.categories.indexOf(item)
            if (index >= 0) this.categories.splice(index, 1)
            if(!this.refresh){
                this.get_data()
            }
        },
        delete_flick_item(id){
            for (let i of this.resources){
                if(i._id === id){
                    this.resources.splice(this.resources.indexOf(i),1)
                    this.$axios.$post('/api/flix/unpublished/' + id + '/remove', {}, this.get_headers())
                        .then((res)=>{
                            // console.log(res)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                }
            }
        }
        
    },
    created(){ 
        let self = this
        this.$bus.on('user', function(arg){
            self.user = arg
        })

        this.$bus.emit('get_user')
        this.$axios.$get('/api/user',this.get_headers())
            .then((res)=>{
                if(res.success){
                    self.art = res.user.art
                    self.orientation = res.user.orientation
                    self.type = res.user.type
                    self.seen_filter = res.user.display_seen
                    self.star_categories = res.user.star_categories
                    self.star_tags = res.user.star_tags
                    // console.log(res.user)
                    
                    if(res.user.mode === 'dark'){
                        this.night_mode = true
                    } else{
                        this.night_mode = false
                    }

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


</style>
