<template>
  <div class="app-container">
    <tablePage
      @clear="clear"
      @searchEvent="searchEvent"
      @changeSize="changeSize"
      @changeCurrent="changeCurrent"
      :filterData="filterData"
      :dataSource="dataSource"
    ></tablePage>
	
    <el-dialog title="商品导出" :visible.sync="productExportDialog" width="70%">
      <el-table
        :data="goodsList"
        max-height="500"
        element-loading-text="Loading"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="商品图">
          <template slot-scope="scope">
            <popover :url="scope.row.imagesUrl"></popover>
            <!-- <el-image :src="scope.row.imagesUrl" class="product-img"></el-image> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">{{ scope.row.goodsName }}</template>
        </el-table-column>
        <el-table-column align="center" label="SKU">
          <template slot-scope="scope">{{ scope.row.goodsSku }}</template>
        </el-table-column>
        <el-table-column label="变体数" align="center">
          <template slot-scope="scope">{{ scope.row.goodsVariantsNum }}</template>
        </el-table-column>
        <el-table-column label="商品售价" align="center">
          <template slot-scope="scope">{{ scope.row.goodsPrice }}</template>
        </el-table-column>
      </el-table>
      <el-form
        :model="productExportTemp"
        label-width="120px"
        :rules="rules"
        ref="storagedate"
        class="mt20"
      >
        <el-form-item label="导出类型" prop="productType">
          <el-cascader
            v-model="productExportTemp.productType"
            :options="exportTypeOption"
            :emitPath="false"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="exportSubmit" :loading="buttonLoad.submit">提交</el-button>
        <el-button @click="productExportDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="复制到其他国家" :visible.sync="dialogCountry" width="30%">
      <el-form>
        <el-form-item label="选择站点国家">
          <el-cascader
            v-model="copyCountryValue"
            :options="copyShopClassifyOption"
            :props="{ label: 'name', value: 'id' }"
            clearable
          ></el-cascader>
        </el-form-item>
        <p class="tips">*您在将该商品上架到其他国家时可能需要重新配置售价、商品描述等信息。</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCountry = false">取 消</el-button>
        <el-button type="primary" @click="copyCountrySubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import tablePage from  "@/components/tablePage/index";  // 通用表格组件
import { tablePageMixins } from "@/mixins/tablePageMixins.js";
import popover from "@/components/popover";


import { exportAll } from "@/api/product/exports";
import {
  getList,
  productClassify,
  shopClassify,
  removeMyProduct,
  CopyToDelica
} from "@/api/product/product";
import { memberCopyPermission } from "@/api/organization/member";
import { parseTime, tableRowClassName } from "@/utils";

