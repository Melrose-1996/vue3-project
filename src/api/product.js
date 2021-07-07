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

/**
 * @description: 获取推荐商品 | 或者猜你喜欢商品
 * @param {String} id - 商品ID，传入相关推荐，不传猜你喜欢
 * @param {Integer} limit - 商品限制数量
 * @return:
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}

/**
 * @description: 获取热销榜
 * @param {String} id - 商品ID
 * @param {Integer} limit - 商品数量
 * @param {Integer} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @return:
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }) => {
  return request('/goods/hot', 'get', { id, limit, type })
}
