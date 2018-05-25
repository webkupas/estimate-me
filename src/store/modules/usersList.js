import { db } from './../../firebase'
const state = {
  usersList: []
}

const getters = {
  usersList (state) {
    return state.usersList
  }
}

const mutations = {
  getUsersList (state, payload) {
    state.usersList = payload
  }
}

const actions = {
  getUsersList ({commit, rootState}) {
    return db.collection('users').get()
      .then(query => {
        let users = [] // eslint-disable-next-line
        
        query.forEach(doc => {
          if (doc.id !== rootState.user.user.id) {
            users.push({
              'id': doc.id,
              'email': doc.data().email,
              'name': doc.data().name
            })
          }
        })
        commit('getUsersList', users)
      })
      .catch(error => console.log('Error getting documents: ', error))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
