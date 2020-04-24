<template>
	<ul> 
		<li v-for='topiclist in gettopiclist'> 
			<a href="" class="topic_article_img">
				<img :src="topiclist.img">
			</a> 
			<div class="topic_content"> 
				<h5 v-text='topiclist.title'></h5>
				<p v-text='topiclist.par'></p> 
				<div class="topic_button"> 
					<a href="#"><i class="fa fa-fw fa-plus"></i><span>添加关注</span></a> </div> <p> <a href="#" style="color:#4094c7">{{topiclist.number}}篇文章</a> &nbsp;&nbsp;·&nbsp;&nbsp;{{topiclist.concern}}k人关注 <span class="topic_tag"><i class="fa fa-tags"></i>{{topiclist.keys}}</span> </p> 
				</div>
		</li>
   </ul>

</template>

<script>
	import { mapGetters} from 'vuex'
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			...mapGetters(['gettopiclist'])
		}
	}
</script>


<style></style>


 