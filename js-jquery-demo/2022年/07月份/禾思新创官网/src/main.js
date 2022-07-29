import Vue from 'vue';
import App from './App.vue';
import './permission';
import router from './router';
import store from './store';
import './styles/index.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
import BaiduMap from 'vue-baidu-map';

import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'https://admin.hjtc123.com/cms';

Vue.use(BaiduMap, {
	ak: 'NkVNgD5ZsE7WG2hKqyhjxXaVGdDSWmOH',
});
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	mounted() {
		document.dispatchEvent(new Event('render-event'));
	},
	render: h => h(App),
}).$mount('#app');
