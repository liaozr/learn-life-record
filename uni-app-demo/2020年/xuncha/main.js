import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import * as uniapi from '@/common/js/app.js'
for (let key in uniapi) {
	Vue.prototype[key] = uniapi[key];
}



import api from '@/common/js/api.js';
import request2 from '@/common/js/api2.js';
import common from '@/common/js/common.js';

import imgbox from '@/components/imgbox'
import imgbox1 from '@/components/imgbox1'
import imgbox2 from '@/components/imgbox2'
import searchView from '@/components/search-view'
import emptyView from '@/components/empty-view.vue';

Vue.component('search-view', searchView);
Vue.component('img-box', imgbox);
Vue.component('img-box1', imgbox1);
Vue.component('img-box2', imgbox2);
Vue.component('empty-view', emptyView);

Vue.prototype.$request = api.request;
Vue.prototype.$request2 = request2;
Vue.prototype.BASE_URL = api.BASE_URL;

const app = new Vue({
    ...App
})
app.$mount()
