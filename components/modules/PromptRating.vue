<template>
  <div>
      <v-dialog
      v-model="dialog"
      max-width="320"
      dark
    >
      <v-card>
        <v-card-title class="headline font-weight-thin">How did you like the flick?</v-card-title>

        <v-card-text>
            <v-layout justify-center>
                    <v-rating
                        v-model="rating"
                        background-color="#B29126"
                        color="#B29126"
                        hover
                        @input="submit"
                    ></v-rating>
            </v-layout>
        </v-card-text>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color=""
            flat="flat"
            @click="dialog = false"
          >
            cancel
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

/**
 * @vuese
 * This module prompts users a rating for for a flick, after viewing it. 
 * @group modules
 */
export default {
    data(){
        return { // @vuese
            // Whether the rating dialog is active or not shows or not.
            dialog: false, // @vuese
            // The id of the flick.
            id:'', // @vuese
            // The score of the user.
            rating: 0,
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']), 
        // @vuese
        // Open the dialog box and sets the flick id
        open_dialog(id){
            this.id = id
            this.dialog = true
        },
        // @vuese
        // Submit the user rating for the flick.
        submit(){
            this.dialog = false
            
            let h = {headers:{Authorization : this.authenticationToken()}}

            let body = {
                comment: '',
                rating: this.rating,
            }

            // console.log(this.id)
            let self = this
            this.$axios.$post('/api/flix/published/'+this.id+'/review',body,h)
                .then((res)=>{
                    // console.log(res)
                    self.$emit('rating', self.rating)
                })
                .catch((err)=>{
                    console.log(err)
                })

        }
    }
}
</script>

<style>

</style>