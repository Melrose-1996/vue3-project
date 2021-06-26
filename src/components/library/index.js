import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import XtxBread from './xtx-bread.vue'
import XtxBreadItem from './xtx-bread-item.vue'

import defaultImg from '@/assets/images/200.png'

export default {
  install(app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBreadItem)
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = app => {
  app.directive('lazy', {
    mounted(el, binding) {
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            observe.unobserve(el)
            el.onerror = () => {
              el.src = defaultImg
            }
            el.src = binding.value
          }
        },
        { threshold: 0 }
      )
      observe.observe(el)
    }
  })
}
