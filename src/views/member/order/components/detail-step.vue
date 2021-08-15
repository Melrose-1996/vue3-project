<template>
  <div class="detail-step">
    <xtx-steps :active="order.orderState === 6 ? 1 : order.orderState">
      <XtxStepsItem title="提交订单" :desc="order.createTime" />
      <XtxStepsItem title="付款成功" :desc="order.payTime" />
      <XtxStepsItem title="商品发货" :desc="order.consignTime" />
      <XtxStepsItem title="确认收货" :desc="order.evaluationTime" />
      <XtxStepsItem title="订单完成" :desc="order.endTime" />
    </xtx-steps>
  </div>
</template>

<script>
import xtxSteps from '@/components/library/xtx-steps.vue'
import XtxStepsItem from '@/components/library/xtx-steps-item.vue'
export default {
  components: { xtxSteps, XtxStepsItem },
  name: 'DetailStep',
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup() {}
}
</script>

<style lang="less" scoped>
.detail-step {
  padding: 20px;
}
</style>
