import router from './router';
// import store from "./store";
// import { Message } from "element-ui";
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

router.beforeEach((to, from, next) => {
	// start progress bar
	NProgress.start();

	// set page title
	document.title = getPageTitle(to.meta.title);
	window.scrollTo({
		top: 0, // 需要滚动的距离
		// behavior: 'smooth', // 平滑滚动到顶部
	});
	// determine whether the user has logged in
	next();
	NProgress.done();
});

router.afterEach(() => {
	// finish progress bar
});
