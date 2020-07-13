
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import 'lib-flexible'
import { Indicator } from 'mint-ui';
import qs from 'qs'
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.use(MintUI);
axios.defaults.baseURL="https://ele-interface.herokuapp.com";
//  添加请求拦截器
axios.interceptors.request.use(function (config) {

  if(config.method =='post'){
    config.data = qs.stringify(config.data);
  }
  // 在发送请求之前做些什么
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  });
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Indicator.close();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



