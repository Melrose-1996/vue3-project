<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures" />
          <goods-sales />
        </div>
        <div class="spec">
          <goods-name :goods="goods" />
          <!-- sku 组件 skuId="1369155872197971970" 测试选中 -->
          <goods-sku :goods="goods" @change="changeSku" />
          <!-- 数量选择组件 -->
          <xtx-numbox v-model="num" :max="goods.inventory" label="数量" />
          <!-- 按钮组件 -->
          <xtx-button type="primary" style="margin-top: 20px">加入购物车</xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品评价 -->
          <goods-tabs />
          <!-- 注意事项 -->
          <goods-warn />
        </div>
        <!-- 24热榜+周热销榜 -->
        <div class="goods-aside">
          <goods-hot />
          <goods-hot :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, provide, ref, watch } from 'vue'
import GoodsRelevant from './components/goods-relevant'
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import XtxNumbox from '@/components/library/xtx-numbox.vue'
import XtxButton from '@/components/library/xtx-button.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku, XtxNumbox, XtxButton, GoodsTabs, GoodsHot, GoodsWarn },
  setup() {
    // 1. 获取商品详情，进行渲染
    const goods = useGoods()
    // sku 组件给父组件传的值
    const changeSku = sku => {
      // 修改商品的现价原价和库存信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    // 提供 goods 数据给后代组件使用
    provide('goods', goods)
    // 选择的数量
    const num = ref(1)
    return { goods, changeSku, num }
  }
}
// 获取商品详情 - 把该函数剥离出来，防止 setup 过于冗余
const useGoods = () => {
  // 出现路由地址的商品 ID 发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(
    () => route.params.id,
    newVal => {
      // 注意：每次加载数据的时候，需要先把商品的信息置成空，当有数据之后才会去显示(可以加个 loading 效果过渡)
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then(data => {
          // 每次更新数据的时候，都让组件初始化
          goods.value = null
          // 两段对 goods.value 赋值写在一起，上一个并不会生效，需要加个 nextTick
          // 当改为数据立刻去操作 DOM ，发现操作不上(数据还没生效) => nextTick
          nextTick(() => {
            goods.value = data.result
          })
        })
      }
    },
    { immediate: true }
  )

  return goods
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
