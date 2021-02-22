<template>
<div>
 <ContentTabs></ContentTabs>
    <Media
    :title="title"
    :data_endpoint="data_endpoint" 
    :data_endpoint_auth="data_endpoint_auth"
    :description="description"
    :tagline="tagline"
    :tags_imported="tag"
    
    ></Media>
</div>
</template>

<script>
import Media from '@/components/content/Media'
import ContentTabs from '@/components/infrastructure/ContentTabs'

export default {
    components:{Media, ContentTabs},
    data(){
        return{
            name:this.$route.params.category,
            title:'tags',
            description: 'Tags',
            tagline: "\"" + this.$route.params.tag + "\"",
            tag: [this.$route.params.tag],
            data_endpoint:'/api/resource/top',
            data_endpoint_auth:'/api/resource/top/auth',
        }
    }
}
</script>

<style scoped>

</style>
