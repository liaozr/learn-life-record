// vue里面有多个组件，且有相同逻辑处理的话，可以用mixin
import {mapGetters} from 'vuex'
export const playlistMixin ={
    computed:{
       ...mapGetters(['playlist','favoriteList'])
    },
    mounted(){
       this.handlePlaylist(this.playlist)
    },
    activated(){
       this.handlePlaylist(this.playlist)
    },
    watch:{
        playlist(newVal){
           this.handlePlaylist(newVal)
        }
    },
    methods:{
        // 组件里面去 使用这个函数
        // 倘若各个组件没有调用这个handlePlaylist这个方法，则会抛出异常情况的
        // 说明 组件里面的方法 是会替换 mixin里面的方法的
        handlePlaylist(){
            throw new Error('component must implement handlePlaylist method ')
        },
        getFavoriteIcon(song){
          if(this.isFavorite(song)){
             return 'icon-favorite' 
          }else{
             return 'icon-not-favorite'
          }
        },
        toggleFavorite(song){
          if(this.isFavorite(song)){
             this.$store.dispatch("deleteFavoriteList",song)
          }else{
             this.$store.dispatch("saveFavoriteList",song)
          }
        },
        isFavorite(song){
           const index = this.favoriteList.findIndex((item) =>{
               return item.id == song.id
           })
           return index > -1
        }
    }
}

export const searchMixin = {
    data(){
        return{
            query:''
        }
    },
    computed:{
       ...mapGetters(['getHistory']),
    },
    methods:{
        blurInput(){
            this.$refs.searchBox.outBlur()
        },
        saveSearch(){
            this.$store.dispatch("setSearchHistory",this.query)
        },
        onQueryChange(query){
            this.query = query
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
        deleteOne(item){
            this.$store.dispatch("deleteSearchHistory",item)
        }
    }
}