<template>
  <div class="member-order">
    <!-- tab 组件 -->
    <xtx-tabs v-model="activeName" @tab-click="tabClick">
      <xtx-tabs-panel v-for="item in orderStatus" :key="item.name" :label="item.label" :name="item.name"></xtx-tabs-panel>
    </xtx-tabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <order-item @on-cancel="handlerCancel" v-for="item in orderList" :key="item.id" :order="item" />
    </div>
    <!-- 分页组件 -->
    <xtx-pagination v-if="total > 0" :current-page="reqParams.page" :page-size="reqParams.pageSize" :total="total" @current-change="reqParams.page = $event" />
    <!-- 取消原因组件 -->
    <order-cancel ref="orderCancelCom" />
  </div>
</template>

<script>
import { orderStatus } from '@/api/constants'
import { reactive, ref, watch } from 'vue'
import orderItem from './components/order-item.vue'
import { findOrderList } from '@/api/order'
import OrderCancel from './components/order-cancel.vue'
export default {
  components: { orderItem, OrderCancel },
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

    // 点击选项卡
    const tabClick = ({ index }) => {
      reqParams.page = 1
      reqParams.orderState = index
    }

    // loading 效果
    const loading = ref(false)

    // 跟分页相关的总条数
    const total = ref(0)

    // 筛选条件变化重新加载
    watch(
      reqParams,
      () => {
        loading.value = true
        findOrderList(reqParams).then(data => {
          orderList.value = data.result.items
          total.value = data.result.counts
          loading.value = false
        })
      },
      { immediate: true }
    )

    return { activeName, orderStatus, orderList, tabClick, loading, total, reqParams, ...useCancel() }
  }
}

// 取消订单逻辑
const useCancel = () => {
  // 绑定取消订单组件实例
  const orderCancelCom = ref(null)
  // 点击取消
  const handlerCancel = order => {
    orderCancelCom.value.open(order)
  }
  // 注意返回的是一个对象
  return { handlerCancel, orderCancelCom }
}
</script>

<style lang="less" scoped>
.order-list {
  background: #fff;
  position: relative;
  padding: 20px;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
