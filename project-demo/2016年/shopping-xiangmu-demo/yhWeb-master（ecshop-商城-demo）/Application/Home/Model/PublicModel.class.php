<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/5 9:53
 */

namespace Home\Model;

use Think\Model;

class PublicModel extends Model
{
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
}