 <template>
    <div id='app'>
       <cheader></cheader>
       <ctab></ctab>
       <keep-alive>
          <router-view></router-view>  
       </keep-alive>

       <!--切换路由并不会影响播放器的播放,然后依靠  z-index 的 层级 将 播放器的层级 设置为最高 -->      
       <player v-show="playlist.length > 0"></player>   

    </div>

</template>

<script type="text/javascript">
   
    // 这里 每个组件的 .vue文件 的 export 里 建议 加上 name属性值，
    // 这个name属性 的值 为 每个组件的template标签下的那个大容器的id值

    import cheader from '@c/header/cheader'
    import ctab from '@c/tab/ctab'

    // 引入全局reset样式
    import reset from 'assets/css/reset.css'
    // 引入 项目的样式 （含有全局样式）
    import index from 'assets/css/common.scss'

    import player from '@v/player/player'

    import { mapGetters } from 'vuex'

    export default {
        name: 'app',
        data() {
          return{

          }
        },
        components:{
            cheader,
            ctab,
            player
        },
        computed:{
           ...mapGetters(['fullScreen','playlist']) 
        },
        created(){

        },
        mounted(){
   
        }
    }
    
    // 全局配置jquery，并用jquery  设置 body的背景色
    // $('body').css({
    //   'background-color':"#f6f6f6"
    // })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss'>
  
</style>

 