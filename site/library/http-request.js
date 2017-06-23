/**
 * api请求封装
 * 运行环境：仅适用于浏览器环境
 * 使用方法：本脚本导出的是axios实例，代码的写法请参照axios帮助文档
 * Created by Wangxy on 2017/3/16.
 */
import axios from 'axios'

let axiosInstance = axios.create()

// 请求时携带Cookie
axiosInstance.defaults.withCredentials = true

// api的根url
let baseUrl = config.api.url

axiosInstance.interceptors.request.use(cfg => {
    // 如果请求地址不是一个完整的http url，则自动将api的根url附加到请求地址
    if(-1 === cfg.url.indexOf('http://'))
        cfg.url = baseUrl + cfg.url
    cfg['headers']['access-token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwia2V5IjoiMTExMTExIn0.aRnB9J6_6GM37HE_wNqjUeEIo6iwXkcMkh1t89ysKps'
    return cfg
}, err => {
    //console.log(err)
    return Promise.reject(err)
})

axiosInstance.interceptors.response.use(res => {
    return res
}, err => {
    alert(JSON.stringify(err.response.data))
    //if(401 === err.response.status)
    //   location.href = '/login'
    return Promise.reject(err)
})

export default axiosInstance