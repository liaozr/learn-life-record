<template>
  <div id="app">
    <h1 v-text='title'></h1>
    <input v-model='newItem' v-on:keyup.enter='addNew'>
    <ul>
      <li v-for='item in items' :class='[liclass, { finished: item.isFinished}]' v-on:click='toggleFinish(item)'>
        {{item.label}}
      </li>
     </ul>
     <p>child tells me : {{childwords}}</p>
     <compa msgfromfather='youdie' v-on:child-tell-me-something='listenToMyBoy'></compa>
  </div>
</template>

<script>
import Store from './store.js'
import Compa from './components/compa'


export default{
  data () {
    return {
      title: 'this is a todo list',
      items: Store.fetch(),
      liclass: 'bbbb',
      newItem: '',
      childwords: ''
    }
  },
  components: {
    Compa
  },
  watch: {
       items: {
        handler: function(items){
          Store.save(items)
        },
        deep: true
       }
  },
  events: {
    'child-tell-me-something': function(msg) {
      this.childwords =msg
    }
  },
  methods: {
    toggleFinish: function(item) {
      item.isFinished = !item.isFinished
    },
    addNew: function(){
        this.items.push({
            label: this.newItem,
            isFinished: false
        })
        this.newItem=''
        this.$broadcast('onAddnew',this.items)
    },
    listenToMyBoy: function(msg) {
        this.childwords=msg
    }

  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.finished{
  text-decoration: underline;
}
.bbbb{
  color:red;
}
#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
