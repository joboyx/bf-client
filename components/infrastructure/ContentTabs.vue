<template>
    <v-tabs v-model="model" slider-color="#B29126" centered color="transparent" fixed-tabs :hide-slider="slider" class="mt-0" show-arrows>
        <v-tab nuxt to="/" id="landingStep-1">Recommended</v-tab>
        <!-- <v-tab nuxt to="/">Recommended</v-tab> -->
        <v-tab nuxt to="/top" >Top</v-tab>
        <v-tab nuxt to="/new" >New</v-tab>
        <v-tab nuxt to="/explore" >Explore</v-tab>
        <v-tab nuxt to="/cct">Categories</v-tab>
        <!-- <v-tab nuxt to="/playground">Playground</v-tab> -->
    </v-tabs>
</template>

<script>

// @vuese
// The tabs on the homepage (not the navigation bar). `Recommended`, `Top`, `New`, `Explore`, and `Categories`.
// @group infrastructure
export default {
    data(){
        return { // @vuese
            // Which tab is currently selected.
            model:0, // @vuese
            // Whether the slider paramater for the Vuetify tab functionality should be hidden or not.
            slider:false
        }
    }
}
</script>

<style scoped>

</style>
