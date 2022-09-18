<template>
  <div id="preview">
    <div class="content">
      <div class="info"></div>
      <div class="main-table">
        <div class="table-head" id="table-head">
          <!--                字母-->
          <table>
            <tr>
              <th></th>
              <th  v-for="(row,index) in rowHead" :key="index">{{row.cellName}}
              </th>
            </tr>
          </table>
        </div>
        <div class="table-left-and-body">
          <div class="table-left" id="table-left">
            <table>
              <tr v-for="(col, index) in colHead" :key="index">
                <td class="left-index">{{col.cellName}}</td>
              </tr>
            </table>
          </div>
          <div class="table-body" id="table-body">
            <table style="table-layout: fixed;">
              <tbody>
              <tr v-for="(item1, index1) in datasExcel" :key="index1">
                <td  class="cell-td" style="background-color: white;" v-for="(item0,index0) in item1"
                     :id="item0.x+'-'+item0.y" :key="item0.x+'-'+item0.y"
                >
                  <div>
                    {{item0.cellName==='-'?'':item0.cellName}}
                    <!-- <div @mouseover="mouseenterHander(item0,datasExcel)" @mouseout="mouseoutHander(item0,datasExcel)">
                      <div v-if="item0.cellName.length > 6">
                        {{ item0.cellName.substr(0, 6) }}...
                      </div>
                      <div v-else>
                        {{item0.cellName==='-'?'':item0.cellName}}
                      </div>
                    </div>
                    <div class="dpop" title="弹框" v-if="item0.showFullName">
                      <template>
                        {{item0.cellName}}
                      </template>
                    </div> -->
                  </div>
                  <!--                  横向的dragger-->

                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Utils from "@/api/tuozhuai/callUtils";
  import {mapState} from "vuex";
  import {
    getExcelDatas_yulan
  } from "@/api/tuozhuai/excelcell";
  export default {
    // 接受父组件的值
    props: ["datas_yulan"],

    name: 'preview',
    data() {
      return {
        sheetId: '',
        rowHead: [],
        colHead: [],
        datasExcel: []
      }
    },
    computed: {
      ...mapState('tuoye', ['datasExcel', 'rowHead', 'colHead','sheetId'])
    },
    watch: {



      DatasExcel(datasExcel) {
        console.warn("yulan  106")
        // 监听mapState中的变量，当数据变化（有值、值改变等），
        // 保证能拿到完整的数据，不至于存在初始化没有数据的问题，然后可以赋给本组件data中的变量
        this.datasExcel = datasExcel;
      },
      RowHead(rowHead) {
        // 监听mapState中的变量，当数据变化（有值、值改变等），
        // 保证能拿到完整的数据，不至于存在初始化没有数据的问题，然后可以赋给本组件data中的变量
        this.rowHead = rowHead;
      },
      SheetId(sheetId) {
        // 监听mapState中的变量，当数据变化（有值、值改变等），
        // 保证能拿到完整的数据，不至于存在初始化没有数据的问题，然后可以赋给本组件data中的变量
        this.sheetId = sheetId;
      },
      ColHead(colHead) {
        // 监听mapState中的变量，当数据变化（有值、值改变等），
        // 保证能拿到完整的数据，不至于存在初始化没有数据的问题，然后可以赋给本组件data中的变量
        this.colHead = colHead;
      },

    },
    updated() {
      console.log( "updated:");

    },
    beforeUpdate() {
      console.log( "beforeUpdate:");

    },
    created() {
      console.log( "created:");

    },
    mounted() {
      // var that = this;
      // Utils.$on('initpreviewData',(msg)=>{
      //   that.initpreviewData();
      // })
      console.log( "mounted:");
      this.initpreviewData()

    },
    methods: {
      initpreviewData() {
        //取值
        // this.datasExcel = this.$route.params.datasExcel;
        // this.rowHead = this.$route.params.rowHead;
        // this.colHead = this.$route.params.colHead;
        // // this.sheetId = this.$route.params.sheetId;
        console.log( "initpreviewData:");
        console.log( this.datas_yulan);
        this.datasExcel = this.datas_yulan.datasExcel_yulan;
        this.rowHead = this.datas_yulan.rowHead_yulan;
        this.colHead = this.datas_yulan.colHead_yulan;
      },
      //鼠标移上展示全部cellName
      mouseenterHander(data,data1) {
        var colObj = [];
        for(var i=0; i<data1.length; i++){
          colObj.push(data1[i][0]);
        }
        for(var j=0; j<colObj.length; j++){
          if(colObj[j].cellId == data.cellId && data.cellName.length > 6){
            this.$set(colObj[j],"showFullName",true);
          }else{
            this.$set(colObj[j],"showFullName",false);
          }
        }
      },
      //鼠标移出隐藏cellName超出范围内容
      mouseoutHander(data,data1) {
        var colObj = [];
        for (var i = 0; i < data1.length; i++) {
          colObj.push(data1[i][0]);
        }
        for (var j = 0; j < colObj.length; j++) {
          this.$set(colObj[j], "showFullName", false);
        }
      },

    }
  }
</script>

<style scoped>
  #preview {
    z-index: 100000;
  }

  .table-left {
    text-align: center;
  }

</style>
