<template>
	<div class="com-list">
		<div class="title">推荐</div>
		<ul >
			<li class="list-li" v-for="(value,key) in listdata">
				<div class="user">
					<img :src="value.userIcon" alt=""/>
					<div class="name">
						<p>{{value.name}}</p>
						<div class="tag">
							<span v-for="item in value.tag">{{item}}</span>
						</div>
					</div>
					<!-- <router-link :to="{  name: 'article', params: { id: value.articleId,uid:{a:123,b:123}}}" class="btn-d btn-s" >详情</router-link> -->
					<router-link to='/' class="btn-d btn-s">详情</router-link>	
				</div>

				<div class="detail">
					<p>{{value.detail}}</p>
					<ul :class="['clearfix','img-box',{r3:value.imgGrounp.length>1?true:false}]">
						<li v-for="item in value.imgGrounp">
							<img :src="item">
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>

 	import '../css/list.scss'
 	import { mapGetters } from 'vuex'

	export default{
		data:function(){
			return {

			}
		},
		computed:{
			...mapGetters(['listdata']) 
		},
		methods:{

		}
	}
</script>