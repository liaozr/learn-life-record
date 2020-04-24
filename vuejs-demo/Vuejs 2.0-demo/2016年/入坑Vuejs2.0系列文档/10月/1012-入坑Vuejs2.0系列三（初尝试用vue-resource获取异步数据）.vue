<template>
  <div class="main">
      this message come from details.vue
      <router-link to= "/" >
          come from home
      </router-link>

      <div class="douban">
       <ul>
         <li v-for="article in articles">
           {{article.title}}
         </li>
       </ul>
      </div>
  </div>
</template>

<!-- ---------------------------------------------------------------------------- -->

Evan You  尤大说将来会取消 vue-resource的官方推荐的
（message by Evan You, time: 2016-10-14）

最近团队讨论了一下，Ajax 本身跟 Vue 并没有什么需要特别整合的地方，使用 fetch polyfill
或是 axios、superagent 等等都可以起到同等的效果，vue-resource 提供的价值和其维护成本相比并不划算，
所以决定在不久以后取消对 vue-resource 的官方推荐。
已有的用户可以继续使用，但以后不再把 vue-resource 作为官方的 ajax 方案。

这里可以去掉 vue-resource，文档也不必翻译了。

<!-- ------------------------------------------------------------------------------- -->

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
