// 提供复用逻辑的函数(钩子) - use 表示复用的意思
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'

/**
 * @description:数据懒加载
 * @param {Function} apiFn:请求数据的函数
 * @return:Array
 */
export const useLazyData = apiFn => {
  const target = ref(null)
  const result = ref([])
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入可视区域
      if (isIntersecting) {
        stop()
        // 调用 API 函数调用数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项
    {
      // 临界值的比例大于0的时候触发
      threshold: 0
    }
  )
  return { target, result }
}

/**
 * @description: 支付倒计时函数
 * @param {Integer} countdown - 倒计时秒数
 * @return:
 */
export const usePayTime = () => {
  // 倒计时逻辑
  // 第三个参数是表示是否立即执行
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--
      timeText.value = dayjs.unix(time.value).format('mm分ss秒')
      if (time.value <= 0) {
        pause()
      }
    },
    1000,
    false
  )
  // 清除定时器
  onUnmounted(() => {
    pause()
  })

  // 开启定时器 countdown 倒计时
  const start = countdown => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }

  return {
    start,
    timeText
  }
}
