const getters = {
  user: state => state.user.user,
  token: state => state.user.token,
  permissions: state => state.user.permissions,
  roles: state => state.user.roles,
  authentication: state => state.user.authentication,
  appId: state => state.user.appId,

  sidebarRouters: state => state.permission.sidebarRouters,
  topbarRouters: state => state.permission.topbarRouters
}

export default getters