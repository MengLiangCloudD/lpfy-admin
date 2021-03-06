// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import iView from 'iview'
import config from '@/config'
import 'iview/dist/styles/iview.css';

// import 'view-design/dist/styles/iview.css';
Vue.config.productionTip = false
Vue.use(iView);
axios.defaults.baseURL = '/api';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App},
  template: '<App/>'
})
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config