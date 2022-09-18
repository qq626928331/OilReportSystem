<template>
  <el-dialog :modal-append-to-body='false'
             :title="diaTitle"
             :visible.sync="isShowSet"
             @close="handleClose"
             width="75%">
    <div v-if="showComp" :style="{'height': diaHeight,'overflow-y': 'hidden','padding':'0px 20px'}">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card>
            <el-row>
              <span style="font-size: 16px;">装置物料</span>
            </el-row>
            <el-row :style="{'margin-top': '10px','overflow-y':'auto','height':leftHeight}">
              <!--              <avue-tree :option="treeOption" :data="treeData_wx" @node-click="nodeClick"/>-->
              <!--              <el-tree ref="tree" :props="props" lazy-->
              <!--                       node-key="id"-->
              <!--                       :default-expand-all="true"-->
              <!--                       :load="loadNode"-->
              <!--                       @node-click="nodeClick">-->
              <!--              </el-tree>-->
              <lazy-tree @node-click="nodeClick" :currentNodeId="currentNodeId"></lazy-tree>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="9">
          <el-card>
            <el-row>
              <span style="font-size: 16px;">物性（Y轴主刻度）</span>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-table class="table" ref="mainYData"
                        @selection-change="mainSelectChoose"
                        :height="tableHeight" border :data="physicalData"
                        :header-cell-class-name="cellName">
                <el-table-column width="55" type="selection" align="center"></el-table-column>
                <el-table-column width="65" align="center" type="index" label="序号"></el-table-column>
                <el-table-column min-width="15%" prop="matterproCode" align="center" label="物性编码"></el-table-column>
                <el-table-column min-width="45%" prop="matterproName" align="center" label="物性名称"></el-table-column>
              </el-table>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="9">
          <el-card>
            <el-row>
              <span style="font-size: 16px;">物性（Y轴副刻度）</span>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-table class="table" ref="subYData"
                        @selection-change="subSelectChoose"
                        :height="tableHeight" border :data="physicalData"
                        :header-cell-class-name="cellName">
                <el-table-column width="55" type="selection" align="center"></el-table-column>
                <el-table-column width="65" align="center" type="index" label="序号"></el-table-column>
                <el-table-column min-width="15%" prop="matterproCode" align="center" label="物性编码"></el-table-column>
                <el-table-column min-width="45%" prop="matterproName" align="center" label="物性名称"></el-table-column>
              </el-table>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShowSet = false">取 消</el-button>
      <el-button type="primary" @click="saveSetting">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getDeptLazyTreeDeviceMateriel} from "../../api/system/dept";
import {waitSearchMaterpro} from "../../api/qcadmin/model";
import {
  saveUpdateMatterproTrackingConfig,
  selectAllMaterproByMaterielId,
  selectAlreadyMatterproById
} from "../../api/system/PhysicalTrackSetting";
import lazyTree from "../../components/custom/lazyTree";

