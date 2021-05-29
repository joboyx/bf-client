<template>
<div >
    <div v-if="getUser().tier != 0 && getUser().tier!= 1">

    <div v-if="tags.length==0">
        <v-layout class="justify-center mt-5">

            <v-progress-circular
            :size="100"
            color="#B29126"
            indeterminate
            ></v-progress-circular>
        </v-layout>
    </div>
<div v-if="tags.length>0">



<!-- <v-layout class="" justify-center row wrap> -->
<!-- <v-layout class="justify-center text-xs-center display-3 font-weight-thin">Your stats</v-layout> -->

<v-layout row wrap justifiy-center class="text-xs-center mt-5 mb-5" align-content-center>
<v-flex xs12 class="mt-5 mb-5">
<v-layout class="text-xs-center" row wrap>
    <v-flex xs12 sm4 style="color: #fff" class="mb-5">
        <span class="display-3 ">

    {{general.seen}}
        </span>
        <br>
        <span style="color: #B29126" class="display-1">
            seen
        </span>
    </v-flex>

    <v-flex xs12 sm4 style="color:  #fff" class="mb-5">
        <span class="display-3">

    {{general.favourites}}
        </span>
        <br>
        <span style="color: #B29126" class="display-1 ">
            favourites
        </span>
    </v-flex>

    <v-flex xs12 sm4 style="color:  #fff" class="mb-5">
        <span class="display-3">

    {{general.likes}}
        </span>
        <br>
        <span style="color: #B29126" class="display-1">
            likes
        </span>
    </v-flex>

    </v-layout>
</v-flex>

</v-layout>


<v-container fill-height>
<v-layout align-center row wrap>

<v-flex xs12 sm12 md6 class="grey--text text--lighten-1">
    <v-layout style="color: #B29126" class="display-3 ml-1 font-weight-bold justify-center mb-3">Top</v-layout>
    <v-layout v-for="(tag, index) in get_top_tags()" justify-center row wrap :key="tag+index" >

        <v-flex xs style="color: #fff" class="text-xs-center display-1 ma-2">

            <v-menu open-on-hover top offset-y  auto style="margin:auto;" v-model="menu_top.ids[index]">
            <template v-slot:activator="{ on }">
                <v-layout row wrap class="justify-center text-xs-center font-weight-thin">
                     {{index+1}}. <span v-on="on" class="ml-2" style="cursor:pointer;">{{tag.tags}} </span>
                </v-layout>
            </template>

            <v-card width="" >
                
                <v-container @mousemove="close_menu_top(index)">

                <v-layout>
                    <v-flex xs4>
                        <v-layout class="mb-1 justify-center"><v-icon large style="color: #B29126">thumb_up_alt</v-icon></v-layout>
                        <v-layout class="mt-1 justify-center text-xs-center headline font-weight-thin"> {{tag.likes}} </v-layout>
                    </v-flex>
                    <v-flex xs4>
                        <v-layout class="mb-1 justify-center"><v-icon large color="red">favorite</v-icon></v-layout>
                        <v-layout class="mt-1 justify-center text-xs-center headline font-weight-thin"> {{tag.favourites}} </v-layout>
                    </v-flex>
                    <v-flex xs4>
                        <v-layout class="mb-1 justify-center"><v-icon large style="color: #B29126">thumb_down_alt</v-icon></v-layout>
                        <v-layout class="mt-1 justify-center text-xs-center headline font-weight-thin "> {{tag.dislikes}} </v-layout>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card>
            </v-menu>





        </v-flex>
        <!-- <v-flex xs class="text-xs-left display-1">{{(tag.wilson*100).toFixed(1)}} %</v-flex> -->
    </v-layout>
