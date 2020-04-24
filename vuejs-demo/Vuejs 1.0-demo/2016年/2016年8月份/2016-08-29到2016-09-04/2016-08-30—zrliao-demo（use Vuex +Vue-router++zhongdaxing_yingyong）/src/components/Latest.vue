
<!--
 Latest.vue就是最近7天待还子组件，
它获取近7天待还账单列表，并在下一级子组件(order)中渲染组件列表。
组件获取store的数据是通过getter来实现的。
-->

<template>
 	<div class="container-fluid">
 		<ul class="list-unstyled row">
 			<order></order>	
 		</ul>
 	</div>
</template>
<script type="text/javascript">
 	import { showDetail } from '../vuex/actions'
 	import Order from './Order'

 	export default {
 		data(){
 			return{

 			}
 		},
 		components:{
 			Order
 		},
 		vuex:{
 			//解构函数，{orderList}对象指的是store的orderList模块的state.orderList
 			// state.orderList
 			getters:{
 				orders:({orderList}) =>orderList.orders
 			},
 			// 注入actions
 			actions:{
 				showDetail
 			}
 		}
 	}
</script>