var httpserver = "https://admin.hjtc123.com";

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
// #878787
function getDetail() {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: `${httpserver}/cms/content/get?id=${getUrlParam("id")}`,
        //data: { id: id, name: name },
        success: function(json) {
            var n = json.data;
            if (n.length < 1) {
                return;
            }
            var images_ = $.parseJSON(n.contentImg);
            $("#newstitle").append(n.contentTitle);
            $("#newstime").append(n.contentDatetime);
            $("#newsAuthor").append(n.contentAuthor);
            $("#newsviews").append(n.contentHit);
            $("#newdetail").append(n.contentDetails);
            $(".tag>span").append(n.contentKeyword);

            var tbBody_ = ""
            if(n.orders != {} && n.orders.last_contentTitle != undefined){
              tbBody_ +=
              `
              <a href=${window.location.origin + window.location.pathname + "?id=" + n.orders.last_id}>
              <div class="prev" id="prev">上一条：${n.orders.last_contentTitle}</div>
              </a>
              `
            }
            if(n.orders != {} && n.orders.next_contentTitle != undefined){
              tbBody_ +=
              `
              <a href=${window.location.origin + window.location.pathname + "?id=" + n.orders.next_id}>
                  <div class="next" id="next">下一条 :  ${n.orders.next_contentTitle}</div>
              </a>
              `
            }
            console.log("n",n)
            $(".switch_pageNum").append(tbBody_);


            /* 新闻导航 begin */
            if (n.orders != {} && n.orders.next_contentTitle != undefined) {
                $(".next_contentTitle").text("下一篇 : " + n.orders.next_contentTitle);
                $(".next_contentTitle").parent("a").removeClass("disabled").attr({
                    "href": window.location.origin + window.location.pathname + "?id=" + n.orders.next_id
                });
            } else {
                $(".next_contentTitle").parent("a").addClass("disabled");
                $(".next_contentTitle").text("暂无");
            }
            if (n.orders != {} && n.orders.last_contentTitle != undefined) {
                $(".last_contentTitle").text("上一篇 : " + n.orders.last_contentTitle);
                $(".last_contentTitle").parent("a").removeClass("disabled").attr({
                    "href": window.location.origin + window.location.pathname + "?id=" + n.orders.last_id
                });
            } else {
                $(".last_contentTitle").parent("a").addClass("disabled");
                $(".last_contentTitle").text("暂无");
            }
            /* 新闻导航 end */
        },
        error: function(json) {
            alert("加载失败");
        }
    });
}
getDetail()