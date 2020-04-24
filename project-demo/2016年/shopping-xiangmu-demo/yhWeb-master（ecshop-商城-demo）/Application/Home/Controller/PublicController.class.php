<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/10 11:12
 */

namespace Home\Controller;

use Think\Controller;

class PublicController extends Controller
{
    public $tempid;
    function __construct()
    {
        parent::__construct();
        if (!isset($_SESSION['typerows'])||empty($_SESSION['typerows'])) {
            $typeobj = D('Type');
            $typerows = $typeobj->indexType();
            session('typerows', $typerows);

        }
        if(isset($_SESSION['userId'])&&!empty($_SESSION['userId'])) {
            $d = D('Cart');
            $data = $d->userCart($_SESSION['userId']);
            session('cart', $data);
        }
        else
        {
            $this->tempid=md5($_SERVER['REMOTE_ADDR']);
        }
    }
}