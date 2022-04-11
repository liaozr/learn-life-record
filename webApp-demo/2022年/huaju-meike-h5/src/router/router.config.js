/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '华钜美科', keepAlive: false }
      },
      {
        path: '/into-huamei',
        name: 'intoHuamei',
        component: () => import('@/views/into-huamei/index'),
        meta: { title: '走进华美', keepAlive: false }
      },
	  {
	    path: '/into-huamei/honor',
	    name: 'intoHuamei',
	    component: () => import('@/views/into-huamei/honor'),
	    meta: { title: '走进华美', keepAlive: false }
	  },
	  {
	    path: '/into-huamei/culture',
	    name: 'intoHuamei',
	    component: () => import('@/views/into-huamei/culture'),
	    meta: { title: '走进华美', keepAlive: false }
	  },
	  {
	    path: '/into-huamei/elegant',
	    name: 'intoHuamei',
	    component: () => import('@/views/into-huamei/elegant'),
	    meta: { title: '走进华美', keepAlive: false }
	  },
      {
        path: '/meituan-operate',
        name: 'meituanOperate',
        component: () => import('@/views/meituan-operate/index'),
        meta: { title: '美团代运营', keepAlive: false }
      },
      {
        path: '/brand-operate',
        name: 'brandOperate',
        component: () => import('@/views/brand-operate/index'),
        meta: { title: '品牌运营', keepAlive: false }
      },
      {
        path: '/meiti-operate',
        name: 'meitiOperate',
        component: () => import('@/views/meiti-operate/index'),
        meta: { title: '新媒体运营', keepAlive: false }
      },
      {
        path: '/siyu-operate',
        name: 'siyuOperate',
        component: () => import('@/views/siyu-operate/index'),
        meta: { title: '私域运营', keepAlive: false }
      },
      {
        path: '/market-case',
        name: 'marketCase',
        component: () => import('@/views/market-case/index'),
        meta: { title: '营销案例', keepAlive: false }
      },
      {
        path: '/contact-us',
        name: 'contactUs',
        component: () => import('@/views/contact-us/index'),
        meta: { title: '联系我们', keepAlive: false }
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('@/views/news/index'),
        meta: { title: '新闻资讯', keepAlive: true }
      },
      {
        path: '/news-detail/id/:id',
        name: 'newsDetail',
        component: () => import('@/views/news/detail'),
        meta: { title: '详情', keepAlive: true }
      }
    ]
  }
]
