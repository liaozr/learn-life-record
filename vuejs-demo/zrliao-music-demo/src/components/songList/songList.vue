<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(item,index)" v-for="(item,index) in songs" class='item' :key="item.id">
          <div class="rank" v-show='rank'>
             <span :class="getRankCls(index)">{{getRankText(index)}}</span>  
          </div>
          <div class="songscontent">
              <h2 class="name">{{item.name}}</h2>
              <p class="desc">{{getDesc(item)}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
   export default{
       props:{
           songs:{
               type:Array,
               default:[]
           },
           rank:{
             type:Boolean,
             default:false
           }
       },
       methods:{
           getDesc(song){
               return `${song.singer} . ${song.album}`
           },
           // 因为这个组件是基础组件，不写任何业务逻辑，只派发这个事件，告诉外面的父组件，我这个被点击了。
           selectItem(item,index){
             this.$emit('select',item,index)
           },
           getRankCls(index){
              if(index <= 2){
                return `icon icon${index}`
              }else{
                return 'text'
              }
           },
           getRankText(index){
              if(index >2){
                 return index + 1
              }
           }
       }
   }
</script>

<style scoped lang="scss">

  .song-list{
    .item{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: $font-size-medium;
      .rank{
        flex: 0 0 25px;
        width: 25px;
        margin-right: 30px;
        text-align: center;
        .icon{
          display: inline-block;
          width: 25px;
          height: 24px;
          background-size: 25px 24px;
          &.icon0{
           @include background('first@2x.png')
          }
          &.icon1{
           @include background('second@2x.png')
          }
          &.icon2{
           @include background('third@2x.png')
          }
        }
        .text{
          color: $color-theme;
          font-size: $font-size-large;
        }
      }   
      .songscontent{
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name{
          @include text-overflow();
          color: $color-text;
        }
        .desc{
         @include text-overflow();
          margin-top:4px;
          color: $color-text-d;
        }
      }
    }
  }        
</style>