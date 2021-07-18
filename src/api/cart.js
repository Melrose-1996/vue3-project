// 封装购物车相关的 API 函数
import request from '@/utils/request'

/**
 * @description: 获取商品的 最新价格 库存 是否有效
 * @param {String} skuId - SKU id
 * @return: Promise
 */
export const findNewCartGoods = skuId => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * @description: 获取商品对应的 sku 数据
 * @param {String} skuId - SKU id
 * @return: Promise
 */
export const getGoodsSku = skuId => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * @description: 合并购物车
 * @param {Array<object>} cartList - 购物车信息列表
 * @param {String} object.skuId - skuId
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count - 数量
 * @return: Promise
 */
export const mergeCart = cartList => {
  return request('/member/cart/merge', 'post', cartList)
}
