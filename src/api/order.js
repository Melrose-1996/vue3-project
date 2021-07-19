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
