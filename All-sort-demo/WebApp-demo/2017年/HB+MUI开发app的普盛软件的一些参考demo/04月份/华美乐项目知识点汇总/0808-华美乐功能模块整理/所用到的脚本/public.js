
//  移动端元素 触摸 高亮交互 用
document.body.addEventListener('touchstart', function() {});

function openNew(url) {
	if(!mui.os.plus) {
		location.href = url;
		return;
	}
	if(plus.webview.getWebviewById(url)) {
		return;
	} else {
		var webview = plus.webview.create(url, url);
		webview.addEventListener("titleUpdate", function() {
			setTimeout(function() {
				webview.show("pop-in", 200);
			}, 10);
		});
	}
}

function alertMsg(msg, callback) {
	if(!mui.os.plus) {
		alert(msg);
		return;
	} else {
		plus.nativeUI.alert(msg, callback, "华美乐");
	}
}

function toast(msg) {
	if(!mui.os.plus) {
		alert("" + msg);
		return;
	} else {
		//plus.nativeUI.toast(msg);
		if(plus.os.name == "iOS") {
			// 弹出消息框  
			plus.nativeUI.toast(msg, {
				style: "inline",
				icon: "/images/kehu/head_small.png", // eg. "/img/add.png"  
				duration: "short", // 持续3.5s，short---2s  
				align: "center", // 水平居中  
				verticalAlign: "center" // 垂直底部  
			});
		} else {
			// 弹出消息框  
			plus.nativeUI.toast(msg, {
				style: "inline",
				icon: "/images/kehu/head.png", // eg. "/img/add.png"  
				duration: "short", // 持续3.5s，short---2s  
				align: "center", // 水平居中  
				verticalAlign: "center" // 垂直底部  
			});
		}

	}
}

function logJson(obj) {
	console.log(JSON.stringify(obj))
}

function log(str) {
	console.log(str)
}

function showloading(msg) {
	if(!mui.os.plus) {
		console.log("loading!!!!" + msg);
		return;
	} else {
		plus.nativeUI.showWaiting(msg);
	}
}

function closeloading() {
	if(!mui.os.plus) {
		console.log("closeloading!!!!");
		return;
	} else {
		plus.nativeUI.closeWaiting();
	}
}

function closeWait() {
	window.onload = function() {
		setTimeout(function() {
			$(".loader-shadow").css("display", "none");
		}, 0);
	}
}

function showWait() {
	window.onload = function() {
		setTimeout(function() {
			$(".loader-shadow").css("display", "block");
		}, 0);
	}
}

function showProgress() {
	$(".loader-shadow").css("display", "block");
}

function closeProgress() {
	$(".loader-shadow").css("display", "none");
}

function onError(xhr, textStatus, errorThrown) {
	closeProgress();
	log(textStatus + " " + logJson(errorThrown));
	alertMsg('网络请求错误！', null);
}

function isEmpty(str) {
	if(str == null || str == undefined || str == '') {
		return true;
	}
	return false;
}

function doget(url, data, successcallback, errcallback) {
	ajax(url, 'get', data, '', successcallback, errcallback);
}

function dopost(url, data, successcallback, errcallback) {
	ajax(url, 'post', data, "application/json", successcallback, errcallback);
}

function ajax(url, mothd, data, contentType, successcallback, errcallback) {
	url = getBaseServerUrl() + url;
	log('request:' + url + " " + JSON.stringify(data));
	mui.ajax(url, {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: mothd, //HTTP请求类型
		timeout: 20000, //超时时间设置为8秒；
		contentType: contentType,
		success: function(data, textStatus, xhr) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			log('success:' + url + " " + JSON.stringify(data));
			successcallback(data, url);
		},
		error: function(xhr, type, errorThrown) {
			console.log(type + ':' + url + ' ' + xhr.status)
			//异常处理；
			errcallback(xhr, url);
		}
	});
}

function getAuth(){
		var headParam = localStorage.headParam;
		console.log("鉴权信息：" + headParam);
		return headParam;
}

//document.addEventListener("plusready", function() {
//	// 监听点击消息事件
//	plus.push.addEventListener("click", function(msg) {
//		alert(1);//sss
//		alert(msg.payload);
//		if(isDefine(msg.payload)) {
//			alert(msg.payload);
//			var payload = JSON.parse(msg.payload);
//			alert(payload.type);
//			var url;
//			var state;
//			var fromActivity;
//			if(isDefine(payload.type) ){
//				switch(payload.type) {
//					case "10": //知会通知推送->消息里面的通知
//						url = "../xiaoxi/news-list.html";
//						openNew(url);
//						break;
//					case "20": //执行通知推送->消息里面的待处理任务
//						url = "../xiaoxi/daichuli.html";
//						state = 20;
//						fromActivity = "DCL";
//						localStorage.setItem('state',state);
//						localStorage.setItem('fromActivity',fromActivity);
//						mui.openWindow({
//								url: url,
//								id: url,
//								extras:{
//									state : state, //扩展参数
//									fromActivity: fromActivity,
//								},
//								show: {
//									autoShow: true,
//									aniShow: 'pop-in',
//									duration: 300
//								},
//								waiting: {
//									autoShow: false
//								}
//							});
//						break;
//					case "30": //聊天通知推送
//						break;
//					case "40": //通知公告推送->OA里面的通知公告
//						url = "../oa/tongzhi-gonggao.html";
//						openNew(url);
//						break;
//				}
//			}
//		}
//	}, false);
//	// 监听在线消息事件
//	plus.push.addEventListener("receive", function(msg) {
//		if(msg.aps) { // Apple APNS message
//			alert("接收到在线APNS消息：");
//		} else {
//			alert("接收到在线透传消息：");//sss
//		}
//		createLocalPushMsg(msg);
//	}, false);
//}, false);
//
////非标准格式的透传消息 receive
//function createLocalPushMsg(msg) {
//	alert(JSON.stringify(msg));//sss
//	var titleStr = msg.title;
//	var options = {
//		cover: false,
//		title: titleStr
//	};
//	msg.payload.msgType = "LocalMSG";
//	var payloadStr = msg.payload;
//	alert("sss"+payloadStr);
//
//	plus.push.createMessage(msg.content, payloadStr, options);
//	alert("创建本地消息成功！");//sss
//	alert("请到系统消息中心查看！");//sss
//	if(plus.os.name == "iOS") {
//		alert('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!');
//	}
//}
//
//function logoutPushMsg(msg) {
//	alert(JSON.stringify(msg));
//
//}



/*
* 适用于获取屏幕宽度等分设置html的font-size情况，比如 flexible.js库
*/
//计算最终html font-size

function modifileRootRem () {
    var root = window.document.documentElement;
    var fontSize = parseFloat(root.style.fontSize);
    var finalFontSize = parseFloat(window.getComputedStyle(root).getPropertyValue("font-size"));
    if(finalFontSize === fontSize) return;
    root.style.fontSize = fontSize+(fontSize-finalFontSize) + "px";
}
if(typeof window.onload === 'function'){
    var oldFun = window.onload;
    window.onload = function(){
        oldFun();
        modifileRootRem();
    }
}else{
    window.onload = modifileRootRem;
}