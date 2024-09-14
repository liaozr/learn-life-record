wow = new WOW({
	animateClass: 'animated',
});
wow.init();

$(function () {
	/*分类高亮*/
	var href = location.pathname + location.search;
	// if (!href) return;
	$(".yjTitle").each(function (i, e) {
		var aa = $(e).find('a').attr("href");
		if (aa == href) {
			// 自身样式
			$(e).addClass('yjActive')
				.end().siblings('.yjTitle').removeClass('yjActive');
		}
	});
})

/*导航*/
$(function () {
	var width = $(window).width();
	var height = $(window).height();

	$('#navBox').addClass('active');

	if (width > 768) {
		$('#navBox').removeClass('active');
		window.addEvent('scroll', function () {
			if (window.scrollY <= 10) {
				$('#navBox').removeClass('active');
			} else {
				$('#navBox').addClass('active');
			}
		});
	} else {
		$('#navBox').addClass('active');

		$('.nav-button').click(function () {
			$('#navBox .topNav').addClass('active');
		});

		$('#navBox .nav .closes').click(function () {
			$('#navBox .nav').removeClass('active');
			$('#navBox .topNav> ul > li').removeClass('active');
			$('#navBox .topNav> ul > li> ul').stop().slideUp();
		});

		$(document).mouseup(function (e) {
			var con = $('#navBox .topNav>ul'); // 设置目标区域
			if (!con.is(e.target) && con.has(e.target).length === 0) {
				$('#navBox .topNav').removeClass('active');
				$('#navBox .topNav> ul > li').removeClass('active');
				$('#navBox .topNav> ul > li> ul').stop().slideUp();
			}
		});

		$('#navBox .topNav> ul > li').click(function () {
			if ($(this).find('ul').length > 0) {
	
				if($(this).hasClass('active')){
				    $(this).find('.slideNav').slideUp();
				    $(this).removeClass('active');
				}else{
				    $('.slideNav').slideUp();
				    $('#navBox .topNav> ul > li').removeClass('active');
				    $(this).addClass('active');
				    $(this).find('.slideNav').slideDown();
				    
				}
			}
		});

	}

	$('#navBox .topNav> ul > li').each(function () {
		$(this).hoverDelay({
			hoverDuring: 100,
			outDuring: 100,
			hoverEvent: function () {
				$(this).find('.slideNav').stop().slideDown();

			},
			outEvent: function () {
				$(this).find('.slideNav').stop().slideUp();
			}
		});
	});
})

$(function () {
	var wWidth = $(window).width(); //获取bai可du视zhi区域dao高zhuan度shu
	if (wWidth > 769) {
		$(".nav_item").hover(
			// 鼠标移入时显示元素
			function () {
				$(this).find('.slideNav').stop().slideDown('slow');
			},
			// 鼠标移出时隐藏元素
			function () {
				$(this).find('.slideNav').stop().slideUp('slow');
			}
		);
	}
})

/*搜索*/

$('.navBox .seachBut').click(function () {
	$('.navBox .SeachBox').fadeIn();
});

$(document).mouseup(function (e) {
	var con = $('.navBox .search-box');   // 设置目标区域
	if (!con.is(e.target) && con.has(e.target).length === 0) {
		$('.navBox .SeachBox').stop().fadeOut();
	}
});

/*
$(".navBox .search-box .search-center span").on("click", function () {
	if ($.trim($("[name=input_head]").val())) {
		window.location.href = "/globalSearch.html?keywords=" + $.trim($("[name=input_head]").val()) + "&appIds=all";
	}
})
var search = document.getElementById('input_head');
search.onkeypress = function (e) {
	if (e.keyCode === 13) {
		window.location.href = "/globalSearch.html?keywords=" + $.trim($("[name=input_head]").val()) + "&appIds=all";
	}
}*/


