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
  <home-new />
  <!-- 人气推荐 -->
  <home-hot />
</template>

<script>
import HomeBanner from './components/home-banner.vue'
import homeCategory from './components/home-category.vue'
import HomeHot from './components/home-hot.vue'
import HomeNew from './components/home-new.vue'
export default {
  components: { homeCategory, HomeBanner, HomeNew, HomeHot },
  name: 'HomePage'
}
</script>

<style lang="less" scoped></style>
