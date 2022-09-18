<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div class="avue-breadcrumb"
           :class="[{ 'avue-breadcrumb--active': isCollapse }]"
           v-if="showCollapse">
        <i class="icon-navicon"
           @click="setCollapse"></i>
      </div>
    </div>
    <div class="top-bar__title">
      <div class="top-bar__item top-bar__item--show"
           v-if="showMenu">
        <top-menu ref="topMenu"></top-menu>
      </div>
      <!--<span class="top-bar__item"
            v-if="showSearch">
        <top-search></top-search>
      </span>-->
    </div>
    <div class="top-bar__right">
      <el-tooltip v-if="showColor"
                  effect="dark"
                  :content="$t('navbar.color')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-color v-show='false'></top-color>
        </div>
      </el-tooltip>
      <!--<el-tooltip v-if="showDebug"
                  effect="dark"
                  :content="logsFlag?$t('navbar.bug'):logsLen+$t('navbar.bugs')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-logs></top-logs>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showLock"
                  effect="dark"
                  :content="$t('navbar.lock')"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>-->
      <el-tooltip v-if="showTheme"
                  effect="dark"
                  :content="$t('navbar.theme')"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme v-show='false'></top-theme>
        </div>
      </el-tooltip>
      <!-- <el-tooltip effect="dark"
                   :content="$t('navbar.notice')"
                   placement="bottom">
         <div class="top-bar__item top-bar__item&#45;&#45;show">
           <top-notice></top-notice>
         </div>
       </el-tooltip>
       <el-tooltip effect="dark"
                   :content="$t('navbar.language')"
                   placement="bottom">
         <div class="top-bar__item top-bar__item&#45;&#45;show">
           <top-lang></top-lang>
         </div>
       </el-tooltip>-->
<!--      <div style="color: aliceblue;margin-right: 30px;-->
<!--    font-size: 16px;" @click="aboutDialog">-->
<!--        <i class="iconfont icon-guanyu"></i>-->
<!--        <span style="margin-left: 10px;cursor: pointer;">关于</span>-->
<!--      </div>-->

      <el-tooltip v-if="showFullScren"
                  effect="dark"
                  :content="isFullScren?$t('navbar.screenfullF'):$t('navbar.screenfull')"
                  placement="bottom">
        <div class="top-bar__item">
          <i :class="isFullScren?'icon-tuichuquanping':'icon-quanping'"
             @click="handleScreen"></i>
        </div>
      </el-tooltip>
      <!--<img class="top-bar__img"-->
      <!--:src="userInfo.avatar">-->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userInfo.nick_name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
<!--          <el-dropdown-item>-->
<!--            <router-link to="/">{{$t('navbar.dashboard')}}</router-link>-->
<!--          </el-dropdown-item>-->
          <el-dropdown-item>
            <router-link to="/info/index"><i class="iconfont icon-gerenxinxi1"></i>{{$t('navbar.userinfo')}}</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout"
                            divided><i class="iconfont icon-tuichudenglu"></i>{{$t('navbar.logOut')}}
          </el-dropdown-item>
          <el-dropdown-item @click.native="aboutDialog"
                            divided><i class="iconfont icon-guanyu"></i>{{('关于')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <aboutDialog :show="aboutDialogShow" @clickDialogShow="clickDialogShow"/>
  </div>
</template>
<script>
  import {resetRouter} from '@/router/router'
  import {mapGetters, mapState} from "vuex";
  import {fullscreenToggel, listenfullscreen} from "@/util/util";
  import topLock from "./top-lock";
  import topMenu from "./top-menu";
  import topSearch from "./top-search";
  import topTheme from "./top-theme";
  import topLogs from "./top-logs";
  import topColor from "./top-color";
  import topNotice from './top-notice'
  import topLang from "./top-lang";
import aboutDialog from "./aboutDialog";
  export default {
    components: {
      topLock,
      topMenu,
      topSearch,
      topTheme,
      topLogs,
      topColor,
      topNotice,
      topLang,
      aboutDialog//关于弹框
    },
    name: "top",
    data() {
      return {
        dialogVisible: false,
        year: null,
        aboutDialogShow:false,
      };
    },
    filters: {},
    created() {
    },
    mounted() {
      listenfullscreen(this.setScreen);
      this.getFullYear()
    },
    computed: {
      ...mapState({
        showDebug: state => state.common.showDebug,
        showTheme: state => state.common.showTheme,
        showLock: state => state.common.showLock,
        showFullScren: state => state.common.showFullScren,
        showCollapse: state => state.common.showCollapse,
        showSearch: state => state.common.showSearch,
        showMenu: state => state.common.showMenu,
        showColor: state => state.common.showColor
      }),
      ...mapGetters([
        "userInfo",
        "isFullScren",
        "tagWel",
        "tagList",
        "isCollapse",
        "tag",
        "logsLen",
        "logsFlag"
      ])
    },
    methods: {

      //获取年
      getFullYear() {
        const date = new Date();
        this.year = date.getFullYear();
      },
      //点击关于
      aboutDialog() {
        this.aboutDialogShow = true
      },
      //关于弹框
      clickDialogShow(e){
        this.aboutDialogShow=e
      },

      handleScreen() {
        fullscreenToggel();
      },
      setCollapse() {
        this.$store.commit("SET_COLLAPSE");
      },
      setScreen() {
        this.$store.commit("SET_FULLSCREN");
      },
      logout() {
        this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
          confirmButtonText: this.$t("submitText"),
          cancelButtonText: this.$t("cancelText"),
          type: "warning"
        }).then(() => {
          this.$store.dispatch("LogOut").then(() => {
            resetRouter();
            this.$router.push({path: "/login"});
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding: 0px 0px !important;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }

  /deep/ .el-dialog__header {
    padding: 12px 20px 0px !important;
  }

  .dialog-content {
    white-space: normal;
    line-height: 2;
    /* margin-top: 12px; */
    font-size: 16px;
    color: #444444;
  }

  .footer {
    width: 86%;
    border-top: 1px solid #034b97;
    border-bottom: 1px solid #034b97;
    display: flex;
    padding: 8px 0px;
    margin-top: 12px;
  }

  /deep/ .el-dialog .el-dialog__header {
    padding: 0px !important;
    text-align: left;
    height: 25px;
    line-height: 1;
    margin-left: 10px;
  }

  .blankSpace {
    width: 31px;
    height: 10px;
    display: inline-block;
  }

  /deep/ button.el-dialog__headerbtn {
    /*<!--line-height: -31px;-->*/
    font-size: 20px;
    top: 5px;
  }
</style>
