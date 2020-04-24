<?php
include_once('connect.php');

$danmu=strip_tags($_POST['danmu']);
$addtime = time();
$sql="INSERT INTO `danmu`(`id`,`content`,`addtime`) VALUES (null,'$danmu','$addtime')";
$query=mysql_query($sql); 
mysql_close();
?>