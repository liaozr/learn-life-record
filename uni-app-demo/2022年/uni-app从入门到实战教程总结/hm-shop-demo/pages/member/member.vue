<template>
	<view>
		<view class ="resetTop">
			<view :style="{'height':statusBarHeight + 'px' }"></view>
			<view class="toBar" :style="{'height':toBarHeight + 'px'}">
				<view class="title" :style="{'height':toBarHeight + 'px'}">
					<text class="topInfo"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  statusBarHeight:20,
			  toBarHeight:44
			}
		},
		methods: {
		  onLoad(){
			const getSystemInfoSyncData = uni.getSystemInfoSync()
			this.statusBarHeight = getSystemInfoSyncData.statusBarHeight
			if(getSystemInfoSyncData.platform == 'ios'){
				this.toBarHeight  = 44
			}else if(getSystemInfoSyncData.platform == 'android'){
				this.toBarHeight = 48
			}else{
				this.toBarHeight = 44
			}
		  }
		}
	}
</script>

<style lang="scss">
  .resetTop{
	  background-color: $shop-color;
	  color:white;
	  line-height:44px;
	  .title{
		  text-align: center;
		  line-height:44px;
	  }
  }
</style>
