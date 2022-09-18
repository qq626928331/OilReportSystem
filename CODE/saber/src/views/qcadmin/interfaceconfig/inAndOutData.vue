<template>
  <div style="margin-bottom: 20px;height: 100%;">
    <el-row v-show="dataType==='in'" :gutter="15" style="height: 100%;">
      <el-col :span="18" style="height: 100%;">
        <el-card style="height: 100%;">
          <div class="middleMainDiv" style="height: 100%;">
            <div class="topDiv" style="height: 40%">
              <el-row>
                <el-form :inline="true">
                  <el-form-item :label="`${dataDesc}厂商及版本：`" style="margin-bottom: 0px;">
                    <el-select :size="formSize" v-model="versionValue" placeholder="请选择"
                               @change="catchMatchDetail(1)">
                      <el-option
                        v-for="item in versionList"
                        :key="item.versionId"
                        :label="item.versionName"
                        :value="item.versionId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px;">
                    <el-checkbox :size="formSize" style="margin-left: 10%;" v-model="accessVersion"
                                 @change="updateAccessVersion">
                      是否为取数版本
                    </el-checkbox>
                  </el-form-item>
                </el-form>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="10">
                  <span style="color: #409EFF">数据字段设置</span>
                </el-col>
                <el-col :span="14" style="text-align: right;">
                  <el-button size="mini" type="primary"
                             @click="saveMatch">保存
                  </el-button>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row :gutter="10">
                <el-col :span="12">
                  <div style="background-color: #409EFF;color:white;height: 30px;width:90%;">
                    <span style="margin-left: 20px;position: absolute;margin-top: 5px;">目标字段(IRAS):</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="background-color: #409EFF;color:white;height: 30px;width:90%;">
                    <span style="margin-left: 20px;position: absolute;margin-top: 5px;">源字段(LIMS):</span>
                  </div>
                </el-col>
              </el-row>
              <el-row v-if="size>0" :gutter="10"
                      :style="{'overflow-y': 'auto','overflow-x': 'hidden','height':topTableHeight}">
                <el-col :span="11">
                  <div v-for="item in matchList" :key="item">
                    <el-row :gutter="10" style="height: 35px;line-height: 30px;border-bottom: 1px solid #ccc;">
                      <el-col :span="14">
                        {{ item.tcolumn }}
                      </el-col>
                      <el-col :span="10">
                        {{ item.tcolumnName }}
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div v-for="item in matchList" :key="item">
                    <div style="height: 35px;line-height:35px;margin-left:30%;"><img src="/icon/ic_zuo.png"/></div>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div v-for="item in matchList" :key="item">
                    <el-row :gutter="10" style="height: 35px;line-height: 30px;border-bottom: 1px solid #ccc;">
                      <el-col :span="24">
                        <el-input size="mini" class="styltyzdclass" v-model="item.scolumn"
                                  placeholder="源字段"></el-input>
                        <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                  v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-row v-else :gutter="10"
                      :style="{'overflow-y': 'auto','overflow-x': 'hidden','height':topTableHeight}">
                <el-col :span="11">
                  <div v-for="item in matchList" :key="item">
                    <el-row :gutter="10" style="height: 35px;line-height: 30px;border-bottom: 1px solid #ccc;">
                      <el-col :span="14">
                        {{ item.columnName }}
                      </el-col>
                      <el-col :span="10">
                        {{ item.columnComment }}
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div v-for="item in matchList" :key="item">
                    <div style="height: 35px;line-height:35px;margin-left:30%;"><img src="/icon/ic_zuo.png"/></div>
                  </div>
                </el-col>
                <el-col :span="11">
                  <div v-for="item in matchList" :key="item">
                    <el-row :gutter="10" style="height: 35px;line-height: 30px;border-bottom: 1px solid #ccc;">
                      <el-col :span="24">
                        <el-input size="mini" class="styltyzdclass" v-model="item.scolumn"
                                  placeholder="源字段"></el-input>
                        <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                  v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="bottomDiv" style="height: 60%;">
              <el-row>
                <el-col :span="10">
                  <span style="color: #409EFF">接口方式设置</span>
                </el-col>
                <el-col :span="14" style="text-align: right;">
                  <el-button size="mini" type="primary"
                             @click="saveIftypeByinterfaceType">保存
                  </el-button>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <div class="contentStyle">
                  <el-radio-group v-model="interfaceTypeRadio" style="width: 100%" @change="radioChange">
                    <div style="font-size: 15px;margin-bottom: 15px">
                      <el-radio label="2">指定目录文件交换</el-radio>
                      <div style="margin-left: 20px;margin-top: 10px">
                        文件路径：
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 8%">文件名：</span>
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextFile"
                                  placeholder="请输入内容"></el-input>
                      </div>
                    </div>
                    <div style="font-size: 15px;margin-bottom: 15px">
                      <el-radio label="1">API模式（IRAS调用{{ dataDesc }}接口)</el-radio>
                      <div style="margin-left: 20px;margin-top: 10px">
                        接口URL：
                        <el-input :disabled="interfaceTypeRadio=='2'" size="small"
                                  style="display:inline-block;width: 20%" v-model="inputApiUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 5%">文件或返回值格式：</span>
                        <el-radio-group v-model="inputApiTextType" @change="showJson"
                                        :disabled="interfaceTypeRadio=='2'">
                          <el-radio label="1">XML</el-radio>
                          <el-radio label="2">JSON</el-radio>
                        </el-radio-group>
                      </div>
                      <div style="margin-left: 20px;margin-top: 20px">
                        <div style="margin-top: 10px;"><span style="margin-top:10px;position: absolute;">参数列表：</span>
                        </div>
                        <el-table :data="tableDataParams" size="small" border @header-dragend="changeColWidth"
                                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                                  style="width: 80%;margin-left: 15%;" :height='bottomTableHeight'>
                          <el-table-column type="index" label="序号" width="60">
                          </el-table-column>
                          <el-table-column prop="paramsColumn" label="参数名" show-overflow-tooltip width="180">
                            <template slot-scope="{row,$index}">
                              <span>{{ row.paramsColumn }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="paramsType" show-overflow-tooltip label="参数类型">
                            <template slot-scope="{row,$index}">
                              <span>{{ row.paramsType }}</span>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-radio-group>
                </div>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="cardDiv dataType" style="background-color: #FFFFFF;">
            <div class="spanStyleLeft">
              <span>示例</span>
            </div>
            <el-divider></el-divider>
            <div class="contentStyle" :style="{'height':topCardHeight,'overflow-y':'auto'}">
              {{ objJson }}
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;">
          <div class="cardDiv dataType" style="background-color: #FFFFFF;">
            <div class="spanStyleLeft">
              <span>示例</span>
            </div>
            <el-divider></el-divider>
            <div class="contentStyle" :style="{'height':topCardHeight,'overflow-y':'auto'}">
              {{ objParamsJson }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-show="dataType==='out'" :gutter="15" style="height: 100%;">
      <el-col :span="18" style="height: 100%;">
        <el-card style="height: 100%;">
          <el-row>
            <el-form :inline="true">
              <el-form-item :label="`${dataDesc}厂商及版本：`" style="margin-bottom: 0px;">
                <el-select :size="formSize" v-model="versionValue" placeholder="请选择"
                           @change="catchMatchDetail(dataDesc==='LIMS'?2:3)">
                  <el-option
                    v-for="item in versionList"
                    :key="item.versionId"
                    :label="item.versionName"
                    :value="item.versionId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-bottom: 0px;">
                <el-checkbox :size="formSize" style="margin-left: 10%;" v-model="accessVersion"
                             @change="updateAccessVersion">
                  是否为取数版本
                </el-checkbox>
              </el-form-item>
            </el-form>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <div>
              <span style="color: #409EFF">数据字段设置</span>
            </div>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-table :ref="dataDesc==='LIMS'?'multipleTableLims':'multipleTableMes'" :data="tableDataOutMatch"
                      tooltip-effect="dark" style="width: 100%"
                      @select="handleSelectionChange" @header-dragend="changeColWidth"
                      @selection-change="handleSelectionChangeJson" @select-all="handleSelectionChangeAll"
                      border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                      :height="dataColHeight">
              <el-table-column type="selection" width="55" :selectable='checkboxT'></el-table-column>
              <el-table-column prop="columnName" label="字段"></el-table-column>
              <el-table-column prop="columnComment" label="字段描述"></el-table-column>
            </el-table>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="12">
              <span style="color: #409EFF">接口方式设置</span>
            </el-col>
            <el-col :span="12" style="text-align: right;">
              <el-button :size="formSize" type="primary"
                         @click="saveIftypeByinterfaceTypeOut">保存
              </el-button>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-form :inline="true">
              <el-form-item label="接口URL：" style="margin-bottom: 0px;">
                <el-input :size="formSize" v-model="inputApiUrlOut"
                          placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="文件或返回值格式：" style="margin-bottom: 0px;">
                <el-radio-group v-model="inputApiTextTypeOut">
                  <el-radio label="1">XML</el-radio>
                  <el-radio label="2">JSON</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :style="{'height':cardHeight,'overflow-y':'auto'}">
          <div class="cardDiv dataType" style="background-color: #FFFFFF;">
            <div class="spanStyleLeft">
              <span>接口返回数据示例</span>
            </div>
            <el-divider></el-divider>
            <div class="contentStyle">
              {{ objJsonOut }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>/**
 * 输入或输出数据
 */
import {
  addIftype,
  addIftypeOut,
  catchIfTypeByVersion,
  catchMatchDetail,
  catchOutMatch,
  catchParamsByInterfaceType,
  catchSelectionData,
  catchVersionDetail,
  defaultSelect,
  deleteAllCancelSelect,
  saveIftypeByinterfaceType,
  saveMatch,
  selectAccessVersion,
  selectIftypeOutByVersion,
  updateAccessVersion,
  updateIftypeOut,
  updateNotAccessVersion,
  updateSelectionType
} from "../../../api/qcadmin/interfaceconfig";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "inAndOutData",
  props: {
    dataDesc: 'LIMS',
    dataType: 'in',
    dataVal: false,
    menuIndex: 0,
  },
  data() {
    return {
      matchList: [],//数据字段设置信息
      versionList: [],//版本信息集合
      versionValue: '',
      accessVersion: false,
      interfaceTypeRadio: '',
      inputTextFile: '',
      inputTextUrl: '',
      inputApiUrl: '',
      inputApiTextType: '',
      inputApiUrlOut: '',
      inputApiTextTypeOut: '2',
      tableDataParams: [],
      objJson: {},
      objParamsJson: {},
      size: 0,
      tableDataOutMatch: [],
      objJsonOut: {},
      isSmall: false,
      formSize: 'small',
      dataColHeight: '',
      cardHeight: '',
      topCardHeight: '',
      topTableHeight: '',
      bottomTableHeight: '',

    }
  },
  mounted() {
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)

    this.catchVersionDetail();
    defaultSelect(0).then((res) => {
      if (res.data.code == 200) {
        this.versionValue = res.data.data.versionId;
      } else {
        let that = this;
        errorMsgbox(that, res.data.msg);
      }
      this.catchMatchDetail(1);
    })
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      this.dataColHeight = window.innerHeight - this.GLOBAL.topHeight - 36 - 40 - 24 - 20 - (this.isSmall ? 110 : 130) - 21 - 20 + 'px';
      this.cardHeight = window.innerHeight - this.GLOBAL.topHeight - (this.isSmall ? 40 : 50) - 24 - 26 + 'px';
      this.topCardHeight = (window.innerHeight - this.GLOBAL.topHeight - 36 - 40 - (this.isSmall ? 40 : 50) * 2 - 90) / 2 + 'px';
      this.topTableHeight = (window.innerHeight - this.GLOBAL.topHeight - 36 - 40) * 0.4 - 130 + 'px'
      this.bottomTableHeight = (window.innerHeight - this.GLOBAL.topHeight - 36 - 40) * 0.5 - 160 + 'px'
    },
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    //查询版本信息
    catchVersionDetail() {
      catchVersionDetail(0).then((res) => {
        if (res.data.code == 200) {
          this.versionList = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    //根据版本id查询数据字段信息
    catchMatchDetail(type) {
      this.objParamsJson = {};
      //根据版本id查询是否为取数版本
      if (this.versionValue != "") {
        selectAccessVersion(this.versionValue).then((res) => {
          if (res.data.code == 200) {
            if (res.data.data.isAccessVersion == 1) {
              this.accessVersion = true;
            } else {
              this.accessVersion = false;
            }
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      }
      if (type == 1) {
        this.exampleMessage = [];
        this.tableDataParams = [];
        catchMatchDetail(this.versionValue).then((res) => {
          if (res.data.code == 200) {
            this.matchList = res.data.data.matches;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.matchList.forEach(element => {
            this.$set(element, "scolumnEdit", false);
            this.$set(element, "scolumnNameEdit", false);
            element.versionId = this.versionValue;
          })
          this.size = res.data.data.size;
          //根据版本id输入接口方式
          catchIfTypeByVersion(this.versionValue).then((res) => {
            if (res.data.code == 200 && res.data.data) {
              if (res.data.data.interfaceType == 2) {
                this.objJson = {};
                this.interfaceTypeRadio = "2";
                this.inputApiUrl = "";
                this.inputApiTextType = "";
                this.tableDataParams = [];
                this.disabled3 = true;
                this.inputTextUrl = res.data.textUrl;
                this.inputTextFile = res.data.textFile;
              } else {
                this.interfaceTypeRadio = "1";
                this.inputTextUrl = "";
                this.inputTextFile = "";
                this.disabled3 = false;
                this.inputApiUrl = res.data.data.apiUrl;
                if (res.data.apiTextType == 1) {
                  this.inputApiTextType = "1";
                } else {
                  this.inputApiTextType = "2";
                  this.showJson();
                }
              }
              this.iftypeId = res.data.data.iftypeId;
              if (this.interfaceTypeRadio == 1) {
                //根据接口方式查询输入参数
                catchParamsByInterfaceType(res.data.data.iftypeId).then((res) => {
                  this.tableDataParams = res.data.data;
                  this.showParamsJson(this.tableDataParams);
                })
              }
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
              this.interfaceTypeRadio = "1";
              this.inputTextUrl = "";
              this.inputTextFile = "";
              this.inputApiUrl = "";
              this.inputApiTextType = "2";
              this.showJson();
            }
          });
        });
      } else if (type == 2) {
        this.inputApiUrlOut = "";
        this.inputApiTextTypeOut = "2";
        this.catchOutMatch(1);
        selectIftypeOutByVersion(this.versionValue).then((res) => {
          if (res.data.data) {
            this.inputApiUrlOut = res.data.data[0].apiUrl;
            if (res.data.data[0].apiTextType == 1) {
              this.inputApiTextTypeOut = "1";
            } else {
              this.inputApiTextTypeOut = "2";
            }
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      } else if (type == 3) {
        this.inputApiUrlOut = "";
        this.inputApiTextTypeOut = "2";
        this.catchOutMatch(2);
        selectIftypeOutByVersion(this.versionValue).then((res) => {
          if (res.data.data.length > 0) {
            this.inputApiUrlOut = res.data.data[0].apiUrl;
            if (res.data.data[0].apiTextType == 1) {
              this.inputApiTextTypeOut = "1";
            } else {
              this.inputApiTextTypeOut = "2";
            }
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      }
    },
    //接口方式改变
    radioChange() {
      if (this.interfaceTypeRadio == "1") {
        this.disabled3 = false;
        this.inputTextUrl = "";
        this.inputTextFile = "";
        if (this.versionValue != "") {
          //根据版本id输入接口方式
          catchIfTypeByVersion(this.versionValue).then((res) => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.inputApiUrl = res.data.data.apiUrl;
            if (res.data.data.apiTextType == 1) {
              this.inputApiTextType = "1";
            } else {
              this.inputApiTextType = "2";
              this.showJson();
            }
            //根据接口方式查询输入参数
            catchParamsByInterfaceType(res.data.data.iftypeId).then((res) => {
              this.tableDataParams = res.data.data;
              this.showParamsJson(this.tableDataParams);
            })
          });
        }
      } else {
        this.objJson = {};
        this.disabled3 = true;
        this.inputApiUrl = "";
        this.inputApiTextType = "";
        this.tableDataParams = [];
        this.exampleMessage = [];
        this.objParamsJson = {};
        //根据版本id输入接口方式
        catchIfTypeByVersion(this.versionValue).then((res) => {
          if (res.data.code == 200){
            this.inputTextUrl = res.data.data.textUrl;
            this.inputTextFile = res.data.data.textFile;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      }
    },
    //展示json数据
    showJson() {
      if (this.versionValue != "") {
        this.objJson = {};
        this.objParamsJson = {};
        this.exampleMessage = [];
        if (this.inputApiTextType == "2") {
          this.$set(this.objJson, "code", "200");
          this.$set(this.objJson, "msg", "success");
          var obj = {};
          this.matchList.forEach(element => {
            if (element.scolumn != "") {
              this.$set(obj, element.scolumn, "");
              // this.isshownull = true;
            }
          });
          this.exampleMessage.push(obj);
          this.$set(this.objJson, "jsondata", this.exampleMessage);
          this.showParamsJson(this.tableDataParams);
        }
      }
    },
    //展示参数参数的json数据
    showParamsJson(tableDataParams) {
      this.objParamsJson = {};
      if (tableDataParams.length > 0) {
        let objParams = ["", "", "", "", ""];
        if (tableDataParams.length == 1) {
          this.$set(this.objParamsJson, tableDataParams[0].paramsColumn, objParams);
        } else if (tableDataParams.length == 2) {
          this.$set(this.objParamsJson, tableDataParams[0].paramsColumn, objParams);
          this.$set(this.objParamsJson, tableDataParams[1].paramsColumn, "2020-12-01 00:00:00");
        } else if (tableDataParams.length == 3) {
          this.$set(this.objParamsJson, tableDataParams[0].paramsColumn, objParams);
          this.$set(this.objParamsJson, tableDataParams[1].paramsColumn, "2020-12-01 00:00:00");
          this.$set(this.objParamsJson, tableDataParams[2].paramsColumn, "2022-12-01 00:00:00");
        }
      }
    },
    //是否为取数版本修改
    updateAccessVersion(data) {
      let type = 0;
      if (this.dataDesc != "LIMS") {
        type = 1;
      }
      if (this.versionValue != "") {
        if (data == true) {
          //修改当前版本为取数版本 其余置为0
          updateAccessVersion(this.versionValue, type).then((res) => {
          });
        } else {
          //当前取数版本置为0
          updateNotAccessVersion(this.versionValue).then((res) => {
          });
        }
      }
    },
    //数据字段设置保存
    saveMatch() {
      if (this.versionValue == "") {
        this.$message.warning("请选择" + this.dataDesc + "厂商及版本!");
        return;
      }
      for (let i = 0; i < this.matchList.length; i++) {
        if (this.matchList[i].scolumn == "") {
          this.$message.warning("请补全源字段！");
          return;
        }
      }
      saveMatch(this.matchList).then((res) => {
        if (res.data.data == true) {
          this.$message.success(res.data.msg);
          this.catchMatchDetail(1);
        } else {
          this.$message.warning(res.data.msg);
        }
      })
    },
    //输入接口方式保存
    saveIftypeByinterfaceType() {
      if (this.versionValue == "") {
        this.$message.warning("请选择" + this.dataDesc + "厂商及版本!");
        return;
      }
      //根据版本id输入接口方式
      catchIfTypeByVersion(this.versionValue).then((res) => {
        if (res.data.data) {
          if (this.interfaceTypeRadio == "1") {
            saveIftypeByinterfaceType(this.interfaceTypeRadio, this.versionValue, this.inputApiUrl, this.inputApiTextType).then((res) => {
              if (res.data.code === 200){
                this.$message.success(res.data.msg);
              }
            })
          } else if (this.interfaceTypeRadio == "2") {
            saveIftypeByinterfaceType(this.interfaceTypeRadio, this.versionValue, this.inputTextUrl, this.inputTextFile).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.msg);
              }
            })
          } else {
            this.$message.warning(res.data.msg);
          }
        } else {
          addIftype(this.versionValue, this.interfaceTypeRadio, this.inputApiUrl, this.inputApiTextType, this.inputTextUrl, this.inputTextFile).then((res) => {
            if (res.data.data) {
              this.$message.success(res.data.msg);
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
        }
      });
    },

    //查询数据输出目标字段信息
    catchOutMatch(type) {
      if (type == 1) {
        catchOutMatch(this.versionValue).then((res) => {
          if (res.data.code == 200){
            this.tableDataOutMatch = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          //查询选中数据
          catchSelectionData(this.versionValue).then((res) => {
            this.$nextTick(() => {
              for (let i = 0; i < this.tableDataOutMatch.length; i++) {
                if (res.data.data.length == 0) {
                  if (this.tableDataOutMatch[i].columnName == "MATTERPRO_CODE" || this.tableDataOutMatch[i].columnName == "MATTERPRO_NAME" || this.tableDataOutMatch[i].columnName == "MATTERPRO_UNIT" || this.tableDataOutMatch[i].columnName == "MATTERPRO_VALUE") {
                    this.$refs.multipleTableLims.toggleRowSelection(this.tableDataOutMatch[i]);
                  }
                } else {
                  for (let j = 0; j < res.data.data.length; j++) {
                    if (this.tableDataOutMatch[i].columnName == res.data.data[j].tcolumn && res.data.data[j].versionId == this.versionValue) {
                      this.$refs.multipleTableLims.toggleRowSelection(this.tableDataOutMatch[i]);
                    }
                  }
                }
              }
            })
          })
        })
      } else {
        catchOutMatch(this.versionValue).then((res) => {
          if (res.data.code == 200) {
            this.tableDataOutMatch = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          //查询选中数据
          catchSelectionData(this.versionValue).then((res) => {
            this.$nextTick(() => {
              for (let i = 0; i < this.tableDataOutMatch.length; i++) {
                if (res.data.data.length == 0) {
                  if (this.tableDataOutMatch[i].columnName == "MATTERPRO_CODE" || this.tableDataOutMatch[i].columnName == "MATTERPRO_NAME" || this.tableDataOutMatch[i].columnName == "MATTERPRO_UNIT" || this.tableDataOutMatch[i].columnName == "MATTERPRO_VALUE") {
                    this.$refs.multipleTableMes.toggleRowSelection(this.tableDataOutMatch[i]);
                  }
                } else {
                  for (let j = 0; j < res.data.data.length; j++) {
                    if (this.tableDataOutMatch[i].columnName == res.data.data[j].tcolumn && res.data.data[j].versionId == this.versionValue) {
                      this.$refs.multipleTableMes.toggleRowSelection(this.tableDataOutMatch[i]);
                    }
                  }
                }
              }
            })
          })
        })
      }
    },
    //复选框
    checkboxT(row, rowIndex) {
      if (row.columnName == "MATTERPRO_CODE" || row.columnName == "MATTERPRO_NAME" || row.columnName == "MATTERPRO_UNIT" || row.columnName == "MATTERPRO_VALUE") {
        return false;
      } else {
        return true;
      }
    },
    //数据输出目标字段table复选框选中事件
    handleSelectionChange(row) {
      // console.log(row[0]);
      // let rowChild = {};
      // rowChild.columnComment = "物性编码";
      // rowChild.columnName = "MATTERPRO_CODE";
      // rowChild.outvmatchId = -1;
      // rowChild.tcolumn = "";
      // rowChild.tcolumnName = "";
      // rowChild.versionId = -1;
      this.objJsonOut = {};
      this.exampleMessageOut = [];
      let obj = {};
      row.forEach(element => {
        if (element.columnName != "") {
          if (element.columnName != "MATTERPRO_CODE" && element.columnName != "MATTERPRO_NAME" && element.columnName != "MATTERPRO_UNIT" && element.columnName != "MATTERPRO_VALUE") {
            this.$set(obj, element.columnName, "");
          }
        }
      })
      //存放物性obj
      var matterpros = [];
      var objMatterpro = {};
      this.$set(objMatterpro, "MATTERPRO_CODE", "");
      this.$set(objMatterpro, "MATTERPRO_NAME", "");
      this.$set(objMatterpro, "MATTERPRO_UNIT", "");
      this.$set(objMatterpro, "MATTERPRO_VALUE", "");
      matterpros.push(objMatterpro);
      this.$set(obj, "ALALYSE_DATA", matterpros);
      this.exampleMessageOut.push(obj);
      this.$set(this.objJsonOut, "jsondata", this.exampleMessageOut);
      let objMap = {};
      this.$set(objMap, "row", row);
      this.$set(objMap, "versionId", this.versionValue);
      updateSelectionType(objMap).then((res) => {
      });
    },
    //加载输出数据选中json
    handleSelectionChangeJson(row) {
      this.objJsonOut = {};
      this.exampleMessageOut = [];
      let obj = {};
      row.forEach(element => {
        if (element.columnName != "") {
          if (element.columnName != "MATTERPRO_CODE" && element.columnName != "MATTERPRO_NAME" && element.columnName != "MATTERPRO_UNIT" && element.columnName != "MATTERPRO_VALUE") {
            this.$set(obj, element.columnName, "");
          }
        }
      })
      if (row.length == 0) {
        return;
      }
      //存放物性obj
      let matterpros = [];
      let objMatterpro = {};
      this.$set(objMatterpro, "MATTERPRO_CODE", "");
      this.$set(objMatterpro, "MATTERPRO_NAME", "");
      this.$set(objMatterpro, "MATTERPRO_UNIT", "");
      this.$set(objMatterpro, "MATTERPRO_VALUE", "");
      matterpros.push(objMatterpro);
      this.$set(obj, "ALALYSE_DATA", matterpros);
      this.exampleMessageOut.push(obj);
      this.$set(this.objJsonOut, "jsondata", this.exampleMessageOut);
    },
    //全选
    handleSelectionChangeAll(row) {
      let objMap = {};
      this.$set(objMap, "row", row);
      this.$set(objMap, "versionId", this.versionValue);
      if (row.length > 0) {
        updateSelectionType(objMap).then((res) => {
        });
      } else {
        deleteAllCancelSelect(this.versionValue).then((res) => {
        });
      }
    },
    //数据输出接口方式设置保存
    saveIftypeByinterfaceTypeOut() {
      if (this.versionValue != "") {
        if (this.inputApiUrlOut == "") {
          this.$message.warning("请输入接口URL！");
          return;
        }
        //根据版本查询输出接口方式
        selectIftypeOutByVersion(this.versionValue).then((res) => {
          if (res.data.data.length > 0) {
            updateIftypeOut(this.versionValue, this.inputApiUrlOut, this.inputApiTextTypeOut).then((res) => {
              this.$message.success(res.data.msg);
            })
          } else {
            addIftypeOut(this.versionValue, this.inputApiUrlOut, this.inputApiTextTypeOut).then((res) => {
              this.$message.success(res.data.msg);
            })
          }
        })
      } else {
        this.$message.warning("请选择版本！");
      }
    },

    changeLeftMenu() {

      if (this.dataType == 'in') {
        this.objJson = {};
        this.accessVersion = false;
        this.matchList = [];
        this.inputTextUrl = "";
        this.inputTextFile = "";
        this.inputApiUrl = "";
        this.tableDataParams = [];
        this.interfaceTypeRadio = "1";
        this.inputApiTextType = "2";
        this.exampleMessage = [];
        this.objParamsJson = {};
        let versionType = this.dataDesc === 'LIMS' ? 0 : 1;
        catchVersionDetail(versionType).then((res) => {
          if (res.data.code == 200){
            this.versionList = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
        defaultSelect(versionType).then((res) => {
          if (res.data.code == 200){
            this.versionValue = res.data.data.versionId;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.catchMatchDetail(1);
        })
      } else {
        this.inputApiUrlOut = "";
        this.inputApiTextTypeOut = "2";
        this.tableDataOutMatch = [];
        this.versionValue = "";

        if (this.dataDesc === 'LIMS') {
          catchVersionDetail(0).then((res) => {
            if (res.data.code == 200){
              this.versionList = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            defaultSelect(0).then((res) => {
              this.versionValue = res.data.data.versionId;
              this.catchMatchDetail(2);
            })
          });
        } else {
          catchVersionDetail(1).then((res) => {
            if (res.data.code == 200){
              this.versionList = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            defaultSelect(1).then((res) => {
              this.versionValue = res.data.data.versionId;
              this.catchMatchDetail(3);
            })
          });
        }
      }
    }

  },
  watch: {
    menuIndex() {
      this.changeLeftMenu();
    },
    isSmall() {
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      return this.$store.state.common.isSmall;
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1366px) and (max-width: 1919px) {
  /deep/ .el-form-item__label {
    font-size: 16px;
  }

  .spanStyleLeft {
    font-size: 16px;
    color: #409EFF;
    padding: 5px 15px 0px 20px;
  }
}

@media screen and (min-width: 1920px) {
  /deep/ .el-form-item__label {
    font-size: 18px;
  }

  .spanStyleLeft {
    font-size: 18px;
    color: #409EFF;
    padding: 5px 15px 0px 20px;
  }
}

.middleMainDiv {
  height: 100%;
  display: flex;
  flex-direction: column;

  .topDiv {
    flex: 1;
    height: 40%;
  }

  .bottomDiv {
    flex: 3;
    height: 50%;
  }

}

.contentStyle {
  font-size: 15px;
  /* margin-top: 10px; */
  margin-left: 20px;
  margin-right: 20px;
}


/deep/ .el-divider--horizontal {
  margin: 5px 0px !important;
}

.styltyzdclass {
  width: 40%;
  margin-top: 3px;
}
</style>
