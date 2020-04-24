<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/29 9:28
 */

namespace Home\Controller;

use Think\Controller;

class BuyCarController extends PublicController
{
    public function index()
    {
//        $cart=M('Cart');
//        $list=$cart->where("userId={$_SESSION['userId']}")->select();
//        $this->assign('list',$list);
        $this->display('BuyCar');
    }

    public function addBuyCar($id, $num = 1)
    {
        if (empty($_SESSION['userId'])) {
            $data['status'] = 2;
        } else {
            $m = M('goods');
            $goods = $m->find($id);

            $data['userId'] = $_SESSION['userId'];
            $data['price'] = $goods['price'];
            $data['number'] = $num;
            $data['goodsId'] = $id;
            $data['picName'] = $goods['picName'];
            $data['goodsName'] = $goods['goodsName'];
            $d = D('cart');
            if ($res = $d->where("goodsId=$id AND userId={$data['userId']}")->find()) {
                $save['id'] = $res['id'];
                $save['number'] = $res['number'] + $num;
                $d->save($save);
                $data = $d->userCart($_SESSION['userId']);
                $data['status'] = 1;

            } else {
                if ($d->add($data)) {
                    //搜索用户的全部购物车信息
                    $data = $d->userCart($_SESSION['userId']);
                    $data['status'] = 1;
                } else {
                    $data['status'] = 0;
                }

            }


        }
        $this->ajaxReturn($data);
//        $_SESSION['user']['id'];
//        $m->where('userid= $_SESSION[\'user\'][\'id\']')->select();
//        count();

    }

    public function cartDel($id)
    {
        $d = D('cart');
        if ($d->delete($id)) {
            $data = $d->userCart($_SESSION['userId']);
            $data['status'] = 1;
            session('cart', $data);
        } else {
            $data['status'] = 0;
        }
        $this->ajaxReturn($data);

    }

    public function cartDelete($id)
    {
        if (isset($id) && !empty($id)) {
            $d = D('cart');
            if ($d->delete($id)) {
                $data = $d->userCart($_SESSION['userId']);
                session('cart', $data);
                $this->index();
            } else {
                $this->error('删除失败');
            }

        }


    }

    public function BuyCar_Two()
    {
        $m = M('user');
        $res = $m->find($_SESSION['userId']);
        $this->assign('user', $res);
        $this->display('BuyCar_Two');
    }

    public function BuyCar_Three()
    {
        foreach ($_SESSION['cart']['goods'] as $key => $val) {
            $m = M('user');
            $user = $m->find($val['userId']);
            $data['goodsId'] = intval($val['goodsId']);
            $data['userId'] = intval($val['userId']);
            $data['goodsName'] = $val['goodsName'];
            $data['linkMan'] = $user['userName'];
            $data['address'] = $user['address'];
            $data['code'] = $user['code'];
            $data['phone'] = $user['phone'];
            $data['total'] = $val['price'] * $val['number'];
            $data['addTime'] = time();
            $order = M('orders');
            $order->add($data);
            $orderCode = date("Ymd", $data['addTime']) . $data['userId'];
        }
        $this->assign('orderCode', $orderCode);
        $this->assign('total', $_SESSION['cart']['total']);
        session('cart',null);
        $this->display();
    }

    function cartUpdate()
    {
        $d = D('cart');
        $data['number'] = $_POST['number'];
        $data['id'] = $_POST['id'];
        $d->save($data);
        $data = $d->userCart($_SESSION['userId']);
        $this->ajaxReturn($data);

    }


}