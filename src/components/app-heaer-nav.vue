<template>
  <div class="app-heaer-nav-wrapper">
    <ul class="navs">
      <li class="home"><RouterLink to="/">首页</RouterLink></li>
      <!-- 当 mouseenter 的有可能出现跳转页面顶部的时候刚好到顶级类目的位置而跳出弹出层，所以改用 mousemove -->
      <li v-for="item in list" :key="item.id" @mousemove="show(item)" @mouseleave="hide(item)">
        <!-- 一级类名 -->
        <router-link :to="`/category/${item.id}`" @click="hide(item)">{{ item.name }}</router-link>
        <!-- 二级类名 -->
        <div class="layer" :class="{ open: item.open }">
          <ul>
            <li v-for="sub in item.children" :key="sub.id">
              <router-link :to="`/category/sub/${sub.id}`" @click="hide(item)">
                <img :src="sub.picture" alt="" />
                <p>{{ sub.name }}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <!-- <li><a href="#">餐厨</a></li>
      <li><a href="#">艺术</a></li>
      <li><a href="#">电器</a></li>
      <li><a href="#">居家</a></li>
      <li><a href="#">洗护</a></li>
      <li><a href="#">孕婴</a></li>
      <li><a href="#">服装</a></li>
      <li><a href="#">杂货</a></li> -->
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup() {
    const store = useStore()
    // 拿到 vuex 中的分类
    const list = computed(() => store.state.category.categoryList)
    // 跳转的时候不会关闭二级类目，需要通过数据来控制
    // 1. vuex 每个分类加上 open 数据
    // 2. vuex 提供显示和隐藏函数，修改 open 数据
    // 3. 组件中使用 vuex 中的函数，使用事件来绑定，提供一个类名显示和隐藏的类名
    const show = item => {
      store.commit('category/show', item.id)
    }
    const hide = item => {
      store.commit('category/hide', item.id)
    }
    return { list, show, hide }
  }
}
</script>

<style lang="less" scoped>
.app-heaer-nav-wrapper {
  .navs {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    position: relative;
    z-index: 998;
    > li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      > a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
        /* 显示二级类名 */
        // > .layer {
        //   height: 132px;
        //   opacity: 1;
        // }
      }
    }
  }
  /* 二级类名的样式 */
  .layer {
    /* 显示的类名 */
    &.open {
      height: 132px;
      opacity: 1;
    }
    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s 0.1s;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;
      li {
        width: 110px;
        text-align: center;
        img {
          width: 60px;
          height: 60px;
        }
        p {
          padding-top: 10px;
        }
        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
