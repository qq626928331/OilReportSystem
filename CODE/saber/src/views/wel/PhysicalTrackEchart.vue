<template>
  <div>
    <el-row style="padding: 0px 20px;">
      <el-col :span="12">
        <div id="chart1" :style="{width:'500px',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart2" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart3" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart4" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart5" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart6" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart7" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart8" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart9" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
      <el-col :span="12">
        <div id="chart10" :style="{width:'100%',height:chartBody}" ref="myChartBody">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echart from 'echarts';
  import {selectAllMatterproValue} from "../../api/index/PhysicalTrackEchart";
  import {
    dateformats_0,
  } from "../../api/charts/options";


  let chart = '';
  export default {
    name: "PhysicalTrackEchart",
    props: {
      dateCount: {
        Type: Number,
        default: () => 7
      },
      id: {
        Type: String,
        default: () => 'chart1'
      }
    },
    data() {
      return {
        chartBody: '',
      }
    },
    created() {
      this.chartBody = '300px';
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        selectAllMatterproValue(this.dateCount).then(res => {
          if (res.data.code === 200) {
            if (res.data.data != null) {
              //x轴数据
              let x_axis_list = dateformats_0(res.data.data.dateData);
              let chartDataList = res.data.data.chartData;
              this.drawLine('chart1', chartDataList['chart1'], x_axis_list);
            }
          }
        })
      },
      drawLine(id, chartData, xData) {
        let o = document.getElementById(id);
        chart = this.$echarts.init(o, null, {renderer: 'svg'});
        this.$nextTick(() => {
          chart.resize();
        })
        chart.clear();
        let option_chart = '';
        console.log(chartData);
        //chart
        //判断y轴数量（1个或2个）
        if (chartData.fList.length > 0 && chartData.mList.length > 0) {
          //双y轴
          // option_chart = loadOptionByIndex_Two(xData, chartData.mainYTitle, chartData.mainYUnit, chartData.subYTitle, chartData.subYUnit, [], chartData.title);
        } else {
          //单y轴
          // option_chart = loadOptionByIndex_One(xData);
        }
        chart.setOption(option_chart);
      }
    },
    watch: {
      dateCount() {
        this.drawLine();
      }
    }
  }
</script>

<style scoped>

</style>
