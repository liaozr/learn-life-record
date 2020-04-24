<template>
  <div class="search">
      <div class="search-box-wrapper">
          <searchBox ref="searchBox" @query='onQueryChange'></searchBox>
      </div>
      <div ref='shortCutwrapper' class="shortcut-wrapper" v-show='!query'>
          <scroll  :refreshDelay="refreshDelay" ref='scroll' class="shortcut" :lists='shortcut'>
            <div>
              <div class="hot-key">
                  <h1 class="title">热门搜索</h1>
                  <ul>
                      <li @click='addQuery(item.k)' class='item' v-for="item in hotkey" :key='item.id'>
                          <span>{{item.k}}</span>
                      </li>
                  </ul>
              </div>
              <div class="search-history" v-show="getHistory.length > 0">
                 <h1 class='title'> 
                    <span class="text">搜索历史</span>
                    <span class="clear" @click='showConfirm'>
                      <i class="icon-clear"></i>
                    </span>
                 </h1>  
                 <searchList @deleteOne="deleteOne" @select='select' :searches="getHistory"></searchList>    
              </div>
             </div>
          </scroll>
      </div>
      <div ref='searchResult' class="search-result" v-show='query'>
          <suggest @listScroll='blurInput' @select="saveSearch"  :query='query' ref='suggest' ></suggest>
      </div>
      <confirm @confirm='confirm' text='是否清空所有搜索历史' confirmBtnText='清空' ref='confirm'></confirm> 
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
    import searchBox from '@c/searchBox/searchBox'
    import iconfont2 from 'assets/css/iconfont2.css'
    import {getHotKey} from '@a/search'
    import{ERR_OK} from 'assets/js/config'
    import suggest from './suggest'
    import{mapGetters,mapActions} from 'vuex'
    import searchList from '@c/searchList/searchList'
    import confirm from '@c/confirm/confirm'
    import scroll from '@c/scroll/scroll'
    import { playlistMixin,searchMixin } from 'assets/js/mixin'
 
    export default{
        mixins:[playlistMixin,searchMixin],
        data(){
            return{
                hotkey:[],
                refreshDelay:100
                // query:''
            }
        },
        components:{
           searchBox,
           suggest,
           searchList,
           confirm,
           scroll
        },
        methods:{
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : 0
                this.$refs.shortCutwrapper.style.bottom =  bottom
                this.$refs.searchResult.style.bottom =  bottom

                // 重新调用scroll组件的refresh()方法
                this.$refs.scroll.refresh()
                this.$refs.suggest.refresh()
            },
            // onQueryChange(query){
            //    this.query = query
            // },
            _getHotKey(){
                getHotKey().then((res) =>{
                   if(res.code == ERR_OK){
                       console.log('qq')
                       console.log(res.data.hotkey)
                       this.hotkey =  res.data.hotkey.slice(0,10)
                   }
                })
            },
            // addQuery(query){
            //   this.$refs.searchBox.setQuery(query)
            // },
            // blurInput(){
            //   this.$refs.searchBox.outBlur()
            // },
            // saveSearch(){
            //   this.$store.dispatch("setSearchHistory",this.query)
            // },
            select(query){
               this.addQuery(query)
            },
            // deleteOne(item){
            //    this.$store.dispatch("deleteSearchHistory",item)
            // },
            showConfirm(){
               this.$refs.confirm.show()
            },
            confirm(){
               this.$store.dispatch("clearSearchHistory")
               this.$refs.confirm.hide()
            }
        },
        computed:{
          // ...mapGetters(['getHistory']),
          shortcut(){
             return this.hotkey.concat(this.getHistory)
          }
        },
        watch:{
          query(newQuery){
            if(!newQuery){
              setTimeout(()=>{
                 this.$refs.scroll.refresh()
              },20)
            }
          }
        },
        created(){
            this._getHotKey()
        }
    }

</script>

<style lang="scss">
  .search{
    .search-box-wrapper{
      margin: 20px;
    }
    .shortcut-wrapper{
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;
      .shortcut{
        height: 100%;
        overflow: hidden;
        .hot-key{
          margin: 0 20px 20px 20px;
          .title{
            margin-bottom: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
          .item{
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: $color-highlight-background;
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
        .search-history{
          position: relative;
          margin: 0 20px;
          .title{
            display: flex;
            align-items: center;
            height: 40px;
            font-size: $font-size-medium;
            color: $color-text-l;
            .text{
              flex: 1;
            }
            .clear{
              @include extend-click();
              .icon-clear{
                font-size: $font-size-medium;
                color: $color-text-d;
              }
            }
          }
        }
      }
    }
    .search-result{
      position: fixed;
      width: 100%;
      top: 178px;
      bottom: 0;
    }
  }
</style>