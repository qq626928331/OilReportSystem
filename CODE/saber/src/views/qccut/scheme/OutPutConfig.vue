<template>
  <div>
    <el-row>
      <el-button type="primary" size="small" @click="setWxStatus('1')">
        <img src="../../../../public/icon/ic_check.png" style="margin-right: 5px; ">
        选 中
      </el-button>
      <el-button type="primary" size="small" @click="setWxStatus('3')">
        <img src="../../../../public/icon/ic_none.png" style="margin-right: 5px; ">
        取 消
      </el-button>
      <el-button type="primary" size="small" @click="setWxStatus('2')">
        <img src="../../../../public/icon/ic_xing2.png" style="margin-right: 5px; ">
        星 号
      </el-button>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-table id="outputTable"
                :data="outputTableData" size="small" @selection-change="handleChange"
                ref="outputTable"
                border class="tb-edit"
                @cell-click="cellClick" max-height="305">
        <el-table-column type="selection" align="center" width="55">
        </el-table-column>
        <el-table-column align="center" v-for="(col,index) in cols" :key="index"
                         :prop="col.prop" :label="col.label" :fixed="index==0||index==1||index==2"
                         :width="index==0?60:'' || index==1?120:'' || index==2?100:120" show-overflow-tooltip>
          <template slot-scope="scope" slot="header">
            <span v-if="col.prop=='SIDING_NAME'">
              {{ col.label }}
            </span>
            <span v-else-if="col.prop=='XH'">
              {{ col.label }}
            </span>
            <span v-else-if="col.prop=='SIDING_CODE'">
              {{ col.label }}
            </span>
            <span v-else>
              {{ col.label }}&nbsp;&nbsp;
              <el-checkbox :v-model="col.prop" @change="colChange(scope.column)"></el-checkbox>
            </span>
          </template>
          <template slot-scope="scope">
            <span v-if="col.prop=='SIDING_NAME'">
              {{ scope.row[scope.column.property] }}
            </span>
            <span v-else-if="col.prop=='XH'">
              {{ scope.row[scope.column.property] }}
            </span>
            <span v-else-if="col.prop=='SIDING_CODE'">
              {{ scope.row[scope.column.property] }}
            </span>
            <div v-else>
              <img class="checkboxSpan" v-if="scope.row[scope.column.property]==='1'"
                   style="width: 16px;height: 16px;margin-top:4px;"
                   src="../../../../public/img/icon/ic_check.png">
              <img v-else-if="scope.row[scope.column.property]==='2'"
                   style="width: 16px;height: 16px;margin-top:4px;"
                   src="../../../../public/img/icon/ic_star.png">
              <img v-else-if="scope.row[scope.column.property]==='3'"
                   style="width: 16px;height: 16px;margin-top:4px;"
                   src="../../../../public/img/icon/ic_space.png">
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="1"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import {getOutputInfo} from "../../../api/qccut/scheme";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "OutPutConfig",
  props: {
    schemeId: Number
  },
  data() {
    return {
      outputTableData: [],
      tableHeight: '280px',
      cols: [
        {
          label: "序号",
          prop: "XH"
        },
        {
          label: "侧线名称",
          prop: "SIDING_NAME"
        },
        {
          label: "侧线编码",
          prop: "SIDING_CODE"
        }
      ],//输出配置表格列表默认的表头数据
      selRowData: [],//复选框选中行数据
      selColData: [],//复选框选中列数据
      toApiData: [],//接口请求封装数据
      isChange: false
    }
  },
  mounted() {
    this.getOutputInfo();
  },
  methods: {
    /**
     * 加载table数据
     */
    getOutputInfo() {
      this.outputTableData = [];
      // this.columnproperty = [];
      // this.thirdselectXH = [];
      getOutputInfo(this.schemeId).then(res => {
        if (res.data.code === 200) {
          this.cols = res.data.data[0]
          this.outputTableData = res.data.data[1];
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
      this.$emit("nextCanUse",false);
    },
    /**
     * 单元格点击事件
     * @param row
     * @param column
     */
    cellClick(row, column) {
      this.isChange = true;
      if (column.property != 'XH' && column.property != 'SIDING_NAME' && column.property != 'SIDING_CODE'
        && column.property != 'SCHEMESIDING_ID') {
        let status = parseInt(row[column.property]);
        if (status < 3) {
          status++;
        } else {
          status = 1;
        }
        this.$set(row, column.property, status + '');
        this.toApiData.push({
          sidingmatterproId: row.SCHEMESIDING_ID,
          matterproCode: column.property,
          status: status + ''
        })
        return false;
      }
    },
    /**
     * 行——复选框监听事件
     */
    handleChange(val) {
      this.selRowData = [];
      val.forEach(item => {
        this.selRowData.push(item);
      })
    },
    /**
     * 列——复选框监听事件
     */
    colChange(val) {
      if (this.selColData.length > 0) {//有数据存在
        if (this.selColData.indexOf(val.property) > -1) {//判断是否有数据，有
          this.$delete(this.selColData, this.selColData.indexOf(val.property));
        } else {
          this.selColData.push(val.property);
        }
      } else {
        this.selColData.push(val.property);
      }
    },
    /**
     * 设置物性状态
     * @param status
     */
    setWxStatus(status) {
      this.isChange = true;
      //行事件
      this.selRowData.forEach(item => {
        const onenowData = item;
        var keys = Object.keys(onenowData);
        for (var key in keys) {
          if (keys[key] != 'XH' && keys[key] != 'SIDING_NAME' && keys[key] != 'SIDING_CODE' && keys[key] != 'SCHEMESIDING_ID') {
            var index = onenowData['XH'] - 1;
            this.toApiData.push({
              sidingmatterproId: this.outputTableData[index].SCHEMESIDING_ID,
              matterproCode: keys[key],
              status: status
            })
            this.$set(this.outputTableData[index], keys[key], status);
          }
        }
      })
      //列事件
      if (this.selColData) {
        for (var i = 0; i < this.outputTableData.length; i++) {
          for (var j = 0; j < this.selColData.length; j++) {
            this.toApiData.push({
              sidingmatterproId: this.outputTableData[i].SCHEMESIDING_ID,
              matterproCode: this.selColData[j],
              status: status
            })
            this.$set(this.outputTableData[i], this.selColData[j], status);
          }
        }
      }
    }
  },
  watch: {
    isChange() {
      if (this.isChange)
        this.$emit('changeData', this.toApiData);
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1366px) and (max-width: 1919px) {
  //#outputTable {
  //  height: 290px;
  //  max-height: 290px;
  //}
}

@media screen and (max-width: 1920px) {
  //#outputTable {
  //  height: 305px;
  //  max-height: 305px;
  //}
}


/deep/ #outputTable .el-table__fixed {
  .el-table {
    .el-table__fixed {
      height: auto !important;
      bottom: 17px !important;
    }
  }
}

/deep/ #outputTable .el-table__body-wrapper {
  z-index: 2;
}
</style>
