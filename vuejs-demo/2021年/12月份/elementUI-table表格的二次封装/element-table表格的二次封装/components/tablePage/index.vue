<template>
  <div class="tablePage">
    <div class="filterPane">
      <filterPane v-bind="$attrs" v-on="$listeners"></filterPane>
    </div>
    <div class="table">
      <tablePane v-bind="$attrs" v-on="$listeners">
        <slot name="toolRight" slot="toolRight"></slot>
      </tablePane>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import filterPane from "@/components/filterPane/index";
import tablePane from  "@/components/tablePane/index";
export default {
  components: {
    filterPane,
    tablePane
  },
  // ComponentB又调用了ComponentC,
  // 若想在ComponentC获取ComponentA传输过来的没被ComponentB接收的非props数据,则组件ComponentB可以这么写:
  // v-bind="$attrs"  v-on="$listeners"
  props: {
    // filterData: {
    //   type: Object
    // },
    // dataSource:{
    //    type: Object
    // }
  },
  data(){
    return{
    };
  },
  mounted(){
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
</style>
                                        
