
<template>
    <div  v-if="true">
        <FlixTabs></FlixTabs>
    <MediaFlix 
    :title="title" 
    :data_endpoint="data_endpoint" 
    :data_endpoint_auth="data_endpoint_auth" 
    :description="description" 
    :search="search"
    :tagline="tagline"
    ></MediaFlix>
    </div>
</template>

<script>
import MediaFlix from '@/components/content/MediaFlix'
import FlixTabs from '@/components/infrastructure/FlixTabs'
import { mapGetters } from 'vuex'


export default {
    components:{MediaFlix, FlixTabs},    
    methods:{
        ...mapGetters('auth',['isLoggedIn']),
        ...mapGetters('user',['getUser'])
    },
    data(){
        return{
            title:'store',
            description:"My favourites",
            tagline:"This made it happen for you",
            search:true,
            data_endpoint:'/api/flix/published/top',
            data_endpoint_auth:'/api/flix/published/top',
        }
    },
    created(){
        if(!this.isLoggedIn()){
            this.$router.push('/top')
        }


    },
    mounted(){
        // if(this.getUser().tutorial.flix){
        //     this.$tours['flix'].start()
        // }
        // YOU WERE HERE
    },
    head () {
        return {
            titleTemplate: `Porn Flix: HD Porn Video & Image compilations XXX - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Watch HD Porn compilations made by the community!`
            }],
        }
    }
}
</script>

<style scoped>

</style>
