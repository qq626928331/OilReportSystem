<template>
  <el-row>
    <el-col :span="24">
      <basic-container>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>审批节点</span>
          </div>
          <div class="clearfix">
            <avue-crud
              :option="optionChild"
              :table-loading="loadingChild"
              :data="dataChild"
              ref="crudChild"
              v-model="formChild"
              :permission="permissionList"
              :before-open="beforeOpenChild"
              :before-close="beforeCloseChild"
              @row-del="rowDelChild"
              @row-update="rowUpdateChild"
              @row-save="rowSaveChild"
              @search-change="searchChangeChild"
              @search-reset="searchResetChild"
              @selection-change="selectionChangeChild"
              @current-change="currentChangeChild"
              @size-change="sizeChangeChild"
              @refresh-change="refreshChangeChild"
              @on-load="onLoadChild"
              :style="tableheight2"
            >
              <!-- <template slot="menuLeft">
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  v-if="permission.dict_delete"
                  plain
                  @click="handleDelete"
                >删 除
                </el-button>
              </template>
              <template slot-scope="scope" slot="menu">
                <el-button
                  type="text"
                  icon="el-icon-circle-plus-outline"
                  size="small"
                  @click.stop="handleAdd(scope.row,scope.index)"
                  v-if="userInfo.role_name.includes('admin')"
                >新增子项
                </el-button>
              </template> -->
              <template slot-scope="{row}" slot="isSealed">
                <el-tag>{{row.isSealed===0?'否':'是'}}</el-tag>
              </template>
            </avue-crud>
          </div>
        </el-card>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>
  import {
    getParentList,
    getChildList,
    remove,
    update,
    add,
    getDict,
    getDictTree
  } from "@/api/system/dictbiz";
  import {optionParent, optionChild} from "@/const/system/dictbiz";
  import {mapGetters} from "vuex";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    data() {
      return {
        tableheight1: "",//表格高度
        tableheight2: "",//表格高度
        dictValue: '暂无',
        parentId: -1,
        formParent: {},
        formChild: {},
        selectionList: [],
        query: {},
        loading: true,
        loadingChild: true,
        pageParent: {
          pageSize: 20,
          pageSizes: [20, 30, 50, 100, 200],
          currentPage: 1,
          total: 0
        },
        pageChild: {
          pageSize: 20,
          pageSizes: [20, 30, 50, 100, 200],
          currentPage: 1,
          total: 0
        },
        dataParent: [],
        dataChild: [],
        optionParent: optionParent,
        optionChild: optionChild,
      };
    },
    beforeMount() {//页面加载前
      this.tableheight1 = "height:"+ (window.innerHeight - 233) + "px;overflow:auto;";
      this.tableheight2 = "height:"+ (window.innerHeight - 233) + "px;overflow:auto;";
    },
    computed: {
      ...mapGetters(["userInfo", "permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.dictbiz_add, false),
          delBtn: this.vaildData(this.permission.dictbiz_delete, false),
          editBtn: this.vaildData(this.permission.dictbiz_edit, false),
          viewBtn: false,
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData() {
        getDictTree().then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          const column = this.findObject(this.optionChild.column, "parentId");
          column.dicData = res.data.data;
        });
      },
      handleAdd(row) {
        this.$refs.crudChild.value.parentId = row.id;
        this.$refs.crudChild.option.column.filter(item => {
          if (item.prop === "parentId") {
            item.value = row.id;
          }
        });
        this.$refs.crudChild.rowAdd();
      },
      rowSave(row, done, loading) {
        const form = {
          ...row,
          dictKey: -1,
        };
        add(form).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.onLoadParent(this.pageParent);
          this.$message({
            type: "success",
            message: res.data.msg
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.onLoadParent(this.pageParent);
          this.$message({
            type: "success",
            message: res.data.msg
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            return remove(row.id).then(res => {
              if (res.data.code != 200){
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              this.onLoadParent(this.pageParent);
              this.$message({
                type: "success",
                message: res.data.msg
              });
            });
          })
      },
      handleRowClick(row) {
        this.query = {};
        this.parentId = row.id;
        this.dictValue = row.dictValue;
        this.$refs.crudChild.value.code = row.code;
        this.$refs.crudChild.value.parentId = row.id;
        this.$refs.crudChild.option.column.filter(item => {
          if (item.prop === "code") {
            item.value = row.code;
          }
          if (item.prop === "parentId") {
            item.value = row.id;
          }
        });
        this.onLoadChild(this.pageChild);
      },
      searchReset() {
        this.query = {};
        this.onLoadParent(this.pageParent);
      },
      searchChange(params, done) {
        this.query = params;
        this.pageParent.currentPage = 1;
        this.onLoadParent(this.pageParent, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            return remove(row.id).then(res => {
              if (res.data.code != 200){
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              this.onLoadParent(this.pageParent);
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.$refs.crud.toggleSelection();
            });
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDict(this.formParent.id).then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.formParent = res.data.data;
          });
        }
        done();
      },
      currentChange(currentPage) {
        this.pageParent.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.pageParent.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoadParent(this.pageParent, this.query);
      },
      rowSaveChild(row, done, loading) {
        add(row).then(res => {
          this.onLoadChild(this.pageChild);
          this.$message({
            type: "success",
            message: res.data.msg
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowUpdateChild(row, index, done, loading) {
        update(row).then(res => {
          this.onLoadChild(this.pageChild);
          this.$message({
            type: "success",
            message: res.data.msg
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowDelChild(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return remove(row.id).then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            } else {
              this.onLoadChild(this.pageChild);
              this.$message({
                type: "success",
                message: res.data.msg
              });
            }
          });
        })
      },
      searchResetChild() {
        this.query = {};
        this.onLoadChild(this.pageChild);
      },
      searchChangeChild(params, done) {
        this.query = params;
        this.pageChild.currentPage = 1;
        this.onLoadChild(this.pageChild, params);
        done();
      },
      selectionChangeChild(list) {
        this.selectionList = list;
      },
      selectionClearChild() {
        // this.selectionList = [];
        // this.$refs.crudChild.toggleSelection();
      },
      handleDeleteChild() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return remove(this.ids).then(res => {
            this.onLoadChild(this.pageChild);
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.$refs.crudChild.toggleSelection();
          });
        })
      },
      beforeOpenChild(done, type) {
        if (["add", "edit"].includes(type)) {
          this.initData();
        }
        if (["edit", "view"].includes(type)) {
          getDict(this.formChild.id).then(res => {
            this.formChild = res.data.data;
          });
        }
        done();
      },
      beforeCloseChild(done) {
        this.parentId = "1291652444409880578";
        this.$refs.crudChild.value.parentId = this.parentId;
        this.$refs.crudChild.option.column.filter(item => {
          if (item.prop === "parentId") {
            item.value = this.parentId;
          }
        });
        done();
      },
      currentChangeChild(currentPage) {
        this.pageChild.currentPage = currentPage;
      },
      sizeChangeChild(pageSize) {
        this.pageChild.pageSize = pageSize;
      },
      refreshChangeChild() {
        this.onLoadChild(this.pageChild, this.query);
      },
      onLoadParent(page, params = {}) {
        this.loading = true;
        getParentList(
          page.currentPage,
          page.pageSize,
          Object.assign(params, this.query)
        ).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            const data = res.data.data;
            this.pageParent.total = data.total;
            this.dataParent = data.records;
            this.loading = false;
            this.selectionClear();
          }
        });
      },
      onLoadChild(page, params = {}) {
        this.loadingChild = true;
        getChildList(
          page.currentPage,
          page.pageSize,
          '1291652444409880578',
          Object.assign(params, this.query)
        ).then(res => {
          this.dataChild = res.data.data;
          this.loadingChild = false;
          this.selectionClear();
        });
      }
    }
  };
</script>
