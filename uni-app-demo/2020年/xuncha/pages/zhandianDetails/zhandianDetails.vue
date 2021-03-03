  <template>
 	<view class="content zhengdianDetails">
 		<view class="tabhead">
 			<view @click="tabqiehuan(1)" class="list">
 				<view class="tab" :class="{'active':curindex==1}">
 					基本信息
 				</view>
 			</view>
 			<view @click="tabqiehuan(2)" class="list">
 				<view class="tab" :class="{'active':curindex==2}">
 					员工信息
 				</view>
 			</view>
 		</view>
 		<view v-if="curindex == 1 " class="itemlist">
 			<view class="list">	
				<text class='title'>站点名称</text>
				<text class='righttitle title'>{{zhandianData.siteName}}</text>
 			</view>
			<view class="list">	
				<text class='title'>类型</text>
				<text class='righttitle title'>{{zhandianData.siteName}}</text>
			</view>
			<view class="list">	
				<text class='title'>站点负责人</text>
				<text class='righttitle title'>{{zhandianData.personLiable}}</text>
			</view>
			<view class="list">	
				<text class='title'>地址</text>
				<text class='righttitle title'>{{zhandianData.address}}</text>
			</view>
			<view class="list">	
				<text class='title'>安全负责人</text>
				<text class='righttitle title'>{{zhandianData.personLiable}}</text>
			</view>
			<view class="list">	
				<text class='title'>办公电话</text>
				<text class='righttitle title'>{{zhandianData.telephone}}</text>
			</view>
			<view class="list">	
				<text class='title'>占地面积</text>
				<text class='righttitle title'>{{zhandianData.areaCovered}}</text>
			</view>
			<view class="list">	
				<text class='title'>最高存储量</text>
				<text class='righttitle title'>{{zhandianData.maxMemory}}</text>
			</view>
			<view class="list">	
				<text class='title'>气源</text>
				<text class='righttitle title'>{{zhandianData.airSupply}}</text>
			</view>
			<view class="list">	
				<text class='title'>建立时间</text>
				<text class='righttitle title'>{{zhandianData.setupTime}}</text>
			</view>
			<view class="list">	
				<text class='title'>批复时间</text>
				<text class='righttitle title'>{{zhandianData.approvalTime}}</text>
			</view>
			<view class="list">	
				<text class='title'>用气总户数</text>
				<text class='righttitle title'>{{zhandianData.totalPerson}}户</text>
			</view>
 		</view>
 	    
		<view v-if="curindex == 2" class="myTasks">
			<view class="itemlist">
				<view v-for="item in zhandianData.siteEmployeeList"  class="list">			
					 <view class="title">
						  <text class='line'></text>
						  <text class="biaoti">{{item.empName}} / {{item.empSex}} / {{item.post}}</text>  
					 </view>
					 <view class="tr">
						 <view class="th">持证上岗情况：</view>
						 <view class="td">{{item.certificate}}</view>
					 </view>
				</view>
				<empty-view v-if="zhandianData.siteEmployeeList.length === 0"></empty-view>
			</view>
		</view>
	</view>
 </template>
 
 <script>
	var view
 	export default {
 		data() {
 			return {
 			 curindex:1,
			 zhandianData:{}
 			}
 		},
		mounted:function(){
			view = this
		},
		onShow() {
			if (uni.getStorageSync('zhandianMsgID')) { //回退到此页面时判断是否需要刷新
			
			    var zhandianMsgID = uni.getStorageSync('zhandianMsgID')
			
				console.log(444)
				console.log(zhandianMsgID)
				uni.setStorageSync('zhandianMsgID', false);
				
				this.findSiteById(zhandianMsgID)
				 
			}
		},
		methods:{
			findSiteById:function(zhandianMsgID){
				this.$request({
					url: 'findSiteById',
					method:'post',
					showLoading:true,
					loadingText:'加载中',
					data:{
					 siteId:zhandianMsgID	
					},
					success:(jsonData) => {
						console.log(8888)
						console.log(jsonData)
						if(jsonData.status){
							  this.zhandianData = jsonData.data							 							
							  if(this.zhandianData.setupTime.length >10){
								  this.zhandianData.setupTime = this.zhandianData.setupTime.slice(0,10)
							  }
							  if(this.zhandianData.approvalTime.length >10){
							  	 this.zhandianData.approvalTime = this.zhandianData.approvalTime.slice(0,10)
							  }
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
			},
			tabqiehuan:function(index){
				this.curindex = index
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
   	 border-bottom:1upx solid #ECEEF5;
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
   	 width:130upx;
   	 height:100%;
   	 font-size:32upx;
   	 margin:auto;
   	 color:#8B8B8B;
  }
  .tabhead .list .tab.active{
   	 color:#02B360;
   	 border-bottom:4upx solid #02B360;
  }
  .zhengdianDetails .itemlist{ 
 	 height:100%;
 	 width:100%;
  }
  .zhengdianDetails .itemlist .list{
 	  height:100upx;
	  line-height: 100upx;
	  border-bottom:1upx solid #ECEEF5;
	  padding-right:40upx;
	  padding-left:40upx;
  }
  .zhengdianDetails .itemlist .list .title{
	  font-size: 30upx;
	  color:#000;
  }
  .zhengdianDetails .righttitle{
	  text-align: right;
	  float:right;
  }
  
  
  .myTasks .itemlist{
  	 background-color: #F7F7F7;
  	 height:100%;
  	 padding:20upx;
	 width:auto !important;
  }
  .myTasks .itemlist .list{
  	 /* width:95%; */
  	 /* margin:20upx auto; */
  	 display: block;
  	 height:160upx;
  	 border-radius: 16upx;
  	 background-color:white;
  	 padding:30upx;
     margin-bottom:20upx;
  }
  .myTasks .itemlist .list .title{
  	 margin-bottom: 0upx;
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
 