/*foot*/
$(function () {
	var wWidth = $(window).width(); //获取bai可du视zhi区域dao高zhuan度shu
	if (wWidth < 768) {
		$('#footBox .footNav> ul > li').click(function () {
			if ($(this).find('ul').length > 0) {
				$(this).find('.p_level2Box').slideToggle();
				$(this).siblings().find('.p_level2Box').slideUp();
				$(this).toggleClass('active');
				$(this).siblings().removeClass('active');
			}
		});
	}
})


/*Home_banner*/
var numSlides = $('.mySwiper_banner .swiper-slide').length;
if(numSlides == 1){
    $('.mySwiper_banner .swiper_ban').hide();
}
var mySwiper = new Swiper('.mySwiper_banner', {
	slidesPerView: 1,
	spaceBetween: 0,
	loop: numSlides > 1,
	pagination: {
		el: ".swiper_ban",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className +
				'"><svg> <circle cx="19" cy="19" r="18" fill="none"></circle></svg><i></i></span>';
		},
	},
	autoplay: numSlides > 1 ? {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                } : false,
	speed: 1000,
	observer: true,
	observeParents: true,
})

/*首页-关于我们
$(".num01").numberRock({
	speed: 20,
	count: 130000 
})
$(".num02").numberRock({
	speed: 20,
	count: 2200
})
$(".num03").numberRock({
	speed: 20,
	count: 10000
})
*/
$('.num01').each(function () {
        var $this = $(this);
        var count = $this.data('count'); // 获取 data-count 属性的值

        $this.numberRock({
            speed: 50, // 你可以根据需要设置速度
            count: count // 动态传递 count 值
        });
    });
/*首页-业务*/
$(function () {
	$('.ywbj:nth-child(1)').addClass('cur');
	$('.textLi:nth-child(1)').addClass('active1');
	$("#ywBox .textLi").mouseenter(function () {
		$(this).addClass("active1");
		$(this).siblings().removeClass("active1");

		$('.ywbj').eq($(this).index()).addClass('cur');
		$('.ywbj').eq($(this).index()).siblings().removeClass('cur');
	});
	$("#ywBox .textLi").mouseleave(function () {
		$(this).siblings().removeClass("active1");
	});
});

/*首页-加入我们*/
$(function () {
	var wWidth = $(window).width(); //获取bai可du视zhi区域dao高zhuan度shu
	if (wWidth > 769) {
		ScrollTrigger.create({
			trigger: '#ywBox',
			start: 'bottom bottom',
			end: 'bottom',
			scrub: true,
			//pin: true,
			animation: gsap.timeline()
				.fromTo('.jrlogoImg', { scale: 0.3 }, { scale: 1 })
			//.fromTo('.jrBiao', { y: '100px', opacity: 0 }, { y: '40px', opacity: 1 })
		});
		ScrollTrigger.create({
			trigger: '#joinBox',
			start: 'top top',
			end: '+=1900',
			scrub: true,
			pin: true,
		});
		ScrollTrigger.create({
			trigger: '.jrParallel',
			start: 'top top',
			end: '+=1700',
			scrub: true,
			animation: gsap.timeline()
				//.fromTo('.jrSum', { opacity: 0 }, { opacity: 1 })
				//.fromTo('.jrLink', { opacity: 0 }, { opacity: 1 })
				.fromTo('.jrbjBox1', { opacity: 0, width: '413px', height: '207px' }, { opacity: 1, width: '120%', height: '100%', 'border-radius': '0' })
				.fromTo('.jrlogoImg', {
					opacity: 1
				}, {
					opacity: 0
				})
				.fromTo('.jrPage2', {
					opacity: 0,
					'z-index': '-1'
				}, {
					opacity: 1,
					'z-index': '2'
				}, '<')
				.fromTo('.jonBiao', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0'
				}, '>')
				.fromTo('.jonLine', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0'
				}, '>')
				.fromTo('.jonLi', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0'
				}, '>')
		});
	}
})

