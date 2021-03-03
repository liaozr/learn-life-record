    <template>
 	<view class="content zhengdianDetails yinhuanduban">
 		<view class="itemlist">
 			<view class="list">	
 				<view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">基本信息</text>
 				</view>
 			</view>
 			<view class="list">	
 				<text class='title'>巡查人</text>
 				<text class='righttitle title'>{{supervise.superviseEmpName}}</text>
 			</view>
 			<view class="list">	
 				<text class='title'>单位</text>			
 				<input disabled class='righttitle title shurukuang' v-model="supervise.company" placeholder="请输入单位" type="text">
 			</view>			
 			<!-- <view class="list">	
 				<text class='title'>区</text>
 				<picker class="righttitle jiedaopicker" mode="selector" :value="jiedao" @change="changejiedao">
 				   <text class='title'>说的是</text>
 				</picker>
 				<picker class="righttitle quyupicker" mode="selector" :value="quyu" @change="changequyu">
 				   <text class='title'>说的是的</text>
 				</picker>
 			</view>		
 			<picker class="picker" @change="changeshequ" :value="shequ" mode="selector">
 				<view class="list">
 					<text class='title'>社区</text>
 					<text class='righttitle title'>龙华街道梅岭二村1001号</text>
 				</view>
 			</picker> -->			
 			<view class="list">	
 				<text class='title'>地址</text>			
 				<input disabled class='righttitle title shurukuang' v-model="supervise.address" placeholder="请输入地址" type="text">
 			</view>
 			
 			<view class="list">	
 				<text class='title'>联系人</text>			
 				<input disabled class='righttitle title shurukuang' v-model="supervise.contacts" placeholder="请输入联系人" type="text">
 			</view>
 			<view class="list">	
 				<text class='title'>联系电话</text>
 				<input disabled class='righttitle title shurukuang' v-model="supervise.telephone" placeholder="请输入联系电话" type="text">		
 			</view>
 			<view class="list">	
 				<text class='title'>巡查人数</text>
 				<input disabled class='righttitle title shurukuang' v-model="supervise.personNumber" placeholder="请输入巡查人数" type="text">		
 			</view>
 		    <view class="list">	
 				<text class='title'>检查内容</text>
 				<input disabled class='righttitle title shurukuang' v-model="supervise.content" placeholder="请输入检查内容" type="text">		
 			</view>
 		</view>
 		
 		<view class="itemlist">
 			<view class="list">	
 				<view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">检查意见</text>
 				</view>			
 			</view>
			
 			<!-- <view class="list">	
 				<text class='title'>检查结果</text>
 				<text class='righttitle title'>龙华第二站点</text>
 			</view> -->
			
 			<view class="list paizhaoshow">					
				<view class='title'>意见整改</view>
				<view class="photolist">
					 <!-- <view class="list">
					 </view> -->
					 <image @tap="previewImage(rectifyExplain)" style="background-color:rgba(255,255,255,0.2);" :src="rectifyExplain" class="list"></image>
					<!-- <view class="list">
					 </view>
					 <view class="list">
					 </view> -->
				</view>
 			</view>
			
 			<view v-if="sitePatrolPhotoList.length > 0" class="list paizhaoshow">	
 				<text class='title'>其他照片</text>
 				<view class="photolist">
 					 <image @tap="previewImage2(item)" style="background-color:rgba(255,255,255,0.2);" v-for="item in sitePatrolPhotoList" :key="item.id" :src="item.photoOriginalUrl" class="list">
 					 </image>					 
 				</view>
 			</view>
			<view class="list">	
				<text class='title'>截止日期</text>
				<input disabled class='righttitle title shurukuang' v-model="supervise.rectifyEndDate" placeholder="请输入备注" type="text">		
			</view>
 			<view class="list">	
 				<text class='title'>备注</text>
 				<input disabled class='righttitle title shurukuang' v-model="supervise.remark" placeholder="请输入备注" type="text">		
 			</view>
 		</view>
 		<view @click="hecha" class="shangbaobtn">
 			整改核查
 		</view>
 			
 	</view>
 </template>
 
 <script>
	 var view
 	export default {
 		data() {
 			const currentDate = this.getDate({
 				format: true
 			})
 			return {
 			 curindex:1,
 			 quyu:"",
 			 jiedao:'',
 			 quyuzhi:"",
 			 date: currentDate,
			 supervise:{},
			 rectifyExplain:'',
			 sitePatrolPhotoList:[]
 			}
 		},
		mounted(){
		  view = this
		  // this.findSuperviseById()	
		},
		onShow() {
			if (uni.getStorageSync('zhenggaiHechaID')) { //回退到此页面时判断是否需要刷新
			
			    var zhenggaiHechaID = uni.getStorageSync('zhenggaiHechaID')
				this.findSuperviseById(zhenggaiHechaID)			 
				uni.setStorageSync('zhenggaiHechaID', false);
				 
			}
		},
 		computed: {
 			startDate() {
 				return this.getDate('start');
 			},
 			endDate() {
 				return this.getDate('end');
 			}
 		},
 		methods:{
			previewImage: function(src) {
				uni.previewImage({
					current: src,
					urls:src.split(',')
				})
			},
			previewImage2: function(item) {
				uni.previewImage({
					current:item.photoOriginalUrl,
					urls:item.photoOriginalUrl.split(',')
				})
			},
			hecha:function(){
				uni.setStorageSync('yinhuanhechaSupervise',JSON.stringify(this.supervise));
				uni.navigateTo({
					url: '../yinhuanHechashangbao/yinhuanHechashangbao'
				})
			},
			findSuperviseById:function(zhenggaiHechaID){
				var msg = {
					superviseId:zhenggaiHechaID
				}
				this.$request({
					url: 'findSuperviseById',
					data:msg,
					showLoading:true,
					loadingText:'加载中',
					method:'post',
					success:(jsonData) => {
						console.log(6666)
						console.log(jsonData)
						if(jsonData.status){
							 this.supervise = jsonData.data
							 
							 var sitePatrolPhotoList = jsonData.data.supervisePhotoList 							 
							 for(var i =0;i<sitePatrolPhotoList.length;i++){
								   var photourl = sitePatrolPhotoList[i].photoOriginalUrl
								   photourl=photourl.replace(/\\/g,'/')
								   photourl=this.BASE_URL+photourl.replace(/\/\//g,'/')
								   sitePatrolPhotoList[i].photoOriginalUrl = photourl
							 }							 
							 this.sitePatrolPhotoList = sitePatrolPhotoList
							 var rectifyExplain= jsonData.data.rectifyExplain							 						 
							 rectifyExplain=rectifyExplain.replace(/\\/g,'/')
							 this.rectifyExplain=this.BASE_URL+rectifyExplain.replace(/\/\//g,'/')
							 
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
 			},				
 			changequyu:function(){
 			},
 			changejiedao:function(){
 			},
 			bindDateChange: function(e) {
 				this.date = e.target.value
 			},
 			getDate(type) {
 				const date = new Date();
 				let year = date.getFullYear();
 				let month = date.getMonth() + 1;
 				let day = date.getDate();
 
 				if (type === 'start') {
 					year = year - 60;
 				} else if (type === 'end') {
 					year = year + 2;
 				}
 				month = month > 9 ? month : '0' + month;;
 				day = day > 9 ? day : '0' + day;
 				return `${year}-${month}-${day}`;
 			}
 		}
 	}
 </script>
 
 <style scoped>
 	 .yinhuanduban{
 		 background-color: #F8F8F8;
 	 }
 	 .yinhuanduban .itemlist{
 		 background-color:white;
 		 margin-bottom:20upx;
 	 }
 	.yinhuanduban .itemlist .title{
 	 	 /* margin-bottom: 30upx; */
 	 }
 	.yinhuanduban .itemlist  .title .line{
 	 	 width:4upx;
 	 	 height:30upx;
 	 	 background:#02B360;
 	 	 display: inline-block;
 	 	 vertical-align:middle;
 	 }
 	 .yinhuanduban .list .shurukuang{
 		 vertical-align: middle;
 		 margin-top:20upx;
 	 }
 	 .yinhuanduban .address{
 		 background:url(../../static/images/icon-dingwei.png) no-repeat right center;
 		 background-size:30upx 38upx;
 		  padding-right:50upx;
 	 }
 	 .yinhuanduban .dizhi{
 	 		 background:url(../../static/images/icon-saoma.png) no-repeat right center;
 	 		 background-size:32upx 32upx;
 			 padding-right:50upx;
 	 }
 	 .yinhuanduban .quyupicker{
 		 margin-right:40upx;
 		 background: url(../../static/images/icon-down-jiantou.png) no-repeat right center;
 		 background-size: 40upx 40upx;
 		 padding-right:40upx;
 		 display: inline-block;
 	 }
 	 .yinhuanduban .picker{
 		 background: url(../../static/images/icon-down-jiantou.png) no-repeat 96% center;
 		 background-size: 40upx 40upx;
 		 width:100%;
 		 display: inline-block;
 	 }
 	 .yinhuanduban .picker .righttitle{
       padding-right:60upx;
 	 }
 	 .yinhuanduban .jiedaopicker{
 	 		 margin-right:-10upx;
 	 		 background: url(../../static/images/icon-down-jiantou.png) no-repeat right center;
 	 		 background-size: 40upx 40upx;
 	 		 padding-right:40upx;
 	 		 display: inline-block;
 	 } 
 	 .yinhuanduban .paizhaoshow {
 		 line-height:normal !important;
		 height:auto !important;
 	 }
	 .yinhuanduban .paizhaoshow .photolist{
		  margin-top:20upx;
		  font-size:0;
	 }
	 .yinhuanduban .paizhaoshow .title{
		 margin-top:20upx;
		 margin-bottom:20upx;
	 }
	 .yinhuanduban .paizhaoshow .photolist .list{
		 display: inline-block;
		 width:25%;
		 margin-left:2%;
		 height:120upx;
		 margin-right:40upx;
		 padding-left:0;
		 padding-right:0;
		 background-color: #C6C6C6;
		 margin-bottom: 20upx;
	 }
 	.yinhuanduban .itemlist .title .biaoti{
 	 	 font-size:32upx;
 	 	 display: inline-block;
 	 	 color:#000;
 	 	 margin-left:20upx;
   }
   .yinhuanduban .shangbaobtn{
 	   width:90%;
 	   height:90upx;
 	   line-height: 90upx;
 	   text-align: center;
 	   background-color:#02B360;
 	   color:white;
 	   font-size:32upx;
 	   border-radius: 8upx;
 	   margin:40upx auto;
   }
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
 