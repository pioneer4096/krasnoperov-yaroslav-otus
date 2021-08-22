import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import stat from './stat'
import settings from './settings'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
      stat,
      settings
  }
})
