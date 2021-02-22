<template>
  <div style="height:100vh">

      <v-container fill-height style="height:50%">
        <v-layout align-center justify-center row wrap>
          <v-flex xs12 class="text-xs-center">
          <h1 v-if="error.statusCode === 404" class="font-weight-light">Hi there! Unfortunately this page could not be found :(</h1>
          <h1 v-else>Uh oh.. Something went wrong</h1>
          </v-flex>

          <v-flex xs12 class="text-xs-center">
            <p class="font-weight-light title">Best you go back to the <nuxt-link to="/">home page</nuxt-link> and take it from there :)</p>
            
          </v-flex>
        </v-layout>
      </v-container>




  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
}
</script>