import api from '../../api/products.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
  },
  mutations: {
    getDataSuccess(state, payload) {
      state.data = payload
    },
  },
  actions: {
    async getProductsList({ commit }) {
      await api.getProductsList().then((response) => {
        commit('getDataSuccess', response)
      }).catch((err) => console.log('err', err))
    },
  },
})
