<template>
  <div>
    <basic-container>
      <el-row>
        <handle-div :formSize="formSize" :queryInfo="queryInfo" :btnDisInfo="btnDisInfo"
                    @changeSelDiv="changeSelDiv"
                    @toClick="toClick"></handle-div>
      </el-row>
      <el-row>
        <el-table ref="workOrderTable" border :height="topTableHeight" :data="topTableData"
                  :header-row-style="{height:'20px'}" tooltip-effect="dark"
                  @selection-change="selectionChange" :header-cell-style="{'text-align':'center'}"
                  @row-click="clickRow" @header-dragend="changeColWidth"
                  :row-class-name="tableRowClassName"
                  @sort-change="sortChange"
                  key="3">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column min-width="130" prop="workorderOdd" label="工单编号" show-overflow-tooltip
                           sortable :sort-by="['workorderOdd','wkId']"></el-table-column>
          <el-table-column width="93" prop="wkType" align="center" label="工单类型" show-overflow-tooltip sortable
                           :sort-by="['wkType','wkId']"></el-table-column>
          <el-table-column prop="deviceName" label="装置" align="center" show-overflow-tooltip sortable
                           :sort-by="['deviceName','wkId']"></el-table-column>
          <el-table-column prop="sampleName" label="采样点" align="center" show-overflow-tooltip sortable min-width="100px"
                           :sort-by="['sampleName','wkId']"></el-table-column>
          <el-table-column prop="materielName" label="物料" align="center" show-overflow-tooltip sortable
                           :sort-by="['materielName','wkId']"></el-table-column>
          <el-table-column width="135" prop="sampleTime" align="center" label="采样时间" show-overflow-tooltip sortable
                           :sort-by="['sampleTime','wkId']">
            <template slot-scope="scope">
              <span>{{ dateFormat(scope.row.sampleTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column width="93" prop="auditStatus" align="center" label="审核状态" show-overflow-tooltip sortable
                           :sort-by="['auditStatus','wkId']">
            <template slot-scope="scope">
              <span @click="loadAuditDetail(scope.row)" style="color: #00f!important;cursor: pointer;">{{
                  getAuditStatusSelect(scope.row.auditStatus)
                }}</span>
            </template>
          </el-table-column>
          <el-table-column width="93" prop="materieltypeName" align="center" label="分析品种" show-overflow-tooltip
                           sortable :sort-by="['materieltypeName','wkId']"></el-table-column>
          <el-table-column width="135" prop="analysisTime" align="center" label="分析时间" show-overflow-tooltip sortable
                           :sort-by="['analysisTime','wkId']">
            <template slot-scope="scope">
              <span>{{ dateFormat(scope.row.analysisTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column min-width="93" prop="eqName" align="center" label="分析设备" show-overflow-tooltip sortable
                           :sort-by="['eqName','wkId']"></el-table-column>
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
    <wx-table-div :wkid="wkid" :bottomTableHeight="bottomTableHeight" @unableSubmit="unableSubmit"
                  :isLoad="isLoadWxData" @updateLoadVal="isLoadWxData=false"></wx-table-div>
    <el-dialog
      title="审核详情"
      :visible.sync="approveDialog"
      :append-to-body="true"
      width="33%">
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
    <el-dialog
      title="审批"
      :visible.sync="approve"
      :append-to-body="true"
      width="450px">
      <el-input type="textarea"
                placeholder="请编写审批意见"
                v-model="approveMsg" :rows="5">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="approve = false">取 消</el-button>
        <el-button type="primary" @click="approveok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import handleDiv from "./handleDiv";
import wxTableDiv from "./wxTableDiv";
import {dateFormat} from "../../../util/date";
import {
  searchStatusByMateriel,
  toVoid,
  onLoadSelectmatterproByIds,
  getList, auditStatusSelect, approvalDetail, reject
} from "../../../api/qcduty/workorder";
import {compare} from "../../../util/util";
import {mapGetters} from "vuex";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "/qcduty/workOrder/index",
  components: {
    handleDiv, wxTableDiv
  },
  data() {
    return {
      gridDataHeader: [
        // {key:'selection',label:'',width:'50',aling:'center'},
        {key:'workorderOdd',label:'工单编号',width:'200',aling:'center'},
        {key:'wkType',label:'类型',width:'100',aling:'center'},
        {key:'deviceName',label:'装置',width:'100',aling:'center'},
        {key:'sampleName',label:'采样点',width:'100',aling:'center'},
        {key:'materielName',label:'物料',width:'100',aling:'center'},
        {key:'sampleTime',label:'采样时间',width:'100',aling:'center'},
        {key:'auditStatus',label:'审核状态',width:'100',aling:'center'},
        {key:'materieltypeName',label:'分析品种',width:'100',aling:'center'},
        {key:'analysisTime',label:'分析时间',width:'100',aling:'center'},
        {key:'eqName',label:'分析设备',width:'100',aling:'center'},
      ],
      isShowTooltip: false,
      isLoadWxData: false,//是否重新加载物性列表数据
      isSmall: this.$store.state.common.isSmall,
      formSize: this.isSmall ? 'mini' : 'small',
      topTableHeight: '',
      bottomTableHeight: '',
      queryInfo: {
        deviceId: '',//装置idg
        sampleId: '',//采样点id
        materielid: '',//物料id
      },
      btnDisInfo: {
        submit: false,
        audit: false,
        del: false,
        reject: false,
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      },
      topTableData: [],
      bottomTableData: [],
      selectionList: [],
      auditStatusList: [],
      approveDialog: false,//审核详情弹出层
      testdata: [],
      approvetableDataheader: [],
      approvetableData: [],
      timelines: [],
      approve: false,//审批弹窗
      approveMsg: '',
      wkid: 0,
      selWkId: [],//选中的工单索引数组
      colorArray: [],
      hasRed: false,//是否有红的数据
      searchFlag:false,
      worKordData:[],
      fullHeight:'',
      formHeight:'',
    }
  },
  mounted() {
    this.isSmall = this.$store.state.common.isSmall;
    this.formSize = this.isSmall ? 'mini' : 'small';

    this.auditStatusSelectList();
    this.getWorkOrderDataList();

    var _this = this;
    // 挂载读取页面高度
    _this.setClientHight();
    // 窗口页面高度变更
    window.addEventListener('resize', () => _this.setClientHight(), false)
  },
  methods: {
    // 设置页面高度
    setClientHight() {
      let fullHeight = document.body.clientHeight - this.GLOBAL.topHeight - 36 - 8;
      let formHeight = this.isSmall ? (44 + 38) - 12 : (48 + 38) - 12;
      let syHeight = fullHeight - formHeight - 32;
      this.topTableHeight = syHeight * 0.52
      this.bottomTableHeight = syHeight * 0.48
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
      this.topTableData = this.$refs.workOrderTable.tableData;

      this.$nextTick(() => {
        this.$refs.workOrderTable.clearSelection();
        this.$refs.workOrderTable.toggleRowSelection(this.topTableData[0]);
      })
    },
    //提交不可用
    unableSubmit(val) {
      this.hasRed = val;
      let that = this;
      // console.log(val,'val///')
      if (val === true) {//是红色，禁用提交
        this.btnDisInfo.audit = false;
        this.btnDisInfo.submit = false;
      } else {
        that.selectionList.forEach(item => {
          if (item.auditStatus === '1' || item.auditStatus === '0') {
            that.btnDisInfo.del = true;
            that.btnDisInfo.submit = true;
            that.btnDisInfo.audit = false;
            that.btnDisInfo.reject = false;
          } else {
            that.btnDisInfo.submit = false;
            that.btnDisInfo.del = false;
            that.btnDisInfo.audit = true;
            that.btnDisInfo.reject = true;
          }
        })
      }
    },
    /**
     * 审核状态列表
     */
    auditStatusSelectList() {
      auditStatusSelect().then(res => {
        if (res.data.code === 200) {
          this.auditStatusList = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 获取审核状态名称
     * @param auditStatus
     * @returns {*|string}
     */
    getAuditStatusSelect(auditStatus) {
      let tempObj = this.auditStatusList.find(item => {
        return item.dict_key === auditStatus
      })
      return tempObj ? tempObj.dict_value || '' : '';
    },
    /**
     * 查看审核详情
     */
    loadAuditDetail(row) {
      approvalDetail(row.wkId).then(res => {
        if (res.data.code === 200) {
          this.testdata = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        // 在这里将后台返回的列表头数er据直接放到之前定义好的header数组中
        this.approvetableDataheader = this.testdata[1];
        this.approvetableData = this.testdata[0];
        if (this.approvetableData.length === 0) {
          return;
        }
        this.approveDialog = true;
      });
    },
    /**
     * 获取工单列表
     */
    getWorkOrderDataList() {
      if(this.searchFlag){  //搜索
        this.pageInfo.pageIndex = 1
      }
      let pageIndex = this.pageInfo.pageIndex
      let pageSize = this.pageInfo.pageSize

      this.selWkId = [];
      let params = this.queryInfo;
      let that = this;
      getList(
        pageIndex,
        pageSize,
        params).then((res) => {
        if (res.data.code == 200) {
          const data = res.data.data;
          this.pageInfo.total = data.total;
          if(data.records.length === 0){
            let index = this.pageInfo.pageIndex-1 <=0?'1':this.pageInfo.pageIndex-1
            this.pageInfo.pageIndex = index
          }
          data.records.forEach(item => {
            item.id = item.wkId
          })
          that.topTableData = data.records;
          this.worKordData = JSON.parse(JSON.stringify(this.topTableData))
          if (this.topTableData.length == 0) {
            this.wkid = 0;
          }
          this.$nextTick(() => {
            // if (this.pageInfo.pageIndex == 1) {
              this.selWkId.push(0);
              this.$refs.workOrderTable.toggleRowSelection(this.topTableData[0]);
              this.wkid = this.topTableData[0].wkId;
              this.isLoadWxData = true;



            // }
          })

        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
      this.searchFlag = false
    },
    /**
     * 行点击事件
     */
    clickRow(row) {
      // console.log('/////')
      this.isLoadWxData = true;
      this.wkid = row.wkId;
      // console.log('5555')
      this.$refs.workOrderTable.clearSelection();
      this.$refs.workOrderTable.toggleRowSelection(row);
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

      // return 'select-row';
    },
    colorJudge(row) {
      console.log(row,'row///')
      let isRed = 'false';
      if (row.matterproDownValue == "" || row.matterproUpValue == "") {
        isRed = 'false';
        this.valueIsRed = false;
      }
      if (row.matterproUpValue != null && row.matterproDownValue != null && row.matterproUpValue != "") {
        if (row.matterproValue > row.matterproUpValue) {
          isRed = 'true';
          this.valueIsRed = true;
        } else if (row.matterproDownValue != "") {
          if (row.matterproValue < row.matterproDownValue) {
            isRed = 'true';
            this.valueIsRed = true;
          }
        }
      } else if (row.matterproDownValue != "") {
        if (row.matterproValue < row.matterproDownValue) {
          isRed = 'true';
          this.valueIsRed = true;
        }
      }
      return isRed;
    },

    /**
     * 获取物性table列表
     */
    getWXTableList(wkid) {
      if (wkid > 0) {
        onLoadSelectmatterpro(wkid).then((res) => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.bottomTableData = res.data.data;
          let isRed = [];
          let isHasTrue = false;
          let isHasFalse = false;
          this.bottomTableData.forEach(item => {
            isRed.push(this.colorJudge(item));
            if (item.pitchOn) {
              isHasTrue = true;
            } else {
              isHasFalse = true;
            }
          })
          this.isIndeterminate = isHasTrue && isHasFalse;

          if (this.bottomTableData.length > 0) {
            if (isRed.indexOf('true') > -1) { //有红色的则禁用
              this.unableSubmit(true)
              // this.$emit('unableSubmit', true);
            } else { // 没红色
              // this.$emit('unableSubmit', false);
              this.unableSubmit(false)
            }
            for (let i = 0; i < this.bottomTableData.length; i++) {
              this.$set(this.bottomTableData[i], 'editunit', true);
              this.$set(this.bottomTableData[i], 'editvalue', true);
              this.$set(this.bottomTableData[i], 'tempVal', this.bottomTableData[i].matterproValue);
            }
          } else {
            this.bottomTableData = []
            // this.$emit('unableSubmit', false);
            this.unableSubmit(false)
          }
        });

        this.$nextTick(() => {
          this.$emit('updateLoadVal', false);
        })

      } else {
        this.$emit('unableSubmit', false);
      }
    },
    //监听工单列表选择
    selectionChange(list) {
      // console.log(list,'/list')
      // console.log(this.wkid,'wkid//')
      this.selWkId = [];
      list.sort(compare('wkId'));
      this.selectionList = list;
      let that = this;
      // console.log(that.topTableData,'that.topTableData')
      that.$nextTick(() => {
        that.selectionList.forEach(ite => {
          that.topTableData.forEach((item, index) => {
            if (item.wkId === ite.wkId) {
              if (that.selWkId.indexOf(index) >= -1) {
                that.selWkId.push(index);
              } else {
                that.selWkId.splice(that.selWkId.indexOf(index), 1);
              }
            }
          })
        })
      })




      //根据选择数据拿到物性信息判断是否可以提交
      let listId = []
      this.selectionList.forEach((item,index)=>{
          listId.push(String(item.id))
      })
      if (listId.length > 0) {
        onLoadSelectmatterproByIds(listId).then(res=>{
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          if( res.data.code === 200){
            let physicalproperty = res.data.data
            if(physicalproperty.length!=0){

              // if(physicalproperty.length === 1){
              //   let val =  parseFloat(physicalproperty[0].matterproValue)
              //   let max =  parseFloat(physicalproperty[0].matterproUpValue)
              //   let min =  parseFloat(physicalproperty[0].matterproDownValue)
              //   if(val<=max&&val>=min){
              //     this.btnDisInfo.submit = true
              //   }
              // }else
              //   {

              // //物性信息判断 若分析值在最大最小值之间 返回true
              // let tempBol_true =  physicalproperty.every(item=>parseFloat(item.matterproValue)<=parseFloat(item.matterproUpValue)
              //   &&parseFloat(item.matterproValue)>=parseFloat(item.matterproDownValue));
              let auditStatusArray = [];
              let currentAuditStatus = 0;
              this.selectionList.forEach(item => {
                auditStatusArray.push(item.auditStatus);
                currentAuditStatus = item.auditStatus;
              });
              if(physicalproperty.length === 1){
                let val =  parseFloat(physicalproperty[0].matterproValue)
                let max = parseFloat(physicalproperty[0].matterproUpValue == "" ? '999999' : physicalproperty[0].matterproUpValue)
                let min = parseFloat(physicalproperty[0].matterproDownValue == "" ? '-999999' : physicalproperty[0].matterproDownValue)
                if(val<=max&&val>=min){
                  if (currentAuditStatus == "0" || currentAuditStatus == "1") {
                    this.btnDisInfo.submit = true
                    this.btnDisInfo.audit = false
                  } else {
                    this.btnDisInfo.submit = false
                    this.btnDisInfo.audit = true
                  }
                }
              } else {
                //判断物性是否在合法范围内的
                let tempBol_true = physicalproperty.every(item => parseFloat(item.matterproValue) <= parseFloat(item.matterproUpValue == "" ? '999999' : item.matterproUpValue)
                  && parseFloat(item.matterproValue) >= parseFloat(item.matterproDownValue == "" ? '-999999' : item.matterproDownValue));
                //判断数组中是否有重复的数据
                let hasDifferent = false;
                for (let x = 0; x < auditStatusArray.length; x++) {
                  for (let y = 1; y < auditStatusArray.length; y++) {
                    if (x != y && auditStatusArray[y] != auditStatusArray[x]) {
                      hasDifferent = true;
                    }
                  }
                }
                if (hasDifferent) {
                  this.btnDisInfo.submit = false;
                  this.btnDisInfo.audit = false
                } else {
                  if (currentAuditStatus == "0" || currentAuditStatus == "1"){
                    this.btnDisInfo.submit = tempBol_true;
                    this.btnDisInfo.audit = this.btnDisInfo.submit ? !tempBol_true : tempBol_true;
                  } else {
                    this.btnDisInfo.audit = tempBol_true;
                    if (this.btnDisInfo.audit){
                      this.btnDisInfo.submit = false;
                    }
                  }
                }
              }

              // //审核状态判断
              // let flag = 1
              // let lists = JSON.parse(JSON.stringify(this.selectionList))
              // lists.forEach((item,index)=>{
              //   if(item.auditStatus == '1' ){
              //     lists.splice(index,1)
              //     flag = 2
              //   }
              //
              // })
              // lists.forEach(ele=>{
              //   if(ele.auditStatus == '2' ){
              //     if(flag == 2){
              //       flag = 3
              //     } else {
              //       flag = 2
              //     }
              //   }
              // })
              // if(flag == 3) tempBol_true = false
              // this.btnDisInfo.submit = tempBol_true
              // // }
            }else {
              this.btnDisInfo.submit = false
            }
          }
        })
      }
      //审批 驳回 删除按钮状态控制
      let tempArr = [];
      if (this.selectionList.length > 0) {
        this.wkid = this.selectionList[0].wkId;

        // this.btnDisInfo.del = true;
        //不同审核状态下的工单禁用提交审批
        this.selectionList.forEach(item => {
          // console.log(item.auditStatus,'选中的')

          if (item.auditStatus === '1' || item.auditStatus === '0') {
            tempArr.push('1');
            this.btnDisInfo.del = true;
            if (this.hasRed){
              this.btnDisInfo.submit = false;
              this.btnDisInfo.audit = false;
            } else {
              this.btnDisInfo.submit = true;
              this.btnDisInfo.audit = false;
            }
            this.btnDisInfo.reject = false;
          } else {
            tempArr.push('2');
            this.btnDisInfo.submit = false;
            this.btnDisInfo.del = false;
            this.btnDisInfo.audit = true;
            this.btnDisInfo.reject = true;
          }
        })
        // console.log(tempArr,'/tempArr')
        if (tempArr.indexOf('1') > -1 && tempArr.indexOf('2') > -1) {
          // console.log('1且2')
          this.btnDisInfo.submit = false;
          this.btnDisInfo.audit = false;
          this.btnDisInfo.reject = false;
          this.btnDisInfo.del = false;
        } else {
          if (tempArr.indexOf('1') > -1) {
            this.btnDisInfo.del = true;
            if (this.hasRed){
              this.btnDisInfo.audit = false;
              this.btnDisInfo.submit = false;
            } else {
              if (this.bottomTableData.length>0){
                this.btnDisInfo.submit = true;
                this.btnDisInfo.audit = false;
              } else {
                this.btnDisInfo.audit = false;
                this.btnDisInfo.submit = false;
              }
            }
            this.btnDisInfo.reject = false;
          } else {
            this.btnDisInfo.del = false;
            this.btnDisInfo.audit = true;
            this.btnDisInfo.submit = false;
            this.btnDisInfo.reject = true;
          }
        }
      } else {
        this.btnDisInfo.submit = false;
        this.btnDisInfo.audit = false;
        this.btnDisInfo.reject = false;
        this.btnDisInfo.del = false;
      }
      if (this.btnDisInfo.audit){
        this.btnDisInfo.submit = false
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
        case 'handleSubmit'://确认提交
          this.handleSubmit();
          break;
        case 'handleApprove'://审批
          this.handleApprove();
          break;
        case 'handleReject'://驳回
          this.handleReject();
          break;
        case 'handleCancel'://删除
          this.handleCancel();
          break;
        case 'handleexport'://导出
          this.handleexport();
          break;
        case 'searchData'://查询
          this.searchData();
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
        let IndexLise = []
        this.selectionList.forEach((item,i) => {
          this.topTableData.forEach((ele,j)=>{
            if(item.wkId == ele.wkId){
              IndexLise.push(this.topTableData[j].wkId)
            }
          })

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

        searchStatusByMateriel(codes, 1, '').then((res) => {
          let pageIndex = this.pageInfo.pageIndex
          let pageSize = this.pageInfo.pageSize
          if(this.searchFlag){  //搜索
            pageIndex = 1
          }
          this.selWkId = [];
          let params = this.queryInfo;
          let that = this;
          getList(
            pageIndex,
            pageSize,
            params).then((res) => {
            if (res.data.code === 200) {

              const data = res.data.data;
              this.pageInfo.total = data.total;
              data.records.forEach(item => {
                item.id = item.wkId
              })
              that.topTableData = data.records;
              if (this.topTableData.length == 0) {
                this.wkid = 0;
              }
              this.$nextTick(() => {
                // if (this.pageInfo.pageIndex == 1) {
                //   this.selWkId.push(0);
                  IndexLise.forEach(item=>{
                    this.topTableData.forEach((ele,index)=>{
                      if(ele.wkId == item){
                        this.$nextTick(() => {
                          // let getChecked = sessionStorage.getItem("sif-rwhz-checked");
                          // if (getChecked != null) {
                          //   if (getChecked == "true") {
                          //     this.checked = true;
                          //   } else {
                          //     this.checked = false;
                          //   }
                          // }
                          console.log(this.topTableData[index])
                          this.$refs.workOrderTable.toggleRowSelection(this.topTableData[index],true);
                        })
                      }
                    })

                  })
                  // this.wkid = this.topTableData[0].wkId;
                  this.isLoadWxData = true;
                // }
              })
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          });




            if (res.data.code == 200) {
              if (res.data.data) {
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });

              } else {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          });
      }
    },
    //驳回
    handleReject() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      var codes = '';
      for (var i = 0; i < this.selectionList.length; i++) {
        if (i == 0) {
          codes = this.selectionList[i].wkId;
        } else {
          codes = codes + ',' + this.selectionList[i].wkId;
        }
      }
      reject(codes).then((res) => {
        this.getWorkOrderDataList();
        // console.log(res,'errorMsgbox')
        if (res.data.data) {
          this.$message({
            type: "success",
            message: "驳回成功!",
          });
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    //审批
    handleApprove() {
      // console.log(this.selectionList)
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      } else {
        this.approve = true;
      }
    },
    //审批确认
    approveok() {
      let that = this;
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      } else {
        this.selectionList.forEach(item => {
          if (item.auditStatus === '1' || item.auditStatus === '0') {
            this.$message.warning("同一批审批中选择状态不能同时包含提交和审批");
            return;
          }
        });

        var codes = '';
        for (var i = 0; i < this.selectionList.length; i++) {
          if (i == 0) {
            codes = this.selectionList[i].wkId;
          } else {
            codes = codes + ',' + this.selectionList[i].wkId;
          }
        }
        const loading = this.$loading({
          lock: true,
          text: '审批中,请稍等...',
          spinner: 'el-icon-loading',
        });
        searchStatusByMateriel(codes, 2, this.approveMsg).then((res) => {
          this.approve = false;
          // debugger

          // let codesList = codes.split(',').length
          if(this.topTableData.length == this.selectionList.length){
            this.pageInfo.pageIndex = this.pageInfo.pageIndex-1
          }
          this.getWorkOrderDataList();
          loading.close();
          if (res.data.code == 200) {
            that.$message({
              message: '审批成功',
              type: 'success'
            });
          } else {
            errorMsgbox(that, res.data.msg);
          }
        });
      }
    },
    //作废
    handleCancel() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      var codes = '';
      for (var i = 0; i < this.selectionList.length; i++) {
        if (i == 0) {
          codes = this.selectionList[i].wkId;
        } else {
          codes = codes + ',' + this.selectionList[i].wkId;
        }
      }
      toVoid(codes).then((data) => {
        if(this.topTableData.length == this.selectionList.length){
          this.pageInfo.pageIndex = this.pageInfo.pageIndex-1
        }
        this.getWorkOrderDataList();
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
    //查询
    searchData() {
      this.searchFlag = true
      this.getWorkOrderDataList();
    },
    //导出excel
    handleexport() {
      if (this.selectionList.length != 1) {
        this.$message.warning("请选择一条工单！");
        return;
      }
      this.exportid = this.selectionList[0].wkId;
      var elemIF = document.createElement('iframe')
      elemIF.src = '/api/qcduty-workorder/workorder/export?wkid=' + this.exportid
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF);
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getWorkOrderDataList();
    },
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.getWorkOrderDataList();
      this.$refs.workOrderTable.bodyWrapper.scrollTop = 0;
    },
    dateFormat(date) {
      return dateFormat(new Date(date), 'yyyy-MM-dd hh:mm');
    },
  },
  watch: {
    approvetableData() {//快评工单数据变化相关的时间轴
      this.timelines = [];
      for (let i = 0; i < this.approvetableData.length; i++) {
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
        if (i === 0) {
          time.icon = 'el-icon-more';
          time.color = 'gray';
        } else {
          time.icon = 'el-icon-check';
        }
        time.real_name = one.real_name;
        time.dict_value = one.dict_value;
        // let date1 = one.approve_time.substring(0,19);
        time.approve_time = one.approve_time;
        time.note = one.note;
        this.timelines.push(time);
      }
    },
    isSmall() {
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      return this.$store.state.common.isSmall;
    },
    audit(){
      if (this.btnDisInfo.audit) {
        this.btnDisInfo.submit = false;
      }
    }
  },

}
</script>

<style scoped lang="scss">

  /*/deep/.el-main{*/
  /*  text-align: center;*/
  /*  line-height: 10px;*/
  /*}*/

  .el-table {
    /deep/ th {
      padding: 0 ;
    }
    /deep/ td {
      padding: 0 ;
    }
  }
  /*/deep/.el-table__body tr,*/
  /*.el-table__body td {*/
  /*  padding: 0;*/
  /*  height: 40px;*/
  /*}*/

/deep/ .el-card__body {
  padding: 8px !important;
}

/deep/ .el-table .select-row {
  background-color: #d0e5ff !important;
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
/deep/.el-form--inline .el-form-item{
  margin-bottom: -12px !important;
}
 /deep/ .el-card__body {
    padding: 8px 8px 2px !important;
  }
 /deep/.el-pagination {
   padding: 2px 5px 0px !important;
   /*border: 1px solid red;*/
 }
  /*/deep/.el-table th > .cell {*/
  /*  !*min-width: 70px;*!*/
  /*  overflow: hidden;*/
  /*  text-overflow: ellipsis;*/
  /*  white-space: nowrap;*/
  /*}*/
  /*/deep/.el-tooltip__popper{ max-width:20%; }*/
  /*/deep/.el-tooltip__popper{*/
  /*  display: none; //去掉悬浮显示*/
  /*}*/
///deep/.el-col{
//  margin-bottom: -30px;
//}
</style>
