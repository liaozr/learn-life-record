<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>主要内容区main</title>
    <link rel="stylesheet" href="/yhWeb/Public/Admin/Css/bootstrap.min.css">
    <script src="/yhWeb/Public/Admin/Js/jquery1123.js"></script>
    <script src="/yhWeb/Public/Admin/Js/bootstrap.min.js"></script>
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
        <td width="99%" align="left" valign="top">您的位置：分类管理</td>
    </tr>
    <tr>
        <td align="left" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="search">
                <tr>
                    <td width="90%" align="left" valign="middle">
                        <form method="post" action="">
                            <span>管理员：</span>
                            <input type="text" name="text" value="" class="text-word">
                            <input name="submit" type="submit" value="查询" class="text-but">
                        </form>
                    </td>
                    <td width="10%" align="center" valign="middle" style="text-align:right; width:150px;"><a href="" target="mainFrame" onFocus="this.blur()" class="add">添加顶级分类</a></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="left" valign="top">
            <div class="page-header">
                <h1><?php echo ($header['name']); ?>
                    <small>有<span class="label label-default"><?php echo ($header['childnum']); ?></span>个子类</small>
                </h1>
            </div>
            <?php if(is_array($type)): $i = 0; $__LIST__ = $type;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$showType): $mod = ($i % 2 );++$i;?><table class="table table-bordered table-striped table-hover text-center" index="<?php echo ($key); ?>" style="display: none">
                    <tr>
                        <th>编号</th>
                        <th>类名</th>
                        <th>父类ID</th>
                        <th>操作</th>
                    </tr>
                    <?php if(is_array($showType)): $i = 0; $__LIST__ = $showType;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$showType): $mod = ($i % 2 );++$i;?><tr>
                            <td id="showTypeId"><?php echo ($showType["id"]); ?></td>
                            <td><?php echo ($showType["name"]); ?></td>
                            <td><?php echo ($showType["pid"]); ?></td>
                            <td>
                                <a href='/yhWeb/Admin/Type/selectChild?id=<?php echo ($showType["id"]); ?>' target='mainFrame' onFocus='this.blur()' class='showChild'>查看子类</a>
                                <span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Type/addType?id=<?php echo ($showType["id"]); ?>" target='mainFrame' onFocus='this.blur()' class='add'>添加分类</a>
                                <span class='gray'>&nbsp;|&nbsp;</span><a href='#' target='mainFrame' onFocus='this.blur()' class='add'>删除</a>
                                <span class='gray'>&nbsp;|&nbsp;</span><a href='#' target='mainFrame' onFocus='this.blur()' class='add'>修改</a>
                            </td>
                        </tr><?php endforeach; endif; else: echo "" ;endif; ?>
                </table><?php endforeach; endif; else: echo "" ;endif; ?>
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
        <?php $__FOR_START_13230__=1;$__FOR_END_13230__=$allpage+1;for($i=$__FOR_START_13230__;$i < $__FOR_END_13230__;$i+=1){ ?><li class="page"><a href="#"><?php echo ($i); ?></a></li><?php } ?>
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
        $('.table:eq(0)').show()
        $('.page').click(function () {
            $('.page').removeClass('active')
            $(this).addClass('active')
            $('.table').hide()
            $('.table').eq($(this).index() - 1).show()
        })
        $('#previous').click(function () {
            if ($('.active').prev().hasClass('page')) {
                var index = $('.active').prev().index()
                $('.active').removeClass('active')
                $('.page').eq(index - 1).addClass('active')
                $('.table').hide()
                $('.table').eq(index - 1).show()
            }
        })
        $('#Next').click(function () {
            if ($('.active').next().hasClass('page')) {
                var index = $('.active').next().index()
                $('.active').removeClass('active')
                $('.page').eq(index - 1).addClass('active')
                $('.table').hide()
                $('.table').eq(index - 1).show()
            }
        })

    })
</script>