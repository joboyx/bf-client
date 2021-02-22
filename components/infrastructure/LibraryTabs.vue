<template>
    <v-tabs v-model="model" centered color="transparent" fixed-tabs :hide-slider="slider" class="mt-0" show-arrows slider-color="#B29126">
        <v-tab nuxt to="/library/favourite">Favourites</v-tab>
        <v-tab nuxt to="/library/like" >Liked</v-tab>
        <v-tab nuxt to="/library/dislike" >Dislikes</v-tab>
        <v-tab nuxt to="/library/seen">Seen</v-tab>
        <v-tab nuxt to="/library/flicks/flicks">Lists</v-tab>
        <v-tab nuxt to="/library/betterfap" v-if="betterfap">Betterfap</v-tab>
    </v-tabs>

</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

// This component provides the tabs for the library section. Used in (root) `pages/library/*.vue`. 
// @group infrastructure
export default {
    data(){
        return { // @vuese
            // Whether this person has imported data from betterfap, in which case the betterfap tab pops up.
            betterfap:false
        }
    },
    methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),

    },
    created(){
        
    let h = {headers:{Authorization : this.authenticationToken()}}

    this.$axios.$get('/api/user', h)
        .then((res)=>{
            if(res.success){
                if(res.user.bf_import){
                    this.betterfap = true
                } 
            }
        })
        .catch((err)=>{
            console.log(err)
        })

}
}
</script>