$(function () {
	$('.jonLi:nth-child(1)').addClass('active1');
	$("#joinBox .jonLi").mouseenter(function () {
		$(this).addClass("active1");
		$(this).siblings().removeClass("active1");
	});
	$("#joinBox .jonLi").mouseleave(function () {
		$(this).siblings().removeClass("active1");
	});
});

/*首页-可持续发展*/
$(function () {
	ScrollTrigger.create({
		trigger: '#sdBox',
		start: 'center bottom',
		end: '+=500',
		//scrub: true,
		//pin: true,
		animation: gsap.timeline()
			.fromTo('.riLeft', {
				'clip-path': 'polygon(100% 0, 0 0, 0 0 ,0 0)'
			}, {
				'clip-path': 'polygon(100% 0, 100% 100%, 0 100%,0 0)'
			})
			.fromTo('.tuBox1', {
				'clip-path': 'polygon(100% 0%, 100% 0%, 0% 0%, 0% 0%)'
			}, {
				'clip-path': 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)'
			}, '<')
			.fromTo('.tuBox2', {
				'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)'
			}, {
				'clip-path': 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
			}, '<')
	});
})

$(function () {
	var wWidth = $(window).width(); //获取bai可du视zhi区域dao高zhuan度shu
	if (wWidth < 768) {
		ScrollTrigger.create({
			trigger: '#ywBox',
			start: 'center bottom',
			end: '+=500',
			//scrub: true,
			//pin: true,
			animation: gsap.timeline()
				.fromTo('.text01', {
					opacity: 0
				}, {
					opacity: 1
				})
				.fromTo('.text02', {
					opacity: 0
				}, {
					opacity: 1
				}, '>')
				.fromTo('.text03', {
					opacity: 0
				}, {
					opacity: 1
				}, '>')
		});

		ScrollTrigger.create({
			trigger: '#joinBox .jrPage1',
			start: 'center bottom',
			end: '+=500',
			//scrub: true,
			//pin: true,
			animation: gsap.timeline()
				.fromTo('.jrlogoImg', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0px'
				})
				.fromTo('.jrBiao', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0px'
				})
				.fromTo('.jrSum', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0px'
				})
				.fromTo('.jrLink', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0px'
				})
		});

		ScrollTrigger.create({
			trigger: '#joinBox .jrPage2',
			start: 'center bottom',
			end: '+=500',
			//scrub: true,
			//pin: true,
			animation: gsap.timeline()
				.fromTo('.jonBiao', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0px'
				})
				.fromTo('.jonLine', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0px'
				})
				.fromTo('.jonLi', {
					opacity: 0,
					y: '50px'
				}, {
					opacity: 1,
					y: '0px'
				})
		});
	}
})

/*关于我们-视频*/
$(document).ready(function () {
	var $video = $('.profile_box2 video'); // 获取video元素
	var $button = $('.playBtn'); // 获取按钮元素

	// 监听按钮点击事件
	$button.click(function () {
		if ($video.prop('paused')) {
			// 如果视频暂停，播放它
			$video.get(0).play();
			$button.hide();
		} else {
			// 如果视频正在播放，暂停它
			$video.get(0).pause();
			$button.show();
		}
	});
});

/*关于我们-数字
$(".com01").numberRock({
	speed: 50,
	count: 900
})
$(".com02").numberRock({
	speed: 50,
	count: 130000
})
$(".com03").numberRock({
	speed: 50,
	count: 800
})
$(".com04").numberRock({
	speed: 100,
	count: 9
})
*/

$('.com01').each(function () {
        var $this = $(this);
        var count = $this.data('count'); // 获取 data-count 属性的值

        $this.numberRock({
            speed: 50, // 你可以根据需要设置速度
            count: count // 动态传递 count 值
        });
    });

