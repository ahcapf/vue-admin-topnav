import { constantRoutes, asyncRouterMap } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.access) {
    return permissions.includes(route.meta.access)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRouterMap
 * @param permissions
 */
function filterAsyncRoutes(routes, permissions) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}
const state = {
  routers: [],
  topbarRouters: [],
  sidebarRouters: []
}
const mutations = {
  SET_ROUTES(state, routers) {
    state.routes = constantRoutes.concat(routers)
  },
  SET_TOPBAR_ROUTERS(state, routers) {
    state.topbarRouters = routers
  },
  SET_SIDEBAR_ROUTERS(state, routers) {
    state.sidebarRouters = routers
  }
}

const actions = {
  GenerateRoutes({ commit }, permissions) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(asyncRouterMap, permissions)
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_TOPBAR_ROUTERS', accessedRoutes)
      resolve(accessedRoutes)
    })
    
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}