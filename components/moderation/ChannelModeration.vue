<template>
    <div>

<v-layout class="mt-5">

<v-card width="100%" v-if="channels.length>0" color="">
    <v-card-title>
      Vote for the orientation and type of each of the channels. Click on the channel to view the subreddit. 
      <v-spacer></v-spacer>

            <v-checkbox
            v-model="unvoted"
            label="Show only unvoted"
            dark
            color="#B29126"
            @change="checkbox"
            ></v-checkbox>

        <v-spacer></v-spacer>  
    
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        color="black"
      ></v-text-field>
    </v-card-title>
        <v-data-table
        :headers="headers"

        :items="channels"
        :search="search"
        class="elevation-1 fixed-header"
        :rows-per-page-items='[10,25,100,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]'
        disable-initial-sort

        >
        <!-- v-bind:pagination.sync="pagination" -->
        <!-- :rows-per-page-items='[50,100,200,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]' -->

              <!-- <template v-slot:headers="props">
                  <tr>
                      <template v-for="header in props.headers">

                        <th
                            class="text-xs-center"
                            
                            :key="header.text"
                            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                            @click="changeSort(header.value)"
                            v-if="header.text!='Straight' && header.text!='Real-life'"
                        >
                            <v-icon small>arrow_upward</v-icon>
                            {{ header.text }}
                        </th>

                        <th
                            class="text-xs-center"
                            
                            :key="header.text"
                            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                            @click="changeSort(header.value)"
                            v-else
                            style="border-left: 2px solid black"
                        >
                            <v-icon small>arrow_upward</v-icon>
                            {{ header.text }}
                        </th>

                      </template>

                  </tr>
              </template> -->


        <template v-slot:items="props">
            <td>

                <a :href="'https://www.reddit.com/r/' + props.item.channel"  target="_blank" rel="noopener noreferrer"
                    style="color:inherit"
                >{{props.item.channel}}</a>
                
            </td>
            <td style="border-left: 2px solid black">
                <v-layout justify-center v-if="!props.item.art_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.real_life_score*(10/3)"
                            color="#B29126"
                        >
        
                    <v-icon small  @click="like(props.item,'real_life')" v-if="props.item.real_life" color="blue">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'real_life')" v-else>thumb_up</v-icon>
      </v-progress-circular>
                <!-- {{props.item.real_life_score}} -->
                </v-layout>

            </td>
            <td>
                <v-layout justify-center v-if="!props.item.art_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.comic_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small   @click="like(props.item,'comic')" v-if="props.item.comic" color="blue">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'comic')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.comic_score}} -->
                </v-layout>
            </td>
            <td>
                <v-layout justify-center v-if="!props.item.art_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.three_d_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'three_d')" v-if="props.item.three_d" color="blue">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'three_d')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.three_d_score}} -->
                </v-layout>
            </td>
            <td>
                <v-layout justify-center v-if="!props.item.art_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.art_other_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'art_other')" v-if="props.item.art_other" color="blue">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'art_other')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.art_other_score}} -->
                </v-layout>
            </td>
            <td style="border-left: 2px solid black">
                <v-layout justify-center v-if="!props.item.orientation_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.straight_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'straight')" v-if="props.item.straight" color="green ">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'straight')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.straight_score}} -->
                </v-layout>
            </td>
            <td>
                <v-layout justify-center v-if="!props.item.orientation_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.solo_woman_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'solo_woman')" v-if="props.item.solo_woman" color="green">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'solo_woman')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.solo_woman_score}} -->
                </v-layout>
            </td>
            <td>
                <v-layout justify-center v-if="!props.item.orientation_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.solo_man_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'solo_man')" v-if="props.item.solo_man" color="green">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'solo_man')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.solo_man_score}} -->
                </v-layout>
            </td>
            <td>
                <v-layout justify-center v-if="!props.item.orientation_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.lesbian_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'lesbian')" v-if="props.item.lesbian" color="green">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'lesbian')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.lesbian_score}} -->
                </v-layout>
            </td>
            <td>
                <v-layout justify-center v-if="!props.item.orientation_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.gay_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'gay')" v-if="props.item.gay" color="green">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'gay')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.gay_score}} -->
                </v-layout>
            </td>
            <td>
                <v-layout justify-center v-if="!props.item.orientation_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.trans_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'trans')" v-if="props.item.trans" color="green">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'trans')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.trans_score}} -->
                </v-layout>
            </td>
            <td>
                <v-layout justify-center v-if="!props.item.orientation_accepted">
                          <v-progress-circular
                            :rotate="270"
                            :size="50"
                            :width="5"
                            :value="props.item.orientation_other_score*(10/3)"
                            color="#B29126"
                        >
                    <v-icon small  @click="like(props.item,'orientation_other')" v-if="props.item.orientation_other" color="green">thumb_up</v-icon>
                    <v-icon small  @click="like(props.item, 'orientation_other')" v-else>thumb_up</v-icon>
              </v-progress-circular>
                <!-- {{props.item.orientation_other_score}} -->
                </v-layout>
            </td>





            <!-- <td v-for="(i,index) in remove_channel(props.item)" :key='index'>
                <v-layout justify-center>

                    <v-icon small  @click="like(props,index)">thumb_up</v-icon>
                {{i}}

                </v-layout>
            </td> -->

            <td class="text-xs-centre" style="height:30px">{{ props.item.description }}</td>

        </template>

      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>

        </v-data-table>

  </v-card>
