import defaultImg from '@/assets/images/200.png'
import Message from './Message'
import Confirm from './Confirm'

const importFn = require.context('./', false, /\.vue$/)

export default {
  install(app) {
    importFn.keys().forEach(path => {
      // 这样的导入是 common.js 的模块化导入， .default 是默认导出的内容
      // 导入组件
      const component = importFn(path).default
      // 进行组件注册
      app.component(component.name, component)
    })
    defineDirective(app)

    // 定义一个原型函数
    app.config.globalProperties.$message = Message
    app.config.globalProperties.$confirm = Confirm
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
