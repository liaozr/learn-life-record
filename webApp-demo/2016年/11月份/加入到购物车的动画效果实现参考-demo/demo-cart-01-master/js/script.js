$(document).ready(function (){
  var goods = $(".goods");
  $(goods).click(function (){
    // 把 img 脱离文档流，设置其到最顶层。
    $(this).find('img').css({
      'position': 'absolute',
      'z-index' : '999'
    });
    $(this).find('img')
    // 设置 img 第一次移动的位置。
    .animate({
      'left'  : '200px',
      'top'   : '200px',
      'width' : '50px',
      'height': '25px',
      'opacity': '.8'
    }, 300).delay(100)
    // 设置 img 第二次移动的位置。
    .animate({
      'left'  : '260px',
      'top'   : '430px',
    }).fadeTo(200, 0);
  });
  
});