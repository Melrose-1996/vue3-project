import { createStore } from 'vuex'

// A 模块
const moduleA = {
  // 模块分两种 - 开启密闭空间的，还有没有开启密闭空间的
  state: {
    username: 'modulesA'
  },
  getters: {
    newName(state) {
      return state.username + '!!!'
    }
  },
  mutations: {
    updateName(state) {
      state.username = 'moduleAAAAAA'
    }
  }
}
// B 模块
const moduleB = {
  // 开启密闭空间 - 能让变量，代码独立，更易于封装
  namespaced: true,
  state: {
    username: 'modulesB'
  },
  getters: {
    newName(state) {
      return state.username + '!!!'
    }
  },
  mutations: {
    // 修改名字的mutation
    update(state) {
      state.username = 'BBBB' + state.username
    }
  },
  actions: {
    update({ commit }) {
      // 假设请求
      setTimeout(() => {
        commit('update')
      }, 2000)
    }
  }
}
export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})
