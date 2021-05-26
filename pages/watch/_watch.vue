<template>
  <v-app :dark="true" class="grey darken-4">

<div class='main'>
    
    <Theatre v-if="open" :data="[$store.getters['watch/getResource']]" :id="'watch_master'"
    :betterfap="false" ref="single_theatre"
    @like="like($event)"
    @dislike="dislike($event)"
    @favourite="favourite($event)"
    ></Theatre>
    <!-- <Media :title="title" :data_endpoint="data_endpoint" :data_endpoint_auth="data_endpoint_auth" :description="description" :search="search" :tagline="tagline" :data="resource" :index="index" :watch="true"></Media> -->
    <!-- {{todos}} -->
    <!-- {{$store.getters['todos/getAllTodos']}} -->
    <!-- {{getUser()}} -->
    <!-- <v-btn @click="addTodo">add</v-btn>
    <v-btn @click="removeTodo">remove</v-btn> -->
     <!-- <v-btn @click="open_modal">Open</v-btn> --->

    <!-- {{$store.getters['watch/getResource']}}  -->
    
    <!-- <Utils ref=utils></Utils> -->
</div>
  </v-app>


</template>

<script>
import { mapGetters } from 'vuex'
import cookie from 'cookie'
import Theatre from '@/components/content/Theatre'


export default {
    layout:'watch',
    components: {
        Theatre
    },
    async asyncData({$axios, req, route, redirect}) {
        if(!route.params.watch){
            redirect('/')
        }
        //60a15bdec0c33730b20550a0--TO-tu0kELgbr7sbrLyaOrikIkUhfjtjMhCbvlzGKY45BuZ-AolgVRzOe81-xwpPj5J3N77KpqrtJ17qBt56aA
        // 60a15bf7c0c33730b20553f6-zML0ZLVm6J8ErIAGGEY2DBOjCLFeiOsabHK52TpPHLN6WoiwYavlNUiWF671ZocWnSWdvCSG1X2bK9OKHDDxIQ
        // let resource = {}
        // console.log(store.getters['auth/getAuthHeader'])
        //"60a01b08c0c33730b2e20e3e-ssLCXvL0Rx2xvD0cP8CRdKGgD-zRp571upSKUlg_rC5NE071zhUOW9DNQ0QR_7e-L7HVOXQ-rzugutO2H3tNYA"
        let token = {}

        // let token = { headers: { Authorization: 'Bearer Bearer 6098368a97ae400bc8c3db1e-JuRYBU35veyLrwPWnTBxTeY178MTyZs1TLtmV45lglA2fAsMPwsB6AitqAuQaZjTy0VVE9qs2Nt8YoZG2yybxw'}}
        if (req && req.headers.cookie){
            const parsedCookie = cookie.parse(req.headers.cookie).vuex;
            if (JSON.parse(parsedCookie).auth.authData.token != false){
                token = {headers:{Authorization: 'Bearer ' + JSON.parse(parsedCookie).auth.authData.token}}
            } else{
                token = {}
            }
            // console.log(token)
        } else{
            // token = { headers: { Authorization: 'Bearer 60a01b08c0c33730b2e20e3e-ssLCXvL0Rx2xvD0cP8CRdKGgD-zRp571upSKUlg_rC5NE071zhUOW9DNQ0QR_7e-L7HVOXQ-rzugutO2H3tNYA'}}
            token = {}
        }

        let res = {}
        try {
            res = await $axios.$get('/api/resource/single/' + route.params.watch, token)
        } catch(err){
            console.log(err)
            redirect('/')
        }
        // console.log(res)
        const resource = res.resource
        // console.log(resource)
        return { resource }
    },
    data() {
        return {
            title: 'Top',
            description: "Top",
            tagline: "The very best of the best",
            search: true,
            data_endpoint: '/api/resource/top',
            data_endpoint_auth: '/api/resource/top/auth',
            resource: false,
            open: false
        }
    },
    computed: {
        todos(){
            return this.$store.getters['todos/getAllTodos']
        },
        searchQuery(){
            return this.$store.getters['search/getSearchQuery']
        }
    },
    created() {

        if (this.resource){
            this.$store.dispatch('watch/setResource', this.resource)
        } 

        // console.log(this.resource)
        // console.log(this.res)
        // if(this.$route.params.new){
        //     this.new = true
        // }
        // console.log(this.$store.getters['auth/getAuthHeader'])
        // this.$axios.$get('/api/resource/single/5eec7ff095c312b1cf72b42d', {})
        //     .then((res)=>{
        //         // console.log(res)
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        
    },
    mounted(){

        // this.$refs.single_theatre.openModal(0)
        // document.documentElement.style.overflow = 'hidden';
        // document.body.scroll = "no";
        this.open = true
        let self = this
        setTimeout(function(){
        self.$refs.single_theatre.openModal(0)
        },0)

    },
    methods: {
        ...mapGetters('auth', ['isLoggedIn', 'authenticationToken', 'getAuthHeader']),
        ...mapGetters('user', ['getUser']),
        ...mapGetters('search', ['getSearchQuery']),
        addTodo(){
            this.$store.commit('todos/add', 'New todo')
        },
        removeTodo(){
            this.$store.dispatch('todos/test', "With awesome text")
        },
        open_modal(){
            this.$refs.single_theatre.openModal(0)
        },
        like(){
            this.$store.commit('watch/like')
        }, 
        dislike(){
            this.$store.commit('watch/dislike')
        },
        favourite(){
            this.$store.commit('watch/favourite')
        }
    },
    head () {
        return {
            title: '',
            titleTemplate: `${this.$store.getters['watch/getResource'].title} - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Watch ${this.$store.getters['watch/getResource'].title} in HD only at Bunnyfap. Unlimited ${this.$store.getters['watch/getResource'].channel[0]} Porn with more added every day!`
            }],
        }
    }
}
</script>

<style scoped>
.main{
    overflow: hidden;
}
</style>
