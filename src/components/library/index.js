// 扩展 vue 原有的功能： 全局组件，自定义指令，挂载原型方法，注意没有全局过滤器(本质就是函数)
// 这就是插件
// vue2.0 插件写法要素：导出一个对象，有 install 函数，默认传入了 vue 构造函数，在 vue 的基础之上扩展
// vue3.0 插件写法要素：导出一个对象，有 install 函数，默认传入了 App ，在 vue 的基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'

export default {
  install(app) {
    // 在 app 上进行扩展， app 提供 component directive
    // 不提供 prototype 这种原型方法，如果要挂载原型 app.config.globalProperties.$http
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
