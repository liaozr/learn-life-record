<template>

    <transition name='slide'>
          <musicList :songs='songs' :title='title' :bgImage='bgImage'></musicList> 
    </transition> 

</template>

<script>
    
    import musicList from '@c/musicList/musicList'

    import { mapGetters } from 'vuex'
    import { getSingerDetail } from '@a/singer'
    import { ERR_OK } from 'assets/js/config'

    import { createSong } from 'assets/js/song'

    export default{
        data(){
            return{
              songs:[]
            }
        },
        components:{
          musicList
        },
        methods:{
           getDetail(){
               if(!this.getsinger.id){
                  this.$router.push({
                      name:'singer'
                  })
                  return
               }
               getSingerDetail(this.getsinger.id).then((res) => {
                  if(res.code == ERR_OK){
                      console.log(res.data.list)
                      this.songs=this.normalizeSongsList(res.data.list)
                      console.log("ccccccccc")
                      console.log(this.songs)
                  }
               })
           },
           normalizeSongsList(list){
               let ret=[]
               list.forEach((item) =>{

                    // 对象解构的用法 ,把对象解构出来
                    let { musicData } =item
                    
                    // 对象解构的用法
                    // let node = {
                    //     type: "Identifier",
                    //     name: "foo"
                    // };
                    // let { type, name } = node;
                    // console.log(type); // "Identifier"
                    // console.log(name); // "foo"

// ---------------------------------------------------------------------------------------------------------------

                    // createSong(musicData) 就是 防止写重复性的代码

                    if(musicData.songid && musicData.albumid){
                       ret.push(createSong(musicData))    
                    }                                                                
               })
               return ret     
           }
        },
        computed:{
          title(){
              return this.getsinger.name
          },
          bgImage(){
              return this.getsinger.avatar
          },
          ...mapGetters(['getsinger'])
          // ...mapGetters(['isFetching','data']),
        },
        created(){
          console.log("wwww")
          console.log(this.$route.params)

          console.log('tttttttt')
          console.log(this.getsinger)
          this.getDetail()
        },
        mounted(){
        }
    }
</script>

<style lang='scss' scoped>

    .singer-detail{
        position: fixed;
        z-index:100;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:$color-background;
    }
    .slide-enter-active , .slide-leave-active{
        transition:all 0.3s;    
    }
    .slide-enter, .slide-leave-to{
        transform:translate3d(100%,0,0)
    }

</style>
