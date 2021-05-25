<template>
    <div>

        <v-container fluid>
            <v-layout justify-center row wrap>
    <!-- <v-tabs v-model="tabs" slider-color="#B29126" centered color="transparent" fixed-tabs :hide-slider="slider" class="mt-0" show-arrows> -->
    <!-- <v-tabs v-model="model" slider-color="#B29126" centered color="transparent" fixed-tabs :hide-slider="slider" class="mt-0" show-arrows> -->

                <v-tabs v-model="tabs" style="overflow:hidden" slider-color="#B29126" centered dark color="transparent" fixed-tabs class="mb-2" show-arrows>
                    <v-tab v-if="!isGuest()" @click="set_page('preferences')">Filter preferences</v-tab>
                    <v-tab v-if="!isGuest()" @click="set_page('tags')">Tag preferences</v-tab>
                    <v-tab v-if="!isGuest()" @click="set_page('stats')">Statistics</v-tab>
                    <v-tab v-if="!isGuest()" @click="set_page('security')">Security</v-tab>
                    <v-tab v-if="!isGuest()" @click="set_page('membership')">Membership</v-tab>
                   <!-- <v-tab @click="set_page('aifupload')">AIF Upload</v-tab>
 
                    <!-- <v-tab nuxt to="/playground">Playground</v-tab> -->
                </v-tabs>
            </v-layout>
            <v-layout row justify-center>
                <!-- <v-flex xs4 >
                    <v-navigation-drawer permanent class="transparent" floating>
                <v-toolbar flat color="transparent">
                    <v-list>
                    <v-list-tile>
                        <v-list-tile-title class="title">
                        Profile
                        </v-list-tile-title>
                    </v-list-tile>
                    </v-list>
                </v-toolbar>


                <v-list>
                    <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    @click="set_page(item.page)"
                    >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-navigation-drawer>
                </v-flex> -->

                <v-flex xs12 sm8 md6 justify-start v-if="current_page==='security'">
                    <h1 class="display-1 font-weight-thin mt-4">Security</h1>
                    <v-divider class="ma-5"></v-divider>
                    <h1 class="headline font-weight-thin">Change password</h1>
                        <v-form ref="form" v-model="valid" lazy-validation>
                                <v-layout wrap justify-center>

                                <v-flex xs12>
                                    <v-text-field
                                        prepend-icon="lock"
                                        :type="show1 ? 'text' : 'password'"
                                        v-model="current_pass"
                                        :rules="passRules"
                                        label="Current password"
                                        required
                                        v-on:keyup.enter="change_pass"
                                        outline
                                        dark
                                        background-color="#B29126"
                                        color="white"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        prepend-icon="lock"
                                        :type="show1 ? 'text' : 'password'"
                                        v-model="password"
                                        :rules="passRules"
                                        label="New password"
                                        required
                                        v-on:keyup.enter="change_pass"
                                        outline
                                        dark
                                        background-color="#B29126"
                                        color="white"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                        prepend-icon="lock"
                                        :type="show1 ? 'text' : 'password'"
                                        v-model="passwordRepeat"
                                        :rules="passRepeat"
                                        label="Repeat new password"
                                        required
                                        v-on:keyup.enter="change_pass"
                                        outline
                                        dark
                                        background-color="#B29126"
                                        color="white"

                                    ></v-text-field>
                                </v-flex>

                                <v-flex xs12 justify-center>
                                    <v-btn
                                        :disabled="!valid"
                                        large
                                        @click="change_pass"
                                        flat
                                    >
                                        Change password
                                    </v-btn>
                                </v-flex>


                                </v-layout>
                                </v-form>
                                {{change_pass_msg}}

                        <template v-if="!verified">

                    <v-divider class="ma-5" ></v-divider>

                    <h1 class="headline font-weight-thin mb-3">Change email</h1>

                            <v-form ref="verify_email_form" v-model="valid_email" lazy-validation>

                            <v-text-field
                            prepend-icon="email"
                            v-model="email_verify"
                            :rules="emailRules"
                            label="New e-mail"
                            v-on:keyup.enter="verify_email"
                            flat
                            outline
                            dark
                            background-color="#B29126"
                            color="white"
                        ></v-text-field>
                        <v-text-field
                            prepend-icon="lock"
                            type='password'
                            v-model="password_email_change"
                            :rules="passRules"
                            label="Password"
                            required
                            v-on:keyup.enter="verify_email"
                            id="email_password"
                            outline
                            dark
                            background-color="#B29126"
                            color="white"
                        ></v-text-field>

                            </v-form>


                        <v-btn @click="verify_email" flat :disabled="!valid_email">Change</v-btn>
                        {{verify_email_msg}}
                        </template>

                </v-flex>
                <!-- <v-flex v-else-if="current_page==='stats'">
                    <h1 class="display-3 font-weight-thin">Your stats</h1>
                </v-flex> -->
                <v-flex xs12 sm8 md6 v-else-if="current_page==='preferences'">
                    <h1 class="display-1 font-weight-thin mt-4">Preferences</h1>
                    <v-divider class="ma-5"></v-divider>
                    <h1 class="headline font-weight-thin">Art form</h1>
                    <v-layout justify-start>
                        <v-flex xs4>
                        <v-checkbox v-model="art" label="Hentai" value="comic" color="#B29126"  @change="update_preferences"> </v-checkbox>
                        </v-flex>
                        <v-flex xs4>
                        <v-checkbox v-model="art" label="Real-life" value="real-life" color="#B29126" @change="update_preferences"> </v-checkbox>

                        </v-flex>

                        <v-flex xs4>
                        <v-checkbox v-model="art" label="3D" value="three-d" color="#B29126" @change="update_preferences"> </v-checkbox>

                        </v-flex>


                    </v-layout>
                    <v-divider class="ma-5"></v-divider>
                    <h1 class="headline font-weight-thin">Content preferences</h1>
                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-checkbox v-model="orientation" label="Straight" value="straight" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                        <v-flex xs4>
                            <v-checkbox v-model="orientation" label="Gay" value="gay" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                        <v-flex xs4>
                            <v-checkbox v-model="orientation" label="Lesbian" value="lesbian" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                        <v-flex xs4>
                            <v-checkbox v-model="orientation" label="Trans" value="trans" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                        <v-flex xs4>
                            <v-checkbox v-model="orientation" label="Solo man" value="solo-man" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                        <v-flex xs4>
                            <v-checkbox v-model="orientation" label="Solo woman" value="solo-woman" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                    </v-layout>


                    <v-divider class="ma-5"></v-divider>
                    <h1 class="headline font-weight-thin">Media type preferences</h1>
                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-checkbox v-model="type" label="WebMs" value="web_video" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                        <v-flex xs4>
                            <v-checkbox v-model="type" label="Gifs" value="gif" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                        <v-flex xs4>
                            <v-checkbox v-model="type" label="Images" value="img" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                        <v-flex xs4>
                            <v-checkbox v-model="type" label="Videos" value="video" color="#B29126" @change="update_preferences"> </v-checkbox>
                        </v-flex>

                    </v-layout>


                    <v-divider class="ma-5" v-if="false"></v-divider>
                    <h1 class="headline font-weight-thin" v-if="false">Preferred categories</h1>
                    <!-- <v-layout row wrap v-if="false">
                        <v-flex xs2 v-for="(genre, index) in genres" :key="index">
                            <v-checkbox v-model="categories" :label="genre" :value="genre" color="#B29126"> </v-checkbox>
                        </v-flex>
                    </v-layout> -->
                </v-flex>

                <v-flex xs12 sm8 md6 v-else-if="current_page==='keys'">
                    <h1 class="display-1 font-weight-thin mb-3">Keys</h1>
                    <div v-if="keys.length !=0">
                        <p class="subheading font-weight-light" align="justify">
                            Below you will find {{keys.length}} unique referral <span v-if="keys.length==1">key</span> <span v-else>keys</span>. They can be used to invite others to BunnyFap. Once they are used up, you won't get more.
                        </p>
                        <p class="subheading font-weight-light" align="justify">
                            Use them wisely. With great hopping power, comes great responsibility.
                        </p>

                        <p class="subheading font-weight-light" align="justify">
                            <ol>
                                <li v-for="(k, index) in keys" :key="index">{{k}}</li>
                            </ol>
                        </p>
                    </div>

                    <div v-else>
                        <p class="subheading font-weight-light" align="justify">
                            You have done the impossible. We will not forget. You will be rewarded.
                        </p>
                    </div>





                </v-flex>

                <v-flex v-else-if="current_page==='aifupload'">
                    <!-- <AifUpload></AifUpload> -->
                </v-flex>

                <v-flex v-else-if="current_page==='stats'">
                    <Stats></Stats>
                </v-flex>

                <v-flex v-else-if="current_page==='membership'">
                    <Membership></Membership>
                </v-flex>

                <v-flex v-else-if="current_page==='tags'">
                    <div v-if="user.tier == 0">
                        <div class="title font-weight-thin text-xs-center justify-center mt-5">
                            You need to activate BunnyLove Hopper to view this page!
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
                    <div v-else>
                        <Tags></Tags>
                    </div>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
