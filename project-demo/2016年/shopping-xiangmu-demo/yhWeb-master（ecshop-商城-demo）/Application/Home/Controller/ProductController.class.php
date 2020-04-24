<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/7 14:07
 */

namespace Home\Controller;

use Think\Controller;

class ProductController extends PublicController
{

    public function index($id)
    {
        $typeobj = D('Type');
        $typerows = $typeobj->indexType();
        $goodsobj = D('Goods');
        $goodsobj->updateClick($id);
        $scangoods=$goodsobj->field("id,goodsName,price,picName")->find($id);
        if(empty($_SESSION[$this->tempid]))
        {
            $_SESSION[$this->tempid][0]=$scangoods;
        }
        else
        {
            foreach($_SESSION[$this->tempid] as $key=>$val)
            {
                if($val['id']==$id)
                {
                    $isarray=true;
                    break;
                }
            }
            if(!$isarray)
            {
                $_SESSION[$this->tempid][]=$scangoods;
            }
        }
        $goodsdetail = $goodsobj->getGoodsDetail($id);
        if($collection=$goodsobj->table('collection')->where("goodsId=$id AND userId={$_SESSION['userId']}")->find())
        {
          $goodsdetail['class']='collect';
        }
        $goodsLike=$goodsobj->field('id,goodsName,price,picName')->where("path='{$goodsdetail['goods']['path']}'")->order('sales desc')->limit(10)->select();
        $goodsimg=$goodsobj->table('goods_img')->where("goodsId=$id")->find();
        $goodsimg['picDetail']=explode(',',$goodsimg['picDetail']);
        $this->assign('goodsimg',$goodsimg);
        $this->assign('goodsLike',$goodsLike);
        $this->assign('typerows', $typerows);
        $this->assign('goodsdetail', $goodsdetail);
        $this->display('Product');
    }
    public function getProperty($goodsid)
    {
        $m = M('goods');
        $goods = $m->find($goodsid);
        $arr = explode(",", $goods['property']);
        foreach ($arr as $key => $val) {
            $res = explode(":", $val);
            $m = M('property');
            $result = $m->find($res[0]);
            $value = explode(",", $result['propertyValue']);
            $property[$key]['propertyName'] = $result['propertyName'];
            $property[$key]['propertyValue'] = $value[$res[1]];
        }

    }

}
