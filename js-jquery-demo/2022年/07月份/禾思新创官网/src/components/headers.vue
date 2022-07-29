<template>
	<div class="flex-center-center bg-fff sticky">
		<div class="headers flex-center-between w1400">
			<div class="logo" @click="$router.push('/home')">
				<img src="@/assets/logo.png" alt="logo" />
			</div>
			<div class="nav flex-center">
				<div class="item">
					<router-link to="/home">首页</router-link>
				</div>
				<div class="item">
					<router-link to="/about">关于禾思新创</router-link>
				</div>
				<div class="item">
					<router-link to="/service">服务项目</router-link>
				</div>
				<div class="item">
					<router-link to="/ceses">客户案例</router-link>
				</div>
				<div class="item">
					<router-link to="/news">新闻中心</router-link>
				</div>
				<div class="item">
					<router-link to="/tools">工具资源</router-link>
				</div>
				<div class="item">
					<router-link to="/contact">联系我们</router-link>
				</div>
				<div class="login">
					<a href="https://home.ttb2c.com" target="_blank">登录</a>
				</div>
			</div>
		</div>
		<!-- 回到顶部 -->
		<div v-show="windowScrollTop > 450" class="back-top" @click="backTop">
			<img src="@/assets/back-top.png" alt />
		</div>
	</div>
</template>
<script>
export default {
	name: 'Headers',
	data() {
		return {
			windowScrollTop: 0, // 距离顶部位置
		};
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll, true);
	},
	methods: {
		handleScroll() {
			const top = document.documentElement.scrollTop;
			this.windowScrollTop = top;
		},
		backTop() {
			window.scrollTo({
				top: 0, // 需要滚动的距离
				behavior: 'smooth', // 平滑滚动到顶部
			});
			// const timeInterval = setInterval(()=>{
			//   const top = document.documentElement.scrollTop;
			//   if(top > 0){
			//     document.body.scrollTop = document.documentElement.scrollTop = top - 200;
			//   }else{
			//     clearInterval(timeInterval);
			//   }
			// }, 10);
		},
	},
};
</script>
<style lang="scss" scoped>
@media (max-width: 980px) {
	.headers {
	}
}
.sticky {
	position: sticky;
	top: 0;
	left: 0;
	z-index: 99;
}
.headers {
	// max-width: 1200px;
	width: 100%;
	overflow-x: auto;
	margin: 0 auto;
	font-size: 14px;
	background: #ffffff;
	height: 80px;
	z-index: 99;
	.router-link-active {
		position: relative;
		&::after {
			content: '';
			position: absolute;
			bottom: -10px;
			left: 50%;
			transform: translateX(-50%);
			display: inline-block;
			width: 20px;
			height: 3px;
			background: #3269ff;
			border-radius: 2px;
		}
	}
	.logo {
		padding-top: 8px;
		img {
			width: 95px;
			height: 100%;
			cursor: pointer;
		}
	}
	.nav {
		.item {
			margin-left: 1rem;
			font-size: 1.16rem;
			padding: 1rem;
			flex: 0 0 auto;
			&:hover {
				color: $primary;
			}
		}
	}
}
.back-top {
	position: fixed;
	right: 50px;
	bottom: 50px;
	cursor: pointer;
	z-index: 99;
	img {
		width: 30px;
		height: 30px;
	}
}
.login {
	padding: 5px 30px;
	border: 1px solid #999;
	border-radius: 20px;
	margin-left: 40px;
	cursor: pointer;
	&:hover {
		border-color: #3269ff;
		color: #3269ff;
	}
}
</style>