export default {
  mixins: [tablePageMixins], // 表格通用mixins
  components: {
    tablePage, // 通用表格组件
    popover
  },
  data() {
    return {
      parseTime,
      tableRowClassName,
      // 搜索栏配置
      filterData: {
        // filter-container配置
        timeSelect: false,
        timeName: "时间",
        timeWidth: 80,
        elinput: [
          {
            name: "商品名称",
            key: "goodsTitle"
          },
          {
            name: "商品SKU",
            key: "goodsSku"
          }
        ],
        elselect: [
          {
            name: "商品来源",
            key: "sourceType",
            option: [
              { label: "全部", value: -1 },
              { label: "商品采集", value: 0 },
              { label: "自主新建", value: 1 },
              { label: "公共商品", value: 2 },
              { label: "其他", value: 3 },
              { label: "海外代发", value: 4 },
              { label: "sds定制", value: 5 }
            ]
          }
        ],
        elcascader: [
          {
            name: "系统内分类",
            key: "categoryId",
            identCode: "productClassOption", // 辨别标识属于什么分类
            width: 60,
            // 配置接口返回来的value、label对应的字段名
            optionProps: {
              checkStrictly: true,
              emitPath: false,
              label: "name",
              value: "id",
              children: "children"
            },
            option: []
          }
        ],
        needSearchBtn: true,
        // sortContainer配置
        sortContainer: true, // sortContainer
        sortAjaxFlag: false,
        sortList: [
          {
            name: "所属站点",
            key: "siteId",
            lists: [
            ]
          },
          {
            name: "所属国家",
            key: "countryId",
            lists: [
            ]
          }
        ]
      },
      // 表格配置
      dataSource: {
        tool: [
        ],
        // 表格数据
        data: [
        ],
        // 表格的列数据
        cols: [
          {
            label: "商品图片",
            prop: "imagesUrl",
            width: 120,
            isImagePopover: true
          },
          {
            label: "商品名称",
            prop: "goodsName",
            width: 300,
          },
          {
            label: "SKU",
            prop: "goodsSku",
            width: 120
          },
          {
            label: "所属分类",
            prop: "goodsCategory",
            width: 150
          },
          {
            label: "变体数",
            prop: "goodsVariantsNum",
          },
          {
            label: "所属国家",
            prop: "countryName",
            width: 150
          },
          {
            label: "采购价格",
            prop: "goodsPrice",
            width: 150
          },
          {
            label: "商品来源",
            prop: "goodsSource",
            width: 150,
            isCodeTableFormatter: function(val) {
              if(val.goodsSource == -1){
                return "全部";
              }
              if(val.goodsSource == 0){
                return "商品采集";
              }
              if(val.goodsSource == 1){
                return "自主新建";
              }
              if(val.goodsSource == 2){
                return "公共商品";
              }
              if(val.goodsSource == 3){
                return "其他";
              }
              if(val.goodsSource == 4){
                return "海外代发";
              }
              if(val.goodsSource == 5){
                return "sds定制";
              }
            }
          },
          {
            label: "添加时间",
            prop: "createTime",
            width: 200,
            isCodeTableFormatter: function(val) {
              return parseTime(new Date(val.createTime), "{y}-{m}-{d} {h}:{i}");
            }
          }
        ],
        handleSelectionChange: this.handleSelectionChange, // 点击行选中多选返回选中数组
        isSelection: true, // 表格有多选时设置
        selectable: function(val) { // 禁用部分行多选
          return true;
        },
        isOperation: true, // 表格有操作列时设置
        isIndex: false, // 列表序号
        loading: true, // loading
        pageData: {
          total: 0, // 总条数
          pageSize: 10, // 每页数量
          pageNum: 1 // 页码
        },
        operation: {
          // 表格有操作列时设置
          label: "操作", // 列名
          data: [
            // {
            //   label: '删除', // 操作名称
            //   type: 'danger',
            //   permissionCode: 'batchAdd', // 后期这个操作的权限，用来控制权限
            //   handleRow: this.handleRow,
            //   bgColor:'#dd6161'
            // }
          ]
        }
      },

      

      // 分类
      defaultProps: {
        children: "children",
        label: "name",
      },
      productClassOption: [],
      shopClassifyOption: [],
      copyShopClassifyOption: [],
      copyCountryValue: [], // 复制到的国家的value
      copyCountryItem: {}, // 复制到的国家的item
      dialogCountry: false,
      sourceOption: [
        { label: "全部", value: -1 },
        { label: "商品采集", value: 0 },
        { label: "自主新建", value: 1 },
        { label: "公共商品", value: 2 },
        { label: "其他", value: 3 },
        { label: "海外代发", value: 4 },
        { label: "sds定制", value: 5 }
      ], // 商品来源

      search: {
        pageSize: 10,
        size: 10,
        current: 1,
        siteId: "",
        countryId: "",
        categoryId: "",
        sku: "",
        goodsTitle: "",
        sourceType: "",
        shopId: [],
      },
      countryList: [],
      total: 0,
      list: null,
      listLoading: true,

      productExportDialog: false,
      goodsList: [], // 列表中选中的商品
      exportTypeOption: [
        { value: 1, label: "通用" },
        { value: 2, label: "服装" }
      ],
      productExportTemp: {
        productType: [1],
        ids: "",
      },
      rules: {
        productType: [{ required: true, message: "请选择导出类型", trigger: "change" }],
      },
      buttonLoad: {
        submit: false,
        add: false,
        copyDelica: false,
        remove: false,
      },
      isCopy: false, // 是否有复制到其他国家的权限，接口判断
    };
  },
  mounted() {
    this.checkCopyOrganization();
    // 表格工具栏权限配置
    let tool = [
      {
        name: "添加商品",
        key: 1,  // 唯一标识符
        permissionCode: "add", // 权限标识符
        handleClick: this.add, // 自定义事件
        bgColor: "#67c23a"
      },
      {
        name: "批量删除",
        key: 2,  // 唯一标识符
        permissionCode: "batch-remove", // 权限标识符
        handleClick: this.batchDelete, // 自定义事件
        bgColor: "#f56c6c"
      },
      {
        name: "批量导出",
        key: 3,  // 唯一标识符
        permissionCode: "export", // 权限标识符
        handleClick: this.batchExport, // 自定义事件
        bgColor: "#3369ff"
      },
    ];
    for(let i = 0; i < tool.length; i++){
      if(this.permissionTable(tool[i].permissionCode)){
        this.dataSource.tool.push(tool[i]);
      }
    }
  },
  methods: {
    selectSite(item) {
      // 全部
      if (item.id == -1) {
        this.search.siteId = "";
        this.countryList = [];
      }
      else {
        this.search.siteId = item.id;
        this.countryList = item.children;
      }
      this.search.countryId = "";
      this.onSearch();
    },
    selectCountry(item) {
      this.search.countryId = item.id;
      this.onSearch();
    },
    onSearch() {
      this.search.current = 1;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.search.size = val;
      this.fetchData();
    },
    async getList(params){
      if(params){
        if(Object.keys(params).length > 0){
          let paramsArr = Object.keys(params);
          for(let i = 0; i < paramsArr.length; i++){
            this[paramsArr[i]] = params[paramsArr[i]];
          }
          this.dataSource.pageData.pageNum = 1; // 搜索状态下分页页数充值为1
        }
      }
      let canshu = this.getParameter();
      try {
        const res =  await getList(canshu);
        this.dataSource.data = res.data.records;
        for(let i = 0; i < this.dataSource.data.length; i++){
          if(this.dataSource.data[i].symbol){
            this.dataSource.data[i].goodsPrice = this.dataSource.data[i].goodsPrice + " " + this.dataSource.data[i].symbol;
          }
          // 所属国家字段整理
          let countryId = this.dataSource.data[i].countryId;
          if(sessionStorage.shopClassifyOption){
            this.shopClassifyOption  = JSON.parse(sessionStorage.shopClassifyOption);
          }
          let countryName = this.getCountryName(countryId, this.shopClassifyOption);
          if (typeof this.dataSource.data[i].countryName == "undefined") {
            Vue.set(this.dataSource.data[i], "countryName", "");
          }else{
            this.dataSource.data[i].countryName = countryName;
          }

        }
        console.log(this.dataSource.data);
        this.dataSource.pageData.total = res.data.total;
        this.dataSource.loading = false;
        console.log(res);
      } catch (error) {
      }
    },
    handleNodeClick(data) {
      console.log(data);
      this.search.categoryId = data.id;
      this.fetchData();
    },
    changePage(page) {
      this.search.current = page;
      this.fetchData();
    },
    // 选择商品
    selectGoods(e) {
      this.goodsList = e;
    },
    // 商品导出
    productExport() {
      (this.productExportTemp = {
        categoryId: "",
        shopId: "",
        countryId: "",
        siteId: "",
        publicGoodsIds: [],
      });
      productClassify()
        .then((res) => {
          this.productClassOption = res.data;
        })
        ["catch"](() => {});
      shopClassify()
        .then((res) => {
          this.shopClassifyOption = res.data;
        })
        ["catch"](() => {});
      this.productExportDialog = true;
      this.$nextTick(() => {
        this.$refs.storagedate.clearValidate();
      });
    },
    add() {
      this.$router.push({ path: "/product/addMyProduct" });
    },
    // 上架
    updateing(item) {
      this.$router.push({
        path: "/product/self/update",
        query: { id: item.id, countryId: item.countryId, type: "update" },
      });
    },
    // 编辑
    onEdit(item) {
      this.$router.push({
        path: "/product/self/edit",
        query: { id: item.id, type: "edit" },
      });
    },
    exportSubmit() {
      this.$refs.storagedate.validate(async (valid) => {
        if (valid) {
          this.buttonLoad.submit = true;
          try {
            let ids = [];
            this.goodsList.map((item) => {
              ids.push(item.id);
            });
            const res = await exportAll({
              goodsIdList: ids,
              countryId: this.countryId,
              productType: this.productExportTemp.productType[0]
            });
            this.$tips({ title: "商品导出中，请稍后...", message: "请到商品数据导出页面进行数据统一导出！导出的数据列表可能存在延迟...", type: "success" });
            this.productExportDialog = false;
            this.buttonLoad.submit = false;
            this.getList();
          }
          catch (err) {
            this.buttonLoad.submit = false;
          }
        }
      });
    },
    openCopyCountry(item) {
      this.copyCountryItem = item;
      this.dialogCountry = true;
    },
    // 提交复制到的国家
    copyCountrySubmit() {
      let { copyCountryValue, copyCountryItem } = this;
      if (!copyCountryValue.length) {
        this.$toast("请选择国家！");
        return;
      }
      this.dialogCountry = false;
      this.$router.push({
        path: "/product/self/copy",
        query: {
          id: copyCountryItem.id,
          type: "copy",
          siteId: copyCountryValue[0],
          countryId: copyCountryValue[1],
        },
      });
    },
    batchDelete() {
      if (!this.goodsList.length) {
        this.$toast("请选择批量操作的商品！", {
          type: "warning"
        });
        return false;
      }
      this.$confirm("此操作将永久删除所选商品, 是否继续?", "商品删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.buttonLoad.remove = true;
          try{
            let ids = [];
            this.goodsList.map((item) => {
              ids.push(item.id);
            });
            const res = await removeMyProduct({
              goodsId: ids,
            });
            this.$tips({ title: "删除成功", message: "商品删除成功！", type: "success" });
            this.deleteCurrentPage(ids.length);
            this.getList();
          }
          catch{
          }
          this.buttonLoad.remove = false;
        })
        ["catch"](() => {});
    },
    // 批量导出
    batchExport() {
      if (!this.countryId) {
        this.$toast("请先选择所属国家，再操作导出！", { type: "warning" });
        return false;
      }
      if (!this.goodsList.length) {
        this.$toast("请选择批量操作的商品！", { type: "warning" });
        return false;
      }
      this.productExportDialog = true;
    },
    // 批量复制到精品商品库
    batchCopyToDelica(){
      if (!this.goodsList.length) {
        this.$toast("请选择批量操作的商品！", { type: "warning" });
        return false;
      }
      this.$confirm("此操作将所选商品复制到精品商品库，是否继续?", "复制到精品商品库", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.buttonLoad.copyDelica = true;
        try{
          let ids = [];
          this.goodsList.map((item) => {
            ids.push(item.id);
          });
          const res = await CopyToDelica({ goodsIds: ids });
          this.$tips({ title: "复制成功", message: "商品已复制到精品商品库！", type: "success" });
          this.buttonLoad.copyDelica = false;
        }
        catch{
          this.buttonLoad.copyDelica = false;
        }
      })["catch"](()=>{});
    },
    // 更改每页显示大小
    handlePageSize() {
      if (typeof this.search.pageSize !== "number") {
        this.search.pageSize = 10;
      }
      this.search.size = this.search.pageSize;
      this.onSearch();
    },
    // 判断是否有复制到其他国家权限
    checkCopyOrganization(){
      memberCopyPermission().then(res=>{
        this.isCopy = res.data;
        // 表格操作栏权限配置
        let operation = [
          {
            label: "编辑",
            permissionCode: "edit",
            handleRow: this.onEdit,			
            bgColor: "#3369FF"
          },
          {
            label: "复制到其他国家",
            permissionCode: "copy",
            handleRow: this.openCopyCountry,
            bgColor: "#3369FF",
            isCopy: this.isCopy
          },
          {
            label: "上架",
            permissionCode: "issue",
            handleRow: this.updateing,
            bgColor: "#67c23a"
          }
        ];
        for(let i = 0; i < operation.length; i++){
          if(this.permissionTable(operation[i].permissionCode)){
            this.dataSource.operation.data.push(operation[i]);
          }
        }
        console.log(7777);
        console.log(this.isCopy);
      })["catch"](()=>{});
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
