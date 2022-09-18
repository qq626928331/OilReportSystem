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
               @header-dragend="headerDragend"
               @row-del="rowDel"
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
                   plain
                   v-if="false"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/qcadmin/equipment";
  import {mapGetters} from "vuex";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qcadmin/equipment',
    data() {
      return {
        tableheight: "",//表格高度
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
        option: {//表格数据绑定
          height:'auto',
          calcHeight: 23,
          tip: false,
          align:'center',
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
              label: "MQ设备ID",
              prop: "eqmqId",
               hide: true,
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入设备ID",
                trigger: "blur"
              }]
            },
            {
              label: "设备类别",
              prop: "eqCategory",
              width: 150,
              overHidden: true,
              type: "select",
              dicData: [
                {
                  label: "NMR",
                  value: 0
                },
                {
                  label: "RAMAN",
                  value: 1
                }
              ],
              rules: [{
                required: true,
                message: "设备类别  0  NMR  1 RAMAN",
                trigger: "blur"
              }]
            },
            {
              label: "设备名称",
              prop: "eqName",
              width: 250,
              overHidden: true,
              search: true,
              rules: [{
                required: true,
                message: "请输入设备名称",
                trigger: "blur"
              }]
            },
            {
              label: "组织机构",
              prop: "dept_name",
               hide: true,
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入所属组织机构",
                trigger: "blur"
              }]
            },
            {
              label: "设备类型",
              overHidden: true,
              width: 150,
              prop: "eqType",
              type: "select",
              dicData: [
                {
                  label: "离线",
                  value: '0'
                },
                {
                  label: "在线",
                  value: '1'
                }
              ],
              rules: [{
                required: true,
                message: "请输入设备类型  0 离线  1 在线",
                trigger: "blur"
              }]
            },
            {
              label: "设备出厂编码",
              prop: "eqFactoryCode",
              overHidden: true,
              width: 250,
              rules: [{
                required: true,
                message: "请输入设备出场编码",
                trigger: "blur"
              }]
            },
            {
              label: "设备编号",
              prop: "eqCode",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入设备编号",
                trigger: "blur"
              }]
            },
            {
              label: "设备型号",
              prop: "eqModel",
              overHidden: true,
              hide: true,
              rules: [{
                required: true,
                message: "请输入设备型号",
                trigger: "blur"
              }]
            },
           {
              label: "排序",
              prop: "eqOrder",
               hide: true,
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入排序",
                trigger: "blur"
              }]
            },
            {
              label: "是否有效",
              prop: "isDeleted",
              type: "select",
              overHidden: true,
               hide: true,
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
                message: "请输入是否有效  1无效  0有效",
                trigger: "blur"
              }]
            },
            {
              label: "设备IP",
              prop: "eqIp",
               hide: true,
               overHidden: true,
              rules: [{
                required: true,
                message: "请输入设备IP",
                trigger: "blur"
              }]
            },
            {
              label: "设备端口号",
              prop: "eqPort",
              overHidden: true,
               hide: true,
              rules: [{
                required: true,
                message: "请输入设备端口号",
                trigger: "blur"
              }]
            },
            {
              label: "秘钥",
              prop: "secretkey",
               hide: true,
              rules: [{
                required: true,
                message: "请输入秘钥",
                trigger: "blur"
              }]
            },
            {
              label: "秘钥有效期",
              prop: "secretkeyTime",
               hide: true,
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              rules: [{
                required: true,
                message: "请输入秘钥有效期",
                trigger: "blur"
              }]
            },
            {
              label: "下位机锁频IP",
              prop: "prcFrequencylockIp",
               hide: true,
              rules: [{
                required: true,
                message: "请输入下位机锁频IP",
                trigger: "blur"
              }]
            },
            {
              label: "下位机锁频端口号",
              prop: "prcFrequencylockPort",
               hide: true,
              rules: [{
                required: true,
                message: "请输入下位机锁频端口号",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "note",
              overHidden: true,
              rules: [{
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }]
            }
           /* {
              label: "更新人",
              prop: "updateUser",
              rules: [{
                required: true,
                message: "请输入更新人",
                trigger: "blur"
              }]
            },
            {
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
          addBtn: false,
          viewBtn: this.vaildData(this.permission.equipment_view, false),
          delBtn: this.vaildData(this.permission.equipment_delete, false),
          editBtn: this.vaildData(this.permission.equipment_edit, false)
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
        this.tableheight = "height:"+ (window.innerHeight - 140) + "px;overflow:auto;";
      },
      headerDragend(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      //行保存（row：行数据；done：结束参数；loading：加载参数）
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
      //选择数据删除
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
      //初始加载装置（page：分页对象；params：分页数据对象）
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          if (res.data.code != 200) {
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
