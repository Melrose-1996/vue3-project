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

/**
 * @description:获取订单详情
 * @param {String} orderId - 订单ID
 * @return: Promise
 */
export const findOrderDetail = orderId => {
  return request(`/member/order/${orderId}`, 'get')
}

/**
 * @description:获取订单列表
 * @param {String} page - 页码
 * @param {String} pageSize - 每页条数
 * @param {String} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @return: Promise
 */
export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request('/member/order', 'get', { page, pageSize, orderState })
}

/**
 * @description:取消订单接口
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @return: Promise
 */
export const orderCancel = ({ orderId, cancelReason }) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

/**
 * @description:删除订单接口
 * @param {String} orderId - 订单ID
 * @return: Promise
 */
export const deleteOrder = orderId => {
  return request('/member/order', 'delete', { ids: [orderId] })
}
