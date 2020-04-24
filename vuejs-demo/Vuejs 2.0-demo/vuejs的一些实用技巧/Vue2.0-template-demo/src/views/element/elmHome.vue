<template>
   <div class="app">
        <cHeader></cHeader>
        <div class="content">
            element 23333334444444 <br>	

            现在的时间是：{{timeNum}}

            <list tipsText="自定义文案,默认右边是按钮" msg="弹层"></list> 
            <list @btnClickEvent="test"></list>  
            <list tipsText="原生点击" @click.native="buttonClick"></list>

            <list ref="child1" tipsText="最右边是箭头" currentView="arw"></list> 
            <!-- 
                 Props向下传递，事件向上传递！。以此为目标升级你的组件，提供良好的 API 和 独立性。
                当遇到 props 和 events 难以实现的功能时，通过 this.$refs来实现。
                -->

            <!-- 

                注意最后一个list 组件上有一个ref的属性，这个属性代表组件集合，
                当页面中有很多组件的时候，可以通过几种方法来获取对应的某个组件的信息：

                console.log(this.$children[0].msg);//通过数组获取
                console.log(this.$refs.child1.msg);//通过对象集合获取 

                要想使用refs的内容，就需要在组件写入dom之后才能开始调用哦！

             -->

             <!-- <router-link :to="{name:'slot'}">go to the slot 组件</router-link>   -->
        </div>
   </div>
   
</template>

<script>

    import cHeader from '@c/header/header'

    import list from '@c/lists/list'
    
    export default {
      data(){
        return{
          timeNum:''
        }
      },
      components:{
        list,
        cHeader
      },
      methods:{
	      test:function(value){
          alert(value+"我是自定义的方法,来自于子组件list触发的一个方法");
        },
        ceshi(){
          console.log('这个方法主要是用来测试 this.$parent的用法的')
        },
        buttonClick(){
          console.log('原生点击')
        }
      },
      created(){
      	console.log('The time is ' + this.$moment().format("HH:mm"));
      	this.timeNum=this.$moment().format("HH:mm");
      },
      mounted(){
         console.log(this.$children[0].msg);//通过数组获取
         console.log(this.$refs.child1.tipsText);//通过对象集合获取 
      }
    }

</script>


<style lang='scss' scoped>
	.app{
       color:$colortheme;
       font-size: $fs20;
	}
</style>