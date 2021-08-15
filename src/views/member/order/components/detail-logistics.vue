<template>
  <div class="detail-logistics">
    <p>
      <span>{{ list[0].text }}</span>
      <span>{{ list[0].time }}</span>
    </p>
    <a href="javascript:;" @click="handlerLogistics(order)">查看物流</a>
    <!-- 传送去一个 id 为 modals 的容器-->
    <!-- 专门为消息框确认框对话框所提供的，因为 fixed 这个是会根据浏览器定位的，但是如果父组件中有 translate 属性就会影响 fixed ，使其根据父组件定位，所以需要传送到根节点 DOM 元素上面  -->
    <teleport to="#modals">
      <order-logistics ref="orderLogisticsCom" />
    </teleport>
  </div>
</template>
<script>
import { logisticsOrder } from '@/api/order'
import { ref } from 'vue'
import orderLogistics from './order-logistics.vue'
import { useLogistics } from '../index.vue'
export default {
  components: { orderLogistics },
  name: 'DetailLogistics',
  // 组件实例化的时候需要执行 setup，但赋予了异步的函数，导致了 setup 不能率先执行
  async setup(props) {
    const data = await logisticsOrder(props.order.id)
    const list = ref(data.result.list)
    return { list, ...useLogistics() }
  },
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
