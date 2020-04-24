<?php
//echo '[{ "text":"abcedede" ,color:"white",size:1,position:0,time:12},{ "text":"1234" ,color:"green",size:1,position:0,time:23}]';
//[{ "text":"我的它旦撒旦撒","color":"#ffffff","size":"1","position":"0","time":3}{ "text":"的大噩噩噩噩鹅鹅鹅","color":"#ffffff","size":"1","position":"0","time":56}{ "text":"我的 ","color":"#ffffff","size":"1","position":"0","time":143}{ "text":"的撒的","color":"#ffffff","size":"1","position":"0","time":155}]
include_once('connect.php');

$json = '[';
$query = mysql_query("select * from danmu");
while($row=mysql_fetch_array($query)){
	$json .= $row['content'].',';
}
$json = substr($json,0,-1);
$json .= ']';
echo $json;
?>