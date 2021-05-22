<template>
</template>

<script>
export default {
    methods:{
        forceAuthHeaderz(){
            if(!this.$store.getters['auth/getToken']){
                    return this.$axios.$post('https://api.bunnyfap.com/api/auth/guest', {}, {})
                        // .then((t)=>{
                        //     this.$store.dispatch('auth/guest', t.token)
                        //     console.log(t)
                        //     return this.$store.getters['auth/getAuthHeader']
                        // })
            } else{
                return this.$store.getters['auth/getAuthHeader']
            }
                // if (!state.authData.token){
                //     auth.dispatch(guest(t.data.token))
                //     // rootState.auth.authData.token = t.data.token
                //     // rootState.auth.authData.guest = true
                //     // rootState.auth.authData.loggedIn = true;
                //     console.log(state)
                // }
        },
        async forceAuthHeaders(){
            if(!this.$store.getters['auth/getToken']){
                    let t = await this.$axios.$post('https://api.bunnyfap.com/api/auth/guest', {}, {})
                    this.$store.dispatch('auth/guest', t.token)
                    // console.log(t.token)
                    return this.$store.getters['auth/getAuthHeader']
            } else{
                return this.$store.getters['auth/getAuthHeader']
            }
                // if (!state.authData.token){
                //     auth.dispatch(guest(t.data.token))
                //     // rootState.auth.authData.token = t.data.token
                //     // rootState.auth.authData.guest = true
                //     // rootState.auth.authData.loggedIn = true;
                //     console.log(state)
                // }
        },
        getHeader(){
            this.forceAuthHeaderz()
                .then((res)=>{
                    console.log(res)
                    return res
                })
        }
    }
}
</script>

<style>

</style>