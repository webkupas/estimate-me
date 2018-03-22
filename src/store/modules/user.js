import {db} from '../../firebase'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
  createNewUser (context, user) {
    return db.collection('users')
      .add({
        name: user.name,
        email: user.email
      })
      .then(() => {
        console.log('Document successfully written!')
        return user
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
        throw new Error('Error writing document: ', error)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
