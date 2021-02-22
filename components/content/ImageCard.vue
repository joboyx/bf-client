<template>
    <v-hover>

<!-- 300px cards-->
        <v-card tile flat height="30vh" dark color="transparent" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" @click="hash">
                    
            
            <div v-on:click="$emit('my_emit')" style="height:100%" >
                <v-img height="100%" cover
                    :src="data.thumbnail || get_thumbnails(data.url)"
                    v-if="data.type==='img' || true"
                    :class="{seen:data.seen}"
                    >
                    <v-container v-if="data.type==='web_video' || data.type==='video'" fill-height justify-center align-center>
                        <v-layout justify-center align-center row class="text-xs-center">
                            <v-flex>
                                
                                <v-icon x-large color='amber' v-if="data.type==='video'">play_circle_outline</v-icon>
                                <v-icon x-large v-else>play_circle_outline</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <template v-slot:placeholder>
                        <v-layout fill-height align-center justify-center ma-0>
                            <v-progress-circular indeterminate color="#B29126"></v-progress-circular>
                        </v-layout>
                    </template>


                </v-img>

                

                <!-- We are not showing a video in the new implementation. The main page only contains a thumbnail to the video.
                The video is only shown in the lightbox.
                <video height='300px' width="100%" v-else-if="data.type==='gif' || data.type==='web_video'" controls playsinline>
                    <source :src='data.src' >
                    Your browser does not support the video tag.
                </video>
                -->

            <!-- <iframe v-else-if="data.type==='gif'" :src='data.src' frameborder='0' scrolling='no' height='250px' width="100%" allowfullscreen style="z-index:1;pointer-events:none; margin-bottom:-5px" ></iframe> -->

            </div>
        <!--
        <v-card height="50px" color="white">
            <BottomStatHover :data="data"></BottomStatHover> 
        </v-card>
        -->
                    <v-expand-transition>
                        <div v-if="hover" class="d-flex transition-fast-in-fast-out v-card--reveal">
                            <v-card height="100%" color="white" >
                                <BottomStat :data="data" @reaction="reaction($event)"></BottomStat> 
                            </v-card>
                        </div>

                    </v-expand-transition>





        </v-card>



    </v-hover>
</template>

<script>
import BottomStat from '@/components/content/BottomStat'
// import BottomStatRating from '@/components/BottomStatRating'

/**
 * @vuese
 * Shows the image thumbnail, as seen on for example on the homepage/recommended. The `ImageCard` is encapsulated by the `ImageRow`.
 * @group Content
 */
export default {
    components:{BottomStat},
    props:['data', 'index'],
    data(){
        return {

        }
    },
    methods:{
        // @vuese
        // Sends a reaction to the parents `ImageRow`.
        reaction(reaction){
            // Emits reaction to `ImageRow`
            this.$emit('reaction', {reaction:reaction, index:this.index})
        },
        // @vuese
        // Deprecated. Debugging.
        hash(){
            //this.$router.push('#');
        },
        // @vuese
        // Get the thumbnail.
        get_thumbnails(url){
            if(url){

           if(url.includes('.webm') && url.includes('gfycat')){
               let index_slash = url.lastIndexOf("/") + 1
               let index_period = url.lastIndexOf('.')
               let tmp = url.substring(index_slash, index_period)
               let new_url = 'https://thumbs.gfycat.com/' + tmp + '-max-1mb.gif'
               return new_url
           } else if(url.includes('pornhub')){
               return 'https://i.imgur.com/09pgBA3.jpg'
           } else{
               return url
           }
            }else{
                return 'https://i.imgur.com/09pgBA3.jpg' 
            }
        },



    }
}
</script>

<style scoped>
.v-card--reveal {
align-items: center;
bottom: 0;
justify-content: center;
position: absolute;
width: 100%;
}

.seen{
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
}
</style>
