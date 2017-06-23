/**
 * Created by Wangxy on 2017/6/22.
 */
let env = process.env.NODE_ENV || 'production'

let webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path')

let outputPath = path.join(__dirname, '..', '..', 'static', 'vendor')
//let outputPath = path.join(__dirname, '..', 'site', 'public')

let webpackConfig = {
    entry: {
        index: [
            'vue/dist/vue.common.js',
            'element-ui/lib/index.js',
            //'element-ui/lib/theme-default/index.css',
            'font-awesome/css/font-awesome.css',
            'lodash',
            'moment',
            'jquery'
        ]
    },
    output: {
        path: outputPath,
        filename: 'index-[hash].js',
        library: '[name]_[hash]',
        hashDigestLength: 8
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract('css-loader')
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?.*$|$)/,
                loader: 'file-loader',
                options: {
                    name: '[name]' + ('production' === env ? '-[hash:8]' : '') + '.[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name]' + ('production' === env ? '-[hash]' : '') + '.css'
        }),
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]_[hash]',
            path: path.join(outputPath, 'manifest.json')
        })
    ]
}

module.exports = webpackConfig