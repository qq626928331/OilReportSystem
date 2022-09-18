<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               :row-style="rowStyle"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @header-dragend="headerDragend"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad"
               :style="tableheight">
      <!--scope是当前行对象-->
      <template slot="menu" scope="scope">
        <el-button icon="el-icon-check" size="small" type="text" v-show="scope.row.serviceStatus!=='1'" @click="rowStart(scope)">开启</el-button>
        <el-button icon="el-icon-close" size="small" type="text" v-show="scope.row.serviceStatus==='1'" @click="rowStop(scope)">关闭</el-button>
      </template>

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
  import {getList, getDetail, add, update, remove,taskStart,taskStop} from "@/api/qcadmin/serviceregister";
  import {mapGetters} from "vuex";
  import datascope from "../authority/datascope";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qcadmin/serviceregister',
    data() {
      return {
        tableheight: "",//表格高度
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 20,
          currentPage: 1,
          total: 0,
          pageSizes: [ 20, 30, 50, 100 ],
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
          indexLabel: '序号',
          viewBtn: false,
          selection: false,
          dialogClickModal: false,
          searchBtnText:"查询",
          menuWidth:240,
          column: [
          /*  {
              label: "主键",
              prop: "serviceId",
              rules: [{
                required: true,
                message: "请输入主键",
                trigger: "blur"
              }]
            },*/
            {
              label: "任务名称",
              prop: "serviceName",
              overHidden: true,
              search:true,
              width: 220,
              rules: [{
                required: true,
                message: "请输入任务名称",
                trigger: "blur"
              }]
            },
            {
              label: "任务实体",
              prop: "intername",
              overHidden: true,
              width: 190,
              rules: [{
                required: true,
                message: "请输入RequestMapping",
                trigger: "blur"
              }]
            },
            {
              label: "方法名",
              prop: "methodname",
              overHidden: true,
              width: 190,
              rules: [{
                required: true,
                message: "请输入Mapping",
                trigger: "blur"
              }]
            },
            {
              label: "任务定时类型",
              prop: "tasktype",
              overHidden: true,
              type: "select",
              width:120,
              dicData: [
                {
                  label: "时间表达式",
                  value: '1'
                },
                {
                  label: "时间间隔(分钟)",
                  value: '2'
                }
              ],
              rules: [{
                required: true,
                message: "请输入任务定时类型：1：时间表达式，2： 定时分钟",
                trigger: "blur"
              }]
            },
            {
              label: "时间表达式",
              prop: "rate",
              overHidden: true,
              width:100,
              rules: [{
                required: true,
                message: "请输入时间表达式",
                trigger: "blur"
              }]
            },
            {
              label: "时间间隔",
              prop: "serviceInterval",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入时间间隔（分钟）",
                trigger: "blur"
              }]
            },

            {
              label: "运行状态",
              prop: "serviceStatus",
              overHidden: true,
              type: "select",
              disabled: true,
              dicData: [
                {
                  label: "已停止",
                  value: '0'
                },
                {
                  label: "运行中",
                  value: '1'
                }
              ],
              rules: [{
                message: "请输入任务执行状态(0:开启，1：关闭，2：待开启，3：待关闭)",
                trigger: "blur"
              }]
            },
            {
              label: "执行时间",
              prop: "datetime",
              overHidden: true,
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              width:150,
              rules: [{
                required: true,
                message: "执行时间(last)",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "note",
              overHidden: true,
              hide: true,
              rules: [{
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
          /*  {
              label: "是否有效",
              prop: "isvalid",
              rules: [{
                required: true,
                message: "请输入是否有效",
                trigger: "blur"
              }]
            },*/
          ]
        },
        data: []
      };
    },
    mounted() {
      this.setClientHight()
      window.addEventListener('resize', () => this.setClientHight(), false)
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.serviceregister_add, false),
          viewBtn: this.vaildData(this.permission.serviceregister_view, false),
          delBtn: this.vaildData(this.permission.serviceregister_delete, false),
          editBtn: this.vaildData(this.permission.serviceregister_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          console.warn("-------"+JSON.stringify(ele))
          ids.push(ele.serviceId);
        });
        return ids.join(",");
      }
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        this.tableheight = "height:"+ (window.innerHeight - 140) + "px;overflow:auto;";
      },
      headerDragend(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      rowStyle(column){
        if(column.row.serviceStatus === '1'){
          this.option.editBtn=false;
          this.option.delBtn=false;
        }else {
          this.option.editBtn=true;
          this.option.delBtn=true;
        }
      },
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
      rowDel(row) {

        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return remove(row.serviceId).then(res => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: res.data.msg
            });
          });
        })
      },
      rowStart(scope) {
        this.$confirm("确定将该任务启动?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return taskStart(scope.row).then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: res.data.msg
            });
          });
        })
      },
      rowStop(scope) {
        this.$confirm("确定将该任务关闭?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          return taskStop(scope.row).then(res => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: res.data.msg
            });
          });
        })
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
          return remove(this.ids).then(res => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.$refs.crud.toggleSelection();
          });
        })
      },
      beforeOpen(done, type) {
        console.warn("beforeOpen-----------")
        console.warn("beforeOpen-----------"+JSON.stringify(this.form))

        if (["edit", "view"].includes(type)) {
          // 每次调用每行里的操作按钮时会触发这个方法，getDetail中的form。id是null，所以后台getOne报错。
          // getDetai的作用未知，但done（）有明确的作用，它绘制了操作按钮的弹窗
          //现在发现原因是这个不是id,是serviceId
          getDetail(this.form.serviceId).then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.form = res.data.data;
          });
        }
        done();
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
      currentChange(currentPage){
        this.page.currentPage = currentPage;
        let table = document.getElementsByClassName('el-table--scrollable-y')[0]
        let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
        if(table && tableBody){
          table.scrollTop = 0
          tableBody.scrollTop = 0
        }
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
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

<style scoped="scoped" lang="scss">

/deep/ .avue-crud__right {
  display: none;
}

</style>
