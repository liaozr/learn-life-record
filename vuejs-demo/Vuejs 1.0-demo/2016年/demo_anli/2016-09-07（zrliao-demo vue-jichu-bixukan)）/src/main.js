import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Home from './components/home'
import Hello from './components/Hello'


Vue.use(Router);
Vue.config.devtools = true;
const router = new Router();

router.map({
  '/': {
    component: Home,
    name:'home'
    },
  'hello':{
    component: Hello,
    name:'hello'
  }
});

router.start(App, '#app');

