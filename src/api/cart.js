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
