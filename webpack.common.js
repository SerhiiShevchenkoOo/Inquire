const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: '[name].[contenthash].js',
		path: path.join(__dirname, 'dist'),
		clean: true,
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@': path.join(__dirname, 'src'),
		},
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(dotenv.config().parsed), // it will automatically pick up key values from .env file
		}),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html',
			favicon: './public/llama.png',
		}),
	],
	module: {
		rules: [
			{
				test: /\/.html$/,
				type: 'asset/resource',
			},
			{
				test: /\.(ts|js)x?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(png|jpe?g|gif|webp)$/,
				type: 'asset',
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				type: 'asset/resource',
			},
			{
				test: /\.svg$/,
				//	type: 'asset/resource',
				use: ['@svgr/webpack'],
			},
		],
	},
}
