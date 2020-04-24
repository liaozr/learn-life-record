<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link type="text/css" rel="stylesheet" href="/yhWeb/Public/Home/Css/style.css"/>
    <!--[if IE 6]>
    <script src="/yhWeb/Public/Home/Js/iepng.js" type="text/javascript"></script>
    <script type="text/javascript">
        EvPNG.fix('div, ul, img, li, input, a');
    </script>
    <![endif]-->
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/jquery-1.11.1.min_044d0927.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/jquery.bxslider_e88acd1b.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/menu.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/select.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/lrscroll.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/iban.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/fban.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/f_ban.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/mban.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/bban.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/hban.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/tban.js"></script>
    <script type="text/javascript" src="/yhWeb/Public/Home/Js/lrscroll_1.js"></script>
    <title>尤洪</title>
</head>
<body>
<!--Begin Header Begin-->
<div class="soubg">
    <div class="sou">
        <!--Begin 所在收货地区 Begin-->
    	<span class="s_city_b">
        	<span class="fl">送货至：</span>
            <span class="s_city">
            	<span>四川</span>
                <div class="s_city_bg">
                    <div class="s_city_t"></div>
                    <div class="s_city_c">
                        <h2>请选择所在的收货地区</h2>
                        <table border="0" class="c_tab" style="width:235px; margin-top:10px;" cellspacing="0" cellpadding="0">
                            <tr>
                                <th>A</th>
                                <td class="c_h"><span>安徽</span><span>澳门</span></td>
                            </tr>
                            <tr>
                                <th>B</th>
                                <td class="c_h"><span>北京</span></td>
                            </tr>
                            <tr>
                                <th>C</th>
                                <td class="c_h"><span>重庆</span></td>
                            </tr>
                            <tr>
                                <th>F</th>
                                <td class="c_h"><span>福建</span></td>
                            </tr>
                            <tr>
                                <th>G</th>
                                <td class="c_h"><span>广东</span><span>广西</span><span>贵州</span><span>甘肃</span></td>
                            </tr>
                            <tr>
                                <th>H</th>
                                <td class="c_h"><span>河北</span><span>河南</span><span>黑龙江</span><span>海南</span><span>湖北</span><span>湖南</span></td>
                            </tr>
                            <tr>
                                <th>J</th>
                                <td class="c_h"><span>江苏</span><span>吉林</span><span>江西</span></td>
                            </tr>
                            <tr>
                                <th>L</th>
                                <td class="c_h"><span>辽宁</span></td>
                            </tr>
                            <tr>
                                <th>N</th>
                                <td class="c_h"><span>内蒙古</span><span>宁夏</span></td>
                            </tr>
                            <tr>
                                <th>Q</th>
                                <td class="c_h"><span>青海</span></td>
                            </tr>
                            <tr>
                                <th>S</th>
                                <td class="c_h"><span>上海</span><span>山东</span><span>山西</span><span class="c_check">四川</span><span>陕西</span></td>
                            </tr>
                            <tr>
                                <th>T</th>
                                <td class="c_h"><span>台湾</span><span>天津</span></td>
                            </tr>
                            <tr>
                                <th>X</th>
                                <td class="c_h"><span>西藏</span><span>香港</span><span>新疆</span></td>
                            </tr>
                            <tr>
                                <th>Y</th>
                                <td class="c_h"><span>云南</span></td>
                            </tr>
                            <tr>
                                <th>Z</th>
                                <td class="c_h"><span>浙江</span></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </span>
        </span>
        <!--End 所在收货地区 End-->
        <span class="fr">
        	      <?php if(empty($_SESSION['userName'])): ?><span class="fl">你好，请<a href="/yhWeb/Home/User/Login">登录</a>&nbsp; <a href="/yhWeb/Home/User/Regist" style="color:#ff4e00;">免费注册</a></span>
                      <?php else: ?>
                      <span class="fl">你好，<?php echo (session('userName')); ?>&nbsp;|&nbsp;<a href="/yhWeb/Home/User/LoginOut">退出</a>&nbsp;              |&nbsp;<a href="/yhWeb/Home/Member/Member_Order">我的订单</a>&nbsp;|</span><?php endif; ?>
        	<span class="ss">
            	<div class="ss_list">
                    <a href="#">收藏夹</a>
                    <div class="ss_list_bg">
                        <div class="s_city_t"></div>
                        <div class="ss_list_c">
                            <ul>
                                <li><a href="#">我的收藏夹</a></li>
                                <li><a href="#">我的收藏夹</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ss_list">
                    <a href="#">客户服务</a>
                    <div class="ss_list_bg">
                        <div class="s_city_t"></div>
                        <div class="ss_list_c">
                            <ul>
                                <li><a href="#">客户服务</a></li>
                                <li><a href="#">客户服务</a></li>
                                <li><a href="#">客户服务</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ss_list">
                    <a href="#">网站导航</a>
                    <div class="ss_list_bg">
                        <div class="s_city_t"></div>
                        <div class="ss_list_c">
                            <ul>
                                <li><a href="#">网站导航</a></li>
                                <li><a href="#">网站导航</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </span>
            <span class="fl">|&nbsp;关注我们：</span>
            <span class="s_sh"><a href="#" class="sh1">新浪</a><a href="#" class="sh2">微信</a></span>
            <span class="fr">|&nbsp;<a href="#">手机版&nbsp;<img src="/yhWeb/Public/Home/Images/s_tel.png" align="absmiddle"/></a></span>
        </span>
    </div>
