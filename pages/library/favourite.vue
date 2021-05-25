<template>
    <div>
        <LibraryTabs></LibraryTabs>
    <Media 
    :title="title" 
    :data_endpoint="data_endpoint" 
    :data_endpoint_auth="data_endpoint_auth" 
    :description="description" 
    :search="search"
    :tagline="tagline"
    ></Media>
    </div>
</template>

<script>
import Media from '@/components/content/Media'
import LibraryTabs from '@/components/infrastructure/LibraryTabs'
import { mapGetters } from 'vuex'


export default {
    components:{Media, LibraryTabs},    
    methods:{
        ...mapGetters('auth',['isLoggedIn'])
    },
    data(){
        return{
            title:'favourites',
            description:"My favourites",
            tagline:"This made it happen for you",
            search:true,
            data_endpoint:'/api/resource/top',
            data_endpoint_auth:'/api/user/favourites',
        }
    },
    created(){
        if(!this.isLoggedIn()){
            this.$router.push('/top')
        }
    },
    head () {
        return {
            titleTemplate: `Your HD Porn Video & Image Library XXX - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Porn Images and Videos which you absolutely love!`
            }],
        }
    }
}
</script>

<style scoped>

</style>
