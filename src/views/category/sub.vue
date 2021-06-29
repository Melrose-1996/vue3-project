<template>
  <div class="sub-category-wrapper">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread />
      <!-- 筛选区 -->
      <sub-filter />
      <!-- 商品面板（排序 + 列表） -->
      <div class="goods-list">
        <!-- 排序组件 -->
        <sub-sort />
        <!-- 列表组件 -->
        <ul>
          <li v-for="goods in goodList" :key="goods.id">
            <goods-item :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <!-- 这个事件也是该组件的事件，只是在父组件里展示，由于绑定父组件的方法，所以才能把数据传给父组件的方法 -->
        <xtx-infinite :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import subBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import XtxInfinite from '@/components/library/xtx-infinite.vue'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  components: { subBread, SubFilter, SubSort, GoodsItem, XtxInfinite },
  name: 'subCategory',
  setup() {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 是否加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodList = ref([])
    // 请求参数
    const reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      // 设置二级分类的 ID
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          goodList.value.push(...result.items)
          // 把 page 改成下一页页码
          reqParams.page++
        } else {
          // 没有数据，代表加载完成
          finished.value = true
        }
        loading.value = false
      })
    }
    // 在更改了二级分类的时候需要重新加载数据
    watch(
      () => route.params.id,
      newVal => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          // 结束指示设置为 false
          finished.value = false
          // 数组置空，由于是空数组，列表没有数据，所以 loading 组件默认就上来了，直接触发事件发起请求
          goodList.value = []
          // 重置 page
          reqParams.page = 1
        }
      },
      {}
    )
    return { getData, loading, finished, goodList }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
