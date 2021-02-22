<template>
  <div>
      <v-layout justify-center class="text-xs-center display-1 font-weight-thin mb-5 mt-4">The Carrot Store</v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3 class="mt-2">
<v-card
                    dark
                    max-width="250px"
                    width="250px"
                    color=""
                    style="margin:auto"
                >
                    <v-card-title class="text-xs-center">
                        <v-layout justify-center><span class="display-1 font-weight-light">Bunny</span></v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-layout justify-center class="">
                            <div>
                                <v-layout align-center>

                                    <v-img
                                        :src="require('assets/images/carrot.png')"
                                        height="45px"
                                        width="45px"
                                        class="ma-"
                                        style="margin:;"
                                        contain
                                        >

                                    </v-img>
                                    <span class="display-3 font-weight-light ml-2">x 300</span>

                                </v-layout>

                            </div>

                        </v-layout>

                        <v-layout justify-center><span class="font-weight-thin display-1 mt-2 ">$4.99</span></v-layout>

                        <v-layout justify-center align-center class="text-xs-center mt-3">
                            <v-btn color="#B29126" @click="$router.push({ name: 'marketplace-shop-confirm', params: { box:1, carrots:300, cost:4.99 } })">
                                Buy
                            </v-btn>

                        </v-layout>
                    </v-card-text>
                </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 class="mt-2">
<v-card
                    dark
                    max-width="250px"
                    width="250px"
                    color=""
                    style="margin:auto"
                >
                    <v-card-title class="text-xs-center">
                        <v-layout justify-center><span class="display-1 font-weight-light">Rabbit</span></v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-layout justify-center class="">
                            <div>
                                <v-layout align-center>

                                    <v-img
                                        :src="require('assets/images/carrot.png')"
                                        height="45px"
                                        width="45px"
                                        class="ma-"
                                        style="margin:;"
                                        contain
                                        >

                                    </v-img>
                                    <span class="display-3 font-weight-light ml-2">x 750</span>

                                </v-layout>

                            </div>

                        </v-layout>

                        <v-layout justify-center><span class="font-weight-thin display-1 mt-2 ">$9.99</span></v-layout>

                        <v-layout justify-center align-center class="text-xs-center mt-3">
                            <v-btn color="#B29126" @click="$router.push({ name: 'marketplace-shop-confirm', params: { box:2, carrots:750, cost:9.99 } })">
                                Buy
                            </v-btn>

                        </v-layout>
                    </v-card-text>
                </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 class="mt-2">
<v-card
                    dark
                    max-width="250px"
                    width="250px"
                    color=""
                    style="margin:auto"
                >
                    <v-card-title class="text-xs-center">
                        <v-layout justify-center><span class="display-1 font-weight-light">Hare</span></v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-layout justify-center class="">
                            <div>
                                <v-layout align-center>

                                    <v-img
                                        :src="require('assets/images/carrot.png')"
                                        height="45px"
                                        width="45px"
                                        class="ma-"
                                        style="margin:;"
                                        contain
                                        >

                                    </v-img>
                                    <span class="display-3 font-weight-light ml-2">x 2000</span>

                                </v-layout>

                            </div>

                        </v-layout>

                        <v-layout justify-center><span class="font-weight-thin display-1 mt-2 ">$24.99</span></v-layout>

                        <v-layout justify-center align-center class="text-xs-center mt-3">
                            <v-btn color="#B29126" @click="$router.push({ name: 'marketplace-shop-confirm', params: { box:3, carrots:2000, cost:24.99 } })">
                                Buy
                            </v-btn>

                        </v-layout>
                    </v-card-text>
                </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 class="mt-2">
<v-card
                    dark
                    max-width="250px"
                    width="250px"
                    color=""
                    style="margin:auto"
                >
                    <v-card-title class="text-xs-center">
                        <v-layout justify-center><span class="display-1 font-weight-light">Custom</span></v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-layout justify-center class="">
                            <div>
                                <v-layout align-center>

                                    <v-img
                                        :src="require('assets/images/carrot.png')"
                                        height="45px"
                                        width="45px"
                                        class="ma-"
                                        style="margin:;"
                                        contain
                                        >

                                    </v-img>
                                    <span class="display-2 font-weight-light ml-2 mr-2">x</span>
                                    <v-form
                                      ref="form"
                                      v-model="valid"
                                      lazy-validation
                                    >
                                    <v-text-field
                                      v-model="custom"
                                      :rules="[v => v>=100 || 'The minimum amount is 100.']"
                                      label="Amount"
                                      required
                                      number
                                      color="#B29126"
                                    ></v-text-field>
                                    </v-form>
                                    <!-- <span class="display-3 font-weight-light ml-2">x 300</span> -->

                                </v-layout>

                            </div>

                        </v-layout>

                        <v-layout justify-center><span class="font-weight-thin display-1 mt-2 ">${{carrot_value()}}</span></v-layout>

                        <v-layout justify-center align-center class="text-xs-center mt-3">
                            <v-btn color="#B29126" :disabled="custom<100" @click="$router.push({ name: 'marketplace-shop-confirm', params: { box:4, carrots:custom, cost:carrot_value() } })">
                                Buy
                            </v-btn>

                        </v-layout>
                    </v-card-text>
                </v-card>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>

/*
if (carrot_amount < 100) {
    throw createError(400, 'Minimum number of carrots - 100');
  } else if (carrot_amount >= 100 && carrot_amount < 300) {
    dollar_amount = carrot_amount*0.02;
  } else if (carrot_amount >= 300 && carrot_amount < 750) {
    dollar_amount = carrot_amount*0.01664;
  } else if (carrot_amount >= 750 && carrot_amount < 2000) {
    dollar_amount = carrot_amount*0.01332;
  } else if (carrot_amount >= 2000) {
    dollar_amount = carrot_amount*0.0125;
  }
*/

import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      valid: true,
      custom:100,
    }
  },
  methods:{
        ...mapGetters('auth',['isGuest']),
    carrot_value(){
        if (this.custom < 100) {
            return ""
          } else if (this.custom >= 100 && this.custom < 300) {
            return (this.custom*0.02).toFixed(2);
          } else if (this.custom >= 300 && this.custom < 750) {
            return (this.custom*0.01664).toFixed(2);
          } else if (this.custom >= 750 && this.custom < 2000) {
            return (this.custom*0.01332).toFixed(2);
          } else if (this.custom >= 2000) {
            return (this.custom*0.012495).toFixed(2);
          }
          return "Fail"
    }
  },
  created(){
      if(this.isGuest()){
          this.$router.push('/')
      }
  }
}
</script>

<style>

</style>
