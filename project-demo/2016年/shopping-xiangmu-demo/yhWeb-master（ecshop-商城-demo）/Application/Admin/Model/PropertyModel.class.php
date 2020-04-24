<?php
/**
 * Created by coder meng.
 * User: coder meng
 * Date: 2016/5/7 15:36
 */

namespace Admin\Model;

use Think\Model;

class PropertyModel extends Model
{
    protected $tableName = 'property';

    public function ajaxGetProperty($typeid,$id)
    {
        $arr = $this->where("typeId=$typeid")->select();
        $goods=$this->table('goods')->field('property')->find($id);
        $goodsproper=explode(',', $goods['property']);
        if (empty($arr)) {
            $type = $this->table('type')->where("id=$typeid")->find();
            $arr = $this->where("typeId={$type['pid']}")->select();
        }
        foreach ($arr as $keys => $vals) {
            $proValue = explode(',', $vals['propertyValue']);
            $property[$keys] = $vals['propertyName'];
            $property[$keys] .= "<select name='property[]'>";
            foreach ($proValue as $key => $val) {
                $value=$vals['id'].':'.$key;
                if(in_array($value,$goodsproper))
                {
                    $property[$keys] .= "<option value='{$vals['id']}:$key' selected>$val</option>";
                }
                else
                {
                    $property[$keys] .= "<option value='{$vals['id']}:$key'>$val</option>";
                }
            }
            $property[$keys] .= "</select>";
        }

        return $property;
    }
}