     <template>
 	<view class="content zhengdianDetails yinhuanduban zhandianxuncha">
 		<view class="itemlist itemgouxuan">
 			<view class="lists">
 				<view class="list slide">
 					<text class='title'>供应站情况</text>
 					<text class='rightjiantou title'></text>
 				</view>
 				<view class="list listlianghang">	
 					<text class='title'>安全管理人员、操作人员持证上岗，并签订安全责任书</text>
 					<text class='righttitle title'></text>
 				</view>
 				<view class="list">	
 					<text class='title'>浴室内安装使用强排式热水器</text>
 					<text class='righttitle title'></text>
 				</view>
 				<view class="list">	
 					<text class='title'>浴室内通风不良</text>
 					<text class='righttitle title'></text>
 				</view>
 			</view>
 			
 			<view class="lists">
 				<view class="list slide">
 					<text class='title'>电器与消防安全</text>
 					<text class='rightjiantou title'></text>
 				</view>
 				<view class="list listlianghang">	
 					<text class='title'>消防器材设置符合规定，正常有效并作定期检查</text>
 					<text class='righttitle title'></text>
 				</view>
 				<view class="list listlianghang">	
 					<text class='title'>可燃气体浓度报警器灵敏、有效，定期检查</text>
 					<text class='righttitle title'></text>
 				</view>
 				<view class="list">	
 					<text class='title'>瓶区有设置防静电绝缘脚垫</text>
 					<text class='righttitle title'></text>
 				</view>
 			</view>
 		</view>
 		
 		<view class="itemlist">
			<picker class="" mode="selector" @change="changezhenggai">
 			<view class="list selectorlist">	
 				<view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">整改结果</text>
					  <text style="color:#C6C6C6;padding-right: 30upx;" class='righttitle title'>请选择整改结果</text>
 				</view>			
 			</view>
			</picker>
 			<view class="list">	
 				<text class='title'>巡查结果</text>
 				<text class='righttitle title'>龙华第二站点</text>
 			</view>
			<view class="list">	
				<text class='title'>核查描述</text>
				<input class='righttitle title shurukuang' placeholder="请输入核查描述" type="text">		
			</view>
 			<view class="list paizhao" :class="{'hasphoto':photolist.length >0}">	
 				<text class='title'>整改照片</text>
 				<text class='righttitle title'>右侧点击拍照或上传照片</text>
				<view class="photolist">
					 <view v-for="(item,index) in photolist" :key="index" class="imglist">
						 <image @tap="previewImage(item)" :src="item" :data-src="image"></image>
				         <view @tap="photolist.splice(index,1)" class="uni-icon uni-icon-closeempty"></view>
					 </view>
				</view>
 			</view>
 		</view>

 		<view class="shangbaobtn">
 			上报
 		</view>
 			
 	</view>
 </template>
 
 <script>
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
			 photolist:[],
			 max:5
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
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed', 'original'],
					count: this.max - this.imageList.length,
					success: (res) => {
						console.log(res);
						this.imageList = this.imageList.concat(res.tempFilePaths);
					}
				})
			},
			previewImage: function(src) {
				uni.previewImage({
					current: src,
					urls: this.imageList
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
	 .zhengdianDetails .itemlist .paizhao.hasphoto{
		 line-height:auto;
		 height:auto;
	 }
	 .selectorlist{
		 background: url(../../static/images/icon-right-jiantou.png) no-repeat 96% center;
		 background-size: 14upx 24upx;
	 }
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
 		 right:44upx;
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
   
 </style>
 