</div>
<div class="top">
    <div class="logo"><a href="Index.html"><img src="/yhWeb/Public/Home/Images/logo.png"/></a></div>
    <div class="search">
        <form method="post" action="/yhWeb/Home/CategoryList/search">
            <input type="text" value="" class="s_ipt" name="search"/>
            <input type="submit" value="搜索" class="s_btn"/>
        </form>
        <span class="fl"><a href="#">咖啡</a><a href="#">iphone 6S</a><a href="#">新鲜美食</a><a href="#">蛋糕</a><a href="#">日用品</a><a href="#">连衣裙</a></span>
    </div>
    <div class="i_car">
        <div class="car_t">购物车 [ <span id="typenum"><?php if(!empty($_SESSION['userId'])): echo ($_SESSION['cart']['typenum']); ?>
            <?php else: ?>
            0<?php endif; ?></span> ]
        </div>
        <div class="car_bg">
            <!--Begin 购物车未登录 Begin-->
            <?php if(empty($_SESSION['userId'])): ?><div class="un_login">还未登录！<a href="/yhWeb/Home/User/Login" style="color:#ff4e00;">马上登录</a> 查看购物车！</div>
                <!--End 购物车未登录 End-->
                <?php else: ?>
                <!--Begin 购物车已登录 Begin-->
                <?php if(empty($_SESSION['cart']['goods'])): ?><div class="un_login">购物车里空空如也~</div>
                    <?php else: ?>
                    <ul class="cars">
                        <?php if(is_array($_SESSION['cart']['goods'])): $i = 0; $__LIST__ = $_SESSION['cart']['goods'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><li>
                                <div class="img"><a href="#"><img src="/yhWeb/Public/Uploads/<?php echo ($goods["picName"]); ?>" width="58" height="58"/></a></div>
                                <div class="name"><a href="#"><?php echo ($goods["goodsName"]); ?></a></div>
                                <div class="price" id="<?php echo ($goods["id"]); ?>"><font color="#ff4e00">￥<?php echo ($goods["price"]); ?></font> X<?php echo ($goods["number"]); ?></div>
                                <button class="cartdel" cartid="<?php echo ($goods["id"]); ?>">删除</button>
                            </li><?php endforeach; endif; else: echo "" ;endif; ?>
                    </ul>
                    <div class="price_sum">共计&nbsp; <font color="#ff4e00">￥</font><span id="total"><?php echo ($_SESSION['cart']['total']); ?></span></div>
                    <div class="price_a"><a href="/yhWeb/Home/BuyCar/index">去购物车结算</a></div><?php endif; ?>
                <!--End 购物车已登录 End--><?php endif; ?>
        </div>
    </div>
</div>
<script>
    $(function () {
        $('.cartdel').click(function () {
            $(this).parent().remove()
            $.post('/yhWeb/Home/BuyCar/cartDel', {id: $(this).attr('cartid')}, function (data) {
                $('#typenum').text(data.typenum)
                if ($('.cars li').length <= 0) {
                    $('.car_bg').html('<div class="un_login">购物车里空空如也~</div>');
                }
                else {
                    $('#total').text(data.total)
                }
            }, 'json')
        })
    })
</script>
<!--End Header End-->
<!--Begin Menu Begin-->
<div class="menu_bg">
    <div class="menu">
        <!--Begin 商品分类详情 Begin-->
        <div class="nav">
            <div class="nav_t">全部商品分类</div>
            <div class="leftNav">
                <ul>
                    <?php if(is_array($_SESSION['typerows'])): $i = 0; $__LIST__ = $_SESSION['typerows'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typeone): $mod = ($i % 2 );++$i;?><li>
                            <div class="fj">
                                <span class="n_img"><span></span><img src="/yhWeb/Public/Home/Images/<?php echo ($typeone["one"]["icon"]); ?>"/></span>
                                <span class="fl"><a href="/yhWeb/Home/Category/index?id=<?php echo ($typeone["one"]["id"]); ?>"><?php echo ($typeone["one"]["name"]); ?></a></span>
                            </div>
                            <div class="zj">
                                <div class="zj_l">
                                    <?php if(is_array($typeone["two"])): $i = 0; $__LIST__ = $typeone["two"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typetwo): $mod = ($i % 2 );++$i;?><div class="zj_l_c">
                                            <h2><a href="/yhWeb/Home/CategoryList/index/typeid/<?php echo ($typetwo["id"]); ?>"><?php echo ($typetwo["name"]); ?></a></h2>
                                            <?php if(is_array($typetwo["three"])): $i = 0; $__LIST__ = $typetwo["three"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typethree): $mod = ($i % 2 );++$i;?><a href="/yhWeb/Home/CategoryList/index/typeid/<?php echo ($typethree["id"]); ?>"><?php echo ($typethree["name"]); ?></a>|<?php endforeach; endif; else: echo "" ;endif; ?>
                                        </div><?php endforeach; endif; else: echo "" ;endif; ?>
                                </div>
                            </div>
                        </li><?php endforeach; endif; else: echo "" ;endif; ?>
                </ul>
            </div>
        </div>
        <!--End 商品分类详情 End-->
        <ul class="menu_r">
            <li><a href="/yhWeb/Home/Index">首页</a></li>
            <li><a href="/yhWeb/Home/Category/Index/id/1">美食</a></li>
            <li><a href="/yhWeb/Home/Category/Index/id/23">生鲜</a></li>
            <li><a href="/yhWeb/Home/Category/Index/id/28">家居</a></li>
            <li><a href="/yhWeb/Home/Category/Index/id/27">女装</a></li>
            <li><a href="/yhWeb/Home/Category/Index/id/24">美妆</a></li>
            <li><a href="/yhWeb/Home/Category/Index/id/25">数码</a></li>
        </ul>
        <div class="m_ad">中秋送好礼！</div>
    </div>
</div>
<!--End Menu End-->
<div class="i_bg bg_color">
    <div class="i_ban_bg">
        <!--Begin Banner Begin-->
        <div class="banner">
            <div class="top_slide_wrap">
                <ul class="slide_box bxslider">
                    <li><img src="/yhWeb/Public/Home/Images/ban1.jpg" width="740" height="401"/></li>
                    <li><img src="/yhWeb/Public/Home/Images/ban2.jpg" width="740" height="401"/></li>
                    <li><img src="/yhWeb/Public/Home/Images/ban3.jpg" width="740" height="401"/></li>
                </ul>
                <div class="op_btns clearfix">
                    <a href="#" class="op_btn op_prev"><span></span></a>
                    <a href="#" class="op_btn op_next"><span></span></a>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            var jq = jQuery.noConflict();
            (function () {
                $(".bxslider").bxSlider({
                    auto: true,
                    prevSelector: jq(".top_slide_wrap .op_prev")[0], nextSelector: jq(".top_slide_wrap .op_next")[0]
                });
            })();
        </script>
        <!--End Banner End-->
        <div class="inews">
            <div class="news_t">
                <span class="fr"><a href="#">更多 ></a></span>新闻资讯
            </div>
            <ul>
                <li><span>[ 特惠 ]</span><a href="#">掬一轮明月 表无尽惦念</a></li>
                <li><span>[ 公告 ]</span><a href="#">好奇金装成长裤新品上市</a></li>
                <li><span>[ 特惠 ]</span><a href="#">大牌闪购 · 抢！</a></li>
                <li><span>[ 公告 ]</span><a href="#">发福利 买车就抢千元油卡</a></li>
                <li><span>[ 公告 ]</span><a href="#">家电低至五折</a></li>
            </ul>
            <div class="charge_t">
                话费充值
                <div class="ch_t_icon"></div>
            </div>
            <form>
                <table border="0" style="width:205px; margin-top:10px;" cellspacing="0" cellpadding="0">
                    <tr height="35">
                        <td width="33">号码</td>
                        <td><input type="text" value="" class="c_ipt"/></td>
                    </tr>
                    <tr height="35">
                        <td>面值</td>
                        <td>
                            <select class="jj" name="city">
                                <option value="0" selected="selected">100元</option>
                                <option value="1">50元</option>
                                <option value="2">30元</option>
                                <option value="3">20元</option>
                                <option value="4">10元</option>
                            </select>
                            <span style="color:#ff4e00; font-size:14px;">￥99.5</span>
                        </td>
                    </tr>
                    <tr height="35">
                        <td colspan="2"><input type="submit" value="立即充值" class="c_btn"/></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
    <!--Begin 热门商品 Begin-->
    <div class="content mar_10">
        <div class="h_l_img">
            <div class="img"><a href="/yhWeb/Home/Index/Product"><img src="/yhWeb/Public/Home/Images/l_img.jpg" width="188" height="188"/></a></div>
            <div class="pri_bg">
                <span class="price fl">￥53.00</span>
                <span class="fr">16R</span>
            </div>
        </div>
        <div class="hot_pro">
            <div id="featureContainer">
                <div id="feature">
                    <div id="block">
                        <div id="botton-scroll">
                            <ul class="featureUL">
                                <?php if(is_array($hotgoods)): $i = 0; $__LIST__ = $hotgoods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$hotgoods): $mod = ($i % 2 );++$i;?><li class="featureBox">
                                        <div class="box">
                                            <div class="h_icon"><img src="/yhWeb/Public/Home/Images/hot.png" width="50" height="50"/></div>
                                            <div class="imgbg">
                                                <a href="/yhWeb/Home/Product/index/id/<?php echo ($hotgoods['id']); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($hotgoods['picName']); ?>" width="160" height="136"/></a>
                                            </div>
                                            <div class="name">
                                                <a href="/yhWeb/Home/Product/index/id/<?php echo ($hotgoods['id']); ?>">
                                                    <h2><?php echo ($hotgoods['goodsName']); ?></h2>
                                                    <?php echo ($hotgoods['descr']); ?>
                                                </a>
                                            </div>
                                            <div class="price">
                                                <font>￥<span><?php echo ($hotgoods['price']); ?></span></font> &nbsp;
                                            </div>
                                        </div>
                                    </li><?php endforeach; endif; else: echo "" ;endif; ?>
                            </ul>
                        </div>
                    </div>
                    <a class="h_prev" href="javascript:void();">Previous</a>
                    <a class="h_next" href="javascript:void();">Next</a>
                </div>
            </div>
        </div>
    </div>
    <!--Begin 限时特卖 Begin-->
    <div class="i_t mar_10">
        <span class="fl">限时特卖</span>
        <span class="i_mores fr"><a href="#">更多</a></span>
    </div>
    <div class="content">
        <div class="i_sell">
            <div id="imgPlay">
                <ul class="imgs" id="actor">
                    <li><a href="#"><img src="/yhWeb/Public/Home/Images/tm_r.jpg" width="211" height="357"/></a></li>
                    <li><a href="#"><img src="/yhWeb/Public/Home/Images/tm_r.jpg" width="211" height="357"/></a></li>
                    <li><a href="#"><img src="/yhWeb/Public/Home/Images/tm_r.jpg" width="211" height="357"/></a></li>
                </ul>
                <div class="previ">上一张</div>
                <div class="nexti">下一张</div>
            </div>
        </div>
        <div class="sell_right">
            <?php if(!empty($limit[0][0])): ?><div class="sell_1">
                    <div class="s_img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($limit[0][0]["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($limit[0][0]["picName"]); ?>" width="185" height="155"/></a></div>
                    <div class="s_price">￥<span><?php echo ($limit[0][0]["price"]); ?></span></div>
                    <div class="s_name">
                        <h2><a href="#"><?php echo ($limit[0][0]["goodsName"]); ?></a></h2>
                    </div>
                </div><?php endif; ?>
            <?php if(!empty($limit[0][1])): ?><div class="sell_2">
                    <div class="s_img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($limit[0][1]["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($limit[0][1]["picName"]); ?>" width="185" height="155"/></a></div>
                    <div class="s_price">￥<span><?php echo ($limit[0][1]["price"]); ?></span></div>
                    <div class="s_name">
                        <h2><a href="#"><?php echo ($limit[0][1]["goodsName"]); ?></a></h2>
                    </div>
                </div><?php endif; ?>
            <?php if(!empty($limit[1][0])): ?><div class="sell_b1">
                    <div class="sb_img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($limit[1][0]["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($limit[1][0]["picPure"]); ?>" width="242" height="356"/></a></div>
                    <div class="s_name">
                        <h2><a href="#"><?php echo ($limit[1][0]["goodsName"]); ?></a></h2>
                    </div>
                </div><?php endif; ?>
            <!--<div class="sell_3">-->
            <!--<div class="s_img"><a href="#"><img src="/yhWeb/Public/Home/Images/tm_3.jpg" width="185" height="155" /></a></div>-->
            <!--<div class="s_price">￥<span>289</span></div>-->
            <!--<div class="s_name">-->
            <!--<h2><a href="#">迪奥香水</a></h2>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="sell_4">-->
            <!--<div class="s_img"><a href="#"><img src="/yhWeb/Public/Home/Images/tm_4.jpg" width="185" height="155" /></a></div>-->
            <!--<div class="s_price">￥<span>289</span></div>-->
            <!--<div class="s_name">-->
            <!--<h2><a href="#">美妆</a></h2>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="sell_b2">-->
            <!--<div class="sb_img"><a href="#"><img src="/yhWeb/Public/Uploads/<?php echo ($limit[5]["picName"]); ?>" width="242" height="356" /></a></div>-->
            <!--<div class="s_name">-->
            <!--<h2><a href="#"><?php echo ($limit[5]["name"]); ?></a></h2>-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>
    <!--End 限时特卖 End-->
    <div class="content mar_20">
        <img src="/yhWeb/Public/Home/Images/mban_1.jpg" width="1200" height="110"/>
    </div>
    <!--Begin 食品饮料 Begin-->
    <div class="i_t mar_10">
        <span class="floor_num">1F</span>
        <span class="fl">食品饮料</span>
        <span class="i_mores fr"><a href="#">礼盒糖果</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">休闲零食</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">饼干糕点</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">蜜饯</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">坚果</a></span>
    </div>
    <div class="content">
        <div class="food_left">
            <div class="food_ban">
                <div id="imgPlay2">
                    <ul class="imgs" id="actor2">
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/food_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/food_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/food_r.jpg" width="211" height="286"/></a></li>
                    </ul>
                    <div class="prev_f">上一张</div>
                    <div class="next_f">下一张</div>
                </div>
            </div>
            <div class="fresh_txt">
                <div class="fresh_txt_c">
                    <?php if(is_array($_SESSION['typerows'])): $i = 0; $__LIST__ = $_SESSION['typerows'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typeone): $mod = ($i % 2 );++$i; if(($key) == "0"): if(is_array($typeone["two"])): $i = 0; $__LIST__ = $typeone["two"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$type): $mod = ($i % 2 );++$i;?><a href="#"><?php echo ($type["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
        </div>
        <div class="fresh_mid">
            <ul>
                <?php if(is_array($showGoods)): $i = 0; $__LIST__ = $showGoods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i; if(($key) == "1"): if(is_array($goods)): $i = 0; $__LIST__ = $goods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><li>
                                <div class="name"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><?php echo ($goods["goodsName"]); ?></a></div>
                                <div class="price">
                                    <font>￥<span><?php echo ($goods["price"]); ?></span></font> &nbsp; 25R
                                </div>
                                <div class="img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($goods["picName"]); ?>" width="185" height="155"/></a></div>
                            </li><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
        <div class="fresh_right">
            <ul>
                <li><a href="#" target="_blank"><img src="/yhWeb/Public/Home/Images/food_b1.jpg" width="260" height="220" border="0"></a></li>
                <li><a href="#" target="_blank"><img src="/yhWeb/Public/Home/Images/food_b2.jpg" width="260" height="220" border="0"></a></li>
            </ul>
        </div>
    </div>
    <!--End 食品饮料 End-->
    <!--Begin 进口 生鲜Begin  <b>·</b>-->
    <div class="i_t mar_10">
        <span class="floor_num">2F</span>
        <span class="fl">进口生鲜</span>
        <span class="i_mores fr"><a href="#">进口咖啡</a>&nbsp; &nbsp; &nbsp; <a href="#">进口酒</a>&nbsp; &nbsp; &nbsp; <a href="#">进口母婴</a>&nbsp; &nbsp; &nbsp; <a href="#">新鲜蔬菜</a>&nbsp; &nbsp; &nbsp; <a href="#">新鲜水果</a></span>
    </div>
    <div class="content">
        <div class="fresh_left">
            <div class="fre_ban">
                <div id="imgPlay1">
                    <ul class="imgs" id="actor1">
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/fre_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/fre_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/fre_r.jpg" width="211" height="286"/></a></li>
                    </ul>
                    <div class="prevf">上一张</div>
                    <div class="nextf">下一张</div>
                </div>
            </div>
            <div class="fresh_txt">
                <div class="fresh_txt_c">
                    <?php if(is_array($_SESSION['typerows'])): $i = 0; $__LIST__ = $_SESSION['typerows'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typeone): $mod = ($i % 2 );++$i; if(($key) == "1"): if(is_array($typeone["two"])): $i = 0; $__LIST__ = $typeone["two"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$type): $mod = ($i % 2 );++$i;?><a href="#"><?php echo ($type["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
        </div>
        <div class="fresh_mid">
            <ul>
                <?php if(is_array($showGoods)): $i = 0; $__LIST__ = $showGoods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i; if(($key) == "23"): if(is_array($goods)): $i = 0; $__LIST__ = $goods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><li>
                                <div class="name"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><?php echo ($goods["goodsName"]); ?></a></div>
                                <div class="price">
                                    <font>￥<span><?php echo ($goods["price"]); ?></span></font> &nbsp; 25R
                                </div>
                                <div class="img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($goods["picName"]); ?>" width="185" height="155"/></a></div>
                            </li><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
        <div class="fresh_right">
            <ul>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/fre_b1.jpg" width="260" height="220"/></a></li>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/fre_b2.jpg" width="260" height="220"/></a></li>
            </ul>
        </div>
    </div>

    <!--End 进口 生鲜 End-->
    <!--Begin 个人美妆 Begin-->
    <div class="i_t mar_10">
        <span class="floor_num">3F</span>
        <span class="fl">个人美妆</span>
        <span class="i_mores fr"><a href="#">洗发护发</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">面膜</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">洗面奶</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">香水</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">沐浴露</a></span>
    </div>
    <div class="content">
        <div class="make_left">
            <div class="make_ban">
                <div id="imgPlay3">
                    <ul class="imgs" id="actor3">
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/make_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/make_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/make_r.jpg" width="211" height="286"/></a></li>
                    </ul>
                    <div class="prev_m">上一张</div>
                    <div class="next_m">下一张</div>
                </div>
            </div>
            <div class="fresh_txt">
                <div class="fresh_txt_c">
                    <?php if(is_array($_SESSION['typerows'])): $i = 0; $__LIST__ = $_SESSION['typerows'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typeone): $mod = ($i % 2 );++$i; if(($key) == "2"): if(is_array($typeone["two"])): $i = 0; $__LIST__ = $typeone["two"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$type): $mod = ($i % 2 );++$i;?><a href="#"><?php echo ($type["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
        </div>
        <div class="fresh_mid">
            <ul>
                <?php if(is_array($showGoods)): $i = 0; $__LIST__ = $showGoods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i; if(($key) == "24"): if(is_array($goods)): $i = 0; $__LIST__ = $goods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><li>
                                <div class="name"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><?php echo ($goods["goodsName"]); ?></a></div>
                                <div class="price">
                                    <font>￥<span><?php echo ($goods["price"]); ?></span></font> &nbsp;
                                </div>
                                <div class="img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($goods["picName"]); ?>" width="185" height="155"/></a></div>
                            </li><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
        <div class="fresh_right">
            <ul>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/make_b1.jpg" width="260" height="220"/></a></li>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/make_b2.jpg" width="260" height="220"/></a></li>
            </ul>
        </div>
    </div>
    <!--End 个人美妆 End-->
    <div class="content mar_20">
        <img src="/yhWeb/Public/Home/Images/mban_1.jpg" width="1200" height="110"/>
    </div>
    <!--Begin 母婴玩具 Begin-->
    <div class="i_t mar_10">
        <span class="floor_num">4F</span>
        <span class="fl">母婴玩具</span>
        <span class="i_mores fr"><a href="#">营养品</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">孕妈背带裤</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">儿童玩具</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">婴儿床</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">喂奶器</a></span>
    </div>
    <div class="content">
        <div class="baby_left">
            <div class="baby_ban">
                <div id="imgPlay4">
                    <ul class="imgs" id="actor4">
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/baby_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/baby_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/baby_r.jpg" width="211" height="286"/></a></li>
                    </ul>
                    <div class="prev_b">上一张</div>
                    <div class="next_b">下一张</div>
                </div>
            </div>
            <div class="fresh_txt">
                <div class="fresh_txt_c">
                    <?php if(is_array($_SESSION['typerows'])): $i = 0; $__LIST__ = $_SESSION['typerows'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typeone): $mod = ($i % 2 );++$i; if(($key) == "4"): if(is_array($typeone["two"])): $i = 0; $__LIST__ = $typeone["two"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$type): $mod = ($i % 2 );++$i;?><a href="#"><?php echo ($type["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
        </div>
        <div class="fresh_mid">
            <ul>
                <?php if(is_array($showGoods)): $i = 0; $__LIST__ = $showGoods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i; if(($key) == "26"): if(is_array($goods)): $i = 0; $__LIST__ = $goods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><li>
                                <div class="name"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><?php echo ($goods["goodsName"]); ?></a></div>
                                <div class="price">
                                    <font>￥<span><?php echo ($goods["price"]); ?></span></font> &nbsp; 25R
                                </div>
                                <div class="img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($goods["picName"]); ?>" width="185" height="155"/></a></div>
                            </li><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
        <div class="fresh_right">
            <ul>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/baby_b1.jpg" width="260" height="220"/></a></li>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/baby_b2.jpg" width="260" height="220"/></a></li>
            </ul>
        </div>
    </div>
    <!--End 母婴玩具 End-->
    <!--Begin 家居生活 Begin-->
    <div class="i_t mar_10">
        <span class="floor_num">5F</span>
        <span class="fl">家居生活</span>
        <span class="i_mores fr"><a href="#">床上用品</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">家纺布艺</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">餐具</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">沙发</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">汽车用品</a></span>
    </div>
    <div class="content">
        <div class="home_left">
            <div class="home_ban">
                <div id="imgPlay5">
                    <ul class="imgs" id="actor5">
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/home_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/home_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/home_r.jpg" width="211" height="286"/></a></li>
                    </ul>
                    <div class="prev_h">上一张</div>
                    <div class="next_h">下一张</div>
                </div>
            </div>
            <div class="fresh_txt">
                <div class="fresh_txt_c">
                    <?php if(is_array($_SESSION['typerows'])): $i = 0; $__LIST__ = $_SESSION['typerows'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typeone): $mod = ($i % 2 );++$i; if(($key) == "6"): if(is_array($typeone["two"])): $i = 0; $__LIST__ = $typeone["two"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$type): $mod = ($i % 2 );++$i;?><a href="#"><?php echo ($type["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
        </div>
        <div class="fresh_mid">
            <ul>
                <?php if(is_array($showGoods)): $i = 0; $__LIST__ = $showGoods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i; if(($key) == "28"): if(is_array($goods)): $i = 0; $__LIST__ = $goods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><li>
                                <div class="name"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><?php echo ($goods["goodsName"]); ?></a></div>
                                <div class="price">
                                    <font>￥<span><?php echo ($goods["price"]); ?></span></font> &nbsp; 25R
                                </div>
                                <div class="img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($goods["picName"]); ?>" width="185" height="155"/></a></div>
                            </li><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
        <div class="fresh_right">
            <ul>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/home_b1.jpg" width="260" height="220"/></a></li>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/home_b2.jpg" width="260" height="220"/></a></li>
            </ul>
        </div>
    </div>
    <!--End 家居生活 End-->
    <!--Begin 手机数码 Begin-->
    <div class="i_t mar_10">
        <span class="floor_num">6F</span>
        <span class="fl">手机数码</span>
        <span class="i_mores fr"><a href="#">手机</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">苹果</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">华为手机</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">洗衣机</a>&nbsp; &nbsp; | &nbsp; &nbsp;<a href="#">数码配件</a></span>
    </div>
    <div class="content">
        <div class="tel_left">
            <div class="tel_ban">
                <div id="imgPlay6">
                    <ul class="imgs" id="actor6">
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/tel_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/tel_r.jpg" width="211" height="286"/></a></li>
                        <li><a href="#"><img src="/yhWeb/Public/Home/Images/tel_r.jpg" width="211" height="286"/></a></li>
                    </ul>
                    <div class="prev_t">上一张</div>
                    <div class="next_t">下一张</div>
                </div>
            </div>
            <div class="fresh_txt">
                <div class="fresh_txt_c">
                    <?php if(is_array($_SESSION['typerows'])): $i = 0; $__LIST__ = $_SESSION['typerows'];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$typeone): $mod = ($i % 2 );++$i; if(($key) == "3"): if(is_array($typeone["two"])): $i = 0; $__LIST__ = $typeone["two"];if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$type): $mod = ($i % 2 );++$i;?><a href="#"><?php echo ($type["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
                </div>
            </div>
        </div>
        <div class="fresh_mid">
            <ul>
                <?php if(is_array($showGoods)): $i = 0; $__LIST__ = $showGoods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i; if(($key) == "25"): if(is_array($goods)): $i = 0; $__LIST__ = $goods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><li>
                                <div class="name"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><?php echo ($goods["goodsName"]); ?></a></div>
                                <div class="price">
                                    <font>￥<span><?php echo ($goods["price"]); ?></span></font> &nbsp; 25R
                                </div>
                                <div class="img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($goods["picName"]); ?>" width="185" height="155"/></a></div>
                            </li><?php endforeach; endif; else: echo "" ;endif; endif; endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
        <div class="fresh_right">
            <ul>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/tel_b1.jpg" width="260" height="220"/></a></li>
                <li><a href="#"><img src="/yhWeb/Public/Home/Images/tel_b2.jpg" width="260" height="220"/></a></li>
            </ul>
        </div>
    </div>
    <!--End 数码家电 End-->
    <!--Begin 猜你喜欢 Begin-->
    <div class="i_t mar_10">
        <span class="fl">猜你喜欢</span>
    </div>
    <div class="like">
        <div id="featureContainer1">
            <div id="feature1">
                <div id="block1">
                    <div id="botton-scroll1">
                        <ul class="featureUL">
                            <?php if(is_array($youlike)): $i = 0; $__LIST__ = $youlike;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$feature): $mod = ($i % 2 );++$i;?><li class="featureBox">
                                    <div class="box">
                                        <div class="imgbg">
                                            <a href="#"><img src="/yhWeb/Public/Uploads/<?php echo ($feature["picName"]); ?>" width="160" height="136"/></a>
                                        </div>
                                        <div class="name">
                                            <a href="#">
                                                <h2><?php echo ($feature["goodsName"]); ?></h2>
                                                <?php echo ($feature["descr"]); ?>
                                            </a>
                                        </div>
                                        <div class="price">
                                            <font>￥<span><?php echo ($feature["price"]); ?></span></font> &nbsp;
                                        </div>
                                    </div>
                                </li><?php endforeach; endif; else: echo "" ;endif; ?>
                        </ul>
                    </div>
                </div>
                <a class="l_prev" href="javascript:void();">Previous</a>
                <a class="l_next" href="javascript:void();">Next</a>
            </div>
        </div>
    </div>
    <!--End 猜你喜欢 End-->
    <!--Begin Footer Begin -->
<div class="b_btm_bg b_btm_c">
    <div class="b_btm">
        <table border="0" style="width:210px; height:62px; float:left; margin-left:75px; margin-top:30px;" cellspacing="0" cellpadding="0">
            <tr>
                <td width="72"><img src="/yhWeb/Public/Home/images/b1.png" width="62" height="62"/></td>
                <td><h2>正品保障</h2>正品行货 放心购买</td>
            </tr>
        </table>
        <table border="0" style="width:210px; height:62px; float:left; margin-left:75px; margin-top:30px;" cellspacing="0" cellpadding="0">
            <tr>
                <td width="72"><img src="/yhWeb/Public/Home/images/b2.png" width="62" height="62"/></td>
                <td><h2>满38包邮</h2>满38包邮 免运费</td>
            </tr>
        </table>
        <table border="0" style="width:210px; height:62px; float:left; margin-left:75px; margin-top:30px;" cellspacing="0" cellpadding="0">
            <tr>
                <td width="72"><img src="/yhWeb/Public/Home/images/b3.png" width="62" height="62"/></td>
                <td><h2>天天低价</h2>天天低价 畅选无忧</td>
            </tr>
        </table>
        <table border="0" style="width:210px; height:62px; float:left; margin-left:75px; margin-top:30px;" cellspacing="0" cellpadding="0">
            <tr>
                <td width="72"><img src="/yhWeb/Public/Home/images/b4.png" width="62" height="62"/></td>
                <td><h2>准时送达</h2>收货时间由你做主</td>
            </tr>
        </table>
    </div>
</div>
<div class="b_nav">
    <dl>
        <dt><a href="#">新手上路</a></dt>
        <dd><a href="#">售后流程</a></dd>
        <dd><a href="#">购物流程</a></dd>
        <dd><a href="#">订购方式</a></dd>
        <dd><a href="#">隐私声明</a></dd>
        <dd><a href="#">推荐分享说明</a></dd>
    </dl>
    <dl>
        <dt><a href="#">配送与支付</a></dt>
        <dd><a href="#">货到付款区域</a></dd>
        <dd><a href="#">配送支付查询</a></dd>
        <dd><a href="#">支付方式说明</a></dd>
    </dl>
    <dl>
        <dt><a href="#">会员中心</a></dt>
        <dd><a href="#">资金管理</a></dd>
        <dd><a href="#">我的收藏</a></dd>
        <dd><a href="#">我的订单</a></dd>
    </dl>
    <dl>
        <dt><a href="#">服务保证</a></dt>
        <dd><a href="#">退换货原则</a></dd>
        <dd><a href="#">售后服务保证</a></dd>
        <dd><a href="#">产品质量保证</a></dd>
    </dl>
    <dl>
        <dt><a href="#">联系我们</a></dt>
        <dd><a href="#">网站故障报告</a></dd>
        <dd><a href="#">购物咨询</a></dd>
        <dd><a href="#">投诉与建议</a></dd>
    </dl>
    <div class="b_tel_bg">
        <a href="#" class="b_sh1">新浪微博</a>
        <a href="#" class="b_sh2">腾讯微博</a>
        <p>
            服务热线：<br/>
            <span>400-123-4567</span>
        </p>
    </div>
    <div class="b_er">
        <div class="b_er_c"><img src="/yhWeb/Public/Home/images/er.gif" width="118" height="118"/></div>
        <img src="/yhWeb/Public/Home/images/ss.png"/>
    </div>
</div>
<div class="btmbg">
    <div class="btm">
        备案/许可证编号：豫ICP备12009302号-1-www.dingguagua.com Copyright © 2015-2018 尤洪商城网 All Rights Reserved. 复制必究 , Technical Support: Dgg Group <br/>
        <img src="/yhWeb/Public/Home/images/b_1.gif" width="98" height="33"/><img src="/yhWeb/Public/Home/images/b_2.gif" width="98" height="33"/><img src="/yhWeb/Public/Home/images/b_3.gif" width="98" height="33"/><img src="/yhWeb/Public/Home/images/b_4.gif" width="98" height="33"/><img src="/yhWeb/Public/Home/images/b_5.gif" width="98" height="33"/><img src="/yhWeb/Public/Home/images/b_6.gif" width="98" height="33"/>
    </div>
</div>
<!--End Footer End -->
</div>

</body>


<!--[if IE 6]>
<script src="//letskillie6.googlecode.com/svn/trunk/2/zh_CN.js"></script>
<![endif]-->
</html>