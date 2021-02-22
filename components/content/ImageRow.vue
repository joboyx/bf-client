<template>
    <div class='main'>
    <!-- <SignUpAd :signUpAd="showSignUpAd" ></SignUpAd> -->
    <Theatre :data="data.data" :id="id" ref="lb" v-on:signup="signUp()"
    :betterfap="betterfap"
    @seen="seen($event)"
    @like="like($event)"
    @dislike="dislike($event)"
    @favourite="favourite($event)"
    @get_more_data="get_more_data"
    @close_modal="close_modal"
    @open_modal="open_modal"
    ></Theatre>
    <div id="lightbox"></div>
        <h1 class="display-1 font-weight-light "></h1>
        <v-container fluid grid-list-sm>
            <v-layout row wrap>
                <v-flex d-flex lg3 xl3 md4 sm6 xs12 v-if="!no_first_card">
                    <v-card height="100%" width="100%" color="transparent" flat @click="bunnyfap" style="cursor:pointer" id="landingStep-3">
                        <v-container fill-height justify-center>
                            <v-layout justify-center row wrap>
                                <v-flex xs12 text-xs-center>
                                    <h1 class="display-1 font-weight-thin">{{description}}</h1>
                                </v-flex>
                                <v-flex xs12 text-xs-center v-if="true">
                                    <h1 class="headline font-weight-thin">{{tagline}}</h1>
                                </v-flex>
                                <v-flex xs12 text-xs-center>
                                    <v-layout justify-center class="title font-weight-thin"><span class="mt-2">Start AutoFap</span> <v-icon right large>play_circle_filled</v-icon></v-layout>
                                </v-flex>
                                <v-flex xs12 text-xs-center v-if="false">
                                    <vue-typer
                                    :text='taglines'
                                    :repeat='Infinity'
                                    :shuffle='true'
                                    initial-action='typing'
                                    :pre-type-delay='70'
                                    :type-delay='70'
                                    :pre-erase-delay='4000'
                                    :erase-delay='50'
                                    erase-style='backspace'
                                    :erase-on-complete='false'
                                    caret-animation='smooth'
                                    class="headline font-weight-thin"
                                    ></vue-typer>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>

                
                <v-flex d-flex lg3 xl3 md4 sm6 xs12 v-for="(item, index) in data.data" :key="index"  :id="String(index+item)">
                    <div v-if="!modal_closed || true"> 

                    <ImageCard
                    :data="item"
                    v-on:my_emit="lightbox(index)"
                    v-on:signup="signUp()"
                    @reaction="reaction($event)"
                    :index="index"
                    >
                    </ImageCard>
                    </div>
                    
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
// if(process.browser){
//     require('lightgallery.js/dist/js/lightgallery.js');/
//     require('lg-video.js');
//     require('lightgallery.js/dist/css/lightgallery.css')
// }

import ImageCard from '@/components/content/ImageCard'
import Theatre from '@/components/content/Theatre'
// import SignUpAd from '@/components/SignUpAd'
/**
 * @vuese
 * Takes a list of `ImageCards` and displays them neatly in a row. Also contains a `Theatre`, to open a specific resource and view it in more detail.
 * @group Content
 */
export default {
    data(){
        return{
            // @vuese
            // Debug message.
            msg:'msg',
            // @vuese
            // The list of `ImageCards`
            slideshow_data : this.data.data,
            // @vuese
            // Deprecated.
            showSignUpAd : false,
            // @vuese
            // Deprecated.
            taglines:[''],
            // @vuese
            // Whether the Theatre is open or not.
            modal_closed:false
        }
    },
    props:['data', 'id', 'description', 'tagline', 'betterfap', 'no_first_card'],
    components:{ImageCard, Theatre},
    methods:{
        // @vuese
        // Opens the `Theatre`. (Used to be called lightbox).
        lightbox(i){
            console.log() // Do not remove -> Doesn't work without.
            //const elem = document.getElementById(id)
            //window.lightGallery(elem, {dynamic:true, dynamicEl: data, index:parseInt(i)})
            this.$refs.lb.openModal(i)
        },
        // @vuese
        // Deprecated.
        signUp(){
            this.showSignUpAd = true
        },
        // @vuese
        // Called if the user views a specific resource.
        seen(index){
            this.$emit('seen', index)
        },
        // @vuese
        // Called if the user likes a resource.
        like(index){
            this.$emit('like', index)
        },
        // @vuese
        // Called if the user dislikes a resource.
        dislike(index){
            this.$emit('dislike', index)
        },
        // @vuese
        // Called if the user favourites a resource.
        favourite(index){
            this.$emit('favourite', index)
        },
        // @vuese
        // Propagates a reaction of a specific resource.
        reaction(r){
            // console.log(r)
            let reaction = r.reaction
            let index = r.index
            if(reaction==='like')
                this.like(index)
            else if(reaction==='dislike')
                this.dislike(index)
            else if(reaction==='favourite')
                this.favourite(index)
        },
        // @vuese
        // Called if the user reaches the end of a page or the final resource and needs more data to be fetched from the server.
        get_more_data(){
            this.$emit('get_more_data')
        },
        // @vuese
        // Open the Theatre.
        open_modal(){
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";
            this.modal_closed = true
        },
        // @vuese
        // Closes the Theatre.
        close_modal(){
            document.documentElement.style.overflow = 'auto';
            document.body.scroll = "yes";
            this.modal_closed = false


        },
        // @vuese
        // Called when the user hits the first tile and triggers autoplay. This is what we first called bunnyfap.
        bunnyfap(){
            if(!this.$refs.lb.autoPlayToggle){
                // this.$refs.lb.toggleAutoPlay()
                this.$refs.lb.autoPlayToggle = true
            }
            this.$refs.lb.openModal(0)
        },
    },
}
</script>

<style scoped>
.main{
    overflow: hidden;
}

.vue-typer{
    margin: auto;
}

.seen{
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
}

/*
.vue-typer .right{
    float: initial !important;
}

.vue-typer .left {
    float: initial !important;
  }
  */

</style>
