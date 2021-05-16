import { getUserStatus } from '@/api/user'
const state = {
  user: null,
  token: null,
  permissions: [],
  roles: [],
  authentication: {},
  appId: 'b4cb201e6f30269704e022325ea52e59'
}
const mutations = {
  SET_USER: (state, { user = null, token = null, permissions = [], roles = [] }) => {
    state.user = user
    state.token = token
    state.permissions = permissions.map(n => n.resources)
    state.roles = roles
    state.exp = Date.now() + 60 * 1000 // userinfo接口请求间隔，1分钟内不重复请求
  },
  SET_AUTHENTICATION (state, authentication = {}) {
    state.authentication = authentication
  }
}

const actions = {
  setUser: ({ commit }, payload) => {
    const { user = null, token = null, permissions = [], roles = [] } = payload || {}
    commit('SET_USER', {
      user: user, token: token, permissions: permissions, roles: roles
    })
  },
  setAuthentication: async ({ commit }, payload = {}) => {
    const res = await getUserStatus()
    commit('SET_AUTHENTICATION', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
