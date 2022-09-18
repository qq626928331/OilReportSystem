<template>
  <el-form :inline="true" :size="formSize" style="margin-bottom: 5px !important;">
    <el-row>
      <el-col :span="24" style="text-align: left;">
        <el-form-item label="工单编号：">
          <el-input placeholder="工单编号" clearable v-model="queryInfo.workorderOdd"></el-input>
        </el-form-item>
        <el-form-item label="装置：">
          <el-select v-model="queryInfo.deviceId" clearable @change="changedevice" placeholder="请选择装置">
            <el-option
              v-for="item in devicelist"
              :key="item.deviceId"
              :label="item.devicename"
              :value="item.deviceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料：">
          <el-select v-model="queryInfo.materielid" clearable placeholder="请选择物料">
            <el-option
              v-for="item in materiellist"
              :key="item.materielid"
              :label="item.materielName"
              :value="item.materielid"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" icon="el-icon-search"
                     @click="handleSubmit('searchData')">查询
          </el-button>
        </el-form-item>
        <el-form-item style="padding-left: 10px;">
          <el-button type="primary" @click="handleSubmit('simplereportConfigure')" :disabled="listenfooterInfo || disabledFlag"><img src="/icon/btn_jianpingbaogao.png"
                                                                                                                                     style="width: 10px;height:10px; margin-right:6px;"/>简单评价</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('detailreportConfigure')" :disabled="listenfooterInfo || disabledFlag"><img src="/icon/btn_xiangqingbaogao.png"
                                                                                                                                     style="width: 10px;height:10px; margin-right:6px;"/>详细评价</el-button>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
  import {mapGetters} from "vuex";
  import {searchDeviceByOil, searchMaterielWithOilByDevice, searchSampleByDevice} from "../../../api/qcduty/workorder";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name: "handleDiv",
    props: {
      formSize: {
        Type: String,
        default: () => 'small'
      },
      disabledFlag:{
        Type: Boolean,
      },
      queryInfo: {
        Type: Object,
        default: () => {

        }
      },
    },
    data() {
      return {
        devicelist: [],
        samplelist: [],
        materiellist: []
      }
    },
    mounted() {
      this.searchDevice();
      console.log(this.$store.state,'////')
    },
    methods: {
      searchDevice() {
        searchDeviceByOil().then((res) => {
          if (res.data.code === 200){
            this.devicelist = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      },
      //修改装置数据
      changedevice(val) {
        // this.sampleId = "";
        // this.materielId = "";
        this.queryInfo.materielid = ''
        this.searchSampleByDevice(val);
        this.searchMaterielByDevice(val);
      },
      //根据装置信息获取采样点
      searchSampleByDevice(deviceId) {
        searchSampleByDevice(deviceId).then((res) => {
          if (res.data.code === 200){
            this.samplelist = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }

        });
      },
      //根据装置查询物料
      searchMaterielByDevice(deviceId) {
        searchMaterielWithOilByDevice(deviceId).then((res) => {
          if (res.data.code === 200) {
            this.materiellist = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      },
      handleSubmit(clickName) {
        this.$emit('toClick', clickName)
      }
    },
    computed: {
      ...mapGetters(["permission"]),
      listenfooterInfo() {
        return this.$store.state.common.EvaluateBtnFlag
      }

    },
    // watch:{
    //   '$store.state.EvaluateBtnFlag':
    // }
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

  @media screen and (min-width: 1920px) {
    /deep/ .el-input--mini .el-input__inner {
      padding: 0 15px 0px 5px;
    }
    /deep/ .el-form-item__label {
      padding: 0 12px 0 0;
    }
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
</style>
