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
            title:'purchased',
            description:"My favourites",
            tagline:"This made it happen for you",
            search:true,
            data_endpoint:'/api/flix/published/purchased',
            data_endpoint_auth:'/api/flix/published/purchased',
        }
    },
    created(){
        if(!this.isLoggedIn()){
            this.$router.push('/top')
        }
    }
}
</script>

<style scoped>

</style>
