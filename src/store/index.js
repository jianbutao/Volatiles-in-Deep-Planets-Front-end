import Vue from 'vue'
import Vuex from 'vuex'
import { loginURL } from './loginURL'

Vue.use(Vuex)

const state = {
    userStatus: 'login',
    userName: '',
    showPassForm: false,
}

const actions = {
    login({ commit }, context) {
        const loginUrl = loginURL.baseURL + loginURL.login;
    
        const params = {
          appCode: loginURL.appCode,
          context: context,
        };
    
        params.context = btoa(params.context);
    
        const queryString = Object.keys(params)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');
    
        const urlWithParams = `${loginUrl}?${queryString}`;
        window.location.href = urlWithParams;
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
}

const getters = {}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
})