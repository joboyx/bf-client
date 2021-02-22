<template>
<div>


    <v-layout justify-center>
        <v-tabs v-model="tab" color="transparent" slider-color="#B29126">
            <v-tab >Moderation</v-tab>
            <v-tab id="moderationRestStep-0">New tags</v-tab>
            <!-- <v-tab>Tag changes</v-tab> -->
            <v-tab id="moderationRestStep-1">Existing tags</v-tab>
            <v-tab id="moderationRestStep-2">Channels</v-tab>
            <!-- <v-tab>Playground</v-tab> -->
            
        </v-tabs>
    </v-layout>



    <div v-if="admin===true && tab===0">
            <v-layout justify-center>
                <!-- <v-tabs v-model="tabs" slider-color="#B29126" centered color="transparent" fixed-tabs class="mb-2">
                    <v-tab @click="set_page('new')">New</v-tab>
                    <v-tab nuxt to="/playground">Playground</v-tab> 
                </v-tabs> -->
            </v-layout>

                <ModerationAdmin v-if="page==='new'"></ModerationAdmin>

    </div>
    <div v-else-if="admin===false && tab===0">
        <v-container class="mt-5" grid-list-xl>
            <v-layout row wrap justify-center class="mb-5">
                <h1 class="display-1 font-weight-thin mb-3">Moderation</h1>
            </v-layout>
            <v-layout row wrap justify-center class="mb-5">
            <p class='subheading font-weight-light'>
        You haven't reached the required trust level to approve moderations. You can see your progress below. Keep adding appropriate tags, removing
        inappropriate tags, and report missing items to boost your BunnyTrust.
            </p>
            </v-layout>
            <v-layout justify-center row wrap class="mt-5">
                <v-flex xs8 md6>

                <template>
                <v-progress-linear :value="score" v-if="dark" color="#B29126" height="15"></v-progress-linear>
                <v-progress-linear :value="score" v-else color="#B29126" height="15"></v-progress-linear>
                </template>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

    <div v-if="tab===1">
        <TagModerationAdd></TagModerationAdd>
    </div>

    <!-- <div v-else-if="tab===2">
        <TagModerationEditVote></TagModerationEditVote>

    </div> -->
    
    <div v-else-if="tab===2">
        <TagModerationEdit></TagModerationEdit>
    </div>

<div v-else-if="tab===3">
    <ChannelModeration></ChannelModeration>    
</div>

    <!-- <div v-else-if="tab===3">
        <PlayGround></PlayGround>
    </div> -->


</div>

</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
// import ModerationAdminLegacy from '@/components/moderation/ModerationAdminLegacy'
import ModerationAdmin from '@/components/moderation/ModerationAdmin'
import TagModerationAdd from '@/components/moderation/TagModerationAdd'
import TagModerationEdit from '@/components/moderation/TagModerationEdit'
import ChannelModeration from '@/components/moderation/ChannelModeration'
import PlayGround from '@/components/PlayGround'


export default {
    components:{ModerationAdmin,TagModerationAdd,TagModerationEdit,PlayGround,ChannelModeration}, //ModerationAdminLegacy
    data(){
        return{
            admin:'',
            tabs:0,
            page:'new',
            score:0,
            dark:false,
            tab:0,
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'isGuest', 'getUser']),
        set_page(page){
            this.page = page
        }
    },
    created(){
        if(this.isGuest()){
            this.$router.push('/')
        }
        let h = {headers:{Authorization : this.authenticationToken()}}
        let self = this
        this.$axios.$get('/api/user', h)
        .then((res)=>{
            if(res.success){
                this.username = res.user.username
                    this.score = (parseInt(res.user.trust_score)/100)*100
                    this.score = (parseInt(res.user.trust_score)/100)*100
                if(parseInt(res.user.trust_score)>=100 || parseInt(res.user.admin)>0){
                    this.admin=true
                } else{
                    this.admin=false
                }
                        if(this.getUser().tutorial.moderation_new_tags){
                            this.$tours['moderationRest'].start()
                        }
                if(res.user.mode === 'dark'){
                    this.dark = true
                } else{
                    this.dark = false
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    
    },
    
}
</script>

<style scoped>

</style>
