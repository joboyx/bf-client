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
    :betterfap="betterfap"
    ></Media>
    </div>
</template>

<script>
import Media from '@/components/content/Media'
import LibraryTabs from '@/components/infrastructure/LibraryTabs'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    components:{Media,LibraryTabs},
    methods:{
      ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),

    },    
    data(){
        return{
            title:'Betterfap',
            description:"Betterfap",
            tagline:"Old but gold",
            search:true,
            data_endpoint:'/api/user/bf_imports',
            data_endpoint_auth:'/api/user/bf_imports',
            betterfap: true
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
