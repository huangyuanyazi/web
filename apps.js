/**
 * 多个服务统一启动入口（暂时用于开发环境）
 * Created by Wangxy on 2017/4/10.
 */
let env = process.env.NODE_ENV || 'production'

if('development' === env) {
    require('./mock/app')
}

let express = require('express'),
    http = require('http'),
    path = require('path'),
    httpProxy = require('http-proxy'),
    moment = require('moment')

/*
let staticPath = path.join(__dirname, '..', '..', 'static')
let cdnApp = express()
cdnApp.use(express.static(staticPath))
*/

let proxy = httpProxy.createProxy()

proxy.on('error', function (error, requset, response) {
    response.writeHead(500, {
        'Content-Type': 'text/plain'
    })
    response.end('Something went wrong. And we are reporting a custom error message.')
})

let proxyServer = http.createServer(function (requset, response) {
    let host = requset.headers.host
    switch (host) {
        case 'www1.tq.com':
            proxy.web(requset, response, { target: 'http://localhost:8081' })
            break
        case 'm.tq.com':
            proxy.web(requset, response, { target: 'http://localhost:8082' })
            break
        case 'admin1.tq.com':
            proxy.web(requset, response, { target: 'http://localhost:8083' })
            break
        case 'zl.tq.com':
            proxy.web(requset, response, { target: 'http://localhost:8084' })
            break
        case 'mock.tq.com':
            proxy.web(requset, response, { target: 'http://localhost:9093' })
            break
        default:
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            response.end('Welcome to my server!')
    }
})

proxyServer.listen(80, function () {
    let host = proxyServer.address().address
    let port = proxyServer.address().port
    console.log('proxy服务(' + env + ')已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})