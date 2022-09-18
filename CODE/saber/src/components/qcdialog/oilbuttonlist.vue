<template>
  <div>
    调合分组：
    <el-select size="small" style="width: 95px" @change="changetanknum" v-model="oilgroup" placeholder="请选择">
      <el-option
        v-for="item in oiloption"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button style="margin-left: 30px" size="small" @click="openmatterdialog(false)"><i class="el-icon-edit"/> 物性录入
    </el-button>
    <el-button style="margin-left: 30px" size="small" :disabled="blenddisable || !deleteAllTempFlag" @click="blendCompute"><i
      class="el-icon-cpu"/> 调合计算
    </el-button>
    <!--<el-button style="margin-left: 30px" size="small" @click="">模拟切割</el-button>-->
    <el-button style="margin-left: 30px" size="small" @click="saveResult"><i class="el-icon-folder-opened"/> 保存方案
    </el-button>
    <el-button style="margin-left: 30px" size="small" @click="oilresult"><i class="el-icon-document-checked"/> 调合结果
    </el-button>
    <el-button style="margin-left: 30px" size="small" @click="oilhistory"><i class="el-icon-time"/> 调合历史</el-button>
    <el-button style="margin-left: 30px" size="small" :disabled="!deleteAllTempFlag" @click="deleteAllTempData"><i class="el-icon-delete"/>  清除配置</el-button>
    <!--调合结果弹窗-->
    <el-dialog title="调合结果" :visible.sync="oilresultdialog" width="65%"
               :append-to-body="true" @close="colseoilresultdialog">
      <span slot="title" class="dialog-footer">
        <span style="color: black">调合结果</span>
        <el-button style="float:right;margin-right: 5%;" size="small" @click="exportData">导出</el-button>
      </span>
      <div style="padding: 10px 20px" align="center">
        <!-- <el-button style="" size="small" @click="exportData">导出</el-button> -->
        <div style="width: 100%;font-size: 20px;text-align: center;color: black">
          {{ resultname }}
        </div>
        <el-table :data="oilresultlistdata"
                  border style="width: 96%; margin-top: 20px" size="small">
          <el-table-column
            v-for="(item,index) in oilresultlistcolumn"
            :fixed="index==0"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            fit="true"
            :width="item.label=='名称'?260:null"
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
         <el-button @click="colseoilhistorydialog">关 闭</el-button>
       </span>-->
      <div style="height: 20px"></div>
    </el-dialog>

    <!--调合历史弹窗-->
    <el-dialog ref="workOrderTable" title="调合历史" :visible.sync="oilhistorydialog" width="55%" :close-on-click-modal='false'
               :append-to-body="true" @close="colseoilhistorydialog" >
      <div style="padding: 10px 20px">
        <el-table :data="oilhistoryData" :cell-style="{'text-align':'center'}" @selection-change="oilhistorySelectionChange" max-height="400"
                  :span-method="oilhistorySpanMethod" size="small" :header-cell-style="{'text-align':'center'}"  @header-dragend="changeColWidth"
                  border style=" margin-top: 20px">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="ZZF_NAME" label="产品名称" width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TANK_COUNT" width="80" min-width="80" label="调合数量" align="center"></el-table-column>
          <el-table-column prop="ZF_NAME" label="调合组分" width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="BLENDING_SCALE_F" width="90" label="调合比例(%)" align="center"></el-table-column>
          <el-table-column prop="CREATEDUSER" width="80" label="操作人" align="center"></el-table-column>
          <el-table-column prop="UPDATE_TIME" min-width="130"  label="计算时间" align="center"></el-table-column>
