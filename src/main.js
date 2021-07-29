import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入自己 UI 组件库
import UI from '@/components/library'
// 1. 重置样式的库
import 'normalize.css'
// 2. 自己项目的重置样式和公共样式
import '@/assets/styles/common.less'

// mockjs
// 一旦后台开发好了接口，只需要把该代码注释掉就行了
import '@/mock'

createApp(App)
  .use(store)
  .use(router)
  .use(UI)
  .mount('#app')
