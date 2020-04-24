<template>
   <div class="footer">

     <!-- <router-link :to="{name: 'home'}" tag='li' exact class='item'>Home</router-link> -->

     <!-- 判断是否活跃使用的是包含性匹配，exact内联选项完全匹配路径 -->

       <router-link  to="/" tag='li' exact class='item'>Home</router-link>

       <router-link :to="{name: 'user'}" tag='li' class='item'>User</router-link>

       <router-link :to="{name: 'axiosdata'}" tag='li' class='item'>axiosdata</router-link>

       <router-link :to="{name: 'elmHome'}" tag='li' class='item'>Element</router-link>

       <router-link :to="{name: 'login'}" tag='li' class='item'>login</router-link>

        <!--  

        "exact" 属 性

         判断是否活跃使用的是包含性匹配，exact内联选项完全匹配路径 

        开启router-link的严格模式

        <router-link :to="/" exact>home</router-link>
        上面这个标签如果不加exact属性，则会在vue2.leenty.com/article页面下也会被匹配到，
        这却不是我们的本意,在加了这个属性后就会正确的匹配到vue2.leenty.com下

      -->

   </div>
   
</template>

<script>
    export default {
      name:'footer',
      data(){
        return{
        }
      },
      methods:{
      }
    }

</script>

<style lang="scss">

  /*scss语法就是用@import*/
  
  /*@import './../assets/css/home.scss';*/

</style>
