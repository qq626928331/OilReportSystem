<template>
  <div>
    <el-row>
      <el-col :span="6">
        <basic-container>
          <el-card :style="cardstyle"  shadow="never">
            <div slot="header" class="clearfix">
              <span style="font-size: 16px">物性类别</span>
              <i class="el-icon-circle-plus-outline" @click="openDialog"
                 style="float: right;height: 20px;line-height: 20px;color: #409EFF;cursor: pointer;"></i>
            </div>
            <el-row class="text" :style="{height:tableheight}" v-for="(item, index) in treeData" :key="index"
                    :class="item.detailType == rangeCode ? 'texted':''">
              <el-col :span="19">
                <div @click="rangeClick(item.detailType)">
                  <span style="margin-left: 10px">{{item.detailTypeName}}</span>
                </div>
              </el-col>
              <el-col :span="2">
                <img src="../../../public/icon/btn_Pencil.png" style="float: right" @click="iconClick(item)">
              </el-col>
              <el-col :span="2">
                <img src="../../../public/icon/btn_shanchu.png" style="width:19px;height:20px;float: right" @click="iconRemove(item)">
              </el-col>
              <el-col :span="1"></el-col>
            </el-row>
          </el-card>
        </basic-container>
      </el-col>
      <el-col :span="14">
        <el-row>
          <basic-container>
            <div style="margin-bottom: 15px">
              <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAddDetail">
                添 加
              </el-button>
            </div>
            <el-table
              :data="rightdata" size="small" ref="righttable"
              border :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}" @header-dragend="changeColWidth"
              :height="tableheightup"
              style="width: 100%" highlight-current-row>
              <el-table-column type="index" label="序号" header-align="center" width="50"></el-table-column>
              <el-table-column prop="detailInit" label="初馏点" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <el-input  size="small"  v-if="!row.edit" v-model="row.detailInit" type="input"></el-input>
                  <span v-else>{{row.detailInit}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="detailFinal" label="终馏点" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <el-input size="small" v-if="!row.edit" v-model="row.detailFinal" type="input"></el-input>
                  <span v-else>{{row.detailFinal}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="note" label="备注" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <el-input size="small" v-if="!row.edit" v-model="row.note" type="input"></el-input>
                  <span v-else>{{row.note}}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" show-overflow-tooltip>
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
        </el-row>
        <el-row>
          <basic-container>
          <div style="margin-bottom: 15px">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAddMa">
              添 加
            </el-button>
          </div>
          <el-table
            :data="rightdowndata" size="small" ref="righttable"
            border :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :height="tableheightdown" @header-dragend="changeColWidth"
            style="width: 100%" highlight-current-row>
            <el-table-column type="index" label="序号" header-align="center" width="70"></el-table-column>
            <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <el-select size="small" filterable v-if="row.downedit" v-model="row.matterproCode" placeholder="请选择物性编码" @change="getValue($index,row)">
                  <el-option
                    v-for="item in materprolist"
                    :key="item.matterproCode"
                    :label="item.matterproName"
                    :value="item.matterproCode">
                  </el-option>
                </el-select>
                <span v-else>{{row.matterproName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <span>{{row.matterproCode}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="note" label="备注" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <el-input  v-if="row.downedit" size="small" v-model="row.note" type="input"></el-input>
                <span v-else>{{row.note}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="{row,$index}">
                <i class="el-icon-edit" @click="handleMaEdit($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF" v-if="!row.downedit"></i>
                <i class="el-icon-delete" @click="handleMaDelete($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px" v-if="!row.downedit"></i>
                <i class="el-icon-check" @click="handleMaUpdate($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF"  v-if="row.downedit"></i>
                <i class="el-icon-close" @click="handelMaCancel($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"  v-if="row.downedit"></i>
              </template>
            </el-table-column>
          </el-table>
          </basic-container>
        </el-row>
      </el-col>
      <el-col :span="4">
        <basic-container>
          <el-card :style="cardstyle1"  shadow="never">
            <div slot="header" class="clearfix" style="font-size: 16px">
              侧线流程
            </div>
            <div class="block">
              <el-timeline style="margin-left: -10px">
                <el-timeline-item
                  v-for="(activity, index) in timelines"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size">
                  <!--<div class="timeline-name">{{ activity.content }}</div>-->
                  <div class="timeline-content">初馏点：{{ activity.start }}</div>
                  <div class="timeline-content">终馏点：{{ activity.end }}</div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </basic-container>
      </el-col>
    </el-row>
    <el-dialog :title="dialogtitle"
               :visible.sync="dialog"
               width="30%" :append-to-body="true"
               :before-close="dialogClose">
      <el-form  :model="fraction" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="类型名称：" prop="detailTypeName">
          <el-input size="small" v-model="fraction.detailTypeName"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="note">
          <el-input size="small" type="textarea" v-model="fraction.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addFractionType('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getList,submitFractiontype,getDetaillist,
    addFraction,removeFraction,updateFraction,
    getDetailMalist,saveDetailMa,removeDetailMa,removeAll} from "@/api/qcadmin/fraction";
  import { alreadySearchMaterpro } from "@/api/qcadmin/materprosort";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qcadmin/fraction',
    data() {
      return {
        rules: {
          detailTypeName: [
            {required: true, message: '请输入类型名称', trigger: 'blur'}
          ],
          note: [
            {required: true, message: '请输入备注', trigger: 'blur'}
          ]
        },
        cardstyle:'',//样式
        cardstyle1:'',//时间轴样式
        tableheight:0,//表格高度
        tableheightup:0,//上表格高度
        tableheightdown:0,//下表格高度
        dialogtitle:'增加详评模板',//弹出框名称
        dialog:false,//弹窗开启
        fraction:{
          detailType:'',
          detailTypeName:'',
          note:'',
        },//对象信息
        treeData:[],//分类的列表
        rangeCode:'',//物性分类code
        rightdata:[],//右侧数据列表
        rightdowndata:[],//右下方列表数据
        materprolist:[],//物性列表
      };
    },
    watch:{
      rightdata(){//监测数据变化渲染表格
        this.timelines=[];
        for(var i=0;i<this.rightdata.length;i++){
          let time = {
            content:'',
            code:'',
            start:'',
            end:'',
            size: 'large',
            icon: '',
            color: ''
          };
          let one = this.rightdata[i];
          if(i==0){//第一个
            time.color='#409EFF';
            time.icon='el-icon-check';
          }else{//其他
            let up = this.rightdata[i-1];
            if(up.detailFinal==one.detailInit){
              time.color='#409EFF';
              time.icon='el-icon-check';
            }else {
              time.color='#F9AC00';
              time.icon='el-icon-question';
            }
          }
          //time.content=i+1+". "+one.sidingName;
          time.start=one.detailInit;
          time.end=one.detailFinal;
          this.timelines.push(time);
        }
      }
    },
    beforeMount() {
      this.setClientHight()
    },
    mounted() {
      this.initTableData();
      window.addEventListener('resize', () => this.setClientHight(), false)
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        var hh = h-145;
        this.cardstyle="height:"+hh+"px;border: 0px solid #EBEEF5;overflow: hidden;color: #303133;-webkit-transition: .3s;transition: .3s;";
        this.cardstyle1="height:"+hh+"px;border: 0px solid #EBEEF5;overflow: auto;color: #303133;-webkit-transition: .3s;transition: .3s;";
        this.tableheight=hh;
        this.tableheightup=(hh-38)/2;
        this.tableheightdown=(hh-48)/2-81;
      },
      changeColWidth(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      //加载物性数据
      initTableData(){
        getList().then(res =>{
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.rangeCode=res.data.data[0].detailType;
          this.treeData=res.data.data;
          this.getDetaillist();
          this.getMatterproList();
          //所有常规物性
          this.selectMatterproBySort();
        });
      },
      //点击左侧文字,更改数据
      rangeClick(code){
        this.rangeCode = code;  //设置code值，并添加样式
        this.rightdata=[];
        //馏分段信息
        this.getDetaillist();
        //物性列表
        this.getMatterproList();
      },
      //打开添加弹窗
      openDialog(){
        var type = Number(this.treeData[this.treeData.length-1].detailType)+1;
        let aa = {
          typeId:0,
          detailType:type,
          detailTypeName:'',
          note:'',
          };
        this.fraction=aa;
        this.dialogtitle='增加详评模板';
        this.dialog=true;
      },
      //添加馏分段数据
      addFractionType(ruleForm){
        // eslint-disable-next-line no-undef
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            submitFractiontype(this.fraction).then(res=>{
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
              } else {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              this.dialog=false;
              //刷新列表
              this.initTableData();
            })
          } else {
            return false;
          }
        });
      },
      //点击图标编辑修改
      iconClick(item){
        this.fraction=item;
        this.dialogtitle='修改详评模板';
        this.dialog=true;
      },
      //点击图标删除
      iconRemove(item){
        removeAll(item.detailType).then(res=>{
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          //刷新列表
          this.initTableData();
        });
      },
      //根据类型获取馏分段数据
      getDetaillist(){
        getDetaillist(this.rangeCode).then(res=>{
          this.rightdata=res.data.data;
          if(this.rightdata.length>0){
            for(var i = 0; i < this.rightdata.length; i ++) {
              this.$set(this.rightdata[i],'edit',true);//不可编辑状态
            }
          }
        });
      },
      //添加一个馏分段数据
      handleAddDetail(){
        addFraction(this.rangeCode).then(res=>{
          getDetaillist(this.rangeCode).then(res=>{
            this.rightdata=res.data.data;
            if(this.rightdata.length>0){
              for(var i = 0; i < this.rightdata.length; i ++) {
                if(i==this.rightdata.length-1){
                  this.$set(this.rightdata[i],'edit',false);//可编辑
                }else{
                  this.$set(this.rightdata[i],'edit',true);//不可编辑
                }
              }
              this.$refs.righttable.setCurrentRow(this.rightdata[this.rightdata.length-1]);//左侧列表默认选中最后一行
            }
          });
        });
      },
      //点击右侧表格编辑
      handleEditRight(index, row) {
        row.edit=false;
      },
      //点击删除图标
      handleDeleteRight(index, row){
        removeFraction(row.detailId).then(res=>{
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.getDetaillist();
        });
      },
      //取消编辑
      handelCancel(index, row) {
        row.edit=true;
      },
      checkRules (index,row) {
        // detailInit 初   detailFinal  终
        try {
          if ( this.rightdata.length >=1) {
            for (var i = 0; i < this.rightdata.length; i++) {
              if ( index !==0 && (row.detailInit !== this.rightdata[index - 1].detailFinal)) {
                this.$message({
                  message: '当前行填写的初馏值不符',
                  type: 'warning'
                });
                return false
              }
              if (row.detailFinal === 'FBP' && (index !== this.rightdata.length - 1)) {
                this.$message({
                  message: '当前行填写的终馏值不符',
                  type: 'warning'
                });
                return false
              }
              if (  (index !== this.rightdata.length -1) &&row.detailFinal !== this.rightdata[index + 1].detailInit){
                this.$message({
                  message: '当前行填写的终馏值不符',
                  type: 'warning'
                });
                return false
              }
              if (row.detailInit === 'IBP' && (index !== 0)) {
                this.$message({
                  message: '当前行填写的终馏值不符',
                  type: 'warning'
                });
                return false
              }
              if (row.detailFinal === 'IBP') {
                this.$message({
                  message: '当前行填写的终馏值不能为IBP',
                  type: 'warning'
                });
                return false
              }
              if (row.detailInit === 'FBP') {
                this.$message({
                  message: '当前行填写的初馏值不能为FBP',
                  type: 'warning'
                });
                return false
              }
              // if (row.detailFinal !== 'FBP' && (index === this.rightdata.length - 1)) {
              //   this.$message({
              //     message: '当前行填写的终馏值必须为FBP',
              //     type: 'warning'
              //   });
              //   return false
              // }
              // if (row.detailInit !== 'IBP' && index === 0) {
              //   this.$message({
              //     message: '当前行填写的初馏值必须为IBP',
              //     type: 'warning'
              //   });
              //   return false
              // }
              if (Number(row.detailInit)  > Number(row.detailFinal) ) {
                this.$message({
                  message: '当前行填写的终馏值不能低于初馏值',
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
      //点击更新按钮
      handleUpdate(index, row){
        if (!this.checkRules(index, row)) {
          return false
        }
        updateFraction(row).then(res=>{
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
          }else{
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.getDetaillist();
        });
      },
      //查询所有物性
      selectMatterproBySort(){
        alreadySearchMaterpro('1').then(res =>{
          this.materprolist = res.data.data;
        });
      },
      //修改物性
      getValue(index,row){
        let findRow = this.materprolist.find(c => c.matterproCode === row.matterproCode);
        this.$set(row,'matterproName',findRow.matterproName);
      },
      //根据馏分段数据获取物性数据
      getMatterproList(){
        getDetailMalist(this.rangeCode).then(res=>{
          this.rightdowndata = res.data.data;
          if(this.rightdowndata.length>0){
            for(var i = 0; i < this.rightdowndata.length; i ++) {
                this.$set(this.rightdowndata[i],'downedit',false);//不可编辑
            }
          }
        });
      },
      //新增数据
      handleAddMa(){
        //根据已有的list将
        let newLine = {
          detailmatterproId:'',
          detailType:this.rangeCode,
          sidmatId:null,
          matterproName: '',
          matterproCode: '',
          note: '',
          downedit:true,//新增时处于可编辑状态
        };
        this.rightdowndata.unshift(newLine); // 移到第一行
      },
      //点击右侧表格编辑
      handleMaEdit(index, row) {
        row.downedit=true;
      },
      //点击删除图标
      handleMaDelete(index, row){
        removeDetailMa(row.detailmatterproId).then(res=>{
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.getMatterproList();
        });
      },
      //取消编辑
      handelMaCancel(index, row) {
        if(row.detailmatterproId==0){//新增
          this.rightdowndata.splice(0,1);
        }else{
          row.downedit=false;
        }
      },
      //点击更新按钮
      handleMaUpdate(index, row){
        if (row.matterproName===''||row.matterproCode===''){
          this.$message.error("请选择物性名称！");
          return false;
        }else {
          saveDetailMa(row).then(res=>{
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.getMatterproList();
          });
        }
      },
    }
  };
</script>

<style scoped>
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
</style>
