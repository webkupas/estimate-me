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
  setWorkspace (state, payload) {
    state.user.currentWorkspace = payload
  },
  setRelatedWorkspaces (state, workspaces) {
    state.user.relatedWorkspaces = workspaces
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
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}
