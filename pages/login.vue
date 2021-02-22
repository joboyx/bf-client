<template>
    <div>

      <v-layout row wrap class="mb-5 mt-4 text-xs-center" v-if="true" justify-center>
        <template>
          <v-tabs fixed-tabs dark slider-color="#B29126" color="transparent">
            <v-tab @click="activateLogin">
              Login
            </v-tab>
            <v-tab @click="activateRegister" >Register</v-tab>
          </v-tabs>
        </template>
      </v-layout>
<!-- v-if="!capped" -->
      <v-layout row wrap class="mb-5 mt-4 text-xs-center" v-if="false" justify-center>
        <v-flex xs6>

          <span @click="activateLogin" style="cursor:pointer" class="headline font-weight-thin pa-1">Login</span>
          </v-flex>
        <v-flex xs6>
          <span @click="activateRegister" style="cursor:pointer" class="headline font-weight-thin pa-1 underline">Register</span>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-center class="mb-5 mt-3" v-if="false">
        <nav>
          <a href="#" @click="activateLogin">Login</a>
          <a href="#" @click="activateRegister">Register</a>
          <div class="underline"></div>
        </nav>
      </v-layout>

<v-form v-model="valid" ref="form_login">
      <v-layout row wrap v-if="loginActive" class="text-xs-center">

        <v-flex xs12>
        <v-text-field
            v-model="username"
            prepend-icon="person"
            :rules="nameRules"
            label="Username"
            required
            v-on:keyup.enter="signin"
            autofocus
            outline
            dark
            background-color="#B29126"
            color="white"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>

        <v-text-field
            @click:append="show1 = !show1"
            prepend-icon="lock"
            :type="show1 ? 'text' : 'password'"
            v-model="password"
            :rules="passRules"
            label="Password"
            required
            v-on:keyup.enter="signin"
            outline
            dark
            background-color="#B29126"
            color="white"
          ></v-text-field>
    <v-layout right class="text-xs-center mb-4">
          <span class="body-2 mt-3 mr-3 font-weight-thin white--text underline-on-hover" @click.stop="dialog = true;forgot_password_msg=''">Forgot password</span>

        <!-- <a class="btn-11" @click="signin" style="cursor:pointer">Login</a> -->
        <v-btn @click="signin" large flat outline dark >Login</v-btn>
  </v-layout>
        </v-flex>
                        <v-layout justify-center class="mt-3 mb-3 text-xs-center" v-if="capped">
        <!-- <span class="subheading font-weight-light">{{msg}}</span> -->
        <span class="subheading font-weight-light white--text" v-html="msg"></span>
      </v-layout>
      </v-layout>
</v-form>

 <!-- && !capped -->

      <v-layout row wrap v-if="registerActive" >

        <v-flex xs12>

<v-form v-model="valid" ref="form_register">
        <v-text-field
            v-model="username"
            prepend-icon="person"
            :counter="20"
            :rules="nameRules"
            label="Username"
            required
            v-on:keyup.enter="next"
            :error-messages="errors"
            outline
            dark
            background-color="#B29126"
            color="white"
          ></v-text-field>

        <v-text-field
            @click:append="show1 = !show1"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            prepend-icon="lock"
            :type="show1 ? 'text' : 'password'"
            v-model="password"
            :rules="passRules"
            label="Password"
            required
            v-on:keyup.enter="validate"
            outline
            dark
            background-color="#B29126"
            color="white"
          ></v-text-field>
            <!-- class="mb-3" -->

        <!-- <v-text-field
            prepend-icon="vpn_key"
            v-model="key"
            label="Key"
            required
            v-on:keyup.enter="validate"
            outline dark
            class=""
            v-if="capped || true"
            background-color="#B29126"
            color="white"
          ></v-text-field> -->

