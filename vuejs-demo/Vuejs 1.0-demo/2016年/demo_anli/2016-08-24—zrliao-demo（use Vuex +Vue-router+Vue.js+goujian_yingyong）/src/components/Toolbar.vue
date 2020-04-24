<template>
	<div id="toolbar">
		<i class='glyphicon logo'> <img src="../assets/logo.png" width='30' height='30'></i>
		<i @click='newNote' class='glyphicon glyphicon-plus'></i>
		<i @click='toggleFavorite' class='glyphicon glyphicon-star' :class="{starred: activeNote.favorite}"></i>
		<i @click='deleteNote' class='glyphicon glyphicon-remove'></i>
	</div>
</template>	
<script type="text/javascript">
	import {newNote,deleteNote,toggleFavorite} from '../vuex/actions'
    import {activeNote} from '../vuex/getters'
	export default{
        vuex:{
        	getters:{
        		activeNote
        	},
        	actions:{
        		newNote,
        		deleteNote,
        		toggleFavorite
        	}
        }
	}
</script>


<!-- 

在这里，我们用到了 Vuex 的一个案例就是我们需要知道当前的激活的笔记是否是收藏类别的
，如果是，我们需要高亮收藏按钮，那么如何知道呢？
那就是通过 vuex 里面的 getters 获取当前激活的笔记对象，判断它的 favorite 是否为 true。

始终牢记一个概念，vuex 中数据是单向的，
只能从 store 获取，而我们这个例子中的 activeNote 
也是始终都在 store.js 中维护的，这样子就可以给其他组件公用了 

-->

<style scoped>
  #toolbar{
    float: left;
    width: 80px;
    height: 100%;
    background-color: #30414D;
    color: #767676;
    padding: 35px 25px 25px 25px;
  }

  #toolbar .starred {
      color: #F7AE4F;
  }

  #toolbar  i{
      font-size: 30px;
      margin-bottom: 35px;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.5s ease;
  }
  #toolbar i:hover{
        opacity: 1;
      }
</style>
