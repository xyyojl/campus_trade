import Vue from 'vue'
import Router from 'vue-router'

// 这里可以导入让用户访问的组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Register from '../components/Register'
import GoodDetail from '../components/GoodDetail'
import UserInfo from '../components/UserInfo'

Vue.use(Router);

export default new Router({
    // 设置路由模式为'history'，去掉默认的#
    mode: "history",
    routes: [
        // 路由列表
        {
            name: 'Home',
            path: '/',
            components: {
                default: Home,
                header: Header,
                footer: Footer
            },
            meta: { isLogin: false }
        },
        {
            name: 'Login',
            path: '/login',
            component: Login,
            meta: { isLogin: false }
        },
        {
            name: 'Register',
            path: '/register',
            component: Register,
            meta: { isLogin: false }
        },
        // 未实现
        {
            name: 'goods',
            path: 'goods',
            components: GoodDetail,
            meta: { isLogin: true },
            children: [
                {
                    path: ':id',
                    name: 'goodsDetail',
                    component: GoodDetail,
                    meta: { isLogin: true }
                }
            ]
        },
        {
            name: 'GoodDetail',
            path: '/good_detail',
            component: GoodDetail
        },
        {
            name: 'UserInfo',
            path: '/user_info',
            component: UserInfo
        },
    ]
})