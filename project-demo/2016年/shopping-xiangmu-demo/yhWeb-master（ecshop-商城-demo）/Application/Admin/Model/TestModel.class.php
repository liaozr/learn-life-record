<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/6 10:40
 */

namespace Admin\Model;

use Think\Model;

class TestModel
{
    public function updatePath($pid = 0, &$arr = array(), $index = 0, $pathPid = 1)
    {
        $index++;
        $m = M('type');
        $type = $m->where("pid=$pid")->select();
        foreach ($type as $key => $val) {
            if ($index == 2) {
                $type[$key]['path'] = $pathPid . ",";
            } else if ($index == 3) {
                $type[$key]['path'] = $pathPid . "," . $val['pid'] . ",";
            } else {
                $pathPid = $val['id'];
            }
            $data['path'] = $type[$key]['path'];
            $m->where("id={$val['id']}")->save($data);
            $arr[] = $type[$key];
            $pid = $val['id'];
            $this->updatePath($pid, $arr, $index, $pathPid);
        }
        return $arr;
    }

    public function test()
    {
        $arr = $this->updatePath();
        dump($arr);
    }

}