
export const state = () => ({
    user : {

    }
})

export const getters = {
    getUser(state){
        return state.user
    }
}

export const mutations = {
    setUser(state, user_){
        state.user = user_
    },
    finishTutorial(state, tutorial_){
        state.user.tutorial[tutorial_] = false
    }
}

export const actions = {
    setUser({ commit }, user_){
        commit('setUser', user_)
    },
    finishTutorial({ commit }, tutorial_){
        commit('finishTutorial', tutorial_)
    }
}
