<?php if (!defined('THINK_PATH')) exit(); ?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>主要内容区main</title>
    <link href="/yhWeb/Public/Admin/Css/css.css" type="text/css" rel="stylesheet"/>
    <link href="/yhWeb/Public/Admin/Css/main.css" type="text/css" rel="stylesheet"/>
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
                        <form method="post" action="">
                            <span>管理员：</span>
                            <input type="text" name="" value="" class="text-word">
                            <input name="" type="button" value="查询" class="text-but">
                        </form>
                    </td>
                    <td width="10%" align="center" valign="middle" style="text-align:right; width:150px;"><a href="/yhWeb/Admin/Index/addGoods" target="mainFrame" onFocus="this.blur()" class="add">新增商品</a></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="left" valign="top">

            <table width="100%" border="0" cellspacing="0" cellpadding="0" id="main-tab">
                <tr>
                    <th align="center" valign="middle" class="borderright">商品号</th>
                    <th align="center" valign="middle" class="borderright">类别</th>
                    <th align="center" valign="middle" class="borderright">商品名称</th>
                    <th align="center" valign="middle" class="borderright">生产厂家</th>
                    <th align="center" valign="middle" class="borderright">单价</th>
                    <th align="center" valign="middle" class="borderright">商品图片</th>
                    <th align="center" valign="middle" class="borderright">添加时间</th>
                    <th align="center" valign="middle">操作</th>
                </tr>
                <tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">;
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom'><?php echo($vals['id']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom'><?php echo($vals['username']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom'><?php echo($vals['truename']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom'><?php echo($vals['sex']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom'><?php echo($vals['email']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom'><?php echo($vals['phone']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom'><?php echo($vals['face']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom'><?php echo($vals['regTime']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderright borderbottom' id='active'><?php echo($vals['activeFlag']); ?></td>";-->
                    <!--echo "<td align='center' valign='middle' class='borderbottom' ><a href='../member/edit.php?id=<?php echo($vals[' id']); ?>' target='mainFrame' onFocus='this.blur()' class='add'>编辑</a><span class='gray' >&nbsp;|&nbsp;</span><a href='../member/delete.php?id=<?php echo($vals[' id']); ?>' target='mainFrame' onFocus='this.blur()' class='add'>删除</a><span class='gray' >&nbsp;|&nbsp;</span><a href='../member/activeFlag.php?id=<?php echo($vals[' id']); ?>' target='mainFrame' onFocus='this.blur()' class='add' id='activeFlag'>禁用</a></td>";-->
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="left" valign="top" class="fenye">11条数据1页&nbsp;&nbsp;<a href="#" target="mainFrame" onFocus="this.blur()">首页</a>&nbsp;&nbsp;<a href="" target="mainFrame" onFocus="this.blur()">上一页</a>&nbsp;&nbsp;<a href="" target="mainFrame" onFocus="this.blur()">下一页</a>&nbsp;&nbsp;<a href="#" target="mainFrame" onFocus="this.blur()">尾页</a></td>
    </tr>
</table>
</body>
</html>