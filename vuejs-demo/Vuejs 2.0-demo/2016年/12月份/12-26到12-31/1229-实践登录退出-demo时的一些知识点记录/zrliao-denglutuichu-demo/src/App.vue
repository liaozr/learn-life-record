<template>
  <div id="app">
  	   <cheader></cheader>
  	   <transition>
  	   	  <keep-alive>	
            <router-view></router-view>
  	   	  </keep-alive>
  	   	</transition>
  </div>
</template>

<script>
    import cheader from './components/cheader'
    export default {
      data() {
        return{
            
        }
      },
      components:{
			cheader
	  }
    }
</script>

 
