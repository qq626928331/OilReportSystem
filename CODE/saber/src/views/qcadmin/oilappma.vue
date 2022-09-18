<template>
  <div>
    <el-row>
      <el-col span="6">
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
      <el-col span="18">
        <div :style="note" v-loading="load" element-loading-spinner="../../../public/html814_/image/bg.jpg">
          <el-row>
            <basic-container>
              <span style="font-size: 18px;font-weight: bold">物性选择</span>
              <el-checkbox style="padding-left: 30px" v-model="Machecked" @change="addOrdelete">APP关键物料</el-checkbox>
            </basic-container>
          </el-row>
          <el-row>
            <basic-container>
              <el-col :span="10">
                <div style="margin-bottom: 15px">
                  <span>待选物性:</span>
                  <el-input placeholder="请输入物性编码/名称" v-model="dialogleftsearchcode" size="small"
                            style="width:170px;margin-left: 3ex"></el-input>
                  <el-button size="small" type="primary" style="float: right" @click="dialogleftselect">
                    查询
                  </el-button>
                </div>
                <el-table size="small" :data="dialogleftdata"
                          border :header-cell-style="{'text-align':'center'}"
                          @selection-change="dialogleftcheckAll"
                          style="width: 100%" row-key="index" :height="tableheight">
                  <el-table-column type="selection" header-align="center" :resizable="false" width="50"></el-table-column>
                  <el-table-column show-overflow-tooltip prop="matterproName" label="物性名称" :resizable="false"></el-table-column>
                  <el-table-column show-overflow-tooltip prop="matterproCode" label="物性编码" :resizable="false" width="100"></el-table-column>
                  <el-table-column show-overflow-tooltip prop="matterproUnit" label="物性单位" :resizable="false" width="100"></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="4">
                <div class="opSetting">
                  <div>
                    <el-button @click="dialoghandelSelect" icon="el-icon-d-arrow-right"
                               :disabled="nowSelectData.length?false:true" size="medium" type="primary">
                      选中
                    </el-button>
                  </div>
                  <div class="spacing">
                    <el-button @click="dialoghandleRemoveSelect" icon="el-icon-d-arrow-left"
                               :disabled="nowSelectRightData.length?false:true" size="medium" type="primary">
                      取消
                    </el-button>
                  </div>
                </div>
              </el-col>
              <el-col :span="10">
                <div style="margin-bottom: 15px">
                  <span>已选物性:</span>
                  <el-input placeholder="请输入物性编码/名称" v-model="dialogrightsearchcode" size="small"
                            style="width:170px;margin-left: 3ex"></el-input>
                  <el-button size="small" type="primary" style="float: right" @click="dialogrightselect">
                    查询
                  </el-button>
                </div>
                <el-table :data="data" size="small" id="crTable"
                          border :header-cell-style="{'text-align':'center'}"
                          @selection-change="dialogcheckRightAll" style="width: 100%"
                          row-key="index" :height="tableheight">
                  <el-table-column type="selection" width="50"  header-align="center" :resizable="false"></el-table-column>
                  <el-table-column show-overflow-tooltip prop="matterproName" label="物性名称" :resizable="false"></el-table-column>
                  <el-table-column show-overflow-tooltip prop="matterproCode" label="物性编码" width="70" :resizable="false"></el-table-column>
                  <el-table-column show-overflow-tooltip prop="matterproUnit" label="物性单位" width="70" :resizable="false"></el-table-column>
                  <el-table-column prop="displayOrder" label="排序" width="55" :resizable="false"></el-table-column>
                </el-table>
              </el-col>
            </basic-container>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getAllLevelMateriel} from "@/api/system/dept";
import {
  update, addOrDelete, selectUnionMatterpro, getSelectMatterpro,
  waitToAlreadyChoose, alreadyTowaitChoose, isKeyMateriel
} from "@/api/qcadmin/oilappma";
import Sortable from 'sortablejs';
import {errorMsgbox} from "@/api/global_variable";

