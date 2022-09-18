<template>
  <div>
    <el-row>
      <el-col :span="6">
        <basic-container>
          <div style="margin-bottom: 15px">
            <el-input v-model="leftname" size="small" style="width: 75%">
              <el-button slot="append" icon="el-icon-search" @click="handleLeftSearch"></el-button>
            </el-input>
<!--            <el-button style="float: right" size="small" type="primary" icon="el-icon-plus" @click="handleLeftAdd">添加</el-button>-->
          </div>
          <el-card :style="cardstyle" shadow="never">
            <div slot="header" class="clearfix" style="margin-left: -1.5%;">
              流程方案
            </div>
            <div class="block" style="overflow: auto">
              <el-row class="text" :style="{height:tableheight}" v-for="(item, index) in leftdata" :key="index"
                      :class="item.processId == rangeCode ? 'texted':''">
                <el-col :span="21">
                  <div>
                    <div v-if="item.edit"><el-input v-model="item.processName" size="small" @blur="saveRow(item)"></el-input></div>
                    <div v-else @click="rangeClick(item.processId)">
                      <span @dblclick="updateRow(item)">{{item.processName}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="2">
<!--                  <img src="../../../public/icon/btn_shanchu.png" style="float: right;width: 18px;height: 20px" @click="handleLeftDel(item.processId)">-->
                </el-col>
                <el-col :span="1"></el-col>
              </el-row>
            </div>
          </el-card>
        </basic-container>
      </el-col>
      <el-col :span="18">
          <el-col :span="18">
            <basic-container>
                <div style="margin-bottom: 10px;margin-left: 13px;margin-top: 5px">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-plus"
                    @click="handleMiddleUpAdd"
                  >新 增</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    @click="handleMiddleUpUpdate"
                  >修 改</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    plain
                    @click="handleMiddleUpDelete"
                  >删 除</el-button>
                </div>
              <el-card :style="cardstyle" shadow="never">
                <el-table size="small" border :data="middleupdata"  @header-dragend="changeColWidth" @selection-change="handleSelectionChange" :height="middleheight">
                  <el-table-column type="selection" align='center' width="55" show-overflow-tooltip></el-table-column>
                  <el-table-column type="index" align='center' width="70" label="序号" show-overflow-tooltip></el-table-column>
                  <el-table-column label="角色" align='center' property="rolename" show-overflow-tooltip></el-table-column>
                  <el-table-column label="审核级别" align='center' property="nodeLevel" show-overflow-tooltip></el-table-column>
                  <el-table-column label="审核名称" align='center' property="nodeName" show-overflow-tooltip></el-table-column>
                  <el-table-column label="备注" align='center' property="note" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-card>
            </basic-container>
          </el-col>
          <el-col :span="6">
            <basic-container>
              <el-card :style="cardstyle" shadow="never">
                <div slot="header" class="clearfix" style="font-size: 16px">
                  审批流程
                </div>
                <div class="block" style="overflow: auto">
                  <el-timeline style="margin-left: -10px">
                    <el-timeline-item
                      v-for="(activity, index) in timelines"
                      :key="index"
                      :color="activity.color"
                      :size="activity.size">
                      <div class="timeline-name">{{ activity.content }}</div>
                      <div class="timeline-content">角 色：{{ activity.rolename }}</div>
                      <div class="timeline-content">审核名称：{{ activity.nodename }}</div>
                      <div class="timeline-content">备 注：{{ activity.note }}</div>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-card>
              <div style="margin-top: 48px"></div>
            </basic-container>
          </el-col>


<!--        <el-row>-->
<!--          <basic-container>-->
<!--            <el-card :style="cardstyle2" shadow="never">-->
<!--              <div slot="header" class="clearfix">-->
<!--                物料选择-->
<!--              </div>-->
<!--              <div class="block" :style="displayHiddenMsg">-->
<!--                <div v-for="item in materieldata" style="padding: 8px">-->
<!--                  <div style="margin-right: 15px;width: 80px;display: inline-block">{{item.title}}</div>-->
<!--                  <el-checkbox-group v-model="checkList" style="display: inline-block" >-->
<!--&lt;!&ndash;                    <el-checkbox v-for="i in item.children" :key="i.id" @click.native="aa(i,$event)" @change="bb"&ndash;&gt;-->
<!--&lt;!&ndash;                                 :label="i.id">{{i.title}}</el-checkbox>&ndash;&gt;-->
<!--                    <el-checkbox v-for="i in item.children" :key="i.id" @click.native="aa(i,$event)" @change="bb"-->
<!--                                 :disabled="otherdata.includes(i.id)"-->
<!--                                 :label="i.id">{{i.title}}</el-checkbox>-->
<!--                  </el-checkbox-group>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-card>-->
<!--          </basic-container>-->
<!--        </el-row>-->
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="dialog"
      :before-close="dialogClose"
      :append-to-body="true"
      width="450px">
      <el-form ref="form" :rules="rules" :model="dialogForm" label-width="120px">
        <el-form-item label="角色名称:" prop="roleId">
          <el-select size="small" style="width: 70%" v-model="dialogForm.roleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.role_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核名称:" prop="nodeId">
          <el-select
            size="small"
            style="width: 70%"
            v-model="dialogForm.nodeId"
            placeholder="请选择" @change="changeoptionValue">
            <el-option
              v-for="item in levelList"
              :key="item.nodeId"
              :label="item.nodeName"
              :value="item.nodeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核级别:">
          <el-input size="small" :disabled="true" style="width: 70%" v-model="dialogForm.nodeLevel"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input size="small" style="width: 70%" v-model="dialogForm.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="SaveOrUpdateDetail">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getList,remove,submit} from "@/api/qcadmin/approveprocess";
import {getDetailList,removedetail,getLevelList,submitdetail} from "@/api/qcadmin/approveprocessdetail";
import {getRowList,getMaterielIdList,submitMateriel,getAllMaterielId,getOtherMaterielIdList} from "@/api/qcadmin/approveprocessmateriel";
import {getTreeDeviceMateriel} from "@/api/system/dept";
import { mapGetters } from "vuex";
import thirdloginVue from '../../page/login/thirdlogin.vue';
import {errorMsgbox} from "@/api/global_variable";

export default {
  name:'/qcadmin/materielapprove',
  data() {
    return {
      displayHiddenMsg:'',
      deviceId: '',
      leftname:'',//左侧流程名称
      cardstyle:'',//动态样式
      cardstyle1:'',//动态样式
      cardstyle2:'',//动态样式
      cardstyle3:'',//动态样式
      tableheight:'',//表格高度
      middleheight:'',//表格高度
      query: {},//查询条件
      query1: {},//查询条件
      loading:false,//表格加载状态
      leftdata:[],//左侧表格数据
      rangeCode:'',
      middleupdata:[],//中间表数据
      selectionList:[],
      title:'新增',
      dialog:false,
      roleList: [], //角色列表
      levelList:[], //级别列表
      dialogForm:{
        processdetailId:0,
        processId:0,
        roleId:'',
        nodeId:'',
        isDeleted:0,
        note:'',
        nodeLevel:'',
        nodeName:'',
        createddate:new Date(),
      },
      timelines:[],
      materieldata:[],
      otherdata:[],
      checkList: [],
      disabledids:[],//不可选择的列表
      rules:{
        roleId: [
          { required: true, message: '请选择角色名称', trigger: 'change,blur' }
        ],
        nodeId: [
          { required: true, message: '请选择审核名称', trigger: 'change,blur' }
        ],
      }
    };
  },
  beforeMount() {//页面加载前

  },
  computed: {
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.processdetailId);
      });
      return ids.join(",");
    },
  },
  mounted(){
    this.onloadLeftTable();//加载左侧列表数据
    this.getTreeDeviceMateriel();//加载所有的物料数据
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)
  },
  watch:{
    middleupdata(){
      this.timelines=[];
      for (var i=0;i<this.middleupdata.length;i++){
        let time = {
          content:'',
          rolename:'',
          nodename:'',
          note:'',
          size: 'large',
          icon: '',
          color: '#409EFF'
        };
        let one = this.middleupdata[i];
        time.content=i+1+". "+one.nodeName;
        time.nodename=one.nodeName;
        time.rolename=one.rolename;
        time.note=one.note;
        this.timelines.push(time);
      }
    }
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      var hh = h-191;
      var hhh = h-176;
      this.cardstyle = "height:"+hh+"px;border: 0px solid #EBEEF5;overflow: hidden;color: #303133;-webkit-transition: .3s;transition: .3s;";
      this.cardstyle3="height:"+hhh+"px;border: 0px solid #EBEEF5;overflow: hidden;color: #303133;-webkit-transition: .3s;transition: .3s;";
      this.tableheight = "height:"+ (window.innerHeight - 155) + "px;overflow:auto;";
      var a = window.innerHeight / 2 -100;
      this.middleheight = h-220;
      var hh = a + 47 ;
      this.cardstyle1="height:"+hh+"px;border: 0px solid #EBEEF5;overflow: auto;color: #303133;-webkit-transition: .3s;transition: .3s;";
      var h3 = h-a-226;
      this.cardstyle2="height:"+h3+"px;border: 0px solid #EBEEF5;overflow: hidden;color: #303133;-webkit-transition: .3s;transition: .3s;";
      this.displayHiddenMsg = "overflow: auto;height:"+h3+"px;"
    },
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    //左侧列表数据加载
    onloadLeftTable(params = {}){
      this.loading = true;
      getList(Object.assign(params, this.query)).then((res) => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.leftdata = res.data.data;
        this.rangeCode=this.leftdata[0].processId;
        this.rangeClick(this.rangeCode);
        this.loading = false;
        this.query={};
        this.getOtherMaterielIdList(this.rangeCode);
      });
    },
    //左侧列表搜索方法
    handleLeftSearch(){
      this.$set(this.query,'processName',this.leftname);
      this.onloadLeftTable();
    },
    //左侧列表添加
    handleLeftAdd(){
      let newitem = {
        processId:0,
        processName:'',
        isDeleted:0,
        createddate:new Date(),
        edit:true
      };
      this.leftdata.push(newitem);
    },
    //左侧列表点击事件
    rangeClick(processId){
      this.checkList=[];
      this.disabledids=[];

      this.rangeCode=processId;
      this.$set(this.query1,'processId',this.rangeCode);
      this.onloadMiddleData();
      this.getMaterielIdList(processId);
      this.getOtherMaterielIdList(processId);
      this.getdisabledidsMaterielIdList();
      for (var i = 0; i < this.leftdata.length; i++) {
        if(this.leftdata[i].edit == true && this.rangeCode != this.leftdata[i].processId){
          this.$set(this.leftdata[i], "edit", false);
        }
      }
    },
    //保存事件
    saveRow(item){
      this.$set(item,"edit",false);
      submit(item).then(res=>{
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.onloadLeftTable();
        this.$message({
          type: "success",
          message: "保存成功!",
        });
      });
    },
    //更新事件
    updateRow(item){
      for(let i=0; i<this.leftdata.length; i++){
        if(item.processId == this.leftdata[i].processId){
          this.$set(this.leftdata[i],"edit",true);
        }else{
          this.$set(this.leftdata[i],"edit",false);
        }
      }
    },
    //刪除事件
    handleLeftDel(id){
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          return remove(id);
        })
        .then(() => {
          this.onloadLeftTable();
          this.getdisabledidsMaterielIdList();
          this.$message({
            type: "success",
            message: "刪除成功!",
          });
        });
    },
    //加载中间表格数据
    onloadMiddleData(params = {}){
      this.loading = true;
      getDetailList(Object.assign(params, this.query1)).then((res) => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.middleupdata = res.data.data;
        this.loading = false;
        //this.query1={};
      });
    },
    //中间列表选中数据
    handleSelectionChange(list){
      this.selectionList = list;
    },
    //弹窗关闭方法
    dialogClose(){
      this.dialog=false;
      let newone ={
        processdetailId:0,
        processId:this.rangeCode,
        roleId:'',
        nodeId:'',
        isDeleted:0,
        note:'',
        createddate:new Date(),
      };
      this.dialogForm = newone;
      this.$refs['form'].resetFields();
    },
    //添加中间数据
    handleMiddleUpAdd(){
      getRowList().then((res) => {
        if (res.data.code === 200){
          this.roleList = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res2.data.msg);
        }
      });
      getLevelList().then((res2) => {
        if (res2.data.code === 200){
          this.levelList = res2.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res2.data.msg);
        }
      });
      this.dialogForm.nodeLevel=this.middleupdata.length+1;
      this.dialog=true;
    },
    //修改中间数据
    handleMiddleUpUpdate(){
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择一条数据");
        return;
      }else if(this.selectionList.length > 1){
        this.$message.warning("请选择一条数据");
        return;
      }
      getRowList().then((res) => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        if(res.data.code === 200)
          this.roleList = res.data.data;
      });
      getLevelList().then((res2) => {
        if (res2.data.code != 200){
          let that = this;
          errorMsgbox(that, res2.data.msg);
        }
        if(res2.data.code === 200)
          this.levelList = res2.data.data;
      });
      this.dialog = true;
      this.dialogForm = JSON.parse(JSON.stringify(this.selectionList[0]));
    },
    //删除中间数据
    handleMiddleUpDelete(){
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        return removedetail(this.ids).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.onloadMiddleData();
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.$refs.crud.toggleSelection();
        });
      })
    },
    //更改选中的审核级别
    changeoptionValue(val){
      var data = this.middleupdata.filter(function(item){
        return item.nodeId===val;
      })
      if(data.length>0){
        this.dialogForm.nodeId='';
        this.dialogForm.nodeLevel='';
        this.$message.warning("审核级别不可重复");
        return;
      }else{
        var data1= this.levelList.filter(function(item){
          return item.nodeId == val;
        })
        this.dialogForm.nodeLevel=data1[0].nodeLevel;
        this.dialogForm.nodeName=data1[0].nodeName;
      }
      this.dialogForm.processId=this.rangeCode;
    },
    //保存修改
    SaveOrUpdateDetail(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          submitdetail(this.dialogForm).then(res=>{
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.dialogClose();
            this.$set(this.query1,'processId',this.rangeCode);
            this.onloadMiddleData();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //加载所有物料数据
    getTreeDeviceMateriel(){
      getTreeDeviceMateriel().then(res=>{
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.materieldata=res.data.data;
      });
    },
    getOtherMaterielIdList(processId) {
      getOtherMaterielIdList(processId).then(res=>{
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.otherdata=res.data.data;
    });
    },
    //获取选中的物料
    getMaterielIdList(){
      getMaterielIdList(this.rangeCode).then(res=>{
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        res.data.data.forEach((ele) => {
          this.checkList.push(ele.toString());
        });
      });
    },
    //物料的点击事件
    aa(item,e){
      this.deviceId = parseInt(item.parentId-10000)
      if (e.target.tagName === 'INPUT'){
        return;
      }
      submitMateriel(item.key,this.deviceId,this.rangeCode).then(res=>{
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    bb(val){
      var i = 0;
      if(val == false){
        this.disabledids.forEach(ele => {
          if(this.checkList.indexOf(ele) == -1){
            this.disabledids.splice(i,1);
          }else{
            i++;
          }
        })
      }
    },
    //获取选中的物料,选一次之后中不可再次选择
    getdisabledidsMaterielIdList(){
      getAllMaterielId().then(res=>{
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        res.data.data.forEach((ele) => {
          this.disabledids.push(ele.toString());
        });
      });
    },
  },
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
  .text {
    font-size: 14px;
    padding: 5px 0;
    cursor:pointer;
    height: 30px;
  }
  .texted{
    height: 30px;
    font-size: 14px;
    padding: 5px 0;
    cursor:pointer;
    background-color: #D0E5FF;
  }
  .timeline-name {
    font-size: 15px;
    color: rgba(0, 0, 0, 1);
  }
  /deep/.timeline-content {
    color: rgba(0, 0, 0, 0.7);
    font-size: 13px;
    /* padding-top: 5px;
    padding-left: 15px; */
    text-align: left;
  }
  /deep/.el-timeline-item__tail{
    height: 110%;
    border-left: 2px solid #E4E7ED;
  }
  /deep/ .el-col{
    margin-bottom: 0px;
  }
</style>
