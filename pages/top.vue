<template>
    <div v-if="isLoggedIn">
        <ContentTabs></ContentTabs>


    <Media 
    :title="title" 
    :data_endpoint="data_endpoint" 
    :data_endpoint_auth="data_endpoint_auth" 
    :description="description" 
    :search="search"
    :tagline="tagline"
       :data="data"
    :index="index"
    ></Media>


    </div>
</template>

<script>
import Media from '@/components/content/Media'
const ContentTabs = () => import('@/components/infrastructure/ContentTabs')
import { mapGetters } from 'vuex'


export default {
    components:{Media, ContentTabs},
    data(){
        return{
            title:'Top',
            description:"Top",
            tagline:"The very best of the best",
            search:true,
            data_endpoint:'/api/resource/top',
            data_endpoint_auth:'/api/resource/top/auth',
            data: this.$route.params.data,
            index: this.$route.params.index
        }
    },
    created(){
        // if(this.$route.params.new){
        //     this.new = true
        // }

    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken'])
    },
    head: {
    title: 'Top content on Bunnyfap',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'View the best porn Bunnyfap has to offer!'
      }
    ],
  }
}
</script>

<style scoped>

</style>
