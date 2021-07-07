<template>
  <div class="goods-tabs">
    <nav>
      <a @click="activeName = 'GoodsDetail'" :class="{ active: activeName === 'GoodsDetail' }" href="javascript:;">商品详情</a>
      <a @click="activeName = 'GoodsComment'" :class="{ active: activeName === 'GoodsComment' }" href="javascript:;"
        >商品评价<span>({{ goods.commentCount }})</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <!-- 在 vue 中动态的去切换组件，其实可以使用动态的 component 组件 -->
    <!-- is 属性用来决定 component 动态组件渲染为哪个组件，组件的名称 -->
    <!-- <goods-detail v-if="activeName === 'GoodsDetail'" />
      <goods-comment v-if="activeName === 'GoodsComment'" /> -->
    <component :is="activeName"></component>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import GoodsDetail from './goods-detail.vue'
import GoodsComment from './goods-comment.vue'
export default {
  components: { GoodsDetail, GoodsComment },
  name: 'goodsTabs',
  setup() {
    // actvieName 的值: GoodsDetail GoodsComment
    const activeName = ref('GoodsDetail')
    // godds 详情数据的数目
    const goods = inject('goods')
    return { activeName, goods }
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
