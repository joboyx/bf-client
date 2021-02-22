<template>
<div>
    <v-tabs v-model="model" slider-color="#B29126" centered color="transparent" fixed-tabs :hide-slider="slider" class="mt-0" show-arrows>
        <v-tab nuxt to="/categories/all">Categories</v-tab>
        <v-tab nuxt to="/categories/all" >Tags</v-tab>
        <v-tab nuxt to="/categories/all" >Channels</v-tab>
    </v-tabs>
</div>

</template>

<script>

// @vuese
// This seems to be deprecated.
// @group infrastructure
export default {
    data(){
        return {
            // @vuese
            // Which tab is currently selection
            model:0
        }
    }
}
</script>

<style scoped>

</style>