</v-form>

   <v-text-field
            prepend-icon="email"
            v-model="email"
            :rules="emailRules"
            label="E-mail (optional, to enable password reset)"
            v-on:keyup.enter="validate"
            outline dark
            background-color="#B29126"
            color="white"
          ></v-text-field>



                <v-layout justify-center class="mt-3 text-xs-center" v-if="capped">
        <!-- <span class="subheading font-weight-light">{{msg}}</span> -->
        <span class="subheading font-weight-light" v-html="msg"></span>
      </v-layout>


      <span class="headline font-weight-thin white--text">Preferences</span>
          <v-layout row wrap class="mt-2 text-xs-center" justify-end>
                  <v-checkbox v-model="orientation" label="Women" value="women" color="#B29126" dark> </v-checkbox>
                  <v-checkbox v-model="orientation" label="Men" value="men" color="#B29126" dark> </v-checkbox>
                  <v-checkbox v-model="orientation" label="Transgenders" value="trans" color="#B29126" dark> </v-checkbox>
          </v-layout>
          <v-layout>
                  <v-checkbox v-model="art" label="Real-life" value="real-life" color="#B29126" dark> </v-checkbox>
                  <v-checkbox v-model="art" label="Hentai" value="comic" color="#B29126" ripple dark> </v-checkbox>
                  <v-checkbox v-model="art" label="3D animated" value="three-d" color="#B29126" ripple dark> </v-checkbox>

          </v-layout>


    <v-form v-model="valid_tos" ref="tos_checkbox">
    <v-checkbox v-model="tos" color="#B29126" ripple dark :rules="[v => !!v || 'You must agree to continue!']" required>
      <template v-slot:label>
        <div>
          I agree to the
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                target="_blank"
                href="http://localhost:3000/privacy/ToS"
                @click.stop
                v-on="on"
              >
                Terms of Service
              </a>
            </template>
            Opens in new window
          </v-tooltip>
          .
        </div>
      </template>
    </v-checkbox>
    </v-form>

        <!-- <a class="btn-11 text-xs-center" @click="validate" style="cursor:pointer">Register</a> -->

        <v-layout justify-center class="mb-3 mt-4" align-center justify-space-between>

        <vue-recaptcha @verify="submit" ref="recaptcha" @expired="onCaptchaExpired"
            sitekey="6LeelK8UAAAAADeXIPB0cCu5LIQwHzojUAcVPX0I" :loadRecaptchaScript="true">
        </vue-recaptcha>
        <v-btn @click="validate" flat outline dark>Register</v-btn>
        </v-layout>
        <v-layout justify-center>



        </v-layout>
        </v-flex>
      </v-layout>

      <v-layout justify-center class="mt-2 text-xs-center" v-if="!capped">
        <!-- <span class="subheading font-weight-light">{{msg}}</span> -->
        <span class="subheading font-weight-light white--text" v-html="msg"></span>
      </v-layout>

      <v-layout justify-center class="mt-5 text-xs-center mb-3" v-if="capped">
        <!-- <span class="subheading font-weight-light">{{msg}}</span> -->
        <span class="subheading font-weight-light white--text" v-html="cap_msg"></span>
      </v-layout>


<v-dialog
      v-model="dialog"
      max-width="500px"
      dark

    >
      <v-card>
        <v-card-title class="headline">Forgot password</v-card-title>

        <v-card-text>
          Enter your email below, we will send you a discreet email with a password reset link.
          <v-layout>

    <v-text-field
    class="mt-3"
            prepend-icon="email"
            v-model="forgot_password_email"
            :rules=" forgot_password_email ?emailRules:[true]"
            label="E-mail"
            v-on:keyup.enter="forgot_password()"
            flat
            solo-inverted
          ></v-text-field>

          </v-layout>
          <v-layout justify-center class="text-xs-center">
            {{forgot_password_msg}}
          </v-layout>
       </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color=""
            flat="flat"
            @click="forgot_password()"
          >
            Submit
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>


    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import VueRecaptcha from 'vue-recaptcha';



