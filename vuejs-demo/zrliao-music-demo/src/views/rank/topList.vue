<template>
    <transition name='slide'>
        <musicList :title="title" :bgImage='bgImage' :songs='songs' :rank='rank'></musicList>   
    </transition>  
</template>

 <script type="text/ecmascript-6">
 
   import musicList from '@c/musicList/musicList'
   import {mapGetters} from 'vuex'
   import {getMusicList} from "@a/rank"
   import {ERR_OK} from 'assets/js/config'
   import {createSong} from 'assets/js/song'

   export default{
       data(){
           return{
             songs:[],
             rank:true
           }
       },
       components:{
           musicList
       },
       computed:{
           title(){
              return this.topList.topTitle
           },
           bgImage(){
              if(this.songs.length > 0){
                 return this.songs[0].image
              }else{
                 return this.songs.picUrl
              }
           },
           ...mapGetters(['topList'])
       },
       methods:{
          _getMusicList(){
             if(!this.topList.id){
                 this.$router.push({
                     path:'/rank'
                 })
                 return 
             }
             getMusicList(this.topList.id).then((res) =>{
                 if(res.code == ERR_OK){
                     console.log('yyyy')                
                     this.songs = this._normalizeSongs(res.songlist)
                 }
             })
          },
          _normalizeSongs(list){
              let ret = []
              list.forEach((item) =>{
                  const musicData = item.data
                  if(musicData.songid && musicData.albumid){
                       // createSong(musicData) 返回的是song的 实例
                      // 这个 song的实例 含有 多个 song实例的一些属性值。   
                      ret.push(createSong(musicData))
                  }
              })

              return ret
          }
       },
       created(){
           this._getMusicList()
       }
   }
</script>

<style scoped lang="scss">

  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s ease
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }

</style>