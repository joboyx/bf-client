<template>
    <div>
        <div v-if="getUser()">
            <div v-if="getUser().tier === 0">
                <div class="title font-weight-thin text-xs-center justify-center mt-5">
                    You don't have a membership right now.
                </div>
                <div class="title font-weight-thin text-xs-center justify-center mt-5">
                     Go ahead and activate it by clicking the link below!
                </div>
                <v-img 
                :src="require('assets/images/bunnylove.png')"
                height="100px" 
                width="100px"
                class="mt-5 mb-3"
                style="margin:auto;"
                contain
                >
                </v-img>

                <div class="text-xs-center justify-center">
                    <v-btn large to="/bunnylove" nuxt color="#B29126" >Activate!</v-btn>
                </div>
            </div>
            <div v-if="getUser().tier === 1">
                <div class="title font-weight-thin text-xs-center justify-center mt-5">
                    Membership: Hopper
                </div>
                <div class="title font-weight-thin text-xs-center justify-center mt-5">
                    End date: {{getUser().tier_end}}
                </div>
                <div class="caption font-weight-thin text-xs-center justify-center mt-5" v-if="getUser().patreon_connected">
                    You are a Patron.
                </div>
                <div class="caption font-weight-thin text-xs-center justify-center mt-5" v-else>
                    You are not a Patron.
                </div>
            </div>
            <div v-if="getUser().tier === 2">
                <div class="title font-weight-thin text-xs-center justify-center mt-5">
                    Membership: Hopmeister
                </div>

                <div class="title font-weight-thin text-xs-center justify-center mt-5">
                    End date: {{getUser().tier_end}}
                </div>
                <div class="caption font-weight-thin text-xs-center justify-center mt-5" v-if="getUser().patreon_connected">
                    You are a Patron.
                </div>
                <div class="caption font-weight-thin text-xs-center justify-center mt-5" v-else>
                    You are not a Patreon member.
                </div>
            </div>
            <div v-if="getUser().tier === 3">
                <div class="title font-weight-thin text-xs-center justify-center mt-5">
                    Membership: Grandhopper
                </div>
                <div class="title font-weight-thin text-xs-center justify-center mt-5">
                    End date: {{getUser().tier_end}}
                </div>
                <div class="caption font-weight-thin text-xs-center justify-center mt-5" v-if="getUser().patreon_connected">
                    You are a Patron.
                </div>
            </div>
            <v-divider class="ma-5" v-if="!getUser().patreon_connected"></v-divider>
            <div v-if="!getUser().patreon_connected" class="title font-weight-thin text-xs-center justify-center mt-5">
                <v-layout justify-center>

                <v-flex xs12 md7>
                   <v-text-field
                        v-model="code"
                        label="Patreon activation code"
                        v-on:keyup.enter="activate"
                        outline dark
                        background-color="#B29126"
                        color="white"



                    ></v-text-field>
                    <v-btn flat outline @click="activate" :disabled="loading">Enter</v-btn>
                </v-flex>

                </v-layout>
                <v-layout justify-center>
                    <span class="font-weight-thin title">{{msg}}</span>

                </v-layout>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
/**
 * @vuese
 * Component to show and activate the membership.
 * @group Pages
 */
export default {
    data(){
        return { // @vuese
            // Whether the user data has been loaded.
            user:false, // @vuese
            // The code entered by the user.
            code: '', // @vuese
            // A return message from the server.
            msg:'', // @vuese
            // Whether we're still loading.
            loading:false,
        }
    }, 
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        ...mapGetters('user',['getUser']),
        // @vuese
        // Sends the code to the user and attempts to activate a membership.
        activate(){
            this.loading = true
            let h = {headers:{Authorization : this.authenticationToken()}}

            this.$axios.post('/api/patreon/activate', {code:this.code}, h)
                .then((res)=>{
                    this.loading = false
                    // console.log(res)
                    if(res.data.success){
                        // this.$router.push('/')
                        location.reload();
                        // this.user.patreon_connected = true
                        // this.$set(this.user, 'patreon_connected', true)
                        // this.$bus.emit('refresh_carrots')
                    } else{
                        this.msg = 'Failed to activate... try contacting us on Discord or Reddit.'
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    this.msg = 'Failed to activate... try contacting us on Discord or Reddit.'
                    this.loading = false
                })
        }
    },
    created(){
        // let self = this
        // this.$bus.on('user', function(arg){
        //     self.user = arg
        // })

        // this.$bus.emit('get_user')
    }
}
</script>

<style scoped>

</style>