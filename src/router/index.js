import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {firebaseApp} from '../firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeResolve((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth) // eslint-disable-next-line
  
  firebaseApp.auth().onAuthStateChanged(user => {
    if (!user && requiresAuth) next('/signin')
    else if (user && requiresAuth) next()
    else next()
  })
})

export {router}
