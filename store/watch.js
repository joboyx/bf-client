export const state = () => ({
    resource: false
})


export const getters = {
    getResource(state){
        return state.resource
    }
}

export const mutations = {
    setResource(state, resource_){
        state.resource = resource_
    },
    like(state){
        if(state.resource.like){
            state.resource.like = false
        } else{
            state.resource.like = true
        }
    },
    dislike(state){
        if(state.resource.dislike){
            state.resource.dislike = false
        } else{
            state.resource.dislike = true
        }
    },
    favourite(state){
        if(state.resource.favourite){
            state.resource.favourite = false
        } else{
            state.resource.favourite = true
        }
    }
}

export const actions = {
    setResource({ commit }, resource_){
        commit('setResource', resource_)
    }
}
