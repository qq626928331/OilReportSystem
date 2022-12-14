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
               :style="tableheight"
               @tree-load="treeLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   v-if="permission.menu_delete"
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
                slot="source">
        <div style="text-align:center">
          <i :class="row.source"/>
        </div>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getLazyList, remove, update, add, getMenu} from "@/api/system/menu";
  import {mapGetters} from "vuex";
  import iconList from "@/config/iconList";
  import func from "@/util/func";
  import {getMenuTree} from "@/api/system/menu";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/system/menu',
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        selectionList: [],
        parentId: 0,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0,
        },
        option: {
          indexLabel:'序号',
          lazy: true,
          tip: false,
          simplePage: true,
          searchShow: true,
          searchMenuSpan: 6,
          dialogWidth: "60%",
          tree: true,
          border: true,
          index: true,
          selection: true,
          viewBtn: true,
          menuWidth: 300,
          dialogClickModal: false,
          column: [
            {
              label: "菜单名称",
              overHidden: true,
              prop: "name",
              search: true,
              rules: [
                {
                  required: true,
                  message: "请输入菜单名称",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "路由地址",
              prop: "path",
              overHidden: true,
              rules: [
                {
                  required: true,
                  message: "请输入路由地址",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "上级菜单",
              prop: "parentId",
              type: "tree",
              dicData: [],
              hide: true,
              props: {
                label: "title"
              },
              rules: [
                {
                  required: false,
                  message: "请选择上级菜单",
                  trigger: "click"
                }
              ]
            },
            {
              label: "菜单图标",
              prop: "source",
              type: "icon",
              slot: true,
              iconList: iconList,
              rules: [
                {
                  message: "请输入菜单图标",
                  trigger: "click"
                }
              ]
            },
            {
              label: "菜单编号",
              prop: "code",
              search: true,
              overHidden: true,
              rules: [
                {
                  required: true,
                  message: "请输入菜单编号",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "菜单类型",
              prop: "category",
              type: "radio",
              dicData: [
                {
                  label: "菜单",
                  value: 1
                },
                {
                  label: "按钮",
                  value: 2
                }
              ],
              hide: true,
              rules: [
                {
                  required: true,
                  message: "请选择菜单类型",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "菜单别名",
              prop: "alias",
              search: true,
              overHidden: true,
              rules: [
                {
                  required: true,
                  message: "请输入菜单别名",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "菜单排序",
              prop: "sort",
              type: "number",
              rules: [
                {
                  required: true,
                  message: "请输入菜单排序",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "菜单备注",
              prop: "remark",
              type: "textarea",
              span: 24,
              minRows: 2,
              hide: true
            }
          ]
        },
        data: [],
        tableheight:'',
      };
    },
    watch: {
      'form.category'() {
        const category = func.toInt(this.form.category);
        this.$refs.crud.option.column.filter(item => {
          if (item.prop === "path") {
            item.rules[0].required = category === 1;
          }
        });
      }
    },
    computed: {
      ...mapGetters(["userInfo", "permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.menu_add, false),
          viewBtn: this.vaildData(this.permission.menu_view, false),
          delBtn: this.vaildData(this.permission.menu_delete, false),
          editBtn: this.vaildData(this.permission.menu_edit, false)
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
      initData() {
        getMenuTree().then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
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
          getMenu(this.form.id).then(res => {
            if (res.data.code != 200){
              return errorMsgbox(this,res.data.msg)
            }
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
        getLazyList(this.parentId, Object.assign(params, this.query)).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.data = res.data.data;
          this.loading = false;
          this.selectionClear();
        });
      },
      treeLoad(tree, treeNode, resolve) {
        const parentId = tree.id;
        getLazyList(parentId).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          resolve(res.data.data);
        });
      }
    }
  };
</script>

<style>
</style>
