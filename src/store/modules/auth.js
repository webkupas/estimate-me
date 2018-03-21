import Firebase from 'firebase'
import { router } from '../../router/index'

const state = {
  user: {
    id: null
  }
}

const getters = {
  user (state) {
    return state.user
  }
}

const mutations = {
  setUser (state, payload) {
    state.user.id = payload.id
  },
  logIn (state) {
    router.push('/projects')
  },
  logOut (state) {
    state.user.id = null
    Firebase.auth().signOut()
    router.push('/signin')
  }
}

const actions = {
  signUserUp ({commit, dispatch}, payload) {
    Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        user.updateProfile({
          displayName: payload.name
        })
        commit('setUser', {id: user.uid})
        dispatch('createNewUser', {name: payload.name, email: payload.email})
        commit('activateDrawer')
        commit('logIn')
      })
      .catch(error => console.log(error))
  },
  signUserIn ({commit}, payload) {
    Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setUser', {id: user.uid})
        commit('logIn')
      })
  },
  autoSignIn ({commit}, payload) {
    let user = Firebase.auth().currentUser
    if (user) commit('setUser', {id: user.uid})
  },
  logOut ({commit}) {
    commit('logOut')
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}
