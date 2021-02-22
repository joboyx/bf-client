<template>
    <div>
        <v-layout justify-center class="mb-2" v-if="aif_upload===false">
            <p class="subheading font-weight-light" align="justify">
            Use the below box to upload your AIF data. Upload your <span class="" style="text-decoration:underline"> ratings.json </span> file, so not the whole zip file! You can only upload once! 
            </p>
        </v-layout>
        <v-layout justify-center row wrap v-if="aif_upload===false">
              <dropzone  :options="options" :destroyDropzone="true"
              @vdropzone-complete="afterComplete"
               ></dropzone>

        </v-layout>

        <v-layout justify-center row wrap v-if="aif_upload===false">
            <span class="display-1 font-weight-light"> ratings.json </span> .
        </v-layout>
        <v-layout justify-center row wrap >
            <p class="subheading font-weight-light" align="justify" v-if="aif_upload">
                You have successfully uploaded your data :) It could take a few minutes for your data to show in your library. In the meanwhile, it would be best to wait with liking and disliking other items. 
            </p>
        </v-layout>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

/**
 * @vuese
 * Deprecated. This component was used to upload AiF resources. Not supported anymore. 
 * @group modules
 */
export default {
    components:{Dropzone},
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
            // @vuese
            // Called once the upload is complete.
            afterComplete(file) {
                setTimeout(()=>{
                    if (file.name.includes('.json'))
                    this.aif_upload = true
                },2000)
            }
    },
    data(){
        return{
            options: {
                url: "/api/user/aif_import",
                headers:{Authorization : this.authenticationToken()},
                // acceptedFiles:['.json'],
                maxFiles:1,
                timeout: 300000,
                accept: function(file, done) {
                    if (!file.name.includes('.json')) {
                        done("This is the wrong file. Upload your ratings.json file.");
                    }
                    else { done(); }
                }
            },
            aif_upload:null
        }
    },
    created(){

    },
    mounted(){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/user', h)
            .then((res)=>{
                this.aif_upload = res.user.aif_upload
                
            })
            .catch((res)=>{
                console.log(err)
            })
    }
}
</script>

<style scoped>

</style>
