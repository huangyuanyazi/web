/**
 * 专利查询前台构建配置
 * Created by Wangxy on 2017/6/15.
 */
let env = process.env.NODE_ENV || 'production'
console.log('构建时环境：' + env)

let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanPlugin = require('clean-webpack-plugin')
let path = require('path')

const Config = require('../libs/config')
let clientConfig = Config.get('client')
let buildConfig = Config.get('build')

let clientApiConfig = {
    api: {
        url: clientConfig.protocol + '://' + clientConfig.client.api.host + ':' + clientConfig.client.api.port + clientConfig.client.api.path
    },
    mock: {
        url: clientConfig.protocol + '://' + clientConfig.client.mock.host + ':' + clientConfig.client.mock.port
    },
    patent: {
        url: clientConfig.protocol + '://' + clientConfig.client.patent.host + ':' + clientConfig.client.patent.port
    },
    socket: {
        url: clientConfig.protocol + '://' + clientConfig.client.socket.host + ':' + clientConfig.client.socket.port
    },
    img: {
        url: clientConfig.protocol + '://' + clientConfig.client.img.host + ':' + clientConfig.client.img.port
    }
}

//let outputPath = path.resolve('../', 'static', 'patent')
//let publicPath = 'production' === env ? '/' : clientApiConfig.patent.url + '/'

let outputPath = ''
let publicPath = ''

if ('development' === env) {
    outputPath = path.join(__dirname, '..', 'patent', 'public')
    publicPath = clientApiConfig.patent.url + '/'
} else {
    outputPath = path.join(buildConfig.build[env].outputPath, 'patent')
    publicPath = buildConfig.build[env].publicPath + 'patent/'
}

let webpackConfig = {
    entry: {
        'index': path.resolve('patent', 'entry', 'index.js'),
        'login': path.resolve('patent', 'entry', 'login.js'),
        'mobile': path.resolve('patent', 'entry', 'mobile.js')
    },
    output: {
        path: outputPath,
        filename: 'script/[name]' + ('development' === env ? '' : '-[chunkhash]') + '.js',
        chunkFilename: 'script/chunk-[id]' + ('development' === env ? '' : '-[chunkhash]') + '.js',
        hashDigestLength: 8,
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract('css-loader')
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(['css-loader', 'less-loader'])
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'image/[name]' + ('development' === env ? '' : '-[hash:8]') + '.[ext]'
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
                loader: 'file-loader',
                options: {
                    name: 'font/[name]' + ('development' === env ? '' : '-[hash:8]') + '.[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            },
            'config': JSON.stringify(clientApiConfig)
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            moment: 'moment'
        }),
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: path.resolve('patent', 'view', 'index.html'),
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'view/login.html',
            template: path.resolve('patent', 'view', 'login.html'),
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            filename: 'view/mobile.html',
            template: path.resolve('patent', 'view', 'mobile.html'),
            chunks: ['mobile']
        }),
        new ExtractTextPlugin({
            filename: 'style/[name]' + ('development' === env ? '' : '-[chunkhash]') + '.css'
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'element-ui$': 'element-ui/lib/index.js',
            'asset': path.resolve('patent', 'asset'),
            'library': path.resolve('site', 'library'),
            'widget': path.resolve('site', 'widget'),
            'model': path.resolve('api', 'models')
        }
    }
}

if ('development' !== env) {
    webpackConfig.plugins.push(
        new CleanPlugin(['font', 'image', 'script', 'style'], {
            root: outputPath,
            verbose: true
        })
    )
}

if ('production' === env) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = webpackConfig