<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/28 16:49
 */

namespace Admin\Controller;

use Think\Controller;

class GoodsController extends Controller
{
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
            $_POST['picName'] = $info['picName']['savename'];
        }
        $_POST['addTime'] = time();
        $m = M('goods');
        $res = $m->table('type')->find($_POST['typeId']);
        $_POST['path'] = $res['path'];
        if ($goodsId = $m->add($_POST)) {
            $this->goodsList();
            } else {
                $this->error('新增失败');
         }

    }

    public function goodsList($page = 1)
    {
        $d = D('Goods');
        if ($_GET['state'] == 2) {
            $goods = $d->goodsList($page, 2);
        } elseif ($_GET['state'] == 3) {
            $goods = $d->goodsList($page, 3);
        } else {
            $goods = $d->goodsList($page);
        }
        $pagenum = $d->where("state={$_GET['state']}")->count();
        $pagenum = ceil($pagenum / 5);
        $this->assign('pagenum', $pagenum);
        $this->assign('goods', $goods);
        $this->display('goodsList');

    }

    public function addGoods()
    {
        $m = D('Type');
        $type = $m->typeAll();
        $this->assign('type', $type);
        $this->display();
    }

    public function ajaxgetProperty($typeId,$id)
    {
        $D = D('Property');
        $res = $D->ajaxGetProperty($typeId,$id);
        $this->ajaxReturn($res);
    }

    public function ajaxPage($page = 1, $state = 1)
    {
        $m = D('Goods');
        $goods = $m->goodsList($page, $state);
        $pagenum = $m->count();
        $pagenum = ceil($pagenum / 5);
        $this->assign('pagenum', $pagenum);
        $this->assign('goods', $goods);
        $this->display('goodsListChild');
    }

    public function addSubject()
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
            $_POST['picName'] = $info['picName']['savename'];
        }
        $_POST['addTime'] = time();
        $m = M('subject');
        if ($m->add($_POST)) {
            $this->success('新增成功', 'subject');
        } else {
            $this->error('新增失败');
        }
    }

    public function goodsImage()
    {
        $m=M('goods_img');
        $res=$m->select();
        foreach($res as $key=>$val)
        {
            if(!empty($val['picName']))
            {
                $picname=explode(',',$val['picName']);
                $data[$key]['picName']=$picname;
            }
            if(!empty($val['picDetail']))
            {
                $picdetail=explode(',',$val['picDetail']);
                $data[$key]['picDetail']=$picdetail;
            }
           if(!empty($val['picPure']))
           {
               $picPure=explode(',',$val['picPure']);
               $data[$key]['picPure']=$picPure;
           }
            $data[$key]['id']=$val['id'];
            $data[$key]['goodsId']=$val['goodsId'];
            $data[$key]['typeId']=$val['typeId'];
        }
        $this->assign('goodsimage',$data);
        $this->display('goodsImage');
    }

    public function goodsProperty()
    {
        $m = M('property');
        $res = $m->select();
        $this->assign('property', $res);
        $this->display();
    }

    public function addProperty()
    {
        $d = D('Type');
        $type = $d->typeAll();
        $this->assign('type', $type);
        $this->display();
    }

    public function addPropertyAct()
    {
        $d = D('Property');
        if ($d->add($_POST)) {
            $this->success("新增属性成功", 'goodsProperty');
        } else {
            $this->error('新增失败');
        }
    }

    public function goodsUpdate($id)
    {
        $d = D('Type');
        $type = $d->typeAll();
        $m = M('goods');
        $goods = $m->find($id);
        $this->assign('type', $type);
        $this->assign('goods', $goods);
        $this->display();
    }

    public function goodsUpdateAct()
    {
        foreach ($_POST as $key => $val) {
            if (!empty($val)) {
                $data[$key] = $val;
            }
        }
        $data['property'] = implode(",", $data['property']);
        if (!empty($_FILES['picName']['name'])) {
            $upload = new \Think\Upload();
            $upload->maxSize = 3145728;
            $upload->exts = array('jpg', 'gif', 'png', 'jpeg');
            $upload->rootPath = './Public/Uploads/';
            $upload->autoSub = false;
            $info = $upload->upload();
            if (!$info) {
                $this->error($upload->getError());
            } else {
                $data['picName'] = $info['picName']['savename'];
            }
        }
        $m = M('goods');
        if ($m->where("id={$data['id']}")->save($data)) {
            $this->goodsList();
        } else {
            $this->error('修改失败');
        }
    }

    public function updateState($id, $state)
    {
        $m = M('Goods');
        $data['id'] = intval($id);
        $data['state'] = intval($state);
        if ($m->save($data)) {
            $this->goodsList();
        } else {
            $this->error('修改失败');
        }

    }
    public function addGoodsImage()
    {
        $d = D('Type');
        $type = $d->typeAll();
        $this->assign('type', $type);
        $this->display();

    }
    public function goodsImageAct()
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
            foreach($info as $key=>$val)
            {
                switch($val['key'])
                {
                    case 'picName':
                        $picname[]=$val['savename'];
                        break;
                    case 'picDetail':
                        $picDetail[]=$val['savename'];
                        break;
                    case 'picPure':
                        $picPure[]=$val['savename'];
                        break;
                }
            }
            //$_POST['picName'] = $info['picName']['savename'];
        }
        if(!empty($picDetail))
        {
            $_POST['picDetail']=implode(',',$picDetail);
        }
       if(!empty($picname))
       {
           $_POST['picName']=implode(',',$picname);
       }
        if(!empty($picPure))
        {
            $_POST['picPure']=implode(',',$picPure);
        }
        $m=M('goods_img');
        if($m->add($_POST))
        {
            $this->goodsImage();
        }
        else{
            $this->error('添加失败');
        }

    }
    public function goodSearch()
    {
        $d = D('Goods');
        $goods = $d->where("goodsName LIKE '%{$_POST['keywords']}%' AND state={$_POST['state']}")->select();
        $pagenum=count($goods);
        $pagenum = ceil($pagenum / 5);
        $this->assign('goods', $goods);
        $this->assign('pagenum', $pagenum);
        $this->display('goodsList');
    }


}