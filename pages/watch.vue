<template>
<div v-if="isLoggedIn">
    <ContentTabs></ContentTabs>
    <Media :title="title" :data_endpoint="data_endpoint" :data_endpoint_auth="data_endpoint_auth" :description="description" :search="search" :tagline="tagline" :data="resource" :index="index" :watch="true"></Media>

</div>
</template>

<script>
import Media from '@/components/content/Media'
import ContentTabs from '@/components/infrastructure/ContentTabs'
import {
    mapGetters
} 
from 'vuex'

export default {
    components: {
        Media,
        ContentTabs
    },
    async asyncData({
        params,
        $axios
    }) {
        const resource = {"_id":"5eec7ff095c312b1cf72b42d","url":"https://thcf7.redgifs.com/OccasionalCoordinatedBaleenwhale.mp4","thumbnail":"https://thcf7.redgifs.com/OccasionalCoordinatedBaleenwhale-poster.jpg","title":"Outdoor riding jiggle","channel":["JiggleFuck","nsfwhardcore","WorkIt","booty_queens","girlswhoride","NSFW_Outdoors","ridingxxx","youngporn","LapDanceSexStance","jizzedtothis"],"orientation":"straight","art":"real-life","type":"web_video","source":["https://www.reddit.com/r/JiggleFuck/comments/hbvcdj"],"tags_map":{"ass":"Subject’s ass (butt, rear, bottom, booty, buttocks) is prominent or featured","teen":"Subject is (or appears to be) 18 or 19. Suspicions of anything younger should be reported!","audio":"The media contains audio or sound","reverse-cowgirl":"Position in which the female sits astride the male, facing away from him","faceless":"Subject’s face is obscured, censored or cropped off","male-pov":"Media shot from the Point Of View of a male subject","pov":"Point Of View is from a participant in the scene, rather than an observer","amateur":"Subject is not a professional actor, model, or content creator","riding":"One subject is on top of and 'riding' another subject","clothed":"At least one of the subjects is fully clothed in street clothes, even if some clothes are pulled aside","tops":"Items of clothing that cover all/part of the area between the neck and waistline","socks":"Socks typically cover only the foot and part of the lower leg, and are often thicker than stockings ","low-quality":"Low quality content (poor resolution)","girl-on-top":"Female subject on top position","outside":"The setting is outdoors","penis":"Subject’s penis (dick, cock, pecker, prick) is visible or featured"},"s_tags":[],"tags":["amateur","ass","ass","audio","clothed","faceless","girl-on-top","low-quality","male-pov","outside","penis","pov","reverse-cowgirl","riding","socks","teen","tops"],"r_tags":[],"duration":4,"start":-1,"end":-1}
        return {
            resource
        }
    },
    data() {
        return {
            title: 'Top',
            description: "Top",
            tagline: "The very best of the best",
            search: true,
            data_endpoint: '/api/resource/top',
            data_endpoint_auth: '/api/resource/top/auth',
        }
    },
    created() {
        // if(this.$route.params.new){
        //     this.new = true
        // }
    },
    methods: {
        ...mapGetters('auth', ['isLoggedIn', 'authenticationToken'])
    },
    head: {
        title: 'Top content on Bunnyfap',
        meta: [{
            hid: 'description',
            name: 'description',
            content: 'View the best porn Bunnyfap has to offer!'
        }],
    }
}
</script>

<style scoped>

</style>
