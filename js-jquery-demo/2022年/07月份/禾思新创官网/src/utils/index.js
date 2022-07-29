export const fileUrl = 'https://admin.hjtc123.com';

// 函数防抖,多少秒内只允许执行一次，重复点击会重新计时
let timeout = null;
export function debounce(fn, wait = 500) {
	if (timeout !== null) clearTimeout(timeout);
	timeout = setTimeout(() => {
		fn();
	}, wait);
}
// 函数节流,多少秒内只允许执行一次，重复点击会无视
let throtteStatus = false;
export function throtte(fn, wait = 500) {
	if (throtteStatus) return;
	throtteStatus = true;
	fn();
	setTimeout(() => {
		throtteStatus = false;
	}, wait);
}
