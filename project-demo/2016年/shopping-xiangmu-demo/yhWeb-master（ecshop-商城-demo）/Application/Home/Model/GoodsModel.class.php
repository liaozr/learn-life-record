<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/5 11:00
 */

namespace Home\Model;

use Think\Model;

class GoodsModel extends Model
{
    protected $tableName = 'goods';

    public function showGoods($arr)
    {
        foreach ($arr as $key => $val) {
            $goods[$key][0] = $val[0]['name'];
            if ($res = $this->where("typeId={$val[0]['id']} AND state=2")->select()) {
                $goods[$key][3] = $res;
            }
            foreach ($val[1] as $keys => $vals) {
                $goods[$key][1][] = $vals['name'];
                if ($res = $this->field('id,goodsName,price,priceLower,picName')->where("typeId={$vals['id']} AND state=2")->select()) {
                    $goods[$key][3][] = $res[0];
                }

            }

        }
        return $goods;
    }

    public function hotGoods($id = null)
    {
        if (empty($id)) {
            $arr = $this->where('isHot=1 AND state=2')->select();
        } else {
            $arr = $this->field('id,goodsName,descr,price,priceLower,picName')->where("path LIKE '%,$id'OR path LIKE '$id,%'OR typeId=$id AND state=2")->order('sales desc')->limit(10)->select();

        }
        return $arr;
    }

    public function getBrand($typeid)
    {
        $arr = $this->distinct()->field('brands')->where("path LIKE '%,$typeid'OR typeId=$typeid AND state=2")->select();
        return $arr;
    }

    public function getGoods($typeid,$condition=null)
    {
        if(empty($condition)){
            $arr = $this->field('id,goodsName,price,priceLower,picName')->where("path LIKE '%,$typeid'OR typeId=$typeid AND state=2")->select();
        }
        else{
            $arr = $this->field('id,goodsName,price,priceLower,picName')->where("path LIKE '%,$typeid'OR typeId=$typeid AND state=2")->order("$condition desc")->select();
        }

        return $arr;
    }

    public function getGoodsDetail($id)
    {
        $goods = $this->find($id);
        $path = $goods['path'] . ',' . $goods['typeId'];
        $path = explode(',', $path);
        $patharr = '';
        foreach ($path as $key => $val) {
            $res = $this->table('type')->find($val);
            $patharr .= $res['name'] . '>';
        }
        $patharr .= $goods['goodsName'];
        $version = $this->table('property')->where("typeId={$goods['id']} AND version=1")->select();
        $properobj = D('Property');
        if (!empty($version)) {
            $version = $properobj->getVersion($version);
        }
        $property = $properobj->getGoodsProperty($goods['property']);
        $property = array_chunk($property, 4);
        $goodsDetail['goods'] = $goods;
        $goodsDetail['path'] = $patharr;
        $goodsDetail['version'] = $version;
        $goodsDetail['property'] = $property;
        return $goodsDetail;
    }

    public function LimitTime()
    {
        $goods = $this->where('isLimitime=1 AND state=2')->limit(6)->order('addTime desc')->select();
        foreach ($goods as $key => $val) {
            $res = $this->table('goods_img')->where("goodsId={$val['id']}")->find();
            if ($res) {
                if( empty($res['picPure']))
                {
                    $brr[] = $val;
                }
                else
                {
                    $goods[$key]['picPure'] = $res['picPure'];
                    $arr[] = $goods[$key];
                }
            } else {
                $brr[] = $val;
            }
        }
        $resgoods[0] = $brr;
        $resgoods[1] = $arr;
        return $resgoods;
    }

    public function indexGoods()
    {
        $res = $this->typeAlltest();
        $goods = $this->where("state=2")->select();
        foreach ($goods as $keys => $vals) {
            foreach ($res as $key => $val) {
                if (in_array($vals['typeId'], $val['id'])) {
                    $showGoods[$key][] = $vals;
                }
            }
        }
        return $showGoods;

    }

    public function typeAlltest($id = 0, &$arr = array(), $index = 0, &$pid = 1)
    {
        $index++;
        $type = $this->table('type')->where("pid=$id")->select();
        foreach ($type as $key => $val) {
            $id = $val['id'];
            if ($index == 1) {
                $pid = $id;
            }
            if ($index > 1) {
                $arr[$pid]['name'][] = $type[$key]['name'];
                $arr[$pid]['id'][] = $type[$key]['id'];
            }
            $this->typeAlltest($id, $arr, $index, $pid);
        }
        return $arr;
    }

    public function updateClick($id)
    {
        $this->where("id=$id")->setInc('click');
    }

    public function getyoulike()
    {
        if (isset($_SESSION['userId']) && !empty($_SESSION['userId'])) {
            $order = $this->field('path')->join('orders ON goods.id=orders.goodsId')->find();
            $arr = $this->field('id,goodsName,descr,price,picName')->where("path='{$order['path']}'AND state=2")->limit(10)->select();
            if (count($arr) < 10) {
                $length = 10 - count($arr);
                $cart = $this->field('path')->join('cart ON goods.id=cart.goodsId')->where("userId={$_SESSION['userId']}")->find();
                if (empty($cart)) {
                    $brr = $this->field('id,goodsName,descr,price,picName')->where("path!='{$order['path']}'AND state=2")->order('click desc')->limit($length)->select();
                } else {
                    $brr = $this->field('id,goodsName,descr,price,picName')->where("path='{$cart['path']}'AND state=2")->limit($length)->select();
                }
            } else {
                return $arr;
            }
            $arr = array_merge_recursive($arr, $brr);

        } else {
            $arr = $this->distinct(true)->field('id,goodsName,descr,price,picName')->where("state=2")->order('click desc')->limit(10)->select();
        }
        return $arr;
    }

}