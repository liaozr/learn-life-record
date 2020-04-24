/*
表现与数据分离：
  把表现与数据分离，数据写在一个js的数组里面。通过js里的数据动态渲染表现层。
数据展示：
  for遍历所有数据，动态渲染dom结构，然后逐一为dom添加数据。
数据传递：
  响应点击事件，拿到当前点击的index，获取到对应的数据。
  渲染一个div，将数据添加进去。
*/

$(document).ready(function (){
  // 页面初始化
  var goods_warp = $(".goods-warp");
  for (var i=0; i<aData.length; i++) {
    $(goods_warp).append("<div class='goods goods-"+i+"'>");
  	var data = aData[i];
  	var goods = $(".goods-"+i);
    $(goods).append('<img src="'+data["imgUrl"]+'"/>')
    .append('<p class="name">'+data["proName"]+'</p>')
    .append('<p class="price">'+data["proPrice"]+'</p>')
    .append('<div class="addbtn">+加入购物车</div>');
  }
  
  // 添加到购物车
  var cart_p = $(".cart > p");
  var add_btn = $(".addbtn");
  var num = 0; // 区分同样的商品，设置其不同的类名
  $(add_btn).click(function (){
    num++;
    var index = $(this).parent('.goods').index();
    $(cart_p).after("<div class='cartin cartin-"+index+"-"+num+"'>");
    var data = aData[index];
    var cartin = $(".cartin-"+index+"-"+num);
    $(cartin).append('<img src="'+data["imgUrl"]+'"/>')
    .append('<p>'+data["proName"]+'</p>')
    .append('<p class="buy-price">'+data["proPrice"]+'</p>')
    .append('<div class="delbtn">删除</div>');
    
    // 从购物车删除
    var del_btn = $(".delbtn");
    $(del_btn).click(function (){
      $(this).parent('.cartin').remove();
    });
  });
});