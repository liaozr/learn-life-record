# 三级联动弹窗，地址选择弹窗，可选长度

三级联动弹窗，地址选择弹窗，可选长度

| `QQ交流群(607391225)`         | `微信交流群（加我好友备注"进群"）`                  |
| ----------------------------|--------------------------- |
|![QQ交流群](http://qn.kemean.cn//upload/202004/14/15868301778472k7oubi6.png)|![微信交流群](https://qn.kemean.cn/upload/202010/13/weiXin_group_code.jpg)|
| QQ群号：607391225 |微信号：zhou0612wei|

### [点击跳转-5年的web前端开源的uni-app快速开发模板-下载看文档](https://ext.dcloud.net.cn/plugin?id=2009)

### 案例一
```
<z-address-popup v-model="true" :dataList="[]" @change="addressChange" :length="3" :force="force"></z-address-popup>
```

### 属性
| 名称                        | 类型          | 默认值          | 描述                                               |
| ----------------------------|--------------- | ------------- | ---------------------------------------------------|
| dataList                    | Array         | []          | 默认值|
| length                      | Number        | 3          | 地区选择长度（1-3）                |
| force                     | Boolean       | true          | 强制选择，选择长度必须达到指定长度|
| value                     | Boolean       | false     	| 控制弹窗是否打开 |

### 事件
| 名称             | 类型              | 描述                      |
| -----------------|------------------ | --------------------------|
| @change        | function | 选择时数据返回    |
