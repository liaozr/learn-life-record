document.addEventListener("DOMContentLoaded",function(){
	var $table = $(".goodnews");
	var $container = $(".container");
	$.getJSON("../json/goods.json",function(res){
					var $tr;
					var i = 1;
					$.each(res, function(idx,item) {
//默认加载第一页数据
					 if(item.pageNo==i){
						if(idx%3==0){
						 	$tr = $("<tr/>");
						 }
						var $td = $("<td/>");
						var $a = $("<a/>");
						$a.attr({href:"list.html?"+item.id})
						var $img = $("<img/>");
						var $span = $("<span/>");
						$img.attr({src:item.url}).appendTo($a);
						$span.html(item.brandname).appendTo($a);
						$a.appendTo($td);						 
						$td.appendTo($tr);
					    if(idx%3==0){
					    	$tr.appendTo($table);
					    }
					 }
					});
//滚轮滑动加载第二页数据				
					$(window).scroll(function(){
						var scrollTop = $(window).scrollTop();
						if(scrollTop >= $container.height() - $(window).height()+40){
							 i++;
							 $.each(res, function(idx,item) {
							 if(item.pageNo==i){
//每行三个数据，取满创建新行								
								if(idx%3==0){
								 	$tr = $("<tr/>");
								 }
//每个数据占据一个列								
								var $td = $("<td/>");
								var $a = $("<a/>");
								$a.attr({href:"list.html?"+item.id});
								var $img = $("<img/>");
								var $span = $("<span/>");
								$img.attr({src:item.url}).appendTo($a);
								$span.html(item.brandname).appendTo($a);
								$a.appendTo($td);						 
								$td.appendTo($tr);
//每行取满三个数据加入table							    
							    if(idx%3==0){
							    	$tr.appendTo($table);
							    }
							 }
							});
						}	
					})
					
			});
			
	$(".content li").on("tap",function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		console.log(1);
	})
})