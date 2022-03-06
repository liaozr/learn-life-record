// 资讯列表
var httpserver = "https://admin.hjtc123.com";
var pageNo = 1;
var pageSize = 6;
var alltol = 0;
var id = 182;
// 公司新闻 182
// 行业资讯 176
// 物流资讯 179

function funcHover () { 
    // 美业新闻资讯--鼠标悬停效果
    $("#tabsContent li").mouseover(function () {
        $(this).find(".news-content .news-text .news-title").css("color", '#C000FF');
        $(this).find(".news-content .detail-text").css("display", 'block');
        var src = $('img', this)[1].src
        $('.news-icon', this).data('src', src)
        var activesrc = $('.news-icon', this).data('activesrc')
        $('.news-icon', this).attr('src', activesrc);
        console.log('img_url==src', src)
        console.log('img_url==activesrc', activesrc)
    })
    $("#tabsContent li").mouseout(function () {
        $(this).find(".news-content .news-text .news-title").css("color", '#1A1A1A');
        $(this).find(".news-content .detail-text").css("display", 'none');
        var src = $('.news-icon', this).data('src')
        $('.news-icon', this).attr('src', src);
    })
}


function getNewsList(pageNo, _pageSize) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: `${httpserver}/cms/content/list?pageNo=${pageNo}&pageSize=${_pageSize}&contentCategoryId=${id}`,
        //data: {},
        success: function (json) {
            var typeData = json.data.rows;
            $("#tabsContent").empty();
            if (json.data.rows.length < 1) {
                return;
            }
            if (alltol == 0) {
                alltol = json.data.total;
                var p = new Page({
                    el: '#paging',
                    nums: alltol, // 总数
                    counts: pageSize, // 每页个数
                    defaultPage: 1,
                    showHeadFoot: !false, // 显示首页尾页
                    head: '首页', // 更改首页文字
                    foot: '尾页', // 更改尾页文字
                    jumpToOrder: true, // 跳转到指定页
                    showNowAndAll: false, // 当前页/共几页
                    clickEvent: function (pageNo, _this) {
                        getNewsList(pageNo, _pageSize)
                        // console.log('点击' + currectPage + '页');
                        // // console.log(p == _this); // true
                        // // _this.pages = 20; //p.pages = 20; 重新设置总页数
                        // _this.nums = 300; // p.nums = 300;重新设置总数据条数 ，和设置总页数 二选一
                    }
                });
            }
            var tbBody_ = ""
            $.each(typeData, function (i, n) {

                var trColor;

                var images_ = $.parseJSON(n.contentImg);

                var datatime = new Date(n.contentDatetime);
                var year = datatime.getFullYear(); //获取年
                var month = datatime.getMonth() + 1; //获取月
                var day = datatime.getDate(); //获取日
                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                var dayformat = month + "-" + day;
                if (images_.length != 0) {
                    tbBody_ +=
                        ` <li class="hvr-float">
                        <a href='detail.html?id=${n.id}'>
                        <div class="news-content">
                            <img class="news-img" src=${httpserver}${images_[0].path}
                            alt=${n.contentTitle} title=${n.contentTitle} />
                            <div class="news-text">
                                <div class="news-title overflow-single">${n.contentTitle}</div>
                                <div class="news-desc overflow-multi">${n.contentDescription}</div>
                                <div class="flex-center-between more-icon">
                                    <div class="flex-center">
                                        <span class="detail-text">查看详情</span>
                                        <img class="news-icon" data-activesrc="../../images/news/tb1.png" src="../../images/news/tb2.png"
                                        alt="图标" title="图标" />
                                    </div>
                                    <div class="news-date">${n.createDate.substring(0,10)}</div>
                                </div>
                            </div>
                        </div>
                        </a>
                    </li>`

                }

            });
            // 占位元素
            tbBody_ += ` <li class="temp"></li>`
            $("#tabsContent").append(tbBody_);
            funcHover()
        },
        error: function (json) {
            alert("加载失败");
        }
    });
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return encodeURI(r[2]); return null; //返回参数值
}

console.log('getUrlParam()', getUrlParam('id'))
if (getUrlParam('id')) {
    $('body,html').animate({scrollTop: $('#zixunTabs').offset().top}, 500);
    id = getUrlParam('id')
    $('#zixunTabs li').removeClass("active");
    $("#zixunTabs li[data-id=" + id + "]").addClass("active");
    getNewsList(pageNo, pageSize);
} else {
    // 默认显示公司资讯
    console.log('pageNo',pageNo)
    console.log('pageSize',pageSize)
    getNewsList(pageNo, pageSize);
}

// 资讯切换
$('#zixunTabs li').on('click', function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    id = $(this).data("id")
    pageNo = 1
    alltol = 0;
    getNewsList(1, pageSize);
    $("#paging").empty();
})

