/**
 * Created by Wangxy on 2017/6/15.
 */
let devMiddleware = require('webpack-dev-middleware')
let webpack = require('webpack')
let path = require('path')
let template = require('art-template')
let patentWebpackConfig = require('./patent-webpack-config')

let patentCompiler = webpack(patentWebpackConfig)

let patentDev = {
    build: function () {
        console.log('开始构建patent项目...')
        return devMiddleware(patentCompiler, {
            stats: {
                colors: true
            }
        })
    },
    render: function () {
        return function (request, response, next) {
            //重写render函数
            response.render = (view, locals) => {
                patentCompiler.outputFileSystem.readFile(path.join(patentCompiler.outputPath, 'view', view + '.html'), (err, result) => {
                    response.set('Content-Type', 'text/html')
                    if (err) {
                        response.send(err)
                    } else {
                        let html = template.render(result.toString(), locals, { extname: '.html' })
                        response.send(html)
                    }
                })
            }
            next()
        }
    }
}

module.exports = patentDev