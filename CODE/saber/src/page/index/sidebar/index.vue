<template>
  <div class="avue-sidebar">
    <logo></logo>
    <el-scrollbar style="height:100%">
      <div v-if="validatenull(menu)"
           class="avue-sidebar--tip">{{$t('menuTip')}}
      </div>
      <el-menu unique-opened
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               :collapse="keyCollapse"
               :default-openeds="defaultOpeneds">
        <sidebar-item :menu="menu"
                      :screen="screen"
                      first
                      :props="website.menu.props"
                      :collapse="keyCollapse"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import logo from "../logo";
  import sidebarItem from "./sidebarItem";

  export default {
    name: "sidebar",
    components: {sidebarItem, logo},
    inject: ["index"],
    data() {
      return {
        defaultOpeneds: []
      };
    },
    created() {
      this.index.openMenu();
    },
    watch:{
      menu(){
        if (this.menu.length>0){
          this.defaultOpeneds = [this.menu[0].path];
        }
      }
    },
    computed: {
      ...mapGetters(["website", "menu", "tag", "keyCollapse", "screen", "menuId"]),
      nowTagValue: function () {
        return this.$router.$avueRouter.getValue(this.$route);
      }
    },
    mounted() {
      if (this.menu.length>0){
        this.defaultOpeneds = [this.menu[0].path];
      }
    },
    methods: {}
  };
</script>
<style lang="scss" scoped>
</style>

