// 轮播图
var swiper0 = new Swiper('#swiper0', {
    pagination: {
        el: '.swiper-pagination',
		clickable: true
    },
});
var swiper1 = new Swiper('#swiper1', {
    // pagination: {
    //     el: '.swiper-pagination',
    // },
});
var swiper2 = new Swiper('#swiper2', {
    slidesPerView: 3,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
    },
});

// 美业线下门店步履维艰--鼠标悬停效果
$("#section1_hover .section1-item").mouseover(function () {
    $(this).addClass("active");
    var src = $('img', this)[0].src
    $('img', this).data('src', src)
    var activesrc = $('img', this).data('activesrc')
    // $("#section4_hover .item_box img").attr("src",$("#section4_hover .item_box img").data("src")); 
    $('img', this).attr('src', activesrc);
})
$("#section1_hover .section1-item").mouseout(function () {
    var src = $('img', this).data('src')
    $('img', this).attr('src', src);
    $(this).removeClass("active");
})


// 美业新闻资讯
// 资讯列表
var httpserver = "https://admin.hjtc123.com";
var pageNo = 1;
var pageSize = 3;
var alltol = 0;
var id = 182;
// 公司新闻 182
// 美业热点 183
// 运营知识 184


function funcHover () { 
    // 美业新闻资讯--鼠标悬停效果
    $("#tabsContent li").mouseover(function () {
        $(this).find(".news-content .news-text .news-title").css("color", '#C000FF');
        $(this).find(".news-content .news-desc").css("display", 'block');
        $(this).find(".news-content .news-img").css("display", 'none');
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
        $(this).find(".news-content .news-desc").css("display", 'none');
        $(this).find(".news-content .news-img").css("display", 'block');
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
            // if (alltol == 0) {
            //     alltol = json.data.total;
            //     var p = new Page({
            //         el: '#paging',
            //         nums: alltol, // 总数
            //         counts: pageSize, // 每页个数
            //         defaultPage: 1,
            //         showHeadFoot: !false, // 显示首页尾页
            //         head: '首页', // 更改首页文字
            //         foot: '尾页', // 更改尾页文字
            //         jumpToOrder: true, // 跳转到指定页
            //         showNowAndAll: false, // 当前页/共几页
            //         clickEvent: function (pageNo, _this) {
            //             getNewsList(pageNo, _pageSize)
            //             // console.log('点击' + currectPage + '页');
            //             // // console.log(p == _this); // true
            //             // // _this.pages = 20; //p.pages = 20; 重新设置总页数
            //             // _this.nums = 300; // p.nums = 300;重新设置总数据条数 ，和设置总页数 二选一
            //         }
            //     });
            // }
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
                    // <div class="news-desc">${n.contentDescription}</div>
                    tbBody_ +=
                        ` <li class="hvr-float">
                        <a href='/views/news/detail.html?id=${n.id}'>
                        <div class="news-content">
                            <div class="news-text">
                                <div class="news-date">${n.createDate}</div>
                                <div class="news-title">${n.contentTitle}</div>
                            </div>
                            <div class="news-desc">${n.contentDescription}</div>
                            <img class="news-img" src=${httpserver}${images_[0].path}
                                alt=${n.contentTitle} title=${n.contentTitle} />
                            <div class="flex-center more-icon">
                                <span class="detail-text">查看详情</span>
                                <img class="news-icon" data-activesrc="./images/index/section8/tb1.png" src="./images/index/section8/tb2.png"
                                alt="图标" title="图标" />
                            </div>
                        </div>
                        </a>
                    </li>`

                }

            });
            // 占位元素
            tbBody_ += ` <li class="temp"></li>`
            $("#tabsContent").append(tbBody_);
            funcHover();
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

// console.log('getUrlParam()', getUrlParam('id'))
// if (getUrlParam('id')) {
//     $('body,html').animate({scrollTop: $('#zixunTabs').offset().top}, 500);
//     id = getUrlParam('id')
//     $('#zixunTabs li').removeClass("active");
//     $("#zixunTabs li[data-id=" + id + "]").addClass("active");
//     getNewsList(pageNo, pageSize);
// } else {
    // 默认显示公司资讯
    console.log('pageNo',pageNo)
    console.log('pageSize',pageSize)
    getNewsList(pageNo, pageSize);
// }

// 资讯切换
$('#zixunTabs li').on('click', function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    id = $(this).data("id")
    pageNo = 1
    alltol = 0;
    getNewsList(1, pageSize);
    // $("#paging").empty();
})




