 <template>
    <div id='app'>

        <transition name="fade">
              <keep-alive>
                  <router-view style="position:absolute;top:0;left:0;right:0;height:100%; " v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
        </transition>

        <transition name="fade">
             <router-view style=" position:absolute;top:0;left:0;right:0;height:100%;" v-if="!$route.meta.keepAlive"></router-view>
        </transition>

<!-- -------------------------------------------------------------------------------------------------------------- -->

        <!-- 仿微信转场过渡效果 -->

        <!--   <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
             <router-view style="position:absolute;top:0;left:0;right:0;height:100%; "   ></router-view>
        </transition>
        -->

<!-- -------------------------------------------------------------------------------------------------------------- -->


     <!-- 在标签中要用到对象下的属性时候，记得要写v-if判断。

        （不然初始化products为空的时候，就会报一个错）

          <div v-if="products" class="len-tip">{{products.length}}/500</div>
     -->

<!-- -------------------------------------------------------------------------------------------------------------- -->

        <!-- 

        keep-alive组件复用

        这是一个很能提高页面性能的标签，会将已使用过的不活动的组件缓存起来而不是销毁。

        在性能不太好的手机上，模版的渲染也是需要一定时间的，我们可以用这个标签将缓存曾经使用过的组件（页面），
        
        在此组件激活时刷新里面的数据即可。激活时使用activated这个生命周期
        -->

<!-- -------------------------------------------------------------------------------------------------------------- -->

    </div>

</template>

<script type="text/javascript">
   
    // import cHeader from '@c/header/header'
    // import cFooter from '@c/footer/footer'

    import { mapGetters } from 'vuex'


    // 用 import 的方式 引入 本地 的css 文件
    // 这里 css的后缀 是不能够省略 的，因为自带的vue-cli 没有配置省略css的后缀

    // 一般 js文件 跟 .vue文件 才建议 去省略

    // 引入全局reset样式
    import reset from 'assets/css/reset.css'

    // 引入 项目的样式 （含有全局样式）
    import index from 'assets/css/common.scss'

    import iconfont from 'assets/css/iconfont.css'

 
    // 这里 每个组件的 .vue文件 的 export 里 建议 加上 name属性值，
    // 这个name属性 的值 为 每个组件的template标签下的那个大容器的id值

    export default {
        name: 'app',
        data() {
          return{

          }
        },
        components:{
        },
        computed:{
           ...mapGetters(['routerChangeName','direction'])
        },
        created(){

        },
        mounted(){
          
          //  监听后退返回按钮
          
          // var that=this;
          // window.addEventListener("popstate", function(e) {  
          //     setTimeout(function(){
          //       that.$store.dispatch("slideRight")

          //     },0);

          // }, false); 

        }
    }
    
    // 全局配置jquery，并用jquery  设置 body的背景色

    $('body').css({
      'background-color':"#f6f6f6"
    })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>

/*----------------------------------------------------------------------------------*/
    /*路由 transition 过渡的效果*/
    
    /*fade过渡效果*/
    /*——> 用于底部导航栏的菜单的切换*/

    /* 定义运动的时间 */
    /* xx-enter-active xx-leave-active 要定义一个过渡的时间 和过渡形式 */
    .fade-enter-active,
    .fade-leave-active {
        transition: 0.5s all ease;
    }

    /*当元素要显示出来的时候 ——> 要以什么样子显示  */
    .fade-enter-active {
        opacity: 1;
    }
    /* 当元素要消失的时候  ——> 要以什么样子消失 */
    .fade-leave-active {
        opacity: 0;
    }

    /*  初始的状态 */

    /*一个开始的状态*/
    .fade-enter{
       opacity: 0;
    }

    /*v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除*/
    .fade-leave {
        opacity:1;
    }

/*-------------------------------------------------------------------------------------------------------------*/
  
  /*slide过渡效果*/  
  /*——> 用于二级页面之间的切换*/

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
        transition: all .3s linear;
  }

  .slide-left-enter {
    transform: translateX(100%);
  }

  .slide-left-leave-active{
    transform: translateX(-100%);
  }
  .slide-right-enter {
    transform: translateX(-100%);
  }
  .slide-right-leave-active{
    transform: translateX(100%);
  }

/*-------------------------------------------------------------------------------------------------------------*/

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 250ms;
    height: 100%;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

/*-------------------------------------------------------------------------------------------------------------*/

</style>

 