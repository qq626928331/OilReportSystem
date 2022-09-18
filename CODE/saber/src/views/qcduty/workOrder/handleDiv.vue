<template>
  <el-form :inline="true" :size="formSize" style="margin-bottom: 5px !important;">
    <el-row>
      <el-col :span="24" style="text-align: left;">
        <el-form-item label="装置：" prop="deviceId">
          <el-select v-model="queryInfo.deviceId" class="compatibility_1366" clearable @change="changedevice" placeholder="请选择装置名称">
            <el-option
              v-for="item in devicelist"
              :key="item.deviceId"
              :label="item.devicename"
              :value="item.deviceId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采样点：" prop="sampleId">
          <el-select v-model="queryInfo.sampleId" class="compatibility_1366"  clearable @change="changesample" placeholder="请选择采样点">
            <el-option
              v-for="item in samplelist"
              :key="item.sampleId"
              :label="item.sampleName"
              :value="item.sampleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料：" prop="materielId">
          <el-select @change="changeMaterial" class="compatibility_1366"  v-model="queryInfo.materielid" clearable placeholder="请选择物料">
            <el-option
              v-for="item in materiellist"
              :key="item.materielid"
              :label="item.materielName"
              :value="item.materielid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button style="margin-bottom: 15px" type="primary" icon="el-icon-search"
                     @click="handleSubmit('searchData')">查询
          </el-button>
        </el-form-item>
        <el-form-item style="padding-left: 10px;">
          <el-button :disabled="!btnDisInfo.submit" type="primary" icon="el-icon-check"
                     @click="handleSubmit('handleSubmit')">提交
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!btnDisInfo.audit" type="primary" icon="el-icon-circle-plus-outline"
                     @click="handleSubmit('handleApprove')">审批
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!btnDisInfo.reject" type="primary" icon="el-icon-warning-outline"
                     @click="handleSubmit('handleReject')">驳回
          </el-button>
        </el-form-item>
        <el-form-item style="padding-left: 10px;">
          <el-button :disabled="!btnDisInfo.del"
                     type="danger"
                     icon="el-icon-close"
                     plain
                     @click="handleSubmit('handleCancel')"
          >删除
          </el-button>
        </el-form-item>

        <el-form-item style="padding-left: 10px;">
          <el-button style="margin-bottom: 15px" type="primary" icon="el-icon-download"
                     @click="handleSubmit('handleexport')">导出
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import {searchDevice, searchMaterielByDevice, searchSampleByDevice} from "../../../api/qcduty/workorder";
import {mapGetters} from "vuex";
import permission from "../../util/permission";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "handleDiv",
  props: {
    formSize: {
      Type: String,
      default: () => 'small'
    },
    queryInfo: {
      Type: Object,
      default: () => {

      }
    },
    btnDisInfo: {
      Type: Object,
      default: () => {

      }
    }
  },
  data() {
    return {
      devicelist: [],//装置下拉列表
      samplelist: [],//采样点下拉列表
      materiellist: [],//物料下拉列表
    }
  },
  mounted() {
    this.searchDevice();
  },
  methods: {
    /**
     * 装置下拉列表
     */
    searchDevice() {
      searchDevice().then((res) => {
        if (res.data.code === 200) {
          this.devicelist = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    /**
     * 根据装置信息获取采样点
     * @param deviceId
     */
    searchSampleByDevice(deviceId) {
      searchSampleByDevice(deviceId).then((res) => {
        if (res.data.code === 200) {
          this.samplelist = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    /**
     * 根据装置查询物料
     * @param deviceId
     */
    searchMaterielByDevice(deviceId) {
      searchMaterielByDevice(deviceId).then((res) => {
        if (res.data.code === 200) {
          let that = this;
          this.materiellist = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    /**
     * 监听装置选择事件
     * @param val
     */
    changedevice(val) {
      this.$nextTick(()=>{
        this.queryInfo.sampleId = '';
        this.queryInfo.materielid = '';
      })
      this.searchSampleByDevice(val);
      this.searchMaterielByDevice(val);
      this.$emit('changeSelDiv', this.queryInfo);
    },
    /**
     * 舰艇采样点选择事件
     */
    changesample() {
      this.$emit('changeSelDiv', this.queryInfo);
    },
    /**
     * 监听物料选择事件
     */
    changeMaterial() {
      this.$emit('changeSelDiv', this.queryInfo);
    },
    handleSubmit(clickName) {
      this.$emit('toClick', clickName)
    }
  },
  computed: {
    ...mapGetters(["permission"]),
  }
}
</script>

<style scoped lang="scss">

@media screen and (min-width: 1366px) and (max-width: 1919px) {
  /deep/ .el-form-item__label {
    padding: 0px !important;
  }

  /deep/ .el-input--mini .el-input__inner {
    width: 125px !important;
    padding: 0 15px 0px 5px;
  }

  /deep/ .el-input .el-input--mini .el-input--suffix {
    width: auto !important;
  }
}


@media screen and (min-width: 1300px) and (max-width: 1440px) {
  .compatibility_1366{
    width: 120px;
  }
}


@media screen and (min-width: 1920px) {
  /deep/ .el-input--mini .el-input__inner {
    padding: 0 15px 0px 5px;
  }
  /deep/ .el-form-item__label {
    padding: 0 12px 0 0;
  }
}

/deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: -12px;
}

</style>
