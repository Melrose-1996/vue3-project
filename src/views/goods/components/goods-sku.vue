<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <!-- 注意，这个判断选中和未选中，都有自己的状态，选中不选中，禁用和不禁用都是由状态决定的 -->
        <template v-for="val in item.values" :key="val.name">
          <img :class="{ selected: val.selected, disabled: val.disabled }" @click="selectSku(item, val)" v-if="val.picture" :src="val.picture" alt="" :title="val.name" />
          <span :class="{ selected: val.selected, disabled: val.disabled }" @click="selectSku(item, val)" v-else>{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
const spliter = '★'
const getPathMap = skus => {
  const pathMap = {}
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      const valueArr = sku.specs.map(val => val.valueName)
      const valueArrPowerSet = powerSet(valueArr)
      valueArrPowerSet.forEach(arr => {
        const key = arr.join(spliter)
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 用于判断哪一行被选中了，并且放到对应的数组中
const getSelectedValues = specs => {
  const arr = []
  specs.forEach(item => {
    // 选择的按钮对象
    const selectedVal = item.values.find(val => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 1. 约定每一个按钮的转状态由本身的 disabled 数据来控制
  specs.forEach((item, i) => {
    // selectedValues = ['黑色', undefined, undefined]
    const selectedValues = getSelectedValues(specs)
    item.values.forEach(val => {
      // 2. 判断当前是否选中，是选中无需判断
      if (val.selected) return
      // 3. 拿当前的值按照索引的顺序去套入当前选中的数组
      selectedValues[i] = val.name
      // 4. 剔除 undefined 数据，按照分隔符拼接 key
      const key = selectedValues.filter(res => res).join(spliter)
      // 5. 拿着 key去路径字典中查找是否有数据，有可以点击，没有就禁用 true
      val.disabled = !pathMap[key]
    })
  })
}

// 默认选中
const initDefaultSelected = (goods, skuId) => {
  // 1. 找出 sku 信息
  // 2. 遍历每一个按钮，按钮的值和 sku 记录的值相同
  const sku = goods.skus.find(sku => sku.id === skuId)
  goods.specs.forEach((item, i) => {
    const val = item.values.find(val => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 根据 skuId 初始化选中
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId)
    }
    const pathMap = getPathMap(props.goods.skus)
    // ☆组件初始化：更新按钮禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)

    const selectSku = (item, val) => {
      // 当按钮是禁用的阻止程序的运行
      if (val.disabled) return
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(skuItem => {
          skuItem.selected = false
        })
        val.selected = true
      }
      // ☆点击按钮时：更新按钮禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)
      // 将选择的 sku 信息传递给父组件 {skuId, price, oldPrice, inventory, specsText}
      // 1. 这里只有选择完整的 sku 组合按钮之后才能传递给父组件信息
      // 2. 不是完整的 sku 组合按钮，提交空对象给父组件
      const validSelectedValues = getSelectedValues(props.goods.specs).filter(val => val)
      if (validSelectedValues.length === props.goods.specs.length) {
        // 取出 spu 信息，在路径字典里面存储了 skuIds ，根据 value 找到对应的 Id 数组
        const skuIds = pathMap[validSelectedValues.join(spliter)]
        // 通过有且只有一个 id ，找到包含完整规格的数据
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          // 属性名: 属性值 属性名1: 属性值1 ... 这样的字符串
          // 两个参数，第一个遍历时候的回调函数(参数1:上一个回合的值, 参数2:当前回合的值) 第二个是起始累加的值
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
        })
      } else {
        // 父组件需要判断是否规格选择完整，不完整不能加购物车
        emit('change', {})
      }
    }
    return { selectSku, pathMap }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
