/**
 * admin web服务
 * Created by Wangxy on 2017/6/15.
 */
let env = process.env.NODE_ENV || 'production'

let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let path = require('path')
let moment = require('moment')
let http = require('http')
let httpRequest = require('../site/library/express-http-request')

let adminConfig = require('../libs/config').get('admin')

let adminApp = express()

adminApp.use(bodyParser.json())
adminApp.use(bodyParser.urlencoded({ extended: true }))

adminApp.use(cookieParser())

adminApp.use(httpRequest())

if ('development' === env) {
    let adminDev = require('../build/admin-dev')
    adminApp.use(adminDev.build())
    adminApp.use(adminDev.render())
} else {
    let staticPath = path.join(__dirname, '..', '..', 'static', 'admin')
    adminApp.use(express.static(staticPath))

    adminApp.engine('html', require('express-art-template'))
    adminApp.set('view options', {
        extname: '.html'
    })
    adminApp.set('view engine', 'html')
    adminApp.set('views', path.join(staticPath, 'view'))
}

adminApp.use('/', require('./route'))

let adminServer = http.createServer(adminApp)
adminServer.listen(adminConfig.admin.port, function () {
    let host = adminServer.address().address
    let port = adminServer.address().port
    console.log('admin服务(' + env + ')已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})