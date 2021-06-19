<template>
  <div class="Layout-wrapper">
    <!-- 顶部通栏 -->
    <nav>顶部通栏</nav>
    <!-- 头部组件 -->
    <header>头部组件</header>
    <!-- 内容容器 -->
    <div class="mian">
      <!-- 二级路由 -->
      <RouterView />
    </div>
    <!-- 底部组件 -->
    <footer>底部组件</footer>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  setup() {}
}
</script>

<style scoped>
.Layout-wrapper {
}
</style>
