<template>
<li class='bill' v-for='order in orders' @click='showDetail(order.id)' track-by='id'>
	<div>
		<h4>{{order.name}}</h4>
		<p>待还
		<span class="text-danger"> {{order.totalPrice}}</span>元		
		<span><small> [{{order.currentTerm}}/{{order.totalTerms}}]</small></span>
		</p>
	</div>
	<div>{{currentmoney}}元</div>
	<!-- v-show='order.id==activeOrder.id'   这里是通过  @click='showDetail(order.id)' -->
	<!-- 这里是通过  @click='showDetail(order.id)' 通过mutations改变了 store.js里  state.activeOrder 的状态 -->
	<!-- 在通过 getters activeOrder  从store仓库里面获取到orderList.activeOrder 的状态   -->
	<div class="bill-detail" v-show='order.id==activeOrder.id' transition='fade'>
		<p>
			<div class="order-item">最后还款日期：{{order.repayDate}}</div>
			<div class="order-item">交易类型期：{{order.type}}</div>
			<div class="order-item">应还本金：{{order.capital}}元</div>
			<div class="order-item">应还利息：{{order.interest}}元</div>
			<div class="order-item">手续费：{{order.extra}}元</div>
			<div class="order-item">交易日期：{{order.tradeDate}}</div>
		</p>
	</div>
</li>
</template>

<script type="text/javascript">
	import { fold, showDetail } from '../vuex/actions'
	import { orders, activeOrder, currentmoney } from '../vuex/getters'
	export default {
		data() {
			return{

			}
		},
		vuex:{
			
			// 这个是第一种 getters的写法
			// getters:{
			//  //解构函数，{orderList}对象指的是store的orderList模块的state.orderList
			// 	orders:({orderList}) =>orderList.orders,
			// 	activeOrder:({orderList}) => orderList.activeOrder,
			// 	currentmoney:( {orderList} ) => orderList.currentmoney
 		    // 	},

            // 这个是第二种getters的写法
 			// getters:{
 			// 	orders: state =>state.orderList.orders,
				// activeOrder:state => state.orderList.activeOrder,
				// currentmoney:state => state.orderList.currentmoney
 			// },
            
            // 这个是第三种getters的写法
 			getters:{
			    orders,
			    activeOrder,
			    currentmoney
 			},
			actions:{
				showDetail
			}
		}

	}

// getters 子对象。
// 它是我们指定当前组件能从 store 里获取哪些状态信息的地方。
// 它的每个属性名将对应一个 getter 函数。
// 该函数仅接收 store 的整个状态树作为其唯一参数，
// 之后既可以返回状态树的一部分，
// 也可以返回从状态树中求取的计算值。
// 而返回结果，则会依据这个 getter 的属性名添加到组件上，
// 用法与组件自身的计算属性一毛一样。

</script>
 