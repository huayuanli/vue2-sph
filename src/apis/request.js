import axios from 'axios'
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000
})

// 添加请求拦截器
requests.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    nProgress.start()
    config.headers['userTempId'] = store.state.shopcart.uuid
    if (store.state.user.token) {
        config.headers['token'] = store.state.user.token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    nProgress.done()
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default requests;