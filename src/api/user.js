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

/**
 * @description: 获取 QQ 绑定的时候的验证码
 * @param {String} mobile - 手机
 * @return: Promise
 */
export const userQQBindCode = mobile => {
  return request('/login/social/code', 'get', { mobile })
}

/**
 * QQ登录-绑定帐号
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns
 */
export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}

/**
 * 注册-校验用户名唯一
 * @param {String} account - 用户名或手机号
 * @returns
 */
export const userAccountCheck = account => {
  return request('/register/check', 'get', { account })
}

/**
 * @description: 获取 QQ 完善信息的时候的验证码
 * @param {String} mobile - 手机
 * @return: Promise
 */
export const userQQPatchCode = mobile => {
  return request('/register/code', 'get', { mobile })
}

/**
 * QQ登录-完善帐号
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns
 */
export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
  return request(`/login/social/${unionId}/complement`, 'post', { mobile, code, account, password })
}