export default {
  layout: 'registration',
  components:{VueRecaptcha},
  data(){
    return{
      dialog:false,
      forgot_password_email:'',
      loginActive: true,
      registerActive:false,
      art:[],
      orientation:[],
      show1:false,
      show2:false,
      valid: true,
      username: '',
      key:'',
      username_registration: '',
      password_login: '',
      password: '',
      username_exists : false,
      msg : '',
      cap_msg:'',
      errors:[],
      capped:false,
      token : '',
      nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length >= 3) || 'Name must be at least 3 characters',
      ],
      passRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 3) || 'Password must be at least 3 characters'
      ],
      emailRules: [
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
      email:'',
      forgot_password_msg:'',
      tos:false,

    }
  },
  methods:{
        ...mapActions('auth',['login']),
    activateLogin(){
      this.loginActive = true
      this.registerActive = false
      this.msg = ""

    },
    activateRegister(){
      this.loginActive = false
      this.registerActive = true
      this.msg = ""
    },
    validate () {
     if (this.$refs.form_register.validate() && this.token != '' && this.$refs.tos_checkbox.validate()) {
      //  console.log("Valid")
        this.msg = "Registering"
        let prefs = []
        if(this.orientation.includes('women')){
          prefs.push('straight')
          prefs.push('solo-woman')
          prefs.push('lesbian')
        }
        if(this.orientation.includes('men')){
          prefs.push('gay')
          prefs.push('solo-men')
        }
        if(this.orientation.includes('trans')){
          prefs.push('trans')
        }
        this.$axios.$post('/api/auth/register', {"username":this.username, "password":this.password, "orientation":prefs, "art":this.art, "recaptchaToken":this.token, "email":this.email})
            .then((res)=>{
                this.msg = res
                this.$refs.recaptcha.reset()
                if(res.success){
                    this.msg = 'Successfully registered!'
                    this.$router.push({name: 'index', params: { new: true }});
                    this.login(res.token)

                    // this.$router.push({path: '/top', params: { userId: '123' }});
                }else{
                    this.msg = res.msg
                }
            })
            .catch((error)=>{
                this.msg = error
            })
      } else{
        this.msg = 'Please fill out all the required fields and enter the captcha.'
      }
    },
    submit(token){
      this.token = token
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    },
    signin () {
      if (this.$refs.form_login.validate()) {
        this.msg = "Logging in"
        this.$axios.$post('/api/auth/login', {"username":this.username, "password":this.password})
            .then((res)=>{
              // console.log(res)
                if(res.success){
                    this.msg = 'Logging in'
                    this.login(res.token)
                    this.$router.push({name: 'index', params: { new: false }});

                }else{
                    this.msg = res.msg
                }
            })
            .catch((error)=>{
                // this.msg = 'Wrong username or password.'
                this.msg = error
            })
      }else{
        // console.log("Nope")
      }
    },
    forgot_password(){
      // this.dialog = false

    let h = {headers:{Authorization : this.authenticationToken()}}
    let self = this
    this.forgot_password_msg = 'Submitting email...'
      this.$axios.$post('/api/auth/forgot_password', {'email':this.forgot_password_email}, h)
        .then((res)=>{
          this.forgot_password_msg = res.msg

        })
        .catch((err)=>{
          console.log(err)
        })
      this.forgot_password_email = ''
    },
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken','isGuest', 'getToken']),

  },
  watch:{
      // username(){
      //   return true
      //     this.$axios.$post('/api/user/exist',{"username":this.username})
      //         .then((res)=>{
      //             if(res.success){
      //                 this.errors = ['Username already exists']
      //             } else{
      //                 this.errors = []
      //             }
      //         })
      //         .catch((err)=>{

      //         })
      // }
  },
  created(){
    // let h = {headers:{Authorization : this.authenticationToken()}}
    // this.$axios.$get('/api/auth/cap_reached', h)
    //   .then((res)=>{
    //     console.log()
    //     this.capped = res.success
    //     if(this.capped){
    //       // this.msg = "Unfortunately sign up has reached its cap. Stay tuned on <a href='https://www.twitter.com/bunnyfap'> #BunnyFap </a> and <a href='https://www.discord.gg/Pkcb8kF'> Discord </a> for updates!"
    //       this.cap_msg = "Ask your fellow hoppers for a sign up key on <a href='https://discord.gg/U9CcAq4'> Discord</a>, Twitter <a href='https://www.twitter.com/bunnyfap'> #BunnyFap</a> or <a href='https://www.reddit.com/r/bunnyfap'> r/BunnyFap</a>!"
    //     }
    //   })
  },
  mounted(){
    if(!this.isGuest() && this.getToken()){
      this.$router.push({name: 'recommended', params: { new: false }});
    }
  },
head: {
    title: 'Login to Bunnyfap',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Login to Bunnyfap - where Artifical Intelligence meets porn.'
      }
    ],
  }
}
</script>
<style scoped>
.underline-on-hover:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
