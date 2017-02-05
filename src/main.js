// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import routes from './routes'
import store from './store/auth'
Vue.use(VueRouter)
Vue.use(VueResource)

// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state.userId !== window.localStorage.getItem('userId')) {
    let data = {
      userId: window.localStorage.getItem('userId'),
      userName: window.localStorage.getItem('userName'),
      userEmail: window.localStorage.getItem('userEmail'),
      token: window.localStorage.getItem('token')
    }
    store.dispatch('LOGIN', data)
  }
}

// router mode
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // window.console.log('Transition', to.meta.requiresAuth + '-' + store.state.token)
  if (to.meta.requiresAuth && store.state.token === null) {
    window.console.log('Not authenticated')
    next({
      path: '/Login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  ...App,
  store,
  router
})

