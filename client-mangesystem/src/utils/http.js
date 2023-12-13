import axios from "axios";
const http = axios.create({
    baseURL: "",
    timeout:5000,
})
// 添加请求拦截器
http.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    // 在最后必须返回 config
    return config;
})