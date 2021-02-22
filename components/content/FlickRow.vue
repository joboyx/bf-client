<template>
<div class="main">

        <FlixPlayer
    ref="fp"
    player_id="flix_player_id"
    @close_modal="close_modal"
    :resources="resources"
    ></FlixPlayer>
    <v-container fluid grid-list-sm>
               <v-layout row wrap v-if="flix">
                <v-flex xs12 sm6 md6 lg4 v-for="(item, index) in flix" :key="index" height="100%" :id="String(index+item)" class="mb-1">
                    <FlickCard @open_modal='open_modal' :data="item" :page="title" @delete="delete_flick" :number="index"></FlickCard>
                </v-flex>
        </v-layout> 
    </v-container>
    <PromptRating ref='pr'></PromptRating>
</div>    
</template>
<script>
import FlickCard from '@/components/content/FlickCard'
import { mapGetters } from 'vuex'
import FlixPlayer from '@/components/content/FlixPlayer'
import PromptRating from '@/components/modules/PromptRating'

/**
 * @vuese
 * This component takes a list of `FlickCard`s and displays them in rows. This is also where the `FlixPlayer` is embedded.
 * @group Content
 */
export default {
    components:{FlickCard,FlixPlayer, PromptRating},
    props:['flix','title'],
    data(){
        return {
            // @vuese
            // List of flix.
            resources:[],
            // @vuese
            // Filler space for mobile and small screen formatting.
            filler : [],
            // @vuese
            // Will show a loading icon if the data is still being fetched from the server.
            loading_play:false,
            // @vuese
            // Whether the FlixPlayer is open or not.
            modal_closed:false,
            // @vuese
            // Whether the user has seen a particular flick; this used to prompt users to submit a rating.
            reviewed:true,
            // @vuese
            // The ID associated with this flixPlayer, in case there are multiple.
            play_id:''
        }
    },
    created(){

    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        // @vuese
        // Tells the parent component to delete a spcefic flick, only available in private mode.
        delete_flick(id){
            this.$emit('delete', id)
        },
        // @vuese
        // Opens the FlixPlayer.
        open_modal(id){
            // console.log("ID: " + id)
            this.play_id = id
            this.loading_play = true
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";
            this.modal_closed = true

            let h = {headers:{Authorization : this.authenticationToken()}}

            let endpoint = '/api/flix/edit/'+id
            // let endpoint = '/api/flix/published/'+id + '/play'


            // console.log("Title: " + this.title)
            if(this.title==='library'){

            } else if(this.title==='purchased' || this.title==='published'){
                // console.log("Setting endpoint to play")
                endpoint = '/api/flix/published/'+id + '/play'
            }
            
            this.$axios.$post(endpoint, {}, h)
                .then((res)=>{
                    // console.log(res)
                    this.resources = res.data
                    let self = this
                    this.reviewed = res.reviewed
                    setTimeout(() => self.$refs.fp.openModal(), 0);
                    this.loading_play = false
                })
                .catch((err)=>{
                    console.log(err)
                    this.close_modal()
                })
        },
        // @vuese
        // Closes the FlixPlayer.
        close_modal(){
            document.documentElement.style.overflow = 'auto';
            document.body.scroll = "yes";
            this.modal_closed = false
            this.loading_play = false
            if(this.reviewed === false && this.title ==='purchased'){
                this.$refs.pr.open_dialog(this.play_id)
            }

        },
    }

}
</script>
<style scoped>
.main{
    overflow: hidden;
}
</style>
