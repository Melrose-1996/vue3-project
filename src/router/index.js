// createWebHistory 还有一个历史模式，引入使用即可
import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const topCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')

// 路由规则
const routes = [
  // 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: topCategory },
      { path: '/category/sub/:id', component: SubCategory }
    ]
  }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 应该使用什么模式 - 使用 hash 的路由模式
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    // vue2.0 x y 控制
    // vue3.0 left top 控制
    return { left: 0, top: 0 }
  }
})

export default router
