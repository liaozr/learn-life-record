<?php

/*
 * 清除上一轮成绩
 */
include '../php/conn.inc.php';   //载入数据库配置文件
$db_link = new DBLink();    //连接数据库
$pdo = $db_link->link_db();

$sql_q = "SELECT id FROM `user`";

$res = $pdo->query($sql_q);
$col = $res->fetchAll();

foreach($col as $ids){
    $id = $ids['id'];
    $sql_c = "UPDATE `user` SET waggle = 0,score = 0 WHERE id='$id'";
    $pdo->exec($sql_c);
}

echo json_encode(true);