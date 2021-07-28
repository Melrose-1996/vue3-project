<template>
  <div class="member-home">
    <!-- 概览 -->
    <home-overview />
    <!-- 收藏 -->
    <home-panel title="我的收藏">
      <goods-item v-for="i in 4" :key="i" :goods="goods" />
    </home-panel>
    <!-- 足迹 -->
    <home-panel title="我的足迹"></home-panel>
    <goods-item v-for="i in 4" :key="i" :goods="goods" />
    <!-- 猜你喜欢 -->
    <goods-relevant />
  </div>
</template>

<script>
import HomePanel from './components/home-panel.vue'
import homeOverview from './components/home-overview.vue'
import GoodsRelevant from '@/views/goods/components/goods-relevant.vue'
import GoodsItem from '@/views/category/components/goods-item.vue'
export default {
  components: { homeOverview, HomePanel, GoodsRelevant, GoodsItem },
  name: 'MemberHome',
  setup() {
    const goods = {
      id: '1',
      name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
      picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
      desc: '清汤鲜香 红汤劲爽',
      price: '159.00'
    }
    return { goods }
  }
}
</script>

<style lang="less" scoped>
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>
