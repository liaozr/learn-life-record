<template>
	<view class="app-page">
		<view class="app-item divider2">
			<text class="app-left-text2">安检单号</text>
			<input v-model.trim="scBillno" class="app-right-text1" type="text" placeholder="请输入" />
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">门牌号</text>
			<input v-model.trim="customerDoorNo" class="app-right-text1" type="text" placeholder="请扫描" disabled="" />
			<view @tap="scanCode" class="uni-icon uni-icon-scan"></view>
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">客户名称</text>
			<input v-model.trim="customerName" class="app-right-text1" type="text" placeholder="请输入" />
		</view>
		<picker mode="selector" @change="areaChange" :range="areaList" range-key="areaName">
			<view class="app-item divider2" hover-class="app-item-active">
				<text class="app-left-text2">区</text>
				<input :value="customerAreaName" class="app-right-text1" type="text" placeholder="请选择" disabled="" />
			</view>
		</picker>
		<picker mode="selector" @change="streetChange" :range="streetList" range-key="streetName">
			<view class="app-item divider2" hover-class="app-item-active">
				<text class="app-left-text2">街道</text>
				<input :value="customerStreetName" class="app-right-text1" type="text" placeholder="请选择" disabled="" />
			</view>
		</picker>
		<picker mode="selector" @change="communityChange" :range="communityList" range-key="communityName">
			<view class="app-item divider2" hover-class="app-item-active">
				<text class="app-left-text2">社区</text>
				<input :value="customerCommunityName" class="app-right-text1" type="text" placeholder="请选择" disabled="" />
			</view>
		</picker>
		<view class="app-item divider2">
			<text class="app-left-text2">详细地址</text>
			<input v-model.trim="customerAdd" class="app-right-text1" type="text" placeholder="请输入" />
		</view>
		<view class="app-item divider2">
			<text class="app-left-text2">联系电话</text>
			<input v-model.trim="customerPhone" class="app-right-text1" type="number" maxlength="11" placeholder="请输入" />
		</view>
		<picker mode="date" @change="dateChange">
			<view class="app-item divider2" hover-class="app-item-active">
				<text class="app-left-text2">截止日期</text>
				<input v-model.trim="safetyEndTime" class="app-right-text1" type="text" placeholder="请选择" disabled />
			</view>
		</picker>
		<view class="anjianxiaojie divider1">
			<text class="app-left-text2">安检小结</text>
			<textarea v-model.trim="remark" type="text" placeholder="请输入" />
			</view>
		
		<view class="app-item divider2">
			<text class="app-left-text2">隐患数</text>
			<view class="app-right-text1 red">{{dangerNum}}</view>
		</view>
		
		<view v-for="(item,index) in dangerList" class="divider1">
			<view @tap="item.show = !item.show" class="app-item" hover-class="app-item-active">
				<view class="app-text-badge"></view>
				<text class="app-left-text1 flex1">
					{{ customerType == 10 ? item.safetyCheckPoint : item.title}}
				</text>
				<view class="uni-icon uni-icon-arrowdown"></view>
			</view>
			<view v-show="item.show" class="item-containa">
				<view v-if="customerType == 10">
					<view class="item-title divider2 green blod">用户安全风险现状</view>
					<view>
						<view @click="itemClick(child)" v-if="child.type == '10'" class="item" v-for="(child,index1) in item.safetyDangers" :key="index1" hover-class="app-item-active">
							<text class="app-left-text2 flex1">{{child.dangerOrMeasureName}}</text>
							<view v-show="child.checked" class="uni-icon uni-icon-checkmarkempty green blod"></view>
						</view>
					</view>
					
					<view class="item-title divider2 green blod">措施建议</view>
					<view>
						<view @tap="child.checked=!child.checked" v-if="child.type == '20'" class="item" v-for="(child,index2) in item.safetyDangers" :key="index2" hover-class="app-item-active">
							<text class="app-left-text2 flex1">{{child.dangerOrMeasureName}}</text>
							<view v-show="child.checked" class="uni-icon uni-icon-checkmarkempty green blod"></view>
						</view>
					</view>
				</view>
				<view v-else="">
					<view class="divider2" style="height: 1px;"></view>
					<view @click="itemClick(child)"  class="item" v-for="(child,index3) in item.children" :key="index3" hover-class="app-item-active">
						<text class="app-left-text2 flex1">{{child.safetyDangerName}}</text>
						<view v-show="child.checked" class="uni-icon uni-icon-checkmarkempty green blod"></view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="app-item divider1">
			<view class="app-text-badge"></view>
			<view class="app-left-text1 flex1">是否口头讲解</view>
			<switch color="#02B360" :checked="isTeach"></switch>
		</view>
		
		<view class="app-item divider1">
			<view class="app-text-badge"></view>
			<view class="app-left-text1 flex1">安全隐患等级</view>
			<radio-group @change="radioChange" class="flex">
				<view style="margin-right: 20px;">
					<radio value="10" color="#02B360"></radio>
					<text>无</text>
				</view>
				<view style="margin-right: 20px;">
					<radio value="20" color="#02B360"></radio>
					<text>低</text>
				</view>
				<view >
					<radio value="30" color="#02B360"></radio>
					<text>高</text>
				</view>
			</radio-group>
		</view>
		
		<img-box ref='imgbox'></img-box>
		<button @tap="showModal" class="app-save-btn">提交</button>
	</view>
