<template>
  <div class="page">
    <el-pagination
      v-if="pageData.total>0"
      :current-page="pageData.pageNum"
      :page-sizes="pageData.pageSizes?pageData.pageSizes:[5,10,15,20,25,30]"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    pageData: {
      type: Object
    }
  },
  data() {
    return {
    };
  },
  watch: {
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("changeSize", val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit("changeCurrent", val);
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped lang='scss'>
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
</style>

