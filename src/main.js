import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/style.scss';
import router from "./router"
import store from './store'
import service from './request/http'
import VueCookies from "vue-cookies";
import './styles/globalStyle.less';
import './styles/font.less';

// 导航守卫
router.beforeEach((to, from, next) => {
  const notAllowedPaths = ['/uploadOnline', '/uploadBatch'];

  // 如果 to.path 在 allowedPaths 中，则正常跳转，否则检查登录状态
  if ((!notAllowedPaths.includes(to.path)) || hasLogin()) {
    next();
  } else {
    // 用户未登录且访问了不允许的页面，跳转到登录页面
    next('/main');
  }

});
  
//判断是否登录
function hasLogin() {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] === "token") {
        return true;
        }
    }
    return false;
}

Vue.use(VueCookies);
Vue.prototype.$service = service
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
