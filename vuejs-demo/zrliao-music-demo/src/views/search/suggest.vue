<template>
    <scroll :lists='result' :pullup='pullup' @scrollToEnd="searchMore" :beforeScroll='beforeScroll' @beforeScroll="listScroll" ref='scroll' class="suggest">
        <ul class="suggest-list">
            <li @click='selectItem(item)' v-for="item in result" :key='item.id' class="suggest-item">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>                  
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show='hasMore' title=''></loading>
        </ul>
        <div v-show='!hasMore && !result.length' class="no-result-wrapper">
             <noResult title='抱歉，暂无搜索结果'></noResult>
        </div>
    </scroll>

</template>

 <script type="text/ecmascript-6">
 
  import {search} from '@a/search'
  import{ERR_OK} from 'assets/js/config'
  import {createSong} from 'assets/js/song'
  import scroll from '@c/scroll/scroll'
  import loading from '@c/loading/loading'
  import Singer from 'assets/js/singer'
  import noResult from '@c/noResult/noResult'

  const TYPE_SINGER = 'singer'

  const perpage = 20 // 表示调用一次接口，返回的数据有几条


  export default {
     data(){
         return{
            page:1,
            result:[],
            pullup:true,
            beforeScroll:true,
            hasMore:true // 标志位
         }
     },
     components:{
        scroll,
        loading,
        noResult
     },
     props:{
         query:{
             type:String,
             default:''
         },
         showSinger:{
             type:Boolean,
             default:true
         }
     },
     methods:{
         selectItem(item){

           if(item.type == TYPE_SINGER){
               const singer = new Singer({
                   id:item.singermid,
                   name:item.singername
               }) 
               this.$router.push({
                   path:`/search/${singer.id}`
               })
               this.$store.dispatch('setSinger',singer)
           }else{

               this.$store.dispatch('insertSong',item)
           }
           
           this.$emit('select',item)
         },
         search(){

            //  搜索事件的一些初始化操作
            this.page = 1 // page归回原来的值
            this.hasMore = true
            this.$refs.scroll.scrollTo(0,0)  // 每次搜索前都将scroll的位置滚回到顶部

            search(this.query,this.page,this.showSinger,perpage).then((res) =>{
               if(res.code == ERR_OK){
                   console.log('tttttttt')
                   console.log(res.data)
                   this.result = this._getResult(res.data)
            
                   console.log('rrrr')
                   console.log(this.result)
                   
                   // 判断是否还存在商品，判断是否还存在有更多商品   
                   this._checkMore(res.data)
               }
            })
         },
         //上拉加载事件
         searchMore(){
            if(!this.hasMore){
                return
            }
            this.page++
            search(this.query,this.page,this.showSinger,perpage).then((res) =>{
                if(res.code == ERR_OK){    

                   this.result = this.result.concat( this._getResult(res.data))

                   // 判断是否还存在商品，判断是否还存在有更多商品   
                   this._checkMore(res.data)
             
               }
            })
         },
         refresh(){
           this.$refs.scroll.refresh()
         },
         _checkMore(data){
             const song = data.song
             if(!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum){
                 this.hasMore = false
             }
         },
         listScroll(){
           this.$emit('listScroll')
         },
         _getResult(data){

             let ret = []
             // ... 是es6的展开运算符，用于合并数组或者是对象的。
             if(data.zhida && data.zhida.singerid){
                 // 将data.zhida 跟 type所在的对象合并成一个对象，并把这个对象push到ret数组中  
                 ret.push({...data.zhida,...{type:TYPE_SINGER}})
             }

             if(data.song){
                 ret = ret.concat(this._normalizeSongs(data.song.list) )
             }
             return ret
         },
         _normalizeSongs(list){
           let ret = []

           list.forEach((musicData) =>{
              if(musicData.songid && musicData.albumid){
                  ret.push(createSong(musicData))
              }
           })
           return ret
         }, 
         getIconCls(item){
             if(item.type == TYPE_SINGER){
                 return 'icon-mine'
             }else{
                 return 'icon-music'
             }
         },
         getDisplayName(item){
             if(item.type == TYPE_SINGER){
                 return item.singername
             }else{
                 return  `${item.name}-${item.singer} `
             }
         }
     },
     watch:{
         query(){    
             console.log('1111')      
             this.search()
         }
     }
  }
</script>

<style scoped lang="scss">
  .suggest{
    height: 100%;
    overflow: hidden;
    .suggest-list{
      padding: 0 30px;
      .suggest-item{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .icon{
        flex: 0 0 30px;
        width: 30px;
        [class^="icon-"]{
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name{
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text{
          @include text-overflow();
        }
      }
    }
    .no-result-wrapper{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>