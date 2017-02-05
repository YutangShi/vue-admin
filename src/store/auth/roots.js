import * as types from './mutations_types.js'

export const state = {
  userId: '',
  userName: '',
  userEmail: '',
  token: '',
  apiurl: '請輸入API路徑',
  authenticated: false,
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [],
    tasks: []
  }
}

export const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.LOGOUT] () {
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('userName')
    window.localStorage.removeItem('token')
    state.authenticated = false
  },
  [types.LOGIN] (context, creds) {
    state.authenticated = true
    if (window.localStorage) {
      state.userId = creds.userId
      state.userName = creds.userName
      state.token = creds.token
      state.userEmail = creds.email
      window.localStorage.setItem('userId', creds.userId)
      window.localStorage.setItem('userName', creds.userName)
      window.localStorage.setItem('token', creds.token)
      window.localStorage.setItem('userEmail', creds.email)
    }
  },
  check () {
    let jwt = window.localStorage.getItem('token')
    if (jwt) {
      state.authenticated = true
    } else {
      state.authenticated = false
    }
  }
}

export const actions = {
  SET_TOKEN ({commit}, token) {
    commit(types.SET_TOKEN, token)
  },
  LOGIN ({commit}, data) {
    commit(types.LOGIN, data)
  },
  LOGOUT ({commit}) {
    commit(types.LOGOUT)
  }
}

