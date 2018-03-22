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
    return payload
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
  auth ({commit}, payload) {
    return Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => user)
      .catch(error => { throw error })
  },
  signUserIn ({commit}, payload) {
    return Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setUser', {id: user.uid})
      })
      .then(() => {
        commit('logIn')
      })
  },
  registerNewUser ({commit, dispatch}, payload) {
    return Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        user.updateProfile({
          displayName: payload.name
        })
        return user
      })
      .then(user => {
        return dispatch('createNewUser', {name: payload.name, email: payload.email})
          .then(user => user)
          .catch(error => console.log(error))
      })
      .catch(error => { throw error })
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
