import Vue from 'vue'
import Vuex from 'vuex'
import { state, actions, mutations } from './roots'
import * as getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  // 嚴格模式，禁止直接修改 state
  strict: true
})
