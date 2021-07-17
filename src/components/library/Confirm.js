import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'

// 准备一个 DOM
const div = document.createElement('div')
// 创建唯一标识的容器
div.setAttribute('class', 'xtx-confirm-container')
// 把该容器添加到 body 上
document.body.appendChild(div)

// 放回的是一个 promise 对象，点取消销毁组件，点确认也要销毁这个组件
export default ({ title, text }) => {
  // 1. 导入被创建的组件
  // 2. 使用 creatVNode 创建虚拟节点
  // 3. 准备一个 DOM 容器装载组件
  // 4. 使用 render 函数渲染组件到容器

  return new Promise((resolve, reject) => {
    // 点击取消触发的函数
    const cancelCallback = () => {
      // 销毁组件
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 点击确认触发的函数
    const submitCallback = () => {
      // 销毁组件
      render(null, div)
      resolve()
    }
    // 上面两个方法可以传递给组件
    const vn = createVNode(XtxConfirm, { title, text, cancelCallback, submitCallback })
    render(vn, div)
  })
}
