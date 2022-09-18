<template>
  <div :style="{width: chartWidth,'overflow-x': 'auto'}">
    <div style="height: 40px">
      <el-radio-group v-model="dateCount" style="margin-bottom: 30px;" @change="chartChange">
        <el-radio-button label="7">近7天</el-radio-button>
        <el-radio-button label="15">近15天</el-radio-button>
        <el-radio-button label="30">近30天</el-radio-button>
      </el-radio-group>
    </div>
    <el-row
      :style="{'padding': `0px ${outerMargin}px`,'width': '1700px','height':chartDivHeight,'overflow-y':'auto','overflow-x':'auto'}"
      :gutter="20"
      ref="chartContent">
      <el-col :span="12" v-for="item in chartCount" :key="item" :id="'chartDiv'+item" :style="{textAlign: 'center',padding: `0 ${inside}px !important`}">
        <div :id="'chart'+item" :style="{width:chartWidth,height:chartHeight}">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {selectAllMatterproValue} from "../../api/index/PhysicalTrackEchart";
import {
  dateformats_0, dateformats_year,
  loadOptionByIndex
} from "../../api/charts/options";
import {mapGetters} from "vuex";


export default {
  name: "PhysicalTrack",
  data() {
    return {
      outerMargin:20,
      inside:10,

      maxStrLength:[],
      dateCount: 0,
      chartCount: 10,
      chartHeight: '',
      chartWidth: '',
    }
  },
  props: {
    chartDivHeight: '',
    phyTrackBlock:Boolean,
  },
  created() {
    // this.chartDivHeight = window.innerHeight - 64 - 40 - 70-80 + 'px';
    // console.log('div框高度' + this.chartDivHeight);
  },
  mounted() {
    // let windowWidth = window.innerWidth;
    // if (!this.isCollapse) {
    //   //全屏 未折叠左侧菜单
    //   this.chartWidth = (windowWidth - 240 - 20 - 40 - 40 - 20) / 2 + 'px';
    //   console.log(this.chartWidth,'/this.chartWidth')
    //   // this.chartHeight = (windowWidth - 240 - 20 - 40-40-20) / 2 + 'px'
    // } else {
    //   //折叠左侧菜单
    //   this.chartWidth = (windowWidth - 60 - 20 - 40 - 40 - 20) / 2 + 'px';
    //   // this.chartHeight = (windowWidth - 60 - 20 - 40-40-20) / 2 + 'px'
    // }
    if (window.innerWidth <= 1366) {
      this.inside = 0
      this.outerMargin = 5
    }
    this.loadData();
  },
  methods: {
    chartChange(val){
      // if (this.dateCount > 0) {
        this.dateCount = val
        this.loadData();
        this.chartHeight = '400px';
        this.$nextTick(()=>{
          this.chartWidth = '100%'
        })
      // }
    },
    loadData() {
      selectAllMatterproValue(this.dateCount).then(res => {
        if (res.data.code === 200) {
          if (res.data.data != null) {
            this.chartCount = res.data.data.chartData.length;
            //x轴数据
            let x_axis_list = dateformats_0(res.data.data.dateData);
            // let x_axis_list = dateformats_year(res.data.data.dateData);
            // let x_axis_list = res.data.data.dateData;
            let chartDataList = res.data.data.chartData;
            chartDataList.forEach((item, index) => {
              // item.fList.forEach(ele=>{
              //   ele.matterproValue = 99999
              // })
              // item.mList.forEach(ele=>{
              //   ele.matterproValue = 99999
              // })
              this.drawLine('chart' + (index + 1), item, x_axis_list);
            })
            let strLength = this.maxStrLength[0]
            if (strLength>3){
              // inside  outerMargin
              this.inside -= (strLength-3)*2
              this.outerMargin -= (strLength-3)*2
            }
          }
        }
      })
    },
    drawLine(id, chartData, xData) {
      let chart = '';
      let o = document.getElementById(id);
      chart = this.$echarts.init(o, null, {renderer: 'svg'});
      this.$nextTick(() => {
        chart.resize();
      })
      chart.clear();
      let option_chart = '';
      //判断y轴数量（1个或2个）
      let strLengthList = []
      if (chartData.mainYTitle != '' && chartData.subYTitle != '') {
        //双y轴
        // loadOptionByIndex_Two(xData, chartData.mainYTitle, chartData.mainYUnit, chartData.subYTitle, chartData.subYUnit, chartData.title,
        // true_maxt, true_mint, true_maxt2, true_mint2, leftmatter, rightmatter, yseries, yseries2);
        option_chart = loadOptionByIndex(true, this.dateCount, xData, chartData).option_index;
        strLengthList = loadOptionByIndex(true, this.dateCount, xData, chartData).strLengthList
      } else {
        //单y轴
        option_chart = loadOptionByIndex(false, this.dateCount, xData, chartData).option_index;
        strLengthList = loadOptionByIndex(true, this.dateCount, xData, chartData).strLengthList
      }
      chart.setOption(option_chart);
      let maxStrLength = Math.max(...strLengthList)
      this.maxStrLength.push(maxStrLength)

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
      //   chart.resize({
      //     width: this.chartWidth
      //   });
      // })
    }
  },
  computed: mapGetters(['isCollapse']),
  watch: {
    // dateCount() {
    //   if (this.dateCount > 0) {
    //     this.loadData();
    //   }
    // }
    phyTrackBlock(){
      if (this.phyTrackBlock){
        this.chartChange(7)
      }
    },
  }
}
</script>

<style scoped>

</style>
