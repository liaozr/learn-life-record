<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{msgg}}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '这个是来自aa.vue里面的配置信息'
    }
  },
  props:['msgg']
}
</script>


<style scoped>
h1 {
  color: #42b983;
}
</style>
