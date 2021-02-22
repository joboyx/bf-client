<template>
  <div v-if="data">
        <FlixPlayer
        ref="fp"
        player_id="flix_player_editor_id"
        @close_modal="closeModal"
        :resources="resources"
        ></FlixPlayer>
      <v-container>
       <v-btn icon to='/flix/purchases' nuxt><v-icon>keyboard_return</v-icon></v-btn>

      <v-layout class="text-xs-center justify-center mb-4" > <span class="display-3 font-weight-light">
          {{data.title}}
          </span>
      </v-layout>


        <v-layout>
      <v-flex xs6 d-flex >
        <v-img
          :src="data.thumbnails[0] || bf_thumbnail"
          height="300px"
        ></v-img>
      </v-flex>
      <v-flex xs6>
        <v-container
          grid-list-md
          pa-0
          pl-2
          style="margin: -4px 0"
        >
          <v-layout wrap>
            <v-flex xs7 d-flex>
              <v-img
                :src="data.thumbnails[1] || bf_thumbnail"
          height="146px"
              ></v-img>
            </v-flex>
            <v-flex xs5 d-flex>
              <v-img
                :src="data.thumbnails[2] || bf_thumbnail"
          height="146px"
              ></v-img>
            </v-flex>
            <v-flex xs5 d-flex>
              <v-img
                :src="data.thumbnails[3] || bf_thumbnail"
          height="146px"
              ></v-img>
            </v-flex>
            <v-flex xs7 d-flex>
              <v-img
                :src="data.thumbnails[4] || bf_thumbnail"
          height="146px"
              ></v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
