/**
 * 专利查询前台web服务
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

let patentConfig = require('../libs/config').get('patent')

let patentApp = express()

patentApp.use(bodyParser.json())
patentApp.use(bodyParser.urlencoded({ extended: true }))

patentApp.use(cookieParser())

patentApp.use(httpRequest())

if ('development' === env) {
    let patentDev = require('../build/patent-dev')
    patentApp.use(patentDev.build())
    patentApp.use(patentDev.render())
} else {
    //let staticPath = path.resolve('../', 'static', 'patent')
    let staticPath = path.join(__dirname, '..', '..', 'static', 'patent')

    //patentApp.use(express.static(staticPath))

    patentApp.engine('html', require('express-art-template'))
    patentApp.set('view options', {
        extname: '.html'
    })
    patentApp.set('view engine', 'html')
    //patentApp.set('views', path.resolve('../', 'static', 'patent', 'view'))
    patentApp.set('views', path.join(staticPath, 'view'))
}

patentApp.use('/', require('./route'))

let patentServer = http.createServer(patentApp)
patentServer.listen(patentConfig.patent.port, function () {
    let host = patentServer.address().address
    let port = patentServer.address().port
    console.log('patent服务(' + env + ')已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})