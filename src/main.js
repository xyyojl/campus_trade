import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import settings from './settings'
import store from './store'

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

// 逻辑代码


// 登录权限控制

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('Token')
  if (token) {
    // 设置vuex状态已登陆
    store.dispatch('setToken', token)
    next()
    // 如果登陆了还要进入注册登录界面，重定向主页
    if (!to.meta.isLogin) {
      next({ path: '/' })
    }
    // 如果登陆标志不存在，就是没登录
  } else {
    // 要进入登陆后界面，给登陆界面
    if (to.meta.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})



// 创建vue实例开始
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
