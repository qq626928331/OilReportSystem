<template>
  <el-dialog :visible.sync="isShowEdit"
             width="65%" @close="closeScheme"
             :append-to-body="true"
             :title="isAdd?'添加方案':'编辑方案'" >
<!--                 :before-close="handleClose"
-->
    <div>
      <el-steps :active="activeStep" align-center finish-status="success">
        <el-step title="方案类型"></el-step>
        <el-step title="侧线信息"></el-step>
        <el-step title="物性配置"></el-step>
        <el-step title="输出配置"></el-step>
        <el-step title="布局配置"></el-step>
      </el-steps>
      <div class="stepContainer" style="margin-top: 20px;">
        <!--步骤1 方案类型-->
        <div v-if="activeStep===0">
          <el-form ref="schemeForm" :model="schemeObj" :rules="rules" label-width="100px">
            <el-form-item label="方案名称：" prop="schemeName">
              <el-input placeholder="请输入方案名称" v-model="schemeObj.schemeName" clearable></el-input>
            </el-form-item>
            <el-form-item label="方案类型：" prop="schemeType">
              <el-radio-group v-model="schemeObj.schemeType" :disabled="!isAdd">
                <el-radio label="1">PIMS</el-radio>
                <el-radio label="2">RSIM</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注：" prop="note">
              <el-input placeholder="请输入备注" :rows="5" type="textarea" v-model="schemeObj.note"
                        style="height: 258px"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--步骤2 侧线信息-->
        <div v-else-if="activeStep===1">
          <el-row>
            <el-form :inline="true" :size="formSize">
              <el-form-item style="margin-bottom: 5px;">
                <el-button :size="formSize" type="primary" icon="el-icon-plus" @click="insertSidingRow">
                  插 入
                </el-button>
              </el-form-item>
              <el-form-item style="margin-bottom: 5px;">
                <span style="color: red;">{{ errorMessageTip }}</span>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row>
            <el-table class="schemeSidingTable" ref="schemeSidingTable" :key="Math.random()"
                      :data="schemeSidingList" border height="318"
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}"
                      highlight-current-row  @header-dragend="changeColWidth"
                      @current-change="handleCurrentChange">
              <el-table-column prop="sidingName" label="侧线名称" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <el-input size="mini" v-if="!row.edit" v-model="row.tempVal.sidingName" type="input"></el-input>
                  <span v-else>{{ row.sidingName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sidingCode" label="侧线编码" width="130" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <el-input size="mini" v-if="!row.edit" v-model="row.tempVal.sidingCode" type="input"></el-input>
                  <span v-else>{{ row.sidingCode }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sidingIvt" label="初馏点" width="100" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <el-input size="mini" v-if="!row.edit" v-model="row.tempVal.fractionIvt" type="input"></el-input>
                  <span v-else>{{ row.fractionIvt }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sidingFvt" label="终馏点" width="100" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <el-input size="mini" v-if="!row.edit" v-model="row.tempVal.fractionFvt" type="input"></el-input>
                  <span v-else>{{ row.fractionFvt }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="{row,$index}">
                  <div v-if="row.edit">
                    <i class="el-icon-edit" @click.stop="handleSidingEdit($index, row)"
                       style="cursor: pointer;font-size: 15px;color: #409EFF"></i>
                    <i v-if="$index!==0" class="el-icon-delete" @click.stop="handleSidingDelete($index, row)"
                       style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"></i>
                  </div>
                  <div v-else>
                    <i class="el-icon-check" @click.stop="handleSidingSave($index, row,true)"
                       style="cursor: pointer;font-size: 15px;color: #409EFF"></i>
                    <i class="el-icon-close" @click.stop="handleSidingSave($index, row,false)"
                       style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"></i>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
        <!--步骤3 物性配置-->
        <div v-else-if="activeStep===2">
          <wx-config :schemeId="schemeId"></wx-config>
        </div>
        <!--步骤4 输出配置-->
        <div v-else-if="activeStep===3">
          <out-put-config :schemeId="schemeId"
                          @changeData="changeOutPutData"></out-put-config>
        </div>
        <!--步骤5 布局配置-->
        <div v-else-if="activeStep===4">
          <layout-config :schemeId="schemeId"></layout-config>
        </div>
      </div>

    </div>

    <span slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button @click="preStep" v-if="activeStep!=0">上一步</el-button>
      <el-button type="primary" :disabled="isDisNext" @click="nextStep" v-if="activeStep!=4">下一步</el-button>
      <el-button type="primary" @click="nextStep" v-else>完成</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  addSchemeSiding,
  deleteSidingScheme,
  saveSchemeOutputInfo,
  saveScheme,
  searchSchemeSidingById,
  submitAndSelectSchemeSiding,
  saveBodyDimenSionBySchemeId,
  checkSidingAndBody
} from "../../../api/qccut/scheme";

import WxConfig from "./WxConfig";
import OutPutConfig from "./OutPutConfig";
import LayoutConfig from "./LayoutConfig";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "schemeEdit",
  components: {
    WxConfig,
    OutPutConfig,
    LayoutConfig
  },
  props: {
    isShowEdit: Boolean,
    isAdd: Boolean,
    schemeObj: Object,
    btnFlag:Boolean,
  },
  data() {
    return {
      isSmall: this.$store.state.common.isSmall,
      formSize: this.isSmall ? 'mini' : 'small',
      activeStep: 0,
      nextDisable: false,
      rules: {
        schemeName: [
          {required: true, message: '请输入方案名称', trigger: 'blur'}
        ],
        schemeType: [
          {required: true, message: '请选择方案类型', trigger: 'blur,change'}
        ]
      },
      schemeId: 0,//方案ID
      schemeSidingList: [],//侧线列表
      // originalList:[],
      errorMessageTip: '',//插入侧线数据的报错信息
      selectSidingObj: {},//行点击选中的侧线数据
      addSidingObj: {
        "schemeId": 0,
        "schemesidingId": 0,
        "sidingName": '',
        "sidingCode": '',
        "fractionIvt": '',
        "fractionFvt": '',
      },//模拟切割第二步新增测线时默认数据
      outPutChangeData: [],
      schemeSidingHeight: '260px',
      isDisNext: false,//禁用下一步
    }
  },
  mounted() {
    this.isSmall = this.$store.state.common.isSmall;
    this.formSize = this.isSmall ? 'mini' : 'small';
    console.log(this.schemeObj);
    console.log(this.isShowEdit);
  },
  methods: {
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    /**
     * 上一步
     */
    preStep() {
      if (this.activeStep === 1){
        this.schemeObj.schemeId = this.schemeId;
      }
      this.errorMessageTip = '';
      this.isDisNext = false;
      if (this.activeStep === 3) {
        this.checkData(false);
      } else {
        this.activeStep--;
      }
      this.$refs['schemeForm'].clearValidate();
    },
    /**
     * 下一步
     */
    nextStep() {
      this.errorMessageTip = '';
      switch (this.activeStep) {
        case 0:
          this.saveSchemeInfo()
          // console.log(111)
          // this.$emit('addSchemeInfo', true);
          break;
        case 1:
          //验证侧线信息数据正确性
          if (!this.checkSidingData(this.schemeSidingList)) {
            this.activeStep++;
          } else {
            this.isDisNext = true;
          }
          break;
        case 2:
          this.activeStep++;
          break;
        case 3:
          this.checkData(true);
          break;
        case 4:
          // console.log('完成')
          // console.log('完成')
          // checkSidingAndBody()
          // this.schemeId
          // console.log(this.schemeId,'...')
          let obj = {
            flag:this.btnFlag,
            Id:this.schemeId
          }
          this.$emit('finishScheme', obj); //刷新列表
          // this.$emit('closeEditScheme', true); //刷新列表

          break;
      }
    },
    handleClose(){
      console.log()
      this.$emit('handleCloses'); //刷新列表

    },
    /**
     * 关闭弹窗
     */
    closeScheme(){
      this.$emit('closeEditScheme', true);
    },
    /**
     * 保存方案信息
     */
    saveSchemeInfo() {
      this.$refs['schemeForm'].validate((valid) => {
        if (valid) {
          saveScheme(this.schemeObj).then(res => {
            if (res.data.code === 200) {
              // console.log(res,'///res.data')
              this.schemeId = res.data.data.schemeId;
              this.schemeSidingList = res.data.data.schemeSidingList;
              this.backupsMatterlists = JSON.parse(JSON.stringify(res.data.data.schemeSidingList))
              this.schemeSidingList.forEach((item, index) => {
                this.$set(item, 'edit', true);
                this.$set(item, 'index', index);
                this.$set(item, 'tempVal', JSON.parse(JSON.stringify(item)));
              })
              this.activeStep++;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.isDisNext = false;
          })
        }
      });
    },
    /**
     * 加载侧线列表
     */
    loadSidingList() {
      searchSchemeSidingById(this.schemeId).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        } else {
          this.schemeSidingList = res.data.data;
          this.checkSidingData(this.schemeSidingList);
          this.schemeSidingList.forEach((item, index) => {
            this.$set(item, 'edit', true)
            this.$set(item, 'index', index);
            this.$set(item, 'tempVal', JSON.parse(JSON.stringify(item)));
          })
        }
      })
      let that = this;
      that.$nextTick(() => {
        if (that.schemeSidingList.length > 0) {
          that.$refs.schemeSidingTable.setCurrentRow(that.schemeSidingList[0]);
        }
      })
    },
    /**
     * 监听当前选中行变化
     * @param val
     */
    handleCurrentChange(val) {
      this.selectSidingObj = val;
    },
    /**
     * 侧线编辑事件
     */
    handleSidingEdit(index, row) {
      console.log(this.schemeSidingList,this.backupsMatterlists,'row')//schemesidingId
      // this.backupsMatterlists.forEach((item,i)=>{
      //   this.schemeSidingList.forEach((ele,j)=>{
      //     // debugger
      //     if(item.schemesidingId == ele.schemesidingId){
      //       let a = this.schemeSidingList[j]
      //       // console.log(this.backupsMatterlists[i])
      //       this.schemeSidingList[j].tempVal.sidingName = this.backupsMatterlists[i].sidingName
      //       this.schemeSidingList[j].tempVal.sidingCode = this.backupsMatterlists[i].sidingCode
      //       this.schemeSidingList[j].tempVal.fractionFvt = this.backupsMatterlists[i].fractionFvt
      //       this.schemeSidingList[j].tempVal.fractionIvt = this.backupsMatterlists[i].fractionIvt
      //     }
      //   })
      // })
      this.schemeSidingList.forEach((item,index)=>{
        if(item.schemesidingId == row.schemesidingId){
          this.schemeSidingList[index].edit = !this.schemeSidingList[index].edit
        }else if(item.schemesidingId != row.schemesidingId) {
          this.schemeSidingList[index].edit = true
        }
      })
      this.schemeSidingList.push({a:0})
      this.schemeSidingList.pop()
      this.checkSidingData(this.schemeSidingList);
      // row.edit = false;
    },
    /**
     * 侧线编辑保存
     */
    handleSidingSave(index, row, isSave) {
      if (isSave) {//保存测试
        let originalcode = ''
        submitAndSelectSchemeSiding(JSON.parse(JSON.stringify(row.tempVal))).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }

          this.schemeSidingList.forEach((item,index)=>{
            // console.log(item)
            if(item.schemesidingId == row.schemesidingId){
              // console.log(this.schemeSidingList[index].sidingCode)
              originalcode = this.schemeSidingList[index].sidingCode
            }
          })

          row.edit = true;
          row.fractionFvt = row.tempVal.fractionFvt;
          row.fractionIvt = row.tempVal.fractionIvt;
          row.sidingName = row.tempVal.sidingName;
          row.sidingCode = row.tempVal.sidingCode


       if(res.data.code === 200){
            this.schemeSidingList = res.data.data;
            this.schemeSidingList.forEach((item, index) => {
              this.$set(item, 'edit', true)
              this.$set(item, 'index', index);
              this.$set(item, 'tempVal', JSON.parse(JSON.stringify(item)));
            })
            this.$nextTick(() => {
              if (this.schemeSidingList.length > 0) {
                this.selectSidingObj = this.schemeSidingList[0]
                this.$refs.schemeSidingTable.setCurrentRow(this.schemeSidingList[0]);
              }
            })
          }else {
            row.sidingCode = originalcode
            let that = this;
            errorMsgbox(that, res.data.msg)
          }

        });
      } else {//取消保存
        if (row.schemesidingId == 0) {//新增行之后的取消，要把当前行移除
          this.schemeSidingList.splice(index, 1);
        } else {
          row.tempVal = {
            createddate: row.createddate,
            createduser: row.createduser,
            fractionFvt: row.fractionFvt,
            fractionIvt: row.fractionIvt,
            isDeleted: row.isDeleted,
            lastwrittentime: row.lastwrittentime,
            modifieddate: row.modifieddate,
            modifieduser: row.modifieduser,
            note: row.note,
            schemeId: row.schemeId,
            schemesidingId: row.schemesidingId,
            sidingCode: row.sidingCode,
            sidingName: row.sidingName,
            uorder: row.uorder
          };
          row.edit = true;
        }
      }
      let that = this;
      that.$nextTick(() => {
        if (that.schemeSidingList.length > 0) {
          that.selectSidingObj = that.schemeSidingList[0]
          that.$refs.schemeSidingTable.setCurrentRow(that.schemeSidingList[0]);
        }
      })
      this.checkSidingData(this.schemeSidingList);
    },
    //侧线列表校验事件
    checkSidingData(sidingData) {
      this.isDisNext = false;
      this.errorMessageTip = "";
      let errorMessage = "";
      for (let i = 0; i < sidingData.length; i++) {
        let up = [];
        let down = [];
        if (sidingData[i].tempVal.fractionIvt == 'FBP') {
          errorMessage += "侧线的初馏点不能为FBP;";
          this.isDisNext = true;
          this.errorMessageTip = errorMessage;
          break;
        }
        if (sidingData[i].tempVal.fractionFvt == 'IBP') {
          errorMessage += "侧线的终馏点不能为IBP;";
          this.isDisNext = true;
          this.errorMessageTip = errorMessage;
          break;
        }
        if (sidingData[i].tempVal.fractionFvt == sidingData[i].tempVal.fractionIvt) {
          errorMessage += '初馏点与终馏点不能相等;'
          this.isDisNext = true;
          this.errorMessageTip = errorMessage;
          break;
        }
        if ((sidingData[i].tempVal.fractionFvt === 'FBP' ? 9999 : parseInt(sidingData[i].tempVal.fractionFvt)) < (sidingData[i].tempVal.fractionIvt === 'IBP' ? -9999 : parseInt(sidingData[i].tempVal.fractionIvt))) {
          errorMessage += '终馏点不能小于初馏点;'
          this.isDisNext = true;
          this.errorMessageTip = errorMessage;
          break;
        }
        if (i == 0) {//当前数据为第一条数据，直接保存，不做校验

        } else if (i == sidingData.length - 1) {//当前数据为最后一条数据
          up = sidingData[i - 1];
          if (up.tempVal.fractionFvt == sidingData[i].tempVal.fractionIvt) {//判断是否相等
            this.isDisNext = false;
          } else {//不相等
            errorMessage += "方案侧线的初馏点与终馏点不连续，请检查;";
            this.errorMessageTip = errorMessage;
            this.isDisNext = true;
            break;
          }
        } else {
          up = sidingData[i - 1];//前一条数据
          down = sidingData[i + 1];//后一条数据
          if (up.tempVal.fractionFvt == sidingData[i].tempVal.fractionIvt) {
            if (sidingData[i].tempVal.fractionFvt == down.tempVal.fractionIvt) {
              //
            } else {
              errorMessage += "方案侧线的初馏点与终馏点不连续，请检查;";
              this.errorMessageTip = errorMessage;
              this.isDisNext = true;
              break;
            }
          } else {
            errorMessage += "方案侧线的初馏点与终馏点不连续，请检查;";
            this.errorMessageTip = errorMessage;
            this.isDisNext = true;
            break;
          }
        }
      }
      return errorMessage;
    },
    /**
     * 侧线删除
     * @param index
     * @param row
     */
    handleSidingDelete(index, row) {
      if (index === 0) {
        this.errorMessageTip = '请勿删除首条数据如需修改编辑即可'
      } else {
        deleteSidingScheme(row.schemesidingId).then(res => {
          if (res.data.code === 200) {
            this.schemeSidingList.splice(index, 1);
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg)
          }
          this.checkSidingData(this.schemeSidingList);
        });
      }
      let that = this;
      that.$nextTick(() => {
        if (that.schemeSidingList.length > 0) {
          that.selectSidingObj = that.schemeSidingList[0]
          that.$refs.schemeSidingTable.setCurrentRow(that.schemeSidingList[0]);
        }
      })
    },
    /**
     * 侧线插入按钮事件
     */
    insertSidingRow() {

      let that = this;
      that.addSidingObj.schemeId = that.schemeId;
      that.addSidingObj.uorder = that.selectSidingObj.uorder + 1;
      //新增侧线信息
      addSchemeSiding(that.addSidingObj).then(res => {

        if (res.data.code === 200) {
          let tempObj = res.data.data;
          tempObj.fractionIvt = that.selectSidingObj.fractionFvt
          tempObj.fractionFvt = that.selectSidingObj.fractionFvt
          tempObj.sidingName = '馏分段(' + tempObj.fractionIvt + '-' + tempObj.fractionFvt + ')'
          tempObj.tempVal = JSON.decycle(tempObj);
          tempObj.edit = false;
          that.schemeSidingList.splice(that.selectSidingObj.index + 1, 0, tempObj)
          that.$set(that.schemeSidingList[that.selectSidingObj.index + 1], 'edit', false);
          that.$refs.schemeSidingTable.setCurrentRow(this.schemeSidingList[this.selectSidingObj.index + 1]);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    /**
     * 监听输出配置数据变化
     * @param val
     */
    changeOutPutData(val) {
      this.outPutChangeData = val;
    },
    checkData(isAdd) {
      if (this.outPutChangeData.length > 0) {
        //调接口保存
        saveSchemeOutputInfo(this.outPutChangeData).then(() => {
          isAdd ? this.activeStep++ : this.activeStep--;
        });

      } else {
        isAdd ? this.activeStep++ : this.activeStep--;
      }
    },
    saveBodyDimenSionBySchemeId() {
      saveBodyDimenSionBySchemeId(this.schemeId).then(res => {
        if (res.data.code === 200) {
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    }
  },
  watch: {
    isSmall() {
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      return this.$store.state.common.isSmall;
    },
    isShowEdit() {
      if (!this.isShowEdit) {
        this.isDisNext = false;
        this.$refs['schemeForm'].clearValidate();
        this.$emit('closeEditScheme', false);
      } else {
        this.activeStep = 0;
      }

    },
    activeStep() {
      if (this.activeStep === 1) {
        let that = this;
        that.$nextTick(() => {
          if (that.schemeSidingList.length > 0) {
            that.selectSidingObj = that.schemeSidingList[0]
            that.$refs.schemeSidingTable.setCurrentRow(that.schemeSidingList[0]);
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1366px) and (max-width: 1919px) {
  .stepContainer {
    height: 290px;
  }
}

@media screen and (max-width: 1920px) {
  .stepContainer {
    height: 350px;

    .schemeSidingTable {
      height: 305px;
    }
  }
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 18px  !important;
}
</style>
