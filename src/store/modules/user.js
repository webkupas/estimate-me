import { db } from '../../firebase'
const state = {
  user: {
    id: null,
    relatedWorkspaces: []
  }
}

const getters = {
  user: (state) => state.user
}

const mutations = {
  setUser (state, userID) { state.user.id = userID },
  resetUserID (state) { state.user.id = null },
  setRelatedWorkspaces (state, workspaces) { state.user.relatedWorkspaces = workspaces },
  resetRelatedWorkspaces (state) { state.user.relatedWorkspaces = [] },
  // ToDo: check and maybe move to actions
  resetCurrentWorkspace (state, workspaceID) {
    state.user.relatedWorkspaces = state.user.relatedWorkspaces.filter(obj => {
      if (obj.id !== workspaceID) return obj
    })
    if (workspaceID === state.user.currentWorkspace) state.user.currentWorkspace = state.user.relatedWorkspaces[0].id
  }
}

const actions = {
  getLastVisitedWorkspace ({commit}, userID) {
    return new Promise((resolve, reject) => {
      db.collection('users').doc(userID).get()
      .then(doc => {
        if (doc.exists) {
          if (doc.data().lastWorkspace) {
            commit('workspace/setWorkspace', doc.data().lastWorkspace, {root: true})
            resolve(doc.data().lastWorkspace)
          } else if (doc.data().workspaces && Array.isArray(doc.data().workspaces) && doc.data().workspaces.length) {
            commit('workspace/setWorkspace', doc.data().workspaces[0], {root: true})
            resolve(doc.data().workspaces[0])
          }
        }
      })
      .catch(error => console.error('Error with users DB connection: ', error))
    })
  },
  setRelatedWorkspaces ({commit}, workspaces) {
    if (workspaces.length) commit('setRelatedWorkspaces', workspaces)
  },
  resetRelatedWorkspaces ({commit}) { commit('resetRelatedWorkspaces') },
  resetCurrentWorkspace ({commit}, workspaceID) { commit('resetCurrentWorkspace', workspaceID) }
}

export default{
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
