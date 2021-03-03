var api = {
	BASE_URL: 'https://vop.oksales.net',
	WXLOGIN: '/eidpws/wxTrace/wxLogin/wxLogin', //登录
	GETMENU: '/eidpws/wxTrace/wxLogin/getMenu', //获取菜单
	FINDNORMALCUSTOMERSAFETYTASKDANGERS: '/eidpws/wxTrace/wxSafety/findNormalCustomerSafetyTaskDangers', //居民隐患查询
	FINDAREA: '/eidpws/wxTrace/wxSafety/findArea', //查询区
	FINDSTREET: '/eidpws/wxTrace/wxSafety/findStreet', //查询街道
	FINDCOMMUNITYREPOSITORY: '/eidpws/wxTrace/wxSafety/findCommunityRepository', //查询社区
	NORMALCUSTOMERSAFETYTASKSAVE: '/eidpws/wxTrace/wxSafety/normalCustomerSafetyTaskSave', //居民安检保存
	FINDCUSTOMERSAFETYTASKAUDIT: '/eidpws/wxTrace/wxSafety/findCustomerSafetyTaskAudit', //安检记录
	SAFETYTASKRESULTSAVE: '/eidpws/wxTrace/wxSafety/safetyTaskResultSave', //安检整改
	FINDBIGCUSTOMERSAFETYTASKDANGERS: '/eidpws/wxTrace/wxSafety/findBigCustomerSafetyTaskDangers', //大型工商隐患查询
	BIGCUSTOMERSAFETYTASKSAVE: '/eidpws/wxTrace/wxSafety/bigCustomerSafetyTaskSave', //大型工商安检保存
	findSafetyUserTypeReport: '/eidpws/wxTrace/wxSafety/findSafetyUserTypeReport', //用户类型占比
	findSafetyUserTrendReport: '/eidpws/wxTrace/wxSafety/findSafetyUserTrendReport', //用户安检趋势
	listNotice: '/eidpws/wxTrace/wxOa/listNotice', //用户安检趋势
	listNoticeCategory: '/eidpws/wxTrace/wxOa/listNoticeCategory', //用户安检趋势
	listKnowledgeLibrary: '/eidpws/wxTrace/wxOa/listKnowledgeLibrary', //知识库
	saveReadNotice: (param) => '/eidpws/wxTrace/wxOa/' + param + '/saveReadNotice', //
	changePwd: '/eidpws/wxTrace/wxLogin/changePwd', //修改密码
	findSafetyQtyAndCustomerQty: '/eidpws/wxTrace/wxSafety/findSafetyQtyAndCustomerQty', //修改密码
}

export default {
	BASE_URL: api.BASE_URL,
	request(option) {

		if (option.showLoading) {
			uni.showLoading({
				mask: true,
				title: option.loadingText
			})
		}

		let url = api.BASE_URL;
		if (typeof(api[option.url]) === 'string') {
			url += api[option.url];
		} else {
			let split = option.url.split(':');
			url += api[split[0]](split[1]);
		}

		function fail(e) {
			if (option.showLoading) {
				uni.hideLoading();
			}
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

		if (option.data) {
			console.log(option.data);
		}

		return uni.request({
			url: url,
			data: option.data || {},
			method: option.method || 'GET',
			success: (res) => {
				if (option.showLoading) {
					uni.hideLoading();
				}
				if (res.statusCode === 200 && res.data.status == true) {
					console.log('success:' + url)
					console.log(res);
					option.success && option.success(res.data);
				} else {
					res.errMsg = res.data.msg;
					fail(res)
				}
			},
			fail,
			complete() {
				option.complete && option.complete();
			}
		});

	}
}
