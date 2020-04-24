<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/28 20:54
 */

namespace Admin\Model;

use Think\Model;

class GoodsModel extends Model
{
    protected $tableName = 'goods';

    public function goodsList($page = 1, $state = 1)
    {
        $goods = $this->where("state=$state")->page($page, 5)->select();
        foreach ($goods as $key => $val) {
            $name = $this->field('name')->table('type')->where("id={$val['typeId']}")->find();
            $goods[$key]['typename'] = $name['name'];
        }
        return $goods;
    }
}