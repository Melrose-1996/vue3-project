// 用户模块

export default {
  namespaced: true,
  // state 写成了一个函数，这样的好处就是作用域相互之间不会影响
  state() {
    return {
      // 用户信息
      profile: {
        // 用户 ID
        id: '',
        // 用户头像
        avatar: '',
        // 用户昵称
        nickname: '',
        // 用户账号名
        account: '',
        // 用户的手机号
        mobile: '',
        // 用户 token
        token: ''
      },
      // 登录后回调路径
      redirectUrl: '/'
    }
  },
  mutations: {
    // 修改用户信息
    setUser(state, payload) {
      state.profile = payload
    },
    // 修改回调地址
    setRedirectUrl(state, url) {
      state.redirectUrl = url
    }
  }
}