</v-container>
<v-container>

    <v-layout row wrap justify-start>
        <v-chip v-for="tag in data.tags" :key="tag" dense>
            {{tag}}
        </v-chip>
    </v-layout>

    <v-layout row wrap class="mt-2 mb-2" justify-start align-center>

        <v-flex xs2 md1>
            <v-img
                :src="get_orientation(data.orientation)"
                height="40px"
                width="40px"
                >
            </v-img>
        </v-flex>

        <v-flex xs2 md1>
            <v-img
            :src="get_art(data.art)"
            height="40px"
            width="40px"
            >
            </v-img>
        </v-flex>
        <v-flex xs3 sm1>
            <v-layout align-center>
                <v-img
                    :src="require('assets/images/carrot.png')"
                    height="30px"
                    width="30px"
                    class="ml-0 mr-0 pr-0 pl-0"
                    contain
                >
                </v-img>
                <span>x {{data.price}}</span>
            </v-layout>
        </v-flex>


        <v-spacer></v-spacer>
            <v-flex class="hidden-sm-and-down" xs4 sm3 md2 lg1 v-if="data.duration!=-1"><v-icon class="mr-1 ml-1" small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
            <v-flex class="hidden-sm-and-down" xs2 sm1 md1 lg1 v-else><v-icon class="mr-1 " small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
            <v-flex class="hidden-sm-and-down" xs2 sm2 md1 lg1><v-icon small class="mr-1 ">collections</v-icon>{{data.n_resources}}</v-flex>
            <v-flex class="hidden-sm-and-down" xs2 sm2 md1 lg1><v-icon small class="mr-1">shopping_cart</v-icon>{{data.purchased}}</v-flex> 
        <v-spacer></v-spacer>
        <v-flex xs2 md1 class="" justify-end>
            <v-btn color="#B29126" @click="play"> <v-icon>play_arrow</v-icon> play</v-btn>
        </v-flex>
    </v-layout>
    <v-layout align-center justify-start class="hidden-md-and-up">
        <v-spacer class="hidden-xs-only"></v-spacer>
        <v-flex xs4 sm2 v-if="data.duration!=-1"><v-icon class="mr-1 ml-1" small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
        <v-flex xs2 sm2 v-else><v-icon class="mr-1" small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
        <v-flex xs3 sm1><v-icon small class="mr-1">collections</v-icon>{{data.n_resources}}</v-flex>
        <v-flex xs3 sm1><v-icon small class="mr-1">shopping_cart</v-icon>{{data.purchased}}</v-flex> 
        <v-spacer></v-spacer>
    </v-layout>
    </v-container>

    <v-container>

    <v-layout class="mt-4 mb-5">
        <span class="font-weight-thin subheading">

        {{data.description}}
        </span>
    </v-layout>

    <v-layout align-center justify-center>
            <v-rating
                v-model="data.rating"
                color="#B29126"
                background-color="#B29126"
                half-increments
                large
                readonly
            ></v-rating>
            <span class="headline font-weight-light">{{data.rating.toFixed(1)}}/5</span>


    </v-layout>
    <!-- <v-layout align-center justify-center>
            <span class="headline">{{data.rating}}/5</span>
    </v-layout> -->

    <v-layout align-center justify-center>
            <span v-if="data.n_ratings===1" class="caption grey--text">{{data.n_ratings}} rating</span>
            <span v-else class="caption grey--text">{{data.n_ratings}} ratings</span>
    </v-layout>

    </v-container>
    <v-divider class="mt-4 mb-4"></v-divider>


    <v-container class="justify-center" v-if="!own_review">
      <v-layout justify-center class="text-xs-center">
        <span class="title font-weight-thin mb-2">How did you like this flick?</span>
      </v-layout>
      <v-layout justify-center>
            <v-rating
                v-model="personal_rating"
                background-color="#B29126"
                color="#B29126"
                hover
            ></v-rating>
      </v-layout>
      <v-layout justify-center>
        <v-form
                ref="form_2"
                v-model="form_2"
                width="100%"
            style="width:100%"
          >
        <v-textarea
            :rules="[rules.length(5000)]"
          v-model="personal_review"
          solo
          multi-line
          label="Tell others what you think about this flick. Would you recommend it and why?"
          counter="5000"
          style="width:100%"
        ></v-textarea>
        </v-form>
      </v-layout>
      <v-layout>
          <v-btn flat @click="submit_review" :disabled='!personal_rating || !form_2'>submit</v-btn>
      </v-layout>

    </v-container>

    <v-container class="justify-center" v-else-if="edit">
      <v-layout justify-center class="text-xs-center">
        <span class="title font-weight-thin mb-2">How did you like this flick?</span>
      </v-layout>
      <v-layout justify-center>
            <v-rating
                v-model="own_review.rating"
                background-color="#B29126"
                color="#B29126"
                hover
            ></v-rating>
      </v-layout>
      <v-layout justify-center>
          <v-form
            ref="form"
            v-model="form"
            width="100%"
          style="width:100%"

          >

        <v-textarea
          :rules="[rules.length(5000)]"
          v-model="own_review.comment"
          solo
          multi-line
          label="Tell others what you think about this flick. Would you recommend it and why?"
          counter="5000"
          style="width:100%"
        ></v-textarea>
          </v-form>

      </v-layout>
      <v-layout>
          <v-btn flat @click="update_review" :disabled='!own_review.rating || !form'>update</v-btn>
      </v-layout>
    </v-container>

<v-container v-if="own_review && !edit" class="justify-center">
        <v-layout justify-center>

        <v-flex xs12  justify-center>

        <v-layout class="ml-2">
            <span class="body-2">Your review</span>

        </v-layout>
        <v-layout class="caption grey--text ml-2">
            {{get_date(own_review.updated_at)}}
        </v-layout>

        <v-layout>
            <v-rating
                v-model="own_review.rating"
                color="#B29126"
                half-increments
                readonly
                background-color="#B29126"

            ></v-rating>

        </v-layout>

        <v-layout class="subheading font-weight-light ml-2" row wrap v-if="own_review.comment">
            <span style="white-space: pre-line;">
                <!-- {{own_review.comment}} -->
                <read-more more-str="read more" :text="own_review.comment" link="#" less-str="read less" :max-chars="500"></read-more>


            </span>
            <!-- <p v-for="(rev, index) in data.personal_review.split('\n')" :key='index'>
                <span v-if="rev!=''">

                {{rev}} {{index}}
                </span>
            </p> -->
        </v-layout>
        <v-layout class="ml-2 mr-2">
            <span class="link" @click="edit_review">Edit</span>
        </v-layout>
        <v-layout class="caption mt-1 grey--text ml-2 mr-2">
            <span v-if="own_review.upvotes===1">{{own_review.upvotes}} user found this review helpful</span>
            <span v-else>{{own_review.upvotes}} users found this review helpful</span>
        </v-layout>
        </v-flex>
