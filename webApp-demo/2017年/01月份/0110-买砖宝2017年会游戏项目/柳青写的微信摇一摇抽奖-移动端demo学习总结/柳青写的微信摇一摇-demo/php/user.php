<?php

/*
 * 登记抽奖人员
 */

include '../php/conn.inc.php';   //载入数据库配置文件
$db_link = new DBLink();    //连接数据库

$name = $_POST['name'];     //获取传递过来的用户名
$u_id = $_POST['id'];   //获取传递过来的抽奖券号码
$mobile = $_POST['phone'];     //获取传递过来的手机号码

//查询抽奖券的号码是否已存在
$check_user = $db_link->getOne("u_id={$u_id}","id");

if( $check_user != false ){
    $res = $db_link->edit("u_id='$u_id',name='$name',mobile='$mobile'","u_id='$u_id'","user");
} else {
    //登记抽奖的号码和手机
    $res = $db_link->add('u_id,name,mobile',"'$u_id','$name','$mobile'",'user');
}

if( $res != false ){
    echo json_encode(['errcode'=>0,'errmsg'=>'添加成功'],JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['errcode'=>1,'errmsg'=>'添加失败'],JSON_UNESCAPED_UNICODE);
}



