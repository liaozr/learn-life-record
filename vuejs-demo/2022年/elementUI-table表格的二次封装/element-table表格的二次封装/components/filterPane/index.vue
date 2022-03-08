<template>
  <div>
    <div
      v-if="!filterData.show"
      class="filter-container"
      :class="{'noBottom':!filterData.needFilterDataFlag && filterData.needFilterDataFlag !== '' && filterData.needFilterDataFlag !== undefined }"
    >
      <template v-if="filterData.elinput">
        <div class="list" :key="item.id" v-for="item in filterData.elinput">
          <span>{{item.name}}</span>
          <el-input
            v-model="listQuery[item.key]"
            :placeholder="item.name"
            clearable
            @clear="clear(item.key)"
            :style="{'width':item.width?item.width+'%':'68%'}"
            class="filter-item"
          />
        </div>
      </template>
      <template v-if="filterData.elselect">
        <div class="list" :key="item.id" v-for="item in filterData.elselect">
          <span>{{item.name}}</span>
          <el-select
            v-model="listQuery[item.key]"
            :placeholder="item.name"
            clearable
            @clear="clear(item.key)"
            @change="changeSelect(item.key,listQuery[item.key])"
            :style="{'width':item.width?item.width+'%':'68%'}"
            class="filter-item"
          >
            <template v-if="item.labelKey && item.valueKey">
              <el-option
                v-for="i in item.option"
                :key="i.key"
                :label="i[item.labelKey]"
                :value="i[item.valueKey]"
              />
            </template>
            <template v-else>
              <el-option v-for="i in item.option" :key="i.key" :label="i.label" :value="i.value" />
            </template>
          </el-select>
        </div>
      </template>

      <template v-if="filterData.elcascader">
        <div class="list" :key="item.id" v-for="item in filterData.elcascader">
          <span>{{item.name}}</span>
          <el-cascader
            v-model="listQuery[item.key]"
            :placeholder="item.name"
            clearable
            @change="handleChange(item.key,listQuery[item.key])"
            :options="item.option"
            :props="item.optionProps"
            :style="{'width':item.width?item.width+'%':'68%'}"
            class="filter-item"
          ></el-cascader>
        </div>
      </template>
      <!-- endStart  startTime  time  -->
      <template v-if="filterData.eldatePick">
        <div class="list" :key="item.id" v-for="item in filterData.eldatePick">
          <span>{{item.name}}</span>
          <el-date-picker
            v-model="searchDate[item.key]"
            :style="{'width':item.width?item.width+'%':'68%'}"
            :type="item.type || 'daterange'"
            start-placeholder="开始日期"
            range-separator="至"
            end-placeholder="结束日期"
            @change="changeDatePicker(item,searchDate[item.key])"
            class="filter-item"
          />
        </div>
      </template>
      <div v-if="filterData.needSearchBtn" class="btn">
        <el-button class="filter-item" type="primary" @click="handleSearch">搜索</el-button>
        <el-button class="filter-item" type="warning" @click="handleRest">重置</el-button>
      </div>
    </div>
    <div v-if="filterData.sortContainer && filterData.sortAjaxFlag" class="sort-container">
      <div class="tab-search">
        <div v-for="item in filterData.sortList" :key="item.id" class="tab-box flex-center">
          <h5 style="margin-bottom:10px;">{{item.name}}：</h5>
          <p
            v-if="item.key == 'countryId' "
            :class="{'active':!listQuery[item.key]}"
            @click="selectItem({id:''},item)"
          >全部</p>
          <p
            v-for="(item1,index) in item.lists"
            :key="index"
            :class="{'active':listQuery[item.key] == item1.id }"
            @click="selectItem(item1,item)"
          >{{item1.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    filterData: {
      type: Object
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dateRange: ["", ""],
      searchDate: {},
      listQuery: {
        siteId: "",
        countryId: "",
        shopoeeSiteId: "",
        shopAuthorizationSiteId: "",
        orderStatus: "", // 订单状态
      }
    };
  },
  watch: {
    "filterData"(val) {
      console.log(val);
      if (val.elinput.length > 0) {
        val.elinput.map(item => {
          this.listQuery[item.key] = "";
        });
      }
      if (val.elselect.length > 0) {
        val.elselect.map(item => {
          this.listQuery[item.key] = "";
        });
      }
      if (val.elcascader.length > 0) {
        val.elcascader.map(item => {
          this.listQuery[item.key] = "";
        });
      }
      if (val.sortList.length > 0) {
        val.sortList.map(item => {
          this.listQuery[item.key] = "";
        });
      }
      if (val.eldatePick.length > 0) {
        val.eldatePick.map(item => {
          this.listQuery[item.startTimeKey] = "";
          this.listQuery[item.endTimeKey] = "";
          this.searchDate[item.key] = "";
        });
      }
    },
    // 缓存进页面想清空可用
    "filterData.rest": {
      handler: function(val) {
        if (val) {
          this.handleRest();
        }
      },
      deep: true
    }
  },
  mounted(){
  },
  methods: {
    changeDatePicker(item, value){
      console.log(item);
      console.log(value);
      if(value){
        if(value.length > 0){
          if(item.startTimeKey){
            this.listQuery[item.startTimeKey] =  new Date(value[0]).getTime();
          }
          if(item.endTimeKey){
            this.listQuery[item.endTimeKey] =  new Date(value[1]).getTime();
          }
        }
      }
      if(value == "" || value === null){
        let msg = {
        };
        if(item.startTimeKey){
          msg[item.startTimeKey] = "";
        }
        if(item.endTimeKey){
          msg[item.endTimeKey] = "";
        }
        console.log(msg);
        this.searchDate = {};
        this.$emit("clear", msg);
      }
    },
    // sortContainer选择类别事件
    selectItem(item1, item){
      let key = item.key;
      if(key == "siteId"){
        if(item1.id == ""){
          console.log(item.key);
          this.listQuery[item.key] = "";
          this.listQuery.countryId = "";
          this.filterData.sortList[1].lists = [];
        }
        else{
          this.listQuery[item.key] = item1.id;
          this.filterData.sortList[1].lists = item1.children;
        }
        this.listQuery.countryId = "";
      }else{
        this.listQuery[item.key] = item1.id;
      }
      console.log(this.listQuery);
      this.$emit("searchEvent", this.listQuery);
    },
    // select选择器change事件
    changeSelect(type, value){
      console.log(type);
      console.log(value);
      let msg = {
        type: type,
        value: value || ""
      };
      this.$emit("changeSelect", msg);
    },
    // 级联选择器change事件
    handleChange(type, value){
      if(value == "" || value === null){
        this.clear(type);
      }
    },
    // 表单clear事件
    clear(type){
      let msg = {
      };
      msg[type] = "";
      this.$emit("clear", msg);
    },
    // 搜索面板搜索事件
    handleSearch() {
      console.log("搜索成功", this.listQuery);
      const data = JSON.parse(JSON.stringify(this.listQuery));
      // if(this.dateRange && this.dateRange[0] !== "") {
      //   const startTime = this.$moment(this.dateRange[0]).format("YYYY-MM-DD") + " 00:00:00";
      //   const endTime = this.$moment(this.dateRange[1]).format("YYYY-MM-DD") + " 23:59:59";
      //   data.beginDate = startTime;
      //   data.endDate = endTime;
      // }
      // Object.keys(data).forEach(function(key) {
      //   if (data[key] === "") {
      //     delete data[key];
      //   }
      // });

      this.$emit("searchEvent", data);
    },
    // 搜索面板重置
    handleRest() {
      this.listQuery.countryId = "";
      if(this.filterData.sortList){
        if(this.filterData.sortList.length > 1){
          this.filterData.sortList[1].lists = [];
        }
      }
      const data = JSON.parse(JSON.stringify(this.listQuery));
      Object.keys(data).forEach(function(key) {
        data[key] = "";
      });
      this.listQuery = data;
      this.dateRange = ["", ""];
      this.searchDate = {};
      this.$emit("clear", this.listQuery);
      console.log("重置成功", this.listQuery);
    }
  }
};
</script>

<style scoped lang='scss'>
  .filter-container{
     margin-bottom:20px;
     &.noBottom{
      margin-bottom: 0px;
     }
     overflow:hidden;
    .list{
       display: inline-block;
       width: auto;
       min-width: 20%;
       max-width:24%;
       margin-right: 1%;
       margin-bottom: 20px;
       span{
        font-size:14px;
       }
      .filter-item{
        margin-left: 10px;
      }
    }
    .btn{
         display: inline-block;
        .el-button{
          padding: 9px 15px;
          &:not(:last-child){
            margin-right: 1px;
          }
          width: 80px;
          padding: 0;
          height: 36px;
          line-height: 36px;
          border-radius: 3px;
          box-sizing: border-box;
        }

    }
  }
  .sort-container{
    clear:both;
  }
  
</style>




