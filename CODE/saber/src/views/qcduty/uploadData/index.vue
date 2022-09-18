<template>
  <div>
    <basic-container>
      <el-row>
        <handle-div :formSize="formSize" :queryInfo="queryInfo"
                    @changeSelDiv="changeSelDiv"
                    @toClick="toClick"></handle-div>
      </el-row>
    </basic-container>
      <el-row>
        <el-col :span="11">
          <basic-container>
          <el-table ref="workOrderLeftTable" border :height="topLeftTableHeight" :data="topLeftTableData"
                    key="1" highlight-current-row :header-cell-style="{'text-align':'center'}" :header-row-style="{height:'20px'}"
                    :default-sort="{order:'descending'}"
                    @row-click="clickLeftRow"
                    @header-dragend="changeColWidth"
                    @sort-change="sortChange">
            <el-table-column width="50" type="index"  align="center"  label="序号"></el-table-column>
            <el-table-column min-width="80" key="3" prop="workorderOdd" label="工单编号" show-overflow-tooltip
                              :sort-by="['workorderOdd','inlogId']"></el-table-column>
<!--            <el-table-column width="93" key="4" prop="wkType" label="工单类型" show-overflow-tooltip-->
<!--                              :sort-by="['wkType','inlogId']"></el-table-column>-->
            <el-table-column min-width="80" prop="deviceName" align="center" key="5" label="装置" show-overflow-tooltip
                             :sort-by="['deviceName','inlogId']"></el-table-column>
            <el-table-column min-width="80" key="6" prop="sampleName" align="center" label="采样点" show-overflow-tooltip
                              :sort-by="['sampleName','inlogId']"></el-table-column>
            <el-table-column prop="materielName" key="7" label="物料" align="center" show-overflow-tooltip
                             :sort-by="['materielName','inlogId']"></el-table-column>
            <el-table-column  key="10" prop="sampleTime" align="center" label="采样时间" show-overflow-tooltip
                             :sort-by="['sampleTime','inlogId']">
              <template slot-scope="scope">
                <span>{{ dateFormat(scope.row.sampleTime) }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="text-align: right;padding: 10px 5px 0 5px;width: auto;"
                         @size-change="handleLeftSizeChange"
                         @current-change="handleLeftCurrentChange"
                         :current-page="pageLeftInfo.pageIndex"
                         :page-sizes="[20, 30, 50, 100]"
                         :page-size="pageLeftInfo.pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pageLeftInfo.total">
          </el-pagination>
          </basic-container>
        </el-col>
        <el-col :span="13">
          <basic-container>
          <el-table ref="workOrderTable" border :height="topTableHeight" :data="topTableData"
                    key="1" :header-cell-style="{'text-align':'center'}"
                    :default-sort="{order:'descending'}" :header-row-style="{height:'20px'}"
                    @selection-change="selectionChange"
                    @row-click="clickRow"
                    :row-class-name="tableRowClassName"
                    @header-dragend="changeColWidth"
                    @sort-change="sortChange">
<!--            <el-table-column type="selection" key="1"></el-table-column>-->
            <el-table-column key="2" prop="uploadTime" align="center" label="上传时间" show-overflow-tooltip sortable
                             :sort-by="['uploadTime','inlogId']">
            </el-table-column>
            <el-table-column key="8" prop="targetSystem" align="center" label="上传系统" show-overflow-tooltip sortable
                             :sort-by="['targetSystem','inlogId']">
              <template slot-scope="scope">
                <span>{{ dataToUpper(scope.row.targetSystem) }}</span>
              </template>
            </el-table-column>
            <el-table-column key="9" prop="logStatus" align="center" label="上传状态" show-overflow-tooltip sortable
                             :sort-by="['logStatus','inlogId']">
              <template slot-scope="scope">
                <el-tag :type="scope.row.logStatus === '200' ? 'success' : 'danger'" size="mini" disable-transitions>
                  {{ scope.row.logStatus === '200' ? '成功' : '失败' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="text-align: right;padding: 10px 5px 0 5px;width: auto;"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pageInfo.pageIndex"
                         :page-sizes="[20, 30, 50, 100]"
                         :page-size="pageInfo.pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pageInfo.total">
          </el-pagination>
          </basic-container>
          <wx-table-div :wkid="wkid" :inlogId="inlogId" :bottomTableHeight="bottomTableHeight" :noData="noData" @bottomTableData="bottomTableData"></wx-table-div>
        </el-col>

      </el-row>

  </div>
</template>

<script>
import handleDiv from "../uploadData/handleDiv";
import wxTableDiv from "../uploadData/wxTableDiv";
import {
  searchStatusByMateriel
} from "../../../api/qcduty/workorder";
import {compare} from "../../../util/util";
import {dateFormat} from "../../../util/date";
import {reUploadData, selectLeftData, selectUploadPageInfo} from "../../../api/qcduty/uploaddata";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "index",
  components: {
    handleDiv, wxTableDiv
  },
  data() {
    return {
      isSmall: this.$store.state.common.isSmall,
      formSize: this.isSmall ? 'mini' : 'small',
      topLeftTableHeight: '',
      topTableHeight: '',
      bottomTableHeight: '',
      queryInfo: {
        deviceId: '',//装置id
        sampleId: '',//采样点id
        materielId: '',//物料id
        valueTime: []
      },
      pageLeftInfo: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      },
      topTableData: [],//右上table
      topLeftTableData: [],//左侧table数据
      bottomWxTableData: [],//底部table数据
      selWkData:[],//选择的工单数据
      selectionList: [],
      testdata: [],
      timelines: [],
      wkid: 0,
      inlogId: 0, //上传日志id
      selWkId: [],//选中的工单索引数组
      sortTableData: [],
      noData: false,//右上表是否有数据
      leftSelWkId: 0,//左侧选择的物性工单ID
    }
  },
  mounted() {
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)

    this.getWorkOrderDataList();
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      let fullHeight = document.body.clientHeight - this.GLOBAL.topHeight - 36 - 8;
      let formHeight = this.isSmall ? (44 + 38) - 12 : (48 + 38) - 12;
      let syHeight = fullHeight - formHeight - 38;
      this.topLeftTableHeight = syHeight;
      // this.topTableHeight = syHeight * 0.61
      // this.bottomTableHeight = syHeight * 0.35
      this.topTableHeight = 81
      this.bottomTableHeight = this.topLeftTableHeight - 104
    },
    //拖拽控制最小宽度
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    /**
     * 获取工单列表
     */
    getWorkOrderDataList(i) {
      this.selWkId = [];
      let wkId = '';
      let startDate = '';
      let endDate = '';
      if (this.queryInfo.valueTime !== null && this.queryInfo.valueTime.length > 1) {
        startDate = this.queryInfo.valueTime[0];
        endDate = this.queryInfo.valueTime[1];
      }
      if(i == 1){
        this.pageLeftInfo.pageIndex = 1
      }
      selectLeftData({
        deviceId: this.queryInfo.deviceId ? this.queryInfo.deviceId : 0,
        sampleId: this.queryInfo.sampleId ? this.queryInfo.sampleId : 0,
        materielid: this.queryInfo.materielId ? this.queryInfo.materielId : 0,
        startDate: startDate,
        endDate: endDate,
        query:{
          current: this.pageLeftInfo.pageIndex ,
          size: this.pageLeftInfo.pageSize
        }
      }).then((res) => {
        if (res.data.code === 200) {
          const data = res.data.data;
          this.pageLeftInfo.total = data.total;
          data.records.forEach(item => {
            item.id = item.wkId
          })
          this.topLeftTableData = data.records;
          console.log(this.topLeftTableData,'///时间')
          wkId = this.topLeftTableData.length > 0 ? this.topLeftTableData[0].wkId : '';
          this.sortTableData = [];
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        //查询右侧
        selectUploadPageInfo({
          deviceId: this.queryInfo.deviceId ? this.queryInfo.deviceId : 0,
          sampleId: this.queryInfo.sampleId ? this.queryInfo.sampleId : 0,
          materielid: this.queryInfo.materielId ? this.queryInfo.materielId : 0,
          startDate: startDate,
          endDate: endDate,
          query: {
            current: this.pageInfo.pageIndex,
            size: this.pageInfo.pageSize
          },
          wkId: wkId
        }).then((res) => {
          if (res.data.code == 200) {
            const data = res.data.data;
            this.pageInfo.total = data.total;
            data.records.forEach(item => {
              item.id = item.wkId
            })
            this.topTableData = this.topLeftTableData.length===0 ? [] : data.records;
            if (this.topTableData.length == 0) {
              this.noData = true;
            }
            this.sortTableData = [];
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.$nextTick(() => {
            if (this.pageInfo.pageIndex == 1) {
              this.selWkId.push(0);
              if(this.topTableData[0].logStatus==='200'){
                this.$store.commit('UPLOAD_ASK', true);
              }else {
                this.$store.commit('UPLOAD_ASK', false);
              }
              this.$refs.workOrderTable.toggleRowSelection(this.topTableData[0]);
              this.selWkData = this.topTableData[0];
              this.wkid = this.topTableData.length === 0 ? '' : this.topTableData[0].wkId;
              this.leftSelWkId = this.topTableData[0].wkId;
              this.inlogId = this.topTableData.length === 0 ? '' : this.topTableData[0].inlogId;
            }
          })
        });
      });
    },
    /**
     * 底部数据赋值等操作
     */
    bottomTableData(val){
      this.bottomWxTableData = val;
    },
    /**
     * 右上侧行点击事件
     */
    clickRow(row) {
      console.log(row.logStatus,'row///')
      if(row.logStatus==='200'){
        this.$store.commit('UPLOAD_ASK', true);
      }else {
        this.$store.commit('UPLOAD_ASK', false);
      }
      this.$refs.workOrderTable.clearSelection();
      this.$refs.workOrderTable.toggleRowSelection(row);
      this.selWkData = row;
    },
    /**
     * 左侧行点击事件
     */
    clickLeftRow(row) {
      this.wkid = row.wkId;
      this.leftSelWkId = row.wkId;
      this.selRightTableData();
    },
    /**
     * 查询右侧上传相关数据
     */
    selRightTableData(){
      selectUploadPageInfo({
        deviceId: this.queryInfo.deviceId ? this.queryInfo.deviceId : 0,
        sampleId: this.queryInfo.sampleId ? this.queryInfo.sampleId : 0,
        materielid: this.queryInfo.materielId ? this.queryInfo.materielId : 0,
        startDate: this.queryInfo.valueTime[0],
        endDate: this.queryInfo.valueTime[1],
        query: {
          current: this.pageInfo.pageIndex,
          size: this.pageInfo.pageSize
        },
        wkId: this.leftSelWkId
      }).then((res) => {
        if (res.data.code == 200) {
          const data = res.data.data;
          this.pageInfo.total = data.total;
          data.records.forEach(item => {
            item.id = item.wkId
          })
          this.topTableData = data.records;
          if (this.topTableData.length == 0) {
            this.noData = true;
          }
          this.sortTableData = [];
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.$nextTick(() => {
          if (this.pageInfo.pageIndex == 1) {
            const PITCHONFLAG = this.topTableData[0]
            if(PITCHONFLAG.logStatus==='200'){
              this.$store.commit('UPLOAD_ASK', true);
            }else {
              this.$store.commit('UPLOAD_ASK', false);
            }
            this.$refs.workOrderTable.toggleRowSelection(PITCHONFLAG);
            this.wkid = this.topTableData[0].wkId;
            this.inlogId = this.topTableData[0].inlogId;
          }
        })
      });
    },
    /**
     * 选中行背景颜色设置
     */
    tableRowClassName({row, rowIndex}) {
      let color = '';
      this.selWkId.forEach((item, index) => {
        if (rowIndex === item) {
          color = 'select-row';
        }
      })
      return color;
    },
    //监听工单列表选择
    selectionChange(list) {
      this.selWkId = [];
      list.sort(compare('inlogId'));
      this.selectionList = list;
      let that = this;
      //点选变蓝逻辑
      that.$nextTick(() => {
        that.selectionList.forEach(ite => {
          that.topTableData.forEach((item, index) => {
            if (item.inlogId === ite.inlogId) {
              if (that.selWkId.indexOf(index) >= -1) {
                that.selWkId.push(index);
              } else {
                that.selWkId.splice(that.selWkId.indexOf(index), 1);
              }
            }
          })
        })
      })
      if (this.selectionList !==null && this.selectionList.length > 0) {
        this.wkid = this.selectionList[0].wkId;
        this.inlogId = this.selectionList[0].inlogId;
      }else {
        this.wkid = '';
        this.inlogId = '';
      }
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
        case 'searchData'://查询
          this.searchData();
          break;
        case 'reUpload'://重新上传
          this.reUpload();
          break;
        default:
          break;
      }
    },
    //确认提交
    handleSubmit() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      } else {
        let codes = '';
        this.selectionList.forEach(item => {
          if (item.auditStatus === '1' || item.auditStatus === '0') {
            for (let i = 0; i < this.selectionList.length; i++) {
              if (i == 0) {
                codes = this.selectionList[i].wkId;
              } else {
                codes = codes + ',' + this.selectionList[i].wkId;
              }
            }
          } else {
            this.$message.warning("只选择状态为确认审批和驳回的记录");
            return;
          }
        });
        this.$nextTick(() => {
          searchStatusByMateriel(codes, 1, '').then((data) => {
            this.getWorkOrderDataList();
            if (data.data.code == 200) {
              this.$message({
                type: "success",
                message: data.data.msg,
              });
            } else {
              let that = this;
              errorMsgbox(that, data.data.msg);
            }
          });
        })
      }
    },
    //查询
    searchData() {
      this.getWorkOrderDataList(1);
    },
    //重新上传
    reUpload() {
      this.selWkData.matterproList = this.bottomWxTableData
      reUploadData(
        this.selWkData
      ).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        let startDate = '';
        let endDate = '';
        if (this.queryInfo.valueTime !== null && this.queryInfo.valueTime.length > 1) {
          startDate = this.queryInfo.valueTime[0];
          endDate = this.queryInfo.valueTime[1];
        }
        //查询右侧
        selectUploadPageInfo({
          deviceId: this.queryInfo.deviceId ? this.queryInfo.deviceId : 0,
          sampleId: this.queryInfo.sampleId ? this.queryInfo.sampleId : 0,
          materielid: this.queryInfo.materielId ? this.queryInfo.materielId : 0,
          startDate: startDate,
          endDate: endDate,
          query: {
            current: this.pageInfo.pageIndex,
            size: this.pageInfo.pageSize
          },
          wkId: this.wkid
        }).then((res) => {
          if (res.data.code == 200) {
            const data = res.data.data;
            this.pageInfo.total = data.total;
            data.records.forEach(item => {
              item.id = item.wkId
            })
            this.topTableData = this.topLeftTableData.length===0 ? [] : data.records;
            if (this.topTableData.length == 0) {
              this.noData = true;
            }
            this.sortTableData = [];
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.$nextTick(() => {
            if (this.pageInfo.pageIndex == 1) {
              this.selWkId.push(0);
              this.$refs.workOrderTable.toggleRowSelection(this.topTableData[0]);
              this.wkid = this.topTableData.length === 0 ? '' : this.topTableData[0].wkId;
              this.inlogId = this.topTableData.length === 0 ? '' : this.topTableData[0].inlogId;
            }
          })
        });
      });
    },
    handleLeftSizeChange(val) {
      this.pageLeftInfo.pageSize = val;
      this.getWorkOrderDataList();
    },
    handleLeftCurrentChange(val) {
      this.pageLeftInfo.pageIndex = val;
      this.getWorkOrderDataList();
      this.$refs.workOrderLeftTable.bodyWrapper.scrollTop = 0;
    },
    //右上侧分页大小改变事件
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.selRightTableData();
    },
    //右上侧当前分页事件
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.selRightTableData();
      this.$refs.workOrderTable.bodyWrapper.scrollTop = 0;
    },
    //格式化时间
    dateFormat(date) {
      return dateFormat(new Date(date), 'yyyy-MM-dd hh:mm');
    },
    //转换为大写
    dataToUpper(data) {
      return data.toUpperCase();
    },
    /**
     * 排序事件监听
     * @param column
     * @param prop
     * @param order
     */
    sortChange({column, prop, order}) {
      this.topTableData = this.$refs.workOrderTable.tableData;

      this.$nextTick(() => {
        this.$refs.workOrderTable.clearSelection();
        // this.$refs.workOrderTable.toggleRowSelection(this.topTableData[0]);
      })
    }
  },
  watch: {
    isSmall() {
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      return this.$store.state.common.isSmall;
    },
    topLeftTableData() {
      this.$nextTick(() => {
        this.$refs.workOrderLeftTable.setCurrentRow(this.topLeftTableData[0]);
      })
    }
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
/*.el-table--small th{*/
/*  padding: 5px;*/
/*  margin: 0;*/
/*}*/

</style>
