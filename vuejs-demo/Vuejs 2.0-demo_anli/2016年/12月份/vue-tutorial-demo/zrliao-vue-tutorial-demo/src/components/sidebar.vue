<template>
	<div class="panel panel-default">

	    <div class="panel-heading">
	        <h1 class="text-center">已有时长</h1>
	    </div>

	    <div class="panel-body">
	      <h1 class="text-center">{{ time }} 小时</h1>
	    </div>

    </div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
       data() {
       	  return{
             
       	  }
       },
       components:{
       },
       methods:{

       },
       computed:{
       	 ...mapGetters(['time'])
       }
	}
</script>