// import { genres } from '@/data/genres'
import Stats from '@/components/pages/Stats'
// import AifUpload from '@/components/modules/AifUpload'
import Membership from '@/components/pages/Membership'
import Tags from '@/components/pages/Tags'


export default {
    components:{Stats,Membership,Tags},
    data(){
        return {
            items: [
                { title: 'Preferences', icon: 'games', page:'preferences' },
                { title: 'Security', icon: 'lock', page:'security'},
                // { title: 'Stats', icon: 'timeline', page:'stats' },
            ],
            current_page:'preferences',
            show1:false,
            show2:false,
            show3:false,
            valid: true,
            valid_email:true,
            email_verify:'',
            change_pass_msg: '',
            current_pass: '',
            password: '',
            passwordRepeat: '',
            msg : '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length >= 5) || 'Name must be at least 5 characters'
            ],
            passRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 3) || 'Password must be at least 3 characters'
            ],
            passRepeat : [
                v => !!v || 'Please repeat your password',
                v => (v && v===this.password) || "Passwords don't match"
            ],
            emailRules: [
                v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
            art:[],
            orientation: [],
            categories:[],
            type:[],
            keys:['Loading...'],
            verified:false,
            verify_email_msg: '',
            password_email_change:'',
            user: false,
            tabs:0
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'isGuest']),
        set_page(page){

                this.current_page = page
        },
        change_pass(){
            this.$axios.$post('/api/auth/change_password', this.get_pass_body(), this.get_headers())
                .then((res)=>{
                    if(res.success === true){
                        this.change_pass_msg = "Password successfully changed!"
                        this.$refs.form.reset()

                    } else{
                        this.change_pass_msg = "You have entered an incorrect password."
                    }
                })
                .catch((err)=>{
                    this.change_pass_msg = res.msg
                })
        },
        update_preferences(){
            this.$axios.$post('/api/user/preferences', this.get_body(), this.get_headers())
        },
        verify_email(){

      if (this.$refs.verify_email_form.validate()) {
          this.verify_email_msg = 'Submitting...'
            this.$axios.$post('/api/auth/change_email', {email:this.email_verify, password:this.password_email_change}, this.get_headers())
                .then((res)=>{
                    if(res.success){
                        this.verify_email_msg = "Successfully updated your email."
                    } else{
                        this.verify_email_msg = res.msg
                    }
                })
                .catch((err)=>{
                    this.verify_email_msg = "Something went wrong"
                    console.log(err)
                })

            this.email_verify = ''
            this.password_email_change = ''
            document.getElementById('email_password').blur()
            this.$refs.verify_email_form.reset()
      } else{
          this.verify_email_msg = 'Please enter a valid email'

      }
        },
        get_body(){
            return {
                art: this.art,
                orientation: this.orientation,
                type: this.type,
                //categories: this.categories,
            }
        },
        get_pass_body(){
            if(this.isLoggedIn()){
                return {
                    old_password: this.current_pass,
                    new_password: this.password,
                    new_password_repeat: this.passwordRepeat
                }
            }
        },
        get_headers(){
            if(this.isLoggedIn()){
                return {headers:{Authorization : this.authenticationToken()}}
            }else{
                return {}
            }
        },
    },
    created(){
        let self = this
        this.$bus.on('user', function(arg){
            self.user = arg
        })

        this.$bus.emit('get_user')

        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/user', h)
            .then((res)=>{
                if(res.success){
                    this.art = res.user.art
                    this.orientation = res.user.orientation
                    this.type = res.user.type
                    // console.log(res.user)
                    this.keys = res.user.keys
                    this.verified = res.verified || false

                }
            })
            .catch((err)=>{
                console.log(err)
            })

    },
    head () {
        return {
            titleTemplate: `Profile - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Your Porn browsing and viewing preferences.`
            }],
        }
    }
}
</script>

<style scoped>

</style>
