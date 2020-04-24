var path=require('path');

module.exports = {
	entry: './index.js',
	output: {
		path:path.join(__dirname,'dist'),  
		publicPath:'./dist/',        
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader']
		}]
	}
};