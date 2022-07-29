import Vue from 'vue';
import VueRouter from 'vue-router';
import layout from '@/layout/index.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: layout,
		redirect: '/home',
		// meta: { title: '主页', icon: 'el-icon-s-home' },
		children: [
			{
				path: 'home',
				name: 'Home',
				component: () => import('@/views/home/index'),
				meta: {
					title: '首页',
				},
			},
			{
				path: 'about',
				name: 'about',
				component: () => import('@/views/about/index'),
				meta: {
					title: '关于禾思新创',
				},
			},
			{
				path: 'service',
				name: 'service',
				component: () => import('@/views/service/index'),
				meta: {
					title: '服务项目',
				},
			},
			{
				path: 'ceses',
				name: 'ceses',
				component: () => import('@/views/ceses/index'),
				meta: {
					title: '客户案例',
				},
			},
			{
				path: 'news',
				name: 'news',
				component: () => import('@/views/news/index'),
				redirect: '/news/list',
				children: [
					{
						path: 'list',
						name: 'List',
						component: () => import('@/views/news/list'),
						meta: {
							title: '新闻中心',
						},
					},
					{
						path: 'detail/:id',
						name: 'newsDetail',
						component: () => import('@/views/news/detail'),
						meta: { title: '新闻详情' },
					},
				],
			},
			{
				path: 'tools',
				name: 'tools',
				component: () => import('@/views/tools/index'),
				meta: {
					title: '工具资源',
				},
			},
			{
				path: 'contact',
				name: 'contact',
				component: () => import('@/views/contact/index'),
				meta: {
					title: '联系我们',
				},
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
