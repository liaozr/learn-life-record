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
    $('.g-cart .m-list').each(function(index){
        	var input_val=$('.number').eq(index).val();
        	var input_value_val=parseInt(input_val);
          $('.number').eq(index)[0].addEventListener('input',function(){
            	   input_val=$('.number').eq(index).val();
            	   input_value_val=parseInt(input_val);
          })
        	// 增加操作
        	$(".add-btn").eq(index).click(function(){
               if( input_value_val <= 0 || isNaN(input_value_val)){
                    $('.number').eq(index).val(1);
                    input_value_val=1;
               }
               else{
                   input_value_val++;
                   $('.number').eq(index).val(input_value_val);
               }
        	});
        	// 减操作
        	$(".reduce-btn").eq(index).click(function(){
               if( input_value_val <= 0 || isNaN(input_value_val) || input_value_val == 1){
                    $('.number').eq(index).val(1);
                    input_value_val=1;
               }
               else{
                   input_value_val--;
                   $('.number').eq(index).val(input_value_val);
               }
        	})
    })

    // 底部全部清空操作 
    $('.g-cart-bottom .del').click(function(){
      $(".g-cart .g-prodetails-content").stop(true).hide();
      $(".g-cart-bottom").stop(true).hide();
      $(".no-shopping").stop(true).show();
    })

    // 每项商品的 delete操作
    $('.g-cart  .count-list span.del-btn').each(function(){
      $(this).click(function(){
         var _parent=$(this).parent().parent();
         var _shop_list_length=$('.g-cart  .count-list span.del-btn').length;
          if(_shop_list_length == 1){
              $(".g-cart .g-prodetails-content").stop(true).hide();
              $(".g-cart-bottom").stop(true).hide();
              $(".no-shopping").stop(true).show();
          }
          _parent.remove();
          _parent.stop(true).hide();
      })
    })

    // 点击结算

    $(".pay-jiesuan").click(function(){
      var shop_price= $('.price_num').html();
       if(shop_price > 0){
          window.location.href='orderlist.html';
       }

    })
    
    // -------------------------------------------------------------------------------

    // 订单详情页面（orderlsit.html）
    $(".g-orderlist .shuohuo-layout .list label").each(function(index){
           $(this).click(function(){
            var _label_length=$(".g-orderlist .shuohuo-layout .list label").length;
            if( index == _label_length-1){
              $(".g-orderlist .shuohuo-layout .use-new-address").stop(true).show();
            }
            else{
              $(".g-orderlist .shuohuo-layout .use-new-address").stop(true).hide();
            }
           })
    });
    $(".g-orderlist .shuohuo-layout .list input[type='radio']").each(function(index){
           $(this).click(function(){
              $(".g-orderlist .shuohuo-layout .list label").eq(index).trigger('click');
           })
    })

    $(".g-orderlist .fapiao-xinxi  label").click(function(){
       if( $("#fapiao").prop('checked')){
          $(".g-orderlist .fapiao-xinxi .yaokai-fapiao").stop(true).hide();
          $("#fapiao").prop('checked',false);
       }
       else{
         $(".g-orderlist .fapiao-xinxi .yaokai-fapiao").stop(true).show();
        $("#fapiao").prop('checked',true);
       }
    });

    $("#fapiao").click(function(){
      $(".g-orderlist .fapiao-xinxi  label").trigger('click');
    })
     
})