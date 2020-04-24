
//获取添加到本地存储的商品id
var goodsInfo = localStorage.getItem('arr');
var goodsArr = [],commitOrderArr = [];
if(goodsInfo != null){
	goodsArr = JSON.parse(goodsInfo)
}


//使用ajax技术请求json文件生成购物车商品列表

var $ul = $(".cartList ul");
var xhr = new XMLHttpRequest;
xhr.onreadystatechange = function(){
	if(xhr.status == 200 && xhr.readyState == 4){
		var res = JSON.parse(xhr.responseText);
		//外层遍历数组
		goodsArr.forEach(function(item,idx){
			var $li = $("<li></li>");
			var $div1 = $("<div class='goodsImg'></div>");
			var $div2 = $("<div class='goodsText'></div>");
			var $div3 = $("<div class='goodsNum' data-id='"+ item.id +"'></div>");
			//内层遍历服务器返回的数据
			for(var i=0; i<res.length; i++){
				if(res[i].id == item.id){
					//生成勾选按钮与商品图片
					$div1.append('<span class="iconfont yuanquan"></span>');
					$div1.append("<img src='"+ res[i].url +"' />");
					//生成商品文字信息
					$div2.append("<h3>"+ res[i].name +"</h3>");
					$div2.append("<p data-price='"+ res[i].price +"'>￥"+ res[i].price +"</p>");
					//生成加减删除按钮
					$div3.append("<span>-</span>");
					$div3.append("<span>"+ item.count +"</span>");
					$div3.append("<span>+</span>");
					$div3.append("<span class='iconfont icon-delete'></span>");
				}
			}
			$li.append($div1);
			$li.append($div2);
			$li.append($div3);
			$li.appendTo($ul);
		});
	}
}
xhr.open("GET","../json/goods.json",true);
xhr.send(null);



setTimeout(function(){
		//获取元素节点
		var $chooseAll = $(".chooseAll span");
		var $submitBtn = $(".submitBtn");
		var $goodsImg = $(".goodsImg");
		var $goodsNum = $(".goodsNum");
		
		//点击单个商品的勾选按钮，计算总价
		var allChoose = 0;
		$goodsImg.find('span').click(function(){
			if($(this).is('.yuanquan')){
				allChoose++;
				$(this).removeClass('yuanquan').addClass('icon-jichuceshishihoudegougou');
			}else{
				allChoose--;
				$(this).addClass('yuanquan').removeClass('icon-jichuceshishihoudegougou');
			}
	   		totalPrice();
	   		if(allChoose == $goodsImg.length){
	   			$chooseAll.removeClass('yuanquan').addClass('icon-jichuceshishihoudegougou');
	   		}else{
	   			$chooseAll.addClass('yuanquan').removeClass('icon-jichuceshishihoudegougou');
	   		}
		});
		//点击全选按钮
		$chooseAll.on('tap',function(){
			if($(this).is('.yuanquan')){
				allChoose = $goodsImg.length;
				$(this).removeClass('yuanquan').addClass('icon-jichuceshishihoudegougou');
				$goodsImg.find('span').removeClass('yuanquan').addClass('icon-jichuceshishihoudegougou');
				totalPrice();
			}else{
				allChoose = 0;
				$(this).addClass('yuanquan').removeClass('icon-jichuceshishihoudegougou');
				$goodsImg.find('span').addClass('yuanquan').removeClass('icon-jichuceshishihoudegougou');
				totalPrice();
			}
		});
				
		
		//点击加减按钮，增减数量与总价
		$goodsNum.find('span').on('tap',function(){
			var thisNum = 0;
			//减号
			if($(this).html()== "-"){
				thisNum = parseInt($(this).next().html());
				if(thisNum > 1){
					thisNum--;
					$(this).css('color','black');
				}else{
					$(this).css('color','darkgray');
				}
				$(this).next().html(thisNum);
				totalPrice();
				changeArr($(this).parent().attr('data-id'),String(thisNum));
			}
			//加号
			if($(this).html()=="+"){
				thisNum = parseInt($(this).prev().html());
				if(thisNum <= 100){
					thisNum++;
					$(this).css('color','black');
				}else{
					$(this).css('color','darkgray');
				}
				$(this).prev().html(thisNum);
				totalPrice();
				changeArr($(this).parent().attr('data-id'),String(thisNum));
			}
			//删除
			if($(this).hasClass('icon-delete')){
				changeArr($(this).parent().attr('data-id'),0);
				$(this).parent().parent().remove();
				totalPrice();
			}
			
		});
		
		//点击去结算按钮保存数据并跳转
		$(".submitBtn").on('tap',function(){
			$(".goodsImg").each(function(idx,item){
				var $span = $(this).find('span');
				if($span.is('.icon-jichuceshishihoudegougou')){
					var obj = {},isObj = false;
					obj.id = $(this).parent().find('.goodsNum').attr('data-id');
					obj.count = $(this).parent().find('.goodsNum').children('span').eq(1).html();
					commitOrderArr.forEach(function(item){
						if(obj.id == item.id){
							item.count = obj.count;
							isObj = true;
						}
					});
					if(!isObj){
						commitOrderArr.push(obj);
					}
				}
			});
			if($(this).html() == "请选择商品"){
				$(".commitInfo").css({
					"opacity":"1",
					"margin-left":"-30vw",
					"width":"60vw"
				});
			}else{
				commitOrderArr.forEach(function(item,idx){
					changeArr(item.id,0);
				});
				localStorage.setItem('commitOrder',JSON.stringify(commitOrderArr));
				location.href = "my_list.html";
			}
			
		});
		
		//点击弹窗确定按钮清除
		$(".commitInfo span").on('tap',function(){
			$(this).parent().css({
					"opacity":"0",
					"margin-left":"0vw",
					"width":"0vw"
				});
		});
		
		
		//封装改变本地存储arr的函数
		function changeArr(goodsId,num){
			goodsArr.forEach(function(item,idx){
				if(item.id == goodsId){
					item.count = num;
					if(item.count == 0){
						goodsArr.splice(idx,1);
					}
				}
			});
			localStorage.setItem("arr",JSON.stringify(goodsArr));
		}
		
		
		
		//封装遍历商品列表的函数，计算已勾选的商品总价
		function totalPrice(){
			var total = 0;
			$(".goodsImg").each(function(idx,item){
				var $span = $(this).find('span');
				if($span.is('.icon-jichuceshishihoudegougou')){
					var price = $(this).parent().find('.goodsText').find('p').attr('data-price');
					price = parseInt(price);
					var num = $(this).parent().find('.goodsNum').find('span').eq(1).html();
					num = parseInt(num);
					total += price*num;
				}
				
			});
			if(total == 0){
				$submitBtn.html("请选择商品");
			}else{
				$submitBtn.html("去结算(￥"+total+")");
			}
		}
	
	},500);



