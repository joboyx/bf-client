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
import ContentTabs from '@/components/infrastructure/ContentTabs'
import { mapGetters } from 'vuex'


export default {
    components:{Media, ContentTabs},
    data(){
        return{
            title:'Explore',
            description:"Explore",
            tagline:"Bunnies here, bunnies everywhere..",
            search:true,
            data_endpoint:'/api/resource/explore',
            data_endpoint_auth:'/api/resource/explore',
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
    title: 'Explore',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Explore your Porn tastes. We show you the best porn from over 3000 different sources.'
      }
    ],
  }
}
</script>

<style scoped>

</style>
