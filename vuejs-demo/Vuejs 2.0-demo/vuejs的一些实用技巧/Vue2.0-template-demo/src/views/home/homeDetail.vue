<template>
   <div class="homeDetail">
      <cHeader></cHeader>
      <div  v-show="!showloading && !errorFlag" class="content">
          <div>
              <div class="list">
                  <ul class="liebiao" v-show='items.length >0 ' v-for='(item,index) in items' :key='item.id' @click='gotoDetails(item)'>
                     <li>{{item.sitesRecord.sitesAddr}}</li>
                     <li>{{item.sitesRecord.stateName}}</li>
                     <li>{{item.sitesRecord.viliageName}}</li>
                     <li>{{item.sitesSchedule.nodeName}}</li>
                  </ul>
              </div>
               <div class="loading-wrapper"></div>
          </div>
      </div>
      <loading v-show="showloading"></loading>
      <error v-show="!showloading && errorFlag" ></error> 

   </div>
</template>

<script>

    import cHeader from '@c/header/header'
    import  mixin from  '@m/index'

    import '../../../static/js/jquery.cookie'

    import * as eidpws_types from '@a/eidpws'
    // 从vuex 里面导入
    import { mapGetters } from 'vuex'
    import loading from '@c/loading/loading'

    import error from '@c/error/error'

    export default {
      mixins: [mixin],
      data(){
        return{
           showloading:true,
           errorFlag:false,
           items:[]
        }
      },
      components:{
          cHeader,
          loading,
          error
      },
      methods:{

        gitlists(){
            var gongdicanshu={
                  empId:this.getUserInfo.userName,
                  searchValue:'',
                  pageNo:10,
                  area:'',
                  branchList:[],
                  stateList:[10,20,30,40],
                  filterType:'10'
            }
            var _this=this;
            // 运用 async await 特性请求数据
            async function gongdiLists(){
                return await eidpws_types.gongdiLists(gongdicanshu)
            }
            gongdiLists().then(function(res){
                console.log("请求华美乐工地列表数据")
                _this.showloading=false;
                _this.items=res.data;
                console.log(res)
            }).catch(function(){
              
               _this.showloading=false;
               _this.errorFlag=true;
               console.log('错误了')
            })
        },
        gotoDetails(item){
          this.$router.push({
             name:'homesan',
             params:item
          })
        }
      },
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
      computed:{
        ...mapGetters(['getUserInfo'])
      },
      watch: {

        '$route'(to, from) {
            console.log(to);
            console.log(from);
         }
      },
      mounted(){

          // 为什么这里在 created 这个钩子函数里请求数据而不是放到 mounted 的钩子函数里？因为 requestData 是发送一个网络请求，这是一个异步过程，当拿到响应数据的时候，Vue 的 DOM 早就已经渲染好了，但是数据改变 —> DOM 重新渲染仍然是一个异步过程，所以即使在我们拿到数据后，也要异步初始化 better-scroll。

         // this.$nextTick(() => {
         //    this.scroll = new Bscroll(this.$refs.wrapper, {})
         // })

         // Vue.js 提供了我们一个获取 DOM 对象的接口—— vm.$refs。在这里，我们通过了 this.$refs.wrapper 访问到了这个 DOM 对象，
         // 并且我们在 mounted 这个钩子函数里，this.$nextTick 的回调函数中初始化 better-scroll 。

         // 因为这个时候，wrapper 的 DOM 已经渲染了，我们可以正确计算它以及它内层 content 的高度，以确保滚动正常。

         // 这里的 this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染，感兴趣的同学可以了解一下它的内部实现细节，底层用到了 MutationObserver 或者是 setTimeout(fn, 0)。其实我们在这里把 this.$nextTick 替换成 setTimeout(fn, 20) 也是可以的（20 ms 是一个经验值，每一个 Tick 约为 17 ms），对用户体验而言都是无感知的。

         $.cookie('name', 'value');
      }
    }

</script>
<style lang="scss" scoped>

   .list{
      .liebiao{
        background-color:#ccc;
        margin-bottom: 20px;
        width:100%;
        height:auto;
        @include calc(height,'100% - 10px' )
      }
      
      li{
        width:100%;
        height:rem(60);
        line-height: rem(60);
        @include fontsize  
        @include color(#666666)
      }
   } 

</style>
