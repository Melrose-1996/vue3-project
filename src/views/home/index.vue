<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class=" container">
      <!-- 左侧分类 -->
      <home-category />
      <!-- 轮播图 -->
      <home-banner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <home-new />
  <!-- 人气推荐 -->
  <home-hot />
  <!-- 使用 transition 组件 -->
  <button @click="show = true">显示|创建</button>
  <button @click="show = false">隐藏|移除</button>
  <transition>
    <div v-show="show" style="width:100px;height:100px;background:red"></div>
  </transition>
</template>

<script>
import { ref } from 'vue'
import HomeBanner from './components/home-banner.vue'
import homeCategory from './components/home-category.vue'
import HomeHot from './components/home-hot.vue'
import HomeNew from './components/home-new.vue'
export default {
  components: { homeCategory, HomeBanner, HomeNew, HomeHot },
  name: 'HomePage',
  setup() {
    const show = ref(true)
    return { show }
  }
}
</script>

<style lang="less" scoped>
// .hoverShadow();
// 如果需要多个组动画， transition 加上 name 属性 name="xxx"
// 其他六大类的写法： xxx-enter-from xxx-enter-active xxx-enter-to xxx-leave-from xxx-leave-active xxx-leave-to
// vue2.0 进入 v-enter v-enter-active v-enter-to
// vue3.0 进入 v-enter-from v-enter-active v-enter-to
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 2s;
}
.v-enter-to {
  opacity: 1;
}
// vue2.0 离开 v-leave v-leave-active v-leave-to
// vue3.0 离开 v-leave-from v-leave-active v-leave-to
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 2s;
}
.v-leave-to {
  opacity: 0;
}
</style>
