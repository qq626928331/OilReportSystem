<template>
  <div id="scheme" v-loading="loading" element-loading-text="切割计算中,请稍候..." element-loading-spinner="el-icon-loading">
    <el-row>
      <el-col :span="9">
        <basic-container>
          <el-row>
            <el-col>
              <el-input :size="formSize" placeholder="请输入方案名称" v-model="schemaName">
                <el-button slot="append" icon="el-icon-search" @click="loadSchemeList"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <div v-if="noellipsis.length==0">
          <el-row style="margin-top: 10px;">
            <el-col :span="3" v-for="(item,index) in btnList" :key="index">
              <div :class="['btnItem', {'is-disabled': !item.isDis}]" @click="item.click" :style="{'color':item.color}">
                <el-row style="text-align: center"> <img :src="item.isDis?item.src:item.disSrc"></el-row>
                <el-row style="text-align: center"> <span :style="noellipsis">{{ item.text }}</span></el-row>
              </div>
            </el-col>
          </el-row>
          </div>
          <div v-else>
          <el-row style="margin-top: 10px;">
            <el-col :span="3" v-for="(item,index) in btnList" :key="index" >
              <div :class="['btnItem', {'is-disabled': !item.isDis}]" @click="item.click" :style="{'color':item.color}">
                <el-row style="text-align: center">  <img :src="item.isDis?item.src:item.disSrc"></el-row>
                <el-tooltip class="item" effect="dark" :content="item.text" placement="right-start">
                  <el-row  :style="noellipsis">  <span>{{ item.text }}</span></el-row>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
          </div>

          <el-row style="margin-top: 10px;">
            <el-table ref="schemeListTable" size="small" border :header-cell-style="{'text-align':'center'}"
                      :data="schemaData" @row-click="selectSchema"
                      highlight-current-row @header-dragend="changeColWidth"
                      :height="tableHeight">
              <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
              <el-table-column prop="isDeleted" label="有效性" align="center" min-width="37" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <span v-if="row.isDeleted==0">有效</span>
                  <span v-else-if="row.isDeleted==1">无效</span>
                </template>
              </el-table-column>
              <el-table-column prop="schemeType" label="方案类型" align="center" min-width="37" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <span v-if="row.schemeType==1">PIMS</span>
                  <span v-else-if="row.schemeType==2">RSIM</span>
                </template>
              </el-table-column>
              <el-table-column prop="schemeName" label="方案名称" align="left" show-overflow-tooltip></el-table-column>


              <el-table-column prop="isDeleted" label="修改时间" align="center" min-width="60" show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <span>{{row.modifieddate}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </basic-container>
      </el-col>
      <el-col :span="15">
        <el-row>
          <basic-container>
            <el-col v-if="tempSchemeType==2" :span="20" style="display: flex;height:32px">
              <div style="display: inline-block;line-height: 22px;width: 55px;">原 油：</div>
              <div class="tab-control">
                <div v-for="(item , index) in selTempOilList" class="tab-control-item" :key="item"
                     :class="{active: index ===  currentIndex}" @click='oilClick(index)'>
                  <div> {{ item.cnName }}</div>
                </div>
              </div>
            </el-col>
            <el-col v-else :span="20" style="display: flex;height:32px">
              <div style="display: inline-block;line-height: 22px;width: 100px;">方案名称：</div>
              <div class="active">{{ alreadySchemeName }}</div>
            </el-col>
            <el-col :span="4" style="margin-bottom: 8px">
              <el-col style="text-align: right;">
                <el-button v-if="tempSchemeType==2" :size="formSize" type="primary" style="margin-left: 2ex"
                           @click="exportXmlFile" :disabled=oilcodedisable>
                  <img src="../../../public/icon/ic_xml.png" style="margin-right: 5px;width: 9px;height: 9px;">
                  导 出
                </el-button>
                <el-button v-else :size="formSize" type="primary" style="margin-left: 2ex"
                           @click="downloadExcel" :disabled=oilcodedisable>
                  <img src="../../../public/icon/ic_excel.png" style="margin-right: 5px;width: 9px;height: 9px;">
                  导 出
                </el-button>
              </el-col>
            </el-col>
          </basic-container>
        </el-row>
        <el-row>
          <basic-container>
            <div style='width: 100%;' v-if="tempSchemeType==2">
              <el-radio-group v-model="radio" size="small" style="margin-bottom: 12px" :disabled=oilcodedisable
                              @change="changeradio">
                <el-radio-button :label="1">馏分段</el-radio-button>
                <el-radio-button :label="2">轻端</el-radio-button>
                <el-radio-button :label="3">石脑油</el-radio-button>
              </el-radio-group>
              <div v-if="radio==1">
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
                        <span>{{ sectioncolumn[index].label }}</span> <br> <span>{{ sectioncolumn[index].unit }}</span>
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
              </div>
              <div v-if="radio==2">
                <el-table :data="lightdata" size="small" border :header-cell-style="{'text-align':'center'}"
                          ref="lighttable"  @header-dragend="changeColWidth"
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
              <div v-if="radio==3">
                <el-table :data="naphthadata" size="small" border :header-cell-style="{'text-align':'center'}"
                          ref="naphthatable" key="0"  @header-dragend="changeColWidth"
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
            </div>
            <div style='width: 100%;text-align: center; ' v-else>
              <div border v-if="alreadyCut">
                <iframe :src="srcdoc" frameborder="0" :style=styObj></iframe>
              </div>
              <div v-else>
                <div :style=styObj>
                  <img src="../../../public/img/bg/nodata.png"
                       style="margin-right: 5px; position: absolute; top: 40%; left: 50%;  margin: -100px 0 0 -158px">
                </div>
              </div>
            </div>
          </basic-container>
        </el-row>
      </el-col>
      <!--重命名-->
      <re-name :isShowEdit="dialogShowObj.reName" :scheme-obj="reNameObj"
               @reName="closeDiaReName"></re-name>
      <!--编辑方案、添加方案-->
      <scheme-edit :isShowEdit="dialogShowObj.editScheme" :is-add="dialogShowObj.isAddScheme"
                   :scheme-obj="editSchemeObj" :btnFlag="btnFlag" @addSchemeInfo="addSchemeInfo"
                   @closeEditScheme="handleClose" @finishScheme="finishScheme"></scheme-edit>
      <!--切割-->
      <el-dialog title="原油选择" :visible.sync="isShowOilSel"
                 :append-to-body="true" width="55%">
        <div>
          <el-row>
            <el-form :size="formSize" :inline="true" label-width="100px">
              <el-form-item label="原油名称：" style="margin-bottom: 5px;">
                <el-input placeholder="请输入原油名称" v-model="diaOilName"></el-input>
              </el-form-item>
              <el-form-item style="margin-left: 20px;margin-bottom: 5px;">
                <el-button type="primary" class="el-icon-search" @click="getOilList"> 查 询</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row>
            <el-table :data="oilList" ref="oilList" border :header-cell-style="{'text-align':'center'}"
                      size="small" :height="oilTableHeight" :cell-style="{'text-align':'center'}" :header-row-style="{height:'20px'}"
                      @selection-change="selectOilList"
                      @sort-change="sortChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="名称" prop="cnName" show-overflow-tooltip sortable></el-table-column>
              <el-table-column label="来源" width="80" prop="datasource" sortable
                               show-overflow-tooltip></el-table-column>
              <el-table-column label="评价时间" width="140" prop="oilDate" sortable
                               show-overflow-tooltip></el-table-column>
              <el-table-column label="密度(g/cm³)" width="140" prop="d20" sortable
                               show-overflow-tooltip></el-table-column>
              <el-table-column label="硫含量(w%)" width="140" prop="sul" sortable
                               show-overflow-tooltip></el-table-column>
              <el-table-column label="酸值(mgKOH/g)" width="140" prop="tan" sortable
                               show-overflow-tooltip></el-table-column>
            </el-table>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer" :center="true">
          <el-button style="margin-top: 12px;" plain @click="isShowOilSel=false">取消</el-button>
          <el-button style="margin-top: 12px;" type="primary" :disabled="!this.cutForbit" @click="oilcut">切割</el-button>
        </div>
      </el-dialog>

      <!--导入-->
      <el-dialog title="方案导入" :visible.sync="isShowSchemeImport"
                 :append-to-body="true" width="600px">
        <el-upload
          ref="upload"
          style="align-content: center"
          class="upload-demo"
          drag
          action="#"
          accept=".hxml"
          :auto-upload="false"
          :http-request="uploadfiles"
          :on-success="handleFileSuccess"
          :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传hxml文件</div>
        </el-upload>
        <div slot="footer" class="dialog-footer" :center="true">
          <el-button style="margin-top: 12px;" plain @click="isShowSchemeImport=false">取消</el-button>
          <el-button style="margin-top: 12px;" type="primary" @click="confirmImport">导入</el-button>
        </div>
      </el-dialog>

    </el-row>
  </div>
</template>

<script>
import ReName from "./scheme/ReName";
import SchemeEdit from "./scheme/SchemeEdit";
import {
  getList,
  handleUpDelete,
  sortedByCnName,
  sortedByD20,
  sortedByDataSource,
  sortedByOilDate,
  sortedBySUL,
  sortedByTAN,
  searchOil,
  cutResult,
  checkSidingAndBody,
  copyScheme, importScheme, exportScheme, pageOutPutHtml, searchcutresultmainDetail, checkSiding
} from '../../api/qccut/scheme'
import {downloadXml} from "../../api/qccut/cutresultmain";
import {reportConfigure} from "../../api/qcduty/workoilassess";
import {errorMsgbox} from "@/api/global_variable";

export default {
  // name: '/qccut/scheme',
  components: {
    ReName,
    SchemeEdit
  },
  data() {
    return {
      loading: false,
      isSmall: this.$store.state.common.isSmall,
      formSize: this.isSmall ? 'mini' : 'small',
      schemaName: '',//方案名称

      btnList: [
        {
          icon: 'el-icon-caret-right',
          src: require('../../../public/img/icon/cut/disStart.png'),
          disSrc: require('../../../public/img/icon/cut/start.png'),
          text: '切割',
          color: '#409eff',
          isDis: false,
          click: () => this.cut()
        },
        {
          icon: 'el-icon-plus',
          src: require('../../../public/img/icon/cut/add.png'),
          disSrc: require('../../../public/img/icon/cut/disAdd.png'),
          text: '添加',
          color: '#409eff',
          isDis: true,
          click: () => this.edit(true)
        },
        {
          icon: 'el-icon-document-copy',
          src: require('../../../public/img/icon/cut/copy.png'),
          disSrc: require('../../../public/img/icon/cut/disCopy.png'),
          text: '复制',
          color: '#409eff',
          isDis: false,
          click: () => this.copy()
        },
        {
          icon: 'el-icon-edit',
          src: require('../../../public/img/icon/cut/edit.png'),
          disSrc: require('../../../public/img/icon/cut/disEdit.png'),
          text: '编辑',
          color: '#409eff',
          isDis: false,
          click: () => this.edit(false)
        },
        {
          icon: 'el-icon-edit',
          src: require('../../../public/img/icon/cut/rename.png'),
          disSrc: require('../../../public/img/icon/cut/disRename.png'),
          text: '重命名',
          color: '#409eff',
          isDis: false,
          click: () => this.rename()
        },
        {
          icon: 'el-icon-download',
          src: require('../../../public/img/icon/cut/export.png'),
          disSrc: require('../../../public/img/icon/cut/disExport.png'),
          text: '导入',
          color: '#478d28',
          isDis: false,
          click: () => this.importScheme()
        },
        {
          icon: 'el-icon-upload2',
          src: require('../../../public/img/icon/cut/import.png'),
          disSrc: require('../../../public/img/icon/cut/disImport.png'),
          text: '导出',
          color: '#478d28',
          isDis: true,
          click: () => this.exportScheme()
        },
        {
          icon: 'el-icon-delete',
          src: require('../../../public/img/icon/cut/del.png'),
          disSrc: require('../../../public/img/icon/cut/disDel.png'),
          text: '删除',
          color: '#ff4545',
          isDis: false,
          click: () => this.delScheme()
        }],
      schemaData: [],//方案列表
      tableHeight: '',
      alreadySchemeName: '',//已分析方案名称
      alreadyCut: false, // 已完成切割
      alreadySchemeId: '',// 已分析方案id
      selTempOilList: [], //暂时原油名称列表
      selectSchmaObj: {},//当前选中的方案
      selOilList: [],//选择的原油列表
      tempSchemeType: 1,//临时中间方案类型变量
      selOilNameList: [],//选择的原油名称
      currentIndex: 0,//当前默认选中的原油索引
      dialogShowObj: {
        reName: false,//重命名弹出框
        editScheme: false,//编辑方案弹出框
        isAddScheme: false//新增方案、编辑方案
      },
      styObj: { //iframe 样式对象
        width: '100%',
        height: '',
        border: '1px solid #d4d4d4',
        verticalAlign: 'middle'
      },
      srcdoc: "",//iframe url 地址
      reNameObj: {},
      editSchemeObj: {
        schemeName: '',
        schemeId: 0,
        schemeType: 0,
        note: '',
      },
      isShowOilSel: false,//是否显示切割弹出框
      diaOilName: '',//切割弹出框中原油名称
      pageInfo: { //分页配置
        pageIndex: 1,
        pageSize: 20,
        total: 0,
      },
      oilList: [],
      cutForbit: false,
      oilcodedisable: true,//原油编码是否可编辑
      radio: 1,//轻端等按钮的默认选择
      btnFlag:'',
      sectioncolumn: [],//馏分段列
      sectiondata: [],//馏分段数据
      lightdata: [],//轻端数据
      lightcolumn: [],//轻端列
      naphthadata: [],//石脑油数据
      naphthacolumn: [],//石脑油列
      tableheightleft: this.GLOBAL.defaultHeight - 110 + 'px',//rsim切割高度
      cutresultmainId: 0,//原油切割完成后返回的id
      objJson: {
        "wk_id": "",
        "cutresult_id": "173",
        "name": "",
        "code": "",
        "fileName": "simple",
        "fileType": "2"
      },
      oilTableHeight: '300px',
      isShowSchemeImport: false,//方案导入弹出框
      fileList: [],
      tableChecked:{},
      currentSchemeId:'',
      tooltipFlag:false,
      screenWidth:document.documentElement.clientWidth,
      noellipsis:''
    }
  },
  beforeMount() {

  },
  mounted() {
    this.loadSchemeList();
    this.setClientHight()
    //子组件也在使用 使用此方法可以解决
    window.addEventListener('resize', () => {
      this.screenWidth = document.body.clientWidth
      this.setClientHight()
    }, false)
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      let dom = document.getElementById('scheme')
      this.tableHeight = dom.offsetHeight - 151 + 'px'; //左侧盒子表格
      this.styObj.height = dom.offsetHeight - 114  + 'px'  //右侧盒子表格
    },
    //拖拽控制最小宽度
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    /**
     * 检测方案是否有效
     */
    checkSiding() {
      checkSiding(this.selectSchmaObj.schemeId).then(() => {
      })
    },

    /**
     * 加载方案列表
     */
    loadSchemeList() {
      getList(this.schemaName).then(res => {
        if (res.data.code != 200){
          return errorMsgbox(this,res.data.msg)
        }
        this.schemaData = res.data.data;
        if (this.schemaData.length > 0) {
          //加载进来默认选中第一行数据
          this.$nextTick(() => {
            this.$refs.schemeListTable.setCurrentRow(this.schemaData[0]);
            this.selectSchmaObj = this.schemaData[0];
            this.tempSchemeType = '';
            this.btnList.forEach(item => {
              item.isDis = true;
            })
          })
        } else {
          this.selectSchmaObj = {};
          this.btnList.forEach(item => {
            if (item.text == '添加' || item.text == '导入') {
              item.isDis = true;
            } else {
              item.isDis = false;
            }
          })
        }
      });
    },

    /**
     * 方案选中事件
     */
    selectSchema(row) {
      console.log(row,'///')
      this.tableChecked = row
      this.currentSchemeId=row.schemeId;
      // this.$refs.singleTable.setCurrentRow(row);
      console.log(row) //isDeleted选中的下标
      this.selectSchmaObj = row;
      this.selOilList = [];
      this.btnList.forEach(item => {
        item.isDis = true;
      })
    },
    /**
     * 切割后的原油切换事件
     */
    oilClick(index) {
      this.currentIndex = index;//
      this.$emit('tabClick', index);
      //根据原油ID加载下方详情列表
      this.searchcutresultmainDetail(this.selOilList[index].oilId);
    },
    //按钮的切换事件
    changeradio(val) {
      if (val == 1) {//馏分段
        this.$refs.sectiontable.doLayout();
      } else if (val == 2) {//轻端
        this.$refs.lighttable.doLayout();
      } else if (val == 3) {//石脑油
        this.$refs.naphthatable.doLayout();
      }
    },
    /**
     * 切割
     */
    cut() {
      if (this.selectSchmaObj.isDeleted == 1) {
        this.$message.warning("方案无效,请修改！");
        return false;
      }
      if (this.btnList[0].isDis) {
        this.isShowOilSel = true;
      }
      this.currentIndex = 0;//设置下标
      this.getOilList();
      this.tableListen();
    },
    tableListen() {
      let that = this;
      that.$nextTick(() => {
        let tableDom = that.$refs.oilList.bodyWrapper;
        tableDom.addEventListener('scroll', () => {
          let distance = tableDom.scrollHeight - tableDom.scrollTop - tableDom.clientHeight;
          if (distance <= 0) {
            that.scrollChange(tableDom);
          }
        })
      })
    },
    scrollChange(tableDom) {
      //滚动条与页面高度
      let scrollTop = tableDom.scrollTop;
      //可视化区域高度
      let curHeight = tableDom.clientHeight;
      //页面总高度
      let totalHeight = tableDom.scrollHeight;
      if (scrollTop + curHeight >= totalHeight) {
        for (let i = 0; i < this.pageInfo.total / this.pageInfo.pageSize + 1; i++) {
          this.pageInfo.pageIndex++
          this.getOilList(1);
        }
      }
    },
    /**
     * 加载原油列表
     */
    getOilList(type) {
      if (type === 1) {
        //根据原油名称懒加载模糊查询原油列表
        searchOil(this.diaOilName, this.pageInfo.pageIndex, this.pageInfo.pageSize).then(res => {
          if (res.data.code === 200) {
            res.data.data.records.forEach(item => {
              this.oilList.push(item);
            })
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      } else {
        this.pageInfo.pageIndex = 1;
        //根据原油名称模糊查询原油列表
        searchOil(this.diaOilName, this.pageInfo.pageIndex, this.pageInfo.pageSize).then(res => {
          if (res.data.code === 200) {
            this.oilList = res.data.data.records;
            this.pageInfo.total = res.data.data.total;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
            this.oilList = [];
          }
        });
      }
    },
    /**
     * 原油列表复选框监听事件
     */
    selectOilList(val) {
      this.cutForbit = val.length > 0 ? true : false;
      this.selOilList = val;//赋值
    },
    /**
     * 监听原油列表排序事件
     * @param val
     */
    sortChange(val) {
      switch (val.prop) {
        case 'cnName':
          sortedByCnName().then(res => {
            if (res.data.code != 200) {
              let that = this;
              return errorMsgbox(that, res.data.msg);
            }
            this.oillist = res.data.data;
          })
          break;
        case 'datasource':
          sortedByDataSource().then(res => {
            if (res.data.code != 200) {
              let that = this;
              return errorMsgbox(that, res.data.msg);
            }
            this.oillist = res.data.data;
          })
          break;
        case 'oilDate':
          sortedByOilDate().then(res => {
            if (res.data.code != 200) {
              let that = this;
              return errorMsgbox(that, res.data.msg);
            }
            this.oillist = res.data.data;
          })
          break;
        case 'd20':
          sortedByD20().then(res => {
            if (res.data.code != 200) {
              let that = this;
              return errorMsgbox(that, res.data.msg);
            }
            this.oillist = res.data.data;
          })
          break;
        case 'sul':
          sortedBySUL().then(res => {
            if (res.data.code != 200) {
              let that = this;
              return errorMsgbox(that, res.data.msg);
            }
            this.oillist = res.data.data;
          })
          break;
        case 'tan':
          sortedByTAN().then(res => {
            if (res.data.code != 200) {
              let that = this;
              return errorMsgbox(that, res.data.msg);
            }
            this.oillist = res.data.data;
          })
          break;
        default:
          break;
      }
    },
    /**
     * 原油切割
     */
    oilcut() {
      this.selOilList.forEach((item, index) => {
        if (index === 0) {
          this.oilids = item.oilId;
        } else {
          this.oilids = this.oilids + ',' + item.oilId;
        }
        this.selOilNameList.push(item.cnName);
      })
      this.isShowOilSel = false;
      this.loading = true;
      //根据选中的原油以及方案类型和方案ID进行切割
      cutResult(this.oilids, this.selectSchmaObj.schemeType, this.selectSchmaObj.schemeId).then(res => {
        if (res.data.code === 200) {
          this.tempSchemeType = this.selectSchmaObj.schemeType;
          if (res.data.data[1]) {//切割完成没有报错
            this.cutresultmainId = res.data.data[0];
            if (this.selectSchmaObj.schemeType == 1) {
              //获取html地址
              this.pageOutPutHtml()
            } else {
              //切割完成后默认选中第一条原油展示详细信息
              this.searchcutresultmainDetail(this.selOilList[0].oilId);
            }
          } else {
            alert("切割失败");
            this.selOilNameList = [];
            this.selOilList = [];
          }
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    //根据原油id进行默认加载请求数据
    searchcutresultmainDetail(oilId) {
      //默认加载原油相关详细信息(切割结果ID,原油ID)
      searchcutresultmainDetail(this.cutresultmainId, oilId).then(res => {
        if (res.data.code != 200){
          return errorMsgbox(this,res.data.msg)
        }
        this.loading = false;
        this.alreadySchemeName = this.selectSchmaObj.schemeName;
        this.alreadySchemeId = this.selectSchmaObj.schemeId;
        this.selTempOilList = this.selOilList;
        this.oilcodedisable = false;//按钮禁用状态取消
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
        this.$nextTick(() => {//渲染表格
          this.$refs.sectiontable.doLayout();
        })
      });
    },
    //获取输出html地址
    pageOutPutHtml() {
      this.oilcodedisable = false;//按钮禁用状态取消
      pageOutPutHtml(this.cutresultmainId).then(res => {
        this.loading = false;
        if (res.data.code === 200) {
          this.alreadySchemeName = this.selectSchmaObj.schemeName;
          this.alreadyCut = true;
          this.srcdoc = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    // 右侧切割结果导出
    exportFile() {
      this.reportConfigureIt = true;
      let cutresult_id = this.cutresultmainId;
      this.$set(this.objJson, "cutresult_id", cutresult_id);
      this.$set(this.objJson, "reportType", "3");
      this.styObj = {
        width: '95%',
        height: window.innerHeight * 0.65 + 'px'
      }
      reportConfigure(JSON.stringify(this.objJson)).then((res) => {
        //console.log(res.data);
        if (res.data.code === 200) {
          this.srcdoc = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    // 右侧导出excel
    downloadExcel() {
      let elemIF = document.createElement('iframe')
      // elemIF.src = 'http://localhost:1881/temp/DetailReportSample20210607133154_temp.xlsx'
      elemIF.src = this.srcdoc.replace(/html/, "xlsx")
      console.log(elemIF.src)
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF);
    },

    /**
     * 导出xml文件
     */
    exportXmlFile() {
      console.log(this.selTempOilList);
      this.selTempOilList.forEach(item => {
        //修改this.selectSchmaObj.schemeId 还有上面的selOilList正确导出xml
        downloadXml(item.oilId, this.alreadySchemeId).then(res => {
          const content = res.data;
          const blob = new Blob([content], {type: 'application/xml'});
          let fileName = window.decodeURI(item.cnName, "UTF-8");
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
    /**
     * 编辑 val = false 添加 true
     */
    edit(val) {
      this.btnFlag = val
      // console.log(this.btnFlag)
      if (this.btnList[3].isDis) {
        this.dialogShowObj.editScheme = true;
      }
      this.dialogShowObj.isAddScheme = val;
      if (val) { //新增方案
        this.dialogShowObj.editScheme = true;//注掉不会弹窗
        this.editSchemeObj = {
          schemeName: '',
          schemeId: 0,
          schemeType: 0,
          note: '',
        }
        console.log(this.editSchemeObj,'/this.editSchemeObj')
      } else {
        this.editSchemeObj = JSON.parse(JSON.stringify(this.selectSchmaObj));
      }
    },
    /**
     * 添加方案信息
     * @param val
     */
    addSchemeInfo(val) {
      if (val) {
        this.loadSchemeList();
      }
    },
    //完成事件
    finishScheme(obj){
      // console.log(obj)
      if(obj.flag){
        this.dialogShowObj.editScheme = false;
        //检测是否有效
        checkSidingAndBody(obj.Id).then(res=>{
          console.log(res)
          if(res.data.code === 200){
            this.loadSchemeList()//刷新左侧列表
            getList(this.schemaName).then(res => {
              if(res.data.code==200){
                this.schemaData = res.data.data;
                this.$nextTick(()=>{
                  this.$refs.schemeListTable.setCurrentRow(this.schemaData[this.schemaData.length-1]);
                  // console.log(this.selectSchmaObj,this.schemaData[this.schemaData.length-1])
                  this.selectSchmaObj = this.schemaData[this.schemaData.length-1]
                  this.currentSchemeId = this.schemaData[this.schemaData.length-1].schemeId
                  this.selectSchmaObj.schemeId = this.schemaData[this.schemaData.length-1].schemeId
                })
              }else {
                return errorMsgbox(this,res.data.msg)
              }

            });
          }
        })
      }else {
        console.log('编辑')
        this.dialogShowObj.editScheme = false;
        //检测是否有效
        checkSidingAndBody(this.selectSchmaObj.schemeId).then(res=>{
          console.log(res)
          if(res.data.code === 200){
            // this.loadSchemeList()//刷新左侧列表
            this.EchoRefresh()
          }else {
            return errorMsgbox(this,res.data.msg)
          }
        })
      }
    },
    //刷新左侧列表 用于回显单独处理
    EchoRefresh(){
      let tempIndex=this.schemaData.findIndex(item=>item.schemeId===this.currentSchemeId)+1

      getList(this.schemaName).then(res => {
        if(res.data.code==200){
          this.schemaData = res.data.data;
          if(tempIndex>this.schemaData.length){
            this.$nextTick(()=>{
              this.$refs.schemeListTable.setCurrentRow(this.schemaData[0]);
              this.selectSchmaObj.schemeId = this.schemaData[0].schemeId
              this.currentSchemeId = this.schemaData[0].schemeId
              this.selectSchmaObj = this.schemaData[this.schemaData.length-1]
            })
          }else {
            this.$nextTick(()=>{
              this.$refs.schemeListTable.setCurrentRow(this.schemaData[tempIndex-1]);
              this.currentSchemeId = this.schemaData[tempIndex-1].schemeId
              this.selectSchmaObj.schemeId = this.schemaData[tempIndex-1].schemeId
              this.selectSchmaObj = this.schemaData[this.schemaData.length-1]
            })
          }

        }else {
          return errorMsgbox(this,res.data.msg)
        }

      });
    },
    /**
     * 编辑方案弹出框关闭事件
     * @param val
     */
    handleClose(val){
      this.dialogShowObj.editScheme = false;
      if(val){
        getList(this.schemaName).then(res => {
          if(res.data.code==200){
            this.schemaData = res.data.data;
            console.log(this.currentSchemeId)
            let tempIndex=this.schemaData.findIndex(item=>item.schemeId===this.currentSchemeId);
            this.$nextTick(()=>{
              this.$refs.schemeListTable.setCurrentRow(this.schemaData[tempIndex]);
            })
          }else {
            return errorMsgbox(this,res.data.msg)
          }

        });
      }

    },
    /**
     * 复制
     */
    copy() {
      if (this.btnList[2].isDis) {
        const loading = this.$loading({
          lock: true,
          text: '复制中,请稍后...',
          spinner: 'el-icon-loading',
        });
        copyScheme(this.selectSchmaObj.schemeId).then(res => {
          loading.close();
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.loadSchemeList();
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      }
    },
    /**
     * 重命名
     */
    rename() {
      if (this.btnList[4].isDis) {
        this.dialogShowObj.reName = true;
        this.reNameObj = JSON.parse(JSON.stringify(this.selectSchmaObj));
      }
    },
    /**
     * 重命名关闭事件
     * @param val
     */
    closeDiaReName(val) {
      this.dialogShowObj.reName = false;
      if (val) {
        this.loadSchemeList();
      }
    },
    /**
     * 导入
     */
    importScheme() {
      this.isShowSchemeImport = true;
      // this.$refs.upload.clearFiles();
      this.fileList = [];
    },
    uploadfiles(file) {
      this.fileList.push(file.file);
    },
    /**
     * 监听上传成功事件
     * @param response
     * @param file
     * @param fileList
     */
    handleFileSuccess(response, file, fileList) {
      this.$refs.refForm.clearValidate('files');
    },
    /**
     * 确认导入
     */
    confirmImport() {
      this.$refs.upload.submit();
      let that = this;
      let upData = new FormData();// FormData 对象
      that.fileList.forEach(function (file) {
        upData.append('schemeXml', file);
      })
      if (that.fileList.length == 0){
        return that.$alert('请添加需要导入的文件','提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
      const loading = that.$loading({
        lock: true,
        text: '导入中,请稍等...',
        spinner: 'el-icon-loading',
      });
      importScheme(upData).then(res => {
        this.$refs.upload.clearFiles();
        loading.close();
        if (res.data.code === 200) {
          that.isShowSchemeImport = false;
          that.$message.success(res.data.msg);
        } else {
          errorMsgbox(this, res.data.msg);
          that.fileList = [];
        }
        that.loadSchemeList();
      })
      setTimeout(() => {
        loading.close();
      }, 3000);
    },
    /**
     * 导出
     */
    exportScheme() {
      if (this.btnList[6].isDis) {
        const loading = this.$loading({
          lock: true,
          text: '导出中,请稍等...',
          spinner: 'el-icon-loading',
        });
        exportScheme(this.selectSchmaObj.schemeId).then(res => {
          loading.close()
          const content = res.data;
          const blob = new Blob([content], {type: 'hxml/xml'});
          let fileName = window.decodeURI(this.selectSchmaObj.schemeName + '.hxml', "UTF-8");
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
            loading.close()
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
        setTimeout(() => {
          loading.close();
        }, 5000);
      }
    },
    /**
     * 删除
     */
    delScheme() {
      if (this.btnList[7].isDis) {
        if (!this.selectSchmaObj.schemeId) {
          this.$message.warning("请选择一条数据！");
        } else {
          this.$confirm("确定删除该方案?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            handleUpDelete(this.selectSchmaObj.schemeId).then((res) => {
              if (res.data.code == 200){
                this.$message.success(res.data.msg);


                this.EchoRefresh()


              }
            })
          })
        }
      }
    }
  },
  watch: {
    isSmall() {
      this.isSmall = this.$store.state.common.isSmall;
      this.formSize = this.isSmall ? 'mini' : 'small';
      return this.$store.state.common.isSmall;
    },
    screenWidth(){
      // console.log(this.screenWidth,'1600')
      if(this.screenWidth<=1904){
          // this.tooltipFlag = true
          this.noellipsis = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;'
      }else if(this.screenWidth>1904) {
        // this.tooltipFlag = false
        this.noellipsis = ''
      }
      // console.log(this.noellipsis)
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .el-dialog__body {
  padding: 10px 20px !important;
}

/deep/ .el-upload-dragger {
  width: 560px;
}

/deep/ .el-upload__tip {
  color: red;
}
/*@media screen and (min-width: 1300px) and (max-width: 1680px) {*/
/*  .noellipsis{*/
/*    overflow:hidden;*/
/*    text-overflow:ellipsis;*/
/*    white-space:nowrap;*/
/*  }*/
/*  !*.tooltipFlag1{*!*/
/*  !*  display: none !important;*!*/
/*  !*}*!*/
/*  !*.tooltipFlag2{*!*/
/*  !*  display: block !important;*!*/
/*  !*}*!*/
/*}*/

/*.tooltipFlag1{*/
/*  display: block;*/
/*}*/
/*.tooltipFlag2{*/
/*  display: none;*/
/*}*/
@media screen and (min-width: 1366px) and (max-width: 1919px) {

  .btnItem {
    margin: 0px 2px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    vertical-align: middle;

    i {
      /*font-size: 16px;*/
      vertical-align: middle;
      margin: 0 auto;
    }

    img {
      /*font-size: 16px;*/
      vertical-align: middle;
      margin: 0 auto;
    }

    span {
      font-size: 12px;
      margin-top: 8px;
      vertical-align: middle;
      text-align: center;
    }
  }
}

@media screen and (max-width: 1920px) {
  .btnItem {
    margin: 0px 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    vertical-align: middle;

    i {
      /*font-size: 16px;*/
      vertical-align: middle;
      margin: 0 auto;
    }

    img {
      /*font-size: 16px;*/
      vertical-align: middle;
      margin: 0 auto;
    }

    span {
      font-size: 12px;
      margin-top: 8px;
      vertical-align: middle;
      text-align: center;
    }
  }
}


.tab-control {
  overflow-x: scroll;
  overflow-y: hidden;
  display: -webkit-inline-box;
  font-size: 14px;
  background-color: #fff;
  //line-height: 35px;
  margin-top: -5px;
}

.tab-control-item div {
  line-height: 32px;
  display: inline-block;
  padding: 0 5px;
  cursor: pointer;
}

.active {
  color: #409EFF
}

  #scheme {
    height: 100%;
  }

</style>
