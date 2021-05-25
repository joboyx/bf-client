<template>

    <div v-if="true">
        <v-layout class="text-xs-center mb-5" row wrap justify-center>
            <span class="display-3 font-weight-thin text-xs-center">Backpack</span>
        </v-layout>

        <v-layout row wrap >

            <v-flex xs12 sm6 md4 lg3 class="mt-3" justify-center>


            <v-card height="100%" width="300px" style="margin:auto" color="transparent" flat>
                <v-img
                       :src="require('assets/images/carrot.png')"
                       height="100px"
                       width="100px"
                       class="ma-"
                       style="margin-left:80px;"
                       contain
                    >
                    </v-img>
                    <v-card-title class="">
                        <div >
                            <span class="title font-weight-light">Carrots x{{carrots}}</span><br>
                            <span>Use it to buy premium features!</span> <br>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                            <v-layout >
                            <v-btn flat small to='/bunnylove' nuxt>
                                shop
                                </v-btn>
                                <v-btn flat small to='/marketplace/shop/browse' nuxt>
                                    buy
                                </v-btn>
                                </v-layout>

                    </v-card-actions>

                </v-card>
            </v-flex>
        <template v-for="(item, index) in items">

            <v-flex xs12 sm6 md4 lg3 class="mt-3" justify-center>


            <v-card height="100%" width="300px" style="margin:auto" color="transparent" flat>
                <v-img
                        :src="get_reward_logo(item['item_type'])"
                       height="100px"
                       width="100px"
                       class=""
                       style="margin-left:80px"
                       contain
                    >
                    </v-img>
                    <v-card-title class="">
                        <div class='text-xs-center'>
                            <span class="title font-weight-thin">{{item['title']}} x{{item['count']}}</span><br>
                        </div>
                            <span>{{get_item_description(item['item_type'])}}</span>
                    </v-card-title>
                    <v-card-actions>
                        <template v-for="button in get_item_actions(item['item_type'])">
                            <v-layout>
                            <v-btn flat small @click="use_item(item, button['action'])" :disabled="loading || getActivationStatus(item['item_type'])">
                                {{button['description']}}
                            </v-btn>
                            </v-layout>

                        </template>
                    </v-card-actions>

                </v-card>
            </v-flex>

        </template>


        </v-layout>
<v-snackbar
      v-model="hatch"
      color=""
      :multi-line='true'
      timeout="6000"
      top
    >
    <span class="font-weight-thin heading">
       You found {{won_carrots}} carrots!
    </span>
      <v-btn
        dark
        flat
        @click="hatch = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <!-- <v-btn @click="$bus.emit('update_carrots', 100)">Hatch</v-btn> -->

    </div>

