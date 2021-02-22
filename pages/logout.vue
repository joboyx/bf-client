<template>
    <h1>Logging out</h1>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    created(){
        
        this.$axios.$post('/api/auth/logout', null, {headers:{Authorization : this.authenticationToken()}})
        this.$store.commit('auth/logout')
        this.$router.push('/');
    },
    methods:{
        ...mapGetters('auth',['authenticationToken'])
    },
    head: {
    title: 'Logout out of Bunnyfap',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Logout of Bunnyfap. We\'ll see you back soon!'
      }
    ],
  }
}
</script>

<style scoped>

</style>
