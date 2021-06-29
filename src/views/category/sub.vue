<template>
  <div class="sub-category-wrapper">
    <div class="container">
      <!-- 面包屑 -->
      <sub-bread />
      <!-- 筛选区 -->
      <sub-filter @filter-change="filterChange" />
      <!-- 商品面板（排序 + 列表） -->
      <div class="goods-list">
        <!-- 排序组件 -->
        <!-- 这里不需要加(),需要接收它的默认传参 -->
        <sub-sort @sort-change="sortChange" />
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
    const loading = ref(false)
    const finished = ref(false)
    const goodList = ref([])
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }
    watch(
      () => route.params.id,
      newVal => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          finished.value = false
          goodList.value = []
          reqParams.page = 1
        }
      },
      {}
    )
    // 1. 更改排序组件的筛选数据，重新请求数据
    const sortChange = sortParams => {
      finished.value = false
      goodList.value = []
      // 合并请求参数，保留之前的参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
    }
    // 2. 更改筛选组件的筛选数据，重新请求数据
    const filterChange = filterParams => {
      finished.value = false
      goodList.value = []
      // 合并请求参数，保留之前的参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
    }
    return { getData, loading, finished, goodList, sortChange, filterChange }
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
