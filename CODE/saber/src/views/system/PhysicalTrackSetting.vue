<template>
  <div style="" v-resize="resizes">
    <div style="box-shadow: 0px 0px 5px #d2d5d5;background-color: #FFFFFF;padding: 0px 15px;">
      <el-row>
        <el-form :inline="true">
          <el-form-item style="margin-bottom: 0px;">

            <el-tooltip class="item" effect="dark" content="保存" placement="top">
              <i class="iconfont icon-baocun" @click="save"></i>
            </el-tooltip>
            <!--          <el-button @click="save" size="small" type="primary" icon="el-icon-document-checked"> 保存</el-button>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px;">
            <el-tooltip class="item" effect="dark" content="发布" placement="top">
              <i class="el-icon-share" @click="publish"></i>
            </el-tooltip>
            <!--          <el-button @click="publish" size="small" type="success" icon="el-icon-share"> 发布</el-button>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px;" v-if="isPublished">
            <div style="cursor: pointer;font-size: 20px">
              <el-tooltip class="item" effect="dark" content="撤销发布" placement="top">
                <i class="iconfont icon-chexiao" @click="revoke"></i>
              </el-tooltip>
            </div>
            <!--          <el-button @click="revoke" size="small" type="danger" plain icon="el-icon-refresh-left"> 撤销发布</el-button>-->
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div style="background-color: #FFFFFF;margin-top: -13px;">
      <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="handleClick"
               :style="{'margin-top':'10px','margin-top': '16px','height': tabHeight}">
        <el-tab-pane v-for="(item,index) in tabList" :key="index"
                     :label="item.showName" :name="item.name">
          <div style="padding: 10px 0px;">
            <el-row>
              <el-col :span="18" style="text-align: left;">
                <label style="font-size: 22px;">{{ showNameTitle }}</label>
              </el-col>
              <el-col :span="6" style="text-align: right;">
                <el-button @click="showSet" size="small" icon="el-icon-edit" type="primary"> 配置</el-button>
              </el-col>
            </el-row>
            <el-row class="echarts">
              <div :class="chartId" :style="{width:'100%',height:chartBodyHeight}"
                   ref="myChartBody"></div>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <setting :isShowSet="isShowSetDia" :dia-title="currLabel" :currId="currId" :currMaterialId="currMaterialId"
             @closeDia="closeDia"></setting>
  </div>
</template>

<script>
import Setting from "./Setting";
import {
  cancelMatterproTrackingRelease,
  getTabList,
  releaseMatterproTrackingConfig, selectMatterproTrackingValue, selectReleaseStatus
} from "../../api/system/PhysicalTrackSetting";
import {dateformats_0, loadOptionByIndex, loadOptionBySetting, loadOptionBySetting_One} from "../../api/charts/options";
import echart from 'echarts';

let myChart = "";

