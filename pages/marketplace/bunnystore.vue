<template>

    <div v-if="true">
        <v-layout class="text-xs-center" row wrap justify-center>
            <span class="display-3 font-weight-thin text-xs-center">BunnyStore</span>
        </v-layout>

        <v-layout justify-center>
            <v-flex xs10>
                <v-layout class="title font-weight-light mb-2">
            
            
                      <v-badge bottom overlap color="transparent" class="mb-2" >
                          <template v-slot:badge>
                          </template>

                          <nuxt-link to='/marketplace/items'>
                            <v-img 
                                :src="require('assets/images/backpack.png')"
                               height="25px" 
                               width="25px"
                               class="ml-2 mr-2"
                               style="cursor:pointer"
                            >
                            </v-img>
                                </nuxt-link>
                        </v-badge>
                      <v-badge bottom overlap color="transparent" class="mb-2" >
                          <template v-slot:badge>
                              <span class="font-weight-light">x{{carrots}}</span> 
                          </template>

                            <v-img 
                                :src="require('assets/images/carrot.png')"
                               height="25px" 
                               width="25px"
                               class="ml-2 mr-2"
                            >
                            </v-img>
                        </v-badge>
            
                      <v-badge bottom overlap color="transparent" class="mb-2" v-for="(item,index) in inventory_items" :key="item+index">
                          <template v-slot:badge>
                              <span class="font-weight-light">x{{item['count']}}</span> 
                          </template>

                            <v-img 
                                :src="get_reward_logo(item['item_type'])"
                               height="25px" 
                               width="25px"
                               class="ml-2 mr-2"
                            >
                            </v-img>
                        </v-badge>
            
                    </v-layout>
            </v-flex>
            </v-layout>
            
        <v-layout row wrap >
        <template v-for="(item, index) in items">
                
            <v-flex xs12 sm6 md4 lg3 class="mt-3" justify-center>


            <v-card height="100%" width="300px" style="margin:auto" color="transparent" flat>
                <v-img 
                        :src="get_reward_logo(item['item_type'])"
                       height="100px" 
                       width="100px"
                       class="ma-"
                       style="margin:auto;"
                    >
                    </v-img>
                    <v-card-title class="">
                        <div class='text-xs-center'>
                            <span class="title font-weight-light">{{item['title']}} </span><br>

                            <span>{{get_item_description(item['item_type'])}}</span>

                        </div>
                    </v-card-title>
                    <v-card-actions class='text-xs-center'>
                        <div style="margin:auto">
                        <v-btn flat @click="buy(item['item_type'])" :disabled="carrots<item['price']" >Buy</v-btn>
                      <v-badge bottom overlap color="transparent" >
                          <template v-slot:badge>
                              <span class="font-weight-light">x{{item['price']}}</span> 
                          </template>

                            <v-img 
                                :src="require('assets/images/carrot.png')"
                               height="25px" 
                               width="25px"
                               class="ml- mr-2"
                            >
                            </v-img>
                        </v-badge>
                        </div>
                    </v-card-actions>

                </v-card>
            </v-flex>

        </template>
        

        </v-layout>

    </div>
        

</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
export default{

    data(){
        return{
            items:[{'item_type':'streak_freeze', 'price':25, 'title':'Streak freeze'},
                    {'item_type':'bunnylove_month','price':200, 'title':'One month BunnyLove'},
                    {'item_type':'extra_flick','price':50, 'title':'One extra flick'},
            ],
            carrots:'',
            inventory_items:[
                    {'item_type':'bronze_egg','count':1, 'title':'Bronze egg'},
                    {'item_type':'silver_egg','count':2, 'title':'Silver egg'},
                    {'item_type':'gold_egg','count':6, 'title':'Gold egg'},
                    {'item_type':'streak_freeze','count':1, 'title':'Streak freeze'},
                    {'item_type':'bunnylove_month','count':1, 'title':'Bunnylove 1 month'},
                    {'item_type':'extra_flick','count':1, 'title':'Extra flick'},
            ]
        }
        
    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),
        get_reward_logo(item){

           if(item==='streak_freeze'){
                return require('assets/images/freeze.png')
            } else if(item==='bunnylove_month'){
                return require('assets/images/bunnylove.png')
            } else if(item==='extra_flick'){
                return require('assets/images/video_tape.png')
            }else if(item==='bronze_egg'){
                return require('assets/images/bronze_egg.png')
            } else if(item==='silver_egg'){
                return require('assets/images/silver_egg.png')
            } else if(item==='gold_egg'){
                return require('assets/images/gold_egg.png')
            }
 

        },
        buy(item){
            this.$bus.$emit('refresh_carrots') 
        },
        get_item_description(item){
            if(item==='streak_freeze'){
                return 'Freeze your daily streak by one day. This way you won\'t have to login tomorrow!'
            }else if(item==='bunnylove_month'){
                return 'Purchase one month of BunnyLove and enjoy all the premium benefits!'
            }else if(item==='extra_flick'){
                return 'One extra flick for you to record your favourite content in!'
            }
        },

    },
    created(){

    let h = {headers:{Authorization : this.authenticationToken()}}

    this.$axios.$get('/api/user', h)
        .then((res)=>{
            if(res.success){
                if(res.user.carrots){
                    this.carrots = res.user.carrots
                } else{
                    this.carrots = 10
                }

            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

</script>

<style scoped>
</style>
