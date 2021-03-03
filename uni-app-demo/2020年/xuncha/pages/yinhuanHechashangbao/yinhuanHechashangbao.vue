    <template>
 	<view class="content zhengdianDetails yinhuanduban">
 		<view class="itemlist">
 			<picker class="picker" @change="changeshequ" :range="zhenggailist" range-key="itemName" :value="shequ" mode="selector">
 				<view class="list">
 					<text class='title'>现场整改结果</text>
 					<text v-if="!zhenggaiflag" class='righttitle title'>请选择整改结果</text>
					<text v-if="zhenggaiflag" class='righttitle title'>{{checkjieguo}}</text>
 				</view>
 			</picker>
 										
 			<view class="list">	
 				<text class='title'>核查描述</text>			
 				<input class='righttitle title shurukuang'  v-model="checkDescribe" placeholder="请输入核查描述" type="text">
 			</view>
 			<!-- <view class="list paizhao">	
 				<text class='title'>整改后照片</text>
 				<text class='righttitle title'>右侧点击拍照或上传照片</text>
 			</view> -->
			<img-box ref="imgbox" title="整改后照片" :max="5"></img-box>
 		 
 		</view>
 		<view style="position: absolute;left:0;right:0;bottom:40upx;" @click="shangbao"  class="shangbaobtn">
 			上报
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
 			 loading: false,
 			 remark:'',
			 savedata:{
                "checkDescribe": "重新整改1111111111",
                "checkOrgId": "5e5d857c5c37ff28015c39ccf9d30019",
                "checkOrgName": "深圳市深燃石油气有限公司",
                "checkResult": "10",
                "serverFlag": "NORMAL",
                "superviseCheckPhotoList": [],
                "superviseId": "SS201902200012",
              },
			  zhenggailist:[],
			  zhenggaijieguo:'',
			  zhenggaiflag:false,
			  checkjieguo:'',
			  checkResult:'',
			  checkDescribe:'',
			  yinhuanhechamsg:{}
			}
 		},
 		created:function(){
 			view = this;
 		},
		mounted:function(){
			this.getzhenggai()
		},
 		computed: {
 			startDate() {
 				return this.getDate('start');
 			},
 			endDate() {
 				return this.getDate('end');
 			}
 		},
		onShow() {
			if (uni.getStorageSync('yinhuanhechaSupervise')) { //回退到此页面时判断是否需要刷新
			
			    var msg = JSON.parse(uni.getStorageSync('yinhuanhechaSupervise'))
				
				this.yinhuanhechamsg = msg
				
				console.log(1112222)
				console.log(this.yinhuanhechamsg)
				
				 
				uni.setStorageSync('yinhuanhechaSupervise', false);
				 
			}
		},
 		methods:{
			changeshequ:function(e){
			  let index = e.detail.value;
			  
			  this.zhenggaiflag = true
			  
			  console.log(index)
			  this.checkResult = this.zhenggailist[index].itemCode
			  this.checkjieguo = this.zhenggailist[index].itemName
			},
			getzhenggai:function(){
				console.log(111)
				this.$request2({
					url: 'findDetailList',
					method:'post',
					data:{
						dictCode:'CHECK_RESULT'
					},
					success:(jsonData) => {
						console.log(6666)
						console.log(jsonData)
						this.zhenggailist = jsonData.data
					},
					complete() {
						view.loading = false;
					}
				});
			},
			onSave(paths) {
				let safetyTaskPhotoList = paths.map(item => {
					return {
						fileName: item.fileKey,
						photoOriginalUrl: item.accessoryUrl,
						type: '20',
					}
				})							 
				// this.savedata.superviseCheckPhotoList = safetyTaskPhotoList.slice(0)
				var msg = {
					"checkDescribe":this.checkDescribe,
					"checkOrgId": "5e5d857c5c37ff28015c39ccf9d30019",
					"checkOrgName": "深圳市深燃石油气有限公司",
					"checkResult":this.checkResult,
					"serverFlag": "NORMAL",
					"superviseCheckPhotoList":safetyTaskPhotoList.slice(0),
					"superviseId":this.yinhuanhechamsg.id
				}
				
				console.log(11)
				console.log(msg)
				
				this.$request({
					url: 'saveCheckOpinion',
					method: 'POST',
					showLoading:true,
					loadingText:'正在提交',
					data:msg,
					success:(jsonData) => {
						console.log(6666)
						console.log(jsonData)
						if(jsonData.status){
							uni.showToast({
								title:jsonData.msg,
								duration: 1000
							});
							setTimeout(() =>{
								uni.navigateBack({
									delta:2
								})
							},1000)
						}else{
							uni.showToast({
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
 			shangbao:function(){
 				console.log(this.savedata)
				
				this.$refs.imgbox.upload((paths) => {
					this.onSave(paths);	
				})	
				
				
 			},
 			tabqiehuan:function(index){
 				this.curindex = index
 			},				
 			changequyu:function(){
				if(this.zhenggailist.length == 0){
					return
				}
				
 			},
 			changejiedao:function(){
 			},
 			bindDateChange: function(e) {
 				this.savedata.rectifyEndDate = e.target.value
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
 	 .yinhuanduban .paizhao {
 		 background: url(../../static/images/icon-takephoto.png) no-repeat 96% center;
 		 background-size: 46upx 42upx;
 	 }
 	 .yinhuanduban .paizhao .righttitle{
 		 color: #C6C6C6 !important;
 		 padding-right:60upx;
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
 