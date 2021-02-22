<template>
  <div>
    <div class="darkk " >
      <v-container fluid style="height:100vh" fill-height align-center class="align-center">
        <v-layout justify-center align-center class="white--text font-weight-thin heading">
          <span v-if="isLoggedIn()">We are activating your membership. You will be automatically redirected.</span>
          <span v-else>Please <span class="link" @click="login">login</span> and then reload this page.</span>
          {{msg}}
        </v-layout>

      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  data(){
    return {
      code:this.$route.params.activate,
      msg: 'Hold on...'
    }
  },
  methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        login(){
          this.$router.push('/login')
        }
  },
  created(){
    if(this.isLoggedIn()){
      this.msg = ''
      let h = {headers:{Authorization : this.authenticationToken()}}
      // console.log("Code: " + this.code)
      this.$axios.post('/api/patreon/activate', {code:this.code}, h)
        .then((res)=>{
          if(res.data.success){
            this.$bus.emit('refresh_carrots')
            this.$router.push('/')
          } else{
            this.msg = 'Failed to activate... try contacting us on Discord or Reddit.'
          }
        })
        .catch((err)=>{
          console.log(err)
            this.msg = 'Failed to activate... try contacting us on Discord or Reddit.'

        })
    }
  }
}
</script>

<style scoped>
.darkk{
  background-color:#212121;
}
.link{
  text-decoration: underline;
  color: #B29126;
  cursor:pointer;
}
</style>