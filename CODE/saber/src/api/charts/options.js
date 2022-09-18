/**
 * 配置页面chart加载
 */
export const loadOptionBySetting = (xData, mainYTitle, mainYUnit, subYTitle, subYUnit) => {
  /**
   * 判断浏览器内核
   */
  let browser = {
    versions: function () {
      let u = navigator.userAgent;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
        iPhone: u.indexOf('iPhone') > -1, //iPhone
        iPad: u.indexOf('iPad') > -1, //iPad
        webApp: u.indexOf('Safari') > -1 //Safari
      };
    }()
  };

  let nameGaps = 35;
  let margin = 10;

  if (browser.versions.webKit == true) {    //判断浏览器为谷歌时，title位置设定
    // title_y = 'top';
    margin = 10;      //x轴刻度位置
    nameGaps = 35;      //与y轴距离
  } else {
    // title_y = '5%';
    margin = 20;
    nameGaps = 45;
  }


  xData = get7Days();

  let option_set = {
    tooltip: {
      trigger: 'axis'
    },
    color: ['#2dc198', '#4a74ff'],
    legend: {
      // x: 'right',
      y: 'top',
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        fontSize: 11
      },
      data: [mainYTitle, subYTitle],
      right: '3%',
      lineStyle: {
        color: '#2dc198',
        // margin:'0 80px'
      },
    },
    grid: {
      left: '4%',
      right: '3%',/**/
      bottom: '7%',
      top: 24,
      containLabel: true,
      show: true,//
      borderWidth: '1',//边框宽度
      borderColor: '#000'//边框颜色
    },
    xAxis: {
      type: 'category',
      data: xData,
      boundaryGap: false,//解决网格线与x轴刻度不对应的问题
      show: true,
      name: '日期',
      nameGap: 30,
      position: 'bottom',
      axisLine: {
        lineStyle: {
          color: '#000000',
          width: 1
        },
        show: true,
        onZero: false,
        symbol: 'none'
      },
      axisTick: {
        alignWithLabel: true,
        inside: true,
        interval: '0'
      },
      splitLine: {
        show: true,
        interval: 0
      },
      axisLabel: {
        show: true,
        margin: margin,
        textStyle: {
          // color: 'red',
          fontSize: 12
        },
        interval: 5
      }
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
        name: mainYTitle + '(' + mainYUnit + ')',
        nameLocation: 'center',
        nameTextStyle: {
          fontSize: 12,
          fontStyle: 'normal',
          color: '#0F0F0F',
        },
        lineStyle: {
          color: '#2dc198',
          margin:'0 50px'
        },
        scale: true,
        nameGap: nameGaps, //与y轴距离
        nameRotate: 90,//角度
        splitLine: {show: true},
        splitNumber: 5,
        interval: 4,
        max: 40.0,
        min: 20.0,
        show: true,
        axisLine: {
          show: true,
          onZero: true
        },
        axisTick: {
          show: true,
          inside: true
        },
      },
      {
        type: 'value',
        position: 'right',
        scale: true,
        name: subYTitle + '(' + subYUnit + ')',
        nameLocation: 'center',
        nameTextStyle: {
          fontSize: 12,
          fontStyle: 'normal',
          color: '#0F0F0F'
        },
        show: true,
        splitLine: {show: true},
        splitNumber: 5,
        interval: 4,
        max: 40.0,
        min: 20.0,
        axisLine: {
          show: true,
          onZero: true
        },
        axisTick: {
          show: true,
          inside: true
        }
      },
    ],
    series: [
      {
        name: mainYTitle,
        data: [31, 29.3, 29.9, 30, 28.8, 29.9, 29.8],
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        lineStyle: {
          color: '#2dc198',
        },
      },
      {
        name: subYTitle,
        data: [30.3, 29.7, 29, 31.8, 33.3, 31.2, 33.4],
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        lineStyle: {
          color: '#4a74ff'
        },
      }
    ]
  }
  return option_set;
}


