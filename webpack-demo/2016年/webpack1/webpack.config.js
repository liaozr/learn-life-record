module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,//放到当前目录下
		filename: 'bundle.js'//文件名为 bundle.js
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader']
		}]
	}
};