import {db} from '../../firebase'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  createNewUser (context, user) {
    db.collection('users')
      .add({
        name: user.name,
        email: user.email
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
