<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>添加商品图片</title>
    <link href="/yhWeb/Public/Admin/Css/css.css" type="text/css" rel="stylesheet"/>
    <link href="/yhWeb/Public/Admin/Css/main.css" type="text/css" rel="stylesheet"/>
    <link rel="stylesheet" href="/yhWeb/Public/Admin/Css/bootstrap.min.css">
    <link rel="stylesheet" href="/yhWeb/Public/fileinput.min.css">
    <script src="/yhWeb/Public/jquery.js"></script>
    <script src="/yhWeb/Public/fileinput.min.js"></script>
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
            color: #FFF
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
            background: url(/yhWeb/Public/Admin/Images/Main/add.jpg) no-repeat 0px 6px;
            padding: 0 10px 0 26px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-weight: bold;
            color: #FFF
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
            background: #f9f9f9;
            font-size: 14px;
            font-weight: bold;
            padding: 10px 10px 10px 0;
            width: 120px;
        }

        .main-for {
            padding: 10px;
        }

        .main-for input.text-word {
            width: 310px;
            height: 36px;
            line-height: 36px;
            border: #ebebeb 1px solid;
            background: #FFF;
            font-family: "Microsoft YaHei", "Tahoma", "Arial", '宋体';
            padding: 0 10px;
        }

        .main-for select {
            width: 310px;
            height: 36px;
            line-height: 36px;
            border: #ebebeb 1px solid;
            background: #FFF;
            font-family: "Microsoft YaHei", "Tahoma", "Arial", '宋体';
            color: #666;
        }

        .main-for input.text-but {
            width: 100px;
            height: 40px;
            line-height: 30px;
            border: 1px solid #cdcdcd;
            background: #e6e6e6;
            font-family: "Microsoft YaHei", "Tahoma", "Arial", '宋体';
            color: #969696;
            float: left;
            margin: 0 10px 0 0;
            display: inline;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        }

        #addinfo a {
            font-size: 14px;
            font-weight: bold;
            background: url(/yhWeb/Public/Admin/Images/Main/addinfoblack.jpg) no-repeat 0 1px;
            padding: 0px 0 0px 20px;
            line-height: 45px;
        }

        #addinfo a:hover {
            background: url(/yhWeb/Public/Admin/Images/Main/addinfoblue.jpg) no-repeat 0 1px;
        }
    </style>
</head>
<body>
<!--main_top-->
<table width="99%" border="0" cellspacing="0" cellpadding="0" id="searchmain">
    <tr>
        <td width="99%" align="left" valign="top">您的位置：商品图片管理&nbsp;&nbsp;>&nbsp;&nbsp;添加商品图片</td>
    </tr>
    <tr>
        <td align="left" valign="top" id="addinfo">
            <a href="goodsImage" target="mainFrame" onFocus="this.blur()" class="add">查看图片</a>
        </td>
    </tr>
    <tr>
        <td align="left" valign="top">
            <form method="post" action="/yhWeb/Admin/Goods/goodsImageAct" enctype="multipart/form-data">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" id="main-tab">
                    <tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
                        <td align="right" valign="middle" class="borderright borderbottom bggray">类别：</td>
                        <td align="left" valign="middle" class="borderright borderbottom main-for">
                            <select name="typeId" id="level">
                                <?php if(is_array($type)): $i = 0; $__LIST__ = $type;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$type): $mod = ($i % 2 );++$i;?><option value='<?php echo ($type["id"]); ?>'><?php echo ($type["name"]); ?></option><?php endforeach; endif; else: echo "" ;endif; ?>
                            </select>
                        </td>
                    </tr>
                    <tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
                        <td align="right" valign="middle" class="borderright borderbottom bggray">商品Id：</td>
                        <td align="left" valign="middle" class="borderright borderbottom main-for">
                            <input type="text" name="goodsId" value="" class="text-word">
                        </td>
                    </tr>
                    <tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
                        <td align="right" valign="middle" class="borderright borderbottom bggray">图片：</td>
                        <td align="left" valign="middle" class="borderright borderbottom main-for">
                            <label class="control-label">选择文件</label>
                            <input id="input-5" name="picName[]" type="file" multiple class="file-loading">
                            <input id="button1" type="button" class="btn btn-default" value="禁用"/>
                        </td>
                    </tr>
                    <tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
                        <td align="right" valign="middle" class="borderright borderbottom bggray">详情图：</td>
                        <td align="left" valign="middle" class="borderright borderbottom main-for">
                            <label class="control-label">选择文件</label>
                            <input id="input-6" name="picDetail[]" type="file" multiple class="file-loading">
                        </td>
                    </tr>
                    <tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
                        <td align="right" valign="middle" class="borderright borderbottom bggray">海报图：</td>
                        <td align="left" valign="middle" class="borderright borderbottom main-for">
                            <label class="control-label">选择文件</label>
                            <input id="input-7" name="picPure[]" type="file" multiple class="file-loading">
                            <input id="button" type="button" class="btn btn-default" value="禁用"/>
                        </td>
                    </tr>
                    <!--<tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">-->
                    <!--<td align="right" valign="middle" class="borderright borderbottom bggray">轮播图：</td>-->
                    <!--<td align="left" valign="middle" class="borderright borderbottom main-for">-->
                    <!--<input type="file" name="picTure" value="" class="text-word">-->
                    <!--</td>-->
                    <!--</tr>-->
                    <tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
                        <td align="right" valign="middle" class="borderright borderbottom bggray">&nbsp;</td>
                        <td align="left" valign="middle" class="borderright borderbottom main-for">
                            <input name="" type="submit" value="提交" class="text-but">
                            <input name="" type="reset" value="重置" class="text-but">
                        </td>
                    </tr>
                </table>
            </form>
        </td>
    </tr>
</table>
</body>
</html>
<script>
    $(function () {
        $('#button').click(function() {
                    if ($(this).val() == '禁用') {
                        $(this).val('启用')
                        $('#input-7').attr('disabled', true);
                    }
                    else {
                        $(this).val('禁用')
                        $('#input-7').attr('disabled', false);
                    }
                }
        )
        $('#button1').click(function() {
                    if ($(this).val() == '禁用') {
                        $(this).val('启用')
                        $('#input-5').attr('disabled', true);
                    }
                    else {
                        $(this).val('禁用')
                        $('#input-5').attr('disabled', false);
                    }
                }
        )
        $("#input-6,#input-5,#input-7").fileinput({
                showUpload: false,
                maxFileCount: 10,
                mainClass: "input-group-lg"
        })
    })
</script>