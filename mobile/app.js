/**
 * mobile web服务
 * Created by Wangxy on 2017/4/11.
 */
let env = process.env.NODE_ENV || 'production'

let express = require('express')
let path = require('path')
let moment = require('moment')
let http = require('http')

const config = require('../libs/config').get('mobile')

let mobileApp = express()

if ('development' === env) {
    let mobileDev = require('../build/mobile-dev')
    mobileApp.use(mobileDev.build())
} else {
    //托管public下的静态资源（无需通过路由）
    let staticPath = path.join(__dirname, '..', '..', 'static', 'mobile')
    mobileApp.use(express.static(staticPath))
}

//启动web服务
let mobileServer = http.createServer(mobileApp)
mobileServer.listen(config.mobile.port, function () {
    let host = mobileServer.address().address
    let port = mobileServer.address().port
    console.log('mobile服务(' + env + ')已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})