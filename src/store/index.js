import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import info from './modules/info'

import Banner_MainCard from './modules/banners/Banner_MainCard'
import Banner_BackgroundCard from './modules/banners/Banner_BackgroundCard'
import Banner_NewsCard from './modules/banners/Banner_NewsCard'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
  },

  modules: {
    auth, info,
    Banner_MainCard,
    Banner_BackgroundCard,
    Banner_NewsCard
  }
})
