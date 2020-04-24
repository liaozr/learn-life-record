<?php

include '../php/conn.inc.php';   //载入数据库配置文件
$db_link = new DBLink();    //连接数据库
$pdo = $db_link->link_db();

$u_name = $_GET['u_name'];
$status = $_GET['status'];

$sql = "UPDATE passageway SET status={$status} WHERE u_name = '{$u_name}'";
$res = $pdo->exec($sql);

echo json_encode((bool)$res);
