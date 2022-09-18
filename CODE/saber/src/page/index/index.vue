<template>
  <div class="avue-contail" :class="{'avue--collapse':isCollapse}">
    <div class="topDiv">
      <div class="avue-header">
        <!-- 顶部导航栏 -->
        <top ref="top"/>
      </div>
    </div>

    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar/>
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags/>
        <transition name="fade-scale">
          <search class="avue-view" v-show="isSearch"></search>
        </transition>
        <!-- 主体视图层 -->
        <div style="height:100%;overflow-y:auto;overflow-x:hidden;" id="avue-view" v-show="!isSearch">
<!--          <keep-alive>-->
<!--            <router-view class="avue-view" v-if="$route.meta.$keepAlive"/>-->
<!--          </keep-alive>-->
<!--          <router-view class="avue-view" v-if="!$route.meta.$keepAlive"/>-->
          <keep-alive v-if="website.keepAlive" :exclude="$store.state.user.keepAliveExcludeMenus">
            <router-view class="avue-view"></router-view>
          </keep-alive>
          <router-view class="avue-view" v-else/>

        </div>
      </div>
    </div>
    <div class="avue-shade" @click="showCollapse"></div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import tags from "./tags";
  import search from "./search";
  import top from "./top/";
  import sidebar from "./sidebar/";
  import admin from "@/util/admin";
  import {validatenull} from "@/util/validate";
  import {calcDate} from "@/util/date.js";
  import {getStore} from "@/util/store.js";

  export default {
    components: {
      top,
      tags,
      search,
      sidebar
    },
    name: "index",
    provide() {
      return {
        index: this
      };
    },
    data() {
      return {
        //搜索控制
        isSearch: false,
        first: false,
        //刷新token锁
        refreshLock: false,
        //刷新token的时间
        refreshTime: ""
      };
    },
    created() {
      //实时检测刷新token
      this.refreshToken();
    },
    mounted() {
      this.init();
    },
    computed: mapGetters(["isMenu", "isLock", "isCollapse", "website", "menu"]),
    props: [],
    methods: {
      showCollapse() {
        this.$store.commit("SET_COLLAPSE");
      },
      // 初始化
      init() {
        this.$store.commit("SET_SCREEN", admin.getScreen());
        window.onresize = () => {
          setTimeout(() => {
            this.$store.commit("SET_SCREEN", admin.getScreen());
          }, 0);
        };
        this.$store.dispatch("FlowRoutes").then(() => {
        });
      },
      //打开菜单
      openMenu(item = {}) {
        console.log(item)
        this.$store.dispatch("GetMenu", item.id).then(data => {
          if (data.length !== 0) {
            this.$router.$avueRouter.formatRoutes(data, true);
          }
          //当点击顶部菜单后默认打开第一个菜单
          if (!this.validatenull(item)) {
            let itemActive = {},
              childItemActive = 0;
            if (item.path) {
              itemActive = item;
            } else {
              if (this.menu[childItemActive].length === 0) {
                itemActive = this.menu[childItemActive];
              } else {
                itemActive = this.menu[childItemActive].children[childItemActive];
              }
            }
            this.$store.commit('SET_MENU_ID', item);
            if (this.first) {
              console.log(88888)
              this.$router.push({
                path: this.$router.$avueRouter.getPath({
                  name: (itemActive.label || itemActive.name),
                  src: itemActive.path
                }, itemActive.meta)
              });
            } else {
              this.first = true
            }

          }

        });
      },
      // 定时检测token
      refreshToken() {
        this.refreshTime = setInterval(() => {
          const token = getStore({
            name: "token",
            debug: true
          }) || {};
          const date = calcDate(token.datetime, new Date().getTime());
          if (validatenull(date)) return;
          if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
            this.refreshLock = true;
            this.$store
              .dispatch("refreshToken")
              .then(() => {
                this.refreshLock = false;
              })
              .catch(() => {
                this.refreshLock = false;
              });
          }
        }, 10000);
      }
    }
  };
</script>

<style lang="scss">
  // 背景图100%展示
  .avue-header {
    background-image: url("../../assets/images/top/topBg.png");
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
  }
  .theme-white .avue-header, .theme-white .avue-logo, .theme-white .tags-container{
    background-image: url("../../assets/images/top/topBg.png");
  }
</style>
