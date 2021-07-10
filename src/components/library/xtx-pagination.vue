<template>
  <div class="xtx-pagination">
    <!-- myCurrentPage - 1 这样并不能给 myCurrentPage 赋值 -->
    <!-- <a v-if="myCurrentPage > 1" href="javascript:;" @click="myCurrentPage - 1">上一页</a> -->
    <a v-if="myCurrentPage > 1" href="javascript:;" @click="changePager(myCurrentPage - 1)">上一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a href="javascript:;" v-for="i in pager.btnArr" :key="i" :class="{ active: i === myCurrentPage }" @click="changePager(i)">{{ i }}</a>
    <!-- <a href="javascript:;">4</a>
    <a href="javascript:;">5</a>
    <a href="javascript:;">6</a>
    <a href="javascript:;">7</a> -->
    <span v-if="pager.end < pager.pageCount">...</span>
    <a v-if="myCurrentPage < pager.pageCount" href="javascript:;" @click="changePager(myCurrentPage + 1)">下一页</a>
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const count = 5
    const myCurrentPage = ref(1)
    const myTotal = ref(100)
    const myPageSize = ref(10)
    const pager = computed(() => {
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      const offset = Math.floor(count / 2)
      let start = myCurrentPage.value - offset
      let end = start + count - 1
      if (start < 1) {
        start = 1
        end = start + count - 1 > pageCount ? pageCount : start + count - 1
      }
      if (end > pageCount) {
        end = pageCount
        start = end - count + 1 < 1 ? 1 : end - count + 1
      }
      const btnArr = []
      for (let index = start; index <= end; index++) {
        btnArr.push(index)
      }
      return { pageCount, btnArr, start, end }
    })
    // 监听 props 的变化，更新内部数据
    watch(
      props,
      () => {
        myTotal.value = props.total
        myPageSize.value = props.pageSize
        myCurrentPage.value = props.currentPage
      },
      { immediate: true }
    )

    // 切换分页的函数
    const changePager = newPage => {
      if (myCurrentPage.value !== newPage) {
        myCurrentPage.value = newPage
        // 通知父组件最新页码
        emit('current-change', newPage)
      }
    }
    return { myCurrentPage, pager, changePager }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
