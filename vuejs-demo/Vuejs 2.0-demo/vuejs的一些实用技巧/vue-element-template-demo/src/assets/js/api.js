import axios from 'axios';
import Vue from 'vue'

const vue = new Vue();

const get = function(url, params, success, error) {

	axios.get('/eidpws' + url, {
			params: params
		})
		.then(function(response) {
			console.log(response);

			success(response.data);

		}).catch(function(errorInfo) {
			console.log(errorInfo);
			if(error) {
				error(errorInfo);
			} else {
				vue.$message.error('获取数据失败!');
			}
		});
}

const post = function(url, params, success, error) {

	axios.post('/eidpws' + url, params)
		.then(function(response) {
			console.log(response);

			success(response.data);

		}).catch(function(errorInfo) {
			console.log(errorInfo);
			if(error) {
				error(errorInfo);
			} else {
				vue.$message.error('获取数据失败!');
			}
		});
}

export default {
	get,
	post,
	//指挥中心
	BASE_URL:'http://192.168.1.122:8080',
	LOGIN: '/system/user/login', //登录
	LISTCOREORG: '/system/organization/listCoreOrg', //获取核心机构
	FINDCASECOLLECTBYORG: '/oneMap/controlLayer/findCaseCollectByOrg', //获取各单位事件统计
	FINDHOT: '/oneMap/controlLayer/findHot', //获取热点信息
	FINDCASE: '/oneMap/controlLayer/findCase', //获取警情信息
	FINDCASELIST: '/oneMap/controlLayer/findCaseList', //获取事件列表
	FINDCASETYPELIST: '/oneMap/controlLayer/findCaseTypeList', //获取事件类型
	FINDPOLICELIST: '/oneMap/controlLayer/findPoliceList', //获取警力列表
	FINDLETLIST: '/oneMap/letLayer/findLetList', //出租屋列表
	FINDQUALIFIEDNUM: '/oneMap/letLayer/findQualifiedNum', //出租合格率
	QUERYPLACELIST: '/oneMap/placeLayer/queryPlaceList', //场所列表
	QUERYPLACESTANDARDTOTAL: '/oneMap/placeLayer/queryPlaceStandardTotal', //场所合格率
	FINDCHART: '/dataCollection/place/findChart', //场所分类统计
	FINDWARNLIST: '/oneMap/controlLayer/findWarnList', //获取事件提醒
	QUERYPLACETYPE: '/oneMap/placeLayer/queryPlaceType', //场所类型
	FINDTODAYDYNAMICS: '/oneMap/controlLayer/findTodayDynamics', //今日动态
	FINDTODAYONLINECOUNT: '/oneMap/controlLayer/findTodayOnlineCount', //各单位在线人员统计
	FINDCASECOLLECTBYAREA: '/oneMap/controlLayer/findCaseCollectByArea', //事件发声区域排名
	FINDTODAYDUTY: '/oneMap/controlLayer/findTodayDuty', //值班表
	FINDORGPOLICELIST: '/oneMap/controlLayer/findOrgPoliceList', //组织机构列表

	//统计分析
	CASE_SELECT: '/police/case/select', //事件分类统计
	QUERYTOVEHICLE: '/dataCollection/vehicleLicenseWeb/queryToVehicle', //情报统计
	CASE_FINDHOTCHART: '/police/case/findHotChart', //事件热力分布图
	ILLEGALLYPARKED_QUERYCOUNT: '/dataCollection/illegallyParked/queryCount', //车辆违停统计
	LETWEB_QUERYTOPERSONCOUNT: '/dataCollection/letWeb/queryToPersonCount', //人员采集统计
	LETWEB_QUERYTOCHECK: '/dataCollection/letWeb/queryToCheck', //检查统计
	PLACE_QUERYTARGETFINISH: '/dataCollection/place/queryTargetFinish', //各单位指标完成情况
	PLACE_QUERYTOSTANDARD: '/dataCollection/place/queryToStandard', //各单位场所合格率
	LETWEB_QUERYTOSTANDARD: '/dataCollection/letWeb/queryToStandard', //各单位出租屋合格率

	//数据中心
	QUERYDATACENTERTOTAL: '/schedule/accessManage/queryDataCenterTotal', //数据汇总和日增量
	QUERYDATACENTERDETAIL: '/schedule/accessManage/queryDataCenterDetail', //数据汇总详情
	ACCESSMANAGE_QUERYHOT: '/schedule/accessManage/queryHot', //查询热力分布图

	//现场
	CONTROLLAYER_FINDMSG: '/oneMap/controlLayer/findMsg', //消息记录
	CONTROLLAYER_FINDSIGN: '/oneMap/controlLayer/findSign', //签到人员
	CONTROLLAYER_FINDPOLICENEARBY: '/oneMap/controlLayer/findPoliceNearBy', //周边警力
	CONTROLLAYER_FINDPLACENEARBY: '/oneMap/controlLayer/findPlaceNearBy', //周边场所
	CONTROLLAYER_SENDMSG: '/oneMap/controlLayer/sendMsg', //发送消息
};