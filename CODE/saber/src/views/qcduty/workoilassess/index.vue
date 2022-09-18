<template>
  <div>
    <basic-container>
      <el-row>
        <handle-div :formSize="formSize" :queryInfo="queryInfo"
                    @changeSelDiv="changeSelDiv"
                    @toClick="toClick" :disabledFlag="disabledFlag"></handle-div>
      </el-row>
      <el-row>
        <el-table ref="workOilTable" border :height="topTableHeight" :data="topTableData"
                  highlight-current-row @row-click="clickRow" :header-row-style="{height:'20px'}"
                  key="2" :header-cell-style="{'text-align':'center'}" @header-dragend="changeColWidth"
                  @sort-change="sortChange">
          <el-table-column type="index" label="序号" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column width="170" show-overflow-tooltip prop="workorderOdd" label="工单编号" sortable
                           :sort-by="['workorderOdd','inlogId']"></el-table-column>
          <el-table-column prop="wkType" show-overflow-tooltip label="工单类型" align="center" sortable
                           :sort-by="['wkType','inlogId']"></el-table-column>
          <el-table-column prop="devicename" show-overflow-tooltip label="装置" align="center" sortable
                           :sort-by="['devicename','inlogId']"></el-table-column>
          <el-table-column prop="sampleName" label="采样点" align="center" show-overflow-tooltip sortable
                           :sort-by="['sampleName','inlogId']"></el-table-column>
          <el-table-column prop="materielName" label="物料" align="center" show-overflow-tooltip sortable
                           :sort-by="['materielName','inlogId']"></el-table-column>
          <el-table-column width="135" prop="sampleTime" align="center" label="采样时间" sortable show-overflow-tooltip
                           :sort-by="['sampleTime','inlogId']">
            <template slot-scope="scope">
              <span>{{ dateFormat(scope.row.sampleTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="auditStatus" align="center" label="审核状态" show-overflow-tooltip sortable
                           :sort-by="['auditStatus','inlogId']">
            <template slot-scope="scope">
              <span>{{ getAuditStatusSelect(scope.row.auditStatus) }}</span>
            </template>
          </el-table-column>
          <!--          <el-table-column prop="materieltypeName" label="分析品种" sortable></el-table-column>-->
          <el-table-column width="135" prop="analysisTime" align="center" label="分析时间" sortable show-overflow-tooltip
                           :sort-by="['analysisTime','inlogId']">
            <template slot-scope="scope">
              <span>{{ dateFormat(scope.row.analysisTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="eqName" align="center" label="分析设备" show-overflow-tooltip sortable
                           :sort-by="['eqName','inlogId']"></el-table-column>
        </el-table>
        <el-pagination style="text-align: right;padding: 10px 5px 0px 5px;width: auto;"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="pageInfo.pageIndex"
                       :page-sizes="[20, 30, 50, 100]"
                       :page-size="pageInfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pageInfo.total">
        </el-pagination>
      </el-row>
    </basic-container>
    <basic-container>
      <el-row>
        <el-table :data="bottomTableData" size="small" @header-dragend="changeColWidth"
                  border :header-cell-style="{'text-align':'center'}" class="tb-edit"
                  :cell-style="{'text-align':'center'}" width="100%" :height="bottomTableHeight">
          <el-table-column type="index" label="序号" header-align="center" width="50"></el-table-column>
          <el-table-column prop="matterproName" label="物性名称" width="200" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="matterproCode" label="物性编码" width="120" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="matterproUnit" label="物性单位" width="120" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="matterproValue" label="分析值" width="150" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="">
          </el-table-column>
        </el-table>
      </el-row>
    </basic-container>

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
        <el-button type="text" @click="doPrint">
          <i class="el-icon-printer" style="font-size: 24px;"></i>
        </el-button>
        <el-button type="text" @click="downloadExcel" style="padding-left: 10px;">
          <i class="el-icon-download" style="font-size: 24px;"></i>
        </el-button>
      </div>
      <div style='width: 912px;text-align: center;' class="iframeClass" v-loading="diaLoading">
        <iframe :src="srcdoc" id='iframe' frameborder="0" :style=styObj></iframe>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import handleDiv from "./handleDiv";
  import {getList, reportConfigure} from "../../../api/qcduty/workoilassess";
  import {dateFormat} from "../../../util/date";
  import {onLoadSelectmatterpro} from "../../../api/qcduty/workorder";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name: "/qcduty/workoilassess/index",
    components: {
      handleDiv
    },
    data() {
      return {
        isSmall: this.$store.state.common.isSmall,
        formSize: this.isSmall ? 'mini' : 'small',
        topTableHeight: '',
        bottomTableHeight: '',
        queryInfo: {
          workorderOdd: '',//工单编号
          deviceId: '',//装置
          materielid: ''
        },
        pageInfo: {
          pageIndex: 1,
          pageSize: 20,
          total: 0,
        },
        topTableData: [],
        bottomTableData: [],
        auditStatusList: [
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
        reportConfigureIt: false,
        reportTitle: '',
        editDialogWidth: '',
        objjson: {
          "wk_id": "",
          "cutresult_id": "173",
          "name": "",
          "code": "",
          "fileName": "simple",
          "fileType": "2"
        },
        styObj: {},
        iframeShow: false,
        iframeHeight: "",
        iframeurl: "",
        srcdoc: "",
        diaLoading: true,
        disabledFlag:false
      }
    },
    mounted() {
      this.setClientHight()
      window.addEventListener('resize', () => this.setClientHight(), false)

      this.getWorkOilTableList();
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        this.isSmall = this.$store.state.common.isSmall;
        this.formSize = this.isSmall ? 'mini' : 'small';
        let fullHeight = document.body.clientHeight - this.GLOBAL.topHeight - 36 - 8;
        let formHeight = this.isSmall ? (44 + 38) - 12 : (48 + 38) - 12;
        let syHeight = fullHeight - formHeight - 52;
        this.topTableHeight = syHeight * 0.61
        this.bottomTableHeight = syHeight * 0.39
      },
      //拖拽控制最小宽度
      changeColWidth(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      /**
       * 排序事件监听
       * @param column
       * @param prop
       * @param order
       */
      sortChange({column, prop, order}) {
        this.topTableData = this.$refs.workOilTable.tableData;

        this.$nextTick(() => {
          this.$refs.workOilTable.clearSelection();
          this.$refs.workOilTable.toggleRowSelection(this.topTableData[0]);
        })
      },
      getWorkOilTableList(num) {
        if( num == 99 ){
          this.pageInfo.pageIndex = 1
        }
        getList(
          this.pageInfo.pageIndex,
          this.pageInfo.pageSize,
          this.queryInfo
        ).then((res) => {
          if (res.data.code == 200) {
            const data = res.data.data;
            this.pageInfo.total = data.total;
            this.topTableData = data.records;
            if(data.records.length == 0){
              this.disabledFlag = true
            }else {
              this.disabledFlag = false
            }

            if (this.topTableData.length > 0) {
              this.$refs.workOilTable.setCurrentRow(this.topTableData[0]);
              this.clickRow(this.topTableData[0]);
              this.rowData = this.topTableData[0];
            } else {
              //  下方table 数据源缓存问题
              this.bottomTableData = []
            }
          }else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      },
      /**
       * 获取审核状态名称
       * @param auditStatus
       * @returns {*|string}
       */
      getAuditStatusSelect(auditStatus) {
        let tempObj = this.auditStatusList.find(item => {
          return item.value === auditStatus
        })
        return tempObj.label || '';
      },
      handleSizeChange(val) {
        this.pageInfo.pageSize = val;
        this.getWorkOilTableList();
      },
      handleCurrentChange(val) {
        this.pageInfo.pageIndex = val;
        this.getWorkOilTableList();
        this.$refs.workOilTable.bodyWrapper.scrollTop = 0;

      },
      dateFormat(date) {
        return dateFormat(new Date(date), 'yyyy-MM-dd hh:mm:ss');
      },
      clickRow(row) {
        // console.log(单点)
        if(row.auditStatus!=='99'){
          this.$store.commit('SET_btn_CHANGE', true);
        }else {
          this.$store.commit('SET_btn_CHANGE', false);
        }
        this.handleSelectmatterpro(row);
        this.rowData = row;
      },
      //物性分析值
      handleSelectmatterpro(row) {
        onLoadSelectmatterpro(row.wkId).then((res) => {
          // console.log(res)
          if (res.data.code === 200){
            this.bottomTableData = res.data.data;
          }else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      },
      /**
       * 搜索框数据改变监听
       */
      changeSelDiv(data) {
        this.queryInfo = data;
      },
      /**
       * 监听按钮操作栏
       * @param clickName
       */
      toClick(clickName) {
        switch (clickName) {
          case 'simplereportConfigure'://简单评价
            this.simplereportConfigure();
            break;
          case 'detailreportConfigure'://详细评价
            this.detailreportConfigure();
            break;
          case 'searchData'://查询
            this.searchData();
            break;
          default:
            break;
        }
      },
      //查询
      searchData() {
        this.getWorkOilTableList(99);
      },
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
        this.reportTitle = '简评报告'
        this.reportConfigureIt = true;
        this.editDialogWidth = '970px';
        this.$set(this.objjson, "wk_id", this.rowData.wkId);
        this.$set(this.objjson, "workorderOdd", this.rowData.workorderOdd);
        this.$set(this.objjson, "reportType", "1");
        this.styObj = {
          'margin': '-24px -19px -9px 0',
          'width': '100%',
          'height': '480px',
        }
        reportConfigure(JSON.stringify(this.objjson)).then((res) => {
          this.diaLoading = false
          this.styObj.border = '1px solid #d4d4d4'
          if (res.data.code === 200) {
            this.srcdoc = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      },
      detailreportConfigure() {
        if (this.rowData.length == 0) {
          this.$message.warning("请选择一条工单！");
          return;
        }
        this.reportConfigureIt = true;
        this.reportTitle = '详评报告'
        this.editDialogWidth = '970px'
        this.$set(this.objjson, "wk_id", this.rowData.wkId);
        this.$set(this.objjson, "workorderOdd", this.rowData.workorderOdd);
        this.$set(this.objjson, "reportType", "2");
        this.styObj = {
          'margin': '-24px -18px -9px 0',
          width: '100%',
          height: window.innerHeight * 0.65 + 'px',
        }
        reportConfigure(JSON.stringify(this.objjson)).then((res) => {
          this.diaLoading = false
          this.styObj.border = '1px solid #d4d4d4'
          if (res.data.code === 200) {
            this.srcdoc = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
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
    }
  }
</script>

<style scoped lang="scss">
  /deep/ .el-card__body {
    padding: 8px !important;
  }

  /deep/ .el-table .select-row {
    background-color: #d0e5ff !important;
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
