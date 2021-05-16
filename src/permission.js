import router from './router'
import store from './store'
import { checkUser } from '@/utils/user'

let hadRoutes = false
router.beforeEach(async (to, from, next) => {
  if (hadRoutes) {
    next()
  } else {
    let { permissions } = await checkUser()
    const accessRoutes = await store.dispatch('permission/GenerateRoutes', permissions)
    
    router.addRoutes(accessRoutes)
    hadRoutes = true
    next({ ...to, replace: true })
  }
 
})