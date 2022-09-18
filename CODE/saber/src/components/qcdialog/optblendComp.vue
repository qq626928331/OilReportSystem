<template>
  <div>
    优化分组：
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
      class="el-icon-cpu"/> 优化计算
    </el-button>
    <el-button style="margin-left: 30px" size="small" @click="saveResult"><i class="el-icon-folder-opened"/> 保存方案
    </el-button>
    <el-button style="margin-left: 30px" size="small" @click="oilresult"><i class="el-icon-document-checked"/> 优化结果
    </el-button>
    <el-button style="margin-left: 30px" size="small" @click="oilhistory"><i class="el-icon-time"/> 优化历史</el-button>
    <el-button style="margin-left: 30px" size="small" :disabled="!deleteAllTempFlag" @click="deleteAllTempData"><i class="el-icon-delete"/>
      清除配置</el-button>

    <!--调合结果弹窗-->
    <el-dialog title="优化结果" :visible.sync="oilresultdialog" width="65%"
               :append-to-body="true" @close="colseoilresultdialog">
      <span slot="title" class="dialog-footer">
        <span style="color: black">优化结果</span>
        <el-button style="float:right;margin-right: 5%;" size="small" @click="exportData">导出</el-button>
      </span>
      <div style="padding: 10px 20px 30px">
        <!-- <el-button style="" size="small" @click="exportData">导出</el-button> -->
        <div style="width: 100%;font-size: 20px;text-align: center;color: black">
          {{ resultname }}
        </div>
        <el-table :data="oilresultlistdata"  @header-dragend="changeColWidth"
                  border style="width: 100%; margin-top: 20px" size="small">
          <el-table-column
            v-for="(item,index) in oilresultlistcolumn"
            :fixed="index==0"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :width="item.label=='名称'?260:null"
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
         <el-button @click="colseoilhistorydialog">关 闭</el-button>
       </span>-->
    </el-dialog>

    <!--调合历史弹窗-->
    <el-dialog title="优化历史" :visible.sync="oilhistorydialog" width="65%" v-dialogDrag
               :append-to-body="true" @close="colseoilhistorydialog">
      <div style="padding: 10px 20px">
        <el-table :data="oilhistoryData" @selection-change="oilhistorySelectionChange" max-height="400"
                  :span-method="oilhistorySpanMethod" size="small" :cell-style="{'text-align':'center'}"
                  :header-cell-style="{'text-align':'center'}"
                  border style="width: 100%; margin-top: 20px">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="ZZF_NAME" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TANK_COUNT" width="80" label="优化数量" align="center"></el-table-column>
          <el-table-column prop="OPT_TYPE" width="100" label="优化模式">
            <template slot-scope="{row,$index}">
              <span v-if="row.OPT_METHOD=='1'">质量过剩最小</span>
              <span v-else>效益最大</span>
            </template>
          </el-table-column>
          <el-table-column prop="ZF_NAME" label="优化组分" show-overflow-tooltip></el-table-column>
          <el-table-column prop="blending_scale" width="100" label="优化比例(%)" align="center">
            <template slot-scope="{row,$index}">
              {{ row.blending_scale }}
            </template>
          </el-table-column>
          <el-table-column prop="NUM_PRICE" width="100" label="价格(元/吨)" align="center">
            <template slot-scope="{row,$index}">
              <span v-if="row.NUM_PRICE==-1"></span>
              <span v-else>{{ row.NUM_PRICE==0&&row.OPT_METHOD==1?'-':row.NUM_PRICE }}</span>
