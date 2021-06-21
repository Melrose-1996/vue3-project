<template>
  <div class=" container">
    <!-- 首页入口 -->
    <div class="home-entry">
      <!-- 左侧分类 -->
      <home-category />
      <!-- 轮播图 -->
    </div>
  </div>
</template>

<script>
import homeCategory from './components/home-category.vue'
export default {
  components: { homeCategory },
  name: 'HomePage',
  setup() {}
}
</script>

<style lang="less" scoped>
.container {
  // .hoverShadow();
}
</style>
