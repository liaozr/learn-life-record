$(function(){
	//获取本地存储
		var commitOrder = localStorage.getItem('commitOrder');
		commitOrder = commitOrder ? JSON.parse(commitOrder):[];
		var $content = $("body").children("section");
//json取数据		
		$.getJSON("../json/goods.json",function(res){
//遍历json数据			
			$.each(res,function(idx,goods){
//遍历localstorage数据				
				$.each(commitOrder,function(idx,item){
//取本地数据ID对比JSON数据ID
					if(item.id==goods.id){
//每一个商品创建一个list2						 
						 var $myList2 = $("<div/>");
//店铺名称和交易信息						 
						 var $myListbanner = $("<div/>");
//图片和名字信息存放myListmid						 
						 var $myListmid = $("<div/>");
						 $myList2.addClass("my_list2");
						 $myListbanner.addClass("my_list-banner");
						 $("<div/>").addClass("fL").html("店铺"+(idx+1)).appendTo($myListbanner);
						 $("<span/>").addClass("fR").html("交易成功").appendTo($myListbanner);
						 $myListbanner.appendTo($myList2);
						 $myListmid.addClass("my_list-middle");
						 var $imgDiv = $("<div/>");
						 $imgDiv.addClass("fL");
						 $("<img/>").attr("src",goods.url).appendTo($imgDiv);
						 $imgDiv.appendTo($myListmid);
						 var $message = $("<div/>");
						 $message.addClass("fL");
						 $("<div/>").html(goods.name).appendTo($message);
						 var $priceCount = $("<div/>");
						 $("<span/>").html("￥"+goods.price).addClass("fL").appendTo($priceCount);
						 $("<div/>").html("x"+item.count).addClass("fR").appendTo($priceCount);
						 $priceCount.appendTo($message);
						 $message.appendTo($myListmid);
						 $myListmid.appendTo($myList2);
//合计						 
						 var $totalDiv = $("<div/>");
						 $totalDiv.addClass("my_list-banner");
						 var $goodsTotal = $("<div/>");
						 $goodsTotal.addClass("fR").html("共<i>"+item.count+"</i>商品，合计：￥<i>"+goods.price*item.count+"</i>").appendTo($totalDiv);
						 $totalDiv.appendTo($myList2);
//添加按钮						 
						 var $myListbottom = $("<div/>");
						 $myListbottom.addClass("fR my_list-bottom");
						 $("<button/>").html("付款").appendTo($myListbottom);
						 $("<button/>").attr("id",item.id).addClass("del").html("删除订单").appendTo($myListbottom);
						 $("<button/>").html("查看物流").appendTo($myListbottom);
						 $myListbottom.appendTo($myList2);
						 $myList2.appendTo($content);
					}
				});
			});
		});
//给删除按钮添加点击事件		
		 $("section").on("tap",".del",function(){
//取出删除按钮绑定的ID
			 var No = $(this).attr("id");
		 	 $.each(commitOrder,function(idx,item){
		 	 	if(item.id==No){
//删除指定订单信息存入localstorage		 	 		
		 	 		commitOrder.splice(idx,1);
		 	 		localStorage.setItem('commitOrder',JSON.stringify(commitOrder));
		 	 	}
		 	 });
		 	 $(this).parent().parent().remove();
		 })	
})
