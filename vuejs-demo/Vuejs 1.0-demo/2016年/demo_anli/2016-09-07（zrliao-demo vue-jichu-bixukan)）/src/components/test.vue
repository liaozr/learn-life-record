<template>
  <div>
  {{food.txtName}} {{food.state}}<button @click="test" >测试</button>
  </div>
</template>

<script>
    export default{
      methods:{
        test:function(){
          this.food.state = this.food.state ? false : true;
        }
      },
      props: {
        food: {
          type: Object,
          default(){
          return {};
          }
        },
        index:{}
      },
      watch:{
        'food.state'(val,oldval){
              alert("第"+this.index+"行的state被改动");
         }
      }
    }
</script>
