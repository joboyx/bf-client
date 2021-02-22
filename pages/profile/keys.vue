<template>
    <div>
        <v-layout justify-center row wrap>
            <v-flex xs12 sm8 md6>
                <h1 class="display-1 font-weight-thin mb-3">Keys</h1>
                <div v-if="keys.length !=0">
                    <p class="subheading font-weight-light" align="justify">
                        Below you will find {{keys.length}} unique referral <span v-if="keys.length==1">key</span> <span v-else>keys</span>. They can be used to invite others to BunnyFap. Once they are used up, you won't get more.
                    </p>
                    <p class="subheading font-weight-light" align="justify">
                        Use them wisely. With great hopping power, comes great responsibility.
                    </p>

                    <p class="subheading font-weight-light" align="justify">
                        <ol>
                            <li v-for="(k, index) in keys" :key="index">{{k}}</li>
                        </ol>
                    </p>
                </div>

                <div v-else>
                    <p class="subheading font-weight-light" align="justify">
                        You have done the impossible. We will not forget. You will be rewarded. 
                    </p>
                </div>


            </v-flex>

        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
    methods:{
        ...mapGetters('auth',['isLoggedIn', 'authenticationToken']),

    },
    data(){
        return{
            keys:['Loading...']
        }
    },
    created(){
        let h = {headers:{Authorization : this.authenticationToken()}}

        this.$axios.$get('/api/user', h)
            .then((res)=>{
                if(res.success){
                    // console.log(res.user)
                    this.art = res.user.art
                    this.orientation = res.user.orientation
                    this.type = res.user.type
                    // console.log(res.user)
                    this.keys = res.user.keys

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
