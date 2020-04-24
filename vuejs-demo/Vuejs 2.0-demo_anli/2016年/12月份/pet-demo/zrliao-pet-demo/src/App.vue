<template>
  <div id="app">

    <div class="com-app-box">
        <cheader :commData="commConf"></cheader>
        <div class="com-app">
             <transition :name="transitionName" >
                 <keep-alive>
                      <router-view class="child-view"></router-view>
                 </keep-alive>
             </transition>
        </div>
        <com-footer v-show="$route.name !== 'homeUserInfo' && $route.name !== 'myPet' && $route.name !== 'addPet'"></com-footer>
        
        <!-- 这个日历组件功能未涉及到，所以暂时先隐藏 -->
        <!--  <com-calendar :style = "calendar"></com-calendar> -->

        <com-loading v-if="loading"></com-loading>

        <div v-show  = "mark" class="mark" @touchmove.stop.prevent ="" @touchstart.stop.prevent =""  @touchend.stop.prevent =""></div>

    </div>
  </div>
</template>


<script>
 
    import cheader from './components/cheader'
    import comFooter from './components/footer'
    import comLoading from './components/loading'
    
    import './css/icon/iconfont.css'
    import './css/app.scss'
    import './css/style.scss'
  

    import { mapGetters } from 'vuex'
    export default {
      data() {
        return{
            transitionName: 'slide-left'
        }
      },
      created(){
          if(this.$route.name==undefined){
              this.$router.push({name:'index'});
          }
      },
      mounted(){
        // var self=this;
        // setTimeout(function(){
        //   self.$router.push({name:'home'})
        // },500)
      },
      watch: {
           //  这个监听路由功能暂时未知，有待进一步的开发学习
          '$route' (to, from) {
              const toDepth = to.path.split('/').length;
              const fromDepth = from.path.split('/').length;
              this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
          }
      },
      components:{
          cheader,
          comFooter,
          comLoading
      },
      computed:{

          // 可以是这种写法
          // commConf:function () {
          //    return  this.$store.state.comm.commsettings;
          // }

          // 也可以直接这样写的
          ...mapGetters(['commConf','loading','mark']),
          
          // loading的写法也可以是下面的这种写法的
          // loading:function(){
          //    return this.$store.state.comm.commsettings.loading
          // }
      }
    }
</script>

 
