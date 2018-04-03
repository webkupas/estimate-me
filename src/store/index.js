import Vue from 'vue'
import Vuex from 'vuex'

import 'babel-polyfill'

// import Firebase from 'firebase'
// import 'firebase/firestore'

import projects from './modules/projects'
import auth from './modules/auth'
import users from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    projects,
    auth,
    users
  }
})
