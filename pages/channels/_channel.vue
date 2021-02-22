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
import ContentTabs from '@/components/infrastructure/ContentTabs'

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
    }
}
</script>

<style scoped>

</style>
