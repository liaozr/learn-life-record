const path = require('path')
const server = require('./server')

function resolveDev(dir) {
  return path.join(__dirname, '../src/', dir)
}

function resolveBuild(dir) {
  return path.join(__dirname, '../dist/', dir)
}

module.exports = {
  dev: {
    static: './static/**/*',
    html:  [resolveDev('/**/*.html'), '!./src/include/**/*'],
    allhtml: resolveDev('/**/*.html'),
    styles: resolveDev('static/styles/*.{scss,css}'),
    script: resolveDev('static/js/**/*.js'),
    images: resolveDev('static/images/**/*.{png,jpg,gif,svg}'),
  },

  build: {
    static: resolveBuild('static'),
    html: resolveBuild(''),
    styles: resolveBuild('static/css'),
    script: resolveBuild('static/js'),
    images: resolveBuild('static/images'),
  },

  zip: {
    name: 'gulpProject.zip',
    path: resolveBuild('**/*'),
    dest: path.join(__dirname, '../')
  },

  server,
  // useWebpack: false,
  useWebpack: true,  // 开启 webpack 的引用 ，默认是false 的
  productionZip: false
}
