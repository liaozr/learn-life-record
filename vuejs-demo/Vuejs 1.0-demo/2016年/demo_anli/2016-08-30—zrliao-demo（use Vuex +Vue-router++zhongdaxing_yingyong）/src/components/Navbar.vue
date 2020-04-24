
<template>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<a class="navbar-brand" href='##' v-link="{ path:'/' }"> vue-订单demo</a>
			</div>
		</div>
		<div class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li v-link="{ path:'/latest',activeClass:'active' }">
					<a href="#!">折7天待还 <span class='sr-only'>{{ current }}</span></a>
				</li>

				<li @click='golist'>返回全部待还</li>

				<!-- <li v-link="{ path:'/latest',activeClass:'active' }">  跟这个的写法是一样的。-->
				<li v-link="{name:'all',activeClass:'active' }">
					<a href="#!">全部待还</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script type="text/javascript">
	export default{
		vuex:{
			getters:{
				current:({orderList}) =>orderList.activeOrder
			}
		},
		methods:{
             golist() {
             	this.$route.router.go({name:'all'})
             }
		}
	}
</script>