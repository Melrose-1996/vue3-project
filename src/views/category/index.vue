<template>
  <div class="top-category-wrapper">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item :to="{ path: '/' }">首页</xtx-bread-item>
        <xtx-bread-item to="/category/1000011">电器</xtx-bread-item>
        <xtx-bread-item>空调</xtx-bread-item>
      </xtx-bread>
      <!-- 轮播图 -->
      <!-- 全部分类 -->
      <!-- 各个分类下的推荐商品 -->
    </div>
  </div>
</template>

<script>
import xtxBreadItem from '@/components/library/xtx-bread-item.vue'
export default {
  components: { xtxBreadItem },
  name: 'topCategory',
  setup() {}
}
</script>

<style lang="less" scoped>
.top-category-wrapper {
}
</style>
