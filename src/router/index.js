import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    // 配置默认的路径，默认显示主页
    { path: '/', redirect: '/main' },
    {
        path: '/main',
        component: () => import('../components/main/home_page')
    },
    {
        path:'/login',
        component: () => import('../components//user/user_login')
    },
    {
        path:'/rockData',
        component: () => import('../components/search/rock_data')
    },
    {
        path:'/mineralData',
        component: () => import('../components/search/mineral_data')
    },
    {
        path:'/experimentData',
        component: () => import('../components/search/experiment_data')
    },
    {
        path:'/uploadOnline',
        component: () => import('../components/main/upload_online')
    },
    {
        path:'/expertData',
        component: () => import('../components/main/expert_data')
    },
    {
        path:'/rawCleanPair',
        component: () => import('../components/main/row_clean_pair')
    },
    {
        path:'/dataTemplate',
        component: () => import('../components/main/data_template')
    },
    {
        path:'/searchResult',
        component: () => import('../components/search/search_result')
    },
    {
        path:'/teamProject',
        component: () => import('../components/main/team_project')
    },
    {
        path:'/contactJoin',
        component: () => import('../components/main/contact_join')
    },
    {
        path:'/userCenter',
        component: () => import('../components/user/user_center'),
        children:[
            {   path: 'userMessage', 
                component: () => import('../components/user/user_message') 
            },
            {   path: 'userUploadStatus', 
                component: () => import('../components/user/user_upload_status') 
            },
            {   path: 'userReportStatus', 
                component: () => import('../components/user/user_report_status') 
            },
            {   path: 'userSearchHistory', 
                component: () => import('../components/user/user_search_history') 
            }
        ]
    },
    {
        path:'/manageCenter',
        component: () => import('../components/manage/manage_center'),
        children:[
            {   path: 'userMessage', 
                component: () => import('../components/manage/manage_message') 
            },
            {   path: 'uploadManage', 
                component: () => import('../components/manage/upload_manage') 
            },
            {   path: 'reportManage', 
                component: () => import('../components/manage/report_manage') 
            },
            {   path: 'userManage', 
                component: () => import('../components/manage/user_manage') 
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