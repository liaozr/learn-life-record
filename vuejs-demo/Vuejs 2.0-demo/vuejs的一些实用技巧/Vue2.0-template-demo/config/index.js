// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8090,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/eidpws': {
            target:'http://103.236.252.138:900',
            // target:'http://192.168.1.91:8090',
            // target:'http://192.168.1.145:900',
            changeOrigin: true,
            pathRewrite: {
              '^/eidpws': ''
            }
       },
       '/api': {
            target:'http://api.douban.com/v2',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
       }
    },
    // dev 开发模式下可以下使用webpack 的 proxy使用也是很方便的看一下文档就会使用了，楼主一些个人项目使用的该方法。
    // 但这种方法在生成环境是不适用的。在生产环境中需要使 用Nginx反向代理 不管是 proxy 和 nginx 的原理都是一样的通过搭建一个中转服务器来转发请求规避跨域的问题。

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
