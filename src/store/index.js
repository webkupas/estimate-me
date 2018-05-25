import Vue from 'vue'
import Vuex from 'vuex'

import 'babel-polyfill'

// import Firebase from 'firebase'
// import 'firebase/firestore'

import project from './modules/project'
import auth from './modules/auth'
import user from './modules/user'
import workspace from './modules/workspace'
import usersList from './modules/usersList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appIsLoaded: false
  },
  getters: {
    appIsLoaded: (state) => state.appIsLoaded
  },
  mutations: {
    setAppAsLoaded (state) {
      state.appIsLoaded = true
    }
  },
  actions: {
  },
  modules: {
    project,
    auth,
    user,
    usersList,
    workspace
  }
})
