<template>
  <div :style=styleObj>
    <basic-container style='height: 63%'>
      <avue-crud
        :option="option"
        :table-loading="loading"
        :data="data"
        :page.sync="page"
        :permission="permissionList"
        :before-open="beforeOpen"
        v-model="form"
        ref="crud"
        @header-dragend="changeColWidth"
        @row-click="handleSelectmatterpro"
        @search-change="searchChange"
        @search-reset="searchReset"
        @current-change="currentChange"
        @size-change="sizeChange"
        @refresh-change="refreshChange"
        @on-load="onLoad"
        :style="tableheight"
      >

        <template slot="searchMenu" style='margin-left: -10px'>
          <!--<el-button target="showHere" type="primary" size="small" @click="simpleReport"><img src="/icon/btn_jianpingbaogao.png"
                                           style="width: 10px;height:10px; margin-right:6px;"/>简评报告</el-button>
          <el-button type="primary" size="small" @click="detailedReport"><img src="/icon/btn_xiangqingbaogao.png"
                                           style="width: 10px;height:10px; margin-right:6px;"/>详评报告</el-button>-->

          <el-button type="primary" size="small" @click="simplereportConfigure"><img src="/icon/btn_jianpingbaogao.png"
                                                                                     style="width: 10px;height:10px; margin-right:6px;"/>简单评价
          </el-button>
          <el-button type="primary" size="small" @click="detailreportConfigure"><img src="/icon/btn_xiangqingbaogao.png"
                                                                                     style="width: 10px;height:10px; margin-right:6px;"/>详细评价
          </el-button>
        </template>

        <template slot="search">
          <div class="el-col el-col-4 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-4 avue-form__row"
               style="padding-left: 10px;padding-right: 10px">
            <el-form-item label="装置" label-width="45px">
              <el-select v-model="deviceId" clearable @change="changedevice" placeholder="请选择装置">
                <el-option
                  v-for="item in devicelist"
                  :key="item.deviceId"
                  :label="item.devicename"
                  :value="item.deviceId"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-6 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-6 avue-form__row" v-if='false'
               style="padding-left: 10px;padding-right: 10px">
            <el-form-item label="采样点">
              <el-select v-model="sampleId" clearable @change="changesample" placeholder="请选择采样点">
                <el-option
                  v-for="item in samplelist"
                  :key="item.sampleId"
                  :label="item.sampleName"
                  :value="item.sampleId"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col el-col-4 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-4 avue-form__row"
               style="padding-left: 10px;padding-right: 10px">
            <el-form-item label="物料" label-width="45px">
              <el-select v-model="materielId" clearable placeholder="请选择物料">
                <el-option
                  v-for="item in materiellist"
                  :key="item.materielid"
                  :label="item.materielName"
                  :value="item.materielid"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </template>
      </avue-crud>
    </basic-container>
    <basic-container style="padding-top: 10px;padding-right: 6px;padding-bottom: 10px;padding-left: 6px; height: 36%">
      <el-table :data="data1" size="small"
                @header-dragend="changeColWidth"
                border :header-cell-style="{'text-align':'center'}" class="tb-edit"
                :cell-style="{'text-align':'center'}" width="100%" :height='bHeight'>
        <el-table-column type="index" label="序号" header-align="center" show-overflow-tooltip width="50"></el-table-column>
        <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip width="200" sortable></el-table-column>
        <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip width="120" sortable></el-table-column>
        <el-table-column prop="matterproUnit" label="物性单位" show-overflow-tooltip width="120" sortable></el-table-column>
        <el-table-column prop="matterproValue" label="分析值" show-overflow-tooltip width="150" sortable></el-table-column>
        <!--        <el-table-column prop="modelMin" label="最小值" ></el-table-column>-->
        <!--        <el-table-column prop="modelMax" label="最大值" ></el-table-column>-->
        <!--        <el-table-column prop="mahalanobisDistance" label="马氏距离" ></el-table-column>-->
        <el-table-column label="">

        </el-table-column>
      </el-table>
    </basic-container>
    <el-dialog
      :modal="modelShow"
      :visible.sync="editDialog"
      center
      :append-to-body="true"
      :show-close="true"
      :before-close="closeDialog"
      :width="editDialogWidth">
      <iframe :src="iframeurl" frameborder="0" :style="iframeHeight"></iframe>
    </el-dialog>
    <!--  简评详评弹出  -->
    <el-dialog
      ref="ReportConfig"
      :visible.sync="reportConfigureIt"
      :before-close="reportConfigureItClose"
      :close-on-click-modal='false'
      :append-to-body="true"
      :title="reportTitle"
      :width="editDialogWidth">
      <div style='text-align: right; margin-bottom: 20px; margin-top: -73px; margin-right: 40px;'>
        <!--        <el-button type="primary" @click="doPrint">-->
        <!--          打 印-->
        <!--        </el-button>-->

        <el-button type="text" @click="doPrint">
          <i class="el-icon-printer" style="font-size: 24px;"></i>
        </el-button>
        <!--        <el-button type="primary" @click="downloadExcel">-->
        <!--          <img src="../../../public/icon/ic_excel.png" style="margin-right: 5px;">-->
        <!--          导 出-->
        <!--        </el-button>-->
        <el-button type="text" @click="downloadExcel" style="padding-left: 10px;">
          <i class="el-icon-download" style="font-size: 24px;"></i>
        </el-button>
      </div>
      <div style='width: 912px;text-align: center;' class="iframeClass" v-loading="diaLoading">
        <iframe :src="srcdoc" id='iframe' frameborder="0" :style=styObj></iframe>
      </div>

      <!--<div class="hello" :style="setHeight">-->
      <!--<div-->
      <!--id="luckysheet"-->
      <!--style="margin:0px;padding:0px;position:absolute;width:100%;left: 0px;top: 80px;bottom:10px;"-->
      <!--&gt;</div>-->
      <!--<div v-show="isMaskShow" style="position: absolute;z-index: 100000;left: 0px;top: 0px;bottom: 0px;right: 0px; background: rgba(255, 255, 255, 0.8); text-align: center;font-size: 40px;align-items:center;justify-content: center;display:flex;">-->
      <!--Downloading-->
      <!--</div>-->
      <!--</div>-->
    </el-dialog>
  </div>
