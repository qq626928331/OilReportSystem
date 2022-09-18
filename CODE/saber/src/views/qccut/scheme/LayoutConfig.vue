<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="7">
        <el-row>
          <el-form :inline="true" class="propClass">
            <el-col :span="20">
              <el-form-item class="marginClass">
                <span style="font-size: 16px;color: #000000;">表头布局</span>
              </el-form-item>
              <el-form-item class="marginClass">
                <img @click="openOilPropSelDia" src="../../../../public/img/icon/cut/attribute.png"
                     style="cursor: pointer;">
              </el-form-item>
              <el-form-item class="marginClass">
                <img src="../../../../public/img/icon/cut/wx.png" style="cursor: pointer;"
                     @click="openOilWxDia">
              </el-form-item>
              <el-form-item class="marginClass">
                <img @click="addFengefu" :class="[oilPropTableSelData.length?'':'imgdisabled']" src="../../../../public/img/icon/cut/fengefu.png" style="cursor: pointer;">
              </el-form-item>
              <el-form-item class="marginClass">
                <el-button type="text" icon="el-icon-delete" :disabled="!this.oilPropTableSelData.length" @click="delOilProp" style="color: #f56c6c;"></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <el-form-item class="marginClass">
                <el-button type="text" icon="el-icon-rank"></el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-table class="oilProp"
                    border :show-header="false"
                    ref="oilPropTableSel"
                    row-key="id"
                    :data="oilPropTableSelData" height="300px"
                    highlight-current-row
                    :cell-style="{'text-align':'left'}"
                    @current-change="handleCurrentPropChange">
            <el-table-column prop="scbtjibenDimenSionPageDisplay" align="left">
              <template slot-scope="scope">
                <div v-if="scope.row.scbtjibenDimenSionPdType==1">
                  <img style="margin-left: 2px" src="../../../../public/img/icon/cut/attribute.png"/>
                  <span style="padding-left: 10px;">{{ scope.row.scbtjibenDimenSionPageDisplay }}</span>
                </div>
                <div v-if="scope.row.scbtjibenDimenSionPdType==3">
                  <img style="margin-left: 2px" src="../../../../public/img/icon/cut/fengefu.png"/>
                  <span style="padding-left: 10px;">{{ scope.row.scbtjibenDimenSionPageDisplay }}</span>
                </div>
                <div v-if="scope.row.scbtjibenDimenSionPdType==2">
                  <img style="margin-left: 2px" src="../../../../public/img/icon/cut/wx.png"/>
                  <span style="padding-left: 10px;">{{ scope.row.scbtjibenDimenSionPageDisplay }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
      <el-col :span="7">
        <el-row>
          <el-form :inline="true">
            <el-col :span="20">
              <el-form-item class="marginClass">
                <span style="font-size: 16px;color: #000000;">内容布局</span>
              </el-form-item>
              <el-form-item class="marginClass">
                <img @click="addFengefuForBody" src="../../../../public/img/icon/cut/fengefu.png"
                     style="cursor: pointer;">
              </el-form-item>
              <el-form-item class="marginClass">
                <el-button @click="delOilBody" type="text" icon="el-icon-delete" style="color: #f56c6c;"></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="text-align: right;">
              <el-form-item class="marginClass">
                <el-button type="text" icon="el-icon-rank"></el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <div style="border: solid 1px #cccccc;height: 300px;">
            <el-row style="padding: 5px 10px;">
              <el-radio-group size="mini" v-model="outPutType" @change="getOilBodyDataList">
                <el-radio label="W">按物性</el-radio>
                <el-radio label="L">按馏分段</el-radio>
              </el-radio-group>
            </el-row>
            <el-tree ref="treeRef" style="overflow-y: auto;height: 270px;"
                     :data="oilBodyData"
                     :height="270"
                     accordion draggable
                     highlight-current
                     :default-expand-all="false"
                     :default-expanded-keys="firstNodeId"
                     node-key="id" :props="defaultProps"
                     :allow-drop="allowDrop"
                     :current-node-key="currentNodeId"
                     @node-drop="nodeDrop"
                     @node-click="nodeClick"
                     @node-expand="nodeExpand">
            </el-tree>
          </div>
        </el-row>
      </el-col>
      <el-col :span="10">
        <el-row>
          <el-form :inline="true">
            <el-form-item class="marginClass">
              <span style="font-size: 16px;color: #000000;">输出布局预览</span>
            </el-form-item>
          </el-form>
        </el-row>
        <el-row style="border: solid 1px #cccccc">
          <div style="border: solid 1px #cccccc;height: 294px;margin: 3px 15px">
            <el-table :data="outPutPreviewData" height="294px" width="100%" border  @header-dragend="changeColWidth"
                      :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}">
              <el-table-column label="标题" min-width="140" prop="outPutName" show-overflow-tooltip></el-table-column>
              <el-table-column label="名称" width="193"  prop="outPutCode" show-overflow-tooltip></el-table-column>
              <el-table-column  min-width="40"></el-table-column>
            </el-table>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <!--选择原油属性-->
    <el-dialog title="选择原油属性" :append-to-body="true"
               :visible.sync="isShowOilPropEdit">
      <div>
        <el-table border :header-cell-style="{'text-align':'center'}"
                  :data="oilPropTableData" :cell-style="{'text-align':'center'}"
                  @selection-change="selOilPropChange">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column label="属性名称" prop="scbtjibenAttributeName"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setOilProp">确定</el-button>
      </div>
    </el-dialog>
    <!--选择原油切割物性-->
    <el-dialog title="选择原油切割物性" :append-to-body="true" @close="closeWxEdit"
               :visible.sync="isShowOilWxEdit">
      <div style="border: 1px solid #cccccc;height: 280px;padding: 10px 20px;">
        <el-form :inline="true" ref="wxForm" class="formClass" :model="oilPropWxObj" :rules="oilPropRules"
                 label-width="100px">
          <el-col :span="12" style="margin-bottom: 22px">
            <el-form-item label="物性：" prop="scbtjibenDimenSionCode" placeholder="请选择物性">
              <el-select v-model="oilPropWxObj.scbtjibenDimenSionCode" clearable filterable
                         @change="changeWxCode">
                <el-option v-for="(item,index) in wxList" :key="index"
                           :value="item.wxCode" :label="item.wxName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-bottom: 22px" >
            <el-form-item label="馏分段：" placeholder="请选择馏分段" prop="scbtjibenDimenSionSidingId">
              <el-select v-model="oilPropWxObj.scbtjibenDimenSionSidingId" clearable filterable
                         @change="changeSidng">
                <el-option v-for="(item,index) in dimensionSiding" :key="index"
                           :value="item.id" :label="item.scbtjibenWxsidingName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-bottom: 22px">
            <el-form-item label="初馏点：" prop="scbtjibenDimenSionFractionIvt">
              <el-input placeholder="请输入初馏点" v-model="oilPropWxObj.scbtjibenDimenSionFractionIvt" style="width: 194.2px"
                        @change="changeIvt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-bottom: 22px">
            <el-form-item label="终馏点：" prop="scbtjibenDimenSionFractionFvt">
              <el-input placeholder="请输入终馏点" v-model="oilPropWxObj.scbtjibenDimenSionFractionFvt" style="width: 194.2px"
                        @change="changeFvt"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="margin-bottom: 22px">
            <el-form-item label="物性单位：" placeholder="请选择物性单位" prop="scbtjibenDimenSionUnitCode">
              <el-select v-model="oilPropWxObj.scbtjibenDimenSionUnitCode" clearable filterable>
                <el-option v-for="(item,index) in wxUnitList" :key="index"
                           :label="item.wxUnit" :value="item.wxUnitCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setOilWx">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  deleteDimenSionById, deleteDimeSionById, saveBodySeparator,
  saveDimenSionJBen,
  saveDimenSionWx,
  saveSeparator,
  selectAttributeList,
  selectBodyDimeSionList,
  selectDimenSionListById,
  selectDimensionSiding,
  selectOutPutList, selectOutPutListBySchemeId,
  selectwxCode,
  selectwxUnit, updateBodyDimenSionSort,
  updateDimenSionListSort
} from "../../../api/qccut/scheme";
import Sortable from "sortablejs";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "LayoutConfig",
  props: {
    schemeId: Number
  },
  data() {
    let validateFvt = (rule, value, callback) => {
      let rgx = /[^0-9]/g;
      let ivt = this.oilPropWxObj.scbtjibenDimenSionFractionIvt == 'IBP' ? 0 : this.oilPropWxObj.scbtjibenDimenSionFractionIvt;
      let fvt = value == 'FBP' ? 9999 : value
      if (value) {
        if (value === 'IBP') {
          callback(new Error('终馏点不能为IBP'));
        } else if (value.match(rgx) && value !== 'FBP') {
          callback(new Error('终馏点只能输入正整数或FBP'));
        } else if (parseInt(ivt) > parseInt(fvt)) {
          callback(new Error('终馏点不能小于初馏点'));
        } else {
          callback();
        }
      } else {
        callback(new Error('终馏点不能为空'));
      }
    }
    let validateIvt = (rule, value, callback) => {
      let rgx = /[^0-9]/g;
      let ivt = value == 'IBP' ? 0 : value
      let fvt = this.oilPropWxObj.scbtjibenDimenSionFractionFvt == 'FBP' ? 9999 : this.oilPropWxObj.scbtjibenDimenSionFractionFvt;
      if (value) {
        if (value == 'FBP') {
          callback(new Error('初馏点不能为FBP'));
        } else if (value.match(rgx) && value !== 'IBP') {
          callback(new Error('初馏点只能输入正整数或IBP'));
        } else if (parseInt(ivt) > parseInt(fvt)) {
          callback(new Error('初馏点不能大于终馏点'));
        } else {
          callback();
        }
      } else {
        callback(new Error('初馏点不能为空'));
      }
    }
    return {
      isShowOilPropEdit: false,//是否显示原油属性弹出框
      oilPropTableData: [],//原油属性列表数据
      oilPropTableSelData: [],//已选择的原油属性列表数据
      oilPropTempSelIds: [],
      isShowOilWxEdit: false,
      oilPropId: 0,//表头的table当前选中行的id
      wxList: [],//物性下拉列表
      dimensionSiding: [],//物性馏分段下拉列表
      wxUnitList: [],//物性单位下拉列表
      oilPropWxObj: {
        scbtjibenDimenSionCode: '',//物性编码
        scbtjibenDimenSionFractionFvt: '',//物性终馏点
        scbtjibenDimenSionFractionIvt: '',//物性初馏点
        scbtjibenDimenSionName: '',//物性名称
        scbtjibenDimenSionPageDisplay: '',//页面展示字段
        scbtjibenDimenSionSchemeId: this.schemeId,//方案ID
        scbtjibenDimenSionSidingName: '',//物性馏分段
        scbtjibenDimenSionSidingId: '',//馏分段ID
        scbtjibenDimenSionSort: 0,//排序字段
        scbtjibenDimenSionUnit: '',//物性单位
        scbtjibenDimenSionUnitCode: '',//物性单位编码
      },
      oilPropRules: {
        scbtjibenDimenSionCode: [
          {required: true, message: '请选择物性', trigger: 'change'},
        ],
        scbtjibenDimenSionFractionFvt: [
          {required: true, validator: validateFvt, trigger: 'blur'}
        ],
        scbtjibenDimenSionFractionIvt: [
          {required: true, validator: validateIvt, trigger: 'blur'}
        ],
        scbtjibenDimenSionUnitCode: [
          // {required: true, message: '请选择物性单位', trigger: 'change'},
        ]
      },
      outPutType: 'W',
      oilBodyData: [],//内容布局树形数据
      defaultProps: {
        children: 'children',
        label: 'scNrSidingName'
      },
      currentNodeId: 0,//树形当前选中节点
      firstNodeId: [],
      outPutPreviewData: [],
      allowDrop(draggingNode, dropNode, type) {
        if (draggingNode.level === dropNode.level) {
          if (draggingNode.parent.id === dropNode.parent.id) {
            // 向上拖拽 || 向下拖拽
            return type === "prev" || type === "next";
          }
        } else {
          // 不同级进行处理
          return false;
        }
      }
    }
  },
  mounted() {
    this.getOilPropTableList();
    this.selectOutPutList();
  },
  methods: {
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', {style: 'color: teal'}, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
    },
    /**
     * 表头table拖拽排序
     */
    rowDropToOilProp() {
      const tbody = document.querySelector('.oilProp .el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({newIndex, oldIndex}) {
          const currRow = _this.oilPropTableSelData.splice(oldIndex, 1)[0];
          _this.oilPropTableSelData.splice(newIndex, 0, currRow)
          updateDimenSionListSort(_this.oilPropTableSelData).then(res => {
            if (res.data.code === 200) {
              _this.selectOutPutListBySchemeId();
              _this.oilPropTableSelData = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
          _this.$refs.oilPropTableSel.doLayout();
        }
      })
    },
    /**
     * 加载原油属性列表数据
     */
    getOilPropTableList() {
      selectDimenSionListById(this.schemeId).then(res => {
        if (res.data.code === 200) {
          this.oilPropTableSelData = res.data.data;
          this.selectOutPutListBySchemeId();
          if (this.oilPropTableSelData.length > 0) {
            this.oilPropId = this.oilPropTableSelData[0].id;
            this.$refs.oilPropTableSel.setCurrentRow(this.oilPropTableSelData[0]);
          }else {
            this.oilPropTableSelData = [];
          }
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
      this.$nextTick(() => {
        this.rowDropToOilProp();
      })
    },
    /**
     * 表头表格当前选中行改变事件
     * @param val
     */
    handleCurrentPropChange(val) {
      this.oilPropId = val.id;
    },
    /**
     * 打开原油属性弹出框
     */
    openOilPropSelDia() {
      this.oilPropTempSelIds = [];
      this.isShowOilPropEdit = true;
      selectAttributeList().then(res => {
        if (res.data.code === 200) {
          this.oilPropTableData = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 表头属性table复选框监听事件
     */
    selOilPropChange(val) {
      this.oilPropTempSelIds = [];
      val.forEach(item => {
        this.oilPropTempSelIds.push(item.id);
      })
    },
    /**
     * 添加分隔符
     */
    addFengefu() {
      if(this.oilPropTableSelData.length!==0){
        saveSeparator(this.oilPropId, this.schemeId).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getOilPropTableList();
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      }

    },
    /**
     * 打开原油物性编辑弹出框
     */
    openOilWxDia() {
      this.getWxList();
      this.getDimensionSidingList();
      this.oilPropWxObj.scbtjibenDimenSionSidingId = '';
      this.oilPropWxObj.scbtjibenDimenSionFractionIvt = '';
      this.oilPropWxObj.scbtjibenDimenSionFractionFvt = '';
      this.oilPropWxObj.scbtjibenDimenSionCode = '';
      this.oilPropWxObj.scbtjibenDimenSionUnitCode = '';
      this.isShowOilWxEdit = true;
    },
    /**
     * 设置原油属性保存
     */
    setOilProp() {
      saveDimenSionJBen({
        attributeIds: this.oilPropTempSelIds,
        schemeId: this.schemeId
      }).then(res => {
        if (res.data.code === 200) {
          this.isShowOilPropEdit = false;
          this.getOilPropTableList();
          this.$message.success(res.data.msg);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 设置原油切割物性保存
     */
    setOilWx() {
      this.saveDimenSionWx();
    },
    /**
     * 获取物性下拉列表
     */
    getWxList() {
      selectwxCode().then(res => {
        if (res.data.code === 200) {
          this.wxList = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 馏分段下拉列表
     */
    getDimensionSidingList() {
      selectDimensionSiding().then(res => {
        if (res.data.code === 200) {
          this.dimensionSiding = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 获取物性单位下拉列表
     */
    getWxUnitList() {
      selectwxUnit(this.oilPropWxObj.scbtjibenDimenSionCode).then(res => {
        if (res.data.code === 200) {
          this.wxUnitList = res.data.data;
          if (this.wxUnitList.length > 0) {
            this.oilPropWxObj.scbtjibenDimenSionUnitCode = this.wxUnitList[0].defaultUnitCode;
          } else {
            this.oilPropWxObj.scbtjibenDimenSionUnitCode = '';
          }
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 监听物性下拉事件
     * @param val
     */
    changeWxCode(val) {
      this.oilPropWxObj.scbtjibenDimenSionCode = val;
      let tempObj = this.wxList.find(item => {
        return item.wxCode === val;
      })
      this.oilPropWxObj.scbtjibenDimenSionName = tempObj.wxName;
      this.getWxUnitList();
    },
    /**
     * 馏分段选择监听事件
     * @param val
     */
    changeSidng(val) {
      let tempObj = this.dimensionSiding.find(item => {
        return item.id === val;
      })
      if (tempObj) {
        this.oilPropWxObj.scbtjibenDimenSionSidingName = tempObj.scbtjibenWxsidingName;
        this.oilPropWxObj.scbtjibenDimenSionFractionIvt = tempObj.scbtjibenWxFractionIvt;
        this.oilPropWxObj.scbtjibenDimenSionFractionFvt = tempObj.scbtjibenWxFractionFvt;
      }
    },
    /**
     * 初馏点值改变事件
     * @param val
     */
    changeIvt(val) {
      let tempObj = this.dimensionSiding.find(item => {
        return item.scbtjibenWxFractionIvt === val;
      })
      if (!tempObj) {
        this.oilPropWxObj.scbtjibenDimenSionSidingId = '';
        this.oilPropWxObj.scbtjibenDimenSionSidingName = '';
      } else {
        this.oilPropWxObj.scbtjibenDimenSionSidingId = tempObj.id;
        this.oilPropWxObj.scbtjibenDimenSionSidingName = tempObj.scbtjibenWxsidingName;
        this.oilPropWxObj.scbtjibenDimenSionFractionIvt = tempObj.scbtjibenWxFractionIvt;
        this.oilPropWxObj.scbtjibenDimenSionFractionFvt = tempObj.scbtjibenWxFractionFvt;
      }
    },
    /**
     * 终馏点值改变事件
     * @param val
     */
    changeFvt(val) {
      let tempObj = this.dimensionSiding.find(item => {
        return item.scbtjibenWxFractionFvt === val;
      })
      if (!tempObj) {
        this.oilPropWxObj.scbtjibenDimenSionSidingId = '';
        this.oilPropWxObj.scbtjibenDimenSionSidingName = '';
      } else {
        this.oilPropWxObj.scbtjibenDimenSionSidingId = tempObj.id;
        this.oilPropWxObj.scbtjibenDimenSionSidingName = tempObj.scbtjibenWxsidingName;
        this.oilPropWxObj.scbtjibenDimenSionFractionIvt = tempObj.scbtjibenWxFractionIvt;
        this.oilPropWxObj.scbtjibenDimenSionFractionFvt = tempObj.scbtjibenWxFractionFvt;
      }
    },
    /**
     * 表头部分删除属性  或物性
     */
    delOilProp() {
      console.log(this.oilPropTableSelData)
      // if(this.oilPropId!==0){
        deleteDimenSionById(this.oilPropId).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getOilPropTableList();
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      // }

    },
    closeWxEdit(){
      this.$refs['wxForm'].clearValidate();
    },
    /**
     * 合并表头行操作
     */
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      // if (rowIndex < this.oilPropTableSelData.length) {
      //   if (columnIndex === 0) {
      //     return [1, 2];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
    },
    /**
     * 保存添加布局中的物性信息
     */
    saveDimenSionWx() {
      this.$refs['wxForm'].validate((valid) => {
        if (valid) {
          saveDimenSionWx(this.oilPropWxObj).then(res => {
            if (res.data.code === 200) {
              this.getOilPropTableList();
              this.$refs['wxForm'].clearValidate();
              this.$message.success(res.data.msg);
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
          this.isShowOilWxEdit = false;
        } else {
          return false;
        }
      })
    },
    /**
     * 获取当前查询维度
     */
    selectOutPutList() {
      selectOutPutList(this.schemeId).then(res => {
        if (res.data.code === 200) {
          this.outPutType = res.data.data;
          this.getOilBodyDataList();
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 内容布局树形结构
     */
    getOilBodyDataList() {
      selectBodyDimeSionList(this.outPutType, this.schemeId).then(res => {
        if (res.data.code === 200) {
          this.oilBodyData = res.data.data;
          this.selectOutPutListBySchemeId();
          if (this.oilBodyData.length > 0) {
            this.firstNodeId = [this.oilBodyData[0].id];
            this.currentNodeId = this.oilBodyData[0].children[0].id;
            this.$nextTick(() => {
              this.$refs.treeRef.setCurrentKey(this.currentNodeId); //一定要加这个选中了否则样式没有出来
            });
          }
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 树形节点拖拽事件
     */
    nodeDrop(draggingNode, dropNode, type, event) {
      let obj = {
        aboveId: "",
        arr: []
      };
      obj.aboveId = dropNode.data.aboveId;
      for (let item of dropNode.parent.childNodes) {
        obj.arr.push(item.data.id);
      }
      updateBodyDimenSionSort(this.oilBodyData).then(res => {
        let that = this;
        if (res.data.code === 200) {
          this.selectOutPutListBySchemeId();
        } else {
          errorMsgbox(that, res.data.msg);
        }
      })

    },
    /**
     * 节点点击事件
     * @param data
     * @param node
     * @param event
     */
    nodeClick(data, node, event) {
      this.currentNodeId = data.id;
    },
    /**
     * 节点被展开事件
     */
    nodeExpand(data, node, event) {
      if ([data.id] != this.firstNodeId) {
        this.firstNodeId = [];
      }
    },
    /**
     * 内容布局添加分隔符
     */
    addFengefuForBody() {
      saveBodySeparator(this.currentNodeId, this.schemeId).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.getOilBodyDataList();
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 内容布局删除
     */
    delOilBody() {
      deleteDimeSionById(this.currentNodeId).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
          this.getOilBodyDataList();
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 输出布局预览
     */
    selectOutPutListBySchemeId() {
      selectOutPutListBySchemeId(this.schemeId).then(res => {
        if (res.data.code === 200) {
          this.outPutPreviewData = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .imgdisabled{
    cursor:no-drop !important;
  }
.oilProp {
  /deep/ .cell {
    text-align: left !important;
  }
}

.marginClass {
  margin-bottom: 0px !important;
}


.colName {
  background-color: #e5f1fb;
}

.wxName {
  background-color: #40a9ff;
}


.el-button--small {
  font-size: 14px;
}


</style>
