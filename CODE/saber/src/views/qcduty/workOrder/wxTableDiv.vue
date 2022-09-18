<template>
  <basic-container>
    <el-row>
      <el-table border ref="bottomTable" :data="bottomTableData" :height="bottomTableHeight" :header-row-style="{height:'20px'}"
                :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                @header-dragend="changeColWidth"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip width="200" sortable>
          <template slot-scope="scope">
            <span>
              <el-row>
              <el-col :span="4" style="text-align: left;">
                <i v-if="scope.row.pitchOn" style="color: #409EFF;" class="el-icon-upload2"></i>
                <span v-else>&nbsp;</span>
              </el-col>
              <el-col :span="20" style=" overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                <span>{{ scope.row.matterproName }}</span>
              </el-col>
            </el-row>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip width="120" sortable>
          <template slot-scope="{row,$index}">
            <span style=" overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ row.matterproCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物性单位" show-overflow-tooltip width="120" sortable>
          <template slot-scope="{row,$index}">
            <span>{{ row.matterproUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分析值" show-overflow-tooltip prop="matterproValue" width="150" sortable>
          <template slot-scope="{row,$index}">
            <el-row v-if="!row.editvalue">
              <el-col :span="16">
                <el-input size="mini" ref="customerInput" v-if="!row.editvalue"
                          v-model="row.tempVal"
                          placeholder="请输入内容"
                          type="text"></el-input>
              </el-col>
              <el-col :span="8" style="margin-top: 3px;text-align: right;">
                <i class="el-icon-check" @click="handleEdit($index, row,true)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF"></i>
                <i class="el-icon-close" @click="handleEdit($index, row,false)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"></i>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-row>
                <el-col :span="18">
                  <span
                    style=" overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;"
                    :style="{'display':'block','float':'left','width': '100%', 'color': (colorJudge(row)==='true'?'red':'blue')}">
                    {{row.matterproValue}}
                  </span>
                </el-col>
                <el-col :span="6">
                  <i class="el-icon-edit" @click="changeedit(2,row)"
                     style="cursor: pointer;font-size: 15px;color: #409EFF"></i>
                </el-col>
              </el-row>
            </el-row>


          </template>
        </el-table-column>
        <el-table-column prop="modelMin" label="最小值" show-overflow-tooltip width="100" sortable></el-table-column>
        <el-table-column prop="modelMax" label="最大值" show-overflow-tooltip width="100" sortable></el-table-column>
        <el-table-column prop="mahalanobisDistance" show-overflow-tooltip label="马氏距离" width="120" sortable></el-table-column>
        <el-table-column width="100">
          <template slot-scope="scope" slot="header">
            <el-checkbox :indeterminate="isIndeterminate" v-model="isUpload"
                         @change="changeAllUpload(isUpload)"></el-checkbox>
            <span> 是否上传</span>
          </template>
          <template slot-scope="{row,$index}">
            <el-checkbox v-model="row.pitchOn" @change="changeUpload(row,$index)"></el-checkbox>
          </template>

        </el-table-column>
        <el-table-column label="" min-width="5">
        </el-table-column>
      </el-table>
    </el-row>
  </basic-container>
</template>

<script>
import {onLoadSelectmatterpro, updateAnalysisDisValue, updateUndatematterpro} from "../../../api/qcduty/workorder";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "wxTableDiv",
  props: {
    bottomTableHeight: {
      Type: String,
      default: () => ''
    },
    wkid: {
      Type: Number,
      default: () => 0
    },
    isLoad: false
  },
  data() {
    return {
      bottomTableData: [],
      isRedArray: [],
      isUpload: false,
      isIndeterminate: false,
      backupsMatterlists:[],
    }
  },
  mounted() {
    this.getWXTableList();
  },
  methods: {
    //拖拽控制最小宽度
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    /**
     * 物性列表信息
     */
    getWXTableList(wkid) {
      if (wkid > 0) {
        onLoadSelectmatterpro(wkid).then((res) => {
          let isRed = [];
          let isHasTrue = false;
          let isHasFalse = false;
          if (res.data.code == 200) {
            this.bottomTableData = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.bottomTableData.forEach(item => {
            item.Iid = Math.floor(Math.random() * 100000);
            isRed.push(this.colorJudge(item));
            if (item.pitchOn) {
              isHasTrue = true;
            } else {
              isHasFalse = true;
            }
          })
          this.backupsMatterlists = JSON.parse(JSON.stringify(this.bottomTableData))
          this.isIndeterminate = isHasTrue && isHasFalse;

          if (this.bottomTableData.length > 0) {
            if (isRed.indexOf('true') > -1) {
              this.$emit('unableSubmit', true);
            } else {
              this.$emit('unableSubmit', false);
            }
            for (let i = 0; i < this.bottomTableData.length; i++) {
              this.$set(this.bottomTableData[i], 'editunit', true);
              this.$set(this.bottomTableData[i], 'editvalue', true);
              this.$set(this.bottomTableData[i], 'tempVal', this.bottomTableData[i].matterproValue);
            }
          } else {
            this.bottomTableData = [];
            this.$emit('unableSubmit', false);
          }

            let that = this
            setTimeout(()=>{
              that.$refs.bottomTable.bodyWrapper.scrollTop = 0
            })

        });

        this.$nextTick(() => {
          this.$emit('updateLoadVal', false);
        })

      } else {
        this.$emit('unableSubmit', false);
      }
    },
    //修改了下表的分析值后触发
    handleEdit(index, row, isSave) {
      if (!isSave) {
        //取消保存
        this.bottomTableData[index].tempVal = this.bottomTableData[index].matterproValue;
        this.bottomTableData[index].editvalue = true;
      } else {
        //保存
        this.valueIsRed = false;
        let reg1 = new RegExp(/^(\-|\+)?\d+(\.\d+)?$/);
        let flag1 = reg1.test(row.tempVal);
        // console.log(row.matterproValue);
        if (flag1 || row.matterproValue == "" || row.matterproValue == "0" ) { //满足正负整数或正负浮点数
          //判断正则--未完成
          var selectedunitId = '';
          for (let item of row.units) {
            if (item.MATTERPRO_UNIT == row.matterproUnit) {
              selectedunitId = item.MATTERPROUNITID;
            }
          }
          updateAnalysisDisValue(row.wkId, row.matterproCode, selectedunitId, row.tempVal).then((res) => {
            if(res.data.code == 200){
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
            }else {
                let that = this;
                errorMsgbox(that, res.data.msg);
            }
            this.getWXTableList(row.wkId);
          });
        } else {
          //非数字清空当前值
          row.matterproValue = '';
          this.$message.warning("请输入合法数字");
          this.getWXTableList(row.wkId);
          return;
        }
        this.$emit('unableSubmit', this.valueIsRed);
      }
    },
    //颜色判断
    colorJudge(row) {
      var isRed = 'false';
      if (row.matterproDownValue == "" || row.matterproUpValue == "") {
        isRed = 'false';
        this.valueIsRed = false;
      }
      if (row.matterproUpValue != null && row.matterproDownValue != null && row.matterproUpValue != "") {
        if (Number(row.matterproValue) > row.matterproUpValue) {
          isRed = 'true';
          this.valueIsRed = true;
        } else if (row.matterproDownValue != "") {
          if (Number(row.matterproValue) < row.matterproDownValue) {
            isRed = 'true';
            this.valueIsRed = true;
          }
        }
      } else if (row.matterproDownValue != "") {
        if (Number(row.matterproValue) < row.matterproDownValue) {
          isRed = 'true';
          this.valueIsRed = true;
        }
      }
      return isRed;
    },
    //修改添加状态
    changeedit(flag, row) {
      if (flag == 1) {
        this.$set(row, "editunit", false);
      } else if (flag == 2) {
        this.backupsMatterlists.forEach((item,i)=>{
          this.bottomTableData.forEach((ele,j)=>{
            if(item.Iid == ele.Iid){
              this.bottomTableData[j].matterproValue = this.backupsMatterlists[i].matterproValue
            }
          })
        })
        this.bottomTableData.forEach((item,index)=>{
          if(item.Iid == row.Iid){
            console.log(this.bottomTableData[index].editvalue)
            this.bottomTableData[index].editvalue = false
          }else if(item.Iid != row.Iid) {
            console.log(this.bottomTableData[index].editvalue)
            this.bottomTableData[index].editvalue = true
          }
        })
        this.bottomTableData.push({a:0})
        this.bottomTableData.pop()


        // this.$set(row, "editvalue", false);
        // this.$nextTick(() => {
        //   this.$refs[`customerInput`].focus()
        // })
      }
    },
    /**
     * 全选 取消全选改变是否上传改变事件
     */
    changeAllUpload(val) {
      this.isIndeterminate = false;
      let operation = val ? '1' : '2';
      this.bottomTableData.forEach(item => {
        item.pitchOn = val;
      })
      updateUndatematterpro({
        wkId: this.wkid,
        analysisresultId: '',
        matterproCode: '',
        pitchOn: val,
        operation: operation
      }).then(res => {
        if (res.data.code === 200) {
          // this.$message.success(res.data.msg);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 单独选择是否上传改变事件
     */
    changeUpload(row, index) {
      this.changeCheckStyle();
      updateUndatematterpro({
        wkId: row.wkId,
        analysisresultId: row.analysisresultId,
        matterproCode: row.matterproCode,
        pitchOn: row.pitchOn,
        operation: '0'
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg);
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
          console.log(2)
          this.getWXTableList(row.wkId);
        }
      })

    },
    changeCheckStyle() {
      let isHasUpload = false;//是否有不上传的数据
      let isHasTrue = false;
      this.bottomTableData.forEach(item => {
        if (!item.pitchOn) {
          isHasUpload = true;
        } else {
          isHasTrue = true;
        }
      })
      if (isHasUpload) {
        this.isUpload = false;
      } else {
        this.isUpload = true;
      }
      this.isIndeterminate = isHasTrue && isHasUpload;
    }
  },
  watch: {
    wkid() {
      // console.log(this.wkid,'///')
      if (this.wkid > 0) {
        // this.getWXTableList(this.wkid);
      } else {
        this.bottomTableData = [];
      }
    },
    bottomTableData() {
      this.changeCheckStyle();
    },
    isLoad() {
      if (this.isLoad) {
        this.getWXTableList(this.wkid);
      }
    }
  }
}
</script>

<style scoped lang="scss">
/depp/ .el-input__inner {
  height: 23px !important;
  line-height: 23px !important;
}
.el-table {
  /deep/ th {
    padding: 0 ;
  }
  /deep/ td {
    padding: 0 ;
  }
}
</style>
