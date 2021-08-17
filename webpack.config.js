const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	plugins: [
		new webpack.ProvidePlugin({
			"jQuery": "jquery",
			"window.jQuery": "jquery",
			"jquery": "jquery",
			"window.jquery": "jquery",
			"$": "jquery",
			"window.$": "jquery"
		}),
		// Для просмотра структуры бандлов раскомментируйте следующую строку и перейти по ссылке http://localhost:8888/
		// new BundleAnalyzerPlugin()
	],

	entry: {
		libs: "./src/scripts/libs.js",
		index: "./src/scripts/index.js",
		article: "./src/scripts/article.js"
	},

	output: {
		filename: "[name].js",
		chunkFilename: "[name].js",
		publicPath: "/"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: require.resolve("babel-loader"),
					query: {
						presets: [
							["@babel/preset-env", { modules: false }]
						]
					}
				}
			}
		]
	},
};
