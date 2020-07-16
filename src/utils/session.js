
const tokenAdmin = 'adminToken';

// 设置session
export function setToken(val) {
  sessionStorage.setItem(tokenAdmin, val)
}

export function getToken() {
  return sessionStorage.getItem(tokenAdmin)
}