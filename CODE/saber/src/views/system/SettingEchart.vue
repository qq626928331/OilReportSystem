<template>
  <div :key="tabKey" :id="chartId" :style="{width:'100%',height:chartBodyHeight}"
       ref="myChartBody"></div>
</template>

<script>
  import {loadOptionBySetting} from "../../api/charts/options";


  export default {
    name: "SettingEchart",
    props: {
      chartId: {
        Type: String,
        Default: () => ''
      },
      currObj: {
        Type: Object,
        Default: () => {
        }
      }
    },
    data() {
      return {
        tabKey: 1,
        chartBodyHeight: '',
      }
    },
    created() {
      this.chartBodyHeight = window.innerHeight - 64 - 40 - 10 - 64 - 10 - 12 - 40 - 10 - 33 - 40 + 'px';
    },
    mounted() {
      this.drawLine(this.chartId);
    },
    methods: {
      /**
       * 绘制折线图
       */
      drawLine(id) {
        let myChart = "";
        myChart = this.$echarts.init(document.getElementById(id));
        this.$nextTick(() => {
          myChart.resize();
        })
        myChart.clear();
        let option_chart = loadOptionBySetting([], this.currObj.mainYTitle, this.currObj.mainYUnit, this.currObj.subYTitle, this.currObj.subYUnit);
        myChart.setOption(option_chart);

        window.addEventListener("resize", function () {
          myChart.resize();
        })
      },
    },
    watch: {
      chartId() {

        this.tabKey++;
        let that = this;
        that.$nextTick(() => {
          that.drawLine(that.chartId);
        })
        setTimeout(function () {

        }, 3000)

      }
    }
  }
</script>

<style scoped>

</style>
