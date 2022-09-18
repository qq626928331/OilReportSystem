<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-form :inline="true">
          <el-form-item>
            <el-select clearable filterable
                       v-model="matterproCode" placeholder="请选择物性">
              <el-option
                v-for="item in materproList"
                :key="item.matterproCode"
                :label="item.matterproName"
                :value="item.matterproCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-plus" @click="saveMatterproInfo">
              添 加
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="!delDis" type="danger" size="small" icon="el-icon-delete" plain
                       @click="delSchemeMat">
              删 除
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" style="text-align: right;padding-right: 15px;">
        <el-button type="text" icon="el-icon-rank"></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="schemeMatList" ref="schemeMat" size="small" border height="310"
        :header-cell-style="{'text-align':'center'}"
        class="tb-edit dropTable schemeMat"
        :cell-style="{'text-align':'center'}" @selection-change="handleChange"
        row-key="matterproCode">
        <el-table-column type="selection" width="55" style="font-size: 12px"
                         show-overflow-tooltip></el-table-column>
        <el-table-column type="index" label="序号" header-align="center" width="50"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="matterproUnit" label="物性单位" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import {selectMatterproBySort} from "../../../api/qccut/siding";
import {
  submitSidingSchemeMatterpro,
  getSchemeMatterproList,
  deleteSidingSchemeMatterpro,
  saveSchemeMatterproListOrder
} from "../../../api/qccut/scheme";
import Sortable from "sortablejs";
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "WxConfig",
  props: {
    schemeId: Number,
  },
  data() {
    return {
      matterproCode: '',//物性编码
      materproList: [],//物性下拉列表
      schemeMatList: [],//物性table列表
      selMatIds: [],//复选框选中的物性code数组
      delDis: false,//禁用删除按钮状态
    }
  },
  mounted() {
    this.selectMatterproBySort();
    this.getSchemeMatterproList();

  },
  methods: {
    /**
     * 拖拽排序
     */
    rowDrop() {
      const tbody = document.querySelector('.dropTable .el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({newIndex, oldIndex}) {
          const currRow = _this.schemeMatList.splice(oldIndex, 1)[0];

          _this.schemeMatList.splice(newIndex, 0, currRow)
          saveSchemeMatterproListOrder(_this.schemeMatList).then(() => {

          })
          _this.$refs.schemeMat.doLayout();
        }
      })
    },
    /**
     * 物性table列表数据加载
     */
    getSchemeMatterproList() {
      getSchemeMatterproList(this.schemeId).then(res => {
        if (res.data.code === 200) {
          this.schemeMatList = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
      this.$nextTick(() => {
        this.$refs.schemeMat.doLayout();
        this.rowDrop()
      })
    },
    //查询物性列表
    selectMatterproBySort() {
      selectMatterproBySort('1').then(res => {
        if (res.data.code === 200) {
          this.materproList = res.data.data;
        } else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    /**
     * 添加物性
     */
    saveMatterproInfo() {
      if (this.matterproCode) {
        let tempObj = {
          "sidingmatterproId": 0,
          "matterproCode": this.matterproCode,
          "matterproName": '',
          "matterproUnit": '',
        }
        this.$set(tempObj, 'schemesidingId', 0);
        this.$set(tempObj, 'schemeId', this.schemeId);
        submitSidingSchemeMatterpro(tempObj).then(res => {
          if (res.data.code != 200) {
            this.$message.warning(res.data.msg);
          } else {
            this.getSchemeMatterproList();
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      } else {
        this.$message.error('请选择物性！');
      }
    },
    /**
     * 复选框监听事件
     * @param val
     */
    handleChange(val) {
      this.delDis = val.length ? true : false;
      this.selMatIds = [];
      val.forEach(item => {
        this.selMatIds.push(item.sidingmatterproId);
      })
    },
    /**
     * 删除物性
     * 批量删除
     */
    delSchemeMat() {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteSidingSchemeMatterpro(this.selMatIds.join(',')).then(() => {
          this.getSchemeMatterproList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      })
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1366px) and (max-width: 1919px) {
  .schemeMat {
    height: 290px;
    max-height: 290px;
  }
}

@media screen and (max-width: 1920px) {
  .schemeMat {
    height: 305px;
    max-height: 305px;
  }
}
</style>
