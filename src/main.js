import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import settings from './settings'

// 引入初始化 CSS 代码
import "../static/css/reset.min.css";
// 导入 axios
import axios from 'axios';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios; // 把对象挂载 vue 中

Vue.config.productionTip = false
Vue.prototype.$settings = settings;

// elementUI 导入
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 调用插件
Vue.use(elementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
