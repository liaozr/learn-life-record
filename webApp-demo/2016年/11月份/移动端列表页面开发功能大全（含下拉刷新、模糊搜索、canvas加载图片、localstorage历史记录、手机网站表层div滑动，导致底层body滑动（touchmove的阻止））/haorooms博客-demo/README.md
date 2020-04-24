## 移动端列表开发功能大全

这个案例主要总结了移动端开发一些经常用到的效果，例如，下拉分页，模糊搜索，搜索历史记录，已经导航菜单切换等功能。并运用了requirejs对代码进行压缩合并。案例中common.js
是不用require的情况下，封装的一个模糊搜索和下拉分页的函数。

## 搜索历史记录图片如下

搜索历史运用了localStorage进行数据的临时存储，关于localStorage的一些用法，我之前的一篇文章中也写过！
具体如下：[html5之Localstorage本地存储][3]

![搜索历史记录](https://raw.githubusercontent.com/confidence68/mobile_touchload_mohuSearch/master/images/history.jpg)


## 模糊搜索案例如下：

搜索中，我运用了正则进行替换，关于正则表达式的一些用法，我博客中之前写过很多，大家可以看[这个地址][4]

![模糊搜索](https://raw.githubusercontent.com/confidence68/mobile_touchload_mohuSearch/master/images/mohusearch.jpg)

## 菜单切换的案例如下：

在制作菜单切换中，我之前有文章也介绍过，感兴趣的可以看一下[手机网站表层div滑动，导致底层body滑动（touchmove的阻止）][5]

![菜单切换](https://raw.githubusercontent.com/confidence68/mobile_touchload_mohuSearch/master/images/menu.jpg)



## commonjs封装函数用法

下拉分页：

页面中指定下来分页的地址，下拉分页的ID，下来分页的pageData和回调函数就可以了。代码大体如下：

    var listObj={
        pagenumber:2,
        initList:function(){
            commonObj.moreUrl = "";//设置下拉分页url
            commonObj.appendId="";//设置下拉分页id
            //下滑分页数据
            commonObj.pageData={page:listObj.pagenumber,t:true};
            //下滑分页回调函数
            commonObj.searchCallBack=function(res){
                console.log(res);
                $(".loaddiv").hide();
                var dataLength=res.data.length;
                if(dataLength>0){
                    listObj.pagenumber++;
                    commonObj.ajaxstatus=true;
                    commonObj.pageData.page=listObj.pagenumber;
                    var htmlArray=[];
                    for(var i=0;i<dataLength;i++){
                        htmlArray[i]='<a class="shudongli"" href="'+res.data[i].sUrl+'">'+
                    '<div class="sdliinner">'+
                        '<div class="leftimage"><img src="'+res.data[i].sImageUrl+'" alt=""></div>'+
                        '<div class="rightcontent">'+
                           ' <p class="toptitle">'+res.data[i].sTitle+'</p>'+
                            '<p class="s_time">发布时间 '+res.data[i].iPublishTime+'</p>'+
                           '</div></div></a>';

                    }
                    $("#"+commonObj.appendId).append(htmlArray.join(""));
                }else{
                    commonObj.fenyestatus=false
                }
            }
            //下滑分页触发
            commonObj.scrollNextPage();

        }
    }
    $(listObj.initList)
	
下来分页就可以了！

## requirejs压缩合并代码

假如项目中你的依赖比较多，可以用requirejs。

关于reruirejs的压缩，可以看我之前的一篇博客文章：http://www.haorooms.com/post/requirejs_Optimizer_hbys

具体是[requirejs的Optimizer 对require项目的合并与压缩][1]



## canvas图片加载

这个案例中，图片初始化加载是异步用canvas渲染的。

关于canvas加载，我之前也写了一篇文章，感兴趣的可以去看一下[touchweb手机网站图片加载方法（canvas加载和延迟加载）][2]


[1]:http://www.haorooms.com/post/requirejs_Optimizer_hbys
[2]:http://www.haorooms.com/post/touchweb_canvas_lazyload
[3]:http://www.haorooms.com/post/html5_localstorage
[4]:http://www.haorooms.com/search?keyword=%E6%AD%A3%E5%88%99
[5]:http://www.haorooms.com/post/webapp_bodyslidebcdiv