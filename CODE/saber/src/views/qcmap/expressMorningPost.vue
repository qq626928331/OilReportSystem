<template>
  <div>
    <el-card>
      <el-form :inline="true" size="small">
        <el-form-item label="日期：">
          <el-date-picker
            v-model="queryDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el-icon-search" @click="search"> 查询</el-button>
        </el-form-item>
        <el-form-item style="padding-left: 10px;">
          <el-button type="primary" class="el-icon-printer"  @click="doPrint"> 打印</el-button>
        </el-form-item>
        <el-form-item style="padding-left: 10px;">
          <el-button type="primary" class="el-icon-download"  @click="downloadExcel"> 导出</el-button>
        </el-form-item>

        <!--        <input id="document" type="file"/>-->
        <!--        <div v-html="vHtml"></div>-->

      </el-form>
    </el-card>
    <el-card :style="{'margin-top': '10px','overflow-y': 'auto','height':ifaDivHeight}" class="card">
      <div :style="{'width': '53%', 'margin': '0 auto','height':ifaHeight,'background-color':'white'}">
        <iframe height="100%" id="iframe" align="center" scrolling="no" :src="src"
                :style="{'width': '100%','border': 'none'}"></iframe>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getToday} from "../../util/date";
import {detailReportReport} from "../../api/qcmap/expressMorningPost";
import mammoth from 'mammoth'
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "/qcmap/expressMorningPost",
  data() {
    return {
      queryDate: '',
      src: '',
      ifaHeight: '',
      loading: true,
      ifaDivHeight: '',
      vHtml: ''
    }
  },
  created() {

  },
  mounted() {
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)

    this.queryDate = getToday();
    this.detailReportReportApi();

    // document.getElementById('document').addEventListener('change', this.uploading, false);

  },
  methods: {
    // 设置页面高度
    setClientHight(){
      this.ifaDivHeight = window.innerHeight - 60 - 40 - 40 - 50 + 'px';
      this.ifaHeight = '1400px';
    },
    uploading(event) {
      const that = this
      let file = event.target.files[0] // 获取文件
      let reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = function (e) {
        const buffer = e.target.result // 此时是arraybuffer类型
        mammoth.convertToHtml({arrayBuffer: buffer}).then((result) => {
          console.log(result)
          that.vHtml = result.value
        }).done()
      }
    },
    //查询
    search() {
      this.loading = true
      this.detailReportReportApi()
    },
    /**
     * 快评日报获取html地址
     */
    detailReportReportApi() {
      detailReportReport(this.queryDate).then(res => {
        if (res.data.code === 200) {
          this.loading = false
          this.src = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    /**
     * 打印
     */
    doPrint() {
      const iframe = document.getElementById('iframe');
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    },
    /**
     * 导出
     */
    downloadExcel() {
      let elemIF = document.createElement('iframe')
      elemIF.src = this.src.replace(/html/, "xlsx")
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF);
    }
  },
  // watch: {
  //   queryDate() {
  //     console.log(2)
  //     let host = window.location.href.split('/#')[0]
  //     this.src = host + '/temp/快评日报(' + this.queryDate + ').html'
  //   },
  // }
}
</script>

<style scoped>
/deep/ .card .el-card__body {
  display: flex !important;
  justify-content: center !important;
  /*height: 1420px;*/
  margin-bottom: 30px;

}

.card{
  background: url("../../assets/images/pages/kprbBG.png")
}

/deep/ .el-form-item, .el-form-item {
  margin-bottom: 0px !important;
}

</style>
