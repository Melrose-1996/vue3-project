// 提供一个显示 xtx-message 组件的函数
// 这个函数将来可以导入直接使用，也可以挂载在 vue 实例原型上去使用
// import Message from 'Message.js' Message({text:'提示文字',type:'error'})
// this.$message({text:'提示文字',type:'error'}

import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

const div = document.createElement('div')
// 创建唯一标识的容器
div.setAttribute('class', 'xtx-message-container')
// 把该容器添加到 body 上
document.body.appendChild(div)

// 定时器标识
let timer = null

export default ({ type, text }) => {
  // 渲染组件
  // 1. 导入消息提示组件
  // 2. 需要将该组件解析编译成虚拟 DOM
  // createVNode(组件, 参数对象(props)) vue 的方法编译成 DOM
  const vnode = createVNode(XtxMessage, { type, text })
  // 3. 准备一个转载消息提示组件的 DOM 容器 - 初始化的时候创建一次就可以
  // 4. 将虚拟 DOM 渲染在容器中
  // render(虚拟节点, DOM 容器) 用于渲染虚拟节点
  render(vnode, div)
  // 5. 3s 后销毁组件
  clearTimeout(timer)
  timer = setTimeout(() => {
    // 渲染把节点放在容器中，销毁把 null 放在容器中
    render(null, div)
  }, 3000)
}
