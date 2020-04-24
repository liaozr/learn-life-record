<template>
  <div>
  <menu :menulist="menuList" ></menu>
    <router-view
      transition
      transition-mode="out-in"></router-view>
  </div>

</template>

<script>
  import Menu from './components/Menu'
  export default{
    components:{
      Menu
    },
    data(){
      return{
        menuList:[
            {
              name:"首页",
              url:"/",
              state:true
            },
            {
              name:"欢迎页面",
              url:"/hello",
              state:false
            }
        ]
      }
    },
    events: {
      'menuUpdate': function (path) {
        // 事件回调内的 `this` 自动绑定到注册它的实例上
        var menu;
        for(var i=0;i<this.menuList.length;i++){
            menu = this.menuList[i];
            if(menu.url==path){
              menu.state = true;
            }else{
              menu.state = false;
            }
        }
        console.log('aaaaa')
      }
    }
  }
</script>
