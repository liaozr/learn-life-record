<template>
	<view class="app-page">
		<text class="title">分类</text>
		<view class="button-box">
			<view @tap="active = index" v-for="(item,index) in list" :class="{active:active===index}" hover-class="app-btn-active">{{item.categoryName}}</view>
		</view>
		<button @tap="save" class="app-save-btn" hover-class="app-btn-active">确定</button>
	</view>
</template>

<script>
	var view;

	export default {
		data() {
			return {
				active: 0,
				list: [{
					categoryName: '全部',
					id: '',
				}]
			};
		},
		onLoad() {
			view = this;
			getData();
		},
		methods: {
			save() {
				let item = this.list[this.active];
				uni.setStorageSync('param', item);
				uni.navigateBack({
					delta: 1,
				})
			}
		},
	}

	function getData() {
		console.log("=====");
		view.$request({
			url: 'listNoticeCategory',
			data: {},
			showLoading: true,
			success(res) {
				if (res.status == true) {
					view.list.push(...res.data);
				}
			}
		})
	}
</script>

<style lang="scss">
	.title {
		padding: 40upx 48upx;
		font-size: 16px;
		color: #000000;
	}

	.button-box {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		>view {
			margin-bottom: 40upx;
			width: 280upx;
			line-height: 72upx;
			font-size: 14px;
			color: #8B8B8B;
			text-align: center;
			background: #F7F7F7;
			border-radius: 4px;
		}

		.active {
			background: #02B360;
			color: white;
		}
	}
</style>
