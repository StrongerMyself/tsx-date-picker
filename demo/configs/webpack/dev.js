const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./common')
const { resolve } = require('path')
const Dotenv = require('dotenv-webpack')

const port = process.env.PORT || 8000

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:' + port,
        'webpack-dev-server/client?http://localhost:' + port + '/',
        'webpack/hot/only-dev-server',
        './index.tsx'
    ],
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new Dotenv({
			path: resolve(__dirname, '../../.env'),
		}),
    ],
    devServer: {
        // watch: true,
        hot: true,
        historyApiFallback: true,
        // mode: 'development',
        port: port,
    },
})
