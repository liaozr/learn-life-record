<template>
	<view>
		<view class="app-item divider3">
			<view class="app-text-badge"></view>
			<text class="app-left-text1">用户安检类别占比</text>
		</view>
		<view class="button-box" style="padding-bottom: 0;">
			<view @tap="customerType ='10'" :class="{active:customerType === '10'}" class="button" hover-class="app-btn-active">居民</view>
			<view @tap="customerType ='20'" :class="{active:customerType === '20'}" class="button" hover-class="app-btn-active">大型工商</view>
		</view>
		<view class="button-box" style="padding-bottom: 0;">
			<picker mode="date" @change="startDateChange" :end="endDate ">
				<view class="selecter" hover-class="app-item-active" style="margin-right: 10px;">
					<text>开始时间：</text>
					<text>{{startDate}}</text>
					<text class="uni-icon uni-icon-arrowdown"></text>
				</view>
			</picker>
			<picker mode="date" @change="endDateChange" :start="startDate" :end="today">
				<view class="selecter" hover-class="app-item-active" style="margin-left: 10px;">
					<text>结束时间：</text>
					<text>{{endDate}}</text>
					<text class="uni-icon uni-icon-arrowdown"></text>
				</view>
			</picker>
		</view>
		<view style="height: 200px;width: 100%;position: relative;">
			<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" ref="pieChart" />
			<view class="center-box abs-center">
				<text class="blod">{{totalCheck}}</text>
				<text>检查数</text>
			</view>
		</view>
		<view v-if="customerType=='20'" class="label-box divider3" style="padding-bottom: 20px;">
			<view v-for="(item,index1) in classfyList">
				<text :style="{background: colors[index1]}"></text>
				<text class="flex1">{{item.typeName}}</text>
				<text class="flex1">{{item.percent}}</text>
				<text class="flex1">{{item.qty}}</text>
			</view>
			<view v-if="classfyList.length%2 != 0"></view>
		</view>
		<view v-else="" class="label-box divider3" style="padding-bottom: 20px;">
			<view v-for="(item,index1) in classfyList" style="width: 85%;">
				<text :style="{background: colors[index1]}"></text>
				<text style="flex: 2;">{{item.typeName}}</text>
				<text class="flex1">{{item.percent}}</text>
				<text class="flex1">{{item.qty}}</text>
			</view>
		</view>
		<view class="app-item divider3">
			<view class="app-text-badge"></view>
			<text class="app-left-text1">用户安检隐患趋势</text>
		</view>
		<view class="flex">
			<view class="button-box" style="flex-wrap: wrap;">
				<view @tap="pageType='10'" :class="{active:pageType === '10'}" class="button" hover-class="app-btn-active">今日</view>
				<view @tap="pageType='20'" :class="{active:pageType === '20'}" class="button" hover-class="app-btn-active">本周</view>
				<view @tap="pageType='30'" :class="{active:pageType === '30'}" class="button" hover-class="app-btn-active">全年</view>
			</view>
			<view class="text-box flex1" v-show="false">
				<text class="blod">11259</text>
				<text>平均数</text>
			</view>
		</view>
		<view style="height: 200px;width: 100%;position: relative;">
			<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" ref="lineChart" />
		</view>
		<view class="label-box divider3" style="padding-bottom: 20px;justify-content: flex-start;">
			<view style="width: auto;margin: 0 24px;">
				<text style="background:#5BA0F2 ;"></text>
				<text>居民</text>
			</view>
			<view>
				<text style="background:#A2DE65 ;"></text>
				<text>大型工商</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '../../common/js/util.js';
	import * as echarts from '@/common/js/echarts.simple.min.js';
	import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue';

	var colors = ['#5BA0F2', '#FF9C89', '#A2DE65', '#C1BFFE', '#FFC24E', '#6ED2BA'];

	let pieOption = {
		color: colors,
		series: [{
			name: '用户安检类别占比',
			type: 'pie',
			radius: ['50%', '80%'],
			label: {
				normal: {
					show: false,
					position: 'center'
				},
			},
			data: []
		}]
	}

	let lineOption = {
		dataset: {
			source: [
				['数量', '居民安检', '大型工商']
			]
		},
		grid: {
			top: '10%',
			left: '15%',
			right: '10%',
			bottom: '20%'
		},
		xAxis: {
			type: 'category',
			offset: 5,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				fontSize: 12,
				color: '#8B8B8B',
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					color: '#F0F0F0'
				}
			},
			offset: 10,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				fontSize: 12,
				color: '#8B8B8B',
			}
		},
		series: [{
				type: 'bar',
				itemStyle: {
					color: '#5BA0F2'
				},
				barWidth: '10',
			},
			{
				type: 'bar',
				itemStyle: {
					color: '#A2DE65'
				},
				barWidth: '10'
			},
		]
	}

	var view;

	export default {
		components: {
			mpvueEcharts
		},
		data() {
			return {
				colors: colors,
				echarts: echarts,
				customerType: '10',
				pageType: '10',
				totalCheck: 0,
				classfyList: [],
				startDate: '',
				endDate: '',
				today:'',
			};
		},
		onLoad() {
			view = this;
			var date = new Date();
			this.endDate = formatDate(date, 'yyyy-MM-dd');
			this.today = this.endDate;
			date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
			this.startDate = formatDate(date, 'yyyy-MM-dd');
			findSafetyUserTypeReport();
			findSafetyUserTrendReport(); 
		},
		watch: {
			customerType(value) {
				findSafetyUserTypeReport()
			},
			pageType() {
				findSafetyUserTrendReport();
			}
		},
		methods: {
			pieInit: function(canvas, width, height) {
				let pieChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(pieChart)
				pieChart.setOption(pieOption)
				return pieChart
			},
			lineInit: function(canvas, width, height) {
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)

				lineChart.setOption(lineOption)
				return lineChart
			},
			startDateChange(e) {
				this.startDate = e.target.value;
				findSafetyUserTypeReport()
			},
			endDateChange(e) {
				this.endDate = e.target.value;
				findSafetyUserTypeReport()
			}
		},
	}

	function findSafetyUserTypeReport() {
		view.$request({
			url: 'findSafetyUserTypeReport',
			method: 'POST',
			data: {
				"customerType": view.customerType,
				"beginDate": view.startDate,
				"endDate": view.endDate
			},
			success(res) {
				if (res.status == true) {
					view.totalCheck = 0;
					res.data.forEach(item => {
						view.totalCheck += Number(item.qty);
					});

					if (view.totalCheck) {
						res.data.forEach(item => {
							item.percent = (item.qty / view.totalCheck).toFixed(2) * 100 + '%';
						});
					}

					view.classfyList = res.data;

					pieOption.series[0].data = res.data.map(item => {
						return {
							value: item.qty,
							name: item.typeName
						}
					});

					view.$refs.pieChart.init();
				}
			}
		})
	}

	function findSafetyUserTrendReport() {
		view.$request({
			url: 'findSafetyUserTrendReport',
			method: 'POST',
			data: {
				"pageType": view.pageType,
			},
			success(res) {
				if (res.status == true) {
					lineOption.dataset.source = [
						['数量', '居民安检', '大型工商']
					];
					res.data.forEach(item => {
						lineOption.dataset.source.push([item.time, item.qty1, item.qty2]);
					});

					view.$refs.lineChart.init();
				}
			}
		})
	}
