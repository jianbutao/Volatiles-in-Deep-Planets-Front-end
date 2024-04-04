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
import { eventTrackingInfo } from './store/eventTracking';
import { AutoReport } from 'dde-log-reporter';

// const targetUrl = "/report/";
// const channel = eventTrackingInfo.channel;
// const authUrl = eventTrackingInfo.auth;
// const userID = "guest";
// const reporter = new AutoReport(channel, targetUrl , authUrl, userID);
// console.log(reporter.init())

Vue.use(VueCookies);
Vue.prototype.$service = service
// Vue.prototype.$reporter =reporter
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
