<template>
  <el-dialog :visible.sync="isShowEdit"
             :append-to-body="true"
             title="重命名" width="500px">
    <el-row>
      <el-form>
        <el-form-item label="方案名称">
          <el-input v-model="schemeObj.schemeName" placeholder="请输入方案名称"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveSchemeName">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {reNameScheme} from '../../../api/qccut/scheme'
import {errorMsgbox} from "@/api/global_variable";

export default {
  name: "reName",
  props: {
    isShowEdit: Boolean,
    schemeObj: Object
  },
  methods: {
    /**
     * 方案名称保存
     */
    saveSchemeName() {
      if (this.schemeObj.schemeName) {
        reNameScheme(this.schemeObj.schemeId,this.schemeObj.schemeName).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.$emit('reName', true);
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      } else {
        this.$message.error('请输入方案名称！');
      }
    }
  },
  watch: {
    isShowEdit() {
      if (!this.isShowEdit) {
        this.$emit('reName', false);
      }
    }
  }
}
</script>

<style scoped>

</style>
