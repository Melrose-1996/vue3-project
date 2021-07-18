import { checkAllCart, deleteCart, findCart, findNewCartGoods, insertCart, mergeCart, updateCart } from '@/api/cart'
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
      // 遇到浮点数需要先把它处理为整数(这里用的是 Math 的四舍五入的方法 - .9999 的情况需要考虑进来)，再做运算
      return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    inValidList(state) {
      return state.list.filter(goods => goods.stock <= 0 || goods.isEffective)
    },
    // 已选商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.selectedList.length !== 0 && getters.selectedList.length === getters.validList.length
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
    },
    // 设置购物车
    setCart(state, payload) {
      // payload 为空数组，清空。 如果为有值，设置
      state.list = payload
    }
  },
  actions: {
    // 合并购物车
    async mergeCart(ctx) {
      const cartList = ctx.state.list.map(goods => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartList)
      // 合并成功
      ctx.commit('setCart', [])
    },
    // 修改规格
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          // 登录 TODO
          // 1. 获取原先商品的数量
          // 2. 删除原先商品
          // 3. 获取修改的skuId 和 原先商品数量 做一个加入购物车操作
          // 4. 更新列表
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          deleteCart([oldGoods.skuId])
            .then(() => {
              return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
            })
            .then(() => {
              // 更新列表
              return findCart()
            })
            .then(data => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          ctx.commit('deleteCart', oldSkuId)
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters[isClear ? 'inValidList' : 'selectedList'].map(item => item.skuId)
          deleteCart(ids)
            .then(() => {
              // 更新列表
              return findCart()
            })
            .then(data => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.getters[isClear ? 'inValidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 全选与取消全选
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters.validList.map(item => item.skuId)
          checkAllCart({ selected, ids })
            .then(() => {
              // 更新列表
              return findCart()
            })
            .then(data => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改购物车(选中状态，数量)
    updateCart(ctx, payload) {
      // payload 需要: 必须有 skuId 可能: select count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          updateCart(payload)
            .then(() => {
              // 更新列表
              return findCart()
            })
            .then(data => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 删除购物车
    deleteCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          deleteCart([payload])
            .then(() => {
              // 更新列表
              return findCart()
            })
            .then(data => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 加入购物车
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
          insertCart({ skuId: payload.skuId, count: payload.count })
            .then(() => {
              // 服务端的信息是最新的，从服务端拿到最新的数据是最简单的方法
              return findCart()
            })
            .then(data => {
              ctx.commit('setCart', data.result)
              resolve()
            })
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
          // TODO 已登录
          findCart().then(data => {
            ctx.commit('setCart', data.result)
          })
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
