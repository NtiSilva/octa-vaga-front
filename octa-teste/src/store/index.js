import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listCards: [
      {
        name: "input text",
        text: "",
        type: "input",
        elem: 1,
        id: 1,
        list: 1
      },
      {
        name: "checkbox",
        text: "",
        type: "check",
        elem: 2,
        id: 2,
        list: 1,
        check: [{
          name: "opção 1",
          status: false
        },
        {
          name: "opção 2",
          status: false
        }]
      },
      {
        name: "button",
        text: "ok",
        type: "button",
        elem: 1,
        id: 3,
        list: 1
      }
    ],
    newList: []
  },
  getters: {
    getListCards: state => state.listCards,
    getNewList: state => state.newList,
    getName: state => state.newList
  },
  mutations: {
    setNewList(state, payload) {
      state.newList = payload;
    },
    updateName(state, nome, id) {
      const elem = state.newList.find(item => item.id === id)
      elem.name = nome
    }

  }
})
