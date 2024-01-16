import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    // 配置默认的路径，默认显示主页
    { path: '/', redirect: '/main' },
    {
        path: '/main',
        component: () => import('../views/main/home_page')
    },
    {
        path:'/login',
        component: () => import('../views//user/user_login')
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
    {
        path:'/userCenter',
        component: () => import('../views/user/user_center'),
        children:[
            {   path: 'userMessage', 
                component: () => import('../views/user/user_message') 
            },
            {   path: 'userUploadStatus', 
                component: () => import('../views/user/user_upload_status') 
            },
            {   path: 'userReportStatus', 
                component: () => import('../views/user/user_report_status') 
            },
            {   path: 'userSearchHistory', 
                component: () => import('../views/user/user_search_history') 
            }
        ]
    },
    {
        path:'/manageCenter',
        component: () => import('../views/manage/manage_center'),
        children:[
            {   path: 'userMessage', 
                component: () => import('../views/manage/manage_message') 
            },
            {   path: 'uploadManage', 
                component: () => import('../views/manage/upload_manage') 
            },
            {   path: 'reportManage', 
                component: () => import('../views/manage/report_manage') 
            },
            {   path: 'userManage', 
                component: () => import('../views/manage/user_manage') 
            }
        ]
    }
]

const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    base:process.env.BASE_URL,
    mode: 'history',
    routes //指定路由列表
})

export default router