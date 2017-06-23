/**
 * api请求中间件
 * 主要作用：请求时携带浏览器cookie，响应时将cookie写入浏览器
 * 使用方法：在express路由中，使用request.http(options)来调用axios实例，代码的写法请参照axios帮助文档
 * options说明：
 *      {
 *          inner: Boolean //如果是调用内部api接口，则设置为true
 *      }
 *
 * Created by Wangxy on 2017/5/18.
 */
let axios = require('axios')
let _ = require('lodash')

let config = require('../../libs/config').get()

// api的根路径
let baseUrl = config.protocol + '://' + config.api.host + ':' + config.api.port + config.api.path

// 内部api的根路径
let innerBaseUrl = config.protocol + '://' + config.backend.host + ':' + config.backend.port + config.api.path

module.exports = function () {
    return function (request, response, next) {
        request.http = function (options) {
            let defaults = {
                inner: false
            }

            // options中的属性覆盖defaults中的属性
            _.assign(defaults, options)

            // 创建一个axios实例
            let axiosInstance = axios.create()

            axiosInstance.interceptors.request.use(cfg => {
                // 自定义一个请求头，将当前用户访问的host值，传递给接口
                cfg.headers['x-forwarded-host'] = request.headers['host']

                // 如果传入的请求地址是一个相对路径，则自动将api的根路径附加到请求地址的前面
                if(-1 === cfg.url.indexOf('http://'))
                    cfg.url = (defaults.inner ? innerBaseUrl : baseUrl) + cfg.url
                if(request.cookies['access-token'])
                    cfg.headers['cookie'] = 'access-token=' + request.cookies['access-token']
                return cfg
            }, err => {
                //console.log(err)
                return Promise.reject(err)
            })

            axiosInstance.interceptors.response.use(res => {
                if(res.headers['set-cookie'])
                    response.set('set-cookie', res.headers['set-cookie'])
                return res
            }, err => {
                //console.log(err)
                //response.json(['API调用异常', err.toString()])
                return Promise.reject(err)
            })
            return axiosInstance
        }

        next()
    }
}