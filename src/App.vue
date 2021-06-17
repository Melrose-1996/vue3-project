<template>
  <div class="App-container">
    <!-- 修改用户信息，测试持久化 -->
    App {{ $store.state.user.profile.account }}
    <button @click="$store.commit('user/setUser', { account: 'zhousg' })">
      修改用户信息
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  setup() {}
}
</script>
