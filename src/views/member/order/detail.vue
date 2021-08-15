<template>
  <div class="member-detail" v-if="order">
    <!-- 头部 -->
    <detail-action :order="order" />
    <!-- 进度 -->
    <detail-step :order="order" />
    <!-- 物流 -->
    <suspense>
      <template #default>
        <detail-logistics v-if="[3, 4, 5].includes(order.orderState)" :order="order" />
      </template>
      <template #fallback>
        <div>
          Loading...
        </div>
      </template>
    </suspense>
    <!-- 信息 -->
  </div>
</template>

<script>
import { ref } from 'vue'
import detailAction from './components/detail-action.vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
import DetailStep from './components/detail-step.vue'
import DetailLogistics from './components/detail-logistics.vue'
export default {
  components: { detailAction, DetailStep, DetailLogistics },
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
