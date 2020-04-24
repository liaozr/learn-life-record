<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/1 12:17
 */

namespace Home\Model;

use Think\Model;

class IndexModel extends Model
{
    protected $tableName = 'type';

    public function indexType()
    {
        $one = $this->table('type')->where('pid = 0')->select();
        $iconIndex = 1;
        foreach ($one as $key => $val) {
            $one[$key]['icon'] = "nav" . $iconIndex . ".png";
            $id = $val['id'];
            $typerows[] = $this->type_Loop($id, $one[$key]);
            $iconIndex++;
        }
        return $typerows;
    }

    function type_Loop($id, $one)
    {
        if ($row = $this->table('type')->where("pid = $id")->select()) {
            foreach ($row as $key => $val) {
                $id = $val['id'];
                $rows['one'] = $one;
                $row[$key]['three'] = $this->table('type')->where("pid = $id")->select();
                $rows['two'] = $row;
                if ($row[$key][$id])
                    $rows['two'][] = $row[$key][$id];
            }
            return $rows;
        } else {
            $rows['one'] = $one;
            return $rows;
        }
    }

    public function hotGoods()
    {
        $goods = $this->table('goods')->where('isHot=1')->select();
        return $goods;
    }

    public function typeAll($id = 0, &$arr = array())
    {
        if ($type = $this->table('type')->where("pid=$id")->select()) {
            foreach ($type as $key => $val) {
                $arr[] = $type[$key];
                $id = $val['id'];
                $this->typeAll($id, $arr);
            }

        }
        return $arr;
    }

    public function showGoods()
    {
        $res = $this->typeAlltest();
        $goods = $this->table('goods')->select();
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
        $type = $this->where("pid=$id")->select();
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

    public function LimitTime()
    {
        $goods = $this->table('goods')->where('isLimitime=1')->limit(4)->select();
        $subject = $this->table('subject')->limit(2)->select();
        $goods[4] = $subject[0];
        $goods[5] = $subject[1];
        return $goods;
    }
}