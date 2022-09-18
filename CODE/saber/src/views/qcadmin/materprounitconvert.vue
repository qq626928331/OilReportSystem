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
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad"
               @header-dragend="headerDragend"
               :style="tableheight">
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
  import {getList, getDetail, add, update, remove} from "@/api/qcadmin/materprounitconvert";
  import {mapGetters} from "vuex";
  import {getDataList} from "../../api/qcadmin/materprounitconvert";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qcadmin/materprounitconvert',
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
          align:'center',
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          indexLabel:'序号',
          viewBtn: true,
          menu:false,
          header:false,
          selection: false,
          dialogClickModal: false,
          searchBtnText:"查询",
          column: [
            {
              label: "目标单位(x)",
              prop: "convertUnit",
              overHidden: true,
              search: true,
              searchLabelWidth:90,
              width: 160,
              rules: [{
                message: "请输入单位1名称",
                trigger: "blur"
              }]
            },

            {
              label: "标准单位(y)",
              prop: "baseUnit",
              overHidden: true,
              width: 160,
              rules: [{
                required: true,
                message: "请输入单位2名称",
                trigger: "blur"
              }]
            },
            {
              label: "正向公式",
              prop: "forwardEquation",
              overHidden: true,
              width: 240,
              rules: [{
                required: true,
                message: "请输入正向公式",
                trigger: "blur"
              }]
            },
            // {
            //   label: "反向公式",
            //   prop: "inverseFormula",
            //   overHidden: true,
            //   // width: 200,
            //   rules: [{
            //     required: true,
            //     message: "请输入反向公式",
            //     trigger: "blur"
            //   }]
            // },
            {
              label: "说明",//(由转换单位乘以该转换公式到标准单位)
              prop: "equationRemark",
              overHidden: true,
              // width: 200,
              rules: [{
                required: true,
                message: "请输入转换公式",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "updateTime",
              overHidden: true,
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              // width: 200,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
           {
              label: "更新人",
              prop: "updateUser",
              overHidden: true,
              hide: true,
              rules: [{
                required: true,
                message: "请输入更新人",
                trigger: "blur"
              }]
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: false,
          viewBtn: this.vaildData(this.permission.materprounitconvert_view, false),
          delBtn: this.vaildData(this.permission.materprounitconvert_delete, false),
          editBtn: this.vaildData(this.permission.materprounitconvert_edit, false)
        };
      },
      ids() {//拼装id
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
        if (nw < 70) {
          col.width = 60;
        }
      },
      //行保存
      rowSave(row, done, loading) {
        add(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          done();
        }, error => {
          loading();
          window.console.log(error);
        });
      },
      //行修改
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
      //行删除
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
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
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
        let table = document.getElementsByClassName('el-table--scrollable-y')[0]
        let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
        if(table && tableBody){
          table.scrollTop = 0
          tableBody.scrollTop = 0
        }
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
        // getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        //   const data = res.data.data;
        //   this.page.total = data.total;
        //   this.data = data.records;
        //   console.log(this.data);
        //   this.loading = false;
        //   this.selectionClear();
        // });


        getDataList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            const data = res.data.data;
            this.page.total = data.total;
            this.data = data.records;
            console.log(this.data);
            this.loading = false;
            this.selectionClear();
          }
        });
      }
    }
  };
</script>

