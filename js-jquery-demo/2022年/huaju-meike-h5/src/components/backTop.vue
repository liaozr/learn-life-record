<template>
  <div @click="backTopBtn(move)">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  props: {
  	// 每一帧移动的距离
    move: {
      type: Number,
      default: 300
    }
  },
  methods: {
    backTopBtn(move) {
	  this.$emit('backtoTop', move)
    }
  }
}
</script>
<style>
</style>
