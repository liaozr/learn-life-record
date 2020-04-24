<?php
namespace Home\Controller;

use Think\Controller;
use Think\Verify;

class IndexController extends PublicController
{
    public function Index()
    {
        $d = D('Goods');
        $indexGoods = $d->indexGoods();
        $hotgoods = $d->hotGoods();
        $limitgoods = $d->LimitTime();
        $youlike = $d->getyoulike();
        $this->assign('limit', $limitgoods);
        $this->assign('showGoods', $indexGoods);
        $this->assign('hotgoods', $hotgoods);
        $this->assign('youlike', $youlike);
        //$this->buildHtml('index', HTML_PATH . '/index/', 'index', 'utf8');
        $this->display();
    }

    public function Login()
    {
        $this->display();
    }

    public function Regist()
    {
        $this->display();
    }

    public function Product()
    {
        $this->display();
    }

}