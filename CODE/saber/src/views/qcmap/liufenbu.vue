<template>
  <div id="sample" style="width:100%;height:99%;margin-top: 5px;">

    <!-- 绘图区 预览模式 -->
    <div class="table-box" style=" height: 99%;">
      <div id="myOverviewDiv"
           style="width: 15%; height: 15%;float: right;background-color: #CCCCCC;margin: 25px;position: absolute;bottom:0; right:0;z-index: 999"/>
      <div id="myDiagramDiv2" style="flex-grow: 1; height: 97%;background-color:white;"/>
    </div>
    <!-- 右键菜单控件,id不可换 控件不可删除   -->

    <ul id="contextMenu" class="ctxmenu" style="height: 260px;">
      <lu id="cut" class="menu-item" style="font-size: 15px;text-align: center;">{{menuName}}</lu>
      <el-table size="small"
                :data="matterlists"
                border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                style="width: 100%"
                row-key="index"
                :height=260>
        <el-table-column align="left" header-align="center"
                         prop="matterName"
                         label="物性名称"
        >
        </el-table-column>
        <el-table-column style="text-align: left;"
                         width="70"
                         prop="matterNum"
                         label="值"
        >
        </el-table-column>

      </el-table>
    </ul>
  </div>
</template>

<script>
  import go from 'gojs';
  import {
    getMapList_modelMonitor
  } from "@/api/model_monitor/modelmonitor.js/";
  import {
    initGojs_yulan,
    initDataPublicTemple_yulan,
    initDiaTempleAndDraw_yulan,
  } from "@/api/mygojs/finalGojs_yulan.js";

  import {getNodes} from "@/api/model_entity/modelentity";
  import {getDeptLazyTreeDeviceMateriel} from "@/api/system/dept.js/";
  import {errorMsgbox} from "@/api/global_variable";
  //物料表


  const $ = go.GraphObject.make;
  export default {
    data() {
      return {
        activeName: 0,
        editableTabs: [],
        diagramTabs: [],
        matterlists: [],
        bProperties: "",
        menuName: "",
        authenStatus: 1,
        entryText: "",
        entryText_name: "",
        entryText_wx: "",
        dialogImageUrl: '',
        dialogVisible: false,
        limitCount: [],
        newAssetId: '',
        rangeCode: '',
        waitCode: '',
        alreadyCode: '',
        treeData_wx: [],
        treeOption: {
          defaultExpandAll: true,
          nodeKey: 'id',
          lazy: true,
          treeLoad: function (node, resolve) {
            const parentId = (node.level === 0) ? 0 : node.data.id;
            getDeptLazyTreeDeviceMateriel(parentId).then(res => {
              if (res.data.code != 200) {
                let that = this;
                errorMsgbox(that, res.data.msg);
              } else {
                resolve(res.data.data.map(item => {
                  return {
                    ...item,
                    leaf: !item.hasChildren
                  }
                }))
              }
            });
          },
          addBtn: false,
          menu: false,
          size: 'small',
          props: {
            labelText: '标题',
            label: 'title',
            value: 'value',
            children: 'children'
          }
        },
        tableheight: 0,
        rightdata: [],  // 右边列表数据
        leftdata: [],  //左侧列表数据
        nowSelectData: [], // 左边选中列表数据
        nowSelectRightData: [], // 右边选中列表数据
        leftsearch: '',
        rightsearch: '',
        rangeName: '',
        portcolor: '',
        newClassData: '',
        classCount: '',
        newResData: '',
        resCount: '',
        zero: 0,
        one: 1,
        imgs: [],
        imageUrl: "",
        addResName: "",
        addNewTyRes: false,
        addTyClass: "",
        addNewTyFl: false,
        selectEntityName: "",
        entityId: "",
        entityName: "",
        eclassId: "",
        assetId: "",
        assetName: "",
        eclassName: "",
        keyId: "",
        saveForm: {},
        formAddTy: {},
        inOutlist: [
          {
            key: 0,
            value: '出'
          },
          {
            key: 1,
            value: '入'
          },
        ],
        TyClassList: [],
        TyResList: [],
        TyList: [],
        DkList: [],
        row: {},
        visibleTy: 'none',
        addPicDev: false,//新增图元弹框是否显示
        addPicDev_wx: false,//新增图元弹框是否显示
        nodes: [],
        treeData: [],//模型对象集合
        nowmapData: {},//当前模型对象
        entity_key: ' ',//初始化一个公共的图元key
        FileRenameSync: false,
        newName: this.nowmapData != null && this.nowmapData.moName != null && this.nowmapData.moName.trim() != '' ? this.nowmapData.moName : '未命名',
        yulanStatus: false
      }
    },
    beforeMount() {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.tableheight = h - 400;
    },
    mounted() {
      window.gojsMenudata = this.gojsMenudata;
//初始化预览画板
      let GojsMap2 = initGojs_yulan("myDiagramDiv2", "myOverviewDiv");//finalGojs
      this.myDiagram2 = GojsMap2.Diagram;//finalGojs
      //获取所有定义的图元后初始化地图样式

      getNodes().then(res => {
        if (res.data.code != 200){
          let that = this;
          return errorMsgbox(that, res.data.msg);
        }
        this.nodes = res.data.data.message;
        initDataPublicTemple_yulan(this.nodes, this.myDiagram2);
        getMapList_modelMonitor().then(res => {
          if (res.data.code != 200){
            let that = this;
            return errorMsgbox(that, res.data.msg);
          } else {
            //todo 这里做了多余的查询，改为只查硫分布
            this.treeData = res.data.data;
            //todo 根据此处的集合元素个数绘制tab页签和对应的页面，tab页签的名字是  this.treeData[i]["type"]
            for (let i = 0; i < this.treeData.length; i++) {
              if ("硫分布" == this.treeData[i]["type"]) {//硫分布
                this.nowmapData = this.treeData[i];
                let moContent = this.nowmapData["modelRes"];
                this.load_yulan(moContent);
              }
            }
          }
        });
      }, error => {
        window.console.log(error);
      });

    },
    methods: {
      //放大
      fangda() {
        this.myDiagram2.scale = this.myDiagram2.scale * 1.1;
      },
      //缩小
      suoxiao() {
        this.myDiagram2.scale = this.myDiagram2.scale * 0.9;
      },
      //加载预览地图属性
      loadDiagramProperties_yulan() {

        let pos2 = this.myDiagram2.model.modelData.position;
        if (pos2) this.myDiagram2.initialPosition = go.Point.parse(pos2);
      },
      //加载预览地图数据
      load_yulan(data) {
        //console.warn("data:" + data)
        if (data != null && data.trim() != '') {
          //monitor的属性名和model的属性名，同意不同名 注意别传错
          initDiaTempleAndDraw_yulan(data, this.myDiagram2, this.nowmapData.modelId);

          this.loadDiagramProperties_yulan();  // 加载位置到myDiagram
        }

      },
      //右击菜单数据处理
      gojsMenudata(name, menuData) {
        let matterlist = [];
        if (menuData.length === 0) {

          let matterlistObj = {};
          matterlistObj.matterName = "没有结果";
          matterlistObj.analysisOriginalValue = "没有结果";
          matterlist.push(matterlistObj);
        } else {

          for (let v of menuData) {

            let matterlistObj = {};
            if (v.matterproUnit != null && v.matterproUnit != "") {
              matterlistObj.matterName = v.matterproName + "(" + v.matterproUnit + ")";
            } else {
              matterlistObj.matterName = v.matterproName;
            }
            matterlistObj.matterNum = v.matterproValue;
            matterlist.push(matterlistObj);
          }
        }
        //console.log(matterlist, 'list');
        this.menuName = name;
        this.matterlists = matterlist;
      },
    }
  }