</template>

<script>
	var view;
	
	export default {
		data() {
			return {
				areaList:[],
				streetList:[],
				communityList:[],
				customerDoorNo:'456461546456',
				customerName:'',
				customerArea:'',
				customerAreaName:'',
				customerCommunity:'',
				customerCommunityName:'',
				customerStreet:'',
				customerStreetName:'',
				customerAdd:'',
				customerPhone:'',
				remark:'',
				safetyEndTime:'',
				dangerList:[],
				dangerNum:0,
				scBillno:'',
				isTeach: false,
				level:'',
				customerType:'10' //'10':居民 '20':大型工商
			};
		},
		onLoad(param){
			let type = param.customerType;
			this.customerType = type;
			uni.setNavigationBarTitle({
				title:type == 10?'居民安检登记' : '大型工商安检登记'
			})
			view = this;
			findArea();
		},
		mounted(){
			console.log(this.$refs.imgbox);
			getDangersList(this.customerType);
		},
		methods:{
			radioChange(e){
				this.level = e.detail.value;
			},
			areaChange(e){
				let index = e.detail.value;
				if( this.areaList.length > index &&  this.customerArea != this.areaList[index].id){
					this.customerAreaName = this.areaList[index].areaName;
					this.customerArea = this.areaList[index].id;
					this.customerStreet = [];
					this.customerStreetName = '';
					this.customerStreet = '';
					this.communityList = [];
					this.customerCommunityName = '';
					this.customerCommunity = '';
					findStreet();
				}
			},
			streetChange(e){
				console.log(e)
				let index = e.detail.value;
				if(this.streetList.length > index && this.customerStreet != this.streetList[index].id){
					this.customerStreetName = this.streetList[index].streetName;
					this.customerStreet = this.streetList[index].id;
					this.communityList = [];
					this.customerCommunityName = '';
					this.customerCommunity = '';
					findCommunityRepository();
				}
			},
			communityChange(e){
				let index = e.detail.value;
				console.log(index);
				if(this.communityList.length > index && this.customerCommunity != this.communityList[index].id){
					this.customerCommunityName = this.communityList[index].communityName;
					this.customerCommunity = this.communityList[index].id;
				}
			},
			dateChange(e){
				this.safetyEndTime = e.target.value;
			},
			scanCode: function () {
				uni.scanCode({
					success: function (res) {
						view.customerDoorNo = res.result;
					},
					fail: function (res) {}
				})
			},
			itemClick(child){
				child.checked = !child.checked;
				if(child.checked){
					this.dangerNum++;
				}else{
					this.dangerNum--;
				}
			},
			showModal(){
				
// 				if(true){
// 					this.$refs.imgbox.upload();
// 					return;
// 				}
				
				if(!view.scBillno){
					view.toast('请输入安检单号');
				}else if(!view.customerDoorNo){
					view.toast('请扫描门牌号')
				}else if(!view.customerName){
					view.toast('请输入客户名称')
				}else if(!view.customerAreaName){
					view.toast('请选择所在区')
				}else if(!view.customerStreetName){
					view.toast('请选择所在街道')
				}else if(!view.communityChange){
					view.toast('请选择所在社区')
				}else if(!view.customerAdd){
					view.toast('请输入详细地址')
				}else if(!view.customerPhone){
					view.toast('请输入联系电话')
				}else if(!view.safetyEndTime){
					view.toast('请选择截止日期')
				}else if(!view.remark){
					view.toast('请输入安检小结')
				}else if(!view.level) {
					view.toast('请选择隐患级别')
				}else{
					let safetyTaskPartList = [];
					
					if(this.customerType == 10){
						
						for (var i = 0; i < this.dangerList.length; i++) {
							let item = this.dangerList[i];
							
							let hasDanger = false;
							let hasCuoshi = false;
							
							let safetyDangerSuggestList = [];
							
							item.safetyDangers.forEach(item =>{
								if(item.checked){
									if(item.type == '10'){
										hasDanger = true;
									}else if(item.type == '20'){
										hasCuoshi = true;
									}
									
									safetyDangerSuggestList.push({
										checkPointTableId: item.checkPointTableId ,
										id: item.id,
										dangerOrMeasureName:item.dangerOrMeasureName,
										serialNo:item.serialNo,
										type:item.type,
									})
									
								}
							});
							
							if(safetyDangerSuggestList.length > 0){
								safetyTaskPartList.push({
									dangerId:item.id,
									dangerName: item.safetyCheckPoint,
									safetyDangerSuggestList
								})
							}
							
							if(hasDanger && !hasCuoshi){
								view.toast("请选择" + item.safetyCheckPoint + "的措施建议");
								return;
							}
						}
					}
					
					uni.showModal({
						title:'温馨提示',
						content:'是否确认提交',
						success(confirm,cancel) {
							if(confirm){
								view.$refs.imgbox.upload((paths)=>{
									view.save(safetyTaskPartList,paths);
								})
							}
						}
					})
				}
			},
			save(safetyTaskPartList,imgs){
				console.log("===================")
				
				let safetyTaskPhotoList = imgs.map(item =>{
					return {
						fileName:item.fileKey,
						photoOriginalUrl:item.accessoryUrl,
						type:'10'
					}
				})
				
				if(view.customerType == 20){
					view.dangerList.forEach(item =>{
						item.children.forEach(item =>{
							if(item.checked){
								safetyTaskPartList.push({
									dangerId:item.id,
									dangerName:item.safetyDangerName
								})
							}
						})
					})
				}
				
				view.$request({
					url: view.customerType == 10 ? 'NORMALCUSTOMERSAFETYTASKSAVE' : 'BIGCUSTOMERSAFETYTASKSAVE',
					method:'POST',
					showLoading:true,
					loadingText:'正在提交',
					data:{
						customerDoorNo: this.customerDoorNo,
						customerName: this.customerName,
						customerArea: this.customerArea,
						customerAreaName: this.customerAreaName,
						customerCommunity: this.customerCommunity,
						customerCommunityName:this.customerCommunityName,
						customerStreet:this.customerStreet,
						customerStreetName:this.customerStreetName,
						customerAdd:this.customerAdd,
						customerPhone:this.customerPhone,
						remark:this.remark,
						safetyEndTime:this.safetyEndTime,
						scBillno:this.scBillno,
						isTeach:this.isTeach ? 'Y' : 'N',
						level:this.level,
						safetyTaskPartList,
						safetyTaskPhotoList
					},
					success(data){
						if(data.status == true){
							uni.navigateBack({
								delta:1
							})
						}
					}
				})
				
			}
		},
	}
	
	function getDangersList(type){
		
		view.$request({
			url: type == 10 ? 'FINDNORMALCUSTOMERSAFETYTASKDANGERS' : 'FINDBIGCUSTOMERSAFETYTASKDANGERS',
			success(res) {
				if(res.status == true){
					if(type == 10){
						view.dangerList = res.data.map( (item,index) => {
							item.show = index === 0;
							item.safetyDangers.forEach(item => item.checked = false);
							return item;
						});
					}else{
						let dangerList = [];
						res.data.forEach(item =>{
							item.checked = false;
							let finded = dangerList.find(ini => ini.title == item.dangerClassifyName);
							if(finded){
								finded.children.push(item);
							}else{
								dangerList.push({
									show:false,
									title:item.dangerClassifyName,
									children:[item]
								})
							}
						});
						view.dangerList = dangerList;
					}
				}else{
					view.toast(res.msg || '获取安检隐患失败');
				}
			},
		})
	}
	
	function findArea(){
		
		view.$request({
			url:'FINDAREA',
			success(data) {
				view.areaList = data.data || [];
			},
		})
	}
	
	function findStreet(){
		
		view.$request({
			url:'FINDSTREET',
			method:'POST',
			data:{
				areaId:view.customerArea
			},
			success(data) {
				view.streetList = data.data || [];
			},
		})
	}
	
	function findCommunityRepository(){
		
		view.$request({
			url:'FINDCOMMUNITYREPOSITORY',
			method:'POST',
			data:{
				streetId:view.customerStreet
			},
			success(data) {
				view.communityList = data.data || [];
			},
		})
	}
	
