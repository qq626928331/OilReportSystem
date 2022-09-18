<template>
  <el-pagination  style="text-align: right;padding: 10px 5px 0px 5px;width: auto;"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page="pageInfo.pageIndex"
                 :page-sizes="[100, 200, 300, 400]"
                 :page-size="pageInfo.pageSize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="pageInfo.total">
  </el-pagination>
</template>

<script>
let pageInfo = {
  pageIndex: 1,
  pageSize: 20,
  total: 0
}
export default {
  name: "PaginationVue",
  props: {
    pageInfo: {
      Type: Object,
      default: () => pageInfo
    }
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {


    }
  }
}
</script>

<style scoped lang="scss">
 /deep/ .el-input .el-input--mini .el-input--suffix{
  width: 100px !important;
}
</style>
