import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router' 
import VueResource from 'vue-resource'
 

 
 

//注册两个插件 
Vue.use(VueResource) 
Vue.use(VueRouter) 

const router = new VueRouter() 

// 路由map 
// 调用router的map方法映射路由，每条路由以key-value的形式存在，key是路径，value是组件。
// 例如：'/home'是一条路由的key，它表示路径；{component: Home}则表示该条路由映射的组件。
router.map({ 
	 '/index':{
	 	component:App
	 }
}) 


// router.redirect方法用于为路由器定义全局的重定向规则，全局的重定向会在匹配当前路径之前执行。
router.redirect({ 
	 '*':'/index'
}) 

router.start(App, '#app')
 
 
