<template>
  <div style="height: 100%;width: 100%;">
    <div class="viewTitle">
      <span style="">接口服务配置器</span>
    </div>
    <div class="mainDiv">
      <div class="leftDiv">
        <div class="cardDiv dataType" style="background-color: #FFFFFF;">
          <div class="spanStyleLeft">
            <span>输入数据</span>
          </div>
          <el-divider></el-divider>
          <div class="menusItem">
            <div class="leftMenuItem" v-for="(item,index) in leftMenuList"
                 :key="index" v-if="index==0||index==1">
              <div :class="item.isActive?'activeItem':'menuContainer'"
                   @click="changeMenu(item,index,true,'in')">
                <img :src="item.isActive?item.actIcon:item.icon"/>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="cardDiv dataType" style="background-color: #FFFFFF;">
          <div class="spanStyleLeft">
            <span>输出数据</span>
          </div>
          <el-divider></el-divider>
          <div class="menusItem">
            <div class="leftMenuItem" v-for="(item,index) in leftMenuList"
                 :key="index" v-if="index==2||index==3">
              <div :class="item.isActive?'activeItem':'menuContainer'"
                   @click="changeMenu(item,index,true,'out')">
                <img :src="item.isActive?item.actIcon:item.icon"/>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="cardDiv codeData" style="background-color: #FFFFFF;">
          <div class="spanStyleLeft">
            <span>编码对照</span>
          </div>
          <el-divider></el-divider>
          <div class="menusItem">
            <div class="leftMenuItem" v-for="(item,index) in leftMenuList"
                 :key="index" v-if="index==4||index==5">
              <div :class="item.isActive?'activeItem':'menuContainer'"
                   @click="changeMenu(item,index,false,dataType,dataDesc)">
                <img :src="item.isActive?item.actIcon:item.icon"/>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
          <div class="menusItem">
            <div class="leftMenuItem" v-for="(item,index) in leftMenuList"
                 :key="index" v-if="index==6||index==7">
              <div :class="item.isActive?'activeItem':'menuContainer'"
                   @click="changeMenu(item,index,false,dataType,dataDesc)">
                <img :src="item.isActive?item.actIcon:item.icon"/>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightDiv">
        <in-and-out-data v-show="isData" :menuIndex="menuIndex" :dataType="dataType" :dataVal="dataVal"
                         :dataDesc="dataDesc" :bmName="bmName"></in-and-out-data>
        <code-contrast-data v-show="!isData" :menuIndex="menuIndex"
                            :dataDesc="dataDesc" :bmName="bmName" :bmType="bmType"></code-contrast-data>
      </div>
    </div>
  </div>
</template>

<script>
import inAndOutData from "./interfaceconfig/inAndOutData";
import codeContrastData from "./interfaceconfig/codeContrastData";

