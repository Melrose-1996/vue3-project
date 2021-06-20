// 定义分类相关的 API 接口函数
import request from '@/utils/request'

/**
 * @description:获取所有分类(顶级 二级 对应的商品推荐数据)
 * @param {type}
 * @return: Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
