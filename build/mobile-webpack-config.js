/**
 * Created by Wangxy on 2017/4/11.
 */
let env = process.env.NODE_ENV || 'production'

let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')
let glob = require('glob')
let fs = require('fs')

const Config = require('../libs/config')
let clientConfig = Config.get('client')

let clientApiConfig = {
    api: {
        url: clientConfig.protocol + '://' + clientConfig.client.api.host + ':' + clientConfig.client.api.port + clientConfig.client.api.path
    },
    mock: {
        url: clientConfig.protocol + '://' + clientConfig.client.mock.host + ':' + clientConfig.client.mock.port
    },
    mobile: {
        url: clientConfig.protocol + '://' + clientConfig.client.mobile.host + ':' + clientConfig.client.mobile.port
    },
    site: {
        url: clientConfig.protocol + '://' + clientConfig.client.site.host + ':' + clientConfig.client.site.port
    },
    img: {
        url: clientConfig.protocol + '://' + clientConfig.client.img.host + ':' + clientConfig.client.img.port
    }
}

let outputPath = path.resolve('../', 'static', 'mobile')

let webpackConfig = {
    entry: {
        main: path.resolve('mobile', 'entry', 'main.js')
    },
    output: {
        path: outputPath,
        filename: '[name].js',
        chunkFilename: 'script/chunk-[id].js',
        hashDigestLength: 8,
        publicPath: ''
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
            } , {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'image/[name].[ext]'
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
                loader: 'file-loader',
                options: {
                    name: 'font/[name].[ext]'
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
            $: 'jquery',
            jQuery: 'jquery',
            co: "co",
            moment: 'moment'
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new CopyWebpackPlugin([
            {from: 'mobile/page', to: 'page'}
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'mobile/view/index.html'
        })
    ]
}

module.exports = webpackConfig