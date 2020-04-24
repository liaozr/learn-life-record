$(function(){
	
	//定义一个全局变量与数组检查所有验证是否都正确（都正确后进行页面跳转）
    var allTrue = true;
	var arrCheck = new Array(4);
	for(var i=0;i<4;i++){ 
		arrCheck[i] = false;
	}

	//验证手机号码
	var $phoneNum = $(".phoneNum input").eq(1);
	var account;
	function checkPhoneNum(){
		//去除空格
		clearSpace($phoneNum);
		account = $phoneNum.val();
		
		//请求json模拟判断用户是否已注册
		var hasAccount = false;
		var xhr = new XMLHttpRequest;
		xhr.onreadystatechange = function(){
			if(xhr.status == 200 && xhr.readyState == 4){
				var userArr = JSON.parse(xhr.responseText);
				//判断用户名是否存在
				userArr.forEach(function(item){
					if(item.phoneNum == account){
						hasAccount = true;
					}
				});
				var parrten = /^[1][358][0-9]{9}$/;
				//开始验证
				if(account == ''){
					arrCheck[0] = false;
					$phoneNum.css('border-color','red');
					$phoneNum.next().html("这是必填字段").css("opacity","0.8");
				}else if(!parrten.test(account)){
					arrCheck[0] = false;
					$phoneNum.css('border-color','red');
					$phoneNum.next().html("请正确填写您的手机号码").css("opacity","0.8");
				}else if(hasAccount){
					arrCheck[0] = false;
					$phoneNum.css('border-color','red');
					$phoneNum.next().html("该账号已存在").css("opacity","0.8");
				}else{
					arrCheck[0] = true;
					$phoneNum.next().html("").css("opacity","0");
					$phoneNum.css('border-color','greenyellow');
				}
				
			}
		}
		xhr.open('GET','../json/personInfo.json',true);
		xhr.send(null);
	}
	//失去焦点验证
	$phoneNum.on('blur',function(){
		checkPhoneNum();
	});
	
	//验证短信验证码
	var $megInfo = $(".megInfo input").eq(0);
	function checkMegInfo(){
		//去除空格
		clearSpace($megInfo);
		var meg = $megInfo.val();
		
		if(meg == ''){
			arrCheck[1] = false;
			$megInfo.css('border-color','red');
			$megInfo.next().html("这是必填字段").css("opacity","0.8");
		}else if(meg != '1234'){
			arrCheck[1] = false;
			$megInfo.css('border-color','red');
			$megInfo.next().html("验证码输入错误！").css("opacity","0.8");
		}else{
			arrCheck[1] = true;
			$megInfo.next().html('').css('opacity',"0");
			$megInfo.css('border-color','greenyellow');
		}
	}
	//失去焦点验证
	$megInfo.on('blur',function(){
		checkMegInfo();
	});
	
	//验证密码
	var $checkPsd = $(".inputPsd input");
	var psd;
	function checkPsd(){
		//去除空格
		clearSpace($checkPsd);
		psd = $checkPsd.val();
		
		//密码验证正则表达式
		var parrten = /^[0-9a-zA-Z_#]{6,16}$/;
		
		if(psd == ''){
			arrCheck[2] = false;
			$checkPsd.css('border-color','red');
			$checkPsd.next().html("这是必填字段").css('opacity','0.8');
		}else if(!parrten.test(psd)){
			arrCheck[2] = false;
			$checkPsd.css('border-color','red');
			$checkPsd.next().html("密码格式不正确！").css('opacity','0.8');
		}else{
			arrCheck[2] = true;
			$checkPsd.next().html("").css('opacity','0');
			$checkPsd.css('border-color','greenyellow')
		}
	}
	//失去焦点验证密码
	$checkPsd.on('blur',function(){
		checkPsd();
	});
	
	
	//确认密码
	var $askPsd = $(".checkPsd input");
	function askPsd(){
		//去除空格
		clearSpace($askPsd);
		var _psd = $askPsd.val();
		
		if(_psd == ''){
			arrCheck[3] = false;
			$askPsd.css('border-color','red');
			$askPsd.next().html("这是必填字段").css('opacity','0.8');
		}else if(_psd != psd){
			arrCheck[3] = false;
			$askPsd.css('border-color','red');
			$askPsd.next().html("确认密码失败").css('opacity','0.8');
		}else if(_psd == psd){
			arrCheck[3] = true;
			$askPsd.next().html("").css('opacity','0');
			$askPsd.css('border-color','greenyellow')
		}else{
			arrCheck[3] = false;
			$askPsd.css('border-color','red');
			$askPsd.next().html("输入格式有误").css('opacity','0.8');
		}
	}
	//失去焦点确认密码
	$askPsd.on('blur',function(){
		askPsd();
	});
	
	//判断推荐人账号
	var $recommend = $(".PhoneNum input").eq(1);
	function checkRecommend(){
		//去除空格
		clearSpace($recommend);
		var _account = $recommend.val();
		
		//请求json模拟判断用户是否已注册
		var hasAccount = false;
		var xhr = new XMLHttpRequest;
		xhr.onreadystatechange = function(){
			if(xhr.status == 200 && xhr.readyState == 4){
				var userArr = JSON.parse(xhr.responseText);
				//判断用户名是否存在
				userArr.forEach(function(item){
					if(item.phoneNum == _account){
						hasAccount = true;
					}
				});
				var parrten = /^[1][358][0-9]{9}$/;
				//开始验证
				if(!parrten.test(_account)){
					$recommend.next().html("请正确填写推荐人手机号码").css("opacity","0.8");
				}else if(!hasAccount){
					$recommend.next().html("该账号不存在").css("opacity","0.8");
				}else{
					$recommend.next().html("").css("opacity","0");
					$recommend.css('border-color','greenyellow');
				}
				
			}
		}
		xhr.open('GET','../json/personInfo.json',true);
		xhr.send(null);
	}
	//失去焦点验证
	$recommend.on('blur',function(){
		checkRecommend();
	});

	//点击提示信息隐藏
	$(".layout-center span").singleTap(function(){
		$(this).html('').css('opacity','0');
	})
	
	
	
	
	//点击提交验证所有信息，都正确才能提交信息
	$("form").submit(function(){
		if(arrCheck[0] == false){//手机号
        	checkPhoneNum();
        	allTrue = false;
        }else{
        	allTrue = true;
        }
         if(arrCheck[1] == false){//短信验证码
        	checkMegInfo();
        	allTrue = false;
        }else{
        	allTrue = true;
        }
    	if(arrCheck[2] == false){//密码
        	allTrue = false;
		    checkPsd();
     	}else{
    		allTrue = true;
    	}
     	if(arrCheck[3] == false){//确认密码
        	allTrue = false;
			askPsd();
     	}else{
     		allTrue = true;
     	}
     	
     	//如果有一个以上不正确则阻止提交跳转，否则保存注册信息
    	if(allTrue == false){
    		return false;
    	}else{//全部正确之后执行
    		//保存手机账号，密码到本地存储
    		var arr = [{phoneNum:account,passWord:psd}] ;
    		localStorage.setItem("oyaUser",JSON.stringify(arr));
    		
    	}
	});
	
	
	//封装去除输入框空格的函数
	function clearSpace(ele){
		ele.val(ele.val().replace(/ /g,""));
	}
});