// 分类数据模块
import { findAllCategory } from '@/api/category'
import { topCategory } from '@/api/constants'
export default {
  namespaced: true,
  state() {
    return {
      // 分类信息集合，依赖 topCategory 重新设置，保证初始化就要数据，不至于白屏
      categoryList: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类函数
  mutations: {
    // payload 是所有的分类集合
    setCategoryList(state, payload) {
      state.categoryList = payload
    },
    // 2. 定义 show 和 hide 函数，控制当前分类的二级分类显示和隐藏(这里需要知道当前分类具体是哪个分类，所以需要传人当前 ID)
    show(state, id) {
      const currCategory = state.categoryList.find(item => item.id === id)
      currCategory.open = true
    },
    hide(state, id) {
      const currCategory = state.categoryList.find(item => item.id === id)
      currCategory.open = false
    }
  },
  // 发起请求获取分类函数
  actions: {
    async getLCategoryList({ commit }) {
      // 获取分类数据
      const data = await findAllCategory()
      // 1. 给每个分类都加上控制二级分类显示和隐藏的数据
      data.result.forEach(top => {
        top.open = false
      })
      // 修改分类数据
      commit('setCategoryList', data.result)
    }
  }
}
