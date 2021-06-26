<template>
  <div class="home-new-wrapper">
    <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <xtx-more path="/" />
      </template>
      <div style="position: relative;height: 426px;" ref="target">
        <!-- 面板内容 -->
        <transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <home-skeleton bg="#f0f9f4" v-else />
        </transition>
      </div>
    </home-panel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue'
import { findNew } from '@/api/home'
import HomeSkeleton from './home-skeleton.vue'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup() {
    // const goods = ref([])
    // findNew().then(data => {
    //   goods.value = data.result
    // })
    // 1. target 去绑定一个监听对象，最好的 DOM
    // 2. 传入 API 函数，内部获取调用，放回的就是响应式数据
    const { target, result } = useLazyData(findNew)
    return { goods: result, target }
  }
}
</script>

<style lang="less" scoped>
.home-new-wrapper {
  // // 离开时候展示动画
  // // 注意这段样式需要重复利用 assets/styles/common.less
  // .fade {
  //   // .fade-leave 此时没有任何的样式
  //   &-leave {
  //     // .fade-leave-active
  //     &-active {
  //       // 当离开的时，使用绝对定位
  //       position: absolute;
  //       // 定位之后无宽度
  //       width: 100%;
  //       // 动画 .5s 延迟 .2s
  //       transition: opacity 0.5s 0.2s;
  //       // 希望贴在数据边上
  //       z-index: 1;
  //     }
  //     &-to {
  //       opacity: 0;
  //     }
  //   }
  // }
  .goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;
    li {
      width: 306px;
      height: 406px;
      background: #f0f9f4;
      .hoverShadow();
      img {
        width: 306px;
        height: 306px;
      }
      p {
        font-size: 22px;
        padding: 12px 30px 0 30px;
        text-align: center;
      }
      .price {
        color: @priceColor;
      }
    }
  }
}
</style>
