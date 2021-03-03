    <template>
 	<view class="content zhengdianDetails yinhuanduban zhandianxuncha">
 		<view class="itemlist">
 			<view class="list">	
 				<view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">基本信息</text>
 				</view>
 			</view>
			
 		    <!-- 	<picker class="picker zhandian" @change="changexunchazhandian" :value="xunchazhandian" mode="selector">
 				<view class="list">
 					<text class='title'>巡查站点</text>
 					<text @click="chosezhandian" style="color:#C6C6C6;" class='righttitle title'>请选择站点或者扫描二维码</text>		 
 				</view>
 			</picker> -->
		
			<view class="list chosezhandian">
				<text class='title'>巡查站点</text>
				<image class="scanCode" @tap="scanCode" src="../../static/images/icon-saoma.png"></image>
				<text @click="chosezhandian" v-if="!zhandianxuanzeflag" style="color:#C6C6C6;" class='righttitle title'>请选择站点</text>
				<!-- <text v-if="!zhandianxuanzeflag" style="color:#C6C6C6;" class='righttitle title'>请选择站点</text> -->
				<text  @click="chosezhandian" v-if="zhandianxuanzeflag" style="margin-right:40upx !important;" class='righttitle title'>{{savedata.siteName}}</text>
			</view>
			
			<view class="list">	
				<text class='title'>联系人</text>			
				<input  v-model="savedata.personLiable" class='righttitle shurukuang title' placeholder="请输入联系人" type="text">
			</view>
			<view class="list">	
				<text class='title'>联系方式</text>			
				<input v-model="savedata.telephone" class='righttitle shurukuang title' placeholder="请输入联系方式" type="number">
			</view>
			<view class="list">	
				<text class='title'>地址</text>			
				<input v-model="savedata.address" class='righttitle shurukuang title' placeholder="请输入地址" >
			</view>
 			<view class="list">	
 				<text class='title'>巡查人数</text>			
 				<input class='righttitle title shurukuang' v-model="savedata.personNumber" placeholder="请输入巡查人数" type="number">
 			</view>
 		</view>
		
 		<view class="itemlist itemgouxuan">
 			<view class="list">	
 				<view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">巡查项目（{{gongyingzhanlist.length}}）</text>
 				</view>			
 			</view>
			<view v-for="(item,index) in gongyingzhanlist" :key="item.type" class="lists">
				<view @click="yinhuanqiehuan(item)" class="list slide">
					<text class='title'>{{item.typeName}}</text>
					<text class='rightjiantou title' :class="{'upjianrou':!item.choseflag}"></text>
				</view>				 
				<view v-if="item.choseflag" v-for="(item1,cell) in item.list" :key="item1.itemCategory">	
					<view @click="gongyingclick(item1)" class="list" :class="{'listlianghang':item1.itemContent.length > 20,'nobottom':item1.choseflag}">
						<text class='title'>{{item1.itemContent}}</text>
						<text class='title' :class="{'righttitle':item1.choseflag}"></text>	
					</view>
					<img-box2 :yinhuanID= "item1.id" @yinhuanimglist="yinhuanimglist" v-if="item1.choseflag" ref="imgboxyinhuan" :max="5"></img-box2>
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
			<!-- <view class="list">	
				<text class='title'>巡查结果</text>
				<text class='righttitle title'>{{savedata.patrolResult}}</text>
			</view> -->
			
			<picker class="picker" @change="changexunchajieguo" :range="xunchalist" range-key="itemName" mode="selector">
				<view class="list">
					<text class='title'>巡查结果</text>
					<text v-if="!xunchajieguoflag" class='righttitle title'>请选择巡查结果</text>
					<text v-if="xunchajieguoflag" class='righttitle title'>{{savedata.patrolResultName}}</text>
				</view>
			</picker>
			<picker class="" mode="date" :start="startDate" :end="endDate" @change="bindDatexuncha">
				<view class="list">
					<text class='title'>巡查日期</text>
					<text class='righttitle title'>{{savedata.patrolDate}}</text>
				</view>
			</picker>
			
			
			<img-box @uploadzhenggai="uploadzhenggai" ref="imgbox" title="意见整改" :max="1"></img-box>
			<img-box1 imgtype="其他" @uploadstate="uploadstate" ref="imgbox2" title="其他照片" :max="5"></img-box1>
			
			<!-- <view @click="chooseImage2" class="list paizhao">	
				<text class='title'>意见整改</text>
				<text class='righttitle title'>右侧点击拍照或上传照片</text>
			</view>
			<view v-if="imageList2.length" class="photolist">
				<view class="list" v-for="(item,index) in imageList2" :key="index">
					<image @tap="previewImage2(item)" :src="item" :data-src="image"></image>
					<view @tap="imageList2.splice(index,1)" class="uni-icon uni-icon-closeempty"></view>
				</view>
			</view>
			<view @click="chooseImage" class="list paizhao" >	
				<text class='title'>其他照片</text>
				<text class='righttitle title'>右侧点击拍照或上传照片</text>
			</view>
			<view v-if="imageList.length" class="photolist">
				<view class="list" v-for="(item,index) in imageList" :key="index">
					<image @tap="previewImage(item)" :src="item" :data-src="image"></image>
					<view @tap="imageList.splice(index,1)" class="uni-icon uni-icon-closeempty"></view>
				</view>
			</view> -->
			
			<picker class="" mode="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="list">
					<text class='title'>截止日期</text>
					<text class='righttitle title'>{{savedata.rectifyEndDate}}</text>
				</view>
			</picker>
			<view class="list">	
				<text class='title'>备注</text>
				<input class='righttitle title shurukuang' v-model="savedata.remark" placeholder="请输入备注" type="text">		
			</view>
		</view>
 		<view @click="shangbao"  class="shangbaobtn">
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
					sitePatrolDetailList:[],
					"status": "20",
					"statusName": "待整改",
					"telephone": "",
					"version":''
			  },
			  gongyingzhantypeName:"",
			  fuwuzhanlisttypeName:'',
			  gongyingzhanlist:[],
			  fuwuzhanlist:[],
			  gongyinglist:[],
			  zhandianxuanzeflag:false,
			  imageList:[],
			  imageList2:[],
			  max:5,
			  qitaimglist:[],
			  yinhuanimglistAll:[],
			  uploadedyinhuanImglist:[],
			  yijianzhenggaiimglist:[],
			  xunchalist:[
				  {
					  itemName:"存在安全隐患",
					  itemCode:'10'
				  },
				  {
					  itemName:"无隐患",
					  itemCode:'20'
				  }
			  ],
			  xunchajieguoflag:false
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
		  this.findPatrolItemList()
		},
		onShow() {
			if (uni.getStorageSync('zhandianmsg')) { //回退到此页面时判断是否需要刷新
			
			    var msg = JSON.parse(uni.getStorageSync('zhandianmsg'))
				console.log(111)
				console.log(msg)
				
				this.zhandianxuanzeflag = true
				this.savedata.siteId = msg.id
				this.savedata.siteName = msg.siteName
				 
				uni.setStorageSync('zhandianmsg', false);
				 
			}
		},
 		methods:{
			scanCode:function(){
				var _this = this
				uni.scanCode({
					success: function (res) {
						console.log(999)
						console.log(res)
						_this.savedata.siteName = res.result;
						_this.zhandianxuanzeflag = true
					},
					fail: function (res) {}
				})
			},
			changexunchajieguo:function(e){
			  let index = e.detail.value;
			  this.xunchajieguoflag = true		
			  console.log(index)			  
			  this.savedata.patrolResult = this.xunchalist[index].itemCode
			  this.savedata.patrolResultName = this.xunchalist[index].itemName
			},
			uploadzhenggai:function(imglist){
			  this.yijianzhenggaiimglist = imglist
			},
			uploadstate:function(imageList){
				this.qitaimglist = imageList
			},
			yinhuanqiehuan:function(item){
				item.choseflag = !item.choseflag
			},
			onSave(paths) {
				let safetyTaskPhotoList = paths.map(item => {
					return {
						fileName: item.fileKey,
						photoOriginalUrl: item.accessoryUrl,
						type: '20',
					}
				})							 				 
				// this.savedata.sitePatrolPhotoList = [...this.savedata.sitePatrolPhotoList,...safetyTaskPhotoList]
				console.log(445556)
				console.log(safetyTaskPhotoList)
				if(safetyTaskPhotoList.length >0 ){
					this.savedata.rectifyExplain = safetyTaskPhotoList[0].photoOriginalUrl
				}	
				console.log(111)
				console.log(this.qitaimglist)				
			    if(this.qitaimglist.length>0){
					this.$refs.imgbox2.upload((paths) => {
						this.onSave2(paths);				
						console.log(111111111)
					})
				}else{
					this.savejiekou()
				}				
			},
			
			yinhuanimgsave:function(paths){
				let safetyTaskPhotoList3 = paths.map(item => {
					return {
						fileName: item.fileKey,
						photoOriginalUrl: item.accessoryUrl,
						type: '20',
					}
				})
				console.log(55666)
				console.log(safetyTaskPhotoList3)
			},
			onSave2:function(paths){
				let safetyTaskPhotoList2 = paths.map(item => {
					return {
						fileName: item.fileKey,
						photoOriginalUrl: item.accessoryUrl,
						type: '20',
					}
				})							 
			
				this.savedata.sitePatrolPhotoList = [...this.savedata.sitePatrolPhotoList,...safetyTaskPhotoList2]
				console.log(99999)
				console.log(this.savedata)
				console.log(this.savedata.sitePatrolPhotoList)
				this.savejiekou()				
			},				
			savejiekou:function(){	
				console.log('savejiekousavejiekou')
				console.log(this.savedata)
				var length = this.savedata.sitePatrolDetailList.length
				if(length>0){
					for(var i =0;i<length;i++){
						for(var j=0;j<this.savedata.sitePatrolDetailList[i].sitePatrolDetailPhotoList.length;j++){
							var msg ={
								photoUrl:this.savedata.sitePatrolDetailList[i].sitePatrolDetailPhotoList[j].accessoryUrl,
					            photoOriginalUrl:this.savedata.sitePatrolDetailList[i].sitePatrolDetailPhotoList[j].accessoryUrl
							}
							Object.assign(this.savedata.sitePatrolDetailList[i].sitePatrolDetailPhotoList[j],msg)
							// this.savedata.sitePatrolDetailList[i].sitePatrolDetailPhotoList.push(msg)
						}
					}			
				}					
				var length2 = this.savedata.sitePatrolPhotoList.length	
				if(length2>0){
					for(var m=0;m<length2;m++){
						var msg ={
							photoUrl:this.savedata.sitePatrolPhotoList[m].photoOriginalUrl,
							photoOriginalUrl:this.savedata.sitePatrolPhotoList[m].photoOriginalUrl
						}
						Object.assign(this.savedata.sitePatrolPhotoList[m],msg)					
					}	
				}													
				console.log(66666)
				console.log(this.savedata)									
				// return				
				this.$request({
					url: 'saveSitePatrol',
					method:'post',
					showLoading:true,
					loadingText:'正在提交',
					data:this.savedata,
					success:(jsonData) => {
						console.log(777766)
						console.log(jsonData)
						if(jsonData.status){
							uni.showToast({
								title:jsonData.msg,
								duration: 1000
							});
							setTimeout(() =>{
								uni.navigateBack({
									delta:1
								})
							},1500) 							  																	   
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
			shangbao:function(){
				if(!this.savedata.siteId){
					this.toast('站点名称不能为空');
					return
				}
				if(!this.savedata.personLiable){
					this.toast('责任人不能为空');
					return
				}
				if(!this.savedata.telephone){
					this.toast('联系方式不能为空');
					return
				}
				if(!this.savedata.patrolResult){
					this.toast('巡查结果不能为空');
					return
				}
				if(!this.savedata.patrolDate){
					this.toast('巡查日期不能为空');
					return
				}
				if(!this.savedata.rectifyEndDate){
					this.toast('截止日期不能为空');
					return
				}											
				if(this.yijianzhenggaiimglist.length == 0){
					this.toast('意见整改图片不能为空');
					return
				}
				console.log(111)
				console.log(this.savedata)	
				console.log(this.gongyingzhanlist)
				console.log(8888)
				console.log(this.yinhuanimglistAll)
				if(this.yinhuanimglistAll.length>0){
					uploadyinhuanimglist()
				}else{
					this.$refs.imgbox.upload((paths) => {
						this.onSave(paths);	
					})
				}								
			},
			yinhuanimglist:function(imglist,yinhuanID){
				console.log(7788)
				console.log(imglist)
				console.log(yinhuanID)				
				this.yinhuanimglistAll= [...this.yinhuanimglistAll,...imglist]																		
				var length = this.gongyingzhanlist.length
				var arr= []
				for(var i =0;i<length;i++){						
					for(var j=0;j<this.gongyingzhanlist[i].list.length;j++){
						if(this.gongyingzhanlist[i].list[j].choseflag){
							arr.push(this.gongyingzhanlist[i].list[j])
						}
					}
				}
				console.log(2323)
				console.log(JSON.stringify((arr)))				
				console.log(arr)
				var _this = this
				for(var m=0;m<arr.length;m++){					
					if(arr[m].id == yinhuanID ) {
						arr[m].sitePatrolDetailPhotoList = imglist
					}
				}
				console.log(88899)
				console.log(arr)
				this.savedata.sitePatrolDetailList = arr.slice(0)
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
					method:'post',				
					data:msg,
					success:(jsonData) => {
						console.log(777766)
						console.log(jsonData)
						if(jsonData.status){
							
							  var arr= jsonData.data
							  var arrtype = []
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
								  if(typeof this.gongyingzhanlist[i].list[j].sitePatrolDetailPhotoList == 'undefined') {
								  	this.$set(this.gongyingzhanlist[i].list[j], "sitePatrolDetailPhotoList",[])
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
				console.log(222)
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
			bindDatexuncha:function(e){
				// this.date = e.target.value
				this.savedata.patrolDate = e.target.value
			},
 			bindDateChange: function(e) {
 				this.date = e.target.value
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
	function uploadyinhuanimglist(){ 
		view.uploadedyinhuanImglist = [];
		onUpload(0,callback) 				
	}
	function callback(paths){
		console.log(9999)
		console.log(paths)
		console.log(8888)
		console.log(view.savedata.sitePatrolDetailList)
		
		var length = view.savedata.sitePatrolDetailList.length
		for(var i=0;i<length;i++){
			for(var j=0;j<view.savedata.sitePatrolDetailList[i].sitePatrolDetailPhotoList.length;j++){
				for(var m=0;m<paths.length;m++){
					var originpath = view.savedata.sitePatrolDetailList[i].sitePatrolDetailPhotoList[j]
					var shangchuanpath = paths[m].fileKey					
					console.log(111)
					console.log(originpath)
					console.log(shangchuanpath)										
					if(shangchuanpath.toString().substring(shangchuanpath.length-10) == originpath.toString().substring(originpath.length-10)){
						view.savedata.sitePatrolDetailList[i].sitePatrolDetailPhotoList[j] = paths[m]
					}					 
				}
			}
		}
		view.$refs.imgbox.upload((paths) => {
			view.onSave(paths);	
		})
		console.log(77766)
		console.log(view.savedata.sitePatrolDetailList)
	}
	
	function onUpload(index, callback) {
		let uploadTask = uni.uploadFile({
			url: view.BASE_URL + '/eidpws/wxTrace/wxImage/wxImageUploadSave', //仅为示例，非真实的接口地址
			filePath: view.yinhuanimglistAll[index],
			name: 'WORK',
			success: (uploadFileRes) => {
				console.log(JSON.stringify(uploadFileRes));
				let data = JSON.parse(uploadFileRes.data);
				console.log(JSON.stringify(data.data));
				let accessoryUrl = data.data[0].accessoryUrl;
				let fileName = data.data[0].fileKey;
				console.log(accessoryUrl);
				view.uploadedyinhuanImglist.push(data.data[0]);
				if (index != view.yinhuanimglistAll.length - 1) {
					onUpload(++index, callback);
				} else {					 
					if (callback) {
						callback(view.uploadedyinhuanImglist);
					}
				}
			},
			fail(e) {
				console.log(e);				
				view.toast("图片上传失败");
			}
		});	 
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
		 background: url(../../static/images/icon-up-jianrou.png) no-repeat center;
		 background-size:40upx 40upx;
		 position: absolute;
		 right:40upx;
		 top:33upx;
	 }
	  .lists .slide .rightjiantou.upjianrou{
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
		 background:url(../../static/images/icon-right-jiantou.png) no-repeat 88% center;
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
  .nobottom{
	  border-bottom:none !important;
  }
  .chosezhandian image{
	  display: inline-block;
	  width:32upx;
	  height:32upx;
	  vertical-align: middle;
	  margin-left:200upx;
  }
  .scanCode{
	  float:right;
	  margin-right:0upx;
	  margin-top:35upx;
  }
  .chosezhandian image {
	margin-left:0rpx;
	}
	.chosezhandian .righttitle {
		margin-right:40rpx;
	}

 </style>
 