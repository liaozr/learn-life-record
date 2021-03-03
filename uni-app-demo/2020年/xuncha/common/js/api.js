var api = {
	// BASE_URL: 'https://vop.oksales.net',
	BASE_URL: 'http://192.168.1.203:8080',
	WXLOGIN: '/eidpws/wxTrace/wxLogin/wxLogin', //登录
	GETMENU: '/eidpws/wxTrace/wxLogin/getMenu', //获取菜单
	saveSuperviseTask:'/eidpws/wxTrace/wxSupervise/saveSupervise',
	findSuperviseTaskList:'/eidpws/wxTrace/wxSupervise/findSuperviseTaskList',
	findSuperviseList:'/eidpws/wxTrace/wxSupervise/findSuperviseList',
	findSuperviseById:'/eidpws/wxTrace/wxSupervise/findSuperviseById',
	CHECK_RESULT:'/eidpws/system/dict/CHECK_RESULT/detail',
	saveCheckOpinion:'/eidpws/wxTrace/wxSupervise/saveCheckOpinion',
	findSiteList:'/eidpws/wxTrace/wxSitePatrol/findSiteList',
	saveSitePatrol:'/eidpws/wxTrace/wxSitePatrol/saveSitePatrol',
	findPatrolItemList:'/eidpws/wxTrace/wxSitePatrol/findPatrolItemList',
	findSitePatrolList:'/eidpws/wxTrace/wxSitePatrol/findSitePatrolList',
	findSitePatrolById:'/eidpws/wxTrace/wxSitePatrol/findSitePatrolById',
	SitePatrolsaveCheckOpinion:'/eidpws/wxTrace/wxSitePatrol/saveCheckOpinion',
	findSiteById:'/eidpws/wxTrace/wxSitePatrol/findSiteById',
	FINDAREA: '/eidpws/wxTrace/wxSafety/findArea', //查询区
	FINDSTREET: '/eidpws/wxTrace/wxSafety/findStreet', //查询街道
	FINDCOMMUNITYREPOSITORY: '/eidpws/wxTrace/wxSafety/findCommunityRepository', //查询社区
	findMy:'/eidpws/wxTrace/wxSitePatrol/findMy',
	listKnowledgeLibrary: '/eidpws/wxTrace/wxOa/listKnowledgeLibrary', //知识库
	saveReadNotice: (param) => '/eidpws/wxTrace/wxOa/' + param + '/saveReadNotice', //
	changePwd: '/eidpws/wxTrace/wxLogin/changePwd', //修改密码
	sitePatrolDetailReport: '/eidpws/wxTrace/wxSitePatrol/sitePatrolDetailReport', //统计
}
export default {
	BASE_URL: api.BASE_URL,
	request(option) {

		if (option.showLoading) {
			uni.showLoading({
				mask: true,
				title: option.loadingText || ''
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
