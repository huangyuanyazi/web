/**
 * mock服务
 */
let jsonServer = require('json-server')
let path = require('path')
let glob = require('glob')
let moment = require('moment')
let http = require('http')

const config = require('../libs/config').get('mock');

let mockApp = jsonServer.create()

mockApp.use(jsonServer.defaults())

//定义db.json以外的其他路由，优先级高于db.json
let routeRoot = path.join(__dirname, 'route')
glob.sync(routeRoot + '/**/').map(function (folder) {
    let routePath = folder.substring(routeRoot.length)
    glob.sync(folder + '*.js').map(function (file) {
        mockApp.use(routePath, require(file))
    })
})

mockApp.use(jsonServer.router(path.join(__dirname, 'db.json')))

//启动mock服务
let mockServer = http.createServer(mockApp)
mockServer.listen(config.mock.port, function () {
    let host = mockServer.address().address
    let port = mockServer.address().port
    console.log('mock服务已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})