<v-card v-else width="100%" color="transparent" flat>

        <v-layout justify-center>
                <v-progress-circular
                :size="70"
                :width="7"
                color="#B29126"
                indeterminate
                class="mt-5"
                ></v-progress-circular>
        </v-layout>
    
</v-card>

</v-layout>
<v-snackbar
        v-model="snackbar"
        timeout='2000'
        top
      >
      <v-container fluid text-xs-center class="ma-0 pa-0">
        <v-layout justify-center>
        Thank you for your suggestions!

        </v-layout>
      </v-container>
</v-snackbar>
{{all_channels}}
    </div>
</template>

<script>
// import { channels } from '@/data/search_items'
import axios from 'axios'
import { mapGetters } from 'vuex'

/**
 * @vuese
 * This compenent allows people to vote the appropriate types and categories of specific channels/subreddits. 
 * @group moderation
 */
export default {
    data(){
        return { // @vuese
            // The table headers.
            headers:[
                {text: 'Channel', value: 'channel', width: '8.333%', align: 'left'},
                {text: 'Real-life', value: 'real_life_score', width: '8.333%', align: 'center'},
                {text: 'Hentai', value: 'comic_score', width: '8.333%', align: 'center'},
                {text: '3D', value: 'three_d_score', width: '8.333%', align: 'center'},
                {text: 'Mixed Art', value: 'art_other_score', width: '8.333%', align: 'center'},
                {text: 'Straight', value: 'straight_score', width: '8.333%', align: 'center'},
                {text: 'Solo woman', value: 'solo_woman_score', width: '8.333%', align: 'center'},
                {text: 'Solo man', value: 'solo_man_score', width: '8.333%', align: 'center'},
                {text: 'Lesbian', value: 'lesbian_score', width: '8.333%', align: 'center'},
                {text: 'Gay', value: 'gay_score', width: '8.333%', align: 'center'},
                {text: 'Trans', value: 'trans_score', width: '8.333%', align: 'center'},
                {text: 'Mixed Orientation', value: 'orientation_other_score', width: '8.333%', align: 'center'},
            ],// @vuese
            // Deprecated.
            channels:[
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},
                // {channel:'My Channel', real_life_score:12, comic_score:2, three_d_score:1, art_other_score:3, straight_score:15, solo_woman_score:2,solo_man_score:1,lesbian_score:0, gay_score:0,trans_score:0,orientation_other_score:1, real_life:true},


            ],// @vuese
            // A list of all channels.
            channels_all:[],// @vuese
            // The list of channels filtered according to whether the user has already voted on them or not.
            channels_filtered:[],// @vuese
            // The search string allowing the user to filter certain channels.
            search:'',// @vuese
            // The table pagination parameters. 
            pagination: {
                rowsPerPage: 10,
                sortBy: 'channel',
                descending: true,
            },// @vuese
            // The notification bar which can popup on top of the page. If set to true the notification shows for a few seconds and then disappears. See vuetify snackbar for more details.
            snackbar:false,// @vuese
            // List of all orientations.
            orientations:["straight", "gay", "lesbian", "trans", "solo_man", "solo_woman", "orientation_other"],// @vuese
            // List of art styles.
            arts:["real_life", "comic", "three_d", "art_other"],// @vuese
            // Whether the table should show all channels or only the ones which the user has not voted on.
            unvoted:true
        }
    },
    // @vuese
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        // @vuese
        // Called when the user votes up for a particular item.
        like(item, value){
            const index = this.channels.indexOf(item)

            let h = {headers:{Authorization : this.authenticationToken()}}

            if(this.arts.includes(value)){
                // Art

                if(this.channels[index][value]){
                    this.$set(this.channels[index], value, false);
                    this.$set(this.channels[index], value + '_score', this.channels[index][value+'_score']-1);

                }else{

                    for(let x of this.arts){
                        if(this.channels[index][x])
                        this.$set(this.channels[index], x + '_score', this.channels[index][x+'_score']-1);
                    }

                    this.$set(this.channels[index], value, true);
                    this.$set(this.channels[index], value + '_score', this.channels[index][value+'_score']+1);
                }

                for(let x of this.arts){
                    if(x!=value)
                    this.$set(this.channels[index], x, false);
                }


                this.$axios.$post('/api/tag/channel/'+item.channel + '/upvote/art/' + value,{}, h)
                .then((res)=>{
                    })
                .catch((err)=>{
                    console.log(err)
                })

            } else{

                if(this.channels[index][value]){
                    this.$set(this.channels[index], value, false);
                    this.$set(this.channels[index], value + '_score', this.channels[index][value+'_score']-1);

                }else{

                    for(let x of this.orientations){
                        if(this.channels[index][x])
                        this.$set(this.channels[index], x + '_score', this.channels[index][x+'_score']-1);
                    }  


                    this.$set(this.channels[index], value, true);
                    this.$set(this.channels[index], value + '_score', this.channels[index][value+'_score']+1);
                }

                for(let x of this.orientations){
                    if(x!=value)

                    this.$set(this.channels[index], x, false);
                }


                this.$axios.$post('/api/tag/channel/'+item.channel + '/upvote/orientation/' + value,{}, h)
                .then((res)=>{
                    })
                .catch((err)=>{
                    console.log(err)
                })
            }

                // let count = 0
                // for(let x of this.arts){
                //     if(this.channels[index][x])
                //     count+=1
                // }
                // for(let x of this.orientations){
                //     if(this.channels[index][x])
                //     count+=1
                // }


                // if(count===2){
                //     let i = this.channels_filtered.indexOf(this.channels[index])
                //     this.channels_filtered.splice(i,1)
                // } else{
                //     if(this.channels_filtered.includes(this.channels[index]) === false){
                //         this.channels_filtered.splice(index,0,this.channels[index])
                //     }
                // }



        },
        // @vuese
        // Called if the user changes the sort from ascending to descending and vice versa. 
        changeSort (column) {
            column = 'channel'
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
        },
        // @vuese
        // Called to toggle the `unvoted` property, which shows either all channels or only the ones the user has not voted on yet.
        checkbox(){
            if(this.unvoted){
                this.channels = this.channels_filtered
            } else{
                this.channels = this.channels_all
            }
        },
        // @vuese
        // Runs at the beginning to list all unvoted channels.
        setFilteredChannels(){
            
            for (let channel of this.channels){
                let count = 0
                if(channel.art_accepted){
                    count+=1
                } else{
                    for(let x of this.arts){
                        if(channel[x])
                        count+=1
                    }
                }
                if(channel.orientation_accepted){
                    count+=1
                } else{
                    for(let x of this.orientations){
                        if(channel[x])
                        count+=1
                    }
                }

                if(count != 2){
                    this.channels_filtered.push(channel)
                    
                    } 
            }
            // console.log("Filtering complete")
        }
    },
    mounted(){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/tag/channels', h)
            .then((res)=>{
                this.channels_all = res.channels
                this.channels = this.channels_all
                // console.log(this.channels[0])
                this.setFilteredChannels()
                this.checkbox()
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}
</script>

<style scoped>

tr {
    height: 75px;    
}

</style>
