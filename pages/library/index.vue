<template>
    <div>
    <v-tabs v-model="model" centered color="transparent" fixed-tabs :hide-slider="slider" class="mt-0">
        <v-tab nuxt to="/library/favourite">Favourites</v-tab>
        <v-tab nuxt to="/library/like" >Liked</v-tab>
        <v-tab nuxt to="/like/seen">Seen</v-tab>
    </v-tabs>
    </div>
</template>

<script>

export default {
    created(){
        this.$router.push('/library/favourite')
    }
}
</script>

<style scoped>

</style>
