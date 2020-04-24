    (function(){
        function o(e) {
            return document.querySelector(e)
        }
        var formBlock = o('#formBlock');
        var resultBlock = o('#resultBlock');
        var submitBtn = o("#baoming");
		var submitTimer;
        submitBtn.addEventListener('click',function(){
                var keys = ["user_name","user_tel"];
                var tips = ["\u8bf7\u586b\u5199\u60a8\u7684\u59d3\u540d","\u8bf7\u586b\u5199\u60a8\u7684\u7535\u8bdd","\u8bf7\u586b\u5199\u60a8\u7684\u6240\u5728\u516c\u53f8"];
                var params = {"c":"public","a":"ajaxDahuiBaoming"};
                var partten = /^1[3,5,8,7]{1}[\d]{9}$/;
                for(var i=0;i<keys.length;i++){
                    var input = o("#"+keys[i]);
                    var value = input.value;
                    if(!value){
                        alert(tips[i]);
                        input.focus();
                        return false;
                    }
                    if(i===1){
                        if(!partten.test(value)){
                            alert('\u7535\u8bdd\u683c\u5f0f\u4e0d\u6b63\u786e');
                            input.focus();
                            return false;
                        }
                    }
                    params[keys[i]] = value;
                    
                }
            	var checks = check();
                if(!checks){
                	return false;
                }
                loading();
                tjs();
				submitTimer = setTimeout(function(){submitTimer=null;onFailure();showres()},1);
        },false);
		
        //吕定国添加
		function tjs(){
			
			var urls = "/h5/bm.php";
			var user_name = $("#user_name").val();
			var user_tel = $("#user_tel").val();
			var qudao = $("#qudao").val();
			var ClassRoomID = $("#ClassRoomID").val();
			var Promoterid = $("#Promoterid").val();
			var PromoterName = $("#PromoterName").val();
			var utm_term = $("#utm_term").val();
			var city = $("#cityid").val();
			
			$.ajax({
				type: "post",
				url: urls,
				async:false,
				data: 
				{
					ClassRoomID:ClassRoomID,
					user_name:user_name,
					user_tel:user_tel,
					Promoterid:Promoterid,
					city:city,
					utm_term:utm_term,
					PromoterName:PromoterName,
					qudao:qudao
				},
				dataType: "html",
				success: function(data){
				//alert(data.state);
					//	alert(data.msg);
					//if(data == 1){
						//alert('恭喜您！报名成功！');
					//}
				}
			});
		}
		function check(){
			var url = "/h5/check.php";
			var phone = $("#user_tel").val();
			var ClassRoomID = $("#ClassRoomID").val();
			var res = true;
			$.ajax({
	             type: "POST",
	             url: url,
	             data: {phone:phone, ClassRoomID:ClassRoomID},
	             async:false,
	             dataType: "html",
	             success: function(data){
						if(data == 1){
							res = false;
							alert('此号码已报名！');
						}else{
							res = true;
						}
	                 }
	         });
			return res;
		}
        function showres(){
			$("#fximg").show();	
			//$("#fximg").attr('src','statics/images/tc.png');
			//$(".page10").css('background','url(statics/images/p10-04.jpg) center center no-repeat');
     		//$(".page10").css('background-size','cover');
			//$("#bmk").hide();
			//$("#bmm").show();
			//$(".reg").hide();
			

        }
        //吕定国添加end
        function onComplete(xhr){
            var data = eval("("+xhr.responseText+")");
            if(data.status === 1){
                setting(data.msg);
            }else{
                onFailure(data.msg);
            }

        }
        function onFailure(msg){
            resultBlock.innerHTML =msg?msg: '\u63d0\u4ea4\u5931\u8d25\u002c\u8bf7\u7a0d\u540e\u518d\u8bd5';
            resultBlock.style.display = 'block';
            formBlock.style.display = 'block';
            submitBtn.style.display = 'block';
            setTimeout(function(){
                resultBlock.style.display = 'none';
            },1)
        }
        function loading(){
            setting('\u6b63\u5728\u63d0\u4ea4\u4e2d');
        }
        function setting(text){
            resultBlock.innerHTML = text;
            resultBlock.style.display = 'block';
            formBlock.style.display = 'none';
            submitBtn.style.display = 'none';
        }
        window.BaoMing = function(status,msg){
			if(submitTimer){
				clearTimeout(submitTimer);
				submitTimer=null;
				if(status === 1){
					setting(msg);
					window.swipeUp(5);
				}else{
					onFailure(msg);
				}
			}
        };
    })();
	
function setColor(_parent, _child) {
	for (var i=0; i<_parent.options.length; i++) {
		//遍历所有选项
		if (_parent.options[i] == _child) {
			_parent.style.color = '#000';                 
			//_parent.style.backgroundColor = 'blue';         
		} else {
			_parent.options[i].style.color = '';                       
			_parent.options[i].style.backgroundColor = '';
		}
	}
	document.body.focus();   //窗体获得焦点
}