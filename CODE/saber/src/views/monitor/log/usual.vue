<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               ref="crud"
               v-model="form"
               :permission="permissionList"
               :page.sync="page"
               :style="tableheight"
               :before-open="beforeOpen"
               @search-change="searchChange"
               @search-reset="searchReset"
               @current-change="currentChange"
               @size-change="sizeChange"
               @header-dragend="headerDragend"
               @refresh-change="refreshChange"
               @on-load="onLoad">
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getUsualList, getUsualLogs} from "@/api/logs";
  import {mapGetters} from "vuex";

  export default {
    name:'/monitor/log/usual',
    data() {
      return {
        form: {},
        selectionList: [],
        query: {},
        loading: true,
        page: {
          pageSize: 20,
          currentPage: 1,
          total: 0,
          pageSizes: [ 20, 30, 50, 100 ],
        },
        option: {
          height: 'auto',
          calcHeight: 30,
          tip: false,
          searchShow: true,
          align:'center',
          searchMenuSpan: 6,
          border: true,
          header:false,
          index: true,
          indexLabel:'序号',
          viewBtn: true,
          editBtn: false,
          addBtn: false,
          delBtn: false,
          menuWidth: 120,
          dialogType: 'drawer',
          column: [
            {
              label: "服务id",
              prop: "serviceId",
              overHidden: true,
              search: true
            },
            {
              label: "服务host",
              prop: "serverHost",
              overHidden: true,
              search: true
            },
            {
              label: "服务ip",
              overHidden: true,
              prop: "serverIp"
            },
            {
              label: "软件环境",
              prop: "env",
              overHidden: true,
              width:'80'
            },
            {
              label: "日志级别",
              overHidden: true,
              prop: "logLevel"
            },
            {
              label: "日志id",
              overHidden: true,
              prop: "logId"
            },
            {
              label: "请求接口",
              overHidden: true,
              prop: "requestUri"
            },
            {
              label: "日志时间",
              overHidden: true,
              format: "yyyy-MM-dd HH:mm:ss",
              type: "datetime",
              prop: "createTime",
              width:'180'
            },
            {
              label: "用户代理",
              prop: "userAgent",
              overHidden: true,
              span: 24,
              hide: true
            },
            {
              label: "日志数据",
              prop: "logData",
              overHidden: true,
              type: "textarea",
              span: 24,
              minRows: 2,
              hide: true
            },
            {
              label: "请求数据",
              prop: "params",
              overHidden: true,
              type: "textarea",
              span: 24,
              minRows: 2,
              hide: true
            }
          ]
        },
        data: [],
        tableheight: "",//表格高度

      };
    },
    mounted() {
      this.setClientHight()
      window.addEventListener('resize', () => this.setClientHight(), false)
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          viewBtn: this.vaildData(this.permission.log_usual_view, false)
        };
      }
    },
    methods: {
      // 设置页面高度
      setClientHight(){
        let dom = document.getElementById('avue-view')
        this.tableheight = "height:"+ (dom.offsetHeight - 60)  + "px;overflow:auto;";
      },
      headerDragend(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getUsualLogs(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
        let table = document.getElementsByClassName('el-table--scrollable-y')[0]
        let tableBody = document.getElementsByClassName('el-table__body-wrapper')[0]
        if(table && tableBody){
          table.scrollTop = 0
          tableBody.scrollTop = 0
        }
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getUsualList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
        });
      }
    },
  };
</script>

<style>
</style>
