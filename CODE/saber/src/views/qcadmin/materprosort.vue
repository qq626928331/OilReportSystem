<template>
  <el-row>
    <el-col :span="5">
      <basic-container>
        <el-card :style="cardstyle" shadow="never">
          <div slot="header" class="clearfix">
            <span>类别</span>
          </div>
          <div class="text" v-for="(item, index) in treeData" :key="index"
               :class="item.dictKey == rangeCode ? 'texted':''"
               @click="rangeClick(item.dictKey)">
            <span style="margin-left: 10px">{{item.dictValue}}</span>
          </div>
        </el-card>
      </basic-container>
    </el-col>
    <el-col :span="19">
      <basic-container>
        <el-row>
          <el-col :span="10">
            <div style="margin-bottom: 15px">
              <span>待选物性:</span>
              <el-input placeholder="请输入物性编码/名称" v-model="leftsearch" size="small" style="width:200px;margin-left: 4px"></el-input>
              <el-button size="small" type="primary" style="margin-left: 4px" @click="leftselect">
                查询
              </el-button>
            </div>
            <el-table size="small"
                      :data="leftdata"
                      border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                      @selection-change="checkAll" @header-dragend="changeColWidth"
                      style="width: 100%"
                      row-key="index"
                      :height=tableheight>
              <el-table-column
                type="selection"
                width="60" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="matterproCode"
                label="物性编码"
              show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="matterproName"
                label="物性名称"
              show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="matterproUnit"
                label="物性单位"
              show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <div class='l-total'>总计:{{leftdata.length}} 条</div>
          </el-col>
          <el-col :span="4">
            <div class="opSetting">
              <div @click="handelSelect">
                <el-button icon="el-icon-d-arrow-right" :disabled="nowSelectData.length?false:true" size="medium" type="primary" >
                  选中
                </el-button>
              </div>
              <div class="spacing" @click="handleRemoveSelect">
                <el-button icon="el-icon-d-arrow-left" :disabled="nowSelectRightData.length?false:true" size="medium" type="primary">
                  取消
                </el-button>
              </div>
            </div>
          </el-col>

          <el-col :span="10">
            <div style="margin-bottom: 15px">
              <span>已选物性:</span>
              <el-input placeholder="请输入物性编码/名称" v-model="rightsearch" size="small" style="width:200px;margin-left: 4px"></el-input>
              <el-button size="small" type="primary"  style="margin-left: 4px" @click="rightselect">
                查询
              </el-button>
            </div>
            <el-table  @header-dragend="changeColWidth"
              :data="rightdata" size="small"
              border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
              ref="selection"
              @selection-change="checkRightAll"
              style="width: 100%"
              row-key="index"
              :height=tableheight>
              <el-table-column
                type="selection"
                width="60" show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="matterproCode"
                label="物性编码"
              show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="matterproName"
                label="物性名称"
              show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="matterproUnit"
                label="物性单位"
              show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <div class='l-total'>总计:{{rightdata.length}}条</div>
          </el-col>
        </el-row>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>

  import {
    searchMaterproSort,
    waitSearchMaterpro,
    alreadySearchMaterpro,
    waitToAlreadyChoose,
    alreadyTowaitChoose,
    waitSearchMaterproByCode,
    alreadySearchMaterproByCode,
  } from "@/api/qcadmin/materprosort";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qcadmin/materprosort',
    data() {
      return {
        cardstyle:'',
        treeData:[],
        value: '',
        rightdata:[],  // 右边列表数据
        leftdata:[],  //左侧列表数据
        nowSelectData: [], // 左边选中列表数据
        nowSelectRightData: [], // 右边选中列表数据
        leftsearch:'',
        rightsearch:'',
        rangeCode:'',
        tableheight:0,
      };
    },
    beforeMount() {
      this.setClientHight()
    },
    mounted() {
      this.initTableData(0);
      window.addEventListener('resize', () => this.setClientHight(), false)
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        var hh = h-145;
        this.cardstyle="height:"+hh+"px;border: 0px solid #EBEEF5;overflow: hidden;color: #303133;-webkit-transition: .3s;transition: .3s;";
        this.tableheight=h-210;
        console.log("this.tableheight"+this.tableheight);
      },
      //拖拽控制最小宽度
      changeColWidth(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      //全选
      checkAll(val){
        this.nowSelectData = val;
      },
      //左侧物性全选
      checkRightAll(val) {
        this.nowSelectRightData = val;
      },
      // 选中需要进行数据库操作
      handelSelect(){
        var codes= '';
        for(var i=0;i<this.nowSelectData.length;i++){
          if(i==0){
            codes=this.nowSelectData[i].matterproCode
          }else{
            codes = codes+','+this.nowSelectData[i].matterproCode
          }
        }
        waitToAlreadyChoose(codes,this.rangeCode).then(res=>{
          this.initTableData(1);
        });
      },
      // 取消需要进行数据库操作
      handleRemoveSelect() {
        var codes= '';
        for(var i=0;i<this.nowSelectRightData.length;i++){
          if(i==0){
            codes=this.nowSelectRightData[i].matterproCode;
          }else{
            codes = codes+','+this.nowSelectRightData[i].matterproCode;
          }
        }
        alreadyTowaitChoose(codes,this.rangeCode).then(res=>{
          this.initTableData(1);
        });
      },
      //根据类别查询物性
      initTableData(flag){
        if(flag==0){
          searchMaterproSort().then(res =>{
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.rangeCode=res.data.data[0].dictKey;
            this.treeData=res.data.data;
            waitSearchMaterpro(this.rangeCode).then(res => {
              if (res.data.code != 200){
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              this.leftdata=res.data.data;
            });
            alreadySearchMaterpro(this.rangeCode).then(res =>{
              if (res.data.code != 200){
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              this.rightdata = res.data.data;
            });
          });
        }else{
          waitSearchMaterpro(this.rangeCode).then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.leftsearch='';
            this.leftdata=res.data.data;
          });
          alreadySearchMaterpro(this.rangeCode).then(res =>{
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.rightsearch='';
            this.rightdata = res.data.data;
          });
        }
      },
      //右侧物性选择
      leftselect(){
        waitSearchMaterproByCode(this.leftsearch,this.rangeCode).then(res =>{
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.leftdata = res.data.data;
        });
      },
      //左侧物性选择
      rightselect(){
          alreadySearchMaterproByCode(this.rightsearch,this.rangeCode).then(res =>{
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.rightdata = res.data.data;
          });
      },
      //类别选择
      rangeClick(code){
        this.rangeCode = code;      //设置code值，并添加样式
        this.initTableData(1);
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

  .opSetting{
    text-align: center;
    margin-top:200px;
  }
  .spacing{
    margin-top:10px;
  }
  .text {
    font-size: 14px;
    padding: 5px 0;
    cursor:pointer;
  }
  .texted{
    font-size: 14px;
    padding: 5px 0;
    cursor:pointer;
    background-color: #D0E5FF;
  }
  .el-card{
    border-radius: 4px;
    background-color: #FFF;
    border: 0px solid #EBEEF5;
    overflow: hidden;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
  }
  .l-total {
    text-align: right;
    font-size: 10px;
  }
</style>