</v-flex>
<v-flex xs12 sm12 md6 class="text-xs-center blue--text text--lighten-2">
<v-layout style="color: #B29126" class="display-3 ml-1 font-weight-bold justify-center mb-3">Flop</v-layout>

    <v-layout v-for="(tag, index) in get_flop_tags()" row wrap :key="tag+index" >

        <v-flex xs style="color: #fff" class="text-xs-left display-1 ma-2">
            <v-menu open-on-hover top offset-y v-model="menu_flop.ids[index]">
                <template v-slot:activator="{ on }">
                <v-layout  class="justify-center font-weight-thin text-xs-center">
                     {{index+1}}. <span v-on="on" class="ml-2" style="cursor:pointer;">{{tag.tags}}</span>
                </v-layout>
                </template>

                <v-card>
                    <v-container @mousemove="close_menu_flop(index)">

                    <v-layout>
                      <v-flex xs4>
                          <v-layout class="mb-1 justify-center"><v-icon large style="color: #B29126">thumb_up_alt</v-icon></v-layout>
                          <v-layout class="mt-1 justify-center text-xs-center headline font-weight-thin"> {{tag.likes}} </v-layout>
                      </v-flex>
                      <v-flex xs4>
                          <v-layout class="mb-1 justify-center"><v-icon large color="red">favorite</v-icon></v-layout>
                          <v-layout class="mt-1 justify-center text-xs-center headline font-weight-thin"> {{tag.favourites}} </v-layout>
                      </v-flex>
                      <v-flex xs4>
                          <v-layout class="mb-1 justify-center"><v-icon large style="color: #B29126">thumb_down_alt</v-icon></v-layout>
                          <v-layout class="mt-1 justify-center text-xs-center headline font-weight-thin "> {{tag.dislikes}} </v-layout>
                      </v-flex>
                    </v-layout>
                    </v-container>
                </v-card>
            </v-menu>

        </v-flex>
        <!-- <v-flex xs class="text-xs-left display-1">{{(tag.wilson*100).toFixed(1)}} %</v-flex> -->
    </v-layout>
</v-flex>
</v-layout>
</v-container>
<v-layout style="color: #fff; margin-top:120px" class="display-1 font-weight-bold justify-center mb-5">We are upgrading the graphs! It'll be back soon!</v-layout>


<!-- </v-layout> -->

<!-- <v-layout style="color: #fff; margin-top:120px" class="display-3 font-weight-bold justify-center mb-5">Tag Word Cloud</v-layout> -->

<!-- {{general}} -->



<!-- 
            <v-container fill-height class="mb-5">
                <v-layout style="height:70vh; width:100%">

            <wordcloud
            v-if="words.length>0"
            :words="words"
            :color="([, weight]) => weight > 0.8 ? '#9d8022' : weight > 0.3 ? '#B29126' : '#c7a22a'"
            font-family="Roboto"
            :spacing="0.3"

            :rotation="1"
            ></wordcloud>
                </v-layout>
            <!-- style="position:absolute; height:100%;width:100%;" 
                </v-container> -->

<!-- <v-layout class="display-3 font-weight-light text-xs-center" justify-center v-if="dates.length>0"> -->
<!-- Activity -->
<!-- <v-layout style="color: #fff" class="display-3 mt-5 font-weight-bold justify-center">Activity</v-layout> -->

<!-- </v-layout> -->

<!-- <v-layout justify-center v-if="dates.length>0" class="">
    <no-ssr placeholder="loading...">
        <Plotly :data="activity_data" :layout="activity_layout" :options="activity_options" ></Plotly>
    </no-ssr>

</v-layout >

<v-layout style="color: #fff; margin-top:120px" class="display-3 font-weight-bold justify-center">Tag Sentiment</v-layout>

<v-layout class="display-3 font-weight-light text-xs-center "  justify-center v-if="dates.length>0"> -->
<!-- what do I like? -->
    <!-- <no-ssr placeholder="loading...">
                <Plotly :data="scatter_tag_data" :layout="scatter_tag_layout" :options="scatter_tag_options" ></Plotly>
    </no-ssr>
</v-layout > -->






</div>
    </div>
        <div v-else>
            <div class="title font-weight-thin text-xs-center justify-center mt-5">
                You need to activate BunnyLove Hopmeister to view this page!
            </div>
                <v-img
                :src="require('assets/images/bunnylove.png')"
                height="100px"
                width="100px"
                class="mt-5 mb-3"
                style="margin:auto;"
                contain
                >
                </v-img>

                <div class="text-xs-center justify-center">
                    <v-btn large to="/bunnylove" nuxt color="#B29126" >Activate!</v-btn>
                </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
// import wordcloud from 'vuewordcloud'
// import  Plotly  from '@/components/modules/Plotly'

