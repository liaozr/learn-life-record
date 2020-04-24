<?php
/**
 * Created by PhpStorm.
 * User: lenovo
 * Date: 2016/5/8
 * Time: 18:50
 */

namespace Home\Model;

use Think\Model;

class PropertyModel extends Model
{
    protected $tableName = 'property';

    public function getProperty($typeid)
    {
        $arr = $this->where("typeId=$typeid")->select();
        if (empty($arr)) {
            $child = $this->table('type')->where("pid=$typeid")->find();
            $arr = $this->where("typeId={$child['id']}")->select();
        }
        foreach ($arr as $key => $val) {
            $proValue = explode(',', $val['propertyValue']);
            $property[$key]['propertyName'] = $val['propertyName'];
            $property[$key]['propertyValue'] = $proValue;
        }

        return $property;
    }

    //获取商品属性
    public function getGoodsProperty($property)
    {
        $arr = explode(",", $property);
        foreach ($arr as $key => $val) {
            $res = explode(":", $val);
            $m = M('property');
            $result = $m->find($res[0]);
            $value = explode(",", $result['propertyValue']);
            $goodsproperty[$key]['propertyName'] = $result['propertyName'];
            $goodsproperty[$key]['propertyValue'] = $value[$res[1]];
        }
        return $goodsproperty;

    }

    public function getVersion($version)
    {
        foreach ($version as $key => $val) {
            $proValue = explode(',', $val['propertyValue']);
            $property[$key]['propertyName'] = $val['propertyName'];
            $property[$key]['propertyValue'] = $proValue;

        }
        return $property;
    }


}