</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
export default{

    data(){
        return{
            items:[
                    // {'item_type':'bronze_egg','count':1, 'title':'Bronze egg'},
                    // {'item_type':'silver_egg','count':2, 'title':'Silver egg'},
                    // {'item_type':'gold_egg','count':6, 'title':'Gold egg'},
                    // {'item_type':'streak_freeze','count':1, 'title':'Streak freeze'},
                    // {'item_type':'bunnylove_month','count':1, 'title':'Bunnylove 1 month'},
                    // {'item_type':'extra_flick','count':1, 'title':'Extra flick'},
            ],
            carrots:0,
            inventory:{},
            hatch:false,
            won_carrots: 0,
            loading:false,
            user:{}
        }

    },
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken', 'isGuest']),
        getActivationStatus(item){
            if(item==='bunnylove-1' && (this.user.tier===1 || this.user.tier===2)){
                return true
            }else if(item==='bunnylove-2' && this.user.tier===2){
                return true
            }else{
                return false
            }
        },
        get_reward_logo(item){

           if(item==='carrot'){
                return require('assets/images/carrot.png')
            } else if(item==='bronze-egg'){
                return require('assets/images/egg-bronze.png')
            } else if(item==='silver-egg'){
                return require('assets/images/egg-silver.png')
            } else if(item==='golden-egg'){
                return require('assets/images/egg-golden.png')
            }else if(item==='streak_freeze'){
                return require('assets/images/freeze.png')
            } else if(item==='bunnylove-1'){
                return require('assets/images/bunnylove.png')
            }else if(item==='bunnylove-2'){
                return require('assets/images/bunnylove.png')
            } else if(item==='extra_flick'){
                return require('assets/images/video_tape.png')
            }
                return require('assets/images/logo.png')

        },
        get_item_actions(item){
            if(item==='carrot'){
                return [{
                    'description':'Use',
                    'action':'to_store'
                },{
                    'description':'Buy',
                    'action':'buy_carrot'
                }]
            }else if(item==='bronze-egg'){
                return [{
                    'description':'Hatch one',
                    'action':'one'

                },{
                    'description':'Hatch all',
                    'action':'all'
                }]
            }else if(item==='silver-egg'){
                return [{
                    'description':'Hatch one',
                    'action':'one'

                },{
                    'description':'Hatch all',
                    'action':'all'
                }]
            }else if(item==='golden-egg'){
                return [{
                    'description':'Hatch one',
                    'action':'one'

                },{
                    'description':'Hatch all',
                    'action':'all'
                }]
            }else if(item==='streak_freeze'){
                return [{
                    'description':'Activate',
                    'action':'activate_streak_freeze'
                }]
            }else if(item==='bunnylove-1' || item==='bunnylove-2'){
                return [{
                    'description':'Activate',
                    'action':'bunnylove'
                }]
            }else if(item==='extra_flick'){
                return [{
                    'description':'Activate',
                    'action':'activate_extra_flick'
                }]
            }
        },
        use_item(item, action){
            this.loading = true
            let h = {headers:{Authorization : this.authenticationToken()}}

            let idx = this.items.indexOf(item)

            if(action==='one'){
                this.$axios.$post('/api/fication/inventory/activate/'+item._id,{}, h)
                    .then((res)=>{
                        if(res.success){
                            this.carrots+=res.carrots
                            this.won_carrots = res.carrots
                            this.hatch = true
                            item['count']--;
                            if(item['count']===0){
                                this.items.splice(idx, 1)
                            }else{
                                this.items.splice(idx, 1, item)
                            }
                            this.$bus.emit('update_carrots', this.carrots)
                        }

                        this.loading = false

                    })
                    .catch((err)=>{
                        this.loading = false
                        console.log(err)
                    })
            }else if(action==='all'){
                this.$axios.$post('/api/fication/inventory/activate/' + item._id + "/all",{}, h)
                    .then((res)=>{
                        if(res.success){
                            this.carrots+=res.carrots
                            this.won_carrots = res.carrots
                            this.hatch = true
                            item['count'] = 0;
                            this.items.splice(idx, 1)
                            this.$bus.emit('update_carrots', this.carrots)
                        }
                        this.loading = false
                    })
                    .catch((err)=>{
                        console.log(err)
                        this.loading = false
                    })
            } else if(action==='bunnylove'){
                this.$axios.$post('/api/fication/inventory/activate/' + item._id,{}, h)
                    .then((res)=>{
                        if(res.success){
                            location.reload()
                        }
                        this.loading = false
                    })
                    .catch((err)=>{
                        console.log(err)
                        this.loading = false
                    })
            } else if(action==='buy_carrot'){
                this.$router.push({ name: 'marketplace-shop-browse'})
            }

        },
        get_item_description(item){
            if(item==='carrot'){
                return 'Use it to buy premium features, streak freezes and much more! '
            }else if(item==='bronze-egg'){
                return 'You have seen these around occasionally... A mysterious looking egg.'
            }else if(item==='silver-egg'){
                return 'A very unusual occurrence... Only one way to find out what is inside.'
            }else if(item==='golden-egg'){
                return 'A very rare find. Better be careful... I wonder what\'s inside.'
            }else if(item==='streak_freeze'){
                return 'Freeze your daily streak so you won\'t have to login tomorrow!'
            }else if(item==='bunnylove-1'){
                return 'One month of BunnyLove Hopper membership. Use it wisely!'
            }else if(item==='bunnylove-2'){
                return 'One month of the rare BunnyLove Hopmeister membership. Fascinating...'
            }else if(item==='extra_flick'){
                return 'One extra flick for you to record your favourite content in!'
            }
        }
    },
    created(){
      if(this.isGuest()){
          this.$router.push('/')
      }

    let h = {headers:{Authorization : this.authenticationToken()}}

    this.$axios.$get('/api/user', h)
        .then((res)=>{
            if(res.success){
                this.user = res.user
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

    this.$axios.$post('/api/fication/inventory',{}, h)
        .then((res)=>{
            this.inventory = res
            this.items = res.inventory
        })
        .catch((err)=>{
            console.log(err)
        })

    },
    head () {
        return {
            titleTemplate: `Backpack: Your Bunnyfap Items`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Your Bunnyfap Items to Enhance your viewing experience.`
            }],
        }
    }
}

</script>

<style scoped>
</style>