</script>
<style scoped="scoped">


  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transform: translateX(70px);
  }

  /deep/  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 15px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  /deep/ .el-color-picker__trigger {
    width: 20px;
    height: 20px;
    float: left;
    transform: translateY(10px);
  }

  /deep/ .el-color-picker__trigger1 {
    width: 20px;
    height: 20px;
    float: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .opSetting {
    text-align: center;
    margin-top: 200px;
  }

  .spacing {
    margin-top: 10px;
  }

  .text {
    font-size: 14px;
    padding: 5px 0;
    cursor: pointer;
  }

  .texted {
    font-size: 14px;
    padding: 5px 0;
    cursor: pointer;
    background-color: #D0E5FF;
  }

  /deep/ .el-card {
    border-radius: 4px;
    background-color: #FFF;
    border: 0px solid #EBEEF5;
    overflow: hidden;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
  }

  /deep/ .nav_btn .el-button {
    height: 5px;
    padding: 10px;
    font-size: 10px;
    text-align: center;
    border-radius: 4px;
    vertical-align: middle;

  }

  /deep/ .nav_btn .el-card__body {
    padding: 1px;
    height: 9px;

  }

  .nav_btn span {
    margin-top: 2px;
  }

  /deep/ .disabled .el-upload--picture-card {
    display: none;
  }

  /deep/ .el-table .warning-row {
    background: oldlace;
  }

  /deep/ .el-table .success-row {
    background: #ecf5ff;
  }
  /deep/ .el-table .cell {
    text-align: left;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
  }

  .input__inner {
    width: 50%;
  }

  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }

  /deep/ .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }


  .ctxmenu {
    display: none;
    position: absolute;
    opacity: 0;
    margin: 0;
    padding: 8px 0;
    z-index: 999;
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
    list-style: none;
    background-color: #ffffff;
    border-radius: 4px;
  }

  .menu-item {
    display: block;
    position: relative;
    min-width: 220px;
    margin: 0;
    padding: 6px 16px;
    font: bold 12px sans-serif;
    color: rgba(0, 0, 0, .87);
    cursor: pointer;
  }

  .menu-item::before {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #000000;
  }

  .menu-item:hover::before {
    opacity: .04;
  }

  .menu .menu {
    top: -8px;
    left: 100%;
  }

  .show-menu, .menu-item:hover .ctxmenu {
    display: block;
    opacity: 1;
  }
</style>