export default {
  name: "/system/PhysicalTrackSetting",
  components: {
    Setting
  },
  data() {
    return {
      isPublished: false,
      activeName: 'tab1',
      tabPosition: 'left',
      tabList: [],
      showNameTitle:'',
      isShowSetDia: false,
      currLabel: '',
      currId: 1,
      chartId: 'chart1',
      currMaterialId: 0,
      chartBodyHeight: '',
      currObj: {
        mainYTitle: '',
        subYTitle: '',
        mainYUnit: '',
        subYUnit: ''
      },
      tabHeight: ''
    }
  },
  created() {

  },
  mounted() {
    this.getTabList(0);
    this.selectReleaseStatus();
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      this.chartBodyHeight = window.innerHeight - 64 - 40 - 10 - 64 - 10 - 12 - 40 + 'px';
      this.tabHeight = window.innerHeight - 64 - 40  - 50+ 'px';
    },
    /**
     * 判断是否显示物性跟踪
     */
    selectReleaseStatus() {
      selectReleaseStatus().then(res => {
        if (res.data.code === 200) {
          this.isPublished = res.data.data;
        }
      })
    },
    resizes() {  // 当宽高变化时
      this.$nextTick(() => {
        setTimeout(() => {
          this.loadChartData()
          this.chartBodyHeight = window.innerHeight - 64 - 40 - 10 - 64 - 10 - 12 - 40 + 'px';
        }, 400)
      })
    },
    /**
     * 加载谱图点数据接口
     */
    loadChartData() {
      selectMatterproTrackingValue(7, this.currId).then(res => {
        // console.log(res.data.data.chartData.title,'dadadada')
        if (res.data.code === 200) {
          // console.log(res.data.data.chartData,'/////')
           this.showNameTitle = res.data.data.chartData.title
          let x_axis_list = dateformats_0(res.data.data.dateData);
          let chartData = res.data.data.chartData;
         // 通过判断布尔值 来提示当前界面渲染的数据真伪
         //  if (!chartData.mListRealData) {
         //    this.$message.warning("当前数据为默认假数据");
         //  }
          this.drawLineByData('chart' + (this.currId), chartData, x_axis_list);
        }
      })
    },
    drawLineByData(id, chartData, xData) {
      // console.log(id)
      let o = document.getElementsByClassName(id)[this.currId - 1];
      myChart = this.$echarts.init(o, null, {devicePixelRatio: 2});
      this.$nextTick(() => {
        myChart.resize();
      })
      myChart.clear();
      let option_chart = '';
      //判断y轴数量（1个或2个）
      // 遍历 chart数据源  如果 主刻度 和 副刻度 一样 做出处理
      const chartsData = []
      chartsData.push(chartData)
      // 注释 图例名称处理
      // chartsData.map(item=>{
      //     if(item.mainYTitle === item.subYTitle) {
      //       this.$set(item,'mainYTitle',item.mainYTitle+'(主)')
      //       this.$set(item,'subYTitle',item.subYTitle+'(副)')
      //       return
      //     }
      // })
      if (chartData.mainYTitle != '' && chartData.subYTitle != '') {
        option_chart = loadOptionByIndex(true, 7, xData, chartsData[0]);
      } else {
        //单y轴
        option_chart = loadOptionByIndex(false, 7, xData, chartData);
      }
      option_chart.title.text = ''
      myChart.setOption(option_chart);
      // window.addEventListener("resize", function () {
      //   let windowWidth = window.innerWidth;
      //   if (!this.isCollapse) {
      //     //全屏 未折叠左侧菜单
      //     this.chartWidth = (windowWidth - 240 - 20 - 40 - 40 - 20) / 2 + 'px';
      //     // this.chartHeight = (windowWidth - 240 - 20 - 40-40-20) / 2 + 'px'
      //   } else {
      //     //折叠左侧菜单
      //     this.chartWidth = (windowWidth - 60 - 20 - 40 - 40 - 20) / 2 + 'px';
      //     // this.chartHeight = (windowWidth - 60 - 20 - 40-40-20) / 2 + 'px'
      //   }
      //   myChart.resize({
      //     width: this.chartWidth
      //   });
      // })
    },

    /**
     * 绘制折线图
     */
    drawLine: function (id) {
      this.currObj = {
        mainYTitle: this.tabList[parseInt(this.currId - 1)].mmatterproName,
        subYTitle: this.tabList[parseInt(this.currId - 1)].fmatterproName,
        mainYUnit: this.tabList[parseInt(this.currId - 1)].mmatterproUnit,
        subYUnit: this.tabList[parseInt(this.currId - 1)].fmatterproUnit
      };
      let o = document.getElementsByClassName(id)[this.currId - 1];
      myChart = this.$echarts.init(o);
      myChart.clear();
      let yTitle = this.currObj.mainYTitle == '' ? this.currObj.subYTitle : this.currObj.mainYTitle;
      let yUnit = this.currObj.mainYUnit == '' ? this.currObj.subYUnit : this.currObj.mainYUnit;
      let option_chart = '';
      if (this.currObj.mainYTitle != '' && this.currObj.subYTitle != '') {
        option_chart = loadOptionBySetting([], this.currObj.mainYTitle, this.currObj.mainYUnit, this.currObj.subYTitle, this.currObj.subYUnit);
      } else {
        option_chart = loadOptionBySetting_One([], yTitle, yUnit);
      }
      myChart.setOption(option_chart);
      setTimeout(() => {
        myChart.resize();
      }, 100)

      window.addEventListener("resize", function () {
        myChart.resize();
      })
    },


    /**
     * 获取tab信息列表
     */
    getTabList(index) {
      getTabList(0).then(res => {
        if (res.data.code === 200) {
          console.log('左侧接口')
          this.tabList = res.data.data;
          if (index === 0) {
            if (this.tabList.length > 0) {
              this.currLabel = '物性跟踪配置-' + this.tabList[0].showName;
              this.showNameTitle = this.tabList[0].showName
              console.log(this.currLabel,'this.currLabel//')

              this.currMaterialId = this.tabList[0].materielCode;
              this.currObj = {
                mainYTitle: this.tabList[0].mmatterproName,
                subYTitle: this.tabList[0].fmatterproName,
                mainYUnit: this.tabList[0].mmatterproUnit,
                subYUnit: this.tabList[0].fmatterproUnit
              };
              let that = this;
              that.$nextTick(() => {
                // that.drawLine(that.chartId);
                this.loadChartData()
              })
            }
          } else {
            let that = this;
            that.$nextTick(() => {
              this.loadChartData()
            })
          }
        }
      })
    },

    /**
     * tab切换事件
     */
    handleClick(tab, event) {
      this.currLabel = '物性跟踪配置-' + tab.label;
      this.currId = parseInt(tab.index) + 1;
      this.chartId = 'chart' + this.currId;
      this.currMaterialId = this.tabList[parseInt(tab.index)].materielCode;
      this.currObj = {
        mainYTitle: this.tabList[parseInt(tab.index)].mmatterproName,
        subYTitle: this.tabList[parseInt(tab.index)].fmatterproName,
        mainYUnit: this.tabList[parseInt(tab.index)].mmatterproUnit,
        subYUnit: this.tabList[parseInt(tab.index)].fmatterproUnit
      };
      let that = this;
      that.$nextTick(() => {
        that.loadChartData();
      })
    },
    /**
     * 显示配置弹出层
     */
    showSet() {
      this.isShowSetDia = true;
    },
    closeDia(val) {
      this.isShowSetDia = false;
      if (val) {
        this.getTabList(1);
      }
    },
    /**
     * 保存
     */
    save() {
      this.$message.success('保存成功！');
    },
    /**
     * 发布
     */
    publish() {
      releaseMatterproTrackingConfig().then(res => {
        if (res.data.code === 200) {
          this.$message.success('发布成功！');
        }
      })
    },
    /**
     * 撤销发布
     */
    revoke() {
      cancelMatterproTrackingRelease().then(res => {
        if (res.data.code === 200) {
          this.$message.success('撤销发布成功！');
        }
      })
    },
  },

  directives: {  // 使用局部注册指令的方式
    resize: { // 指令的名称
      bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
        let width = '', height = '';

        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value();  // 关键
          }
          width = style.width;
          height = style.height;
        }

        el.__vueSetInterval__ = setInterval(isReize, 300);
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__);
      }
    }
  }
}
</script>

<style scoped>
/deep/ .el-tabs--left .el-tabs__item.is-left {
  text-align: right;
  /*height: 73px;*/
}

.echarts.el-row {
  height: 707px;
}

/deep/ canvas {
  /*height: 750px !important;*/
  /*left: -51px !important;*/
}

/*/deep/ .el-card .is-always-shadow {*/
/*  height: 100% !important;*/
/*}*/

/*/deep/ .avue-view  {*/
/*  height: 100% !important;*/
/*}*/

i.el-tooltip.iconfont.icon-baocun.item {
  color: #d9b611;
  font-size: 18px;
  padding: 0px 5px

}

i.el-tooltip.el-icon-share.item {
  color: chocolate;
  font-size: 18px;
  padding: 0px 5px


}

i.el-tooltip.iconfont.icon-chexiao.item {
  color: #ff2d51;
  font-size: 18px;
  padding: 0px 5px

}


</style>
