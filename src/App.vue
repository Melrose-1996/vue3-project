<template>
  <div class="App-container">
    App <button @click="fn">测试 request 工具函数</button>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'App',
  setup() {
    const fn = () => {
      // 测试请求
      request('/member/profile', 'get', { a: 10 })
    }
    return { fn }
  }
}
</script>
