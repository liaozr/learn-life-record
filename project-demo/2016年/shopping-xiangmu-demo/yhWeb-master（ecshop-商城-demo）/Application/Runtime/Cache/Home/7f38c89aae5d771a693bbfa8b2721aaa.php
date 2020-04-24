<?php if (!defined('THINK_PATH')) exit();?><div class="list_t">
            	<span class="fl list_or">
                    <?php if(($select) == ""): ?><a href="/yhWeb/Home/CategoryList/goodSort" class="now">默认</a>
                        <?php else: ?>
                        <a href="/yhWeb/Home/CategoryList/goodSort">默认</a><?php endif; ?>
                     <?php if(($select) == "sales"): ?><a href="/yhWeb/Home/CategoryList/goodSort/act/sales" class="now">
                        <span class="fl">销量</span>
                        <span class="i_up">销量从低到高显示</span>
                        <span class="i_down">销量从高到低显示</span>
                    </a>
                         <?php else: ?>
                         <a href="/yhWeb/Home/CategoryList/goodSort/act/sales">
                             <span class="fl">销量</span>
                             <span class="i_up">销量从低到高显示</span>
                             <span class="i_down">销量从高到低显示</span>
                         </a><?php endif; ?>
                     <?php if(($select) == "price"): ?><a href="/yhWeb/Home/CategoryList/goodSort/act/price" class="now">
                        <span class="fl">价格</span>
                        <span class="i_up">价格从低到高显示</span>
                        <span class="i_down">价格从高到低显示</span>
                    </a>
                         <?php else: ?>
                         <a href="/yhWeb/Home/CategoryList/goodSort/act/price" >
                             <span class="fl">价格</span>
                             <span class="i_up">价格从低到高显示</span>
                             <span class="i_down">价格从高到低显示</span>
                         </a><?php endif; ?>
                     <!--<?php if(($select) == "new"): ?>-->
                         <!--<a href="/yhWeb/Home/CategoryList/goodSort/act/new" class="now">新品</a>-->
                         <!--<?php else: ?>-->
                         <!--<a href="/yhWeb/Home/CategoryList/goodSort/act/new">新品</a>-->
                     <!--<?php endif; ?>-->
                </span>
    <span class="fr" id="count">共发现<?php echo (count($Filtergoods)); ?>件</span>
</div>
<div class="list_c">
    <ul class="cate_list">
        <?php if(is_array($Filtergoods)): $i = 0; $__LIST__ = $Filtergoods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><li>
                <div class="img"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><img src="/yhWeb/Public/Uploads/<?php echo ($goods["picName"]); ?>" width="210" height="185"/></a></div>
                <div class="price">
                    <font>￥<span><?php echo ($goods["price"]); ?></span></font> &nbsp;
                </div>
                <div class="name"><a href="/yhWeb/Home/Product/index/id/<?php echo ($goods["id"]); ?>"><?php echo ($goods["goodsName"]); ?></a></div>
                <div class="carbg">
                    <a href="javascript:addCollection('MyDiv','fade',<?php echo ($goods["id"]); ?>,this);" class="ss <?php echo ($goods["class"]); ?>">收藏</a>
                    <a onclick="ShowDiv_1('MyDiv1','fade1',<?php echo ($goods["id"]); ?>)" class="j_car">加入购物车</a>
                </div>
            </li><?php endforeach; endif; else: echo "" ;endif; ?>
    </ul>
    <div class="pages">
        <a href="#" class="p_pre">上一页</a><a href="#" class="cur">1</a><a href="#">2</a><a href="#">3</a>...<a href="#">20</a><a href="#" class="p_pre">下一页</a>
    </div>
</div>