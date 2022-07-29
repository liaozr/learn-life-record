'use strict';
const path = require('path');
const defaultSettings = require('./src/settings.js');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

function resolve(dir) {
	return path.join(__dirname, dir);
}

const name = defaultSettings.title || 'vue Admin'; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9527
const port = process.env.port || 9527; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
	/**
	 * You will need to set publicPath if you plan to deploy your site under a sub path,
	 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
	 * then publicPath should be set to "/bar/".
	 * In most cases please use '/' !!!
	 * Detail: https://cli.vuejs.org/config/#publicpath
	 */
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: true,
		},
		// 跨域代理
		// proxy: {
		//   [process.env.VUE_APP_BASE_API]: {
		//     target: process.env.VUE_APP_BASE_HOST,
		//     changeOrigin: true,
		//     pathRewrite: {
		//       ["^" + process.env.VUE_APP_BASE_API]: "",
		//     },
		//   },
		// },
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV !== 'production') return;
		return {
			name: name,
			resolve: {
				alias: {
					'@': resolve('src'),
					'@api': resolve('src/api'),
				},
			},
			plugins: [
				new PrerenderSPAPlugin({
					// 生成文件的路径，也可以与webpakc打包的一致。
					// 下面这句话非常重要！！！
					// 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
					staticDir: path.join(__dirname, 'dist'),
					// 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
					routes: [
						'/home',
						'/about',
						'/service',
						'/ceses',
						'/news/list',
						'/news/detail/id',
						'/tools',
						'/contact',
					],
					// 这个很重要，如果没有配置这段，也不会进行预编译
					renderer: new Renderer({
						inject: {
							foo: 'bar',
						},
						headless: false,
						// 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
						renderAfterDocumentEvent: 'render-event',
					}),
				}),
			],
		};
	},
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "~@/styles/variables.scss";`,
			},
		},
	},
	chainWebpack(config) {
		// it can improve the speed of the first screen, it is recommended to turn on preload
		config.plugin('preload').tap(() => [
			{
				rel: 'preload',
				// to ignore runtime.js
				// https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
				fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
				include: 'initial',
			},
		]);

		// when there are many pages, it will cause too many meaningless requests
		config.plugins.delete('prefetch');
	},
};
