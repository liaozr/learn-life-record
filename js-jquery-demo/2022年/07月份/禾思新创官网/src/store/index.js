import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// 引入目录所有文件

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');

	const value = modulesFiles(modulePath);
	modules[moduleName] = value['default'];
	return modules;
}, {});

const store = new Vuex.Store({
	modules,
});

export default store;
