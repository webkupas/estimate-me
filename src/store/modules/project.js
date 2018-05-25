import { db } from '../../firebase'
const state = {}

const getters = {}

const mutations = {}

const actions = {
  createProject ({commit}, projectData) {
    db.collection('projects').add(projectData)
      .then(projectRef => console.log('New Project was successfully created: ', projectRef.id))
      .catch(error => console.error('Error adding project: ', error))
  }
}

export default{
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
