;$(document).ready(function(){

	//返回顶部
	var $dom = $('.scrollTop');
	$(document).scroll(function(){
		var $topHeight = $(this).scrollTop(); //document滚动了的高度
		if($topHeight >= 300){
			$dom.show();
		}else{
			$dom.hide();
		}

	});
	$dom.on('click singleTap',function(){
		$('html,body').animate({'scrollTop':0},300);
	});
	
	//头部导航栏显示/隐藏
	$(".header-nav span").singleTap(function(){
		var $ul = $(".header-nav ul");
			if($ul.css('opacity') == 0){
				$(".header-nav ul").css({'height':'230px','opacity':1});
			}else{
				$(".header-nav ul").css({'height':'0px','opacity':0});
			}
	});

});