</v-layout>
    </v-container>

<v-container>

</v-container>

    <v-container v-for="(review, index) in reviews" :key="index" class="justify-center">
        <v-layout justify-center>


        <v-flex xs12  justify-center>

        <v-layout class="ml-2 mr-2">
            <span class="body-2">{{review.username}}</span>
        </v-layout>
        <v-layout class="caption grey--text ml-2 mr-2">
            {{get_date(review.updated_at)}}
        </v-layout>

        <v-layout align-center>
            <v-rating
                v-model="review.rating"
                color="#B29126"
                half-increments
                background-color="#B29126"
                readonly
            ></v-rating>

        </v-layout>



        <v-layout class="subheading font-weight-light ml-2" row wrap>
            <span style="white-space: pre-line;">
                <!-- {{review.comment}} -->
                <read-more more-str="read more" :text="review.comment" link="#" less-str="read less" :max-chars="500"></read-more>

            </span>

            <!-- <p v-for="(rev, index) in review.comment.split('\n')" :key='index'>
                <span v-if="rev!=''">

                {{rev}}
                </span>
            </p> -->
        </v-layout>
        <v-layout class="mt-2 mr-2 caption mt-1 grey--text" align-center>
            <!-- <span class="link">Helpful</span> -->
            <v-btn icon>

                <v-icon v-if="review.liked" color="#B29126" @click="downvote_review(review)">thumb_up</v-icon>
                <v-icon v-else color="" @click="upvote_review(review)">thumb_up</v-icon>
            </v-btn>
            <span v-if="review.upvotes===1">{{review.upvotes}} user found this review helpful</span>
            <span v-else>{{review.upvotes}} users found this review helpful</span>

        </v-layout>

        </v-flex>
</v-layout>
    </v-container>


      
    <PromptRating ref='pr' @rating='submit_rating'></PromptRating>

  </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
import FlixPlayer from '@/components/content/FlixPlayer'
import PromptRating from '@/components/modules/PromptRating'

