<template>
  <div class="progress-circle">

      <!-- viewBox 表示 的 是 circle 这个 舞台大小的效果，  -->
      <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" >

        <!--半径 r 为 50 圆心坐标为 cx cy 也是 为 50 50 ，直径 为100 的一个 圆 -->
        <circle class="progress-background" r='50' cx='50' cy='50' fill='transparent'  ></circle>

        <!--  stroke-dashoffset 表示的是  1减去当前进度的 percent 值  乘以 Math.PI * 100 获取到的 一个值      -->

        <!--比例的映射关系 就是   stroke-dasharray 与  stroke-dashoffset 有关的  -->
        <circle class="progress-bar" r='50' cx='50' cy='50' fill='transparent' :stroke-dasharray='dashArray' :stroke-dashoffset='dashOffset'   ></circle>

      </svg>

      <slot></slot> 

  </div>
</template>

<script type="text/ecmascript-6">

   export default{
       data(){
           return{
             dashArray:Math.PI * 100   
           }
       },
       props:{
           radius:{
               type:Number,
               default:100
           },
           percent:{
               type:Number,
               default:0
           }
       },
       computed:{
           dashOffset(){
               return (1- this.percent) * this.dashArray
           }
       }
   }
  
</script>

<style scoped lang="scss">
  .progress-circle{
    position:relative;
    circle{
      stroke-width: 8px;
      transform-origin: center;
      &.progress-background{
        transform: scale(0.9);
        stroke: $color-theme-d;
      }
      &.progress-bar{
        transform: scale(0.9) rotate(-90deg);
        stroke: $color-theme;
      }
    }
  }
  
</style>