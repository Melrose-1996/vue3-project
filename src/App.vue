<template>
  <div class="App-container">
    <!-- 1.1 使用 A 模块的 state 数据，注意只有 state 加模块，mutations getters actions 都放在全局去了 -->
    <p>{{ $store.state.moduleA.username }}</p>
    <!-- 1.2 使用 A 模块的 getters 数据 -->
    <!-- 错误写法 - 这样会报错的，因为是 getters 全局 -->
    <!-- <p>{{ $store.getters.moduleA.newName }}</p> -->
    <!-- 不加 namespaced  -->
    <p>{{ $store.getters.newName }}</p>

    <!-- 2.1 使用 B 模块的 state 数据 -->
    <p>{{ $store.state.moduleB.username }}</p>
    <!-- 2.2 使用 B 模块的 getters 数据 -->
    <!-- 错误写法 - 这样会报错的，写法错误 -->
    <!-- <p>{{ $store.getters.moduleB.username }}</p> -->
    <p>{{ $store.getters['moduleB/newName'] }}</p>

    <button @click="mutationsFn">mutationsFn</button>
    <button @click="actionsFn">actionsFn</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()

    const mutationsFn = () => {
      // 2.3 提交 B 模块的修改
      store.commit('moduleB/update')
    }
    const actionsFn = () => {
      // 2.3 提交 B 模块的 actions
      store.dispatch('moduleB/update')
    }
    return {
      mutationsFn,
      actionsFn
    }
  }
}
</script>
