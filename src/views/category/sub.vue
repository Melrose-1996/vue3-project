<template>
  <div class="sub-category-wrapper">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread />
      <!-- 筛选区 -->
      <sub-filter />
      <!-- 商品面板（排序 + 列表） -->
      <div class="goods-list">
        <sub-sort />
      </div>
    </div>
  </div>
</template>

<script>
import subBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import { ref } from 'vue'
import SubSort from './components/sub-sort.vue'
export default {
  components: { subBread, SubFilter, SubSort },
  name: 'subCategory',
  setup() {
    const isAllChecked = ref(true)
    return { isAllChecked }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
