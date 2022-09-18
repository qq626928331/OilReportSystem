<template>
  <!--    关于信息弹框-->

  <el-dialog
    :visible.sync="show"
    width="44%"
    title="关于"
    :before-close="handleClose">
    <div style="text-align: center;">
      <div style="height: 110px;    margin-top: 14px;">
        <img src="@/assets/images/about/log.png"/>
      </div>
      <span style="font-size: 24px;
    color: #034b97;
    display: block;
        margin-top: 12px;
    line-height: 1;">智能快评分析系统</span>
    </div>
    <div style="margin-top: 12px;
    padding: 0 45px;" class="dialog-content">
      <span class="blankSpace"></span>智能快评分析系统，用于炼厂物料物性数据的应用和综合展示，如全厂物性地图、元素平衡（硫平衡等）、物性跟踪、快评日报、原油评价、报表定制、油品调合等，并支持不同系统间数据传输和功能拓展。<br/>
      <span class="blankSpace"></span>对原油进行快速分析时，自动生成原油简评报告和详评报告；支持原油的模拟切割，输出PIMS、RSIM等报表，用于计划优化和装置优化的数据支持；快评数据可进行原油、汽油、柴油、燃料油的调合计算和配方优化，降低质量过剩，实现效益最大化。<br/>
      <span class="blankSpace"></span>智能快评分析系统可实现企业不同平台数据共享，实现分析数据全流程优化应用，提供相关软件应用许可权限，以满足相关应用系统平台的使用。<br/>
      <span class="blankSpace"></span>基于智能快评分析系统，快速了解原料油及各类馏分油性质, 及时为生产运行管理提供基础数据支撑，最大限度产出所加工原油每段馏分的价值。
    </div>
    <div style="margin-top: 5px;
    padding: 0 45px;    display: flex;
    justify-content: center;">
      <!--        <div></div>-->
      <div class="footer">
        <div style=" margin-left: 46px;position: relative;">
          <div style="position: absolute;">
            <img style="height: 120px;" src="@/assets/images/about/erweima.png"/>
          </div>
        </div>
        <div style="display: flex;flex-direction: column;font-size: 16px;color: #4a4a4a;line-height: 1.9;
    margin-left: 145px;">
          <span style="color: #034b97">北京泓泰天诚科技有限公司</span>
          <span style="font-size: 12px;">地址：北京市朝阳区望京利泽中园101号启明国际大厦11层</span>
          <span style="font-size: 12px;">邮编：100102</span>
          <span style="font-size: 12px;">电话：010-8414 8890</span>
          <span style="font-size: 12px;">邮箱：business@hontye.com</span>
        </div>
      </div>

    </div>
    <div style="text-align:center">Copyringht © {{ year }} 北京泓泰天诚科技有限公司</div>
    <div style="text-align: center;    line-height: 1.5;
    height: 40px;">
      <span style="margin-right: 10px;">V2.1.22.0223</span>
      <span v-show="isShowUpdateLog" style="color: #409EFF;cursor: pointer;" @click="isService()">更新日志</span>
    </div>
  </el-dialog>
</template>


<script>
import '@/assets/iconFontSize/iconFont/iconfont.css'
import {$getJson} from "../../../router/getJson";
import {userRole} from "../../../api/user";
import {errorMsgbox} from "@/api/global_variable";

export default {
  props: ['show'],
  name: "aboutDialog",
  data() {
    return {
      year: '',
      isShowUpdateLog: false
    }
  },
  mounted() {
    this.getYear();
    this.selectIsShowUpdateLog();
  },
  methods: {
    /**
     * 判断 是否显示更新日志按钮
     */
    selectIsShowUpdateLog() {
      userRole().then(res => {
        if (res.data.code === 200) {
          this.isShowUpdateLog = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },

    //弹框关于方法
    handleClose() {
      // this.dialogVisible = false
      this.$emit('clickDialogShow', false)
    },
    isService() {
      $getJson('/home.json').then(res => {
        window.open(res.data.baseUrl + '/daily.html#/daily');
      })
    },
    //获取年
    getYear() {
      const date = new Date();
      this.year = date.getFullYear();
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog__body {
  padding: 0px 0px !important;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

/deep/ .el-dialog__header {
  padding: 12px 20px 0px !important;
}

.dialog-content {
  white-space: normal;
  line-height: 2;
  /* margin-top: 12px; */
  font-size: 16px;
  color: #444444;
}

.footer {
  width: 86%;
  border-top: 1px solid #034b97;
  border-bottom: 1px solid #034b97;
  display: flex;
  padding: 8px 0px;
  margin-top: 12px;
}

/deep/ .el-dialog .el-dialog__header {
  padding: 0px !important;
  text-align: left;
  height: 25px;
  line-height: 1;
  margin-left: 10px;
}

.blankSpace {
  width: 31px;
  height: 10px;
  display: inline-block;
}

/deep/ button.el-dialog__headerbtn {
  /*<!--line-height: -31px;-->*/
  font-size: 20px;
  top: 5px;
}
</style>
