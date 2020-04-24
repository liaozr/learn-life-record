<template>
  <div id="note-editor">
    <div class="form-group">
      <input type="text" name="title"
        class="title form-control"
        placeholder="请输入标题"
        @input="updateNote"
        v-model="currentNote.title">
      <textarea
        v-model="currentNote.content" name="content"
        class="form-control" row="3" placeholder="请输入正文"
        @input="updateNote"></textarea>
    </div>
  </div>
</template>
<!-- 
@input 触发条件是 在input标签上按下键盘后输入数据后会触发的
@input="updateNote" 是一个自定义事件
-->
<script type="text/javascript">
  import {editNote} from '../vuex/actions'
  import {activeNote} from '../vuex/getters'

  export default{
    vuex:{
      getters:{
        activeNote
      },
      actions:{
        editNote
      }
    },
    computed:{
      //通过计算属性得到的一个对象，这样子我们就能愉快的使用v-model了
      currentNote:activeNote
    },
    methods:{
      //为这么这么做？？因为在严格模式中不允许直接
      // 在模版层面去修改state中的值
      updateNote() {
            this.editNote(this.currentNote)
            console.log("aaa")
      }
    }
  }
</script>

<!-- 

在 Editor.vue 组件中，我们需要能够实时的更新当前的 activeNote 组件和列表中对应的我们正在修改的笔记对象的内容。

由于我们前面提到过，在组件中是不允许直接修改 store.js在里面的状态值的，所以在这里的时候，
我们通过一个计算属性，将 store 里面的状态值赋值给一个对象，
然后在自定义的 updateNotes() 方法中，去调用 action，
同时传入 currentNote 对象。


在 store.js 中，我们是这么做的，找到对应的 id 的对象，
重新赋值，因为前面提到过，我们的数据是响应式的，
在这里进行了改变，对应的视图也将刷新改变，
这样一来就实现了实时编辑，实时渲染的功能了。
 -->

<!-- 

// 修改笔记
EDIT_NOTE(state, note) {
  state.activeNote = note;
  // 修改原始数据
  for (var i = 0; i < state.notes.length; i++) {
    if(state.notes[i].id === note.id){
      state.notes[i] = note;
      break;
    }
  };
}, 

-->