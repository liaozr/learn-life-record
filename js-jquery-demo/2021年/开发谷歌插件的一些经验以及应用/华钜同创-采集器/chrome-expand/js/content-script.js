// content_script.js
document.addEventListener('DOMContentLoaded', function() {
    bindEvents();
});

function bindEvents() { // 事件和消息Mouse
    $(document).on('mousedown', function(e) { // mouseup右键记录当前位置，并发送message给background
            // console.log('mousedown',this.URL,e.which);
            if (e.which===3) {
                chrome.runtime.sendMessage({
                    type: 'mouseup-event',
                    url:this.URL,
                });
            }
    })

}
// 提示弹出框
let timeoutFn=null;
function tips(title,icnName,icon){
    const urlimg = chrome.runtime.getURL(icon);//获取图片路径
    clearTimeout(timeoutFn);
    $('.chrome-tips').hide();
    $("body").append(`<div class="chrome-tips">
        <div class="chrome-title">
            <img src="${urlimg}" alt="">
            <p>${icnName}采集扩展</p>
        </div>
        <div class="chrome-content">${title}</div>
    </div>`);
    timeoutFn =  setTimeout(()=>{
        $('.chrome-tips').hide();
    },3000)
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.type){
        tips(request.type,request.icnName,request.icon)
    }
    // 这里是返回给bg的内容
    sendResponse('success')
})