</template>

<script>
import LuckyExcel from 'luckyexcel';
import {
  getList,
  getDetail,
  getBaseurl,
  reportConfigure
} from "@/api/qcduty/workoilassess";
import {
  onLoadSelectmatterpro,
  searchDeviceByOil,
  searchSampleByDevice,
  searchMaterielWithOilByDevice,
  searchMaterielBySampleAndDevice,
} from "@/api/qcduty/workorder";
import {mapGetters} from "vuex";
// import { ensureScaleRawExtentInfo } from 'echarts/lib/coord/scaleRawExtentInfo';
import {$getJson} from '../../router/getJson'
import {errorMsgbox} from "@/api/global_variable";

export default {
  data() {
    return {
      editDialogWidth: 0,
      setHeight: 0,
      isMaskShow: false,
      reportConfigureIt: false,
      tableheight: "",//表格高度
      modelShow: true,
      diaLoading: true,
      iframeShow: false,
      iframeHeight: "",
      iframeurl: "",
      srcdoc: "",
      editDialog: false,
      rowData: [],
      deviceId: "",
      devicelist: [], //装置list
      sampleId: "",
      samplelist: [], //采样点list
      materielId: "",
      reportTitle: "",
      materiellist: [], //物料list
      form: {},
      query: {},
      styleObj: {},
      styObj: {},
      loading: true,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [20, 30, 50, 100],
      },
      selectionList: [],
      option: {
        height: "auto",
        calcHeight: "255",
        tip: false,
        menu: false,
        header: false,
        align: 'center',
        searchShow: true,
        searchMenuSpan: 9,
        border: true,
        index: true,
        indexLabel: '序号',
        viewBtn: true,
        selection: false,
        menuPosition: "left",
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
            width: 170,
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
            overHidden: true,
            hide: true,
            prop: "analysisNo",
            width: 170,
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
            prop: "devicename",
            overHidden: true,
            props: {
              label: "devicename",
              value: "deviceId",
            },
            cascaderItem: ["sampleId", "materielid"],
            dicUrl: "/api/qcduty-workorder/workorder/searchDevice",
            dicMethod: "get",
            typeformat(item, label, value) {
              return `${item[label]}`;
            },
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
            prop: "sampleTime",
            overHidden: true,
            format: "yyyy-MM-dd HH:mm:ss",
            type: "datetime",
            width: 130,
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
            prop: "auditStatus",
            overHidden: true,
            dicData: [
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
            prop: "analysisTime",
            overHidden: true,
            format: "yyyy-MM-dd HH:mm:ss",
            type: "datetime",
            width: 130,
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

          // {
          //   label: "设备类别",
          //   prop: "eqCategory",
          //   overHidden: true,
          //   search: true,
          //   type: "select",
          //   dicData: [
          //       {
          //         label: "NMR",
          //         value: "0"
          //       },
          //       {
          //         label: "ROMAN",
          //         value: "1"
          //       }
          //     ],
          //     rules: [{
          //       required: true,
          //       message: "设备类别  0  NMR  1 ROMAN",
          //       trigger: "blur"
          //     }]
          // },
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
      objjson: {
        "wk_id": "",
        "cutresult_id": "173",
        "name": "",
        "code": "",
        "fileName": "simple",
        "fileType": "2"

      }
    };
  },
  created() {
    this.searchDevice();
    $getJson('/home.json').then(res => {
      this.option.column[1].hide = res.data.isHidden
    })
  },
  beforeMount() {
    // if(window.innerWidth != 1366){
    //   this.editDialogWidth = "55%";
    // }else{
    //   this.editDialogWidth = "75%";
    // }
    // var h = document.documentElement.clientHeight || document.body.clientHeight;
    // this.iframeHeight = "width:100%;height:" + (h*0.5) + "px;";
    // this.tableheight = "height:"+ (window.innerHeight - 144 - 236) + "px;";
    // this.setHeight = "height:" + (h-300) + "px;";
    // if(window.innerWidth != 1366) {
    //   this.tableheight = "height:"+ (window.innerHeight*0.7 - 144) + "px;";
    //   this.option.calcHeight = '311'
    //   this.styleObj.height = '100%'
    //   this.bHeight = '252px'
    // } else {
    //   this.styleObj = {}
    //   this.bHeight = '202px'
    // }
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
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  mounted() {
    let style = document.getElementsByClassName("el-form-item__content");
    style[3].setAttribute("style", "width:120%");
  },
  methods: {
    //拖拽控制最小宽度
    changeColWidth(nw,ow,col,evt){
      console.log(222)
      if (nw < 70) {
        col.width = 60;
      }
    },
    doPrint() {
      const iframe = document.getElementById('iframe');
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    },
    downloadExcel() {
      var elemIF = document.createElement('iframe')
      elemIF.src = this.srcdoc.replace(/html/, "xlsx")
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF);
    },
    //导入excel
    uploadExcel(evt) {
      console.log(evt)


      const files = evt.target.files;
      if (files == null || files.length == 0) {
        alert("No files wait for import");
        return;
      }

      console.log(files[0])
      let name = files[0].name;
      let suffixArr = name.split("."), suffix = suffixArr[suffixArr.length - 1];
      if (suffix != "xlsx") {
        alert("Currently only supports the import of xlsx files");
        return;
      }
      LuckyExcel.transformExcelToLucky(files[0], function (exportJson, luckysheetfile) {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert("Failed to read the content of the excel file, currently does not support xls files!");
          return;
        }
        window.luckysheet.destroy();
        window.luckysheet.create({
          container: 'luckysheet', //luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator
        });
        document.getElementById("luckysheet-rightclick-menu").style.zIndex = "9999";
      });
    },
    //清除过度动画
    reportConfigureItClose() {
      this.reportConfigureIt = false
      this.srcdoc = ''
      this.diaLoading = true
    },
    //报表配置器
    simplereportConfigure() {

      if (this.rowData.length == 0) {
        this.$message.warning("请选择一条工单！");
        return;
      }
//      document.getElementById("testdiv").innerHTML="";
      this.reportTitle = '简评报告'
      this.reportConfigureIt = true;
      this.editDialogWidth = '970px';
      this.$set(this.objjson, "wk_id", this.rowData.wkId);
      this.$set(this.objjson, "workorderOdd", this.rowData.workorderOdd);
      this.$set(this.objjson, "reportType", "1");
      // this.$set(this.objjson,"wk_id",this.rowData.wkId);
      this.styObj = {
        'margin-top': '-25px',
        'margin-bottom': '-9px',
        'width': '100%',
        'height': '480px',
      }
      reportConfigure(JSON.stringify(this.objjson)).then((res) => {
        this.diaLoading = false
        this.styObj.border = '1px solid #d4d4d4'
        //console.log(res.data);
        this.srcdoc = res.data
        //document.getElementById("testdiv").appendHTML("");
//        document.getElementById("testdiv").appendHTML(res.data);

      })
      // var elemIF = document.createElement('iframe')
      // elemIF.src = '/api/qcduty-workoilassess/workorder/reportConfigure?wkId=' + this.rowData.wkId;
      // elemIF.style.display = 'none'
      // document.body.appendChild(elemIF);
    },
    detailreportConfigure() {

      if (this.rowData.length == 0) {
        this.$message.warning("请选择一条工单！");
        return;
      }
//      document.getElementById("testdiv").innerHTML="";
      this.reportConfigureIt = true;
      this.reportTitle = '详评报告'
      this.editDialogWidth = '970px'
      this.$set(this.objjson, "wk_id", this.rowData.wkId);
      this.$set(this.objjson, "workorderOdd", this.rowData.workorderOdd);
      this.$set(this.objjson, "reportType", "2");
      // this.$set(this.objjson,"wk_id",this.rowData.wkId);
      this.styObj = {
        'margin-top': '-25px',
        'margin-bottom': '-9px',
        width: '100%',
        height: window.innerHeight * 0.65 + 'px',
      }
      reportConfigure(JSON.stringify(this.objjson)).then((res) => {
//        console.log(res.data);
        this.diaLoading = false
        this.styObj.border = '1px solid #d4d4d4'
        this.srcdoc = res.data
        //document.getElementById("testdiv").appendHTML("");
//        document.getElementById("testdiv").appendHTML(res.data);

      })
      // var elemIF = document.createElement('iframe')
      // elemIF.src = '/api/qcduty-workoilassess/workorder/reportConfigure?wkId=' + this.rowData.wkId;
      // elemIF.style.display = 'none'
      // document.body.appendChild(elemIF);
    },
    //详评报告
    detailedReport() {
      if (this.rowData.length == 0) {
        this.$message.warning("请选择一条数据");
        return;
      }

      this.editDialog = true;
      var wk_id = this.rowData.wkId;
      var wk_odd = this.rowData.workorderOdd;
      console.log(wk_odd);
      var rpx_name = '详细评价.rpx';
      var name_param = "详评报告(" + wk_odd + ")";
      var baseurl = "";


      getBaseurl().then((res) => {
        console.log("baseUrl=======" + res.data.baseUrl)
        baseurl = res.data.baseUrl;
        this.iframeurl = baseurl + encodeURIComponent(rpx_name) + "&wk_id=" + wk_id
          + "&wk_odd=" + wk_odd + "&name_param=" + encodeURIComponent(name_param) + "&istoolbarvisual=no";
      });


    },
    //简评报告
    simpleReport() {
      if (this.rowData.length == 0) {
        this.$message.warning("请选择一条数据");
        return;
      }

      this.editDialog = true;
      var wk_id = this.rowData.wkId;
      var wk_odd = this.rowData.workorderOdd;
      console.log(wk_odd);
      var rpx_name = '简单评价.rpx';
      var name_param = "简评报告(" + wk_odd + ")";
      var baseurl = "";
      getBaseurl().then((res) => {
        console.log("baseUrl=======" + res.data.baseUrl)
        baseurl = res.data.baseUrl;
        this.iframeurl = baseurl + encodeURIComponent(rpx_name) + "&wk_id=" + wk_id
          + "&wk_odd=" + wk_odd + "&name_param=" + encodeURIComponent(name_param) + "&istoolbarvisual=no";
      });

    },
    //弹出框关闭前回调
    closeDialog() {
      this.editDialog = false;
    },
    //获取装置信息
    searchDevice() {
      searchDeviceByOil().then((res) => {
        if (res.data.code === 200)
          this.devicelist = res.data.data;
      });
    },
    //修改装置数据
    changedevice(val) {
      this.sampleId = "";
      this.materielId = "";
      this.searchSampleByDevice(val);
      this.searchMaterielByDevice(val);
    },
    //根据装置查询物料
    searchMaterielByDevice(deviceId) {
      searchMaterielWithOilByDevice(deviceId).then((res) => {
        if (res.data.code === 200)
          this.materiellist = res.data.data;
      });
    },
    //根据装置信息获取采样点
    searchSampleByDevice(deviceId) {
      searchSampleByDevice(deviceId).then((res) => {
        if (res.data.code === 200)
          this.samplelist = res.data.data;
      });
    },
    //修改采样点
    changesample(val) {
      // this.materielId = "";
      // this.searchMaterielBySampleAndDevice(this.deviceId, val);
    },
    //根据装置和采样点
    searchMaterielBySampleAndDevice(deviceId, sampleId) {
      searchMaterielBySampleAndDevice(deviceId, sampleId).then((res) => {
        if (res.data.code === 200)
          this.materiellist = res.data.data;
      });
    },
    //物性分析值
    handleSelectmatterpro(row) {
      this.rowData = row;
      onLoadSelectmatterpro(row.wkId).then((res) => {
        if (res.data.code === 200)
          this.data1 = res.data.data;
      });
    },
    //弹窗开启前时间
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then((res) => {
          this.form = res.data.data;
        });
      }
      done();
    },
    //查询条件重置方法
    searchReset() {
      this.deviceId = '';
      this.sampleId = '';
      this.materielId = '';
      this.query = {};
      this.onLoad(this.page);
    },
    //查询方法事件
    searchChange(params, done) {
      if (this.deviceId != null || this.deviceId != "" || this.deviceId != undefined) {
        this.$set(params, 'deviceId', this.deviceId);
      }
      if (this.sampleId != null || this.sampleId != "" || this.sampleId != undefined) {
        this.$set(params, 'sampleId', this.sampleId);
      }
      if (this.materielId != null || this.materielId != "" || this.materielId != undefined) {
        this.$set(params, 'materielid', this.materielId);
      }
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    //当前页发生改变
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    //分页数量发生改变
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    //刷新事件
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    //加载表格事件
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        if (res.data.code != 200){
          return errorMsgbox(this,res.data.msg)
        }
        if (this.data.length > 0) {
          this.$refs.crud.setCurrentRow(this.data[0]);
          this.handleSelectmatterpro(this.data[0]);
        } else {
          //  下方table 数据源缓存问题
          this.data1 = []
        }
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
/deep/ .el-dialog__body .iframeClass {
  /*padding: 30px 20px;*/
  /*color: #606266;*/
  /*font-size: 14px;*/
  /*word-break: break-all;*/
  /*width: 1004px !important;*/
  /* display: flex;*/
  margin: 0 auto;
}

/deep/ .el-dialog__title {
  font-weight: bold;
}

/deep/ .el-dialog__header {
  width: 912px;
  padding-top: 7px;
  margin: 0 -8px;
}

/deep/ .el-dialog__headerbtn {
  top: 9px;
  right: 17px;
}
</style>

