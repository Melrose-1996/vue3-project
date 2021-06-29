<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem :key="category.top.id" v-if="category.top" :to="`/category/${category.top.id}`">{{ category.top.name }}</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <!-- 动画效果要生效一定要加 key -->
      <XtxBreadItem :key="category.sub.id" v-if="category.sub" :to="`/category/${category.sub.id}`">{{ category.sub.name }}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup() {
    // 通过计算属性从 vuex 获取顶级和二级类目信息
    // 数据对象: {top:{id, name},sub:{id, name}}
    const route = useRoute()
    const store = useStore()
    const category = computed(() => {
      const cate = {}
      // 完成获取数据逻辑
      store.state.category.categoryList.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return cate
    })
    return { category }
  }
}
</script>
