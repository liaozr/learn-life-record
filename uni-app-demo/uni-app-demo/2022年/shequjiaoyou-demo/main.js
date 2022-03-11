import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入配置文件
import $config  from './common/config.js'
Vue.prototype.$config = $config

// 挂载助手函数库
import $utils  from './common/utils.js'
Vue.prototype.$utils = $utils

import store from './store/index.js'
Vue.prototype.$store = store

// 权限验证操作
Vue.prototype.permission = (callback) =>{
  // 权限验证
  if(!store.state.loginStatus){
	  console.log('请先登录')
	  uni.showToast({
		title:"请先登录",
		icon:"none"
	  })
	  return uni.navigateTo({
	  	url:"/pages/login/login"
	  })
  }
}


const app = new Vue({
    ...App,
	store
})
app.$mount()