export default {
  name: "Setting",
  props: {
    isShowSet: {
      Type: Boolean,
      default: () => false
    },
    diaTitle: {
      Type: String,
      default: () => ''
    },
    currId: {
      Type: Number,
      default: () => 1
    },
    currMaterialId: {
      Type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      showComp: false,
      diaHeight: '',
      tableHeight: '',
      unitMaterialTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      props: {
        labelText: "标题",
        label: "title",
        value: "value",
        children: "children",
      },


      treeData_wx: [],
      physicalData: [],//物性数据
      mainSelectlist: [],//主刻度选中的行数据
      subSelectlist: [],//副刻度选中的行数据
      mainYData: [],//主刻度
      subYData: [],//副刻度
      treeOption: {
        defaultExpandAll: false,
        nodeKey: "id",
        lazy: true,
        treeLoad: function (node, resolve) {
          const parentId = node.level === 0 ? 0 : node.data.id;
          getDeptLazyTreeDeviceMateriel(parentId).then((res) => {
            resolve(
              res.data.data.map((item) => {
                return {
                  ...item,
                  leaf: !item.hasChildren,
                };
              })
            );
            // this.currentkey=temp[0].id;
            // this.$nextTick(function () {
            //   this.$refs.tree.setCurrentKey(this.currMaterialId);
            // })
          });
        },
        addBtn: false,
        menu: false,
        size: "small",
        props: {
          labelText: "标题",
          label: "title",
          value: "value",
          children: "children",
        },
      },
      leftHeight: '',
      currentNodeId: '',
      selMaterialId: '',
    }
  },
  components: {
    lazyTree
  },
  created() {
    this.diaHeight = (window.innerHeight - 64 - 40 - 20) * 0.85 - 54 - 60 - 20 + 'px';
    this.tableHeight = (window.innerHeight - 64 - 40 - 20) * 0.85 - 54 - 60 - 20 - 55 + 'px';
  },
  mounted() {
    this.leftHeight = (window.innerHeight - 64 - 40 - 20) * 0.85 - 54 - 60 - 70 + "px";
  },
  methods: {
    /**
     * 弹出层关闭事件
     */
    handleClose() {
      this.showComp = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /**
     * 树形节点  选中事件
     * @param data
     */
    nodeClick(data) {
      this.mainYData = [];
      this.subYData = [];
      if (data.islevel != undefined && data.islevel != null) {
        if (data.islevel == '3') {
          this.selMaterialId = data.id.split('_')[1];
          this.currentNodeId = data.id;
        }
      }
      selectAllMaterproByMaterielId(this.selMaterialId).then((res) => {
        this.physicalData = res.data.data;
      });

      selectAlreadyMatterproById(this.currId).then(res => {
        if (res.data.code === 200) {
          if (res.data.data != null) {
            this.mainYData = [res.data.data.mmatterproCode];
            this.subYData = [res.data.data.fmatterproCode];

            let that = this;
            that.$nextTick(() => {
              that.physicalData.find((item, index) => {
                if (item.matterproCode === res.data.data.mmatterproCode) {
                  that.$refs.mainYData.toggleRowSelection(that.physicalData[index], true);
                  return false;
                }
                if (item.matterproCode === res.data.data.fmatterproCode) {
                  that.$refs.subYData.toggleRowSelection(item, true);
                  return false;
                }
              })
            })
          }
        }
      })

    },
    /**
     * 主刻度单选
     * @param rows
     */
    mainSelectChoose(rows) {
      if (rows.length > 1) {
        let newRows = rows.filter((it, index) => {
          if (index == rows.length - 1) {
            this.$refs.mainYData.toggleRowSelection(it, true);
            return true;
          } else {
            this.$refs.mainYData.toggleRowSelection(it, false);
            return false;
          }
        });
        this.mainSelectlist = newRows;
      } else {
        this.mainSelectlist = rows;
      }
    },
    /**
     * 副刻度单选
     * @param rows
     */
    subSelectChoose(rows) {
      if (rows.length > 1) {
        let newRows = rows.filter((it, index) => {
          if (index == rows.length - 1) {
            this.$refs.subYData.toggleRowSelection(it, true);
            return true;
          } else {
            this.$refs.subYData.toggleRowSelection(it, false);
            return false;
          }
        });
        this.subSelectlist = newRows;
      } else {
        this.subSelectlist = rows;
      }

    },
    /**
     * 隐藏复选框全选操作
     * @param row
     * @returns {string}
     */
    cellName(row) {
      if (row.columnIndex === 0) {
        return 'DisableSelection'
      }
    },
    /**
     * 配置保存
     */
    saveSetting() {
      this.mainYData = [];
      this.subYData = [];
      let mmatterproCode = '';
      let fmatterproCode = '';
      if (this.mainSelectlist.length > 0) {
        this.mainYData = [this.mainSelectlist[0].matterproCode];
        mmatterproCode = this.mainYData[0];
      }
      if (this.subSelectlist.length > 0) {
        this.subYData = [this.subSelectlist[0].matterproCode];
        fmatterproCode = this.subYData[0];
      }
      if (this.mainYData[0] === this.subYData[0]) {
        this.$message({
          message: '当前主刻度与副刻度不能配置同一物性',
          type: 'warning'
        });
      } else {
        saveUpdateMatterproTrackingConfig({
          id: this.currId,
          materielCode: this.selMaterialId,
          mmatterproCode: mmatterproCode,
          fmatterproCode: fmatterproCode
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success('设置成功！');
            this.$emit('closeDia', true);
          }
        })
      }
    }
  },
  watch: {
    isShowSet() {
      if (!this.isShowSet) {
        this.$emit('closeDia', false);
      } else {
        this.showComp = true;
        if (this.currMaterialId != '') {
          this.selMaterialId = this.currMaterialId;
          this.currentNodeId = this.currMaterialId;
          this.physicalData = [];//物性数据
          this.mainSelectlist = [];//主刻度选中的行数据
          this.subSelectlist = [];//副刻度选中的行数据
          this.mainYData = [];//主刻度
          this.subYData = [];//副刻度
          selectAllMaterproByMaterielId(this.selMaterialId).then((res) => {
            this.physicalData = res.data.data;
            selectAlreadyMatterproById(this.currId).then(res => {
              if (res.data.code === 200) {
                if (res.data.data != null) {
                  this.mainYData = [res.data.data.mmatterproCode];
                  this.subYData = [res.data.data.fmatterproCode];
                  let that = this;
                  that.$nextTick(() => {
                    that.physicalData.find((item, index) => {
                      if (item.matterproCode === res.data.data.mmatterproCode) {
                        that.$refs.mainYData.toggleRowSelection(that.physicalData[index], true);
                        // return false;
                      }
                      if (item.matterproCode === res.data.data.fmatterproCode) {
                        that.$refs.subYData.toggleRowSelection(item, true);
                        // return false;
                      }
                      return false
                    })
                  })
                }
              }
            })
          });
        }
      }
    },
    currMaterialId() {
      // if (this.currMaterialId != '') {
      //   this.selMaterialId = this.currMaterialId;
      //   this.currentNodeId = this.currMaterialId;
      //   this.physicalData = [];//物性数据
      //   this.mainSelectlist = [];//主刻度选中的行数据
      //   this.subSelectlist = [];//副刻度选中的行数据
      //   this.mainYData = [];//主刻度
      //   this.subYData = [];//副刻度
      //   selectAllMaterproByMaterielId(this.selMaterialId).then((res) => {
      //     this.physicalData = res.data.data;
      //   });
      //   selectAlreadyMatterproById(this.currId).then(res => {
      //     if (res.data.code === 200) {
      //       if (res.data.data != null) {
      //         this.mainYData = [res.data.data.mmatterproCode];
      //         this.subYData = [res.data.data.fmatterproCode];
      //         let that = this;
      //         that.$nextTick(() => {
      //           that.physicalData.find((item, index) => {
      //             if (item.matterproCode === res.data.data.mmatterproCode) {
      //               that.$refs.mainYData.toggleRowSelection(that.physicalData[index], true);
      //               return false;
      //             }
      //             if (item.matterproCode === res.data.data.fmatterproCode) {
      //               that.$refs.subYData.toggleRowSelection(item, true);
      //               return false;
      //             }
      //           })
      //         })
      //       }
      //     }
      //   })
      // }
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog__body {
  background-color: #f0f0f0;
}

/deep/ .el-dialog__header {
  .el-dialog__title {
    color: #409EFF;
  }
}

.table /deep/ .DisableSelection > .cell {
  display: none !important;
}
</style>
