<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-scrollbar>
          <basic-container>
            <el-tree
              :data="treeData" class="filter-tree" :props="defaultProps"
              node-key="id" accordion ref="tree" @node-click="nodeClick"
              :current-node-key="currentkey" highlight-current :default-expanded-keys="expandedKey"
              :style="treeStyle">
            </el-tree>
          </basic-container>
        </el-scrollbar>
      </el-col>
      <el-col :span="19">
        <basic-container>
          <div style="transform:translateX(0px);">
            <div style="display: inline-block;">
              <label class="text-justify">物性：<span class="span-justify"></span></label>
              <el-select size="small" v-model="matterproCode" placeholder="请选择" style="width: 200px">
                <el-option
                  v-for="item in wxList"
                  :key="item.matterproCode"
                  :label="item.matterproName"
                  :value="item.matterproCode"
                ></el-option>
              </el-select>
            </div>
            <!--<div style="display: inline-block; padding-right: 15px">-->
            <!--<label class="text-justify">时间段：<span class="span-justify"></span></label>-->
            <!--<el-select size="small" v-model="value" placeholder="请选择" @change="chooseTime" style="width: 200px">-->
            <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value"-->
            <!--&gt;</el-option>-->
            <!--</el-select>-->
            <!--</div>-->
            <div style="display: inline-block; margin-left: 15px">
              <label class="text-justify">选择日期：<span class="span-justify"></span></label>
              <el-date-picker
                v-model="valueTime"
                size="small"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="selectFxPic" style='margin-left: 15px'>
              查 询
            </el-button>
          </div>
        </basic-container>
        <basic-container style="padding-top: 0px;">
          <div style="font-size: 11px;transform:translateX(20px);height: 16px">{{ this.arr }}</div>
          <div id="myChart" :style="chartBody"></div>
        </basic-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {searchWxList, selectFxValue} from "@/api/qcmap/analysisresultdis";
import {getTreeDeviceMateriel} from "@/api/system/dept";
import {mapGetters} from "vuex";
import {errorMsgbox} from "@/api/global_variable";
import {loadOption, xCalculation, xyCalculation} from "../../api/qcmap/analysisresultdis";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
let i = 0;
// 引入柱状图组件
// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// 引入提示框和title组件，图例
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll')//图例翻译滚动


