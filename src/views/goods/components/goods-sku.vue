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

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
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
