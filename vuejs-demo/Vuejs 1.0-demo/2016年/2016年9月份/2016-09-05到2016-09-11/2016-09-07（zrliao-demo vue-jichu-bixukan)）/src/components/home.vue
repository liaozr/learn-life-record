<template>
    <div>
      我是home
      <!-- <button v-link="{ path: '/hello' }"  >去hello</button> -->
      <button v-link="{name:'hello'}">去hello</button>
    </div>
</template>
<script>
  export default {
    route: {
      data: function (transition) {
        this.$dispatch('menuUpdate', this.$route.path);
      }
    }
    //  route  data这个钩子 是每当路由切换时都会执行的
  }
</script>

