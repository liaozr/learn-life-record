     <template>
 	<view class="content zhengdianDetails yinhuanduban zhandianxuncha">
 		<view class="itemlist">
 			<view class="list">	
 				<view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">基本信息</text>
 				</view>
 			</view>
 			
 			<view  class="list">
 				<text class='title'>巡查站点</text>
 				<text style="" class='righttitle title'>{{xunchamsg.siteName}}</text>
 			</view>
 			
 			<view class="list">	
 				<text class='title'>联系人</text>			
 				<input  disabled v-model="xunchamsg.personLiable" class='righttitle shurukuang title' placeholder="请输入联系方式" type="text">
 			</view>
			<view class="list">	
				<text class='title'>地址</text>			
				<input disabled v-model="xunchamsg.address" class='righttitle shurukuang title' placeholder="请输入地址" >
			</view>
 			<view class="list">	
 				<text class='title'>联系方式</text>			
 				<input  disabled v-model="xunchamsg.telephone" class='righttitle shurukuang title' placeholder="请输入联系方式" type="text">
 			</view>
 			<view class="list">	
 				<text class='title'>巡查人数</text>			
 				<input disabled class='righttitle title shurukuang' v-model="xunchamsg.personNumber" placeholder="请输入巡查人数" type="text">
 			</view>
 		</view>
 		
 		<view v-if="yinhuannum>0" class="itemlist itemgouxuan">
 			<view class="list">	
 				<view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">巡查项目-隐患数量（{{yinhuannum}}）</text>
 				</view>			
 			</view>
 			<view v-for="(item,index) in xunchamsg.sitePatrolDetailList" :key="item.typeName" class="lists">
 				<view  @click="yinhuanqiehuan(item)" class="list slide">
 					<text class='title'>{{item.typeName}}</text>
 					<text class='rightjiantou title' @click="yinhuanqiehuan(item)"></text>
 				</view>
 				<view v-for="(item1,cell) in item.list" :key="item1.typeName" class="list" :class="{'listlianghang':item1.itemCategoryName.length > 10}">	
 					<text class='title'>{{item1.itemContent}}</text>
 					<text class='title' :class="{'righttitle':item1.choseflag}"></text>
					<view style="margin-top:20upx;display:block;" class="imglist">
						<image @tap="previewImage2(item2)" v-for="(item2,cellimg) in item1.sitePatrolDetailPhotoList" :key="item2.id" :src="item2.photoOriginalUrl" >
							
						</image>
					</view>
 				</view>			
 			</view>
 		</view>
 		
 		<view class="itemlist">
 			<view class="list">	
 				<view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">巡查意见</text>
 				</view>			
 			</view>		
 			<view class="list paizhaoshow">	
 				<text class='title'>现场意见整改书</text>
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
				<text class='title'>巡查结果</text>
				<input disabled class='righttitle title shurukuang' v-model="xunchamsg.patrolResultName" placeholder="" type="text">		
			</view>
			<view class="list">	
				<text class='title'>截止日期</text>
				<input disabled class='righttitle title shurukuang' v-model="xunchamsg.rectifyEndDate" placeholder="" type="text">		
			</view>
 			<view class="list">	
 				<text class='title'>备注</text>
 				<input disabled class='righttitle title shurukuang' v-model="xunchamsg.remark" placeholder="请输入备注" type="text">		
 			</view>
 		</view>
 		<view @click="shangbao"  class="shangbaobtn">
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
 			 savedata:{
 					"address": "",
 					"deleteEmp": "",
 					"deleteEmpName": "",
 					"enterpriseId": "",
 					"enterpriseName": "",
 					"id": "",
 					"modifyEmp": "",
 					"modifyEmpName": "",
 					"patrolDate": "",
 					"patrolEmpId": "",
 					"patrolEmpName": "",
 					"patrolOrgId": "",
 					"patrolOrgName": "",
 					"patrolResult": "",
 					"patrolResultName": "",
 					"personLiable": "",
 					"personNumber":'',
 					"rectifyEndDate": "",
 					"rectifyExplain": "",
 					"rectifyExplainName": "",
 					"remark": "",
 					"siteId": "",
 					"siteName": "",
 					"sitePatrolPhotoList": [
 					],
 					"status": "",
 					"statusName": "",
 					"telephone": "",
 					"version":''
 			  },
 			  gongyingzhantypeName:"",
 			  fuwuzhanlisttypeName:'',
 			  gongyingzhanlist:[],
 			  fuwuzhanlist:[],
 			  gongyinglist:[],
 			  zhandianxuanzeflag:false,
			  zhandianzhenggaiID:'',
			  xunchamsg:{},
			  yinhuannum:0,
			  rectifyExplain:'',
			  sitePatrolPhotoList:[]
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
 		mounted:function(){
 			
 		  view = this
		  // this.findSitePatrolById('SP1902280001')
 		},
 		onShow() {
 			if (uni.getStorageSync('zhandianzhenggaiID')) { //回退到此页面时判断是否需要刷新
 			
 			    var zhandianzhenggaiID =  uni.getStorageSync('zhandianzhenggaiID')
				
				this.zhandianzhenggaiID = zhandianzhenggaiID
				
				this.findSitePatrolById(this.zhandianzhenggaiID)
 				console.log(111)
 				console.log(zhandianzhenggaiID)
 				uni.setStorageSync('zhandianzhenggaiID', false);
 			}
 		},
 		methods:{
			yinhuanqiehuan:function(item){
				item.choseflag = !item.choseflag
			},
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
			shangbao:function(){
				console.log(111)
				console.log(this.savedata)
				uni.setStorageSync('zhandianzhenggaimsg',JSON.stringify(this.xunchamsg));
				uni.navigateTo({
				    url: '../zhandianhechaShangbao/zhandianhechaShangbao'
				})
			},
			findSitePatrolById:function(id){
				this.$request({
					url: 'findSitePatrolById',
					method:'post',
					showLoading:true,
					loadingText:'加载中',
					data:{
					 sitePatrolId:id	
					},
					success:(jsonData) => {
						console.log(666677)
						console.log(jsonData)
						if(jsonData.status){
						   this.xunchamsg = jsonData.data
						   
						   var sitePatrolPhotoList = jsonData.data.sitePatrolPhotoList 
						   for(var i =0;i<sitePatrolPhotoList.length;i++){
							   var photourl = sitePatrolPhotoList[i].photoOriginalUrl
							   photourl=photourl.replace(/\\/g,'/')
							   photourl=this.BASE_URL+photourl.replace(/\/\//g,'/')
							   sitePatrolPhotoList[i].photoOriginalUrl = photourl
						   }
		                   this.sitePatrolPhotoList = sitePatrolPhotoList
																																										  
						   var rectifyExplain= this.xunchamsg.rectifyExplain						   					   
						   rectifyExplain=rectifyExplain.replace(/\\/g,'/')
						   this.rectifyExplain=this.BASE_URL+rectifyExplain.replace(/\/\//g,'/')
						   console.log(4456)
						   console.log(rectifyExplain)
																									   
							 var arrtype = []
							 var arr = this.xunchamsg.sitePatrolDetailList
							 for(var i=0;i<arr.length;i++){
								  arrtype.push(arr[i].itemCategory)
							 }
							  
							var length = arrtype.length
							
							function repeat(arr) {
								//遍历arr中每个元素，同时声明hash
								for (var i = 0, hash = {}; i < arr.length; i++) {
									//hash中是否包含当前元素值的建
									//如果不包含,就hash添加一个新元素，以当前元素值为key，value默认为1
									if (hash[arr[i]] === undefined) {
										hash[arr[i]] = 1;
									}
								} //(遍历结束)
								//将hash转为索引:
								var i = 0;
								var arr2 = [];
								for (arr2[i++] in hash);
								console.log(arr2);
								return arr2;
							}
							arrtype = repeat(arrtype)							
							var datalist = []													
							for(var n=0;n<arrtype.length;n++){
								var msg ={
									type:arr[n].itemCategory,
									typeName:'',
									list:[]
								}
								datalist[n]=msg
								for(var m=0;m<arr.length;m++){
									if(arrtype[n] == arr[m].itemCategory){
										 
										datalist[n].list.push(arr[m])
										datalist[n].typeName = arr[m].itemCategoryName
									}
								}
								this.xunchamsg.sitePatrolDetailList  = datalist
								this.yinhuannum = this.xunchamsg.sitePatrolDetailList.length
							}
							
							console.log(1111)
							console.log(this.xunchamsg)
														
							var sitePatrolDetailList = []						   
							sitePatrolDetailList = this.xunchamsg.sitePatrolDetailList 						   
							for(var a =0;a<sitePatrolDetailList.length;a++){
							   for(var s=0;s<sitePatrolDetailList[a].list.length;s++){
								  for(var d=0;d<sitePatrolDetailList[a].list[s].sitePatrolDetailPhotoList.length;d++){
									 var photourl = sitePatrolDetailList[a].list[s].sitePatrolDetailPhotoList[d].photoOriginalUrl
									 photourl=photourl.replace(/\\/g,'/')
									 photourl=this.BASE_URL+photourl.replace(/\/\//g,'/')
									 sitePatrolDetailList[a].list[s].sitePatrolDetailPhotoList[d].photoOriginalUrl = photourl							   
								  } 
							   }			   
							}	
							console.log(111133)
							console.log(this.xunchamsg)
																																																																											  
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
 			gongyingclick:function(item){
 				console.log(item)
 				item.choseflag = !item.choseflag
 				if(item.choseflag){
 			       this.gongyinglist.push(item)
 				}else{
 					for(var i=0;i<this.gongyinglist.length;i++){
 						if(this.gongyinglist[i].id == item.id){
 							this.gongyinglist.splice(i,1)
 						}
 					}
 				}
 				this.savedata.sitePatrolDetailList = this.gongyinglist.slice(0)
 			},
 			findPatrolItemList:function(){
 				var msg ={
 					itemContent:""					
 			    }
 				this.$request({
 					url: 'findPatrolItemList',
					showLoading:true,
					loadingText:'加载中',
 					method:'post',
 					data:msg,
 					success:(jsonData) => {
 						console.log(777766)
 						console.log(jsonData)
 						if(jsonData.status){
 							
 							  var arr= jsonData.data
 							  var arrtype = []
 							  for(var i=0;i<arr.length;i++){
 								  arrtype.push(arr[i].type)
 							  }
 							  
 							var length = arrtype.length
 							
 							function repeat(arr) {
 								//遍历arr中每个元素，同时声明hash
 								for (var i = 0, hash = {}; i < arr.length; i++) {
 									//hash中是否包含当前元素值的建
 									//如果不包含,就hash添加一个新元素，以当前元素值为key，value默认为1
 									if (hash[arr[i]] === undefined) {
 										hash[arr[i]] = 1;
 									}
 								} //(遍历结束)
 								//将hash转为索引:
 								var i = 0;
 								var arr2 = [];
 								for (arr2[i++] in hash);
 								console.log(arr2);
 								return arr2;
 							}
 							arrtype = repeat(arrtype)
 							
 							var datalist = []
 						
 							for(var n=0;n<arrtype.length;n++){
 								var msg ={
 									type:arr[n].type,
 									typeName:'',
 									list:[]
 								}
 								datalist[n]=msg
 								for(var m=0;m<arr.length;m++){
 									if(arrtype[n] == arr[m].type){
 										 
 										datalist[n].list.push(arr[m])
 										datalist[n].typeName = arr[m].typeName
 									}
 								}
 							}
 							
 							
 							this.gongyingzhanlist = datalist
 							
 							console.log(3434)
 							console.log(arrtype)
 							console.log(this.gongyingzhanlist)
 														 
 							for(var i =0;i<this.gongyingzhanlist.length;i++){
								
								if(typeof this.gongyingzhanlist[i].choseflag == 'undefined') {
									this.$set(this.gongyingzhanlist[i], "choseflag",true)
								}
								
 								for(var j =0;j<this.gongyingzhanlist[i].list.length;j++){
 								  if(typeof this.gongyingzhanlist[i].list[j].choseflag == 'undefined') {
 										this.$set(this.gongyingzhanlist[i].list[j], "choseflag",false)
 								  }
 								}
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
 			chosezhandian:function(){
 				uni.navigateTo({
 						url: '../zhandianxuanze/zhandianxuanze'
 				})
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
 				this.savedata.checkCompletedDate = e.target.value
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
 	 .lists .slide{
 		 position: relative;
 	 }
 	 .lists .slide .rightjiantou{
 		 width:40upx;
 		 height:40upx;
 		 display: inline-block;
 		 background: url(../../static/images/icon-down-jiantou.png) no-repeat center;
 		 background-size:40upx 40upx;
 		 position: absolute;
 		 right:40upx;
 		 top:33upx;
 	 }
 	 .itemgouxuan .list{
 		 position: relative;
 	 }
 	 .itemgouxuan .righttitle{
 		 width:30upx !important;
 		 height:22upx;
 		 display: inline-block;
 		 background: url(../../static/images/icon-gouxuan.png) no-repeat center center;
 		 background-size:30upx 22upx;
 		 position: absolute;
 		 right:60upx;
 		 top:43upx;
 		 
 	 }
 	 .zhandianxuncha .slide{
 		 background-color: #F8FFF0;
 	 }
 	 .zhandianxuncha .slide .title{
 		 font-size:30upx;
 		 color:#000;
 	 }
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
 	 .listlianghang{
 		 line-height:50upx !important;
 		 padding-top:10upx;
 		 padding-bottom:10upx;
 	 }
 	 .listlianghang .title{
 		 width:80%;
 		 display:inline-block;
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
 	 .chosezhandian{
 		 background:url(../../static/images/icon-right-jiantou.png) no-repeat 96% center;
 		 background-size:14upx 24upx;
 		 padding-right:50upx;
 	 }
 	 .chosezhandian .righttitle{
 		 margin-right:20upx;
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
 	 .yinhuanduban .picker.zhandian{
 	  		 background: url(../../static/images/icon-right-jiantou.png) no-repeat 96% center;
 	  		 background-size: 14upx 24upx;
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
  
  .zhengdianDetails .itemlist .list{
	height:auto;
	line-height:100rpx;
	border-bottom:1rpx solid #ECEEF5;
	padding-right:40rpx;
	padding-left:40rpx;
}
.zhengdianDetails .itemlist .list .imglist{
	font-size:0;
	
	margin-top:0upx;
	
}
.zhengdianDetails .itemlist .list .imglist image{
	display:inline-block;
	width:25%;
	margin-left:2%;
	height:120rpx;
	margin-right:40rpx;
	padding-left:0;
	padding-right:0;
	margin-bottom:0rpx;
}   
 </style>
 