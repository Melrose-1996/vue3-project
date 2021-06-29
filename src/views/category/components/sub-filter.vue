<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a @click="changeBrand(item.id)" :class="{ active: item.id === filterData.selectedBrand }" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{ item.name }}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a @click="changeProps(item, props.id)" :class="{ active: props.id === item.selectedAttr }" href="javascript:;" v-for="props in item.properties" :key="props.id">{{ props.name }}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup(props, { emit }) {
    const route = useRoute()
    // 监听二级类目 ID 的变化获取筛选数据
    const filterData = ref(null)
    const filterLoading = ref(false)
    watch(
      () => route.params.id,
      newValue => {
        filterLoading.value = true
        // 变化后的 ID 有值，且处在二级类目路由下
        newValue &&
          `/category/sub/${newValue}` === route.path &&
          findSubCategoryFilter(route.params.id).then(data => {
            // 每一组可选地筛选条件缺失全部条件，处理数据加上全部条件
            // 给每一组数据加上一个选中的 ID
            // 1. 品牌
            data.result.selectedBrand = null
            data.result.brands.unshift({ id: null, name: '全部' })
            // 2. 属性
            data.result.saleProperties.forEach(item => {
              item.selectedAttr = null
              item.properties.unshift({ id: null, name: '全部' })
            })
            // 设置修改的数据
            filterData.value = data.result
            filterLoading.value = false
          })
      },
      { immediate: true }
    )

    // 获取筛选参数的函数 - 因为两个事件都需要触发这个函数
    const getFilterParams = () => {
      // 参考数据：{brandId:'',attrs:[{groupName:'颜色',propertyName:'蓝色'},...]}
      const paramsObj = { brandId: null, attrs: [] }
      // 品牌
      paramsObj.brandId = filterData.value.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedAttr) {
          const prop = item.properties.find(prop => prop.id === item.selectedAttr)
          paramsObj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
        // 一旦为空，就不会作为参数发送请求给后端
        if (paramsObj.attrs && paramsObj.attrs.length === 0) paramsObj.attrs = null
      })

      return paramsObj
    }

    // 1. 记录当前选择的品牌
    const changeBrand = brandId => {
      // 重复点击不需要发送请求
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 2. 记录选择的销售属性
    const changeProps = (item, propId) => {
      // 重复点击不需要发送请求
      if (item.selectedAttr === propId) return
      item.selectedAttr = propId
      emit('filter-change', getFilterParams())
    }
    return { filterData, filterLoading, changeBrand, changeProps }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
