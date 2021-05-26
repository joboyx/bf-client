import axios from 'axios'

export const state = () => ({
    search : [
        {items:[], sort: "Category"},
        {items:[], sort: "Tag"},
        {items:[], sort: "Channel"},
        {items:[], sort: "Your search"}
    ]
})

export const getters = {
    getSearchItems({ search }){
        return search
    },
    getCategories({ search }){
        return search[0].items
    },
    getTags({ search }){
        return search[1].items
    },
    getChannels({ search }){
        return search[2].items
    },
    getSearchQuery({ search }){
        return search[3].items[0]
    }
}

export const mutations = {
    setSearchItems(state, data){
        state.search = data
    },
    updateSearchQuery(state, query){
        state.search[3].items[0] = query
    }
}

export const actions = {
    // fetchSearchItems({ commit }, authHeader){
    //     console.log(authHeader)
    //     axios.get('/api/tag/existing/search', authHeader)
    //         .then((res) =>{
    //             console.log(res)
    //             for (let i = 0; i < res.data[1].items.length; i++) {
    //                 res.data[1].items[i] = res.data[1].items[i] + ' '
    //             }
    //             console.log(res.data)
    //             commit('setSearchItems', res.data)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })

    // }
}