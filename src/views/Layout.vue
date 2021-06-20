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
import { useStore } from 'vuex'
export default {
  components: { appNavbar, AppHeader, AppFooter },
  name: 'Layout',
  // 获取下拉分类数据
  setup() {
    const store = useStore()
    store.dispatch('category/getLCategoryList')
  }
}
</script>

<style scoped>
/* .Layout-wrapper {
} */
</style>
