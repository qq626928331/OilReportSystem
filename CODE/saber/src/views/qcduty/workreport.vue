<template>
  <div :style=styleObj>
    <el-row>
      <el-col :span="5" id="treeheight">
        <el-scrollbar>
          <basic-container>
            <el-tree
              :data="treeData" class="filter-tree" :props="defaultProps"
              node-key="id" accordion ref="tree" @node-click="nodeClick"
              :current-node-key="currentkey" highlight-current :default-expanded-keys="expandedKey"
              :style="treeStyle">
            </el-tree>
          </basic-container>
        </el-scrollbar>
      </el-col>
      <el-col :span="19">
        <basic-container style='height: 63%' id="workHeight">
          <avue-crud class="searchLeft" :header-row-style="{height:'20px'}"
                     :option="option"
                     :table-loading="loading"
                     :data="data"
                     :page.sync="page"
                     :permission="permissionList"
                     :cell-class-name="addClass"
                     v-model="form"
                     ref="crud"
                     @cell-click="pageto"
                     @row-click="handleSelectmatterpro"
                     @search-change="searchChange"
                     @search-reset="searchReset"
                     @selection-change="selectionChange"
                     @current-change="currentChange"
                     @size-change="sizeChange"
                     @header-dragend="changeColWidth"
                     @refresh-change="refreshChange"
                     @on-load="onLoad"
                     :style="tableheight"
          >
            <template slot="searchMenu">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-close"
                style="margin-left: 15px"
                plain
                @click="handleCancel"
              >删除
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-download"
                style="margin-left: 15px"
                @click="handleexport"
              >导出
              </el-button>
              <el-button
                v-show="!disabled"
                type="primary"
                size="small"
                style="margin-left: 15px"
                @click="handleStandard">
                <img src="/icon/btn_qiegejieguo.png" style="width: 10px;height:10px; margin-right:6px;"/>
                切割结果
              </el-button>
            </template>
          </avue-crud>
        </basic-container>
        <basic-container style="padding-top: 0px;padding-right: 6px;padding-bottom: 10px;padding-left: 6px;height: 36%">
          <el-table :data="data1" size="small" :header-row-style="{height:'20px'}"
                    border :header-cell-style="{'text-align':'center'}" class="tb-edit" @header-dragend="changeColWidth"
                    :cell-style="{'text-align':'center'}" width="100%" :height="bHeight">
            <el-table-column type="index" label="序号" header-align="center" show-overflow-tooltip width="50"></el-table-column>
            <el-table-column prop="matterproName" label="物性名称" width="200" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="matterproCode" label="物性编码" width="120" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="matterproUnit" label="物性单位" width="120" show-overflow-tooltip sortable></el-table-column>
            <el-table-column prop="matterproValue" label="分析值" width="150" show-overflow-tooltip sortable></el-table-column>
            <!--            <el-table-column prop="modelMin" label="最小值" sortable></el-table-column>-->
            <!--            <el-table-column prop="modelMax" label="最大值" sortable></el-table-column>-->
            <!--            <el-table-column prop="mahalanobisDistance" label="马氏距离" sortable></el-table-column>-->
            <el-table-column label="">

            </el-table-column>
          </el-table>
        </basic-container>
      </el-col>
    </el-row>
    <!--动态表头dialog-->
    <el-dialog
      title="切割结果"
      :visible.sync="testloading"
      :before-close="TesthandleClose"
      :append-to-body="true">
      <!--label随意-->
      <!--prop的值决定如何匹配-->
      <!--testheader 表头数据item中方 label为显示的文字，希望展示哪个属性，就让prop与testbody中元素的哪个属性的key一致-->
      <!--testbody 表体数据 元素的属性的key与表头的prop字符串一致时就会展示元素的属性的value-->
      <div id="cutResultId">
        <el-table class="el-table"
                  :data="testbody"
                  max-height="450"
                  height="382px"
                  size="small"
                  border v-loading="lightloading"
                  element-loading-text="加载中..."
        >
          <template slot="empty">
            <p>{{ dataText }}</p>
          </template>
          <el-table-column
            v-for="(item,index) in testheader"
            :fixed="index==0||index==1"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 审批节点 -->
    <el-dialog
      title="审核详情"
      :visible.sync="approveDialog"
      :before-close="approvehandleClose"
      :append-to-body="true"
      width="30%">
      <basic-container>
        <div class="block" style="overflow: auto;height: 400px;">
          <el-timeline style="margin-left:5%;">
            <el-timeline-item
              v-for="(activity, index) in timelines"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size">
              <div class="timeline-name">
                <div style="float: right;margin-right: 10%;">{{ activity.approve_time }}</div>
                <div>审核人：{{ activity.real_name }}</div>
              </div>
              <div class="timeline-content">审核节点：{{ activity.dict_value }}</div>
              <div class="timeline-content">审核意见：{{ activity.note }}</div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </basic-container>
    </el-dialog>
  </div>

