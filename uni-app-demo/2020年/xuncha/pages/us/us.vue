 <template>
 	<view class="content">
 		<view class="contentlayout">
			<view class="userinfo">
				<image class="iconuser" src="../../static/images/icon-user.png"></image>
				<text class="userwen">燃气站</text>
			</view>
			<view class="itemlist">
				<view class="list">
					<text class="lvziti">{{superviseList.checkedQuantity}}</text>
					<text>已巡查站点数量</text>
				</view>
				<view class="list">
					<text class="lvziti">{{superviseList.receiveQuantity}}</text>
					<text>待巡查任务</text>
				</view>
				<view class="list">
					<text class="lvziti">{{superviseList.awaitQuantity}}</text>
					<text>待整改站点</text>
				</view>
			</view>
			
			<view class="items">
				<navigator url="../qiyezhishiKu/qiyezhishiKu" class="list" hover-class="navigator-hover">
				       <image class="zhishiku" src="../../static/images/icon-zhishiku.png"></image>
				       <text class="wenzi">企业知识库</text>
				</navigator>
				<navigator url="../tongzhiGonggao/tongzhiGonggao" class="list" hover-class="navigator-hover">
				       <image class="xiaoxizhongxin" src="../../static/images/icon-xiaoxizhongxin.png"></image>
				       <text class="wenzi">通知公告</text>
				</navigator>
				
				<navigator url="../xiugaiMima/xiugaiMima" class="list" hover-class="navigator-hover">
				       <image class="xiugaimima" src="../../static/images/icon-xiugaimima.png"></image>
				       <text class="wenzi">修改密码</text>
				</navigator>
				
				<navigator url="../zhandianMsg/zhandianMsg" class="list" hover-class="navigator-hover">
				       <image class="xiaoxizhongxin" src="../../static/images/icon-xiaoxizhongxin.png"></image>
				       <text class="wenzi">站点列表</text>
				</navigator>				
			</view>			
 		</view>
 	</view>
 </template>
 
 <script>
	var view
 	export default {
 		data() {
 			return {
 				title: 'Hello zrliao',
				superviseList:{}
 			}
 		},
 		onLoad() {
 
 		},
 		methods: {
			findMy:function(){
				console.log(1111)
				this.$request({
					url:'findMy',
					method:'post',								
					data:{},
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
 		},
		mounted:function(){
			view = this
			this.findMy()
		}
		
 	}
 </script>
 
 <style scoped>
 	 .content{	
 		 /* width:678upx; */
		 width:100%;
 		 height:100%;
 		 margin:0upx auto;		
 	 }
 	 .contentlayout{
 	 	position: absolute;
 	 	bottom:100upx;
 	 	top:50upx;
 	 	/* width:678upx; */
		width:100%;
		left:0;
		right:0px;
 		margin:auto;
 	 	overflow-y:auto;
 	 }
	 .contentlayout .userinfo{
		 height:160upx;
		 vertical-align: middle;
	 }
	 .contentlayout .userwen{
	 		 font-size:44upx;
			 color:#000;
	 		 vertical-align: middle;
			 margin-left:40upx;
	 }
	 .contentlayout .userinfo .iconuser{
		 width:160upx;
		 height:160upx;
		 border-radius: 80upx;
		 vertical-align: middle;
		 margin-left:50upx;
	 }
	 .contentlayout .itemlist{
		 font-size:0;
		 width:100%;
		 margin-top:50upx;
	 }
	 .contentlayout .itemlist .list{
		 width:33.33%;
		 display: inline-block;
		 box-sizing: border-box;
		 font-size:28upx;
		 text-align: center;
	 }
	 .contentlayout .items{
		 margin-top:30upx;
	 }
	 .contentlayout .items .list{
		 width:100%;
		 height:90upx;
		 line-height: 90upx;
		 border-top: 1px solid #ECEEF5;
		 font-size:30upx;
		 color:#000;
		 text-indent:40upx;
	 }
	 .contentlayout .items .list:last-child{
		 border-bottom: 1px solid #ECEEF5;
	 }
	 .contentlayout .items .zhishiku{
		 width:34upx;
		 height:28upx;
		 vertical-align: middle;
		 margin-right:20upx;
	 }
	 .contentlayout .items .xiaoxizhongxin{
	 		 width:36upx;
	 		 height:30upx;
	 		 vertical-align: middle;
	 		 margin-right:20upx;
	 }
	 .contentlayout .items .xiugaimima{
	 		 width:32upx;
	 		 height:38upx;
	 		 vertical-align: middle;
	 		 margin-right:20upx;
	 }
	 .lvziti{
		 font-size:32upx;
		 color:#02B360;
		 display: block;
		 margin-bottom: 10upx;
	 }
	 .footer{
		 position: absolute;
		 bottom:0;
		 left:0;
		 right:0;
		 height:100upx;
	 }
 	 .footer .list{
 		 font-size:28upx;
 		 display:inline-block;
 		 width:50%;
 		 box-sizing: border-box;
 		 text-align: center;
 		 vertical-align: middle;
 		 position: relative;
		 height:100%;
		 margin-bottom:0upx;
 	 }
 	 .footer .list .shouye{
 		 width:40upx;
 		 height:38upx;
 		 position:absolute;
 		 top:8%;
 		 left:50%;
 	 }
 	 .footer .list .us{
 	 		 width:38upx;
 	 		 height:40upx;
 	 		 position:absolute;
 	 		 top:8%;
 	 		 left:50%;
 	 }
 	 .footer .list .wenzi{
 		 position: absolute;
 		 left:42%;
 		 top:50%;
 		 width:100upx;
 	 }
	 .lvse{
	 	 color:#098942;
	 }
	 
 	 
 </style>
 