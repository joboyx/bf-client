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
            title:'New',
            description:"New",
            tagline:"The latest releases",
            search:true,
            data_endpoint:'/api/resource/new',
            data_endpoint_auth:'/api/resource/new',
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
    title: 'The Latest Porn Videos and Pornstars on Bunnyfap',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'View the latest porn on Bunnyfap. Over millions of videos!'
      }
    ],
  }
}
</script>

<style scoped>

</style>
