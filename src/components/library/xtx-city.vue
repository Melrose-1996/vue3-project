<template>
  <div class="xtx-city" ref="target">
    <!-- 选择头 -->
    <div class="select" @click="toggle" :class="{ active: visible }">
      <!-- 占位元素 -->
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <!-- 选择城市的地址 -->
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <!-- 展示区域 -->
    <div class="option" v-if="visible">
      <!-- 需要提前把这个图片打包到项目里 => 防止数据请求的比图片请求的还要快 -->
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 显示隐藏数据
    const visible = ref(false)
    // 所有的省市区数据
    const allCityData = ref([])
    // 获取数据时候的 loading
    const loading = ref(false)
    // 这里的数据不仅仅是用于显示和隐藏，还有其他的业务的需求(拿数据)
    // 提供打开和关闭函数
    const open = () => {
      visible.value = true
      // 获取城市数据
      loading.value = true
      getCityData().then(data => {
        allCityData.value = data
        loading.value = false
      })
      // 清空之前的城市选择
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const close = () => {
      visible.value = false
    }
    // 这里不需要把 open 和 close 传递出去，因为做的只是需要提供一个切换效果
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击组件外部元素，关闭对话框
    const target = ref(null)
    onClickOutside(target, () => {
      // 参数1：监听那个元素
      // 参数2：点击了该元素外的其他地方触发的函数
      close()
    })
    // 实现计算属性：获取当前显示的地区数组
    const currList = computed(() => {
      // 默认显示省一级
      let list = allCityData.value
      // 可能：市一级
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 可能：县地区一级
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find(c => c.code === changeResult.cityCode).areaList
      }
      return list
    })

    // 定义选择的省市区数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    // 点击按钮的时候记录
    const changeItem = item => {
      if (item.level === 0) {
        // 省
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        // 市
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        // 区
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        // 完整的城市名字
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        // 这是最后一级，关闭弹出层，通知父组件数据
        close()

        emit('change', changeResult)
      }
    }

    return { visible, toggle, target, loading, currList, changeItem }
  }
}
// 获取省市区数据函数
const getCityData = () => {
  // 数据： https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 1. 当本地没有缓存，发起请求获取数据
  // 2. 当本地有缓存，取出本地数据
  // 放回一个 promise 在then 获取数据，因为有可能是同步的取出本地数据，也有可能是异步的获取数据
  return new Promise((resolve, reject) => {
    // 约定：数据存储在 window 上的 cityData 字段
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      // 为啥不用 request => 因为不是正常的接口请求
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        // 缓存数据
        window.cityData = res.data
        resolve(res.data)
      })
    }
  })
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    // 省略...
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
