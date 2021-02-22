<template>
  <div>
      <v-toolbar dark fixed flat v-if="false">
          <v-toolbar-title style="cursor:pointer" @click="$router.push('/')" nuxt to="/"><span class="font-weight-thin">BunnyFap</span></v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-spacer></v-spacer> -->
          <span v-if="isLoggedIn()">

                <v-badge bottom overlap color="transparent">
                <template v-slot:badge >
                        <!-- <span class="mt-1 font-weight-thin subheading">{{carrots}}</span> -->
                    <!-- <span >{{streak}}</span> -->
                </template>
                    <v-img 
                        :src="require('assets/images/carrot.png')"
                        height="25px" 
                        width="25px"
                        class=""
                    >
                    </v-img>
                </v-badge>
          </span>
          <v-toolbar-item v-if="isLoggedIn()">
                <span class="font-weight-thin subheading">{{carrots}}</span>
          </v-toolbar-item>

          <v-btn color="#B29126" outline>Activate now!</v-btn>

      </v-toolbar>
      <div class="section1 ">
        <v-img
            :src="require('assets/images/bunnylove/bunnylove.png')"
            height="300px"
            width="auto"
            contain
            style="margin:auto"
            class="mt-5"
        >

        </v-img>
        <!-- Everlasting. -->
        <v-layout class="justify-center text-xs-center display-1 font-weight-thin white--text mt-5 mb-5 pb-5">
            <!-- Limitless. Uninterrupted. Timeless.   -->
            Just. Keep. Hopping.
        </v-layout>

        <!-- <v-layout v-if="false" class="justify-center text-xs-center display-1 font-weight-thin white--text mt-5 mb-5">
              <v-btn color="#B29126" outline large>Activate</v-btn>
        </v-layout> -->

      </div>
      <div class="section2" v-if="false">
          <v-layout class="text-xs-center justify-center align-center font-weight-thin display-1" style="height:100%">
              <span class="mt-5">
              Upgrade your experience.
              </span>
          </v-layout>
      </div>
      <div class="section3" v-if="false">
          <v-layout  class="text-xs-center mb-5" justify-center>
              <v-flex xs12 sm4 class="mt-5 font-weight-thin title">
                  <v-layout justify-center>
                    <v-img
                        :src="require('assets/images/bunnylove/image.png')"
                        height="100px"
                        width="auto"
                        contain
                    >

                    </v-img>
                  </v-layout>
                  <v-layout justify-center class="mt-4">
                    No ads. Uninterrupted viewing.
                  </v-layout>
                </v-flex>
              <v-flex xs12 sm4 class="mt-5 font-weight-thin title">
                  <v-layout justify-center>
                    <v-img
                        :src="require('assets/images/bunnylove/custom.png')"
                        height="100px"
                        width="auto"
                        contain
                    >

                    </v-img>
                  </v-layout>
                  <v-layout justify-center class="mt-4">
                    Personalised features.
                  </v-layout>
                  
                </v-flex>
              <v-flex xs12 sm4 class="mt-5 font-weight-thin title">
                  <v-layout justify-center>
                    <v-img
                        :src="require('assets/images/bunnylove/heart.png')"
                        height="100px"
                        width="auto"
                        contain
                    >
                    </v-img>
                  </v-layout>
                  <v-layout justify-center class="mt-4">
                    Support and become part of a community.
                  </v-layout>
                </v-flex>
          </v-layout>
          <v-layout justify-center class="font-weight-thin title mt-5">
              <!-- Your support will help sustain the platform and fund further development.  -->
          </v-layout>
      </div>
      <div class="section4">
          <v-layout justify-center class="justify-center mt-5" align-center row wrap >

            <v-flex xs12 sm6 md4 justify-center class="justify-center mb-4">

            
                <v-card
                    dark
                    max-width="300px"
                    width="300px"
                    color=""
                    style="margin:auto"
                >
                    <v-card-title class="text-xs-center">
                        <v-layout justify-center><span class="display-1 font-weight-light">Hopper</span></v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-layout justify-center><span class="display-3 font-weight-medium">$1</span></v-layout>
                        <v-layout justify-center><span class="subtitle font-weight-light">per month</span></v-layout>
                        <v-layout justify-center align-center class="text-xs-center">
                            <v-btn color="#B29126" href="https://www.patreon.com/bunnyfap">
                                Buy 
                            </v-btn>

                        </v-layout>
                        <v-layout justify-center><span class="title font-weight-light ma-3">or</span></v-layout>
                        <v-layout justify-center align-center class="">
                            <div>
                                <v-layout align-center>

                                    <v-img 
                                        :src="require('assets/images/carrot.png')"
                                        height="35px" 
                                        width="35px"
                                        class="ma-"
                                        style="margin:;"
                                        contain
                                        >

                                    </v-img>
                                    <span class="font-weight-thin display-1 ml-2"> x150</span>

                                </v-layout>

                            </div>

                        </v-layout>
                        <v-layout justify-center><span class="subtitle font-weight-light">for one month</span></v-layout>

                        <v-layout justify-center align-center class="text-xs-center">
                            <v-btn color="#B29126" @click="buy('bunnylove-1')" :disabled="loading || user.carrots < 150">
                                Buy with carrots 
                            </v-btn>


                        </v-layout>
                        <v-layout justify-center class="text-xs-center font-weight-thin caption"><span class="underline-on-hover" @click="!isGuest() ? $router.push({ name: 'marketplace-shop-browse'}) : $bus.emit('signupPrompt')">Buy more carrots</span> </v-layout>

                        <v-divider class="ma-3"></v-divider>
                        <v-layout class="font-weight-light subheading text-xs-" -center>
                            <ul>
                                <!-- <li class="mb-1">Closed beta sign up key<sup><span>&#65121;</span></sup></li> -->
                                <li class="mb-1">Block unwanted tag content</li>
                                <li class="mb-1">No ads</li>
                                <li class="mb-1"> Receive 20 carrots per month<sup><span>&#65121;</span></sup></li>
                            </ul>

                        </v-layout>
                        <span class="font-weight-thin caption"><sup><span>&#65121;</span></sup>Only valid for Patrons</span>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6 md4 class="mb-4">

            
                <v-card
                    dark
                    max-width="300px"
                    width="300px"
                    color=""
                    style="margin:auto"
                    elevation="24"
                    tile
                >
                    <v-card-title class="text-xs-center">
                        <v-layout justify-center><span class="display-1 font-weight-light">Hopmeister</span></v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-layout justify-center><span class="display-3 font-weight-medium">$4.99</span></v-layout>
                        <v-layout justify-center><span class="subtitle font-weight-light">per month</span></v-layout>
                        <v-layout justify-center align-center class="text-xs-center">
                            <v-btn color="#B29126" href="https://www.patreon.com/bunnyfap">
                                Buy 
                            </v-btn>

                        </v-layout>
                        <v-layout justify-center><span class="title font-weight-light ma-3">or</span></v-layout>
                        <v-layout justify-center align-center class="">
                            <div>
                                <v-layout align-center>

                                    <v-img 
                                        :src="require('assets/images/carrot.png')"
                                        height="35px" 
                                        width="35px"
                                        class="ma-"
                                        style="margin:;"
                                        contain
                                        >

                                    </v-img>
                                    <span class="font-weight-thin display-1 ml-2"> x200</span>

                                </v-layout>

                            </div>

                        </v-layout>
                        <v-layout justify-center><span class="subtitle font-weight-light">for one month</span></v-layout>

                        <v-layout justify-center align-center class="text-xs-center">
                            <v-btn color="#B29126" @click="buy('bunnylove-2')" :disabled="loading || user.carrots < 200">
                                buy with carrots 
                            </v-btn>

                        </v-layout>
                        <v-layout justify-center class="text-xs-center font-weight-thin caption"><span class="underline-on-hover" @click="!isGuest() ? $router.push({ name: 'marketplace-shop-browse'}) : $bus.emit('signupPrompt')">Buy more carrots</span> </v-layout>

                        <v-divider class="ma-3"></v-divider>
                        <v-layout class="font-weight-light subheading text-xs-" -center>
                            <ul>
                                <!-- <li class="mb-1">Closed beta sign up key<sup><span>&#65121;</span></sup></li> -->
                                <li class="mb-1">Block unwanted tag content</li>
                                <li class="mb-1">No ads</li>
                                <li class="mb-1"> Receive 50 carrots per month<sup><span>&#65121;</span></sup></li>
                                <li class="mb-1"> Create 15 additional lists</li>
                                <li class="mb-1"> Have a personalized statistics page</li>
                                <li class="mb-1"> Star your favourite tags and categories for easy access</li>
                                
                            </ul>

                        </v-layout>

                        <span class="font-weight-thin caption"><sup><span>&#65121;</span></sup>Only valid for Patrons</span>

                    </v-card-text>
                    <!-- <sup><span>&#65121;</span></sup><span class="caption">Only for paid subscriptions.</span> -->
                </v-card>
            </v-flex>

            <v-flex xs12 sm8 md4 >

            
                <v-card
                    dark
                    max-width="300px"
                    width="300px"
                    color=""
                    style="margin:auto"

                >
                    <v-card-title class="text-xs-center">
                        <v-layout justify-center><span class="display-1 font-weight-light">Grandhopper</span></v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-layout justify-center><span class="display-3 font-weight-medium">$24.99</span></v-layout>
                        <v-layout justify-center><span class="subtitle font-weight-light">per month</span></v-layout>
                        <v-layout justify-center align-center class="text-xs-center">
                            <v-btn color="#B29126" href="https://www.patreon.com/bunnyfap">
                                Buy 
                            </v-btn>

                        </v-layout>
                        <v-divider class="ma-3"></v-divider>
                        <v-layout class="font-weight-light subheading text-xs-" -center>
                            <ul>
                                <!-- <li class="mb-1">Closed beta sign up key</li> -->
                                <li class="mb-1">Block unwanted tag content</li>
                                <li class="mb-1">No ads</li>
                                <li class="mb-1"> Receive 500 carrots per month</li>
                                <li class="mb-1"> Create 15 additional lists</li>
                                <li class="mb-1"> Have a personalized statistics page</li>
                                <li class="mb-1"> Star your favourite tags and categories for easy access</li>
                                
                            </ul>

                        </v-layout>

                    </v-card-text>
                </v-card>
            </v-flex>
          </v-layout>
      </div>


      <div class="section5">
          <div>
            <v-layout justify-center class="text-xs-center justify-center align-center font-weight-thin display-2" style="padding-top:20vh">
                How do I become a member?
            </v-layout>
            <v-layout  class="font-weight-thin headline pt-5 mt-3" justify-center>
                <v-flex xs12 sm8 md6>
                    1. Select a membership above and click the buy button.
                </v-flex>
            </v-layout>
            <v-layout xs12 sm8 md6  class="font-weight-thin headline pt-5" justify-center>
                <v-flex xs12 sm8 md6>
                2. Become a patron on Patreon and receive a confirmation email.
                </v-flex>
            </v-layout>
            <v-layout xs12 sm8 md6  class="font-weight-thin headline pt-5" justify-center>
                <v-flex xs12 sm8 md6>
                3. Click the link in the confirmation email. That's it! 
                </v-flex>
            </v-layout>
            <v-layout xs12 sm8 md6  class="font-weight-thin headline pt-5" justify-center>
                <v-flex xs12 sm8 md6>
                All charges will appear on your bank statement as one of the following: <br>
                <span class="title">
                    <br>
                Patreon* Membership<br>
                CKO Patreon* Membership<br>
                VISIT PATREON.COM/INFO<br>
                PAYPAL *PATREON IN<br>
                </span>
                <span style="text-decoration:underline;">
                    <br>
                The names of creators you are supporting will not be included on the statement.

                </span>
                </v-flex>
            </v-layout>
          </div>

      </div>
  </div>
                          <!-- <v-img 
                            :src="require('assets/images/carrot.png')"
                            height="25px" 
                            width="25px"
                            class="ml-3"
                        >
                        </v-img>
                        <span>x200</span> -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
      return {
          loading: false,
          carrots: 0,
          user:false
      }
  },
  methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'isGuest']),
      buy(tier){
          if(!this.isGuest()){

          this.loading = true
          let h = {headers:{Authorization : this.authenticationToken()}}

          this.$axios.post('api/fication/store/purchase/' + tier, {}, h)
            .then((res)=>{
                if(res.data.success){
                    this.$router.push('/marketplace/items')
                    this.loading = false
                }
            })
            .catch((err)=>{
                console.log(err)
                this.loading = false
            })
          } else{
              this.$bus.emit('signupPrompt')
          }

      }
  },
  created(){
    let self = this
    this.$bus.on('user', function(arg){
        self.user = arg
    })

    this.$bus.emit('get_user')

      if(this.isLoggedIn()){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/user', h)
            .then((res)=>{
                
                if(res.success){
                        this.carrots = res.user.carrots
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
  }
}
</script>

<style scoped>
.section1{
    background-color: #212121;
    /* font-variant: small-caps; */
    /* font-family: 'Alegreya Sans SC'; */
}

.section2{
    background-color: #212121;
    color:#424242;
    height:50vh;
}

.section3{
    background-color: #212121;
    height:70vh;
}

.section4{
    /* height:100vh; */
    background-color: #212121;
}

.section5{
    /* height:100vh; */
    background-color: #212121;
}

.fullHeight{
    height: 100vh;
    /* width: 100vw; */
}
.main{
    /* font-family: 'Alegreya Sans SC'; */
    
}

ul{
    margin: 10px;
    line-height:140%
}
.underline-on-hover:hover {
    text-decoration: underline;
    cursor:pointer;
}
</style>