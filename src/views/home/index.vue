<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class=" container">
      <!-- 左侧分类 -->
      <home-category />
      <!-- 轮播图 -->
      <home-banner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <!-- 人气推荐 -->
</template>

<script>
import HomeBanner from './components/home-banner.vue'
import homeCategory from './components/home-category.vue'
export default {
  components: { homeCategory, HomeBanner },
  name: 'HomePage',
  setup() {}
}
</script>

<style lang="less" scoped>
.container {
  // .hoverShadow();
}
</style>
