<template>
	<view style="height: 100%;">
		<map id="map" @markertap="markertap" :markers="markers" :circles='circles' :longitude='longitude' :latitude="latitude"
		 scale="13"></map>
		<view v-if="point.streetName" class="detail-box">
			<view>
				<text class="app-left-text1" style="font-size: 18px;">{{point.streetName}}</text>
			</view>
			<view class="address divider3">
				<text style="line-height: 14px;">距离您0米</text>
				<text style="padding: 0 10px;line-height: 14px;">|</text>
				<text style="line-height: 14px;">"{{point.address}}"</text>
			</view>
			<view @click="goDetail" class="detail">
				<image src="../../static/images/menu.png"></image>
				<text class="app-left-text1">查看详情</text>
			</view>
		</view>
	</view>
</template>

<script>
	//import BMapLib from '../../common/js/GeoUtils.js';

	var view, id = 0,
		map;


	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				longitude: 0,
				latitude: 0,
				accuracy: 0,
				circles: [],
				markers: [],
				pointArr: [],
				point: {},
				myPoint: {
					longitude: 0,
					latitude: 0,
				}
			}
		},
		mounted() {
			view = this;
			map = uni.createMapContext('map');
			getCurrLocation();
			findSiteList()
		},
		methods: {
			markertap(e) {
				console.log(e);
				let markerId = e.mp.markerId;
				let item = view.pointArr.find(item => {
					return item.id === markerId;
				});

				if (item) {
					view.point = item;
					view.longitude = item.longitude;
					view.latitude = item.latitude;
					console.log(item)

					// 					let distance = BMapLib.GeoUtils.getDistance({
					// 						lat: Number(view.myPoint.latitude) ,
					// 						lng: Number(view.myPoint.longitude) 
					// 					}, {
					// 						lat: Number(item.latitude) ,
					// 						lng: Number(item.longitude) 
					// 					});
					// 					
					// 					console.log(distance)
				}else{
					view.point = {};
				}
			},
			goDetail() {
				uni.setStorageSync('zhandianMsgID', view.point.id);
				uni.navigateTo({
					url: '../zhandianDetails/zhandianDetails'
				})
			}
		}
	}

	function getCurrLocation() {
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				view.longitude = res.longitude;
				view.latitude = res.latitude;
				view.accuracy = res.accuracy;
				view.myPoint.latitude = res.latitude;
				view.myPoint.accuracy = res.accuracy;
				createCurrDot();
			}
		});
	}

	function createCurrDot() {

		view.markers.push({
			id: id++,
			latitude: view.latitude,
			longitude: view.longitude,
			iconPath: '../../static/images/dot.png',
			width: 20,
			height: 20,
			anchor: {
				x: 0.5,
				y: 0.5
			}
		});

		view.circles.push({
			latitude: view.latitude,
			longitude: view.longitude,
			color: '#0000AA6A',
			fillColor: '#0000AA2A',
			radius: 500,
			strokeWidth: 0.1,
		})

	}

	function findSiteList() {

		view.$request({
			url: 'findSiteList',
			method: 'post',
			data: {
				siteName: '',
				areaId: '',
				streetId: '',
				companyId: ''
			},
			success: (jsonData) => {
				console.log(jsonData.data)

				view.pointArr = jsonData.data;

				jsonData.data.forEach((item, index) => {
// 					item.latitude = Number(item.latitude) + (index * 0.1);
// 					item.longitude = Number(item.longitude) + (index * 0.1);

					view.markers.push({
						id: item.id,
						latitude: item.latitude,
						longitude: item.longitude,
						iconPath: '../../static/images/icon-location.png',
						width: 40,
						height: 40,
						anchor: {
							x: 0.5,
							y: 0.5
						},
						callout: {
							content: item.siteName,
							display: 'ALWAYS',
							padding: 10
						}
					});
				})
			},
		});

	}
</script>

<style scoped="">
	map {
		height: 100%;
		width: 100%
	}

	.detail-box {
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20upx 48upx;
		background: white;
		position: fixed;
		overflow: hidden;
		box-sizing: border-box;


	}

	.address {
		padding-bottom: 10px;
		margin-bottom: 10px;
		width: 100%;
	}

	.detail {
		display: flex;
		align-items: center;

		
	}
	.detail >image {
			margin-right: 10px;
			height: 40upx;
			width: 40upx;
	}
</style>
