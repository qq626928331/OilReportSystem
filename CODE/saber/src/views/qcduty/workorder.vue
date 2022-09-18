<template>
  <div :style=styleObj>

    <basic-container>
      <el-row>
        <el-form :inline="true" :size="formSize" style="margin-bottom: 5px !important;">
          <el-row>
            <el-col :span="12" style="text-align: left;">
              <el-form-item label="装置：" prop="deviceId">
                <el-select v-model="queryInfo.deviceId" clearable @change="changedevice" placeholder="请选择装置名称">
                  <el-option
                    v-for="item in devicelist"
                    :key="item.deviceId"
                    :label="item.devicename"
                    :value="item.deviceId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="采样点：" prop="sampleId">
                <el-select v-model="queryInfo.sampleId" clearable @change="changesample" placeholder="请选择采样点">
                  <el-option
                    v-for="item in samplelist"
                    :key="item.sampleId"
                    :label="item.sampleName"
                    :value="item.sampleId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物料：" prop="materielId">
                <el-select v-model="queryInfo.materielId" clearable placeholder="请选择物料">
                  <el-option
                    v-for="item in materiellist"
                    :key="item.materielid"
                    :label="item.materielName"
                    :value="item.materielid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="text-align: right;">
              <el-form-item>
                <el-button type="primary" icon="el-icon-check" plain @click="handleSubmit"
                           :disabled="valueIsRed" :style="{ display: visibleSubmit }">提交
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="handleApprove"
                           :disabled="valueIsRed" :style="{ display: visibleApprove }">审批
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-warning-outline" plain @click="handleReject"
                           :style="{ display: visibleReject }">驳回
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  icon="el-icon-close"
                  plain
                  @click="handleCancel"
                  :style="{ display: visibleCancel }"
                >删除
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button style="margin-bottom: 15px" type="primary" icon="el-icon-search"
                           @click="handleexport">查询
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button style="margin-bottom: 15px" type="primary" icon="el-icon-download"
                           @click="handleexport">导出
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <el-table border :height="topTableHeight" :data="data">
          <el-table-column type="selection"></el-table-column>
          <el-table-column width="170" prop="workorderOdd" label="工单编号"></el-table-column>
          <el-table-column prop="wkType" label="工单类型"></el-table-column>
          <el-table-column prop="deviceName" label="装置"></el-table-column>
          <el-table-column prop="sampleName" label="采样点" show-overflow-tooltip></el-table-column>
          <el-table-column prop="materielName" label="物料" show-overflow-tooltip></el-table-column>
          <el-table-column width="135" prop="sampleTime" label="采样时间">
            <template slot-scope="scope">
              <span>{{ dateFormat(scope.row.sampleTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="auditStatus" label="审核状态"></el-table-column>
          <el-table-column prop="materieltypeName" label="分析品种"></el-table-column>
          <el-table-column width="135" prop="analysisTime" label="分析时间">
            <template slot-scope="scope">
              <span>{{ dateFormat(scope.row.analysisTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="eqName" label="分析设备" show-overflow-tooltip></el-table-column>
        </el-table>
        <PaginationVue style="text-align: right;padding: 10px 5px 0px 5px;width: auto;"
                       :pageInfo="pageInfo">

        </PaginationVue>
<!--        <el-pagination style="text-align: right;padding: 10px 5px 0px 5px;width: auto;"-->
<!--                       @size-change="handleSizeChange"-->
<!--                       @current-change="handleCurrentChange"-->
<!--                       :current-page="pageInfo.pageIndex"-->
<!--                       :page-sizes="[100, 200, 300, 400]"-->
<!--                       :page-size="pageInfo.pageSize"-->
<!--                       layout="total, sizes, prev, pager, next, jumper"-->
<!--                       :total="pageInfo.total">-->
<!--        </el-pagination>-->
      </el-row>
    </basic-container>
    <basic-container>
      <el-row>
        <el-table width="100%" border :data="data1" :height="bottomTableHeight" :header-row-style="{height:'20px'}"
                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="matterproName" label="物性名称" width="200" sortable>
          </el-table-column>
          <el-table-column prop="matterproCode" label="物性编码" width="120" sortable>
          </el-table-column>
          <el-table-column label="物性单位" width="120">
            <template slot-scope="{row,$index}">
              <span style="display:block;float:left;width: 100%; ">{{ row.matterproUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分析值" prop="matterproValue" width="150" sortable>
            <template slot-scope="{row,$index}">
              <el-input class="tableInner" size="mini" ref="customerInput" v-if="!row.editvalue"
                        v-model="row.matterproValue"
                        placeholder="请输入内容"
                        type="text" @blur="handleEdit($index, row)"
                        @keyup.enter.native="handleEdit($index, row)"></el-input>
              <span :style="{'display':'block','float':'left','width': '100%', 'color': (colorJudge(row)?'red':'blue')}"
                    v-else
                    @click="changeedit(2,row)">{{ row.matterproValue }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="modelMin" label="最小值" width="100" sortable></el-table-column>
          <el-table-column prop="modelMax" label="最大值" width="100" sortable></el-table-column>
          <el-table-column prop="mahalanobisDistance" label="马氏距离" width="150" sortable></el-table-column>
          <el-table-column label="">
          </el-table-column>
        </el-table>
      </el-row>
    </basic-container>


    <!--    <basic-container style='height: 63%'>-->
    <basic-container :style="{'height': topCardHeight,'display':'none'}">
      <avue-crud
        size="small"
        :option="option"
        :table-loading="loading"
        :data="data"
        :page.sync="page"
        :permission="permissionList"
        :before-open="beforeOpen"
        :cell-class-name="addClass"
        ref="crud"
        @header-dragend="changeColWidth"
        @cell-click="pageto"
        @search-change="searchChange"
        @search-reset="searchReset"
        @selection-change="selectionChange"
        @current-change="currentChange"
        @size-change="sizeChange"
        @refresh-change="refreshChange"
        @on-load="onLoad"
        @row-click="handleSelectmatterpro"
        style="width: 100%;"
      >
        <template slot="searchMenu">

          <el-button style="margin-bottom: 15px"
                     type="primary"
                     size="small"
                     icon="el-icon-download"
                     @click="handleexport"
          >导出
          </el-button>

          <!-- <el-button
            type="primary"
            size="small"
            icon=""
            plain
            @click="handleSearch"
          >审核详情</el-button> -->
        </template>
        <template slot="search">
          <div class="el-col el-col-6 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-6 avue-form__row"
               style="padding-left: 10px; padding-right: 10px;">
            <div class="el-form-item el-form-item--feedback el-form-item--small avue-form__item--">
              <el-form-item label="装置" label-width="45px">
                <el-select v-model="deviceId" clearable @change="changedevice" placeholder="请选择装置">
                  <el-option
                    v-for="item in devicelist"
                    :key="item.deviceId"
                    :label="item.devicename"
                    :value="item.deviceId">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="el-col el-col-6 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-6 avue-form__row"
               style="padding-left: 10px; padding-right: 10px;">
            <div class="el-form-item el-form-item--feedback el-form-item--small avue-form__item--">
              <el-form-item label="采样点" label-width="60px">
                <el-select v-model="sampleId" clearable @change="changesample" placeholder="请选择采样点">
                  <el-option
                    v-for="item in samplelist"
                    :key="item.sampleId"
                    :label="item.sampleName"
                    :value="item.sampleId">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="el-col el-col-6 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-6 avue-form__row"
               style="padding-right: 10px;">
            <div class="el-form-item el-form-item--feedback el-form-item--small avue-form__item--">
              <el-form-item class='materie' label="物料" label-width="45px">
                <el-select v-model="materielId" clearable placeholder="请选择物料">
                  <el-option
                    v-for="item in materiellist"
                    :key="item.materielid"
                    :label="item.materielName"
                    :value="item.materielid">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="el-col el-col-9 el-col-offset-0 el-col-xs-24 el-col-sm-12 el-col-md-9 avue-form__row"
               style="margin-left: 18px; width: 33.5%">
            <div class="el-form-item el-form-item--feedback el-form-item--small avue-form__item--">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-check"
                plain
                @click="handleSubmit"
                :disabled="valueIsRed"
                :style="{ display: visibleSubmit }"
              >确认提交
              </el-button>
              <!--                   v-if="permission.workorder_submit"-->
              <el-button
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                plain
                @click="handleApprove"
                :disabled="valueIsRed"
                :style="{ display: visibleApprove }"
              >审批
              </el-button>
              <!--        v-if="permission.workorder_approve"-->
              <el-button
                type="primary"
                size="small"
                icon="el-icon-warning-outline"
                plain
                @click="handleReject"
                :style="{ display: visibleReject }"
              >驳回
              </el-button>
              <!--        v-if="permission.workorder_reject"-->
              <el-button
                type="danger"
                size="small"
                icon="el-icon-close"
                plain
                @click="handleCancel"
                :style="{ display: visibleCancel }"
              >删除
              </el-button>
            </div>
          </div>
        </template>
      </avue-crud>
    </basic-container>
    <!--    <basic-container style="padding-top: 10px;padding-right: 6px;padding-bottom: 10px;padding-left: 6px; height: 36%">-->
    <basic-container class="bottomCardStyle" :style="{'height': bottomCardHeight,'display':'none'}">
      <!-- <el-button style="margin-bottom: 15px"
                 type="primary"
                 size="small"
                 icon="el-icon-download"
                 @click="handleexport"
      >导出</el-button> -->
      <el-table size="small" :data="data1" border style="width: 100%;" highlight-current-row width="100%"
                :height="bHeight" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="matterproName" label="物性名称" width="200" sortable>
        </el-table-column>
        <el-table-column prop="matterproCode" label="物性编码" width="120" sortable>
        </el-table-column>
        <el-table-column label="物性单位" width="120">
          <template slot-scope="{row,$index}">
            <el-select ref="customerSelect" v-if="!row.editunit" size="small" v-model="row.matterproUnit"
                       placeholder="请选择物性单位"
                       @change="getValue($index, row)">
              <el-option
                v-for="item in row.units"
                :key="item.MATTERPROUNITID"
                :label="item.MATTERPRO_UNIT"
                :value="item.MATTERPRO_UNIT">
              </el-option>
            </el-select>
            <!--            <span style="display:block;float:left;width: 100%; color: blue" v-else @dblclick="changeedit(1,row)">{{row.matterproUnit}}</span>-->
            <span style="display:block;float:left;width: 100%; ">{{ row.matterproUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分析值" prop="matterproValue" width="150" sortable>
          <template slot-scope="{row,$index}">
            <el-input ref="customerInput" v-if="!row.editvalue" size="small" v-model="row.matterproValue"
                      placeholder="请输入内容"
                      type="text" @blur="handleEdit($index, row)"
                      @keyup.enter.native="handleEdit($index, row)"></el-input>
            <span :style="{'display':'block','float':'left','width': '100%', 'color': (colorJudge(row)?'red':'blue')}"
                  v-else
                  @dblclick="changeedit(2,row)">{{ row.matterproValue }}</span>
            <!--            <span style="display:block;float:left;width: 100%; " >{{row.matterproValue}}</span>-->
          </template>
        </el-table-column>
        <el-table-column prop="modelMin" label="最小值" width="100" sortable></el-table-column>
        <el-table-column prop="modelMax" label="最大值" width="100" sortable></el-table-column>
        <el-table-column prop="mahalanobisDistance" label="马氏距离" width="150" sortable></el-table-column>
        <el-table-column prop="matterproUpValue" label="物性上限值" v-if="false"></el-table-column>
        <el-table-column prop="matterproDownValue" label="物性下限值" v-if="false"></el-table-column>
        <el-table-column label="">

        </el-table-column>
      </el-table>
    </basic-container>

    <el-dialog
      title="审批"
      :visible.sync="approve"
      :before-close="approveclose"
      :append-to-body="true"
      width="450px"
    >
      <el-input type="textarea"
                placeholder="请编写审批意见"
                v-model="approveMsg" :rows="5">
      </el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="approve = false">取 消</el-button>
        <el-button type="primary" @click="approveok">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="审核详情"
      :visible.sync="approveDialog"
      :before-close="approvehandleClose"
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
      <!-- <el-table class="el-table"
                :data="approvetableData"
                border
                height="250">
        <el-table-column
          v-for="(item,index) in timelines"
          :fixed="index==0||index==1"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          align="center">
        </el-table-column>
      </el-table> -->
    </el-dialog>
  </div>
</template>
<script>
import {
  searchStatusByMateriel,
  onLoadSelectmatterpro,
  getList,
  getDetail,
  reject,
  searchDevice,
  searchSampleByDevice,
  searchMaterielByDevice,
  searchMaterielBySampleAndDevice,
  toVoid,
  approvalDetail,
  getAnalysisUnitValue,
  updateAnalysisDisValue,
  exportexcel
} from "@/api/qcduty/workorder";
import {mapGetters} from "vuex";
import {$getJson} from '../../router/getJson'
import {dateFormat} from "../../util/date";
import PaginationVue from "./PaginationVue";
import {errorMsgbox} from "@/api/global_variable";

export default {
  data() {
    return {
      isSmall: this.$store.state.common.isSmall,
      formSize: this.isSmall ? 'mini' : 'small',
      queryInfo: {
        deviceId: '',//装置id
        sampleId: '',//采样点id
        materielId: '',//物料id
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      },
      // topTableHeight: '255px',
      // bottomTableHeight: '180px',
      topTableHeight: '',
      bottomTableHeight: '',

      continerHeight: '',
      topCardHeight: '',
      bottomCardHeight: '',
      displayStyle: 'block',
      tableheight: "",//表格高度
      bHeight: "202px",//表格高度
      cardstyle: '',//card的样式
      timelines: [],//时间轴对象
      visibleSubmit: "",
      visibleApprove: "",
      visibleReject: "",
      visibleCancel: "",
      query: {},
      JsonData: require('../../../public/home.json'),
      isShow: false,
      styleObj: {},
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
        align: 'center',
        tip: false,
        searchShow: true,
        menu: false,
        header: false,
        searchMenuSpan: 6,
        border: true,
        index: false,
        viewBtn: true,
        selection: true,
        dialogClickModal: false,
        menuPosition: "left",
        highlightCurrentRow: true,
        searchBtnText: "查询",
        column: [
          {
            label: "工单编号",
            prop: "workorderOdd",
            overHidden: true,
            search: false,
            type: "input",
            formslot: true,
            width: 170,
            props: {
              value: "workorderOdd",
            },
            typeformat(item, value) {
              return `${item[value]}`;
            },
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
            label: "工单ID",
            hide: true,
            overHidden: true,
            prop: "wkId",
            rules: [
              {
                required: true,
                message: "请输入工单ID",
                trigger: "blur",
              },
            ],
          },

          {
            label: "装置",
            prop: "deviceId",
            overHidden: true,
            /*search: true,
            type: "select",*/
            props: {
              label: "devicename",
              value: "deviceId",
            },
            cascaderItem: ['sampleId', 'materielid'],
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
            /*search: true,
            type: "select",
            props: {
              label: "sampleName",
              value: "sampleId",
            },
            dicUrl: "/api/qcduty-workorder/workorder/searchSampleByDevice",
            dicMethod: "get",
            typeformat(item, label, value) {
              return `${item[label]}`;
            },*/
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
            /*search: true,
            type: "select",
            props: {
              label: "materielName",
              value: "materielid",
            },
            //dicUrl: "/api/qcduty-workorder/workorder/searchMaterielBySampleAndDevice",
            dicMethod: "get",
            typeformat(item, label, value) {
              return `${item[label]}`;
            },*/
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
            type: "datetime",
            format: "yyyy-MM-dd HH:mm",
            width: 135,
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
            search: true,
            type: "select",
            props: {
              label: "dict_value",
              value: "dict_key",
            },
            dicUrl: "/api/qcduty-workorder/workorder/auditStatusSelect",
            dicMethod: "get",
            typeformat(item, label, value) {
              return `${item[label]}`;
            },
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
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            width: 135,
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
                message: "请输入分析设备",
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
            label: "模型ID",
            prop: "modelId",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入模型ID",
                trigger: "blur",
              },
            ],
          },
          {
            label: "模型名称",
            prop: "modelName",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入模型名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "原油ID",
            prop: "oilId",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入原油ID",
                trigger: "blur",
              },
            ],
          },
          {
            label: "是否有效",
            prop: "isvalid",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入是否有效",
                trigger: "blur",
              },
            ],
          },
          {
            label: "是否已简评",
            prop: "issimplified",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入是否已简评",
                trigger: "blur",
              },
            ],
          },
          {
            label: "是否已详评",
            prop: "isdetailed",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入是否已详评",
                trigger: "blur",
              },
            ],
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
          {
            label: "创建时间",
            prop: "createddate",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入创建时间",
                trigger: "blur",
              },
            ],
          },
          {
            label: "时间戳",
            prop: "lastwrittentime",
            overHidden: true,
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入时间戳",
                trigger: "blur",
              },
            ],
          },
        ],
      },
      data: [],
      data1: [],
      approve: false,//审批弹窗
      approveMsg: '',//审批意见
      deviceId: '',//查询条件
      devicelist: [],//装置list
      sampleId: '',//查询条件
      samplelist: [],//采样点list
      materielId: '',//查询条件
      materiellist: [],//物料list
      approveDialog: false,//审批详情弹窗
      approvetableData: [],//审批详情数据
      approvetableDataheader: [],//审批详情表头
      exportid: '',//导出传递的id
      valueIsRed: false, //分析值为红色
      valueColor: 'blue'
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
        submitBtn: this.vaildData(this.permission.workorder_sumbit, false),
        rejectBtn: this.vaildData(this.permission.workorder_reject, false),
        approveBtn: this.vaildData(this.permission.workorder_approve, false),
        cancelBtn: this.vaildData(this.permission.workorder_cancel, false),
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
  created() {
    this.searchDevice();
    $getJson('/home.json').then(res => {
      if (res.data.code != 200){
        return errorMsgbox(this,res.data.msg)
      }
      this.option.column[1].hide = res.data.isHidden
    })
    this.continerHeight = window.innerHeight - 104
    this.topCardHeight = 63 + '%'
    this.bottomCardHeight = 36 + '%'
  },
  beforeMount() {
    //  this.$nextTick(() => {
    //   console.log(document.getElementsByClassName('avue-crud')[0].children[1])
    //   document.getElementsByClassName('avue-crud')[0].children[1].setAttribute("style","margin-top:-15px");
    // })
    // var h = document.documentElement.clientHeight || document.body.clientHeight;
    // //this.iframeHeight = "width:100%;height:" + (h*0.5) + "px;";
    // this.tableheight = "height:" + (window.innerHeight - 144 - 236) + "px;";
    // if (window.innerWidth != 1366) {
    //   // this.tableheight = "height:" + (window.innerHeight * 0.7 - 144) + "px;";
    //   this.tableheight = "height:" + ((this.continerHeight - 0.01 * window.innerHeight) * 0.6 - 30) + "px;";

    //   this.styleObj.height = '100%'
    //   this.bHeight = '232px'
    // } else {
    //   this.styleObj = {}
    //   this.bHeight = '202px'
    // }
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
    },
    isSmall() {
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      return this.$store.state.common.isSmall;
    }
  },
  mounted() {
    this.isSmall = this.$store.state.common.isSmall;
    this.formSize = this.isSmall ? 'mini' : 'small';
    let fullHeight = document.body.clientHeight - 64 - 36 - 8;
    let formHeight = this.isSmall ? (49 + 38) : (53 + 38);
    let syHeight = fullHeight - formHeight - 64;
    this.topTableHeight = syHeight * 0.65
    this.bottomTableHeight = syHeight * 0.35
  },
  methods: {
    handleSizeChange() {


    },
    handleCurrentChange() {


    },
    dateFormat(date) {
      return dateFormat(new Date(date), 'yyyy-MM-dd hh:mm');
    },

    changeColWidth(nw, ow, col, evt) {
      this.$nextTick(() => {
        this.$refs.crud.doLayout();
      });
      // console.log(nw)
      // console.log(ow)
      // console.log(col)
      // console.log(evt)
//         var size = this.textSize(col.label);
      // console.log("宽：" + size.width + " 高：" + size.height);
//         if(size.width > col.width){
      // var heightIs = "height:" + size.height + "px";
      // document.getElementsByClassName('el-table__header')[0].children[1].children[1].setAttribute('style',heightIs);
      // document.getElementsByClassName('el-table__header')[0].children[1].children[0].children[1].setAttribute('style',heightIs);
//         document.getElementsByClassName('el-table__header')[0].getElementsByTagName('tr')[0].setAttribute('style','height:50px')
//         }

    },


    setText(el, text) {
      if (el.innerText) {
        el.innerText = text;
      } else if (el.textContent) {
        el.textContent = text;
      }
    },

    textSize(text) {
      var span = document.createElement("span");
      var result = {};
      result.width = span.offsetWidth;
      result.height = span.offsetWidth;
      span.style.visibility = "hidden";
      document.body.appendChild(span);
      if (typeof span.textContent != "undefined")
        span.textContent = text;
      else span.innerText = text;
      result.width = span.offsetWidth - result.width;
      result.height = span.offsetHeight - result.height;
      span.parentNode.removeChild(span);
      return result;
    },
    //行点击事件，加载下方物性列表
    pageto(row, column, cell, event) {
      if (column.label == "审核状态") {
        approvalDetail(row.wkId).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          if (res.data.code === 200)
            this.testdata = res.data.data;
          // 在这里将后台返回的列表头数er据直接放到之前定义好的header数组中
          this.approvetableDataheader = this.testdata[1];
          this.approvetableData = this.testdata[0];
          if (this.approvetableData.length === 0) {
//              this.$message.warning("该工单下暂无审批信息！");
            return;
          }
          this.approveDialog = true;
        });
      }
    },
    //给列渲染样式
    addClass({row, column, rowIndex, columnIndex}) {
      if (column.label == "审核状态") {
        return 'cell-blue';
      }
    },
    //颜色判断
    colorJudge(row) {
      var isRed = "";
      if (row.matterproDownValue == "" || row.matterproUpValue == "") {
        isRed = false
      }
      if (row.matterproUpValue != null && row.matterproDownValue != null && row.matterproUpValue != "") {
        if (row.matterproValue > row.matterproUpValue) {
          isRed = true;
          this.valueIsRed = true;
        } else if (row.matterproDownValue != "") {
          if (row.matterproValue < row.matterproDownValue) {
            isRed = true;
            this.valueIsRed = true;
          }
        }
      } else if (row.matterproDownValue != "") {
        if (row.matterproValue < row.matterproDownValue) {
          isRed = true;
          this.valueIsRed = true;
        }
      }
      return isRed;
    },
    //确认提交
    handleSubmit() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      } else {
        var codes = '';
        this.selectionList.forEach(item => {
          if (item.auditStatus === '1' || item.auditStatus === '0') {
            for (var i = 0; i < this.selectionList.length; i++) {
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
            this.onLoad(this.page);
            if (data.data.data) {
              this.$message({
                type: "success",
                message: "提交成功!",
              });
            } else {
              this.$message({
                type: "errow",
                message: "提交失败!",
              });
            }
          });
        })
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
      reject(codes).then((data) => {
        this.onLoad(this.page);
        if (data.data.data) {
          this.$message({
            type: "success",
            message: "驳回成功!",
          });
        } else {
          this.$message({
            type: "errow",
            message: "驳回失败!",
          });
        }
      });
    },
    //审批
    handleApprove() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      } else {
        this.approve = true;
      }
    },
    //审批弹窗关闭
    approveclose() {
      this.approve = false;
    },
    //审批确认
    approveok() {
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
        searchStatusByMateriel(codes, 2, this.approveMsg).then((data) => {
          this.approveclose();
          this.onLoad(this.page);
          if (data.data) {
            this.$message({
              type: "success",
              message: "审批成功!",
            });
          } else {
            this.$message({
              type: "errow",
              message: "审批失败!",
            });
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
        this.onLoad(this.page);
        if (data.data.data) {
          this.$message({
            type: "success",
            message: "作废成功!",
          });
        } else {
          this.$message({
            type: "errow",
            message: "作废失败!",
          });
        }
      });
    },
    //根据工单查看详情
    handleSearch() {
      if (this.selectionList.length === 1) {
        this.approveDialog = true;
        approvalDetail(this.selectionList[0].wkId).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          if (res.data.code === 200)
            this.testdata = res.data.data;
          // 在这里将后台返回的列表头数er据直接放到之前定义好的header数组中
          this.approvetableDataheader = this.testdata[1];
          this.approvetableData = this.testdata[0];
        });
      } else {
        this.$message.warning("只能选择一条数据查看详情");
        return;
      }
    },
    //关闭详情弹窗
    approvehandleClose() {
      this.approveDialog = false;
    },
    //获取装置信息
    searchDevice() {
      searchDevice().then((res) => {
        this.devicelist = res.data.data;
      });
    },
    //修改装置数据
    changedevice(val) {
      this.sampleId = '';
      this.materielId = '';
      this.searchSampleByDevice(val);
      this.searchMaterielByDevice(val);
    },
    //根据装置查询物料
    searchMaterielByDevice(deviceId) {
      searchMaterielByDevice(deviceId).then((res) => {
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
      // this.materielId='';
      // this.searchMaterielBySampleAndDevice(this.deviceId,val);
    },
    //根据装置和采样点
    searchMaterielBySampleAndDevice(deviceId, sampleId) {
      searchMaterielBySampleAndDevice(deviceId, sampleId).then((res) => {
        if (res.data.code === 200)
          this.materiellist = res.data.data;
      });
    },
    //加载表格前调用
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then((res) => {
          this.form = res.data.data;
        });
      }
      done();
    },
    //搜索条件清空
    searchReset() {
      this.deviceId = '';
      this.sampleId = '';
      this.materielId = '';
      this.query = {};
      this.onLoad(this.page);
    },
    //搜索查询
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
    //选中之后按钮是否展示
    selectionChange(list) {
      console.log(list)
      this.selectionList = list;
      if (this.selectionList.length > 0) {
        this.selectionList.forEach(item => {
          if (item.auditStatus === '1' || item.auditStatus === '0') {
            this.visibleApprove = "none";
            this.visibleReject = "none";
          } else {
            this.visibleSubmit = "none";
            this.visibleCancel = "none";
          }
        })
      } else {
        this.visibleSubmit = "";
        this.visibleApprove = "";
        this.visibleReject = "";
        this.visibleCancel = "";
      }
    },
    //取消选中
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    //当前页
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      let table = document.getElementsByClassName('el-table--scrollable-y')[0]
      let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
      // table.scrollTop = 0
      // tableBody.scrollTop = 0
    },
    //修改页数
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    //刷新表格
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    //上表的重新加载
    onLoad(page, params = {}) {
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        if (res.data.code != 200){
          return errorMsgbox(this,res.data.msg)
        }
        const data = res.data.data;
        this.page.total = data.total;
        data.records.forEach(item => {
          item.id = item.wkId
        })
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
        if (this.data.length > 0) {
          this.$refs.crud.setCurrentRow(this.data[0]);//左侧列表默认选中第一行
          this.onLoadSelectmatterpro(this.data[0].wkId);
        } else {
          this.data1 = []
        }
      });
    },
    //上边表格的行点击事件
    handleSelectmatterpro(row) {
      this.exportid = row.wkId;
      this.onLoadSelectmatterpro(row.wkId);
      this.selectionClear();
      this.$refs.crud.toggleSelection([row]);
    },
    //修改了下表的分析值后触发
    handleEdit(index, row) {
      this.valueIsRed = false;
      var reg1 = new RegExp(/^([1-9]\d*(\.\d+)?|0\.\d+)$/);
      var reg2 = new RegExp(/^[1-9]\d*$/);
      var flag1 = reg1.test(row.matterproValue);
      var flag2 = reg2.test(row.matterproValue);
      if (flag1 || flag2 || row.matterproValue == "" || row.matterproValue == "0" || row.matterproValue < 0) { //满足正整数或正浮点数
        //判断正则--未完成
        var selectedunitId = '';
        for (let item of row.units) {
          if (item.MATTERPRO_UNIT == row.matterproUnit) {
            selectedunitId = item.MATTERPROUNITID;
          }
        }
        updateAnalysisDisValue(row.wkId, row.matterproCode, selectedunitId, row.matterproValue).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          if (res.data.code === 200)
            this.onLoadSelectmatterpro(row.wkId);
        });
      } else {
        //非数字清空当前值
        row.matterproValue = '';
        this.$message.warning("请输入合法数字");
        this.onLoadSelectmatterpro(row.wkId);
        return;
      }
    },
    //更新物性单位id后动态渲染分析值
    getValue(index, row) {
      var selectedunitId = '';
      for (let item of row.units) {
        if (item.MATTERPRO_UNIT == row.matterproUnit) {
          selectedunitId = item.MATTERPROUNITID;
        }
      }
      getAnalysisUnitValue(row.wkId, row.matterproCode, selectedunitId).then(res => {
        if (res.data.code != 200){
          return errorMsgbox(this,res.data.msg)
        }
        this.$set(this.data1[index], 'matterproValue', res.data.data[0].MATTERPRO_VALUE);
        this.onLoadSelectmatterpro(row.wkId);
      });
    },
    //加载下方表格
    onLoadSelectmatterpro(wkid) {
      onLoadSelectmatterpro(wkid).then((res) => {
        this.valueIsRed = false;
        this.data1 = res.data.data;
        if (this.data1.length > 0) {
          for (var i = 0; i < this.data1.length; i++) {
            this.$set(this.data1[i], 'editunit', true);
            this.$set(this.data1[i], 'editvalue', true);
          }
        } else {
          this.data1 = []
        }
      });
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
    //修改添加状态
    changeedit(flag, row) {
      if (flag == 1) {
        this.$set(row, "editunit", false);
        // this.$nextTick(() => {
        //   this.$refs[`customerSelect`].focus()
        // })
      } else if (flag == 2) {
        this.$set(row, "editvalue", false);
        //需要解决  获取焦点事件  to yuhj
        //this.$refs.customerInput.$el.querySelector('input').focus();
        this.$nextTick(() => {
          // this.displayStyle='none';
          this.$refs[`customerInput`].focus()
        })
      }
    },
  },
  components:{
    PaginationVue
  }
};
</script>

<style scoped="scoped" lang="scss">
@import url('../../styles/media-double.scss');

::v-deep .el-table__header-wrapper {
  height: 35px;
}

/deep/ .bottomCardStyle {
  padding: 0px 6px 10px 6px;
}

/deep/ .cell-blue {
  color: blue !important;
  cursor: pointer;
  display: flex;
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

/deep/ .avue-form__menu--left {
  margin-left: 0 !important;
}

/deep/ .el-collapse-item:last-child {
  margin-bottom: -14px;
}

/deep/ .tableInner .el-input .el-input--mini > .el-input__inner {
  height: 23px !important;
  line-height: 23px !important;
}


</style>
