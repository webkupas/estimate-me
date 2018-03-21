import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProjectsList from '@/components/Project/ProjectsList'
import Archive from '@/components/Project/ArchivedProjectsList'
import Project from '@/components/Project/Project'
import CreateProject from '@/components/Project/CreateProject'
import Profile from '@/components/User/Profile'
import SignUp from '@/components/User/SignUp'
import SignIn from '@/components/User/SignIn'
import {firebaseApp} from '../firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/new',
      name: 'CreateProject',
      component: CreateProject,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/:id',
      name: 'Project',
      component: Project,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: (to, from, next) => {
        firebaseApp.auth().onAuthStateChanged(user => {
          if (user) next('/projects')
          else next()
        })
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '*',
      name: 'Hi',
      component: Home,
      beforeEnter: (to, from, next) => {
        firebaseApp.auth().onAuthStateChanged(user => {
          if (user) next('/')
          else next('/signin')
        })
      },
      meta: {
        requiresAuth: true
      }
    }
  ]
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
