<template>
  <div v-if="data">
      <v-container>
       <v-btn icon to='/flix/store' nuxt><v-icon>keyboard_return</v-icon></v-btn>

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

    <v-container>

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
            <v-flex class="hidden-sm-and-down" xs4 sm3 md2 lg1 v-if="data.duration!=-1"><v-icon  color="#B29126" class="mr-1 ml-1" small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
            <v-flex class="hidden-sm-and-down" xs2 sm3 md2 lg1 v-else><v-icon class="mr-1 " color="#B29126"  small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
            <v-flex class="hidden-sm-and-down" xs2 sm2 md1 lg1><v-icon small color="#B29126"  class="mr-1 ">collections</v-icon>{{data.n_resources}}</v-flex>
            <v-flex class="hidden-sm-and-down" xs2 sm2 md1 lg1><v-icon small color="#B29126"  class="mr-1">shopping_cart</v-icon>{{data.purchased}}</v-flex> 
        <v-spacer></v-spacer>
        <v-flex xs2 md1 class="" justify-end>
            <v-btn color="#B29126" @click="buy">buy</v-btn>
        </v-flex>
    </v-layout>
    <v-layout align-center justify-start class="hidden-md-and-up">
        <v-spacer class="hidden-xs-only"></v-spacer>
        <v-flex xs4 sm2 v-if="data.duration!=-1"><v-icon class="mr-1 ml-1" small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
        <v-flex xs2 sm2 v-else><v-icon color="#B29126"  class="mr-1" small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
        <v-flex xs3 sm1><v-icon small  color="#B29126" class="mr-1">collections</v-icon>{{data.n_resources}}</v-flex>
        <v-flex xs3 sm1><v-icon small  color="#B29126" class="mr-1">shopping_cart</v-icon>{{data.purchased}}</v-flex> 
        <v-spacer></v-spacer>
    </v-layout>
    </v-container>


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


  </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            data:false,
            bf_thumbnail:'https://i.imgur.com/09pgBA3.jpg',
            reviews:[]
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
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
        getTime(duration){
            if(duration === -1)
                return '?'
            let measuredTime = new Date(null);
            measuredTime.setSeconds(duration); // specify value of SECONDS
            return measuredTime.toISOString().substr(11, 8);
        },
        get_date(dt){
            return dt.slice(0, dt.indexOf('T'))
        },
        buy(){
            let h = {headers:{Authorization : this.authenticationToken()}}

            this.$axios.post('/api/flix/published/'+this.data._id + '/buy',{},h)
            .then((res)=>{
                // console.log(res)
                if(res.data.success){
                this.$router.push('/flix/purchased/'+this.data._id)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
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
    },
    created(){
       let h = {headers:{Authorization : this.authenticationToken()}}
        this.$axios.$post('/api/flix/published/'+this.$route.params.flick,{},h)
            .then((res)=>{
                // console.log(res)
                this.data = res.data
                this.reviews = res.reviews


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
