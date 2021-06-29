<template>
  <div class="xtx-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'XtxInfiniteLoading',
  props: {
    // 这两个属性是用来告诉是否加载完毕，而是否加载完毕只有父组件才知道
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const target = ref(null)
    // 监听 target 是否进入可视区
    // const { stop } = useIntersectionObserver(
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          console.log('进入可视区了~')
          // 触发加载事件是有条件的：必须加载完成(请求加载完成后，不能在发起请求的时候再去发起一次请求)，数据加载尽了(不能加载完了还去加载)
          if (!props.loading && !props.finished) {
            // 事件有个原则，谁绑定谁触发， A 组件无法触发 B 组件的事件，只不过在父组件的代码里面看到了这个事件，而这个事件并不是属于父组件事件
            emit('infinite')
          }
        }
      },
      {
        threshold: 0
      }
    )
    return { target }
  }
}
</script>

<style lang="less" scoped>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
