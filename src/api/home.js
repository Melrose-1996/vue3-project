// 提供首页相关 API 函数
import request from '@/utils/request'

/**
 * @description: 获取品牌
 * @param {Integer} limit - 品牌个数
 * @return: Promise
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * @description: 获取广告区轮播图
 * @param {type}
 * @return:
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}

/**
 * @description: 获取新鲜好物
 * @param {type}
 * @return:
 */
export const findNew = () => {
  return request('/home/new', 'get')
}

/**
 * @description: 获取人气推荐
 * @param {type}
 * @return:
 */
export const findHot = () => {
  return request('/home/hot', 'get')
}
