<template>
  <div>
      <v-dialog 
        v-model="dialog"
        width="500px"
      >
        <v-card>
            <v-card-title class="display-1 grey darken-1 font-weight-thin text-xs-center justify-center">
                BunnyLove!
            </v-card-title>
            <v-card-text class="text-xs-center font-weight-thin title">
                To need to activate <span nuxt to="/bunnylove"> BunnyLove </span>to use this feature!
            </v-card-text>
            
                <v-img 
                       :src="require('assets/images/bunnylove.png')"
                       height="100px" 
                       width="100px"
                       class="ma-"
                       style="margin:auto;"
                       contain
                    >
                    </v-img>
            <v-card-text class="text-xs-center">
                <v-btn to="/bunnylove" target="_blank" nuxt color="#B29126" >Activate!</v-btn>
            </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
/**
 * @vuese
 * The component contains the BunnyLove promotion dialog, which is called when a user attempts to use a feature which requires a higher level membership. This component can be used by other components which contain features for premium members only.
 * @group modules
 */
export default {
    data(){
        return {
            // @vuese
            // Determines whether the promo dialog box is active or not.
            dialog: false
        }
    },
    methods:{
        // @vuese
        // Called to open the dialog box.
        open_dialog(){
            this.dialog = true
        }
    }
}
</script>

<style scoped>

</style>