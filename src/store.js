import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // this.$store.state.name
  state: {
    token: null,
  },
  mutations: {
    changeToken (state, token) {
      state.token = token
    },
    changeUserinfo (state, userinfo) {
      state.userinfo = userinfo
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('changeToken', token)
    },
    setUserinfo ({ commit }, userinfo) {
      commit('changeUserinfo', userinfo)
    }
  }
})
