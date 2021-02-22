<template>
<div>
     <v-toolbar dark v-if="false">
        <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-btn icon @click="reaction('like')" :disabled="!loggedIn" v-on="on">
          <v-icon color="amber" v-if="data.like===true">thumb_up</v-icon>
          <v-icon v-else>thumb_up</v-icon>
        </v-btn>
        </template>
        <span v-if="loggedIn">Like</span>
        <span v-else>Login to like!</span>
      </v-tooltip>

          <span>{{data.likes}}</span>





        <v-spacer></v-spacer>

          <span>{{data.dislikes}}</span>

        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
              <v-btn icon @click="reaction('dislike')" :disabled="!loggedIn" v-on="on">
          <v-icon  v-if="data.dislike===true" color="amber">thumb_down</v-icon>
          <v-icon  v-else>thumb_down</v-icon>
        </v-btn>
        </template>
        <span>
          Dislike
        </span>
        </v-tooltip>


        <v-spacer></v-spacer>

          <span>{{data.hearts}}</span>
        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-btn  icon @click="reaction('favourite')" :disabled="!loggedIn" v-on="on">
          
          <v-icon color="red" v-if="data.favourite===true">favorite</v-icon>
          <v-icon v-else>favorite</v-icon>
        </v-btn>
        </template>
        <span>Add to favourites!</span>
        </v-tooltip>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <v-btn flat icon :disabled="!loggedIn" v-on="on">
          <v-icon>add</v-icon>
        </v-btn>
        </template>
        <span>Add to playlist</span>
        </v-tooltip>


  </v-toolbar>

  <v-toolbar dark class="text-xs-center">
    <v-container fluid align-center class="ma-0 pa-0">
      <v-layout justify-center align-start >
<span class="subheading font-weight-thin">{{truncate(data.title)}}</span>
<!-- <span class="subheading font-weight-thin">{{data._id}}</span> -->

      </v-layout>
    </v-container>
  </v-toolbar>
</div>



</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

/**
 * @vuese
 * When users hover over a resource thumbnail, the title of the resource appears on the bottom of the thumbnail. It is called `BottomStat` because initially we were experimenting with showing other statistics here, and allowing users to upvote and downvote resources. Finally we decided to just keep the title here.
 * @group Content
 */
export default {

    props:['data'],
    data(){
      return{ // @vuese
        // The authorisation headers for the api call.
        headers: {'Authorization' : this.authenticationToken()}, // @vuese
        // Whether the user is logged in or not (retrieved from the vuex).
        loggedIn : this.isLoggedIn()
      }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
      // @vuese
      // Deprecated. If used, needs to be updated.
      reaction(reaction){
        if(this.isLoggedIn()){
          // console.log({headers:{'Authorization' : this.authenticationToken()}})
          this.$axios.$post('/api/resource/single/' + this.data._id + '/reaction/'+reaction, null, {headers:{Authorization : this.authenticationToken()}})
            .then((res)=>{
              // console.log(res)
                if(res.success){
                  this.$emit('reaction', reaction)
              }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
      }, 
      // @vuese
      // Truncates the title so that the bottom bar doesn't take up the whole thumbnail.
        truncate(s){
            let max_ = 30
            if(s.length >= max_)
                return s.substring(0,max_)+"...";
            else
                return s
        },
    }
}
</script>

<style scoped>

</style>
