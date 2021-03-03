<template>
	<view class="out-box">
		<view class="search-box">
			<view class="uni-icon uni-icon-search"></view>
			<input confirm-type="search" @confirm="onconfirm" :placeholder="placeholder" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			placeholder: {
				type: String,
				default: '搜索'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onconfirm(e) {
				console.log(e);
				this.$emit('search', e.detail.value);
			}
		}
	}
</script>

<style  scoped="">
	.out-box {
		padding: 30upx 42upx;
	}
	.search-box {
		padding: 10upx 0;
		background: #F7F7F7;
		border-radius: 8px;
		display: flex;
		align-items: center;
	}
	.search-box >.uni-icon-search {
			margin: 0 24upx;
			font-weight: bold;
			font-size: 42upx;
	}
	.search-box >input {
			flex: 1;
			font-size: 28upx;
			color: #8B8B8B;
	}

</style>
