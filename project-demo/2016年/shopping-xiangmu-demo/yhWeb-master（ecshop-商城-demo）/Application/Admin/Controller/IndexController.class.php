<?php
namespace Admin\Controller;

use Think\Controller;
use Think\Verify;

class IndexController extends PublicController
{
//    public function __construct()
//    {
//        parent::__construct();
//        $this->checkSession();
//    }
    /*后台登录*/
    public function index()
    {
        if (!empty($_SESSION['adminName'])) {
            $this->display();
        } else {

            $this->display('login');
        }
    }

    public function login()
    {
        $this->display();
    }

    public function loginCheck()
    {
        $m = M('admin');
        $data['adminName'] = $_POST['adminName'];
        $data['adminPass'] = $_POST['adminPass'];
        $res = $m->where($data)->find();
        if ($res) {
            session('adminName', $_POST['adminName']);
            session('adminPass', $_POST['adminPass']);
            redirect('index');
        } else {
            redirect('index/login');
        }
    }

    /*后台用户注销程序*/
    public function login_out()
    {
        session(null);
        redirect('login');
    }
}