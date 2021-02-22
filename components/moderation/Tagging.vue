<template>
    <div>



                        
        <v-dialog
        v-model="open"
        width="700"
        height="500"
        persistent
        @keydown.esc="$emit('close_tag_suggestion')"
        style="overflow: hidden"
        scrollable
        >
        <!-- @keydown.shift="next" -->

        <v-card>
            <v-card-title
            class="headline grey darken-2 white--text"
            primary-title
            >
            Suggest new tags (t)
            </v-card-title>

            <v-card-text>

            Please suggest tags which are relevant to the image/video.
            <v-layout class="mt-2 mb-2">

            <v-chip close @input="$emit('removeTag',index)" v-for="(tag,index) in resource.tags"  :key="index" class="text-xs-center">
              
              <a class="tag_link" :href="'/tags/'+tag" target="_blank" rel="noopener noreferrer"> {{tag}} </a>
            </v-chip>
            </v-layout>
            <!-- {{resource.tags}} -->
            <!-- {{suggested_tags}} -->
                    <!-- autofocus -->
                    <v-autocomplete
                    ref="completer"
                    id="autocomplete_tags"
                    v-model="suggested_tags"
                    :search-input.sync="tag_input_value"
                    multiple
                    chips
                    deletable-chips
                    hide-selected
                    :items="tags"
                    color="blue-grey lighten-2"
                    label="Tag"
                    v-on:keyup.enter="submit"
                    @change="tag_mod"
                    >


                    </v-autocomplete>


            <v-chip color="#B29126" v-for="(tag,index) in resource.s_tags"  :key="index" class="text-xs-center" >
              <a class="tag_link" :href="'/tags/'+tag.tag" target="_blank" rel="noopener noreferrer"> {{tag.tag}} </a>
                <v-icon class="ml-2" small color="black" style="width:20px" @click="$emit('vote_up', index)" :disabled="!isLoggedIn()" v-if="tag.upvote">thumb_up</v-icon>
                <v-icon class="ml-2" small color="white" v-else style="width:20px" @click="$emit('vote_up', index)" :disabled="!isLoggedIn()">thumb_up</v-icon>
                {{parseInt(tag.score)}}
                <v-icon small style="width:20px" color="black" @click="$emit('vote_down', index)" :disabled="!isLoggedIn()" v-if="tag.downvote">thumb_down</v-icon>
                <v-icon small style="width:20px" color="white" @click="$emit('vote_down', index)" :disabled="!isLoggedIn()" v-else>thumb_down</v-icon>
            </v-chip>
            <v-flex>


                        <!-- style="position:absolute" -->
            </v-flex>



                    <!-- auto-select-first -->
                    <!-- @change="tag_input_value=''" -->
                <v-layout row wrap>


                </v-layout>

            </v-card-text>


            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                flat
                @click="$emit('close_tag_suggestion_button')"
                >
                Close
                </v-btn>
            <v-btn
                flat
                @click="suggest_tags"
            >
                Send suggestion
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>

    </div>
</template>

<script>
// import { tags } from '@/data/tags'
import { mapGetters } from 'vuex'
import axios from 'axios'

/**
 * @vuese
 * This compenent allows people to add new tags to resources. 
 * @group moderation
 */
export default {
    props:['resource', 'open', 'mode'],
    data(){
        return { // @vuese
        // List of all possible tags pulled from the server.
            tags:[], // @vuese
        // The tag the user is typing at the moment.
            tag_input_value:'', // @vuese
        // List of tags suggested by the user.
            suggested_tags:[],
        }
    },
    
    methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
      // @vuese
      // Duplicate
        suggest_tags(){
            // console.log("ENTER")
        },
      // @vuese
      // Sends the list of suggested tags the server.
        suggest_tags(){
        /* Implement api call to suggest tags */
        if(this.isLoggedIn()){     
            for(let i of this.suggested_tags){
            // console.log(i)
            // console.log(this.resource._id)
            this.$axios.$post('/api/moderate/' + this.resource._id + '/suggest/tag/'+i,null,{headers:{Authorization : this.authenticationToken()}})
            .then((res)=>{
            //   console.log(res)
            //   console.log("Received!")
              this.suggested_tags = []
            })
            .catch((err)=>{
                // console.log("Error:")
              console.log(err)
            })
          }
        }
        // Once the suggestion has been sent, the data is sent back to the theatre, so that it knows that keyboard functionality can be reverted.
        this.$emit('suggestion_sent', this.suggested_tags)
        // this.suggestion_snackbar = true
        // this.closeTagSuggestion()
      },
      // @vuese
      // Checks whether the input values are valid before sending it to the server.
      submit(){
        //   console.log(this.tag_input_value)
          if(this.tag_input_value==='' || this.suggested_tags===null || this.tags.includes(this.tag_input_value)){
              this.suggest_tags()
          } else {
              this.tag_input_value=''
          }
      },
      // @vuese
      // Resets the user input string.
      tag_mod(){
          this.tag_input_value = ''
      },
      // @vuese
      // Deprecated.
      next(){
        //   console.log("Next")
      },
    },
    created(){
        // console.log("TAGGING")

        let h = {headers:{Authorization : this.authenticationToken()}}
        
        this.$axios.$get('/api/tag/existing/clean', h)
          .then((res)=>{
            this.tags = res.tags
          })
          .catch((err)=>{
            console.log(err)
          })
    },
    watch:{
        'open' : function(){
            if(this.open){
                setTimeout(() => document.getElementById("autocomplete_tags").focus(), 0);                
            }
        }
    },
}
</script>

<style scoped>
.tag_link{
  text-decoration: none;
  color: inherit;
  
}
.tag_link :hover{
  text-decoration: underline;
}
</style>
