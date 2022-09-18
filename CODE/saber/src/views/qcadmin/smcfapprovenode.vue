<template>
  <el-row>
    <el-col :span="18">
      <basic-container>
        <el-card :style="cardstyle"  shadow="never">
          <div slot="header" class="clearfix">
            审核节点
          </div>
          <div class="block" style="overflow: auto">
            <div style="margin-bottom: 15px">
              <span style="font-size: 14px;color: #000">节点名称：</span><el-input size="small" v-model="nodename" style="display: inline-block;width: 220px"></el-input>
              <div style="display: inline-block;margin-left: 20px">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-search"
                  @click="handleSearch"
                >查 询</el-button>
                <el-button
                  size="small"
                  icon="el-icon-delete"
                  @click="handleReset"
                >清 空</el-button>
              </div>
            </div>
            <div style="margin-bottom: 15px">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="handleAdd"
              >新 增</el-button>
            </div>
            <el-table :data="data" border size="small" @selection-change="selectionChange" ref="table">
              <el-table-column type="index" width="50" label="序号" show-overflow-tooltip></el-table-column>
              <el-table-column label="审核级别" property="nodeLevel" show-overflow-tooltip></el-table-column>
              <el-table-column label="节点名称" property="nodeName" show-overflow-tooltip></el-table-column>
            <!--  <el-table-column label="是否有效" property="isDeleted" width="100">
                <template slot-scope="scope">
                  <span v-if="scope.row.isDeleted==0">有效</span>
                  <span v-else>无效</span>
                </template>
              </el-table-column>-->
              <el-table-column label="备注" property="note" show-overflow-tooltip></el-table-column>
              <el-table-column label="创建时间" property="createddate" width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{date(scope.row.createddate)}}
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="{row,$index}">
                  <i class="el-icon-edit" @click="handleUpdate($index, row)"
                     style="cursor: pointer;font-size: 15px;color: #409EFF"></i>
                  <i class="el-icon-delete" @click="handleDelete($index, row)"
                     style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </basic-container>
    </el-col>
    <el-col :span="6">
      <basic-container>
        <el-card :style="cardstyle"  shadow="never">
          <div slot="header" class="clearfix">
            审核流程
          </div>
          <div class="block" style="overflow: auto">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in timelines"
                :key="index"
                :color="activity.color"
                :size="activity.size">
                <div class="timeline-name">{{ activity.content }}</div>
                <div class="timeline-content">备 注：{{ activity.note }}</div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </basic-container>
    </el-col>
    <el-dialog :title="title" :append-to-body="true" :visible.sync="dialog" width="30%">
      <el-form :model="form">
        <el-form-item label="审核级别:">
          <el-input v-model="form.nodeLevel" size="small" disabled style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="节点名称:">
          <el-input v-model="form.nodeName" size="small" placeholder="请输入节点名称" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="节点备注:" label-position="right">
          <el-input v-model="form.note" size="small" placeholder="请输入节点备注" style="width: 70%"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="handdle">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/qcadmin/smcfapprovenode";
  import {mapGetters} from "vuex";
  import Sortable from 'sortablejs';
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    data() {
      return {
        query: {},
        loading: true,
        data: [],
        cardstyle:'',
        timelines:[],
        title:'新增',
        dialog:false,
        form:{
          nodeId:0,
          nodeLevel:'',
          nodeName:'',
          note:''
        },
        nodename:'',
      };
    },
    beforeMount() {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      var hh = h-145;
      this.cardstyle="height:"+hh+"px;border: 0px solid #EBEEF5;overflow: hidden;color: #303133;-webkit-transition: .3s;transition: .3s;";
    },
    mounted() {
      this.onLoad();
      this.rowDrop();
    },
    watch:{
      //审批流程树构建
      data(){
        this.timelines=[];
        for (var i=0;i<this.data.length;i++){
          let time = {
            content:'',
            note:'',
            size: 'large',
            icon: '',
            color: '#409EFF'
          };
          let one = this.data[i];
          time.content=i+1+". "+one.nodeName;
          time.note=one.note;
          this.timelines.push(time);
        }
      }
    },
    methods: {
      //时间格式化
      //time 时间
      date(time){
          var date=new Date(time);
          var year=date.getFullYear();
          var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
          var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
          var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
          var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
          var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
          // 拼接
          return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      },
      //行拖拽
      rowDrop () {
        // 此时找到的元素是要拖拽元素的父容器
        const tbody = document.querySelector('.el-table__body-wrapper tbody');
        const that = this;
        let data = [];
        Sortable.create(tbody, {
          draggable: ".el-table__row",
          onEnd:function(evt){
            that.data.splice(evt.newIndex, 0, that.data.splice(evt.oldIndex, 1)[0]);
            var newArray = that.data.slice(0);
            that.data = [];
            that.$nextTick(function () {
              that.data = newArray;
              for (var i=0;i<that.data.length;i++){
                var a = that.data[i];
                a.nodeLevel=i+1;
                that.update(a);
              }
            });
          }
        });
        // 将 data变量中的 信息 赋值给 tableData 重新渲染列表数据
        if(!data){
          this.data = data;
        }
      },
      //审批节点新增
      handleAdd(){
        this.title="新增";
        this.dialog=true;
        let temp = {
          nodeId:0,
          nodeLevel:'',
          nodeName:'',
        };
        this.form = temp;
        this.form.nodeLevel=this.data.length+1;
      },
      //审批节点修改
      //index 索引 row 行对象
      handleUpdate(index,row){
        this.title="修改";
        this.dialog=true;
        this.form.nodeId=row.nodeId;
        this.form.nodeLevel=row.nodeLevel;
        this.form.nodeName=row.nodeName;
        this.form.note=row.note;
      },
      //根据title区别新增与修改
      handdle(){
        if(this.title=='新增'){
          this.rowSave(this.form);
        }else if(this.title=='修改'){
          this.rowUpdate(this.form);
        }
        this.dialog=false;
      },
      //行保存
      //row 行对象
      rowSave(row) {
        this.$set(row,"isDeleted",0);
        this.$set(row,"createddate",new Date());
        add(row).then(res => {
          this.onLoad();
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }, error => {
          window.console.log(error);
        });
      },
      //行修改
      //row 行对象
      rowUpdate(row) {
        update(row).then(() => {
          this.onLoad();
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        }, error => {
          console.log(error);
        });
      },
      //修改行内容
      //row 行对象
      update(row) {
        update(row).then(() => {
          this.onLoad();
        }, error => {
          console.log(error);
        });
      },
      //选中删除审批节点
      //index 索引 row 行对象
      handleDelete(index,row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.nodeId);
          })
          .then(() => {
            this.onLoad();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      //审批节点加载
      //params 分页参数
      onLoad(params = {}) {
        this.loading = true;
        getList( Object.assign(params, this.query)).then(res => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.data = res.data.data;
          this.loading = false;
        });
      },
      //根据节点名称查询审批节点
      handleSearch(){
        this.$set(this.query,'nodeName',this.nodename);
        this.onLoad();
      },
      //节点名称置空
      handleReset(){
        this.nodename='';
      }
    }
  };
</script>

<style scoped="scoped">
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
  }
  .timeline-name {
    font-size: 15px;
    color: rgba(0, 0, 0, 1);
  }
  /deep/.timeline-content {
    color: rgba(0, 0, 0, 0.7);
    font-size: 13px;
    padding-top: 5px;
    padding-left: 15px;
  }
  /deep/.el-timeline-item__tail{
    height: 115%;
    border-left: 2px solid #E4E7ED;
  }
</style>
