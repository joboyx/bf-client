<template>
    <div>
        <h1 class="display-1 font-weight-light ml-4"><span class="link" @click="route">{{title}}</span></h1>
        <!-- <li v-for="item in data">{{item.title}}</li> -->
        <v-layout style="position:relative">
                <v-btn @click="previous" absolute dark fab  left  color="transparent" depressed style="top:40%; left:-20px;">
                    <v-icon large  style="display: inline-flex !important;">keyboard_arrow_left</v-icon>
                </v-btn>
        <v-container fluid grid-list-sm height="" style="position:relative">


                    <v-card flat d-flex max-height="" color="transparent" width="100%" height="468px" style="overflow:hidden;margin:auto" :id='title'>
            <v-layout row wrap align-center>
                <!-- <v-card d-flex lg3 xl3 md4 sm6 xs12 v-for="(item, index) in data" :key="index"  :id="String(index+item)"> -->

                <!-- <v-flex d-flex lg3 xl3 md4 sm6 xs12 v-for="(item, index) in data" :key="index"  :id="String(index+title)"> -->
                <v-flex xs12 sm6 md6 lg4 v-for="(item, index) in data" :key="index" height="100%" :id="String(index+item)">

                    <div>
                    <FlickCard @open_modal='open_modal' :data="item" page="store" :id='String(index)+title'></FlickCard>
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
import FlickCard from '@/components/content/FlickCard'

/**
 * @vuese
 * Deprecated. Was briefly used for the new homescreen.
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
    components:{FlickCard},
    methods:{
        // @vuese
        // 
        lightbox(i){
            // console.log("Redirect: " + i)
        },
        // @vuese
        // 
        previous(){
            let total_width = document.getElementById(this.title).scrollWidth
            let image_width = document.getElementById('0'+this.title).scrollWidth
            let num_elems = Math.round(total_width/image_width)

            // let spliced = this.data.splice(this.data.length - num_elems, num_elems)
            let spliced = this.data.splice(this.data.length - 1, 1)
            for (let item of spliced){
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
            this.$router.push(this.link)
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
