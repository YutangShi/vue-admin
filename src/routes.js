import AdminView from './components/admin/AdminView'
import Regist from './components/Regist'
import Login from './components/Login'
import dashboard from './components/Dashboard'
import manager from './components/admin/Manager'
import product from './components/admin/Product'

const routes = [{
  path: '/',
  component: Login,
  meta: { requiresAuth: false }
}, {
  path: '/Login',
  component: Login,
  meta: { requiresAuth: false },
  name: '登入',
  description: '登入'
}, {
  path: '/Regist',
  component: Regist,
  name: '註冊',
  description: '註冊'
}, {
  path: '/',
  component: AdminView,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'dashboard',
      component: dashboard,
      name: '白板',
      description: '白板',
      meta: { requiresAuth: true }
    },
    {
      path: 'product',
      component: product,
      name: '產品列表',
      description: '產品列表',
      meta: { requiresAuth: true }
    }
  ]
}, {
  path: '/',
  component: AdminView,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'managerList',
      component: manager,
      name: '管理者',
      description: '管理者',
      meta: { requiresAuth: true }
    }
  ]
}, {
  path: '*',
  component: Login
}]

export default routes
