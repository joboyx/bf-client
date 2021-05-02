import Axios from "axios";

export const state = () => ({
    list: ['hello','world!']
  })
  
  export const mutations = {
    add (state, text) {
      state.list.push({
        title: text,
        completed: false
      })
    },
    remove (state, { todo }) {
      state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle (state, todo) {
      todo.completed = !todo.completed
    },
    setTodos(state, todos){
        state.list = todos
    }
  }

  export const getters = {
      getAllTodos : ({list}) => {return list}
  }

  export const actions = {
      // async fetchTodos( {commit} ){
      //     //const response = await this.$axios.$get('https://jsonplaceholder.typicode.com/todos');
      //     //commit('setTodos', res)
      // }
      test : ({commit}, input) => {console.log(input)}
  }