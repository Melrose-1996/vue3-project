// 用户相关的接口

import request from '@/utils/request'

/**
 * @description: 账号密码登录
 * @param {String} account - 账号
 * @param {String} password - 密码
 * @return: Promise
 */
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}

/**
 * @description: 获取手机号的短信验证码
 * @param {String} mobile - 手机
 * @return: Promise
 */
export const userMobileLoginMsg = mobile => {
  return request('/login/code', 'get', { mobile })
}

/**
 * @description: 手机号的登录
 * @param {String} mobile - 手机
 * @param {String} code - 短信验证码，默认是 123456
 * @return: Promise
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}

/**
 * @description: QQ 的登录
 * @param {String} unionId - QQ  唯一标识，openId
 * @param {String} source - 客户端类型
 * @return: Promise
 */
export const userQQLogin = (unionId, source = 1) => {
  return request('/login/social', 'post', { unionId, source })
}