export const loadOptionBySetting_One = (xData, yTitle, yUnit) => {
  /**
   * 判断浏览器内核
   */
  let browser = {
    versions: function () {
      let u = navigator.userAgent;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
        iPhone: u.indexOf('iPhone') > -1, //iPhone
        iPad: u.indexOf('iPad') > -1, //iPad
        webApp: u.indexOf('Safari') > -1 //Safari
      };
    }()
  };

  let nameGaps = 35;
  let margin = 10;

  if (browser.versions.webKit == true) {    //判断浏览器为谷歌时，title位置设定
    // title_y = 'top';
    margin = 10;      //x轴刻度位置
    nameGaps = 35;      //与y轴距离
  } else {
    // title_y = '5%';
    margin = 20;
    nameGaps = 45;
  }


  xData = get7Days();


  let option_set = {
    tooltip: {
      trigger: 'axis'
    },
    color: ['#4a74ff'],
    legend: {
      // x: 'right',
      y: 'top',
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        fontSize: 12
      },
      data: [yTitle],
      right: '3%'
    },
    grid: {
      left: '4%',
      right: '5%',/**/
      bottom: '7%',
      top: 24,
      containLabel: true,
      show: true,//
      borderWidth: '1',//边框宽度
      borderColor: '#000'//边框颜色
    },
    xAxis: {
      type: 'category',
      data: xData,
      boundaryGap: false,//解决网格线与x轴刻度不对应的问题
      show: true,
      name: '日期',
      nameGap: 30,
      position: 'bottom',
      axisLine: {
        lineStyle: {
          color: '#000000',
          width: 1
        },
        show: true,
        onZero: false,
        symbol: 'none'
      },
      axisTick: {
        alignWithLabel: true,
        inside: true,
        interval: '0'
      },
      splitLine: {
        show: true,
        interval: 0
      },
      axisLabel: {
        show: true,
        margin: margin,
        textStyle: {
          // color: 'red'
          fontSize: 12
        },
        interval: 5
      }
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
        name: yTitle + '(' + yUnit + ')',
        nameLocation: 'center',
        nameTextStyle: {
          fontStyle: 'normal',
          color: '#0F0F0F'
        },
        scale: true,
        nameGap: nameGaps, //与y轴距离
        nameRotate: 90,//角度
        splitLine: {show: true},
        splitNumber: 5,
        interval: 4,
        max: 40.0,
        min: 20.0,
        show: true,
        axisLine: {
          show: true,
          onZero: true
        },
        axisTick: {
          show: true,
          inside: true
        },
      }
    ],
    series: [
      {
        name: yTitle,
        data: [31, 29.3, 29.9, 30, 28.8, 29.9, 29.8],
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        lineStyle: {
          color: '#2dc198'
        },
      }
    ]
  }
  return option_set;
}


/**
 * 重新封装 首页物性跟踪echarts 配置项及数据
 */
let strLengthList = []

