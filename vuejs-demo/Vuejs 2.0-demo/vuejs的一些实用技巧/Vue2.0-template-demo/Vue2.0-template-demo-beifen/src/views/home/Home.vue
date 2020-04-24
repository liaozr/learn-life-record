<template>
   <div class="app">

       <cHeader></cHeader>

       <div class="content">
             <div class="msg2">
                 {{msg}}
             </div>
             <div class='f'>
                 <div class="left">float left</div>
                 <div class="right">float right</div>
             </div>
             <!-- 测试 keep-alive 的缓存效果 -->
             <!-- 
             经测试，如果是不做任何状态改变的话，
             在input表单上输入一个值，这个组件切换出去后，在切换回来，这个值还是存在这个input标签上的 ，因为被缓存了。
              -->
             <input type="text" v-model='content'>

             <div class="goto"></div>
             <!-- <router-link tag='div' :to="{name:'homeDetail'}" >去home组件的二级页面</router-link>   -->
             <div @click='gotoHomeDetail'>去home组件的二级页面</div>

             <li class="iconfont icon-1"></li>
             <!-- <li class="iconfont">&#xe600;</li> -->

             <router-link :to="{name:'homechild'}">显示 home的子组件</router-link>
             
             <router-view></router-view> 
       </div>

    </div> 
</template>

<script>

  import cHeader from '@c/header/header'
  export default {
    data(){
      return{
         msg:'this msg come from Home component be came sass',
         content:''
      }
    },
    components:{
      cHeader
    },
    mounted(){
      // alert('这个是keep-alive缓存组件，这个弹框只会执行一次的')
      console.log("this message come from mounted钩子，在keep-alive缓存的组件下，只会执行一次的")
    },
    // keep-alive下，方法之一
    activated(){
      console.log('this message come from activated钩子，在keep-alive缓存的组件下，依然每次进入到这个组件时还是会执行的')

      // 有效，content值可以被清空
      // this.content=''
    },
    // keep-alive下，方法之二
    beforeRouteEnter(to,from,next){

        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建

        next(vm =>{
            // vm.$store.dispatch("comm_conf",settings);
            console.log("组件又进来了");
            vm.gitlists();
        })
    },
    methods:{
       gitlists(){
          console.log('缓存组件下，每次进入到该组件后，要执行的一些方法。')
       },
       gotoHomeDetail(){
           this.$router.push({
               name:'homeDetail'
           })
           this.$store.dispatch('slideLeft')

           console.log(window.history.length)
       }
    }
  }
</script>

<style lang='scss' scoped> 
   
   .left{
     @include float(left,20px)
   }
   .right{
      @include float(right,20px)
   }
   .f{
    @include clearfix
   }
</style>

  