import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

// 独立的三个模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  // 配置插件 - 数组(可以配置多个插件)
  plugins: [
    // 默认存储在 localStorage
    createPersistedstate({
      // 本地存储数据的名字
      key: 'erabbit-client-pc-store',
      // 指定需要存储的模块
      paths: ['user', 'cart'],
      storage: window.sessionStorage
    })
  ]
})
