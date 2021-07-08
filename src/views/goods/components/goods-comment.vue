<template>
  <div class="goods-comment">
    <!-- 评价头部 -->
    <div class="head" v-if="commitInfo">
      <div class="data">
        <p>
          <span>{{ commitInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commitInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a v-for="(item, index) in commitInfo.tags" :key="item.title" href="javascript:;" :class="{ active: currentTagIndex === index }" @click="changeTag(index)"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
          <!-- <a href="javascript:;">好吃（1000）</a>
          <a href="javascript:;">便宜（1000）</a>
          <a href="javascript:;">很好（1000）</a>
          <a href="javascript:;">再来一次（1000）</a>
          <a href="javascript:;">快递棒（1000）</a> -->
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>

      <a @click="changeSort(null)" href="javascript:;" :class="{ active: reqParams.sortField === null }">默认</a>
      <a @click="changeSort('createTime')" href="javascript:;" :class="{ active: reqParams.sortField === 'createTime' }">最新</a>
      <a @click="changeSort('praiseCount')" href="javascript:;" :class="{ active: reqParams.sortField === 'praiseCount' }">最热</a>
    </div>
    <!-- 评价列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i + 's'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5 - item.score" :key="i + 'k'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref, watch } from 'vue'
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/product'
export default {
  name: 'goodsComment',
  setup() {
    // 获取评价信息
    const commitInfo = ref(null)
    // 注意这里的 goods 是 ref 申明的数据
    const goods = inject('goods')
    findGoodsCommentInfo(goods.value.id).then(data => {
      data.result.tags.unshift({ title: '有图', tagCount: data.result.hasPictureCount, type: 'img' })
      data.result.tags.unshift({ title: '全部评价', tagCount: data.result.evaluateCount, type: 'all' })
      // 设置数据之前， tags 数组前追加 有图 tag 全部评价 tag
      commitInfo.value = data.result
    })

    // 点击排序
    const changeSort = sort => {
      reqParams.sortField = sort
      // 页码重置到1
      reqParams.page = 1
    }

    // 获取 tag
    const currentTagIndex = ref(0)

    // 激活 tag
    const changeTag = i => {
      currentTagIndex.value = i
      // 点击 tag 的时候修改筛选条件
      // 1: 全部评价 2: 有图 3: 正常 tag
      const tag = commitInfo.value.tags[i]
      if (tag.type === 'all') {
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (tag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = null
        reqParams.tag = tag.title
      }
      // 页码重置到1
      reqParams.page = 1
    }

    // 准备筛选条件数据
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      // 排序字段，可选值范围 praiseCount 热度 createTime 最新
      sortField: null
    })

    const commentList = ref([])
    // 初始化需求发请求，筛选条件发生改变发请求
    watch(
      reqParams,
      () => {
        findGoodsCommentList(goods.value.id, reqParams).then(data => {
          commentList.value = data.result.items
        })
      },
      { immediate: true }
    )

    // 定义转换数据的函数(对应 vue2.0 的过滤器)
    const formatSpecs = specs => {
      return specs.reduce((p, c) => `${p} ${c.name}: ${c.nameValue}`, []).trim()
    }

    // 定义隐藏名字的函数(对应 vue2.0 的过滤器)
    const formatNickname = nickname => {
      // substr(-1) 最后一个字符
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }

    return { commitInfo, currentTagIndex, changeTag, changeSort, reqParams, commentList, formatSpecs, formatNickname }
  }
}
</script>

<style lang="less" scoped>
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
