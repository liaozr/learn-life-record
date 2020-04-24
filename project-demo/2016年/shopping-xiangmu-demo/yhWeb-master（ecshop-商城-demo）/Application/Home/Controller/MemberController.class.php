<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/29 9:33
 */

namespace Home\Controller;

use Think\Controller;

class MemberController extends Controller
{
    public function index()
    {
        $m = M('user');
        $user = $m->find($_SESSION['userId']);
        $this->assign('user', $user);
        $this->display('Member_User');
    }

    public function Member_Order()
    {
        $m = M('orders');
        $orders = $m->where("userId={$_SESSION['userId']}")->select();
        $this->assign('orders', $orders);
        $this->display('Member_Order');
    }

    public function Member_Member()
    {
        $this->display();
    }
    public function Member_Collect()
    {
        $m=M('collection');
        $res=$m->where("userId={$_SESSION['userId']}")->select();
        $this->assign('collect',$res);
        $this->display();
    }
    public function Member_Safe()
    {
        $this->display();
    }
    public function updatePhone()
    {

    }
    public function cancel($id)
    {
        $m = M('orders');
        if($m->delete($id))
        {
            $this->Member_Order();
        }

    }
}