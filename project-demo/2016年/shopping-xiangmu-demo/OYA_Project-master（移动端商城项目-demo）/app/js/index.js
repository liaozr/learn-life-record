$(function(){
	//懒加载图片
	$("img.lazy").lazyload({effect: "fadeIn"});
	var mySwiper = new Swiper ('.banner', {
	   	autoplay: 1000,
	    loop: true,
	    // 如果需要分页器
	    pagination: '.banner-page'
	})

	//返回顶部
	var $dom = $('.scrollTop');
	$(document).scroll(function(){
		var $topHeight = $(this).scrollTop(); //document滚动了的高度
		if($topHeight >=300){
			$dom.show();
		}else{
			$dom.hide();
		}

	})
	$dom.on('singleTap',function(){
		$('html,body').animate({'scrollTop':0},300);
	})

	// 搜索点击事件
	$('#search').on('singleTap',function(){
		if($(this).prop('class') == 'glyphicon glyphicon-search'){
			$(this).prop('class','glyphicon glyphicon-remove');
			$('.auto-hide').show();
			$('.auto-show').hide();
			$('header .col-xs-8 div:nth-child(2)').text('商品搜索');
		}else{
			$(this).prop('class','glyphicon glyphicon-search');
			$('.auto-hide').hide();
			$('.auto-show').show();
			$('header .col-xs-8 div:nth-child(2)').text('OYA商城');
		}
		event.preventDefault();
	})
	//点击所有图片进入商品分类
	var $a = $('img').parents().find('a');
	$a.map(function(index,item){
		item.href = 'html/goodlist.html';
	})
})