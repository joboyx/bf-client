<template>
    <div>
        <span class="display-1 font-weight-light ml-4"><span class="link" @click="route">{{title}}</span></span>
        <v-layout style="position:relative">
                <v-btn @click="previous" absolute dark fab  left  color="transparent" depressed style="top:40%; left:-20px;">
                    <v-icon large style="display: inline-flex !important;">keyboard_arrow_left</v-icon>
                </v-btn>
        <v-container fluid grid-list-sm max-height="30vh" height="30vh" style="position:relative">


                    <v-card d-flex max-height="30vh" flat color="transparent" width="100%" height="30vh" style="overflow:hidden;margin:auto" :id='title'>
            <v-layout row wrap align-center>
                <!-- <v-card d-flex lg3 xl3 md4 sm6 xs12 v-for="(item, index) in data" :key="index"  :id="String(index+item)"> -->

                <v-flex d-flex lg3 xl3 md4 sm6 xs12 v-for="(item, index) in data" :key="index"  :id="String(index+title)">
                    <div>

                        <ImageCard
                        :data="item"
                        v-on:my_emit="lightbox(index)"
                        :index="index"
                        >
                        </ImageCard>
                    </div>
                </v-flex>


            </v-layout>
                </v-card>

        </v-container>
        <v-btn @click="next" class="" absolute dark fab right  color="transparent" depressed style="top:40%; right:-20px">
                <v-icon large style="display: inline-flex !important;">keyboard_arrow_right</v-icon>
        </v-btn>
        </v-layout>

    </div>
</template>

<script>
import ImageCard from '@/components/content/ImageCard'
/**
 * @vuese
 * Deprecated. Was briefly used for the new home page.
 * @group Content
 */
export default {
    data(){
        return{
            // @vuese
            // 
            modal_closed:false
        }
    },
    props:['data', 'title', 'link'],
    components:{ImageCard},
    methods:{
        // @vuese
        // 
        lightbox(i){
            this.$router.push({name: this.link, params: {data:this.data, index:i}})
        },
        // @vuese
        // 
        previous(){
            let total_width = document.getElementById(this.title).scrollWidth
            let image_width = document.getElementById('0'+this.title).scrollWidth
            let num_elems = Math.round(total_width/image_width)

            // let spliced = this.data.splice(this.data.length - num_elems, num_elems)
            let spliced = this.data.splice(this.data.length - 1, 1)
            for (let item of spliced.reverse()){
                this.data.splice(0, 0, item)
            }

        },
        // @vuese
        // 
        next(){
            let total_width = document.getElementById(this.title).scrollWidth
            let image_width = document.getElementById('0'+this.title).scrollWidth
            let num_elems = Math.round(total_width/image_width)

            // let spliced = this.data.splice(0, num_elems)
            let spliced = this.data.splice(0, 1)
            for (let item of spliced){
                this.data.splice(this.data.length, 0, item)
            }

        },
        // @vuese
        // 
        route(){
            this.$router.push('/' + this.link)
        }
    },
}
</script>

<style scoped>
.link{
    cursor:pointer;
}
.link:hover {
    /* text-decoration: underline; */
    color:#B29126
}
</style>
