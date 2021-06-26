<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>

<script>
export default {
  name: 'XtxBreadItem',
  setup() {},
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-bread-item-wrapper {
}
</style>
