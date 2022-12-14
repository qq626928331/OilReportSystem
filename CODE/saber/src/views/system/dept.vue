<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               ref="crud"
               v-model="form"
               :permission="permissionList"
               :before-open="beforeOpen"
               :before-close="beforeClose"
               @row-del="rowDel"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @header-dragend="headerDragend"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad"
               @tree-load="treeLoad"
               :style="tableheight">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   v-if="false"
                   plain
                   @click="handleDelete">删 除
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
      </template>
      <template slot-scope="{row}"
                slot="deptCategory">
        <el-tag>{{row.deptCategoryName}}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {
    getLazyList,
    remove,
    update,
    add,
    getDept,
    getDeptTree
  } from "@/api/system/dept";
  import {mapGetters} from "vuex";
  import website from '@/config/website';

  export default {
    name:'/system/dept',
    data() {
      return {
        tableheight: "",//表格高度
        form: {},
        selectionList: [],
        query: {},
        loading: true,
        parentId: 0,
        page: {
          pageSize: 20,
          currentPage: 1,
          total: 0,
        },
        option: {
          height:'auto',
          calcHeight: 30,
          lazy: true,
          tip: false,
          align:'center',
          simplePage: true,
          searchShow: true,
          searchBtnText:"查询",
          searchMenuSpan: 6,
          indexLabel:'序号',
          tree: true,
          menu:false,
          expandRowKeys:['1'],
          header:false,
          border: true,
          index: true,
          selection: false,
          viewBtn: true,
          menuWidth: 300,
          dialogClickModal: false,
          column: [
            {
              label: "全称",
              prop: "deptName",
              search: true,
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入机构名称",
                trigger: "blur"
              }]
            },
            {
              label: "编码",
              width: 100,
              prop: "deptCode",
              overHidden: true,
              hide: false,
              search: false,
            },
            {
              label: "所属租户",
              prop: "tenantId",
              type: "tree",
              dicUrl: "/api/blade-system/tenant/select",
              addDisplay: false,
              editDisplay: false,
              overHidden: true,
              viewDisplay: website.tenantMode,
              span: 24,
              props: {
                label: "tenantName",
                value: "tenantId"
              },
              hide: true,
              search: false,
              rules: [{
                required: true,
                message: "请输入所属租户",
                trigger: "click"
              }]
            },
            {
              label: "简称",
              prop: "fullName",
              overHidden: true,
              search: true,
              rules: [{
                required: true,
                message: "请输入机构简称",
                trigger: "blur"
              }]
            },
            {
              label: "上级单位",
              prop: "parentName",
              dicData: [],
              type: "tree",
              overHidden: true,
              hide: false,
              props: {
                label: "title"
              },
              rules: [{
                required: false,
                message: "请选择上级机构",
                trigger: "click"
              }]
            },
            {
              label: "机构类型",
              type: "select",
              dicUrl: "/api/blade-system/dict/dictionary?code=org_category",
              hide: true,
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              dataType: "number",
              width: 120,
              prop: "deptCategory",
              slot: true,
              rules: [{
                required: true,
                message: "请输入机构类型",
                trigger: "blur"
              }]
            },
            {
              label: "排序",
              prop: "sort",
              type: "number",
              align: "center",
              width: 80,
              hide: true,
              rules: [{
                required: true,
                message: "请输入排序",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "remark",
              rules: [{
                required: false,
                message: "请输入备注",
                trigger: "blur"
              }],
              hide: true
            }
          ]
        },
        data: [],
      };
    },
    mounted() {
      this.setClientHight()
      window.addEventListener('resize', () => this.setClientHight(), false)
    },
    computed: {
      ...mapGetters(["userInfo", "permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData( false),
          viewBtn: this.vaildData(this.permission.dept_view, false),
          delBtn: this.vaildData(this.permission.dept_delete, false),
          editBtn: this.vaildData(this.permission.dept_edit, false)
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
      initData() {
        getDeptTree().then(res => {
          const column = this.findObject(this.option.column, "parentId");
          column.dicData = res.data.data;
        });
      },
      handleAdd(row) {
        this.$refs.crud.value.parentId = row.id;
        this.$refs.crud.option.column.filter(item => {
          if (item.prop === "parentId") {
            item.value = row.id;
            item.addDisabled = true;
          }
        });
        this.$refs.crud.rowAdd();
      },
      rowSave(row, done, loading) {
        add(row).then((res) => {
          // 获取新增数据的相关字段
          const data = res.data.data;
          row.id = data.id;
          row.deptCategoryName = data.deptCategoryName;
          row.tenantId = data.tenantId;
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          // 数据回调进行刷新
          done(row);
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          // 数据回调进行刷新
          done(row);
        }, error => {
          window.console.log(error);
          loading();
        });
      },
      rowDel(row, index, done) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            // 数据回调进行刷新
            done(row);
          });
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
            // 刷新表格数据并重载
            this.data = [];
            this.parentId = 0;
            this.$refs.crud.refreshTable();
            this.$refs.crud.toggleSelection();
            // 表格数据重载
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      searchReset() {
        this.query = {};
        this.parentId = 0;
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.parentId = '';
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
      beforeOpen(done, type) {
        if (["add", "edit"].includes(type)) {
          this.initData();
        }
        if (["edit", "view"].includes(type)) {
          getDept(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      beforeClose(done) {
        this.$refs.crud.tableForm = {};
        this.$refs.crud.value.parentId = "";
        this.$refs.crud.value.addDisabled = false;
        this.$refs.crud.option.column.filter(item => {
          if (item.prop === "parentId") {
            item.value = "";
            item.addDisabled = false;
          }
        });
        done();
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getLazyList('', Object.assign(params, this.query)).then(res => {
          this.data = res.data.data;
          //排序显示-1问题

          this.data.forEach(ele=>{
            if(ele.sort == -1){
              ele.sort = '';
            }

          })
          console.log(this.data)
          this.loading = false;

        });
      },
      treeLoad(tree, treeNode, resolve) {
        const parentId = tree.id;
        getLazyList(parentId).then(res => {
          //排序显示-1问题
          res.data.data.forEach(ele=>{
            if(ele.sort == -1){
              ele.sort = '';
            }
          })
        console.log(this.data)
          resolve(res.data.data);
        });
      }
    }
  };
</script>


