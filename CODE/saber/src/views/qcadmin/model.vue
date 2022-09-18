<template>
  <div id="sample" style="width:100%;height:95%;margin-top: 5px;">
    <!--默认会加载在上层的模型配置页-->
    <div
      v-show="!this.yulanStatus"
      style=" width:100%;height:100%;display: flex; justify-content: space-between ;
         background-color: #f0f2f5;
         position: absolute;z-index: 999">
      <div class="left_box" style=" margin-right: 15px; height:98%;width: 17%;">
        <!-- 上 -->
        <div
          class="one-box"
          style="height:30%; width:100%; border: solid 2px  #d2d5d5;
             border-radius: 10px; margin-bottom:10px;background-color: white"
        >
          <!-- 控件 -->
          <div
            class="top_box"
            style="height:18%; padding:0 15px; display:flex; justify-content:space-between;align-items:center;background-color: white;
                box-shadow: 0px -1px 20px #d2d5d5; border-radius: 10px 10px 0px 0px"
          >
            <span style="color: black;font-weight:700; font-size:15px;background-color: white;">模型名称</span>
            <div
              class="tu_icon"
              style="display:flex; justify-content:space-between;background-color: white;"
            >

              <img
                title="新增"
                id="addMo"
                src="/img/model/btn_Add.png"
                style="cursor:pointer;width: 20px;height:20px;margin-right:10px;background-color: white;"
                @click="addEmptyModel()"
              />
              <img
                title="复制"
                id="copyModel"
                src="/img/model/btn_fuzhi.png"
                style="cursor:pointer;width: 20px;height:20px;margin-right:10px;background-color: white;"
                @click="copyModel()"
              />
              <img
                title="删除"
                id="delModel"
                src="/img/model/btn_shanchu.png"
                style="cursor:pointer;width: 20px;height:20px;background-color: white;"
                @click="delModel()"
              />
            </div>
          </div>
          <!-- 内容 -->
          <div
            id="maplist"
            style="width:100%;height:82%;overflow: auto;background-color: white;
            box-shadow: 0px -1px 2px #d2d5d5; border-radius: 0px 0px 10px 10px"
          >
            <el-table ref="treeData" :data="treeData" style="width: 100%;" :show-header="false" @row-click="rangeClick" @header-dragend="changeColWidth"
                      highlight-current-row>
              <el-table-column label="Name" min-width="180">
                <!--<template slot-scope="scope">-->
                <!--  <el-button :id=scope.row.moId size="mini" type="primary" @click.native="rangeClick(scope.row)"-->
                <!--        style="border: none;background-color: transparent;outline: none;"-->
                <!--        @dblclick.native="rangeClick2(scope.row)">{{scope.row.moName}}-->
                <!--  </el-button>-->
                <!--<el-input :id=scope.row.moId v-model="scope.row.moName" @change="changeName(scope.row)"></el-input>-->
                <!--</template>-->

                <template slot-scope="{row,$index}">
                  <el-input
                    :id="'input'+ row.id"
                    class="input__inner"
                    v-if="row.nameedit"
                    v-model="row.moName"
                    type="input"
                    @blur="updatemoName(row)"
                    @keyup.enter.native="$event.target.blur"
                  ></el-input>
                  <span
                    :id="row.moId"
                    v-else
                    @dblclick="changemoName(row)"
                  >{{ row.moName }}</span>
                </template>
              </el-table-column>
            </el-table>
            <!--            <div class="text" style="margin-top:5px; font-size:15px;  margin-left:10px;height: 10px;"-->
            <!--                 v-for="(item, index) in treeData"-->
            <!--                 :key="index"-->
            <!--                 @click="rangeClick(item.moId)">-->
            <!--              <button :id= item.moId style="margin-left: 10px;cursor: default;-->
            <!--                  border: none;-->
            <!--                  background-color: transparent;-->
            <!--                  outline: none;">-->
            <!--                {{item.moName}}-->
            <!--              </button>-->
            <!--            </div>-->
          </div>
        </div>
        <!-- 下 -->
        <div
          class="twobox"
          style="height:58%; width:100%; margin-bottom:30px;
             border: solid 2px  #d2d5d5; box-shadow: 0px 0px 20px #d2d5d5;border-radius: 10px; "
        >
          <div
            class="t_top"
            style="height:15%; padding:0 15px; display:flex; justify-content:space-between;align-items:center; background-color: white;
               box-shadow: 0px -1px 20px #d2d5d5;border-radius: 10px 10px 0px 0px "
          >
            <span style="color: black;font-weight:700; font-size:15px;">图元</span>
            <img
              title="添加图元"
              id="addModel"
              src="/img/model/btn_Add.png"
              style="cursor:pointer;width: 20px;height:20px; "
              @click="addmsg()"
            />
          </div>

          <!-- 图元列表 -->

          <div
            id="myPaletteDiv"
            style="margin: 2px;width:99%;height:84%; background-color: white; border-radius: 0px 0px 10px 10px;overflow:auto"
          ></div>
        </div>
      </div>

      <!--      text-align和vertical-align不起作用，因为标签div没有这两个属性-->

      <!--      background-color:white;box-shadow: 0px 0px 5px #d2d5d5;-->
      <div
        class="right_box"
        style="margin-right:20px; flex-grow: 1; height:87%;width: 83%;
            border-radius: 5px; padding:5px;">
        <el-card shadow="always" style="box-shadow: 0px 0px 5px #d2d5d5;">
          <el-row>
            <el-col :span="20" style="text-align: left;">
              <el-form :inline="true">
                <el-form-item style="margin-bottom: 0px;margin-right: 10px;">
                  <div style="margin-top: 0px;cursor: pointer;font-size: 20px">
                    <el-tooltip class="item" effect="dark" content="预览" placement="top">
                      <i class="el-icon-view" @click="yulan()"></i>
                    </el-tooltip>
                  </div>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 0px">
                  <div style="cursor: pointer;font-size: 20px">
                    <el-tooltip class="item" effect="dark" content="保存" placement="top">
                      <i class="iconfont icon-baocun" @click="saveNowModel"></i>
                    </el-tooltip>
                  </div>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 0px;">
                  <el-divider direction="vertical"></el-divider>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 10px;">
                  <div style="cursor: pointer;font-size: 20px">
                    <el-tooltip class="item" effect="dark" content="发布" placement="top">
                      <i class="el-icon-share" @click="publishNowModel"></i>
                    </el-tooltip>
                  </div>
                </el-form-item>
                <el-form-item v-if="isPublished" style="margin-bottom: 0px;margin-right: 0px;">
                  <div style="cursor: pointer;font-size: 20px">
                    <el-tooltip class="item" effect="dark" content="撤销发布" placement="top">
                      <i class="iconfont icon-chexiao" @click="revoke"></i>
                    </el-tooltip>
                  </div>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 0px;">
                  <el-divider direction="vertical"></el-divider>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 0px;">
                  <div v-if="!isFormatBrush" style="cursor: pointer;font-size: 20px" @click="changeBrush">
                    <el-tooltip class="item" effect="dark" content="格式刷" placement="top">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-geshishua2"></use>
                      </svg>
                    </el-tooltip>
                  </div>
                  <div v-else style="cursor: pointer;font-size: 20px" @click="changeBrush">
                    <el-tooltip class="item" effect="dark" content="格式刷" placement="top">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-geshishua2-copy"></use>
                      </svg>
                    </el-tooltip>
                  </div>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;">
                  <el-button @click="changeBlod" type="text" style="font-weight: bold;color: #000;font-size: 16px;">
                    <bold v-show="isBold"></bold>
                    <no-bold v-show="!isBold"></no-bold>
                  </el-button>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;">
                  <el-select @change="changeFamily" style="width: 120px;"
                             size="small" clearable filterable v-model="fontFamily">
                    <el-option v-for="(item,index) in fontFamilys" :label="item.name" :value="item.family"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 0px;">
                  <el-select @change="changeFize" style="width: 80px;"
                             size="small" clearable filterable v-model="fontSize">
                    <el-option v-for="(item,index) in fontSizes" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 0px;">
                  <el-divider direction="vertical"></el-divider>
                </el-form-item>
                <el-form-item>
                  <el-button type="text" @click="fangda">
                    <i class="el-icon-zoom-in" style="color: #606266;font-size: 16px;"></i>
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="text" @click="suoxiao">
                    <i class="el-icon-zoom-out" style="color: #606266;font-size: 16px;"></i>
                  </el-button>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 0px;">
                  <el-divider direction="vertical"></el-divider>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;margin-right: 0px;">
                  <div style="cursor: pointer;font-size: 20px">
                    <el-tooltip class="item" effect="dark" content="网格线" placement="top">
                      <i class="iconfont icon-wanggexian" @click="changeNowModel"></i>

                    </el-tooltip>
                  </div>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
        <div id="myDiagramDiv"
             style="flex-grow: 1; height: 93%;border: solid 2px  #d2d5d5;background-color:white;box-shadow: 0px 0px 5px #A7ADAD; margin-top: 5px;"/>

      </div>
    </div>
    <!--默认会加载在上层的模型配置页-->
    <!--绘制在底层的预览模式页面 -->
    <div style="flex-grow: 1; height: 98%;">
      <div
        class="right_top_box"
        style="font-size:15px;
        margin-bottom: 10px;box-shadow: 0px -1px 20px #d2d5d5;
        display: flex;align-items: center;
        height: 7%;background-color:white;"
      >
        <el-button
          type="primary"
          style="width: auto;height:10px;margin: 5px;margin-left:auto;background-color: gray"
          disabled
        >
          <div style="margin: -8px">预览_{{ this.nowmapData.moName }}</div>
        </el-button>
        <el-button
          type="primary"
          style="width: 70px;height:10px;margin: 5px;margin-left:auto;"
          @click="yulan_close()"
        >
          <div style="margin: -8px">
            <img src="/img/model/btn_yulan.png" style="width: 10px;height:10px; margin-right:6px;"/>关闭
          </div>
        </el-button>
      </div>
      <div
        id="myOverviewDiv"
        style="width: 15%; height: 15%;float: right;background-color: #CCCCCC;margin: 25px;position: absolute;z-index: 998;bottom:0; right:0;"
      />

      <div id="myDiagramDiv2" style="flex-grow: 1; height: 92%;background-color:white;"/>
    </div>
    <!-- 右键菜单控件,id不可换 控件不可删除   -->
    <ul id="contextMenu" class="ctxmenu" style=";height: 260px">
      <li id="cut" class="menu-item" style="font-size: 15px;text-align: center;">{{ menuName }}</li>
      <el-table
        size="small"
        :data="matterlists"
        border
        @header-dragend="changeColWidth"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
        row-key="index"
        :height=260
      >
        <el-table-column prop="matterName" label="物性名称" show-overflow-tooltip/>
        <el-table-column width="70px" prop="matterNum" label="值" show-overflow-tooltip/>
      </el-table>
    </ul>

    <el-dialog
      title="图元编辑"
      :visible.sync="addPicDev"
      :before-close="addPicDevClose"
      :append-to-body="true"
      :show-close="false"
      width="66%"
    >
      <div style="margin-top:-30px;bottom:-20px">
        <el-row>
          <el-col :span="7">
            <basic-container>
              <div style="margin-bottom:15px;">
                <el-input
                  placeholder="请输入图元名称"
                  v-model="selectEntityName"
                  size="small"
                  style="width:60%;"
                >
                  <el-button slot="append" icon="el-icon-search" @click="handleSearchTy"></el-button>
                </el-input>
                <el-button
                  size="small"
                  type="primary"
                  style="float: right"
                  icon="el-icon-plus"
                  @click="handleAdd"
                >添 加
                </el-button>
              </div>
              <el-table
                ref="TyList"
                :data="TyList"
                size="small"
                @header-dragend="changeColWidth"
                border
                :header-cell-style="{'text-align':'center'}"
                @row-click="selectOneTy"
                :cell-style="{'text-align':'center'}"
                style="width: 100%"
                :height="456"
                :row-class-name="tableRowClassName"
                highlight-current-row
              >
                <el-table-column type="index" label="序号" header-align="center" width="50"></el-table-column>
                <el-table-column prop="entityName" min-width="140" label="图元名称" show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input v-if="row.edit" v-model="row.entityName" type="input"></el-input>
                    <span v-else>{{ row.entityName }}</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" width="60" label="操作">
                  <template slot-scope="scope">
                    <img
                      src="../../../public/icon/btn_shanchu.png"
                      @click="handleDelete(scope.row)"
                      style="width: 13px;height: 15px;cursor: pointer;margin-left: 16px;float: left;"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </basic-container>
          </el-col>
          <el-col :span="16">
            <basic-container>
              图元名称：
              <el-input
                size="small"
                style="width: 19%"
                v-model="pixelModel.entityName"
                placeholder="请输入图元名称"
              ></el-input>
              <span style="margin-left: 1%">图元分类：</span>
              <el-select
                size="small"
                v-model="pixelModel.eclassId"
                placeholder="请选择端口类型"
                style="width: 19%"
                filterable
                allow-create
              >
                <el-option
                  v-for="item in TyClassList"
                  :key="item.eclassId"
                  :label="item.eclassName"
                  :value="item.eclassId"
                ></el-option>
              </el-select>
              <span style="margin-left: 1%">资源名称：</span>
              <el-select
                size="small"
                v-model="pixelModel.assetId"
                placeholder="请选择端口类型"
                style="width: 19%"
                @change="selectPic"
                filterable
                allow-create
              >
                <el-option
                  v-for="item in TyResList"
                  :key="item.assetId"
                  :label="item.assetName"
                  :value="item.assetId"
                ></el-option>
              </el-select>

              <br/>
              <br/>资源:
              <el-upload
                class="avatar-uploader"
                ref="resUpload"
                :show-file-list="false"
                :http-request="uploadImag"
                :action="pixelModel.imageUrl"
                :before-upload="beforeAvatarUpload"
                :disabled="authenStatus==0?true:false"
              >
                <vue-hover-mask>
                  <div id="imgId" style="height:80px;width:100px;position: relative;">
                    <img
                      v-if="pixelModel.imageUrl"
                      :src="pixelModel.imageUrl"
                      class="avatar"
                      style="height:80px;width:100px;position: relative;"
                    />
                    <i v-else style="color: #409EFF" class="el-icon-plus avatar-uploader-icon"></i>
                  </div>
                  <template v-slot:action>
                    <i
                      v-if="pixelModel.imageUrl"
                      style="color: #409EFF"
                      class="el-icon-delete"
                      @click="deleteHander()"
                    ></i>
                  </template>
                </vue-hover-mask>
              </el-upload>
              <div style="text-align:center">
                <el-button size="small" type="primary" @click="submitAddPicDev">
                  <img
                    src="/img/model/btn_baocun.png"
                    style="width: 10px;height:10px; margin-right:6px;"
                  />保 存
                </el-button>
              </div>
              <!--<br />-->
              <el-button
                size="small"
                type="primary"
                icon="el-icon-plus"
                @click="addPort"
                style="margin-bottom: 15px"
              >
                添
                加
              </el-button>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                @click="deletePort"
                style="margin-bottom: 15px"
                plain
              >
                删
                除
              </el-button>
              <el-table
                ref="DkList"
                :data="DkList"
                size="small"
                border
                :header-cell-style="{'text-align':'center'}"
                @row-click="selectOneDk"
                :cell-style="{'text-align':'center'}"
                style="width: 100%;"
                highlight-current-row
                :height="270"
                @header-dragend="changeColWidth"
              >
                <el-table-column type="index" label="序号" header-align="center" width="50"></el-table-column>
                <el-table-column prop="portcolor" label="颜色">
                  <template slot-scope="{row,$index}">
                    <div class="block" style="float: left;line-height: 0.5;">
                      <el-color-picker
                        size="small"
                        v-model="row.portcolor"
                        @change="colorChange(row)"
                      ></el-color-picker>
                      <div style="transform: translate(35px,-15px);">
                        <span>{{ row.portcolor }}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="inOut" label="端口类型">
                  <template slot-scope="{row,$index}">
                    <el-radio-group
                      v-if="row.inOutedit"
                      v-model="row.inOut"
                      @change="saveDk(row,4)"
                    >
                      <el-radio :label="zero">出</el-radio>
                      <el-radio :label="one">入</el-radio>
                    </el-radio-group>
                    <span v-else @dblclick="changeCode(row,4)">{{ row.inOut == 0 ? '出' : '入' }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="alignment" label="X坐标">
                  <template slot-scope="{row,$index}">
                    <el-input
                      ref="markAlignmenteditX"
                      class="input__inner"
                      v-if="row.alignmenteditX"
                      v-model="row.alignmentX"
                      :min="0"
                      :max="1"
                      :controls="false"
                      type="number"
                      step="0.1"
                      @blur="saveDk(row,3)"
                      @keyup.native="watchValue(row,1)"
                    ></el-input>
                    <span v-else @dblclick="changeCode(row,3)">{{ row.alignmentX }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="alignment" label="Y坐标">
                  <template slot-scope="{row,$index}">
                    <el-input
                      ref="markAlignmenteditY"
                      class="input__inner"
                      v-if="row.alignmenteditY"
                      v-model="row.alignmentY"
                      type="number"
                      step="0.1"
                      :min="0"
                      :max="1"
                      @blur="saveDk(row,5)"
                      @keyup.native="watchValue(row,2)"
                    ></el-input>
                    <span v-else @dblclick="changeCode(row,5)">{{ row.alignmentY }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </basic-container>
          </el-col>
        </el-row>
      </div>
      <div style="margin-left: 40%;margin-top: -5%;">
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeIt">取 消</el-button>
        <el-button size="small" type="primary" @click="closeIt">确 定</el-button>
      </span>
      </div>
    </el-dialog>
    <el-dialog
      title="关键物性配置"
      :visible.sync="addPicDev_wx"
      :before-close="addPicDevClose_wx"
      :append-to-body="true"
      width="75%"
    >
      <!--      备注：不要删除该注释，此为业务解析-->
      <!--      //初始化备注弹出框，加载生效的关系数据。-->
      <!--      //备注弹出框中的查询，只看存不存在，不看isdelete，isdelete含义为是否生效。选中时 isdelete默认设置为 0 ，。-->
      <!--      //备注 弹出框 中的，添加时，不同物性的记录为不生效【isdelete=1】， “取消” 为真删除，删除记录 。-->
      <!--      // 每次dialog窗口关闭分两种处理，“确定”关闭-->
      <!--      //每次把物料名更新到key图元的xcname，物料id更新到bprperty，物料名+三个主要物性更新到text,并刷新图元对象-->
      <el-row>
        <el-col :span="5">
          <el-card :style="{height:tableheight}">
            <div slot="header" class="clearfix">
              <span>装置物料</span>
            </div>
            <!-- <el-scrollbar> -->
            <div style="overflow-y:auto;">
              <!--              <avue-tree :option="treeOption" :data="treeData_wx" @node-click="nodeClick" :style="leftHeight"/>-->
              <lazy-tree :currentNodeId="currentNodeId" @node-click="nodeClick" :style="leftHeight"></lazy-tree>
            </div>
            <!-- </el-scrollbar> -->
          </el-card>
        </el-col>
        <el-col :span="19">
          <el-row>
            <el-col :span="10">
              <div style="margin-bottom: 15px">
                <span>待选物性:</span>
                <el-input
                  placeholder="请输入物性编码"
                  v-model="waitCode"
                  size="small"
                  style="width:180px;margin-left: 3px"
                ></el-input>
                <el-button
                  size="small"
                  type="primary"
                  style="margin-left: 5px"
                  @click="leftselect"
                >查询
                </el-button>
              </div>
              <el-table
                size="small"
                :data="leftdata"
                border
                @header-dragend="changeColWidth"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                @selection-change="checkAll"
                style="width: 100%"
                row-key="index"
                :height="tableheight"
              >
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="matterproOriginalUnit" label="物性单位"></el-table-column> -->
              </el-table>
            </el-col>
            <el-col :span="4">
              <div class="opSetting">
                <div @click="handelSelect">
                  <el-button
                    icon="el-icon-d-arrow-right"
                    :disabled="nowSelectData.length?false:true"
                    size="medium"
                    type="primary"
                  >选中
                  </el-button>
                </div>
                <div class="spacing" @click="handleRemoveSelect">
                  <el-button
                    icon="el-icon-d-arrow-left"
                    :disabled="nowSelectRightData.length?false:true"
                    size="medium"
                    type="primary"
                  >取消
                  </el-button>
                </div>
              </div>
            </el-col>

            <el-col :span="10">
              <div style="margin-bottom: 15px">
                <span>关键物性:</span>
                <el-input
                  placeholder="请输入物性编码"
                  v-model="alreadyCode"
                  size="small"
                  style="width:180px;margin-left: 3px"
                ></el-input>
                <el-button
                  size="small"
                  type="primary"
                  style="margin-left: 5px"
                  @click="rightselect"
                >查询
                </el-button>
              </div>
              <el-table
                :data="rightdata"
                size="small"
                border
                @header-dragend="changeColWidth"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                ref="selection"
                @selection-change="checkRightAll"
                style="width: 100%"
                row-key="index"
                :height="tableheight"
              >
                <el-table-column type="selection" width="60" show-overflow-tooltip></el-table-column>
                <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="matterproOriginalUnit" label="物性单位"></el-table-column> -->
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="dialogNameVisible"
               :append-to-body="true" width="500px" top="15vh">
        <el-form>
          <el-form-item label="模型名称">
            <el-input v-model="VisibleName"  placeholder="请输入模型名称"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmName">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import {mapGetters, mapState} from "vuex";
import VueHoverMask from "vue-hover-mask";
import topColor from "./top-color";
import go from "gojs";
import {
  initGojs_yulan,
  initDataPublicTemple_yulan,
  initDiaTempleAndDraw_yulan,
} from "@/api/mygojs/finalGojs_yulan.js/";
import {
  initGojs,
  initDataPublicTemple,
  initDiaTempleAndDraw,
  initPalTempleAndDraw
} from "@/api/mygojs/finalGojs_bianji.js/";
import {
  getNewPortkeyId,
  getMapList,
  add,
  addDk,
  update,
  publish,
  remove,
  removeById,
  updateDk,
  addEmptyModel,
  addModel,
  searchTyList,
  searchEntityName,
  addTy,
  selectTyById,
  searchPortList,
  searchRes,
  searchTyClass,
  removePortByTyId,
  addTyClass,
  submitTyRes,
  selectClassById,
  selectResById,
  selectResUrlById,
  selectEntityOne,
  searchNewEntity,
  selectLastPost,
  waitSearchMaterpro,//待选物性
  alreadySearchMaterpro,//已选物性
  waitToAlreadyChoose,//把待选挪到已选 立刻生效到数据库 刷线待选已选
  alreadyTowaitChoose,//把已选挪到待选
  waitSearchMaterproByCode,//按code查询待选
  alreadySearchMaterproByCode,//按code查询已选
  jisuanModelToMonitor,//按code查询已选
  setType,//按code查询已选
  removeport,//根据keyId删除图元端口
  clearRightMatterpros,
  deleteHander,
  copyModel,//复制模型
  saveModel,//添加修改模型
  removeTyById,
  // selectTyById,
  // updateAvatar,
  closeJisuanModelToMonitor,
  updateTy
} from "@/api/qcadmin/model";


import {getNodes, updateAvatar} from "@/api/model_entity/modelentity";
import {getDeptLazyTreeDeviceMateriel} from "@/api/system/dept"; //物料表

import grid from "../../components/svg/grid";
import bold from "../../components/svg/bold";
import noBold from "../../components/svg/noBold";
import lazyTree from "../../components/custom/lazyTree";
import {loadFont_family, loadFont_Size} from '../../../public/tuozhuai/assets/js/data'

import Sortable from 'sortablejs'
import {delectMonitor, sortModel} from "../../api/qcadmin/model";
import '@/assets/iconFontSize/iconFont/iconfont.js'
import '@/assets/iconFontSize/iconFont/iconfont.css'
import {errorMsgbox} from "@/api/global_variable";

// const $ = go.GraphObject.make;
export default {
  name:'model',
  data() {
    return {
      leftHeight: 0,
      currentkey: '',
      mxgaoliang: 0,
      dialogNameVisible:false,
      VisibleName:'',
      gaoliang: 0,
      clickTimer: null, //双击间隔计时器
      matterlists: [],
      bProperties: "",
      authenStatus: 1,
      entryText: "",
      entryText_name: "",
      entryText_wx: "",
      dialogImageUrl: "",
      dialogVisible: false,
      limitCount: [],
      newAssetId: "",
      currentNodeId: '',
      rangeCode: "",
      waitCode: "",
      alreadyCode: "",
      treeData_wx: {},
      treeOption: {
        defaultExpandAll: true,
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
      tableheight: 0,
      tableheight_menu: 0,
      rightdata: [], // 右边列表数据
      leftdata: [], //左侧列表数据
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据
      leftsearch: "",
      rightsearch: "",
      rangeName: "",
      portcolor: "",
      newClassData: "",
      classCount: "",
      newResData: "",
      resCount: "",
      zero: 0,
      one: 1,
      imgs: [],
      addResName: "",
      addNewTyRes: false,
      addTyClass: "",
      addNewTyFl: false,
      selectEntityName: "",

      pixelModel:{
        imageUrl: "",
        eclassId:'',
        entityName: '',
        assetId: "",
      },
      entityId: "",
      assetName: "",
      eclassName: "",
      keyId: "",
      saveForm: {},
      formAddTy: {},
      inOutlist: [
        {
          key: 0,
          value: "出",
        },
        {
          key: 1,
          value: "入",
        },
      ],
      TyClassList: [],
      TyResList: [],
      TyList: [],
      DkList: [],
      row: {},
      visibleTy: "none",
      addPicDev: false, //新增图元弹框是否显示
      addPicDev_wx: false, //新增图元弹框是否显示
      nodes: [],
      treeData: [], //模型对象集合
      nowmapData: {}, //当前模型对象
      entity_key: " ", //初始化一个公共的图元key
      FileRenameSync: false,
      newName:
        this.nowmapData != null &&
        this.nowmapData.moName != null &&
        this.nowmapData.moName.trim() != ""
          ? this.nowmapData.moName
          : "未命名",
      yulanStatus: false,
      maplisttab_adit: false,
      divIdArr: [], //存放div的id

      //wqq
      isBold: true,
      fontSize: 11,
      fontSizes: [],
      fontFamily: 'Arial',
      fontFamilys: [],
      isFormatBrush: false,
      formatBrush: null,
      node: null,
      isPublished: false,
      oldModelName: "",//旧模型名称
      menuName:'',
      treeTitle:false
    };
  },
  computed: {
    ...mapState({
      showColor: (state) => state.common.showColor,
    }),
    ...mapGetters(["SET_COLOR_NAME"]),
  },
  components: {
    topColor,
    VueHoverMask,
    grid,
    bold,
    noBold,
    lazyTree
  },
  watch: {
    TyList: function () {
      //监听图元信息 并高亮显示选中
      this.$nextTick(function () {
        if (this.TyList.length > 0 && this.addPicDev == true) {
          this.$refs.TyList.setCurrentRow(this.TyList[this.gaoliang]);
          this.$nextTick(()=>{
            this.selectOneTy(this.TyList[this.gaoliang])
          })
        }
      });
    },
    DkList: function () {
      this.$nextTick(function () {
        if (this.DkList.length > 0) {
          this.$refs.DkList.setCurrentRow(this.DkList[0]);
        }
      });
    },
    treeData: function () {
      this.$nextTick(function () {
        if (this.treeData.length > 0) {
          this.$refs.treeData.setCurrentRow(this.treeData[this.mxgaoliang]);
        }
      });
    }
  },
  //mounted发生在页面加载之前
  mounted() {
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)
    this.loadFont();
    //将Vue方法传到全局对象window中
    window.addmsg_wx = this.addmsg_wx;
    window.gojsMenudata = this.gojsMenudata;

    window.setFont = this.setFont;

    this.initTableData(); //初始化模型数据
    this.rowDrop();

    // this.myDiagram = initGojs("myDiagramDiv");testgojs
    //初始化主地图
    let GojsMap = initGojs("myDiagramDiv", "myPaletteDiv"); //finalGojs
    this.myDiagram = GojsMap.Diagram; //finalGojs
    this.myPaletteDiv = GojsMap.Palette; //finalGojs
    //初始化预览地图
    let GojsMap2 = initGojs_yulan("myDiagramDiv2", "myOverviewDiv"); //finalGojs
    this.myDiagram2 = GojsMap2.Diagram; //finalGojs

    //获取所有定义的图元之后初始化画板区和素材区
    getNodes().then(
      (res) => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        console.log(res.data.data)
        this.nodes = res.data.data.message;
        // this.$message({
        //   type: "success",
        // });
        // initNodeTemplateMaps_type1("myPaletteDiv",this.nodes);
        initDataPublicTemple(this.nodes, this.myDiagram, this.myPaletteDiv);
        initPalTempleAndDraw(this.nodes, this.myPaletteDiv);

        initDataPublicTemple_yulan(this.nodes, this.myDiagram2);
      },
      (error) => {
        window.console.log(error);
      }
    );
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.tableheight = h - 220;
      this.tableheight_menu = h - 400;
      this.leftHeight = "height:" + (h - 220) + "px;";
    },
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    /**
     * 模型行拖拽
     */
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        draggable: ".el-table__row",
        onEnd(evt) {
          const currRow = _this.treeData.splice(evt.oldIndex, 1)[0]
          _this.treeData.splice(evt.newIndex, 0, currRow)
          var newArray = _this.treeData.slice(0);
          _this.treeData = [];
          _this.$nextTick(function () {
            _this.treeData = newArray;
            sortModel(_this.treeData).then(res => {
              if (res.data.code === 200) {
                _this.$message.success(res.data.msg);
              } else {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
            })
          });

        }
      })
    },
    /**
     * 修改节点样式
     */
    setFont(node) {
      this.node = node;
      if (node.isSelected) {
        //节点选中执行的内容
        // console.log(node.data.key);//拿到节点的Key,拿其他属性类似
        // console.log(node.data.category);//获取节点模版名称
        // console.log(node.data.fontSize);//获取节点文本字体
        if (node.data.fontSize != undefined && node.data.fontSize != null) {
          let familyStr = node.data.fontSize.split(',')[1];
          this.fontFamily = familyStr;
          let fontStr = node.data.fontSize.split(',')[0];
          this.isBold = fontStr.indexOf('bold') > -1;
          if (this.isBold) {
            this.fontSize = fontStr.split(' ')[1].substring(0, fontStr.split(' ')[1].length - 2);
          } else {
            this.fontSize = fontStr.split(' ')[0].substring(0, fontStr.split(' ')[0].length - 2);
          }
          if (!this.isFormatBrush) {
            this.formatBrush = {
              isBold: this.isBold,
              fontSize: this.fontSize,
              fontFamily: this.fontFamily
            }
          } else {
            this.isBold = this.formatBrush.isBold;
            this.fontSize = this.formatBrush.fontSize;
            this.fontFamily = this.formatBrush.fontFamily;
            this.changeFont();
          }
        } else {
          if (this.isFormatBrush) {
            this.isBold = this.formatBrush.isBold;
            this.fontSize = this.formatBrush.fontSize;
            this.fontFamily = this.formatBrush.fontFamily;
            this.changeFont();
          } else {
            this.formatBrush = {
              isBold: false,
              fontSize: '11',
              fontFamily: 'Arial'
            }
            this.isBold = this.formatBrush.isBold;
            this.fontSize = this.formatBrush.fontSize;
            this.fontFamily = this.formatBrush.fontFamily;
            this.changeFont();
          }
        }
      }

    },
    /**
     * 格式刷  取消格式刷
     */
    changeBrush() {
      if (this.fontSize == '' || this.fontFamily == '') {
        this.$message.warning('请先设置当前节点样式！')
        return false;
      }
      this.isFormatBrush = !this.isFormatBrush;
    },
    /**
     * 改变字体
     */
    changeFamily() {
      this.changeFont();
    },
    /**
     * 改变字号
     */
    changeFize() {
      this.changeFont();
    },
    /**
     * 加粗 取消加粗
     */
    changeBlod() {
      this.isBold = !this.isBold;
      this.changeFont();
    },
    changeFont() {
      if (this.node.isSelected) {
        //节点选中执行的内容
        console.log(this.node.data);//节点的属性信息
        // console.log(node.data.key);//拿到节点的Key,拿其他属性类似
        // console.log(node.data.category);//获取节点模版名称
        // console.log(node.data.fontSize);//获取节点文本字体
        // console.log(node.data.text);//获取节点文本内容

        //获取节点实例
        let node1 = this.myDiagram.model.findNodeDataForKey(this.node.data.key);

        //设置节点文本字体、加粗、大小
        let boldStr = this.isBold ? 'bold ' : '';
        let fontStr = boldStr;
        if (this.fontSize != '') {
          fontStr += this.fontSize + 'pt Helvetica,'
        }
        if (this.fontFamily != '') {
          fontStr += this.fontFamily + ',sans-serif';
        }
        this.myDiagram.model.setDataProperty(node1, "fontSize", fontStr);

        //设置节点显示文本内容
        // this.myDiagram.model.setDataProperty(node1, "text", this.node.data.text + "123123123");
      } else {
        //节点取消选中执行的内容
        // var node1 = myDiagram.model.findNodeDataForKey(node.data.key);
        // myDiagram.model.setDataProperty(node1, 'fill', "1F4963 ");

      }
    },
    /**
     * 加载字体、字号
     */
    loadFont() {
      this.fontSizes = loadFont_Size();
      this.fontFamilys = loadFont_family();
    },
    //用keyup事件判断x、y坐标是否输入合理
    watchValue(row, type) {
      let reg = new RegExp("^[0-1]$|^0.[0-9]+$");
      if (type == 1) {
        var flag = reg.test(row.alignmentX);
        if (!flag || row.alignmentX == "") {
          row.alignmentX = 0;
        }
      } else {
        var flag = reg.test(row.alignmentY);
        if (!flag || row.alignmentY == "") {
          row.alignmentY = 0;
        }
      }
    },
    //颜色改变
    colorChange(row) {
      var imgDiv = document.getElementById("imgId");
      var a = imgDiv.getElementsByTagName("div"); //判断imgDiv是否包含div元素
      if (a.length > 0) {
        for (let i = 0; i < this.divIdArr.length; i++) {
          $("#" + this.divIdArr[i]).remove(); //移除里面所有div
        }
      }
      updateDk(row).then(() => {
        searchPortList(this.entityId).then((data) => {
          if (data.data.code != 200){
            let that = this;
            errorMsgbox(that, data.data.msg);
          }
          this.DkList = data.data.data;
          this.drawPoint(this.DkList, this.divIdArr, imgDiv);
        });
      });
    },
    //关闭新增图元弹出框
    closeIt() {
      this.gaoliang = 0;
      getNodes().then(
        (res) => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.nodes = res.data.data.message;
          initDataPublicTemple(this.nodes, this.myDiagram, this.myPaletteDiv);
          initPalTempleAndDraw(this.nodes, this.myPaletteDiv);
          initDataPublicTemple_yulan(this.nodes, this.myDiagram2);
        },
        (error) => {
          window.console.log(error);
        }
      );
      this.addPicDev = false;
    },
    //选择资源加载资源图片
    selectPic() {
      selectResUrlById(this.pixelModel.assetId).then((data) => {
        if (data.data.code != 200){
          let that = this;
          errorMsgbox(that, data.data.msg);
        }
        this.pixelModel.imageUrl = data.data.data;
      });
    },
    //物料弹出框点击物料时触发
    nodeClick(data) {
      this.treeTitle = true
      //每次关闭物料物性配置菜单时，都会清空这两个成员元变量
      if (this.rangeCode != "" && this.rightdata.length > 0) {
        if (data.id != this.rangeCode) {
          //已经配置过的物料及物性的图元，直接切换到选中的物料，自动清除掉已配置的其它物料的物性
          clearRightMatterpros(this.nowmapData.moId, this.entity_key, this.rangeCode).then((res) => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            console.log(res)
          })
        }
      }
      if (data.islevel != undefined && data.islevel != null) {
        // if (data.islevel == '2') {
        //   this.rangeCode = data.id;
        // }
        if (data.islevel == '3') {
          this.rangeCode = data.id.split('_')[1];
        }
      }
      // this.rangeCode = data.id; //设置code值，并添加样式
      this.rangeName = data.title; //
      this.bProperties = this.rangeCode;
      this.entryText_name = this.rangeName;
      this.initTableData_wx(1);

    },
    // 选中需要进行数据库操作
    handelSelect() {
      //todo 判断已有的
      let codes = "";
      for (let i = 0; i < this.nowSelectData.length; i++) {
        //右侧的预计长度
        if (this.rightdata.length + (i + 1) > 3) {
          //todo  "只能选择3个主物性"
          this.$message.warning("主物性选择不能 超过3个");
          return;
        }
        if (i == 0) {
          codes = this.nowSelectData[i].matterproCode;
        } else {
          codes = codes + "," + this.nowSelectData[i].matterproCode;
        }
      }
      waitToAlreadyChoose(
        this.nowmapData.moId,
        this.rangeCode,
        this.entity_key,
        codes
      ).then(() => {
        this.initTableData_wx(1);
      });
    },
    // 取消需要进行数据库操作
    handleRemoveSelect() {
      let codes = "";

      for (let i = 0; i < this.nowSelectRightData.length; i++) {
        if (i == 0) {
          //todo 应为id
          codes = this.nowSelectRightData[i].entitywx_ID;
        } else {
          codes = codes + "," + this.nowSelectRightData[i].entitywx_ID;
        }
      }
      alreadyTowaitChoose(codes).then(() => {
        this.initTableData_wx(1);

      });
    },
    //初始化物性弹出框的左右侧数据
    initTableData_wx(flag) {
      // debugger
      console.log(flag)
      if (flag === 0) {
        //初始化树和左右列表，但是获取的data结构不符合tree标准待查，暂时不支持0状态
        getDeptLazyTreeDeviceMateriel().then((res) => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          console.warn("主表刷新:" + JSON.stringify(res));
          this.rangeCode = res.data[0].dictKey;
          this.treeData_wx = res.data;
          // mo_id,entity_key,materiel_id
          waitSearchMaterpro(
            this.nowmapData.moId,
            this.entity_key,
            this.rangeCode
          ).then((res) => {
            if(res.data.code == 200){
              this.leftdata = res.data.data;
              alreadySearchMaterpro(
                this.nowmapData.moId,
                this.entity_key,
                this.rangeCode
              ).then((res) => {
                if(res.data.code == 200){
                  this.rightdata = res.data.data;
                  this.entryText_wx = "";
                  for (let i = 0; i < this.rightdata.length; i++) {

                    this.entryText_wx +=
                      "\n" +
                      this.rightdata[i].matterproName +
                      ":" +
                      this.rightdata[i].analysisOriginalValue +
                      this.rightdata[i].matterproOriginalUnit;
                  }
                }else {
                  let that = this;
                  errorMsgbox(that, res.data.msg);
                }
              });
            }else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          });

        });
      } else {
        //todo 根据code更新左右列表
        waitSearchMaterpro(
          this.nowmapData.moId,
          this.entity_key,
          this.rangeCode
        ).then((res) => {
          if(res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
            this.leftsearch = "";
            this.leftdata = res.data.data;
            alreadySearchMaterpro(
              this.nowmapData.moId,
              this.entity_key,
              this.rangeCode
            ).then((res) => {
              if(res.data.code == 200){
                this.rightsearch = "";
                this.rightdata = res.data.data;
                this.entryText_wx = "";
                for (let i = 0; i < this.rightdata.length; i++) {
                  this.entryText_wx +=
                    "\n" +
                    this.rightdata[i].matterproName +
                    ":" +
                    this.rightdata[i].analysisOriginalValue +
                    this.rightdata[i].matterproOriginalUnit;
                }
                 }else {
                  let that = this;
                  errorMsgbox(that, res.data.msg);
                }
            });
          // }
        });
      }
    },
    //物料菜单点击左侧待选查询时
    leftselect() {
      if (this.rangeCode != null && this.rangeCode != "") {
        waitSearchMaterproByCode(
          this.nowmapData.moId,
          this.entity_key,
          this.rangeCode,
          this.waitCode
        ).then((res) => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.leftdata = res.data.data;
        });
      }
    },
    //物料菜单点击右侧已选查询时
    rightselect() {
      alreadySearchMaterproByCode(
        this.nowmapData.moId,
        this.entity_key,
        this.rangeCode,
        this.alreadyCode
      ).then((res) => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.rightdata = res.data.data;
      });
    },
    //物料菜单左侧待选 选中所有
    checkAll(val) {
      this.nowSelectData = val;
    },
    //物料菜单右侧已选 选中所有
    checkRightAll(val) {
      this.nowSelectRightData = val;
    },
    //删除资源
    deleteHander() {
      this.authenStatus = 0;
      this.$confirm("确定将资源删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.pixelModel.imageUrl = "";
          this.authenStatus = 1;
          deleteHander(this.pixelModel.assetId).then((res) => {
            if (res.data.code === 200){
              this.$message({
                type: 'success',
                message: res.data.msg
              });
              this.pixelModel.imageUrl = '';
              this.authenStatus = 1;
            }else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
        })
        .catch(() => {
          this.authenStatus = 1;
        });
    },
    //添加资源
    uploadImag(file) {
      selectResById(this.pixelModel.assetId).then((res) => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.resCount = res.data;
        if (this.resCount == 0) {
          submitTyRes(this.pixelModel.assetId).then((data) => {
            if (data.data.code != 200){
              let that = this;
              errorMsgbox(that, data.data.msg);
            }
            this.newAssetId = data.data;
            let fd = new FormData();
            fd.append("file", file.file);
            fd.append("assetId", data.data);
            updateAvatar(fd).then((res) => {
              this.handleAvatarSuccess(res, file);
            });
          });
        } else {
          let fd = new FormData();
          fd.append("file", file.file);
          fd.append("assetId", this.pixelModel.assetId);
          updateAvatar(fd).then((res) => {
            this.handleAvatarSuccess(res, file);
          });
        }
      });
    },
    //添加资源弹框弹出
    addPic() {
      this.addNewTyRes = true;
    },
    //添加资源弹框关闭
    addNewTyResClose() {
      this.addNewTyRes = false;
    },
    //插入资源
    submitTyRes() {
      if (this.addResName != "") {
        submitTyRes(this.addResName, this.pixelModel.imageUrl).then(() => {
          this.searchRes();
          this.$message.success("添加成功！");
        });
      }
      this.addResName = "";
      this.pixelModel.imageUrl = "";
      this.addNewTyRes = false;
    },
    //上传图片并返回路径
    handleAvatarSuccess(res, file) {
      // this.pixelModel.imageUrl = URL.createObjectURL(file.raw);action触发时的传入的参数和http-request调用时传入的参数时不一样的,通过网页请求的缺少校验值
      this.pixelModel.imageUrl = URL.createObjectURL(file.file);


    },
    // 上传按图片前校验参数
    beforeAvatarUpload(file) {
      this.authenStatus = 1;


      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG && !isJPG) {
        this.$message.error("上传资源图片只能是 PNG/JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传资源图片大小不能超过 2MB!");
      }
      return (isPNG || isJPG) && isLt2M;
    },
    //添加图元分类
    addFl() {
      this.addNewTyFl = true;
    },
    //添加图元分类关闭
    addNewTyFlClose() {
      this.addNewTyFl = false;
    },
    //保存图元分类
    submitTyFl() {
      if (this.addTyClass != "") {
        addTyClass(this.addTyClass).then(() => {
          this.searchTyClass();
          this.$message.success("添加成功！");
        });
        this.addNewTyFl = false;
      }
    },
    //画点方法封装
    drawPoint(DkList, divIdArr, imgDiv) {
      for (let i = 0; i < DkList.length; i++) {
        var oDiv = document.createElement("div"); //创建div元素
        oDiv.id = "oDiv" + i;
        oDiv.style.position = "absolute";
        oDiv.style.height = "5px";
        oDiv.style.width = "5px";
        oDiv.style.backgroundColor = DkList[i].portcolor;
        oDiv.style.left = 95 * DkList[i].alignmentX + "px"; //点的横坐标
        oDiv.style.top = 75 - 75 * DkList[i].alignmentY + "px"; //点的纵坐标
        divIdArr.push(oDiv.id); //将div的id放到数组中
        imgDiv.append(oDiv); //画点
      }
    },
    //保存端口信息
    saveDk(row, type) {
      var imgDiv = document.getElementById("imgId");
      var a = imgDiv.getElementsByTagName("div"); //判断imgDiv是否包含div元素
      if (a.length > 0) {
        for (let i = 0; i < this.divIdArr.length; i++) {
          $("#" + this.divIdArr[i]).remove(); //移除里面所有div
        }
      }
      if (row.portid == "" || row.portcolor == "" || row.alignment == "") {
        this.$message.warning("端口信息请填写完整！");
        //根据图元ID查询端口集合
        searchPortList(this.entityId).then((data) => {
          if (data.data.code != 200){
            let that = this;
            errorMsgbox(that, data.data.msg);
          }
          this.DkList = data.data.data;
        });
      } else {
        if (type == 1) {
          this.$set(row, "portidedit", false);
          updateDk(row).then(() => {
            searchPortList(this.entityId).then((data) => {
              if (data.data.code != 200){
                let that = this;
                errorMsgbox(that, data.data.msg);
              }
              this.DkList = data.data.data;
            });
          });
        } else if (type == 2) {
          this.$set(row, "portcoloredit", false);
          updateDk(row).then(() => {
            searchPortList(this.entityId).then((data) => {
              if (data.data.code != 200){
                let that = this;
                errorMsgbox(that, data.data.msg);
              }
              this.DkList = data.data.data;
            });
          });
        } else if (type == 3) {
          this.$set(row, "alignmenteditX", false);
          updateDk(row).then(() => {
            searchPortList(this.entityId).then((data) => {
              if (data.data.code != 200){
                let that = this;
                errorMsgbox(that, data.data.msg);
              }
              this.DkList = data.data.data;
              this.drawPoint(this.DkList, this.divIdArr, imgDiv);
            });
          });
        } else if (type == 4) {
          this.$set(row, "inOutedit", false);
          updateDk(row).then(() => {
            searchPortList(this.entityId).then((data) => {
              if (data.data.code != 200){
                let that = this;
                errorMsgbox(that, data.data.msg);
              }
              this.DkList = data.data.data;
              this.drawPoint(this.DkList, this.divIdArr, imgDiv);
            });
          });
        } else if (type == 5) {
          this.$set(row, "alignmenteditY", false);
          updateDk(row).then(() => {
            searchPortList(this.entityId).then((data) => {
              if (data.data.code != 200){
                let that = this;
                errorMsgbox(that, data.data.msg);
              }
              this.DkList = data.data.data;
              this.drawPoint(this.DkList, this.divIdArr, imgDiv);
            });
          });
        }
      }
    },
    //图元端口修改input显示
    changeCode(row, type) {
      if (type == 1) {
        this.$set(row, "portidedit", true);
      } else if (type == 2) {
        this.$set(row, "portcoloredit", true);
      } else if (type == 3) {
        this.$set(row, "alignmenteditX", true);
        this.$nextTick(() => {
          this.$refs[`markAlignmenteditX`].focus()
        })
      } else if (type == 5) {
        this.$set(row, "alignmenteditY", true);
        this.$nextTick(() => {
          this.$refs[`markAlignmenteditY`].focus()
        })
      } else if (type == 4) {
        if (row.inOut == 0) {
          this.zero = row.inOut;
        } else {
          this.one = row.inOut;
        }
        this.$set(row, "inOutedit", true);
      }
    },
    //图元端口点击事件
    selectOneDk(row) {

      this.keyId = row.keyId;
    },
    //删除图元端口
    deletePort() {

      if (this.keyId == "") {
        this.$message.warning("请选择一条端口数据！");
        return;
      }
      this.$confirm("确定将资源删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var imgDiv = document.getElementById("imgId");
        var a = imgDiv.getElementsByTagName("div"); //判断imgDiv是否包含div元素
        if (a.length > 0) {
          for (let i = 0; i < this.divIdArr.length; i++) {
            $("#" + this.divIdArr[i]).remove(); //移除里面所有div
          }
        }
        removeport(this.keyId).then((data) => {
          if (data.data.code != 200){
            let that = this;
            errorMsgbox(that, data.data.msg);
          }
          searchPortList(this.entityId).then((data) => {
            if (data.data.code != 200){
              let that = this;
              errorMsgbox(that, data.data.msg);
            }
            this.DkList = data.data.data;
            this.drawPoint(this.DkList, this.divIdArr, imgDiv);
          });
          this.$message.success("删除成功!");
        });
      });
    },
    //添加图元下的端口
    addPort() {
      var imgDiv = document.getElementById("imgId");
      var a = imgDiv.getElementsByTagName("div"); //判断imgDiv是否包含div元素
      if (a.length > 0) {
        for (let i = 0; i < this.divIdArr.length; i++) {
          $("#" + this.divIdArr[i]).remove(); //移除里面所有div
        }
      }
      if (
        this.entityId == "" ||
        this.entityId == null ||
        this.entityId == undefined
      ) {
        this.$message.warning("请选择一条图元进行添加！");
        return;
      }
      selectLastPost(this.entityId).then((res) => {
        if (res.data.code != 200){
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
        this.portid = res.data.data;
        //根据已有的list将
        let newLine = {
          keyId: this.DkList.keyId,
          entityId: this.entityId,
          portid: this.portid,
          portcolor: "#001A70",
          inOut: "0",
          alignment: "{x:0.5,y:0.5}",
          alignmentX: 0.5,
          alignmentY: 0.5,
          portidedit: false,
          portcoloredit: false,
          inOutedit: false,
          alignmenteditX: false,
          alignmenteditY: false,
        };
        addDk(this.entityId).then((res) => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          // getNewPortkeyId(this.entityId).then((res) => {
          //   if (res.data.code != 200){
          //     let that = this;
          //     errorMsgbox(that, res.data.msg);
          //   }
          //   //返回对象中取keyId
          //   newLine.keyId = res.data.data.keyId;
            // this.DkList.push(newLine); // 移到第一行
            searchPortList(this.entityId).then((res) => {
              this.DkList = res.data.data;
              this.drawPoint(this.DkList, this.divIdArr, imgDiv);
            })
          // });
        });
      });
    },
    //删除图元
    handleDelete(row) {
      this.$confirm("确定将资源删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var imgDiv = document.getElementById("imgId");
        var a = imgDiv.getElementsByTagName("div"); //判断imgDiv是否包含div元素
        if (a.length > 0) {
          for (let i = 0; i < this.divIdArr.length; i++) {
            $("#" + this.divIdArr[i]).remove(); //移除里面所有div
          }
        }
        this.entityId = row.entityId;
        removeTyById(row.entityId).then(res => {
          if (res.data.code === 200){
            this.$message({type: "success", message: res.data.msg});
            this.pixelModel.imageUrl = "";
            this.pixelModel.entityName = "";
            this.pixelModel.eclassId = "";
            this.pixelModel.assetId = "";
            this.searchTyList();
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
       });
    },
    //table修改样式事件
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    //图元行点击
    selectOneTy(row, event, column) {
      var imgDiv = document.getElementById("imgId");
      var a = imgDiv.getElementsByTagName("div"); //判断imgDiv是否包含div元素
      if (a.length > 0) {
        for (let i = 0; i < this.divIdArr.length; i++) {
          $("#" + this.divIdArr[i]).remove(); //移除里面所有div
        }
      }
      this.entityId = row.entityId;
      selectTyById(this.entityId).then((res) => {
        if (res.data.code === 200){
          let tempData = res.data.data
          this.pixelModel.imageUrl = tempData.assetSource
          this.pixelModel.eclassId = tempData.eclassId;
          this.pixelModel.entityName = tempData.entityName;
          if (tempData.assetId == -1) {
            this.pixelModel.assetId = "";
          } else {
            this.pixelModel.assetId = tempData.assetId;
          }
        }else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
      //根据图元ID查询端口集合
      searchPortList(this.entityId).then((res) => {
        if (res.data.code === 200){
          this.DkList = res.data.data;
          this.drawPoint(this.DkList, this.divIdArr, imgDiv);
        }else {
          let that = this;
          errorMsgbox(that, data.data.msg);
        }
      });
    },
    //查询图元资源集合
    searchRes() {
      searchRes().then((data) => {
        if (data.data.code != 200){
          let that = this;
          errorMsgbox(that, data.data.msg);
        }
        this.TyResList = data.data.data;
        this.TyResList.forEach((element) => {
          this.imgs.push(element.assetSource);
        });
      });
    },
    //查询图元分类集合
    searchTyClass() {
      searchTyClass().then((data) => {
        if (data.data.code != 200){
          let that = this;
          errorMsgbox(that, data.data.msg);
        }
        this.TyClassList = data.data.data;
      });
    },
    //时间格式化
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "y+": date.getFullYear().toString(), // 年
        "M+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "m+": date.getMinutes().toString(), // 分
        "s+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    //添加图元信息
    handleAdd() {
      addTy("图元" + this.dateFormat("yyyyMMddHHmmss", new Date())).then((res) => {
        if (res.data.code === 200){
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.searchTyList();
          this.gaoliang = 0;
          this.pixelModel.imageUrl = '';
        }else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    //添加图元下的端口
    addPortNew(i, alignmentNew) {
      // debugger
      let alignmentNewTest = eval("(" + alignmentNew + ")");
      selectLastPost(this.entityId).then((res) => {
        this.portid = res.data;
        //根据已有的list将
        let newLine = {
          keyId: this.DkList.keyId,
          entityId: this.entityId,
          portid: i + 1,
          portcolor: "#001A70",
          inOut: "0",
          alignment: alignmentNew,
          alignmentX: alignmentNewTest.x,
          alignmentY: alignmentNewTest.y,
          portidedit: false,
          portcoloredit: false,
          inOutedit: false,
          alignmenteditX: false,
          alignmenteditY: false,
        };
        this.DkList.push(this.entityId); // 移到第一行
        addDk(this.entityId).then((res) => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          //根据图元ID查询端口集合
          if (i == 3) {
            var imgDiv = document.getElementById("imgId");
            var a = imgDiv.getElementsByTagName("div"); //判断imgDiv是否包含div元素
            if (a.length > 0) {
              for (let i = 0; i < this.divIdArr.length; i++) {
                $("#" + this.divIdArr[i]).remove(); //移除里面所有div
              }
            }
            searchPortList(this.entityId).then((res) => {
              if (res.data.code != 200){
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              this.DkList = res.data.data;
              this.drawPoint(this.DkList, this.divIdArr, imgDiv);
            });
          }
        });
      });
    },
    //图元名称模糊查询
    handleSearchTy() {
      if (this.selectEntityName == "") {
        selectEntityOne().then((data) => {
          if (data.data.code != 200){
            let that = this;
            errorMsgbox(that, data.data.msg);
          }
          this.entityId = data.data.data.entityId;
          selectTyById(this.entityId).then((data) => {
            if (data.data.data == "") {
              return;
            }
            this.pixelModel.eclassId = data.data.eclassId;
            this.pixelModel.assetId = data.data.assetId;
            selectResUrlById(this.pixelModel.assetId).then((res) => {
              this.pixelModel.imageUrl = res.data.data;
            });
          });
          this.pixelModel.entityName = data.data.data.entityName;
          //根据图元ID查询端口集合
          searchPortList(this.entityId).then((data) => {
            this.DkList = data.data.data;
          });
        });
      }
      searchEntityName(this.selectEntityName).then((res) => {
        this.TyList = res.data.data;
        //this.entityName = "";
      });
    },
    //查询图元集合
    searchTyList() {
      searchTyList().then((data) => {
        this.TyList = data.data.data;
      });
    },
    //添加图元信息
    addmsg() {
      this.addPicDev = true;
      this.searchRes();//图元名称下拉
      this.searchTyClass();//图元分类下拉
      this.searchTyList();//图元列表
    },
    //模型上节点右键弹出框的数据源拼装
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
          if (
            v.matterproOriginalUnit != null &&
            v.matterproOriginalUnit != ""
          ) {
            matterlistObj.matterName =
              v.matterproName + "(" + v.matterproOriginalUnit + ")";
          } else {
            matterlistObj.matterName = v.matterproName;
          }
          matterlistObj.matterNum = v.analysisOriginalValue;
          matterlist.push(matterlistObj);
        }
      }

      this.menuName = name;
      this.matterlists = matterlist;
    },
    //双击节点弹出物料物性配置菜单,简称物料菜单
    addmsg_wx(entity) {
      this.rangeCode = "";
      this.rightdata = [];
      this.leftdata = [];
      this.entity_key = entity.key;
      this.bProperties = entity.bProperties;
      this.rangeName = entity.cxname;
      let data = {};
      data.id = this.bProperties;
      data.title = this.rangeName;
      // this.nodeClick(data);
      this.currentNodeId = data.id;
      this.rangeCode = this.currentNodeId;
      this.initTableData_wx(1);
      this.addPicDev_wx = true;
    },
    //保存模型修改
    updateTy(saveForm) {
      updateTy(saveForm).then((res) => {
        if(res.data.code === 200){
          this.$message({
              type: "success",
              message: res.data.msg,
          });
          this.searchTyList();
          this.searchRes();
          this.searchTyClass();
        }else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      });
    },
    //图元信息保存
    submitAddPicDev() {
      this.$set(this.saveForm, "entityId", this.entityId);
      this.$set(this.saveForm, "entityName", this.pixelModel.entityName);
      this.$set(this.saveForm, "eclassId", this.pixelModel.eclassId);
      this.$set(this.saveForm, "assetId", this.pixelModel.assetId);
      this.updateTy(this.saveForm);
    },
    //弹框关闭
    addPicDevClose() {
      this.addPicDev = false;
    },
    //关闭物料菜单时的数据处理
    addPicDevClose_wx() {
      this.addPicDev_wx = false;
      //todo 把实体的值赋给一个全局变量，每次关闭弹窗，清空该全局变量。
      console.log(this.entity_key)
      let nodeData = this.myDiagram.model.findNodeDataForKey(this.entity_key);
      if (nodeData != null) {
        //属性是物料id，据次设置树形表的默认选中项，调用nodelclick，自动加载左右列表。插入时，同moid同key 物料id不同的项全部设置为1
        if (this.treeTitle){
          nodeData.text = this.entryText_name;
        }
        nodeData.cxname = this.rangeName;
        nodeData.bProperties = this.bProperties; //物料id
        this.myDiagram.model.updateTargetBindings(nodeData);
        this.rangeCode = "";
        this.rangeName = "";
        this.rightdata = [];
        this.leftdata = [];
      }
    },

    //初始化全部模型集合，为模型列表提供数据
    initTableData() {
      getMapList().then((res) => {
        if (res.data.code === 200){
          this.treeData = res.data.data;
          if (this.treeData.length > 0) {
            this.rangeClick(this.treeData[0], 0);
          }
        }else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }

      });
    },
    //模型名称列表的单击触发的方法
    rangeClick(row, index) {
      let maint = this;
      this.isPublished = row.isPublish == 1;
      clearTimeout(this.clickTimer); //首先清除计时器
      this.clickTimer = setTimeout(() => {
        let moId = row.moId;
        // document.getElementById(moId).style.cursor = "pointer";

        let moContent = row.moContent;
        maint.nowmapData = row;
        maint.load(moContent);
        //todo返回图元列表对象 并重设数据。 加载地图和重命名二合一控件是两个空间，有你没我，有我没你
        for (let i = 0; i < maint.treeData.length; i++) {
          if (moId !== maint.treeData[i]["moId"]) {
            let mo = document.getElementById(maint.treeData[i]["moId"]);
            if (mo !== null) {
              mo.style.backgroundColor = null;
            }
          }
        }
      }, 300); //大概时间300ms
    },
    //双击模型名控件时,变为编辑状态
    changemoName(row) {
      this.oldModelName = row.moName;
      clearTimeout(this.clickTimer); //清除
      this.modelNameEdit = true;
      this.$set(row, "nameedit", true);
      setTimeout(() => {
        //因为el-input是延时创建的，所以我拿控件要推迟100ms
        let x = document.getElementById("input" + row.id);
        x.focus();
      }, 100);
    },
    //更改模型名
    updatemoName(row) {
      if (row.moName == ""){
        return this.$alert('模型名称不能为空', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(()=>{
          row.moName = this.oldModelName;
          this.$set(row, "nameedit", false);
        }).catch(()=>{
          row.moName = this.oldModelName;
          this.$set(row, "nameedit", false);
        })
      } else {
        let tempData = {
          isMoContent:false,
          moContent:row.moContent,
          moId:row.moId,
          modelName:row.moName,
        }
        this.saveModelList(tempData)
        this.VisibleName = ''

      }

      this.$set(row, "nameedit", false);
    },
    // 保存当前画板模型数据到控件mySavedModel
    addEmptyModel() {
      this.dialogNameVisible = true
    },
    //添加模型 修改模型名称 保存修改图元
    saveModelList(data,flag=false){
      saveModel(data).then(res=>{
        if (res.data.code === 200){
          this.$message(
            {
              type: "success",
              message: res.data.msg,
            },
          );
          if (flag){
            this.initTableData()
          }
        }else {
          let that = this;
          errorMsgbox(that, res.data.msg);
        }
      })
    },
    // 添加模型
    confirmName(){
      this.dialogNameVisible = false
      let tempData = {
        isMoContent:false,
        moContent:'',
        moId:'',
        modelName:this.VisibleName,
      }
      this.saveModelList(tempData,true)
      this.VisibleName = ''
    },
    //复制模型并生成一个新模型
    copyModel() {
      let moId = this.nowmapData["moId"];
      if (moId != null && moId.trim() != "") {
        let tempmodel = this.nowmapData;
        copyModel(tempmodel).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.initTableData()
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          },
        );
      } else {
        this.$alert("您还没有选择模板");
      }
    },
    // 删除已有模型
    delModel() {
      let moId = this.nowmapData["moId"];
      if (moId != null && moId.trim() != "") {
        // console.warn("当前选中删除的模型id:" + moId);
        remove(moId).then(
          res => {
            if (res.data.code === 200) {
              this.$message(
                {
                  type: "success",
                  message: res.data.msg,
                },
                this.initTableData(),
                (this.nowmapData["moId"] = null)
              );
            } else {
                let that = this;
                errorMsgbox(that, res.data.msg);
             }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.$message("您还没有选择模型");
      }
    },
    //是否隐藏网格线
    changeNowModel() {
      this.myDiagram.grid.visible = !this.myDiagram.grid.visible;
    },
    // 关闭预览页面
    yulan_close() {
      this.yulanStatus = !this.yulanStatus;
      closeJisuanModelToMonitor(this.nowmapData.moId).then(res=>{

      })
    },
    //打开预览页面
    yulan() {
      // // 把所有可操作属性设置为false。打开鹰眼和放大缩小模式;
      // this.myDiagram.isReadOnly = !this.myDiagram.isReadOnly;
      // this.myDiagram.ismodelfied = !this.myDiagram.ismodelfied;
      if (this.nowmapData.moId != null && this.nowmapData.moId != "") {
        jisuanModelToMonitor(this.nowmapData.moId).then(
          (res) => {
            if (res.data.data.length != 0) {
              this.yulanStatus = !this.yulanStatus;
              let moContent = res.data.data[0].modelRes;
              this.load_yulan(moContent);
            } else {
              this.$message("没有得出计算结果");
            }
          },
          (error) => {
            window.console.log(error);
          }
        );
      } else {
        this.$message("您还没有选择模型");
      }
    },
    // 设置当前模型为物性地图
    setWxdt() {
      let moId = this.nowmapData["moId"];
      if (moId != null && moId.trim() != "") {
        console.warn("当前选中删除的模型id:" + moId);
        //todo 调用一个接口去更新sm_cf_model_monitor表中与当前模型对应的记录的type，sm_cf_model_monitor中的数据由一个定时job联合查询计算获得并插入或更新数据库
        setType(moId, "物性地图").then(
          res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            } else {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.$message("您还没有选择模型");
      }
    },
    //设置当前模型为硫分布
    setLfb() {
      let moId = this.nowmapData["moId"];
      if (moId != null && moId.trim() != "") {
        console.warn("当前选中删除的模型id:" + moId);
        //todo 调用一个接口去更新sm_cf_model_monitor表中与当前模型对应的记录的type，sm_cf_model_monitor中的数据由一个定时job联合查询计算获得并插入或更新数据库
        setType(moId, "硫分布").then(
          res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            } else {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.$message("您还没有选择模型");
      }
    },
    //放大地图
    fangda() {
      this.myDiagram.scale = this.myDiagram.scale * 1.1;
    },
    //缩小地图
    suoxiao() {
      this.myDiagram.scale = this.myDiagram.scale * 0.9;
    },
    //保存当前模型
    saveNowModel() {
      this.isFormatBrush = false;
      let moId = this.nowmapData["moId"];
      if (moId != null && moId.trim() != "") {
        // console.warn("当前选中删除的模型id:" + moId);
        this.saveDiagramProperties(); //保存位置到myDiagram
        this.nowmapData["moContent"] = this.myDiagram.model.toJson();
        this.myDiagram.isModified = false;
        let tempData = {
          isMoContent:true,
          moContent:this.nowmapData.moContent,
          moId:this.nowmapData.moId,
          modelName:this.nowmapData.moName,
        }
        this.saveModelList(tempData)
      } else {
        this.$message("您还没有选择模型");
      }
    },
    /**
     * 发布当前模型
     */
    publishNowModel() {
      let moId = this.nowmapData["moId"];
      if (moId != null && moId.trim() != "") {
        console.log("当前选中删除的模型id:" + moId);
        this.saveDiagramProperties(); //保存位置到myDiagram
        this.nowmapData["moContent"] = this.myDiagram.model.toJson();
        this.myDiagram.isModified = false;
        publish(this.nowmapData).then(
          res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            } else {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
            }
            this.treeData.forEach(item => {
              if (item.moId === moId) {
                item.isPublish = 1;
              }
            })
            this.isPublished = true;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.$message("您还没有选择模型");
      }
    },
    /**
     * 撤销当前发布
     */
    revoke() {
      let moId = this.nowmapData["moId"];
      if (moId != null && moId.trim() != "") {
        delectMonitor(moId).then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          } else {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          this.treeData.forEach(item => {
            if (item.moId === moId) {
              item.isPublish = 0;
            }
          })
          this.isPublished = false;
        })
      } else {
        this.$message("您还没有选择模型");
      }

    },
    //加载控件中的模型数据到当前画板
    load(data) {
      if (data != null && data.trim() != "") {
        initDiaTempleAndDraw(data, this.myDiagram);
        this.loadDiagramProperties(); // 加载位置到myDiagram
      }
    },
    //加载预览数据
    load_yulan(data) {
      if (data != null && data.trim() != "") {

        initDiaTempleAndDraw_yulan(data, this.myDiagram2, this.nowmapData.moId);
        this.loadDiagramProperties_yulan(); // 加载位置到myDiagram
      }
    },
    //保存模型地图属性
    saveDiagramProperties() {
      this.myDiagram.model.modelData.position = go.Point.stringify(
        this.myDiagram.position
      );
    },
    //加载模型地图微信属性
    loadDiagramProperties() {
      let pos = this.myDiagram.model.modelData.position;


      if (pos) this.myDiagram.initialPosition = go.Point.parse(pos);
    },
    //加载预览的地图属性
    loadDiagramProperties_yulan() {
      let pos2 = this.myDiagram2.model.modelData.position;

      if (pos2) this.myDiagram2.initialPosition = go.Point.parse(pos2);
    },
  },
};
</script>
<style scoped="scoped" lang="scss">
/deep/ .el-card__body {
  padding: 0px 10px !important;
}


/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transform: translateX(70px);
}

/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
  width: 30px;
  height: 30px;
  float: left;
  transform: translateY(5px);
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
  clear: both;
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
  background-color: #fff;
  border: 0px solid #ebeef5;
  overflow: hidden;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
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
  line-height: 46px !important;
}

