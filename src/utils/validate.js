export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function checkPhone (value) {
  const RegPhone = /^[1][0-9]{10}$/
  return RegPhone.test(value)
}

export function checkEmail (value) {
  const RegEmail = /^[a-zA-Z0-9_-]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
  return RegEmail.test(value)
}
