import Vue from "vue";
import { mapGetters } from "vuex";
import { shopClassify, productClassify } from "@/api/product/product";

export const tablePageMixins = {
  inject: ["reload"],
  computed: {
    ...mapGetters(["buttons"]),
  },
  watch: {
    buttons: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.permissionArr = Object.keys(newVal);
        }
      },
      immediate: true,
    },
    shopClassifyOption: {
      handler: function(val){
        if(val.length > 0){
          for(let i = 0; i < this.dataSource.data.length; i++){
            let countryId = this.dataSource.data[i].countryId;
            let countryName = this.getCountryName(countryId, this.shopClassifyOption);
            if (typeof this.dataSource.data.countryName == "undefined") {
              Vue.set(this.dataSource.data[i], "countryName", countryName);
            }else{
              this.dataSource.data[i].countryName = countryName;
            }
          }
        }
      },
      immediate: true // 设置 immediate 为true，将立即以表达式的当前值触发回调
    }
  },
  data() {
    return {
      selectedList: [], // 多选必须，储存已选内容
      selectProducts: [], // 多选必须，储存已选内容 覆盖，为了方便
      goodsList: [], // 多选必须，储存已选内容 覆盖，为了方便
      multipleSelection: [], // 多选必须，储存已选内容 覆盖，为了方便
      permissionArr: [], // 按钮的后台配置权限数组
      productClassOption: [], // filterPane面板系统内分类 信息集合
      productClassOptionIndex: 0, // 系统内分类位序
      shopClassifyOption: [], // 获取所属站点所属国家信息集合
      copyShopClassifyOption: [], // 复制到其他国家
      // 搜索条件列表接口请求(封装后，搜索条件参数可以写到组件里面)
      categoryId: "",
      countryId: "",
      goodsTitle: "",
      pageSize: 10,
      shopId: [],
      siteId: "",
      sku: "",
      goodsSku: "",
      sourceType: "",
      userName: "",
      ajaxParams: {}
    };
  },
  mounted() {
    let keepAliveFlag = this.$route.meta.keepAlive || false;
    if(!keepAliveFlag){
      this.getList(); // 表格初始化数据
    }
    // 表格页面含有所属站点，所属国家 回调
    if (this.filterData.sortContainer) {
      this.shopClassify();
    }
    // 判断filterPane面板是否含有 系统内分类
    let productClassOptionFlag = false;
    if(this.filterData.elcascader){
      for(let i = 0; i < this.filterData.elcascader.length; i++){
        if(this.filterData.elcascader[i].identCode){
          if(this.filterData.elcascader[i].identCode == "productClassOption"){
            productClassOptionFlag = true;
            this.productClassOptionIndex = i;
            break;
          }
        }
      }
    }
    if(productClassOptionFlag){
      this.getProductClassOption();
    }
  },
  // 判断是否更新数据
  beforeRouteEnter(to, from, next){
    // needReload为true，代表着不是从详情页进入列表页，需要刷新
    let needReload = true;
    let strFromPath = from.path.split("/").filter(function(s) {
      return s && s.trim();
    });
    let strToPath = to.path.split("/").filter(function(s) {
      return s && s.trim();
    });
    if(strFromPath[0] !== strToPath[0]){
      needReload = true;
    }else{
      if(strFromPath.length  > 1){
        for(let i = 1; i < strFromPath.length; i++){
          if(strToPath[1].includes(strFromPath[i])){
            needReload = false;
            break;
          }
        }
      }
    }
    console.log(strFromPath);
    console.log(strToPath);
    console.log("需要刷新");
    console.log(needReload);
    // if(from.meta.isRefresh && needReload){
    if(needReload){
      // to.meta.isRefresh = false;
      // from.meta.isRefresh = true;
      next(vm=>{
        vm.clearCache();
      });
    }else{
      next();
    }
  },
  // 缓存生命周期
  activated(){
    this.getList();
    if(this.$route.meta.isRefresh){
      // this.getList();
      // this.$route.meta.isRefresh = false;
    }
  },
  methods: {
    // 组件有设置keep-alive的，不需要keep-alive的clearCache
    clearCache(){
      // this.filterData.rest = false;
      console.log("clearCache");
      let keepAliveFlag = this.$route.meta.keepAlive || false;
      if(keepAliveFlag){
        // this.filterData.rest = true;
        this.reload();
      }
    },
    getAjaxParams(params){
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
      this.ajaxParams = canshu;
      return canshu;
    },
    // 组件里面涉及到删除功能的，包括单个删除，批量删除后的分页处理
    deleteCurrentPage(length){
      // 为了在删除最后一页的最后一条数据时能成功跳转回最后一页的上一页
      const totalPage = Math.ceil((this.dataSource.pageData.total - length) / this.dataSource.pageData.pageSize); // 总页数
      this.dataSource.pageData.pageNum =
           this.dataSource.pageData.pageNum > totalPage ? totalPage : this.dataSource.pageData.pageNum;
      this.dataSource.pageData.pageNum = this.dataSource.pageData.pageNum < 1 ? 1 : this.dataSource.pageData.pageNum;
    },
    // 相关按钮后台权限过滤
    permissionTable(code) {
      let path = this.$route.path;
      let identifier = path.slice(1, path.length);
      identifier = identifier + ":" + code;
      if (this.permissionArr.includes(identifier)) {
        return true;
      } else {
        return false;
      }
    },
    // 处理permissionCode
    handlePermissionCode(operation, tool, cols, searchCon){
      for(let i = 0; i < operation.length; i++){
        if(this.permissionTable(operation[i].permissionCode)){
          this.dataSource.operation.data.push(operation[i]);
        }
      }
      for(let i = 0; i < tool.length; i++){
        if(this.permissionTable(tool[i].permissionCode)){
          this.dataSource.tool.push(tool[i]);
        }
      }
      if(cols){
        for(let i = 0; i < cols.length; i++){
          if(this.permissionTable(cols[i].permissionCode)){
            if(cols[i].index){
              this.dataSource.cols.splice(cols[i].index, 0, cols[i]);
            }else{
              this.dataSource.cols.push(cols[i]);
            }
          }
        }
      }
      if(searchCon){
        for(let i = 0; i < searchCon.length; i++){
          if(this.permissionTable(searchCon[i].permissionCode)){
            this.filterData.elinput.push(searchCon[i]);
          }
        }
      }
    },
    // 分页操作
    // 改变每页数量
    changeSize(size) {
      this.dataSource.pageData.pageSize = size;
      this.getList();
    },
    // 改变页码
    changeCurrent(pageNum) {
      this.dataSource.pageData.pageNum = pageNum;
      this.getList();
    },
    // 点击行选中多选返回选中数组
    handleSelectionChange(val) {
      console.log(val);
      this.selectedList = val;
      this.goodsList = val;
      this.multipleSelection = val;
      this.selectProducts = val;
    },
    // filterPane面板搜索事件
    searchEvent(msg) {
      if (Object.keys(msg).length > 0) {
        this.getList(msg);
      } else {
        this.getList();
      }
    },
    // 表格列表页面搜索参数集合
    getParameter(){
      let paramsArr = [];
      let elcascaderParams = [];
      let elinputParams = [];
      let elselectParams = [];
      let sortListParams = [];
      let eldatePickParams =  [];

      if(this.filterData.elcascader){
        elcascaderParams = this.filterData.elcascader.map(item => {
          return item.key;
        });
      }
      if(this.filterData.elinput){
        elinputParams = this.filterData.elinput.map(item => {
          return item.key;
        });
      }
      if(this.filterData.elselect){
        elselectParams = this.filterData.elselect.map(item => {
          return item.key;
        });
      }
      if(this.filterData.sortList){
        if(this.filterData.sortContainer){
          sortListParams = this.filterData.sortList.map(item => {
            return item.key;
          });
        }
      }
      if(this.filterData.eldatePick){
        for(let i = 0; i < this.filterData.eldatePick.length; i++){
          let startEndTimeArr = [];
          if(this.filterData.eldatePick[i].startTimeKey){
            startEndTimeArr.push(this.filterData.eldatePick[i].startTimeKey);
          }
          if(this.filterData.eldatePick[i].endTimeKey){
            startEndTimeArr.push(this.filterData.eldatePick[i].endTimeKey);
          }
          paramsArr = [...paramsArr, ...startEndTimeArr];
        }
        eldatePickParams = this.filterData.eldatePick.map(item => {
          return item.key;
        });
      }
      paramsArr = [...paramsArr, ...elcascaderParams, ...elinputParams, ...elselectParams, ...sortListParams, ...eldatePickParams];
      let ajaxParams = {};
      for(let i = 0; i < paramsArr.length; i++){
        let msg = {};
        if(paramsArr[i] == "sourceType"){
          let sourceType = "";
          if(this.sourceType == -1){
            sourceType = "";
          }else{
            sourceType = this.sourceType;
          }
          msg[paramsArr[i]] = sourceType;
        }
        else if(paramsArr[i] == "goodsSku"){
          msg[paramsArr[i]] = this[paramsArr[i]] || "";
          let keyName = "sku";
          msg[keyName] = this[paramsArr[i]] || "";
        }else{
          msg[paramsArr[i]] = this[paramsArr[i]] || "";
        }
        ajaxParams = { ...ajaxParams, ...msg };
      }
      // 接口请求的额外参数
      if (typeof this.otherParams !== "undefined") {
        let otherParams = {};
        let otherParamsKey = Object.keys(this.otherParams);
        for(let i = 0; i < otherParamsKey.length; i++){
          let msg = {};
          msg[otherParamsKey[i]] = this[otherParamsKey[i]] || "";
          otherParams = { ...otherParams, ...msg };
        }
        ajaxParams = { ...ajaxParams, ...otherParams };
      }
      // 分页参数
      let commonParams = {
      };
      if (typeof this.dataSource.baseParams !== "undefined") {
        commonParams[this.dataSource.baseParams.pageSize] = this.dataSource.pageData.pageSize;
        commonParams[this.dataSource.baseParams.pageCurrent] = this.dataSource.pageData.pageNum;
      }else{
        let keySize = "size";
        let keyCurrent = "current";
        commonParams[keySize] = this.dataSource.pageData.pageSize;
        commonParams[keyCurrent] = this.dataSource.pageData.pageNum;
      }
      ajaxParams = { ...ajaxParams, ...commonParams };
      console.log("搜索请求参数");
      console.log(ajaxParams);
      this.ajaxParams = ajaxParams;
      return ajaxParams;
    },
    // filterPane面板clear事件
    clear(msg) {
      console.log("clear");
      console.log(msg);
      if (Object.keys(msg).length > 0) {
        this.getList(msg);
      } else {
        this.getList();
      }
    },
    // 获取所属站点所属国家接口
    async shopClassify() {
      try {
        const res = await shopClassify();
        let shopClassifyOption = res.data;
        let arr = [{
          name: "全部",
          id: ""
        }];
        shopClassifyOption = [...arr, ...shopClassifyOption];
        this.shopClassifyOption = shopClassifyOption;
        this.copyShopClassifyOption =  res.data;
        console.log("所属站点");
        console.log(this.shopClassifyOption);
        sessionStorage.shopClassifyOption = JSON.stringify(this.shopClassifyOption);
        this.filterData.sortList[0].lists = shopClassifyOption;
        this.filterData.sortAjaxFlag = true;
      } catch (error) {}
    },
    // 获取系统内分类
    async getProductClassOption(){
      try {
        const res = await productClassify();
        this.productClassOption = res.data;
        this.filterData.elcascader[this.productClassOptionIndex].option = this.productClassOption;
        console.log(this.productClassOption);
      } catch (error) {
      }
    },
    // 根据countryId,返回countryName
    getCountryName(countryId, shopClassifyOption){
      for(let i = 0; i < shopClassifyOption.length; i += 1){
        if(shopClassifyOption[i].children){
          const country = shopClassifyOption[i].children.filter((item)=>{
            return item.id == countryId;
          });
          if(country[0] && country[0].name){
            return country[0].name;
          }
        }
      }
    }
  },
};
