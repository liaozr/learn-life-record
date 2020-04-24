$(function(){

	function canvasload(id) {
            //canvas加载图片
            var imglength = $("#"+id).find("canvas").length;
            if (imglength > 0) {
                $("#"+id).find("canvas").each(function () {
                    var imgSrc = $(this).data("src");
                    var imageObj = new Image();
                    imageObj.canvs = $(this)[0];
                    var cvs = imageObj.canvs.getContext('2d');
                    if (cvs) {
                        imageObj.onload = function () {
                            imageObj.canvs.width = this.width;
                            imageObj.canvs.height = this.height;
                            cvs.drawImage(this, 0, 0);
                            $(imageObj.canvs).css("background-image", "none");
                        }
                        imageObj.src = imgSrc;
                    }
                })
            }
    }
    canvasload("mainsection");

    // ----------------------------------------------------------------------------

	var input_val=$('.number').val();
	var input_value_val=parseInt(input_val);
    $('.number')[0].addEventListener('input',function(){
    	   input_val=$('.number').val();
    	   input_value_val=parseInt(input_val);
    })
	// 增加操作
	$(".add-btn").click(function(){
       if( input_value_val <= 0 || isNaN(input_value_val)){
            $('.number').val(1);
            input_value_val=1;
       }
       else{
           input_value_val++;
           $('.number').val(input_value_val);
       }
	});
	// 减操作
	$(".reduce-btn").click(function(){
       if( input_value_val <= 0 || isNaN(input_value_val) || input_value_val == 1){
            $('.number').val(1);
            input_value_val=1;
       }
       else{
           input_value_val--;
           $('.number').val(input_value_val);
       }
	})

	// --------------------------------------------------------------------------------

	// 加入到购物车的动画效果
	$(".g-add-shop-car").click(function(e){
		add_shopcar(e);
	})
	function add_shopcar(e){
		e.stopPropagation();
	    var number=input_value_val;

	    var productimg=$(".g-prodetails-content .m-list .img-center"),
	       imgsrc=productimg.children("canvas").attr("data-src"),
	        x = productimg.offset().left + 30,
	        y = productimg.offset().top -10,
	        X = $(".g-index .shop-icon").offset().left + 45,
	        Y = $(".g-index .shop-icon").offset().top + 10;
	        if ($('#flydiv').length <= 0) {
	            $('body').append('<div id="flydiv"><img src="'+imgsrc+'"/></div');
	        };
	        var $obj=$('#flydiv');

	        if(!$obj.is(':animated')){
	            $obj.css({'left': x,'top': y}).animate({'left': X,'top': Y-80},500,function() {

	            	// animate第三个参数是回调函数来的
	            	// fadeOut() 方法使用淡出效果来隐藏被选元素，假如该元素是隐藏的。
	                $obj.stop(false, false).animate({'top': Y-20,'opacity':0},500,function(){
	                    $obj.fadeOut(300,function(){
	                        $obj.remove();  
	                        var num=parseInt($(".cartnums").text());
	                        $(".cartnums").text(num+number);
	                        $(".cartnums").show();
	                    });
	                });
	            }); 
	        };
    }
})