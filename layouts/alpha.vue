<template>
  <div>
    <v-content>

        <v-container fluid fill-height>
            <v-layout justify-center row wrap >
                <v-flex xs10 sm8 md6 lg4 xl3>
                    <v-img :src="require('assets/images/logo-2.png')" height="300px" width="300px" style="margin:auto" contain></v-img>
                    <nuxt />                    
                </v-flex> 
                <v-flex xs12>
                  <!-- https://i.pinimg.com/originals/fd/2d/c3/fd2dc3ef5443acc017018b759fbe651f.jpg -->
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
  </div>
</template>

<script>
export default {

}
</script>
