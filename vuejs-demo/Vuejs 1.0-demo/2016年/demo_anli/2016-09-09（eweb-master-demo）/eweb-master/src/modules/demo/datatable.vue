<template>

    <tb :headercaption="headercaption" :loadtag="loadtag" :datas="testData" codevalue="orderid" @checkedchange="checkedchange" :events="tableEvents" enterdep="type"></tb>
</template>

<script>
import tb from "component/grid/tableSpec";
export default {
  data: function () {
    return {
      headercaption:[{name:"",checkbox: true},{name:"交易类型", labelValue:"type", type:"data"},{name:"订单号", labelValue:"orderid",type:"data"}, {name:"交易金额", labelValue:"cash",type:"data", attr:"price"},
                    {name:"交易日期", labelValue:"date",type:"data"},{name:"收款账号", labelValue:"account",type:"edit"}, {name:"收款账号名称", labelValue:"name", type:"data"},
                    {type:"operator", name:""}],
      loadtag: false,
      testData: [{"orderid":"xxx1","name":"杭州谷鼎暖通设备有限公司","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx2","name":"杭州谷鼎暖通设备有限公司","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx3","name":"杭州谷鼎暖通设备有限公司","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"},
                  {"orderid":"xxx4","name":"杭州谷鼎暖通设备有限公司","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"}],
      tableEvents:{
        operatorRender: function(d){
          return [{action:"delete",icon:"icon-delete"}]
        },
        operatorHandler: function(d){
          console.log(d);
        }
      }
    }
  },

  ready: function () {},
  attached: function () {},
  methods: {
    checkedchange: function(res){
      console.log(res);
    }
  },
  components: {tb},
}
</script>
