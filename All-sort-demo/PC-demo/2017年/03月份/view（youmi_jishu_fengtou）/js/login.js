//判断是否登录
        var haslogin;
        if(sessionStorage.haslogin == undefined || sessionStorage.haslogin == ""){
        	haslogin = false;
        }else{
        	haslogin = true;
        }
		var mobile=sessionStorage.mobile;
		var vmLogin = new Vue({
			el: '#top',
			data: {
				haslogin:haslogin,
			},
		});
		//导航事件
		$("#head").mouseenter(function() {
			$(".downList").fadeIn(300);
		});
		$(".downList").mouseleave(function() {
			$('.downList').fadeOut(300);
		});
		
		$("#head").click(function(){
			window.location.href = "personal.html";
		});
		
		$("#goPA").click(function(){
			window.location.href = "projectApplication.html";
		});
		
		//hover菜单事件
		$("#makeCop").click(function() {
			window.location.href="projectApplication.html"
		});
		
		$("#gomyCop").click(function() {
			sessionStorage.selectTab = ".companyBox"
			window.location.href="personal.html"
		});
		
		$("#assess").click(function() {
			window.location.href="selectFun.html"
		});
		
		$("#mypaper").click(function() {
			sessionStorage.selectTab =".price"
			window.location.href="personal.html"
		});
		//获取用户姓名
		if(sessionStorage.userInfo != undefined && sessionStorage.userInfo != ""){
			var titleUname=$.parseJSON(sessionStorage.userInfo).name;
		    $("#unameTitle").text("Hello，"+titleUname);
		}
		
		$("#exit").click(function() {
			sessionStorage.mobile="";
			sessionStorage.haslogin="";
			sessionStorage.userInfo  = "";
			window.location.href = "index.html";
		});
		
		if(sessionStorage.userInfo == undefined || sessionStorage.userInfo == ""){
	    	$("#userTips").text("请登录");
	    }else
	    {
	    	$("#userTips").text("您好，"+JSON.parse(sessionStorage.userInfo).name);
	    }