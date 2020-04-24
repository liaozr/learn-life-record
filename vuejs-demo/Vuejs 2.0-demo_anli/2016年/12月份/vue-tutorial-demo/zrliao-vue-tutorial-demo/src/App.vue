<template>
   <div id="wrapper">
      <nav class="navbar navbar-default">
          <div class="container">

              <router-link to='/' tag='a' class='navbar-brand'> 
                    <i class="glyphicon glyphicon-time"></i> 计划板
              </router-link>

              <ul class="nav navbar-nav">
                <li><router-link to="/home">首页</router-link></li>
                <li><router-link to="/time-entries">计划列表</router-link></li>
              </ul>
              
          </div>
      </nav>
      <div class="container">
          <div class="col-sm-3">
              <sidebar></sidebar>
          </div>
          <div class="col-sm-9">
            <router-view></router-view>
          </div>
      </div>
  </div>
</template>


<script>

    import sidebar from './components/sidebar'

    export default {
      data() {
          return{
          }
      },
      components: {
        sidebar
      }
    }
</script>

<style>
#app {
}
</style>
