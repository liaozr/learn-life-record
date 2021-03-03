<template>
	<view>
		<picker :range="sourceType" @change="sourceTypeChange" mode="selector">
			<view class="app-item divider1" hover-class="app-item-active">
				<view class="app-text-badge"></view>
				<text class="app-left-text1">现场整改</text>
				<view class="app-right-text1">{{status}}</view>
				<view class="uni-icon uni-icon-arrowdown"></view>
			</view>
		</picker>
		<view class="app-item divider1">
			<view class="app-text-badge"></view>
			<text class="app-left-text1">描述</text>
			<input v-model.trim="remark" type="text" class="app-right-text1" placeholder="请输入" />
		</view>
		<img-box ref="imgbox" title="安检图片" :max="9"></img-box>
		<button @tap="showModal" class="app-save-btn" hover-class="app-btn-active">保存</button>
	</view>
</template>

<script>
	var view;
	export default {
		data() {
			return {
				text: '请选择',
				imageList: [],
				sourceType: ['已整改', '未整改', '停止供气'],
				status: '',
				statusCode: 0,
				remark: '',
				taskId: ''
			};
		},
		onLoad(param) {
			view = this;
			this.taskId = param.taskId;
		},
		methods: {
			sourceTypeChange: function(e) {
				this.status = this.sourceType[e.target.value];
				this.statusCode = (e.target.value + 1) * 10;
			},
			showModal() {

				if (!this.status) {
					this.toast("请选择整改情况")
				} else if (!this.remark) {
					this.toast('请输入描述')
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '是否确认提交',
						success(confirm, cancel) {
							if (confirm) {
								view.$refs.imgbox.upload((paths) => {
									view.onSave(paths);
								})
							}
						}
					})
				}
			},
			onSave(paths) {

				let safetyTaskPhotoList = paths.map(item => {
					return {
						fileName: item.fileKey,
						photoOriginalUrl: item.accessoryUrl,
						type: '20',
					}
				})

				this.$request({
					url: 'SAFETYTASKRESULTSAVE',
					method: 'POST',
					showLoading: true,
					data: {
						safetyTaskResultPhotoList: safetyTaskPhotoList,
						taskId: this.taskId,
						type: this.statusCode,
						typeName: this.status,
						remark: this.remark

					},
					success(res) {

						if (res.status == true) {
							view.toast(res.msg || '操作成功');
							uni.setStorageSync('hasChange', true);
							uni.navigateBack({
								delta: 2,
							})
						} else {
							view.toast(res.msg || '保存失败');
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="">

</style>
