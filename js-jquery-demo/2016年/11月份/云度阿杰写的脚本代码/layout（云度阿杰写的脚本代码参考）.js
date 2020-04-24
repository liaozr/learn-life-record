// JavaScript Document
//$.noConflict();

$(function(){
	
	var opt = {
		movingspeed:300,		//移动速度
		startingposition:'0px',	//起始位置
		movingdistance:'10px',	//移动距离
		
		listnumber:4,	//多少列
		indexnumber:3,	//第几个元素(从0开始，下标)
		margintop:'0px',	//上外边距
		marginbottom:'0px',	//下外边距
		
		li_w:156,	//每个元素的总宽度，包括内外边距和边框
		li_h:160,	//每个元素的总高度，包括内外边距和边框
		li_num:5,	//最少有多少个元素
		left_elem:'rollleftbtn',	//左滚动按钮id
		right_elem:'rollrightbtn',	//左滚动按钮id
	};
	
	$.fn.rightMobile = function(options){
		var opts = $.extend({}, opt, options);
		
		$(this).children().each(function(index, element) {
			$(this).hover(function(){
				$(this).stop().animate({
					marginLeft:opts.movingdistance
				},opts.movingspeed);
			},function(){
				$(this).stop().animate({
					marginLeft:opts.startingposition
				},opts.movingspeed);
			});
		});
	}
	
	$.fn.elementlayout = function(options){
		var opts = $.extend({}, opt, options);
		
		$(this).each(function(index, element) {
			if(index % parseInt(opts.listnumber) == parseInt(opts.indexnumber)){
				$(this).css({
					"margin":"0px",
					"margin-top":opts.margintop,
					"margin-bottom":opts.marginbottom
				});
			}else{
				$(this).css({
					"margin-left":"0px",
					"margin-top":opts.margintop,
					"margin-bottom":opts.marginbottom
				});
			}
		});
	}
	
	$.fn.bannerCarousel = function(options){
		var opts = $.extend({}, opt, options);
		
		var banner_thumb = $(this).find(".banner_thumb").find("ul li"),
			banner_btn = $(this).find(".banner_btn").find("ul"),
			window_width = parseInt($(window).width()),
			view_height = $(this).height();
		
		banner_thumb.each(function(index, element) {
			
			var li_img = $(this),
				img = $(this).find("img"),
				realWidth = 0,
				realHeight = 0,
				realtop = 0,
				realleft = 0;
			$("<img/>").attr("src", $(img).attr("src")).load(function(){
				//console.dir(this.width);
				realWidth = this.width;
				realHeight = this.height;
				realleft = (window_width - realWidth) / 2;
				if(realHeight > view_height){
					realtop = 0;
				}else{
					realtop = (view_height - realHeight) / 2;
				}
				li_img.css("top",realtop+"px");
				li_img.css("left",realleft+"px");
			});
			
			banner_btn.append("<li><span></span></li>");
		});
		
		banner_btn.find("li").click(function(){
			clearInterval(setintervals);
			var index = $(this).index();
			
			banner_thumb.eq(index).find("img").fadeIn(600);
			banner_thumb.eq(index).siblings().find("img").fadeOut(500);
			banner_btn.find("li").eq(index).find("span").addClass('btns');
			banner_btn.find("li").eq(index).siblings().find("span").removeClass();
			
			carousel(index);
		});
		
		var setintervals,
			num = 0,
			length = banner_thumb.length-1;
		
		var carousel = function(num){
			setintervals = setInterval(function(){
				
				banner_thumb.eq(num).find("img").fadeIn(600);
				banner_thumb.eq(num).siblings().find("img").fadeOut(500);
				banner_btn.find("li").eq(num).find("span").addClass('btns');
				banner_btn.find("li").eq(num).siblings().find("span").removeClass();
				
				if(num == length){
					num = 0;
				}else{
					num++;
				}
				
			},3000);
		}
		
		carousel(num);
	}
	
	$.fn.elementsmarquee = function(options){
		var opts = $.extend({}, opt, options);
		var content_list = $(this).find(".content_view .content_list"),
			content_list_li = content_list.find("li"),
			width = 0,
			length = 0;
		
		if(content_list_li.length < opts.li_num){
			content_list.append(content_list.html());
			content_list_li = content_list.find("li");
		}
		
		length = content_list_li.length;
		
		content_list_li.each(function(index, element) {
			width += opts.li_w;
		});
		content_list.css("width",width+"px");
		
		var setinterval_m,
			margin_left = opts.li_w;
		
		var marquee = function(){
			setinterval_m = setInterval(function(){
				margin_left = margin_left - opts.li_w;
				content_list.animate({
					marginLeft:margin_left+"px"
				},600,function(){
					if(margin_left <= (-opts.li_w)){
						content_list.css("margin-left","-"+opts.li_w+"px");
						content_list.append(content_list.find("li:eq(0)"));
						margin_left = (-opts.li_w);
					}
				});
			},3000);
		}
		
		marquee();
		
		$("#"+opts.left_elem).click(function(){
			clearInterval(setinterval_m);
			margin_left = margin_left - opts.li_w;
			content_list.animate({
				marginLeft:margin_left+"px"
			},600,function(){
				if(margin_left <= (-opts.li_w)){
					content_list.css("margin-left","-"+opts.li_w+"px");
					content_list.append(content_list.find("li:eq(0)"));
					margin_left = (-opts.li_w);
				}
			});
		});
		
		$("#"+opts.right_elem).click(function(){
			clearInterval(setinterval_m);
			margin_left = margin_left + opts.li_w;
			content_list.animate({
				marginLeft:margin_left+"px"
			},600,function(){
				if(margin_left >= ((opts.li_w*(length-1))-width)){
					content_list.css("margin-left",((opts.li_w*(length-1))-width)+"px");
					content_list.find("li:eq(0)").before(content_list.find("li:eq("+(length-1)+")").remove());
					margin_left = ((opts.li_w*(length-1))-width);
				}
			});
		});
		
		$(this).hover(function(){
			clearInterval(setinterval_m); //调用清除计时器方法
		},function(){
			setTimeout(marquee(),1000); //重新调用自动滚动方法
		});
		
	};
	
});