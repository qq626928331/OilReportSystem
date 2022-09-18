<template>
  <el-row>
    <el-col span="5">
      <el-scrollbar>
        <basic-container style="padding-right: 0px; padding-left: 0px">
          <el-tree
            :data="treeData"
            class="filter-tree"
            :props="defaultProps"
            node-key="id"
            accordion
            ref="tree"
            @node-click="nodeClick"
            :current-node-key="currentkey" :default-expanded-keys="expandedKey"
            highlight-current
            :style="treeStyle"
          >
          </el-tree>
        </basic-container>
      </el-scrollbar>
    </el-col>
    <el-col span="19">
      <basic-container>
        <avue-crud
          class="sampleTable"
          :option="option"
          :table-loading="loading"
          :data="data"
          :page="page"
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
                       v-if="permission.sample_delete"
                       @click="handleDelete">删 除
            </el-button>
          </template>

          <template slot="isDeleted" slot-scope="scope">
            <span v-if="scope.row.isDeleted==0">是</span>
            <span v-else>否</span>
          </template>

        </avue-crud>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>
import {getList, getDetail, add, update, remove} from "@/api/qcadmin/sample";
import {getDeptTreeDevice} from "@/api/system/dept";
import {mapGetters} from "vuex";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: '/qcadmin/sample',
  data() {
    return {
      device_id: "",
      tableheight: "",//表格高度
      treeData: [], //组织机构树数据
      currentkey: "", //组织机构数当前节点key值
      expandedKey: "", //默认展开key值
      treeDeptId: "", //组织机构树id
      devicename: "", //装置名称
      defaultProps: {
        //组织机构数默认绑定
        children: "children",
        label: "title",
      },

      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [20, 30, 50, 100],
      },
      selectionList: [],
      option: {
        height: 'auto',
        maxHeight: 794,
        calcHeight: 73,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        indexLabel: '序号',
        viewBtn: true,
        align: "center",
        menu: false,
        header: false,
        selection: false,
        dialogClickModal: false,
        searchBtnText: "查询",
        column: [
          {
            label: "采用地点ID",
            prop: "sampleId",
            overHidden: true,
            hide: true,
            rules: [{
              required: true,
              message: "请输入采用地点ID",
              trigger: "blur"
            }]
          },
          {
            label: "装置ID",
            prop: "deviceId",
            overHidden: true,
            hide: true,
            rules: [{
              required: true,
              message: "请输入装置ID",
              trigger: "blur"
            }]
          },
          {
            label: "采样点名称",
            prop: "sampleName",
            overHidden: true,
            width: 120,
            rules: [{
              required: true,
              message: "请输入采样点名称",
              trigger: "blur"
            }]
          },
          {
            label: "采样点编号",
            prop: "sampleCode",
            overHidden: true,
            width: 120,
            rules: [{
              required: true,
              message: "请输入采样点编码",
              trigger: "blur"
            }]
          },
          {
            label: "采样点简称",
            prop: "sampleSimpleName",
            overHidden: true,
            width: 150,
            rules: [{
              required: true,
              message: "请输入采样点简称",
              trigger: "blur"
            }]
          },
          // {
          //   label: "排序",
          //   prop: "sampleOrder",
          //   overHidden: true,
          //   hide: false,
          //   width: 100,
          //   rules: [{
          //     required: true,
          //     message: "请输入排序",
          //     trigger: "blur"
          //   }]
          // },
          {
            label: "是否有效",
            slot: true,
            prop: "isDeleted",
            overHidden: true,
            width: 100,
            hide: false,
            rules: [{
              required: true,
              message: "请输入是否有效  0为有效  1为无效",
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
          },
          {
            label: "更新时间",
            prop: "updateTime",
            overHidden: true,
            // width: 130,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
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
          {
            label: "lims采样点对应ID",
            prop: "limsSampleId",
            overHidden: true,
            hide: true,
            rules: [{
              required: true,
              message: "请输入lims采样点对应ID",
              trigger: "blur"
            }]
          },
          {
            label: "lims采样点对应名称",
            prop: "limsSampleName",
            overHidden: true,
            hide: true,
            rules: [{
              required: true,
              message: "请输入lims采样点对应名称",
              trigger: "blur"
            }]
          },
          {
            label: "mes采样点对应ID",
            prop: "mesSampleId",
            overHidden: true,
            hide: true,
            rules: [{
              required: true,
              message: "请输入mes采样点对应ID",
              trigger: "blur"
            }]
          },
          {
            label: "mes采样点对应名称",
            prop: "mesSampleName",
            overHidden: true,
            hide: true,
            rules: [{
              required: true,
              message: "请输入mes采样点对应名称",
              trigger: "blur"
            }]
          },
        ]
      },
      data: [],
      treeStyle:''
    };
  },
  mounted() {
    this.init();
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: false,
        viewBtn: this.vaildData(this.permission.sample_view, false),
        delBtn: this.vaildData(this.permission.sample_delete, false),
        editBtn: this.vaildData(this.permission.sample_edit, false)
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
      this.treeStyle = "height:" + (window.innerHeight - 140) + "px;overflow:auto;";
      this.rightStyle = "height:" + (window.innerHeight - 121) + "px;";
      this.tableheight = "height:" + (window.innerHeight - 140) + "px;overflow:auto;";
    },
    headerDragend(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    //组织机构树点击（data：点击行数据）
    nodeClick(data) {
      if (data.islevel == 2) {
        this.device_id = data.id.split('DEVI_')[1];
        this.data = [];
        this.treeDeptId = data.id;
        this.devicename = data.title;
        this.onLoad(this.page);
      }
    },
    //初始加载组织机构默认选中
    init() {
      getDeptTreeDevice().then((res) => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        var temp = [];
        var forFn = function (arr) {
          if (arr && arr.length > 0) {
            if (arr[0].children) {
              forFn(arr[0].children);
            } else {
              temp.push(arr[0]);
            }
          }
        };
        forFn(res.data.data);
        this.currentkey = temp[0].value;
        this.treeData = res.data.data;
        this.expandedKey = [res.data.data[0].id, res.data.data[0].children[0].id]
        this.$nextTick(function () {
          this.$refs.tree.setCurrentKey(this.currentkey);
        });
        this.nodeClick(temp[0]);
      });
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
        return remove(row.id).then(res => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: res.data.msg
          });
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
      }).then(() => {
        return remove(this.ids).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.$refs.crud.toggleSelection();
        });
      })
    },
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
      this.$set(params, 'deviceId', this.device_id);
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

<style lang="scss" scoped>
//.el-table__fixed-body-wrapper {
//  top: 0px !important;
//}
 .sampleTable .el-table__fixed-body-wrapper {
  top: 35px !important;
}
</style>
