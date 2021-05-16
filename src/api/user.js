import http from '@/utils/http'
import * as API from './api'
import store from '@/store'

export function getPublicKey () { // 获取加密公钥
  const appId = store.getters.appId
  console.log('appId', appId)
  return http.get(API.USER + 'encryption/key', { appId })
}

export function getAuthorize (data) { // 用户登录返回token
  return http.post(API.USER + 'oauth/authorize', data)
}
export function putLogout () { // 用户登出
  return http.put(API.USER + 'logout')
}

export function getUserInfo () { // 获取用户信息（角色、权限）
  return http.get(API.USER + 'oauth/userInfo', {
    clientId: store.state.user.appId
  })
}

export function getUserStatus () { // 获取用户企业信息
  return http.get(API.COMPANY + 'user', {})
}