/*关于我们-全球化*/
$(document).ready(function () {
	$('.Glocircle1').on('mouseenter', function () {
		$('.jiao').css('opacity', '0.3');
		$('.yuan2').css('opacity', '0.3');
	}).on('mouseleave', function () {
		$('.jiao').css('opacity', '1');
		$('.yuan2').css('opacity', '1');
	});

	$('.Glocircle2').on('mouseenter', function () {
		$('.jiao').css('opacity', '0.3');
		$('.yuan1').css('opacity', '0.3');
	}).on('mouseleave', function () {
		$('.jiao').css('opacity', '1');
		$('.yuan1').css('opacity', '1');
	});

	$('.Glotriangle').on('mouseenter', function () {
		$('.yuan1').css('opacity', '0.3');
		$('.yuan2').css('opacity', '0.3');
	}).on('mouseleave', function () {
		$('.yuan1').css('opacity', '1');
		$('.yuan2').css('opacity', '1');
	});
});

/*供应链*/
$(function () {
	$('.Num4_Li').hover(
		function () {
			$(this).addClass('active');
		},
		function () {
			$(this).removeClass('active');
		}
	);
})

/*关于我们-创新研发
$(".Innroll01").numberRock({
	speed: 10, //����Խ�����ֹ����ٶ�Խ��
	count: 150//����ͣ������
})
$(".Innroll02").numberRock({
	speed: 50,
	count: 5
})
$(".Innroll03").numberRock({
	speed: 10,
	count: 20000
})
*/
$('.Innroll01').each(function () {
        var $this = $(this);
        var count = $this.data('count'); // 获取 data-count 属性的值

        $this.numberRock({
            speed: 30, // 你可以根据需要设置速度
            count: count // 动态传递 count 值
        });
    });

/*关于我们-全球化布局*/
$(function () {
	$('.Global_Link').click(function () {
		$('.GloUpBox').addClass('show');
		$('body').css('overflow','hidden');
	})
	
	$('.GloUpClose').click(function () {
		$('.GloUpBox').removeClass('show');
		$('body').removeAttr('style');
	})

	$('.leftLi:nth-child(1)').addClass('cur');
	$('.rightLi:nth-child(1)').addClass('cur');
	$(".GloUpBox .rightLi").mouseenter(function () {
		$(this).addClass("cur");
		$(this).siblings().removeClass("cur");

		$('.leftLi').eq($(this).index()).addClass('cur');
		$('.leftLi').eq($(this).index()).siblings().removeClass('cur');
	});
})


/*创新研发-创新成果*/
$(function () {
	$('.cxcgbj:nth-child(1)').addClass('cur');
	$('.cxcgLi:nth-child(1)').addClass('active1');
	$("#Inn_number2 .cxcgLi").mouseenter(function () {
		$(this).addClass("active1");
		$(this).siblings().removeClass("active1");

		$('.cxcgbj').eq($(this).index()).addClass('cur');
		$('.cxcgbj').eq($(this).index()).siblings().removeClass('cur');
	});
	$("#Inn_number2 .cxcgLi").mouseleave(function () {
		$(this).siblings().removeClass("active1");
	});
});

/*创新研发-智能制造*/
$(function () {
	$('.InnNum3_Right_li:first-child').addClass('active');
	$('.InnNum3_Right_li').hover(function (event) {
		$(this).show().addClass('active');
		$(this).siblings().removeClass('active');
	})
})

/*联系我们*/
$(function () {
	$('.Con_Right_li:first-child').addClass('active');
	$('.Con_Right_li').hover(function (event) {
		$(this).show().addClass('active');
		$(this).siblings().removeClass('active');
	})
})



/*加入我们-多彩蓝思*/
var mySwiper = new Swiper('.mySwiper_duocai', {
	slidesPerView: 1.9,
	spaceBetween: 50,
	loop: true,
	autoplay: {
		delay: 3000,
		stopOnLastSlide: false,
		disableOnInteraction: true,
	},
	speed: 1000,
	centeredSlides: true,
	observer: true,
	observeParents: true,
	breakpoints: {
		768: {
			slidesPerView: 1,
			spaceBetween: 10,
		}
	}
})


