<template>
<div class='showbarr'>
    <slot></slot>		
</div>

</template>

<script>
	export default{
		data(){
			return{
 			}
		}
	}

</script>


<style>
.showbarr {
    transform: translateX(0);
    transition: all 0.5s;
    width: 330px;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 5;
}
.showbar {
    transform: translateX(0);
    transition: all 0.5s;
    width: 330px;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 5;
}
</style> 