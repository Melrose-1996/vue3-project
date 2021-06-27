<template>
  <div class="sub-category-wrapper">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread />
      <!-- 筛选区 -->
      <sub-filter />
    </div>
  </div>
</template>

<script>
import subBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
export default {
  components: { subBread, SubFilter },
  name: 'subCategory',
  setup() {}
}
</script>

<style lang="less" scoped>
.sub-category-wrapper {
}
</style>
