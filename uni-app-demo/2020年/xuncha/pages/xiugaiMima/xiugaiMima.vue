 <template>
 	<view>
 		<view class="app-item divider2">
 			<text class="app-left-text2">原密码</text>
 			<input v-model.trim="oldPw" type="text" maxlength="15" class="app-right-text1" placeholder="请输入旧密码" />
 		</view>
 		<view class="app-item divider2">
 			<text class="app-left-text2">新密码</text>
 			<input v-model.trim="newPw" maxlength="15" type="text" class="app-right-text1" placeholder="请输入6~15位新密码" />
 		</view>
 		<view class="app-item divider2">
 			<text class="app-left-text2">确认密码</text>
 			<input v-model.trim="rePw" maxlength="15" type="text" class="app-right-text1" placeholder="再次输入新密码" />
 		</view>
 		<button @tap="save" class="app-save-btn">保存</button>
 	</view>
 </template>
 
 <script>
 	var view;
 	export default {
 		data() {
 			return {
 				oldPw: '',
 				newPw: '',
 				rePw: ''
 			};
 		},
 		onLoad() {
 			view = this;
 		},
 		methods: {
 			save() {
 				if (!this.oldPw) {
 					view.toast("请输入旧密码");
 				} else if (!this.newPw) {
 					view.toast("请输入新密码");
 				} else if (!this.rePw) {
 					view.toast("请确认密码");
 				} else if (this.newPw !== this.rePw) {
 					view.toast("两次输入的密码不一致");
 				} else {
 
 					view.$request({
 						url: 'changePwd',
 						showLoading: true,
 						method:'POST',
 						data: {
 							"newPwd": this.newPw,
 							"oldPwd": this.oldPw
 						},
 						success(res) {
 
 						}
 					})
 				}
 			}
 		},
 	}
 </script>
 
 <style lang="scss">
 
 </style>
 