import request from '@/router/axios';
import {isInteger} from "../charts/options";
//查询物性集合
//materielid 物料id
export const searchWxList = (materielid) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/searchWxList',
    method: 'get',
    params: {
      materielid
    }
  })
}
//查询物性分析值
//matterproCode 物性编码 time1 时间1 time2 时间2 materielid 物料id
export const selectFxValue = (matterproCode, timeBegin, timeEnd, materielid) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/selectFxValue',
    method: 'post',
    data: {
      matterproCode,
      timeBegin,
      timeEnd,
      materielid
    }
  })
}
//加载装置物料树
export const getDeptTreeDeviceMateriel = () => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/getDeptTreeDeviceMateriel',
    method: 'get'
  })
}

/**
 * y轴计算
 * @param obj
 * @returns {*}
 */
export const xyCalculation = (obj) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/xyCalculation',
    method: 'post',
    data: obj
  })
}

/**
 * x轴计算
 * @param obj
 * @returns {*}
 */
export const xCalculation = (obj) => {
  return request({
    url: '/api/qcmap-resultdis/analysisresultdis/xCalculation',
    method: 'post',
    data: obj
  })
}

/**
 * 物性趋势 option 封装
 * @param title
 * @param legendName
 * @param xName
 * @param yName
 * @param xData
 * @param yData
 * @param series
 * @returns {{yAxis: [{max, show: boolean, nameGap: number, nameLocation: string, splitNumber: number, type: string, axisLabel: {formatter: (function(*, *): *)}, min, axisLine: {lineStyle: {color: string, width: number}, show: boolean}, nameRotate: number, name, splitLine: {show: boolean}, axisTick: {show: boolean, inside: boolean}, interval, position: string}], xAxis: {axisLabel: {textStyle: {color: string}}, data, axisLine: {lineStyle: {color: string}}, name: string, splitLine: {show: boolean, interval}, type: string, boundaryGap: boolean}, legend: {padding: number[], data: *[], x: string, y: string}, series: [{symbol: string, connectNulls: boolean, data, symbolSize: number, name, itemStyle: {normal: {color: string, lineStyle: {width: number}}}, type: string, markLine: {symbol: string, data: [{name: string, type: string}]}, showAllSymbol: string, smooth: boolean}], tooltip: {formatter: string, backgroundColor: string, trigger: string, textStyle: {color: string}}, title: {padding: number[], x: string, y, text}}}
 */
export const loadOption = (title, legendName, xName, yName, xData, yData, series) => {
  let option = {};
  option = {
    title: {
      text: title,
      x: "center",
      // y: yName,
      padding: [2, 0, 100, 0],
    },
    grid: {
      show: true,//显示边框线
      borderWidth: 2,
      borderColor: '#000'
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: 'rgba(0,0,0,0.7)',
      textStyle: {
        color: '#fff'
      },
      formatter: function (arg) {
        let timeDate = new Date(arg[0].axisValue);
        let y = timeDate.getFullYear();
        let m = timeDate.getMonth() + 1;
        let d = timeDate.getDate();
        let dateTime = y + '-' + m + '-' + d;
        return dateTime + '<br />' + arg[0].seriesName + ' : ' + arg[0].value[1]
      }
    },
    legend: {
      data: [legendName],
      x: "right",
      y: "top",
      padding: [30, 80, 5, 50],
    },
    xAxis: {
      min: xData[0],
      max: xData[xData.length - 1],
      type: "time",
      data: xData,
      boundaryGap: false,
      name: "",
      splitLine: {
        interval: '',
        show: true,
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function (val) {
          let timeDate = new Date(val);
          var y = timeDate.getFullYear();
          var m = timeDate.getMonth() + 1;
          var d = timeDate.getDate();
          return y + '-' + m + '-' + d;
        },
        textStyle: {
          color: '#000000',  //更改坐标轴文字颜色
        }
      },
      axisLine: {
        interval: 'auto',
        lineStyle: {
          color: '#000000' //更改坐标轴颜色
        }
      }
    },
    yAxis:
      {
        type: "value",
        show: true,
        max: yData.scale_end,
        min: yData.scale_start,
        name: yName,
        position: "left", //位置靠左
        nameLocation: "middle", //位置居中
        nameGap: 50, //与y轴距离
        nameRotate: 90, //角度
        splitLine: {show: true},
        splitNumber: 5,
        interval: yData.scale_gap,
        axisLabel: {
          formatter: (value, index) => {
            if (parseFloat(value) == parseFloat(0)) {
              return 0;
            } else if (isInteger(value)) {
              return value;
            } else if (value != 0 && value < 0.0001) {
              return value.toFixed(4);
            } else {
              return value
            }
          }
        },
        axisTick: {
          show: true,
          inside: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#000000",
            width: 1,
          },
        },
      }
    ,
    series: [
      {
        name: yName,
        smooth: true,
        showAllSymbol: "true",
        connectNulls: true,
        symbol: "circle",
        symbolSize: 5,
        itemStyle: {
          normal: {
            color: "#4F81BD",
            lineStyle: {
              width: 1.5,
            },
          },
        },
        data: series,
        type: "line",
        markLine: {
          symbol: "none", //去掉箭头
          data: [{type: "average", name: "平均值"}],
        },
      },
    ]
  };

  return option;
}
