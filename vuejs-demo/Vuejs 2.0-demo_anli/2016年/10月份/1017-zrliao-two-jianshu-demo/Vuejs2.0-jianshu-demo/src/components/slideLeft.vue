<template>
	<div class="sidebar"> 
		<ul class="dropdown"> 
			 <router-link tag='li' to='/index/article'>
				  <a>
				    <i class="fa fa-home"></i>
					<span>&nbsp;&nbsp;首页</span>
				  </a> 
			 </router-link>

		     <router-link tag='li' to='/topic/articleTopic'>
				  <a>
				    <i class="fa fa-th"></i>
					<span>&nbsp;&nbsp;专题</span>
				  </a> 
			</router-link>

			<router-link tag='li' to='/download'>
				  <a>
				    <i class="fa fa-mobile"></i>
					<span>&nbsp;&nbsp;下载手机应用</span>
				  </a> 
			</router-link>
		</ul> 

		<ul class="nav-user dropdown"> 
		   <router-link tag='li' to='/'>
				  <a>
				    <i class="fa fa-font"></i>
					<span>&nbsp;&nbsp;显示模式</span>
				  </a> 
		   </router-link>
		   <router-link tag='li' to='/login'>
				  <a>
				    <i class="fa fa-sign-in"></i>
					<span>&nbsp;&nbsp;登录</span>
				  </a> 
		   </router-link>
 		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return{

			}
		},
		components:{

		}
	}
</script>

<style>
	
</style> 