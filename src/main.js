import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import store from './store/index'
import './vuetify'
import {firebaseApp} from './firebase'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) this.$store.dispatch('autoSignIn', {id: user.uid})
    })
  }
})
