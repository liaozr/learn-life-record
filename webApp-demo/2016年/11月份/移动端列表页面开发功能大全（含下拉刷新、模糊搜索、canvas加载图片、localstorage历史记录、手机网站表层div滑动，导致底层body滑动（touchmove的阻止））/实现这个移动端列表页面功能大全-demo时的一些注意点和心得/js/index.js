$(function(){


// -------------------------------------------------------------------------
                        //左右切换

                        var dwnum = parseInt($('.g-swiper').find(".current").index());
                        if (dwnum < 2) {
                                dwnum = 0
                        }
                        var swiper = new Swiper('#newhouseswip', {
                            slidesPerView: 2.5,
                            paginationClickable: true,
                            spaceBetween: 12,
                            initialSlide: dwnum,
                            freeModeMomentum: false,
                            freeMode: true
                        });
                        $(".swiper-container .swiper-slide").each(function(){
                            $(this).click(function(){
                              $(this).addClass("current").siblings().removeClass("current");
                              loadData();
                            })
                        })
// -------------------------------------------------------------------------
                         // 下拉刷新加载数据
                        var counter = 0;
                        // 每页展示4个
                        var num = 4;
                        var pageStart = 0,
                            pageEnd = 0;

                        // dropload
                        $('.g-news').dropload({
                            scrollArea: window,
                            loadDownFn: function(me) {
                                $.ajax({
                                    type: 'GET',
                                    url: './js/more.json',
                                    dataType: 'json',
                                    success: function(data) {
                                        var result = '';
                                        counter++;
                                        pageEnd = num * counter;
                                        pageStart = pageEnd - num;
                                        for (var i = pageStart; i < pageEnd; i++) {
                                            result += "<div class=\"flag flag-middle\"><div class=\"flag__item flag_img\"><div class=\"img-center\"><a href=" + data.lists[i].link + "><canvas data-src=" + data.lists[i].pic +"></canvas></a></div></div><div class=\"flag__item flag__item_body\"><div class=\"heading\"><a href=" + data.lists[i].link + ">" + data.lists[i].title + "</a></div><div class=\"p\">" + data.lists[i].date +
                                                "</div></div></div>";
                                            if ((i + 1) >= data.lists.length) {
                                                // 锁定
                                                me.lock();
                                                // 无数据
                                                me.noData();
                                                break;
                                            }
                                        }
                                        // 为了测试，延迟1秒加载
                                        setTimeout(function() {
                                            $('.m-news').append(result);
                                            // 每次数据加载完，必须重置
                                            me.resetload();
                                        }, 1000);
                                    },
                                    error: function(xhr, type) {
                                        alert('Ajax error!');
                                        // 即使加载出错，也得重置
                                        me.resetload();
                                    }
                                });
                            },
                            threshold : 50
                        });
// -----------------------------------------------------------------------
                        // 返回顶部的显示跟隐藏

                        $(window).scroll(function(){

                            // 一滚动就立马加载canvas图片
                            canvasload("mainsection");
                            var pageH = $(document).height()
                            var scrollT = $(window).scrollTop(); //滚动条top
                            var winheight = $(window).height();
                            if ( scrollT > winheight ) {

                                if ( $('#backtop').is(":hidden") ) {
                                    $('#backtop').fadeIn();
                                }
                            } 
                            else {
                                if($('#backtop').is(":visible")) {
                                    $('#backtop').fadeOut();
                                }
                            }
                        })
// ----------------------------------------------------------------------------- 
                       // 加载 canvas图片
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
// ----------------------------------------------------------------------------- 
                         // 回到顶部
                        $("#backtop").click(function(){
                             $("html,body").animate({
                                scrollTop: 0
                             },500)
                        })
// ----------------------------------------------------------------------------- 

                       // BgDiv遮罩层、弹出层

                       $('#BgDiv').bind("touchmove", function (e) {
                            e.preventDefault();
                       });
                       $("#BgDiv").on("click",cancelSelect);

                       function cancelSelect(){
                            $(".g-chose  ul li").each(function () {
                                if ( $(this).children().eq(1).hasClass("up") ) {
                                    $(this).children().eq(1).addClass("down").removeClass("up");
                                 }
                            })

                            $(".g-swiper .swiper-slide").each(function (index) {
                                if ($(this).hasClass("current")) {
                                     $(this).removeClass("current");
                                }
                            })

                            $(".choice_wrap ul").each(function () {
                                if ($(this).is(":visible")) {
                                    $(this).hide()
                                }
                            })
                            $('body').css("overflow", "visible");
                            $("#BgDiv").hide();
                            canvasload("mainsection");
                       }
 // ----------------------------------------------------------------------------- 
                      // 区域、价格、户型 选项区域开始  （弹出选项卡）。
                      var showornot=0;
                      $(".g-chose").on("click", "ul li",topSelect);

                      function topSelect () {
                        var classes = $(this).data("classes");
                        canvasload("mainsection");
                        if ( $(this).children().eq(1).hasClass("up") && $(this).children().eq(0).hasClass("current")) 
                        {
                            $(this).children().eq(1).addClass("down").removeClass("up");
                            $(this).children().eq(0).removeClass("current");
                            $("." + classes).slideUp(100);
                            $("#BgDiv").hide();
                            $(this).siblings().each(function () {
                                $(this).children().eq(0).removeClass("current");
                                $(this).children().eq(1).removeClass("up").addClass("down");
                                $("." + $(this).data("classes")).slideUp(100);
                                showornot = 0;
                            })
                        }
                        else 
                        {
                            $(this).children().eq(1).addClass("up").removeClass("down");
                            $(this).children().eq(0).addClass("current");
                            $("." + classes).slideDown(100);
                            $("#BgDiv").show();

                            $(this).siblings().each(function () {
                                $(this).children().eq(0).removeClass("current");
                                $(this).children().eq(1).removeClass("up").addClass("down");
                                $("." + $(this).data("classes")).slideUp(100);
                                showornot = 0;
                            })
                        }
                        setTimeout(yanchizx, 105);
                    }
                    // overflow的属性重要性 为visible才是
                    // 这里overflow 用除了visible的其他值后，dropload是会出现问题的，不会下拉刷新出数据的

                    // visible 默认值。内容不会被修剪，会呈现在元素框之外。

                    // hidden  内容会被修剪，并且其余内容是不可见的。
                    // scroll  内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
                    // auto    如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。

                    function yanchizx() {
                        $(".choice_wrap ul").each(function () {
                            if ($(this).is(":visible")) {
                                showornot = 1
                            }
                        })
                        if (showornot) {
                            $('body').css("overflow", "hidden");
                            console.log("aaaaaa")
                        } else {
                            $('body').css("overflow", "visible");
                            canvasload("mainsection");
                        }
                    }
// ----------------------------------------------------------------------------- 
                    
                    // jQuery 数据 - jQuery.data() 方法
                 
                    // 实例
                    // 向元素附加数据，然后取回该数据：

                    // $("#btn1").click(function(){
                    //   $("div").data("greeting", "Hello World");
                         //结果：<div data-greeting="Hello World"></div>
                    // });

                    // $("#btn2").click(function(){
                    //   alert($("div").data("greeting"));
                    // });
// ----------------------------------------------------------------------------- 
                    // 区域、价格、户型选项卡后出现的下拉列表选项的点击事件 以及 loadData 事件
                    $(".choice_wrap").on("click", "ul li",fliterSelect);

                    function fliterSelect() {
                        var htname = $(this).children().eq(0).html();
                        console.log(htname)
                        var changeid = $(this).parent().data("flag");
                        $("#" + changeid).children().eq(0).html(htname);

                        if ( $("#" + changeid).children().eq(1).hasClass("up") && $("#" + changeid).children().eq(0).hasClass("current") ) 
                        {
                            $("#" + changeid).children().eq(1).addClass("down").removeClass("up");
                            $("#" + changeid).children().eq(0).removeClass("current");
                        }

                        $(this).addClass("current").siblings().removeClass("current");
                        $(this).children().eq(0).addClass("current");
                        $(this).siblings().each(function () {
                            $(this).children().eq(0).removeClass("current");
                        })
                        $(this).parent().hide();
                        $('body').css("overflow", "visible");
                        $("#BgDiv").hide();

                        $(".swiper-slide").siblings().removeClass("current");
                        loadData();
                    }
                    function loadData () {
                        // $.trim(str)的作用是去掉字符串首尾空格
                        var iRegionID = $.trim($(".choice_wrap .region li.current").attr("regionid")) || 0;
                        var iPriceID = $.trim($(".choice_wrap .price li.current").attr("priceid")) || 0;
                        var iLayoutID = $.trim($(".choice_wrap .family li.current").attr("layoutid")) || 0;
                        var iFeatureID = $.trim($(".swiper-slide.current").attr("featureid")) || "";
                        var sKeyword = $.trim($("#search-input").val()) || "";

                        if (iFeatureID) {
                            iRegionID = 0;
                            iPriceID = 0;
                            iLayoutID = 0;
                            sKeyword = '';
                        }
                        //跳转地址
                        // 这个功能需要涉及到后台的数据
                        window.location = "/?iRegionID=" + iRegionID + "&iPriceID=" + iPriceID + "&iLayoutID=" + iLayoutID + "&sKeyword=" + sKeyword + "&iFeatureID=" + iFeatureID;
                    }
// -----------------------------------------------------------------------------  

                    //得到焦点时地图变为确认
                    $('#search-input').on('focus', function () {
                        $('.confirm').show();
                        $('.search-icon').hide();
                    });
                    //点击确认之后，确认变为地图找房
                    $('.confirm').on('click', function () {
                        $('.confirm').hide();
                        $('.search-icon').show();
                    });
// -----------------------------------------------------------------------------          
                    // 点击搜索按钮
                    $("#searchBtn").on("click", fliterSelect);

// ----------------------------------------------------------------------------- 
                     // 区域、价格、户型选项卡后出现的下拉列表选项的触摸事件 

                     $(".choice_wrap ul").bind("touchmove", function (e) {
                        var ulheight = $(this).height();
                        var scrollTop = $(this).scrollTop();
                        // scrollHeight 为实际高度
                        var scrollheight = $(this)[0].scrollHeight;
                        $(".choice_wrap").bind("touchstart", function (events) {
                            startX = events.originalEvent.changedTouches[0].pageX,
                            startY = events.originalEvent.changedTouches[0].pageY;
                        });
                        if (ulheight + scrollTop + 20 >= scrollheight) {
                            $(".choice_wrap").bind("touchmove", function (event) {
                                console.log("aaa")
                                moveEndX = event.originalEvent.changedTouches[0].pageX,
                                        moveEndY = event.originalEvent.changedTouches[0].pageY,
                                        theX = moveEndX - startX,
                                        theY = moveEndY - startY;
                                if (Math.abs(theY) > Math.abs(theX) && theY > 0) {
                                    $(".choice_wrap").unbind("touchmove");
                                }
                                if (Math.abs(theY) > Math.abs(theX) && theY < 0) {
                                    event.preventDefault();

                                }
                            })
                        }
                    });
// ----------------------------------------------------------------------------- 

                    $(".Gsearch").on("touchmove",function(e){
                          e.preventDefault();
                    });

                    $("#search-input").on("click",showSearchHis);
                    
                    function showSearchHis(){
                            $("#search_content").hide();
                            $(".Gsearch").show();
                            $("#his_content").show();
                            $("#search-input-focus").focus();
                            $("html,body").css({
                                'overflow':'hidden'
                            })

                            if( localStorage.getItem("historyString") )
                            {
                            var historyArray=localStorage.getItem("historyString").split(";");
                            historyArray.reverse();
                            if(historyArray.length>10){
                                var listnum=10
                            }
                            else{
                               var listnum= historyArray.length;
                            }
                            var listhistory=[];
                            for(var i=0;i<listnum;i++){
                                listhistory[i]='<li><a href="?iRegionID=0&iPriceID=0&iLayoutID=0&sKeyword='+historyArray[i]+'&iFeatureID=">'+historyArray[i]+'</a></li>';
                            }
                            $("#his_content").html(listhistory.join(""));
                         }
                    };

                    $(".search-return").on("click",'#closeGsearch',function(){
                         $(".Gsearch").hide();
                         $('.confirm').hide();
                         $('.search-icon').show();
                         $("html,body").css({
                                'overflow':'visible'
                         })
                    });
                    $(".header").on("click","#newsearchBtn",setHistoryData);
                    function setHistoryData(){
                            $("html,body").css({
                                'overflow':'visible'
                            })
                            if (localStorage.getItem("historyString")) 
                            {
                                var historyArray = localStorage.getItem("historyString").split(";");
                            } 
                            else {
                                var historyArray = []
                            }
                            if( $(this).data("content")=="confirmbtn")
                            {
                              var searchcontent = $("#search-input-focus").val();
                            }
                            else{
                               var searchcontent=$(this).data("name");
                            }
                            if ($.trim(searchcontent) != "") 
                            {
                                searchcontent=jsXss(searchcontent);
                                if ( historyArray.indexOf(searchcontent) != -1) 
                                {
                                    historyArray.splice(historyArray.indexOf(searchcontent), 1)
                                }
                                historyArray.push(searchcontent);
                                localStorage.setItem("historyString", historyArray.join(";"))
                            }
                            window.location.href = '?iRegionID=0&iPriceID=0&iLayoutID=0&sKeyword=' + searchcontent + '&iFeatureID=';
                    };
                    function jsXss(s){
                            { 
                            var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                            var rs = ""; 
                            for (var i = 0; i < s.length; i++) { 
                             rs = rs+s.substr(i, 1).replace(pattern, ''); 
                            }
                            return rs;
                            }  
                    }

                    document.getElementById('search-input-focus').addEventListener('input',mohuSearchData); 

                    function mohuSearchData(e){
                        $("html,body").css({
                                'overflow':'hidden'
                        })
                        $("#his_content").hide(); 
                        var skeyword=e.target.value;
                        console.dir(skeyword)
                        if($.trim(skeyword)!=""){
                            $.ajax({
                                url:"./js/more.json",//模糊搜索地址
                                type:"post",
                                dataType:"json",
                                data:{"keyword":skeyword},
                                success:function(res){
                                    // console.log(res);
                                    var listsearch=[];
                                    // var listnum=res.data.data.data.length;
                                    var listnum=res.lists.length;
                                    if(listnum>0){
                                        $("#search_content").show();
                                        for(var i=0;i<listnum;i++){
                                                var sLpAddr=res.lists[i].address;
                                                var sLpName=res.lists[i].title;
                                                var sLpAddrNew=sLpAddr.replace(eval("/("+skeyword+")/gi"),'<span class="red2">$1</span>');
                                                var sLpNameNew=sLpName.replace(eval("/("+skeyword+")/gi"),'<span class="red2">$1</span>');
                                                if(sLpAddrNew.indexOf("span") > 0 || sLpNameNew.indexOf("span") > 0  )
                                                {
                                                    listsearch[i]=' <li data-name='+sLpName+'><a href="?iRegionID=0&iPriceID=0&iLayoutID=0&sKeyword='+sLpName+'&iFeatureID=">'+
                                            '<p class="sptitle">'+sLpNameNew+'</p>'+
                                            '<p class="spaddress ptf2">'+sLpAddrNew+'</p>'+
                                             '</a></li>'
                                                }
                                        }
                                        $("#search_content").html(listsearch.join(""));
                                    }
                                    else{
                                       $("#search_content").hide();  
                                    }
                                },
                                error:function(res){
                                     console.dir(res);
                                }
                            })
                        }
                        else{
                            $("#search_content").hide(); 
                        }
                    }

                    $("#search_content").on("click","li",setHistoryData);
})