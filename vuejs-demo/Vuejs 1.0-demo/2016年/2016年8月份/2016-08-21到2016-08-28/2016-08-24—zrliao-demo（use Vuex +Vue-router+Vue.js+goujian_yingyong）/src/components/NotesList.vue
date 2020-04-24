<template>
  <div id="notes-list">
    <div id="list-header">
      <h2>Notes | heavenru.com</h2>
      <div class="btn-group btn-group-justified" role="group">

        <!-- all -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="toggleShow('all')"
            :class="{active: show === 'all'}">All Notes</button>
        </div>

        <!-- favorites -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="toggleShow('favorite')"
            :class="{active: show === 'favorite'}">Favorites</button>
        </div>

      </div>
    </div>

    <!-- 渲染笔记列表 -->
    <div class="container">
      <div class="list-group">
        <a v-for="note in filteredNotes"
         class="list-group-item" href="#"
         :class="{active: activeNote === note}"
         @click="updateActiveNote(note)">
          <h4 class="list-group-item-heading">
            {{note.title.trim().substring(0,30)}}
          </h4>
        </a>
      </div>
    </div>
  </div>
</template>
<!-- 
   什么时候采用vuex： 当组件间有很多公用状态的时候

   <a v-for="note in filteredNotes"  在用了vuex的项目里，
   可以在template里面直接使用getters里面的数据 ，最终用的是

   store仓库里面的state数据

 -->
<script type="text/javascript">
 import { updateActiveNote,updateShow } from '../vuex/actions'
 import { show,filteredNotes,activeNote } from '../vuex/getters' 

 export default{
    vuex:{
      getters:{
        show,
        filteredNotes,
        activeNote
      },
      actions:{
        updateShow,
        updateActiveNote
      }
    },
    methods:{
      toggleShow(show){
        this.updateShow(show)
      }
    }
 }
</script>

<!-- 

笔记列表组件，主要有三个操作

渲染笔记
切换渲染笔记
点击列表 title，切换 activeNote 

-->


<!--

 我们通过 getters 中的 filteredNotes 方法获取笔记列表

// 获取 noteList,这里将会根据 state.show 的状态做数据过滤
export const filteredNotes = (state) => {
  if(state.show === 'all'){
    return state.notes || {};
  }else if(state.show === 'favorite'){
    return state.notes.filter(note => note.favorite) || {};
  }
};

可以看到，我们获取的列表是依赖于 state.show 这个状态的。

而我们的切换列表操作恰好就是调用 actions 里面的方法来更新 state.show，

这样一来，实现了数据列表的动态刷新，

而且我们对树的操作都是通过调用 actions 的方法来实现的。

 -->


<!-- 

我们再看，在切换列表的时候，我们还需要动态的更新 activeNote。

看看我们在 store.js 中是如何做的：

// 切换显示数据列表类型：全部 or 收藏

SET_SHOW_ALL(state, show){
  state.show = show;
  // 切换数据展示，需要同步更新 activeNote
  if(show === 'favorite'){
    state.activeNote = state.notes.filter(note => note.favorite)[0] || {};
  }else{
    state.activeNote = state.notes[0] || {};
  }
}

触发这些操作的是我们给两个按钮分别绑定了我们自定义的函数，
通过给函数传入不同的参数，然后调用 actions 里面的方法，来实现对数据的过滤，更新。

 -->