.input__inner {
  width: 60%;
}



/deep/ .el-dialog .el-dialog__body {
  flex: 1;
  /* overflow: auto; */
}

.ctxmenu {
  display: none;
  position: absolute;
  opacity: 0;
  margin: 0;
  padding: 8px 0;
  z-index: 999;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
  0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
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
  color: rgba(0, 0, 0, 0.87);
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
  opacity: 0.04;
}

.menu .menu {
  top: -8px;
  left: 100%;
}

.show-menu,
.menu-item:hover .ctxmenu {
  display: block;
  opacity: 1;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

i.el-tooltip.el-icon-view.item {
  color: #44cef6;
  font-size: 18px;
  padding: 0px 5px

}

i.el-tooltip.iconfont.icon-baocun.item {
  color: #d9b611;
  font-size: 18px;
  padding: 0px 5px

}

i.el-tooltip.el-icon-share.item {
  color: chocolate;
  font-size: 18px;
  padding: 0px 5px


}

i.el-tooltip.iconfont.icon-chexiao.item {
  color: #ff2d51;
  font-size: 18px;
  padding: 0px 5px

}

i.el-tooltip.iconfont.icon-wanggexian.item {
  color: steelblue;
  font-size: 18px;;
  padding: 0px 5px
}

svg.el-tooltip.icon.item {
  padding: 0 10px;
}

svg.icon {
  padding: 0px 10px;
}

/deep/ .el-table th {
    padding: 0;
    height: 35px;
}

/deep/ .el-checkbox {
  margin-left: 12px;
}

/*/deep/ .el-dialog[data-v-92377826]{*/
/*  position: absolute;*/
/*  top: 25%;*/
/*  left: 50%;*/
/*}*/
</style>
