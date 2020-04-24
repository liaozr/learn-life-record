<template>
  <div class="hello">
    <input type="" v-model='messgg' name="">
    <h1>{{ msg }}</h1>
  </div>
  <aa :msgg='messgg'></aa>
</template>

<script>
import aa from './aa'

export default {
  data () {
    return {
      msg: 'Hello World!',
      messgg: '这条信息也是来自于hello.vue的'
    }
  },
  components: {
    aa
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
