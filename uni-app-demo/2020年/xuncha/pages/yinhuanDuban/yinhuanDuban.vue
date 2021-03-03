   <template>
 	<view class="content zhengdianDetails yinhuanduban">
 		<view class="itemlist">
			<view class="list">	
				<view class="title">
					  <text class='line'></text>
					  <text class="biaoti">基本信息</text>
				</view>
			</view>
 			<view class="list bitian">	
 				<text class='title'>巡查人</text>
 				<!-- <text class='righttitle title'>{{savedata.superviseEmpName}}</text> -->
				<input class='righttitle title shurukuang' v-model="savedata.superviseEmpName" placeholder="请输入巡查人" type="text">
 			</view>
 			<view class="list">	
 				<text class='title'>单位</text>			
				<input class='righttitle title shurukuang address' v-model="savedata.company" placeholder="请输入单位" type="text">
 			</view>
								
			<view class="list">	
				<text class='title'>区</text>
				<picker v-if="quyuID && jiedaolist.length" @change="changejiedao" :range="jiedaolist" range-key="streetName" class="righttitle jiedaopicker" mode="selector" :value="jiedao" >
				   <text v-if="!chosejiedao" class='title'>请选择街道</text>
				   <text v-if="chosejiedao"  class='title'>{{savedata.streetName}}</text>
				</picker>
				<view v-if="!(quyuID && jiedaolist.length)" class="righttitle jiedaopicker">
					<text  class='title'>请选择街道</text>
				</view>		
				<picker @change="changequyu" :range="quyulist" range-key="areaName" class="righttitle quyupicker" mode="selector" :value="quyu" >
				   <text v-if="!chosequyu" class='title'>请选择区</text>
				   <text v-if="chosequyu"  class='title'>{{savedata.areaName}}</text>
				</picker>
			</view>				
			<picker v-if="jiedaoID && shequlist.length" class="picker" @change="changeshequ2" :range="shequlist" range-key="communityName" :value="shequ" mode="selector">
				<view class="list">
					<text class='title'>社区</text>
					<text v-if="!choseshequ" class='righttitle title'>请选择社区</text>
					<text v-if="choseshequ"  class='righttitle title'>{{savedata.communityName}}</text>
				</view>
			</picker>
			<view class="picker" v-if="!(jiedaoID && shequlist.length)">
				<view class="list">
					<text class='title'>社区</text>
					<text v-if="!choseshequ" class='righttitle title'>请选择社区</text>
					<text v-if="choseshequ"  class='righttitle title'>{{savedata.communityName}}</text>
				</view>
			</view>
										
 			<view class="list">	
 				<text class='title'>地址</text>			
 				<input class='righttitle title shurukuang'  v-model="savedata.address" placeholder="请输入地址" type="text">
 			</view>
			
			<view class="list">	
				<text class='title'>联系人</text>			
				<input class='righttitle title shurukuang'  v-model="savedata.contacts" placeholder="请输入联系人" type="text">
			</view>
 			<view class="list">	
 				<text class='title'>联系电话</text>
 				<input class='righttitle title shurukuang'  v-model="savedata.telephone" placeholder="请输入联系电话" type="number">		
 			</view>
 			<view class="list">	
 				<text class='title'>巡查人数</text>
 				<input class='righttitle title shurukuang'  v-model="savedata.personNumber" placeholder="请输入巡查人数" type="number">		
 			</view>
 		    <view class="list">	
 				<text class='title'>检查内容</text>
 				<input class='righttitle title shurukuang'  v-model="savedata.content" placeholder="请输入检查内容" type="text">		
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
				<input class='righttitle title shurukuang'  v-model="savedata.superviseResult" placeholder="" type="text">		
			</view> -->
			
			<picker class="picker" @change="changeshequ" :range="zhenggailist" range-key="itemName" :value="shequ" mode="selector">
				<view class="list">
					<text class='title'>检查结果</text>
					<text v-if="!zhenggaiflag" class='righttitle title'>请选择整改结果</text>
					<text v-if="zhenggaiflag" class='righttitle title'>{{checkjieguo}}</text>
				</view>
			</picker>
										
			<!-- <view @click="chooseImage2" class="list paizhao">	
				<text class='title'>意见整改</text>
				<text class='righttitle title'>右侧点击拍照或上传照片</text>
			</view>
			
			<view v-if="imageList2.length" class="photolist">
				<view class="list" v-for="(item,index) in imageList2" :key="index">
					<image @tap="previewImage2(item)" :src="item" :data-src="image"></image>
					<view @tap="imageList2.splice(index,1)" class="uni-icon uni-icon-closeempty"></view>
				</view>
			</view> -->
			
			<!-- <img-box ref="imgbox" title="意见整改" :max="5"></img-box>
			<img-box ref="imgbox2" title="其他照片" :max="5"></img-box> -->
			
			<img-box @uploadzhenggai="uploadzhenggai" ref="imgbox" title="意见整改" :max="1"></img-box>
			<img-box1 imgtype="其他" @uploadstate="uploadstate" ref="imgbox2" title="其他照片" :max="5"></img-box1>
				
			<!-- <view @click="chooseImage" class="list paizhao" >	
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
			 loading: false,
			 zhenggailist:[],
			 savedata: {
                "address": "",
                "areaId": "",
                "areaName": "",
                "communityId": "",
                "communityName": "",
                "company": "",
                "contacts": "",
                "content": "",
                "personNumber":"",
                "rectifyEndDate": "",
                "rectifyExplain": "",
                "rectifyExplainName": "",
                "remark": "",
                "status": "",
                "streetId": "",
                "streetName": "",
                "superviseDate": "",
                "supervisePhotoList": [],
                "superviseResult": "",
                "telephone": "",
                "version": 2
              },
			  zhenggaiflag:false,
			  checkjieguo:'',
			  checkResult:'',
			  imageList:[],
			  imageList2:[],
			  max:5,
			  uploading: false,
			  uploadedImg: [],
			  statusArr: [],
				
			  quyulist:[],
			  chosequyu:false,
			  chosejiedao:false,
			  quyuID:'',
			  jiedaoID:'',
			  jiedaolist:[],
			  shequlist:[],
			  choseshequ:false,
			  shequID:'',
			  streetID:'',
			  yijianzhenggaiimglist:[],
			  qitaimglist:[]
 			}
 		},
		created:function(){
			view = this;
		},
		mounted:function(){
		  this.duchajieguo()
		  this.FINDAREA()		  
		},
		watch:{
			quyuID:function(){
				this.jiedaolist = []
				if(this.quyuID){
				  this.FINDSTREET()	
				}				
			},
			jiedaoID:function(){
				this.shequlist = []
				if(this.jiedaoID){
				  this.FINDCOMMUNITYREPOSITORY()	
				}		
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
			uploadzhenggai:function(imglist){
			  this.yijianzhenggaiimglist = imglist
			},
			uploadstate:function(imageList){
				this.qitaimglist = imageList
			},
			FINDSTREET:function(){
				this.$request({
					url: 'FINDSTREET',
					method:'post',
					data:{
						areaId:this.quyuID
					},
					success:(jsonData) => {
						console.log(34345)
						console.log(jsonData)
						this.jiedaolist = jsonData.data
					},
					complete() {
						view.loading = false;
					}
				});
			},
			FINDCOMMUNITYREPOSITORY:function(){
				this.$request({
					url: 'FINDCOMMUNITYREPOSITORY',
					method:'post',
					data:{	
					  streetID:this.jiedaoID	
					},
					success:(jsonData) => {
						console.log(9999)
						console.log(jsonData)
						this.shequlist = jsonData.data
					},
					complete() {
						view.loading = false;
					}
				});
			},
			FINDAREA:function(){
				var _this= this
				this.$request({
					url: 'FINDAREA',
					method:'get',
					data:{						 
					},
					success:(jsonData) => {
						console.log(44455)
						console.log(jsonData)
						_this.quyulist = jsonData.data
						console.log(_this.quyulist)
					},
					complete() {
						view.loading = false;
					}
				});
			},
			chooseImage: async function(num) {
				if(this.imageList.length>= 5){
					return
				}
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed', 'original'],
					count: this.max - this.imageList.length,
					success: (res) => {
						console.log(res);
						this.imageList =[...new Set(this.imageList.concat(res.tempFilePaths))];
					}
				})
			},
			chooseImage2: async function(num) {
				if(this.imageList2.length>= 5){
					return
				}
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed', 'original'],
					count: this.max - this.imageList2.length,
					success: (res) => {
						console.log(res);
						this.imageList2 =[...new Set(this.imageList2.concat(res.tempFilePaths))];
					}
				})
			},
			previewImage: function(src) {
				uni.previewImage({
					current: src,
					urls: this.imageList
				})
			},
			previewImage2: function(src) {
				uni.previewImage({
					current: src,
					urls: this.imageList2
				})
			},
			deleteImg(index) {
				if (this.uploading) {
					view.toast('正在上传，请勿操作');
				} else {
					this.imageList.splice(index, 1);
				}
			},
			deleteImg2(index) {
				if (this.uploading) {
					view.toast('正在上传，请勿操作');
				} else {
					this.imageList2.splice(index, 1);
				}
			},
			getImageList() {
				return this.imageList;
			},
			getImageList2() {
				return this.imageList2;
			},
			changejiedao:function(e){												 							
				if(!this.quyuID){
					this.toast('请先选择区')
					return
				}				
				this.chosejiedao = true
				let index = e.detail.value;
				this.savedata.streetName = this.jiedaolist[index].streetName
				this.jiedaoID = this.jiedaolist[index].id	
				this.savedata.streetId = this.jiedaolist[index].id
				
			},
			changequyu:function(e){
				this.chosequyu = true
				let index = e.detail.value;
				this.savedata.areaName = this.quyulist[index].areaName
				this.savedata.areaId = this.quyulist[index].id
				this.quyuID = this.quyulist[index].id						
				this.chosejiedao = false			 
				this.savedata.streetName = ''
				this.jiedaoID = ''	
				this.choseshequ = false							 
				this.savedata.communityName = ''			 	
			}, 
			changeshequ:function(e){
			  let index = e.detail.value;
			  this.zhenggaiflag = true		
			  console.log(index)
			  this.checkResult = this.zhenggailist[index].itemCode
			  this.checkjieguo = this.zhenggailist[index].itemName
			  this.savedata.superviseResult = this.zhenggailist[index].itemCode
			},
			changeshequ2:function(e){
			  if(!this.jiedaoID){
				 return
			  }
			   this.choseshequ = true
			   let index = e.detail.value;
			   this.savedata.communityName = this.shequlist[index].communityName	
			   this.savedata.communityId = this.shequlist[index].id	
			},
			duchajieguo:function(){
				this.$request2({
					url: 'findDetailList',
					method:'post',
					data:{
						dictCode:'SUPERVISE_RESULT'
					},
					success:(jsonData) => {
						console.log(777)
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
				 
				if(safetyTaskPhotoList.length >0 ){
					this.savedata.rectifyExplain = safetyTaskPhotoList[0].photoOriginalUrl
				}									 
				// this.savedata.supervisePhotoList = [...this.savedata.supervisePhotoList,...safetyTaskPhotoList]
							
				console.log(111)
				console.log(safetyTaskPhotoList)
				
				if(this.qitaimglist.length>0){
					this.$refs.imgbox2.upload((paths) => {
						this.onSave2(paths);				
						console.log(111111111)
					})
				}else{
					this.savejiekou()
				}										
// 				this.$refs.imgbox2.upload((paths) => {
// 					this.onSave2(paths);					
// 					console.log(111111111)
// 				})

			},
			onSave2:function(paths){
				let safetyTaskPhotoList2 = paths.map(item => {
					return {
						fileName: item.fileKey,
						photoOriginalUrl: item.accessoryUrl,
						type: '20',
					}
				})							 
			
				this.savedata.supervisePhotoList = [...this.savedata.supervisePhotoList,...safetyTaskPhotoList2]
				console.log(99999)
				console.log(this.savedata)
				console.log(this.savedata.supervisePhotoList)
				this.savejiekou()
				// return				
			},
			savejiekou:function(){				
				var length = this.savedata.supervisePhotoList.length			
				for(var j=0;j<length;j++){
					var msg ={
						photoUrl:this.savedata.supervisePhotoList[j].photoOriginalUrl,
						photoOriginalUrl:this.savedata.supervisePhotoList[j].photoOriginalUrl
					}
					Object.assign(this.savedata.supervisePhotoList[j],msg)
					// this.savedata.supervisePhotoList[j].push(msg)
				}							
				console.log(88999)
				console.log(this.savedata)
				// return			
				this.$request({
					url: 'saveSuperviseTask',
					method: 'POST',
					showLoading:true,
					loadingText:'正在提交',
					data:this.savedata,
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
									delta:1
								})
							},1500)
							
						}else{
							
						}
					},
					complete() {
						view.loading = false;
					}
				});
			},
			shangbao:function(){
				if(!this.savedata.company){
					this.toast('单位不能为空')
					return
				}
				if(!this.savedata.areaName){
					this.toast('区不能为空')
					return
				}
				if(!this.savedata.address){
					this.toast('地址不能为空')
					return
				}
				if(!this.savedata.contacts){
					this.toast('联系人不能为空')
					return
				}
				if(!this.savedata.telephone){
					this.toast('联系电话不能为空')
					return
				}
				if(!this.savedata.rectifyEndDate){
					this.toast('截止日期不能为空')
					return
				}
				console.log(this.savedata)
				
				this.$refs.imgbox.upload((paths) => {
					this.onSave(paths);	
				})
			},
 			tabqiehuan:function(index){
 				this.curindex = index
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
 