export default {
  name:'/qcadmin/oilappma',
  data() {
    return {
      load: false,
      note: {
        // backgroundImage: "url(" + require('../../../public/html814_/image/bg.jpg') + ")",
        backgroundRepeat: "no-repeat",
        margin: "0px",
        height: '96%',
      },
      materielId: '',//物性Id
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      tableheight: 0,//表格的高度
      currentkey: '',
      expandedKey: [],//首次进入默认展开的key值
      treeStyle: "",//树高的样式
      Machecked: false,//是否默认彀中选择
      dialogleftsearchcode: '',//待选查询物性编码
      dialogrightsearchcode: '',//已选物性编码查询
      nowSelectData: [],//左侧已选列表
      nowSelectRightData: [],//右侧已选列表
      dialogleftdata: [],//左侧列表数据
      data: [],//右侧列表数据
    };
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
    this.rowDrop();
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      this.treeStyle = "height:" + (window.innerHeight - 140) + "px;overflow:auto;";
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.tableheight = h - 230;
    },
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    //加载树的结构数据
    init() {
      getAllLevelMateriel().then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        var temp = [];
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
        this.expandedKey = [res.data.data[0].id, res.data.data[0].children[0].children[0].id]
        this.$nextTick(function () {
          this.$refs.tree.setCurrentKey(this.currentkey);
        })
        this.materielId = temp[0].id.split('MATE_')[1]
        this.nodeClick(temp[0]);
      });
    },
    //获取物料是否为 app关键物料
    isKeyMateriel() {
      isKeyMateriel(this.materielId).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.Machecked = res.data.data;
      });
    },
    //根据选择的物料，加载数据
    nodeClick(data) {
      if (data.islevel == 3) {
        this.load = false;
        this.materielId = data.id.split('MATE_')[1];
        this.isKeyMateriel();
        //1.加载为选择的数据
        this.dialogleftselect();
        //2.加载已选择的数据
        this.dialogrightselect();
      } else {
        // 上文中对待数据异步加载queryCoution 参数中 需要获取 点击的nodeList的id
        // isLevel !3  修改逻辑 : loading 取消.左侧右侧制空
        this.load = false;
        this.dialogleftdata = [];
        this.data = [];
      }
    },
    //根据条件查询待选物性编码
    dialogleftselect() {
      selectUnionMatterpro(this.materielId, this.dialogleftsearchcode).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.dialogleftdata = res.data.data;
      });
    },
    //根据条件查询已选物性编码
    dialogrightselect() {
      getSelectMatterpro(this.materielId, this.dialogrightsearchcode).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.data = res.data.data;
      });
    },
    //左侧选中事件
    dialoghandelSelect() {
      let ids = [];
      this.nowSelectData.forEach(ele => {
        ids.push(ele.matterproCode);
      });
      waitToAlreadyChoose(ids.join(","), this.materielId).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        //1.加载左侧未选择的数据
        this.dialogleftselect();
        //2.加载右侧已选择的数据
        this.dialogrightselect();
      });
    },
    //右侧选中事件
    dialoghandleRemoveSelect() {
      let ids = [];
      this.nowSelectRightData.forEach(ele => {
        ids.push(ele.matterproCode);
      });
      alreadyTowaitChoose(ids.join(","), this.materielId).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        //1.加载左侧未选择的数据
        this.dialogleftselect();
        //2.加载右侧已选择的数据
        this.dialogrightselect();
      });
    },
    //左侧全选方法
    dialogleftcheckAll(val) {
      this.nowSelectData = val;
    },
    //右侧全选方法
    dialogcheckRightAll(val) {
      this.nowSelectRightData = val;
    },
    addOrdelete() {
      var isflag = 0;
      if (this.Machecked) {
        isflag = 1;
      }
      addOrDelete(this.materielId, isflag).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        if (res.data.data) {
          this.$message.success("操作成功");
        } else {
          this.$message.success("操作失败");
        }
      });
    },
    //更新方法
    update(row) {
      update(row).then(res => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    //行拖拽
    rowDrop() {
      // 此时找到的元素是要拖拽元素的父容器
      const tbody = document.getElementById("crTable").querySelector('.el-table__body-wrapper tbody');
      const that = this;
      let data = [];
      Sortable.create(tbody, {
        draggable: ".el-table__row",
        onEnd: function (evt) {
          that.data.splice(evt.newIndex, 0, that.data.splice(evt.oldIndex, 1)[0]);
          var newArray = that.data.slice(0);
          that.data = [];
          that.$nextTick(function () {
            that.data = newArray;
            for (var i = 0; i < that.data.length; i++) {
              var a = that.data[i];
              a.displayOrder = i + 1;
              that.update(a);
            }
          });
        }
      });
      // 将 data变量中的 信息 赋值给 tableData 重新渲染列表数据
      if (!data) {
        this.data = data;
      }
    },
  }
};
</script>

<style scoped="scoped">
.opSetting {
  text-align: center;
  margin-top: 200px;
}

.spacing {
  margin-top: 10px;
}
</style>
