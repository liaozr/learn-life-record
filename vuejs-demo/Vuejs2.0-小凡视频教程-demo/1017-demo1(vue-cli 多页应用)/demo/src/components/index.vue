<template>
	<div class="main">
        <div class="aa" v-text='aa'></div>
        <router-link tag='li' to="/details">
           <a>go to the details</a>
        </router-link>
	</div>
</template>

<script type="text/javascript">
	export default{
		data() {
			return{
				aa:"this is message come from index.vue"
			}
		}
	}
</script>
