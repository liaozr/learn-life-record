<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/28 10:36
 */

namespace Admin\Controller;

use Think\Controller;

class PublicController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function checkSession()
    {
        $session = session('adminName');
        if (!(isset($session) && $session)) {
            if (ACTION_NAME != 'login') {
                redirect('index/login');
            }
        }
    }

    public function ajaxPage($page = 1)
    {
        $m = M('type');
        $result = $m->page($page, 10)->select();
        $this->assign('type', $result);
        $this->display('typeListChild');
    }
}