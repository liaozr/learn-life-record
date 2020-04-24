<?php if (!defined('THINK_PATH')) exit();?><table class="table table-bordered table-striped table-hover text-center">
    <tr>
        <th>编号</th>
        <th>类名</th>
        <th>父类ID</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($type)): $i = 0; $__LIST__ = $type;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$showType): $mod = ($i % 2 );++$i;?><tr>
            <td id="showTypeId"><?php echo ($showType["id"]); ?></td>
            <td><?php echo ($showType["name"]); ?></td>
            <td><?php echo ($showType["pid"]); ?></td>
            <td>
                <a href='/yhWeb/Admin/Type/selectChild?id=<?php echo ($showType["id"]); ?>' target='mainFrame' onFocus='this.blur()' class='showChild'>查看子类</a>
                <span class='gray'>&nbsp;|&nbsp;</span><a href="/yhWeb/Admin/Type/addType?id=<?php echo ($showType["id"]); ?>" target='mainFrame' onFocus='this.blur()' class='add'>添加分类</a>
                <span class='gray'>&nbsp;|&nbsp;</span><a href='#' target='mainFrame' onFocus='this.blur()' class='add'>删除</a>
                <span class='gray'>&nbsp;|&nbsp;</span><a href='/yhWeb/Admin/Type/typeUpdate/id/<?php echo ($showType["id"]); ?>' target='mainFrame' onFocus='this.blur()' class='add'>修改</a>
            </td>
        </tr><?php endforeach; endif; else: echo "" ;endif; ?>
</table>