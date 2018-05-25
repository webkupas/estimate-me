import { db } from '../../firebase'
const state = {
  workspace: {
    id: null,
    isSuperAdmin: false,
    followers: []
  }
}

const getters = {
  workspace: (state) => state.workspace,
  workspaceFollowers: (state) => state.workspace.followers
}

const mutations = {
  setWorkspaceFollowers (state, followers) { state.workspace.followers = followers },
  setWorkspace (state, workspaceID) { state.workspace.id = workspaceID },
  activateSuperAdmin (state) { state.workspace.isSuperAdmin = true },
  deactivateSuperAdmin (state) { state.workspace.isSuperAdmin = false }
}

const actions = {
  setWorkspace ({commit}, workspaceID) {
    commit('setWorkspace', workspaceID)
  },
  setWorkspaceFollowers ({commit}, workspaceID) {
    db.collection('workspaces').doc(workspaceID).get()
      .then(doc => {
        if (doc.exists &&
            doc.data() &&
            doc.data().followers &&
            Array.isArray(doc.data().followers) &&
            doc.data().followers.length) { // eslint-disable-next-line

          let getFollowersInfo = (userID) => {
            return new Promise((resolve, reject) => {
              db.collection('users').doc(userID).get()
                .then(userDocRef => {
                  if (userDocRef.exists && userDocRef.data()) {
                    resolve({id: userDocRef.id, name: userDocRef.data().name ? userDocRef.data().name : 'Unknown'})
                  }
                })
                .catch(error => reject(error))
            })
          } // eslint-disable-next-line
          
          Promise.all(doc.data().followers.map(userID => getFollowersInfo(userID)))
            .then(followers => commit('setWorkspaceFollowers', followers))
        }
      })
  },
  superAdminSetting ({commit, state}, userID) {
    if (state.workspace.id) {
      db.collection('workspaces').doc(state.workspace.id).get()
        .then(docRef => {
          if (docRef.exists && docRef.data() && docRef.data().superadmin) {
            if (docRef.data().superadmin === userID) commit('activateSuperAdmin')
            else commit('deactivateSuperAdmin')
          }
        })
    } else {
      commit('deactivateSuperAdmin')
    }
  }
}

export default{
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
