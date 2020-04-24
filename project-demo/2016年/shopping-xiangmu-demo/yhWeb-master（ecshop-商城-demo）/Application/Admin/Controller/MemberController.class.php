<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/29 9:34
 */

namespace Admin\Controller;

use Think\Controller;

class MemberController extends Controller
{
    public function addMember()
    {
        $this->display();
    }

    /*后台用户添加*/
    public function add()
    {
        $upload = new \Think\Upload();
        $upload->maxSize = 3145728;
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');
        $upload->rootPath = './Public/Uploads/';
        $upload->autoSub = false;
        $info = $upload->upload();
        if (!$info) {
            $this->error($upload->getError());
        } else {
            $data['face'] = $info['face']['savename'];
        }
        $data['userName'] = $_POST['userName'];
        $res = $this->checkUserName($_POST['userName']);
        if (!$res) {
            $data['passWord'] = $_POST['passWord'];
            $data['trueName'] = $_POST['trueName'];
            $data['sex'] = $_POST['sex'];
            $data['email'] = $_POST['email'];
            $data['phone'] = $_POST['phone'];
            $data['regTime'] = time();
            $m = M('user');
            if ($m->add($data)) {
                redirect('memberList');
            } else {
                $this->error('添加失败');
            }
        } else {
            $this->error('用户已存在');
        }

    }

    /*检查用户名是否存在*/
    public function checkUserName($userName)
    {
        $m = M('user');
        $where['userName'] = $userName;
        $res = $m->where($where)->find();
        return $res;
    }

    /*会员列表页*/
    public function memberList()
    {
        $m = M('user');
        $user = $m->select();
        $this->assign('user', $user);
        $this->display();
    }

    /*
     * 修改用户状态
     * */
    public function ban()
    {
        $id = $_POST['id'];
        /*
           * id=78
           * 修改id=78的用户的activeflag 的值为0
           * */
        $m = M('User');
        $res = $m->find($id);
        $flag = $res['activeFlag'];
        if ($flag) {
            $arr['activeFlag'] = 0;
        } else {
            $arr['activeFlag'] = 1;
        }

        $result = $m->where("id=$id")->save($arr);
        if ($result) {
            $data['status'] = '1';
            $data['msg'] = 'success';
        } else {
            $data['status'] = '-1';
            $data['msg'] = 'faile';
        }
        $this->ajaxReturn($data);
    }

    /*删除会员*/
    public function del()
    {
        $m = M('user');
        $id = $_GET['id'];
        $res = $m->where("id=$id")->delete();
        if ($res) {
            $this->redirect('memberList');
        } else {
            $this->error('删除失败');
        }
    }

    /*修改会员*/
    public function updateMember()
    {
        $m = M('user');
        $id = $_GET['id'];
        $result = $m->where("id=$id")->find();
        $this->assign('result', $result);
        $this->display();
    }

    /*修改用户操作*/
    public function upd()
    {
        $upload = new \Think\Upload();
        $upload->maxSize = 3145728;
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');
        $upload->rootPath = './Public/Uploads/';
        $upload->autoSub = false;
        $info = $upload->upload();
        if ($info['face']['savename']) {
            $data['face'] = $info['face']['savename'];
        }
        $data['userName'] = $_POST['userName'];
        $data['passWord'] = $_POST['passWord'];
        $data['trueName'] = $_POST['trueName'];
        $data['sex'] = $_POST['sex'];
        $data['email'] = $_POST['email'];
        $data['phone'] = $_POST['phone'];
        $data['regTime'] = time();
        $m = M('user');
        $id = $_POST['id'];
        $result = $m->where("id=$id")->save($data);
        if ($result) {
            redirect('memberList');
        } else {
            $this->error('修改失败');
        }

    }

}