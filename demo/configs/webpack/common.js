const { resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const TSLintPlugin = require('tslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const postcssConfig = require('./postcss')

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', 'sass', 'scss'],
    },
    context: resolve(__dirname, '../../src'),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    { loader: 'css-loader', options: { sourceMap: true } },
                    postcssConfig
                ],
            },
            {
                test: /\.(scss|sass)$/,
                loaders: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true } },
                    postcssConfig,
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets/'
					}
				}]
			},
            {
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}]
			},
        ],
    },
    plugins: [
        new CheckerPlugin(),
        new TSLintPlugin({ files: ['./src/**/*.ts*'], waitForLinting: true }),
        new HtmlWebpackPlugin({ template: 'index.html.ejs' }),
        new CopyWebpackPlugin([{
            from: resolve(__dirname, '../../src/assets/'),
            to: resolve(__dirname, '../../dist/assets'),
        }]),
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    performance: {
        hints: false,
    },
}