export default {
  name: '/qcmap/analysisresultdis',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近半个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      currentkey: '',
      expandedKey: [],
      valueTime: [],//时间选择器数据绑定
      treeStyle: "",//树高的样式
      //图宽高样式
      chartBody: "",
      yesorNo1: true,
      yesorNo2: true,
      date1: "",
      date2: "",
      options: [
        {
          value: "1",
          label: "近一周",
        },
        {
          value: "2",
          label: "近半月",
        },
        {
          value: "3",
          label: "近一月",
        },
        {
          value: "4",
          label: "近三月",
        },
        {
          value: "5",
          label: "自定义",
        },
      ],
      arr: "",
      value: "",
      maxNum: 0,
      minNum: 0,
      text: "",
      title_y: "",
      times: [],
      timeslot: "",
      matterpro_name: "",
      ANALYSIS_VALUE: [],
      ANALYSIS_VALUE_NOTNULL: [],
      strss: [],
      maxtime: "",
      earlywarning_value: "",
      earlywarning_min_value: "",
      wxqs: "",
      diffdateList: [],
      diffdateListNew: [],
      diffdateListWithYear: [],
      yList: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      wxList: [],
      matterproCode: "",
      matterproName: "",
      materielid: "",
      value1: "",
      i: 0,
      treeData: [],
      deviceTitle: "",
      matterproUnitTitle: "",
      true_maxtY: null,
      true_mintY: null,
      wxUnitName: '',

    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: false,
        viewBtn: this.vaildData(this.permission.materielapprove_view, false),
        delBtn: this.vaildData(this.permission.materielapprove_delete, false),
        editBtn: this.vaildData(this.permission.materielapprove_edit, false),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.auditingId);
      });
      return ids.join(",");
    },
  },
  created: function () {
  },
  beforeMount() {//页面加载前
    this.setClientHight()
  },
  mounted() {
    window.addEventListener('resize', () => this.setClientHight(), false)
    let that = this;
    that.$nextTick().then(() => {
      that.init();
    })
    this.drawLine();
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      this.chartBody = "width:100%;margin-top:14px; height:" + (window.innerHeight - 229) + "px;";
      this.treeStyle = "height:" + (window.innerHeight - 146) + "px;overflow:auto;";
    },
    init() {
      getTreeDeviceMateriel().then(res => {
        if (res.data.code != 200){
          return errorMsgbox(this,res.data.msg)
        }
        var temp = []
        var forFn = function (arr) {
          if (arr && arr.length > 0) {
            if (arr[0].children) {
              forFn(arr[0].children)
            } else {
              temp.push(arr[0])
            }
          }
        }
        forFn(res.data.data);
        this.currentkey = temp[0].id;
        this.treeData = res.data.data;
        this.expandedKey = [res.data.data[0].id, res.data.data[0].children[0].id]
        this.$nextTick(function () {
          this.$refs.tree.setCurrentKey(this.currentkey)
        })
        this.nodeClick(temp[0]);
      });
    },
    //初次/或点击物料趋势图加载
    initJz(data1, data2, data3, data4) {
      this.matterpro_name = "";
      this.ANALYSIS_VALUE = [];
      this.ANALYSIS_VALUE_NOTNULL = [];
      this.arr = "";
      this.wxList.forEach((res) => {
        if (res.matterproCode == data1) {
          this.matterpro_name = res.matterproName;
        }
      });
      //获取两个时间段所有时间集合
      this.getdiffdate(data2, data3);
      selectFxValue(data1, data2, data3, data4).then((data) => {
        if (data.data.code === 200) {
          if (data.data.data != null && data.data.data != {}) {
            let flag = 0;
            let j = 0;
            let pointData = data.data.data.fxValueVo;
            let unit = data.data.data.unit;
            for (let k = 0; k < pointData.length; k++) {
              //接口返回时间集合
              this.ANALYSIS_VALUE_NOTNULL.push(pointData[k].matterproValue);
              for (j = flag; j < this.diffdateList.length; j++) {
                //选择时间段内时间集合
                if (
                  pointData[k].analysisTime.toString() !=
                  this.diffdateList[j].toString()
                ) {
                  this.ANALYSIS_VALUE.push(null);
                } else {
                  this.ANALYSIS_VALUE.push(pointData[k].matterproValue);
                  flag = j + 1;
                  break;
                }
              }
            }
            //跳出循环后，数组未比较数据赋值null
            let num = this.diffdateList.length - this.ANALYSIS_VALUE.length;
            if (num > 0) {
              for (let g = 0; g < num; g++) {
                this.ANALYSIS_VALUE.push(null);
              }
            }
            //通过获取数组变量和原来的数组做对比
            var max = this.ANALYSIS_VALUE_NOTNULL[0]; //对比结果是最大值
            var min = this.ANALYSIS_VALUE_NOTNULL[0]; //对比结果是最小值
            //通过for循环获取对比次数
            for (var i = 0; i < this.ANALYSIS_VALUE_NOTNULL.length; i++) {
              // 最大值
              if (max < this.ANALYSIS_VALUE_NOTNULL[i]) {
                //通过if判断把最大值赋给max；
                max = this.ANALYSIS_VALUE_NOTNULL[i];
              }
              // 最小值
              if (min > this.ANALYSIS_VALUE_NOTNULL[i]) {
                //通过if判断把最小值赋给min；
                min = this.ANALYSIS_VALUE_NOTNULL[i];
              }
            }
            if (this.ANALYSIS_VALUE_NOTNULL.length > 0) {
              let arr = this.Array(this.ANALYSIS_VALUE_NOTNULL);
              this.arr = arr;
            }
            if (!this.arr) {
              this.arr = '最大值：-\xa0\xa0\xa0最小值：-'
            }
            this.maxNum = max;
            this.minNum = min;
            this.drawLine();
          }
        } else {
          this.$message.error(data.data.msg);
        }
      });
    },

    /** wqq  x轴  y轴  通过接口计算
     * 加载echart图
     * @param matterproCode 物性编码
     * @param time1 开始日期
     * @param time2 结束日期
     * @param materielid 物料ID
     */
    loadEchart(matterproCode, time1, time2, materielid) {
      this.arr = '';
      this.ANALYSIS_VALUE_NOTNULL = [];
      this.wxList.forEach((res) => {
        if (res.matterproCode == matterproCode) {
          this.matterpro_name = res.matterproName;
        }
      });
      this.matterproUnitTitle = "";
      if (this.wxList.length > 0) {
        this.wxList.forEach(ele => {
          if (ele.matterproName == this.matterpro_name) {
            if (ele.matterproUnit != "") {
              this.matterproUnitTitle = "(" + ele.matterproUnit + ")";
            }
          }
        })
      }
      //获取两个时间段所有时间集合
      this.getdiffdate(time1, time2);
      let xDateArray = this.diffdateListNew;
      let xDateArrayWithYear = this.diffdateListWithYear;
      let yDataArray = [];
      let series = [];

      // 调用接口  拼装y轴数据
      selectFxValue(matterproCode, time1, time2, materielid).then(res => {
        if (res.data.code === 200) {
          if (res.data.data != null && res.data.data != {} && Object.keys(res.data.data).length > 0) {
            let pointData = res.data.data.fxValueVo;
            this.wxUnitName = res.data.data.unit;
            let flag = 0;
            let j = 0;
            for (let k = 0; k < pointData.length; k++) {
              this.ANALYSIS_VALUE_NOTNULL.push(pointData[k].matterproValue);
              //接口返回时间集合
              for (j = k; j < this.diffdateList.length; j++) {
                //选择时间段内时间集合
                if (pointData[k].analysisTime.toString() != this.diffdateList[j].toString()) {
                  yDataArray.push(null);
                } else {
                  yDataArray.push(pointData[k].matterproValue);
                  flag = j + 1;
                  break;
                }
              }
            }
            for (let i = 0; i < this.diffdateList.length; i++) {
              for (let kk = 0; kk < pointData.length; kk++) {
                if (this.diffdateList[i].toString() == pointData[kk].analysisTime.toString()) {
                  series.push([pointData[kk].analysisTime, pointData[kk].matterproValue]);
                }
              }
            }


            if (this.ANALYSIS_VALUE_NOTNULL.length > 0) {
              let arr = this.Array(this.ANALYSIS_VALUE_NOTNULL);
              this.arr = arr;
            }
            if (!this.arr) {
              this.arr = '最大值：-\xa0\xa0\xa0最小值：-'
            }

            let that = this;
            setTimeout(function () {
              let xData = {};
              let yData = {};
              //调用接口 计算x、y轴 最大最小值以及间距
              xyCalculation({
                listXGXSPointX: xDateArray,
                listXGXSPointY: yDataArray,
                x_K: xDateArray.length > 10 ? 10 : xDateArray.length,
                y_K: 4
              }).then(res => {
                if (res.data.code === 200) {
                  yData = res.data.data.ylist;
                  //调用接口 计算x 最大最小值以及间距
                  xCalculation({
                    listXGXSPointX: xDateArrayWithYear,
                    type: 3,
                    x_K: xDateArray.length > 10 ? 10 : xDateArray.length,
                  }).then(res => {
                    if (res.data.code === 200) {
                      xData = res.data.data.scale_timeData;
                      let myChart = echarts.init(document.getElementById("myChart"), {renderer: 'svg'});
                      let option = loadOption(that.deviceTitle + "-" + that.wxqs,
                        that.matterpro_name + that.wxUnitName,
                        '',
                        that.matterpro_name + that.wxUnitName,
                        // xDateArray,
                        xData,
                        yData,
                        series);
                      myChart.clear();
                      myChart.setOption(option);
                    }
                  })
                }
              });
            }, 100)
          } else {
            this.drawLine();
          }
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    //求和函数
    sum(x, y) {
      return x + y;
    },
    //数组中每个元素求它的平方
    square(x) {
      return x * x;
    },
    //选择时间范围
    chooseTime() {
      this.valueTime = [];
      this.yesorNo1 = true;
      this.yesorNo2 = true;
      if (this.value == "1") {
        this.valueTime.push(this.getDay(7));
        this.valueTime.push(this.getDay(0));
      } else if (this.value == "2") {
        this.valueTime.push(this.getDay(15));
        this.valueTime.push(this.getDay(0));
      } else if (this.value == "3") {
        this.valueTime.push(this.getDay(30));
        this.valueTime.push(this.getDay(0));
      } else if (this.value == "4") {
        this.valueTime.push(this.getDay(90));
        this.valueTime.push(this.getDay(0));
      } else {
        this.yesorNo1 = false;
        this.yesorNo2 = false;
      }
    },
    // 近一周
    getDay(day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear + "-" + tMonth + "-" + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    drawLine() {
      // // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"), {renderer: 'svg'});
      let maxt = parseFloat(this.maxNum);
      let mint = parseFloat(this.minNum);

      maxt = maxt + 10;
      mint = mint - 10;

      let true_maxt;
      let true_mint;

      if (maxt < mint) {
        true_maxt = 10;
        true_mint = 0;
      } else {
        if (this.matterpro_name == "密度(g/ml)") {
          true_maxt = Math.round((maxt * 1.01) / 2) * 2;
          true_maxt = this.maxs(true_maxt);

          if (mint < 0) {
            true_mint = Math.round(mint / 0.99 / 2) * 2;
            true_mint = this.mins(true_mint);
          } else {
            true_mint = Math.round((mint * 0.99) / 2) * 2;
            true_mint = this.mins(true_mint);
          }

          if ((maxt * 1.01) / 5 < 1 || (mint * 0.99) / 5 < 1) {
            true_maxt = Math.round((maxt * 100 * 1.001) / 2) * 2;
            true_maxt = this.maxs(true_maxt);

            if (mint < 0) {
              true_mint = Math.round((mint * 100) / 0.999 / 2) * 2;
              true_mint = this.mins(true_mint);
            } else {
              true_mint = Math.round((mint * 100 * 0.999) / 2) * 2;
              true_mint = this.mins(true_mint);
            }

            var tt = true_maxt - true_mint;
            var xiangcha = 0;
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
          } else {
            //物性数据比较大的情况
            var tt = true_maxt - true_mint;
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
              }
            } else if (tt == 0) {
              true_maxt = true_maxt + 1;
              true_mint = true_mint - 1;
            }
          }
        } else {
          var zsMaxNum = 1;
          if (maxt > 100) zsMaxNum = 1000;
          else if (maxt > 10) zsMaxNum = 100;
          else if (maxt > 0) zsMaxNum = 10;
          maxt = maxt / zsMaxNum;
          var zsMinNum = 1;
          if (mint > 100) zsMinNum = 1000;
          else if (mint > 10) zsMinNum = 100;
          else if (mint > 0) zsMinNum = 10;
          mint = mint / zsMinNum;

          if (maxt < 0) {
            //true_maxt=Math.ceil(maxt/1.2/2)*2;
            true_maxt = Math.ceil(maxt - maxt * 0.2);
          } else {
            //true_maxt=Math.ceil(maxt*1.2/2)*2;
            true_maxt = Math.round(maxt * 1.2);
            true_maxt = Math.ceil(true_maxt + maxt * zsMaxNum);
          }

          if (mint < 0) {
            //true_mint=Math.floor(mint/0.8/2)*2;
            true_mint = Math.floor(mint * 1.2);
          } else {
            //true_mint=Math.floor(mint*0.8/2)*2;
            true_mint = Math.floor(mint * 0.8);
            true_mint = Math.floor(mint * zsMinNum - true_mint);
          }
          if (true_maxt - true_mint >= 5) {
            true_maxt = this.maxs(true_maxt);
            true_mint = this.mins(true_mint);
          }

          if (
            (maxt * 1.01) / 2 < 1 &&
            (mint * 0.99) / 2 < 1 &&
            (maxt * 1.01) / 2 > 0
          ) {
            true_maxt = true_maxt;
            true_mint = true_mint;
          } else {
            //物性数据比较大的情况
            var cha = true_maxt - true_mint;
            var tt = true_maxt - true_mint;
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
                true_maxt = true_maxt + (xiangcha * 2 - cha) / 2;
                true_mint = true_mint - (xiangcha * 2 - cha) / 2;
              }
            } else if (tt == 0) {
              true_maxt = true_maxt + 1;
              true_mint = true_mint - 1;
            }
          }
        }
      }


      if (isNaN(true_maxt)) {
        true_maxt = 10;
      }
      if (isNaN(true_mint)) {
        true_mint = 0;

      }
      if (true_mint < 0) {
        true_mint = 0;
        this.true_mintY = true_mint
      }
      if (true_maxt < 0 || true_mint < 0) {
        true_maxt = null;
        true_mint = null;

      }
      this.matterproUnitTitle = "";
      if (this.wxList.length > 0) {
        this.wxList.forEach(ele => {
          if (ele.matterproName == this.matterpro_name) {
            if (ele.matterproUnit != "") {
              this.matterproUnitTitle = "(" + ele.matterproUnit + ")";
            }
          }
        })
      }

      myChart.setOption({
        title: {
          text: this.deviceTitle + "-" + this.wxqs,
          x: "center",
          y: this.title_y,
          padding: [2, 0, 100, 0],
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b0} <br /> {a0} : {c0}",
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            color: '#fff'
          }
        },

        legend: {
          data: [this.matterpro_name + this.matterproUnitTitle],
          x: "right",
          y: "top",
          padding: [30, 80, 5, 50],
        },
        xAxis: {
          type: "category",
          data: this.diffdateListNew,
          name: "",
          boundaryGap: false,
          splitLine: {
            interval: this.timeslot,
            show: true,
          },
          axisLabel: {
            textStyle: {
              color: '#000000',  //更改坐标轴文字颜色
            }
          },
          axisLine: {
            lineStyle: {
              color: '#000000' //更改坐标轴颜色
            }
          }
        },
        yAxis: [
          {
            type: "value",
            show: true,
            max: true_maxt,
            min: true_mint,
            name: this.matterpro_name + this.matterproUnitTitle,
            position: "left", //位置靠左
            nameLocation: "middle", //位置居中
            nameGap: 50, //与y轴距离
            nameRotate: 90, //角度
            splitLine: {show: true},
            splitNumber: 5,
            interval: true_maxt == null ? null : Math.round(((true_maxt - true_mint) / 5) * 100) / 100,
            axisLabel: {
              formatter: (value, index) => {
                // return value.toFixed(0);
                return value
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
          },
          // {
          //   type: "value",
          //   show: true,
          //   splitLine: { show: true },
          //   splitNumber: 5,
          //   axisTick: {
          //     show: true,
          //     inside: true,
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       color: "#000000",
          //       width: 0.5,
          //     },
          //   },
          // },
        ],

        series: [
          {
            name: this.matterpro_name + this.matterproUnitTitle,
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
            data: this.ANALYSIS_VALUE,
            type: "line",
            markLine: {
              symbol: "none", //去掉箭头
              data: [{type: "average", name: "平均值"}],
            },
          },
        ],
      });
    },
    maxs(data) {
      for (let i = 0; i <= 30; i++) {
        let adddata = data + i;
        if (adddata % 5 == 0) {
          data = adddata;
          return data;
          break;
        }
      }
    },
    mins(data) {
      for (let i = 0; i <= 30; i++) {
        let adddata = data - i;
        if (adddata % 5 == 0) {
          data = adddata;
          return data;
          break;
        }
      }
    },
    nodeClick(data) {
      if (data.islevel == 3) {
        this.materielid = data.id.split('MATE_')[1]

        this.treeData.forEach(ele => {
          if (ele.id == data.parentId) {
            this.deviceTitle = ele.title;
          }
        })
        this.valueTime = [];
        this.matterproCode = "";
        this.wxqs = data.title;


        searchWxList(this.materielid).then((data) => {
          if (data.data.code === 200)
            this.wxList = data.data.data;
          if (this.wxList.length > 0) {
            this.loadEchart(this.wxList[0].matterproCode, this.getDay(7), this.getDay(0), this.materielid);

            // this.initJz(
            //   this.wxList[0].matterproCode,
            //   this.getDay(7),
            //   this.getDay(0),
            //   this.materielid
            // );
            this.matterproCode = this.wxList[0].matterproCode;
            this.value = "1";
            this.valueTime.push(this.getDay(7));
            this.valueTime.push(this.getDay(0));
          } else {
            this.loadEchart('', this.getDay(7), this.getDay(0), this.materielid);
            // this.initJz("", this.getDay(7), this.getDay(0), this.materielid);
            this.value = "1";
            this.valueTime.push(this.getDay(7));
            this.valueTime.push(this.getDay(0));
          }
        });
      }
    },
    selectFxPic() {
      if (this.valueTime.length == 0) {
        this.$message.warning("日期未填写！");
        return;
      }
      this.ANALYSIS_VALUE = [];
      this.ANALYSIS_VALUE_NOTNULL = [];
      // this.true_maxtY=null,
      //   this.true_mintY=null
      this.arr = "";
      let date3 =
        new Date(this.valueTime[1]).getTime() - new Date(this.valueTime[0]).getTime(); //时间差秒
      //计算出相差天数
      let days = Math.floor(date3 / (24 * 3600 * 1000));
      if (this.matterproCode == "") {
        this.$message.warning("请选择物性！");
        return;
      }
      if (days > 365) {
        this.$message.warning("时间范围不能大于一年！");
        return;
      }
      this.wxList.forEach((res) => {
        if (res.matterproCode == this.matterproCode) {
          this.matterpro_name = res.matterproName;
        }
      });
      //获取两个时间段所有时间集合
      // this.getdiffdate(this.valueTime[0], this.valueTime[1]);
      this.loadEchart(this.matterproCode, this.valueTime[0], this.valueTime[1], this.materielid);
      // selectFxValue(
      //   this.matterproCode,
      //   this.valueTime[0],
      //   this.valueTime[1],
      //   this.materielid
      // ).then((data) => {
      //   let flag = 0;
      //   let j = 0;
      //   for (let k = 0; k < data.data.data.length; k++) {
      //     //接口返回时间集合
      //     this.ANALYSIS_VALUE_NOTNULL.push(data.data.data[k].matterproValue);
      //     for (j = flag; j < this.diffdateList.length; j++) {
      //       //选择时间段内时间集合
      //       if (
      //         data.data.data[k].analysisTime.toString() !=
      //         this.diffdateList[j].toString()
      //       ) {
      //         this.ANALYSIS_VALUE.push(null);
      //       } else {
      //         this.ANALYSIS_VALUE.push(data.data.data[k].matterproValue);
      //         flag = j + 1;
      //         break;
      //       }
      //     }
      //   }
      //   //跳出循环后，数组未比较数据赋值null
      //   let num = this.diffdateList.length - this.ANALYSIS_VALUE.length;
      //   if (num > 0) {
      //     for (let g = 0; g < num; g++) {
      //       this.ANALYSIS_VALUE.push(null);
      //     }
      //   }
      //   //通过获取数组变量和原来的数组做对比
      //   var max = this.ANALYSIS_VALUE_NOTNULL[0]; //对比结果是最大值
      //   var min = this.ANALYSIS_VALUE_NOTNULL[0]; //对比结果是最小值
      //   //通过for循环获取对比次数
      //   for (var i = 0; i < this.ANALYSIS_VALUE_NOTNULL.length; i++) {
      //     // 最大值
      //     if (max < this.ANALYSIS_VALUE_NOTNULL[i]) {
      //       //通过if判断把最大值赋给max；
      //       max = this.ANALYSIS_VALUE_NOTNULL[i];
      //     }
      //     // 最小值
      //     if (min > this.ANALYSIS_VALUE_NOTNULL[i]) {
      //       //通过if判断把最小值赋给min；
      //       min = this.ANALYSIS_VALUE_NOTNULL[i];
      //     }
      //   }
      //   if (this.ANALYSIS_VALUE_NOTNULL.length > 0) {
      //     let arr = this.Array(this.ANALYSIS_VALUE_NOTNULL);
      //     this.arr = arr;
      //   }
      //   if (!this.arr) {
      //     this.arr = '最大值：-\xa0\xa0\xa0最小值：-'
      //   }
      //   this.maxNum = max;
      //   this.minNum = min;
      //   this.drawLine();
      // });
    },
    //获取两日期之间日期列表函数
    getdiffdate(stime, etime) {
      //初始化日期列表，数组
      var diffdate = new Array();
      var diffdateNew = new Array();
      var diffdateWithYearNew = new Array();

      var i = 0;
      //开始日期小于等于结束日期,并循环
      while (stime <= etime) {
        diffdate[i] = stime;
        var stimeNew = this.formatTime(stime);
        var stimeNewWithYear = this.formatTimeWithYear(stime);
        diffdateNew[i] = stimeNew;
        diffdateWithYearNew[i] = stimeNewWithYear;
        //获取开始日期时间戳
        var stime_ts = new Date(stime).getTime();
        // var stime_tsNew = new Date(stimeNew).getTime();
        //增加一天时间戳后的日期
        var next_date = stime_ts + 24 * 60 * 60 * 1000;
        //var next_dateNew = stime_tsNew + 24 * 60 * 60 * 1000;
        //拼接年月日，这里的月份会返回（0-11），所以要+1
        var next_dates_y = new Date(next_date).getFullYear() + "-";
        var next_dates_m =
          new Date(next_date).getMonth() + 1 < 10
            ? "0" + (new Date(next_date).getMonth() + 1) + "-"
            : new Date(next_date).getMonth() + 1 + "-";
        var next_dates_d =
          new Date(next_date).getDate() < 10
            ? "0" + new Date(next_date).getDate()
            : new Date(next_date).getDate();
        stime = next_dates_y + next_dates_m + next_dates_d;
        //增加数组key
        i++;
      }
      this.diffdateList = diffdate;
      this.diffdateListNew = diffdateNew;
      this.diffdateListWithYear = diffdateWithYearNew;
    },
    formatTime(stime) {
      var stime_tsNew = new Date(stime).getTime();
      //var next_dateNew = stime_tsNew + 24 * 60 * 60 * 1000;
      var next_dates_m1 = new Date(stime_tsNew).getMonth() + 1 + ".";
      var next_dates_d1 = new Date(stime_tsNew).getDate();
      return next_dates_m1 + next_dates_d1;
    },
    formatTimeWithYear(stime) {
      var stime_tsNew = new Date(stime).getTime();
      var next_dates_y1 = new Date(stime_tsNew).getFullYear() + "-";
      //var next_dateNew = stime_tsNew + 24 * 60 * 60 * 1000;
      var next_dates_m1 = new Date(stime_tsNew).getMonth() + 1 + "-";
      var next_dates_d1 = new Date(stime_tsNew).getDate();
      return next_dates_y1 + next_dates_m1 + next_dates_d1;

    },
    //合集计算
    Array(data) {
      var sum = function (x, y) {
        return x + y;
      }; //求和函数
      var square = function (x) {
        return x * x;
      }; //数组中每个元素求它的平方
      //var data = [1, 1, 3, 5, 5];
      //标准差
      var mean = data.reduce(sum) / data.length;
      var deviations = data.map(function (x) {
        return x - mean;
      });
      var stddev = Math.sqrt(
        deviations.map(square).reduce(sum) / (data.length - 1)
      );
      //方差
      var pow = Math.pow(stddev, 2);
      var max = Math.max.apply(null, data);
      var min = Math.min.apply(null, data);
      if (isNaN(stddev)) {
        return (
          "最大值：" +
          max +
          "\xa0\xa0\xa0最小值：" +
          min +
          "\xa0\xa0\xa0平均值：" +
          mean.toFixed(2)
        );
      } else {
        return (
          "最大值：" +
          max +
          "\xa0\xa0\xa0最小值：" +
          min +
          "\xa0\xa0\xa0平均值：" +
          mean.toFixed(2) +
          "\xa0\xa0\xa0标准差：" +
          stddev.toFixed(2) +
          "\xa0\xa0\xa0方差：" +
          pow.toFixed(2)
        );
      }
    },
  },
};
</script>

<style scoped="scoped">
.text-justify {
  float: left;
  text-align: end;
  text-justify: inter-word;
  text-justify: inter-ideograph;
  width: 80px;
  height: 30px;
  line-height: 30px;
}

.span-justify {
  display: inline-block;
  width: 100%;
}
</style>
