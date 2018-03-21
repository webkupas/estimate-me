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
    db: null
  },
  getters: {
    db (state) {
      return state.db
    }
  },
  mutations: {
    dbInit (state, db) {
      state.db = db
    }
  },
  actions: {
    dbInit ({commit}, db) {
      commit('dbInit', db)
    }
  },
  modules: {
    projects,
    auth,
    users
  }
})
