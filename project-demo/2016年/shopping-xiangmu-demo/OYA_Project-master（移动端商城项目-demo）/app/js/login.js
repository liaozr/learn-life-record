
//定义一个全局变量与数组检查所有验证是否都正确（都正确后进行页面跳转）
var allTrue = true;
var arrCheck = new Array(2);
for(var i=0;i<2;i++){ 
	arrCheck[i] = false;
}

var $phoneNum = $(".phoneNum input").eq(1);
var account;
var $checkPsd = $(".psd input");
var psd,_psd;

//获取本地存储上的用户信息
var userInfo = localStorage.getItem('oyaUser');
if(userInfo != null){
	userInfo = JSON.parse(userInfo);
	$phoneNum.val(userInfo[0].phoneNum);
}


//验证手机号码

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
					_psd = item.psd;
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
			}else if(userInfo != null){
				if(account == userInfo[0].phoneNum){
					arrCheck[0] = true;
					$phoneNum.next().html("").css("opacity","0");
					$phoneNum.css('border-color','greenyellow');	
				}else if(!hasAccount){
					arrCheck[0] = false;
					$phoneNum.css('border-color','red');
					$phoneNum.next().html("该账号不存在").css("opacity","0.8");
				}else if(hasAccount){
					arrCheck[0] = true;
					$phoneNum.next().html("").css("opacity","0");
					$phoneNum.css('border-color','greenyellow');
				}
			}else if(!hasAccount){
				arrCheck[0] = false;
				$phoneNum.css('border-color','red');
				$phoneNum.next().html("该账号不存在").css("opacity","0.8");
			}else if(hasAccount){
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

//验证密码
function checkPsd(){
	//去除空格
	clearSpace($checkPsd);
	psd = $checkPsd.val();
	
	
	if(psd == ''){
		arrCheck[1] = false;
		$checkPsd.css('border-color','red');
		$checkPsd.next().html("这是必填字段").css('opacity','0.8');
	}else if(userInfo != null){
		if($phoneNum.val() == userInfo[0].phoneNum){
			if(psd == userInfo[0].passWord){
				arrCheck[1] = true;
				$checkPsd.next().html("").css('opacity','0');
				$checkPsd.css('border-color','greenyellow');
			}else{
				arrCheck[1] = false;
				$checkPsd.css('border-color','red');
				$checkPsd.next().html("密码不正确！").css('opacity','0.8');
			}
		}
	}else{
		if(psd == _psd){
			arrCheck[1] = true;
			$checkPsd.next().html("").css('opacity','0');
			$checkPsd.css('border-color','greenyellow');
		}else{
			arrCheck[1] = false;
			$checkPsd.css('border-color','red');
			$checkPsd.next().html("密码不正确！").css('opacity','0.8');
		}
	}
}
//失去焦点验证密码
$checkPsd.on('blur',function(){
	checkPsd();
});

//点击提示信息隐藏
$(".layout-center span").singleTap(function(){
	$(this).html('').css('opacity','0');
})

//点击登录按钮，验证是否正确，正确便跳转
$("form").submit(function(){
    var _href = localStorage.getItem('oyaUrl');
	$(this).prop('action',_href);
	
	if(arrCheck[0] == false){//手机号
    	checkPhoneNum();
    	allTrue = false;
    }else{
    	allTrue = true;
    }
     if(arrCheck[1] == false){//密码
    	checkPsd();
    	allTrue = false;
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
		var _href = localStorage.getItem('oyaUrl');
		location.href = _href;
	}
});

//封装去除输入框空格的函数
	function clearSpace(ele){
		ele.val(ele.val().replace(/ /g,""));
	}
