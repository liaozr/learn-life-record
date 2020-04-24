<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/4/29 9:26
 */

namespace Home\Controller;

use Think\Controller;

class CategoryListController extends PublicController
{
    public function index($typeid,$condition=null)
    {
        session('typeId', $typeid);
        $type = D('Type');
        $navPath = $type->navPath($typeid);
        $brand = D('Goods');
        $brands = $brand->getBrand($typeid);
        $goods = $brand->getGoods($typeid,$condition);
        $property = D('Property');
        $goodspro = $property->getProperty($typeid);
        $goods=$this->addConllectClass($goods);
        $this->assign('typeId', $typeid);
        $this->assign('goodspro', $goodspro);
        $this->assign('Filtergoods', $goods);
        $this->assign('brand', $brands);
        $this->assign('path', $navPath);
        $this->assign('select',$condition);
        $this->assign('scanHistory',$_SESSION[$this->tempid]);
        $this->display('CategoryList');
    }

    public function goodsFilter()
    {
        $d = D('Goods');
        if (empty($_POST['property']) || !isset($_POST['property'])) {
            $res = $d->getGoods($_POST['typeId']);
        } else {
            $res = $d->field('id,goodsName,price,priceLower,picName')->where("CONCAT(descr,goodsName) LIKE '%{$_POST['property']}'")->select();
        }
        $res=$this->addConllectClass($res);
        $this->assign('Filtergoods', $res);
        $this->display('CategoryListChild');
    }

    public function search()
    {
        $d = D('Goods');
        $res = $d->field('id,typeId,goodsName,price,priceLower,picName')->where("CONCAT(goodsName,descr) LIKE '%{$_POST['search']}%'AND state=2")->select();
        if (empty($res)) {
            $type = $d->table('type')->where("name LIKE '%{$_POST['search']}%'")->select();
            foreach ($type as $key => $val) {
                $res = $d->field('id,typeId,goodsName,price,priceLower,picName')->where("typeId={$val['id']} AND state=2")->select();
            }
        }
        $brands = $d->getBrand($res[0]['typeId']);
        $property = D('Property');
        $goodspro = $property->getProperty($res[0]['typeId']);
        $res=$this->addConllectClass($res);
        $this->assign('goodspro', $goodspro);
        $this->assign('Filtergoods', $res);
        $this->assign('brand', $brands);
        $this->display('CategoryList');

    }
    public function emptyHistory()
    {
         session($this->tempid,null);
    }
    public function addCollection($id)
    {
        $d = D('Goods');
        if(empty($_SESSION['userId']))
        {
            $data['status']=0;
        }
        else
        {
            if(!($d->table('collection')->where("goodsId=$id")->find()))
            {
                $data=$d->field('goodsName,price,picName')->find($id);
                $data['goodsId']=$id;
                $data['userId']=$_SESSION['userId'];
                $m=M('collection');
                $m->add($data);
            }

            $data['status']=1;
        }
        $this->ajaxReturn($data);

    }
    public function addConllectClass($goods)
    {
        $m=M('collection');
        $collect=$m->where("userId={$_SESSION['userId']}")->select();
        foreach($goods as $keys=>$vals)
        {
            foreach($collect as $key=>$val)
            {
                if($vals['id']==$val['goodsId'])
                {
                    $goods[$keys]['class']='conllect';
                }
            }
        }
        return $goods;
    }
    public function goodSort($act=null)
    {
        switch($act)
        {
            case 'sales':
                $this->index($_SESSION['typeId'],$act);
                break;
            case 'price':
                $this->index($_SESSION['typeId'],$act);
                break;
            case 'new':
                $this->index($_SESSION['typeId'],'addTime');
                break;
            default:
                $this->index($_SESSION['typeId']);
                break;
        }
    }


}