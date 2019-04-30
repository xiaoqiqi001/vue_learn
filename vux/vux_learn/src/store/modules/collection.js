const state = {
  collection: []
}

const getters = {
  renderCollection(state, getters, rootState){
    console.log(111)

    return state.collection.push(rootState.changableNum)
  }
}

const mutations = {
  pushCollects(state, items){
    state.collection.push(items)
  }
}

const actions = {
  invokePushItems(context, item){
    context.commit('pushCollects', context.rootState.changableNum)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}