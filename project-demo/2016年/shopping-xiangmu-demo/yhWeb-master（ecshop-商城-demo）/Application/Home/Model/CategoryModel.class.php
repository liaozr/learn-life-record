<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/4 16:45
 */

namespace Home\Model;

use Think\Model;

class CategoryModel extends Model
{
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

    public function showGoods($arr)
    {

    }

}