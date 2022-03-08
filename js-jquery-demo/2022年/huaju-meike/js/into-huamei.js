// 鼠标悬停效果
$("#section3-hover .section3-item").mouseover(function () {
  $(this).addClass("active");
})
$("#section3-hover .section3-item").mouseout(function () {
  $(this).removeClass("active");
})