</script>

<style lang="scss" scoped="">
	.app-page {
		height: auto;
		padding-bottom: 180upx;
	}

	.danger-num {
		font-size: 32upx;
		color: red;
		font-weight: bold;
		margin-left: 20upx;
		line-height: 44upx;
	}

	.list-head {
		border-top: 1px solid #DDDDDD;
		border-bottom: 1px solid #DDDDDD;
		height: 96upx;
		display: flex;
		align-items: center;
		background: #F9F9F9;

		>text {
			font-size: 24upx;
			color: #000000;
			text-align: center;
		}
	}

	.list-item {
		height: 68upx;
		display: flex;
		align-items: center;

		>text {
			font-size: 24upx;
			color: #000000;
			text-align: center;
		}
	}

	.uni-icon-scan {
		margin-left: 20upx;
		font-size: 40upx;
	}
	
	.anjianxiaojie{
		padding: 28upx 40upx;
		>textarea{
			margin-top: 28upx;
			width: 100%;
			background: #FAFAFA;
			height: 100upx;
			font-size: 30upx;
			padding: 10upx;
			border: 1px solid #D4D4D4;
		}
	}
	
	.red{
		font-size: 32upx;
	}
	
	.item-title{
		padding: 28upx 60upx;
		font-size: 30upx;
		border-top: 1upx solid #DDDDDD;
	}
	
	.item{
		display: flex;
		padding: 28upx 0upx 28upx 20upx;
		margin: 0 40upx 0 40upx;
		
		&:not(:last-child){
			border-bottom: 1upx solid #ECEEF5 ;
		}
	}
	
	.uni-icon-checkmarkempty{
		font-size: 65upx;
		line-height: 40upx;
	}
	
	.item-containa{
		overflow: hidden;
		transition: all .2s;
	}
	
</style>
