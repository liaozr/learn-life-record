export default{
	// 监听网络
	onNetWork(){
		uni.getNetworkType({
		    success: function (res) {
				console.log('获取')
		        console.log(res.networkType);
				if(res.networkType === 'none'){
					uni.showToast({
						title:'当前处于断网状态',
						icon:'none'
					})
				}
		    }
		});
		// 网络发生变化时，触发的回调
		uni.onNetworkStatusChange(function (res) {
			console.log('监听')
		    console.log(res.isConnected);
		    console.log(res.networkType);
			
			if(res.networkType === 'none'){
				uni.showToast({
					title:'当前处于断网状态，请先连接网络',
					icon:'none'
				})
			}
		});
	},
	// 热更新
	update(){
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
		    uni.request({  
		        url: 'http://www.example.com/update/',  
		        data: {  
		            version: widgetInfo.version,  
		            name: widgetInfo.name  
		        },  
		        success: (result) => {  
		            var data = result.data;  
		            if (data.update && data.wgtUrl) {  
		                uni.downloadFile({  
		                    url: data.wgtUrl,  
		                    success: (downloadResult) => {  
		                        if (downloadResult.statusCode === 200) {  
		                            plus.runtime.install(downloadResult.tempFilePath, {  
		                                force: false  
		                            }, function() {  
		                                console.log('install success...');  
		                                plus.runtime.restart();  
		                            }, function(e) {  
		                                console.error('install fail...');  
		                            });  
		                        }  
		                    }  
		                });  
		            }  
		        }  
		    });  
		});  
	}
}