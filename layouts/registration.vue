<template>
  <v-app >
    

    <v-content class="dark"  style="background-color:#212121;">
      <v-container fluid fill-height>
                    <v-layout justify-center row wrap >
                <v-flex xs10 sm8 md6 lg4 xl3>
                    <v-img :src="require('assets/images/logos/logo-white-vertical.png')" height="300px" width="300px" style="margin:auto" contain></v-img>
        <nuxt />
        </v-flex>
                <v-flex xs12>
                  <!-- https://i.pinimg.com/originals/fd/2d/c3/fd2dc3ef5443acc017018b759fbe651f.jpg -->
                </v-flex>
            </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
}
</script>