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
const ContentTabs = () => import('@/components/infrastructure/ContentTabs')
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
    },
    head () {
        return {
            titleTemplate: `${this.$route.params.category} HD Porn Videos & Images XXX - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Watch unlimited ${this.$route.params.category} Porn in HD only at Bunnyfap. More added every day!`
            }],
        }
    }
}
</script>

<style scoped>
</style>
