<template>
    <div id="app" class='app'>
        <toolbar></toolbar>  
        <notes-list></notes-list>
        <editor></editor>  
    </div>
</template>

<style>
  html, #app {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    border: 0;
    height: 100%;
    max-height: 100%;
    position: relative;
  }
@import './assets/zujian.css'
</style>

<script type="text/javascript">
  import Toolbar from './components/Toolbar'
  import NotesList from './components/NotesList'
  import Editor from './components/Editor'
  import store from './vuex/store'
  import { initStore } from './vuex/actions'

  export default{
      data () {
        return{
         }
      },
      components:{
          Toolbar,
          NotesList,
          Editor
      },
      store,
      vuex:{
          actions:{
              initStore
          }
      },
      ready(){
          this.initStore()
      }
  }

// 在根组件中引用了三个子组件：Toolbar.vue, NotesList.vue, Editor.vue。

// 注意：
// 我们在配置里面加入了 vuex 这么一个选项，
// 这里用来将我们 action 里面定义的方法给暴露出来
// ，我们在根组件中只做了一件事情，那就是初始化模拟数据，
// 因此我们在组件生命周期的 ready 阶段调用了 actions 里面的 initStore 
// 来初始化我们的 store 里面的 state

</script>





