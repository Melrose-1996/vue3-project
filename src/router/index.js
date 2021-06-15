// createWebHistory 还有一个历史模式，引入使用即可
import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则
const routes = []

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 应该使用什么模式 - 使用 hash 的路由模式
  history: createWebHashHistory(),
  routes
})

export default router
