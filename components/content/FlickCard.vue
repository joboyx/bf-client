<template>
<div >
       <!-- {{data}} hide-overflow-->
<div v-if="data">

<!-- {{data}} -->

    <v-hover>
    <v-card
    class="ma-2 "
    style="max-width: 600px;"
    color="grey darken-4"
slot-scope="{ hover }" :class="`elevation-${hover ? 24 : 2}`"
  height="100%"


  >
  <div ></div>
    <v-layout v-if='data.thumbnails'>
      <v-flex xs6 d-flex >
        <v-img
          :src="data.thumbnails[0] || bf_thumbnail"
          height="209px"
        ></v-img>
      </v-flex>
      <v-flex xs6>
        <v-container
          grid-list-md
          pa-0
          pl-2
          style="margin: -4px 0"
          id="cardd"
        >
          <v-layout wrap>
            <v-flex xs7 d-flex>
              <v-img
                :src="data.thumbnails[1] || bf_thumbnail"
          height="100px"
              ></v-img>
            </v-flex>
            <v-flex xs5 d-flex>
              <v-img
                :src="data.thumbnails[2] || bf_thumbnail"
          height="100px"
              ></v-img>
            </v-flex>
            <v-flex xs5 d-flex>
              <v-img
                :src="data.thumbnails[3] || bf_thumbnail"
          height="100px"
              ></v-img>
            </v-flex>
            <v-flex xs7 d-flex>
              <v-img
                :src="data.thumbnails[4] || bf_thumbnail"
          height="100px"
              ></v-img>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>

    <!-- <v-layout> -->

    <v-card-title class="align-start">
        <v-flex xs12>

      <div v-if="data.title">
          <span class="headline font-weight-light ">
            <p v-line-clamp:20="1" v-if='data.title.length>24'><span class="link" @click="to_public">{{data.title}}</span><br><br></p>
            <p v-else><span class="link" @click="to_public">{{data.title}}</span></p>
          </span>
        <v-layout class="mb-2 font-weight-light" justify- v-if="page!=='library'" row wrap :id="'flixTutorial' + number">
          <v-flex xs4 sm5 class="grey--text font-weight-light" v-line-clamp:20="1">{{data.username}}</v-flex>
          <v-flex xs4 sm3><v-icon color="#B29126" class="mr-1" small>schedule</v-icon>{{getTime(data.duration)}}</v-flex>
          <v-flex xs2 ><v-icon small color="#B29126" class="mr-1">collections</v-icon>{{data.n_resources}}</v-flex>
          <v-flex xs2><v-icon small color="#B29126" class="mr-1">shopping_cart</v-icon>{{data.purchased}}</v-flex>
        </v-layout>
        <div class="font-weight-light subheading " v-if="page!=='library'">
          <p v-line-clamp:20="2" v-if="data.description.length>0">{{data.description}}<br><br></p>
        </div>
      </div>
        </v-flex>
      <v-spacer></v-spacer>
    </v-card-title>
    <!-- </v-layout> -->
    <!-- <v-divider></v-divider> -->
<v-card-actions class="" v-if="isSmall">
            <v-layout class="" align-center justify-center>
        <span class="pl-2 grey--text text--darken-2 font-weight-light caption" v-if="page!=='library'">{{data.n_ratings}} <span v-if="data.n_ratings===1">review</span> <span v-else>reviews</span></span>
              <v-rating
        v-model="data.rating"
        background-color="#B29126"
        color="#B29126"
        half-increments
        small
        readonly
        v-if="page!=='library'"
      ></v-rating>
      </v-layout>
    </v-card-actions>
    <v-card-actions>
      <v-layout align-center>

      <v-btn flat color="blue-grey lighten-3" nuxt :to="'/flix/private/'+data._id" v-if="page==='library'"> <v-icon class="mr-1">remove_red_eye</v-icon> view</v-btn>
      <v-btn flat color="blue-grey lighten-3" @click.stop="delete_dialog = true" v-if="page==='library'"> <v-icon class="mr-1">delete_forever</v-icon> delete</v-btn>
      <v-btn class="ml-2 mb-2" flat outline color="#B29126" v-if="page==='store'" @click="buy">
       buy
      </v-btn>
      <v-btn class="ml-2 mb-2" flat outline color="#B29126" v-if="page==='published' || page==='purchased'" @click="play">
       play
      </v-btn>
      <v-spacer></v-spacer>
      <v-img
          :src="require('assets/images/carrot.png')"
          height="20px"
          width="20px"
          class="ml- mr- pr-0 pl-0"
          contain
          v-if="page==='store'"
      >
      </v-img>
      <span v-if="page==='store'">x {{data.price}}</span>
      <!-- <v-btn flat color="blue-grey lighten-3"> <v-icon class="mr-1">settings</v-icon> Edit</v-btn> -->
      <v-spacer></v-spacer>
      <span class="pl-2 grey--text text--darken-2 font-weight-light caption" v-if="page!=='library' && !isSmall">{{data.n_ratings}} <span v-if="data.n_ratings===1">review</span> <span v-else>reviews</span></span>
      <v-rating
        v-model="data.rating"
        background-color="#B29126"
        color="#B29126"
        half-increments
        small
        readonly
        class=""
        v-if="page!=='library' && !isSmall"

      ></v-rating>
      <v-spacer></v-spacer>
      </v-layout>



    </v-card-actions>
  </v-card>
    </v-hover>

    <v-dialog
      v-model="delete_dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete this list?</v-card-title>

        <v-card-text>
          By clicking delete, this list will be removed from you library. <span style="text-decoration:underline"> The ownership of any associated published flicks, will be transferred to BunnyFap. </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="delete_dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="red"
            flat="flat"
            @click="delete_dialog = false; delete_flick()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <!-- {{isSmall()}} -->
    </div>
