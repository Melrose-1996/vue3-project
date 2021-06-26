// 提供复用逻辑的函数(钩子) - use 表示复用的意思
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
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
