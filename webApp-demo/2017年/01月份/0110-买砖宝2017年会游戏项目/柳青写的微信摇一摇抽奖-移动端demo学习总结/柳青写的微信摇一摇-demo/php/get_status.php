<?php

include '../php/conn.inc.php';   //载入数据库配置文件
$db_link = new DBLink();    //连接数据库
$pdo = $db_link->link_db();

$sql = "SELECT * FROM passageway WHERE u_name = 'yaoyiyao'";
$res = $pdo->query($sql);
$col = $res->fetchAll();
echo json_encode(['status'=>$col[0]['status']]);