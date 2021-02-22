<template>
  <div>
    <v-dialog
      v-model="registerDialog"
      max-width="500px"

    >

    <v-card dark flat class="pb-3 pl-5 pr-5">
        <v-card-title
          primary-title
          class=" text-xs-center"
        >

        <v-layout class=' headline font-weight-thin text-xs-center' justify-center>Sign up</v-layout>


        </v-card-title>
        <v-layout class="font-weight-thin text-xs-center caption mb-3" justify-center> <span class="underline-on-hover" @click="login"> Already signed up? </span> </v-layout>

     <v-layout row wrap >

        <v-flex xs12>

        <v-form v-model="valid" ref="form_register" >
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


      <span class="headline font-weight-thin white--text mt-4">Preferences</span>
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

        <v-layout justify-center class="mt-4" align-center row wrap>

        <v-flex xs12 sm12 justify-center class="text-xs-center">
            <v-spacer></v-spacer>
        <vue-recaptcha @verify="submit" ref="recaptcha" @expired="onCaptchaExpired"
            sitekey="6LeelK8UAAAAADeXIPB0cCu5LIQwHzojUAcVPX0I" :loadRecaptchaScript="true">
        </vue-recaptcha>
        </v-flex>
        <v-flex xs12 sm12 justify-center class="text-xs-center mt-4">
        <v-btn @click="validate" flat outline dark>Register</v-btn>
        </v-flex>
        </v-layout>
        <v-layout justify-center>



        </v-layout>
        </v-flex>
      </v-layout>

      <v-layout justify-center class="mt-2 text-xs-center">
        <!-- <span class="subheading font-weight-light">{{msg}}</span> -->
        <span class="subheading font-weight-light white--text" v-html="msg">{{msg}}</span>
      </v-layout>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import VueRecaptcha from 'vue-recaptcha';

/**
 * @vuese
 * The sign up dialog box, intended to replace the previous registration page. This way the user does not have to navigate to a different page to sign up. See `Login.vue` for a similar module.
 * @group modules
 */
export default {
    components:{VueRecaptcha},
    data(){
        return{ // @vuese
            // Whether the register dialog is shown or not.
            registerDialog: false, // @vuese
            // The username string of the user.
            username: '', // @vuese
            // The password string of the user.
            password: '', // @vuese
            // Makes it possible to see the password.
            show1:false, // @vuese
            // The art preferences of the user.
            art:[], // @vuese
            // The orientation preferences of the user.
            orientation:[], // @vuese
            // Will show error messages if the validation fails.
            errors:[], // @vuese
            // The e-mail the user wants to sign up with. (E-mail is optional)
            email:'', // @vuese
            // The rules under which someone is allowed to create a username.
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length >= 3) || 'Name must be at least 3 characters',
            ], // @vuese
            // The rules under which someone can create a password.
            passRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 3) || 'Password must be at least 3 characters'
            ], // @vuese
            // The rules which specify a valid email address.
            emailRules: [
                v => /.+@.+/.test(v) || 'E-mail must be valid'
                ], //@vuese
            // A return message from the server, for example: logging in, error, username is already taken.
            msg : '', // @vuese
            // Captcha token
            token : '', // @vuese
            // Deprecated
            code: '', // @vuese
            // Whether the user has agrees with the terms of service.
            tos:false,
        }
    },
    methods:{
        ...mapActions('auth',['login']),
        ...mapGetters('auth', ['getToken']),
        // @vuese
        // Takes the user the login dialog instead.
        login(){
            this.registerDialog = false
            this.$bus.emit('loginPrompt')
        },
        // @vuese
        // Makes sure that all of the user input is valid, before sending it to the server.
        validate () {
            if (this.$refs.form_register.validate() && this.token != '' && this.$refs.tos_checkbox.validate()) {
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
                // console.log("Making call")
                this.$axios.$post('/api/auth/register/guest', {"username":this.username, "password":this.password, "orientation":prefs, "art":this.art,  "recaptchaToken":this.token, "email":this.email, guest_token:this.getToken()})
                    .then((res)=>{
                        this.msg = res
                        this.$refs.recaptcha.reset()
                        if(res.success){
                            this.msg = 'Successfully registered!'
                            this.login(res.token)
                            this.registerDialog = false
                            this.$bus.emit('load_user')

                            // this.$router.push({name: 'index', params: { new: true }});

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
        // @vuese
        // Sets the token.
        submit(token){
            this.token = token
        },
        // @vuese
        // When the captcha expires, reset it.
        onCaptchaExpired: function () {
            this.$refs.recaptcha.reset();
        },
    },
    created(){
        let self = this
        this.$bus.$on('signupPrompt', function(){
            self.registerDialog = true
            self.$bus.emit('close_modal')

        })
    }
}
</script>

<style>
.underline-on-hover:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
