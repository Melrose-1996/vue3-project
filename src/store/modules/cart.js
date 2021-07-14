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
        // 找到对应商品的数量，然后累加
        const count = state.list[sameIndex].count
        payload.count += count
        // 原来的商品删除
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    },
    // 修改购物车商品
    updateCart(state, goods) {
      // goods 商品信息： nowPrice stock isEffective
      // goods 商品对象的字段不固定，对象有哪些字段就改哪些字段，字段的值需要合理
      // goods 商品对象 必须有 skuId
      const updataGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        // 可能存在很多情况
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updataGoods[key] = goods[key]
        }
      }
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
    },
    // 获取商品列表
    findCart(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
        } else {
          // 未登录
          // 同时发送请求(有几个商品发送几个请求)，等所有的请求成功，一并去修改本地数据
          // promise.all(promise 数组).then((dataList-所有请求成功的结果都在这个里面)=>{}) 同时发送请求，所有请求成功，得到所有的请求结果
          // Promise.race() 可以并列发送多个请求，等最快的请求成功，得到所有的请求结果 => 用于检测两个服务器调用接口
          const promiseArr = ctx.state.list.map(goods => {
            return findNewCartGoods(goods.skuId)
          })
          // dataList 成功的集合，数据顺序和 promiseArr 顺序一致，dataList又是根据 state.list 而来的，所以 dataList 的顺序和 state.list 一致
          Promise.all(promiseArr)
            .then(dataList => {
              // 更新本地购物车
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
