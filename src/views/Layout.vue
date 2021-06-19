<template>
  <div class="Layout-wrapper">
    <!-- 顶部通栏 -->
    <app-navbar />
    <!-- 头部组件 -->
    <app-header />
    <!-- 内容容器 -->
    <div class="mian">
      <!-- 二级路由 -->
      <RouterView />
    </div>
    <!-- 底部组件 -->
    <app-footer />
  </div>
</template>

<script>
import appNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
export default {
  components: { appNavbar, AppHeader, AppFooter },
  name: 'Layout',
  setup() {}
}
</script>

<style scoped>
.Layout-wrapper {
}
</style>