<!--              <span v-else>{{ row.NUM_PRICE }}</span>-->
            </template>
          </el-table-column>
          <el-table-column prop="CREATEDUSER" width="80" label="操作人" align="center"></el-table-column>
          <el-table-column prop="UPDATE_TIME" width="130" label="计算时间" align="center"></el-table-column>
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
               :append-to-body="true" :lock-scroll='false' @close="colsedialog">
      <div class="dialogstyle">
        <div style="display: inline-block;width: 160px;height:492px;">
          <div class="el-scrollbar" style="height: 501px;background-color: #FFFFFF;border-radius: 5px">
            <el-menu @select="selectleftmenu" ref="ellmenu"
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
        <div style="display: inline-block;width: 1030px;height:500px;float: right;">
          <div v-if="groupsize=='0'">
            <basic-container style="margin-left: -6px;margin-right: -6px;margin-bottom: 13px;">
              <div style="color: #409EFF;font-size: 16px">优化产品</div>
              <div style="margin-top: 10px;">
                <span style="margin-left: 20px">罐名称：</span>
                <el-input size="small" v-model="zfinfo.tankName" style="width: 220px"
                          @blur="updateTankInfo(zfinfo)"></el-input>

                <span style="margin-left: 30px">产品名称：</span>
                <el-select size="small" v-model="zfinfo.cpName" filterable placeholder="请选择" style="width: 220px"
                           @change="updatezfInfoTank">
                  <el-option
                    v-for="item in leftProdata"
                    :key="item.standardId"
                    :label="item.standardName"
                    :value="item.standardName">
                  </el-option>
                </el-select>

                <el-button style="margin-left: 30px" size="small" type="primary" @click="productClick"><i
                  class="el-icon-s-unfold">产品配置</i></el-button>
                <el-button size="small" :disabled="zfinfo.cpName==null || zfinfo.cpName==''"
                           type="primary" style="margin-left: 5ex" @click="updatezfInfoTank(zfinfo.cpName)">
                  更新
                </el-button>
              </div>
              <div style="height: 60px;">
                <div style="display: inline-block;margin-left: 20px;margin-top: 20px">关键物性：</div>
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
              <div style="height: 115px;width: 895px;border: 1px solid #E4E7ED;overflow: auto;">
                <div v-for="(ma,i) in zfinfo.mixMatterVOList" :key="i" style="display: inline-block;margin-top: 5px;">
                  <div style="display: inline-block;width: 145px;text-align: right"
                       v-if="ma.matterproUnit=='' && ma.matterproName=='' "></div>
                  <div style="display: inline-block;width: 145px;text-align: right"
                       v-else-if="ma.matterproUnit=='' && ma.matterproName!='' ">{{ ma.matterproName }}:
                  </div>
                  <div style="display: inline-block;width: 145px;text-align: right"
                       v-else-if="ma.matterproUnit!='' && ma.matterproName!='' ">
                    {{ ma.matterproName }}({{ ma.matterproUnit }}):
                  </div>
                  <div style="display: inline-block;padding-left: 3px;">
                    <el-input size="small" disabled
                              type="text" v-model="ma.logicalSign" style="width: 40px"/>
                    <el-input size="small" disabled
                              type="text" v-model="ma.dataValue" style="width: 90px;margin-left: 10px"/>
                  </div>
                </div>
              </div>
            </basic-container>
            <basic-container style="margin-top: -10px;margin-bottom: -10px;margin-left: -6px;margin-right: -6px;">
              <div style="color: #409EFF;font-size: 16px">组分管理</div>
              <div style="margin-bottom: 8px;margin-top: 10px">
                <div style="display: inline-block;line-height: 32px;margin-left: 30px;">
                  <span>调合模式：</span>
                  <el-radio-group v-model="ctmaindata.optMethod" @change="updateMain(ctmaindata,0,ctmaindata.optMethod)">
                    <el-radio label="1">质量过剩最小</el-radio>
                    <el-radio label="2">效益最大</el-radio>
                  </el-radio-group>
                </div>
                <div style="float: left;display: inline-block">
                  <span>组分总量(吨)：</span>
                  <el-input size="small" oninput="value=value.replace(/[^\d\.]/g,'')" v-model="ctmaindata.totalNum"
                            style="width: 220px" @blur="updateMain(ctmaindata,1)"></el-input>
                </div>
              </div>
              <el-table size="small" :data="tankinfolist" border style="width: 950px"
                        :header-cell-style="{'text-align':'center'}" ref="tankInfoTable" @header-dragend="changeColWidth"
                        :cell-style="{'text-align':'center'}" :height="130">
                <template v-if="ctmaindata.optMethod=='1'">
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column property="tankName" label="罐名称" width="147"></el-table-column>
                  <el-table-column property="zfName" label="组分名称" width="225">
                    <template slot-scope="{row,$index}">
                      <el-input @blur="updateTankInfo(row)" size="small" v-model="row.zfName"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column property="numLower" label="最小值(吨)" width="225">
                    <template slot-scope="{row,$index}">
                      <el-input @blur="judgeNumandPercent(row,1)" oninput="value=value.replace(/[^\d\.]/g,'')"
                                size="small" v-model="row.numLower"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column property="numUpper" label="最大值(吨)" width="200">
                    <template slot-scope="{row,$index}">
                      <el-input @blur="judgeNumandPercent(row,2)" oninput="value=value.replace(/[^\d\.]/g,'')"
                                size="small" v-model="row.numUpper"></el-input>
                    </template>
                  </el-table-column>
                </template>
                <template v-else>
                  <el-table-column type="index" label="序号" width="100"></el-table-column>
                  <el-table-column property="tankName" label="罐名称" width="157"></el-table-column>
                  <el-table-column property="zfName" label="组分名称" width="160">
                    <template slot-scope="{row,$index}">
                      <el-input @blur="updateTankInfo(row)" size="small" v-model="row.zfName"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column property="numLower" label="最小值(吨)" width="160">
                    <template slot-scope="{row,$index}">
                      <el-input @blur="judgeNumandPercent(row,1)" size="small" v-model="row.numLower"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column property="numUpper" label="最大值(吨)" width="160">
                    <template slot-scope="{row,$index}">
                      <el-input @blur="judgeNumandPercent(row,2)" size="small" v-model="row.numUpper"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column property="numPrice" label="价格(元/吨)" width="160">
                    <template slot-scope="{row,$index}">
                      <el-input @blur="judgeNumandPercent(row,3)" size="small" v-model="row.numPrice"></el-input>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </basic-container>
          </div>
          <div v-else>
            <el-row>
              <basic-container style="margin-left: -6px;margin-right: -6px;margin-bottom: 6px">
                <div style="color: #409EFF;font-size: 16px">基本信息</div>
                <div style="margin-top: 15px">
                  <span>组分名称：</span>
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
                      <el-radio :label="true" @change="enteringwayChange(0)">油品选择</el-radio>
                      <el-radio :label="false" @change="enteringwayChange(1)">手动录入</el-radio>
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
                            :header-row-style="{height:'20px'}"
                            :header-cell-style="{'text-align':'center'}" highlight-current-row
                            :cell-style="{'text-align':'center'}"
                            @row-click="handleCurrentChange" :height="267" @row-dblclick="cancleCurrent"
                            @sort-change='sortChange'>
                    <template v-if="materieltypeId==9">
                      <el-table-column type="index" label="序号" width="60" align="center"
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
                      <el-table-column property="WORKORDER_ODD" :label="navoilname" min-width="150"
                                       sortable="WORKORDER_ODD">
                        <template slot-scope="scope">
                          <el-tooltip class="item" effect="light"
                                      placement="top-start">
                            <div slot="content">
                              <div style="margin-bottom: 5px;">
                                <label style="font-weight: bold;margin-bottom: 10px;">{{ navoilname }}：</label>
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
                    <el-row style="marginTop:2px;">
                      <el-col :span="14">&nbsp;</el-col>
                      <el-col :span="10" style="text-align: right;padding-right:7px;">
                        <span>共计：</span>
                        <span style="font-size: 12px">{{ oilData.length }}条</span>
                      </el-col>
                    </el-row>
                  </temlate>
                </basic-container>
              </el-col>
              <el-col :span="16">
                <basic-container style="margin-right: -6px;">
                  <div style="color: #409EFF;font-size: 16px;margin-bottom: 8px;">物性信息
                    <i style="float: right;cursor: pointer" class="el-icon-s-unfold" @click="morematter"></i>
                    <span style="float: right;cursor: pointer;font-size: 12px" @click="morematter">物性配置</span>
                  </div>
                  <div style="height: 298.5px;width: 100%;border: 1px solid #E4E7ED;overflow: auto;">
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
                                        style="margin: 10px 0px;"
                                        :label="ma.matterproName+'：'">
                            <el-input
                              :disabled="isShowList"
                              size="small"
                              @blur="matterproValue(ma,tankinfo)" type="text" v-model="ma.dataValue"
                              style="width: 130px"/>
                          </el-form-item>
                          <el-form-item v-else-if="ma.matterproUnit != '' && ma.matterproName!='' "
                                        style="margin: 10px 0px;"
                                        :label="ma.matterproName+'('+ma.matterproUnit+')：'">
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
                <basic-container style="margin-right: -6px;margin-left: -6px">
                  <div style="color: #409EFF;font-size: 16px;margin-bottom: 8px;">物性信息
                    <i style="float: right;cursor: pointer;" class="el-icon-s-unfold" @click="morematter"></i>
                    <span style="float: right;cursor: pointer;font-size: 12px" @click="morematter">物性配置</span>
                  </div>
                  <div style="height: 320px;width: 100%;border: 1px solid #E4E7ED;overflow: auto;">
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
                                        style="margin: 10px 0px;"
                                        :label="ma.matterproName+'：'">
                            <el-input
                              :disabled="isShowList"
                              size="small"
                              @blur="matterproValue(ma,tankinfo)" type="text" v-model="ma.dataValue"
                              style="width: 130px"/>
                          </el-form-item>
                          <el-form-item v-else-if="ma.matterproUnit != '' && ma.matterproName!='' "
                                        style="margin: 10px 0px;"
                                        :label="ma.matterproName+'('+ma.matterproUnit+')：'">
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
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="colsedialog">取 消</el-button>
        <el-button type="primary" @click="submitdialog">确 定</el-button>
      </span>
    </el-dialog>

    <!--物性抽屉弹窗-->
    <el-drawer title="优化物性配置" :append-to-body="true"
               :visible.sync="drawer" size="60%"
               direction="rtl"  @close="clonePhysicalConfiguration()"
               :before-close="drawerhandleClose">
      <basic-container>
        <el-row>
          <el-col :span="10">
            <div style="margin-bottom: 15px">
              <span>待选物性:</span>
              <el-input placeholder="请输入物性编码/名称" v-model="leftsearch" size="small"
                        style="width:155px;margin-left: 2ex"></el-input>
              <el-button size="small" type="primary" style="margin-left: 2ex" @click="leftselect">
                查询
              </el-button>
            </div>
            <el-table size="small" :data="leftdata" border :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}" @selection-change="checkLeftAll"  @header-dragend="changeColWidth"
                      style="width: 100%" row-key="index" :height=tableheight>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="matterproCode" label="物性编码" width="80" show-overflow-tooltip></el-table-column>
              <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="matterproUnit" label="物性单位" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="4">
            <div class="opSetting">
              <div>
                <el-button icon="el-icon-d-arrow-right" :disabled="leftdisable" size="medium" type="primary"
                           @click="handelSelect">
                  选中
                </el-button>
              </div>
              <div class="spacing">
                <el-button icon="el-icon-d-arrow-left" :disabled="rightdisable" size="medium" type="primary"
                           @click="handleRemoveSelect">
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
                      ref="selection"
                      @header-dragend="changeColWidth"
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
                label="物性编码"
                width="80" show-overflow-tooltip
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
                  <el-select v-else v-model="row.matterproUnit" @focus="pslppyUnitClick(row)" @change="pslppyUnitChange(row)" placeholder="请选择">
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
            <el-table-column fixed="right" label="操作" show-overflow-tooltip>
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

    <!--产品抽屉弹窗-->
    <el-drawer title="产品信息" :append-to-body="true"
               :visible.sync="stadarDrawer" size="60%"
               direction="rtl">
      <basic-container>
        <div style="margin-bottom: 15px">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="productAdd">
            添 加
          </el-button>
        </div>
        <el-table :data="leftProdata" ref="leftTwoTable" size="small" border
                  @header-dragend="changeColWidth"
                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                  style="width: 100%;" :height=drawHeight highlight-current-row @row-click="lefttableclick">
          <el-table-column prop="standardName" label="标准名称" show-overflow-tooltip>
            <template slot-scope="{row,$index}">
              <el-input size="small" v-if="row.edit" v-model="row.standardName" type="input"></el-input>
              <span v-else>{{ row.standardName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="materieltypeId" show-overflow-tooltip label="物料类型" width='90'>
            <template slot-scope="{row,$index}">
              <span v-if="row.materieltypeId==9">原油</span>
              <span v-else-if="row.materieltypeId==8">汽油</span>
              <span v-else-if="row.materieltypeId==5">柴油</span>
              <span v-else-if="row.materieltypeId==11">燃料油</span>
            </template>
          </el-table-column>
          <el-table-column prop="createUser" show-overflow-tooltip label="创建者" width='90'>

          </el-table-column>
          <el-table-column prop="note" label="备注" show-overflow-tooltip>
            <template slot-scope="{row,$index}">
              <el-input size="small" v-if="row.edit" v-model="row.note" type="input"></el-input>
              <span v-else>{{ row.note }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sidingFvt" show-overflow-tooltip label="创建时间" align="center" width="150">
            <template slot-scope="{row,$index}">
              {{ dateFormat(row.createddate) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-row v-if="!row.edit">
                <i class="el-icon-edit" @click="handleDownEdit($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF" v-if="createUser == row.createUser"></i>
                <i class="el-icon-document-copy" @click="handleDownCopy($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"></i>
                <i class="el-icon-delete" @click="handleDownDelete($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"
                   v-if="createUser == row.createUser"></i>
              </el-row>
              <el-row v-else>
                <i class="el-icon-check" @click="handleDownSave($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF"></i>
                <i class="el-icon-close" @click="handelDownCancel($index, row)"
                   style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px" v-if="row.edit"></i>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-bottom: 15px">
        </div>
        <el-table ref="rightdownTable"
                  @header-dragend="changeColWidth"
                  :data="rightProdata" size="small" border :header-cell-style="{'text-align':'center'}" class="tb-edit"
                  :cell-style="{'text-align':'center'}" style="width: 100%;" :height=drawHeight>
          <el-table-column type="index" label="序号" header-align="center" width="50"></el-table-column>
          <el-table-column prop="matterproName" label="物性名称"  show-overflow-tooltip>
            <template slot-scope="{row,$index}">
              <span>{{ row.matterproName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="logicalSign" label="逻辑运算符" show-overflow-tooltip>
            <template slot-scope="{row,$index}">
              <el-select size="small" v-if="row.downedit" v-model="row.logicalSign">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span v-else>{{ row.logicalSign }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dataValue" label="数值" show-overflow-tooltip>
            <template slot-scope="{row,$index}">
              <el-input size="small" v-if="row.downedit" v-model="row.dataValue" type="input"></el-input>
              <span v-else>{{ row.dataValue }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="matterproUnit" label="单位" show-overflow-tooltip>
            <template slot-scope="{row,$index}">
              {{ row.matterproUnit }}
            </template>
          </el-table-column>
          <el-table-column label="操作" show-overflow-tooltip v-if="createUser == operationCreator">
            <template slot-scope="{row,$index}">
              <i class="el-icon-edit" @click="handleUpEdit($index, row)"
                 style="cursor: pointer;font-size: 15px;color: #409EFF"
                 v-if="!row.downedit && createUser == row.createUser"></i>
              <i class="el-icon-check" @click="handleUpSave($index, row)"
                 style="cursor: pointer;font-size: 15px;color: #409EFF" v-if="row.downedit"></i>
              <i class="el-icon-close" @click="handelUpCancel($index, row)"
                 style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px" v-if="row.downedit"></i>
            </template>
          </el-table-column>
        </el-table>
      </basic-container>
    </el-drawer>
  </div>
</template>

<script>
  import $ from "jquery";
  import Sortable from 'sortablejs';
  import {leftdataReload} from "@/api/qcopt/leftdataReload.js";
  import {rightdataReload} from "@/api/qcopt/rightdataReload.js";
  import {searchOil, selectGasOilData, selectAllOilDataOrderBy, selectGasOilDataOrderBy} from "@/api/qcblend/oilData";
  import {getOptCtMainByUser, removeAll, optAnalysis, detail, updatemain} from "@/api/qcopt/optctmain";
  import {
    update, updateByMainId, getOptCtTankinfoByMainId, updatezfInfoTank,
    getOptCtTankinfoByMainIdAndCode, getOptCtTankinfoParam,delectOptMatterproByBoctmainId
  } from "@/api/qcopt/optcttankinfo";
  import {
    saveOne, deleteByMainIdAndTankCode, insertByMainIdAndCodeAndOilId,
    insertGasMessageByMainId
  } from "@/api/qcopt/optctmatterpro";
  import {
    selectOptCtMatterproConfig, waitOptCtMatterproConfig,
    removeCtMatterConfig, addOptCtMatterConfig, updateCtConfigRowOrder
  } from "@/api/qcopt/optctmatterproconfig";
  import {
    saveOrRemove, getRightData, selectHistoryResultData,selectMatterproUnitByCode,
    removeResultHistoryData, submitHistory, selectResultData, exportData,updateCtMatterConfig
  } from "@/api/qcopt/optresultmain";
  import {
    getStandardList,
    removeStandard,
    insertStandard,
    updateStandard,
    optstandardCopy
  } from "@/api/qcopt/optstandard";
  import {getStandarddetailList, updateStandarddetail} from "@/api/qcopt/optstandarddetail";
  import {errorMsgbox} from "@/api/global_variable";

  export default {
    name: "optblendComp",
    props: {
      materieltypeId: {
        type: Number,
        default: () => 0
      },//物料类型,页面加载当前组件，根据不同的页面进行封装
    },
    data() {
      return {
        defaultActive:'0',
        options2: [{
          value: '≤',
          label: '≤'
        }, {
          value: '≥',
          label: '≥'
        }, {
          value: '',
          label: ''
        }],
        oiloption: [{value: '2', label: '2'}, {value: '3', label: '3'}, {value: '4', label: '4'}, {
          value: '5',
          label: '5'
        }, {value: '6', label: '6'}],//分組的默认值
        oilgroup: '2',//默认选中
        groupsize: 0,
        oilresultdialog: false,//调合结果的弹窗
        oilresultlistdata: [],//调合结果数据
        oilresultlistcolumn: [],//调合结果的列
        oilhistorydialog: false,//调合历史的弹窗
        oilhistoryData: [],//调合历史的数据
        oilhistoryselected: [],//调合历史数据选中的数据
        matterlist: [],//物料集合
        radio: "1",
        operationCreator: "",//创建者
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
        historynam: '',//历史记录提示字段
        resultMainId: 0,//历史主表的id
        blenddisable: true,
        stadarDrawer: false,//产品抽屉
        leftProdata: [],//左侧产品待选物性
        leftProdata2:[],
        rightProdata: [],//右侧物性信息列表
        rightProdata2:[],//右侧物性信息列表
        drawHeight: 0,
        listname: '',
        inputname: '',
        username: '',
        createUser: '',
        metaIndex: 0, //原菜单索引
        newIndex: 0, //新菜单索引
        menuIndex: 0, //当前菜单索引
        navoilname: '汽油名称',//油管列表表头名称
        isShowList: true,//是否显示列表选择
        afterModificationdata:{},
        highlight:'',
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
        oldData:{},
        chartData:[],
        historyFlag: false,
        pslppyUnitList:{}, //物性单位下拉数据
        backupsMatterlist:[],
        enteringwayFlag:false,
        deleteAllTempFlag:false,
      }
    },
    watch: {
      isShowList() {

        if (this.isShowList) {
          // this.tankinfo.mixMatterVOList.forEach(item => {
          //     item.dataValue = '';
          //   })
           console.log('左');
        } else {
           console.log('右',this.enteringwayFlag);
          //  if(!this.enteringwayFlag){
             //手动录入 boctmainId
          // console.log(this.ctmaindata.boctmainId,this.tankinfo.tankCode)

        }
          //  }




        // if (this.newIndex === this.metaIndex) {
        //   this.tankinfo.mixMatterVOList.forEach(item => {
        //     item.dataValue = '';
        //   })
        // }
        this.metaIndex = this.menuIndex
      }
    },
    beforeMount() {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.tableheight = h - 220;
      this.drawHeight = h / 2 - 100;
    },
    mounted() {
      this.createUser = this.$store.state.user.userInfo.user_name
      if (this.materieltypeId == 9) {
        this.historyname = '原油优化历史记录'
        this.resultname = "原油优化结果";
        this.listname = "原油列表";
        this.inputname = "请输入原油名称";
        this.$nextTick(() => {
          this.navoilname = '原油名称'
        })
      } else if (this.materieltypeId == 8) {
        this.historyname = '汽油优化历史记录'
        this.resultname = "汽油优化结果";
        this.listname = "汽油列表";
        this.inputname = "请输入汽油名称";
        this.$nextTick(() => {
          this.navoilname = '汽油名称'
        })
      } else if (this.materieltypeId == 5) {
        this.historyname = '柴油优化历史记录'
        this.resultname = "柴油优化结果";
        this.listname = "柴油列表";
        this.inputname = "请输入柴油名称";
        this.$nextTick(() => {
          this.navoilname = '柴油名称'
        })
      } else if (this.materieltypeId == 11) {
        this.historyname = '燃料油优化历史记录'
        this.resultname = "燃料油优化结果";
        this.listname = "燃料油列表";
        this.inputname = "请输入燃料油名称";
        this.$nextTick(() => {
          this.navoilname = '燃料油名称'
        })
      }
      this.selectOptCtMatterproConfig(this.materieltypeId);
    },
    beforeDestroy() {//页面销毁之前
      //判断当前方案是否被保存过了，
      if ("1".anchor(this.flag)) {//已保存
      } else {//为保存，提示用户是否保存
        //this.saveOrRemove();
      }
    },
    methods: {
      //拖拽控制最小宽度
      changeColWidth(nw,ow,col,evt){
        if (nw < 70) {
          col.width = 60;
        }
      },
      enteringwayChange(index){
        delectOptMatterproByBoctmainId(this.ctmaindata.boctmainId,this.tankinfo.tankCode,index).then(res=>{
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
      //物性单位下拉选中事件
      pslppyUnitChange(row){
      },
      //物性单位下拉获取焦点时触发
      pslppyUnitClick(row){
        let matterproCode = row.matterproCode
        selectMatterproUnitByCode(matterproCode).then(res=>{
          if(res.data.code == 200){
            row.mixWxUnitAndCodes = res.data.data.mixWxUnitAndCodes
            this.matterlist.push({a:0})
            this.matterlist.pop()
          }
        })
      },
      //开始编辑物性精度
      changeedit(index,row){
        // backupsMatterlist
        this.backupsMatterlist.forEach((item,i)=>{
          this.matterlist.forEach((ele,j)=>{
            if(item.configId == ele.configId){
              this.matterlist[j].accuracy = this.backupsMatterlist[i].accuracy
              this.matterlist[j].matterproUnit = this.backupsMatterlist[i].matterproUnit
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
        // this.$set(row, "flag", !row.flag);
        this.matterlist.push({a:0})
        this.matterlist.pop()
      },
      handleEdit(index,row){
        if(index == 1){
          if(isNaN(Number(row.accuracy))){
            this.$message.error('物性精度只能输入数字!');
            this.backupsMatterlist.forEach((item,index)=>{
              if(item.configId == row.configId){
                row.accuracy = this.backupsMatterlist[index].accuracy
              }
            })
            return false
          }
          if(row.accuracy<0||row.accuracy>6){
            this.$message.error('物性精度不能大于6或小于0!');
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
          // console.log(data)
          updateCtMatterConfig(data).then(res=>{
             if(res.data.code!==200){
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
             this.selectOptCtMatterproConfig()
          })
          // this.$set(row, "flag", !row.flag);
        }else {
          this.backupsMatterlist.forEach((item,i)=>{
            this.matterlist.forEach((ele,j)=>{
              if(item.configId == ele.configId){
                this.matterlist[j].accuracy = this.backupsMatterlist[i].accuracy
                this.matterlist[j].matterproUnit = this.backupsMatterlist[i].matterproUnit
              }
            })
          })
          this.matterlist.forEach((item,index)=>{
            if(item.configId == row.configId){
              this.matterlist[index].flag = true
            }
          })
          this.matterlist.push({a:0})
          this.matterlist.pop()
        }
      },

      //关闭物性配置时
      clonePhysicalConfiguration(){
        console.log('关闭时')
        this.RefreshTheConfiguration(this.groupsize)
      },
      //刷新录入物性配置
      RefreshTheConfiguration(tankCode){
          getOptCtTankinfoByMainIdAndCode(this.ctmaindata.boctmainId, this.materieltypeId, tankCode).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          let data = res.data.data[0]
          this.tankinfo = data
          // console.log(data,'已存储');
          if(data.wkId === ''){
            this.isShowList = false
              this.enteringwayFlag = true
          }else{
            this.isShowList = true
              this.enteringwayFlag = false
            // this.$refs.singleTable.bodyWrapper.scrollTop = 0;
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
        if (this.materieltypeId == 9) {
          let proNme = '';
          if (column.prop != '') {
            proNme = this.toLine(column.prop);
          }
          let orderby = 'ASC';
          if (column.order == 'descending') {
            orderby = 'DESC';
          }
          selectAllOilDataOrderBy(this.oilname, proNme, orderby).then(res => {
            if (res.data.code !== 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.oilData = res.data.data;
          })
        } else {
          let proNme = column.prop;
          let orderby = 'ASC';
          if (column.order == 'descending') {
            orderby = 'DESC';
          }
          selectGasOilDataOrderBy(this.oilname, this.materieltypeId, proNme, orderby).then(res => {
            if (res.data.code !== 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.oilData = res.data.data;
          })
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
      // 驼峰转换下划线
      toLine(name) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
      },
      //导出
      exportData() {
        // var elemIF = document.createElement('iframe')
        // elemIF.src = '/api/qcopt-optblend/optresultmain/exportData?resultname=' + this.resultname + '&resultMainId=' + this.resultMainId + '&tankNum=' + this.ctmaindata.tankNum;
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
        // console.log(resultname)
        exportData(resultname, this.resultMainId, this.ctmaindata.tankNum, this.materieltypeId, this.username, this.ctmaindata.optMethod).then((res) => {
          // if (res.data.code != 200) {
          //   let that = this;
          //   errorMsgbox(that, res.data.msg);
          // }
          const content = res.data;
          const blob = new Blob([content], {type: 'application/vnd.ms-excel'});


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
      //物性录入按钮点击事件
      openmatterdialog(index) {
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
          this.atpresentData1 = -1
          this.atpresentData2 = -1
          this.atpresentData3 = -1
          this.atpresentData4 = -1
          this.atpresentData5 = -1
          this.atpresentData6 = -1
        }
        console.log(index)

        //清空数据，罐数据
        this.tankinfo = {};
        this.tankinfolist = [];
        // this.oilData = [];
        //清空原油参数
        this.groupsize = 0;
        let aa = {
          materieltypeId: this.materieltypeId
        }
        getStandardList(aa).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.leftProdata = res.data.data;
          getOptCtMainByUser(this.oilgroup, this.materieltypeId).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.ctmaindata = res.data.data;
            if(index){
              this.defaultActive = String(index)
              this.groupsize = index
              this.selectleftmenu(index)
            }else {
              this.defaultActive = 0
              this.groupsize = 0;
            }
            //根据当前临时主表的ID查询罐信息
            this.selectcrudeblendoil();
            this.selectOptCtMatterproConfig(this.materieltypeId);
            this.matterdialog = true;
          });
        });
      },
      //判断临时主表中的数据是否存在,存在返回，不存在则新建后返回
      judgeCtMain(type) {
        getOptCtMainByUser(this.oilgroup, type).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.ctmaindata = res.data.data;
          //根据当前临时主表的ID查询罐信息
          this.selectcrudeblendoil();
          this.selectOptCtMatterproConfig(this.materieltypeId);
          this.matterdialog = true;
        });
      },
      //保存方案
      saveResult() {
        if (this.resultMainId == 0) {
          this.$message.warning("请进行优化计算或选择一条优化历史记录！");
        } else {
          this.flag = '1';//修改标记表示已经点击过方案
          this.saveOrRemove();
        }
      },
      //保存或删除方案
      saveOrRemove() {
        saveOrRemove(this.flag, this.resultMainId).then(res => {
          console.log(res,'errorMsgbox')
          if (res.data.success) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
          if (res.data.code != 200) {
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
          if (res.data.code == 200) {
            this.chartData = []
            // let ctmainId = this.tankinfolist[0].ctmainId
            // this.selectMixCtMatterproConfig(this.materieltypeId);
            this.oilresultdialog = false
            this.deleteAllTempFlag = false
            leftdataReload('', this.oilgroup);
            let dom = document.getElementsByClassName('box3tablediv')[0]
            dom.style.display = "none";
            this.logsTankinfo1 = {}
            this.logsTankinfo2 = {}
            this.logsTankinfo3 = {}
            this.logsTankinfo4 = {}
            this.logsTankinfo5 = {}
            this.logsTankinfo6 = {}

          } else {
            return errorMsgbox(this, res.data.msg);
          }
        })
      },
      //根据用户名,物料类型查询用户配置的物性信息
      selectOptCtMatterproConfig() {
        this.matterlist = [];
        selectOptCtMatterproConfig(this.materieltypeId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          // console.log(this.zfinfo,this.oldData,'/默认')
          if(JSON.stringify(this.oldData) != '{}'){
            this.zfinfo =  this.oldData
          }
          this.matterlist = res.data.data;
          this.matterlist.forEach(item=>{
            item.flag = true
            item.mixWxUnitAndCodes = [{
              wxUnit: "w%",
              wxUnitCode: "W001"
            }]
          })
          this.backupsMatterlist =JSON.parse(JSON.stringify(this.matterlist))
        });
      },
      //根据临时表主表ID查询罐信息
      selectcrudeblendoil() {
        getOptCtTankinfoByMainId(this.ctmaindata.boctmainId, this.materieltypeId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          // 当前数据为组分参数板块的数据源
          var a = res.data.data[0];

          this.zfinfo = a[0];

          //有数值的物性列表
          const malistCloneY = []
          const malistCloneN = []
          const malist = this.zfinfo.mixMatterVOList;
          for (var j = 0; j < malist.length; j++) {
            // 后台约定 dataValue为‘-1’此时将 对应的code值replace为 ‘’，后续逻辑需要
            if (malist[j].dataValue == -1) {
              malist[j].dataValue = '';
            }
            // 新需求逻辑处理
            /*
             点击物性录入 业务需求 1.默认关键物性默认展示
                                2.如果选择产品名称（数据请求）有值的物性length>=3 将有值的物性数据依次赋值给关键物性的model
                                3.如果选择产品名称（数据请求）有值的物性length<3 首先将有值的物性数据赋值关键物性的model，不够3个的默认将无值的物性数据补齐
            */
            if (malist[j].dataValue !== '') {
              malistCloneY.push(malist[j])  // 有数据的数据源
              // console.log( malistCloneY,malistCloneN,'/ malist/CloneY')
              // console.log(this.zfinfo,'.this.zfinfo')
              if (malistCloneY.length >= 3) {
                this.zfinfo.matterproCode1 = malistCloneY[0].matterproCode
                this.zfinfo.matterproCode2 = malistCloneY[1].matterproCode
                this.zfinfo.matterproCode3 = malistCloneY[2].matterproCode
              } else {
                if (malistCloneY.length === 2 && malistCloneN.length > 0) {
                  this.zfinfo.matterproCode1 = malistCloneY[0].matterproCode
                  this.zfinfo.matterproCode2 = malistCloneY[1].matterproCode
                  this.zfinfo.matterproCode3 = malistCloneN[0].matterproCode
                } else {
                  if (malistCloneY.length === 1 && malistCloneN.length > 0) {
                    this.zfinfo.matterproCode1 = malistCloneY[0].matterproCode
                    this.zfinfo.matterproCode2 = malistCloneN[0].matterproCode
                    this.zfinfo.matterproCode3 = malistCloneN.length > 1 ? malistCloneN[1].matterproCode : this.zfinfo.mixMatterVOList[1].matterproCode
                  }
                }
              }
            } else {
              malistCloneN.push(malist[j])  // 数据存储 无值的物性数据 （故：dataValue为‘’的数据）
            }
          }
          const bb = res.data.data[1];
          for (var i = 0; i < bb.length; i++) {
            if (bb[i].numLower == -1) {
              bb[i].numLower = '';
            }
            if (bb[i].numUpper == -1) {
              bb[i].numUpper = '';
            }
            if (bb[i].numPrice == -1) {
              bb[i].numPrice = '';
            }
          }
          this.tankinfolist = bb;

        })
      },
      //根据临时表和罐code查询罐信息 //选中罐列表数据
      getMixCtTankinfoByMainIdAndCode(tankCode) {
        getOptCtTankinfoByMainIdAndCode(this.ctmaindata.boctmainId, this.materieltypeId, tankCode).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }

          this.tankinfo = res.data.data[0];

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


          const malist = this.tankinfo.mixMatterVOList;
          let sum = 0;
          for (var j = 0; j < malist.length; j++) {
            if (malist[j].dataValue == -1) {
              malist[j].dataValue = '';
              sum += Number(malist[j].dataValue);
            }
            if (sum == 0) {//是默认值的话
              this.isShowList = true;
            } else {
              if (this.tankinfo.wkId != "") {
                this.isShowList = true;
              } else {
                this.isShowList = false;
              }
            }
          }
        });
      },
      //默认选择物性发生变化
      updatezfInfo() {
        updateByMainId(this.zfinfo).then(res => {
          // console.log(res,111)
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
        });
      },
      //更新0罐信息中的产品信息
      updatezfInfoTank(val) {
        // console.log(this.zfinfo)
        let findRow = this.leftProdata.find(c => c.standardName === val);
        this.zfinfo.zfName = findRow.standardId;
        this.zfinfo.cpName = findRow.standardName;
        updatezfInfoTank(this.zfinfo).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          if (res.data.success) {
            //重新加载数据
            this.selectcrudeblendoil();

            let that = this
            if(timer){
              clearTimeout(timer);
            }
            let timer =  setTimeout(()=>{
              // console.log(that.zfinfo)
              updatezfInfoTank(that.zfinfo).then(ress => {
                that.afterModificationdata = that.zfinfo
                if (ress.data.code != 200) {
                  let that = that;
                  errorMsgbox(that, ress.data.msg);
                }
                that.oldData = that.zfinfo
                // console.log(that.zfinfo,'/新的值')
              });
            },1000)
          }

        })

      },
      //更新罐区信息
      updateTankInfo(row,flag) {
        // console.log(row,flag)
        if(flag){
          let data = JSON.parse(JSON.stringify(row))
          data.numPrice = 0
          update(data).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          });
        }else {
          if(row.numPrice == ''){
            row.numPrice = 0
          }else {
            row.numPrice = row.numPrice
          }
          update(row).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          });
        }

      },
      //更新组分总数量
      updateMain(row, flag,tabs) {
        // console.log(tabs,'/tabs')
        // console.log(row,flag,'row')
        // console.log(this.zfinfo)

        // debugger
        if (flag == 1) {//更新组分总量，需要判断是否是数字
          let value = row.totalNum.replace('/(^\s*)|(\s*$)', '');  //去除字符串前后空格
          let num = Number(value);  //将字符串转换为数字
          if (isNaN(num)) {  //判断是否是非数字
            //非数字清空当前值
            row.totalNum = '';
            this.$message.warning("组分总量只能输入数字");
            return;
          } else if (num > 0) {
            // debugger
            updatemain(row).then(res => {
              if (res.data.code != 200) {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              for (var i = 0; i < this.tankinfolist.length; i++) {
                this.tankinfolist[i].numLower = 0;
                this.tankinfolist[i].numUpper = row.totalNum;
                this.tankinfolist[i].matterproCode1 = this.zfinfo.matterproCode1
                this.tankinfolist[i].matterproCode2 = this.zfinfo.matterproCode2
                this.tankinfolist[i].matterproCode3 = this.zfinfo.matterproCode3
                this.updateTankInfo(this.tankinfolist[i]);
              }
            })
          } else {
            //非数字清空当前值
            row.totalNum = '';
            this.$message.warning("组分总量只能输入正数");
            return;
          }
        } else if (flag == 0) {


          updatemain(row).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }

            if(tabs=='2'){
              for (var i = 0; i < this.tankinfolist.length; i++) {
                this.tankinfolist[i].numLower = 0;
                this.tankinfolist[i].numUpper = row.totalNum;
                this.tankinfolist[i].matterproCode1 = this.zfinfo.matterproCode1
                this.tankinfolist[i].matterproCode2 = this.zfinfo.matterproCode2
                this.tankinfolist[i].matterproCode3 = this.zfinfo.matterproCode3
                this.updateTankInfo(this.tankinfolist[i],false);
              }
            }else if(tabs=='1'){
              for (var i = 0; i < this.tankinfolist.length; i++) {
                this.tankinfolist[i].numLower = 0;
                this.tankinfolist[i].numUpper = row.totalNum;
                this.tankinfolist[i].matterproCode1 = this.zfinfo.matterproCode1
                this.tankinfolist[i].matterproCode2 = this.zfinfo.matterproCode2
                this.tankinfolist[i].matterproCode3 = this.zfinfo.matterproCode3
                // console.log(this.tankinfolist[i])
                this.updateTankInfo(this.tankinfolist[i],true);
              }
            }


            this.$nextTick(() => {
              this.$refs.tankInfoTable.doLayout();
            })

          });


        }
      },
      //物性数据的修改
      matterproValue(a, b) {
        // console.log(a,'aa')
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
            'boctmainId': b.boctmainId,
            'tankCode': b.tankCode,
            'matterproCode': a.matterproCode,
            'dataValue': a.dataValue,
            'materielTypeId': this.materieltypeId
          };
          saveOne(aa).then(res => {
            if (res.data.code != 200) {
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
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.oilData = res.data.data;
            // let findRow = this.oilData.find(c => c.oilId === this.tankinfo.wkId);
            // if (findRow == null || findRow == '' || findRow == undefined) {
            // } else {
            //   this.$nextTick(() => {
            //     this.$refs.singleTable.setCurrentRow(findRow);
            //   })
            // }
          })
        } else {//燃料油和其他
          selectGasOilData(this.oilname, this.materieltypeId).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.oilData = res.data.data;
            //   let findRow = this.oilData.find(c => c.WK_ID + '' === this.tankinfo.wkId);
            //   if (findRow == null || findRow == '' || findRow == undefined) {
            //   } else {
            //     this.$nextTick(() => {
            //       this.$refs.singleTable.setCurrentRow(findRow);
            //     })
            //   }
          })
        }
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
        this.timer = window.setTimeout(function () {
          if (_this.materieltypeId == 9) {//原油
            //调用批量插入的接口
            insertByMainIdAndCodeAndOilId(_this.tankinfo.boctmainId, _this.tankinfo.tankCode, row.oilId, _this.materieltypeId, row.cnName).then(res => {
              if (res.data.code != 200) {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              _this.getMixCtTankinfoByMainIdAndCode(_this.groupsize);
              _this.selectcrudeblendoil();
            });
          } else {
            insertGasMessageByMainId(_this.tankinfo.boctmainId, _this.tankinfo.tankCode, row.WK_ID, _this.materieltypeId, row.WORKORDER_ODD).then(res => {
              if (res.data.code != 200) {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              //选中后重新加载物料物料数据表
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
        deleteByMainIdAndTankCode(this.tankinfo.boctmainId, this.tankinfo.tankCode).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          //选中后重新加载物料物料数据表
          this.getMixCtTankinfoByMainIdAndCode(this.groupsize);
        });
      },
      installUpData(){
        this.tankinfo = {};
        getOptCtTankinfoByMainIdAndCode(this.ctmaindata.boctmainId, this.materieltypeId, this.tabsIndex).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          let data = res.data.data[0]
          this.tankinfo = data
          console.log('更新罐数据信息',data);

          if(data.wkId === ''){
            this.isShowList = false
              this.enteringwayFlag = true
          }else{
            this.isShowList = true
              this.enteringwayFlag = false
          }
          const malist = this.tankinfo.mixMatterVOList;
          for (var j = 0; j < malist.length; j++) {
            if (malist[j].dataValue == -1) {
              malist[j].dataValue = '';
            }
          }

          this.getOilData();
          //更新罐数据信息
          // this.tankinfo.mixMatterVOList.forEach(item => {
          //   item.dataValue = '';
          // })
        });
      },
      //罐切换
      selectleftmenu(index) {
        this.metaIndex = this.groupsize
        this.menuIndex = index
        this.newIndex = index;
        this.groupsize = index;
        this.tabsIndex = index
        // this.isShowList = true
        console.log(this.logsTankinfo1,this.logsTankinfo2,'切换')
        let that = this
        if(this.historyFlag) {
          console.log('历史记录进来的')
          getOptCtTankinfoByMainIdAndCode(this.ctmaindata.boctmainId, this.materieltypeId, index).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }

            let data = res.data.data[0];
            this.tankinfo = data

            if(data.wkId === ''){
              this.isShowList = false
              this.enteringwayFlag = true
            }else{
              this.isShowList = true
              this.enteringwayFlag = false
              // this.$refs.singleTable.bodyWrapper.scrollTop = 0;
            }

            const malist = this.tankinfo.mixMatterVOList;
            let sum = 0;
            for (var j = 0; j < malist.length; j++) {
              if (malist[j].dataValue == -1) {
                malist[j].dataValue = '';
              }
              sum += Number(malist[j].dataValue);
            }
            // if (sum == 0) {//是默认值的话
            //   this.isShowList = true;
            // } else {
            //   if (this.tankinfo.wkId != "") {
            //     this.isShowList = true;
            //   } else {
            //     this.isShowList = false;
            //   }
            // }
            this.getOilData();
          })
        }else {
          // console.log('切换')
          if(index == 0){
            this.RefreshTheConfiguration(index)
          }
          if(index == 1){
            if(JSON.stringify(this.logsTankinfo1) != '{}'){
              this.RefreshTheConfiguration(index)
                console.log(this.atpresentData1);
                if(this.atpresentData1!=-1){
                  let  highlight =null
                  this.oilData.forEach((item,index)=>{
                    if(item.oilId == this.atpresentData1.oilId){
                      highlight = index
                    }
                  })
                    this.$nextTick(()=>{
                    this.$refs.singleTable.setCurrentRow(this.oilData[highlight]);
                  })
                }else {
                    this.$nextTick(()=>{
                    this.$refs.singleTable.setCurrentRow(-1);
                  })
                }
            }else {
              this.installUpData()
            }

          }
          if(index == 2) {
            if(JSON.stringify(this.logsTankinfo2) != '{}'){
        this.RefreshTheConfiguration(index)
                console.log(this.atpresentData1);

                // this.tankinfo = this.logsTankinfo2
                console.log(this.logsTankinfo2)
                if(this.atpresentData2!=-1){
                  let  highlight =null
                  this.oilData.forEach((item,index)=>{
                    if(item.oilId == this.atpresentData2.oilId){
                      highlight = index
                    }
                  })
                  this.$nextTick(()=>{
                    if(this.oilData.length>0){
                    this.$refs.singleTable.setCurrentRow(this.oilData[highlight]);
                    }
                  })
                }else {
                  this.$refs.singleTable.setCurrentRow(-1);
                }

            }else {
              this.installUpData()
            }

          }
          if(index == 3) {
            if(JSON.stringify(this.logsTankinfo3) != '{}'){
        this.RefreshTheConfiguration(index)

              this.$nextTick(()=>{
                // this.tankinfo = this.logsTankinfo3
                console.log(this.logsTankinfo3)
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

              })
            }else {
              this.installUpData()
            }


          }

          if(index == 4) {
            if(JSON.stringify(this.logsTankinfo4) != '{}'){
        this.RefreshTheConfiguration(index)

              this.$nextTick(()=>{
                // this.tankinfo = this.logsTankinfo4
                console.log(this.logsTankinfo4)
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
          if(index == 5) {
            if(JSON.stringify(this.logsTankinfo5) != '{}'){
        this.RefreshTheConfiguration(index)

              this.$nextTick(()=>{
                // this.tankinfo = this.logsTankinfo5
                console.log(this.logsTankinfo5)
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
          if(index == 6) {
            if(JSON.stringify(this.logsTankinfo6) != '{}'){
        this.RefreshTheConfiguration(index)

              this.$nextTick(()=>{
                // this.tankinfo = this.logsTankinfo6
                console.log(this.logsTankinfo6)
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
      },
      //调合结果
      oilresult() {
        //首先判断当前返回的历史主表Id是否存在
        if (this.resultMainId == 0) {
          this.$message.warning("请进行优化计算或选择一条优化历史记录！");
        } else {
          selectResultData(this.resultMainId, this.ctmaindata.tankNum, this.materieltypeId).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
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
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.oilhistoryData = res.data.data;
          let arr = [];
          this.oilhistoryData.forEach(ele => {
            ele.blending_scale = (Number(ele.blending_scale) * 100).toFixed(2)
            let firstIndex = this.oilhistoryData.findIndex(item => {
              return item.ROPTMAIN_ID === ele.ROPTMAIN_ID   // 当RMAIN_ID相同的时候，返回第一个相同的Index 赋值给 firstIndex
            })
            if (arr.findIndex(item => {
              return item.firstIndex === firstIndex
            }) === -1) {
              arr.push({
                length: this.oilhistoryData.filter(item => {
                  return item.ROPTMAIN_ID === ele.ROPTMAIN_ID    //利用数组的filter方法，过滤出相同category的数组的长度。数组长度-即为跨多少行
                }).length,
                firstIndex: firstIndex    // firstIndex 返回的是第一个RMAIN_ID就满足的第一个Index,即为rowIndex开始于第几行。
              })
            }
          })
          this.indexInfoList = arr;
        });
      },
      //调合历史的合并单元格
      oilhistorySpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 ||
          columnIndex === 3 ||
          columnIndex === 7 || columnIndex === 8) {
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
        // console.log('1932')
        if (this.oilhistoryselected.length < 1) {//未选择
          this.$message.warning("请选择一条调和历史");
          return;
        } else if (this.oilhistoryselected.length == 1) {//选择一条记录
          this.resultMainId = this.oilhistoryselected[0].ROPTMAIN_ID;
          submitHistory(this.resultMainId, this.materieltypeId, this.oilhistoryselected[0].TANK_COUNT).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            if (res.data.data != 0) {//成功
              //按钮可点击
              this.blenddisable = false;
              this.historyFlag = true
              this.deleteAllTempFlag = true
              //关闭弹窗
              this.colseoilhistorydialog();
              this.reloadAllData(res.data.data);
            } else {//失败
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
          });
        } else {//选择多条记录
          // let
          this.$message.warning(`只能选择一条${this.historyname}`);
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
          getOptCtTankinfoParam(rmainId).then(res1 => {
            if (res1.data.code != 200) {
              let that = this;
              errorMsgbox(that, res1.data.msg);
            }
            //按钮可点击
            this.blenddisable = false;
            //图表展示
            leftdataReload(res1.data.data, this.oilgroup);
            //加载右侧所需数据
            getRightData(this.resultMainId).then(res2 => {
              if (res2.data.code != 200) {
                let that = this;
                errorMsgbox(that, res2.data.msg);
              }
              /*if(res2.data.data.blending.length > 0){
                res2.data.data.blending.forEach(element => {
                  element.BLENDING_SCALE = (element.BLENDING_SCALE ).toFixed(2);
                })
              }*/
              //图标展示
              rightdataReload(res2.data.data, this.oilgroup);
            });
          })
        });
      },
      //关闭调合历史弹窗事件
      colseoilhistorydialog() {
        // console.log('111')
        this.oilhistorydialog = false;
      },
      //调合历史选中状态删除
      oilhistorySelectionChange(val) {
        this.oilhistoryselected = val;
      },
      //删除调和历史数据
      deleteoilhistoryData() {
        let ids = [];
        this.oilhistoryselected.forEach(ele => {
          ids.push(ele.ROPTMAIN_ID);
        });
        if (ids.join(",") == "") {
          this.$message.warning("请选择要删除的调和历史！");
          return;
        }
        removeResultHistoryData(ids.join(",")).then(res => {
          if (res.data.code != 200) {
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
      //优化计算
      blendCompute() {
        //func: 是父组件指定的传数据绑定的函数，this.msg:子组件给父组件传递的数据
        this.$emit('load', true);
        optAnalysis(this.ctmaindata.boctmainId, this.materieltypeId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.$emit('load', false);
          if (res.data.data.success == "fail") {
            this.$message.warning(res.data.data.message);
          } else {
            this.resultjson = res.data.data;
            this.resultMainId = this.resultjson.rmain_id;
            getRightData(this.resultjson.rmain_id).then(res => {
              if (res.data.code != 200) {
                let that = this;
                errorMsgbox(that, res.data.msg);
              }
              rightdataReload(res.data.data, this.oilgroup);
            });
          }
        })
      },
      //弹窗确认,校验参数
      submitdialog() {
        this.historyFlag = false
        //首先根据信息,重新查询一下当前信息
        getOptCtTankinfoByMainId(this.ctmaindata.boctmainId, this.materieltypeId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          var a = res.data.data[0];
          this.zfinfo = a[0];
          this.tankinfolist = res.data.data[1];
          //判断必填字段
          //组织弹出框语义 组分管理中  罐1调合数据必填
          //调合产品中 产品名称 罐名称必填
          //罐1至少输入1个物性值
          var flag = false;
          var str00 = "";
          var str0 = "";
          var str1 = "";
          var yh_type = this.ctmaindata.optMethod;
          //此组分名称为产品ID
          if (this.zfinfo.zfName == null || this.zfinfo.zfName == '' || this.zfinfo.zfName == undefined) {
            str0 = "调合产品信息输入不完整；<br>";
            flag = true;
          }
          if (this.zfinfo.tankName == null || this.zfinfo.tankName == '' || this.zfinfo.tankName == undefined) {
            str0 = "调合产品信息输入不完整；<br>";
            flag = true;
          }
          for (var i = 0; i < this.tankinfolist.length; i++) {
            var tank_code = this.tankinfolist[i].tankCode;
            var tank_name = this.tankinfolist[i].tankName;//罐名称
            var zf_name = this.tankinfolist[i].zfName;//组分名称
            var num_lower = this.tankinfolist[i].numLower; //数量下限
            var num_upper = this.tankinfolist[i].numUpper; //数量上限
            var num_price = this.tankinfolist[i].numPrice; //价格
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
                  if (malist[j].dataValue == '' || malist[j].dataValue == undefined || malist[j].dataValue == null) {
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
            if (yh_type == '1') {
              if (num_lower == null || num_lower == -1 || num_lower == undefined || num_upper == null || num_upper == -1 || num_upper == undefined) {
                str00 = "组分管理信息输入不完整；<br>";
                flag = true;
              }
            } else if (yh_type == '2') {
              if (num_lower == null || num_lower == -1 || num_lower == undefined || num_upper == null || num_upper == -1
                || num_upper == undefined || num_price == null || num_price == -1 || num_price == undefined) {
                str00 = "组分管理信息输入不完整；<br>";
                flag = true;
              }
            }
          }
          if (flag) {
            const malist = this.zfinfo.mixMatterVOList;
            for (var j = 0; j < malist.length; j++) {
              if (malist[j].dataValue == -1) {
                malist[j].dataValue = '';
              }
            }
            for (var i = 0; i < this.tankinfolist.length; i++) {
              if (this.tankinfolist[i].numLower == -1) {
                this.tankinfolist[i].numLower = '';
              }
              if (this.tankinfolist[i].numUpper == -1) {
                this.tankinfolist[i].numUpper = '';
              }
              if (this.tankinfolist[i].numPrice == -1) {
                this.tankinfolist[i].numPrice = '';
              }
            }
            this.$message({
              dangerouslyUseHTMLString: true,
              message: str00 + str0 + str1
            });
            return;
          } else {
            //调合计算按钮设置为可用
            this.colsedialog();
            this.getMixCtTankinfoParam();
            this.$emit('getid', '子组件向父组件传值');
          }
        })
      },
      //回显参数
      getMixCtTankinfoParam() {
        getOptCtTankinfoParam(this.tankinfolist[0].boctmainId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.chartData = res.data.data
          this.deleteAllTempFlag = true
          leftdataReload(res.data.data, this.oilgroup);
          this.blenddisable = false;
        })
      },
      //关闭取消弹窗
      colsedialog() {
        this.historyFlag = false
        //移除选中物性(初始化要默认的物性)
        //removeDefaultMatterprosNew(this.materieltypeId).then(res=>{})

        this.matterdialog = false;
        this.$refs.ellmenu.activeIndex = null;
        this.$emit('open', false);
      },
      //更改调合分组之后加载页面
      changetanknum() {
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
                //更新已经选择的罐的信息
                that.selectcrudeblendoil();
              }
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
        updateCtConfigRowOrder(row.configId, row.uorder).then(() => {

        }, error => {
          console.log(error);
        });
      },
      //抽屉关闭
      drawerhandleClose() {
        this.drawer = false;
      },
      //判断数值是否符合要求并且求百分比
      judgeNumandPercent(item, flag) {
        var ff = false;
        let value = null;
        if (flag == 1) {
          value = item.numLower.replace('/(^\s*)|(\s*$)', '');  //去除字符串前后空格
        } else if (flag == 2) {
          value = item.numUpper.replace('/(^\s*)|(\s*$)', '');  //去除字符串前后空格
        } else if (flag == 3) {
          value = item.numPrice.replace('/(^\s*)|(\s*$)', '');  //去除字符串前后空格
        }
        let num = Number(value);  //将字符串转换为数字
        if (isNaN(num)) {  //判断是否是非数字
          //非数字清空当前值
          if (flag == 1) {
            item.numLower = 1;
            this.$message.warning("最小值只能输入数字");
            return;
          } else if (flag == 1) {
            item.numUpper = 1;
            this.$message.warning("最大值只能输入数字");
            return;
          } else if (flag == 3) {
            item.numPrice = 0;
            this.$message.warning("价格只能输入数字");
            return;
          }
        } else if (num < 0) {  //空字符串和null都会被当做数字
          if (flag == 1) {
            item.numLower = 1;
            this.$message.warning("最小值只能输入正数");
            return;
          } else if (flag == 2) {
            item.numUpper = this.ctmaindata.totalNum;
            this.$message.warning("最大值只能输入正数");
            return;
          } else if (flag == 3) {
            item.numPrice = 0;
            this.$message.warning("价格只能输入正数");
            return;
          }
          // } else if (num==0){
          //   if(flag==1){
          //     item.numLower=0;
          //     this.$message.warning("最小值不能为0");
          //     return;
          //   }else if(flag==2){
          //     item.numUpper=1;
          //     this.$message.warning("最大值不能为0");
          //     return;
          //   }
        } else {//单个判断
          if (flag == 1) {
            if (Number(item.numLower) < Number(item.numUpper)) {
              //判断最小值之和是否小于总数
              //求和
              var sum = 0;
              for (var i = 0; i < this.tankinfolist.length; i++) {
                sum += Number(this.tankinfolist[i].numLower);
              }
              if (sum <= Number(this.ctmaindata.totalNum)) {
                ff = true;
              } else {
                item.numLower = 0;
                this.$message.warning("最小值之不能大于组分总量");
                return;
              }
            } else {
              item.numLower = 0;
              this.$message.warning("最小值不能超过最大值");
              return;
            }
          } else if (flag == 2) {
            if (Number(item.numUpper) <= Number(this.ctmaindata.totalNum)) {
              //判断最大值之和是否大于总数
              var sum = 0;
              for (var i = 0; i < this.tankinfolist.length; i++) {
                sum += Number(this.tankinfolist[i].numUpper);
              }
              if (sum >= Number(this.ctmaindata.totalNum)) {
                ff = true;
              } else {
                item.numUpper = Number(this.ctmaindata.totalNum);
                this.$message.warning("最大值之和要大于组分总量");
                return;
              }
            } else {
              item.numUpper = this.ctmaindata.totalNum;
              this.$message.warning("最大值不能超过组分总量");
              return;
            }
          } else {
            ff = true;
          }
        }
        if (ff) {
          this.updateTankInfo(item);
        }
      },
      //获取待选物性
      leftselect() {
        waitOptCtMatterproConfig(this.materieltypeId, this.leftsearch).then(res => {
          if (res.data.code != 200) {
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
        this.leftdisable = true;
        let mattercodes = [];
        this.nowSelectData.forEach((ele) => {
          mattercodes.push(ele.matterproCode);
        });
        let num = Number(this.ctmaindata.tankNum);
        addOptCtMatterConfig(this.ctmaindata.boctmainId, num, mattercodes.join(","), this.materieltypeId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.nowSelectData = [];
          this.selectcrudeblendoil();
          //更新已经选择的罐的信息
          this.getMixCtTankinfoByMainIdAndCode(this.tankinfo.tankCode);
          //加载右侧已经配置的物性数据
          this.selectOptCtMatterproConfig(this.materieltypeId);
          //加载左侧物性数据
          this.leftselect();
        });
      },
      //删除
      handleRemoveSelect() {
        this.rightdisable = true;
        let matterids = [];
        this.nowSelectRightData.forEach((ele) => {
          matterids.push(ele.configId);
        });
        let num = Number(this.ctmaindata.tankNum);
        removeCtMatterConfig(this.ctmaindata.boctmainId, num, matterids.join(","), this.materieltypeId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.nowSelectRightData = [];
          this.selectcrudeblendoil();
          //更新已经选择的罐的信息
          this.getMixCtTankinfoByMainIdAndCode(this.tankinfo.tankCode);
          //加载右侧已经配置的物性数据
          this.selectOptCtMatterproConfig(this.materieltypeId);
          //加载左侧物性数据
          this.leftselect();
        });
      },
      //加载产品弹窗
      productClick() {
        this.stadarDrawer = true;//开启抽屉
        this.leftdatareload();
      },
      //初始化表格数据
      leftdatareload() {
        let aa = {
          materieltypeId: this.materieltypeId
        }
        getStandardList(aa).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.leftProdata = res.data.data;
          this.leftProdata2 = JSON.parse(JSON.stringify(res.data.data))
          if (this.leftProdata.length > 0) {
            for (var i = 0; i < this.leftProdata.length; i++) {
              this.$set(this.leftProdata[i], 'edit', false);
            }
            // this.$refs.leftTwoTable.setCurrentRow(this.leftProdata[0]);//左侧列表默认选中第一行
            //加载下方物性列表
            this.downdatareload(this.leftProdata[0].standardId);
          }
        });
      },
      //添加产品
      productAdd() {
        let aa = {
          materieltypeId: this.materieltypeId,
        }
        insertStandard(aa).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          if (res.data.success) {
            this.leftdatareload();
          } else {
            this.$message.warning("新增失败");
          }
        })
      },
      //上方列表的行点击事件
      lefttableclick(row) {
        //清空下方数据
        this.rightProdata = [];
        //查询下方列表
        this.downdatareload(row.standardId);
      },
      //加载下方物性列表
      downdatareload(id) {
        getStandarddetailList(id).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.rightProdata2 = JSON.parse(JSON.stringify(res.data.data))
          this.rightProdata = res.data.data;
          this.operationCreator = res.data.data[0].createUser;
          for (var i = 0; i < this.rightProdata.length; i++) {
            this.$set(this.rightProdata[i], 'downedit', false);
            if (this.rightProdata[i].dataValue == -1) {
              this.$set(this.rightProdata[i], 'dataValue', '');
            }
          }
          this.$nextTick(() => {
            this.$refs.rightdownTable.doLayout(); //解决表格错位
          });
        });
      },
      //编辑产品
      handleDownEdit(index, row) {
        // this.leftProdata
        console.log(this.leftProdata2)
        this.leftProdata2.forEach((item,i)=>{
          this.leftProdata.forEach((ele,j)=>{
            if(item.standardId == ele.standardId){
              this.leftProdata[j].standardName = this.leftProdata2[i].standardName==-1?'':this.leftProdata2[i].standardName
              this.leftProdata[j].note = this.leftProdata2[i].note==-1?'':this.leftProdata2[i].note
            }
          })
        })
        this.leftProdata.forEach((item,index)=>{
          if(item.standardId == row.standardId){
            this.leftProdata[index].edit = !this.leftProdata[index].edit
          }else if(item.standardId != row.standardId) {
            this.leftProdata[index].edit = false
          }
        })
        // leftProdata2  leftProdata2
        this.leftProdata.push({a:0})
        this.leftProdata.pop()
        // row.edit = true;
      },
      handleDownCopy(index, row) {
        let that = this;
        let obj = row;
        // console.log(that.leftProdata);
        obj.createUser = this.createUser;
        let tempName = "产品" + this.dateFormatByYYYYMMDD(new Date());
        obj.standardName = tempName;
        delete obj.isvalid
        optstandardCopy(obj).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          if (res.data.success) {
            this.leftdatareload()
          }
        })
      },
      //删除产品
      handleDownDelete(index, row) {
        removeStandard(row.standardId).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          if (res.data.success) {
            this.leftdatareload();
          }
        })
      },
      //保存产品
      handleDownSave(index, row) {
        updateStandard(row).then(res => {
          if (res.data.code != 200) {
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.leftdatareload();
        });
      },
      //取消产品
      handelDownCancel(index, row) {
        row.edit = false;
        this.leftProdata2.forEach((item,index)=>{
          if(item.standardId == row.standardId){
            this.$set(row,'note',this.leftProdata2[index].note==-1?'':this.leftProdata2[index].note)
            this.$set(row,'standardName',this.leftProdata2[index].standardName==-1?'':this.leftProdata2[index].standardName)
          }
        })
        // this.leftProdata
      },
      //编辑产品明细
      handleUpEdit(index, row) {
        // rightProdata2
        console.log(this.rightProdata,this.rightProdata2)
        this.rightProdata2.forEach((item,i)=>{
          this.rightProdata.forEach((ele,j)=>{
            if(item.standarddetailId == ele.standarddetailId){
              this.rightProdata[j].dataValue = this.rightProdata2[i].dataValue==-1?'':this.rightProdata2[i].dataValue
              this.rightProdata[j].logicalSign = this.rightProdata2[i].logicalSign==-1?'':this.rightProdata2[i].logicalSign
            }
          })
        })
        this.rightProdata.forEach((item,index)=>{
          if(item.standarddetailId == row.standarddetailId){
            this.rightProdata[index].downedit = !this.rightProdata[index].downedit
          }else if(item.standarddetailId != row.standarddetailId) {
            this.rightProdata[index].downedit = false
          }
        })
        this.rightProdata.push({a:0})
        this.rightProdata.pop()
        // row.downedit = true;
      },
      //保存产品明细
      handleUpSave(index, row) {
        var num = row.dataValue * 1;
        if (isNaN(num) == false) {
          //删除多余的物性名称
          this.$delete(row, 'matterproName')
          this.$set(row, 'materielTypeId', this.materieltypeId);

          updateStandarddetail(row).then(res => {
            if (res.data.code != 200) {
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            this.downdatareload(row.standardId);
          });
        } else {
          this.$message.warning("请输入正确数值！");
          this.downdatareload(row.standardId);
        }
      },
      //取消产品明细
      handelUpCancel(index, row) {
        this.rightProdata2.forEach((item,index)=>{
          if(item.standarddetailId == row.standarddetailId){
            console.log(this.rightProdata2[index])
            this.$set(row,'dataValue',this.rightProdata2[index].dataValue==-1?'':this.rightProdata2[index].dataValue)
            this.$set(row,'logicalSign',this.rightProdata2[index].logicalSign == -1?'':this.rightProdata2[index].logicalSign)
          }
        })
        console.log(row,'/row')
        row.downedit = false;
      },
      //格式化日期
      dateFormat(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      },
      //格式化日期
      dateFormatByYYYYMMDD(time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds;
      },
    },
  }
</script>

<style scoped="scoped" lang="scss">
  /deep/ .el-dialog__body {
    padding: 0px 0px;
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

  .tb-edit .el-select {
    display: block;
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

  /deep/ .el-table thead th {
    padding: 0px !important;
  }

  /deep/ .el-table .cell {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
</style>
