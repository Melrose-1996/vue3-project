// 定义分类相关的 API 接口函数
import request from '@/utils/request'

/**
 * @description:获取所有分类(顶级 二级 对应的商品推荐数据)
 * @param {null}
 * @return: Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * @description:获取顶级类目信息(children 属性就是各个子分类)
 * @param {String} id - 顶级类目 ID
 * @return: Promise
 */
export const findTopCategory = id => {
  return request('/category', 'get', { id })
}

/**
 * @description:获取二级类目的筛选条件
 * @param {String} id - 顶级类目 ID
 * @return: Promise
 */
export const findSubCategoryFilter = id => {
  return request('/category/sub/filter', 'get', { id })
}
