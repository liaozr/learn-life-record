<template>
  <div :class="tableCss.tableBox" :style="stylein">
    <table :class="classname">
        <thead>
              <tr>
                <th v-for="tone in headercaption" :style="tone.style">
                      <input type="checkBox" name="name" value="" v-if="tone.checkbox" :class='tableCss.checkTag' @click="checkedAll" v-model="all">
                      {{tone.name}}
                </th>
              </tr>
        </thead>
        <tbody  v-show="loading? false:noresult? false: true">
              <tr v-for="(order, done)  in dataList" >
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="tableCss[sone.attr]">
                          <input type="checkBox" name="name" value="" v-if="sone.checkbox"  :class='tableCss.checkTag' :checked="checked" @click="clickOne(done[codevalue])">
                          <span v-if="sone.type == 'data'" ><span v-if="sone.attr == 'price'">￥</span>{{done[sone.labelValue]}}</span>
                          <span v-if="sone.type == 'edit'" >
                                <input type="text" name="name" :class='tableCss.inptext' :value="done[sone.labelValue]" v-model="done[sone.labelValue]">
                          </span>
                          <span v-if="sone.type == 'operator'" >
                                <iconbar  :buttons="btnData(done)"  @btnclick="btnEventHandler"></iconbar>
                          </span>
                    </td>
              </tr>
              <tr>
                  <td  v-for="sone in headercaption">
                    <input type="text" name="name" value="" :class='tableCss.enterKey' @keyup.enter="onEnterLook" v-if="sone.labelValue == enterdep">
                  </td>
              </tr>
        </tbody>
    </table>
    {{dataList | json}}
    <div v-show="noresult" :class='tableCss.noresult'>
          没有数据
    </div>
    <div v-show="loading"  :class='tableCss.loading'>
          加载中...
    </div>
  </div>
</template>

<script>
import Utils from "common/Utils";
import tableCss from "./tablespec.css";
import iconbar from "component/sprite/iconbar";
import tableBase from "common/mixinTable.js";
export default {
  mixins:[tableBase],
  props:{
    enterdep: {
      type: String,
      default:"id"
    },

    enterUrl: {
      type: String,
      default:""
    }
  },
  data: function () {
    return {
        tableCss
    }
  },
  created: function(){
  },
  ready: function () {
  },
  methods:{
    onEnterLook: function(e) {
        console.log(e.target.value);
        this.$http.get(this.$Api+ (this.enterUrl || ""),{params:{id: e.target.value}}).then((res) => {
            console.log(res);
            this.dataList.push({"orderid":Math.random(),"name":"杭州谷鼎暖通设备有限公司","date":"xxx","type":"xxx","contact":"xxx","phone":"xxx","account":"xxx","cash":"12"});
        },(error) =>{
          console.log(error);
        })
    },
  },
  attached: function () {},
  components: {iconbar},
}
</script>
