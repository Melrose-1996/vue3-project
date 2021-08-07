<template>
  <div class="member-order">
    <!-- tab 组件 -->
    <xtx-tabs v-model="activeName">
      <xtx-tabs-panel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name">{{ item.label }}</xtx-tabs-panel>
    </xtx-tabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <order-item v-for="item in orderList" :key="item.id" :order="item" />
    </div>
    <!-- 分页组件 -->
    <xtx-pagination />
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
import { reactive, ref } from 'vue'
import orderItem from './components/order-item.vue'
import { findOrderList } from '@/api/order'
export default {
  components: { orderItem },
  name: 'MemberOrder',
  setup() {
    const activeName = ref('all')

    // 获取数据
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderStatus: 0
    })
    const orderList = ref([])
    findOrderList(reqParams).then(data => {
      orderList.value = data.result.items
    })

    return { activeName, orderStatus, orderList }
  }
}
</script>

<style lang="less" scoped>
.order-list {
  background: #fff;
  padding: 20px;
}
</style>
