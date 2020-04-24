<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/28 14:13
 */
namespace Admin\Model;

use Think\Model;

class TypeModel extends Model
{
    protected $tableName = 'type';

    public function typeAll($id = 0, &$arr = array(), $index = 0)
    {
        $index++;
        $type = $this->where("pid=$id")->select();
        foreach ($type as $key => $val) {
            if ($index == 2) {
                $type[$key]['name'] = "|—" . $type[$key]['name'];
            } else if ($index == 3) {
                $type[$key]['name'] = "|—|—" . $type[$key]['name'];
            }
            $arr[] = $type[$key];
            $id = $val['id'];
            $this->typeAll($id, $arr, $index);
        }
        return $arr;
    }

    public function selectChildType($id = 0, &$arr = array())
    {
        $type = $this->where("pid=$id")->select();
        foreach ($type as $key => $val) {
            $arr[] = $type[$key];
            $id = $val['id'];
            $this->selectChildType($id, $arr);
        }
        return $arr;
    }
//    public function getTree () {
//        //这里我们直接获取所有的数据，然后通过程序进行处理
//        //在无限极分类中最忌讳的是对数据库进行层层操作，也就很容易造成内存溢出
//        //最后电脑死机的结果
//        $data = $this->select();
//        return $this->generateTree($data);
//    }
////生成树
//    private function generateTree ($data, $pid = 0) {
//        $tree = [];
//        if ($data && is_array($data)) {
//            foreach($data as $v) {
//                if($v['pid'] == $pid) {
//                    $tree[] = [
//                        'id' => $v['id'],
//                        'name' => $v['name'],
//                        'pid' => $v['pid'],
//                        'children' => $this->generateTree($data, $v['id']),
//                    ];
//                }
//            }
//        }
//        return $tree;
//    }
}