var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	injext: 'body'
});
module.exports = {
	entry: [
		'./app/index.js'
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	output: {
		filename: 'index_bundle.js',
		path: __dirname + '/dist'
	},
	plugins: [HTMLWebpackPluginConfig]
}