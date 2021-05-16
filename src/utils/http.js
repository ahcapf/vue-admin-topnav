import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: '/',
  withCredentials: true,
  timeout: 50000
})

// 请求拦截
service.interceptors.request.use(config => {
  if (config.method === 'get') {
    if (!config.params) {
      config.params = {}
    }
    config.params._v = Date.now() // 添加参数，去缓存
  }
  config.headers.clientId = store.getters.appId
  config.headers.userId = store.getters.user || '1'
  config.headers.username = store.getters.user || null
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default service
