import { findNewCartGoods } from '@/api/cart'
// 购物车模块
export default {
  namespaced: true,
  state() {
    return {
      // 购物车商品列表
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      // 有效商品： 库存大于0 stock 商品有效标识为 true isEffective
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      // 遇到浮点数需要先把它处理为整数，再做运算
      return getters.validList.reduce((p, c) => p + parseInt(c.nowPrice * 100) * c.count, 0) / 100
    }
  },
  mutations: {
    // 加入购物车
    insertCart(state, payload) {
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        state.list.splice(sameIndex, 1)
      }
      state.list.unshift(payload)
    },
    updateCart(state, goods) {
      const updataGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updataGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex(goods => goods.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 删除购物车
    deleteCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          // 单条删除 playload 现在就是 skuId
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 加入购物车
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
        } else {
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCart(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
        } else {
          const promiseArr = ctx.state.list.map(goods => {
            return findNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr)
            .then(dataList => {
              dataList.forEach((data, i) => {
                ctx.commit('updateCart', { ...data.result, skuId: ctx.state.list[i].skuId })
              })
              resolve()
            })
            .catch(e => {
              reject(e)
            })
        }
      })
    }
  }
}
