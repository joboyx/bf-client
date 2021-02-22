<template>
    <v-tabs v-model="model" slider-color="#B29126" centered color="transparent" fixed-tabs :hide-slider="slider" class="mt-0" show-arrows v-if="true">
        <v-tab nuxt to="/flix/store" id="flixStep-0">Store</v-tab>
        <v-tab  v-if="!isGuest()" nuxt to="/flix/purchases" id="flixStep-3">My Purchases</v-tab>
        <v-tab  v-if="!isGuest()" nuxt to="/flix/published" >Published</v-tab>
    </v-tabs>
</template>

<script>
import {mapGetters } from 'vuex'

// Component which shows the tabs for the flix: `Store`, `My Purchases`, and `Published`.
// @group infrastructure
export default {
    data(){
        return { //@vuese
            // The position of the tab.
            model:0
        }
    },
    methods:{
      ...mapGetters('auth',['isGuest']),

    }
}
</script>

<style scoped>

</style>
