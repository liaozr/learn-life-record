<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/5 10:59
 */

namespace Home\Model;

use Think\Model;

class TypeModel extends Model
{
    protected $tableName = 'type';

    public function type($id = 0)
    {
        $type = $this->table('type')->where("pid=$id")->select();
        foreach ($type as $key => $val) {
            $id = $val['id'];
            $typerows[$key][0] = $val;
            $typerows[$key][1] = $this->table('type')->where("pid=$id")->select();
        }
        return $typerows;
    }

    public function typeThree($id = 0, &$arr = array())
    {
        $type = $this->where("pid=$id")->select();
        foreach ($type as $key => $val) {
            $arr[] = $type[$key];
            $id = $val['id'];
            $this->typeThree($id, $arr);
        }
        return $arr;
    }

    public function navPath($typeid, &$path = array())
    {
        $res = $this->find($typeid);
        $path[] = $res['name'];
        if ($res['pid'] == 0) {
            return $path;
        } else {
            $this->navPath($res['pid'], $path);
        }
        return array_reverse($path);
    }

    public function indexType()
    {
        $one = $this->where('pid = 0')->select();
        $iconIndex = 1;
        foreach ($one as $key => $val) {
            $one[$key]['icon'] = "nav" . $iconIndex . ".png";
            $id = $val['id'];
            $typerows[] = $this->type_Loop($id, $one[$key]);
            $iconIndex++;
        }
        return $typerows;
    }

    function type_Loop($id, $one)
    {
        if ($row = $this->where("pid = $id")->select()) {
            foreach ($row as $key => $val) {
                $id = $val['id'];
                $rows['one'] = $one;
                $row[$key]['three'] = $this->where("pid = $id")->select();
                $rows['two'] = $row;
                if ($row[$key][$id])
                    $rows['two'][] = $row[$key][$id];
            }
            return $rows;
        } else {
            $rows['one'] = $one;
            return $rows;
        }
    }
//        public function getTree () {
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