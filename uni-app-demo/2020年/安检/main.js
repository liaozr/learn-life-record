import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import * as uniapi from '@/common/js/app.js'

for (let key in uniapi) {
	Vue.prototype[key] = uniapi[key];
}




import api from '@/common/js/api.js';
import imgbox from '@/components/imgbox'
import searchView from '@/components/search-view'
import uniBadge from "@/components/uni-badge.vue";
import loadMore from '@/components/load-more.vue';
import emptyView from '@/components/empty-view.vue';


Vue.component('img-box', imgbox);
Vue.component('search-view', searchView);
Vue.component('uni-badge', uniBadge);
Vue.component('load-more', loadMore);
Vue.component('empty-view', emptyView);

Vue.prototype.$request = api.request;
Vue.prototype.BASE_URL = api.BASE_URL;



const app = new Vue({
	...App
})
app.$mount()
