
export const state = () => ({
    authData : {
        loggedIn : true,
        token : false,
        guest: false,
    },
    user:false
})

export const getters = {
    getAuth(state){
        return state.authData
    },
    isLoggedIn(state){
        //console.log("Check if logged in: " + state.authData.loggedIn)
        return state.authData.loggedIn
    },
    authenticationToken(state){
        return 'Bearer ' + state.authData.token
    },
    isGuest(state){
        return state.authData.guest
    },
    getToken(state){
        return state.authData.token
    },
    getUser(state){
        return state.user
    }
}

export const mutations = {
    login(state, token){
        state.authData.loggedIn = true;
        state.authData.token = token
        state.authData.guest = false
    },
    logout(state){
        // state.authData.loggedIn = false;
        state.authData.token = null
        state.authData.guest = true
    },
    guest(state, token){
        state.authData.token = token
        state.authData.guest = true
        state.authData.loggedIn = true;

    },
    setUser(state, user_){
        state.user = user_
    },
    finishTutorial(state, tutorial_){
        state.user.tutorial[tutorial_] = false
    }
}

export const actions = {
    login({ commit }, token){
        if(token){
            commit('login', token)
        }
    },
    logout({ commit }){
        commit('logout')
    },
    guest({ commit }, token){
        commit('guest', token)
    },
    setUser({ commit }, user_){
        commit('setUser', user_)
    },
    finishTutorial({ commit }, tutorial_){
        commit('finishTutorial', tutorial_)
    }
}
