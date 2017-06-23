/**
 * Created by Wangxy on 2017/6/15.
 */
let env = process.env.NODE_ENV || 'production'

let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanPlugin = require('clean-webpack-plugin')
let path = require('path')

const Config = require('../libs/config')
let clientConfig = Config.get('client')

let clientApiConfig = {
    api: {
        url: clientConfig.protocol + '://' + clientConfig.client.api.host + ':' + clientConfig.client.api.port + clientConfig.client.api.path
    },
    mock: {
        url: clientConfig.protocol + '://' + clientConfig.client.mock.host + ':' + clientConfig.client.mock.port
    },
    site: {
        url: clientConfig.protocol + '://' + clientConfig.client.site.host + ':' + clientConfig.client.site.port
    },
    admin: {
        url: clientConfig.protocol + '://' + clientConfig.client.admin.host + ':' + clientConfig.client.admin.port
    },
    socket: {
        url: clientConfig.protocol + '://' + clientConfig.client.socket.host + ':' + clientConfig.client.socket.port
    },
    img: {
        url: clientConfig.protocol + '://' + clientConfig.client.img.host + ':' + clientConfig.client.img.port
    }
}

let outputPath = path.resolve('../', 'static', 'admin')
let publicPath = 'production' === env ? '/' : clientApiConfig.admin.url + '/'

let webpackConfig = {
    entry: {
        'index': path.resolve('admin', 'entry', 'index'),
        'login': path.resolve('admin', 'entry', 'login')
    },
    output: {
        path: outputPath,
        filename: 'script/[name]' + ('production' === env ? '-[chunkhash]' : '') + '.js',
        chunkFilename: 'script/chunk-[id]' + ('production' === env ? '-[chunkhash]' : '') + '.js',
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
                    name: 'image/[name]' + ('production' === env ? '-[hash:8]' : '') + '.[ext]'
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
                loader: 'file-loader',
                options: {
                    name: 'font/[name]' + ('production' === env ? '-[hash:8]' : '') + '.[ext]'
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
            template: path.resolve('admin', 'view', 'index.html'),
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'view/login.html',
            template: path.resolve('admin', 'view', 'login.html'),
            chunks: ['login']
        }),
        new ExtractTextPlugin({
            filename: 'style/[name]' + ('production' === env ? '-[chunkhash]' : '') + '.css'
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'element-ui$': 'element-ui/lib/index.js',
            'asset': path.resolve('admin', 'asset'),
            'library': path.resolve('site', 'library'),
            'widget': path.resolve('site', 'widget'),
            'model': path.resolve('api', 'models')
        }
    }
}

if ('production' === env) {
    webpackConfig.plugins.push(
        new CleanPlugin(['font', 'image', 'script', 'style'], {
            root: outputPath,
            verbose: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = webpackConfig