<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/29 9:36
 */

namespace Admin\Controller;

use Think\Controller;

class OrderController extends Controller
{
    public function index()
    {
        $m = M('orders');
        $res = $m->select();
        $this->assign('orders', $res);
        $this->display('orderList');
    }

}