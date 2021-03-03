<template>
	<view class="content myTasks">
		<view class="tabhead">
			<view @click="stateqiehuan(1)" class="list">
				<view class="tab" :class="{'active':curindex == 1}">
					未完成
				</view>
			</view>
			<view  @click="stateqiehuan(2)" class="list">
				<view class="tab"  :class="{'active':curindex == 2}">
					已完成
				</view>
			</view>
		</view>
		<view class="search">
			<input v-model="searchname" placeholder="搜索" class="input" type="text">
			<view @click="shuaixuan" class="shuaixuan">
				筛选
			</view>
		</view>
		<view class="itemlist">
			<view v-for="(item,index) in taskVoList"  :key="item.id" class="list">			
				 <view class="title">
					  <text class='line'></text>
					  <text class="biaoti">{{item.company}}</text>
					  <text v-if="item.type == '10' " class="tag">隐患督办</text>
					  <text v-if="item.type == '20' " class="tag">站点巡查</text>
				 </view>
				  <view class="tr">
					 <view class="th">任务日期：</view>
					 <view class="td">{{item.startDate}} - {{item.endDate}}</view>
				 </view>
				 <view class="tr">
					 <view class="th">地址：</view>
					 <view class="td">{{item.address}}</view>
				 </view>
				 <view class="tr">
					 <view class="th">联系方式：</view>
					 <view class="td">{{item.contacts}}/{{item.telephone}}</view>
				 </view>
			</view>
			<empty-view v-if="taskVoList.length === 0"></empty-view>
		</view>
	</view>
</template>

<script>
	 
	var view
	export default {
		data() {
			return {
				status:'10',
				taskVoList:[],
				curindex:1,
				searchname:''
			};
		},
		created:function(){
			view = this;
		},
		mounted:function(){
			this.getList()
		},			
		watch:{
			searchname:function(){
				if(this.searchname){
					this.getList()
				}
			}
		},
		methods:{
			shuaixuan:function(){
				uni.navigateTo({
					url: '../shuaixuan/shuaixuan'
				})
			},
			stateqiehuan:function(index){
				this.curindex = index
				if(index ==1){
				   this.status = '10'
				}else{
				   this.status = '20'
				}
				this.getList()
			},
			getList:function(){
				var msg ={
					page:'1',
					pageSize:'10',
					StreetOfficeId:'',
					status:this.status,
					startDateBefore: '',
					startDateAfter: '',
					endDateBefore: '',
					endDateAfter: '',
					createTimeBefore: '',
					createTimeAfter: ''
				}
				this.$request({
					url: 'findSuperviseTaskList',
					method:'post',
					showLoading:true,
					loadingText:'加载中',
					data:msg,
					success:(jsonData) => {
						console.log(6666)
						console.log(jsonData)
						if(jsonData.status){
							 this.taskVoList = jsonData.data
						}else{
							uni.showToast({
								icon:'none',
								title:jsonData.msg,
								duration: 1000
							});
						}
					},
					complete() {
						view.loading = false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	 
 .content{
	 margin-top:20upx;
 }
 .tabhead{
	 font-size:0;
	 border-bottom:2upx solid #ECEEF5;
 }
 .tabhead .list{
	 width:50%;
	 display: inline-block;
	 height:80upx;
	 line-height: 80upx;
	 text-align: center;
 }
 .tabhead .list .tab{
	 text-align: center;
	 width:100upx;
	 height:100%;
	 font-size:32upx;
	 margin:auto;
	 color:#8B8B8B;
 }
 .tabhead .list .tab.active{
	 color:#02B360;
	 border-bottom:4upx solid #02B360;
 }
 .myTasks .search{
	 margin-top:30upx;
	 padding-bottom: 20upx;
 }
 .myTasks .search .input{
	 width:70%;
	 heiht:60upx;
     border-radius:16upx;
	 margin-left:5%;
	 padding-left:40upx;
	 background: url(../../static/images/icon-search.png) no-repeat 2% center;
	 background-size: 28upx 28upx;
	 background-color: #F7F7F7;
	 display: inline-block;
	 font-size:28upx;
 }
 .myTasks .search .shuaixuan{
	 display: inline-block;
	 margin-left:30upx;
	 width:100upx;
	 background: url(../../static/images/icon-shuaixuan.png) no-repeat right center;
	 background-size:32upx 30upx;
	 font-size:28upx;
	 vertical-align: top;
 }
 .myTasks .itemlist{
	 background-color: #F7F7F7;
	 height:100%;
	 padding:20upx;
 }
 .myTasks .itemlist .list{
	 /* width:95%; */
	 /* margin:20upx auto; */
	 display: block;
	 height:300upx;
	 border-radius: 16upx;
	 background-color:white;
	 padding:30upx;
     margin-bottom:20upx;
 }
 .myTasks .itemlist .list .title{
	 margin-bottom: 30upx;
 }
 .myTasks .itemlist .list .title .line{
	 width:4upx;
	 height:30upx;
	 background:#02B360;
	 display: inline-block;
	 vertical-align:middle;
 }
 .myTasks .itemlist .list .title .biaoti{
	 font-size:32upx;
	 display: inline-block;
	 color:#000;
	 margin-left:20upx;
 }
 .myTasks .itemlist .list .title .tag{
      width:130upx;
	  height:50upx;
	  line-height:50upx;
	  background: #02B360;
	  border-radius: 10upx;
	  float:right;
	  font-size:28upx;
	  text-align: center;
	  color:white;
 }
 .myTasks .itemlist .list .tr{
	 line-height: 60upx;
	 margin-bottom: 10upx;
	 font-size:0;
 }
 .myTasks .itemlist .list .tr .th{
	 font-size:30upx;
	 color:#8B8B8B;
	 display: inline-block;
 }
 .myTasks .itemlist .list .tr .td{
 	 font-size:30upx;
 	 color:#000;
 	 display: inline-block;
 }
 
</style>
