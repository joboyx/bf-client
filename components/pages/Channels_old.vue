<template>
    <div>
        <v-layout row wrap class="text-xs-left">
            <v-flex xs6 sm6 md4 lg3 v-for="(channel, index) in channels" :key="index" class="pa-1">

            <v-chip color=""  class="text-xs-center" >
              <nuxt-link class="channel" :to="'/channels/'+channel.channel" target="_blank" rel="noopener noreferrer"> {{channel.channel}} </nuxt-link>

            </v-chip>


            </v-flex>
        </v-layout>
        <v-card v-if="channels.length == 0" width="100%" color="transparent" flat>

        <v-layout justify-center>
                <v-progress-circular
                :size="70"
                :width="7"
                color="#B29126"
                indeterminate
                class="mt-5"
                ></v-progress-circular>
        </v-layout>

    </v-card>
    </div>
</template>

<script>
// import { channels } from '@/data/search_items'
import axios from 'axios'
import { mapGetters } from 'vuex'

/**
 * @vuese
 * Deprecated.
 * @group Pages
 */
export default {
    data(){
        return { 
            channels:[

            ],
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
    },
    mounted(){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/tag/channels-clean', h)
            .then((res)=>{
                this.channels = res.channels
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}
</script>

<style scoped>

.channel{
    text-decoration: none;
    color: inherit
}

</style>
