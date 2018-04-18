import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import store from './store/index'
import './vuetify'
import {firebaseApp} from './firebase'

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebaseApp.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      created () {
        if (firebaseUser) {
          this.$store.dispatch('autoSignIn', {id: firebaseUser.uid})
          this.$store.dispatch('getLastVisitedWorkspace', firebaseUser.uid)
        }
      }
    })
    unsubscribe()
  })
