<template>
  <v-app :dark="app_color_theme" class="grey darken-4">
    <div v-if="ready" >

   <!-- <Navigation v-if="isLogged In()" @nightmode="toggle_nightmode" ></Navigation> -->
   <Navigation @nightmode="toggle_nightmode" v-if="isLoggedIn() || isGuest() || true"></Navigation>

    <!-- <v-content :class="color_scheme" v-if="isLoggedIn() || $route.query.token" > -->
    <v-content :class="color_scheme">
      <v-container fluid v-if="!maintenance">
        
        <nuxt />
      </v-container>
      <footer>
    <!-- <cookie-law theme="dark-lime" storageType="cookies"></cookie-law> -->
      </footer>
    </v-content>
    
    </div>

  </v-app>
</template>

<script>
import Navigation from '@/components/infrastructure/Navigation'
// import Maintenance from '@/components/infrastructure/Maintenance'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import CookieLaw from 'vue-cookie-law'

export default {
  components:{Navigation, CookieLaw},
    data(){
      return {
        color_scheme: 'grey darken-4',
        app_color_theme: true,
        ready: false,
        maintenance: false,
        serverPing: '',
      }
    },
  methods:{
        ...mapGetters('auth',['isLoggedIn', 'getToken','authenticationToken', 'isGuest']),
        ...mapActions('auth',['guest']),
        checkLoggedIn(){
          return this.isLoggedIn()
        },
        toggle_nightmode(mode){
          // console.log("Toggling nightmode " + mode)
          // this.dark = !this.dark
            this.color_scheme = 'grey darken-4'
            this.app_color_theme = true
        },
        heartbeat(){
          let self = this
          this.$axios.$post('/api/user/heartbeat', {}, {})
            .then((res)=>{
              clearInterval(self.serverPing)
              location.reload()
              // console.log("Alive")
            })
            .catch((err)=>{
                // this.$router.push('/maintenance')
                // this.maintenance = true
            })
        }
  },
  mounted(){
    // console.log("Token: " + this.getToken())
    // console.log("Guest:" + this.isGuest())
    if(!this.getToken() || this.isGuest()){ //this.isGuest() && 
        // this.$router.push('/login')
        let h = this.authenticationToken()
        let token = this.getToken()
        let body = {}
        if (token){
          body = {token:token}
        }

        // console.log("Getting token: " )
        // console.log(body)
        this.$axios.$post('/api/auth/guest', body, h)
          .then((res)=>{
            // console.log(res)
            this.guest(res.token)
            this.ready = true
          })
          .catch((err)=>{
            console.log(err)
            // this.$router.push('/maintenance')
          })
    } else {
      this.ready = true
      // console.log("Not logged in and cannot get a security token.")
    }
  },
  beforeCreate(){
      this.$axios.$post('/api/user/heartbeat', {}, {})
        .then((res)=>{

        })
        .catch((err)=>{
          this.maintenance = true
          this.$nuxt.setLayout('maintenance')
          this.serverPing = setInterval(this.heartbeat, 5000)
        })
  }
}
</script>
