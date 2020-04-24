
import { SHOW_DETAIL } from '../mutation-types' 
// 该模块的初始状态 
const state = { 
	orders:[
	  { 
		  id: 'aedf9c25', 
		  tradeDate: '2016.04.08',
		  name: 'Nike跑步鞋青年版',
		  totalPrice: 888, 
		  repayDate: '2016.08.08', 
		  capital: '880', 
		  interest: '5.5', 
		  extra: '2.5', 
		  type: '消费', 
		  currentTerm: 1, 
		  totalTerms: 1 
	  }, 
	  { 
	     id: 'cves9chs',
	     tradeDate: '2016.04.10',
	     name: '支付宝提现',
	     totalPrice: 773.5, 
	     repayDate: '2016.08.10', 
	     capital: '769', 
	     interest: '4.5', 
	     extra: '0', 
	     type: '现金', 
	     currentTerm: 1, 
	     totalTerms: 4 
	   }, 
	   {
	     id: 'deef1d3g', 
	     tradeDate: '2016.05.15',
	     name: '喜洋洋抱枕', 
	     totalPrice: 204.8, 
	     repayDate: '2016.08.15', 
	     capital: '203.5', 
	     interest: '1.3', 
	     extra: '0', type: '消费', 
	     currentTerm: 2, 
	     totalTerms: 3 
	   }
    ],
    activeOrder: {

    },
    currentmoney:3000
} 


// 相关的 mutations
const mutations = {
	[SHOW_DETAIL] (state, id) { 
		state.activeOrder = state.orders.find(function(ele) { //ele是 state.orders这个数组的每个数组成员
	    // ele.id则代表的是state.orders这个数组里面的各个成员（元素）的id值
		 return ele.id == id;   //在Order.vue组件里把actions showDetail(order.id) 传过来
		 // 返回值若为true的话，则代表的是 把Order这个组件里当前点击的这个数组成员 赋值给 state.activeOrder,
		 // 这样，state.activeOrder的值就是 组件Order当前点击的这个这个数组元素
		}); 
	} 
} 

// state.orders.find()是 ES6的数组语法
// 数组实例的find()：用于找出第一个符合条件的数组成员。
// 它的参数是一个回调函数，所有数组成员依次执行该回调函数，

// 直到找出第一个返回值为true的成员，然后返回该成员。（！！！这句话是个重点）
// 直到找出第一个返回值为true的成员，然后返回该成员。（！！！这句话是个重点）

// 如果没有符合条件的成员，则返回undefined。

export default { 
	state, 
	mutations 
}


