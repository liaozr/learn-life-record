<template>
	<div class="sidebar"> 
		<ul class="dropdown"> 
			<li> 
			  <a v-link="{name:'article',activeClass:'active'}">
			    <i class="fa fa-home"></i>
				<span>&nbsp;&nbsp;首页</span>
			  </a> 
			</li>

			<li> 
			   <a v-link="{name:'topicarticle',activeClass:'active'}" class="v-link-active">
			   <i class="fa fa-th"></i><span>&nbsp;&nbsp;专题</span></a>
		    </li> 

			<li><a v-link="{name:'download',activeClass:'active'}"><i class="fa fa-mobile"></i><span>&nbsp;&nbsp;下载手机应用</span></a></li> 
		</ul> 

		<ul class="nav-user dropdown"> 
		   <li><a v-link="{path:'/'}"><i class="fa fa-font"></i><span>&nbsp;&nbsp;显示模式</span></a></li> 
		   <li><a v-link="{name:'login'}"><i class="fa fa-sign-in"></i><span>&nbsp;&nbsp;登录</span></a></li> 
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