export const loadOptionByIndex = (isDouble, days, xData, chartData) => {
  let xLabelInterval = 0;
  switch (days) {
    case '7':
      xLabelInterval = 0;
      break;
    case '15':
      xLabelInterval = 1;
      break;
    case '30':
      xLabelInterval = 5;
      break;
    default:
      break;
  }

  //判断浏览器内核
  let browser = {
    versions: function () {
      let u = navigator.userAgent;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Firefox') > -1, //火狐内核Gecko
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
        iPhone: u.indexOf('iPhone') > -1, //iPhone
        iPad: u.indexOf('iPad') > -1, //iPad
        webApp: u.indexOf('Safari') > -1 //Safari
      };
    }()
  };
  let nameGaps = 35;
  let margin = 10;
  let title_y = '';

  //判断浏览器为谷歌时，title位置设定
  if (browser.versions.webKit == true) {
    title_y = 'top';
    margin = 10;      //x轴刻度位置
    nameGaps = 50;      //与y轴距离
  } else {
    title_y = '5%';
    margin = 20;
    nameGaps = 45;
  }
  let option_index = {};

  if (isDouble) {
    let maxt = -99999;
    let mint = 99999;
    let maxtt = -99999;
    let mintt = 99999;
    let true_maxt;
    let true_mint;
    let true_maxt2;
    let true_mint2;
    let yseries1 = [];
    let yseries2 = [];
    //主刻度
    chartData.mList.forEach((item, index) => {
      let moa = [];
      moa.push(dateformat_0(item.analysisTime));
      // moa.push(item.analysisTime.replace('-', '.').replace('-', '.'));
      // debugger
      moa.push(item.matterproValue);
      if (maxt < parseFloat(item.matterproValue)) {  //取最大值
        maxt = item.matterproValue;
      }
      if (mint > parseFloat(item.matterproValue)) {   //取最小值
        mint = item.matterproValue;
      }
      yseries1.push(moa);
    })
    if (maxt < mint) {
      true_maxt = 50;
      true_mint = 0;
    } else {
      if (chartData.mainYTitle == "密度") {
        //物性为密度的情况
        true_maxt = Math.round(maxt * 1.001 / 2) * 2;
        true_maxt = maxs(true_maxt);
        if (mint < 0) {
          true_mint = Math.round(mint / 0.999 / 2) * 2;
          true_mint = mins(true_mint);
        } else {
          true_mint = Math.round(mint * 0.999 / 2) * 2;
          true_mint = mins(true_mint);
        }

        if ((mint * 0.8) < 1) {      //最小值小于0的情况
          true_maxt = Math.round(maxt * 100 * 1.01 / 2) * 2;
          true_maxt = maxs(true_maxt);
          if (mint < 0) {
            true_mint = Math.round(mint * 100 / 0.99 / 2) * 2;
            true_mint = mins(true_mint);
          } else {
            true_mint = Math.round(mint * 100 * 0.99 / 2) * 2;
            true_mint = mins(true_mint);
          }
          let tt = (true_maxt - true_mint);
          let xiangcha = 0;
          if (tt % 5 != 0) {
            for (var i = 1; i < 10; i++) {
              tt = tt + 1;
              if (tt % 5 == 0) {
                xiangcha = tt;
                break;
              }
            }
            true_maxt = (true_mint + xiangcha * 2) / 100;
            true_mint = true_mint / 100;
          } else {
            true_maxt = true_maxt / 100;
            true_mint = true_mint / 100;
          }
        } else {                   //物性数据比较大的情况
          let cha = true_maxt - true_mint;
          let tt = (true_maxt - true_mint);
          if (tt > 1) {
            let xiangcha = 0;
            if (tt % 10 != 0) {
              for (let i = 1; i < 10; i++) {
                tt = tt + 1;
                if (tt % 10 == 0) {
                  xiangcha = tt;
                  break;
                }
              }
            }
          }
        }
      } else {
        //物性为正常的情况
        true_maxt = Math.round(maxt * 1.2 / 2) * 2;
        true_maxt = maxs(true_maxt);
        if (mint < 0) {
          true_mint = Math.round(mint / 0.8 / 2) * 2;
          true_mint = mins(true_mint);
        } else {
          true_mint = Math.round(mint * 0.8 / 2) * 2;
          true_mint = mins(true_mint);
        }

        if ((mint * 1.01 / 5) < 1) {      //最小值小于0的情况
          true_maxt = Math.round(maxt * 100 * 2 / 2) * 2;
          true_maxt = maxs(true_maxt);
          if (mint < 0) {
            true_mint = Math.round(mint * 100 / 0.2 / 2) * 2;
            true_mint = mins(true_mint);
          } else {
            true_mint = Math.round(mint * 100 * 0.2 / 2) * 2;
            true_mint = mins(true_mint);
          }

          let tt = (true_maxt - true_mint);
          let xiangcha = 0;
          if (tt % 5 != 0) {
            for (let i = 1; i < 10; i++) {
              tt = tt + 1;
              if (tt % 5 == 0) {
                xiangcha = tt;
                break;
              }
            }
            true_maxt = (true_mint + xiangcha * 2) / 100;
            true_mint = true_mint / 100;
          } else {
            true_maxt = true_maxt / 100;
            true_mint = true_mint / 100;
          }
        } else {                   //物性数据比较大的情况
          let cha = true_maxt - true_mint;
          let tt = (true_maxt - true_mint);
          if (tt > 1) {
            let xiangcha = 0;
            if (tt % 5 != 0) {
              for (let i = 1; i < 10; i++) {
                tt = tt + 1;
                if (tt % 5 == 0) {
                  xiangcha = tt;
                  break;
                }
              }
              true_maxt = true_maxt + ((xiangcha * 2) - cha) / 2;
              true_mint = true_mint - ((xiangcha * 2) - cha) / 2;
            }
          } else if (tt == 0) {
            true_maxt = true_maxt + 1;
            true_mint = true_mint - 1;
          }
        }
      }
    }

    //副刻度
    chartData.fList.forEach((item, index) => {
      let moa = [];
      moa.push(dateformat_0(item.analysisTime));
      // moa.push(item.analysisTime.replace('-', '.').replace('-', '.'));
      moa.push(item.matterproValue);

      if (parseFloat(item.matterproValue) > maxtt) {   //取最大值
        maxtt = item.matterproValue;
      }
      if (mintt > parseFloat(item.matterproValue)) {   //取最小值
        mintt = item.matterproValue;
      }
      yseries2.push(moa);
    })
    if (maxtt < mintt) {
      true_maxt2 = 50;
      true_mint2 = 0;
    } else {
      if (chartData.subYTitle == "密度") {
        true_maxt2 = maxs(Math.round(maxtt * 1.01 / 2) * 2);
        true_mint2 = mins(Math.round(mintt * 0.99 / 2) * 2);

        if ((mintt * 0.8) < 1) {
          true_maxt2 = Math.round(maxtt * 100 * 1.001 / 2) * 2;
          true_maxt2 = maxs_small(true_maxt2);
          true_mint2 = Math.round(mintt * 100 * 0.999 / 2) * 2;
          true_mint2 = mins_small(true_mint2);

          let tt = (true_maxt2 - true_mint2);
          let xiangcha = 0;
          if (tt % 5 != 0) {
            for (let i = 1; i < 10; i++) {
              tt = tt + 1;
              if (tt % 5 == 0) {
                xiangcha = tt;
                break;
              }
            }
            true_maxt2 = (true_mint2 + xiangcha * 2) / 100;
            true_mint2 = true_mint2 / 100;
          } else {
            true_maxt2 = true_maxt2 / 100;
            true_mint2 = true_mint2 / 100;
          }
        } else {
          let cha = true_maxt2 - true_mint2;
          let tt = (true_maxt2 - true_mint2);
          if (tt > 1) {
            let xiangcha = 0;
            if (tt % 5 != 0) {
              for (let i = 1; i < 10; i++) {
                tt = tt + 1;
                if (tt % 5 == 0) {
                  xiangcha = tt;
                  break;
                }
              }

            }
          }
        }
      } else {
        true_maxt2 = maxs(Math.round(maxtt * 1.2 / 2) * 2);
        true_mint2 = mins(Math.round(mintt * 0.8 / 2) * 2);

        if ((mintt * 0.8) < 1) {
          true_maxt2 = Math.round(maxtt * 100 * 1.1 / 2) * 2;
          true_maxt2 = maxs_small(true_maxt2);
          true_mint2 = Math.round(mintt * 100 * 0.9 / 2) * 2;
          true_mint2 = mins_small(true_mint2);

          let tt = (true_maxt2 - true_mint2);
          let xiangcha = 0;
          if (tt % 5 != 0) {
            for (let i = 1; i < 10; i++) {
              tt = tt + 1;
              if (tt % 5 == 0) {
                xiangcha = tt;
                break;
              }
            }
            true_maxt2 = (true_mint2 + xiangcha * 2) / 100;
            true_mint2 = true_mint2 / 100;
          } else {
            true_maxt2 = true_maxt2 / 100;
            true_mint2 = true_mint2 / 100;
          }
        } else {
          let cha = true_maxt2 - true_mint2;
          let tt = (true_maxt2 - true_mint2);
          if (tt > 1) {
            let xiangcha = 0;
            if (tt % 5 != 0) {
              for (let i = 1; i < 10; i++) {
                tt = tt + 1;
                if (tt % 5 == 0) {
                  xiangcha = tt;
                  break;
                }
              }
              true_maxt2 = true_maxt2 + ((xiangcha * 2) - cha) / 2;
              true_mint2 = true_mint2 - ((xiangcha * 2) - cha) / 2;
            }
          } else if (tt == 0) {
            true_maxt2 = true_maxt2 + 1;
            true_mint2 = true_mint2 - 1;
          }
        }
      }
    }


    let leftmatter;   //左y轴刻度控制位数
    if (isInteger(true_maxt) && isInteger(true_mint)) {  //判断是否是整数
      leftmatter = function (value, index) {
        if (true_maxt.toString().length == 2 && parseInt(value) != 0) {   //判断最小值 位数
          return value.toFixed(1);
        } else {
          return value;
        }
      }
    } else {
      leftmatter = function (value, index) {
        return value;
      }
    }
    let rightmatter;   //右y轴刻度控制位数
    if (isInteger(true_maxt2) && isInteger(true_mint2)) {  //判断是否是整数
      rightmatter = function (value, index) {
        if (true_maxt2.toString().length == 2 && parseInt(value) != 0) {   //判断最小值 位数
          return value.toFixed(1);
        } else {
          return value;
        }
      }
    } else {
      rightmatter = function (value, index) {
        return value;
      }
    }

    //x轴坐标间隔
    let interval = 0;
    let xLen = xData.length;
    if (xLen == 7) {
      interval = 0;
    } else if (xLen == 15) {
      interval = 1;
    } else if (xLen == 31) {
      interval = 5;
    }

    let youNumLength = 40
    let zuonumLength = 40
    let strLength = true_maxt.toString().length
    let strLength2 = true_maxt2.toString().length
    let letmaxlength = strLength>strLength2?strLength : strLength2
    strLengthList.push(letmaxlength)
    if(strLength2>3){
      youNumLength += (7 * (strLength2 - 3))
    }
    if(strLength>3){
      zuonumLength += (7 * (strLength - 3))
    }
    //双y轴
    option_index = {
      title: {
        text: chartData.title,
        y: title_y,
        x: 'center',
        textStyle: {fontSize: 16},//标题
        padding: [2, 0, 100, 0]
      },
      tooltip: {
        trigger: 'axis'
      },
      color: ['#2dc198', '#4a74ff'],
      legend: {
        x: 'right',
        y: 'top',
        itemHeight: 8,
        itemWidth: 8,
        padding: [30, 5, 5, 50],
        textStyle: {
          fontSize: 12
        },
        data: [chartData.mainYTitle, chartData.subYTitle],
        right: '3%',
        lineStyle: {
          color: '#2dc198',
        },
      },
      grid: {
        left: '8%',
        right: '5%',
        bottom: '5%',
        // top: '15%',
        containLabel: true,
        show: true,
        borderWidth: '1',//边框宽度
        borderColor: '#000'//边框颜色
      },
      xAxis: {
        type: 'category',
        data: xData,
        boundaryGap: false,//解决网格线与x轴刻度不对应的问题
        show: true,
        name: '日期',
        nameGap: youNumLength - 7,
        position: 'bottom',
        axisLine: {
          lineStyle: {
            color: '#000000',
            width: 1
          },
          show: true,
          onZero: false,
          symbol: 'none'
        },
        axisTick: {
          alignWithLabel: true,
          inside: true,
          interval: '0'
        },
        splitLine: {
          show: true,
          interval: interval
        },
        axisLabel: {
          show: true,
          margin: margin,
          textStyle: {
            // color: 'red',
            fontSize: 12
          },
          interval: xLabelInterval
        }
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          name: chartData.mainYTitle + '(' + chartData.mainYUnit + ')',
          nameLocation: 'center',
          nameTextStyle: {
            fontSize: 12,
            fontStyle: 'normal',
            color: '#0F0F0F',
          },
          scale: true,
          nameGap: zuonumLength, //与y轴距离 左侧
          nameRotate: 90,//角度
          splitLine: {show: true},
          splitNumber: 5,
          interval: Math.round(((true_maxt - true_mint) / 5) * 100) / 100,
          max: true_maxt,
          min: true_mint,
          show: true,
          axisLine: {
            lineStyle: {
              color: '#0F0F0F',
              width: 1,
            }
          },
          axisTick: {
            show: true,
            inside: true,
            interval: '1'
          },
          axisLabel: {
            interval: 'auto',
            show: true,
            formatter: leftmatter,
            textStyle: {
              fontSize: 12
            }
          }
        },
        {
          type: 'value',
          position: 'right',
          scale: true,
          name: chartData.subYTitle + '(' + chartData.subYUnit + ')',
          nameLocation: 'center',
          nameTextStyle: {
            // color:'#4a74ff'
          },
          show: true,
          nameGap: youNumLength, //与y轴距 右侧
          nameRotate: 90,//角度
          splitLine: {show: true},
          splitNumber: 5,
          interval: Math.round(((true_maxt2 - true_mint2) / 5) * 100) / 100,
          max: true_maxt2,
          min: true_mint2,
          axisTick: {
            inside: true
          },
          axisLine: {
            lineStyle: {
              color: '#0F0F0F',
              width: 1
            },
          },
          axisLabel: {
            interval: 'auto',
            show: true,
            formatter: rightmatter,
            textStyle: {
              fontSize: 12
            }
          },
        },
      ],
      series: [
        {
          name: chartData.mainYTitle,
          data: yseries1,
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          lineStyle: {
            color: 'rgb(45, 193, 152)',
          },
        },
        {
          name: chartData.subYTitle,
          data: yseries2,
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          lineStyle: {
            color: '#4a74ff'
          },
        }
      ]
    }
  } else {
    //单y轴
    let maxtone = 0;
    let maxtones = 0;
    let mintone = 99999;
    let mintones = 99999;

    let name_1 = chartData.mainYTitle == '' ? chartData.subYTitle : chartData.mainYTitle;
    let nameunit_1 = chartData.mainYUnit == '' ? chartData.subYUnit : chartData.mainYUnit;

    let yseries = [];

    chartData.mList.forEach((item, index) => {
      var moa = [];

      moa.push(dateformat_0(item.analysisTime));
      // moa.push(item.analysisTime.replace('-', '.').replace('-', '.'));
      moa.push(item.matterproValue);

      if (parseFloat(item.matterproValue) > maxtones) {
        maxtones = item.matterproValue;
      }
      if (parseFloat(item.matterproValue) < mintones) {
        mintones = item.matterproValue;
      }

      yseries.push(moa);
    })

    chartData.fList.forEach((item, index) => {
      var moa = [];

      moa.push(dateformat_0(item.analysisTime));
      // moa.push(item.analysisTime.replace('-', '.').replace('-', '.'));
      moa.push(item.matterproValue);

      if (parseFloat(item.matterproValue) > maxtones) {
        maxtones = item.matterproValue;
      }
      if (parseFloat(item.matterproValue) < mintones) {
        mintones = item.matterproValue;
      }

      yseries.push(moa);
    })

    if (maxtones < mintones) {
      maxtone = 50;
      mintone = 0;
    } else {
      if (name_1 == "密度") {
        maxtone = Math.round(maxtones * 1.001 / 2) * 2;
        maxtone = maxs(maxtone);

        mintone = Math.round(mintones * 0.999 / 2) * 2;
        mintone = mins(mintone);

        if (mintones * 0.8 < 1) {
          maxtone = Math.round(maxtones * 100 * 1.01 / 2) * 2;
          maxtone = maxs(maxtone);
          mintone = Math.round(mintones * 100 * 0.99 / 2) * 2;
          mintone = mins(mintone);

          var tt = (maxtone - mintone);
          var xiangcha = 0;
          if (tt % 5 != 0) {
            for (var i = 1; i < 10; i++) {
              tt = tt + 1;
              if (tt % 5 == 0) {
                xiangcha = tt;
                break;
              }
            }
            maxtone = (mintone + xiangcha * 2) / 100;
            mintone = mintone / 100;
          } else {
            maxtone = maxtone / 100;
            mintone = mintone / 100;
          }
        } else {           //物性数据比较大的情况
          var tt = (maxtone - mintone);
          if (tt > 1) {
            var xiangcha = 0;
            if (tt % 10 != 0) {
              for (var i = 1; i < 10; i++) {
                tt = tt + 1;
                if (tt % 10 == 0) {
                  xiangcha = tt;
                  break;
                }
              }
            }
          }
        }
      } else {    //物性为正常的情况

        maxtone = Math.round(maxtones * 1.01 / 2) * 2;
        maxtone = maxs(maxtone);

        mintone = Math.round(mintones * 0.99 / 2) * 2;
        mintone = mins(mintone);

        if (mintones * 1.01 / 2 < 1) {
          maxtone = Math.round(maxtones * 100 * 1.01 / 2) * 2;
          maxtone = maxs(maxtone);
          mintone = Math.round(mintones * 100 * 0.99 / 2) * 2;
          mintone = mins(mintone);

          var tt = (maxtone - mintone);
          var xiangcha = 0;
          if (tt % 5 != 0) {
            for (var i = 1; i < 10; i++) {
              tt = tt + 1;
              if (tt % 5 == 0) {
                xiangcha = tt;
                break;
              }
            }
            maxtone = (mintone + xiangcha * 2) / 100;
            mintone = mintone / 100;
          } else {
            maxtone = maxtone / 100;
            mintone = mintone / 100;
          }
        } else {           //物性数据比较大的情况
          var cha = (maxtone - mintone);
          var tt = (maxtone - mintone);
          if (tt > 1) {
            var xiangcha = 0;
            if (tt % 5 != 0) {
              for (var i = 1; i < 10; i++) {
                tt = tt + 1;
                if (tt % 5 == 0) {
                  xiangcha = tt;
                  break;
                }
              }
              maxtone = maxtone + ((xiangcha * 2) - cha) / 2;
              mintone = mintone - ((xiangcha * 2) - cha) / 2;
            }
          } else if (tt == 0) {
            maxtone = maxtone + 1;
            mintone = mintone - 1;
          }
        }

      }
    }

    option_index = {
      title: {
        text: chartData.title,
        y: title_y,
        x: 'center',
        textStyle: {fontSize: 16},
        padding: [2, 0, 100, 0]
      },
      tooltip: {
        trigger: 'axis'
      },
      color: ['#4a74ff'],
      legend: {
        x: 'right',
        y: 'top',
        itemHeight: 8,
        itemWidth: 8,
        padding: [30, 5, 5, 50],
        textStyle: {
          fontSize: 12
        },
        data: [name_1],
        right: '3%'
      },
      grid: {
        // left: '8%',
        // right: '3%',
        bottom: '3%',
        // top: '15%',
        containLabel: true,
        show: true,
        borderWidth: '1',//边框宽度
        borderColor: '#000'//边框颜色
      },
      xAxis: {
        type: 'category',
        data: xData,
        boundaryGap: false,//解决网格线与x轴刻度不对应的问题
        show: true,
        name: '日期',
        nameGap: 30,
        position: 'bottom',
        axisLine: {
          lineStyle: {
            color: '#000000',
            width: 1
          },
          show: true,
          onZero: false,
          symbol: 'none'
        },
        axisTick: {
          alignWithLabel: true,
          inside: true,
          interval: '0'
        },
        splitLine: {
          show: true,
          interval: 0
        },
        axisLabel: {
          show: true,
          margin: margin,
          textStyle: {
            // color: 'red'
            fontSize: 12
          },
          interval: xLabelInterval
        }
      },
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: name_1 + '(' + nameunit_1 + ')',
          nameLocation: 'center',
          nameTextStyle: {
            // color:'#4a74ff'
          },
          show: true,
          nameGap: nameGaps, //与y轴距离
          nameRotate: 90,//角度
          splitLine: {show: true},
          splitNumber: 5,
          interval: Math.round(((maxtone - mintone) / 5) * 100) / 100,
          max: maxtone,
          min: mintone,
          axisTick: {
            inside: true
          },
          axisLine: {
            lineStyle: {
              color: '#0F0F0F',
              width: 1
            },
          }
        },
      ],
      series: [
        {
          name: name_1,
          data: yseries,
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          lineStyle: {
            color: '#2dc198'
          },
        }
      ]
    }

  }

  return {option_index, strLengthList};
}


