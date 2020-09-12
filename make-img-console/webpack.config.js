const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin') // 压缩
// const CleanWebpackPlugin  = require('clean-webpack-plugin')
 module.exports = {
    devtool: false, //'inline-source-map',
    entry: {
        index: './src/index.js',
        vendor: ['react','react-dom','react-router-dom', 'antd', 'axios']
    },
    output: {
        publicPath: '/',
        filename: '[name].js', //出口名称
        path: path.resolve(__dirname, 'build')
    },
    resolve:{
        extensions:['.js','.css','.json'] //用于配置程序可以自行补全哪些文件后缀
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader:['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }
       ]
    },
    devServer: {
        contentBase: './build',
        port: 8081,
        inline: true,
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:2020',
                changeOrigin: true,
              }
        }
    },
    plugins: [
        new ExtractTextPlugin("[name].[hash].css"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'src/index.html'
        }),
        new UglifyJSPlugin()
    ]
}