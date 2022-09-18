<template>
  <div id="olidDetail">
    <div :style="note" v-loading="load"
         element-loading-text="请稍候..." element-loading-spinner="el-icon-loading">
      <basic-container>
        <avue-crud :option="option"
                   :table-loading="loading"
                   :data="data"
                   :page.sync="page"
                   :permission="permissionList"
                   :before-open="beforeOpen"
                   v-model="form"
                   ref="crud"
                   @header-dragend="headerDragend"
                   @search-change="searchChange"
                   @row-click="handleSelectmatterpro"
                   @search-reset="searchReset"
                   @selection-change="selectionChange"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @refresh-change="refreshChange"
                   @on-load="onLoad"
                   :style="tableheight">
          <template slot="menuLeft">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-download"
                       @click="handleFile">标准油导入
            </el-button>
            <el-button type="primary"
                       size="small"
                       icon="el-icon-download"

                       @click="handleFile_qd">轻端导入
            </el-button>
            <el-button type="primary"
                       size="small"

                       @click="handleStandard"><img src="/icon/btn_biaozhunpingjia.png"
                                                    style="width: 10px;height:10px; margin-right:6px;"/>标准详评
            </el-button>
            <el-button type="primary"
                       size="small"

                       @click="handleLightEnd"><img src="/icon/btn_qingduanpingjia.png"
                                                    style="width: 10px;height:10px; margin-right:6px;"/>轻端数据
            </el-button>
            <el-button type="danger"
                       size="small"
                       icon="el-icon-delete"
                       plain
                       v-if="permission.detailbase_delete"
                       @click="handleDelete">删 除
            </el-button>
          </template>
          <!--        <template slot=""></template>-->
        </avue-crud>
      </basic-container>
      <el-dialog
        title="文件导入"
        :visible.sync="FileImport"
        :before-close="FileImportClose"
        :append-to-body="true" width="25%">
        <el-radio-group v-model="databaseType">
          <el-radio label="原油标准库">原油标准库</el-radio>
          <el-radio label="原油用户库">原油用户库</el-radio>
        </el-radio-group>
        <el-upload
          class="upload-demo"
          style="margin-top:15px;"
          ref="uploadFile"
          :multiple="false"
          :auto-upload="false"
          action="#"
          :http-request="uploadfiles"
          :file-list="fileList"
          :limit="1"
          :before-remove="beforeRemove"
          :before-upload="beforeAvatarUpload"> <!--上文文件的列表-->
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>

        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="FileImportClose">取 消</el-button>
        <el-button size="small" type="primary" @click="submitUpload">确 定</el-button>
      </span>
      </el-dialog>

      <el-dialog
        title="文件导入"
        :visible.sync="FileImport_qd"
        :before-close="FileImportClose_qd"
        :append-to-body="true" width="25%">

        <el-upload
          class="upload-demo" style="margin-top:15px;"
          ref="uploadFileqd"
          multiple
          :auto-upload="false"
          action="#"
          :http-request="uploadfiles2"
          :file-list="fileList2"
          :limit="1"
          :before-remove="beforeRemove"
          :before-upload="beforeAvatarUpload"> <!--上文文件的列表-->
          <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>

        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="FileImportClose_qd">取 消</el-button>
        <el-button size="small" type="primary" @click="submitUpload_qd">确 定</el-button>
      </span>
      </el-dialog>


      <!--动态表头dialog-->
      <el-dialog
        title="标准详评"
        :visible.sync="testloading"
        :before-close="TesthandleClose"
        :append-to-body="true"
        width='75%'>
        <!--label随意-->
        <!--prop的值决定如何匹配-->
        <!--testheader 表头数据item中方 label为显示的文字，希望展示哪个属性，就让prop与testbody中元素的哪个属性的key一致-->
        <!--testbody 表体数据 元素的属性的key与表头的prop字符串一致时就会展示元素的属性的value-->
        <div id="cutResultId">
          <el-table
            :data="testbody"
            border v-loading="testload"
            element-loading-text="加载中..."
            style="margin-top: -25px;margin-bottom: -12px"
            @header-dragend="headerDragend"
            :height="tableHeight"
            size="small">
            <!--            <template slot="empty">-->
            <!--              <p>{{ dataText }}</p>-->
            <!--            </template>-->
            <el-table-column
              v-for="(item,index) in testheader"
              :fixed="index==0||index==1"
              :key="index"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              align="center">
              <template slot="header" slot-scope="scope">
                <span>{{ item.label }}</span> <br> <span>{{ item.unit }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <!--轻端及石脑油弹窗-->

      <el-dialog
        title="轻端详评"
        :visible.sync="LightEndDialog"
        :before-close="LightEndhandleClose"
        :append-to-body="true">
        <el-table class="el-table"
                  :data="LightEndtableData"
                  border v-loading="lightloading"
                  element-loading-text="加载中..."
                  max-height="450"
                  height="450"
                  @header-dragend="headerDragend"
                  size="small">
          <template slot="empty">
            <p>{{ dataText }}</p>
          </template>
          <el-table-column
            v-for="(item,index) in LightEndtableDataheader"

            :fixed="index==0||index==1"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            align="center">
          </el-table-column>
        </el-table>
        <div align="right" style="margin-bottom: -20px">
          <span>共 {{ maxXH }} 条</span>
        </div>

      </el-dialog>

    </div>
  </div>
</template>

<script>
import {Loading} from 'element-ui';
import {getList, getDetail, remove, oilBaseDetail, oilBaseDetail_qd} from "@/api/qcadmin/oildetailbase";
import {upload, upload_qd} from "@/api/qcadmin/fileupload"
import {mapGetters} from "vuex";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name:'/qcadmin/oildetailbase',
  data() {
    return {
      load: false,
      note: {
        // backgroundImage:"url("+require('../../../public/html814_/image/bg.jpg')+")",
        backgroundRepeat: "no-repeat",
        margin: "0px",
        height: '96%',
      },
      tableHeight: 450,
      videoUploadPercent: 0,
      videoFlag: false,
      tableheight: "",//表格高度
      databaseType: '原油标准库',
      fileList: [],
      fileList2: [],
      testheader: [],//表头
      testbody: [],
      testdata: [],
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        pageSizes: [20, 30, 50, 100],
      },
      selectionList: [],
      option: {
        height: 'auto',
        calcHeight: 23,
        align: 'center',
        tip: false,
        searchShow: true,
        searchMenuSpan: 4,
        border: true,
        index: true,
        indexLabel: '序号',
        viewBtn: true,
        selection: true,
        searchSize: 'small',
        dialogClickModal: false,
        searchBtnText: "查询",
        menu: false,
        column: [
          {
            label: "中文名称",
            prop: "cnName",
            overHidden: true,
            // minWidth: 160,
            width: 183,
            search: true,
            rules: [{
              required: true,
              message: "请输入中文名称",
              trigger: "blur"
            }]
          },
          {
            label: "生产产地",
            prop: "country",
            overHidden: true,
            minWidth: 130,
            rules: [{
              required: true,
              message: "请输入生产产地",
              trigger: "blur"
            }]
          },
          {
            label: "所在地区",
            prop: "location",
            overHidden: true,
            minWidth: 130,
            rules: [{
              required: true,
              message: "请输入所在地区",
              trigger: "blur"
            }]
          },
          {
            label: "原油编码",
            prop: "oilCode",
            overHidden: true,
            minWidth: 100,
            rules: [{
              required: true,
              message: "请输入原油编码",
              trigger: "blur"
            }]
          },
          {
            label: "评价日期",
            prop: "oilDate",
            overHidden: true,
            type: "date",
            format: "yyyy-MM-dd",
            minWidth: 100,
            rules: [{
              required: true,
              message: "请输入评价日期",
              trigger: "blur"
            }]
          },
          {
            label: "生产日期",
            prop: "enterDate",
            overHidden: true,
            type: "date",
            format: "yyyy-MM-dd",
            minWidth: 100,
            rules: [{
              required: true,
              message: "请输入生产日期",
              trigger: "blur"
            }]
          },
          {
            label: "来源",
            prop: "datasource",
            overHidden: true,
            minWidth: 100,
            rules: [{
              required: true,
              message: "请输入来源",
              trigger: "blur"
            }]
          },
          {
            label: "类型",
            prop: "dbType",
            overHidden: true,
            width: 100,
            rules: [{
              required: true,
              message: "请输入库类型",
              trigger: "blur"
            }]
          },
          {
            label: "入库时间",
            prop: "updateTime",
            overHidden: true,
            minWidth: 140,
            rules: [{
              required: true,
              message: "请输入入库时间",
              trigger: "blur"
            }]
          },
        ]
      },
      data: [],
      StandardDialog: false,
      testloading: false,
      LightEndDialog: false,//轻端及石脑油弹窗是否显示
      FileImport: false,//文件导入弹窗是否显示
      FileImport_qd: false,//文件导入弹窗是否显示
      //m?hcf=admin/Business_management/oil_database/select_fitting_result&oil_id=' + oil_id_text
      //m?hcf=admin/Business_management/oil_database/select_fitting_result_select&oil_id={#oil_id#}
      //'select * from   ' +table_name +' order by   if(馏分段=\'IBP-FBP\',-10000 ,RIGHT (馏分段, 3)) ASC ,left(馏分段, 3)'
      //table 的资源表是啥？

      LightEndtableData: [],
      LightEndtableDataheader: [],
      testload: true,//加载中
      lightloading: true,
      dataText: '',
      maxXH: ''//最大序号
    };
  },
  mounted() {
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)
  },
  watch: {
    /** 渲染速度慢关闭
     * 监控表格的数据testdata，自动设置表格宽度
     * @param valArr
     */
    // testbody(valArr) {
    //   const _this = this;
    //   this.testheader = this.testdata[1].map(function (value) {
    //     const arr = valArr.map(x => x[value.prop]) ; // 获取每一列的所有数据
    //     arr.push(value.label); // 把每列的表头也加进去算
    //     arr.push(value.unit); // 把每列的单位也加进去算
    //     value.width = _this.getMaxLength(arr) + 20; // 每列内容最大的宽度 + 表格的内间距(依据实际情况而定)
    //     return value;
    //   })
    // }
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(false),
        viewBtn: this.vaildData(this.permission.detailbase_view, false),
        delBtn: this.vaildData(this.permission.detailbase_delete, false),
        editBtn: this.vaildData(this.permission.detailbase_edit, false)
      };
    },
    ids() {//拼装id
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.oilId);
      });
      return ids.join(",");
    }
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      this.tableheight = "height:" + (window.innerHeight - 140) + "px;overflow:hidden;";
      if (window.innerWidth != 1366) {
        this.tableHeight = 650;
      }
    },
    headerDragend(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    /** 前端渲染速度慢 关闭
     * 遍历列的所有内容，获取最宽一列的宽度
     * @param arr
     */
    // getMaxLength (arr) {//
    //   return arr.reduce((acc, item) => {
    //     if (item) {
    //       let calcLen = this.getTextWidth(item)
    //       if (acc < calcLen) {
    //         acc = calcLen
    //       }
    //     }
    //     return acc
    //   }, 0)
    // },
    /** 前端渲染速度慢 关闭
     * 使用span标签包裹内容，然后计算span的宽度 width： px
     * @param valArr
     */
    // getTextWidth(str) {
    //   let width = 0;
    //   let html = document.createElement('span');
    //   html.innerText = str;
    //   html.className = 'getTextWidth';
    //   document.querySelector('body').appendChild(html);
    //   width = document.querySelector('.getTextWidth').offsetWidth;
    //   document.querySelector('.getTextWidth').remove();
    //   return width;
    // },
    //移除文件前钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //原油数据库删除
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load = true;
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.load = false;
          this.$refs.crud.toggleSelection();
        });
    },
    //取消选中
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    handleSelectmatterpro(row) {
      this.selectionList = [];
      this.selectionList.push(row)
      this.selectionClear();
      this.$refs.crud.toggleSelection([row]);
    },
    //标准油导入弹出
    handleFile() {
      this.FileImport = true;
    },
    //轻端导入弹出
    handleFile_qd() {
      this.FileImport_qd = true;
    },
    //标准详评导出
    handleStandard() {
      if (this.selectionList.length === 1) {
        this.testloading = true;
        oilBaseDetail(this.selectionList[0]['oilId']).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.testdata = res.data.data;
          console.log('标准详评返回数据源', this.testdata)
          // 在这里将后台返回的列表头数据直接放到之前定义好的header数组中
          this.testheader = this.testdata[1];
          this.testheader.forEach(item => {
            if (item.label.includes("(")) {
              item.unit = item.label.split("(")[1].split(")")[0]
              item.label = item.label.split("(")[0]
            } else {
              item.unit = ''
            }
          })
          this.testdata[0].map(item => {
            for (let v in item) {
              if (Number(item[v]) >= 10000000) {
                this.$set(item, v, Number(item[v]).toExponential([5]).toUpperCase())
              }
            }
          });
          this.testbody = this.testdata[0]
          this.testload = false;
          this.$nextTick(function () {
            document.getElementById('cutResultId').children[0].getElementsByClassName('el-table__fixed')[0].setAttribute('style', 'height: auto !important;width: 160px;bottom:7px;');
          })
          //  console.warn("testbody:"+JSON.stringify(this.testbody))
        });
      } else {
        this.$message.warning("请选择 1 条需要查看详评的原油！");
        return;
      }
    },
    //轻端详评导出
    handleLightEnd() {
      if (this.selectionList.length === 1) {
        this.LightEndDialog = true;
        oilBaseDetail_qd(this.selectionList[0]['oilId']).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.testdata = res.data.data;
          // 在这里将后台返回的列表头数er据直接放到之前定义好的header数组中
          this.LightEndtableDataheader = this.testdata[1];
          this.LightEndtableData = this.testdata[0];
          this.lightloading = false;
          this.maxXH = this.LightEndtableData[this.LightEndtableData.length - 1].xh
        });
      } else {
        this.$message.warning("请选择 1 条需要查看详评的原油！");
        return;
      }
    },
    //标准油导入弹框关闭
    FileImportClose() {
      this.FileImport = false;
    },
    //轻端导入弹框关闭
    FileImportClose_qd() {
      this.FileImport_qd = false;
    },
    //弹框关闭
    StandardhandleClose() {
      this.StandardDialog = false;
    },
    //标准详评弹框关闭
    TesthandleClose() {
      this.testload = true;
      this.testloading = false;
    },
    //轻端详评弹框关闭
    LightEndhandleClose() {
      this.LightEndDialog = false;
    },
    //编辑、查看操作赋值（done：结束参数；type：类型）
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
      }
      done();
    },
    //重置选择
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    //分页查询（params: 分页数据；done：结束参数）
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    //切换选择（list：选择数据）
    selectionChange(list) {
      this.selectionList = list;
    },
    //清空已选
    // selectionClear() {
    //   this.selectionList = [];
    //   this.$refs.crud.toggleSelection();
    // },
    //切换到当前页（currentPage：当前页）
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      let table = document.getElementsByClassName('el-table--scrollable-y')[0]
      let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
      if(table && tableBody){
        table.scrollTop = 0
        tableBody.scrollTop = 0
      }
    },
    //切换到最后一页（pageSize：页码）
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    //刷新页面
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    //初始加载装置（page：分页对象；params：分页数据对象）
    onLoad(page, params = {}) {
      this.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        const data = res.data.data;
        this.page.total = data.total;
        data.records.forEach((item) => {
          item.id = item.oilId
        })
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
    beforeAvatarUpload(file) {//上传文件之前的判断，大小以及文件格式
      /*console.log(file.type);
      const isxls = file.type === 'xls';
      const isxlsx = file.type === 'xlsx';
      if (!isxls) {
        this.$message.error('上传文件只能是 xls/xlsx 格式!');
      }
      if (!isxlsx) {
        this.$message.error('上传文件只能是 xls/xlsx 格式!');
      }
      return isxls&&isxlsx;*/

    },
    uploadfiles(file) {//上传文件
      this.load = true;
      let fd = new FormData();
      fd.append('file', file.file);
      fd.append('dbtype', this.databaseType);
      upload(fd).then(res => {
        this.load = false;
        this.refreshChange();
      });
    },
    //上传文件提交
    submitUpload() {
      this.$refs.uploadFile.submit();
      this.$refs.uploadFile.clearFiles();
      this.FileImport = false;
    },

    beforeAvatarUpload2(file) {//上传文件之前的判断，大小以及文件格式
      /*console.log(file.type);
      const isxls = file.type === 'xls';
      const isxlsx = file.type === 'xlsx';
      if (!isxls) {
        this.$message.error('上传文件只能是 xls/xlsx 格式!');
      }
      if (!isxlsx) {
        this.$message.error('上传文件只能是 xls/xlsx 格式!');
      }
      return isxls&&isxlsx;*/

    },
    uploadfiles2(file) {//上传文件
      this.load = true;
      let fd = new FormData();
      fd.append('file', file.file);
      upload_qd(fd).then(res => {
        this.load = false;
        this.refreshChange();
      });
    },
    //上传文件提交
    submitUpload_qd() {
      this.$refs.uploadFileqd.submit();
      this.$refs.uploadFileqd.clearFiles();
      this.FileImport_qd = false;
    },
  }
};
</script>
<style lang="scss" scoped>
body {
  /deep/ .el-table th.gutter {
    display: table-cell !important;
    width: 8px !important;
  }
}
</style>
<style scoped="scoped" lang="scss">
/*.el-table__fixed {*/
/*  height: 99% !important;*/
/*}*/

/deep/ .avue-crud__right {
  display: none;
}

#olidDetail .avue-crud__search {
  z-index: 99;
  right: 33px;
  position: absolute;
  margin-top: -2px;
  /*width: 1000px;*/
}

#olidDetail .el-input {
  /*width: 183px;*/
}

#olidDetail .avue-form__menu {
  width: 225px;
}

#olidDetail .el-form-item__content {
  text-align: right;
}

#olidDetail .el-col-md-6 {
  width: 54%;
}

#olidDetail .avue-crud__right {
  z-index: 99;
  opacity: 0;
  display: none;
}

/deep/ .el-dialog__header {
  /*width: 912px ;*/
  padding-top: 7px;
  margin: 0 -8px;
}

/deep/ .el-dialog__headerbtn {
  top: 9px;
  right: 17px;
}

/deep/ .el-dialog .el-table {
  margin-top: -25px;
}

/deep/ #cutResultId  .el-table__fixed {
  .el-table {
    .el-table__fixed {
      height: auto !important;
      bottom: 17px !important;
    }
  }
}

/deep/  #cutResultId .el-table__body-wrapper {
  z-index: 2;
}

</style>
