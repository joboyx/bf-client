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
    components:{Media,LibraryTabs},
    methods:{
        ...mapGetters('auth',['isLoggedIn'])
    },    
    data(){
        return{
            title:'Like',
            description:"My likes",
            tagline:"You totally dig these",
            search:true,
            data_endpoint:'/api/resource/top',
            data_endpoint_auth:'/api/user/likes',
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
