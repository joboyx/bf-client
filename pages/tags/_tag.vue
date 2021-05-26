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
const ContentTabs = () => import('@/components/infrastructure/ContentTabs')

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
    },
    head () {
        return {
            titleTemplate: `${this.$route.params.tag} HD Porn Videos & Images XXX - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Watch unlimited ${this.$route.params.tag} Porn in HD only at Bunnyfap. More added every day!`
            }],
        }
    }
}
</script>

<style scoped>

</style>
