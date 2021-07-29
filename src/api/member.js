// 提供商品相关的 API 函数
import request from '@/utils/request'

/**
 * @description: 获取收藏分页数据
 * @param {Integer} collectType - 收藏类型，1为商品 2为专题 3为品牌
 * @return: Promise
 */
export const findCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}
