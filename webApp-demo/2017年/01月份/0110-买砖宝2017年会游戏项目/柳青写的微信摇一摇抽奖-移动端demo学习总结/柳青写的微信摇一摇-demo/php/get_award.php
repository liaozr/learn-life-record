<?php
/*
 * 获取摇一摇的统计分数
 */
include '../php/conn.inc.php';   //载入数据库配置文件
$db_link = new DBLink();    //连接数据库
$pdo = $db_link->link_db();

$sql = "SELECT * FROM user ORDER BY score DESC,waggle DESC LIMIT 10";
$res = $pdo->query($sql);
$col = $res->fetchAll();

$info = [];
foreach($col as $k=>$v){
//    $info[$k]['id'] = $v['id'];
    $info[$k]['u_id'] = $v['u_id'];
//    $info[$k]['name'] = $v['name'];
//    $info[$k]['mobile'] = $v['mobile'];
//    $info[$k]['waggle'] = $v['waggle'];
    $info[$k]['score'] = $v['score'];
//    $info[$k]['award'] = $v['award'];
}
echo json_encode($info,JSON_UNESCAPED_UNICODE);
