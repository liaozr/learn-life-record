<?php

/*
 * 连接数据库配置文件
 */
class DBLink{


    private $dsn =  "mysql:host=120.76.219.232;dbname=yaoyiyao";
    private $username = "cloud";
    private $password = "mysql6643H";

    // private $dsn =  "mysql:host=localhost;dbname=yaoyiyao";
    // private $username = "root";
    // private $password = "root";

    public function link_db()
    {
        $pdo = new PDO($this->dsn,$this->username,$this->password);
        $pdo->query('set names utf8;');
        return $pdo;
    }

    //查询多条信息
    public function getInfo($condition='',$field='*',$table='user')
    {
        $pdo = $this->link_db();

        if($condition == '') {
            $sql = "SELECT {$field} FROM {$table}";
        } else {
            $sql = "SELECT {$field} FROM {$table} WHERE {$condition}";
        }
        $res = $pdo->query($sql);
        $col = $res->fetchAll();
        return $col;
    }

    //查询单条信息
    public function getOne($condition='',$field='*',$table='user')
    {
        $pdo = $this->link_db();
        $sql = "SELECT {$field} FROM {$table} WHERE {$condition}";
        $res = $pdo->query($sql);
        $col = $res->fetchAll();
        if($col){
            return $col[0];
        } else {
            return false;
        }
    }

    //插入单条信息
    public function add($field,$values,$table='user')
    {
        $pdo = $this->link_db();
        $sql = "INSERT INTO {$table}({$field}) VALUES ({$values})";
        $res = $pdo -> exec($sql);
        if($res) {
            $z = $pdo->query("SELECT id FROM {$table} ORDER BY id DESC LIMIT 1");
            $col = $z->fetchAll();
            return $col[0]['id'];
        } else {
            return false;
        }
    }

    //修改单条信息
    public function edit($update,$conditon,$table='user')
    {
        $pdo = $this->link_db();
        $sql = "UPDATE {$table} SET {$update} WHERE {$conditon}";
        $res = $pdo -> exec($sql);
        return $res;

    }



    //统计数据表的记录条数
    public function getCount($condition,$table='user')
    {
        $pdo = $this->link_db();
        $sql = "SELECT count('*') FROM {$table} WHERE {$condition}";
        $res = $pdo -> query($sql);
        $col = $res->fetchAll();
        return $col[0][0];
    }





}