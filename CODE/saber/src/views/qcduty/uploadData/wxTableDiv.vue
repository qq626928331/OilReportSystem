<template>
  <basic-container>
    <el-row>
      <el-table width="100%" border :data="bottomTableData" :height="bottomTableHeight" :header-row-style="{height:'20px'}"
                :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"  @header-dragend="changeColWidth">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="matterproName" label="物性名称" min-width="110" sortable  show-overflow-tooltip>
          <template slot-scope="scope">
            <el-row>
              <el-col :span="4" style="text-align: left;">
                <i v-if="scope.row.pitchOn" style="color: #409EFF;" class="el-icon-upload2"></i>
                <div v-else>&nbsp;</div>
              </el-col>
              <el-col :span="20" style=" overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                <span>{{ scope.row.matterproName }}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="matterproCode" label="物性编码" width="120" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.matterproCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="物性单位" width="120" sortable>
          <template slot-scope="{row,$index}">
            <span>{{ row.matterproUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分析值" prop="matterproValue" width="150" sortable show-overflow-tooltip></el-table-column>
        <el-table-column>
          <template slot-scope="scope" slot="header">
            <el-checkbox :indeterminate="isIndeterminate" v-model="isUpload"
                         @change="changeAllUpload(isUpload)"></el-checkbox>
            <span> 是否上传</span>
          </template>
          <template slot-scope="{row,$index}">
            <el-checkbox v-model="row.pitchOn" @change="changeUpload(row,$index)"></el-checkbox>
          </template>

        </el-table-column>
<!--        <el-table-column label="" min-width="5">-->
<!--        </el-table-column>-->
      </el-table>
    </el-row>
  </basic-container>
</template>

<script>
import {updateUndatematterpro} from "../../../api/qcduty/workorder";
import {selectUploadMatterpro} from "../../../api/qcduty/uploaddata.js";
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
    inlogId: {
      Type: Number,
      default: () => 0
    },
    noData: {
      Type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      bottomTableData: [],
      isRedArray: [],
      isUpload: false,
      isIndeterminate: false,
    }
  },
  mounted() {
    if (this.noData) {
      this.bottomTableData = [];
    }
    this.getWXTableList(this.wkid, this.inlogId);
    console.log("this.noData");
    console.log(this.noData);
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
    getWXTableList(wkid, inlogId) {
      if (wkid > 0) {
        selectUploadMatterpro(wkid, inlogId).then((res) => {
          // console.log(111)
          if (res.data.code == 200) {
            this.bottomTableData = res.data.data;
            let isHasTrue = false;
            let isHasFalse = false;
            this.bottomTableData.forEach(item => {
              if (item.pitchOn) {
                isHasTrue = true;
              } else {
                isHasFalse = true;
              }
            })
            this.isIndeterminate = isHasTrue && isHasFalse;

            if (this.bottomTableData.length > 0) {
              for (let i = 0; i < this.bottomTableData.length; i++) {
                this.$set(this.bottomTableData[i], 'editunit', true);
                this.$set(this.bottomTableData[i], 'editvalue', true);
                this.$set(this.bottomTableData[i], 'tempVal', this.bottomTableData[i].matterproValue);
              }
            } else {
              this.bottomTableData = []
              this.$emit('unableSubmit', false);
            }
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      } else {
        this.bottomTableData = [];
      }
    },
    /**
     * 全选 取消全选改变是否上传改变事件
     */
    changeAllUpload(val) {
      this.isIndeterminate = false;
      this.bottomTableData.forEach(item => {
        item.pitchOn = val;
      })
    },
    /**
     * 单独选择是否上传改变事件
     */
    changeUpload(row, index) {
      this.changeCheckStyle();
    },
    //检测对号勾选样式
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
      this.$emit('bottomTableData', this.bottomTableData)
    }
  },
  watch: {
    //监听上传数据日志id变化
    inlogId() {
      if (this.inlogId > 0 && this.wkid > 0) {
        this.getWXTableList(this.wkid, this.inlogId);
      } else {
        this.bottomTableData = [];
      }
    },

    bottomTableData() {
      this.changeCheckStyle();
    }
  }
}
</script>

<style scoped lang="scss">
/depp/ .el-input__inner {
  height: 23px !important;
  line-height: 23px !important;
}
</style>
