// 购物车模块
export default {
  namespaced: true,
  state() {
    return {
      // 购物车商品列表
      list: []
    }
  },
  mutations: {
    // 加入购物车
    insertCart(state, payload) {
      // 约定加入购物车字段必须跟后端保持一致的 payload 字段
      // 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
      // 插入数据规则:
      // 1,先找下是否有相同商品
      // 2,如果有相同的商品,查询它的数量,累加到payload上,再保存最新位置，原来的商品删除
      // 3,如果没有相同商品,保存在最新位置即可
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        // 找到对应商品的数量，然后累加
        const count = state.list[sameIndex].count
        payload.count += count
        // 原来的商品删除
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    }
  },
  actions: {
    // 加入购物车
    insertCart(ctx, payload) {
      // payload 商品信息
      return new Promise((resolve, reject) => {
        // TODO 登录
        if (ctx.rootState.user.profile.token) {
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    }
  }
}
