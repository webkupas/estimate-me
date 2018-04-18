import {firebaseApp} from './../firebase'

const routerOptions = [
  {
    path: '/',
    name: 'Hello',
    component: 'Home',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workspaces/new',
    name: 'CreateWorkspace',
    component: 'Workspace/CreateWorkspace',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/workspaces/:id',
    name: 'Workspace',
    component: 'Workspace/EditWorkspace',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: 'Project/ProjectsList',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/new',
    name: 'CreateProject',
    component: 'Project/CreateProject',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: 'Project/Project',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/archive',
    name: 'Archive',
    component: 'Project/ArchivedProjectsList',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: 'User/Profile',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: 'User/SignUp',
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: 'User/SignIn',
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
    component: 'User/Home',
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

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}`)
  }
})

export default routes
