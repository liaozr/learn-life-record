// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// 全局注册底部footer
import pagefooter from '@/components/footer'
Vue.component('pagefooter', pagefooter)

// filters
import './filters'
Vue.config.productionTip = false

// 滚动动画 wow.js
require('animate.css/animate.min.css')
import { WOW } from 'wowjs'
Vue.prototype.$wow = new WOW({
  boxClass: 'wow', // default
  animateClass: 'animated', // default
  offset: 80, // default
  mobile: true, // default
  live: false,
  // live为true时，控制台会提示：MutationObserver is not supported by your browser. & WOW.js cannot detect dom mutations, please call .sync() after loading new content.
  callback: function(box) {
  }
})

// 百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
// ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: ''
})

// 二维码
import VueQrcode from '@chenfengyuan/vue-qrcode'
Vue.component(VueQrcode.name, VueQrcode)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
