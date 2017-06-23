/**
 * Created by Wangxy on 2017/6/15.
 */
let devMiddleware = require('webpack-dev-middleware')
let webpack = require('webpack')
let path = require('path')
let template = require('art-template')
let adminWebpackConfig = require('./admin-webpack-config')

let adminCompiler = webpack(adminWebpackConfig)

let adminDev = {
    build: function () {
        console.log('开始构建admin项目...')
        return devMiddleware(adminCompiler, {
            stats: {
                colors: true
            }
        })
    },
    render: function () {
        return function (request, response, next) {
            //重写render函数
            response.render = (view, locals) => {
                adminCompiler.outputFileSystem.readFile(path.join(adminCompiler.outputPath, 'view', view + '.html'), (err, result) => {
                    response.set('Content-Type', 'text/html')
                    if (err) {
                        response.send(err)
                    } else {
                        let html = template.render(result.toString(), locals, {root: path.resolve('admin', 'view'), extname: '.html' })
                        response.send(html)
                    }
                })
            }
            next()
        }
    }
}

module.exports = adminDev