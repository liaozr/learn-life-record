<template>
  <div v-if="permissionTable(dataSource.permissionTableCode)" class="tablePane">
    <div v-if="dataSource.tool" class="tool flex-center-between">
      <div>
        <!-- v-permission="item.permission" 工具栏的权限过滤 -->
        <el-button
          v-for="(item) in dataSource.tool"
          :key="item.key"
          class="filter-item"
          :style="{'background':item.bgColor,borderColor:item.bgColor}"
          :type="item.type || 'primary'"
          @click="item.handleClick(item,$event)"
        >{{ item.name }}</el-button>
      </div>
      <div>
        <slot name="toolRight"></slot>
      </div>
    </div>
    <el-table
      ref="table"
      v-loading="dataSource.loading"
      border
      fit
      style="width: 100%;"
      :class="{ 'no-data': !dataSource.data || !dataSource.data.length }"
      :data="dataSource.data"
      :row-style="TableRowStyle"
      :header-cell-style="{background:'#E0E8FF',color:'#666666'}"
      @selection-change="selectionChange"
    >
      <template slot="empty">
        <img src="@/assets/404_images/nodata.jpg" alt srcset />
        <span class="nodata">暂无数据</span>
      </template>

      <!-- @selection-change="dataSource.isSelection?dataSource.handleSelectionChange:''" -->
      <!-- 是否有多选 -->
      <el-table-column
        v-if="dataSource.isSelection"
        :selectable="dataSource.selectable"
        type="selection"
        v-bind="dataSource.data && dataSource.data.length ? { fixed: 'left' } : null"
        :width="dataSource.selectionWidth || 50"
        align="center"
      />
      <!-- 是否需要单选-->
      <el-table-column v-if="dataSource.isRadio" type="radio" label width="55" align="center">
        <template slot-scope="scope">
          <el-radio v-model="dataSource.radioIndex" class="tableRadio" :label="scope.$index"></el-radio>
        </template>
      </el-table-column>
      <!-- 是否需要序号 -->
      <el-table-column v-if="dataSource.isIndex" type="index" label="序号" width="55" align="center" />
      <template v-for="item in dataSource.cols">
        <!-- 表格的列展示 特殊情况处理 比如要输入框显示图片 -->
        <el-table-column v-if="item.isTemplate" :key="item.prop" v-bind="item">
          <template slot-scope="scope">
            <!-- 比如要输入框显示图片等等 自己定义 -->
            <slot :name="item.prop" :scope="scope" />
          </template>
        </el-table-column>
        <!-- 需要特殊颜色显示字体-->
        <el-table-column v-if="item.isSpecial" :key="item.prop" v-bind="item" align="center">
          <template slot-scope="scope">
            <span
              :class="item.isSpecialClass(scope.row[scope.column.property])"
            >{{ item.isSpecial(scope.row[scope.column.property]) }}</span>
          </template>
        </el-table-column>
        <!-- 需要带图标的某列，带回调事件-->
        <el-table-column v-if="item.isIcon" :key="item.prop" v-bind="item" align="center">
          <template slot-scope="scope">
            <span>
              <span>{{ item.filter(scope.row[scope.column.property]) }}</span>
              <i
                v-if="item.icon"
                :class="[item.icon(scope.row[scope.column.property]),'icon-normal']"
                @click="item.handlerClick(scope.row)"
              />
            </span>
            <!-- 比如要输入框 显示图片等等 自己定义 -->
            <slot :name="item.prop" :scope="scope" />
          </template>
        </el-table-column>
        <!-- 图片带popover -->
        <el-table-column v-if="item.isImagePopover" :key="item.prop" v-bind="item" align="center">
          <template slot-scope="scope">
            <popover :url="scope.row[scope.column.property]"></popover>
            <!-- <img alt title="加载失败2" v-else :src="scope.row[scope.column.property]" /> -->
          </template>
        </el-table-column>
        <!-- 多商品信息 -->
        <el-table-column v-if="item.isMoreGoodsMsg" :key="item.prop" v-bind="item" align="center">
          <template slot-scope="scope">
            <div
              class="column-goods"
              v-for="(item,index) in scope.row.itemSimpleDetailsVoList"
              :key="index"
              @click="clickGoods(item.itemUrl)"
            >
              <div class="column-hd">
                <popover :url="item.itemPreviewUrl"></popover>
              </div>
              <div class="column-bd">
                <div class="tab-nameOuter">
                  <div class="bd">
                    <el-popover
                      placement="top-start"
                      width="200"
                      trigger="hover"
                      :content="item.itemName"
                    >
                      <div class="name" slot="reference">{{item.itemName}}</div>
                    </el-popover>
                  </div>
                  <div class="ft">
                    <div class="symbol">x</div>
                    <div class="count">{{item.modelQuantityPurchased}}</div>
                  </div>
                </div>
                <div v-if="item.modelName">规格名：{{item.modelName}}</div>
                <div>{{scope.row.currency+" "+item.modelDiscountedPrice}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- 产品状态带popover -->
        <el-table-column v-if="item.isStatePopover" :key="item.prop" v-bind="item" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.publicGoodsState == 0" style>未提交</span>
            <span v-else-if="scope.row.publicGoodsState==1">待审核</span>
            <span v-else-if="scope.row.publicGoodsState==2">已上架</span>
            <span v-else-if="scope.row.publicGoodsState==5">待上架</span>
            <el-popover
              v-else
              placement="top"
              :title="scope.row.titletips"
              width="240"
              trigger="hover"
              :content="scope.row.examineReason"
            >
              <span
                slot="reference"
                v-if="scope.row.publicGoodsState == 3"
                style="color:#E6A23C;cursor: pointer;"
              >已下架</span>
              <span slot="reference" v-else style="color:#E6A23C;cursor: pointer;">已驳回</span>
            </el-popover>
          </template>
        </el-table-column>

        <!--精品库推荐国家 —— 文字带点击事件-->
        <el-table-column v-if="item.isWordsEvent" :key="item.prop" v-bind="item" align="center">
          <template slot-scope="scope">
            <div :key="item.id" v-for="item in scope.row[scope.column.property]" @click.stop>
              <span>{{item.countryName}}</span>
              <span
                v-if="permissionTable('addquantityBtn')"
                @click="addition(scope.row,item)"
                style="font-size:14px;margin-left:10px;cursor: pointer;color:#409EFF;"
              >追加国家</span>
            </div>
          </template>
        </el-table-column>

        <!-- 大部分适用 -->
        <!-- 除去上面通用的各种特例，普通表格列表会在此渲染 -->
        <!-- show-overflow-tooltip -->
        <el-table-column
          v-if="!item.isImagePopover && !item.isTemplate && !item.isSpecial && !item.isIcon && !item.isStatePopover && !item.isWordsEvent && !item.isMoreGoodsMsg"
          :key="item.prop"
          v-bind="item.isCodeTableFormatter ? Object.assign({ formatter: item.isCodeTableFormatter }, item) : item"
          align="center"
          show-overflow-tooltip
        />
      </template>
      <!-- 是否有操作列 -->
      <!-- 没有数据时候不固定列 -->
      <!-- :width="dataSource.operation.data.length * 120" -->
      <el-table-column
        v-if="dataSource.isOperation"
        :show-overflow-tooltip="dataSource.operation.overflowTooltip"
        v-bind="dataSource.data && dataSource.data.length ? { fixed: 'right' } : null"
        style="margin-right:20px"
        class-name="handle-td"
        label-class-name="tc"
        :width="dataSource.operation.width? dataSource.operation.width:dataSource.operation.data.length * 120"
        :label="dataSource.operation.label"
        align="center"
      >
        <template slot-scope="scope">
          <!-- v-permission="item.permission"  过滤按钮权限-->
          <template v-if="dataSource.operation.data.length > 0">
            <div class="btn">
              <div v-for="(item) in dataSource.operation.data" :key="item.id">
                <!-- 当涉及到操作按钮跟着产品状态条件走的情况 -->
                <template v-if="isExist(scope.row.publicGoodsState)">
                  <div class="btnlist" v-if="isEmpty(item.state)">
                    <el-button
                      v-bind="item"
                      :type="item.type?item.type:''"
                      :style="{'background':item.bgColor,borderColor:item.bgColor}"
                      size="mini"
                      @click.native.prevent="item.handleRow(scope.row, item)"
                    >{{ item.label }}</el-button>
                  </div>
                  <!--<div v-if="scope.row.publicGoodsState == item.state" class="btnlist"> -->
                  <!-- itam.state 操作栏改成数组形式 -->
                  <template v-else>
                    <div v-if="item.state.includes(scope.row.publicGoodsState)" class="btnlist">
                      <el-button
                        v-bind="item"
                        :type="item.type?item.type:''"
                        :style="{'background':item.bgColor,borderColor:item.bgColor}"
                        size="mini"
                        @click.native.prevent="item.handleRow(scope.row, item)"
                      >{{ item.label }}</el-button>
                    </div>
                  </template>
                </template>
                <template v-else-if="isExist(scope.row.isCopy)">
                  <template v-if="isEmpty(item.isCopy)">
                    <div class="btnlist">
                      <el-button
                        v-bind="item"
                        :type="item.type?item.type:''"
                        :style="{'background':item.bgColor,borderColor:item.bgColor}"
                        size="mini"
                        @click.native.prevent="item.handleRow(scope.row, item)"
                      >{{ item.label }}</el-button>
                    </div>
                  </template>
                  <template v-else>
                    <div v-if="scope.row.isCopy && item.isCopy" class="btnlist">
                      <el-button
                        v-bind="item"
                        :type="item.type?item.type:''"
                        :style="{'background':item.bgColor,borderColor:item.bgColor}"
                        size="mini"
                        @click.native.prevent="item.handleRow(scope.row, item)"
                      >{{ item.label }}</el-button>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div class="btnlist">
                    <el-button
                      v-bind="item"
                      :type="item.type?item.type:''"
                      :style="{'background':item.bgColor,borderColor:item.bgColor}"
                      size="mini"
                      @click.native.prevent="item.handleRow(scope.row, item)"
                    >{{ item.label }}</el-button>
                  </div>
                </template>
                <!--操作栏操作按钮icon类型暂时注释掉
               <template v-else>
                 <i :class="[icon,item.icon]" v-bind="item" @click="item.handleRow(scope.row, item.label)" />
                </template>-->
              </div>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        v-if="dataSource.pageData.total>0 && eval( dataSource.pageData.needchangePage )"
        :current-page="dataSource.pageData.pageNum"
        :page-sizes="dataSource.pageData.pageSizes?dataSource.pageData.pageSizes:[5,10,15,20,25,30]"
        :page-size="dataSource.pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataSource.pageData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
// 有些特殊页面只需要复制下到当前特殊页面的components里改动下即可
//  dataSource: {
//          tool:[
//            {
//              name: '新增用户', //按钮名称
//              key: 1,  // 唯一标识符
//              permission: 2010106, // 权限点
//              type: '',  // 使用element自带按钮类型
//              bgColor: '#67c23a', // 自定义背景色
//              handleClick: this.handleAdd //自定义事件
//            },
//          ]
//         data: [], // 表格数据
//         cols: [], // 表格的列数据
//         handleSelectionChange:(val)=>{} //点击行选中多选返回选中数组
//         isSelection: false, // 表格有多选时设置
//         isOperation: true, // 表格有操作列时设置
//         isIndex: true, // 列表序号
//         loading: true, // loading
//         pageData: {
//          total: 0, // 总条数
//          pageSize: 10, // 每页数量
//          pageNum: 1, // 页码
//          pageSize:[5,10,15,20]// 每页数量
//         }
//         operation: {
//           // 表格有操作列时设置
//           label: '操作', // 列名
//           width: '350', // 根据实际情况给宽度
//           data: [
//             {
//               label: '冻结', // 操作名称
//               permission:'' //权限点
//               type: 'info', //按钮类型
//               handleRow: function(){} // 自定义事件
//             },
//           ]
//         }
//       },

import { mapGetters } from "vuex";
import popover from "@/components/popover";
export default {
  props: {
    dataSource: {
      type: Object
    }
  },
  components: {
    popover
  },
  data() {
    return {
      permissionArr: []
    };
  },
  computed: {
    ...mapGetters(["buttons"]),
  },
  watch: {
    "dataSource.cols": { // 监听表格列变化
      deep: true,
      handler() {
        // 解决表格列变动的抖动问题
        // this.$nextTick(this.$refs.table.doLayout)
      }
    },
    buttons: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.permissionArr = Object.keys(newVal);
        }
      },
      immediate: true,
    }
  },
  methods: {
    // 相关按钮后台权限过滤
    permissionTable(code) {
      if(code){
        let path = this.$route.path;
        let identifier = path.slice(1, path.length);
        identifier = identifier + ":" + code;
        if (this.permissionArr.includes(identifier)) {
          return true;
        } else {
          return false;
        }
      }else{
        return true;
      }
    },
    eval(value){
      if(value ===  "" || value === null || value === undefined || value === " "){
        return true;
      }else{
        return value;
      }
    },
    selectionChange(val){
      if(this.dataSource.isSelection){
        return this.dataSource.handleSelectionChange(val);
      }
    },
    isExist(val){
      if(val !==  "" &&  val !==  " " && val !==  null && val !== undefined){
        return true;
      }else{
        return false;
      }
    },
    isEmpty(val){
      if(val === null || val === "" || val === undefined || val === " "){
        return true;
      }else{
        return false;
      }
    },
    // 精品库追加国家
    addition(row, item){
      this.$emit("addition", row, item);
    },
    // 表格分页操作
    handleSizeChange(val) {
      this.$emit("changeSize", val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit("changeCurrent", val);
      console.log(`当前页: ${val}`);
    },
    // 行背景色
    TableRowStyle({ row, rowIndex }) {
      // 注意，这里返回的是一个对象
      let rowBackground = {};
      let path = this.$route.path;
      if(path.includes("product/collection") || path.includes("product/self")){
        if(row.isEdit){
          if (row.isEdit) {
            rowBackground.background = "#A3FFA4";
            return rowBackground;
          }
        }
      }
    },
    // 点击多商品
    clickGoods(url){
      window.open(url);
    }
  }
};
</script>
<style lang="scss" scoped>
    .tablePane{
      .tool{
        margin-bottom:10px;
        .el-button{
          min-width: 80px;
          width:auto;
          height: 32px;
          line-height: 31px;
          padding:0;
          font-size:12px;
          border-radius: 3px;
          text-align: center;
          padding-left: 10px;
          padding-right: 10px;
          &:not(:last-child){
           margin-right:20px;
          }
        }
      }
      .cell{
        .btn{
          display: flex;
          justify-content: center;
          ::v-deep .el-button{
            span{
              color:white;
            }
          }
        }
        .btn div.btnlist{
          margin-right:10px;

        }
        .el-button--mini, .el-button--mini.is-round {
            padding: 6px 10px;
        }
      }
      .reference-img{
      width: 40px;
      height: 40px;
      background-size:100% 100%;
      border-radius: 4px;
      }
      .icon {
      width: 25px;
      font-size: 20px;
      font-weight: bold;
      }
      .page{
        .el-pagination{
           margin:40px auto;
           text-align: center;
           ::v-deep .el-pagination__total{
            font-size:14px;
            vertical-align: middle;
           }
           ::v-deep .el-pagination__sizes .el-input .el-input__inner{
             font-size:14px;
             vertical-align: middle;
             height:34px;
             line-height:34px;
           }
           ::v-deep .el-pagination__sizes{
             vertical-align: middle;
             height:34px;
             line-height:34px;
           }
           ::v-deep  button{
             font-size:14px;
             width:36px;
             height:36px;
             border:1px solid #ddd;
             padding:0;
             vertical-align: middle;
           }
           ::v-deep  .btn-next .el-icon, ::v-deep .btn-prev .el-icon {
            font-size: 14px;
            }
           ::v-deep .el-pager li{
            font-size:14px;
            width:36px;
            height:36px;
            line-height:36px;
            border:1px solid #ddd;
            padding:0;
            vertical-align: middle;
            margin-left:15px;
            font-weight: 400;
            &:last-child{
              margin-right:20px;
            }
            &.active{
              background-color:#3369FF;
              color:white;
              border:1px solid #3369FF;
            }
           }
           ::v-deep .el-pagination__jump {
             font-size:14px;
             vertical-align: middle;
             height:34px;
             line-height:34px;
          }
          ::v-deep .el-pagination__editor{
            height:34px;
            line-height:34px;
            &.el-input .el-input__inner{
              height:34px;
              line-height:34px;
            }
          }
        }
      }
    }
    .tableRadio{
      ::v-deep .el-radio__label{
          display: none;
      }
    }
    .column-goods{
      display: flex;
      align-items: center;
      padding: 10px 4px;
      .column-hd{
          flex: 2;
      }
      .column-bd{
          flex: 7;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .tab-nameOuter{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          .bd{
            flex: 8;
            text-align: start;
            .name{
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-align: start;
            }
          }
          .ft{
            flex:2;
            display: flex;
            justify-content: end;
            .symbol{
              padding: 0 5px;
              color: #c8c8c8;
            }
            .count{
              padding:2px 8px;
              background: #c8c8c8;
              color: #ffffff;
              border-radius: 20px;
              white-space:nowrap;
            }
          }
        }
      }
  }
  .nodata{
    display: block;
    margin-top: -40px;
    padding-bottom: 30px;
    font-size: 12px;
  }
</style>
<style scoped lang="scss">
  ::v-deep .el-tooltip__popper {
    width: 240px;/*修改宽度*/
    background: #E0E8FF !important;/*背景色  !important优先级*/
    opacity: 1 !important;/*背景色透明度*/
    color: black !important;/*字体颜色*/
    line-height:20px;
    border:1px solid #ccc;
    font-size:12px
  }
   ::v-deep .el-popover{
    width: 240px;/*修改宽度*/
    background: #E0E8FF !important;/*背景色  !important优先级*/
    opacity: 1 !important;/*背景色透明度*/
    color: black !important;/*字体颜色*/
    line-height:20px;
    border:1px solid #ccc;
    font-size:12px
  }

</style>

