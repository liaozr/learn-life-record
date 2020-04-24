// 账单组件的路由包括“最近7天待还”以及“全部待还”，router.js:


// export default function(router) { 
// 	router.map({ 
// 		'/': { 
// 			 component: require("./components/Latest"),
// 			 linkActiveClass: 'active'
// 	    }, 
// 	    '/latest': { 
// 	        component: require("./components/Latest"), 
// 	        linkActiveClass: 'active' 
// 	    },
// 	    '/all': {
// 	     component: require("./components/All"), 
// 	     linkActiveClass: 'active' } 
// 	})
// }


export default function(router) { 
	router.map({ 
	 	'/': {
			 name:'latest', 
			 component: function (resolve) {
					require(['./components/Latest'], resolve) 
			 },
			 linkActiveClass: 'active'
	    }, 
	    '/latest': { 
	    	name:'latest',
	        component: function (resolve) {
					require(['./components/Latest'], resolve) 
			},
	        linkActiveClass: 'active' 
	    },
	    '/all': {
	    	name:'all',
	        component: function (resolve) {
					require(['./components/All'], resolve) 
		 },
	     linkActiveClass: 'active' } 
	})
}


// router.js这个文件可以参考下例的做法

// import Vue from 'vue'
// import VueRouter from 'vue-router'

// import App from './App'
// import { User, UserEdit } from './components'

// Vue.use(VueRouter)
// const router = new VueRouter()

// router.map({
//   '/': {
//     name: 'home',
//     component: User
//   },
//   '/user': {
//     name: 'user',
//     component: User
//   },
//   '/user/edit/:id': {
//     name: 'userEdit',
//     component: UserEdit
//   }
// })
// export default router