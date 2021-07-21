<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none-info">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <!-- 这里使用 $1 取到前面的3个数字，$2 取到后面4个数字，中间用 * 代替 -->
        <li><span>联系方式：</span>{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2') }}</li>
        <li><span>收货地址：</span>{{ showAddress.fullLocation.replace(/ /g, '') + showAddress.address }}</li>
      </ul>
      <a v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialog" class="btn">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
  </div>
  <!-- 对话框插件 -->
  <xtx-dialog title="切换收货地址" v-model:visible="visibleDialog">
    <div @click="selectedAddress = item" :class="{ active: selectedAddress && selectedAddress.id === item.id }" class="text item" v-for="item in list" :key="item.id">
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ item.receiver }}
        </li>
        <li><span>联系方式：</span>{{ item.contact.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2') }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}</li>
      </ul>
    </div>
    <template #footer>
      <XtxButton @click="visibleDialog = false" type="gray" style="margin-right:20px">取消</XtxButton>
      <XtxButton @click="confirmAddressFn" type="primary">确认</XtxButton>
    </template>
    <!-- <template v-slot:footer></template> -->
  </xtx-dialog>
</template>
<script>
import { ref } from 'vue'
import xtxDialog from '@/components/library/xtx-dialog.vue'
export default {
  components: { xtxDialog },
  name: 'CheckoutAddress',
  // 1. 在拥有根元素的组件，触发自定义使用，由于 emits 选项无所谓
  // 2. 当使用代码片段的时候，需要使用 emits 选项声明所触发的 enit 事件，使用的更加规范
  // 3. 提倡: 你出发了自定义事件，需要在 emits 选项声明下，使得触发那些事件一目了然
  emits: ['change'],
  props: {
    // 收货地址列表
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    // 1. 找到默认收货地址
    // 2. 没有默认收货地址，使用第一条收货地址
    // 3. 如果没有数据，提示添加
    const showAddress = ref(null)
    const defaultAddress = props.list.find(item => item.isDefault === 0)
    if (defaultAddress) {
      showAddress.value = defaultAddress
    } else {
      if (props.list.length) {
        // eslint-disable-next-line vue/no-setup-props-destructure
        showAddress.value = props.list[0]
      }
    }
    // 默认通知父组件一个收货地址 ID
    emit('change', showAddress.value && showAddress.value.id)

    // 切换地址对话显示和隐藏
    const visibleDialog = ref(false)

    // 记录当前选中的地址 ID
    const selectedAddress = ref(null)

    // 传递当前的地址
    const confirmAddressFn = () => {
      // 显示的地址换成选中的地址
      showAddress.value = selectedAddress.value
      // 把选中的地址 ID 通知结算组件
      // 这个 ? 是对取值的前置判断，说明 value 有值去取值
      emit('change', selectedAddress.value?.id)
      // 数据选中完毕置空

      visibleDialog.value = false
    }

    // 将之前的选中地址改成 null
    const openDialog = () => {
      selectedAddress.value = null
      visibleDialog.value = true
    }

    return { showAddress, visibleDialog, selectedAddress, confirmAddressFn, openDialog }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none-info {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
