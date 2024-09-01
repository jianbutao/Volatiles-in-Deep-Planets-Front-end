import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    // 配置默认的路径，默认显示主页
    { path: '/', redirect: '/main' },
    {
        path: '/main',
        component: () => import('../views/main/home_page')
    },
    {
        path:'/login',
        component: () => import('../views/user/user_login')
    },
    {
        path:'/rockData',
        component: () => import('../views/search/rock_data')
    },
    {
        path:'/mineralData',
        component: () => import('../views/search/mineral_data')
    },
    {
        path:'/experimentData',
        component: () => import('../views/search/experiment_data')
    },
    {
        path:'/uploadOnline',
        component: () => import('../views/main/upload_online')
    },
    {
        path:'/uploadBatch',
        component: () => import('../views/main/upload_batch')
    },
    {
        path:'/expertData',
        component: () => import('../views/main/expert_data')
    },
    {
        path:'/rawCleanPair',
        component: () => import('../views/main/row_clean_pair')
    },
    {
        path:'/dataTemplate',
        component: () => import('../views/main/data_template')
    },
    {
        path:'/searchResult',
        component: () => import('../views/search/search_result')
    },
    {
        path:'/teamProject',
        component: () => import('../views/main/team_project')
    },
    {
        path:'/contactJoin',
        component: () => import('../views/main/contact_join')
    },
]

const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    base:process.env.BASE_URL,
    mode: 'history',
    routes //指定路由列表
})


export default router