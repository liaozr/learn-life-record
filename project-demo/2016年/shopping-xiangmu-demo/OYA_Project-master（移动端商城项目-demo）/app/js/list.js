$(function(){
		console.log('页面刷新');
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
		$dom.on('click singleTap',function(){
			$('html,body').animate({'scrollTop':0},300);
		})

		// 切换页 
		var mySwiper = new Swiper('.list-main',{
			noSwiping : true,
			noSwipingClass : 'stop-swiping'
		});
		$('.btn1').on('click singleTap',function(){
			var $index = $(this).index();
			$('.btn1').removeClass('active');
			$(this).addClass('active');
			mySwiper.slideTo($index, 300);
		})

		var picSwiper = new Swiper('.list-pic',{
			pagination : '.swiper-pagination',
			autoplay:5000
		})

		//头部导航栏显示/隐藏
		$(".list-icon").on('touchstart',function(){
			var $ul = $(".header-nav ul");
				if($ul.css('opacity') == 0){
					$(".header-nav ul").css({'height':'230px','opacity':1});
				}else{
					$(".header-nav ul").css({'height':'0px','opacity':0});
				}
		});

		//判断是否登录成功
		var login = localStorage.getItem('oyaUser');
		
		
		//获取连接的href
		var url = window.location.href;
		//id只能6位数，不完善
		var index = url.substring(url.lastIndexOf("?")+1,url.lastIndexOf("?")+6);
		index = index? index : 10001;
		var $imgurl = ['shopCart.html','list.html?'+ index,'my_list.html'];
		var $sum = $('#list-count');
		var $addCart = $('#list-addCart');

		//获取本地存储
		var arr = localStorage.getItem('arr');
		arr = arr ? JSON.parse(arr):[];
		// 购物车初始化
		var obj = {count:0,id:index};
		init();
		function init(){
			//获取本地存储
			var arr = localStorage.getItem('arr');
			arr = arr ? JSON.parse(arr):[];
			var sum = 0;
			arr.map(function(item,idx){
				if(item.count){
					sum += item.count;
				}
			})
			// console.log(sum)
			if(sum !=0 ){
				$sum.text(sum);
				$sum.css('background','#8e488e')
			}
		}
	
		$.getJSON('../json/goods.json',function(data){
			data.map(function(item,i){
				if(item.id == index){
					$('#list-born').text(item.born);
					$('#list-brandname').text(item.born);
					$('#list-price').text('￥'+ item.price);
					$('#list-productname').text(item.productname);
					$('#list-texture').text(item.texture);
					$('#list-wash').text(item.wash);
					//图片修改
					$('.list-show img').map(function(idx,list){
						list.src = item.show[idx].imgurl;
					})
					$('.list-url i').map(function(idx,com){
						com.style.background = '#dbcdc4 url('+ item.url +') no-repeat center 0';
					})
				}
			})
		})

		// 如果登录成功
		if(login){
			console.log('登录成功');
				$('footer a').map(function(idx,item){
					if(idx == 1){item.href = 'javascript:void(0)'}else{

						item.href = $imgurl[idx];
					}
				})
				// 加入购物车
				$addCart.on('touchstart',function(){
					var flag = true;
					var _sum = 0;
					obj.count++;
					obj.id = index;	
					arr.map(function(item,idx){
						if(item.id == obj.id) { _sum = item.count; flag = false}
					})
					if(flag){
						arr.push(obj);
					}else{
						_sum += obj.count;
						arr.map(function(item,idx){
							if(item.id == obj.id) { item.count = _sum;}
						})
					}
					localStorage.setItem('arr',JSON.stringify(arr));
					init();
				})
		}else{
			$('footer a').on('singleTap',function(){
				var _index = $('footer a').index($(this));
				var oyaUrl = $imgurl[_index];
				localStorage.setItem('oyaUrl',oyaUrl);
				location.href = 'login.html';

			})
		}
})