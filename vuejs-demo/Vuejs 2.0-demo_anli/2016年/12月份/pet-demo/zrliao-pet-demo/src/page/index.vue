<template>
     <div class="index">

        <img-scroll></img-scroll>

        <div class="center">
            <a class="list"><span class="icon-sheshixiaomao iconfont icon"></span><p>猫</p></a>
            <a class="list"><span class="icon-sheshixiaogou iconfont icon"></span><p>狗</p></a>
            <a class="list"><span class="icon-yangyouchongwu iconfont icon"></span><p>其他</p></a>
        </div>
        <com-list></com-list>
    </div>
</template>



<script>
  import imgScroll from '../components/imgScroll'
  import comList from '../components/list'

  import'../css/index.scss'
  
  import { mapGetters } from "vuex"

  export default{
    data(){
      return{
          data:'index',
          num:1,
          imgData:{}
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      /*
      *
      *分发
      * */
      var vm = this;
      if( vm.$store.state.index.shouye.imgs.length == 0){

           // 刚创建首页的时候，让其loading变为true,就是让其显示loading,好让其加载数据
           vm.$store.dispatch('comm_conf',{
                isFooter:true,
                isSearch:true,
                loading:true,
                isBack:false,
                isShare:false,
                title:''
           });
           
           vm.$store.dispatch('indexGetList').then(function () {
               vm.$store.dispatch('indexGetImg');
           },500);
      }
    },
    components:{
      imgScroll,
      comList
    }
  }

</script>