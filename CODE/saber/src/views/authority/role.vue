<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               ref="crud"
               v-model="form"
               :permission="permissionList"
               :before-open="beforeOpen"
               @row-del="rowDel"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @header-dragend="headerDragend"
               @row-click="handleSelectMatterPro"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad"
               :style="tableheight">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   v-if="permission.role_delete"
                   plain
                   @click="handleDelete">删 除
        </el-button>
        <el-button size="small"
                   icon="el-icon-setting"
                   @click="handleRole"
                   plain>权限设置
        </el-button>
      </template>
    </avue-crud>
    <el-dialog title="角色权限配置"
               append-to-body
               :visible.sync="box"
               width="345px">
      <el-tabs type="border-card">
        <el-tab-pane label="菜单权限">
          <el-tree :data="menuGrantList"
                   show-checkbox
                   node-key="id"
                   ref="treeMenu"
                   :default-checked-keys="menuTreeObj"
                   :props="props">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="数据权限">
          <el-tree :data="dataScopeGrantList"
                   show-checkbox
                   node-key="id"
                   ref="treeDataScope"
                   :default-checked-keys="dataScopeTreeObj"
                   :props="props">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="接口权限">
          <el-tree :data="apiScopeGrantList"
                   show-checkbox
                   node-key="id"
                   ref="treeApiScope"
                   :default-checked-keys="apiScopeTreeObj"
                   :props="props">
          </el-tree>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="box = false">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {add, getList, getRole, getRoleTree, grant, grantTree, remove, update,check} from "@/api/system/role";
  import {mapGetters} from "vuex";
  import {errorMsgbox} from "@/api/global_variable";
  import website from '@/config/website';

  export default {
    name:'/authority/role',
    data() {
      return {
        tableheight: "",//表格高度
        form: {},
        box: false,
        props: {
          label: "title",
          value: "key"
        },
        menuGrantList: [],
        dataScopeGrantList: [],
        apiScopeGrantList: [],
        apiGrantList: [],
        menuTreeObj: [],
        dataScopeTreeObj: [],
        apiScopeTreeObj: [],
        selectionList: [],
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        option: {
          tip: false,
          height:'auto',
          calcHeight: "30",
          simplePage: true,
          searchShow: true,
          searchMenuSpan: 6,
          tree: true,
          border: true,
          index: true,
          selection: true,
          viewBtn: true,
          dialogWidth: 900,
          align:"center",
          dialogClickModal: false,
          indexLabel:'序号',
          highlightCurrentRow:true,
          searchBtnText:"查询",
          column: [
            {
              minWidth:200,
              label: "角色名称",
              prop: "roleName",
              search: true,
              overHidden: true,
              // span: 24,
              rules: [
                {
                  required: true,
                  message: "请输入角色名称",
                  trigger: "blur"
                }
              ]
            },
            /*{
              label: "所属租户",
              prop: "tenantId",
              type: "tree",
              dicUrl: "/api/blade-system/tenant/select",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: website.tenantMode,
              span: 24,
              props: {
                label: "tenantName",
                value: "tenantId"
              },
              hide: !website.tenantMode,
              search: website.tenantMode,
              rules: [{
                required: true,
                message: "请输入所属租户",
                trigger: "click"
              }]
            },*/
            {
              minWidth:150,
              label: "角色别名",
              prop: "roleAlias",
              search: true,
              overHidden: true,
              // span: 24,
              // display: false,
              // minWidth: 100,
              rules: [
                {
                  required: true,
                  message: "请输入角色别名",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "上级角色",
              prop: "parentId",
              dicData: [],
              type: "tree",
              hide: true,
              span: 24,
              props: {
                label: "title"
              },
              addDisplay:false,
              editDisplay:false,
              rules: [
                {
                  required: false,
                  message: "请选择上级角色",
                  trigger: "click"
                }
              ]
            }
            // {
            //   label: "角色排序",
            //   prop: "sort",
            //   type: "number",
            //   span: 24,
            //   rules: [
            //     {
            //       required: true,
            //       message: "请输入角色排序",
            //       trigger: "blur"
            //     }
            //   ]
            // }
          ]
        },
        data: []
      };
    },
    beforeMount() {//页面加载前
      window.addEventListener('resize', () => {
        this.tableheight = "height:"+ (window.innerHeight - 145) + "px;overflow:auto;";
      }, false)

    },
    computed: {
      ...mapGetters(["userInfo", "permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.role_add, false),
          viewBtn: this.vaildData(this.permission.role_view, false),
          delBtn: this.vaildData(this.permission.role_delete, false),
          editBtn: this.vaildData(this.permission.role_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);

        });
        return ids.join(",");
      },
      idsArray() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids;
      }
    },
    mounted() {
      console.log(this.permission)
    },
    methods: {
      headerDragend(a,b,c,d){
        console.log(a,b,d)
      },
      handleSelectMatterPro(row) {
        this.selectionClear();
        this.$refs.crud.toggleSelection([row]);
      },
      initData(){
        getRoleTree().then(res => {
          const column = this.findObject(this.option.column, "parentId");
          column.dicData = res.data.data;
        });
      },
      submit() {
        const menuList = this.$refs.treeMenu.getCheckedKeys();
        const dataScopeList = this.$refs.treeDataScope.getCheckedKeys();
        const apiScopeList = this.$refs.treeApiScope.getCheckedKeys();
        grant(this.idsArray, menuList, dataScopeList, apiScopeList).then(() => {
          this.box = false;
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.onLoad(this.page);
        });
      },
      rowSave(row, done, loading) {
        this.checkFrom(row, done, loading)
        // add(row).then(() => {
        //   this.onLoad(this.page);
        //   this.$message({
        //     type: "success",
        //     message: "操作成功!"
        //   });
        //   done();
        // }, error => {
        //   window.console.log(error);
        //   loading();
        // });
      },
      // 添加前的校验
      checkFrom (row,done, loading) {
        check(row).then(res=>{
          if (res.data.code == 200) {
            add(row).then(res1 => {
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: res1.data.msg
              });
              done();
            }, error => {
              window.console.log(error);
              loading();
            });
          } else {
            this.$message({
              type: "warning",
              message: "当前添加了重复的数据，请更改后重新添加!"
            });
            loading();
          }
        })
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
      beforeOpen(done, type) {
        if (["add", "edit"].includes(type)) {
          this.initData();
        }
        done();
      },
      handleRole() {
        if (this.selectionList.length !== 1) {
          this.$message.warning("只能选择一条数据");
          return;
        }
        this.menuTreeObj = [];
        this.dataScopeTreeObj = [];
        this.apiScopeTreeObj = [];
        grantTree()
          .then(res => {
            this.menuGrantList = res.data.data.menu;
            this.dataScopeGrantList = res.data.data.dataScope;
            this.apiScopeGrantList = res.data.data.apiScope;
            getRole(this.ids).then(res => {
              this.menuTreeObj = res.data.data.menu;
              this.dataScopeTreeObj = res.data.data.dataScope;
              this.apiScopeTreeObj = res.data.data.apiScope;
              this.box = true;
            });
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
          this.data = res.data.data;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style scoped="scoped" lang="scss">

/deep/ .avue-crud__right {
  display: none;
}

</style>
