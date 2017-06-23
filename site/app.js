/**
 * site web服务
 */
let env = process.env.NODE_ENV || 'production'

let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let path = require('path')
let glob = require('glob')
let moment = require('moment')
let http = require('http')
let httpRequest = require('./library/express-http-request')

let siteConfig = require('../libs/config').get('site')

let siteApp = express()

siteApp.use(bodyParser.json())
siteApp.use(bodyParser.urlencoded({ extended: true }))

siteApp.use(cookieParser())

//载入资源清单（asset变量可在模板中直接引用）
//siteApp.locals.asset = require(path.join(staticPath, 'manifest.json'))

//使用api请求中间件
siteApp.use(httpRequest())

if ('development' === env) {
    let siteDev = require('../build/site-dev')
    siteApp.use(siteDev.build())
    siteApp.use(siteDev.render())
} else {
    let staticPath = path.join(__dirname, '..', '..', 'static', 'site')

    //托管public下的静态资源（无需通过路由）
    siteApp.use(express.static(staticPath))

    //采用art-template模板引擎
    siteApp.engine('html', require('express-art-template'))
    siteApp.set('view options', {
        extname: '.html',
        imports: require('./library/template-filter')
    })
    siteApp.set('view engine', 'html')

    //设置模板文件根路径
    siteApp.set('views', path.join(staticPath, 'view'))
}

//自动加载route目录下的所有路由文件
let routeRoot = path.join(__dirname, 'route')
glob.sync(routeRoot + '/**/').map(function (folder) {
    let routePath = folder.substring(routeRoot.length)
    glob.sync(folder + '*.js').map(function (file) {
        siteApp.use(routePath, require(file))
    })
})

//启动web服务
let siteServer = http.createServer(siteApp)
siteServer.listen(siteConfig.site.port, function () {
    let host = siteServer.address().address
    let port = siteServer.address().port
    console.log('site服务(' + env + ')已启动，主机：' + host + '，端口：' + port + ' [' + moment().format('YYYY-MM-DD HH:mm:ss') + ']')
})