export function isInteger(obj) {
  return Math.round(obj) === obj;   //是整数，则返回true，否则返回false
}

export function dateformat_0(date) {
  //2020-01-01格式化为1.1
  let date_t = '';
  var strs = new Array(); //定义一数组
  strs = date.split('-'); //字符分割

  for (let i = 0; i < strs.length; i++) {
    if (i != 0) {
      if (i == 2) {
        date_t += '.';
      }
      if (mystartsWith(strs[i], '0')) {
        date_t += strs[i].replace('0', '');
      } else {
        date_t += strs[i];
      }

    }
  }

  return date_t;

}

export function dateformats_year(dates) {
  let dates_t = new Array();
  for (let j = 0; j < dates.length; j++) {
    dates_t.push(dates[j].replace('-', '.').replace('-', '.'));
  }
  return dates_t;
}


export function dateformats_0(dates) {
  let dates_t = new Array();
  for (let j = 0; j < dates.length; j++) {
    let strs = new Array();
    strs = dates[j].split('-');
    let date_t = '';
    for (let i = 0; i < strs.length; i++) {
      if (i != 0) {
        if (i == 2) {
          date_t += '.';
        }
        if (mystartsWith(strs[i], '0')) {
          date_t += strs[i].replace('0', '');
        } else {
          date_t += strs[i];
        }
      }
    }
    dates_t.push(date_t);
  }
  return dates_t;
}


