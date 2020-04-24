$(function(){
	$.fn.anim = function (x,loop) {
		if(loop==0){loop=" animloop";}else{loop="";}
		return $(this).removeClass(x + ' animated' + loop).css("opacity",1).addClass(x + ' animated' + loop).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			loop==""&&$(this).removeClass(x + ' animated');
		});
	};
});

var index = {};
index.home = (function() {
	var mySwiper = new Swiper('.swiper-container', {
		progress: true,
		mode: 'vertical',
		loop: true, 
		onProgressChange: function(swiper) {
			
			for (var i = 0; i < swiper.slides.length; i++) {
				var slide = swiper.slides[i];
				var progress = slide.progress; //slide层级顺序（当前显示slide的progress值为0， 上层的+1，下层的-1，如上一层pro值为1，上上层为2）
				var scale,
				translate,
				opacity;
				if (progress <= 0) { //当前层和下层slide
					opacity = 1 - Math.min(Math.abs(progress), 1);
					scale = 1 - Math.min(Math.abs(progress / 2), 1);
					translate = progress * swiper.width;
				}
				 else { //上层slide
					opacity = 1 - Math.min(Math.abs(progress / 2), 1);
					scale = 1;
					translate = 0;
				}
				
				slide.style.opacity = opacity;
				swiper.setTransform(slide, 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')');
			}
		},
		onTouchStart: function(swiper) {
			for (var i = 0; i < swiper.slides.length; i++) {
				swiper.setTransition(swiper.slides[i], 0);
			}
		},
		onSetWrapperTransition: function(swiper, speed) {
			for (var i = 0; i < swiper.slides.length; i++) {
				swiper.setTransition(swiper.slides[i], speed);
			}
		}
	})
	 for (var i = 0; i < mySwiper.slides.length; i++) {
		mySwiper.slides[i].style.zIndex = mySwiper.slides.length - i;
	}
	//初始化第一屏的动画
	function gotoStage() {
		var $img=$('.gray1').find('.setImg');
		window.setTimeout(function(){
			$img.eq(0).anim("fadeIn");
		},100);
		window.setTimeout(function(){
			$img.eq(1).anim("bounceInDown");
		},150);
		window.setTimeout(function(){
			$img.eq(2).anim("bounceInRight");
		},150);
		window.setTimeout(function(){
			$img.eq(3).anim("bounceInLeft");
		},150);
		window.setTimeout(function(){
			$img.eq(4).anim("slideInUp");
		},700);
		window.setTimeout(function(){
			$img.eq(5).anim("slideInUp");
		},1200);
		
		
		
	}
	function clearStyle(i) {
		var element = $("#swiper-container").find(".swiper-slide").eq(i).find(".setImg");
		element.css("opacity",0);
		var obj = $("#swiper-container");
		obj.find(".setImg").each(function() {
			var reLeng = $(this)[0].classList.length;
			var reClass = $(this)[0].classList[reLeng - 1];
			if (reClass != 'setImg' && reClass != 'layer') {
				$(this).removeClass(reClass);
			}
		});
		var gary = obj.find(".gray").eq(i);
		var garyClass = gary[0].classList[1];
		if (garyClass == "gray1") {
			
			window.setTimeout(function(){
				$(element).eq(0).anim("fadeIn");
			},100);
			window.setTimeout(function(){
				$(element).eq(1).anim("bounceInDown");
			},150);
			window.setTimeout(function(){
				$(element).eq(2).anim("bounceInRight");
			},150);
			window.setTimeout(function(){
				$(element).eq(3).anim("bounceInLeft");
			},150);
			window.setTimeout(function(){
				$(element).eq(4).anim("slideInUp");
			},700);
			window.setTimeout(function(){
				$(element).eq(5).anim("slideInUp");
			},1200);
			
		}
		if (garyClass == "gray2") {
			window.setTimeout(function(){
				$(element).eq(0).anim("bounceInRight");
			},150);
			window.setTimeout(function(){
				$(element).eq(1).anim("bounceInLeft");
			},150);
			window.setTimeout(function(){
				$(element).eq(2).anim("fadeIn");
			},800);
			window.setTimeout(function(){
				$(element).eq(3).anim("fadeIn");
			},2000);
			window.setTimeout(function(){
				$(element).eq(4).anim("fadeIn");
			},4500);
			
		}
		if (garyClass == "gray3") {
			window.setTimeout(function(){
				$(element).eq(0).anim("bounceInRight");
			},150);
			window.setTimeout(function(){
				$(element).eq(1).anim("bounceInLeft");
			},150);
			window.setTimeout(function(){
				$(element).eq(2).anim("fadeIn");
			},1200);
			window.setTimeout(function(){
				$(element).eq(3).anim("fadeIn");
			},2200);
			window.setTimeout(function(){
				$(element).eq(4).anim("fadeIn");
			},5000);
			window.setTimeout(function(){
				$(element).eq(5).anim("zoomInDown");
			},6500);
			window.setTimeout(function(){
				$(element).eq(6).anim("fadeIn");
			},7000);
			
		}
		if (garyClass == "gray4") {
			window.setTimeout(function(){
				$(element).eq(0).anim("slideInDown");
			},100);
			window.setTimeout(function(){
				$(element).eq(1).anim("slideInDown");
			},300);
			window.setTimeout(function(){
				$(element).eq(2).anim("slideInUp");
			},500);
			window.setTimeout(function(){
				$(element).eq(3).anim("slideInUp");
			},700);
			
		}
		if (garyClass == "gray5") {
			window.setTimeout(function(){
				$(element).eq(0).anim("slideInDown");
			},200);
			window.setTimeout(function(){
				$(element).eq(1).anim("slideInDown");
			},100);
			window.setTimeout(function(){
				$(element).eq(2).anim("slideInUp");
			},300);
			window.setTimeout(function(){
				$(element).eq(3).anim("slideInUp");
			},600);
			window.setTimeout(function(){
				$(element).eq(4).anim("slideInUp");
			},900);
			window.setTimeout(function(){
				$(element).eq(5).anim("slideInUp");
			},1200);
		}
		
		if (garyClass == "gray6") {
			window.setTimeout(function(){
				$(element).eq(0).anim("slideInDown");
			},50);
			window.setTimeout(function(){
				$(element).eq(1).anim("slideInDown");
			},50);
			window.setTimeout(function(){
				$(element).eq(2).anim("slideInUp");
			},300);
			window.setTimeout(function(){
				$(element).eq(3).anim("slideInUp");
			},400);
			window.setTimeout(function(){
				$(element).eq(4).anim("slideInUp");
			},600);
			window.setTimeout(function(){
				$(element).eq(5).anim("slideInUp");
			},700);
		}
		
		
		if (garyClass == "gray7") {
			window.setTimeout(function(){
				$(element).eq(0).anim("bounceInRight");
			},150);
			window.setTimeout(function(){
				$(element).eq(1).anim("bounceInLeft");
			},150);
			window.setTimeout(function(){
				$(element).eq(2).anim("fadeIn");
			},800);
			window.setTimeout(function(){
				$(element).eq(3).anim("zoomInDown");
			},2000);
			window.setTimeout(function(){
				$(element).eq(4).anim("fadeIn");
			},2800);
			window.setTimeout(function(){
				$(element).eq(5).anim("zoomInDown");
			},4500);
		}
		if (garyClass == "gray8") {
			window.setTimeout(function(){
				$(element).eq(0).anim("fadeIn");
			},400);
			window.setTimeout(function(){
				$(element).eq(1).anim("slideInDown");
			},100);
			window.setTimeout(function(){
				$(element).eq(2).anim("slideInDown");
			},50);
			window.setTimeout(function(){
				$(element).eq(3).anim("bounceIn");
			},1000);
			window.setTimeout(function(){
				$(element).eq(4).anim("slideInUp");
			},100);
		}
		
	}
	mySwiper.addCallback('SlideChangeStart',function(swiper) {
		clearStyle(swiper.activeIndex);
	})
	return {
		init: function() {
			$("#westarsloading").remove();
			gotoStage();
		}
	}
})();
 window.onload = function() {
	index.home.init();
};