<template>
   <div class="homeDetail">
      <cHeader></cHeader>
      <div class="content">
          这里是  homeDetail组件

          <div class='aa' @click='goTohomesan'>去home组件的三级页面</div>
      </div> 
   </div>
</template>

<script>

    import cHeader from '@c/header/header'
    import * as types from '@u/index'
    import  mixin from  '@m/index'

    export default {
      mixins: [mixin],
      data(){
        return{
          
        }
      },
      components:{
          cHeader
      },
      methods:{
	      	goTohomesan(){

	           this.$router.push({
	               name:'homesan'
	           })
             
             this.slideLeft();
	           // this.$store.dispatch('slideLeft')

	           console.log(window.history.length)

             types.touchElement('.aa','active');
	        }
      },
      created(){

      }
    }

</script>

<style lang="scss">

   

</style>
