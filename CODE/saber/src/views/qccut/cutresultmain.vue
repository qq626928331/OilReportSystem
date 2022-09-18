<template>
  <div>
    <el-row>
      <el-col :span="8">
        <basic-container>
          <div style="margin-bottom: 15px">
            <div>
              <span style="font-size: 14px">方案名称:</span>
              <el-input placeholder="请输入方案名称" v-model="searchschemename" size="small"
                        style="width:40%;margin-left: 3ex"></el-input>
              <el-button size="small" type="primary" icon="el-icon-search" style="margin-left: 2ex" @click="onLoad">
                查 询
              </el-button>
              <el-dialog
                :modal="modelShow"
                :visible.sync="editDialog"
                center
                :append-to-body="true"
                :show-close="true"
                :before-close="closeDialog"
                width="55%">
                <iframe :src="iframeurl" frameborder="0" :style="iframeHeight"></iframe>
              </el-dialog>
              <el-dialog
                ref="ReportConfig"
                :visible.sync="reportConfigureIt"
                :before-close="reportConfigureItClose"
                :append-to-body="true"
                :title="reportTitle"
                :close-on-click-modal='false'
                width="55%">
                <div style='text-align: right; margin-bottom: 20px; margin-top: -73px; margin-right: 40px'>
                  <el-button type="primary" @click="downloadExcel">
                    <img src="../../../public/icon/ic_excel.png" style="margin-right: 5px;">
                    导 出
                  </el-button>
                </div>
                <div style='width: 100%;text-align: center; ' v-loading="diaLoading">
                  <iframe :src="srcdoc" frameborder="0" :style=styObj></iframe>
                </div>
              </el-dialog>

            </div>
          </div>
          <el-table :data="schemeData" size="small" border v-loading="loading"  @header-dragend="changeColWidth"
                    :header-cell-style="{'text-align':'center'}" @row-click="selectOneSchema"
                    style="width: 100%" highlight-current-row :height=tableheight>
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column prop="schemeName" label="方案名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="schemeType" label="方案类型" align="center" width="80" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <span v-if="row.schemeType==1">PIMS</span>
                <span v-if="row.schemeType==2">RSIM</span>
              </template>
            </el-table-column>
            <el-table-column prop="pdateTime" label="切割时间" align="center" show-overflow-tooltip>
              <template slot-scope="{$index,row}">
                {{dateFormat(row.pdateTime)}}
              </template>
            </el-table-column>
          </el-table>
        </basic-container>
      </el-col>
      <el-col :span="16">
        <el-row>
          <basic-container>
            <div style="display: flex;height:36px">
              <div style="display: inline-block;line-height: 36px;width: 55px;">原 油：</div>
              <div class="tab-control">
                <div v-for="(item , index) in oillist" class="tab-control-item"
                     :class="{active: index ===  currentIndex}" @click='itemClick(index)'>
                  <div>{{ item.CN_NAME }}</div>
                </div>
              </div>
            </div>
          </basic-container>
        </el-row>
        <el-row>
          <basic-container>
            <div style="margin-bottom: 15px">
              <el-radio-group v-model="radio" size="small" :disabled=oilcodedisable @change="changeradio">
                <el-radio-button :label="1">馏分段</el-radio-button>
                <el-radio-button :label="2">轻端</el-radio-button>
                <el-radio-button v-if="selectedschema.schemeType==2" :label="3">石脑油</el-radio-button>
              </el-radio-group>
              <el-button v-if="selectedschema.schemeType==1" size="small" type="primary" style="margin-left: 2ex"
                         @click="exportFile" :disabled=oilcodedisable>
                <img src="../../../public/icon/ic_excel.png" style="margin-right: 5px;">
                导 出
              </el-button>
              <el-button v-if="selectedschema.schemeType==2" size="small" type="primary" style="margin-left: 2ex"
                         @click="exportXmlFile" :disabled=oilcodedisable>
                <img src="../../../public/icon/ic_xml.png" style="margin-right: 5px;">
                导 出
              </el-button>
            </div>
            <div v-show="radio==1">
              <el-table :data="sectiondata" size="small" border :header-cell-style="{'text-align':'center'}"
                        ref="sectiontable"
                        :cell-style="{'text-align':'center'}" style="width: 100%" highlight-current-row
                        :height=tableheightleft @header-dragend="changeColWidth">
                <template v-if="sectioncolumn.length!=0">
                  <el-table-column
                    v-for="(item,index) in sectioncolumn"
                    :fixed="index==0 || index==1"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    :width="index==0?50:'' || index==1?110:''"
                    align="center" show-overflow-tooltip>
                    <template slot="header" slot-scope="scope">
                      <span>{{sectioncolumn[index].label}}</span> <br> <span>{{sectioncolumn[index].unit}}</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </div>
            <div v-show="radio==2">
              <el-table :data="lightdata" size="small" border :header-cell-style="{'text-align':'center'}"
                        ref="lighttable"
                        :cell-style="{'text-align':'center'}" style="width: 100%" highlight-current-row
                        :height=tableheightleft>
                <template v-if="lightcolumn.length!=0">
                  <el-table-column
                    v-for="(item,index) in lightcolumn"
                    :fixed="index==0"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    :width="index==0?50:''"
                    align="center" show-overflow-tooltip>

                  </el-table-column>
                </template>
              </el-table>
            </div>
            <div v-show="radio==3">
              <el-table :data="naphthadata" size="small" border :header-cell-style="{'text-align':'center'}"
                        ref="naphthatable" key="0"   @header-dragend="changeColWidths"
                        :cell-style="{'text-align':'center'}" style="width: 100%" highlight-current-row
                        :height=tableheightleft>
                <template v-if="naphthacolumn.length!=0">
                  <el-table-column
                    v-for="(item,index) in naphthacolumn"
                    :fixed="index==0"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    :width="index==0?50:''"
                    align="center" show-overflow-tooltip>
                  </el-table-column>
                </template>
              </el-table>
            </div>
          </basic-container>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {getList, searchOil, downloadXml, getBaseurl} from "@/api/qccut/cutresultmain";
  import {pageOutPutHtml, searchcutresultmainDetail} from "@/api/qccut/scheme";
  import {
    reportConfigure
  } from "@/api/qcduty/workoilassess";
  import {mapGetters} from "vuex";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name:'/qccut/cutresultmain',
    data() {
      return {
        iframeShow: false,
        iframeHeight: "",
        iframeurl: "",
        srcdoc: "",
        reportTitle: "PIMS报告",
        styObj: {},
        setHeight: 0,
        editDialog: false,
        diaLoading: true,
        isMaskShow: false,
        reportConfigureIt: false,
        tableheight: 0,//表格高度
        tableheightleft: 0,//右侧表格的高度
        searchschemename: '',//查询方案名称
        schemeData: [],//左侧方案列表
        oilcode: '',//右侧原油编码
        selectedschema: [],//选中的方案
        oilcodedisable: true,//原油到处按钮是否可以点击，状态
        radio: 1,//轻端等，按钮默认选中的
        sectiondata: [],//馏分段数据
        sectioncolumn: [],//馏分段列
        lightdata: [],//轻端数据
        lightcolumn: [],//轻端列
        naphthadata: [],//石脑油数据
        naphthacolumn: [],//石脑油列
        oillist: [],//原油列表
        loading: true,//加载中状态
        currentIndex: 0,//当前默认选中的原油
        objjson: {
          "wk_id": "",
          "cutresult_id": "173",
          "name": "",
          "code": "",
          "fileName": "simple",
          "fileType": "2"

        }
      };
    },
    beforeMount() {
      this.setClientHight()
    },
    mounted() {
      window.addEventListener('resize', () => this.setClientHight(), false)
      //加载左侧方案列表
      this.onLoad();
    },
    computed: {
      //将列表选中的记录ID,拼接成用，隔开的字符串
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        //浏览器高度，
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        this.iframeHeight = "width:100%;height:" + (h * 0.5) + "px;";
        this.tableheight = h - 192;//动态计算高度
        this.tableheightleft = h - 262;
        this.setHeight = "height:" + (h - 300) + "px;";
        if (window.innerWidth != 1366) {
          this.editDialogWidth = "55%";
        } else {
          this.editDialogWidth = "75%";
        }
      },
      //获取输出html地址
      pageOutPutHtml(){
        this.oilcodedisable = false;//按钮禁用状态取消
        pageOutPutHtml(JSON.stringify(this.objjson.cutresult_id)).then(res => {
          this.diaLoading = false
          this.styObj.border = '1px solid #d4d4d4'
          if (res.data.code === 200) {
            this.srcdoc = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      },
      //导出Excel展示iframe
      exportFile() {
//        document.getElementById("pimsdiv").innerHTML="";
        this.reportConfigureIt = true;
        var cutresult_id = this.selectedschema.cutresultId;
        this.$set(this.objjson, "cutresult_id", cutresult_id);
        this.$set(this.objjson, "reportType", "3");
        // this.$set(this.objjson,"wk_id",this.rowData.wkId);
        this.styObj = {
          width: '100%',
          height: window.innerHeight * 0.65 + 'px',
        }
        this.pageOutPutHtml();
//         reportConfigure(JSON.stringify(this.objjson)).then((res) => {
//           //console.log(res.data);
//           this.diaLoading = false
//           this.styObj.border = '1px solid #d4d4d4'
//           if (res.data.code===200){
//             this.srcdoc = res.data.data;
//           }else {
//             let that = this;errorMsgbox(that, res.data.msg);;
//           }
//           //document.getElementById("testdiv").appendHTML("");
// //          document.getElementById("pimsdiv").appendHTML(res.data);
//
//         })
      },
      /**
       * 导出xml文件
       */
      exportXmlFile() {
        this.oillist.forEach(item => {
          downloadXml(item.OIL_ID, this.selectedschema.cutresultId).then(res => {
            const content = res.data;
            const blob = new Blob([content], {type: 'application/xml'});
            let fileName = window.decodeURI(item.CN_NAME, "UTF-8");
            if ("download" in document.createElement("a")) {
              // 非IE下载
              const elink = document.createElement("a");
              elink.download = fileName;
              elink.style.display = "none";
              elink.href = URL.createObjectURL(blob);
              document.body.appendChild(elink);
              elink.click();
              URL.revokeObjectURL(elink.href); // 释放URL 对象
              document.body.removeChild(elink);
            } else {
              // IE10+下载
              navigator.msSaveBlob(blob, fileName);
            }
          })
        })
      },


      downloadExcel() {
        var elemIF = document.createElement('iframe')
        elemIF.src = this.srcdoc.replace(/html/, "xlsx")
        console.log(elemIF)
        elemIF.style.display = 'none'
        document.body.appendChild(elemIF);
      },
      reportConfigureItClose() {
        this.reportConfigureIt = false
        this.srcdoc = ''
        this.diaLoading = true
      },
      changeColWidth(nw,ow,col,evt) {
        //拖拽控制最小宽度
          if (nw < 70) {
            col.width = 60;
          }
        this.$nextTick(() => {
          this.$refs.sectiontable.doLayout();
        });
      },
      changeColWidths(nw,ow,col,evt) {
        //拖拽控制最小宽度
        if (nw < 70) {
          col.width = 60;
        }
      },
      /*exportFile(){
        this.editDialog = true;
        var cutresult_id = this.selectedschema.cutresultId ;
        var datetime = "202012181314" ;
        var rpx_name='PIMS报告.rpx';
        var name_param="PIMS报告";
        var baseurl = "" ;
        console.log("cutresult_id=========="+cutresult_id);
        getBaseurl().then((res) => {
          console.log("baseUrl======="+res.data.baseUrl)
          baseurl = res.data.baseUrl ;
          this.iframeurl = baseurl+encodeURIComponent(rpx_name)+"&CUTRESULT_ID=" + cutresult_id +
            "&name_param="+encodeURIComponent(name_param)+"&istoolbarvisual=no";
        });
      }
      ,*/
      //原油列表的点击事件(原油ID)
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
        this.searchcutresultmainDetail(this.oillist[index].OIL_ID);//根据原油ID查询详细信息
      },
      //格式化日期
      dateFormat(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      },
      //加载方案列表
      onLoad() {
        //根据方案名称模糊匹配切割历史列表
        getList(this.searchschemename).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.schemeData = res.data.data;
          this.loading = false;
        });
      },
      //选中一条方案
      selectOneSchema(row) {
        this.oilcode = '';//清空原油的原油列表
        this.selectedschema = row;//设置选中方案
        this.oilcodedisable = false;
        this.searchOil();//查询原油列表
      },
      //查询原油列表
      searchOil() {
        this.currentIndex = 0;
        searchOil(this.selectedschema.cutresultId).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.oillist = res.data.data;
          let oil = this.oillist[0];
          this.searchcutresultmainDetail(oil.OIL_ID);//根据原油id进行默认加载请求数据
        });
      },
      //轻端等按钮选择事件
      changeradio(val) {
        if (val == 1) {//馏分段
          this.$refs.sectiontable.doLayout();
        } else if (val == 2) {//轻端
          this.$refs.lighttable.doLayout();
        } else if (val == 3) {//石脑油
          this.$refs.naphthatable.doLayout();
        }
      },
      //根据原油id进行默认加载请求数据(原油ID)
      searchcutresultmainDetail(oilId) {
        ////根据原油id进行默认加载请求数据(切割历史ID,原油ID)
        searchcutresultmainDetail(this.selectedschema.cutresultId, oilId).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.oilcodedisable = false;
          this.sectioncolumn = res.data.data[0][0];//馏分段列数据
          this.sectioncolumn.forEach(item => {
            if (item.label.includes("(")) {
              item.unit = item.label.split("(")[1].split(")")[0]
              item.label = item.label.split("(")[0]
            } else {
              item.unit = ''
            }
          })
          this.sectiondata = res.data.data[0][1];//馏分段行数据
          this.lightcolumn = res.data.data[1][0];//轻端列数据
          this.lightdata = res.data.data[1][1];//轻端行数据
          this.naphthacolumn = res.data.data[2][0];//石脑油列数据
          this.naphthadata = res.data.data[2][1];//石脑油行数据
          this.radio = 1;
          this.$nextTick(() => {//重新渲染表格
            this.$refs.sectiontable.doLayout();
          })
        });
      },
    }
  };
</script>

<style slot-scope="scope">
  .info {
    margin-top: 30px;
  }

  /*上方原油的样式*/
  .tab-control {
    overflow-x: scroll;
    overflow-y: hidden;
    display: -webkit-inline-box;
    font-size: 14px;
    background-color: #fff;
    line-height: 35px;
    margin-top: -5px;
  }

  /*原油每一个样式*/
  .tab-control-item div {
    display: inline-block;
    padding: 5px 5px;
    cursor: pointer;
  }

  .active {
    color: #409EFF
  }

</style>
