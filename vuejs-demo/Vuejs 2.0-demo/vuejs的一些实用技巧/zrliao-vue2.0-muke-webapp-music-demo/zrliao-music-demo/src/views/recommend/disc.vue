<template>
  <transition name="slide">
    <musicList :title="title" :bgImage="bgImage" :songs='songs'></musicList>
  </transition>
</template>

<script>

    import musicList from '@c/musicList/musicList'

    import {mapGetters} from 'vuex'

    import { getSongList } from '@a/recommend'

    import { ERR_OK } from 'assets/js/config'

    import {createSong} from 'assets/js/song'

    export default{
        data(){
            return{
              songs:[]
            }
        },
        components:{
            musicList
        },
        computed:{
            title(){
                return this.disc.dissname
            },
            bgImage(){
                return this.disc.imgurl
            },
            ...mapGetters(['disc'])
        },
        methods:{
          _getSongList(){
               if(!this.disc.dissid){
                   this.$router.push('/recommend')
                   return
               }
               getSongList(this.disc.dissid).then((res) => {
                    if (res.code === ERR_OK) {
                        console.log('uuuuuuu')
                        console.log(res.cdlist[0])
                        this.songs = this._normalizeSongs(res.cdlist[0].songlist)
                    }
               })
          },
          _normalizeSongs(list){
            let ret= []
            list.forEach((musicData) =>{
                if(musicData.songid && musicData.albumid){
                    ret.push(createSong(musicData))
                }
            })
            return ret
          }
        },
        created(){
          console.log('yyyyyy')
          console.log(this.$route.params.id)
          this._getSongList()  
        }      
    }
</script>
<style scoped lang="scss">

  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }

</style>