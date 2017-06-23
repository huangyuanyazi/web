/**
 * mobile dev服务
 * Created by Wangxy on 2017/4/10.
 */
let devMiddleware = require('webpack-dev-middleware')
let webpack = require('webpack')
let mobileWebpackConfig = require('./mobile-webpack-config')

let mobileCompiler = webpack(mobileWebpackConfig)

let mobileDev = {
    build: function () {
        console.log('开始构建mobile项目...')
        return devMiddleware(mobileCompiler, {
            stats: {
                colors: true
            }
        })
    }
}

module.exports = mobileDev