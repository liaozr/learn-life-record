<template>
   <div class="app">

       <cHeader></cHeader>
       <div class="content">
          <div v-if='sitesRecord'>
              <div>{{sitesRecord.empName}}</div>
              <div>{{sitesRecord.sitesAddr}}</div>
              <div>{{sitesRecord.stateName}}</div>
              <div class='last'>{{sitesRecord.cityName}}</div>
          </div>
          <div class="bb">
            测试bb
          </div>
       </div>

    </div> 
</template>

<script>

    import cHeader from '@c/header/header'
     
    export default{
        data(){
            return{
               sitesRecord:{}
            }
        },
        components:{
            cHeader
        },
        created(){
          this.sitesRecord=this.$route.params.sitesRecord
          console.log(this.sitesRecord)
        }
    }
</script>

<style lang='scss' scoped> 
     div{
        margin-bottom:rem(30);
     }

     .last{
        @include animation(yundong 2s ease)
     }

     @include keyframes(yundong) { 
        0% {
         transform: translateX(0); 
        } 
        100% { 
          transform: translateX(200px);
        }
     } 
    .bb{

      @include calc(height,'100% - 20px' )

      @include box-c

      @include border(#ccc)
    }
</style>