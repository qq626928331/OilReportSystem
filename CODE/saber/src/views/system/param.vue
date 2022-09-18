<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :style="tableheight"
               ref="crud"
               v-model="form"
               :page.sync="page"
               :permission="permissionList"
               @row-del="rowDel"
               @row-update="rowUpdate"
               @header-dragend="headerDragend"
               @row-save="rowSave"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   v-if="permission.param_delete"
                   plain
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, remove, update, add} from "@/api/system/param";
  import {mapGetters} from "vuex";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/system/param',
    data() {
      return {
        form: {},
        selectionList: [],
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        option: {
          indexLabel:'序号',
          height: 'auto',
          calcHeight: 30,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          selection: true,
          viewBtn: true,
          dialogClickModal: false,
          column: [
            {
              label: "参数名称",
              prop: "paramName",
              search: true,
              span: 24,
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入参数名称",
                trigger: "blur"
              }]
            },
            {
              label: "参数键名",
              prop: "paramKey",
              search: true,
              span: 24,
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入参数键名",
                trigger: "blur"
              }]
            },
            {
              label: "参数键值",
              prop: "paramValue",
              type: "textarea",
              overHidden: true,
              span: 24,
              minRows: 6,
              rules: [{
                required: true,
                message: "请输入参数键值",
                trigger: "blur"
              }]
            }
          ]
        },
        data: [],
        tableheight:''
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.param_add, false),
          viewBtn: this.vaildData(this.permission.param_view, false),
          delBtn: this.vaildData(this.permission.param_delete, false),
          editBtn: this.vaildData(this.permission.param_edit, false)
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
      this.setClientHight()
      window.addEventListener('resize', () => this.setClientHight(), false)
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        let dom = document.getElementById('avue-view')
        this.tableheight = "height:"+ (dom.offsetHeight - 60)  + "px;overflow:auto;";
      },
      headerDragend(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      rowSave(row, done, loading) {
        add(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
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
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
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
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
        let table = document.getElementsByClassName('el-table--scrollable-y')[0]
        let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
        if(table && tableBody){
          table.scrollTop = 0
          tableBody.scrollTop = 0
        }
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
</style>
