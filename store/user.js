
export const state = () => ({
    user : {
        username:false,
        notifications: [],
        streak: 0,
        carrots: false,
        mute: true,
        tutorial: {}
    }
})

export const getters = {
    getUser(state){
        return state.user
    },
    getPreferences(state){
        
    },
    getNotifications({ user }){
        return user.notifications
    }
}

export const mutations = {
    setUser(state, user_){
        state.user = user_
    },
    finishTutorial(state, tutorial_){
        state.user.tutorial[tutorial_] = false
    },
    updatePreferences(state, preference_toggle){

    },
    dismissNotification(state, id){
        state.user.notifications.splice(id,1)
    },
    dismissAllNotifications(state){
        state.user.notifications = []
    }
}

export const actions = {
    setUser({ commit }, user_){
        commit('setUser', user_)
    },
    finishTutorial({ commit }, tutorial_){
        commit('finishTutorial', tutorial_)
    },
    dismissNotification({ commit }, id){
        commit('dismissNotification', id)
    },
    dismissAllNotifcations({ commit }){
        commit('dismissAllNotifications')
    }
}
