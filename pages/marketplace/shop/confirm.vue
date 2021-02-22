<template>
  <div>
      <v-layout justify-center class="text-xs-center font-weight-thin display-1">Review &amp; Pay</v-layout>
      <v-layout justify-center class="mt-2">
          <v-flex xs12 sm8 md6 class="font-weight-thin heading">Payments are made using bitcoin. Upon clicking the button below, you will be presented with the address to make the payment to. Once the payment has been confirmed, you will receive a notification. After paying, you may safely leave this page. If you are having any issues, please contact us on Discord.  </v-flex>
      </v-layout>
      <div v-if="btc_price" class="mt-5">
              <v-layout justify-center class="text-xs-center font-weight-thin subheading">You are buying  {{carrots}} carrots. </v-layout>
              <v-layout justify-center class="mt-1 mb-1 text-xs-center font-weight-thin subheading">Price in dollars: ${{cost}}</v-layout>
                <v-layout justify-center class="text-xs-center font-weight-thin subheading">Price in bitcoin: {{(cost/btc_price).toFixed(8)}}</v-layout>
      <v-layout justify-center class="mt-5" v-if="!address_data">
        <v-btn @click="pay" color="#B29126" :loading="loading_address">Confirm and Pay</v-btn>
      </v-layout>
      
      <v-layout v-if="address_data" justify-center class="text-xs-center font-weight-thin title mt-3">
          Payment address
      </v-layout>
      <v-layout align-center v-if="address_data" justify-center class="text-xs-center headline mt-1">

          {{address_data}}
              <v-btn icon @click="copy_source" class="mb-1"><v-icon> file_copy</v-icon></v-btn>
      </v-layout>

      <v-layout v-if="address_data" justify-center class="text-xs-center mt-1">
              <qrcode-vue :value="qr" :size="300"></qrcode-vue>
      </v-layout>

      </div>
      <div v-else>
          <v-layout justify-center>
            <v-progress-circular
            :size="70"
            :width="7"
            color="#B29126"
            indeterminate
            class="mt-5"
            ></v-progress-circular>
          </v-layout>

      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import QrcodeVue from 'qrcode.vue'

export default {
    components:{QrcodeVue},
    data(){
        return {
            box:this.$route.params.box || "Not defined",
            carrots:this.$route.params.carrots || "Not defined",
            cost:this.$route.params.cost || "Not defined",
            btc_price: false,
            address_data: false,
            loading_address:false,
            qr:'https://google.com'
        }
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        pay(){
            this.loading_address = true
            let h = {headers:{Authorization : this.authenticationToken()}}
            this.$axios.$post('/api/blockonomics/address',{carrot_amount:this.carrots}, h)
            .then((res)=>{
                this.address_data = res.address
                this.qr = 'bitcoin:' + res.address + '?amount=' + (this.cost/this.btc_price).toFixed(8)
            })
            .catch((err)=>{
                console.log(err)
            })
        },
copy_source(){
        let text = this.address_data
        var textArea = document.createElement("textarea");
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';


        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
          // contole.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
      },
    },
    created(){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$post('/api/blockonomics/price',{}, h)
            .then((res)=>{
                this.btc_price = res.price
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}
</script>

<style>

</style>