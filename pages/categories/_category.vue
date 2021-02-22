<template>
<div>
        <ContentTabs></ContentTabs>
    <Media :title="title"
    :data_endpoint="data_endpoint"
    :data_endpoint_auth="data_endpoint_auth"
    :description="description"
    :tagline="tagline"
    :cats="category"
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
            title:'Top',
            description: 'Category',
            tagline: "\"" + this.$route.params.category + "\"",
            data_endpoint:'/api/resource/top',
            data_endpoint_auth:'/api/resource/top/auth',
            category:[this.$route.params.category]
        }
    }
}
</script>

<style scoped>
</style>
