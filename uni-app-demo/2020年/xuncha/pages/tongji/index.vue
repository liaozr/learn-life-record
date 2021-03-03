<template>
	<view>
		<view class="divider1" style="padding-bottom: 20px;">
			<view class="button-box" style="padding-bottom: 0; align-items: center;">
				<view class="app-text-badge"></view>
				<text class="flex1 app-left-text1">站点类型</text>
				<view @click="type='10'" :class="{active:type== '10'}" class="button" hover-class="app-btn-active">供应站</view>
				<view @click="type='20'" :class="{active:type== '20'}" class="button" hover-class="app-btn-active">服务</view>
			</view>
			<view class="button-box" style="padding-bottom: 0;">
				<picker mode="date" @change="startDateChange" :end="endDate " class="flex1">
					<view class="selecter" hover-class="app-item-active" style="margin-right: 10px;">
						<input :value="startDate" placeholder="开始时间" disabled="true" />
						<text class="uni-icon uni-icon-arrowdown"></text>
					</view>
				</picker>
				<picker mode="date" @change="endDateChange" :start="startDate" :end="today" class="flex1">
					<view class="selecter" hover-class="app-item-active" style="margin-left: 10px;">
						<input :value="endDate" placeholder="结束时间" disabled="true" />
						<text class="uni-icon uni-icon-arrowdown"></text>
					</view>
				</picker>
			</view>
		</view>
		<view class="table-title">隐患数量统计</view>
		<view style="height: 200px; width: 100%;position: relative;">
			<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" ref="pieChart" />
			<view class="center-box abs-center">
				<text class="blod">{{totalCheck}}</text>
				<text>检查数</text>
			</view>
		</view>
		<view class="label-box divider1" style="padding-bottom: 20px;">
			<view v-for="(item,index2) in classfyList" style="width: 85%;" :key="index2">
				<text :style="{background: colors[index2]}"></text>
				<text style="flex: 2;">{{item.itemContent}}</text>
				<text class="flex1">{{item.qty}}</text>
				<text class="flex1">{{item.percent}}</text>
			</view>
		</view>
		<view v-for="(item,index3) in classfyList" class="item divider3" :key="index3">
			<view class="title-box">
				<view class="app-text-badge"></view>
				<text class="app-left-text1">{{item.itemName}}（{{item.qty}}）</text>
			</view>
			<text v-for="(child,index4) in item.child" :key="index4">
				{{index4+1}}.{{child.itemContent}}({{child.itemQuantity}})
			</text>
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

	var view;

	export default {
		components: {
			mpvueEcharts
		},
		data() {
			return {
				colors: colors,
				echarts: echarts,
				type: '10',
				classfyList: [],
				totalCheck: 0,
				startDate: '',
				endDate: '',
				today: '',
			};
		},
		watch: {
			type() {
				sitePatrolDetailReport();
			}
		},
		onLoad() {
			view = this;
			var date = new Date();
			this.endDate = formatDate(date, 'yyyy-MM-dd');
			this.today = this.endDate;
			date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
			this.startDate = formatDate(date, 'yyyy-MM-dd');
			sitePatrolDetailReport();
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
			startDateChange(e) {
				this.startDate = e.target.value;
				sitePatrolDetailReport()
			},
			endDateChange(e) {
				this.endDate = e.target.value;
				sitePatrolDetailReport()
			}
		}
	}

	function sitePatrolDetailReport() {
		view.$request({
			url: 'sitePatrolDetailReport',
			method: 'POST',
			data: {
				"type": view.type,
				"siteId": "402881e569134056016913528a2e001c",
				"startTime": view.startDate,
				"endDate": view.endDate
			},
			success(res) {
				console.log(res);
				if (res.status == true) {

					let arr = [];
					let total = 0;

					res.data.forEach(item => {
						let find = arr.find(ite => ite.itemName === item.itemName);
						console.log(find);
						total += item.itemQuantity;
						if (find) {
							find.child.push(item);
							find.qty += item.itemQuantity;
						} else {

							item.child = [{
								itemContent: item.itemContent,
								itemQuantity: item.itemQuantity,
							}];

							item.qty = item.itemQuantity;
							arr.push(item);
						}
					})
					
					console.log(arr)
					
					arr.forEach(item =>{
						item.percent = (item.qty/total).toFixed(2) * 100 + '%';
					})
					
					view.totalCheck = total;
					view.classfyList = arr;

					pieOption.series[0].data = arr.map(item => {
						return {
							value: item.qty,
							name: item.itemContent
						}
					})

					view.$refs.pieChart.init();
				}

			}
		})
	}
</script>

<style scoped="">
	.button-box {
  display: flex;
  padding: 32upx 40upx;
}
.button-box .button {
  line-height: 48upx;
  height: 48upx;
  font-size: 14px;
  padding: 0 16upx;
  color: #8B8B8B;
  margin-right: 32upx;
  background: #F7F7F7;
  border-radius: 4px;
}
.button-box .active {
  background: #02B360;
  color: white;
}

.selecter {
  flex: 1;
  display: flex;
  align-items: center;
  height: 48upx;
  border: 1px solid #F1F1F1;
  border-radius: 4px;
}
.selecter > input:nth-child(1) {
  font-size: 24upx;
  padding-left: 20upx;
  font-weight: bold;
}

.active {
  background: #02B360;
  color: white;
}

.table-title {
  margin-top: 40upx;
  text-align: center;
  font-size: 16px;
  color: #000000;
}

.item {
  padding: 28upx 40upx;
}
.item > text {
  display: block;
  padding: 24upx 0 0 10upx;
  line-height: 48upx;
  font-size: 15px;
  color: #000000;
}

.title-box {
  display: flex;
  align-items: center;
}

.label-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.label-box > view {
  width: 40%;
  display: flex;
  align-items: center;
  padding: 20upx 0;
}
.label-box > view > text {
  font-size: 12px;
  color: #8B8B8B;
}
.label-box > view > text:nth-child(1) {
  border-radius: 50%;
  height: 24upx;
  width: 24upx;
  margin-right: 40upx;
  background: #02B360;
}
.label-box > view > text:nth-child(2) {
  color: #000;
}

.center-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.center-box text {
  display: block;
  text-align: center;
}
.center-box > text:nth-child(2) {
  margin-top: 10upx;
  color: #8B8B8B;
}
	 
</style>