export default {
    components:{FlixPlayer,PromptRating},
    data(){
        return {
            data:false,
            bf_thumbnail:'https://i.imgur.com/09pgBA3.jpg',
            personal_review:"",
            personal_rating:0,
            edit: false,
            form:false,
            rules:{
                length:len => v => (v || '').length <= len || `Invalid character length`
            },
            own_review: false,
            resources:null,
            reviews: []
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        submit_rating(rating){
            this.personal_rating = rating
            this.submit_review()
        },
        get_orientation(type){
            if(type==='straight'){
                return require('assets/images/gender-straight.png')
            }else if(type==='gay'){
                return require('assets/images/gender-gay.png')
            }else if(type==='lesbian'){
                return require('assets/images/gender-lesbian.png')
            }else if(type==='trans'){
                return require('assets/images/gender-trans.png' )
            }else if(type==='solo-man'){
                return require('assets/images/solo-man.png' )
            }else if(type==='solo-woman'){
                return require('assets/images/solo-woman.png' )
            }
        },
        get_art(type){
            if(type==='real-life'){
                return require('assets/images/type-real.png')
            }else if(type==='comic'){
                return require('assets/images/type-draw.png')
            }else if(type==='three-d'){
                return require('assets/images/type-3d.png')
            }
        },
        submit_review(){
            let h = {headers:{Authorization : this.authenticationToken()}}
            this.personal_review = this.clean_text(this.personal_review)
            let body = {
                comment: this.personal_review,
                rating: this.personal_rating,
            }

            this.$axios.$post('/api/flix/published/'+this.data._id+'/review',body,h)
                .then((res)=>{
                    // console.log(res)
                })
                .catch((err)=>{
                    console.log(err)
                })

            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+'T'+time;


            this.own_review = {
                }
            this.$set(this.own_review, 'comment', this.clean_text(this.personal_review))
            this.$set(this.own_review, 'rating', this.personal_rating)
            this.$set(this.own_review, 'updated_at', dateTime)
            this.edit = false

            // this.own_review.comment = this.personal_review
            // this.own_review.rating = this.personal_rating
            // this.own_review.updated_at = 'Now'

        },
        update_review(){
            let h = {headers:{Authorization : this.authenticationToken()}}
            this.own_review.comment = this.clean_text(this.own_review.comment)

            let body = {
                comment: this.own_review.comment,
                rating: this.own_review.rating,
            }
            this.$axios.$post('/api/flix/published/'+this.data._id+'/review/' + this.own_review._id + "/update",body,h)
                .then((res)=>{
                    console.log(res)
                })
                .catch((err)=>{
                    console.log(err)
                })

            // this.$set(this.data, 'personal_review', this.clean_text(this.personal_review))
            this.edit = false
        },
        upvote_review(review){
            this.$set(this.reviews[this.reviews.indexOf(review)], 'liked', true)
            this.$set(this.reviews[this.reviews.indexOf(review)], 'upvotes', this.reviews[this.reviews.indexOf(review)].upvotes + 1)

            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/flix/published/'+this.$route.params.flick + '/review/' + review._id + '/upvote', {}, h)
                .then((res)=>{

                    // this.reviews[this.reviews.indexOf(review)].like = true
                    // this.reviews[this.reviews.indexOf(review)].upvotes +=1
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        downvote_review(review){
            this.$set(this.reviews[this.reviews.indexOf(review)], 'liked', false)
            this.$set(this.reviews[this.reviews.indexOf(review)], 'upvotes', this.reviews[this.reviews.indexOf(review)].upvotes - 1)

            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/flix/published/'+this.$route.params.flick + '/review/' + review._id + '/upvote', {}, h)
                .then((res)=>{

                    // this.reviews[this.reviews.indexOf(review)].like = false
                    // this.reviews[this.reviews.indexOf(review)].upvotes -=1
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        clean_text(str){
            str = str.replace(/^\s+|\s+$/g, '');
            // str = str.replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n');

            str = str.replace(/[\r\n]+/g, '\n\n')

            return str
        },
        edit_review(){
            this.edit = true
        },
        get_date(dt){
            return dt.slice(0, dt.indexOf('T'))
        },
        play(){
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";
            if(this.resources===null){
                // console.log("getting resources")

                let h = {headers:{Authorization : this.authenticationToken()}}

                this.$axios.$post('/api/flix/published/'+this.$route.params.flick + '/play', {}, h)
                        .then((res)=>{
                            console.log(res)
                            this.resources = res.data
                            let self = this
                            // console.log("Opening modal")
                            setTimeout(() => self.$refs.fp.openModal(), 0);
                            // this.loading_play = false
                        })
                        .catch((err)=>{
                            console.log(err)
                        })

                    }else{
                        // console.log("Already have resources and opening modal")
                        this.$refs.fp.openModal(0)
                        // this.loading_play = false
                    }
        },
        closeModal(){
            document.documentElement.style.overflow = 'auto';
            document.body.scroll = "yes";
            this.$emit('close_modal')
            if(this.own_review === false){
                this.$refs.pr.open_dialog(this.$route.params.flick)
            }
        },
        getTime(duration){
            if(duration === -1)
                return '?'
            let measuredTime = new Date(null);
            measuredTime.setSeconds(duration); // specify value of SECONDS
            return measuredTime.toISOString().substr(11, 8);
        },

    },
    created(){
       let h = {headers:{Authorization : this.authenticationToken()}}
        this.$axios.$post('/api/flix/published/'+this.$route.params.flick,{},h)
            .then((res)=>{
                // console.log(res)
                this.data = res.data
                this.reviews = res.reviews

                if(res.own_review){
                    this.own_review = res.own_review
                }
            })
    }
}
</script>

<style scoped>
.link:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
