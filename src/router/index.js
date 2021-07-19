// createWebHistory 还有一个历史模式，引入使用即可
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const topCategory = () => import('@/views/category/index.vue')
const SubCategory = () => import('@/views/category/sub.vue')
const Goods = () => import('@/views/goods/index.vue')
const Cart = () => import('@/views/cart')

const Login = () => import('@/views/login/index.vue')
const LoginCallback = () => import('@/views/login/callback.vue')

const Checkout = () => import('@/views/member/pay/checkout.vue')

// 路由规则
const routes = [
  // 一级路由
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: topCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout }
    ]
  },
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallback }
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

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由:地址是以 /member 开头
  const { profile } = store.state.user
  // to.path.startsWith 以 *** 为开头
  if (!profile.token && to.path.startsWith('/member')) {
    // 让跳转的登录也携带当前的地址，并同时需要转义
    return next('/login?redirectUrl' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