<!--          <el-table-column prop="UPDATE_TIME" width="0">-->
<!--            <template slot-scope="scope">-->
<!--              <span></span>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitoilhistorydialog">确 定</el-button>
        <el-button type="primary" @click="deleteoilhistoryData">删 除</el-button>
        <el-button @click="colseoilhistorydialog">取 消</el-button>
      </span>
    </el-dialog>

    <!--物性录入的弹窗-->
    <el-dialog title="物性录入" :visible.sync="matterdialog" width="1220px" :show-close="true"
               style="overflow: auto;margin-top: -50px;"
               :append-to-body="true" @close="colsedialog">
      <div class="dialogstyle">
        <div style="display: inline-block;width: 160px;height:495px;">
          <div class="el-scrollbar" style="height: 492px;background-color: #FFFFFF;border-radius: 5px">
            <el-menu @select="selectleftmenu"
                     ref="elmmenu"
                     :default-active="defaultActive"
                     class="el-menu-vertical-demo"
                     background-color="#FFFFFF"
                     text-color="#000000"
                     active-text-color="#FFFFFF">
              <el-menu-item index="0">
                <span slot="title">组分参数</span>
              </el-menu-item>
              <el-menu-item :index="i.tankCode" v-for="(i) in tankinfolist" :key="i.tankCode">
                <span v-if="i.tankCode!=0" slot="title">罐 {{ i.tankCode }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <div style="display: inline-block;width: 1030px;height:515px;float: right;">
          <div v-if="groupsize=='0'">
            <basic-container style="margin-left: -6px;margin-right: -6px;margin-bottom: 17px;">
              <div style="color: #409EFF;font-size: 16px">调合产品</div>
              <div style="margin-top: 10px;margin-top: 30px">
                <span style="margin-left: 20px">组分名称：</span>
                <el-input size="small" v-model="zfinfo.zfName" style="width: 220px"
                          @blur="updateTankInfo(zfinfo)"></el-input>
                <span style="margin-left: 30px">罐名称：</span>
                <el-input size="small" v-model="zfinfo.tankName" style="width: 220px"
                          @blur="updateTankInfo(zfinfo)"></el-input>
              </div>
              <div style="margin-top: 10px;height: 100px;">
                <div style="display: inline-block;margin-left: 20px;margin-top: 30px">关键物性：</div>
                <el-select size="small" v-model="zfinfo.matterproCode1" style="width: 220px;" @change="updatezfInfo">
                  <el-option
                    v-for="item in matterlist"
                    :key="item.matterproCode"
                    :label="item.matterproName"
                    :value="item.matterproCode">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="zfinfo.matterproCode2" style="width: 220px;margin-left: 20px"
                           @change="updatezfInfo">
                  <el-option
                    v-for="item in matterlist"
                    :key="item.matterproCode"
                    :label="item.matterproName"
                    :value="item.matterproCode">
                  </el-option>
                </el-select>
                <el-select size="small" v-model="zfinfo.matterproCode3" style="width: 220px;margin-left: 20px"
                           @change="updatezfInfo">
                  <el-option
                    v-for="item in matterlist"
                    :key="item.matterproCode"
                    :label="item.matterproName"
                    :value="item.matterproCode">
                  </el-option>
                </el-select>
              </div>
            </basic-container>
            <basic-container style="margin-top: -10px;margin-bottom: -10px;margin-left: -6px;margin-right: -6px;">
              <div style="color: #409EFF;font-size: 16px">组分管理</div>
              <div style="margin-bottom: 9px;margin-top: 10px">
                <span>调合模式：</span>
                <el-radio v-model="radio" label="1">质量调合</el-radio>
                <!-- <el-radio v-model="radio" disabled label="2">比率调合</el-radio>-->
              </div>
              <el-table size="small" :data="tankinfolist" border style="width: 950px"
                        :header-cell-style="{'text-align':'center'}"  @header-dragend="changeColWidth"
                        :cell-style="{'text-align':'center'}" :height="180">
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column property="tankName" label="罐名称" show-overflow-tooltip width="147"></el-table-column>
                <el-table-column property="zfName" label="组分名称" show-overflow-tooltip width="225">
                  <template slot-scope="{row,$index}">
                    <el-input @blur="updateTankInfo(row)" size="small" v-model="row.zfName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column property="blendingScale" show-overflow-tooltip label="调合数据(吨)" width="225">
                  <template slot-scope="{row,$index}">
                    <el-input @blur="judgeNumandPercent" size="small" v-model="row.blendingScale"
                              onkeyup="value=value.replace(/[^0-9.]/g,'')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column property="blendingScaleF" show-overflow-tooltip label="调合比例(%)" width="200"></el-table-column>
              </el-table>
            </basic-container>
          </div>
          <div v-else>
            <el-row>
              <basic-container style="margin-left: -6px;margin-right: -6px;margin-bottom: 6px">
                <div style="color: #409EFF;font-size: 16px">基本信息</div>
                <div style="margin-top: 10px">
                  <span>产品名称：</span>
                  <el-input size="small" v-model="tankinfo.zfName" style="width: 220px"
                            @blur="updateTankInfo(tankinfo)"></el-input>
                  <span style="margin-left: 20px">罐名称：</span>
                  <el-input size="small" v-model="tankinfo.tankName" style="width: 220px"
                            @blur="updateTankInfo(tankinfo)"></el-input>
                </div>
              </basic-container>
            </el-row>
            <el-row>
              <basic-container style="margin-left: -6px;margin-right: -6px;margin-bottom: 6px">
                <el-form>
                  <el-form-item label="录入方式：" style="margin: -10px 0px -10px 0px;">
                    <el-radio-group v-model="isShowList">
                      <el-radio :label="true"  @change="enteringwayChange(0)">油品选择</el-radio>
                      <el-radio :label="false"  @change="enteringwayChange(1)">手动录入</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </basic-container>
            </el-row>
            <el-row v-show="isShowList">
              <el-col :span="8">
                <basic-container style="margin-left: -6px;">
                  <el-row>
                    <el-col :span="24">
                      <el-form :inline="true" label-position="left" label-width="95px">
                        <el-form-item :label="listname" style="margin: 0px 0px;">
                          <div slot="label" style="line-height: 30px;margin-top: 0px">
                            <span style="color: #409EFF;font-size: 16px;">{{ listname }}</span>
                          </div>
                          <el-input size="small" v-model='oilname' style="width: 210px;margin-top: 0px;"
                                    :placeholder="inputname">
                            <el-button slot="append" icon="el-icon-search" @click="getOilData"></el-button>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </el-col>
                  </el-row>
                  <el-table size="small" :data="oilData" border ref="singleTable" style="margin-top: 9px;"
                            :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" :header-row-style="{height:'20px'}" highlight-current-row
                            @row-click="handleCurrentChange" :height="262" @row-dblclick="cancleCurrent" @header-dragend="changeColWidth"
                            @sort-change='sortChange'>
                    <template v-if="materieltypeId==9">
                      <el-table-column type="index" label="序号" width="65" align="center"
                                       show-overflow-tooltip></el-table-column>
                      <el-table-column property="cnName" label="原油名称" sortable="cnName">
                        <template slot-scope="scope">
                          <el-tooltip class="item" effect="light"
                                      placement="top-start">
                            <div slot="content">
                              <div style="margin-bottom: 5px;">
                                <label style="font-weight: bold;margin-bottom: 10px;">原油名称：</label>
                                <label>{{ scope.row.cnName }}</label><br>
                              </div>
                              <div style="margin-bottom: 5px;">
                                <label style="font-weight: bold;margin-bottom: 5px;">评价日期：</label>
                                <label>{{ scope.row.oilDate }}</label><br>
                              </div>
                              <div style="margin-bottom: 5px;">
                                <label style="font-weight: bold;margin-bottom: 5px;">数据来源：</label>
                                <label>{{ scope.row.datasource }}</label><br>
                              </div>
                            </div>
                            <span v-if="scope.row.cnName.length>20">{{ scope.row.cnName.substr(0, 20) }}...</span>
                            <span>{{ scope.row.cnName }}</span>
                          </el-tooltip>
                        </template>
                      </el-table-column>
                    </template>
                    <template v-else>
                      <el-table-column type="index" label="序号" width="65" align="center"
                                       show-overflow-tooltip></el-table-column>
                      <el-table-column property="WORKORDER_ODD" :label="navoilname" sortable="WORKORDER_ODD">
                        <template slot-scope="scope">
                          <el-tooltip class="item" effect="light"
                                      placement="top-start">
                            <div slot="content">
                              <div style="margin-bottom: 5px;">
                                <label style="font-weight: bold;margin-bottom: 10px;">{{navoilname}}：</label>
                                <label>{{ scope.row.WORKORDER_ODD }}</label><br>
                              </div>
                              <div style="margin-bottom: 5px;">
                                <label style="font-weight: bold;margin-bottom: 5px;">装置名称：</label>
                                <label>{{ scope.row.DEVICENAME }}</label><br>
                              </div>
                              <div style="margin-bottom: 5px;">
                                <label style="font-weight: bold;margin-bottom: 5px;">物料名称：</label>
                                <label>{{ scope.row.MATERIEL_NAME }}</label><br>
                              </div>
                              <div style="margin-bottom: 5px;">
                                <label style="font-weight: bold;">采样时间：</label>
                                <label>{{ scope.row.SAMPLE_TIME }}</label>
                              </div>
                            </div>
                            <span v-if="scope.row.WORKORDER_ODD.length>20">{{
                                scope.row.WORKORDER_ODD.substr(0, 20)
                              }}...</span>
                            <span>{{ scope.row.WORKORDER_ODD }}</span>
                          </el-tooltip>
                        </template>
                      </el-table-column>
                    </template>
                  </el-table>
                  <temlate>
                    <el-row  style="marginTop:2px;">
                      <el-col :span="14">&nbsp;</el-col>
                      <el-col :span="10" style="text-align: right;padding-right:7px;">
                        <span>共计：</span>
                        <span style="font-size:12px">{{oilData.length}}条</span>
                      </el-col>
                    </el-row>
                  </temlate>
                </basic-container>
              </el-col>
              <el-col :span="16">
                <basic-container style="margin-right: -6px">
                  <div style="color: #409EFF;font-size: 16px;margin-bottom: 8px;">物性信息
                    <i style="float: right;cursor: pointer" class="el-icon-s-unfold" @click="morematter"></i>
                    <span style="float: right;cursor: pointer;font-size: 12px" @click="morematter">物性配置</span>
                  </div>
                  <div style="height: 294px;width: 100%;border: 1px solid #E4E7ED;overflow: auto;">
                    <el-row>
                      <el-form :inline="true" label-width="175px" label-position="right">
                        <el-col :span="12" v-for="(ma,i) in tankinfo.mixMatterVOList" :key="i">
                          <el-form-item v-if="ma.matterproUnit == '' && ma.matterproName=='' "
                                        style="margin: 10px 0px;">
                            <el-input
                              :disabled="isShowList"
                              size="small"
                              @blur="matterproValue(ma,tankinfo)" type="text" v-model="ma.dataValue"
                              style="width: 130px"/>
                          </el-form-item>
                          <el-form-item v-else-if="ma.matterproUnit == '' && ma.matterproName!='' "
                                        :label="ma.matterproName+'：'" style="margin: 10px 0px;">
                            <el-input
                              :disabled="isShowList"
                              size="small"
                              @blur="matterproValue(ma,tankinfo)" type="text" v-model="ma.dataValue"
                              style="width: 130px"/>
                          </el-form-item>
                          <el-form-item v-else-if="ma.matterproUnit != '' && ma.matterproName!='' "
                                        :label="ma.matterproName+'('+ma.matterproUnit+')：'" style="margin: 10px 0px;">
                            <el-input
                              :disabled="isShowList"
                              size="small"
                              @blur="matterproValue(ma,tankinfo)" type="text" v-model="ma.dataValue"
                              style="width: 130px"/>
                          </el-form-item>
                        </el-col>
                      </el-form>
                    </el-row>
                  </div>
                </basic-container>
              </el-col>
            </el-row>
            <el-row  v-show="!isShowList">
              <el-col>
                <basic-container style="margin-right: -6px;margin-left: -6px;">
                  <div style="color: #409EFF;font-size: 16px">物性信息
                    <i style="float: right;cursor: pointer ;" class="el-icon-s-unfold" @click="morematter"></i>
                    <span style="float: right;cursor: pointer;font-size: 12px" @click="morematter">物性配置</span>
                  </div>
                  <div style="height: 310px;width: 100%;border: 1px solid #E4E7ED;overflow: auto;margin-top: 8px">
                    <el-row>
                      <el-form :inline="true" label-width="175px" label-position="right">
                        <el-col :span="12" v-for="(mav,i) in tankinfo.mixMatterVOList" :key="i">
                          <el-form-item v-if="mav.matterproUnit == '' && mav.matterproName=='' " style="margin: 10px 0px;">
                            <el-input
                              :disabled="isShowList"
                              size="small"
                              @blur="matterproValue(mav,tankinfo)" type="text" v-model="mav.dataValue"
                              style="width: 130px"/>
                          </el-form-item>
                          <el-form-item style="margin: 10px 0px;" v-else-if="mav.matterproUnit == '' && mav.matterproName!='' "
                                        :label="mav.matterproName+'：'">
                            <el-input
                              :disabled="isShowList"
                              size="small"
                              @blur="matterproValue(mav,tankinfo)" type="text" v-model="mav.dataValue"
                              style="width: 130px"/>
                          </el-form-item>
                          <el-form-item style="margin: 10px 0px;" v-else-if="mav.matterproUnit != '' && mav.matterproName!='' "
                                        :label="mav.matterproName+'('+mav.matterproUnit+')：'">
                            <el-input
                              :disabled="isShowList"
                              size="small" value="mav.dataValue"
                              @blur="matterproValue(mav,tankinfo)" type="text" v-model="mav.dataValue"
                              style="width: 130px"/>
                          </el-form-item>
                        </el-col>
                      </el-form>
                    </el-row>
                  </div>
                </basic-container>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: -5px">
        <el-button @click="colsedialog">取 消</el-button>
        <el-button type="primary" @click="submitdialog">确 定</el-button>
      </span>
    </el-dialog>

    <!--抽屉弹窗-->
    <el-drawer title="调合物性配置" :append-to-body="true"
               :visible.sync="drawer" size="60%"
               direction="rtl" @close="clonePhysicalConfiguration"
               :before-close="drawerhandleClose">
      <basic-container>
        <el-row>
          <el-col :span="10">
            <div style="margin-bottom: 15px">
              <span>待选物性:</span>
              <el-input placeholder="请输入物性编码/名称" v-model="leftsearch" size="small"
                        style="width:180px;margin-left: 3ex"></el-input>
              <el-button size="small" type="primary" style="margin-left: 5ex" @click="leftselect">
                查询
              </el-button>
            </div>
            <el-table size="small"
                      :data="leftdata"
                      border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                      @selection-change="checkLeftAll"
                      style="width: 100%"  @header-dragend="changeColWidth"
                      row-key="index"
                      :height=tableheight>
              <el-table-column
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                prop="matterproCode"
                label="物性编码"
                width="80"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="matterproName"
                label="物性名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="matterproUnit"
                label="物性单位"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="4">
            <div class="opSetting">
              <div>
                <el-button icon="el-icon-d-arrow-right" @click="handelSelect" :disabled="leftdisable" size="medium"
                           type="primary">
                  选中
                </el-button>
              </div>
              <div class="spacing">
                <el-button icon="el-icon-d-arrow-left" @click="handleRemoveSelect" :disabled="rightdisable"
                           size="medium" type="primary">
                  取消
                </el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="margin-bottom: 15px">
              <span>已选物性:</span>
              <el-input placeholder="请输入物性编码" type="hidden" v-model="leftsearch" size="small"
                        style="width:150px;margin-left: 3ex"></el-input>
            </div>
            <el-table id="dxwxtd"
                      :data="matterlist" size="small"
                      border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                      ref="selection" @header-dragend="changeColWidth"
                      @selection-change="checkRightAll"
                      style="width: 100%"
                      row-key="index"
                      :height=tableheight>
              <el-table-column
                type="selection"
                width="50">
              </el-table-column>
              <el-table-column
                prop="matterproCode"
                show-overflow-tooltip
                width="80"
                label="物性编码"
              >
              </el-table-column>
              <el-table-column
                prop="matterproName"
                label="物性名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="matterproUnit"
                label="物性单位"
                width="90"
                show-overflow-tooltip
              >
                <template slot-scope="{row,$index}">
                  <span v-if="row.flag">{{ row.matterproUnit  }}</span>
                  <el-select v-else v-model="row.matterproUnit" @focus="pslppyUnitClick(row)" @change="pslppyUnitChange(row)" placeholder="空">
                    <el-option
                      v-for="item in row.mixWxUnitAndCodes"
                      :key="item.wxUnitCode"
                      :label="item.wxUnit"
                      :value="item.wxUnit">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="accuracy"
                label="物性精度"
                width="80"
                show-overflow-tooltip
              >
                <template slot-scope="{row,$index}">
                      <el-input size="mini" ref="customerInput" v-if="!row.flag"
                                v-model="row.accuracy"
                                placeholder="请输入内容"
                                type="text"></el-input>
                  <el-row v-else>
                    <el-row>
                        <span>{{ row.accuracy  }}</span>
                    </el-row>
                  </el-row>


                </template>
              </el-table-column>
            <el-table-column fixed="right" label="操作"  show-overflow-tooltip>
                <template slot-scope="{row,$index}">
                  <el-row v-if="!row.flag">
                    <el-col style="margin-top: 3px;text-align: right;">
                      <i class="el-icon-check" @click="handleEdit(1, row,true)"
                         style="cursor: pointer;font-size: 15px;color: #409EFF"></i>
                      <i class="el-icon-close" @click="handleEdit(2, row,false)"
                         style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px;margin-right: 6px;"></i>
                    </el-col>
                  </el-row>
                  <el-row v-else>
                        <i class="el-icon-edit" @click="changeedit(2,row)"
                           style="cursor: pointer;font-size: 15px;color: #409EFF"></i>
                  </el-row>
                </template>
            </el-table-column>

            </el-table>
            <span style="font-size: 10px">注：左键选中物性行拖拽，可进行排序</span>
          </el-col>
        </el-row>
      </basic-container>
    </el-drawer>
  </div>
</template>

<script>
  import $ from "jquery";
  import Sortable from 'sortablejs';
  import {reloadData} from "@/api/qcblend/dataReload.js";
  import {getnewOilData} from "@/api/qcblend/newoilData.js";
  import {getMixCtMainByUser, removeAll, blendCompute, detail} from "@/api/qcblend/mixCtMain";
  import {
    getMixCtTankinfoByMainId, updateTankInfo, updateByMainId,
    getMixCtTankinfoByMainIdAndCode, getMixCtTankinfoParam,delectMixMatterproByBoctmainId
  } from "@/api/qcblend/mixCtTankinfo";
  import {
    selectMixCtMatterproConfig, waitsearchMatterConfig,updateCtMatterConfig,selectMatterproUnitByCode,
    removeCtMatterConfig, addCtMatterConfig, updateConfigRowOrder, removeDefaultMatterpros
  } from "@/api/qcblend/mixCtMatterproConfig";
  import {
    saveOne, deleteByMainIdAndTankCode, insertByMainIdAndCodeAndOilId,
    insertGasMessageByMainId
  } from "@/api/qcblend/mixCtMatterpro";
  import {
    saveOrRemove, getRightData, selectHistoryResultData,
    removeResultHistoryData, submitHistory, selectResultData
  } from "@/api/qcblend/mixResultMain";
  import {
    searchOil,
    selectGasOilData,
    exportData,
    selectAllOilDataOrderBy,
    selectGasOilDataOrderBy
  } from "@/api/qcblend/oilData";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name: "oilbuttonlist",
    props: {
      materieltypeId: {
        type: Number,
        default: () => 0
      },//物料类型,页面加载当前组件，根据不同的页面进行封装
    },
    data() {
      return {
        defaultActive: '0',
        blenddisable: true,//调合计算的按钮是否可以点击
        oiloption: [{
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }],//分組的默认值
        oilgroup: '2',//默认值
        groupsize: 0,
        oilresultdialog: false,//调合结果的弹窗
        oilresultlistdata: [],//调合结果数据
        oilresultlistcolumn: [],//调合结果的列
        oilhistorydialog: false,//调合历史的弹窗
        oilhistoryData: [],//调合历史的数据
        oilhistoryselected: [],//调合历史数据选中的数据
        createdUser: '',//创建用户
        matterlist: [],//物料集合
        radio: "1",
        dialogData: [],//组分数据
        oilData: [],//原油列表数据
        oilname: '',//原油列表的名称查询数据
        ctmaindata: {},//临时表的主表数据
        zfinfo: {},//组分参数
        tankinfolist: [],//罐信息列表
        matterdialog: false,//弹窗默认关闭
        drawer: false,
        nowSelectData: [],// 左边选中列表数据
        nowSelectRightData: [],// 右边选中列表数据
        leftdisable: true,
        rightdisable: true,
        leftsearch: '',
        leftdata: [],//左侧待选物性
        flag: '0',//保存方案的点击标记
        tankinfo: {},//罐的相关数据信息
        resultjson: {},//数据返回对象
        indexInfoList: [],//历史的记录数据
        resultname: '',
        resultMainId: 0,//历史主表的id
        timer: null,
        listname: '',
        inputname: '',
        username: '',
        isShowList: true, // 是否为列表选择
        selectType: 0, //列表选择
        metaIndex: 0, //原菜单索引
        newIndex: 0, //新菜单索引
        menuIndex: 0, //当前菜单索引
        navoilname:'汽油名称',//油管列表表头名称
        // reconcileData:{},
        logsTankinfo1:{},//回显数据
        logsTankinfo2:{},//回显数据
        logsTankinfo3:{},//回显数据
        logsTankinfo4:{},//回显数据
        logsTankinfo5:{},//回显数据
        logsTankinfo6:{},//回显数据
        tabsIndex:'', //罐切换下标
        atpresentData1:'',//当前选中罐1信息
        atpresentData2:'', //当前选中罐2信息
        atpresentData3:'', //当前选中罐2信息
        atpresentData4:'', //当前选中罐2信息
        atpresentData5:'', //当前选中罐2信息
        atpresentData6:'', //当前选中罐2信息
        historyFlag: false,
        chartData:[],
        pslppyUnitList:{}, //物性单位下拉数据
        backupsMatterlist:[],
        backupsMatterlists:[],
        deleteAllTempFlag:false,
      }
    },
    watch: {
      backupsMatterlists(){
        console.log(this.backupsMatterlists)
      },
      isShowList() { //监听录入方式变化
        //defaultActive
        //记录实体
        // if (!this.isShowList){
        //   this.selectType = 1;//手动录入
        // }else {
        //   this.selectType = 0;//列表选择
        // }
        // let arrTemp=[];
        // arrTemp.push({
        //   index:1,
        //   selectType:0 //列表选择
        // })
        // arrTemp.push({
        //   index:2,
        //   selectType:1 //手动录入
        // })
        //根据defaultActive   索引去查  当前录入方式，数据回显
        //如果在一个菜单下，才清空，若菜单值发生变化，不需要清空
        //元索引等于新索引
        // console.log('切换录入')
        this.metaIndex = this.menuIndex
      }


    },
    beforeMount() {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.tableheight = h - 220;
    },
    mounted() {
      // console.log(111111111,'///')
      if (this.materieltypeId == 9) {
        this.resultname = "原油调合历史";
        this.listname = "原油列表";
        this.inputname = "请输入原油名称";
        this.$nextTick(()=>{
          this.navoilname='原油名称'
        })
      } else if (this.materieltypeId == 8) {
        this.resultname = "汽油调合历史";
        this.listname = "汽油列表";
        this.inputname = "请输入汽油名称";
        this.$nextTick(()=>{
          this.navoilname='汽油名称'
        })
      } else if (this.materieltypeId == 5) {
        this.resultname = "柴油调合历史";
        this.listname = "柴油列表";
        this.inputname = "请输入柴油名称";
        this.$nextTick(()=>{
          this.navoilname='柴油名称'
        })
      } else if (this.materieltypeId == 11) {
        this.resultname = "燃料油调合历史";
        this.listname = "燃料油列表";
        this.inputname = "请输入燃料油名称";
        this.$nextTick(()=>{
          this.navoilname='燃料油名称'
        })
      }
      this.selectMixCtMatterproConfig(this.materieltypeId);

    },
    beforeDestroy() {//页面销毁之前
      //判断当前方案是否被保存过了，
      if ("1".anchor(this.flag)) {//已保存
      } else {//为保存，提示用户是否保存
        //this.saveOrRemove();
      }
    },
    methods: {
      changeColWidth(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      enteringwayChange(index){
        delectMixMatterproByBoctmainId(this.ctmaindata.boctmainId,this.tankinfo.tankCode,index).then(res=>{
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
        if(index == 0){
            // console.log('自动');
            this.tankinfo.mixMatterVOList.forEach(item => {
              item.dataValue = '';
            })
        }else{
          // console.log('手动');
          this.removeEnteringWay()
        }
      },
      removeEnteringWay(){
          if(this.tabsIndex == 1 ){
            this.atpresentData1 = -1
            this.logsTankinfo1={}
            this.tankinfo.mixMatterVOList.forEach(item => {
              item.dataValue = '';
            })
          }else if(this.tabsIndex == 2){
            this.atpresentData2 = -1
            this.logsTankinfo2={}
            this.tankinfo.mixMatterVOList.forEach(item => {
              item.dataValue = '';
            })
          }else if(this.tabsIndex == 3){
            this.atpresentData3 = -1
            this.logsTankinfo3={}
            this.tankinfo.mixMatterVOList.forEach(item => {
              item.dataValue = '';
            })
          }else if(this.tabsIndex == 4){
            this.atpresentData4 = -1
            this.logsTankinfo4={}
            this.tankinfo.mixMatterVOList.forEach(item => {
              item.dataValue = '';
            })
          } else if(this.tabsIndex == 5){
            this.atpresentData5 = -1
            this.logsTankinfo5={}
            this.tankinfo.mixMatterVOList.forEach(item => {
              item.dataValue = '';
            })
          }else if(this.tabsIndex == 6){
            this.atpresentData6 = -1
            this.logsTankinfo6={}
            this.tankinfo.mixMatterVOList.forEach(item => {
              item.dataValue = '';
            })
          }

      },
      //物性单位下拉选中事件
      pslppyUnitChange(row){
      },
      //物性单位下拉获取焦点时触发
      pslppyUnitClick(row){
        let matterproCode = row.matterproCode
        selectMatterproUnitByCode(matterproCode).then(res=>{
          if(res.data.code == 200){
            row.mixWxUnitAndCodes =  res.data.data.mixWxUnitAndCodes
            this.$set(row, `mixWxUnitAndCodes`,  res.data.data.mixWxUnitAndCodes)
          }else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      },
      //物性精度输入款事件
      precisionaChange(row){
      },
      //开始编辑物性精度
      changeedit(index,row){
        this.backupsMatterlists.forEach((item,i)=>{
          this.matterlist.forEach((ele,j)=>{
            if(item.configId == ele.configId){
              this.matterlist[j].accuracy = this.backupsMatterlists[i].accuracy
              this.matterlist[j].matterproUnit = this.backupsMatterlists[i].matterproUnit
            }
          })
        })
        this.matterlist.forEach((item,index)=>{
          if(item.configId == row.configId){
            this.matterlist[index].flag = !this.matterlist[index].flag
          }else if(item.configId != row.configId) {
            this.matterlist[index].flag = true
          }
        })
        this.matterlist.push({a:0})
        this.matterlist.pop()

        // this.matterlist = this.backupsMatterlists

      },
      //保存-取消编辑物性精度
      handleEdit(index,row){
        if(index == 1){

          if(isNaN(Number(row.accuracy))){
            this.$message.error('只能输入数字!');
            this.backupsMatterlist.forEach((item,index)=>{
              if(item.configId == row.configId){
                row.accuracy = this.backupsMatterlist[index].accuracy
              }
            })
            return false
          }
          if(row.accuracy<0||row.accuracy>6){
            this.$message.error('不能大于6或小于0!');
            this.backupsMatterlist.forEach((item,index)=>{
              if(item.configId == row.configId){
                row.accuracy = this.backupsMatterlist[index].accuracy
              }
            })
            return false
          }
          let data = {
            accuracy: row.accuracy,
            configId: row.configId,
            createUser: row.createUser,
            createddate: row.createddate,
            materieltypeId: row.materieltypeId,
            matterproCode: row.matterproCode,
            matterproUnit: row.matterproUnit,
            uorder: row.uorder,
          }
          updateCtMatterConfig(data).then(res=>{
            if(res.data.code!==200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.selectMixCtMatterproConfig()
          })
          this.$set(row, "flag", !row.flag);
          this.matterlist.push({a:0})
          this.matterlist.pop()
        }else {
          this.backupsMatterlists.forEach((item,i)=>{
            this.matterlist.forEach((ele,j)=>{
              if(item.configId == ele.configId){
                this.matterlist[j].accuracy = this.backupsMatterlists[i].accuracy
                this.matterlist[j].matterproUnit = this.backupsMatterlists[i].matterproUnit
              }
            })
          })
          this.matterlist.forEach((item,index)=>{
            if(item.configId == row.configId){
              this.matterlist[index].flag = !this.matterlist[index].flag
            }else if(item.configId != row.configId) {
              this.matterlist[index].flag = true
            }
          })
          this.matterlist.push({a:0})
          this.matterlist.pop()
          this.matterlist.push({a:0})
          this.matterlist.pop()
        }
      },
      //关闭物性配置时
      clonePhysicalConfiguration(){
        // console.log('关闭时')
        this.RefreshTheConfiguration(this.tabsIndex)

      },

      RefreshTheConfiguration(tankCode){
           getMixCtTankinfoByMainIdAndCode(this.ctmaindata.boctmainId, this.materieltypeId,tankCode,this.selectType).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.tankinfo = res.data.data[0];
            if(res.data.data[0].wkId === ''){
                this.isShowList = false
              }else{
                this.isShowList = true
              }

          const malist = this.tankinfo.mixMatterVOList;
          for (var j = 0; j < malist.length; j++) {
            if (malist[j].dataValue == -1) {
              malist[j].dataValue = '';
            }
          }
          this.selectcrudeblendoil()

        });
      },
      //根据表头排序
      sortChange(column) {
        // console.log(column,'/column')

        if (this.materieltypeId == 9) {
          let proNme = '';
          if (column.prop != '') {
            proNme = this.toLine(column.prop);
          }
          let orderby = 'ASC';
          if (column.order == 'descending') {
            orderby = 'DESC';
          }
          // console.log(this.oilname,'/this.oilname')
          selectAllOilDataOrderBy(this.oilname, proNme, orderby).then(res => {
            if (res.data.code == 200){
              this.oilData = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
        } else {
          let proNme = column.prop;
          let orderby = 'ASC';
          if (column.order == 'descending') {
            orderby = 'DESC';
          }
          selectGasOilDataOrderBy(this.oilname, this.materieltypeId, proNme, orderby).then(res => {
            if (res.data.code == 200) {
              this.oilData = res.data.data;
            } else {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          })
        }

      },

      // 驼峰转换下划线
      toLine(name) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
      },
      //导出
      exportData() {
        // var elemIF = document.createElement('iframe')
        // elemIF.src = '/api/qcblend-crudeblend/oildata/exportData?resultname=' + this.resultname + '&resultMainId=' + this.resultMainId + '&tankNum=' + this.ctmaindata.tankNum + '&materieltypeId=' + this.materieltypeId + '&username=' + this.username;
        // elemIF.style.display = 'none'
        // document.body.appendChild(elemIF);
        function fillZero (str) {
          var realNum;
          if (str < 10) {
            realNum = '0' + str;
          } else {
            realNum = str;
          }
          return realNum;
        }
        let now = new Date();
        let year = now.getFullYear(); //获取完整的年份(4位,1970-????)
        let month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        let today = now.getDate(); //获取当前日(1-31)
        let hour = now.getHours(); //获取当前小时数(0-23)
        let minute = now.getMinutes(); //获取当前分钟数(0-59)
        let second = now.getSeconds(); //获取当前秒数(0-59)
        let nowTime = ''
        nowTime = year + fillZero(month) + fillZero(today) + '_' + fillZero(hour)+ fillZero(minute) + fillZero(second)
        let resultname =  this.resultname+`(${nowTime})`;

        exportData(resultname, this.resultMainId, this.ctmaindata.tankNum, this.materieltypeId, this.username).then((res) => {
          const content = res.data;
          const blob = new Blob([content], {type: 'application/vnd.ms-excel'});
          // let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = resultname;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            elink.setAttribute('download', resultname + '.xlsx');
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, resultname);
          }
        });

      },
      //保存方案
      saveResult() {
        if (this.resultMainId == 0) {
          this.$message.warning("请进行调合计算或选择一条调合历史记录！");
        } else {
          this.flag = '1';//修改标记表示已经点击过方案
          this.saveOrRemove();
        }
      },
      //保存或删除方案
      saveOrRemove() {
        saveOrRemove(this.materieltypeId, this.flag, this.resultjson.rmain_id, this.resultjson.new_oil_id, this.resultjson.cp_name).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      },
      //删除所有的临时数据
      deleteAllTempData() {
        removeAll(this.materieltypeId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.selectMixCtMatterproConfig(this.materieltypeId);
          this.oilresultdialog = false
          this.chartData = []
          this.deleteAllTempFlag = false
          reloadData('', this.oilgroup);
          let dom = document.getElementsByClassName('box3tablediv')[0]
          dom.style.display = "none";
          // dom.style.display = "block";
          this.logsTankinfo1 = {}
          this.logsTankinfo2 = {}
          this.logsTankinfo3 = {}
          this.logsTankinfo4 = {}
          this.logsTankinfo5 = {}
          this.logsTankinfo6 = {}
        })
      },
      //判断临时主表中的数据是否存在,存在返回，不存在则新建后返回
      judgeCtMain(type) {
        // console.log(this.ctmaindata,'/ctmaindata')
        getMixCtMainByUser(this.oilgroup, type).then(res => {
          if (res.data.code == 200) {
            this.ctmaindata = res.data.data;
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          //根据当前临时主表的ID查询罐信息
          this.selectcrudeblendoil();
          this.selectMixCtMatterproConfig(this.materieltypeId);
          this.matterdialog = true;
        });
      },
      //根据用户名,物料类型查询用户配置的物性信息
      selectMixCtMatterproConfig() {
        this.matterlist = [];
        selectMixCtMatterproConfig(this.materieltypeId).then(res => {
          if (res.data.code == 200){
            res.data.data.forEach(item=>{
              item.flag = true
              item.mixWxUnitAndCodes = []
            })
            this.backupsMatterlists =JSON.parse(JSON.stringify(res.data.data))
            this.backupsMatterlist =JSON.parse(JSON.stringify(this.matterlist))
            this.matterlist = res.data.data;

            // console.log(this.matterlist,'/matterlist')
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      },
      //根据临时表主表ID查询罐信息
      selectcrudeblendoil() {
        getMixCtTankinfoByMainId(this.ctmaindata.boctmainId, this.materieltypeId).then(res => {
          if (res.data.code == 200) {
            var a = res.data.data[0];
            this.zfinfo = a[0];
            // console.log(this.zfinfo,'初进')
            this.tankinfolist = res.data.data[1];

            // if(!this.oilData.length){
            //   console.log(this.oilData,'新值')
            //   this.oilData = res.data.data[1];
            // }
            // console.log(this.oilData,'新值fei')

          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      },
      //根据临时表和罐code查询罐信息 点个选则的时候
      getMixCtTankinfoByMainIdAndCode(tankCode) {
        // console.log(tankCode,'tankCode')
        let tankCodes = tankCode
        getMixCtTankinfoByMainIdAndCode(this.ctmaindata.boctmainId, this.materieltypeId, tankCodes ,this.selectType).then(res => {
          if (res.data.code == 200){
            this.tankinfo = res.data.data[0];

            // debugger
            if(this.tabsIndex == 1){
                this.logsTankinfo1 = res.data.data[0]; //存到一个新的变量
            }else if(this.tabsIndex == 2){
                this.logsTankinfo2 = res.data.data[0]; //存到一个新的变量
            }else if(this.tabsIndex == 3){
                this.logsTankinfo3 = res.data.data[0]; //存到一个新的变量
            }else if(this.tabsIndex == 4){
                this.logsTankinfo4 = res.data.data[0]; //存到一个新的变量
            }else if(this.tabsIndex == 5){
                this.logsTankinfo5 = res.data.data[0]; //存到一个新的变量
            }else if(this.tabsIndex == 6){
                this.logsTankinfo6 = res.data.data[0]; //存到一个新的变量
            }
            // console.log(this.logsTankinfo1,this.logsTankinfo2,'/选中赋值')


          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          const malist = this.tankinfo.mixMatterVOList;
          // let sum = 0;
          for (var j = 0; j < malist.length; j++) {
            if (malist[j].dataValue == -1) {
              malist[j].dataValue = '';
            }
            // sum+=Number(malist[j].dataValue);
          }
          // if (sum == 0){//是默认值的话
          //   this.isShowList = true;
          // }else {
          //   if (this.tankinfo.wkId != ""){
          //     this.isShowList = true;
          //   }else {
          //     this.isShowList = false;
          //   }
          // }
        });
      },
      //默认选择物性发生变化
      updatezfInfo() {
        updateByMainId(this.zfinfo).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      },
      //更新罐区信息
      updateTankInfo(row) {
        console.log('lolololo',row)
        row.matterproCode1 = this.zfinfo.matterproCode1
        row.matterproCode2 = this.zfinfo.matterproCode2
        row.matterproCode3 = this.zfinfo.matterproCode3
        console.log(this.zfinfo.matterproCode1,this.zfinfo.matterproCode2,this.zfinfo.matterproCode3)
        updateTankInfo(row).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      },
      //物性数据的修改
      matterproValue(a, b) {
        let value = a.dataValue.replace('/(^\s*)|(\s*$)', '');  //去除字符串前后空格
        let num = Number(value);  //将字符串转换为数字
        if (isNaN(num)) {  //判断是否是非数字
          //非数字清空当前值
          a.dataValue = '';
          this.$message.warning("物性信息值只能输入数字");
          return;
        } else if (value === '' || value === null) {  //空字符串和null都会被当做数字
        } else {
          let aa = {
            'boctmainId': b.ctmainId,
            'tankCode': b.tankCode,
            'matterproCode': a.matterproCode,
            'dataValue': a.dataValue,
            'materielTypeId': this.materieltypeId
          };
          saveOne(aa).then(res => {
            if (res.data.code !== 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          });
        }
      },
      //获取原油列表数据
      getOilData() {
        this.oilData = [];
        if (this.materieltypeId == 9) {//原油
          searchOil(this.oilname).then(res => {
            if (res.data.code !== 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.oilData = res.data.data;
            // let findRow = this.oilData.find(c => c.oilId === this.tankinfo.wkId);
            // if (findRow == null || findRow == '' || findRow == undefined) {
            // } else {
            //   this.$nextTick(() => {
            //     // this.$refs.singleTable.setCurrentRow(findRow);
            //   })
            // }

          })
        } else {//燃料油和其他
          selectGasOilData(this.oilname, this.materieltypeId).then(res => {
            if (res.data.code !== 200) {
              let that = this;
              return errorMsgbox(that, res.data.msg);
            }
            this.oilData = res.data.data;
          //   let findRow = this.oilData.find(c => c.WK_ID + '' === this.tankinfo.wkId);
          //   if (findRow == null || findRow == '' || findRow == undefined) {
          //   } else {
          //     this.$nextTick(() => {
          //       // this.$refs.singleTable.setCurrentRow(findRow);
          //     })
          //   }
          })
        }
        // console.log(this.oilData,'/获取阶段')
      },
      //当前罐选中的原油工单发生改变
      handleCurrentChange(row, column, event) {
        if(this.tabsIndex == 1){
          this.atpresentData1 = row
        }else if(this.tabsIndex == 2){
          this.atpresentData2 = row
        }else if(this.tabsIndex == 3){
          this.atpresentData3 = row
        }else if(this.tabsIndex == 4){
          this.atpresentData4 = row
        }else if(this.tabsIndex == 5){
          this.atpresentData5 = row
        }else if(this.tabsIndex == 6){
          this.atpresentData6 = row
        }


        var timers = this.timer;
        if (timers) {
          window.clearTimeout(timers);
          this.timer = null;
        }
        let _this = this
        // console.log(_this.tankinfo,'_this.tankinfo选中')
        this.timer = window.setTimeout(function () {
          if (_this.materieltypeId == 9) {//原油
            //调用批量插入的接口
            insertByMainIdAndCodeAndOilId(_this.tankinfo.ctmainId, _this.tankinfo.tankCode, row.oilId, _this.materieltypeId, row.cnName).then(res => {
              if (res.data.code != 200) {
                // console.log(res,'//')
                errorMsgbox(_this, res.data.msg);
              }
              // console.log(_this.groupsize,this.logsTankinfo3,this.logsTankinfo1,'/赋值_this.groupsize')
              _this.getMixCtTankinfoByMainIdAndCode(_this.groupsize);
              _this.selectcrudeblendoil();
            });
          } else {
            insertGasMessageByMainId(_this.tankinfo.ctmainId, _this.tankinfo.tankCode, row.WK_ID, _this.materieltypeId, row.WORKORDER_ODD).then(res => {
              if (res.data.code != 200) {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              // console.log(_this.groupsize,'赋值_this.groupsize')
              _this.getMixCtTankinfoByMainIdAndCode(_this.groupsize);
              _this.selectcrudeblendoil();
            });
          }
        }, 300)
      },
      //取消当前选中
      cancleCurrent() {
        var timers = this.timer;
        if (timers) {
          window.clearTimeout(timers);
          this.timer = null;
        }
        //删除当前罐已经配置完成的数据
        deleteByMainIdAndTankCode(this.tankinfo.ctmainId, this.tankinfo.tankCode).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          //选中后重新加载物料物料数据表
          this.getMixCtTankinfoByMainIdAndCode(this.groupsize);
          //取消表格选中样式
          this.$nextTick(() => {
            // this.$refs.singleTable.setCurrentRow();
          })
        });
      },
      // logsTankinfolist(){
      //
      // },
      //油列表数据更新
      installUpData(){
        //更新罐数据信息
        console.log(this.ctmaindata.boctmainId,this.materieltypeId,this.tabsIndex,this.selectType,'//')
        this.tankinfo = {};
        getMixCtTankinfoByMainIdAndCode(this.ctmaindata.boctmainId, this.materieltypeId, this.tabsIndex, this.selectType).then(res => {
          if (res.data.code !== 200) {
            let that = this;

            errorMsgbox(that, res.data.msg);
          }
          this.tankinfo = res.data.data[0];
          const malist = this.tankinfo.mixMatterVOList;
          if(res.data.data[0].wkId === ''){
            this.isShowList = false
          }else{
            this.isShowList = true
          }
          for (var j = 0; j < malist.length; j++) {
            if (malist[j].dataValue == -1) {
              malist[j].dataValue = '';
            }
            // sum+=Number(malist[j].dataValue);
          }
          console.log(malist,'malist');
          // if (sum == 0){//是默认值的话
          //   this.isShowList = true;
          // }else {
          //   if (this.tankinfo.wkId != ""){
          //     this.isShowList = true;
          //   }else {
          //     this.isShowList = false;
          //   }
          // }
          this.getOilData();
          // this.tankinfo.mixMatterVOList.forEach(item => {
          //   item.dataValue = '';
          // })
        });
      },
      //调合分组数量的更改
      selectleftmenu(index) {
        // console.log(this.oilData,'oilData切换罐的时')
        this.tankinfo = {}
        // console.log(this.tankinfo,'/切进来')
        this.tabsIndex = index
        // this.isShowList = true

        this.metaIndex = this.groupsize
        this.menuIndex = index
        this.newIndex = index;
        this.groupsize = index;

        // console.log(this.logsTankinfo1,this.logsTankinfo2,'切换')

        if(this.historyFlag){
          // console.log('历史记录进来的')
          getMixCtTankinfoByMainIdAndCode(this.ctmaindata.boctmainId, this.materieltypeId, index, this.selectType).then(res => {
            if (res.data.code !== 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.tankinfo = res.data.data[0];
            const malist = this.tankinfo.mixMatterVOList;
             if(res.data.data[0].wkId === ''){
                this.isShowList = false
              }else{
                this.isShowList = true
              }
            // let sum = 0;
            for (var j = 0; j < malist.length; j++) {
              if (malist[j].dataValue == -1) {
                malist[j].dataValue = '';
              }
            }
            // if (sum == 0){//是默认值的话
            //   this.isShowList = true;
            // }else {
            //   if (this.tankinfo.wkId != ""){
            //     this.isShowList = true;
            //   }else {
            //     this.isShowList = false;
            //   }
            // }
            this.getOilData();

          });
        }else {
          // console.log(index,'ii')
          //&& JSON.stringify(this.logsTankinfo2) == '{}'&& JSON.stringify(this.logsTankinfo3) == '{}'&& JSON.stringify(this.logsTankinfo4) == '{}'&& JSON.stringify(this.logsTankinfo5) == '{}'&& JSON.stringify(this.logsTankinfo6) == '{}'
         if(index == 0){
            this.RefreshTheConfiguration(index)
          }

         if (index == 1){
            if(JSON.stringify(this.logsTankinfo1) != '{}'){
              this.RefreshTheConfiguration(index)
              this.$nextTick(()=>{
                if(this.atpresentData1!=-1){
                  let  highlight =null
                  this.oilData.forEach((item,index)=>{
                    if(item.oilId == this.atpresentData1.oilId){
                      highlight = index
                    }
                  })

                  this.$refs.singleTable.setCurrentRow(this.oilData[highlight]);
                  // let Top = 24*highlight
                  // console.log(Top)
                  // this.$refs.singleTable.bodyWrapper.scrollTop = 20;
                }else {
                  this.$refs.singleTable.setCurrentRow(-1);
                }
              })
            }else {
              this.installUpData()
            }
          }

          if(index == 2){
            if(JSON.stringify(this.logsTankinfo2) != '{}'){
              // console.log('存储的2')
              this.RefreshTheConfiguration(index)
              this.$nextTick(()=>{
                this.tankinfo = this.logsTankinfo2
                // console.log(this.logsTankinfo2)
                if(this.atpresentData2!=-1){
                  let  highlight =null
                  this.oilData.forEach((item,index)=>{
                    if(item.oilId == this.atpresentData2.oilId){
                      highlight = index
                    }
                  })
                  this.$refs.singleTable.setCurrentRow(this.oilData[highlight]);
                }else {
                  this.$refs.singleTable.setCurrentRow(-1);
                }
              })
            }else {
              this.installUpData()
            }
          }

          if(index == 3){
            if(JSON.stringify(this.logsTankinfo3) != '{}'){
              this.$nextTick(()=>{
                // this.tankinfo = this.logsTankinfo3
              this.RefreshTheConfiguration(index)
                if(this.atpresentData3!=-1){
                  let  highlight =null
                  this.oilData.forEach((item,index)=>{
                    if(item.oilId == this.atpresentData3.oilId){
                      highlight = index
                    }
                  })
                  this.$refs.singleTable.setCurrentRow(this.oilData[highlight]);
                }else {
                  this.$refs.singleTable.setCurrentRow(-1);
                }
                // console.log(this.tankinfo,'////////')
              })
            }else {
              // console.log('首次加载')
              this.installUpData()
            }
          }


          if(index == 4){
            if(JSON.stringify(this.logsTankinfo4) != '{}'){
              this.$nextTick(()=>{
                // this.tankinfo = this.logsTankinfo4
                this.RefreshTheConfiguration(index)
                if(this.atpresentData4!=-1){
                  let  highlight =null
                  this.oilData.forEach((item,index)=>{
                    if(item.oilId == this.atpresentData4.oilId){
                      highlight = index
                    }
                  })
                  this.$refs.singleTable.setCurrentRow(this.oilData[highlight]);
                }else {
                  this.$refs.singleTable.setCurrentRow(-1);
                }
              })
            }else {
              this.installUpData()
            }
          }


          if(index == 5){
            if(JSON.stringify(this.logsTankinfo5) != '{}'){
              this.$nextTick(()=>{
                // this.tankinfo = this.logsTankinfo5
                 this.RefreshTheConfiguration(index)
                if(this.atpresentData5!=-1){
                  let  highlight =null
                  this.oilData.forEach((item,index)=>{
                    if(item.oilId == this.atpresentData5.oilId){
                      highlight = index
                    }
                  })
                  this.$refs.singleTable.setCurrentRow(this.oilData[highlight]);
                }else {
                  this.$refs.singleTable.setCurrentRow(-1);
                }
              })
            }else {
              this.installUpData()
            }
          }


          if(index == 6){
            if(JSON.stringify(this.logsTankinfo6) != '{}' ){
              this.$nextTick(()=>{
                // this.tankinfo = this.logsTankinfo6
              this.RefreshTheConfiguration(index)
                if(this.atpresentData6!=-1){
                  let  highlight =null
                  this.oilData.forEach((item,index)=>{
                    if(item.oilId == this.atpresentData6.oilId){
                      highlight = index
                    }
                  })
                  this.$refs.singleTable.setCurrentRow(this.oilData[highlight]);
                }else {
                  this.$refs.singleTable.setCurrentRow(-1);
                }
              })
            }else {
              this.installUpData()
            }
          }



        }
        // console.log( this.tankinfo)

      },
      //调合结果
      oilresult() {
        //首先判断当前返回的历史主表Id是否存在
        if (this.resultMainId == 0) {
          this.$message.warning("请进行调合计算或选择一条调合历史记录！");
        } else {
          selectResultData(this.resultMainId, this.ctmaindata.tankNum, this.materieltypeId).then(res => {
            if (res.data.code !== 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            // console.log(res.data.data)
            this.oilresultlistcolumn = res.data.data[0];
            this.oilresultlistdata = res.data.data[1];
            this.username = res.data.data[2];
            this.oilresultdialog = true;
          });
        }
      },
      //调合历史
      oilhistory() {
        //查询历史数据
        this.selectHistoryResultData();
        this.oilhistorydialog = true;
      },
      //查询调合历史数据
      selectHistoryResultData() {
        selectHistoryResultData(this.materieltypeId).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.oilhistoryData = res.data.data;
          let arr = [];
          this.oilhistoryData.forEach(ele => {
            let firstIndex = this.oilhistoryData.findIndex(item => {
              return item.RMAIN_ID === ele.RMAIN_ID   // 当RMAIN_ID相同的时候，返回第一个相同的Index 赋值给 firstIndex
            })
            if (arr.findIndex(item => {
              return item.firstIndex === firstIndex
            }) === -1) {
              arr.push({
                length: this.oilhistoryData.filter(item => {
                  return item.RMAIN_ID === ele.RMAIN_ID    //利用数组的filter方法，过滤出相同category的数组的长度。数组长度-即为跨多少行
                }).length,
                firstIndex: firstIndex    // firstIndex 返回的是第一个RMAIN_ID就满足的第一个Index,即为rowIndex开始于第几行。
              })
            }
          })
          // console.log(this.indexInfoList,'/历史处理')
          this.indexInfoList = arr;
        });
      },
      //调合历史的合并单元格
      oilhistorySpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 5 || columnIndex === 6) {
          let index = this.indexInfoList.findIndex(item => {  //遍历数组
            return item.firstIndex === rowIndex
          })
          if (index > -1) {
            return {
              rowspan: this.indexInfoList[index].length,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      //调和历史点击确定是否要回显数据数据
      submitoilhistorydialog() {
        if (this.oilhistoryselected.length < 1) {//未选择
          this.$message.warning("请选择一条调和历史");
          return;
        } else if (this.oilhistoryselected.length == 1) {//选择一条记录
          this.resultMainId = this.oilhistoryselected[0].RMAIN_ID;
          submitHistory(this.resultMainId, this.materieltypeId, this.oilhistoryselected[0].TANK_COUNT,this.createdUser ).then(res => {
            // console.log(res,'res')
            if (res.data.code == 200) {//成功

              //关闭弹窗
              this.colseoilhistorydialog();
              this.deleteAllTempFlag = true
              this.reloadAllData(res.data.data);
              //调合计算按钮可选择
              this.blenddisable = false;
              this.historyFlag = true
            } else {//失败
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          });
        } else {//选择多条记录
          this.$message.warning(`请指定一条${this.resultname}`);
          return;
        }
      },
      //页面选中之后的数据回显
      reloadAllData(rmainId) {
        //根据主键获取临时主表数据
        detail(rmainId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.ctmaindata = res.data.data;
          this.oilgroup = res.data.data.tankNum;
          //调用一下改变调合分组的方法
          this.changetanknum();
          //加载一下物性分类数据
          this.selectcrudeblendoil();
          //加载左侧所需数据
          getMixCtTankinfoParam(rmainId).then(res1 => {
            // console.log(res.data.data)
            if (res1.data.code !== 200) {
              let that = this;
              errorMsgbox(that, res1.data.msg);
            }
            //按钮可点击
            this.blenddisable = false;
            //图表展示
            reloadData(res1.data.data, this.oilgroup);
            this.resultjson.rmain_id = this.resultMainId;
            //加载右侧所需数据
            getRightData(this.resultMainId).then(res2 => {
              if (res2.data.code !== 200) {
                let that = this;
                errorMsgbox(that, res2.data.msg);
              }
              //图标展示
              getnewOilData(res2.data.data);
            });
          })
        });
      },
      //关闭调合历史弹窗事件
      colseoilhistorydialog() {
        this.oilhistorydialog = false;
      },
      //调合历史选中状态删除
      oilhistorySelectionChange(val) {
        this.oilhistoryselected = val;
        // console.log(val[0])
        this.createdUser = val[0].CREATEDUSER?val[0].CREATEDUSER:'';
      },
      //删除调和历史数据
      deleteoilhistoryData() {
        let ids = [];
        this.oilhistoryselected.forEach(ele => {
          ids.push(ele.RMAIN_ID);
        });
        removeResultHistoryData(ids.join(",")).then(res => {
          // console.log(res,'/////')
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          if(res.data.code == 200){
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          }

          if (res.data.success) {
            //删除成功，调用列表刷新方法
            this.selectHistoryResultData();
          }
        });
      },
      //关闭原油弹窗
      colseoilresultdialog() {
        this.oilresultdialog = false;

      },
      //打开原油弹窗
      openmatterdialog(index) {
        // console.log(index)
        if(this.historyFlag){
          // console.log(this.tankinfolist,'历史数据')
          if(this.tankinfolist.length>0) this.logsTankinfo1.mixMatterVOList = this.tankinfolist[0].mixMatterVOList
          if(this.tankinfolist.length>1) this.logsTankinfo2.mixMatterVOList = this.tankinfolist[1].mixMatterVOList
          if(this.tankinfolist.length>2) this.logsTankinfo3.mixMatterVOList = this.tankinfolist[2].mixMatterVOList
          if(this.tankinfolist.length>3) this.logsTankinfo4.mixMatterVOList = this.tankinfolist[3].mixMatterVOList
          if(this.tankinfolist.length>4) this.logsTankinfo5.mixMatterVOList = this.tankinfolist[4].mixMatterVOList
          if(this.tankinfolist.length>5) this.logsTankinfo6.mixMatterVOList = this.tankinfolist[5].mixMatterVOList
          this.$nextTick(()=>{
            this.$refs.singleTable.setCurrentRow(-1);
          })
          // console.log(this.logsTankinfo1.mixMatterVOList,this.logsTankinfo2.mixMatterVOList,this.logsTankinfo3.mixMatterVOList)
          this.atpresentData1 = -1
          this.atpresentData2 = -1
          this.atpresentData3 = -1
          this.atpresentData4 = -1
          this.atpresentData5 = -1
          this.atpresentData6 = -1
        }

        //清空数据，罐数据
        this.tankinfo = {};
        this.tankinfolist = [];
        this.selectType = 0;
        this.isShowList = true;
        //清空原油参数
        // console.log(this.oilData,'/打开时')
        // this.oilData = [];
        // this.judgeCtMain(this.materieltypeId);
        getMixCtMainByUser(this.oilgroup, this.materieltypeId).then(res => {
          if (res.data.code == 200) {
            this.ctmaindata = res.data.data;
            if(index){
              this.defaultActive = String(index)
              this.groupsize = index
              console.log(this.ctmaindata.boctmainId)
              this.selectleftmenu(index)
            }else {
              this.groupsize = 0;
            }
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          //根据当前临时主表的ID查询罐信息
          this.selectcrudeblendoil();
          this.selectMixCtMatterproConfig(this.materieltypeId);
          this.matterdialog = true;
        });

        // console.log(this.matterlist,'打开弹窗')
      },
      //调合计算
      blendCompute() {
        // console.log('打开2')
        this.$emit('load', true);
        blendCompute(this.ctmaindata.boctmainId, this.materieltypeId).then(res => {
          if (res.data.code != 200) {
            this.$emit('load', false);
            return errorMsgbox(this,res.data.msg);
          }
          this.resultjson = res.data.data;
          this.$emit('load', false);
          if (this.resultjson.success == "success") {
            this.resultMainId = this.resultjson.rmain_id;
            getRightData(this.resultjson.rmain_id).then(res => {
              if (res.data.code !== 200) {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              getnewOilData(res.data.data);
            });
          } else {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        })
      },
      //弹窗确认,校验参数
      submitdialog() {
        this.historyFlag = false
        //首先根据信息,重新查询一下当前信息
        getMixCtTankinfoByMainId(this.ctmaindata.boctmainId, this.materieltypeId).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          var a = res.data.data[0];
          this.zfinfo = a[0];
          this.tankinfolist = res.data.data[1];
          //判断参数是否完整
          var flag = false;
          var str0 = "";
          var str00 = "";
          var str1 = "";
          //首先判断组分参数
          if (this.zfinfo.zfName == null || this.zfinfo.zfName == '' || this.zfinfo.zfName == undefined) {
            str0 = "目标罐信息输入不完整；<br>";
            flag = true;
          }
          if (this.zfinfo.tankName == null || this.zfinfo.tankName == '' || this.zfinfo.tankName == undefined) {
            str0 = "目标罐信息输入不完整；<br>";
            flag = true;
          }
          for (var i = 0; i < this.tankinfolist.length; i++) {
            var tank_code = this.tankinfolist[i].tankCode;
            var tank_name = this.tankinfolist[i].tankName;//罐名称
            var zf_name = this.tankinfolist[i].zfName;//组分名称
            var blending_scale = this.tankinfolist[i].blendingScale; //调合比例
            if (zf_name == null || zf_name == '') {
              str1 += "罐" + tank_code + "中组分名称必填；<br>";
              flag = true;
            }
            if (tank_name == null || tank_name == '') {
              str1 += "罐" + tank_code + "中罐名称必填；<br>";
              flag = true;
            }
            const malist = this.tankinfolist[i].mixMatterVOList;
            var f = false;
            if (malist == null || malist == undefined) {//物性没有值
            } else {
              for (var j = 0; j < malist.length; j++) {
                if (malist[j].ctmatterproId == -1) {//说明没有值
                } else {
                  //判断值是否是空
                  if (malist[j].dataValue == '' || malist[j].dataValue == undefined || malist[j].dataValue == null || malist[j].dataValue == -1) {
                  } else {
                    f = true;
                  }
                }
              }
            }
            if (!f) {
              str1 += "罐" + tank_code + "中至少输入一个物性值；<br>";
              flag = true;
            }
            if (blending_scale == null || blending_scale == '') {
              str00 = "组分管理信息输入不完整；<br>";
              flag = true;
            }
          }
          if (flag) {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: str00 + str0 + str1
            });
          } else {
            // debugger
            //调合计算按钮设置为可用
            this.colsedialog();
            this.getMixCtTankinfoParam();
            this.$emit('getid', '子组件向父组件传值');
          }
        })
      },
      //回显参数
      getMixCtTankinfoParam() {
        getMixCtTankinfoParam(this.tankinfolist[0].ctmainId).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.chartData = res.data.data
          this.deleteAllTempFlag = true
          reloadData(res.data.data, this.oilgroup);
          this.blenddisable = false;
        })
      },
      //关闭取消弹窗
      colsedialog() {

        //移除选中物性(初始化要默认的物性)
        //removeDefaultMatterpros(this.materieltypeId).then(res=>{})
        this.historyFlag = false
        this.matterdialog = false;
        this.$refs.elmmenu.activeIndex = null;
        this.$emit('open', false);
      },
      //更改调合分组之后加载页面
      changetanknum() {
        if(!this.historyFlag){
          // console.log('切换')
          this.logsTankinfo1 = {}
          this.logsTankinfo2 = {}
          this.logsTankinfo3 = {}
          this.logsTankinfo4 = {}
          this.logsTankinfo5 = {}
          this.logsTankinfo6 = {}
        }
        // debugger
        this.blenddisable = true;
        var oDiv = document.getElementById("kuangtu");
        var oDiv2 = document.getElementById("zhuangzhi");
        var tab2 = document.getElementById("tab2");
        var a = "#tab2";
        $(a).html("");
        for (var aa = 1; aa <= app.tanks_num_value; aa++) {
          var b = "#tab1-" + app.tanks_num_value + "-" + aa;
          $(b).html("");

          var div = "div1-" + app.tanks_num_value + "-" + aa;
          document.getElementById(div).style.display = "none";

        }
        oDiv.style.display = "none";
        oDiv2.style.display = "none";
        var tanks_num_value = this.oilgroup;
        var box_ = "box1" + "-" + tanks_num_value;

        var bb = "[name='datong']"; //获取大桶罐ID
        $(bb).find('span').remove();

        for (var i = 0; i < tanks_num_value; i++) {
          var tc = i + 1;
          var b = "[name='tong" + tc + "']";
          $(b).find('span').remove();
        }

        if (tanks_num_value == '2')  //2个罐
        {
          var oDiv_a = document.getElementById("box1-3");
          var oDiv_b = document.getElementById("box1-4");
          var oDiv_c = document.getElementById("box1-5");
          var oDiv_d = document.getElementById("box1-6");
          oDiv_a.style.display = "none";
          oDiv_b.style.display = "none";
          oDiv_c.style.display = "none";
          oDiv_d.style.display = "none";
        } else if (tanks_num_value == '3') //3个罐
        {
          var oDiv_a = document.getElementById("box1-2");
          var oDiv_b = document.getElementById("box1-4");
          var oDiv_c = document.getElementById("box1-5");
          var oDiv_d = document.getElementById("box1-6");

          oDiv_a.style.display = "none";
          oDiv_b.style.display = "none";
          oDiv_c.style.display = "none";
          oDiv_d.style.display = "none";
        } else if (tanks_num_value == '4')//4个罐
        {
          var oDiv_a = document.getElementById("box1-2");
          var oDiv_b = document.getElementById("box1-3");
          var oDiv_c = document.getElementById("box1-5");
          var oDiv_d = document.getElementById("box1-6");

          oDiv_a.style.display = "none";
          oDiv_b.style.display = "none";
          oDiv_c.style.display = "none";
          oDiv_d.style.display = "none";
        } else if (tanks_num_value == '5')//5个罐
        {
          var oDiv_a = document.getElementById("box1-2");
          var oDiv_b = document.getElementById("box1-3");
          var oDiv_c = document.getElementById("box1-4");
          var oDiv_d = document.getElementById("box1-6");

          oDiv_a.style.display = "none";
          oDiv_b.style.display = "none";
          oDiv_c.style.display = "none";
          oDiv_d.style.display = "none";
        } else if (tanks_num_value == '6')//6个罐
        {
          var oDiv_a = document.getElementById("box1-2");
          var oDiv_b = document.getElementById("box1-3");
          var oDiv_c = document.getElementById("box1-4");
          var oDiv_d = document.getElementById("box1-5");

          oDiv_a.style.display = "none";
          oDiv_b.style.display = "none";
          oDiv_c.style.display = "none";
          oDiv_d.style.display = "none";
        }

        var oDiv = document.getElementById(box_);
        oDiv.style.display = "block";
      },
      //更多物性
      morematter() {
        this.drawer = true;//开启抽屉
        this.leftselect();
        this.$nextTick(() => {
          this.rowDrop();
        })
      },
      //行拖拽
      rowDrop() {
        var dxwxtd = document.getElementById('dxwxtd');
        // 此时找到的元素是要拖拽元素的父容器
        const tbody = dxwxtd.children[2].querySelector('tbody');
        // const tbody = document.querySelector('.el-table__body-wrapper tbody');
        const that = this;
        let data = [];
        Sortable.create(tbody, {
          draggable: ".el-table__row",
          onEnd: function (evt) {
            that.matterlist.splice(evt.newIndex, 0, that.matterlist.splice(evt.oldIndex, 1)[0]);
            var newArray = that.matterlist.slice(0);
            that.matterlist = [];
            that.$nextTick(function () {
              that.matterlist = newArray;
              for (var i = 0; i < that.matterlist.length; i++) {
                var a = that.matterlist[i];
                a.uorder = i + 1;
                that.update(a);
              }
              //更新已经选择的罐的信息
              that.getMixCtTankinfoByMainIdAndCode(this.tankinfo.tankCode);
            });
          }
        });
        // 将 data变量中的 信息 赋值给 tableData 重新渲染列表数据
        if (!data) {
          this.matterlist = data;
        }

      },
      //row 行对象
      update(row) {
        updateConfigRowOrder(row.configId, row.uorder).then(() => {

        }, error => {
          // console.log(error);
        });
      },
      //抽屉关闭
      drawerhandleClose() {
        this.drawer = false;
      },
      //判断数值是否符合要求并且求百分比
      judgeNumandPercent() {
        let totalSumAll = 0;
        this.tankinfolist.map((item) => {
          let value = item.blendingScale.replace('/(^\s*)|(\s*$)', '');  //去除字符串前后空格
          let num = Number(value);  //将字符串转换为数字
          if (isNaN(num)) {  //判断是否是非数字
            //非数字清空当前值
            item.blendingScale = 0;
            this.$message.warning("调合数量只能输入数字");
            return;
          } else if (value === '' || value === null) {  //空字符串和null都会被当做数字
          } else {
            totalSumAll = totalSumAll + parseFloat(item.blendingScale);
          }
        })
        if (isNaN(totalSumAll)) {
          return 0
        }
        for (var i = 0; i < this.tankinfolist.length; i++) {
          let one = this.tankinfolist[i].blendingScale;
          if (isNaN(one)) {
          } else {
            this.tankinfolist[i].blendingScaleF = ((one / totalSumAll) * 100).toFixed(2);
          }
          this.updateTankInfo(this.tankinfolist[i]);
        }
      },
      //获取待选物性
      leftselect() {
        waitsearchMatterConfig(this.materieltypeId, this.leftsearch).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.leftdata = res.data.data;
        })
      },
      //左侧物性列表选择
      checkLeftAll(val) {
        this.nowSelectData = val;
        if (this.nowSelectData.length > 0) {
          this.leftdisable = false;
        }
      },
      //右侧物性列表选择
      checkRightAll(val) {
        this.nowSelectRightData = val;
        if (this.nowSelectRightData.length > 0) {
          this.rightdisable = false;
        }
      },
      //物性选中
      handelSelect() {
        // console.log('选中')
        this.leftdisable = true;
        let mattercodes = [];
        this.nowSelectData.forEach((ele) => {
          mattercodes.push(ele.matterproCode);
        });
        let num = Number(this.ctmaindata.tankNum);
        addCtMatterConfig(this.ctmaindata.boctmainId, num, mattercodes.join(","), this.materieltypeId).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.nowSelectData = [];
          this.selectcrudeblendoil();
          //更新已经选择的罐的信息
          this.getMixCtTankinfoByMainIdAndCode(this.tankinfo.tankCode);
          //加载右侧已经配置的物性数据
          this.selectMixCtMatterproConfig(this.materieltypeId);
          //加载左侧物性数据
          this.leftselect();
        });
      },
      //删除
      handleRemoveSelect() {
        // console.log('删除')
        this.rightdisable = true;
        let matterids = [];
        this.nowSelectRightData.forEach((ele) => {
          matterids.push(ele.configId);
        });
        let num = Number(this.ctmaindata.tankNum);
        removeCtMatterConfig(this.ctmaindata.boctmainId, num, matterids.join(","), this.materieltypeId).then(res => {
          if (res.data.code !== 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.nowSelectRightData = [];
          this.selectcrudeblendoil();
          //更新已经选择的罐的信息
          this.getMixCtTankinfoByMainIdAndCode(this.tankinfo.tankCode);
          //加载右侧已经配置的物性数据
          this.selectMixCtMatterproConfig(this.materieltypeId);
          //加载左侧物性数据
          this.leftselect();
        });
      },
    },
  }
</script>

<style scoped="scoped" lang="scss">
  /deep/ .el-dialog__body {
    padding: 0px 0px;
  }

  /deep/ .basic-container{
    padding-top: 0px;
  }

  .dialogstyle {
    background-color: #F0F2F5;
    padding: 10px 10px;
  }

  .opSetting {
    text-align: center;
    margin-top: 200px;
  }

  .spacing {
    margin-top: 10px;
  }

  /deep/ .el-menu-item, .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }

  .el-menu-item.is-active {
    background-color: #409EFF !important;
    color: #fff;

    span {
      color: #fff !important;
    }

  }

  /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #F5F7FA;
    border-color: #E4E7ED;
    color: #000000;
    cursor: not-allowed;
  }

  /deep/ .el-dialog__footer {
    padding: 10px 10px 10px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  /deep/ .el-table thead th{
    padding: 0px !important;
  }

  /deep/.el-table .cell{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  /deep/.el-card__body{
    padding: 12px!important;
  }
</style>
