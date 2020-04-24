// warning: vue-router requires Vue 0.12.10+

import Vue from 'vue';
import VueRouter from 'vue-router';
import {routerStart} from 'config/router';
import {config} from 'config/config';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';
import store from 'stores/store';
import filter from 'frame/filter';
import directive from 'frame/directive';
// install router
Vue.use(VueRouter);

// create router
const router = new VueRouter({
  // history: true,
  hashbang: true,
  saveScrollPosition: true
});
sync(store, router);
routerStart(router);

// 全局
Vue.prototype.$Api = config.serverUrl;

// 自定义过滤器
new filter().init(Vue)

// 自定义指令
new directive().init(Vue)


// 定义fetch
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

//
// ajax 拦截
Vue.http.interceptors.push((request, next)  => {
    next((res) => {
          let d = res.json();
          if(!d.code) d = JSON.parse(d);
          if(d.code != 200) return d;
    });
});

const App = Vue.extend(require("app.vue"));
router.start(App, '#app');
Vue.config.debug = process.env.NODE_ENV === 'dev ';
Vue.config.devtools = process.env.NODE_ENV === 'dev ';


// just for debugging
// window.router = router;
