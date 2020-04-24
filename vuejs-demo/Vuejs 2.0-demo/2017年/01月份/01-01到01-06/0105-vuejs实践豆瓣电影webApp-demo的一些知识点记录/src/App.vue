<template>
  <div id="app">
        <v-header></v-header>
  	   <transition>
            <router-view></router-view>
  	   	</transition>
  </div>
</template>

<script>
    import vHeader from './components/header'

    import './assets/style.scss'
    import './assets/list.scss'
    export default {
      data() {
        return{
            
        }
      },
      components:{
        vHeader
      }
    }
</script>


<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

 
 