/*加入我们-蓝思生活*/
var mySwiper = new Swiper('.mySwiper_life', {
	slidesPerView: 3,
	spaceBetween: 40,
	autoplay: {
		delay: 3300,
		stopOnLastSlide: false,
		disableOnInteraction: true,
	},
	slidesPerColumn: 2,
	slidesPerColumnFill: 'row',
	observer: true,
	observeParents: true,
	pagination: {
		el: ".swiper-pagination1",
		clickable: true,
	},
	breakpoints: {
		768: {
			slidesPerView: 1,
			spaceBetween: 10,
			slidesPerColumn: 1,
			slidesPerColumnFill: 'column',
		}
	}
})

/*加入我们-职位招聘*/

$(function () {
	$('.Jon_Top').click(function () {
		$(this).parent().siblings().removeClass('active').find('.Jon_Bot').slideUp(500);
		$(this).parent().addClass('active').find('.Jon_Bot').slideToggle(500);
	});
});


/*投资者关系*/
var mySwiper = new Swiper('.mySwiper_gp', {
	slidesPerView: 3,
	spaceBetween: 50,
	//loop: true,
	autoplay: {
		delay: 3000,
		stopOnLastSlide: false,
		disableOnInteraction: true,
	},
	speed: 1000,
	observer: true,
	observeParents: true,
	navigation: {
		nextEl: ".swiper_next",
		prevEl: ".swiper_prev",
	},
	breakpoints: {
		768: {
			slidesPerView: 1,
			spaceBetween: 10,
		},
		1100: {
			spaceBetween: 20,
		},
	}
})


/*可持续发展*/
$(function () {
	$('.Susnum5textLi:nth-child(1)').addClass('cur');
	$('.itemImg:nth-child(1)').addClass('cur');
	$('.Susnum5textLi').hover(function (event) {
		$(this).show().addClass('cur');
		$(this).siblings().removeClass('cur');

		$('.itemImg').eq($(this).index()).addClass('cur');
		$('.itemImg').eq($(this).index()).siblings().removeClass('cur');
	})
});



/*应用场景*/

/*$(function () {
	$('.SceLi .arrow').click(function () {
		$(this).addClass('cur');
		$(this).parents('.SceLi').siblings('.SceLi').find('.arrow').removeClass('cur');

		$('.spBoxLi').eq($(this).parents('.SceLi').index()).addClass('cur');
		$('.spBoxLi').eq($(this).parents('.SceLi').index()).siblings().removeClass('cur');
	})

	$('.arrow').click(function () {
		$('.spBox').addClass('active');
	})

	$('.spBox .sp_Colse').click(function () {
		$('.spBox').removeClass('active');
		$('video').pause();
	})
});*/

$(function () {
	
	if($(window).width()<=768){
	    $(document).on('click','.SceLi .infoText',function(e){
	        e.stopPropagation();
	        $(this).parents('.SceLi').find('.spFd').show();
	        $(this).parents('.SceLi').find('.spFd').addClass('cur');
    				$(this).find('video')[0].play();
    				$(this).parents('.SceLi').siblings('.SceLi').find('.spFd').removeClass('cur');
	    })
	    $(document).on('click','.clo_btn',function(e){
	        e.stopPropagation();
    	    $(this).parent().hide();
    	    $(this).parent().find('video')[0].pause();
    	    $(this).parent().find('video')[0].currentTime=0;
    	})
	}else{
	    $(".SceLi .infoText").each(function () {
    		$(this).on({
    			mouseenter: function (e) {
    			    e.stopPropagation();
    				$(this).parents('.SceLi').find('.spFd').addClass('cur');
    				$(this).find('video')[0].play();
    				$(this).parents('.SceLi').siblings('.SceLi').find('.spFd').removeClass('cur');
    			},
    			mouseleave: function () {
    				$(this).parents('.SceLi').find('.spFd').removeClass('cur');
    				$(this).find('video')[0].pause();
    			}
    		});
    
    	})
	}
	
});

