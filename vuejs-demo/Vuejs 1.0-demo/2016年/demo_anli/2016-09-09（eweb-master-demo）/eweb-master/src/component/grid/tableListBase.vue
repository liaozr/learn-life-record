<template>
  <div :class="tableCss.tableBox" :style="stylein">
    <table :class="classname">
        <thead>
              <tr>
                <th v-for="tone in headercaption" :style="tone.style">
                      <input type="checkBox" name="name" value="" v-if="tone.checkbox" :class='tableCss.checkTag' @click="checkedAll" v-model="all">
                      {{tone.name}}
                      <span  v-if="tone.sort">升序</span>
                      <span  v-if="tone.sort">降序</span>
                </th>
              </tr>
        </thead>
        <tbody  v-show="loading? false:noresult? false: true">
              <tr v-for="(order, done)  in dataList" :class="order%2 == 1? tableCss.active:''">
                    <!--id-->
                    <td  v-for="sone in headercaption" :class="tableCss[sone.attr]">
                          <input type="checkBox" name="name" value="" v-if="sone.checkbox"  :class='tableCss.checkTag' :checked="checked" @click="clickOne(done[codevalue])">
                          <span v-if="sone.type == 'data'" ><span v-if="sone.attr == 'price'">￥</span>{{done[sone.labelValue]}}</span>
                          <span v-if="sone.type == 'index'" >{{order + 1}}</span>
                          <span v-if="sone.type == 'operator'" >
                                <iconbar v-if="sone.icon"  :buttons="btnData(done)"  @btnclick="btnEventHandler"></iconbar>
                                <btnbar :buttons="btnData(done)"  @btnclick="btnEventHandler" v-else></btnbar>
                          </span>
                    </td>
              </tr>
        </tbody>
    </table>
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
import tableCss from "./tableCss.css";
import btnbar from "component/sprite/buttonbar";
import iconbar from "component/sprite/iconbar";
import tableBase from "common/mixinTable.js";
export default {
  mixins:[tableBase],
  data: function () {
    return {
        tableCss
    }
  },
  created: function(){
    this.headercaption.unshift({type:"index"});
  },
  ready: function () {},
  attached: function () {},
  components: {btnbar, iconbar},
}
</script>
