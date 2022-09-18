<template>
  <el-card style="height: 100%;">
    <el-row>
      <el-col :span="8" style="text-align: left;">
        <span>{{ bmName }}编码对照（{{ dataDesc }}）</span>
      </el-col>
      <el-col :span="16" style="text-align: right;">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="queryName">
              <el-button slot="append" icon="el-icon-search" @click="selectTableData"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small"
                       icon="el-icon-document" @click="saveTableData">保存
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small"
                       icon="el-icon-download" @click="handleExport">导出
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-upload
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-success="onSuccess"
              :on-error="onError"
              :disabled="importDisabled"
              action="/api/qcadmin-interfaceconfig/version/import"
              :data="{dataInType:dataDesc==='LIMS'?'L':'M',bmType:bmType}">
              <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                {{ importDataText }}
              </el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="bmName==='装置'" class="tableDiv">
      <el-table key="deviceTable" :data="tableDataDevice" size="small" border
                :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                style="width: 100%;" :height="tableHeight">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="devicecode" label="装置编码" width="100">
        </el-table-column>
        <el-table-column prop="devicename" label="装置名称" width="120">
        </el-table-column>
        <el-table-column prop="deviceshortname" label="简称" width="120">
        </el-table-column>
        <el-table-column prop="capacity" label="产能(吨)" width="80">
        </el-table-column>
        <el-table-column prop="productiontime" label="投产日期" width="140">
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="140">
        </el-table-column>
        <el-table-column prop="limsDeviceId" label="装置编码">
          <template slot-scope="{row,$index}">
            <el-input v-if="dataDesc==='LIMS'" class="input__inner" size="small" v-model="row.limsDeviceId"
                      placeholder="请输入编码"></el-input>
            <el-input v-else class="input__inner" size="small" v-model="row.mesDeviceId"
                      placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="limsDeviceName" label="装置中文名称">
          <template slot-scope="{row,$index}">
            <el-input v-if="dataDesc==='LIMS'" class="input__inner" size="small" v-model="row.limsDeviceName"
                      placeholder="请输入名称"></el-input>
            <el-input v-else class="input__inner" size="small" v-model="row.mesDeviceName"
                      placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-else-if="bmName==='采样点'">
      <el-table key="sampleTable" :data="tableDataSample" size="small" border
                :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                style="width: 100%" :height="tableHeight">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="sampleCode" label="采样点编码" width="140">
        </el-table-column>
        <el-table-column prop="sampleName" label="采样点名称" width="180">
        </el-table-column>
        <el-table-column prop="sampleSimpleName" label="采样点简称" width="180">
        </el-table-column>
        <!-- <el-table-column prop="isDeleted" label="是否有效" width="120" :formatter="sfktFormate">
        </el-table-column> -->
        <!-- <el-table-column prop="note" label="描述" width="180">
        </el-table-column> -->
        <el-table-column prop="limsSampleId" label="采样点编码" v-if="dataDesc==='LIMS'">
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.limsSampleId"
                      placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="mesSampleId" label="采样点编码" v-else>
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.mesSampleId"
                      placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="limsSampleName" label="采样点中文名称" v-if="dataDesc==='LIMS'">
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.limsSampleName"
                      placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="mesSampleName" label="采样点中文名称" v-else>
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.mesSampleName"
                      placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-else-if="bmName==='物料'">
      <el-table key="materielTable" :data="tableDataMateriel" size="small" border
                :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                style="width: 100%" :height="tableHeight">
        <el-table-column type="index" label="序号" width="60" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="materielCode" label="物料编码" show-overflow-tooltip width="250">
        </el-table-column>
        <el-table-column prop="materielName" label="物料名称" show-overflow-tooltip width="250">
        </el-table-column>
        <!-- <el-table-column prop="isDeleted" label="是否有效" :formatter="sfktFormate">
        </el-table-column> -->
        <!-- <el-table-column prop="note" label="描述">
        </el-table-column> -->
        <el-table-column prop="limsMaterielId" label="物料编码" v-if="dataDesc==='LIMS'">
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.limsMaterielId"
                      placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="mesMaterielId" label="物料编码" v-else>
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.mesMaterielId"
                      placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="limsMaterielName" label="物料中文名称" v-if="dataDesc==='LIMS'">
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.limsMaterielName"
                      placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="mesMaterielName" label="物料中文名称" v-else>
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.mesMaterielName"
                      placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-else-if="bmName==='物性'">
      <el-table key="matterproTable" :data="tableDataMatterpro" size="small" border
                :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                style="width: 100%" :height="tableHeight">
        <el-table-column type="index" label="序号" width="60" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip width="100">
        </el-table-column>
        <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip width="120">
        </el-table-column>
        <el-table-column prop="limsMatterproId" label="物性编码" v-if="dataDesc==='LIMS'" width="120">
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.limsMatterproId"
                      placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="mesMatterproId" label="物性编码" width="150" v-else>
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.mesMatterproId"
                      placeholder="请输入编码"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="limsMatterproName" label="物性中文名称" v-if="dataDesc==='LIMS'" width="200">
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.limsMatterproName"
                      placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="mesMatterproName" label="物性中文名称" v-else width="200">
          <template slot-scope="{row,$index}">
            <el-input class="input__inner" size="small" v-model="row.mesMatterproName"
                      placeholder="请输入名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="limsMatterproUnits" label="同步单位" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ dataDesc === 'LIMS' ? scope.row.limsMatterproUnits : scope.row.mesMatterproUnits }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="limsMatterproUnit" label="同步单位设置" width="100" v-if="dataDesc === 'LIMS'">
          <template slot-scope="{row,$index}">
            <a v-if="row.matterproUnit.length>0" type="primary" style="color: #409EFF"
               @click="showSyncUnitSetting(row)">设置</a>
          </template>
        </el-table-column>
        <el-table-column prop="mesMatterproUnit" label="同步单位设置" width="100" v-else>
          <template slot-scope="{row,$index}">
            <a v-if="row.matterproUnit.length>0" type="primary" style="color: #409EFF"
               @click="showSyncUnitSetting(row)">设置</a>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="同步单位设置"
      :visible.sync="syncUnitDialog"
      :append-to-body="true"
      width="33%">
      <div>{{ matchMatterpro.matterproName }}</div>
      <el-checkbox v-if="false" :indeterminate="isIndeterminate" style="margin-top: 15px" v-model="checkAll"
                   @change="handleCheckAllChange">全选
      </el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedMatterproUnits" @change="handleCheckedMatterprosChange">
        <!--                  <el-checkbox v-for="matterproUnit in matterproUnits" :label="matterproUnit" :key="matterproUnit">{{matterproUnit}}</el-checkbox>-->
        <el-checkbox v-for="matterpro in matterproList" :label="matterpro.unitCode" :key="matterpro.unitCode">
          {{ matterpro.MATTERPRO_UNIT }}
        </el-checkbox>
      </el-checkbox-group>
      <span v-if="!canSubmit" style="float: right;color: red">请至少选择一个物性单位!</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="syncUnitDialog = false">取 消</el-button>
            <el-button type="primary" :disabled="!canSubmit" @click="submitSyncUnit">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>/**
 * 编码对照数据
 */
