<template>
  <el-tree ref="tree" :props="props" lazy
           node-key="id"
           :default-expand-all="true"
           :load="loadNode"
           @node-click="nodeClick"
           :style="style">
  </el-tree>
</template>

<script>
import {getDeptLazyTreeDeviceMateriel} from "../../api/system/dept";

export default {
  name: "lazyTree",
  props: {
    currentNodeId: {
      Type: String,
      default: () => ''
    },
    style: {
      Type: String,
      default: () => ''
    }
  },
  data() {
    return {
      props: {
        labelText: "标题",
        label: "title",
        value: "value",
        children: "children",
      },
    }
  },
  methods: {
    loadNode(node, resolve) {
      this.getTreeData(node, resolve);
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey('MATE_' + this.currentNodeId);
      })
    },
    async getTreeData(node, resolve) {
      const parentId = node.level === 0 ? 0 : node.data.id;
      await getDeptLazyTreeDeviceMateriel(parentId).then((res) => {
        resolve(
          res.data.data.map((item) => {
            return {
              ...item,
              leaf: !item.hasChildren,
            };
          })
        );
      });
    },
    nodeClick(data) {
      this.$emit('node-click', data);
    },
  },
  watch: {
    currentNodeId() {
      if (this.currentNodeId != '') {
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey('MATE_' + this.currentNodeId);
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
