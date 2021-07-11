// 配置文件一旦修改，重新启动服务
// node.js 自带的，而 webpack 是运行在 node.js 下的，所以可以使用
const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 那些文件自动引入，使用绝对路径
      // 需要使用 path.join 来拼接完整的路径
      patterns: [path.join(__dirname, './src/assets/styles/variables.less'), path.join(__dirname, './src/assets/styles/mixins.less')]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
    // 这个是给webpack-dev-server开启可IP和域名访问权限。
    config.devServer.disableHostCheck(true)
  },
  // 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}
