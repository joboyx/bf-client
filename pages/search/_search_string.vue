<template>
<div>


    <ContentTabs></ContentTabs>

    <Media :title="title"
    :data_endpoint="data_endpoint" 
    :data_endpoint_auth="data_endpoint_auth"
    :description="description"
    :tagline="tagline"
    ></Media>
</div>
</template>

<script>
import Media from '@/components/content/Media'
const ContentTabs = () => import('@/components/infrastructure/ContentTabs')

export default {
    components:{Media, ContentTabs},
    data(){
        return{
            name:this.$route.params.search_string,
            title:'search',
            description: 'Search results',
            tagline: "\"" + this.$route.params.search_string + "\"",
            data_endpoint:'/api/resource/search/' + this.$route.params.search_string,
            data_endpoint_auth:'/api/resource/search/' + this.$route.params.search_string,
            search_string:this.$route.params.search_string,
            active:'search'
        }
    },
    created(){
        // console.log("Creating search page")
        // console.log(this.$route.params.search_string)
    }
}
</script>

<style scoped>

</style>
