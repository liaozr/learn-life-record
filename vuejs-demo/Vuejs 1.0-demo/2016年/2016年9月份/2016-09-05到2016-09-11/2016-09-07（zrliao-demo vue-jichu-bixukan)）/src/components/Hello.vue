<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="food in foods"  >
      <test  :food="food" :index="$index"  ></test>
    </div>
  </div>
</template>

<script>
import test from './test'
export default {
  route: {
    data: function (transition) {
      this.$dispatch('menuUpdate',this.$route.path);
    }
  },
  components:{
    test
  },
  methods:{
      test:function(){

      }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      foods: [
        {txtName: "炸鸡",clsName: "zj",hot: 0,state: false},
        {txtName: "米饭",clsName: "mf",hot: 0,state: false},
        {txtName: "果汁",clsName: "gz",hot: 0,state: false},
        {txtName: "羊肉串",clsName: "yrc",hot: 0,state: false},
        {txtName: "寿司",clsName: "ss",hot: 0,state: false},
        {txtName: "拉面",clsName: "lm",hot: 0,state: false},
        {txtName: "可乐",clsName: "kl",hot: 0,state: false},
        {txtName: "小龙虾",clsName: "xlx",hot: 0,state: false},
        {txtName: "西瓜",clsName: "xg",hot: 0,state: false},
        {txtName: "火锅",clsName: "hg",hot: 0,state: false},
        {txtName: "啤酒",clsName: "pj",hot: 0,state: false},
        {txtName: "扇贝",clsName: "sb",hot: 0,state: false},
        {txtName: "披萨",clsName: "ps",hot: 0,state: false},
        {txtName: "汉堡",clsName: "hb",hot: 0,state: false},
        {txtName: "牛奶",clsName: "nn",hot: 0,state: false},
        {txtName: "香蕉",clsName: "xj",hot: 0,state: false}
      ]
    }
  },
  watch:{
      'msg':function(val,oldVal){

      },
     'foods':{
       handler:function(val){

       },
       deep:true
     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
