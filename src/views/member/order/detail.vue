<template>
  <div class="member-detail" v-if="order">
    <!-- 头部 -->
    <detail-action :order="order" />
    <!-- 进度 -->
    <!-- 物流 -->
    <!-- 信息 -->
  </div>
</template>

<script>
import { ref } from 'vue'
import detailAction from './components/detail-action.vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  components: { detailAction },
  name: 'MemberDetail',
  setup() {
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
    })
    return { order }
  }
}
</script>

<style lang="less" scoped>
.member-detail {
  background-color: #fff;
  height: 100%;
}
</style>
