import Vue from 'vue';
import Vuex from 'vuex';
import titleStore from './titleStore';
import accountStore from './accountStore';
import createLogger from 'common/logger';

Vue.use(Vuex)
// console.log(Vuex);
// Vue.config.debug = true

const debug = process.env.NODE_ENV === 'dev '

export default new Vuex.Store({
  modules: {
    titleStore,
    accountStore
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
