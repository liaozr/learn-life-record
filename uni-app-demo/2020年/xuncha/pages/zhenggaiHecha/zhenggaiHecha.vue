 <template>
 	<view class="content myTasks">
 		<view class="tabhead">
 			<view @click="stateqiehuan(1)" class="list">
 				<view class="tab" :class="{'active':curindex == 1}">
 					待核查
 				</view>
 			</view>
 			<view @click="stateqiehuan(2)" class="list">
 				<view class="tab" :class="{'active':curindex == 2}">
 					已核查
 				</view>
 			</view>
 		</view>
 		<view class="search">
 			<input placeholder="搜索" v-model="searchvalue" class="input" type="text">
 			<view @click="shuaixuan" class="shuaixuan">
 				筛选
 			</view>
 		</view>
 		<view class="itemlist">
 			<view @click="gotoDetail(item)" v-for="(item,index) in superviseList" :key="item.id" class="list">			
 				 <view class="title">
 					  <text class='line'></text>
 					  <text class="biaoti">{{item.company}}</text>
 					  <!-- <text class="tag">隐患督办</text> -->
 				 </view>
 				 <view class="tr">
 					 <view class="th">任务日期：</view>
 					 <view class="td">{{item.createTime}}</view>
 				 </view>
 				  <view class="tr">
 					 <view class="th">截止日期：</view>
 					 <view class="td">{{item.endDate}}</view>
 				 </view>
 				 <view class="tr">
 					 <view class="th">地址：</view>
 					 <view class="td">{{item.address}}</view>
 				 </view>
				  <view class="tr">
					 <view class="th">联系方式：</view>
					 <view class="td">{{item.contacts}} / {{item.telephone}}</view>
				 </view>
				  <view class="tr">
					 <view class="th">检查内容：</view>
					 <view class="td">{{item.content}}</view>
				 </view>
 			</view>
			<empty-view v-if="superviseList.length === 0"></empty-view>
 		</view>
 	</view>
 </template>
 
 <script>
	var view
 	export default {
 		data() {
 			return {
 				status:'10',
				curindex:1,
				superviseList:[],
				searchvalue:'',
				overdue:'N'
 			};
 		},
		created:function(){
			view = this;
		},
		mounted:function(){
			// this.getList()
			
		},
		onShow() {
			if (uni.getStorageSync('zhandianisOverdue')) { //回退到此页面时判断是否需要刷新			
			    var overdue =  uni.getStorageSync('zhandianisOverdue')				
				this.overdue = overdue				
				this.getList()			 
				uni.setStorageSync('zhandianisOverdue', false);
			}else{
				this.getList()
			}
		},
		watch:{
		  searchvalue:function(){
			  this.getList()
		  }	
		},
		methods:{
			gotoDetail:function(item){							
				uni.setStorageSync('zhenggaiHechaID',item.id)
				uni.navigateTo({
					url: '../jianchaDetails/jianchaDetails'
				})
			},
			shuaixuan:function(){
				uni.navigateTo({
					url: '../shuaixuan/shuaixuan'
				})
			},
			stateqiehuan:function(index){
				if(index == 1){
					this.status = '10'
				}else{
					this.status = '20'
				}
				this.curindex = index
				this.getList()
			},
			getList:function(){
				var msg ={					 				
					page:'1',
					pageSize:'10',
					status:this.status,
					rectifyEndDateBefore: '',
					rectifyEndDateAfter: '',
					superviseBefore: '',
					superviseAfter: '',
					areaId: '',
					streetId: '',
					communityId: '',
					address:this.searchvalue,
					overdue:this.overdue
				}
				this.$request({
					url: 'findSuperviseList',
					method:'post',
					showLoading:true,
					loadingText:'加载中',
					data:msg,
					success:(jsonData) => {
						console.log(777766)
						console.log(jsonData)
						if(jsonData.status){
							  this.superviseList = jsonData.data
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
  .myTasks .itemlist .list {
	 
	height:auto !important;
	
	}

 </style>
 