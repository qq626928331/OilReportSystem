<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @header-dragend="headerDragend"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad"
               :style="tableheight">

<!--      <template slot-scope="scope" slot="menu">-->
<!--        <el-popover-->
<!--          ref="popover4"-->
<!--          placement="left"-->
<!--          width="200"-->
<!--          trigger="click">-->
<!--          <el-table :data="gridData"  size="small">-->
<!--            <el-table-column property="matterproCode" label="物性编码" align=“center”></el-table-column>-->
<!--            <el-table-column property="matterproUnit" label="单位" align=“center”></el-table-column>-->
<!--          </el-table>-->
<!--          <el-button @click="getGridData(scope.row)" slot="reference" type="text" icon="el-icon-view" style="height:14px; padding: 0 0">查看</el-button>-->
<!--        </el-popover>-->


<!--      </template>-->

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
</template>

<script>
  import {getList, getDetail, add, update, remove, getGridData} from "@/api/qcadmin/matterpro";
  import {mapGetters} from "vuex";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qcadmin/matterpro',
    data() {
      return {
        tableheight: "",//表格高度
        gridData:[],
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 50,
          currentPage: 1,
          total: 0,
          pageSizes: [ 50, 100,150,200],
        },
        selectionList: [],
        option: {
          height:'auto',
          calcHeight: 23,
          tip: false,
          align:'center',
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          indexLabel:'序号',
          indexWidth:60,
          viewBtn: false,
          menu:false,
          header:false,
          menuWidth:100,
          selection: false,
          dialogClickModal: false,
          searchBtnText:"查询",
          column: [
            {
              minWidth: 100,
              label: "物性名称",
              prop: "matterproName",
              overHidden: true,
              search: true,
              rules: [{
                required: true,
                message: "请输入物性名称",
                trigger: "blur"
              }]
            },
            {
              minWidth: 100,
              label: "物性编码",
              prop: "matterproCode",
              overHidden: true,
              search: true,
              rules: [{
                required: true,
                message: "请输入物性编码",
                trigger: "blur"
              }]
            },

            {
              minWidth: 100,
              label: "精度",
              prop: "jd",
              overHidden: true,
              width: 80,
              rules: [{
                required: true,
                message: "请输入精度",
                trigger: "blur"
              }]
            },
            {
              minWidth: 110,
              label: "物性单位",
              prop: "matterproUnit",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入物性单位",
                trigger: "blur"
              }]
            }            ,
            {
              width: 100,
              label: "最小值",
              prop: "matterproMin",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入最小值",
                trigger: "blur"
              }]
            },

            {
              width: 100,
              label: "最大值",
              prop: "matterproMax",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入最大值",
                trigger: "blur"
              }]
            },
            {
              minWidth: 110,
              label: "切割初馏点",
              prop: "isEfficiencyIvt",
              overHidden: true,
              hide:false,
              rules: [{
                required: true,
                message: "请输入有效IBP",
                trigger: "blur"
              }]
            },
            {
              minWidth: 110,
              label: "切割终馏点",
              prop: "isEfficiencyFvt",
              overHidden: true,
              hide:false,
              rules: [{
                required: true,
                message: "请输入有效FBP",
                trigger: "blur"
              }]
            },
            {
              label: "排序",
              prop: "xh",
              overHidden: true,
              // width: 80,
              hide:false,
              rules: [{
                required: true,
                message: "请输入排序",
                trigger: "blur"
              }]
            },
            {
              label: "是否有效",
              prop: "isDeleted",
              overHidden: true,
              hide:true,
              type: "select",
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
                message: "请输入删除标记",
                trigger: "blur"
              }]
            },

            /*{
              label: "更新时间",
              prop: "updateTime",
              type: "datetime",
              format: "yyyy-MM-dd hh:mm:ss",
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },*/
        /*    {
              label: "更新人",
              prop: "updateUser",
              rules: [{
                required: true,
                message: "请输入更新人",
                trigger: "blur"
              }]
            },*/
          ],
        },
        data: [],
        gridData1: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: false,
          viewBtn: this.vaildData(this.permission.matterpro_view, false),
          delBtn: false,
          editBtn: false
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
        this.tableheight = "height:"+ (window.innerHeight - 140) + "px;overflow:auto;";
      },
      headerDragend(nw,ow,col,evt){
        this.$nextTick(() => {
          this.$refs.crud.doLayout();
        });
        if (nw < 70) {
          col.width = 60;
        }
      },
      //根据物性编码  获取物性拥有的单位
      //row 物性行数据， index 索引

      getGridData(row){
        if(this.gridData.length > 1){
          this.gridData = [];
        }
        getGridData(row.matterproCode).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            this.gridData=res.data.data;
          }
        });
      },
      //行保存
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
      //行修改
      rowUpdate(row, index, done, loading) {
        update(row).then(res => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: res.data.msg
          });
          done();
        }, error => {
          loading();
          console.log(error);
        });
      },
      //行删除
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
            } else {
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: res.data.msg
              });
            }
          });
        })
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
        }).then(() => {
          return remove(this.ids).then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            } else {
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.$refs.crud.toggleSelection();
            }
          });
        })
      },
      //编辑、查看操作赋值（done：结束参数；type：类型）
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            } else {
              this.form = res.data.data;
            }
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
        // this.$refs.crud.bodyWrapper.scrollTop = 0;.
        let table = document.getElementsByClassName('el-table--scrollable-y')[0]
        let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
        table.scrollTop = 0
        tableBody.scrollTop = 0

      },
      //切换到最后一页（pageSize：页码）
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      //刷新页面
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      //初始加载（page：分页对象；params：分页数据对象）
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
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
      }
    }
  };
</script>
