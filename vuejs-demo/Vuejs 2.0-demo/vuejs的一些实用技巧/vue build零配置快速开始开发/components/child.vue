<template>
   <div class="app">
       {{msg}}
       <router-link :to="{name: 'user'}" tag='li'>go to User</router-link>

       <router-link :to="{name: 'axiosdata'}" tag='li'>go to axiosdata</router-link>

   </div>
</template>

<script>

    export default {
      data(){
        return{
           msg:'this msg come from child component'
        }
      }
    }

</script>

<style lang="css">
</style>
