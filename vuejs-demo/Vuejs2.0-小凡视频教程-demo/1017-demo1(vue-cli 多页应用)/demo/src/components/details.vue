<template>
   <div class="main">
   	   this message come from details.vue
   	   <router-link to= "/" >
   	   	   come from home
   	   </router-link>

   	   <div class="douban">
		    <el-card class="box-card">
			    <div slot="header" class="clearfix">
			        <h1 style="line-height: 36px; color: #20A0FF">豆瓣电影排行榜</h2>
			    </div>
			    <div v-for="article in articles" class="text item">
			        {{article.title}}
			    </div>
			</el-card>
   	   </div>
   </div>
</template>

<script>
	export default{
		data() {
			return{
             articles:[]
			}
		},
		// 这里使用的是豆瓣的公开 GET 接口，如果接口是跨域的 POST 请求，则需要在服务器端配置:
		// Access-Control-Allow-Origin: *
		mounted: function() {
			this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
				headers: {

				},
				emulateJSON: true
			}).then(function(response) {
			// 这里是处理正确的回调

			this.articles = response.data.subjects
			// this.articles = response.data["subjects"] 也可以

			}, function(response) {
			// 这里是处理错误的回调
			console.log(response)
			});
		}
	}
</script>