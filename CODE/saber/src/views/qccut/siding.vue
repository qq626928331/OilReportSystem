<template>
  <div>
    <el-row>
      <el-col :span="6">
        <basic-container>
          <el-card :style="cardstyle"  shadow="never">
            <div slot="header" class="clearfix">
              <el-radio v-model="sidetype" @change="changesidetype" label="1">PIMS</el-radio>
              <el-radio v-model="sidetype" @change="changesidetype" label="2">RSIM</el-radio>
            </div>
            <span style="font-size: 15px">物性类别</span>
            <el-divider></el-divider>
            <el-row class="text" :style="{height:tableheight}" v-for="(item, index) in treeData" :key="index"
                    :class="item.dictKey == rangeCode ? 'texted':''">
              <el-col :span="21">
                <div @click="rangeClick(item.dictKey)">
                  <span style="margin-left: 10px">{{item.dictValue}}</span>
                </div>
              </el-col>
              <el-col :span="2">
                <img src="../../../public/icon/btn_Pencil.png" style="float: right" @click="iconClick(item.dictKey)">
              </el-col>
              <el-col :span="1"></el-col>
            </el-row>
          </el-card>
        </basic-container>
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="24">
            <basic-container>
              <div style="margin-bottom: 10px">
                <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd">
                  添 加
                </el-button>
                <span style="color: red;"> &nbsp; {{ errorMessageTip }}</span>
              </div>
              <el-table :data="rightupdata" size="small" ref="rightuptable" border :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}" :height="tableheightRSIM1" @row-click="changeCopyData"
                style="width: 100%" highlight-current-row @header-dragend="changeColWidth">
                <el-table-column type="index" label="序号" header-align="center" :resizable="false" width="70"></el-table-column>
                <el-table-column prop="sidingName" label="侧线名称" min-width="130" :resizable="false" show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input v-if="!row.edit"  v-model="row.sidingName" type="input"></el-input>
                    <span v-else >{{row.sidingName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sidingCode" label="侧线编码" min-width="90" :resizable="false"  show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input  v-if="!row.edit" v-model="row.sidingCode" type="input"></el-input>
                    <span v-else>{{row.sidingCode}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sidingIvt" label="初馏点" min-width="90" :resizable="false" show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input  v-if="!row.edit && rangeCode=='1'" v-model="row.sidingIvt" type="input"></el-input>
                    <span v-else>{{row.sidingIvt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sidingFvt" label="终馏点" min-width="80" :resizable="false" show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input v-if="!row.edit && rangeCode=='1'" v-model="row.sidingFvt" type="input"></el-input>
                    <span v-else>{{row.sidingFvt}}</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" :resizable="false" show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <i class="el-icon-edit" @click="handleEditRight($index, row)"
                       style="cursor: pointer;font-size: 15px;color: #409EFF" v-if="row.edit"></i>
                    <i class="el-icon-delete" @click="handleDeleteRight($index, row)"
                       style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px" v-if="row.edit"></i>
                    <i class="el-icon-check" @click="handleUpdate($index, row)"
                       style="cursor: pointer;font-size: 15px;color: #409EFF"  v-if="!row.edit"></i>
                    <i class="el-icon-close" @click="handelCancel($index, row)"
                       style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"  v-if="!row.edit"></i>
                  </template>
                </el-table-column>
              </el-table>
            </basic-container>
          </el-col>
        </el-row>
        <el-row>
          <basic-container>
            <div style="margin-bottom: 10px;">
              <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAddMa">
                添 加
              </el-button>
              <el-button type="danger" size="small" icon="el-icon-delete"
                         plain
                         @click="handleDeleteMa">删 除</el-button>
            </div>
            <el-table
              :data="rightdowndata" size="small"
              border :header-cell-style="{'text-align':'center'}" class="tb-edit"
              :cell-style="{'text-align':'center'}" @selection-change="handleChange"
              :height='tableheightDownMatterpro'
              style="width: 100%" highlight-current-row >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" header-align="center" min-width="70" :resizable="false"></el-table-column>
              <el-table-column prop="matterproName" label="物性名称" :resizable="false">
                <template slot-scope="{row,$index}">
                  <el-select size="small" filterable v-model="row.matterproCode" placeholder="请选择物性单位" @change="getValue($index,row)">
                    <el-option
                      v-for="item in materprolist"
                      :key="item.matterproCode"
                      :label="item.matterproName"
                      :value="item.matterproCode">
                    </el-option>
                  </el-select>
                  <span style='color: #0000ff'>{{row.matterproName}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="matterproCode" min-width="100" label="物性编码" :resizable="false">
                <template slot-scope="{row,$index}">
                  <span>{{row.matterproCode}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="matterproUnit" label="物性单位" :resizable="false">
                <template slot-scope="{row,$index}">
                  <span>{{row.matterproUnit}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="flag" label="是否有效" :resizable="false">
                <template slot-scope="{row,$index}">
                  <span v-if="row.flag=='0'">有效</span>
                  <span v-else>无效</span>
                </template>
              </el-table-column>
            </el-table>
          </basic-container>
        </el-row>
      </el-col>
  </el-row>
  <!--物性编辑的弹窗-->
  <el-dialog title=" 物性分类配置(常规)"
    :visible.sync="matterdialog"
    width="60%" :append-to-body="true"
    >
    <el-row>
      <el-col :span="10">
        <div style="margin-bottom: 15px">
          <span>待选物性:</span>
          <el-input placeholder="请输入物性编码" v-model="dialogleftsearchcode" size="small" style="width:180px;margin-left: 3ex"></el-input>
          <el-button size="small" type="primary" style="margin-left: 5ex" @click="dialogleftselect">
            查询
          </el-button>
        </div>
        <el-table size="small"
                  :data="dialogleftdata"
                  border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                  @selection-change="dialogleftcheckAll"
                  style="width: 100%"
                  row-key="index"
                  :height="400">
          <el-table-column
            type="selection"  header-align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="matterproName"
            label="物性名称"
          >
          </el-table-column>
          <el-table-column
            prop="matterproCode"
            label="物性编码"
            width="70"
          >
          </el-table-column>

          <el-table-column
            prop="matterproUnit"
            label="物性单位"
            width="100"
          >
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4">
        <div class="opSetting">
          <div @click="dialoghandelSelect">
            <el-button icon="el-icon-d-arrow-right" :disabled="nowSelectData.length?false:true" size="medium" type="primary" >
              选中
            </el-button>
          </div>
          <div class="spacing" @click="dialoghandleRemoveSelect">
            <el-button icon="el-icon-d-arrow-left" :disabled="nowSelectRightData.length?false:true" size="medium" type="primary">
              取消
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div style="margin-bottom: 15px">
          <span>已选物性:</span>
          <el-input placeholder="请输入物性编码" v-model="dialogrightsearchcode" size="small" style="width:180px;margin-left: 3ex"></el-input>
          <el-button size="small" type="primary"  style="margin-left: 5ex" @click="dialogrightselect">
            查询
          </el-button>
        </div>
        <el-table
          :data="dialogrightdata" size="small"
          border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
          ref="selection"
          @selection-change="dialogcheckRightAll"
          style="width: 100%"
          row-key="index"
          :height="400">
          <el-table-column
            type="selection"
            width="55" header-align="center">
          </el-table-column>
          <el-table-column
            prop="matterproName"
            label="物性名称"
          >
          </el-table-column>
          <el-table-column
            prop="matterproCode"
            label="物性编码"
            width="70"
          >
          </el-table-column>
          <el-table-column
            prop="matterproUnit"
            label="物性单位"
            width="100"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-dialog>
  </div>
</template>

<script>
  import Sortable from 'sortablejs';
  import {addRow,update,remove,getList,
    selectMatterproBySiding,selectBySidCode,updateWithOrder,
    addSidingMatterpro,deleteMa} from "@/api/qccut/siding";
  import {
    searchMaterproSort, waitSearchMaterpro, alreadySearchMaterpro,
    waitToAlreadyChoose, alreadyTowaitChoose, waitSearchMaterproByCode,
    alreadySearchMaterproByCode } from "@/api/qcadmin/materprosort";
  import {mapGetters} from "vuex";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qccut/siding',
    data() {
      return {
        sidetype:'1',
        matterdialog:false,
        cardstyle:'',//card的样式
        cardstyle1:'',
        rangeCode:'1',//物性分类code 常规 轻端 石脑油
        editcode:'',//编辑的code
        treeData:[],//物性的列表
        tableheight:0,
        rightupdata: [],//右上数据
        rightdowndata:[],//右下数据
        pisidingname:'',//侧线名称查询条件
        rssidingname:'',//侧线名称查询条件
        malist:[],
        materprolist:[],
        rsdata:[],//行选中的对象
        tableheightRSIM1:0,//上方侧线页面table高度
        tableheightDownMatterpro:0,//下方物性页面table高度
        dialogrightdata:[],  // 右边列表数据
        dialogleftdata:[],  //左侧列表数据
        nowSelectData: [], // 左边选中列表数据
        nowSelectRightData: [], // 右边选中列表数据
        dialogleftsearchcode:'',
        dialogrightsearchcode:'',
        timelines:[],//时间轴对象
        errorMessageTip: '',//插入侧线数据的报错信息
        tabsCode:'',
        backupsMatterlists:[],
      };
    },
    computed: {
      ids() {
        let ids = [];
        this.malist.forEach((ele) => {
          ids.push(ele.sidmatId);
        });
        return ids.join(",");
      },
    },
    beforeMount() {
      this.setClientHight()
    },
    mounted() {
      window.addEventListener('resize', () => this.setClientHight(), false)
      this.initTableData();
      this.rowDrop();
    },
    watch:{
      rightupdata(){//监测数据变化渲染表格
        this.timelines=[];
        for(var i=0;i<this.rightupdata.length;i++){
          let time = {
            content:'',
            code:'',
            start:'',
            end:'',
            size: 'large',
            icon: '',
            color: ''
          };
          let one = this.rightupdata[i];
          if(i==0){//第一个
            time.color='#409EFF';
            time.icon='el-icon-check';
          }else{//其他
            let up = this.rightupdata[i-1];
            if(up.sidingFvt==null || up.sidingFvt=='' ||up.sidingFvt==undefined ||
              up.sidingIvt==null || up.sidingIvt=='' ||up.sidingIvt==undefined ){
                time.color='#F9AC00';
                time.icon='el-icon-question';
            }else{
              if(up.sidingFvt==one.sidingIvt){
                time.color='#409EFF';
                time.icon='el-icon-check';
              }else {
                time.color='#F9AC00';
                time.icon='el-icon-question';
              }
            }

          }
          time.content=i+1+". "+one.sidingName;
          time.code=one.sidingCode;
          time.start=one.sidingIvt;
          time.end=one.sidingFvt;
          this.timelines.push(time);
        }
      }
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        this.tableheight=h;
        var hh = h-145;
        this.cardstyle="height:"+hh+"px;border: 0px solid #EBEEF5;overflow: hidden;color: #303133;-webkit-transition: .3s;transition: .3s;";
        var h1 = h-431;
        this.cardstyle1="height:"+h1+"px;border: 0px solid #EBEEF5;overflow: auto;color: #303133;-webkit-transition: .3s;transition: .3s;";
        //保证右侧上方的侧线table高度与下方的物性高度table保持一致
        this.tableheightRSIM1= (h-251)/2;
        this.tableheightDownMatterpro= (h-251)/2;
      },
      //  编辑提交后的校验
      checkRules (index,row) {
        try {
          if (this.rangeCode === '1' && this.rightupdata.length >=1) {
            for (var i = 0; i < this.rightupdata.length; i++) {
              if ( index !==0 && (row.sidingIvt !== this.rightupdata[index - 1].sidingFvt)) {
                this.$message({
                  message: '当前行填写的初馏值不符',
                  type: 'warning'
                });
                return false
              }
              if (row.sidingFvt === 'FBP' && (index !== this.rightupdata.length - 1)) {
                this.$message({
                  message: '当前行填写的终馏值不符',
                  type: 'warning'
                });
                return false
              }
              // if (index !==0 && row.sidingFvt !== 'FBP' && (index === this.rightupdata.length - 1)) {
              //   this.$message({
              //     message: '当前行填写的终馏值必须为FBP',
              //     type: 'warning'
              //   });
              //   return false
              // }
              // if (row.sidingIvt !== 'IBP' && index === 0) {
              //   this.$message({
              //     message: '当前行填写的初馏值必须为IBP',
              //     type: 'warning'
              //   });
              //   return false
              // }
              if (Number(row.sidingIvt)  > Number(row.sidingFvt) ) {
                this.$message({
                  message: '当前行填写的终馏值不能低于初馏值',
                  type: 'warning'
                });
                return false
              }
              if (row.sidingFvt === row.sidingIvt){
                this.$message({
                  message: '当前行填写的初馏值、终馏值不符',
                  type: 'warning'
                });
                return false
              }
              // if (  (index !== this.rightupdata.length -1) &&row.sidingFvt !== this.rightupdata[index + 1].sidingIvt){
              //   this.$message({
              //     message: '当前行填写的终馏值不符',
              //     type: 'warning'
              //   });
              //   return false
              // }
              if (row.sidingIvt === 'IBP' && (index !== 0)) {
                this.$message({
                  message: '当前行填写的终馏值不符',
                  type: 'warning'
                });
                return false
              }
              if (row.sidingFvt === 'IBP') {
                this.$message({
                  message: '当前行填写的终馏值不能为IBP',
                  type: 'warning'
                });
                return false
              }
              if (row.sidingIvt === 'FBP') {
                this.$message({
                  message: '当前行填写的初馏值不能为FBP',
                  type: 'warning'
                });
                return false
              }
              let array = [];
              if (row.sidingCode === this.rightupdata[index].sidingCode) {
                array.push(row.sidingCode);
                if (array.length > 1) {
                  this.$message({
                    message: '侧线编码重复',
                    type: 'warning'
                  });
                  return false
                }
              }
              if (Number(row.sidingIvt) > Number(row.sidingFvt) && (row.sidingFvt !== 'FBP')) {
                this.$message({
                  message: '当前行填写终馏值不符',
                  type: 'warning'
                });
                return false
              }
            }
          }
          return true
        } catch (e) {
          console.log(e)
        }

      },
      changeColWidth(nw,ow,col,evt){
       let aa = document.querySelector('col');
       console.log(aa);
        if(nw < 80){
          nw = 80;
        }
        console.log(ow);
        console.log(col);
        console.log(evt);
      },
      //row 行对象
      update(row,index) {
        if (!this.checkRules(index, row)) {
          this.onload();
          return false
        }
        updateWithOrder(row.sidingId,row.nodeLevel).then(() => {
          this.onload();
        }, error => {
          console.log(error);
        });
      },
      //侧线列表校验事件
      checkSidingData(sidingData) {
        this.errorMessageTip = "";
        let errorMessage = "";
        for (let i = 0; i < sidingData.length; i++) {
          let up = [];
          let down = [];
          if (sidingData[i].sidingIvt == 'FBP') {
            errorMessage += "侧线的初馏点不能为FBP;";
            this.errorMessageTip = errorMessage;
            break;
          }
          if (sidingData[i].sidingFvt == 'IBP') {
            errorMessage += "侧线的终馏点不能为IBP;";
            this.errorMessageTip = errorMessage;
            break;
          }
          if (sidingData[i].sidingFvt == sidingData[i].sidingIvt) {
            errorMessage += '初馏点与终馏点不能相等;'
            this.errorMessageTip = errorMessage;
            break;
          }
          if ((sidingData[i].sidingFvt === 'FBP' ? 9999 : parseInt(sidingData[i].sidingFvt)) < (sidingData[i].sidingIvt === 'IBP' ? -9999 : parseInt(sidingData[i].sidingIvt))) {
            errorMessage += '终馏点不能小于初馏点;'
            this.errorMessageTip = errorMessage;
            break;
          }
          if (i == 0) {//当前数据为第一条数据，直接保存，不做校验
            if (sidingData[0].sidingIvt !== 'IBP') {
              errorMessage += "首行初馏点建议为IBP;";
              this.errorMessageTip = errorMessage;
              break;
            }
          } else if (i == sidingData.length - 1) {//当前数据为最后一条数据
            up = sidingData[i - 1];
            if (sidingData[i].sidingFvt != 'FBP'){
              errorMessage += "末行终馏点建议为FBP;";
              this.errorMessageTip = errorMessage;
              break;
            }
            if (up.sidingFvt == sidingData[i].sidingIvt) {//判断是否相等
            } else {//不相等
              errorMessage += "方案侧线的初馏点与终馏点不连续，请检查;";
              this.errorMessageTip = errorMessage;
              break;
            }
          } else {
            up = sidingData[i - 1];//前一条数据
            down = sidingData[i + 1];//后一条数据
            if (up.sidingFvt == sidingData[i].sidingIvt) {
              if (sidingData[i].sidingFvt == down.sidingIvt) {
                //
              } else {
                errorMessage += "方案侧线的初馏点与终馏点不连续，请检查;";
                this.errorMessageTip = errorMessage;
                break;
              }
            } else {
              errorMessage += "方案侧线的初馏点与终馏点不连续，请检查;";
              this.errorMessageTip = errorMessage;
              break;
            }
          }
        }
        if(this.tabsCode == 2 ||this.tabsCode == 3){
          // console.log(2)
          this.errorMessageTip = ''
        }
        return errorMessage;
      },
       //行拖拽
      rowDrop () {
        // 此时找到的元素是要拖拽元素的父容器
        const tbody = document.querySelector('.el-table__body-wrapper tbody');
        const that = this;
        let data = [];
        Sortable.create(tbody, {
          draggable: ".el-table__row",
          onEnd:function(evt){
            that.rightupdata.splice(evt.newIndex, 0, that.rightupdata.splice(evt.oldIndex, 1)[0]);
            var newArray = that.rightupdata.slice(0);
            that.rightupdata = [];
            that.$nextTick(function () {
              that.rightupdata = newArray;
              for (var i=0;i<that.rightupdata.length;i++){
                var a = that.rightupdata[i];
                a.nodeLevel=i+1;
                that.update(a,i);
              }
            });
          }
        });
        // 将 data变量中的 信息 赋值给 tableData 重新渲染列表数据
        if(!data){
          this.rightupdata = data;
        }
      },
      //更改方案类型
      changesidetype(){
        this.onload();
      },
      //加载物性数据
      initTableData(){
        searchMaterproSort().then(res =>{
          if (res.data.code === 200) {
            this.rangeCode=res.data.data[0].dictKey;
            this.treeData=res.data.data;
          } else {
            errorMsgbox(this, res.data.msg);
          }
          this.onload();
          this.selectMatterproBySort();
        });
      },
      //点击左侧文字,更改数据
      rangeClick(code){
        console.log(code,'/codecodecode')
        this.rangeCode = code;  //设置code值，并添加样式
        this.rightupdata=[];
        this.rightdowndata=[];
        this.onload();
        this.selectMatterproBySort();
        this.tabsCode = code
      },
      //点击编辑图标后进行修改
      iconClick(code){
        this.matterdialog=true;
        this.editcode=code;
        this.initDialogTableData();
      },
      //添加方法
      handleAdd(){
        addRow(this.sidetype,this.rangeCode).then(res=>{
          if (res.data.code === 200) {
            this.rightupdata.push(res.data.data);
          } else {
            errorMsgbox(this, res.data.msg);
          }
          this.$set(this.rightupdata[this.rightupdata.length-1],'edit',false);
          this.$refs.rightuptable.setCurrentRow(this.rightupdata[this.rightupdata.length-1]);
        });
      },
      //加载右上的的table数据
      onload(){
        this.rightdowndata=[];//将下方表格置为空
        getList(this.sidetype,this.rangeCode,'').then(res=>{
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.rightupdata=res.data.data;
           this.backupsMatterlists = JSON.parse(JSON.stringify(res.data.data))
          if(this.rightupdata.length>0){
            for(var i = 0; i < this.rightupdata.length; i ++) {
              this.$set(this.rightupdata[i],'edit',true);
            }
            this.$refs.rightuptable.setCurrentRow(this.rightupdata[0]);//左侧列表默认选中第一行
            //根据第一行加载物性信息列表
            this.onload2(this.rightupdata[0]);
          }
          this.checkSidingData(this.rightupdata);
        });
      },
      //删除PIMS
      handleDeleteRight(index, row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.sidingId).then((res) => {
              if (res.data.code != 200){
                return errorMsgbox(this,res.data.msg)
              }
              this.onload();
              this.$message({
                type: "success",
                message: res.data.msg
              });
            });
          })
      },
      //点击右侧表格编辑
      handleEditRight(index, row) {
        // console.log(this.backupsMatterlists,this.rightupdata)
        this.backupsMatterlists.forEach((item,i)=>{
          this.rightupdata.forEach((ele,j)=>{
            if(item.sidingId == ele.sidingId){
              this.rightupdata[j].sidingName = this.backupsMatterlists[i].sidingName
              this.rightupdata[j].sidingCode = this.backupsMatterlists[i].sidingCode
              this.rightupdata[j].sidingIvt = this.backupsMatterlists[i].sidingIvt
              this.rightupdata[j].sidingFvt = this.backupsMatterlists[i].sidingFvt
            }
          })
        })
        this.rightupdata.forEach((item,index)=>{
          if(item.sidingId == row.sidingId){
            this.rightupdata[index].edit = !this.rightupdata[index].edit
          }else if(item.sidingId != row.sidingId) {
            this.rightupdata[index].edit = true
          }
        })
        this.rightupdata.push({a:0})
        this.rightupdata.pop()



        row.oldSidingCode = row.sidingCode;
        row.edit=false;
      },
      //取消编辑
      handelCancel(index, row) {
        row.sidingCode = row.oldSidingCode;
        this.checkSidingData(this.rightupdata);
        if (row.sidingId==0){//新增
          this.rightupdata.splice(this.rightupdata.length-1,1);
          this.onload();
        }else{
          row.edit=true;
          this.backupsMatterlists.forEach((item,i)=>{
            this.rightupdata.forEach((ele,j)=>{
              if(item.sidingId == ele.sidingId){
                this.rightupdata[j].sidingName = this.backupsMatterlists[i].sidingName
                this.rightupdata[j].sidingCode = this.backupsMatterlists[i].sidingCode
                this.rightupdata[j].sidingIvt = this.backupsMatterlists[i].sidingIvt
                this.rightupdata[j].sidingFvt = this.backupsMatterlists[i].sidingFvt
              }
            })
          })
        }
      },
      //点击右侧表格更新
      handleUpdate(index, row) {
        if (row.sidingCode === "") {
          return this.$alert('侧线编码不能为空', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(row.sidingCode = row.oldSidingCode)
        }
        this.checkSidingData(this.rightupdata);
        if (!this.checkRules(index, row)) {
          return false
        }
        update(row).then((res) => {//修改
          if (res.data.code === 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
            this.onload();
          } else {
            errorMsgbox(this,res.data.msg)
          }
        });
        // let one = this.rightupdata[index];
        // var errormessage = "";
        // if(parseInt(one.sidingIvt) >= parseInt(one.sidingFvt) && one.sidingFvt!='FBP' && one.sidingIvt!='IBP'){
        //   this.$message.warning("终馏点输入值应大于初馏点");
        //   this.onload();
        //   return;
        // }
        // if(one.sidingIvt=='FBP'){
        //   this.rightupdata[index].sidingIvt='IBP';
        //   errormessage=errormessage+"侧线的初馏点不能为FBP;</br>";
        // }
        // if(one.sidingFvt=='IBP'){
        //   this.rightupdata[index].sidingFvt='FBP';
        //   errormessage=errormessage+"侧线的终馏点不能为IBP;</br>";
        // }
        // if(one.sidingIvt=='' || one.sidingIvt==null || one.sidingIvt==undefined){
        //   errormessage=errormessage+"侧线的初馏点不能为空;</br>";
        // }
        // if(one.sidingFvt=='' || one.sidingFvt==null || one.sidingFvt==undefined){
        //   errormessage=errormessage+"侧线的终馏点不能为空;</br>";
        // }
        // if(errormessage!=null && errormessage!=''){
        //   this.$message.warning({
        //     dangerouslyUseHTMLString: true,
        //     message: errormessage
        //   });
        //   return;
        // }else{
        //   this.$set(row,"",this.sidetype);
        //   var array = [];
        //   this.rightupdata.forEach(ele => {
        //     if(row.sidingCode == ele.sidingCode){
        //       array.push(row.sidingCode);
        //     }
        //   })
        //   if(array.length > 1){
        //     this.$message.warning("侧线编码重复！");
        //     this.onload();
        //   }else{
        //     update(row).then(()=>{//修改
        //       this.onload();
        //     });
        //   }
      },
      //选中侧线时加载下方物料表格
      onload2(row){
        this.rsdata=row;
        selectMatterproBySiding(row.sidingId).then(res=>{
          if (res.data.code === 200) {
            this.rightdowndata=res.data.data;
          } else {
            errorMsgbox(this, res.data.msg);
          }
          for(var i = 0; i < this.rightdowndata.length; i ++) {
            this.$set(this.rightdowndata[i],'disabled',true);
          }
        });
      },
      //添加物性单位
      handleAddMa(){
        if(this.rsdata.length==0){
          this.$message.warning("请单击选择一条侧线后添加");
          return;
        }
        //根据已有的list将
        let newLine = {
          sidingId:this.rsdata.sidingId,
          materproSort:this.rangeCode,
          sidmatId:null,
          matterproName: '',
          matterproCode: '',
          matterproUnit: '',
          schemeType:this.rsdata.schemeType,
          //disabled:true,// 新增时处于可编辑状态，所以按钮是保存和取消
        };
        this.rightdowndata.push(newLine); // 移到第一行
      },
      //删除物性
      handleDeleteMa(index,row){
        if (this.malist.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return deleteMa(this.ids,this.sidetype,this.rangeCode);
          })
          .then(() => {
            selectMatterproBySiding(this.rsdata.sidingId).then(res=>{
              if (res.data.code === 200) {
                this.rightdowndata=res.data.data;
              } else {
                errorMsgbox(this, res.data.msg);
              }
              for(var i = 0; i < this.rightdowndata.length; i ++) {
                this.$set(this.rightdowndata[i],'disabled',true);
              }
            });
            this.$message({
              type: "success",
              message: res.data.msg
            });
          });
      },
      //多选删除
      handleChange(list){
        this.malist=list;
      },
      //查询所有物性
      selectMatterproBySort(){
        alreadySearchMaterpro(this.rangeCode).then(res =>{
          if (res.data.code === 200) {
            this.materprolist = res.data.data;
          } else {
            errorMsgbox(this, res.data.msg);
          }
        });
      },
      //修改物性
      getValue(index,row){
        this.$set(row,'schemeType',this.sidetype);
        this.$set(row,'materproSort',this.rangeCode);
        addSidingMatterpro(row).then(res=>{
          if(res.data.code != 200){
            return errorMsgbox(this,res.data.msg);
          }else{
            this.onload2(this.rsdata);
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      },
      //更改
      changeCopyData(row){
        this.rsdata=row;
        this.rightdowndata=[];
        this.onload2(row);
      },
      //点击编辑按钮时加载数据
      initDialogTableData(){
        waitSearchMaterpro(this.editcode).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.dialogleftsearchcode='';
          this.dialogleftdata = res.data.data;
        });
        alreadySearchMaterpro(this.editcode).then(res =>{
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.dialogrightsearchcode='';
          this.dialogrightdata = res.data.data;
        });
      },
      //弹出框左侧加载数据
      dialogleftselect(){
        waitSearchMaterproByCode(this.dialogleftsearchcode,this.editcode).then(res =>{
          if (res.data.code === 200) {
            this.dialogleftdata = res.data.data;
          } else {
            errorMsgbox(this, res.data.msg);
          }
        });
      },
      //弹出框右侧数据加载
      dialogrightselect(){
        alreadySearchMaterproByCode(this.dialogrightsearchcode,this.editcode).then(res =>{
          if (res.data.code === 200) {
            this.dialogrightdata = res.data.data;
          } else {
            errorMsgbox(this, res.data.msg);
          }
        });
      },
      //弹出窗的选中事件
      dialoghandelSelect(){
        var codes= '';
        for(var i=0;i<this.nowSelectData.length;i++){
          if(i==0){
            codes=this.nowSelectData[i].matterproCode
          }else{
            codes = codes+','+this.nowSelectData[i].matterproCode
          }
        }
        waitToAlreadyChoose(codes,this.editcode).then(res=>{
          this.initDialogTableData();
        });
      },
      //弹出窗的取消事件
      dialoghandleRemoveSelect(){
        var codes= '';
        for(var i=0;i<this.nowSelectRightData.length;i++){
          if(i==0){
            codes=this.nowSelectRightData[i].matterproCode;
          }else{
            codes = codes+','+this.nowSelectRightData[i].matterproCode;
          }
        }
        alreadyTowaitChoose(codes,this.editcode).then(res=>{
          this.initDialogTableData();
        });
      },
      dialogleftcheckAll(val){
        this.nowSelectData = val;
      },
      dialogcheckRightAll(val) {
        this.nowSelectRightData = val;
      },
    }
  };
</script>

<style scoped="scoped">
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
  }
  .text {
    height: 30px;
    font-size: 13px;
    padding: 5px 0;
    cursor:pointer;
  }
  .texted{
    height: 30px;
    font-size: 13px;
    padding: 5px 0;
    cursor:pointer;
    background-color: #D0E5FF;
  }
  .tb-edit .el-select {
    display: none
  }
  .tb-edit .current-row .el-select {
    display: block
  }
  .tb-edit .current-row .el-select+span {
    display: none
  }

  .opSetting{
    text-align: center;
    margin-top:200px;
  }
  .spacing{
    margin-top:10px;
  }
  .timeline-name {
    font-size: 15px;
    color: rgba(0, 0, 0, 1);
  }

  .el-timeline {
    margin: 0px;
    margin-left: 25px;
    list-style: none;
  }

  /deep/.timeline-content {
    color: rgba(0, 0, 0, 0.7);
    font-size: 13px;
    padding-top: 5px;
    padding-left: 15px;
  }
  /deep/.el-timeline-item{
    padding-bottom: 0px;
  }
  /deep/.el-timeline-item__tail{
    height: 115%;
    border-left: 2px solid #E4E7ED;
  }
  /deep/.el-timeline-item__node--large {
    left: -10px;
    width: 30px;
    height: 30px;
  }
  /deep/.el-timeline-item__wrapper{
    position: relative;
    padding-left: 30px;
    top: 3px;
  }
  /deep/.el-timeline-item__icon {
    color: #FFF;
    font-size: 20px;
  }
  ul {
    padding-inline-start: 0px;
  }

</style>

