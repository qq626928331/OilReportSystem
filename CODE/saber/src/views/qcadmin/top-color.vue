<template>
  <el-color-picker size="mini"
                   style="padding-top:18px;"
                   class="theme-picker"
                   popper-class="theme-picker-dropdown"
                   v-model="themeVal1"></el-color-picker>
</template>

<script>
import { mapGetters } from "vuex";
import color from "@/mixins/color";
const ORIGINAL_THEME = "#409EFF"; // default color
export default {
  name: "topColor",
  mixins: [color()],
  data() {
    return {
      chalk: "",
      themeVal1: ORIGINAL_THEME
    };
  },
    created() {
      this.themeVal1 = this.colorName;
    },
    watch: {
        themeVal1(val, oldVal) {
            this.$store.commit("SET_COLOR_NAME", val);
        }
    },
    computed: {
        ...mapGetters(["colorName"])
    },
};
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
