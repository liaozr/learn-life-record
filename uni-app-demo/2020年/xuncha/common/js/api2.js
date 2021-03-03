var api = {
	BASE_URL: 'http://192.168.1.203:8080',
	saveSuperviseTask:'/eidpws/work/superviseTask/saveSuperviseTask',
	findSuperviseTaskList:'/eidpws/work/superviseTask/findSuperviseTaskList',
	findSuperviseList:'/eidpws/work/supervise/findSuperviseList',
	findSuperviseById:'/eidpws/work/supervise/findSuperviseById',
	findDetailList:'/eidpws/wxTrace/wxSupervise/findDetailList'
}
export default function(option) {
	if (!api[option.url]) {
		uni.showToast({
			icon: 'none',
			duration: 2000,
			title: '请求路径不在接口列表中'
		});
		return;
	}
	if (option.showLoading) {
		uni.showLoading({
			mask: true,
			title: option.loadingText
		})
	}
	let url = api.BASE_URL + api[option.url];
	function fail(e) {
		console.log('fail:' + url)
		console.log(e);
		if (option.fail) {
			option.fail(e)
		} else {
			uni.showToast({
				icon: 'none',
				duration: 2000,
				title: e.errMsg || '网络请求失败'
			})
		}
	}
	
	return uni.request({
		url: url,
		data: option.data || {},
		method: option.method || 'GET',
		success: (res) => {
		 
				console.log('success:' + url)
				console.log(res);
				option.success && option.success(res.data);
			 
		},
		fail,
		complete() {
			if (option.showLoading) {
				uni.hideLoading();
			}

			option.complete && option.complete();
		}
	});
}
