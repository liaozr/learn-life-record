<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/29 9:36
 */

namespace Admin\Controller;

use Think\Controller;

class TypeController extends PublicController
{
    public function index()
    {
        $m = M('type');
        $allpage = $m->count();
        $allpage = ceil($allpage / 10);
        $result = $m->page(1, 10)->select();
        $this->assign('allpage', $allpage);
        $this->assign('type', $result);
        $this->display('typeList');
    }

    public function addType($id)
    {
        $m = M('type');
        $ptype = $m->find($id);
        $this->assign('ptype', $ptype);
        $this->display();
    }

    public function add()
    {
        $m = M('type');
        if ($m->add($_POST)) {
            $this->success('新增成功', 'index');
        } else {
            $this->error('新增失败');
        }
    }

    public function selectChild($id)
    {
        $m = D('Type');
        $arr = $m->selectChildType($id);
        $header = $m->find($id);
        $header['childnum'] = count($arr);
        $arr = array_chunk($arr, 10);
        $allpage = ceil($header['childnum'] / 10);
        $this->assign('header', $header);
        $this->assign('allpage', $allpage);
        $this->assign('type', $arr);
        $this->display('showChildType');
    }

    public function typeUpdate($id)
    {
        $m = M('type');
        $data = $m->where("id=$id")->find();
        $this->assign('data', $data);
        $this->display();
    }

    public function typeUpdateAct()
    {
        $m = M('type');
        if ($m->where("id={$_POST['id']}")->save($_POST)) {
            $this->success('修改成功', 'index');
        } else {
            $this->error('修改失败');
        }
    }
//    public function test()
//    {
//        $d=D('Type');
//        dump($d->getTree());
//    }


}