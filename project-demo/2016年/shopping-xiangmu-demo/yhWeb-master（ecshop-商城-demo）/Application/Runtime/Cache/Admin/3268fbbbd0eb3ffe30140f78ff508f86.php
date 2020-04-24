<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>商品列表</title>
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
        <td width="99%" align="left" valign="top">您的位置：商品管理</td>
    </tr>
    <tr>
        <td align="left" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="search">
                <tr>
                    <td width="90%" align="left" valign="middle">
                        <form method="post" action="/yhWeb/Admin/Goods/goodSearch">
                            <span>商品：</span>
                            <input type="text" name="keywords" class="text-word" style="color: black">
                            <input type="hidden" name="state" value="<?php echo ($_GET['state']); ?>">
                            <input type="submit" value="查询" class="text-but">
                        </form>
                    </td>
                    <td width="10%" align="center" valign="middle" style="text-align:right; width:150px;"><a href="/yhWeb/Admin/Goods/addGoods" target="mainFrame" onFocus="this.blur()" class="add">新增商品</a></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="left" valign="top" id="ajaxpage" state="<?php echo ($_GET['state']); ?>">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="main-tab">
    <tr>
        <th class="borderright">商品号</th>
        <th class="borderright">类别</th>
        <th class="borderright">商品名称</th>
        <th class="borderright">品牌</th>
        <th class="borderright">商品简介</th>
        <th class="borderright">单价</th>
        <th class="borderright">降价价格</th>
        <th class="borderright">商品图片</th>
        <th class="borderright">添加时间</th>
        <th class="borderright">库存</th>
        <th class="borderright">销量</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($goods)): $i = 0; $__LIST__ = $goods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['id']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['typename']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['goodsName']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['brands']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['descr']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['price']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['priceLower']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><img src="/yhWeb/Public/Uploads/<?php echo ($goods['picName']); ?>" alt="" width="100" height="100"></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo (date("y-m-d",$goods['addTime'])); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['stock']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['sales']); ?></td>
            <td align='center' valign='middle'>
                <a href="/yhWeb/Admin/Goods/goodsUpdate/id/<?php echo ($goods['id']); ?>" target='mainFrame' onFocus='this.blur()' class='add'>编辑</a>
                <span class='gray'>&nbsp;|&nbsp;</span><a href='#' target='mainFrame' onFocus='this.blur()' class='add'>删除</a>
                <?php switch($_GET['state']): case "2": ?><span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Goods/updateState/id/<?php echo ($goods['id']); ?>/state/3" target='mainFrame' onFocus='this.blur()' class='add'>下架</a><?php break;?>
                    <?php case "3": ?><span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Goods/updateState/id/<?php echo ($goods['id']); ?>/state/2" target='mainFrame' onFocus='this.blur()' class='add'>出售</a><?php break;?>
                    <?php default: ?>
                    <span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Goods/updateState/id/<?php echo ($goods['id']); ?>/state/2" target='mainFrame' onFocus='this.blur()' class='add'>出售</a>
                    <span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Goods/updateState/id/<?php echo ($goods['id']); ?>/state/3" target='mainFrame' onFocus='this.blur()' class='add'>下架</a><?php endswitch;?>
            </td>
        </tr><?php endforeach; endif; else: echo "" ;endif; ?>
</table>
        </td>
    </tr>
</table>
<nav class="text-center">
    <ul class="pagination pagination-lg">
        <li>
            <a href="#" aria-label="Previous" id="previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <?php $__FOR_START_31556__=1;$__FOR_END_31556__=$pagenum+1;for($i=$__FOR_START_31556__;$i < $__FOR_END_31556__;$i+=1){ ?><li class="page"><a href="#"><?php echo ($i); ?></a></li><?php } ?>
        </volist>
        <li>
            <a href="#" aria-label="Next" id="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
</body>
</html>
<script>
    $(function () {
        $('.page:eq(0)').addClass('active')
        $('.page').click(function () {
            $('.page').each(function () {
                $(this).removeClass('active')
            })
            $(this).addClass('active')
            $.get('/yhWeb/Admin/Goods/ajaxPage', {page: $(this).text(), state: $("#ajaxpage").attr('state')}, function (data) {
                $('#ajaxpage').html(data);
            })
        })
        $('#previous').click(function () {
            if ($('.active').prev().hasClass('page')) {
                var index = $('.active').prev().index()
                $('.active').removeClass('active')
                $('.page').eq(index - 1).addClass('active')
                $.get('/yhWeb/Admin/Goods/ajaxPage', {page: index, state: $("#ajaxpage").attr('state')}, function (data) {
                    $('#ajaxpage').html(data);
                })
            }
        })
        $('#Next').click(function () {
            if ($('.active').next().hasClass('page')) {
                var index = $('.active').next().index()
                $('.active').removeClass('active')
                $('.page').eq(index - 1).addClass('active')
                $.get('/yhWeb/Admin/Goods/ajaxPage', {page: index, state: $("#ajaxpage").attr('state')}, function (data) {
                    $('#ajaxpage').html(data);
                })
            }
        })

    })
</script>