export default {
  name: "/qcadmin/interfaceconfig",
  components: {
    inAndOutData, codeContrastData
  },
  data() {
    return {
      leftMenuList: [
        {
          name: 'LIMS',
          icon: require('../../../public/icon/btn_lims.png'),
          actIcon: require('../../../public/icon/btn_lims_a.png'),
          isActive: true,
          value: 1
        },
        {
          name: 'MES',
          icon: require('../../../public/icon/btn_mes.png'),
          actIcon: require('../../../public/icon/btn_mes_a.png'),
          isActive: false,
          value: 2
        },
        {
          name: 'LIMS',
          icon: require('../../../public/icon/btn_lims.png'),
          actIcon: require('../../../public/icon/btn_lims_a.png'),
          isActive: false,
          value: 3
        },
        {
          name: 'MES',
          icon: require('../../../public/icon/btn_mes.png'),
          actIcon: require('../../../public/icon/btn_mes_a.png'),
          isActive: false,
          value: 4
        },
        {
          name: '装置',
          icon: require('../../../public/icon/btn_mes.png'),
          actIcon: require('../../../public/icon/btn_mes_a.png'),
          isActive: false,
          value: 5
        },
        {
          name: '采样点',
          icon: require('../../../public/icon/btn_caiyangdian.png'),
          actIcon: require('../../../public/icon/btn_caiyangdian_a.png'),
          isActive: false,
          value: 6
        },
        {
          name: '物料',
          icon: require('../../../public/icon/btn_wuliao.png'),
          actIcon: require('../../../public/icon/btn_wuliao_a.png'),
          isActive: false,
          value: 7
        },
        {
          name: '物性',
          icon: require('../../../public/icon/btn_wuxing.png'),
          actIcon: require('../../../public/icon/btn_wuxing_a.png'),
          isActive: false,
          value: 8
        }
      ],
      isData: true,//是否为输入输出数据
      dataVal: true,
      dataType: 'in',//输入为in  输出为out
      dataDesc: 'LIMS',//数据来源  LIMS或MES
      bmName: '',//编码名称
      bmType:1,
      menuIndex: 0,
    }
  },
  methods: {
    changeMenu(item, index, isData, dataType, dataDesc) {
      this.menuIndex = index;
      this.isData = isData;
      this.dataVal = isData;
      if (this.isData) {
        this.dataDesc = item.name;
        this.dataType = dataType;
      } else {
        this.bmName = item.name;
        this.bmType=index-3;
      }
      this.leftMenuList.forEach(item => {
        item.isActive = false;
      })
      this.leftMenuList[index].isActive = true;
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 1366px) and (max-width: 1919px) {
  .viewTitle {
    background-color: #409EFF;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;

    span {
      font-size: 16px;
      margin-left: 16px;
      color: white;
    }
  }

  .mainDiv {
    height: calc(100% - 60px);
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;

    .leftDiv {
      width: 210px;
      margin-right: 5px;
      display: flex;
      flex-direction: column;

      .dataType {
        flex: 1;
      }

      .codeData {
        flex: 2;
      }

      .cardDiv {
        margin-bottom: 10px;

        .spanStyleLeft {
          font-size: 16px;
          color: #409EFF;
          padding: 5px 10px 0px 20px;
        }

        .menusItem {
          display: flex;
          flex-direction: row;
          width: 100%;

          .leftMenuItem {
            width: 100%;
            padding: 5px 20px;

            .menuContainer {
              cursor: pointer;
              padding: 5px 10px;
              display: flex;
              flex-direction: column;
              vertical-align: middle;
              text-align: center;

              img {
                vertical-align: middle;
                width: 30px;
                padding-left: 8px;
              }

              span {
                vertical-align: middle;
                margin-top: 5px;
                font-size: 12px;
              }

            }

            .activeItem {
              border-radius: 15px;
              border: 1px solid #ccc;
              padding: 5px 10px;
              display: flex;
              flex-direction: column;
              vertical-align: middle;
              text-align: center;

              img {
                vertical-align: middle;
                width: 30px;
                padding-left: 8px;
              }

              span {
                color: #409EFF;
                vertical-align: middle;
                margin-top: 5px;
                font-size: 12px;
              }


            }

            .menuContainer:hover {
              border-radius: 15px;
              background-color: #409EFF;
              padding: 5px 10px;
              color: #FFFFFF;
            }


          }


        }


        //.leftMenuItem {
        //  display: flex;
        //  flex-direction: row;
        //
        //
        //  .menuContainer {
        //    display: flex;
        //    flex-direction: column;
        //    padding: 5px 15px 5px 10px;
        //    vertical-align: middle;
        //    text-align: center;
        //
        //    img {
        //      vertical-align: middle;
        //      width: 25px;
        //      height: 25px;
        //      text-align: center;
        //    }
        //
        //    span {
        //      margin-top: 5px;
        //      font-size: 14px;
        //      vertical-align: middle;
        //      text-align: center;
        //    }
        //  }
        //
        //
        //  .activeItem {
        //    border-radius: 15px;
        //    border: 1px solid #ccc;
        //    padding: 5px 15px 5px 10px;
        //
        //    img {
        //      vertical-align: middle;
        //      width: 25px;
        //      height: 25px;
        //      text-align: center;
        //    }
        //
        //    span {
        //      color: #409EFF;
        //      margin-top: 5px;
        //      font-size: 14px;
        //      vertical-align: middle;
        //      text-align: center;
        //    }
        //  }
        //}
      }
    }

    .leftDiv :last-child {
      margin-bottom: 0px;
    }

    .rightDiv {
      margin-left: 5px;
      width: calc(100% - 230px);
    }


  }
}

@media screen and (min-width: 1920px) {
  .viewTitle {
    background-color: #409EFF;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;

    span {
      font-size: 18px;
      margin-left: 18px;
      color: white;
    }
  }

  .mainDiv {
    height: calc(100% - 70px);
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;

    .leftDiv {
      width: 240px;
      margin-right: 5px;
      display: flex;
      flex-direction: column;

      .dataType {
        flex: 1;
      }

      .codeData {
        flex: 2;
      }

      .cardDiv {
        margin-bottom: 10px;

        .spanStyleLeft {
          font-size: 18px;
          color: #409EFF;
          padding: 5px 15px 0px 20px;
        }

        .menusItem {
          display: flex;
          flex-direction: row;
          width: 100%;

          .leftMenuItem {
            width: 100%;
            padding: 10px 20px;

            .menuContainer {
              cursor: pointer;
              padding: 5px 10px;
              display: flex;
              flex-direction: column;
              vertical-align: middle;
              text-align: center;

              img {
                vertical-align: middle;
                width: 40px;
                padding-left: 8px;
              }

              span {
                vertical-align: middle;
                margin-top: 5px;
                font-size: 14px;
              }

            }

            .activeItem {
              border-radius: 15px;
              border: 1px solid #ccc;
              padding: 5px 10px;
              display: flex;
              flex-direction: column;
              vertical-align: middle;
              text-align: center;

              img {
                vertical-align: middle;
                width: 40px;
                padding-left: 8px;
              }

              span {
                color: #409EFF;
                vertical-align: middle;
                margin-top: 5px;
                font-size: 14px;
              }


            }

            .menuContainer:hover {
              border-radius: 15px;
              background-color: #409EFF;
              padding: 5px 10px;
              color: #FFFFFF;
            }
          }
        }

      }
    }

    .leftDiv :last-child {
      margin-bottom: 0px;
    }

    .rightDiv {
      margin-left: 5px;
      width: calc(100% - 240px);
    }


  }


  .spanStyleLeft {
    font-size: 18px;
    color: #409EFF;
    padding: 10px 10px 5px 10px;
    margin-left: -10px;
  }
}


/deep/ .el-divider--horizontal {
  margin: 5px 0px !important;
}

.spanOptionSelect {
  width: 50%;
  color: #FFFFFF;
  border-radius: 15px;
  background-color: #FFFFFF;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 1px 1px #c0c4cc;
}


</style>
