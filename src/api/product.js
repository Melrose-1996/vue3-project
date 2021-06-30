// 提供商品相关的 API 函数

import request from '@/utils/request'

/**
 * @description: 获取商品详情
 * @param {String} id - 商品ID
 * @return:
 */
export const findGoods = id => {
  return request('/goods', 'get', { id })
}
