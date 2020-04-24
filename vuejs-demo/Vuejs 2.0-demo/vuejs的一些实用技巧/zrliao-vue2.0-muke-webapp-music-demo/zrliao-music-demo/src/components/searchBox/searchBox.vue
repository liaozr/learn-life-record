<template>
  <div class="search-box">
        <i class="icon-search"></i>
        <input ref='searchInput' v-model='query' :placeholder="placeholader" class="box"/>
        <i @click='clear' v-show='query' class="icon-dismiss"></i>
  </div>
</template>

 <script type="text/ecmascript-6">
    import iconfont2 from 'assets/css/iconfont2.css'
    import {debounce} from 'assets/js/util'

    export default{
        data(){
            return{
                query:""
            }
        },
        props:{
           placeholader:{
               type:String,
               default:"搜索歌曲、歌手"
           }
        },
        methods:{
            clear(){
               this.query = ''
            //    this.$refs.searchInput.focus()
            },
            // 点击这个事件要把值传给 子组件 searchBox.vue里面的input输入框的话
            // 解决办法就是可以用ref来解决，拿到他的ref，然后直接执行这个组件下的 方法即可。
            setQuery(query){
              this.query = query
            },
            outBlur(){
              this.$refs.searchInput.blur() 
            }
        },
        created(){
           // 之所以这么写的目的还不知道，待后续章节完善。    
           this.$watch('query',debounce((newQuery) =>{
               this.$emit('query',newQuery)
           },200))
        },
        mounted(){
            // this.$refs.searchInput.focus()
        },
        activated(){
            // this.$refs.searchInput.focus() 
        }
    }
</script>

<style scoped lang="scss">
  .search-box{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: $color-highlight-background;
    border-radius: 6px;
    .icon-search{
      font-size: 24px;
      color: $color-background;
    }
    .box{
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $color-highlight-background;
      color: $color-text;
      font-size: $font-size-medium;
      border:none;
      &::placeholder{
        color: $color-text-d;
      }
    }
    .icon-dismiss{
      font-size: 16px;
      color: $color-background;
    }
  }
</style>