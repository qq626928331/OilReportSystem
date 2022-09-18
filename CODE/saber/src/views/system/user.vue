<template>
  <el-row>
    <el-col :span="5">
      <div class="box">
        <basic-container>
          <avue-tree :option="treeOption" :data="treeData" @node-click="nodeClick" :style="treeStyle"/>
        </basic-container>
      </div>
    </el-col>
    <el-col :span="19">
      <basic-container>
        <avue-crud :option="option"
                   :table-loading="loading"
                   :data="data"
                   ref="crud"
                   v-model="form"
                   @header-dragend="headerDragend"
                   :permission="permissionList"
                   @row-del="rowDel"
                   @row-update="rowUpdate"
                   @row-save="rowSave"
                   @row-click="handleSelectmatterpro"
                   :before-open="beforeOpen"
                   :page.sync="page"
                   @search-change="searchChange"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @refresh-change="refreshChange"
                   @on-load="onLoad"
                   :style="tableheight"
        >
          <template slot="menuLeft">
            <!--<el-button type="danger"
                       size="small"
                       plain
                       icon="el-icon-delete"
                       v-if="permission.user_delete"
                       @click="handleDelete">删 除
            </el-button>-->
            <el-button type="info"
                       size="small"
                       plain
                       v-if="permission.user_role"
                       icon="el-icon-user"
                       @click="handleGrant">角色配置
            </el-button>
            <!--<el-button size="small"
                       plain
                       v-if="permission.user_reset"
                       icon="el-icon-refresh"
                       @click="handleReset">密码重置
            </el-button>
            <el-button type="success"
                       size="small"
                       plain
                       v-if="userInfo.role_name.includes('admin')"
                       icon="el-icon-upload2"
                       @click="handleImport">导入
            </el-button>
            <el-button type="warning"
                       size="small"
                       plain
                       v-if="userInfo.role_name.includes('admin')"
                       icon="el-icon-download"
                       @click="handleExport">导出
            </el-button>-->
          </template>
          <template slot-scope="{row}"
                    slot="tenantName">
            <el-tag>{{row.tenantName}}</el-tag>
          </template>
          <template slot-scope="{row}"
                    slot="roleName">
            <el-tag>{{row.roleName}}</el-tag>
          </template>
          <template slot-scope="{row}"
                    slot="deptName">
            <el-tag>{{row.deptName}}</el-tag>
          </template>
        </avue-crud>
        <el-dialog title="用户数据导入"
                   append-to-body
                   :visible.sync="excelBox"
                   width="555px">
          <avue-form :option="excelOption" v-model="excelForm" :upload-after="uploadAfter">
            <template slot="excelTemplate">
              <el-button type="primary" @click="handleTemplate">
                点击下载<i class="el-icon-download el-icon--right"></i>
              </el-button>
            </template>
          </avue-form>
        </el-dialog>
      </basic-container>
    </el-col>

    <el-dialog :title="title"
               append-to-body
               :visible.sync="roleBox"
               @close="closeDialog"
               width="800px">
      <div v-if="selectionList.length>0" style="margin-top: -30px;margin-left: 20px">
        <span>{{selectionList[0].realName}}-{{selectionList[0].account}}-{{selectionList[0].deptName}}</span>
      </div>
      <el-divider></el-divider>
      <div style="margin-bottom: 10px;margin-top: 10px;">
        <span>角色：</span>
        <div style="background-color: #ECF5FE;height: 30px;line-height: 30px;margin-top: 5px;">
          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange" style="margin-left: 10px">
            <el-checkbox text-color="black" v-for="role in roles" :label="role.id" :key="role.id">{{role.role_name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <avue-crud :option="menuoption"
                 :data="menudata"
                 ref="crud"
                 @tree-load="treeLoad">
      </avue-crud>
    </el-dialog>
  </el-row>
</template>

<script>
  import {getList, getUser, remove, update, add, grant, resetPassword } from "@/api/system/user";
  import {getDeptTree, getDeptLazyTree} from "@/api/system/dept";
  import {getMenuByRole} from "@/api/system/menu";
  import {getRoleList} from "@/api/system/role";
  import {getPostList} from "@/api/system/post";
  import {mapGetters} from "vuex";
  import website from '@/config/website';
  import {getToken} from '@/util/auth';
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/system/user',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        parentId: "",
        tableheight: "",//表格高度
        treeStyle:"",//树高的样式
        form: {},
        roleBox: false,
        excelBox: false,
        initFlag: true,
        selectionList: [],
        query: {},
        loading: true,
        page: {
          pageSize: 20,
          currentPage: 1,
          total: 0,
          pageSizes: [ 20, 30, 50, 100 ],
        },
        init: {
          roleTree: [],
          deptTree: [],
        },
        props: {
          label: "title",
          value: "key"
        },
        roleGrantList: [],
        roleTreeObj: [],
        treeDeptId: '',
        treeData: [],
        treeOption: {
          nodeKey: 'id',
          defaultExpandAll:true,
          lazy: true,
          treeLoad: function (node, resolve) {
            const parentId = (node.level === 0) ? 0 : node.data.id;
            getDeptLazyTree(parentId).then(res => {
              if (res.data.code != 200) {
                let that = this;
                errorMsgbox(that, res.data.msg);
              } else {
                resolve(res.data.data.map(item => {
                  return {
                    ...item,
                    leaf: !item.hasChildren
                  }
                }))
              }
            });
          },
          addBtn: false,
          menu: false,
          size: 'small',
          props: {
            labelText: '标题',
            label: 'title',
            value: 'value',
            children: 'children'
          }
        },
        option: {
          height: 'auto',
          indexLabel:'序号',
          calcHeight: "80",
          align:'center',
          tip: false,
          searchShow: true,
          searchBtnText:"查询",
          searchMenuSpan: 6,
          border: true,
          index: true,
          selection: true,
          viewBtn: true,
          menu:false,
          dialogClickModal: false,
          addBtn:false,
          column: [
            {
              label: "登录账号",
              prop: "account",
              search: true,
              display: false,
              overHidden: true,
              minWidth: 100,
              width:100
            },
            {
              label: "所属租户",
              prop: "tenantName",
              slot: true,
              display: false,
              hide: true,
            },
            {
              label: "用户姓名",
              prop: "realName",
              search: true,
              display: false,
              overHidden: true,
              minWidth: 100,
            },
            {
              label: "所属角色",
              prop: "roleName",
              slot: true,
              display: false,
              overHidden: true,
              minWidth: 100,
            },
            {
              label: "所属部门",
              prop: "deptName",
              slot: true,
              display: false,
              overHidden: true,
              minWidth: 100,
            },
          ],
          group: [
            {
              label: '基础信息',
              prop: 'baseInfo',
              icon: 'el-icon-user-solid',
              column: [
                {
                  label: "登录账号",
                  prop: "account",
                  rules: [{
                    required: true,
                    message: "请输入登录账号",
                    trigger: "blur"
                  }],
                  span: website.tenantMode ? 12 : 24,
                },
                {
                  label: "所属租户",
                  prop: "tenantId",
                  type: "tree",
                  dicUrl: "/api/blade-system/tenant/select",
                  props: {
                    label: "tenantName",
                    value: "tenantId"
                  },
                  hide: !website.tenantMode,
                  addDisplay: website.tenantMode,
                  editDisplay: website.tenantMode,
                  viewDisplay: website.tenantMode,
                  rules: [{
                    required: true,
                    message: "请输入所属租户",
                    trigger: "click"
                  }]
                },
                {
                  label: '密码',
                  prop: 'password',
                  hide: true,
                  editDisplay: false,
                  viewDisplay: false,
                  rules: [{required: true, validator: validatePass, trigger: 'blur'}]
                },
                {
                  label: '确认密码',
                  prop: 'password2',
                  hide: true,
                  editDisplay: false,
                  viewDisplay: false,
                  rules: [{required: true, validator: validatePass2, trigger: 'blur'}]
                },
              ]
            },
            {
              label: '详细信息',
              prop: 'detailInfo',
              icon: 'el-icon-s-order',
              column: [
                {
                  label: "用户昵称",
                  prop: "name",
                  hide: true,
                  rules: [{
                    required: true,
                    message: "请输入用户昵称",
                    trigger: "blur"
                  }]
                },
                {
                  label: "用户姓名",
                  prop: "realName",
                  rules: [{
                    required: true,
                    message: "请输入用户姓名",
                    trigger: "blur"
                  }, {
                    min: 2,
                    max: 5,
                    message: '姓名长度在2到5个字符'
                  }]
                },
                {
                  label: "手机号码",
                  prop: "phone",
                  overHidden: true
                },
                {
                  label: "电子邮箱",
                  prop: "email",
                  hide: true,
                  overHidden: true
                },
                {
                  label: "用户性别",
                  prop: "sex",
                  type: "select",
                  dicData: [
                    {
                      label: "男",
                      value: 1
                    },
                    {
                      label: "女",
                      value: 2
                    },
                    {
                      label: "未知",
                      value: 3
                    }
                  ],
                  hide: true
                },
                {
                  label: "用户生日",
                  type: "date",
                  prop: "birthday",
                  format: "yyyy-MM-dd HH:mm:ss",
                  valueFormat: "yyyy-MM-dd HH:mm:ss",
                  hide: true
                },
                {
                  label: "账号状态",
                  prop: "statusName",
                  hide: true,
                  display: false
                }
              ]
            },
            {
              label: '职责信息',
              prop: 'dutyInfo',
              icon: 'el-icon-s-custom',
              column: [
                {
                  label: "用户编号",
                  prop: "code",
                },
                {
                  label: "所属角色",
                  prop: "roleId",
                  multiple: true,
                  type: "tree",
                  dicData: [],
                  props: {
                    label: "title"
                  },
                  checkStrictly: true,
                  slot: true,
                  rules: [{
                    required: true,
                    message: "请选择所属角色",
                    trigger: "click"
                  }]
                },
                {
                  label: "所属部门",
                  prop: "deptId",
                  type: "tree",
                  multiple: true,
                  dicData: [],
                  props: {
                    label: "title"
                  },
                  checkStrictly: true,
                  slot: true,
                  rules: [{
                    required: true,
                    message: "请选择所属部门",
                    trigger: "click"
                  }]
                },
                {
                  label: "所属岗位",
                  prop: "postId",
                  type: "tree",
                  multiple: true,
                  dicData: [],
                  props: {
                    label: "postName",
                    value: "id"
                  },
                  rules: [{
                    required: true,
                    message: "请选择所属岗位",
                    trigger: "click"
                  }],
                },
              ]
            },
          ]
        },
        data: [],
        excelForm: {},
        excelOption: {
          submitBtn: false,
          emptyBtn: false,
          column: [
            {
              label: '模板上传',
              prop: 'excelFile',
              type: 'upload',
              drag: true,
              loadText: '模板上传中，请稍等',
              span: 24,
              propsHttp: {
                res: 'data'
              },
              tip: '请上传 .xls,.xlsx 标准格式文件',
              action: "/api/blade-user/import-user"
            },
            {
              label: "数据覆盖",
              prop: "isCovered",
              type: "switch",
              align: "center",
              width: 80,
              dicData: [
                {
                  label: "否",
                  value: 0
                },
                {
                  label: "是",
                  value: 1
                }
              ],
              value: 0,
              slot: true,
              rules: [
                {
                  required: true,
                  message: "请选择是否覆盖",
                  trigger: "blur"
                }
              ]
            },
            {
              label: '模板下载',
              prop: 'excelTemplate',
              formslot: true,
              span: 24,
            }
          ]
        },
        title:'',//选中的用户姓名
        roles:[],//角色列表
        checkedRoles:[],//已选中的角色
        menuparentId:0,
        menudata:[],
        menuoption: {
          height: '400',
          indexLabel:'序号',
          menu:false,
          lazy: true,
          tip: false,
          header:false,
          simplePage: true,
          searchShow: false,
          searchMenuSpan: 6,
          tree: true,
          border: true,
          index: true,
          selection: false,
          viewBtn: false,
          columnBtn:false,
          refreshBtn:false,
          addBtn:false,
          dialogClickModal: false,
          searchBtnText:"查询",
          column: [
            {
              label: "菜单名称",
              prop: "name",
              search: false,
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
              rules: [
                {
                  required: true,
                  message: "请输入路由地址",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "菜单编号",
              prop: "code",
              search: false,
              rules: [
                {
                  required: true,
                  message: "请输入菜单编号",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "菜单别名",
              prop: "alias",
              search: false,
              rules: [
                {
                  required: true,
                  message: "请输入菜单别名",
                  trigger: "blur"
                }
              ]
            }
          ]
        },

      };
    },
    watch: {
      'form.tenantId'() {
        if (this.form.tenantId !== '' && this.initFlag) {
          this.initData(this.form.tenantId);
        }
      },
      'excelForm.isCovered'() {
        if (this.excelForm.isCovered !== '') {
          const column = this.findObject(this.excelOption.column, "excelFile");
          column.action = `/api/blade-user/import-user?isCovered=${this.excelForm.isCovered}`;
        }
      }
    },
    computed: {
      ...mapGetters(["userInfo", "permission"]),
      permissionList() {
        return {
          addBtn: false,
          viewBtn: this.vaildData(this.permission.user_view, false),
          delBtn: this.vaildData(this.permission.user_delete, false),
          editBtn: this.vaildData(this.permission.user_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      },
    },
    mounted() {
      window.addEventListener('resize', () => this.setClientHight(), false)

      // 非租户模式默认加载管理组数据
      if (!website.tenantMode) {
        this.initData(website.tenantId);
      }
    },
    beforeMount() {//页面加载前
      this.setClientHight()
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        var avueId = document.getElementById("avue-view");
        avueId.setAttribute('style','height:100%');

        avueId.style.removeProperty = "none";
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        var hh = h-145;

        this.treeStyle = "height:"+ hh + "px;overflow:auto;";
        this.tableheight = "height:"+ hh+ "px;overflow:auto;";
      },
      headerDragend(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      handleSelectmatterpro(row) {
        this.selectionClear();
        this.$refs.crud.toggleSelection([row]);
      },
      closeDialog(){
        this.roleBox = false;
        this.onLoad(this.page);
      },
      nodeClick(data) {
        this.parentId = data.parentId;
        this.treeDeptId = data.id;
        this.page.currentPage = 1;
        this.onLoad(this.page);
      },
      initData(tenantId) {
        getRoleTree(tenantId).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            const column = this.findObject(this.option.group, "roleId");
            column.dicData = res.data.data;
          }
        });
        getDeptTree(tenantId).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            const column = this.findObject(this.option.group, "deptId");
            column.dicData = res.data.data;
          }
        });
        getPostList(tenantId).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            const column = this.findObject(this.option.group, "postId");
            column.dicData = res.data.data;
          }
        });
      },
      submitRole() {
        const roleList = this.$refs.treeRole.getCheckedKeys().join(",");
        grant(this.ids, roleList).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            this.roleBox = false;
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          this.onLoad(this.page);
        });
      },
      rowSave(row, done, loading) {
        row.deptId = row.deptId.join(",");
        row.roleId = row.roleId.join(",");
        row.postId = row.postId.join(",");
        add(row).then(() => {
          this.initFlag = false;
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
        row.deptId = row.deptId.join(",");
        row.roleId = row.roleId.join(",");
        row.postId = row.postId.join(",");
        update(row).then(() => {
          this.initFlag = false;
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
        this.treeDeptId = '';
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
      handleReset() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择账号密码重置为123456?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return resetPassword(this.ids);
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      handleGrant() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条用户数据信息");
          return;
        }
        this.roleTreeObj = [];
        if (this.selectionList.length === 1) {
          this.title = this.selectionList[0].realName;
          this.roleTreeObj = this.selectionList[0].roleId.split(",");
        } else {
          this.$message.warning("请选择一条用户数据信息");
          return;
        }
        getRoleList().then(res => {
          this.roles = res.data.data;
          this.checkedRoles=this.selectionList[0].roleId.split(",");
          this.roleBox = true;
          this.menuonLoad();
        });

      },
      handleImport() {
        this.excelBox = true;
      },
      uploadAfter(res, done, loading, column) {
        this.excelBox = false;
        this.refreshChange();
        done();
      },
      handleExport() {
        this.$confirm("是否导出用户数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          const searchForm = this.$refs.crud.searchForm;
          window.open(`/api/blade-user/export-user?${this.website.tokenHeader}=${getToken()}&account=${searchForm.account}&realName=${searchForm.realName}`);
        });
      },
      handleTemplate() {
        window.open(`/api/blade-user/export-template?${this.website.tokenHeader}=${getToken()}`);
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getUser(this.form.id).then(res => {
            this.form = res.data.data;
            if(this.form.hasOwnProperty("deptId")){
              this.form.deptId = this.form.deptId.split(",");
            }
            if(this.form.hasOwnProperty("roleId")){
              this.form.roleId = this.form.roleId.split(",");
            }
            if(this.form.hasOwnProperty("postId")){
              this.form.postId = this.form.postId.split(",");
            }
          });
        }
        this.initFlag = true;
        done();
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
        let table = document.getElementsByClassName('el-table--scrollable-y')[0]
        let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
        table.scrollTop = 0
        // tableBody.scrollTop = 0
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        if(this.parentId == "0"){
         this.treeDeptId = "";
        }
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query), this.treeDeptId).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            const data = res.data.data;
            this.page.total = data.total;
            this.data = data.records;
            this.loading = false;
            this.selectionClear();
          }
        });
      },
      //修改选择的角色列表
      handleCheckedCitiesChange(value) {
        const user = this.selectionList[0];
        user.roleId = this.checkedRoles.join(",");
        update(user).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            this.menuparentId = 0;
            this.menuonLoad();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        }, error => {
          window.console.log(error);
        });
      },
      menuonLoad() {
        // console.log(this.selectionList[0].roleId);
        getMenuByRole(this.selectionList[0].roleId,this.menuparentId).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            this.menudata = res.data.data;
          }
        });
      },
      //树形数据加载
      treeLoad(tree, treeNode, resolve) {
        const menuparentId = tree.id;
        getMenuByRole(this.selectionList[0].roleId,menuparentId).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            resolve(res.data.data);
          }
        });
      }
    }
  };
</script>

<style scoped="scoped" lang="scss">

  /deep/ .avue-crud__right {
    display: none;
  }

  .box {
    height: 800px;
  }

  .el-scrollbar {
    height: 100%;
  }

  .box .el-scrollbar__wrap {
    overflow: scroll;
  }



</style>
