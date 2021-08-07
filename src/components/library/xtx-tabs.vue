<script>
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props, { emit }) {
    // 这样就是 v-model 数据了
    const activeName = useVModel(props, 'modelValue', emit)
    // 把这个 activeName 传递给子孙后代
    provide('activeName', activeName)
    // 点击修改 props 值
    const tabClick = (name, index) => {
      activeName.value = name
      // 提供一个 tab-click 事件
      emit('tab-click', { name, index })
    }
    return { activeName, tabClick }
  },
  render() {
    // 获取插槽的内容
    const panels = this.$slots.default()
    // 动态的 panels 组件集合
    const dynamicPanels = []
    panels.forEach(item => {
      if (item.type.name === 'XtxTabsPanel') {
        // 代表静态
        dynamicPanels.push(item)
      } else {
        // v-for 渲染出来的
        item.children.forEach(res => {
          dynamicPanels.push(res)
        })
      }
    })

    // 需要这这里进行组织
    // 1. tabs 组件大容器
    // 2. 选项卡的导航菜单结构
    // 3. 内容容器
    const nav = (
      <nav>
        {dynamicPanels.map((item, i) => (
          <a onClick={() => this.tabClick(item.props.name, i)} class={{ active: item.props.name === this.activeName }} href="javascript:;">
            {item.props?.label}
          </a>
        ))}
      </nav>
    )
    // 表示这个 div 容器中拥有了选项卡和内容
    return <div class="xtx-tabs">{[nav, dynamicPanels]}</div>
  }
}
</script>

<style lang="less">
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
