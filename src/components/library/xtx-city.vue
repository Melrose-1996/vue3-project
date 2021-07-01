<template>
  <div class="xtx-city" ref="target">
    <!-- 选择头 -->
    <div class="select" @click="toggle" :class="{ active: visible }">
      <!-- 占位元素 -->
      <span class="placeholder">请选择配送地址</span>
      <!-- 选择城市的地址 -->
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <!-- 展示区域 -->
    <div class="option" v-if="visible">
      <span class="ellipsis" v-for="i in 24" :key="i">北京市</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
export default {
  name: 'XtxCity',
  setup() {
    // 显示隐藏数据
    const visible = ref(false)
    // 这里的数据不仅仅是用于显示和隐藏，还有其他的业务的需求(拿数据)
    // 提供打开和关闭函数
    const open = () => {
      visible.value = true
    }
    const close = () => {
      visible.value = false
    }
    // 这里不需要把 open 和 close 传递出去，因为做的只是需要提供一个切换效果
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击组件外部元素，关闭对话框
    const target = ref(null)
    onClickOutside(target, () => {
      // 参数1：监听那个元素
      // 参数2：点击了该元素外的其他地方触发的函数
      close()
    })

    return { visible, toggle, target }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
