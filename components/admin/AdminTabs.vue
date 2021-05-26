<template>
<div>
    <v-tabs v-model="model" slider-color="#B29126" centered color="transparent" fixed-tabs :hide-slider="slider" class="mt-0">
        <v-tab nuxt to="/admin/new_tags">New Tags</v-tab>
        <v-tab nuxt to="/admin/existing_tags" >Existing Tags</v-tab>
        <v-tab v-if="god" nuxt to="/admin/stats" >Statistics</v-tab>
    </v-tabs>
</div>

</template>

<script>
import { mapGetters } from 'vuex'

// Navigation tabs for the admins. Use this to view new proposed tags, edit existing tags, and view user statistics. User statistics can only be viewed if the admin level is high enough. In the `create` method the user data is pulled from the vuex store.  
// @group admin
export default {
    data(){
        return { // @vuese
            // The position of the tabs.
            model:0, // @vuese
            // If true, then user admin level is high enough to view statistics.
            god:false
        }
    },
    methods:{
        // @vuese
        // Get the `getUser` method to retrieve the user data from the vuex store..
        ...mapGetters(
                'user',['getUser'],
            ),
    },
    created(){
        // console.log(this.getUser().admin)
        if(parseInt(this.getUser().admin)>100){
            this.god = true
        }
    }
}
</script>

<style scoped>

</style>
