<template>
  <div id="scheme" v-loading="load" element-loading-text="切割计算中,请稍候..." element-loading-spinner="el-icon-loading">
    <el-row>
      <el-col :span="8">
        <basic-container>
          <div style="margin-bottom: 15px">
            <el-input placeholder="输入方案名称" v-model="searchname" size="small" style="width:46%;">
              <el-button slot="append" icon="el-icon-search" @click="handleSearchSchema"></el-button>
            </el-input>
            <el-button size="small" type="primary" icon="el-icon-plus" style="margin-left: 10px;" @click="handleAdd">
              添 加
            </el-button>
            <el-button
              style="float: right;margin-top: 1px;"
              type="danger"
              size="small"
              icon="el-icon-delete"
              plain
              @click="handleUpDelete"
            >删 除
            </el-button>
            <el-dialog

              :modal="modelShow"
              :visible.sync="editDialog"
              center
              :append-to-body="true"
              :show-close="true"
              width="55%">
              <iframe :src="iframeurl" frameborder="0" :style="iframeHeight"></iframe>
            </el-dialog>
            <el-dialog
              title="PIMS报告预览"
              ref="ReportConfig"
              :close-on-click-modal='false'
              :visible.sync="reportConfigureIt"
              :append-to-body="true"
              width="75%">
              <div style='text-align: right; margin-bottom: 20px; margin-top: -73px; margin-right: 40px'>
                <el-button type="primary" @click="downloadExcel">
                  <img src="../../../public/icon/ic_excel.png" style="margin-right: 5px;">
                  导 出
                </el-button>
              </div>
              <div style='width: 100%;text-align: center; '>
                <iframe :src="srcdoc" frameborder="0" :style=styObj></iframe>
              </div>
            </el-dialog>

          </div>
          <el-table :data="schemadata" size="small" border :header-cell-style="{'text-align':'center'}"
                    @row-click="selectOneSchema"
                    :cell-style="{'text-align':'center'}" style="width: 100%" highlight-current-row :height=tableheight>
            <el-table-column type="index" label="序号" header-align="center" width="45"></el-table-column>
            <el-table-column prop="schemeName" label="方案名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="schemeType" label="方案类型" min-width="70" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <span v-if="row.schemeType==1">PIMS</span>
                <span v-if="row.schemeType==2">RSIM</span>
              </template>
            </el-table-column>
            <el-table-column prop="isDeleted" label="有效性" min-width="60" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <span v-if="row.isDeleted==0">有效</span>
                <span v-if="row.isDeleted==1">无效</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <img src="../../../public/icon/btn_Pencil.png" @click="handleEdit(row)"
                     style="cursor: pointer;vertical-align: text-top;">
                <img v-if="row.icon" src="../../../public/icon/btn_kaishi.png" @click="selectoil($index,row)"
                     style="margin-left: 5px;cursor: pointer;vertical-align: text-top;">
                <img v-else src="../../../public/icon/ic_bofang.gif"
                     style="margin-left: 5px;vertical-align: text-top;">
              </template>
            </el-table-column>
          </el-table>
        </basic-container>
      </el-col>
      <el-col :span="16">
        <el-row>
          <basic-container>
            <div style="display: flex;height:36px">
              <div style="display: inline-block;line-height: 36px;width: 55px;">原 油：</div>
              <div class="tab-control">
                <div v-for="(item , index) in oilname" class="tab-control-item" :key="item"
                     :class="{active: index ===  currentIndex}" @click='itemClick(index)'>
                  <div>{{ item }}</div>
                </div>
              </div>
            </div>
          </basic-container>
        </el-row>
        <el-row>
          <basic-container>
            <div style="margin-bottom: 15px">
              <el-radio-group v-model="radio" size="small" :disabled=oilcodedisable @change="changeradio">
                <el-radio-button :label="1">馏分段</el-radio-button>
                <el-radio-button :label="2">轻端</el-radio-button>
                <el-radio-button v-if="selectedschema.schemeType==2" :label="3">石脑油</el-radio-button>
              </el-radio-group>
              <el-button v-if="selectedschema.schemeType==1" size="small" type="primary" style="margin-left: 2ex"
                         @click="exportFile" :disabled=oilcodedisable>
                <img src="../../../public/icon/ic_excel.png" style="margin-right: 5px;">
                导 出
              </el-button>
              <el-button v-if="selectedschema.schemeType==2" size="small" type="primary" style="margin-left: 2ex"
                         @click="exportXmlFile" :disabled=oilcodedisable>
                <img src="../../../public/icon/ic_xml.png" style="margin-right: 5px;">
                导 出
              </el-button>
            </div>
            <div v-show="radio==1">
              <el-table :data="sectiondata" size="small" border :header-cell-style="{'text-align':'center'}"
                        ref="sectiontable"
                        :cell-style="{'text-align':'center'}" style="width: 100%" highlight-current-row
                        :height=tableheightleft>
                <template v-if="sectioncolumn.length!=0">
                  <el-table-column
                    v-for="(item,index) in sectioncolumn"
                    :fixed="index==0 || index==1"
                    :width="index==0?50:'' || index==1?110:''"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    align="center">
                    <template slot="header" slot-scope="scope">
                      <span>{{ item.label }}</span> <br> <span>{{ item.unit }}</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </div>
            <div v-show="radio==2">
              <el-table :data="lightdata" size="small" border :header-cell-style="{'text-align':'center'}"
                        ref="lighttable"
                        :cell-style="{'text-align':'center'}" style="width: 100%" highlight-current-row
                        :height=tableheightleft>
                <template v-if="lightcolumn.length!=0">
                  <el-table-column
                    v-for="(item,index) in lightcolumn"
                    :fixed="index==0"
                    :width="index==0?50:''"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    align="center">
                  </el-table-column>
                </template>
              </el-table>
            </div>
            <div v-show="radio==3">
              <el-table :data="naphthadata" size="small" border :header-cell-style="{'text-align':'center'}"
                        ref="naphthatable"
                        :cell-style="{'text-align':'center'}" style="width: 100%" highlight-current-row
                        :height=tableheightleft>
                <template v-if="naphthacolumn.length!=0">
                  <el-table-column
                    v-for="(item,index) in naphthacolumn"
                    :fixed="index==0"
                    :width="index==0?50:''"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    align="center">
                  </el-table-column>
                </template>
              </el-table>
            </div>
          </basic-container>
        </el-row>
      </el-col>
    </el-row>

    <!--原油弹出框-->
    <el-dialog title="原油选择" :visible.sync="oildialogopen" class='oil' :append-to-body="true" width="55%"
               @close="oildialogclose" >
      <div style="margin-top: -10px">
        <div style="margin-bottom: 15px">
          原油名称：
          <el-input type="text" size="small" v-model="searchoilname" style="width: 20%"></el-input>
          <el-button size="small" type="primary" icon="el-icon-search" @click="handleOilSearch"
                     style="margin-left: 2ex">
            查 询
          </el-button>
        </div>
        <el-table :data="oillist" ref="oillist" border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                  size="small" @selection-change="selectoilList" @sort-change="sortChange" :height="390">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="名称" prop="cnName" show-overflow-tooltip sortable='custom'></el-table-column>
          <el-table-column label="来源" width="100" prop="datasource" sortable='custom'
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="评价时间" width="150" prop="oilDate" sortable='custom'
                           show-overflow-tooltip></el-table-column>
          <el-table-column label="密度" width="100" prop="d20" sortable='custom' show-overflow-tooltip></el-table-column>
          <el-table-column label="硫含量" width="100" prop="sul" sortable='custom' show-overflow-tooltip></el-table-column>
          <el-table-column label="酸值" width="100" prop="tan" sortable='custom' show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer" :center="true">
        <el-button style="margin-top: 12px;" plain @click="oildialogclose">取消</el-button>
        <el-button style="margin-top: 12px;" type="primary" :disabled="!this.cutForbit" @click="oilcut">切割</el-button>
      </span>
    </el-dialog>

    <!--点击添加或修改的弹出框-->
    <el-dialog :title=dialogtitle :visible.sync="dialogopen" :append-to-body="true" width="1040px" @close="close()">
      <div style="height: 400px">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="侧线信息"></el-step>
          <el-step title="关系匹配"></el-step>
          <el-step title="配置报表"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <!--步骤1的方案添加信息-->
        <div class="info" v-if="active==0">
          <el-form label-position="right" ref="form" :model="form" :rules="rulesform" label-width="120px">
            <el-form-item label="方案名称：">
              <el-input placeholder="请输入方案名称" style="width: 50%" v-model="form.schemeName" id="schemeNameF"
                        @blur="checkNameNull"></el-input>
            </el-form-item>
            <el-form-item label="方案类型：">
              <el-radio-group v-model="form.schemeType">
                <el-radio label="1" :disabled="dialogtitle=='修改方案'">PIMS</el-radio>
                <el-radio label="2" :disabled="dialogtitle=='修改方案'||dialogtitle=='添加方案'">RSIM</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="备注：">
              <el-input placeholder="请输入备注" :rows="5" style="width: 50%" type="textarea" v-model="form.note"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--步骤2的侧线信息信息-->
        <div class="info" v-if="active==1">
          <el-row :gutter="30">
            <el-col :span="12">
              <el-row>
                <!--放按钮-->
                <el-button size="small" type="primary" icon="el-icon-plus" @click="handleTwoLeftAdd">
                  插 入
                </el-button>
                <span style="margin-left: 10%;color: red;">{{ errorMessageTip }}</span>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-table
                  :data="leftdata" ref="leftTwoTable" size="small" border height="300"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}"
                  :row-class-name="rowClassName" highlight-current-row
                  @row-click="lefttableclick" style="height: 295px">
                  <el-table-column prop="sidingName" label="侧线名称" show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <el-input size="mini" v-if="!row.edit" v-model="row.sidingName" type="input"></el-input>
                      <span v-else>{{ row.sidingName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sidingCode" label="侧线编码" width="110" show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <el-input size="mini" v-if="!row.edit" v-model="row.sidingCode" type="input"></el-input>
                      <span v-else>{{ row.sidingCode }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sidingIvt" label="初馏点" width="80" show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <el-input size="mini" v-if="!row.edit" v-model="row.fractionIvt" type="input"></el-input>
                      <span v-else>{{ row.fractionIvt }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sidingFvt" label="终馏点" width="80" show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <el-input size="mini" v-if="!row.edit" v-model="row.fractionFvt" type="input"></el-input>
                      <span v-else>{{ row.fractionFvt }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作"show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <i class="el-icon-edit" @click="handleTwoLeftEdit($index, row)"
                         style="cursor: pointer;font-size: 15px;color: #409EFF" v-if="row.edit"></i>
                      <i class="el-icon-delete" @click="handleTwoLeftDelete($index, row)"
                         style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px" v-if="row.edit"></i>
                      <i class="el-icon-check" @click="handleTwoLeftSave($index, row)"
                         style="cursor: pointer;font-size: 15px;color: #409EFF" v-if="!row.edit"></i>
                      <i class="el-icon-close" @click="handelTwoLeftCancel($index, row)"
                         style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px" v-if="!row.edit"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-button size="small" type="primary" icon="el-icon-plus" @click="handleTwoRightAdd">
                  添 加
                </el-button>
                <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleTwoRightDelete">
                  删 除
                </el-button>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-table
                  :data="rightdata" ref="rightTwodata" size="small" border max-height="300"
                  :header-cell-style="{'text-align':'center'}"
                  class="tb-edit dropTable" style="height: 300px;"
                  :cell-style="{'text-align':'center'}" @selection-change="handleChange" row-key="matterproCode"
                  :row-class-name="rightRowClassName"
                  highlight-current-row :height="tableHeight">
                  <el-table-column type="selection" width="55" style="font-size: 12px"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column type="index" label="序号" header-align="center" width="50"
                                   show-overflow-tooltip></el-table-column>
                  <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <el-select size="mini" filterable v-model="row.matterproCode" placeholder="请选择物性"
                                 @change="getValue($index,row)">
                        <el-option
                          v-for="item in materprolist"
                          :key="item.matterproCode"
                          :label="item.matterproName"
                          :value="item.matterproCode">
                        </el-option>
                      </el-select>
                      <span style='color: blue'>{{ row.matterproName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <span>{{ row.matterproCode }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="matterproUnit" label="物性单位" width="70" show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <span>{{ row.matterproUnit }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="flag" label="是否有效" width="70" show-overflow-tooltip>
                    <template slot-scope="{row,$index}">
                      <span v-if="row.flag=='0'">有效</span>
                      <span v-else>无效</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <!--步骤3的关系匹配-->
        <div class="info" v-if="active==2">
          <div style="margin-bottom: 15px;display: flex;">
            <el-button type="primary" size="small" icon="el-icon-check" @click="thirdSelectAll(1)">
              选 中
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-minus" @click="thirdSelectAll(2)">
              取 消
            </el-button>
            <el-button type="primary" size="small" @click="thirdSelectAll(3)">
              <img src="../../../public/icon/ic_xing2.png" style="margin-right: 5px;">
              星 号
            </el-button>
          </div>
          <!--          @header-dragend='headerChange'-->
          <!--          row-key='matterproCode'-->
          <el-table
            :data="thirdtableData" size="small" @selection-change="thirdhandleChange" ref="thirdtable"
            border class="tb-edit"
            @cell-click="cellclick"
            :row-class-name="tableRowClassName" :height="tableHeight">
            <el-table-column type="selection" align="center" width="55">
            </el-table-column>

            <el-table-column align="center" v-for="(col,index) in cols" :key="index"
                             :prop="col.prop" :label="col.label" :fixed="index==0||index==1||index==2"
                             :width="index==0?60:'' || index==1?120:'' || index==2?100:120" show-overflow-tooltip>
              <template slot-scope="scope" slot="header">
                <span v-if="col.prop=='SIDING_NAME'">
                  {{ col.label }}
                </span>
                <span v-else-if="col.prop=='XH'">
                  {{ col.label }}
                </span>
                <span v-else-if="col.prop=='SIDING_CODE'">
                  {{ col.label }}
                </span>
                <span v-else>
                  {{ col.label }}&nbsp;&nbsp;
                  <el-checkbox :v-model="col.prop" @change="testchange(scope.column)"></el-checkbox>
                </span>
              </template>
              <template slot-scope="scope">
                <span v-if="col.prop=='SIDING_NAME'">
                  {{ scope.row[scope.column.property] }}
                </span>
                <span v-else-if="col.prop=='XH'">
                  {{ scope.row[scope.column.property] }}
                </span>
                <span v-else-if="col.prop=='SIDING_CODE'">
                  {{ scope.row[scope.column.property] }}
                </span>
                <span v-else v-html="scope.row[scope.column.property]">
                </span>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <!--步骤4的配置报表-->
        <div class="info" v-if="active==3">
          <div style="margin-bottom: 15px">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleFourAdd">
              添 加
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" plain @click="handleFourDelete">
              删 除
            </el-button>
          </div>
          <!--          max-height="295px" height="295px"-->
          <el-table
            :data="fourthtabledata" ref="fourthtable" size="small"
            border class="tb-edit"
            @selection-change="handleFourChange"
            highlight-current-row :height="tableHeight">
            <el-table-column type="selection" align="center" width="80"></el-table-column>
            <el-table-column :resizable="false" type="index" align="center" label="序号" width="50">
            </el-table-column>
            <el-table-column type="matterproName" align="center" label="物性名称" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <el-select size="small" id="codeedit" filterable
                           v-model="row.matterproCode" placeholder="请选择物性" @change="fourthValue($index,row)">
                  <el-option
                    v-for="item in materprolist"
                    :key="item.matterproCode"
                    :label="item.matterproName"
                    :value="item.matterproCode">
                  </el-option>
                </el-select>
                <span>{{ row.matterproName }}</span>
              </template>
            </el-table-column>
            <el-table-column type="matterproCode" label="物性编码" width="100" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                {{ row.matterproCode }}
              </template>
            </el-table-column>
            <el-table-column type="matterproUnit" label="单位" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                {{ row.matterproUnit }}
              </template>
            </el-table-column>
            <el-table-column type="fractionIvt" label="初馏点" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <el-input v-if="row.ivtedit" size="small" v-model="row.fractionIvt" id="ivtedit"
                          @blur="saveValue(row,2)" placeholder="请输入初馏点"></el-input>
                <span v-else @click="changeCode(row,2)">{{ row.fractionIvt }}</span>
              </template>
            </el-table-column>
            <el-table-column type="fractionFvt" label="终馏点" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <el-input v-if="row.fvtedit" size="small" v-model="row.fractionFvt" id="fvtedit"
                          @blur="saveValue(row,3)" placeholder="请输入终馏点"></el-input>
                <span v-else @click="changeCode(row,3)">{{ row.fractionFvt }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--步骤5的配置报表-->
        <div class="info2" v-if="active==4">
          <img src="../../../public/img/complte.png" style="margin-left: 300px;">
          <span style="height: 118px;line-height: 118px;font-size: 30px;margin-left: 20px;color: #A4DA89">
            配置完成！
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" :center="true">
        <el-button style="margin-top: 12px;" @click="pre" v-if="active>0&&active<5">上一步</el-button>
        <el-button style="margin-top: 12px;" type="primary" @click="next" v-if="active<4" id="isdisplayxib1"
                   v-html="isdisplayxib1" :disabled="nextDisable">下一步</el-button>
        <el-button style="margin-top: 12px;" type="primary" @click="next" v-if="active==4" v-html="content"
                   id="isdisplayxib"></el-button>
      </span>
    </el-dialog>
  </div>


</template>

<script>
import Sortable from 'sortablejs'
import {errorMsgbox} from "@/api/global_variable";

import {
  getList,
  add,
  searchOil,
  addSchemeSiding,
  deleteSidingScheme,
  deleteSidingSchemeMatterpro,
  selectSidingSchemeMatterpro,
  searchSchemeSidingById,
  submitSidingSchemeMatterpro,
  cutResult,
  getOutputInfo,
  saveOutputInfo,
  selectSinglepointcut,
  saveSinglepointcut,
  deleteSinglepointcut,
  searchcutresultmainDetail,
  handleUpDelete,
  updateSchemeIsDeleted0,
  updateSchemeIsDeleted1,
  sortedByCnName,
  sortedByDataSource,
  sortedByOilDate,
  sortedByD20,
  sortedBySUL,
  sortedByTAN,
  saveSchemeSidingMatterpro,
  submitAndSelectSchemeSiding
} from "@/api/qccut/scheme";
import {selectMatterproBySort} from "@/api/qccut/siding";
import $ from "jquery";
import {
  reportConfigure
} from "@/api/qcduty/workoilassess";
import {downloadXml} from "../../api/qccut/cutresultmain";

const thirdsaveData = new Map();
export default {
  name: '/qccut/scheme_old',
  data() {
    return {
      isdisplayxib1: "下一步",
      errorMessageTip: "",
      nextDisable: false,//禁用下一步
      rulesform: {
        schemeName: [{required: true, message: '请输入方案名称', trigger: 'blur'}]
      },
      iframeShow: false,
      iframeHeight: "",
      iframeurl: "",
      modelShow: "",
      styObj: {},
      srcdoc: "",
      setHeight: 0,
      editDialog: false,
      reportConfigureIt: false,
      radio: 1,//轻端等按钮的默认选择
      tableheight: 0,//右侧表格高度
      tableheightleft: 0,//左侧表格高度
      searchname: '',//查询方案名称
      schemadata: [],//方案名称数组
      schemeindex: 0,//选中的方案的位置
      sidingdata: [],//切割方案数据
      dialogtitle: '新增方案',//弹窗的表头
      dialogopen: false,//弹窗的默认状态
      oildialogopen: false,//原油弹窗状态
      active: 0,//步骤条
      form: {
        schemeId: '',
        schemeName: '',
        schemeType: '',
        note: '',
      },//方案修改保存数据
      form1: {
        schemeId: 0,
        schemeName: '',
        schemeType: '1',
        note: '',
      },//方案清空已复制数据时使用
      leftdata: [],//左侧侧线表数据
      selectedschema: [],//选中的方案
      oilname: [],//选择的原油名称
      currentIndex: 0,//当前默认选中的原油
      searchoilname: '',//查询的原油名称
      selectedoillist: [],//选中的原油列表
      oillist: [],//原油列表
      oilcodelist: [],//原油编码列表
      oilcodedisable: true,//原油编码是否可编辑
      rightdata: [],//右侧关联的物性表数据
      materprolist: [],//物性列表
      selectsiding: [],//行选中的侧线
      malist: [],//物性列表选择集合
      adddata: {
        "schemeId": 0,
        "schemesidingId": 0,
        "sidingName": '',
        "sidingCode": '',
        "fractionIvt": '',
        "fractionFvt": '',
      },//模拟切割第二步新增测线时默认数据
      oilid: '',//原油的id
      cols: [
        {
          label: "序号",
          prop: "XH"
        },
        {
          label: "侧线名称",
          prop: "SIDING_NAME"
        },
        {
          label: "侧线编码",
          prop: "SIDING_CODE"
        }
      ],//模拟切割第三步的表头数据
      dropCol: [
        {
          label: "序号",
          prop: "XH"
        },
        {
          label: "侧线名称",
          prop: "SIDING_NAME"
        },
        {
          label: "侧线编码",
          prop: "SIDING_CODE"
        }],
      thirdtableData: [],//第三步表格渲染数据
      thirdnowData: [],//第三步的保存数据
      thirdselectXH: [],//第三步行选中的id
      columnproperty: [],//第三步列头
      fourthtabledata: [],//第四步的表格数据
      fourselectdata: [],//第四步选中数据
      sectiondata: [],//馏分段数据
      sectioncolumn: [],//馏分段列
      lightdata: [],//轻端数据
      lightcolumn: [],//轻端列
      naphthadata: [],//石脑油数据
      naphthacolumn: [],//石脑油列
      oilids: '',//原油id
      cutresultmainId: 0,//原油切割完成后返回的id
      content: '完成',//第五步按钮展示的文字
      totalTime: 5,//倒计时的时间
      canClick: true, //添加canClick
      clock: '',//定义一个时间参数，用于倒计时使用
      load: false,
      pageInfo: { //分页配置
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      },
      cutForbit: false, //禁用切割
      objjson: {
        "wk_id": "",
        "cutresult_id": "173",
        "name": "",
        "code": "",
        "fileName": "simple",
        "fileType": "2"
      },
      tableHeight: ''
    }
  },
  beforeMount() {//动态获取窗口高度用于自适应
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    this.tableheight = h - 192;
    this.iframeHeight = "width:100%;height:" + (h * 0.5) + "px;";
    this.tableheightleft = h - 263;
    this.setHeight = "height:" + (h - 300) + "px;";
  },
  created() {
    this.tableHeight = '';
  },
  mounted() {
    //加载左侧方案列表
    this.onLoad();
    //加载物性列表
    this.selectMatterproBySort();
  },
  computed: {
    //第二步已选择的物料信息列表
    maids() {
      let ids = [];
      this.malist.forEach(ele => {
        ids.push(ele.sidingmatterproId);
      });
      return ids.join(",");
    },
    //第四部选择的物性头部信息列表
    fourids() {
      let ids = [];
      this.fourselectdata.forEach(ele => {
        ids.push(ele.configId);
      });
      return ids.join(",");
    },
  },
  methods: {
    tableListen() {
      let that = this;
      that.$nextTick(() => {
        console.log(that.$refs.oillist);
        let tableDom = that.$refs.oillist.bodyWrapper;
        tableDom.addEventListener('scroll', () => {
          let distance = tableDom.scrollHeight - tableDom.scrollTop - tableDom.clientHeight;
          if (distance<=0){
            that.scrollChange(tableDom);
            // alert('到底了，执行下一页数据请求！！！');
          }
        })
      })
    },
    scrollChange(tableDom) {
      //滚动条与页面高度
      let scrollTop = tableDom.scrollTop;
      //可视化区域高度
      let curHeight = tableDom.clientHeight;
      //页面总高度
      let totalHeight = tableDom.scrollHeight;
      if (scrollTop + curHeight >= totalHeight) {
        for (let i = 0; i < this.pageInfo.total / this.pageInfo.pageSize + 1; i++) {
          this.pageInfo.pageIndex++
          this.searchOil(1);
        }
      }
      console.log(scrollTop, curHeight, totalHeight);
    },

    //检查名字不为空
    checkNameNull() {
      if (this.form.schemeName.length == 0 || this.form.schemeName == '') {
        this.nextDisable = true;
      } else {
        this.nextDisable = false;
      }
    },
    downloadExcel() {
      var elemIF = document.createElement('iframe')
      elemIF.src = 'http://localhost:1881/temp/DetailReportSample20210607133154_temp.xlsx'
      elemIF.src = this.srcdoc.replace(/html/, "xlsx")
      console.log(elemIF.src)
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF);
    },
    sortChange(val) {
      switch (val.prop) {
        case 'cnName':
          sortedByCnName().then(res => {
            this.oillist = res.data
          })
          break;
        case 'datasource':
          sortedByDataSource().then(res => {
            this.oillist = res.data
          })
          break;
        case 'oilDate':
          sortedByOilDate().then(res => {
            this.oillist = res.data
          })
          break;
        case 'd20':
          sortedByD20().then(res => {
            this.oillist = res.data
          })
          break;
        case 'sul':
          sortedBySUL().then(res => {
            this.oillist = res.data
          })
          break;
        case 'tan':
          sortedByTAN().then(res => {
            this.oillist = res.data
          })
          break;
      }
    },
    rowDrop() {
      const tbody = document.querySelector('.dropTable .el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({newIndex, oldIndex}) {
          const currRow = _this.rightdata.splice(oldIndex, 1)[0];

          _this.rightdata.splice(newIndex, 0, currRow)
          saveSchemeSidingMatterpro({SchemeSidingMatterpro: _this.rightdata}).then(res => {
            console.log(res)
          })
          _this.$refs.rightTwodata.doLayout();
        }
      })
    },
    //侧线方案删除
    handleUpDelete() {
      if (this.selectedschema.schemeId == undefined || this.selectedschema.schemeId == '') {
        this.$message.warning("请选择一条数据");
        return;
      }

      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        handleUpDelete(this.selectedschema.schemeId).then(() => {
          this.$message.success("删除成功！");
          this.onLoad();
        })
      })
    },
    //原油列表的点击事件(原油ID)
    itemClick(index) {
      this.currentIndex = index;//
      this.$emit('tabClick', index);
      //根据原油ID加载下方详情列表
      this.searchcutresultmainDetail(this.selectedoillist[index].oilId);
    },
    //加载方案列表
    onLoad() {
      this.loading = true;
      //加载方案列表(方案名称模糊匹配)
      getList(this.searchname).then(res => {
        if (res.data.code != 200){
          return errorMsgbox(this,res.data.msg)
        }
        this.schemadata = res.data;
        for (var i = 0; i < this.schemadata.length; i++) {
          this.$set(this.schemadata[i], 'icon', true);
        }
      });
    },
    //名称模糊查询方案
    handleSearchSchema() {
      //加载方案列表
      this.onLoad();
    },

    // 导出
    exportFile() {

//        document.getElementById("pimsdiv").innerHTML="";
      this.reportConfigureIt = true;
      var cutresult_id = this.cutresultmainId;
      this.$set(this.objjson, "cutresult_id", cutresult_id);
      this.$set(this.objjson, "reportType", "3");
      // this.$set(this.objjson,"wk_id",this.rowData.wkId);
      this.styObj = {
        width: '95%',
        height: window.innerHeight * 0.65 + 'px'
      }
      reportConfigure(JSON.stringify(this.objjson)).then((res) => {
        //console.log(res.data);
        if (res.data.code === 200) {
          this.srcdoc = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        //document.getElementById("testdiv").appendHTML("");
//          document.getElementById("pimsdiv").appendHTML(res.data);

      })

      /*
       this.editDialog = true;
       var cutresult_id = this.cutresultmainId ;
       var datetime = "202012181314" ;
       var rpx_name='PIMS报告.rpx';
       var name_param="PIMS报告";
       var baseurl = "" ;
       getBaseurl().then((res) => {
         console.log("baseUrl======="+res.data.baseUrl)
         baseurl = res.data.baseUrl ;
         this.iframeurl = baseurl+encodeURIComponent(rpx_name)+"&CUTRESULT_ID=" + cutresult_id +
           "&name_param="+encodeURIComponent(name_param)+"&istoolbarvisual=no";
       });*/
    },

    /**
     * 导出xml文件
     */
    exportXmlFile() {
      this.selectedoillist.forEach(item => {
        downloadXml(item.oilId, this.selectedschema.schemeId).then(res => {
          const content = res.data;
          const blob = new Blob([content], {type: 'application/xml'});
          let fileName = window.decodeURI(item.cnName, "UTF-8");
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
      })
    },

    headerChange() {
      this.$refs.thirdtable.doLayout()
    },


    //选中一行数据之后
    selectOneSchema(row) {
      this.selectedschema = row;
      this.oilcodedisable = true;
      //清空右侧原油名称
      this.oilname = [];
      //表格数据
      this.sectiondata = [];//馏分段数据
      this.sectioncolumn = [];//馏分段列
      this.lightdata = [];//轻端数据
      this.lightcolumn = [];//轻端列
      this.naphthadata = [];//石脑油数据
      this.naphthacolumn = [];//石脑油列
    },
    //添加方案
    handleAdd() {
      this.active = 0;//步骤信息
      this.dialogtitle = '新增方案';//弹窗标题
      this.dialogopen = true;//打开弹窗
      if (this.form.length != 0) {
        this.form.schemeId = 0;
        this.form.schemeName = '',
          this.form.schemeType = '1',
          this.form.note = ''
      } else {
        this.form = this.form1;//新增时清空重新赋值
      }
      this.checkNameNull();
      this.$nextTick(function () {
        var oInput = document.getElementById("schemeNameF");
        oInput.focus();
      })
    },
    //修改方案
    handleEdit(row) {
      this.nextDisable = false;
      this.active = 0;
      this.selectedschema = row;
      this.dialogtitle = '修改方案';//弹窗标题
      // this.form = this.selectedschema;//选中方案信息的回显
      this.form.schemeId = row.schemeId;
      this.form.schemeName = row.schemeName;
      this.form.schemeType = row.schemeType;
      this.form.note = row.note;
      this.dialogopen = true;//打开弹窗
    },
    //原油切割
    oilcut() {
      //对于选中的原油数据进行切割，默认选中第一条原油数据
      for (var i = 0; i < this.selectedoillist.length; i++) {
        if (i == 0) {//第一条数据
          this.oilids = this.selectedoillist[i].oilId;
        } else {
          this.oilids = this.oilids + ',' + this.selectedoillist[i].oilId;
        }
        this.oilname.push(this.selectedoillist[i].cnName);
      }
      this.oildialogopen = false;//关闭原油弹窗
      this.$set(this.schemadata[this.schemeindex], 'icon', false);//原油的图标切换
      this.load = true;
      //根据选中的原油以及方案类型和方案ID进行切割
      cutResult(this.oilids, this.selectedschema.schemeType, this.selectedschema.schemeId).then(res => {
        this.load = false;
        if (res.data[1]) {//切割完成没有报错
          this.cutresultmainId = res.data[0];
          //切割完成后默认选中第一条原油展示详细信息
          this.searchcutresultmainDetail(this.selectedoillist[0].oilId);
        } else {
          alert("切割失败");
        }
        this.$set(this.schemadata[this.schemeindex], 'icon', true);//原油的图标切换
      });
    },
    //按钮的切换事件
    changeradio(val) {
      if (val == 1) {//馏分段
        this.$refs.sectiontable.doLayout();
      } else if (val == 2) {//轻端
        this.$refs.lighttable.doLayout();
      } else if (val == 3) {//石脑油
        this.$refs.naphthatable.doLayout();
      }
    },
    //根据原油id进行默认加载请求数据
    searchcutresultmainDetail(oilId) {
      //默认加载原油相关详细信息(切割结果ID,原油ID)
      searchcutresultmainDetail(this.cutresultmainId, oilId).then(res => {
        this.oilcodedisable = false;//按钮禁用状态取消
        this.sectioncolumn = res.data[0][0];//馏分段列数据
        this.sectioncolumn.forEach(item => {
          if (item.label.includes("(")) {
            item.unit = item.label.split("(")[1].split(")")[0]
            item.label = item.label.split("(")[0]
          } else {
            item.unit = ''
          }
        })
        this.sectiondata = res.data[0][1];//馏分段行数据
        this.lightcolumn = res.data[1][0];//轻端列数据
        this.lightdata = res.data[1][1];//轻端行数据
        this.naphthacolumn = res.data[2][0];//石脑油列数据
        this.naphthadata = res.data[2][1];//石脑油行数据
        this.radio = 1;
        this.$nextTick(() => {//渲染表格
          this.$refs.sectiontable.doLayout();
        })
      });
    },
    //原油弹窗内的查询事件
    handleOilSearch() {
      this.searchOil();//查询所有的原油数据
    },
    //处理分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.searchOil();
    },
    // //修改当前页
    handleCurrentChange(val) {
      this.pageInfo.pageIndex = val;
      this.searchOil();
    },
    //选择原油
    selectoil(index, row) {
      if (row.isDeleted == 1) {
        this.$message.warning("方案无效,请修改！");
        return;
      }
      this.searchoilname = '';//清空已选择的原油名称
      //加载原油列表
      this.searchOil();//查询所有的原油数据
      this.selectedoillist = [];//清空已选择的原油
      this.oilname = [];//清空已选择的原油
      this.currentIndex = 0;//设置下标
      this.schemeindex = index;
      this.oildialogopen = true;//弹窗开启

      this.tableListen();
    },
    //原油弹窗关闭事件
    oildialogclose() {
      this.oildialogopen = false;//弹窗关闭
    },
    //选中原油事件
    selectoilList(list) {
      if (list.length > 0) {//如果未选中原油，则禁用切割
        this.cutForbit = true;//
      } else {
        this.cutForbit = false;
      }
      this.selectedoillist = list;//赋值
    },
    //下一步按钮
    next() {
      // console.log('下一步')
      console.log('active' + this.active);
      if (this.active == 0) {//第一步点击下一步 进入侧线信息
        this.$refs['form'].validate((valid) => {
          if (valid) {
            //保存方案信息
            add(this.form).then(res => {
              this.form.schemeId = res.data[0];
              this.leftdata = res.data[1];
              this.$refs.leftTwoTable.doLayout();
              this.handleTwoLeftSave1(this.leftdata);
              for (var i = 0; i < this.leftdata.length; i++) {
                this.$set(this.leftdata[i], 'edit', true);
              }
              this.$refs.leftTwoTable.setCurrentRow(this.leftdata[0]);//左侧列表默认选中第一行
              //根据第一行加载物性信息列表
              if (this.leftdata.length > 0) {
                this.selectSidingSchemeMatterpro(this.leftdata[0].schemesidingId);
                this.selectsiding = this.leftdata[0];
              }
              //刷新方案列表
              this.onLoad();
            });
            this.active++;
            this.$nextTick(function () {
              this.rowDrop()
            })

          } else {
            this.active = 0;
          }
        });

        //先清空侧线的配置信息，之后再调接口加载侧线信息
      } else if (this.active == 1) {//第二步 关键匹配
        if (this.leftdata.length > 0) {
          if (this.errorMessageTip != '') {
            updateSchemeIsDeleted1(this.leftdata[0].schemeId).then(() => {
              this.onLoad();
            })
          } else {
            updateSchemeIsDeleted0(this.leftdata[0].schemeId).then(() => {
              this.onLoad();
            })
          }
        }
        this.getOutputInfo();//获取星等物性数据

      } else if (this.active == 2) {//第三步
        this.saveOutputInfo();//保存修改的数据
        this.selectSinglepointcut();//加载物性表头
        this.active++;
      } else if (this.active == 3) {//第四步
        this.countDown();//调用倒计时方法
        this.active++;
      } else if (this.active == 4) {//完成
        this.close();//关闭弹窗
        this.active++;
      }
      // this.active++;
    },
    //上一步按钮
    pre() {
      // console.log('上一步')
      this.nextDisable = false;
      if (this.active == 0) {//第一步点击下一步
      } else if (this.active == 1) {
        //
      } else if (this.active == 2) {//根据方案ID加载第二步数据
        this.thirdtableData = []
        this.searchSchemeSidingById(this.form.schemeId);
      } else if (this.active == 3) {//加载星等信息数据
        this.getOutputInfo();
      } else if (this.active == 4) {
        this.totalTime = 5;//重新赋值时间
        this.canClick = true; //这里重新开启
        window.clearInterval(this.clock);//清空计时器
      }
      this.active--;
    },
    //关闭按钮
    close() {
      this.dialogopen = false;
      this.content = '关闭';
      this.totalTime = 5;//重新赋值时间
      this.canClick = true; //这里重新开启
      window.clearInterval(this.clock);//清空计时器
      if (this.active == 0) {
        this.$refs['form'].resetFields();
      }
      if (this.active == 1) {
        if (this.leftdata.length > 0) {
          if (this.errorMessageTip != '') {
            updateSchemeIsDeleted1(this.leftdata[0].schemeId).then(() => {
              this.onLoad();
            })
          } else {
            updateSchemeIsDeleted0(this.leftdata[0].schemeId).then(() => {
              this.onLoad();
            })
          }
        }
      }
    },
    //查询原油列表
    searchOil(type) {
      if (type === 1) {
        //根据原油名称懒加载模糊查询原油列表
        searchOil(this.searchoilname, this.pageInfo.pageIndex, this.pageInfo.pageSize).then(res => {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.records.length; i++) {
              this.oillist.push(res.data.data.records[i])
            }
          }
        });
      }
      else {
        this.pageInfo.pageIndex = 1
        //根据原油名称模糊查询原油列表
        searchOil(this.searchoilname, this.pageInfo.pageIndex, this.pageInfo.pageSize).then(res => {
          if (res.data.code === 200) {
            this.oillist = res.data.data.records;
            this.pageInfo.total = res.data.data.total;
          }
        });
      }
    },
    //第二步获取左侧列表
    searchSchemeSidingById(id) {
      //根据方案ID获取方案下的侧线信息
      searchSchemeSidingById(id).then(res => {
        this.leftdata = res.data.data;
        this.handleTwoLeftSave1(this.leftdata);
        for (var i = 0; i < this.leftdata.length; i++) {
          this.$set(this.leftdata[i], 'edit', true);//设置编辑状态
        }
        this.$refs.leftTwoTable.setCurrentRow(this.leftdata[0]);//左侧列表默认选中第一行
        //根据第一行加载物性信息列表
        if (this.leftdata.length > 0) {
          this.selectSidingSchemeMatterpro(this.leftdata[0].schemesidingId);
        }
      });
    },
    //第二步左侧表格添加
    handleTwoLeftAdd() {
      this.adddata.schemeId = this.form.schemeId;
      this.adddata.uorder = this.selectsiding.uorder + 1;
      console.log(this.selectsiding)
      //新增侧线信息
      addSchemeSiding(this.adddata).then(res => {
        res.data.fractionIvt = this.selectsiding.fractionFvt
        res.data.fractionFvt = this.selectsiding.fractionFvt
        res.data.sidingName = '馏分段(' + res.data.fractionIvt + '-' + res.data.fractionFvt + ')'
        this.leftdata.splice(this.selectsiding.index + 1, 0, res.data)
        this.$set(this.leftdata[this.selectsiding.index + 1], 'edit', false);
        this.$refs.leftTwoTable.setCurrentRow(this.leftdata[this.selectsiding.index + 1]);
      });
    },
    //左侧列表校验事件
    handleTwoLeftSave1(leftdata) {
      this.nextDisable = false;
      this.errorMessageTip = "";
      var errormessage = "";
      for (let i = 0; i < leftdata.length; i++) {
        let up = [];
        let down = [];
        if (leftdata[i].fractionIvt == 'FBP') {
          errormessage = errormessage + "侧线的初馏点不能为FBP;";
          this.nextDisable = true;
          this.errorMessageTip = errormessage;
          break;
        }
        if (leftdata[i].fractionFvt == 'IBP') {
          errormessage = errormessage + "侧线的终馏点不能为IBP;";
          this.nextDisable = true;
          this.errorMessageTip = errormessage;
          break;
        }
        if (leftdata[i].fractionFvt == leftdata[i].fractionIvt) {
          errormessage = '初馏点与终馏点不能相等;'
          this.nextDisable = true;
          this.errorMessageTip = errormessage;
          break;
        }
        if ((leftdata[i].fractionFvt === 'FBP' ? 9999 : parseInt(leftdata[i].fractionFvt)) < (leftdata[i].fractionIvt === 'IBP' ? -9999 : parseInt(leftdata[i].fractionIvt))) {
          errormessage = '终馏点不能小于初馏点;'
          this.nextDisable = true;
          this.errorMessageTip = errormessage;
          break;
        }
        //   if(leftdata[i].fractionIvt=='FBP'){
        //   errormessage=errormessage+"侧线的初馏点不能为FBP;";
        //   this.errorMessageTip = errormessage;
        //    break;
        // }
        // if(leftdata[i].fractionFvt=='IBP'){
        //   errormessage=errormessage+"侧线的终馏点不能为IBP;";
        //   this.errorMessageTip = errormessage;
        //   break;
        // }
        if (i == 0) {//当前数据为第一条数据，直接保存，不做校验

        } else if (i == leftdata.length - 1) {//当前数据为最后一条数据
          up = leftdata[i - 1];
          if (up.fractionFvt == leftdata[i].fractionIvt) {//判断是否相等
            this.nextDisable = false;
          } else {//不相等
            errormessage = errormessage + "方案侧线的初馏点与终馏点不连续，请检查;";
            this.errorMessageTip = errormessage;
            this.nextDisable = true;
            break;
          }
        } else {
          up = leftdata[i - 1];//前一条数据
          down = leftdata[i + 1];//后一条数据
          if (up.fractionFvt == leftdata[i].fractionIvt) {
            if (leftdata[i].fractionFvt == down.fractionIvt) {
              //
            } else {
              errormessage = errormessage + "方案侧线的初馏点与终馏点不连续，请检查;";
              this.errorMessageTip = errormessage;
              this.nextDisable = true;
              break;
            }
          } else {
            errormessage = errormessage + "方案侧线的初馏点与终馏点不连续，请检查;";
            this.errorMessageTip = errormessage;
            this.nextDisable = true;
            break;
          }
        }
      }
    },
    //左侧列表保存事件
    handleTwoLeftSave(index, row) {
      this.handleTwoLeftSave1(this.leftdata);
      submitAndSelectSchemeSiding(row).then(res => {
        this.searchSchemeSidingById(this.form.schemeId);
      });
    },
    // handleTwoLeftSave(index,row){
    //   let one = this.leftdata[index];
    //   let up = [];
    //   let down =[];
    //   var errormessage = "";
    //   if(one.fractionIvt=='FBP'){
    //     this.leftdata[index].fractionIvt='IBP';
    //     errormessage=errormessage+"侧线的初馏点不能为FBP;";
    //   }
    //   if(one.fractionFvt=='IBP'){
    //     this.leftdata[index].fractionFvt='FBP';
    //     errormessage=errormessage+"侧线的终馏点不能为IBP;";
    //   }
    //   if(index==0){//当前数据为第一条数据，直接保存，不做校验
    //   }else if (index==this.leftdata.length-1){//当前数据为最后一条数据
    //     up = this.leftdata[index-1];
    //     if(up.fractionFvt==one.fractionIvt){//判断是否相等
    //     }else{//不相等
    //       this.leftdata[index].fractionIvt=up.fractionFvt;
    //       errormessage=errormessage+"当前侧线的初馏点需同上一条侧线的终馏点相同;";
    //     }
    //   }else{
    //     up = this.leftdata[index-1];//前一条数据
    //     down = this.leftdata[index+1];//后一条数据
    //     if(up.fractionFvt==one.fractionIvt){
    //       if(one.fractionFvt==down.fractionIvt){
    //       }else{
    //         this.leftdata[index].fractionFvt=down.fractionIvt;
    //         errormessage=errormessage+"当前侧线的终馏点需同下一条侧线的初馏点相同;";
    //       }
    //     }else {
    //       this.leftdata[index].fractionIvt=up.fractionFvt;
    //       errormessage=errormessage+"当前侧线的初馏点需同上一条侧线的终馏点相同;";
    //     }
    //   }
    //   if(errormessage!=null && errormessage!=''){
    //       this.$message.warning({
    //           dangerouslyUseHTMLString: true,
    //       message: errormessage
    //     });
    //     return;
    //   }else{
    //       submitSchemeSiding(row).then(res=>{
    //           this.searchSchemeSidingById(this.form.schemeId);
    //     });
    //   }
    // },
    //左侧列表的编辑事件
    handleTwoLeftEdit(index, row) {
      this.nextDisable = false;
      row.edit = false;
    },
    //取消左侧编辑行
    handelTwoLeftCancel(index, row) {
      if (row.schemesidingId == 0) {//新增行之后的取消，要把当前行移除
        this.leftdata.splice(this.leftdata.length - 1, 1);
        this.searchSchemeSidingById(this.form.schemeId);
      } else {//编辑的取消，要把当前行编辑状态设置为不可编辑
        row.edit = true;
      }
    },
    rowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    rightRowClassName({row, rowIndex}) {
      row.matterproDisplayorder = rowIndex + 1;
    },
    //左侧列表的行点击事件
    lefttableclick(row) {
      console.log(row)
      this.selectsiding = row;
      //根据侧线加载物性
      this.selectSidingSchemeMatterpro(this.selectsiding.schemesidingId);
    },
    //删除左侧表格记录事件
    handleTwoLeftDelete(index, row) {
      if (index == 0) {
        this.errorMessageTip = '请勿删除首条数据如需修改编辑即可'
      } else {
        deleteSidingScheme(row.schemesidingId).then(res => {
          this.searchSchemeSidingById(this.form.schemeId);
        });
      }

    },
    //加载右侧表格数据
    selectSidingSchemeMatterpro(id) {
      selectSidingSchemeMatterpro(id).then(res => {
        this.rightdata = res.data;
      });
    },
    //第二步右侧表格添加
    handleTwoRightAdd() {
      this.rightdata.push({
        "sidingmatterproId": 0,
        "matterproCode": '',
        "matterproName": '',
        "matterproUnit": '',
      });
    },
    //修改的list
    handleChange(list) {
      this.malist = list;
    },
    //第二步右侧表格的删除
    handleTwoRightDelete() {
      if (this.maids.length < 1) {
        this.$message.warning("请选择一条数据。")
      } else {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return deleteSidingSchemeMatterpro(this.maids);
          })
          .then(() => {
            this.selectSidingSchemeMatterpro(this.selectsiding.schemesidingId);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      }
    },
    //查询物性列表
    selectMatterproBySort() {
      selectMatterproBySort('1').then(res => {
        this.materprolist = res.data;
      });
    },
    //修改物性
    getValue(index, row) {
      this.$set(row, 'schemesidingId', this.selectsiding.schemesidingId);
      this.$set(row, 'schemeId', this.selectsiding.schemeId);
      submitSidingSchemeMatterpro(row).then(res => {
        if (!res.data) {
          this.$message.warning("物性不能重复添加");
        } else {
          this.selectSidingSchemeMatterpro(this.selectsiding.schemesidingId);
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        }
      });
    },
    //加载第三步表格事件
    getOutputInfo() {
      this.thirdnowData = [];
      this.columnproperty = [];
      this.thirdselectXH = [];
      getOutputInfo(this.form.schemeId).then(res => {
        console.log(res)
        console.log(this.dropCol[0].prop)
        thirdsaveData.clear();//首先清空保存的列表数据
        this.cols = res.data[0]
        this.thirdtableData = res.data[1];

        if (this.active == 1) {
          this.active++;
        }
      });
    },
    //第三步表格的单元格点击事件
    cellclick(row, column) {
      if (column.property != 'XH' && column.property != 'SIDING_NAME' && column.property != 'SIDING_CODE' && column.property != 'SCHEMESIDING_ID') {
        var nowstatushtml = row[column.property];
        var nowstatus = nowstatushtml.split("\"")[1];
        if (nowstatus == "other") {
          return;
        }
        var ckStu = ["none", "select", "asterisk"];
        var ckindex = 0;
        for (var i = 0; i < ckStu.length; i++) {
          if (ckStu[i] == nowstatus) {
            ckindex = i;
            break;
          }
        }
        ckindex++;
        if (ckindex == 3) {
          ckindex = 0;
        }
        var newstatus = '<div title="' + ckStu[ckindex] + '" class="checkboxSpan ' + ckStu[ckindex] + '"></div>';
        thirdsaveData.set(row.SCHEMESIDING_ID + "-" + column.property, ckStu[ckindex]);
        this.$set(row, column.property, newstatus);
      }
    },
    //第三步选择多行数据
    thirdhandleChange(val) {
      this.thirdselectXH = [];
      this.thirdnowData = val;
      if (val.length > 0) {
        val.forEach((value) => {
          this.thirdselectXH.push(value.XH);
        })
      }
    },
    //修改选中行的行样式
    tableRowClassName({row}) {
      let self = this;
      for (let i = 0; i < self.thirdselectXH.length; i++) {
        if (row.XH === self.thirdselectXH[i]) {
          return 'table-SelectedRow-bgcolor';
        }
      }
    },
    //修改事件
    testchange(data) {
      if (this.columnproperty.length > 0) {//有数据存在
        if (this.columnproperty.indexOf(data.property) > -1) {//判断是否有数据，有
          $("." + data.id).removeClass("selecttable");
          this.$delete(this.columnproperty, this.columnproperty.indexOf(data.property));
        } else {
          $("." + data.id).addClass("selecttable");
          this.columnproperty.push(data.property);
        }
      } else {
        $("." + data.id).addClass("selecttable");
        this.columnproperty.push(data.property);
      }
    },
    //全选事件
    thirdSelectAll(flag) {
      //列
      if (this.columnproperty == '' || this.columnproperty == null || this.columnproperty == undefined) {
        //
      } else {
        for (var i = 0; i < this.thirdtableData.length; i++) {
          let data3 = this.thirdtableData[i];
          for (var j = 0; j < this.columnproperty.length; j++) {
            var nowstatushtml = data3[this.columnproperty[j]];
            var nowstatus = nowstatushtml.split("\"")[1];
            if (nowstatus == "other") {
              continue;
            } else {
              var status = '';
              if (flag == 1) {
                status = 'select';
              } else if (flag == 2) {
                status = 'none';
              } else if (flag == 3) {
                status = 'asterisk';
              }
              var newstatus = '<div title="' + status + '" class="checkboxSpan ' + status + '"></div>';
              thirdsaveData.set(this.thirdtableData[i].SCHEMESIDING_ID + "-" + this.columnproperty[j], status);
              this.$set(this.thirdtableData[i], this.columnproperty[j], newstatus);
            }
          }
        }
      }
      //行
      if (this.thirdnowData.length == 0) {
        //
      } else {
        for (var i = 0; i < this.thirdnowData.length; i++) {
          const onenowData = this.thirdnowData[i];
          var keys = Object.keys(onenowData);
          for (var key in keys) {
            if (keys[key] != 'XH' && keys[key] != 'SIDING_NAME' && keys[key] != 'SIDING_CODE' && keys[key] != 'SCHEMESIDING_ID') {
              var nowstatushtml = onenowData[keys[key]];
              var nowstatus = nowstatushtml.split("\"")[1];
              if (nowstatus == "other") {
                continue;
              } else {
                var status = '';
                if (flag == 1) {
                  status = 'select';
                } else if (flag == 2) {
                  status = 'none';
                } else if (flag == 3) {
                  status = 'asterisk';
                }
                var newstatus = '<div title="' + status + '" class="checkboxSpan ' + status + '"></div>';
                var index = onenowData['XH'] - 1;
                thirdsaveData.set(this.thirdtableData[index].SCHEMESIDING_ID + "-" + keys[key], status);
                this.$set(this.thirdtableData[index], keys[key], newstatus);
              }
            }
          }
        }
      }
    },
    //点击下一步时，保存第三步的结果
    saveOutputInfo() {
      if (thirdsaveData.size > 0) {
        saveOutputInfo(thirdsaveData).then(res => {
        });
      }
    },
    //获取第四步表格数据
    selectSinglepointcut() {
      selectSinglepointcut(this.form.schemeId).then(res => {
        this.fourthtabledata = res.data;
        for (var i = 0; i < this.fourthtabledata.length; i++) {
          this.$set(this.fourthtabledata[i], 'codeedit', false);
          this.$set(this.fourthtabledata[i], 'ivtedit', false);
          this.$set(this.fourthtabledata[i], 'fvtedit', false);
        }
        this.$refs.fourthtable.doLayout();
      });
    },
    //双击表格后修改为编辑状态
    changeCode(row, type) {
      if (type == 1) {
        this.$set(row, 'codeedit', true);
        //document.getElementById('codeedit').focus();
      } else if (type == 2) {
        this.$set(row, 'ivtedit', true);
        //document.getElementById('ivtedit').focus();
      } else if (type == 3) {
        this.$set(row, 'fvtedit', true);
        //document.getElementById('fvtedit').focus();
      }
    },
    //第四步点击添加按钮
    handleFourAdd() {
      this.fourthtabledata.push({
        "configId": 0,
        "schemeId": this.form.schemeId,
        "matterproCode": '',
        "matterproName": '',
        "matterproUnit": '',
        "fractionIvt": '',
        "fractionFvt": '',
      });
    },
    //第四步改变事件
    handleFourChange(list) {
      this.fourselectdata = list;
    },
    //第四步删除方法
    handleFourDelete() {
      if (this.fourselectdata == 0) {
        this.$message.warning("请选择一条数据后进行删除");
        return;
      } else {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return deleteSinglepointcut(this.fourids);
          })
          .then(() => {
            this.selectSinglepointcut();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      }
    },
    //第四步选择完成物性编码之后保存数据库
    fourthValue(index, row) {
      saveSinglepointcut(row).then(res => {
        if (!res.data[0]) {
          this.$message.warning("同一方案的头部物性不能重复添加");
        } else {
          this.selectSinglepointcut();
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        }
      });
    },
    //第四步初馏点和终馏点失去焦点事件保存当前行数据
    saveValue(row, type) {
      if (type == 1) {
        this.$set(row, 'codeedit', false);
      } else if (type == 2) {
        this.$set(row, 'ivtedit', false);
        if (row.fractionIvt == '' || row.fractionIvt == null || row.fractionIvt == undefined) {
          this.$message.warning("初馏点不可为空");
        } else {
          this.saveSinglepointcut(row);
        }
      } else if (type == 3) {
        this.$set(row, 'fvtedit', false);
        if (row.fractionFvt == '' || row.fractionFvt == undefined || row.fractionFvt == null) {
          this.$message.warning("终馏点不可为空");
        } else {
          this.saveSinglepointcut(row);
        }
      }
    },
    //失去焦点后的保存方法
    saveSinglepointcut(row) {
      saveSinglepointcut(row).then(res => {
        if (!res.data[0]) {
          this.$message.warning("保存失败");
        } else {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        }
      });
    },
    //3秒后关闭
    countDown() {
      if (!this.canClick) {
        return;
      } else {
        this.canClick = false;
        this.content = "完成(<span style='font-size: 10px'>" + this.totalTime + "s后关闭</span>)";
        this.clock = window.setInterval(() => {
          this.totalTime--;
          this.content = "完成(<span style='font-size: 10px'>" + this.totalTime + "s后关闭</span>)";
          if (this.totalTime < 1) {
            this.close();
          }
        }, 1000)
      }
    }
  }
};
</script>

<style slot-scope="scope" lang="scss">
.info {
  margin-top: 30px;
}

.info2 {
  margin-top: 100px;
  text-align: center;
  align-items: center;
  display: flex;
}

.tb-edit .el-select {
  display: none
}

.tb-edit .current-row .el-select {
  display: block
}

.tb-edit .current-row .el-select + span {
  display: none
}

.checkboxSpan {
  height: 18px;
  width: 18px;
  float: none;
  margin-left: auto;
  margin-right: auto;
  background-image: url("/img/checkbox.png");
  background-position: 0px, 0px;
  cursor: pointer;
}

/*th{*/
/*  min-width: 60px;*/
/*}*/
.none {

  background-position: 0px 0px;
}

.select {

  background-position: 0px -18px;
}

.asterisk {

  background-position: 0px -36px;
}

.other {

  background-position: 0px -54px;
}

.rgb196 {
  background: rgb(196, 196, 196);
}

.bacColor317eb0 {
  background: #317eb0;
}

.bacColorf4984e {
  background: #f4984e;
}

.tab-control {
  overflow-x: scroll;
  overflow-y: hidden;
  display: -webkit-inline-box;
  font-size: 14px;
  background-color: #fff;
  line-height: 35px;
  margin-top: -5px;
}

.tab-control-item div {
  display: inline-block;
  padding: 5px 5px;
  cursor: pointer;
}

.active {
  color: #409EFF
}

#scheme .el-table__fixed {
  height: 100% !important;
}

.selecttable {
  background-color: #ECF5FF;
}

.el-table .table-SelectedRow-bgcolor {
  background-color: #ECF5FF !important;
}

/*.el-loading-spinner .circular{
  display: none;
}

.el-loading-spinner .el-loading-text {
  color: #409EFF;
  margin-left: -40px;
  font-size: 14px;
  padding-top: 20px;
}

.el-loading-spinner{
  background: url(../../../public/icon/ic_bofang.gif) no-repeat;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
}*/

.oil .el-dialog__body {
  padding-bottom: 0px;
}

</style>
