import forget from 'node-forge'
import md5 from 'js-md5'
import store from '@/store'
import { putLogout } from '@/api/user'

export async function checkUser () {
  // const result = await getUserInfo()
  // if (result.user && result.token) {
  //   store.dispatch('user/setUser', result)
  //   return result
  // }

  const result = {
    user: {},
    permissions: ['edit', 'edit.homepage', 'edit.activity', 'edit.homepage.banner', 'edit.homepage.enterpriseLibrary'],
    token: ''
  }
  return result
  throw new Error('未登录')
}

export async function logout (redirect = false) {
  await putLogout()
  await store.dispatch('user/setUser', null)
  store.commit('user/SET_AUTHENTICATION', null)
  sessionStorage.removeItem('authentication')
  if (redirect) {
    router.push('/login')
  }
}

export function md5Encrypted (str) {
  return md5(str)
}

export function createPublicKey (publicKey) {
  return forget.pki.publicKeyFromPem('-----BEGIN PUBLIC KEY-----\n' + publicKey + '\n-----END PUBLIC KEY-----')
}

export function publicKeyEncrypted (publicKey, str = '') {
  const data = publicKey.encrypt(str, 'RSA-OAEP', {
    md: forget.md.sha1.create(),
    mgf1: {
      md: forget.md.sha1.create()
    }
  })
  if (data) {
    return forget.util.encode64(data)
  }
  return null
}