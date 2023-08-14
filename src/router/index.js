import Vue from "vue";
import VueRouter from "vue-router";

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import Center from '@/pages/Center'
import PaySuccess from '@/pages/PaySuccess'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'


import store from "@/store";
Vue.use(VueRouter)
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// const FoFo = ()=>{
//     console.log('搜索组件加载了...');
//     return import("@/pages/Search")
// }

let router = new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            meta: { showFooter: true }
        },
        {
            path: "/search/:keyword?",
            name: "search",
            component: () => import("@/pages/Search"),
            meta: { showFooter: true },
            props: ($route) => {
                return {
                    keyWord: $route.params.keyWord,
                    k: $route.query.k
                }
            }
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        },
        {
            path: "/detail/:skuid",
            name: "detail",
            component: Detail
        },
        {
            path: "/addcartsuccess",
            name: "addcartsuccess",
            component: AddCartSuccess
        },
        {
            path: "/shopcart",
            name: "shopcart",
            component: ShopCart
        },
        {
            path: "/trade",
            name: "trade",
            component: Trade,
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: "/pay",
            name: "pay",
            component: Pay,
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: "/center",
            name: "center",
            component: Center,
            children: [
                {
                    path: 'myorder',
                    component: MyOrder,
                },
                {
                    path: 'grouporder',
                    component: GroupOrder,
                },
                {
                    path: '',
                    redirect: "/center/myorder"
                }
            ]
        },
        {
            path: "/paySuccess",
            name: "paySuccess",
            component: PaySuccess,
            beforeEnter: (to, from, next) => {
                if (from.path.indexOf('/pay') != -1) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: "*",
            redirect: "/home"
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    console.log(to, from);
    let token = store.state.user.token
    if (token) {
        // 已登陆
        console.log(to);
        if (to.path == '/login') {
            // 去登录页
            next({ path: '/home' })
        } else {
            // 去非登录页 比如搜索页、详情页、购物车
            try {
                await store.dispatch('reqUserInfo')
                next()
            } catch (error) {
                // token 失效了
                await store.dispatch('reqUserLogout')
                next({ path: '/login' })
            }
        }
    } else {
        // 未登录
        let path = to.path
        if (path.indexOf('/center/myorder') != -1 || path.indexOf('/shopcart') != -1 || path.indexOf('/pay') != -1) {
            next('/login?redirct=' + path)
        } else {
            next()
        }
    }
})

export default router;