import 'babel-polyfill'
import '../polyfils/arrayIncludes'
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
          this.$store.dispatch('auth/autoSignIn', firebaseUser.uid)
          this.$store.dispatch('user/getLastVisitedWorkspace', firebaseUser.uid)
            .then(workspaceID => {
              if (workspaceID) {
                this.$store.dispatch('workspace/superAdminSetting', firebaseUser.uid)
              }
            })
            .then(() => {
              this.$store.commit('setAppAsLoaded')
            })
        }
      }
    })
    unsubscribe()
  })
