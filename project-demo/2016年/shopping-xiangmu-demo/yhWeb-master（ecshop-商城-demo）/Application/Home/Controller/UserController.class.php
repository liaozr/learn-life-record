<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/26 19:55
 */
namespace Home\Controller;

use Think\Controller;
use Think\Verify;

class UserController extends Controller
{
    //注册页面
    public function Regist()
    {
        $this->display();
    }

    /*注册会员程序*/
    public function register_action()
    {
        $data['userName'] = $_POST['userName'];
        $data['passWord'] = $_POST['passWord'];
        $data['email'] = $_POST['email'];
        $data['phone'] = $_POST['phone'];
        $data['regTime'] = time();
        $user = M('user');
        $res = $user->add($data);
        if ($res) {
            session('userName', $_POST['userName']);
            session('userId', $res);
            $result['status'] = 1;
        } else {
            $result['status'] = 2;
        }
        $this->ajaxReturn($result);
    }

    /*用户名是否存在验证*/
    public function checkUserName()
    {

        $userName = I('post.userName');

        $list = M('user')->where(array('userName' => $userName))->select();

        $list = $list[0];

        if (!empty($list)) {

            echo 1;

        }

    }

    /*email是否存在验证*/
    public function checkEmail()
    {

        $email = I('post.email');

        $list = M('user')->where(array('email' => $email))->select();

        $list = $list[0];

        if (!empty($list)) {

            echo 1;

        }

    }

    /*手机号是否存在验证*/
    public function phone()
    {

        $phone = I('post.phone');

        $list = M('user')->where(array('phone' => $phone))->select();

        $list = $list[0];

        if (!empty($list)) {
            echo 1;
        }
    }

    //登录页面
    public function Login()
    {
        $this->display();
    }

    /*
     * 会员登录程序
     * */
    public function login_action()
    {
        $u = M('user');
        $data['userName'] = $_POST['userName'];
        $data['passWord'] = $_POST['passWord'];
        $data['activeFlag'] = 1;
        $r = $u->where($data)->find();
        if ($r) {
            session('userName', $_POST['userName']);
            session('passWord', $_POST['passWord']);
            session('userId', $r['id']);
            $result['status'] = 1;
        } else {
            $r = $u->where("userName={$data['userName']}")->find();
            if($r['activeFlag']==0)
            {
                $result['status'] = 3;
            }
            else
            {
                $result['status'] = 2;
            }
        }
        $this->ajaxReturn($result);
    }

    /*
     * 用户注销程序
     * */
    public function loginout()
    {
        session(null);
        redirect('../Index/');
    }

    //验证码
    public function verify()
    {
        $config = array(
            'fontSize' => 28,    // 验证码字体大小
            'length' => 4,     // 验证码位数
            'useNoise' => true, // 关闭验证码杂点);
        );
        $verify = new Verify($config);
        $verify->entry();
    }

    //验证码检测
    public function check_verify($code, $id = '')
    {
        $verify = new Verify();
        if ($verify->check($code, $id)) {
            echo 1;
        }
    }

}