import axios from "axios";
//让 axios 将 cookie 发送到服务器，并在响应中接收 cookie
axios.defaults.withCredentials = true
let baseURL = process.env.VUE_APP_BASE_API;

const service = axios.create({
    baseURL,
    timeout:3000000,//请求超时时间,
    withCredentials:true,//是否跨站点访问请求控制
})

//封装请求
service.interceptors.request.use((config) => {
    return config;
},(error) => {
    console.log(error)
    return Promise.resolve(error);
})

//封装返回
service.interceptors.response.use((response) => {
    return Promise.resolve(response);
},(error) => {
    console.log(error.response)
    return Promise.resolve(error.response);
})
export default service