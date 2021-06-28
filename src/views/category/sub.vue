<template>
  <div class="sub-category-wrapper">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread />
      <!-- 筛选区 -->
      <sub-filter />
      <!-- 测试复选框 -->
      <xtx-checkbox v-model="isAllChecked">全选</xtx-checkbox>
      <!-- <xtx-checkbox v-model:a="isAllChecked">全选</xtx-checkbox> -->
    </div>
  </div>
</template>

<script>
import XtxCheckbox from '@/components/library/xtx-checkbox.vue'
import subBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import { ref } from 'vue'
export default {
  components: { subBread, SubFilter, XtxCheckbox },
  name: 'subCategory',
  setup() {
    const isAllChecked = ref(true)
    return { isAllChecked }
  }
}
</script>

<style lang="less" scoped>
.sub-category-wrapper {
}
</style>
