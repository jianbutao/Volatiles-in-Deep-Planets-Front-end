import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 
// 用来存储数据
const state = {
    userStatus:'login',//初始设为登录状态
    userName: '',//记录登录用户名
    showPassForm: false,//控制修改密码对话框
}
// 响应组件中的事件
const actions = {
 
}
// 操作方法
const mutations = {
    setUserStatus(state,status){
        state.userStatus = status;
    },
    setUserName(state,userName){
        state.userName = userName;
    },
    showPassForm(state) {
        state.showPassForm = true;
    },
}
// 用来将state数据进行加工
const getters = {
 
}
// 新建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
})
 