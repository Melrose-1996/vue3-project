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

/**
 * @description: 获取购物车列表
 * @param {null}}
 * @return: Promise
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}

/**
 * @description: 加入购物车
 * @param {String} skuId - skuId
 * @param {Integer} count - 数量
 * @return: Promise
 */
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * @description: 删除购物车商品，支持批量
 * @param {Array<string>} ids - skuId 的集合
 * @return: Promise
 */
export const deleteCart = ids => {
  return request('/member/cart', 'delete', { ids })
}

/**
 * @description: 修改购物车商品(数量,选中状态)
 * @param {String} skuId - skuId
 * @param {Integer} count - 数量
 * @param {Boolean} selected - 选中状态
 * @return: Promise
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}

/**
 * @description: 购物车全选&反选
 * @param {Array<string>} ids - skuId 的集合
 * @param {Boolean} selected - 选中状态
 * @return: Promise
 */
export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
