<template>
     <div id="axios">
         <cHeader></cHeader>
         <div class="content">
             <div v-if='!showloading' class="section">
                   <swiper :options="swiperOption" ref="mySwiper">
                        <!-- slides -->
                        <!-- 
                          强烈建议永远在v-for处理列表数据时，加上:key="item.id"!!!
                          v-for="skill in pskills" :key="skill.id" 
                          不然，vue会有警告的。
                         -->
                        <swiper-slide v-for='item in imglist' :key="item.id">
                           <img :src="item.img">
                        </swiper-slide>
                        <!-- Optional controls -->
                        <div class="swiper-pagination"  slot="pagination"></div>
                        <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
                   </swiper>

                   <!--   <div>来自于vuex的fetch数据: {{countfetch}}</div>

                   <button @click="fetchTopicsData">{{isFetching?'正在加载...':'点击请求'}}</button> -->
                   <!---->

                  <div v-show='zhezhao' @touchmove.prevent class="layer">
                       <ul>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li><li>1</li>
                        <li>1</li><li>1</li><li>1</li><li>1</li><li>1</li><li>1</li>
                       </ul>
                  </div>

                  <div style='font-size:0.5rem;margin:30px;' @click='dianji' class="dianji">点击出现遮罩层</div>

                   <div v-for='item in mockdata2'>
                     {{item.name}}
                   </div>
                   <div @click='fetchTopicsData' style='color:green;'>请求vue 里面的数据</div>
                   <ul>
                        <li v-for="list in data">
                            {{list.title}}
                        </li>
                   </ul>

                   <div v-for='item in moviedata.subjects'>
                       {{item.title}}
                   </div>

             </div>

             <loading v-show="showloading"></loading>
          </div>
     </div>
</template>

<script>

    // 从api文件中导入所需模块

    // import { gongdiMember,tongzhi_gonggao,fetchMoviesByType,indexGetList,indexGetImg} from '../api/api';

    // 从api.js导出 用 export 定义的各个模块，可以用上面的那种方式依次导入，但是如果存在导出多个模块的话
    // 上面那种写法看起来就非常的不优雅了，解决办法是用  import * as types from '../api/api' 这个方式导入模块
    // 统一把api.js里面的各个模块导入到 types这个 对象里面，然后如何导出呢，当然是用 types.xxx 导出各个模块即可。

    // import * as types from '../api/api'

    // import * as api_types from '../api/module1/api'
    // import * as eidpws_types from '../api/module2/eidpws'


    import cHeader from '@c/header/header'

    import * as api_types from '@a/module1/api'
    import * as eidpws_types from '@a/module2/eidpws'
    
    // 从vuex 里面导入
    import { mapGetters } from 'vuex'

    import loading from '@c/loading/loading'

    export default {
        name: 'axios',
        data() {
          return{
          	member:[],
            vuedata:[],
            indexGetList:[],
            imglist:[],
            mockdata2:[],
            showloading:true,
            swiperOption: {
                // notNextTick是一个组件自有属性，如果notNextTick设置为true，
                // 组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，
                // 假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                notNextTick: true,
                // swiper configs 所有的配置同swiper官方api配置
                autoplay: 3000,
                direction : 'horizontal',
                grabCursor : true,
                setWrapperSize :true,
                autoHeight: true,
                pagination : '.swiper-pagination',
                paginationClickable :true,
                mousewheelControl : true,
                observeParents:true,
                // if you need use plugins in the swiper, you can config in here like this
                // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                debugger: true,
                // swiper callbacks
                // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
                onTransitionStart(swiper){
                  console.log(swiper)
                }
            },
            moviedata:[
            ],
            clickFlag:true,
            zhezhao:false
          }
        },
        components:{
          loading,
          cHeader
        },
        methods:{
           dianji(){
             this.zhezhao=true;
           },
           gitmockdata(){
              var _this=this;
              api_types.indexGetList()
                  .then((data) => {
                      console.log("list数据")
                      setTimeout(function(){
                         _this.showloading=false;

                      },500)
                      this.mockdata2=data;
                      return data
              }).then( (data)=>{
                  console.log('list数据2222')
                  console.log(data)
              })

           },
           fetchTopicsData(){
               var _this=this;
               if(!this.clickFlag){
                  alert(22)
               }else{
                   this.clickFlag=false;
                   var vuedata={
                   }

                   // this.$store.dispatch('fetchTopics',vuedata);

                   // 也还可以这样子 dispatch 分发 fetchTopics 这个actions, 完了之后 还会有个回调事件。
                   this.$store.dispatch('fetchTopics',vuedata).then(function(resp){
                       console.log(resp)
                       _this.clickFlag=true
                   })
               }
           },
           movieQingqiu(){

              var moviecanshu={
                start:0,
                count:20
              }

              api_types.fetchMoviesByType(moviecanshu)
                  .then((data) => {
                      console.log(data)
                      this.moviedata=data;
                      console.log('movie 请求成功')
              });

           },
           gitlists(){
              console.log('缓存组件下，每次进入到该组件后，要执行的一些方法。')
              this.gitmockdata();
              this.zhezhao=false;
           },
        },
        watch:{
            //showLoading变化时说明组件已经获取初始化数据，在下一帧nextTick进行后续操作
            showloading(value){
                if (!value) {
                    this.$nextTick(() => {
                        // do something
                        this.movieQingqiu()
                    })
                }
            }
        },
        computed:{
            ...mapGetters(['isFetching','data']),

            // 也还可以这样子拿到 state 里面的 数据 
            countfetch(){
              return this.$store.state.Userlist.isFetching
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
        mounted(){
            
            // 请求数据
            this.gitmockdata();

            var membemcanshu={
                  sitesRecordId:'2c9496815c7761ab015c7763215a0000'
            }

            var tongzhigonggaocanshu={
             	empId:'10001'
            }

            var vuedata={}


            // 从api文件中请求数据
          	eidpws_types.gongdiMember(membemcanshu)
  	              .then((data) => {
                      console.log(data)
  	                this.member = data;
  	        });
  	        eidpws_types.tongzhi_gonggao(tongzhigonggaocanshu)
  	              .then((data) => {
                      console.log(data)
  	        });
            
            //  以下的数据是从mockjs里面出来的
            api_types.indexGetImg()
                  .then((data) => {
                      console.log("img");
                      this.imglist=data;
            });
                  
        }
    }
</script>

<style lang="scss">
   .swiper-slide{
       width:100%;
       height:180px !important;
       img{
        width:100%;
        height:100%;
       }
   }

   .layer{
    width:100%;height:100%;
    position:absolute;
    top:0;left:0;z-index:99;
    background:rgba(0,0,0,.5)
  }
 
</style>
