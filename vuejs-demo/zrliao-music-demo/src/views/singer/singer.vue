<template>
  <div class="singer" ref='singer'>
    <indexList @select='selectSinger' :lists='singers' ref='singerList'></indexList>

    <router-view></router-view>

  </div>
</template>

<script>
    import { getSingerList } from '@a/singer'
    import { ERR_OK } from 'assets/js/config'
    import Singer from 'assets/js/singer'
    import indexList from '@c/indexList/indexList'

    import { mapActions } from 'vuex'

    import { playlistMixin } from 'assets/js/mixin'


    const HOT_NAME='热门'
    const HOT_SINGER_LEN = 10

    export default{
        mixins:[playlistMixin],
        data(){
            return{
                singers:[]
            }
        },
        components:{
          indexList
        },
        methods:{
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : 0
                this.$refs.singer.style.bottom =  bottom

                // 重新调用scroll组件的refresh()方法
                this.$refs.singerList.refresh()
            },
            selectSinger(singer){
              console.log("qqqqqqqqq")
              console.log(singer)

              this.setSinger(singer)

              this.$router.push({
                  // path:`/singer/singerDetail/${singer.id}`,
                  name:'singerDetail',
                  params:singer
              })

            },
           _getSingerList(){
             getSingerList().then((res) =>{
               if(res.code == ERR_OK){
                   var singers=res.data.list
                   console.log('wwwwwwww')
                   console.log(this.normalizeSinger(singers))
                   this.singers=this.normalizeSinger(singers)
               }
            })
           },
           normalizeSinger(list){
               let map={
                   hot:{
                       title:HOT_NAME,
                       items:[]
                   }
               }

               //  new Singer 是 来自 singer.js里面的，被封装成一个类了

               list.forEach((item,index) =>{
                  if(index < HOT_SINGER_LEN){
                      map.hot.items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                      }))
                  } 
                  const key=item.Findex
                  if(!map[key]){
                      map[key]={
                          title:key,
                          items:[]
                      }
                  } 
                  map[key].items.push(new Singer({
                     id:item.Fsinger_mid,
                     name:item.Fsinger_name
                  }))
               })

               // 为了得到有序列表，我们需要处理map，因为对象的遍历 是无序的    

               console.log(map)

               let hot=[]
               let ret=[]
               for(let key in map){
                   let val =map[key]
                   if(val.title.match(/[a-zA-Z]/)){
                       ret.push(val)
                   }else if(val.title == HOT_NAME){
                       hot.push(val)
                   }
               }
               ret.sort((a,b) =>{
                   return a.title.charCodeAt(0) - b.title.charCodeAt(0)
               })

               return hot.concat(ret)

           },
           ...mapActions(['setSinger'])
        },
        created(){
            this._getSingerList()
        }
    }

</script>

<style scoped lang='scss'>
   .singer{
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
        z-index:0;
    }
</style>