import {
  dragExcel,
  dragExcelMateriel,
  dragExcelMatterpro,
  dragExcelSample,
  saveDeviceAll,
  saveMaterielAll,
  saveMatterproAll,
  saveSampleAll, selectCodeData
} from "../../../api/qcadmin/interfaceconfig";
import {
  catchMatterproByUnit,
  selectCheckedMatterproUnits,
  submitCheckedMatterproUnits
} from "../../../api/tuozhuai/tuoyedemo";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "codeContrastData",
  props: {
    bmName: '',
    bmType: 1,
    dataDesc: 'LIMS',
    menuIndex: 0,
  },
  data() {
    return {
      pageNum: 500,
      tableHeight: '',
      queryName: '',//模糊搜索输入框内容
      importDataText: '导入数据',// 导入按钮的文本
      importDataIcon: 'el-icon-upload2',// 导入按钮的图标
      importDisabled: false,  // 导入按钮是否被禁用
      tableDataDevice: [],//装置data
      tableDataSample: [],//采样点data
      tableDataMateriel: [],//物料data
      tableDataMatterpro: [],//物性data
      syncUnitDialog: false, //同步单位弹出框
      isIndeterminate: true,
      matterproList: [], //物性list,
      canSubmit: true, //物性单位同步可提交
      showSelectAll: true,//显示全选
      checkAll: false,
      matchMatterpro: { //匹配物性
        matterproCode: '',
        matterproName: ''
      },
      checkedMatterproUnits: [], //已选物性单位编码集合
      obj: {
        obj_matterproCode: "",
        obj_checkedMatterproUnits: [],
        obj_dataInType: "",
        obj_isChangeStatus: false
      },
      showSetting: true
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.GLOBAL.topHeight - 63 - 36 - 40 - 20 - 24 + 'px'


    this.getTableList('');
  },
  methods: {
    /**
     * 查询表格信息
     */
    getTableList(name) {
      switch (this.bmName) {
        case '装置':
          selectCodeData(name, this.pageNum, this.dataDesc === 'LIMS' ? 'L' : 'M', '1').then(res => {
            if (res.data.code === 200) {
              this.tableDataDevice = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
          break;
        case '采样点':
          selectCodeData(name, this.pageNum, this.dataDesc === 'LIMS' ? 'L' : 'M', '2').then(res => {
            if (res.data.code === 200) {
              this.tableDataSample = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
          break;
        case '物料':
          selectCodeData(name, this.pageNum, this.dataDesc === 'LIMS' ? 'L' : 'M', '3').then(res => {
            if (res.data.code === 200) {
              this.tableDataMateriel = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
          break;
        case '物性':
          selectCodeData(name, this.pageNum, this.dataDesc === 'LIMS' ? 'L' : 'M', '4').then(res => {
            if (res.data.code === 200) {
              this.tableDataMatterpro = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
          break;
        default:
          break;
      }
    },
    /**
     * 模糊搜索
     */
    selectTableData() {
      this.getTableList(this.queryName);
    },
    /**
     * 数据保存
     */
    saveTableData() {
      switch (this.bmName) {
        case '装置':
          this.saveDeviceData();
          break;
        case '采样点':
          this.saveSampleData();
          break;
        case '物料':
          this.saveMaterielData();
          break;
        case '物性':
          this.saveMatterproData();
          break;
        default:
          break;
      }
    },
    /**
     * 导出excel
     */
    handleExport() {
      switch (this.bmName) {
        case '装置':
          this.exportDevice();
          break;
        case '采样点':
          this.exportSample();
          break;
        case '物料':
          this.exportMateriel();
          break;
        case '物性':
          this.exportMatterpro();
          break;
        default:
          break;
      }
    },

    /**
     * 装置数据保存
     */
    saveDeviceData() {
      this.tableDataDevice.forEach(element => {
        this.$set(element, "dataInType", '(' + this.dataDesc + ')');
      })
      saveDeviceAll(this.tableDataDevice).then((res) => {
        if (res.data.data == true) {
          this.getTableList('');
          this.$message.success(res.data.msg);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    //采样点保存
    saveSampleData() {
      this.tableDataSample.forEach(element => {
        this.$set(element, "dataInType", '(' + this.dataDesc + ')');
      })
      saveSampleAll(this.tableDataSample).then((res) => {
        if (res.data.data == true) {
          this.getTableList('');
          this.$message.success(res.data.msg);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    //物料保存
    saveMaterielData() {
      this.tableDataMateriel.forEach(element => {
        this.$set(element, "dataInType", '(' + this.dataDesc + ')');
      })
      saveMaterielAll(this.tableDataMateriel).then((res) => {
        if (res.data.data == true) {
          this.getTableList('');
          this.$message.success(res.data.msg);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    //物性保存
    saveMatterproData() {
      this.tableDataMatterpro.forEach(element => {
        this.$set(element, "dataInType", '(' + this.dataDesc + ')');
      })

      let tempObj = [];
      this.tableDataMatterpro.forEach(item => {
        tempObj.push(escape(JSON.stringify(item)));
      })

      saveMatterproAll(tempObj).then((res) => {
        if (res.data.data == true) {
          this.getTableList('');
          this.$message.success(res.data.msg);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },

    //导出装置excel
    exportDevice() {
      this.tableDataDevice.forEach(element => {
        this.$set(element, "dataInType", '(' + this.dataDesc + ')')
      })
      dragExcel(this.tableDataDevice).then((res) => {
        const content = res.data;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          elink.setAttribute('download', '装置编码对照(' + this.dataDesc + ').xlsx');
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //导出采样点excel
    exportSample() {
      this.tableDataSample.forEach(element => {
        this.$set(element, "dataInType", '(' + this.dataDesc + ')')
      })
      dragExcelSample(this.tableDataSample).then((res) => {
        const content = res.data;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          elink.setAttribute('download', '采样点编码对照(' + this.dataDesc + ').xlsx');
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //导出物料excel
    exportMateriel() {
      this.tableDataMateriel.forEach(element => {
        this.$set(element, "dataInType", '(' + this.dataDesc + ')')
      })
      dragExcelMateriel(this.tableDataMateriel).then((res) => {
        const content = res.data;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          elink.setAttribute('download', '物料编码对照(' + this.dataDesc + ').xlsx');
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //导出物性excel
    exportMatterpro() {
      this.tableDataMatterpro.forEach(element => {
        this.$set(element, "dataInType", '(' + this.dataDesc + ')')
      })
      dragExcelMatterpro('(' + this.dataDesc + ')').then((res) => {
        const content = res.data;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          elink.setAttribute('download', '物性编码对照(' + this.dataDesc + ').xlsx');
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },


    // 上传文件调用
    beforeUpload() {
      // 将文本修改为正在导入
      this.importDataText = '正在导入';
      // 修改其图标
      this.importDataIcon = 'el-icon-loading';
      // 将其上传组件暂时禁用
      this.importDisabled = true;
    },
    // 装置导入文件成功后回调
    onSuccess() {
      // 成功后文本修改为原来的导入数据
      this.importDataText = '导入数据';
      // 图标修改
      this.importDataIcon = 'el-icon-upload2';
      // 将上传组件改为允许使用
      this.importDisabled = false;
      // 调用刷新数据的方法
      this.getTableList('');
      this.$message.success("导入成功！");
    },
    // 装置导入文件失败后回调
    onError() {
      this.importDataText = '导入数据';
      this.importDataIcon = 'el-icon-upload2';
      this.importDisabled = false;
      this.getTableList('');
      this.$message.error("导入失败！");
    },

    //同步单位配置
    showSyncUnitSetting(row) {

      this.isIndeterminate = false;
      this.checkAll = false;
      this.canSubmit = true;
      this.matterproList = [];
      this.syncUnitDialog = true;
      this.matterpros = [];
      //根据物性编码查询主数据对应所有物性单位
      catchMatterproByUnit(row.matterproCode).then((res) => {
        if (res.data.code == 200){
          this.matterproList = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        //若只有一个物性单位不显示全选功能
        if (this.matterproList.length <= 1) {
          this.showSelectAll = false;
        } else {
          this.showSelectAll = true;
        }
      })
      console.log(this.dataDesc)
      //根据物性编码查询已选物性单位集合
      selectCheckedMatterproUnits(row.matterproCode, this.dataDesc === 'LIMS' ? 'L' : 'M').then((res) => {
        if (res.data.code == 200){
          this.checkedMatterproUnits = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        let checkedCount = res.data.data.length;
        this.checkAll = checkedCount === this.matterproList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.matterproList.length;
      })
      this.matchMatterpro.matterproCode = row.matterproCode;
      this.matchMatterpro.matterproName = row.matterproName;
    },

    //全选
    handleCheckAllChange(val) {
      this.checkedMatterproUnits = val ? this.matterproList : [];
      this.isIndeterminate = false;
      if (this.checkedMatterproUnits.length < 1) {
        this.canSubmit = false;
      } else {
        this.canSubmit = true;
      }
    },
    //提交同步单位配置
    submitSyncUnit() {
      this.obj.obj_matterproCode = this.matchMatterpro.matterproCode;
      this.obj.obj_checkedMatterproUnits = this.checkedMatterproUnits;
      this.obj.obj_dataInType = this.dataDesc == 'LIMS' ? 'L' : 'M';
      if (this.matterproList.length - this.checkedMatterproUnits.length == 0) { //无未选提交
        this.obj.obj_isChangeStatus = false;
      } else { //有未选提交
        this.obj.obj_isChangeStatus = true;
      }
      submitCheckedMatterproUnits(this.obj).then((res) => {
        if (res.data.code == 200) {
          this.getTableList('');
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.syncUnitDialog = false;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    //复选框状态处理
    handleCheckedMatterprosChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.matterproList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.matterproList.length;
      if (this.checkedMatterproUnits.length < 1) {
        this.canSubmit = false;
      } else {
        this.canSubmit = true;
      }
    }

  },
  watch: {
    bmName() {
      this.getTableList('');
    },
    dataDesc() {
      this.getTableList('');
    },
    menuIndex() {
      this.getTableList('');
    }
  }
}
</script>

<style scoped lang="scss">
//.tableDiv {
//  height: calc(100% - 63px);
//}
</style>
