
// 项目的公共组件，为了后期维护的好找，所有的组件都得写上 组件名字，方便查找

// ---------------------------------------------------------------------------------------------------

//heredoc方法输出注释中的组件代码
function heredoc(fn){
  return fn.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
}

// ---------------------------------------------------------------------------------------------------

//loading组件
document.write(heredoc(function(){
/*
<style>
</style>

<script type="text/x-template" id="c">
  <div class="loader">
       <div class="loader-inner ball-spin-fade-loader">
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
       </div>
   </div>

</script>

<script>
    Vue.component('loading',{
      template: "#c",
      data: function () {
        return {
            todo:2
        }
      }
    })
</script>

*/})) // 这里不能换行，否则会报错

// ---------------------------------------------------------------------------------------------------


//头部组件
document.write(heredoc(function(){
/*
<script type="text/x-template" id="head">

   <div class="mui-bar mui-bar-nav header">
       <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
       <span class="title">{{title}}</span>
   </div>

</script>
 <script>
    Vue.component('chead',{
      template: "#head",
      data: function () {
        return {
        }
      },
      props:['title']
    })
</script>

*/})) // 这里不能换行，否则会报错

// ---------------------------------------------------------------------------------------------------
