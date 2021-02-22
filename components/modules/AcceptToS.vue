<template>
<div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
        v-if="$route.name!='privacy-ToS'"
    >

      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Terms of Service
        </v-card-title>

        <v-card-text>
            We have updated our <nuxt-link to="/privacy/ToS" target="_blank"> Terms of Service</nuxt-link>. Please review and accept these to continue using Bunnyfap.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            @click="accept()"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

/**
 * @vuese
 * This compenent is called once the ToS are updated and the server gives a notification that this must be shown. Could potentially be used to show other notification, but ideally a different component is created with the same functionality.
 * @group modules
 */
export default {
    data () {
      return {
        // @vuese
        // Whether to show the notification dialog or not.
        dialog: false
      }
    },
    methods:{
                ...mapGetters(
                        'auth',['authenticationToken'],
                    ),
        // @vuese
        // Called when the user accepts the ToS
        accept(){
            this.dialog = false
        let h = {headers:{Authorization : this.authenticationToken()}}
            
        this.$axios.$post('/api/user/accept_tos', {}, h)
            .then((res)=>{
                // console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })

        }
    },
    created(){

    },
    mounted(){
        let self = this
                this.$bus.$on('tos_popup', function(){
        //   if (self.$route.name!='privacy-ToS'){
          self.dialog = true
        //   }
      })
    }
}
</script>

<style>

</style>