function mystartsWith(str0, flag) {
  return str0.slice(0, flag.length) === flag;
}

export function maxs(data) {
  for (var i = 0; i <= 20; i++) {
    var adddata = data + i;
    if (adddata % 5 == 0) {
      data = adddata;
      return data;
      break;
    }
  }
}

export function mins(data) {
  for (var i = 0; i <= 20; i++) {
    var adddata = data - i;
    if (adddata % 5 == 0) {
      data = adddata;
      return data;
      break;
    }
  }
}

//小数情况
export function maxs_small(data) {
  for (var i = 0; i <= 30; i++) {
    var adddata = data + i;
    if (adddata % 5 == 0) {
      data = adddata;
      return data;
      break;
    }
  }
}

export function mins_small(data) {
  for (var i = 0; i <= 30; i++) {
    var adddata = data - i;
    if (adddata % 5 == 0) {
      data = adddata;
      return data;
      break;
    }
  }
}

/**
 * 获取最近7天的日期
 * @returns {string[]}
 */
export const get7Days = () => {
  return [getDate(6), getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate(0)]
}

/**
 * 日期格式化
 * @param date
 */
function getDate(day) {
  let nowDate = new Date();
  nowDate.setDate(nowDate.getDate() - day);
  return (nowDate.getMonth() + 1) + '.' + nowDate.getDate();
}


function json() {
  let json =
    {
      chartData: [
        {
          title: '1#常减压-原油',//装置名称+物料名称 没有则返回空字符
          mainYTitle: '初馏点',//y轴主刻度物性名称 没有则返回空字符
          mainYUnit: '℃',//y轴主刻度物性单位 没有则返回空字符
          subYTitle: '终馏点',//y轴副刻度物性名称 没有则返回空字符
          subYUnit: '℃',//y轴副刻度物性单位 没有则返回空字符
          fList: [],
          mList: []
        },
        {
          title: '1#常减压-原油',//装置名称+物料名称 没有则返回空字符
          mainYTitle: '初馏点',//y轴主刻度物性名称 没有则返回空字符
          mainYUnit: '℃',//y轴主刻度物性单位 没有则返回空字符
          subYTitle: '终馏点',//y轴副刻度物性名称 没有则返回空字符
          subYUnit: '℃',//y轴副刻度物性单位 没有则返回空字符
          fList: [],
          mList: []
        }
      ],
      dateData: ["2021-06-22", "2021-06-23", "2021-06-24", "2021-06-25", "2021-06-26", "2021-06-27", "2021-06-28"]
    }
}
