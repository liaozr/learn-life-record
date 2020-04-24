<?php if (!defined('THINK_PATH')) exit();?><table width="100%" border="0" cellspacing="0" cellpadding="0" id="main-tab">
    <tr>
        <th class="borderright">商品号</th>
        <th class="borderright">类别</th>
        <th class="borderright">商品名称</th>
        <th class="borderright">品牌</th>
        <th class="borderright">商品简介</th>
        <th class="borderright">单价</th>
        <th class="borderright">降价价格</th>
        <th class="borderright">商品图片</th>
        <th class="borderright">添加时间</th>
        <th class="borderright">库存</th>
        <th class="borderright">销量</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($goods)): $i = 0; $__LIST__ = $goods;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$goods): $mod = ($i % 2 );++$i;?><tr onMouseOut="this.style.backgroundColor='#ffffff'" onMouseOver="this.style.backgroundColor='#edf5ff'">
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['id']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['typename']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['goodsName']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['brands']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['descr']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['price']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['priceLower']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><img src="/yhWeb/Public/Uploads/<?php echo ($goods['picName']); ?>" alt="" width="100" height="100"></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo (date("y-m-d",$goods['addTime'])); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['stock']); ?></td>
            <td align='center' valign='middle' class='borderright borderbottom'><?php echo ($goods['sales']); ?></td>
            <td align='center' valign='middle'>
                <a href="/yhWeb/Admin/Goods/goodsUpdate/id/<?php echo ($goods['id']); ?>" target='mainFrame' onFocus='this.blur()' class='add'>编辑</a>
                <span class='gray'>&nbsp;|&nbsp;</span><a href='#' target='mainFrame' onFocus='this.blur()' class='add'>删除</a>
                <?php switch($_GET['state']): case "2": ?><span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Goods/updateState/id/<?php echo ($goods['id']); ?>/state/3" target='mainFrame' onFocus='this.blur()' class='add'>下架</a><?php break;?>
                    <?php case "3": ?><span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Goods/updateState/id/<?php echo ($goods['id']); ?>/state/2" target='mainFrame' onFocus='this.blur()' class='add'>出售</a><?php break;?>
                    <?php default: ?>
                    <span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Goods/updateState/id/<?php echo ($goods['id']); ?>/state/2" target='mainFrame' onFocus='this.blur()' class='add'>出售</a>
                    <span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Goods/updateState/id/<?php echo ($goods['id']); ?>/state/3" target='mainFrame' onFocus='this.blur()' class='add'>下架</a><?php endswitch;?>
            </td>
        </tr><?php endforeach; endif; else: echo "" ;endif; ?>
</table>