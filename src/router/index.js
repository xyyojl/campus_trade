import Vue from 'vue'
import Router from 'vue-router'

// 这里可以导入让用户访问的组件
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'

Vue.use(Router);

export default new Router({
    // 设置路由模式为‘history’，去掉默认的#
    mode: "history",
    routes:[
        // 路由列表
        {
            name: 'Home',
            path: '/',
            component: Home
        },
        {
            name: 'Login',
            path: '/login',
            component: Login 
        },
        {
            name: 'Register',
            path: '/register',
            component: Register 
        }
    ]
})