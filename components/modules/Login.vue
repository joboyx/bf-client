<template>
  <div>
      <v-dialog
      v-model="loginDialog"
      max-width="500px"

    >


    <v-card dark flat>
        <v-card-title
          primary-title
          class=" text-xs-center"
        >

        <v-layout class=' headline font-weight-thin text-xs-center' justify-center>Login</v-layout>

        </v-card-title>
        <v-layout class="font-weight-thin text-xs-center caption" justify-center> <span class="underline-on-hover" @click="signup"> Don't have an account? </span> </v-layout>

        <v-form v-model="valid" ref="form_login" class="pt-5 pl-5 pr-5 pb-2">
            <v-layout row wrap class="text-xs-center">
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
                        <span class="body-2 mt-3 mr-3 font-weight-thin white--text underline-on-hover" @click.stop="passwordReset = true;forgot_password_msg='';loginDialog=false">Forgot password</span>

                        <v-btn @click="signin" large flat outline dark >Login</v-btn>
                    </v-layout>
                </v-flex>
                <v-layout justify-center class="mt-3 mb-3 text-xs-center">
                    <span class="subheading font-weight-light white--text" v-html="msg"></span>
                </v-layout>
            </v-layout>
        </v-form>
    </v-card>
      </v-dialog>

<v-dialog
      v-model="passwordReset"
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
            outline
            dark
            background-color="#B29126"
            color="white"

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
            :disabled="!forgot_password_email.includes('@')"
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
/**
 * @vuese
 * This login module serves to replace the old login and register page. The login dialog box is activated when the user clicks on login; this way they don't have to navigate to a separate page to login.
 * @group modules
 */
export default {
    data(){
        return { //@vuese
            // Whether the dialog box should be shown or not.
            loginDialog:false, //@vuese
            // Makes it possible to see the password.
            show1:false, //@vuese
            // The username string of the user.
            username: '', //@vuese
            // The password string of the user.
            password: '', //@vuese
            // A return message from the server, for example: logging in, error, username is already taken.
            msg : '', //@vuese
            // The rules under which someone is allowed to create a username.
            nameRules: [
                v => !!v || 'Name is required',
                // v => (v && v.length >= 3) || 'Name must be at least 3 characters',
            ], //@vuese
            // The rules under which someone can create a password.
            passRules: [
                v => !!v || 'Password is required',
                // v => (v && v.length >= 3) || 'Password must be at least 3 characters'
            ], //@vuese
            // The dialog box for the password reset. When true, the reset dialog box shows.
            passwordReset:false, //@vuese
            // The return message from the server for a password reset. 
            forgot_password_msg:'', //@vuese
            // The rules under which someone can create an email.
            emailRules: [
                v => /.+@.+/.test(v) || 'E-mail must be valid'
                ], //@vuese
            // The input email from the user for the password reset.
            forgot_password_email:'',
        }
    },
    methods:{
        ...mapActions('auth',['login']),
        ...mapGetters('auth',['authenticationToken']),
        // @vuese
        // Called when the user hits the sign up button; the user is then taken to the signup dialog box.
        signup(){
            this.loginDialog = false
            this.$bus.emit('signupPrompt')
        },
        // @vuese
        // Called when the user hits the signup button. Validation is called first, to ensure the form boxes are in line with the rules.
        signin () {
        if (this.$refs.form_login.validate()) {
            this.msg = "Logging in"

            this.$axios.$post('/api/auth/login', {"username":this.username, "password":this.password})
                .then((res)=>{

                    this.$refs.form_login.reset()
                // console.log(res)
                    if(res.success){
                        this.password = ''
                        this.username = ''
                        this.loginDialog = false
                        this.msg = ''
                        this.login(res.token)
                        this.$bus.emit('load_user')
                        this.$router.go()
                        // this.$router.push({name: 'index', params: { new: false }});
                    }else{
                        this.msg = res.msg
                    }
                })
                .catch((error)=>{
                    // this.msg = 'Wrong username or password.'
                    this.password = ''
                    this.msg = error
                })
        }else{
            // console.log("Nope")
        }
        },
        // @vuese
        // Called when the user submits the email to reset the password.
        forgot_password(){
            if(this.forgot_password_email.includes('@')){

            let h = {headers:{Authorization : null}}

            let self = this
            this.forgot_password_msg = 'Submitting email...'
            this.$axios.$post('/api/auth/forgot_password', {'email':this.forgot_password_email}, h)
                .then((res)=>{
                    this.forgot_password_msg = res.msg
                })
                .catch((err)=>{
                    this.forgot_password_msg = err
                    console.log(err)
                })
            this.forgot_password_email = ''
            }
        },

    },
    created(){
        let self = this
        this.$bus.$on('loginPrompt', function(){
            self.loginDialog = true
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
