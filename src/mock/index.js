import Mock from 'mockjs'

// 基本配置
Mock.setup({
  // 随机延时500-1000毫秒，模拟网络延时
  timeout: '500-1000'
})

// 拦截接口 /my/test - 当通过正则匹配到这个规则的时候，就会拦截该请求
// 1. 接口地址路径规则，需要匹配到它
// 2. 请求方式
// 3. 返回数据(函数返回数据)
Mock.mock(/\/my\/test/, 'get', () => {
  // 随机数据逻辑 目标 5条数据 [{id:'',name:''},...]
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(
      Mock.mock({
        id: '@id',
        name: '@name',
        image: '@image(200*100)'
      })
    )
  }
  return { arr }
})

// 模拟 我的收藏
Mock.mock(/\/member\/collect/, 'get', () => {
  const counts = 35
  return {
    counts,
    pageSize: '',
    page: '',
    item: []
  }
})
