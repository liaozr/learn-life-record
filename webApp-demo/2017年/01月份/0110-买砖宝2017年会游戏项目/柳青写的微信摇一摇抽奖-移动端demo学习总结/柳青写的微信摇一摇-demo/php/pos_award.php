<?php
/*
 * 摇一摇完提交分数
 */
include '../php/conn.inc.php';   //载入数据库配置文件
$db_link = new DBLink();    //连接数据库
$pdo = $db_link->link_db();

$u_id = $_POST['u_id'];
$waggle = $_POST['waggle'];
$score = $_POST['score'];

$sql = "UPDATE `user` SET waggle='$waggle',score='$score' WHERE u_id = '$u_id'";
$pdo->exec($sql);





