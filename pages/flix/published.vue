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
        ...mapGetters('auth',['isLoggedIn'])
    },
    data(){
        return{
            title:'published',
            description:"My favourites",
            tagline:"This made it happen for you",
            search:true,
            data_endpoint:'/api/flix/published',
            data_endpoint_auth:'/api/flix/published/published',
        }
    },
    created(){
        if(!this.isLoggedIn()){
            this.$router.push('/top')
        }
    },
    head () {
        return {
            titleTemplate: `Porn Flix: HD Porn Video & Image compilations XXX - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Your Published HD Porn Flix.`
            }],
        }
    }
}
</script>

<style scoped>

</style>
