<template>
<div>
 <ContentTabs></ContentTabs>
    
    <Media
    :title="title"
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
            title:'channels',
            description: 'Channels',
            tagline: "\"" + this.$route.params.channel + "\"",
            data_endpoint:'/api/resource/channel/' + this.$route.params.channel,
            data_endpoint_auth:'/api/resource/channel/' + this.$route.params.channel
        }
    },
    head () {
        return {
            titleTemplate: `${this.$route.params.channel} HD Porn Videos & Images XXX - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Watch unlimited ${this.$route.params.channel} Porn in HD only at Bunnyfap. More added every day!`
            }],
        }
    }
}
</script>

<style scoped>

</style>
