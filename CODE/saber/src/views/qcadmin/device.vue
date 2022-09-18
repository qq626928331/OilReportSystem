<template>
  <el-row>
    <el-col :span="5">
      <el-scrollbar>
        <basic-container>
          <el-tree
            :data="treeData" class="filter-tree" :props="defaultProps"
            node-key="id" default-expand-all ref="tree" @node-click="nodeClick"
            :current-node-key="currentkey"  highlight-current
            :style="treeStyle">
          </el-tree>
        </basic-container>
      </el-scrollbar>
    </el-col>
    <el-col :span="19">
      <basic-container>
        <avue-crud :option="option"
                   :table-loading="loading"
                   :data="data"
                   :page.sync="page"
                   :permission="permissionList"
                   :before-open="beforeOpen"
                   v-model="form"
                   @header-dragend="headerDragend"
                   ref="crud"
                   @row-update="rowUpdate"
                   @row-save="rowSave"
                   @row-del="rowDel"
                   @search-change="searchChange"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @refresh-change="refreshChange"
                   :style="tableheight"
                   >
          <template slot="menuLeft">
            <el-button type="danger"
                       size="small"
                       icon="el-icon-delete"
                       plain
                       v-if="false"
                       @click="handleDelete">删 除
            </el-button>
          </template>
        </avue-crud>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>
  import {getDeptTree, getDeptLazyTree} from "@/api/system/dept";
  import {getList, getDetail, add, update, remove} from "@/api/qcadmin/device";
  import {mapGetters} from "vuex";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qcadmin/device',
    data() {
      return {
        tableheight: "",//表格高度
        treeStyle:"",//树高的样式
        form: {},//绑定表单
        query: {},//查询数据存放
        loading: true,//加载状态
        page: {//分页
          pageSize: 20,
          currentPage: 1,
          total: 0,
          pageSizes: [ 20, 30, 50, 100 ],
        },
        selectionList: [],//选择数据存放
        treeDeptId: '',//组织机构树节点id
        treeData: [],//组织结构树数据
        option: {//表格数据绑定
          height: 'auto',
          calcHeight: 73,
          tip: false,
          align:'center',
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          indexLabel:'序号',
          selection: false,
          viewBtn: true,
          menu:false,
          header:false,
          dialogClickModal: false,
          searchBtnText:"查询",
          column: [
            {
              label: "装置全称",
              prop: "devicename",
              overHidden: true,
              search: true,
              rules: [{
                required: true,
                message: "请输入装置名称",
                trigger: "blur"
              }]
            },
            {
              label: "装置编码",
              prop: "devicecode",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入装置编码",
                trigger: "blur"
              }]
            },
            {
              label: "简称",
              prop: "deviceshortname",
              width: 120,
              overHidden: true,
              hide: true,
              rules: [{
                required: true,
                message: "请输入简称",
                trigger: "blur"
              }]
            },
            {
              label: "产能(吨)",
              prop: "capacity",
              width: 80,
              hide: true,
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入产能",
                trigger: "blur"
              }]
            },
            {
              label: "投产日期",
              prop: "productiontime",
              width: 130,
              hide: true,
              type: "datetime",
              format: "yyyy-MM-dd",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入投产日期",
                trigger: "blur"
              }],
            },
            {
              label: "是否有效",
              prop: "isDeleted",
              type: "select",
              overHidden: true,
              hide: true,
              width: 70,
              dicData: [
                {
                  label: "无效",
                  value: 1
                },
                {
                  label: "有效",
                  value: 0
                }
              ],
              rules: [{
                required: true,
                message: "请输入是否有效",
                trigger: "blur"
              }],
            },
            {
              label: "更新时间",
              prop: "updateTime",
              type: "datetime",
              hide: true,
              format: "yyyy-MM-dd HH:mm:ss",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }],
              width:130
            },
            {
              label: "备注",
              prop: "describeinfo",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入描述",
                trigger: "blur"
              }]
            },
          ]
        },
        data: [],//表格数据存放
        defaultProps: {//组织机构数默认绑定
          children: 'children',
          label: 'title',
        },
        currentkey:'',//组织机构数当前节点key值
      };
    },
    beforeMount() {//页面加载前
      this.setClientHight()
      window.addEventListener('resize', () => this.setClientHight(), false)
    },
    mounted(){
      let that=this;
      that.$nextTick().then(() =>{//初次加载页面
        that.init();
      })
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(false),
          viewBtn: this.vaildData(this.permission.device_view, false),
          delBtn: this.vaildData(this.permission.device_delete, false),
          editBtn: this.vaildData(this.permission.device_edit, false)
        };
      },
      ids() {//id拼装
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
        this.treeStyle = "height:"+ (window.innerHeight - 140) + "px;overflow:auto;";
        this.tableheight = "height:"+ (window.innerHeight - 140) + "px;overflow:auto;";
      },
      headerDragend(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      //组织机构树点击（data：点击行数据）
      nodeClick(data) {
        this.treeDeptId = data.id;
        this.page.currentPage = 1;
        this.onLoad(this.page);
      },
      //初始加载组织机构默认选中
      init(){
        getDeptTree("000000").then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          var temp = []
          var forFn = function (arr) {
            if (arr && arr.length > 0) {
              if (arr[0].children) {
                forFn(arr[0].children)
              }else{
                temp.push(arr[0])
              }
            }
          }
          forFn(res.data.data);
          this.currentkey=temp[0].value;
          this.treeData=res.data.data;
          this.$nextTick(function () {
            this.$refs.tree.setCurrentKey(this.currentkey);
          })
          this.nodeClick(temp[0]);
        });
      },
      //行保存（row：行数据；done：结束参数；loading：加载参数）
      rowSave(row, done, loading) {
        add(row).then(res => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: res.data.msg
          });
          done();
        }, error => {
          loading();
          window.console.log(error);
        });
      },
      //行修改（row：行数据；index:索引；done：结束参数；loading：加载参数）
      rowUpdate(row, index, done, loading) {
        update(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          loading();
          console.log(error);
        });
      },
      //行删除（row：行数据）
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
      //选中删除
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
      //编辑、查看操作赋值（done：结束参数；type：类型）
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      //重置选择
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      //分页查询（params: 分页数据；done：结束参数）
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      //切换选择（list：选择数据）
      selectionChange(list) {
        this.selectionList = list;
      },
      //清空已选
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      //切换到当前页（currentPage：当前页）
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      //切换到最后一页（pageSize：页码）
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      //刷新页面
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      //初始加载装置（page：分页对象；params：分页数据对象）
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query),this.treeDeptId).then(res => {
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

