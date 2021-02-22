<template>
<div>
        <ContentTabs id="v-step-1"></ContentTabs>

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

    <div class="text-xs-center" v-if="new_">
    <v-dialog
      v-model="dialog"
      width="500"

    >
      <v-card>
        <v-card-title
          class="headline grey darken-4"
          primary-title
        >
          Welcome to BunnyFap!
        </v-card-title>

        <v-card-text>
                <!-- <p>
                Hi there!
We just wanted to welcome you to BunnyFap!
                </p> -->
                <p>
                 Below a few quick tips to get started :)
                </p>

                <p>
                    <ol>
                        <li>Click on FILTER to select content type (images, videos, gifs), sexual orientation, and to select categories. You can set preferences in your profile.</li>
                        <li>Click on a tile below to view the resource. Once you are in theatre mode, use the following keyboard shortcuts:
                            <ul>
                                <li><v-icon>arrow_back</v-icon> or <strong>A</strong> - previous resource</li>
                                <li><v-icon>arrow_forward</v-icon> or <strong>D</strong> - next resource</li>
                                <li><v-icon>arrow_upward</v-icon> or <strong>W</strong> - like</li>
                                <li><v-icon>arrow_downward</v-icon> or <strong>S</strong> - dislike</li>
                                <li><v-icon>subdirectory_arrow_left</v-icon> or <strong>F</strong> - Favourite</li>
                                <li>Esc key or <strong>Q</strong> - Exit theatre mode</li>
                            </ul>
                            <!-- You can click the autofap button to just sit back and keep going ;) (Click on more to change the speed of transistions) -->
                        </li>
                        <li>Click on the first tile with the play button to AutoFap! (just sit back and keep hopping)</li>
                    </ol>
                </p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color=""
            flat
            @click="dialog = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>



</div>
</template>

<script>
import Media from '@/components/content/Media'
import ContentTabs from '@/components/infrastructure/ContentTabs'

export default {
    components:{Media, ContentTabs},
    data(){
        return{
            title:'Recommended',
            description:'Recommended',
            search:true,
            tagline:'Tailor made for you',
            data_endpoint:'/api/resource/recommended',
            data_endpoint_auth:'/api/resource/recommended',
            new_:this.$route.params.new,
            dialog:true,
            data: this.$route.params.data,
            index: this.$route.params.index,
        }
    },
    head: {
    title: 'BunnyFap - Porn Made Simple',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Bunnyfap is a powerful community driven platform powered by cutting edge artificial intelligence to provide you with content that makes you happy.'
      }
    ],
  }
}
</script>

<style scoped>

</style>