</template>

<script>
import {
  oilBaseDetail,
  getList,
} from "@/api/qcduty/workreport";
import {onLoadSelectmatterpro, approvalDetail, toVoid} from "@/api/qcduty/workorder";
import {getTreeDeviceMateriel} from "@/api/system/dept";
import {sendOutData} from "@/api/qcadmin/interfaceconfig";
import {mapGetters} from "vuex";
import {$getJson} from '../../router/getJson'
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: '/qcduty/workreport',
  data() {
    return {
      disabled: true,
      approveDialog: false,
      approvetableData: [],//审批详情数据
      approvetableDataheader: [],//审批详情表头
      tableheight: "",//表格高度
      bHeight: "202px",//表格高度
      dataSend: [],
      dataSendWkId: '',
      dataSendOilId: '',
      treeStyle: "",//树高的样式
      testloading: false,
      oilId: '',
      auditStatus: '',
      testheader: [],
      testbody: [],
      testdata: [],
      materielid: '',
      treeData: [],
      defaultProps: {//组织机构数默认绑定
        children: 'children',
        label: 'title',
      },
      currentkey: '',//组织机构数当前节点key值
      expandedKey: [],//首次进入默认展开的key值
      form: {},
      query: {},
      styleObj: {},
      loading: true,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      option: {
        indexLabel: '序号',
        height: "auto",
        calcHeight: "312",
        align: 'center',
        tip: false,
        menu: false,
        header: false,
        emptyBtn: false,
        searchShow: true,
        searchMenuSpan: 14,
        border: true,
        index: false,
        viewBtn: true,
        selection: true,
        dialogClickModal: false,
        highlightCurrentRow: true,
        searchBtnText: "查询",
        column: [
          {
            label: "工单编号",
            sortable: true,
            prop: "workorderOdd",
            overHidden: true,
            search: true,
            type: "input",
            minWidth: 100,
            rules: [
              {
                required: true,
                message: "请输入工单编号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "任务编号",
            sortable: true,
            overHidden: true,
            width: 170,
            hide: false,
            prop: "analysisNo",
            rules: [
              {
                required: true,
                message: "任务编号",
                trigger: "blur",
              },
            ],
          },
          {
            label: "工单类型",
            width: "110",
            sortable: true,
            prop: "wkType",
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入工单类型",
                trigger: "blur",
              },
            ],
          },
          {
            label: "装置",
            sortable: true,
            prop: "devicename",
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入装置",
                trigger: "blur",
              },
            ],
          },
          {
            label: "采样点",
            minWidth: 100,
            sortable: true,
            prop: "sampleName",
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入装置采样点",
                trigger: "blur",
              },
            ],
          },
          {
            label: "物料",
            sortable: true,
            prop: "materielName",
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入物料ID(接口)",
                trigger: "blur",
              },
            ],
          },
          {
            label: "采样时间",
            sortable: true,
            prop: "sampleTime",
            overHidden: true,
            format: "yyyy-MM-dd HH:mm",
            type: "datetime",
            minWidth: 100,
            rules: [
              {
                required: true,
                message: "请输入采样时间",
                trigger: "blur",
              },
            ],
          },
          {
            label: "审核状态",
            sortable: true,
            width: "100",
            prop: "auditStatus",
            overHidden: true,
            dicData: [
              {
                label: "作废",
                value: "-1",
              },
              {
                label: "审核结束(拟合中)",
                value: "88",
              },
              {
                label: "审核结束(切割中)",
                value: "90",
              },
              {
                label: "审核结束",
                value: "99",
              },
            ],
            rules: [
              {
                required: true,
                message: "请输入审核状态",
                trigger: "blur",
              },
            ],
          },
          {
            label: "分析品种",
            sortable: true,
            width: "100",
            prop: "materieltypeName",
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入分析品种",
                trigger: "blur",
              },
            ],
          },
          {
            label: "分析时间",
            sortable: true,
            prop: "analysisTime",
            overHidden: true,
            format: "yyyy-MM-dd HH:mm:ss",
            type: "datetime",
            minWidth: 100,
            rules: [
              {
                required: true,
                message: "请输入分析时间",
                trigger: "blur",
              },
            ],
          },
          {
            label: "分析设备",
            sortable: true,
            minWidth: 100,
            prop: "eqName",
            overHidden: true,
            rules: [
              {
                required: true,
                message: "请输入分析设备ID",
                trigger: "blur",
              },
            ],
          },

          {
            label: "设备类别",
            prop: "eqCategory",
            overHidden: true,
            hide: true,
            //search: true,
            type: "select",
            dicData: [
              {
                label: "NMR",
                value: "0"
              },
              {
                label: "ROMAN",
                value: "1"
              }
            ],
            rules: [{
              required: true,
              message: "设备类别  0  NMR  1 ROMAN",
              trigger: "blur"
            }]
          },
          {
            label: "创建人",
            prop: "createUser",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入创建人",
                trigger: "blur",
              },
            ],
          },
        ],
      },
      data: [],
      data1: [],
      exportid: '',//导出传递的id
      lightloading: true,
      dataText: '',
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(false),
        viewBtn: this.vaildData(this.permission.workorder_view, false),
        delBtn: this.vaildData(this.permission.workorder_delete, false),
        editBtn: this.vaildData(this.permission.workorder_edit, false),
      };
    },
  },
  beforeMount() {
    //页面加载前

  },
  mounted() {
    this.setClientHight()

    window.addEventListener('resize', () => this.setClientHight(), false)

    let that = this;
    that.$nextTick().then(() => {//初次加载页面
      that.init();
    })
    $getJson('/home.json').then(res => {
      // if (res.data.code != 200) {
      //   let that = this;
      //   errorMsgbox(that, res.data.msg);
      // }
      this.option.column[1].hide = res.data.isHidden
    })



    if (window.innerWidth != 1366) {
      var a = document.getElementsByClassName('el-form-item__content');
      a[1].setAttribute("style", "margin-left: -50px;width: 100%;");
    } else {
      var a = document.getElementsByClassName('el-form-item__content');
      a[2].setAttribute("style", "margin-left: 360px;margin-top: -40px;width: 100%;");
      var b = document.getElementsByClassName('el-form-item__label');
      b[1].setAttribute("style", "margin-left: -20px;");
      var c = document.getElementsByClassName('el-input__inner');
      c[3].setAttribute("style", "margin-left: -30px;");
    }

  },
  watch: {
    approvetableData(oldVal, newVal) {//快评工单数据变化相关的时间轴
      this.timelines = [];
      for (var i = 0; i < this.approvetableData.length; i++) {
        let time = {
          real_name: '',
          dict_value: '',
          approve_time: '',
          note: '',
          size: 'large',
          icon: '',
          color: ''
        };
        let one = this.approvetableData[i];
        time.color = '#409EFF';
        time.icon = 'el-icon-check';
        time.real_name = one.real_name;
        time.dict_value = one.dict_value;
        // let date1 = one.approve_time.substring(0,19);
        time.approve_time = one.approve_time;
        time.note = one.note;
        this.timelines.push(time);
      }
    }
  },
  methods: {
    setClientHight(){
      let that = this
     // setTimeout(()=>{
       that.treeStyle = "height:" + (window.innerHeight - 144) + "px;overflow:auto;";
       that.tableheight = "height:"+ (window.innerHeight - 144 - 280) + "px;overflow:auto;";
       that.tableheight = "height:"+ (window.innerHeight - 144 - 236) + "px;overflow:auto;";

       if(window.innerWidth != 1366) {
         that.tableheight = "height:"+ (window.innerHeight*0.7 - 144) + "px;";
         that.option.calcHeight = '361'
         that.styleObj.height = '100%'
         let treeheight = document.getElementById('treeheight')
         let workHeight = document.getElementById('workHeight')
         let tableheight = 252
         this.$nextTick(()=>{
           if(treeheight && workHeight){
             console.log(treeheight.offsetHeight,workHeight.offsetHeight)
             tableheight = treeheight.offsetHeight - workHeight.offsetHeight - 30
           }
           that.bHeight =  tableheight +  'px'
         })
       } else {
         that.styleObj = {}
         that.bHeight = '202px'
       }
     // },2000)
    },
    //拖拽控制最小宽度
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    //行点击事件，加载下方物性列表
    pageto(row, column, cell, event) {
      if (column.label == "审核状态") {
        approvalDetail(row.wkId).then(res => {
          console.log(res,'errorMsgbox')
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          if (res.data.code === 200){
            this.testdata = res.data.data;
            // 在这里将后台返回的列表头数er据直接放到之前定义好的header数组中
            this.approvetableDataheader = this.testdata[1];
            this.approvetableData = this.testdata[0];
            if (this.approvetableData.length === 0) {
              // this.$message.warning("该工单下暂无审批信息！");
              return;
            }
            this.approveDialog = true;
          }

        });
      }
    },
    //给列渲染样式
    addClass({row, column, rowIndex, columnIndex}) {
      if (column.label == "审核状态") {
        return 'cell-blue';
      }
    },
    //关闭详情弹窗
    approvehandleClose() {
      this.approveDialog = false;
    },
    //接口配置器输出数据推送
    dataSendBtn() {
      if (this.dataSend.length == 0) {
        this.$message.warning("请选择要推送的工单数据！");
        return;
      }
      sendOutData(this.dataSend).then((res) => {
        console.log(res,'sandihashifasabhifhaiufuh')
        if (res.data.code != 200) {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.$message.success("推送成功！");
      })
    },
    //复选框选中事件
    selectionChange(list) {
      this.dataSend = list;
    },
    //初始加载组织机构默认选中
    init() {
      getTreeDeviceMateriel().then(res => {

        var temp = []
        var forFn = function (arr) {
          if (arr && arr.length > 0) {
            if (arr[0].children) {
              forFn(arr[0].children)
            } else {
              temp.push(arr[0])
            }
          }
        }

        if (res.data.code == 200) {
          forFn(res.data.data);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.currentkey = temp[0].value;
        this.treeData = res.data.data;
        this.expandedKey = [res.data.data[0].id, res.data.data[0].children[0].id]
        this.$nextTick(function () {
          this.$refs.tree.setCurrentKey(this.currentkey);
        })
        this.nodeClick(temp[0]);
      });
    },
    //左侧原料点击事件
    nodeClick(data) {
      if (data.islevel == 3) {
        this.materielid = data.id.split('MATE_')[1]
      }
      if (data.islevel == 2) {
        this.materielid = data.id.split('MATE_')[1]
      }
      this.page.currentPage = 1;
      //清空查询条件
      this.query = {};
      this.onLoad(this.page);
    },
    //切割结果点击事件
    handleStandard() {
      if (this.dataSendWkId == "") {
        this.$message.warning("请选择一条工单！");
        return;
      }
      if (this.auditStatus == "88") {
        this.$message.warning("审核状态为拟合中，无法查看切割结果！");
      } else {
        this.oilId = this.dataSendOilId;
        if (this.oilId != '') {
          this.testloading = true;
          oilBaseDetail(this.oilId).then(res => {
            if (res.data.code === 200){
              this.testdata = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            // 在这里将后台返回的列表头数据直接放到之前定义好的header数组中
            this.testheader = this.testdata[1];
            this.testbody = this.testdata[0];
            this.lightloading = false;
            this.$nextTick(function () {
              document.getElementById('cutResultId').children[0].getElementsByClassName('el-table__fixed')[0].setAttribute('style', 'height: auto !important;width: 160px;');
            })
          });
        } else {
          this.$message.warning("请选择 1 条需要查看详评的原油！");
          return;
        }
      }
      this.testdata = [];
      this.testheader = [];
      this.testbody = [];
    },
    TesthandleClose() {
      this.lightloading = true;
      this.testloading = false;
    },
    //取消选中
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    //物性分析值
    handleSelectmatterpro(row) {
      this.dataSendWkId = row.wkId;
      this.dataSendOilId = row.oilId;
      this.selectionClear();
      this.$refs.crud.toggleSelection([row]);
      if (row.materieltypeId != 9) {
        this.disabled = true
      } else {
        this.disabled = false;
      }
      if (row != undefined) {
        this.auditStatus = row.auditStatus;
        this.oilId = row.oilId;
        this.exportid = row.wkId;
        onLoadSelectmatterpro(row.wkId).then((res) => {
          if (res.data.code === 200) {
            this.data1 = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      }
    },
    handleCancel() {
      if (this.dataSend.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      var codes = '';
      for (var i = 0; i < this.dataSend.length; i++) {
        if (i == 0) {
          codes = this.dataSend[i].wkId;
        } else {
          codes = codes + ',' + this.dataSend[i].wkId;
        }
      }
      toVoid(codes).then((data) => {
        this.onLoad(this.page);
        if (data.data.data) {
          this.$message({
            type: "success",
            message: data.data.msg,
          });
        } else {
          let that = this;
          errorMsgbox(that, data.data.msg);
          // this.$message({
          //   type: "errow",
          //   message: "作废失败!",
          // });
        }
      });
    },
    //查询条件清空
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    //查询事件
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    //当前页发生改变
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      let table = document.getElementsByClassName('el-table--scrollable-y')[0]
      let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
      table.scrollTop = 0
      tableBody.scrollTop = 0
    },
    //一页展示的数据条数发生改变
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    //刷新列表
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    //重新加载当前页面
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query),
        this.materielid
      ).then((res) => {
        let data = [];
        if (res.data.code != 200) {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        if (res.data.code){
          data = res.data.data;
        }
        this.page.total = data.total;
        data.records.forEach(item => {
          item.id = item.wkId
        })
        this.data = data.records;
        this.loading = false;
//        if(this.materielid != 9){
//          this.disabled = true
//        }else{
//          this.disabled = false;
//        }
        if (this.data.length > 0) {
          //默认选中第一行，加载事件
          this.$nextTick(() => {
            this.$refs.crud.setCurrentRow(this.data[0]);
            this.handleSelectmatterpro(this.data[0]);
          })
        } else {
          this.data1 = []
        }
      });
    },
    //导出excel
    handleexport() {
      console.log(this.dataSend)
      if (this.dataSend.length != 1) {
        this.$message.warning("请选择一条工单！");
        return;
      }
      this.exportid = this.dataSend[0].wkId;
      var elemIF = document.createElement('iframe')
      elemIF.src = '/api/qcduty-workorder/workorder/export?wkid=' + this.exportid
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF);
    },
  },
};
</script>
<style scoped="scoped" lang="scss">
///deep/ .searchLeft .avue-form__menu--center {
//  text-align: left !important;
//
//  .el-form-item__content {
//    margin-left: 0px !important;
//  }
//}


/deep/ .cell-blue {
  color: blue !important;
  cursor: pointer;
}

.timeline-name {
  font-size: 15px;
  color: rgba(0, 0, 0, 1);
}

/deep/ .timeline-content {
  color: rgba(0, 0, 0, 0.7);
  font-size: 13px;
  padding-top: 5px;
  padding-left: 15px;
}

/deep/ .el-timeline-item__tail {
  height: 115%;
  border-left: 2px solid #E4E7ED;
}

/deep/ .el-timeline-item__node--large {
  left: -10px;
  width: 30px;
  height: 30px;
}

/deep/ .el-timeline-item__wrapper {
  position: relative;
  padding-left: 30px;
  top: 3px;
}

/deep/ .el-timeline-item__icon {
  color: #FFF;
  font-size: 20px;
}
</style>
