import Vue from 'vue'
import Vuex from 'vuex'
import Router from '@/router'
import { loginURL } from './loginURL'

Vue.use(Vuex)

const state = {
    userStatus: 'login',
    userName: '',
    showPassForm: false,
    isAdmin: false,
}

const actions = {
    // dde login

    // login({ commit }, context) {
    //     // loginUrl: https://user-oneid.deep-time.org/ngiam-rst/v1/sdk/login/sso
    //     const loginUrl = loginURL.baseURL + loginURL.login;
    //     // loginParams
    //     const params = {
    //       appCode: loginURL.appCode,
    //       context: context,
    //     };
    
    //     params.context = btoa(params.context);
    
    //     const queryString = Object.keys(params)
    //       .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    //       .join('&');
    
    //     const urlWithParams = `${loginUrl}?${queryString}`;
    //     window.location.href = urlWithParams;
    // },

    login({ commit }, context) {
        Router.push({ path: "/login" });
    },

    loginCheck({ dispatch }) {
        let cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split("=");
            if (cookie[0] === "token") {
                dispatch('login', 'context_value');
            }
        }
        return true;
    }
}

const mutations = {
    setUserStatus(state, status) {
        state.userStatus = status;
    },
    setUserName(state, userName) {
        state.userName = userName;
    },
    showPassForm(state) {
        state.showPassForm = true;
    },
    setUserAdmin(state, admin){
        state.isAdmin = admin;
    }
}

const getters = {}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
})