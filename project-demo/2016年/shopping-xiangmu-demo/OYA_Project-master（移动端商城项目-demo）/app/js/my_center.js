;document.addEventListener("DOMContentLoaded",function(){
	
	//获取用户帐号显示的地方
	var usename = document.querySelector(".usename");
	
	//获取在本地保存的用户帐号
	var arr = JSON.parse(localStorage.getItem("oyaUser"));

	//将用户帐号显示在页面
	usename.innerHTML = arr[0].phoneNum;
				
});