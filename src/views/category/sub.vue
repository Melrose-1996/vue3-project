<template>
  <div class="sub-category-wrapper">
    <div class="container">
      <sub-bread />
    </div>
  </div>
</template>

<script>
import subBread from './components/sub-bread.vue'
export default {
  components: { subBread },
  name: 'subCategory',
  setup() {}
}
</script>

<style lang="less" scoped>
.sub-category-wrapper {
}
</style>
