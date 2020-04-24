<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/11 15:19
 */

namespace Home\Model;

use Think\Model;

class CartModel extends Model
{
    protected $tableName = 'cart';

    public function userCart($userid)
    {
        $data['goods'] = $this->where("userId=$userid")->select();
        $data['typenum'] = count($data['goods']);
        $data['content'] = "<ul class=\"cars\">";
        foreach ($data['goods'] as $key => $val) {
            $data['num'] = $data['num'] + $val['number'];
            $data['total'] = $data['total'] + ($val['number'] * $val['price']);
            $data['content'] .= "<li>
                            <div class=\"img\"><a href=\"#\"><img src=\"/yhWeb/Public/Uploads/{$val['picName']}\" width=\"58\" height=\"58\" /></a></div>
                            <div class=\"name\"><a href=\"#\">{$val['goodsName']}</a></div>
                            <div class=\"price\"><font color=\"#ff4e00\">￥{$val['price']}</font> X{$val['number']}</div>
                            <button class=\"cartdel\" cartid=\"{$val['id']}\">删除</button>
                        </li>";
        }
        $data['content'] .= "</ul><div class=\"price_sum\">共计&nbsp; <font color=\"#ff4e00\">￥</font><span id=\"total\">{$data['total']}</span></div><div class=\"price_a\"><a href=\"__MODULE__/BuyCar/index\">去购物车结算</a></div>";

        $data['msg'] = "<span style=\"color:#3e3e3e; font-size:18px; font-weight:bold;\">宝贝已成功添加到购物车</span><br />购物车共有{$data['typenum']}种宝贝（{$data['num']}件） &nbsp; &nbsp; 合计：{$data['total']}元";
        return $data;

    }
}