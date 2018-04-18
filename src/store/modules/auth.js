import { db, firebaseApp } from './../../firebase'
import { router } from '../../router/index'

const state = {}
const getters = {}

const mutations = {
  logIn (state) {
    router.push('/')
  },
  logOut (state) {
    firebaseApp.auth().signOut()
    router.push('/signin')
  }
}

const actions = {
  auth ({commit}, payload) {
    return firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => user)
      .catch(error => { throw error })
  },
  signUserIn ({commit}, payload) {
    return firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setUser', {id: user.uid}, {root: true})
      })
      .then(() => {
        commit('logIn')
      })
  },
  registerNewUser ({commit, dispatch}, payload) {
    return firebaseApp.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        user.updateProfile({
          displayName: payload.name
        })
        return user
      })
      .then(user => {
        return dispatch('createNewUser', {name: payload.name, email: payload.email, id: user.uid})
          .then(user => user)
          .catch(error => console.log(error))
      })
      .catch(error => { throw error })
  },
  createNewUser (context, user) {
    return db.collection('users').doc(user.id)
      .set({
        name: user.name,
        email: user.email,
        id: user.id
      })
      .then(() => {
        console.log('Document successfully written!')
        return user
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
        throw new Error('Error writing document: ', error)
      })
  },
  autoSignIn ({commit}, payload) {
    let user = firebaseApp.auth().currentUser
    if (user) commit('setUser', {id: user.uid})
  },
  logOut ({commit}) {
    commit('resetUserID', null, {root: true})
    commit('logOut')
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}