</script>

<style lang="scss" scoped="">
	.button-box {
		display: flex;
		padding: 32upx 40upx;

		.button {
			line-height: 48upx;
			height: 48upx;
			font-size: 14px;
			padding: 0 16upx;
			color: #8B8B8B;
			margin-right: 32upx;
			background: #F7F7F7;
			border-radius: 4px;
		}

		.active {
			background: #02B360;
			color: white;
		}
	}

	.selecter {
		flex: 1;
		display: flex;
		align-items: center;
		height: 48upx;
		border: 1px solid #F1F1F1;
		border-radius: 4px;

		>text:nth-child(1) {
			font-size: 24upx;
			padding-left: 20upx;
			color: #8B8B8B;
		}

		>text:nth-child(2) {
			font-size: 24upx;
			flex: 1;
			font-weight: bold;
		}
	}

	.label-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		>view {
			width: 40%;
			display: flex;
			align-items: center;
			padding: 20upx 0;

			>text {
				font-size: 12px;
				color: #8B8B8B;
			}

			>text:nth-child(1) {
				border-radius: 50%;
				height: 24upx;
				width: 24upx;
				margin-right: 40upx;
				background: #02B360;
			}

			>text:nth-child(2) {
				color: #000;
			}
		}
	}

	.text-box {
		padding: 48upx 48upx;

		>text {
			text-align: center;
			display: block;
		}

		>text:nth-child(2) {
			padding-top: 16upx;
			font-size: 10px;
			font-size: 14px;
			color: #8B8B8B;
		}
	}

	.center-box {
		text {
			display: block;
			text-align: center;
		}

		>text:nth-child(2) {
			margin-top: 10upx;
			color: #8B8B8B;
		}
	}
</style>
