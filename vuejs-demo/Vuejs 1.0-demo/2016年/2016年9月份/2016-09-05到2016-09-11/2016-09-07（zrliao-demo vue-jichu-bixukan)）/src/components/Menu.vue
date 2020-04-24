<template>
  <div>
    <ul>
    <li v-for="menu in menulist"  >
     <a  v-link="menu.url">{{menu.name}}--{{menu.state}}</a>
    </li>
    </ul>
  </div>
</template>
<script>
    export default{
      props: {
        menulist: {
          type: Array,
          default:[]
        }
      }
    }
    // 这个是表明props的数据类型
</script>

<!--   
    Vue.component('example', {
      props: {
          // 基础类型检测 （`null` 意思是任何类型都可以）
          propA: Number,
          // 多种类型 (1.0.21+)
          propM: [String, Number],
          // 必需且是字符串
          propB: {
              type: String,
              required: true
          },
          // 数字，有默认值
          propC: {
              type: Number,
              default: 100
          },
          // 对象/数组的默认值应当由一个函数返回
          propD: {
              type: Object,
              default: function() {
                  return {
                      msg: 'hello'
                  }
              }
          },
      }
    } 
-->
