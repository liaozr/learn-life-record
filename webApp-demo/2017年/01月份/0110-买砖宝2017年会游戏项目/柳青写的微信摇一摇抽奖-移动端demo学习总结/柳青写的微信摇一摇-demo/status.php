<?php
include './php/conn.inc.php';   //载入数据库配置文件
$db_link = new DBLink();    //连接数据库
$pdo = $db_link->link_db();

$sql = "SELECT * FROM passageway WHERE u_name = 'yaoyiyao'";
$res = $pdo->query($sql);
$col = $res->fetchAll();
$col = $col[0]['status'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>摇一摇活动后台</title>
    <script src="js/jquery-1.10.1.min.js"></script>
    <style>
        .main { width: 80%; height: 400px; margin: 50px auto; }
        .main h3 { width: 100%; height: 120px; font-size: 32px; line-height: 40px; text-align: center;}
        .kaiqi{ width: 30%; height:300px; float: left; }
        .kaiqi button{position: relative; width: 200px; height: 80px; font-size: 24px;left:150px;}
        .jieshu{ width: 30%; height:300px; float: left; }
        .jieshu button{position: relative; width: 200px; height: 80px; font-size: 24px;left:80px;}
        .qingchu{ width: 30%; height:300px; float: left; }
        .qingchu button{position: relative; width: 200px; height: 80px; font-size: 24px;left:80px;}

    </style>

</head>
<body>

    <div class="main">
        <h3>摇一摇活动状态<?php if($col == 0){ echo ':关闭';}else{ echo ':开启';}?></h3>

        <div class="kaiqi">
            <button id="kq" <?php if($col != 0){ echo 'disabled';}?>>点击开始</button>
        </div>

        <div class="jieshu">
            <button id="js" <?php if($col == 0){ echo 'disabled';}?>>点击结束</button>
        </div>

        <div class="qingchu">
            <button id="qc">清除上一轮成绩</button>
        </div>

    </div>

<script>
    $("#kq").click(function(){
        var status = '1';
        var u_name = 'yaoyiyao';
        $.get('./php/open_status.php',{'u_name':u_name,'status':status},function(res){
            if(res) {
                $("#kq").html('已启动');
                $("#kq").attr("disabled","disabled");
                $("#js").removeAttr("disabled");
            }
        });
    });

    $("#js").click(function(){
        var status = '0';
        var u_name = 'yaoyiyao';
        $.get('./php/open_status.php',{'u_name':u_name,'status':status},function(res){
            if(res) {
                $("#js").html('已结束');
                $("#js").attr("disabled","disabled");
                $("#kq").removeAttr("disabled");
            }
        });
    });

    $("#qc").click(function(){
        $.get('./php/cleck_award.php',{},function(res){
            if(res) {
                alert('清除成功');
            }
        });
    });

</script>


</body>
</html>