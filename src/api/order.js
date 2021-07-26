// 订单相关的接口

import request from '@/utils/request'

/**
 * @description: 结算页面生成订单
 * @param {null}
 * @return: Promise
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

/**
 * @description:添加收货地址
 * @param {Object} from - 参考接口文档
 * @return: Promise
 */
export const addAdress = form => {
  return request('/member/address', 'post', form)
}

/**
 * @description:修改收货地址
 * @param {Object} from - 参考接口文档
 * @return: Promise
 */
export const editAdress = form => {
  return request(`/member/address/${form.id}`, 'put', form)
}

/**
 * @description:结算页面-提交订单
 * @param {Object} params - 参考接口文档
 * @return: Promise
 */
export const submitOrder = params => {
  return request('/member/order', 'post', params)
}
