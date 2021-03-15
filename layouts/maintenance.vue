<template>
  <div style="height:100vh; background-color:#212121;" class="dark" >

      <v-container fill-height style="height:70%" >
        <v-layout align-center justify-center row wrap>
                <v-flex xs10 sm8 md6 lg4 xl3>
                    <v-img :src="require('assets/images/logos/logo-white-vertical.png')" height="200px" width="200px" style="margin:auto" contain></v-img>
        </v-flex>
          <v-flex xs12 class="text-xs-center">
          <h1 class="font-weight-light grey--text text--lighten-3 display-3">We are momentarily offline.</h1>
          </v-flex>

          <v-flex xs12 class="text-xs-center">
          <h1 class="font-weight-light grey--text text--lighten-3">Check our <a href="https://discord.gg/9mRdZ6M"> Discord</a> for updates. We'll be back soon :)</h1>
          </v-flex>

          <v-flex xs12 class="text-xs-center">
          <h1 class="font-weight-light grey--text text--lighten-3 title">This page will automatically refresh once we're back.</h1>
          </v-flex>

        </v-layout>
      </v-container>




  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a {
  color: #43A047;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>