/**
 * @vuese
 * Shows user statistics for premium members, e.g. top tags, wordcloud, activity, etc.  
 * Install:
 *   "@statnett/vue-plotly": "^0.3.2",
 *    "vuewordcloud": "^18.7.11",
 * @group Pages

 */
export default {
    components:{
        // 'Plotly':()=> import('@/components/modules/Plotly.vue'),
        // wordcloud,
        // Plotly
    },

    data(){
        return{ // @vuese
            // Used for the hover dialog box when the user hovers over top and flop tags.
            menu_top:{
                ids:[false,false,false,false,false,false,false,false,false,false]
            }, // @vuese
            // Used for the hover dialog box when the user hovers over top and flop tags.
            menu_flop:{
                ids:[false,false,false,false,false,false,false,false,false,false]
            }, // @vuese
            // Whether the menu is active or not.
            menu:false, // @vuese
            // List of tags for the word cloud.
            words: [], // @vuese
            // List of tags for the user.
            tags:[

            ], // @vuese
            // The data for the scatter plot of tags.
            scatter_tag_data: [], // @vuese
            // The layout parameters for the scatter plot graph.
            scatter_tag_layout: {
                xaxis: {
                    range: [-1.1, 1.1],
                    showgrid: false,
                    title: '← Frequency →',
                    color: 'white',
                    },
                yaxis: {
                    range: [-1.1, 1.1],
                    showgrid: false,
                    title: '← Sentiment →',
                    color: 'white',
                },
                paper_bgcolor: '#212121',
                plot_bgcolor: '#212121',
                hovermode:'closest',
                dragmode: 'pan',
                height: 'auto'

            }, // @vuese
            // Additional graphing options for the scatter plot of tags.
            scatter_tag_options: {
                scrollZoom: true,
                // displayModeBar: false,
                reponsive:true,
                modeBarButtonsToRemove:['sendDataToCloud', 'hoverCompareCartesian','editInChartStudio','zoom2d','pan2d', 'select2d','lasso2d','zoomIn2d','zoomOut2d','autoScale2d','resetScale2d','hoverClosestCartesian','hoverCompareCartesian','toggleSpikelines'],
                displaylogo: false
            },  // @vuese
            // List of dates for the activity graph.
            dates: [], // @vuese
            // List of number of seen resources per day, according to the `dates` variable.
            seen: [], // @vuese
            // Object to group the `seen` and `dates` with other graphing options.
            activity_data:{}, // @vuese
            // Graphing layout options for the activity graph.
            activity_layout: {
                xaxis: {
                    showgrid: false,
                    color: 'white',
                    autorange:true,
                    fixedrange: true
                    },
                yaxis: {
                    showgrid: false,
                    title: 'Activity',
                    color: 'white',
                    autorange:true,
                    rangemode: 'nonnegative',
                    // dtick: 1.0
                    fixedrange: true
                },
                paper_bgcolor: '#212121',
                plot_bgcolor: '#212121',
                hovermode:'closest',
                height: 'auto'

            }, // @vuese
            // Additional graph options for the activity graph.
            activity_options: {
                scrollZoom: false,
                // displayModeBar: false,
                reponsive:true,
                modeBarButtonsToRemove:['sendDataToCloud', 'hoverCompareCartesian','editInChartStudio','zoom2d','pan2d', 'select2d','lasso2d','zoomIn2d','zoomOut2d','autoScale2d','resetScale2d','hoverClosestCartesian','hoverCompareCartesian','toggleSpikelines'],
                displaylogo: false
            }, // @vuese
            // List of top trending tags for this user.
            top_tags:[], // @vuese
            // List of least liked tags for this user.
            flop_tags:[], // @vuese
            // General user statistics; e.g. number seen, favourited, and liked.
            general:{}, // @vuese
            // Whether the user data has been loaded or not.
            user: false
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        ...mapGetters('user',['getUser']),
        // @vuese
        // Close a menu box which appears when hovering over a top tag.
        close_menu_top(x){
            this.$set(this.menu_top.ids, x, false)
        },
        // @vuese
        //  Close a menu box which appears when hovering over a flop tag.
        close_menu_flop(x){
            this.$set(this.menu_flop.ids, x, false)
        },
        // @vuese
        // Determine the top tags for the user.
        get_top_tags(){
            let res = []
            let count = 0
            for (let tag of this.tags){
                if(count===7)
                    break

                res.push(tag)
                count+=1
            }
            return res
        },
        // @vuese
        // Determine the worst tags for the user.
        get_flop_tags(){
            let rev = this.tags.slice().reverse();
            let res = []
            let count = 0
            for (let tag of rev){
                if(count===7)
                    break

                res.push(tag)
                count+=1
            }
            return res
        },
        // @vuese
        // Generate the word cloud data.
        get_word_cloud_data(){
            let res = []
            let count = 0
            for (let tag of this.tags.reverse()) {
                // if(tag['wilson']*10 > 5)
                if(count<6)
                    res.push([tag['tags'], tag['wilson']*1.5])
                else
                    res.push([tag['tags'], tag['wilson']])
                count+=1
                if(count==40)
                break
            }

            this.words = res
        },
        // @vuese
        // Determine the data for the scatter plot.
        get_scatter_tag_data(){
            let x = []
            let y = []
            let text = []
            let marker = {size:12, color:'#B29126'}
            for (let tag of this.tags) {

                x.push(tag['frequency'])
                y.push(tag['wilson'])
                text.push(tag['tags'])

            }

            let res = {
                x: x,
                y: y,
                text: text,
                marker: marker,
                type: 'scatter',
                mode:'markers+text',
                textposition: 'top center',
                color:'#212121',
                textfont:{
                    color:'white'
                },
                hoverinfo:"text"
            }


            this.scatter_tag_data = [res]

        },
        // @vuese
        // Determine the activity data and organise it so that it can be easily used.
        get_activity(){
            let x = []
            let y = []
            let marker = {size:12, color:'#B29126'}

            let res = {
                x: this.dates,
                y: this.seen,
                marker: marker,
                type:'scatter',
                mode:'lines+markers',
                color:'#212121',
                textfont:{
                    color:'white'
                },
            }
            this.activity_data = [res]

        },
        // @vuese
        // Set the top and flop data for easy use; based on the wilson score received from the server.
        set_top_flop(){
            let tag_num = 10
            let max = this.tags[0]['wilson']
            let min = this.tags[tag_num-1]['wilson']

            let top_res = []
            let flop_res = []


            // Set top

            let count = 0
            for (let tag of this.tags){

                if(min < 0){
                    top_res.push([tag['tags'],((tag['wilson']+(-1*min))/(max+(-1*min)))*100])
                }else{
                    top_res.push([tag['tags'],((tag['wilson']-min)/(max-min))*100 + 10])

                }


                count+=1
                if(count==tag_num)
                break
            }

            this.top_tags = top_res
            // Set flop

            count = 0

            let tmp = this.tags
            let i, n = tmp.length;
            tmp.reverse()

            for (i = 0; i < n; ++i) {
                tmp[i]['wilson'] = tmp[i]['wilson']*-1;
            }


            max = tmp[0]['wilson']

            min = tmp[tmp.length - 1]['wilson']



            for (let tag of tmp){
                if(min < 0){
                    if(tag['wilson']!=0)
                    flop_res.push([tag['tags'],((tag['wilson']+(-1*min))/(max+(-1*min)))*100])
                    else{
                        flop_res.push([tag['tags'],0])
                    }
                }else{
                    if(tag['wilson']!=0)
                    flop_res.push([tag['tags'],(tag['wilson']/max)*100])
                    else{
                        flop_res.push([tag['tags'],0])
                    }
                }


                count+=1
                if(count==tag_num)
                break
            }

            this.flop_tags = flop_res

        }
    },
    created(){
        let self = this
        this.$bus.on('user', function(arg){
            self.user = arg
        })

        this.$bus.emit('get_user')

        if(this.isLoggedIn() && this.getUser().tier != 0 && this.getUser().tier != 1){
            let h = {headers:{Authorization : this.authenticationToken()}}

            this.$axios.$get('/api/user/activity/statistics',h)
                .then((res)=>{
                    // console.log(res)
                    this.tags = res.tags
                    this.dates = res.activity.dates

                    this.seen = res.activity.seen
                    this.general = res.general
                    this.get_scatter_tag_data()
                    this.get_activity()
                    this.get_word_cloud_data()
                    // this.set_top_flop()
                })
                .catch((err)=>{

                })
        }

    }
}
</script>
<style scoped>
.underline:hover{
    text-decoration: underline;
}
</style>