</div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
/**
 * @vuese
 * Card showing information related to a flick. This is how users view the flix in, for example, the flix store; but this is also how private flix are shown, in which case some buttons are ommitted (such as the buy button).
 * @group Content
 */
export default {
    props:['data', 'page', 'number'],
    data(){
        return {
            // @vuese
            // Default thumbnail if the image is not available.
            bf_thumbnail:'https://i.imgur.com/09pgBA3.jpg',
            // @vuese
            // If users want to delete a list, it asks for confirmation first. This variable determines whether this dialoge box shows or not.
            delete_dialog:false,
            // @vuese
            // Filler space for formatting.
            filler:[],
            // @vuese
            // Whether the user screen is small or not (for mobile formatting purposes).
            isSmall: false
        }
    },
    methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'isGuest']),
        // @vuese
        // Gets the duration of the flick.
      getTime(duration){
          if(duration === -1)
            return '?'
          let measuredTime = new Date(null);
          measuredTime.setSeconds(duration); // specify value of SECONDS
          return measuredTime.toISOString().substr(11, 8);
      },
        // @vuese
        // Deletes a flick.
      delete_flick(){
        // Send the flick id to the parent component.
        this.$emit('delete', this.data._id)
      },
        // @vuese
        // Reroute the user to the flick homepage, depending on where the current page.
      to_public(){
        if(this.page==='store'){
          this.$router.push('/flix/public/'+this.data._id);
        } else if(this.page==='library'){
          this.$router.push('/flix/private/'+this.data._id);
        } else if(this.page==='purchased'){
          this.$router.push('/flix/purchased/'+this.data._id);
        } else if(this.page==='published'){
          this.$router.push('/flix/publish/'+this.data._id);
        }
      },
        // @vuese
        // Called when the user wants to buy the current flick.
      buy(){
        if(!this.isGuest()){

        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.post('/api/flix/published/'+this.data._id + '/buy',{},h)
          .then((res)=>{
            if(res.data.success){
              this.$router.push('/flix/purchased/'+this.data._id)
            }
          })
          .catch((err)=>{
            console.log(err)
          })
        } else{
          this.$bus.emit('signupPrompt')
        }

      },
        // @vuese
        // Called when the user has bought and wants to play the flick. Opens the FlixPlayer.
      play(){
        // Tells the parent to open the FlixPlayer.
        this.$emit('open_modal', this.data._id)
      },
        // @vuese
        // Makes adjustments if the client window is small.
      isSmallish(){
        if(document.getElementById('cardd') != null){
          if(document.getElementById('cardd').clientWidth > 185){
            // document.getElementById('cardd').clientWidth = document.getElementById('cardd').clientWidth;
            // console.log("Large card:" + document.getElementById('cardd').clientWidth)
            // setTimeout(()=>{},1)
            // this.$forceUpdate()
            this.filler.push(document.getElementById('cardd').clientWidth)
            this.filler.pop()

            return false
          }else{
            // this.$forceUpdate()

            // setTimeout(()=>{},1)

            // document.getElementById('cardd').clientWidth
            // console.log("Small card: " + document.getElementById('cardd').clientWidth)
            return true
          }
        } else{
          // console.log("null document id ")
          return false
        }
      }
    },
    computed:{

    },
    mounted(){
      // this.$forceUpdate()
      // console.log("Updating: " +document.getElementById('cardd') )
        if(document.getElementById('cardd') != null){

            if(document.getElementById('cardd').clientWidth > 185){

            }else{
              this.isSmall = true
            }
        }
    }

}
</script>
<style scoped>
.link{
    cursor:pointer;
}
.link:hover {
    /* text-decoration: underline; */
    color:#B29126
}

</style>
