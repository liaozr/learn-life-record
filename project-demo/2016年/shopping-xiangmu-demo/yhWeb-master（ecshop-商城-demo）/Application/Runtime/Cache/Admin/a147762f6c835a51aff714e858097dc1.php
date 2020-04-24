<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>订单列表</title>
    <link href="/yhWeb/Public/Admin/Css/css.css" type="text/css" rel="stylesheet"/>
    <link href="/yhWeb/Public/Admin/Css/main.css" type="text/css" rel="stylesheet"/>
    <link rel="stylesheet" href="/yhWeb/Public/Admin/Css/bootstrap.min.css">
    <script src="/yhWeb/Public/Admin/Js/jquery1123.js"></script>
    <style>
    body {
        overflow-x: hidden;
        background: #f2f0f5;
        padding: 15px 0px 10px 5px;
    }

    #searchmain {
        font-size: 12px;
    }

    #search {
        font-size: 12px;
        background: #548fc9;
        margin: 10px 10px 0 0;
        display: inline;
        width: 100%;
        color: #FFF;
        float: left
    }

    #search form span {
        height: 40px;
        line-height: 40px;
        padding: 0 0px 0 10px;
        float: left;
    }

    #search form input.text-word {
        height: 24px;
        line-height: 24px;
        width: 180px;
        margin: 8px 0 6px 0;
        padding: 0 0px 0 10px;
        float: left;
        border: 1px solid #FFF;
    }

    #search form input.text-but {
        height: 24px;
        line-height: 24px;
        width: 55px;
        background: url(/yhWeb/Public/Admin/Images/Main/list_input.jpg) no-repeat left top;
        border: none;
        cursor: pointer;
        font-family: "Microsoft YaHei", "Tahoma", "Arial", '宋体';
        color: #666;
        float: left;
        margin: 8px 0 0 6px;
        display: inline;
    }

    #search a.add {
        background: url(/yhWeb/Public/Admin/Images/Main/add.jpg) no-repeat -3px 7px #548fc9;
        padding: 0 10px 0 26px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
        color: #FFF;
        float: right
    }

    #search a:hover.add {
        text-decoration: underline;
        color: #d2e9ff;
    }

    #main-tab {
        border: 1px solid #eaeaea;
        background: #FFF;
        font-size: 12px;
    }

    #main-tab th {
        font-size: 12px;
        background: url(/yhWeb/Public/Admin/Images/Main/list_bg.jpg) repeat-x;
        height: 32px;
        line-height: 32px;
        text-align: center
    }

    #main-tab td {
        font-size: 12px;
        line-height: 40px;
    }

    #main-tab td a {
        font-size: 12px;
        color: #548fc9;
    }

    #main-tab td a:hover {
        color: #565656;
        text-decoration: underline;
    }

    .bordertop {
        border-top: 1px solid #ebebeb
    }

    .borderright {
        border-right: 1px solid #ebebeb
    }

    .borderbottom {
        border-bottom: 1px solid #ebebeb
    }

    .borderleft {
        border-left: 1px solid #ebebeb
    }

    .gray {
        color: #dbdbdb;
    }

    td.fenye {
        padding: 10px 0 0 0;
        text-align: right;
    }

    .bggray {
        background: #f9f9f9
    }
</style>
</head>
<body>
<!--main_top-->
<table width="99%" border="0" cellspacing="0" cellpadding="0" id="searchmain">
    <tr>
        <td width="99%" align="left" valign="top">您的位置：订单浏览</td>
    </tr>
    <tr>
        <td align="left" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="search">
                <tr>
                    <td width="90%" align="left" valign="middle">
                        <form method="post" action="">
                            <span>订单号或商品名称：</span>
                            <input type="text" name="" value="" class="text-word">
                            <input name="" type="button" value="查询" class="text-but">
                        </form>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="left" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="main-tab">
                <tr>
                    <th class="borderright">ID</th>
                    <th class="borderright">商品ID</th>
                    <th class="borderright">用户ID</th>
                    <th class="borderright">商品名称</th>
                    <th class="borderright">联系人</th>
                    <th class="borderright">地址</th>
                    <th class="borderright">邮编</th>
                    <th class="borderright">手机号</th>
                    <th class="borderright">添加时间</th>
                    <th class="borderright">总价</th>
                    <th class="borderright">订单状态</th>
                </tr>
                <?php if(is_array($orders)): $i = 0; $__LIST__ = $orders;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$orders): $mod = ($i % 2 );++$i;?><tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['id']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['goodsId']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['userId']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['goodsName']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['linkMan']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['address']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['code']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['phone']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo (date("y-m-d",$orders['addTime'])); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['total']); ?></td>
                        <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($orders['status']); ?>
                            <?php switch($orders["status"]): case "2": ?>已发货<?php break;?>
                                <?php case "3": ?>已收货<?php break;?>
                                <?php default: ?>
                                新订单<?php endswitch;?>
                        </td>
                    </tr><?php endforeach; endif; else: echo "" ;endif; ?>
            </table>
        </td>
    </tr>
</table>
<!--<nav class="text-center">-->
<!--<ul class="pagination pagination-lg">-->
<!--<li>-->
<!--<a href="#" aria-label="Previous" id="previous">-->
<!--<span aria-hidden="true">&laquo;</span>-->
<!--</a>-->
<!--</li>-->
<!--<?php $__FOR_START_25178__=1;$__FOR_END_25178__=$pagenum+1;for($i=$__FOR_START_25178__;$i < $__FOR_END_25178__;$i+=1){ ?>-->
<!--<li class="page"><a href="#"><?php echo ($i); ?></a></li>-->
<!--<?php } ?>-->
<!--</volist>-->
<!--<li>-->
<!--<a href="#" aria-label="Next" id="Next">-->
<!--<span aria-hidden="true">&raquo;</span>-->
<!--</a>-->
<!--</li>-->
<!--</ul>-->
<!--</nav>-->
</body>
</html>