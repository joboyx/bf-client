<template>
    <div v-if="token_valid" style="height:100vh;">
        <v-container fill-height justify-center align-content-center>

    <!-- <v-form ref="form" v-model="valid" lazy-validation onsubmit="return false"> -->
            <v-layout wrap justify-center class="text-xs-center" align-content-center>
            <v-flex xs12 md7>
                <v-text-field
                    @click:append="show2 = !show2"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    prepend-icon="lock"
                    type='password'

                    v-model="password"
                    :rules="passRules"
                    label="New password"
                    required
                    v-on:keyup.enter="reset"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 md7>
                <v-text-field
                    @click:append="show3 = !show3"
                    :append-icon="show3 ? 'visibility' : 'visibility_off'"
                    prepend-icon="lock"
                    type='password'
                    v-model="passwordRepeat"
                    :rules="passRepeat"
                    label="Repeat new password"
                    required
                    v-on:keyup.enter="reset"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 justify-center>
                <v-btn
                    :disabled="!valid"
                    large
                    @click="reset"
                    flat
                >
                    Reset password
                </v-btn>
            </v-flex>

{{change_pass_msg}}

            </v-layout>
            <!-- </v-form> -->
        </v-container>

    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    layout:'default',
    data(){
        return{
            token_valid:false,
            show2:false,
            show3:false,
            valid:true,
            password:'',
            passwordRepeat:'',
            change_pass_msg:'',
            passRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 3) || 'Password must be at least 3 characters'
            ],
            passRepeat : [
                v => !!v || 'Please repeat your password',
                v => (v && v===this.password) || "Passwords don't match"
            ],
        }
    },
   created(){
    //    console.log("test")
       let self = this
        this.$axios.$post('/api/auth/forgot_password/validate', {token:this.$route.query.token})
        .then((res)=>{
            if(res.success){
                self.token_valid = self.$route.query.token
            }
        })
   },
   methods:{
        ...mapActions('auth',['login']),
       reset(){
        //    this.$refs.form.validate() || 
        let self = this
      if (this.valid) {

        this.$axios.$post('/api/auth/forgot_password/change', {password:this.password, password_repeat:this.passwordRepeat, token:this.$route.query.token})
            .then((res)=>{
                if(res.success === true){
                    self.change_pass_msg = res.msg
                    self.login(res.token)
                    self.$router.push({name: 'recommended', params: { new: false }});

                } else{
                    this.change_pass_msg = res.msg
                }
            })
            .catch((err)=>{
                console.log(err)
                this.change_pass_msg = 'Something went wrong'
            })
      } else{
          this.change_pass_msg = 'Please fill out the passwords correctly.'
      }
       },
   }
}
</script>
<style scoped>

</style>
