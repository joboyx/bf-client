<template>
    <div>
                <ContentTabs></ContentTabs>
                <v-layout justify-center class="text-xs-center hidden-md-and-up" row wrap>
                    <v-list class="pt-0" style="background-color:rgba(0,0,0,0);">
                        <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        @click="setPage(item.title)"
                        class="font-weight-light display-3 text-uppercase ma-3"
                        
                        >

                            <v-icon small class="mr-2"> {{ item.icon }}</v-icon>
                            
                            <span style="text-decoration:underline" v-if="item.title===page">

                            {{item.title}}
                            </span>

                            <span v-else>
                            {{item.title}}
                            </span>
                            
                

                        </v-list-tile>
                    </v-list>
                </v-layout>
        <v-container grid>

        <v-layout>
            <v-flex xs1 class="hidden-sm-and-down">
        <v-navigation-drawer  class="ml-4" permanent fixed mini-variant floating style="background-color:rgba(0,0,0,0); width:150;">
                

        <v-layout column fill-height justify-center>

            <v-list class="pt-0">
                <v-list-tile
                v-for="item in items"
                :key="item.title"
                @click="setPage(item.title)"
                class="font-weight-light display-3 text-uppercase ma-3"
                
                >

                    <v-icon small class="mr-2"> {{ item.icon }}</v-icon>
                    
                    <span style="text-decoration:underline" v-if="item.title===page">

                    {{item.title}}
                    </span>

                    <span v-else>
                    {{item.title}}
                    </span>
                    
        

                </v-list-tile>
            </v-list>
        </v-layout>
            </v-navigation-drawer>
            </v-flex>
            <v-flex xs12>
                <Categories v-if="page==='Categories'"></Categories>
                <Tags v-else-if="page==='Tags'"></Tags>
                <Channels v-else-if="page==='Channels'"></Channels>
            </v-flex>
        </v-layout>
        </v-container>

    </div>
</template>


<script>
// import Categories from '@/components/pages/Categories'
// import Tags from '@/components/pages/Tags'
// import Channels from '@/components/pages/Channels'
const ContentTabs = () => import('@/components/infrastructure/ContentTabs')
const Categories = () => import('@/components/pages/Categories')
const Tags = () => import('@/components/pages/Tags')
const Channels = () => import('@/components/pages/Channels')

export default {
    components:{ContentTabs, Categories, Tags, Channels},
    data () {
    return {
      items: [
        { title: 'Categories', icon: 'drag_indicator' },
        { title: 'Tags', icon: 'label' },
        { title: 'Channels', icon: 'blur_on' },
      ],
      right: null,
      page:'Categories'
    }
  },
  methods:{
      setPage(page){
          this.page = page
      }
  },
  head: {
    title: 'Categories and Tags',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Look for Porn that you like. Browse 20+ Categories, 200+ Tags, and 3000+ Channels!'
      }
    ],
  }
}

</script>

<style scoped>

</style>