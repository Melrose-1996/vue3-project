<template>
  <!-- 以前的组件必须有个根元素，vue3.0 不需要，也可以是代码片段 Fragment -->
  <div>
    App
    <!-- 1. 使用根模块 state 的数据 -->
    <p>{{ $store.state.username }}</p>
    <!-- 2. 使用根模块 getters 的数据 -->
    <p>{{ $store.getters.newName }}</p>
    <p>{{ $store.getters['newName'] }}</p>
    <!-- 3. 提交根模块 mutations 的函数 -->
    <button @click="mutationsFn">修改名字</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
export default {
  name: 'App',
  setup() {
    // 使用 vuex 仓库
    const store = useStore()
    // 1. 使用根模块 state 的数据
    console.log(store.state.username)
    // 2. 使用根模块 getters 的数据
    console.log(store.getters.newName)
    // 3. 提交根模块 mutations 的函数
    const mutationsFn = () => {
      // store.commit('updateName')
      // 4. 调用根模块 actions 的函数
      store.dispatch('updateName')
    }
    return { mutationsFn }
  }
}
</script>
<style lang="less"></style>
