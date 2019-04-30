import Vue from 'vue'
import Vuex from 'vuex'
import collection from './modules/collection.js'

Vue.use(Vuex)

const state = {
  showFooter: true,
  changableNum: 10
}

const getters = {
  isShow(){
    return state.showFooter
  },
  getChangableNum(){
    return state.changableNum
  }
}

const mutations = {
  show(state){
    state.showFooter = true
  },
  hide(state){
    state.showFooter = false
  },
  newNum(state, sum){
    state.changableNum = sum
  }
}

const actions = {
  hideFooter(context){
    context.commit('hide')
  },
  showFooter(context){
    context.commit('show')
  },
  getNewNum(context, num){
    context.commit('newNum', num)
  }
}

const store = new Vuex.Store({
  getters,
  mutations,
  actions,
  state,
  modules: {
    collection
  }
});

export default store