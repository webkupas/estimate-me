import { db } from '../../firebase'
const state = {
  user: {
    id: null,
    currentWorkspace: null,
    relatedWorkspaces: []
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
  resetUserID (state) {
    state.user.id = null
  },
  setWorkspace (state, workspaceID) {
    state.user.currentWorkspace = workspaceID
  },
  setRelatedWorkspaces (state, workspaces) {
    state.user.relatedWorkspaces = workspaces
  },
  resetRelatedWorkspaces (state) {
    state.user.relatedWorkspaces = []
  },
  resetCurrentWorkspace (state, workspaceID) {
    state.user.relatedWorkspaces = state.user.relatedWorkspaces.filter(obj => {
      if (obj.id !== workspaceID) return obj
    })
    if (workspaceID === state.user.currentWorkspace) state.user.currentWorkspace = state.user.relatedWorkspaces[0].id
  }
}

const actions = {
  setWorkspace ({commit}, workspaceID) {
    commit('setWorkspace', workspaceID)
  },
  getLastVisitedWorkspace ({commit}, userID) {
    db.collection('users').doc(userID).get()
      .then(doc => {
        if (doc.exists && doc.data().lastWorkspace) commit('setWorkspace', doc.data().lastWorkspace)
      })
  },
  setRelatedWorkspaces ({commit}, workspaces) {
    if (workspaces.length) commit('setRelatedWorkspaces', workspaces)
  },
  resetRelatedWorkspaces ({commit}) {
    commit('resetRelatedWorkspaces')
  },
  resetCurrentWorkspace ({commit}, workspaceID) {
    commit('resetCurrentWorkspace', workspaceID)
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}
