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
          <xtx-button @click="insertCart" type="primary" style="margin-top: 20px">加入购物车</xtx-button>
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
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku, XtxNumbox, XtxButton, GoodsTabs, GoodsHot, GoodsWarn },
  setup() {
    const goods = useGoods()
    const currSku = ref(null)
    const changeSku = sku => {
      // 此时需要记录这个选择后的 sku
      // 1. 判断规格是否选择完整
      // 2. 插入购物车也需要这个 sku 里面的数据
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      currSku.value = sku
    }
    provide('goods', goods)
    const num = ref(1)

    const store = useStore()
    // 加入购物车
    const insertCart = () => {
      // 判断规格是否选完
      if (currSku.value && currSku.value.skuId) {
        store
          .dispatch('cart/insertCart', {
            id: goods.value.id,
            skuId: currSku.value.skuId,
            name: goods.value.name,
            picture: goods.value.mainPictures[0],
            price: currSku.value.price,
            nowPrice: currSku.value.price,
            count: num.value,
            attrsText: currSku.value.specsText,
            selected: true,
            isEffective: true,
            stock: currSku.value.inventory
          })
          .then(() => {
            Message({ text: '添加成功', type: 'success' })
          })
      } else {
        Message({ text: '请选择完整的规格' })
      }
    }
    return { goods, changeSku, num, insertCart }
  }
}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(
    () => route.params.id,
    newVal => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then(data => {
          goods.value = null
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
