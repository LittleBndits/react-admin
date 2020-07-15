import service from '../utils/request'

/**
 * 登录接口
 */
export function Login(params) {
  return service.request(
    {
      url: '/login/',
      method: 'post',
      data: params
    }
  )
}
/**
 * 注册接口
 */
export function Register(params) {
  return service.request(
    {
      url: '/register/',
      method: 'post',
      data: params
    }
  )
}

/**
 * 获取验证码
 */
export function Getcode(params) {
  console.log("Getcode -> params", params)
  return service.request(
    {
      url: '/getSms/',
      method: 'post',
      data: params
    }
  )
}