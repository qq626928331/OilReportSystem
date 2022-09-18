<template>
  <div v-if="innerFBL == 1366">
    <el-row>
      <div style="background-color: #409EFF;height: 50px;line-height: 50px;border-radius: 5px">
        <span style="font-size: 20px;margin-left: 20px;color: white;">接口服务配置器</span>
      </div>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col span="5">
        <div class="grid-content bg-purple" :style="divclass1">
          <el-card class="box-card" style="height:100%;">
            <div slot="header" class="clearfix">
              <span class="spanStyleLeft">输入数据</span>
            </div>
            <el-row :gutter="10">
              <el-col span="10">
                <div v-if="menuselect == 1" class="spanOptionSelect" style="width:50%;height:40px;"
                     @click="changeMenu(1)">
                  <div>
                    <img src="/icon/btn_lims_a.png" style="height: 25px;"/>
                  </div>
                  <span style="color:#409EFF;font-size:10px;">LIMS</span>
                </div>
                <div v-else class="spanOption" style="width:50%;height:40px;" @click="changeMenu(1)">
                  <div>
                    <img src="/icon/btn_lims.png" style="height: 25px;"/>
                  </div>
                  <span style="font-size:10px;">LIMS</span>
                </div>
              </el-col>
              <el-col span="10">
                <div v-if="menuselect == 2" class="spanOptionSelect" style="width:50%;height:40px;"
                     @click="changeMenu(2)">
                  <div>
                    <img src="/icon/btn_mes_a.png" style="height: 25px;"/>
                  </div>
                  <span style="color:#409EFF;font-size:10px;">MES</span>
                </div>
                <div v-else class="spanOption" style="width:50%;height:40px;" @click="changeMenu(2)">
                  <div>
                    <img src="/icon/btn_mes.png" style="height: 25px;"/>
                  </div>
                  <span style="font-size:10px;">MES</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <div style="height:5px;"></div>
        <div class="grid-content bg-purple" :style="divclass1">
          <el-card class="box-card" style="height:100%;">
            <div slot="header" class="clearfix">
              <span class="spanStyleLeft">输出数据</span>
            </div>
            <el-row :gutter="10">
              <el-col span="10">
                <div v-if="menuselect == 3" class="spanOptionSelect" style="width:50%;height:40px;"
                     @click="changeMenu(3)">
                  <div>
                    <img src="/icon/btn_lims_a.png" style="height: 25px;"/>
                  </div>
                  <span style="color:#409EFF;font-size:10px;">LIMS</span>
                </div>
                <div v-else class="spanOption" style="width:50%;height:40px;" @click="changeMenu(3)">
                  <div>
                    <img src="/icon/btn_lims.png" style="height: 25px;"/>
                  </div>
                  <span style="font-size:10px;">LIMS</span>
                </div>
              </el-col>
              <el-col span="10">
                <div v-if="menuselect == 4" class="spanOptionSelect" style="width:50%;height:40px;"
                     @click="changeMenu(4)">
                  <div>
                    <img src="/icon/btn_mes_a.png" style="height: 25px;"/>
                  </div>
                  <span style="color:#409EFF;font-size:10px;">MES</span>
                </div>
                <div v-else class="spanOption" style="width:50%;height:40px;" @click="changeMenu(4)">
                  <div>
                    <img src="/icon/btn_mes.png" style="height: 25px;"/>
                  </div>
                  <span style="font-size:10px;">MES</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <div style="height:5px;"></div>
        <div class="grid-content bg-purple" :style="divclass2">
          <el-card class="box-card" style="height:100%;">
            <div slot="header" class="clearfix">
              <span class="spanStyleLeft">编码对照</span>
            </div>
            <el-row :gutter="10">
              <el-col span="10">
                <div v-if="menuselect == 5" class="spanOptionSelect" style="width:50%;height:40px;"
                     @click="changeMenu(5)">
                  <div>
                    <img src="/icon/btn_mes_a.png" style="height: 25px;"/>
                  </div>
                  <span style="color:#409EFF;font-size:10px;">装置</span>
                </div>
                <div v-else class="spanOption" style="width:50%;height:40px;" @click="changeMenu(5)">
                  <div>
                    <img src="/icon/btn_mes.png" style="height: 25px;"/>
                  </div>
                  <span style="font-size:10px;">装置</span>
                </div>
              </el-col>
              <el-col span="10">
                <div v-if="menuselect == 6" class="spanOptionSelect" style="width:50%;height:40px;"
                     @click="changeMenu(6)">
                  <div>
                    <img src="/icon/btn_caiyangdian_a.png" style="height: 25px;"/>
                  </div>
                  <span style="color:#409EFF;font-size:10px;">采样点</span>
                </div>
                <div v-else class="spanOption" style="width:50%;height:40px;" @click="changeMenu(6)">
                  <div>
                    <img src="/icon/btn_caiyangdian.png" style="height: 25px;"/>
                  </div>
                  <span style="font-size:10px;">采样点</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col span="10">
                <div v-if="menuselect == 7" class="spanOptionSelect" style="width:50%;height:40px;"
                     @click="changeMenu(7)">
                  <div>
                    <img src="/icon/btn_wuliao_a.png" style="height: 25px;"/>
                  </div>
                  <span style="color:#409EFF;font-size:10px;">物料</span>
                </div>
                <div v-else class="spanOption" style="width:50%;height:40px;" @click="changeMenu(7)">
                  <div>
                    <img src="/icon/btn_wuliao.png" style="height: 25px;"/>
                  </div>
                  <span style="font-size:10px;">物料</span>
                </div>
              </el-col>
              <el-col span="10">
                <div v-if="menuselect == 8" class="spanOptionSelect" style="width:50%;height:40px;"
                     @click="changeMenu(8)">
                  <div>
                    <img src="/icon/btn_wuxing_a.png" style="height: 25px;"/>
                  </div>
                  <span style="color:#409EFF;font-size:10px;">物性</span>
                </div>
                <div v-else class="spanOption" style="width:50%;height:40px;" @click="changeMenu(8)">
                  <div>
                    <img src="/icon/btn_wuxing.png" style="height: 25px;"/>
                  </div>
                  <span style="font-size:10px;">物性</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col span="19">
        <el-row v-if="showWhich" gutter="10">
          <el-col span="16">
            <div class="grid-content bg-purple" :style="divclass">
              <div style="height:40%;">
                <div class="spanStyle" style="margin-bottom: 1px">
                  LIMS厂商及版本：
                  <el-select size="small" style="width: 35%" v-model="versionValue" placeholder="请选择"
                             @change="catchMatchDetail(1)">
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionName"
                      :value="item.versionId">
                    </el-option>
                  </el-select>
                  <template>
                    <el-checkbox style="margin-left: 10%;" v-model="accessVersion" @change="updateAccessVersion">
                      是否为取数版本
                    </el-checkbox>
                  </template>
                </div>
                <div class="spanStyle" style="height:7%;height:20px;"><span style="color: #409EFF">数据字段设置</span>
                  <el-button size="mini" type="primary" style="width: 10%;float:right;margin-top: -1%;"
                             @click="saveMatch">保存
                  </el-button>
                </div>
                <div class="contentStyle" style="height:89%;width:96%;margin-top: 10px">
                  <div style="width:100%;height:55%;border-radius: 10px 10px 10px 10px;">
                    <!-- <div style="height:10px;"></div> -->
                    <el-row :gutter="10">
                      <el-col span="12">
                        <div style="background-color: #409EFF;color:white;height: 30px;width:90%;">
                          <span style="margin-left: 20px;position: absolute;margin-top: 5px;">目标字段(IRAS):</span>
                        </div>
                      </el-col>
                      <el-col span="12">
                        <div style="background-color: #409EFF;color:white;height: 30px;width:90%;float:right;">
                          <span style="margin-left: 20px;position: absolute;margin-top: 5px;">源字段(LIMS):</span>
                        </div>
                      </el-col>
                    </el-row>
                    <div v-if="size > 0" style="overflow: auto;overflow-x: hidden;height:80%">
                      <el-row :gutter="10">
                        <el-col span="11">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;transform: translateY(40%);">
                                {{ item.tcolumn }}
                                <div style="margin-left:100px;margin-top:-20px;"><span
                                  style="margin-left:50px;">{{ item.tcolumnName }}</span></div>
                              </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col span="2">
                          <div v-for="item in matchList">
                            <div style="height:35px;margin-left:30%;margin-top:5%;"><img src="/icon/ic_zuo.png"/></div>
                          </div>
                        </el-col>
                        <el-col span="11" style="float: right;">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;">
                                <el-input size="mini" class="styltyzdclass" v-model="item.scolumn"
                                          placeholder="源字段"></el-input>
                                <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                          v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-else style="overflow: auto;overflow-x: hidden;height:80%">
                      <el-row :gutter="10">
                        <el-col span="11">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;transform: translateY(40%);">
                                {{ item.columnName }}
                                <div style="margin-left:100px;margin-top:-20px;"><span
                                  style="margin-left:50px;">{{ item.columnComment }}</span></div>
                              </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col span="2">
                          <div v-for="item in matchList">
                            <div style="height:35px;margin-left:30%;margin-top:5%;"><img src="/icon/ic_zuo.png"/></div>
                          </div>
                        </el-col>
                        <el-col span="11" style="float: right;">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;">
                                <el-input size="mini" class="styltyzdclass" :style="styltyzd" v-model="item.scolumn"
                                          placeholder="源字段"></el-input>
                                <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                          v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <div style="height:60%;">
                <div class="spanStyle"><span style="color: #409EFF">接口方式设置</span></div>
                <el-button size="mini" type="primary" style="width: 10%;float:right;margin-top:5px;margin-right:20px;"
                           @click="saveIftypeByinterfaceType">保存
                </el-button>
                <div class="contentStyle">
                  <el-radio-group v-model="interfaceTypeRadio" style="width: 100%" @change="radioChange">
                    <div style="font-size: 15px;margin-bottom: 5px">
                      <el-radio label="2">指定目录文件交换</el-radio>
                      <div style="margin-left: 20px;margin-top: 5px">
                        文件路径：
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 8%">文件名：</span>
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextFile"
                                  placeholder="请输入内容"></el-input>
                      </div>
                    </div>
                    <div style="font-size: 15px;margin-bottom: 5px">
                      <el-radio label="1">API模式（IRAS调用LIMS接口)</el-radio>
                      <div style="margin-left: 20px;margin-top: 5px">
                        接口URL：
                        <el-input size="small" style="display:inline-block;width: 25%" v-model="inputApiUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 1%">文件或返回值格式：</span>
                        <el-radio-group v-model="inputApiTextType" @change="showJson">
                          <el-radio :disabled="disabled3" label="1">XML</el-radio>
                          <el-radio :disabled="disabled3" label="2">JSON</el-radio>
                        </el-radio-group>
                      </div>
                      <div style="margin-left: 20px;">
                        <div style="margin-top: 5px;"><span style="position: absolute;">参数列表：</span></div>
                        <el-table :data="tableDataParams" size="small" border @header-dragend="changeColWidth"
                                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                                  style="width: 80%;margin-left: 15%;" :height=tableheight>
                          <el-table-column type="index" label="序号" width="180">
                          </el-table-column>
                          <el-table-column prop="paramsColumn" label="参数名" show-overflow-tooltip width="280">
                            <template slot-scope="{row,$index}">
                              <span>{{ row.paramsColumn }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="paramsType" show-overflow-tooltip label="参数类型">
                            <template slot-scope="{row,$index}">
                              <span>{{ row.paramsType }}</span>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="8">
            <div class="grid-content bg-purple" :style="divclass3">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                <!-- {{exampleMessage}} -->
                {{ objJson }}
              </div>
            </div>
            <div style="height:20px;"></div>
            <div class="grid-content bg-purple" :style="divclass3">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                {{ objParamsJson }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="showWhichMes" gutter="10">
          <el-col span="16">
            <div class="grid-content bg-purple" :style="divclass">
              <div style="height:40%;">
                <div class="spanStyle" style="margin-bottom: 1px">
                  MES厂商及版本：
                  <el-select size="small" style="width: 35%" v-model="versionValue" placeholder="请选择"
                             @change="catchMatchDetail(1)">
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionName"
                      :value="item.versionId">
                    </el-option>
                  </el-select>
                  <template>
                    <el-checkbox style="margin-left: 10%;" v-model="accessVersion" @change="updateAccessVersion">
                      是否为取数版本
                    </el-checkbox>
                  </template>
                </div>
                <div class="spanStyle" style="height:7%;height:20px;"><span style="color: #409EFF">数据字段设置</span>
                  <el-button size="mini" type="primary" style="width: 10%;float:right;margin-top: -1%;"
                             @click="saveMatch">保存
                  </el-button>
                </div>
                <div class="contentStyle" style="height:89%;width:96%;">
                  <div style="width:100%;height:55%;border-radius: 10px 10px 10px 10px;">
                    <div style="height:10px;"></div>
                    <el-row :gutter="10">
                      <el-col span="12">
                        <div style="background-color: #409EFF;color:white;height: 30px;width:90%;">
                          <span style="margin-left: 20px;position: absolute;margin-top: 5px;">目标字段(IRAS):</span>
                        </div>
                      </el-col>
                      <el-col span="12">
                        <div style="background-color: #409EFF;color:white;height: 30px;width:90%;float:right;">
                          <span style="margin-left: 20px;position: absolute;margin-top: 5px;">源字段(LIMS):</span>
                        </div>
                      </el-col>
                    </el-row>
                    <div v-if="size > 0" style="overflow: auto;overflow-x: hidden;height:80%">
                      <el-row :gutter="10">
                        <el-col span="11">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;transform: translateY(50%);">
                                {{ item.tcolumn }}
                                <div style="margin-left:100px;margin-top:-20px;"><span
                                  style="margin-left:50px;">{{ item.tcolumnName }}</span></div>
                              </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col span="2">
                          <div v-for="item in matchList">
                            <div style="height:35px;margin-left:30%;margin-top:5%;"><img src="/icon/ic_zuo.png"/></div>
                          </div>
                        </el-col>
                        <el-col span="11" style="float: right;">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;">
                                <el-input size="mini" class="styltyzdclass" v-model="item.scolumn"
                                          placeholder="源字段"></el-input>
                                <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                          v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-else style="overflow: auto;overflow-x: hidden;height:80%">
                      <el-row :gutter="10">
                        <el-col span="11">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;transform: translateY(50%);">
                                {{ item.columnName }}
                                <div style="margin-left:100px;margin-top:-20px;"><span
                                  style="margin-left:50px;">{{ item.columnComment }}</span></div>
                              </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col span="2">
                          <div v-for="item in matchList">
                            <div style="height:35px;margin-left:30%;margin-top:5%;"><img src="/icon/ic_zuo.png"/></div>
                          </div>
                        </el-col>
                        <el-col span="11" style="float: right;">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;">
                                <el-input size="mini" class="styltyzdclass" :style="styltyzd" v-model="item.scolumn"
                                          placeholder="源字段"></el-input>
                                <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                          v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <div style="height:60%;">
                <div class="spanStyle"><span style="color: #409EFF">接口方式设置</span></div>
                <el-button size="mini" type="primary" style="width: 10%;float:right;margin-top:5px;margin-right:20px;"
                           @click="saveIftypeByinterfaceType">保存
                </el-button>
                <div class="contentStyle">
                  <el-radio-group v-model="interfaceTypeRadio" style="width: 100%" @change="radioChange">
                    <div style="font-size: 15px;margin-bottom: 5px">
                      <el-radio label="2">指定目录文件交换</el-radio>
                      <div style="margin-left: 20px;margin-top: 5px">
                        文件路径：
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 8%">文件名：</span>
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextFile"
                                  placeholder="请输入内容"></el-input>
                      </div>
                    </div>
                    <div style="font-size: 15px;margin-bottom: 5px">
                      <el-radio label="1">API模式（IRAS调用LIMS接口)</el-radio>
                      <div style="margin-left: 20px;margin-top: 5px">
                        接口URL：
                        <el-input size="small" style="display:inline-block;width: 25%" v-model="inputApiUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 1%">文件或返回值格式：</span>
                        <el-radio-group v-model="inputApiTextType" @change="showJson">
                          <el-radio :disabled="disabled3" label="1">XML</el-radio>
                          <el-radio :disabled="disabled3" label="2">JSON</el-radio>
                        </el-radio-group>
                      </div>
                      <div style="margin-left: 20px;">
                        <div style="margin-top: 5px;"><span style="margin-top:10px;position: absolute;">参数列表：</span>
                        </div>
                        <el-table :data="tableDataParams" size="small" border
                                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                                  style="width: 80%;margin-left: 15%;" :height=tableheight>
                          <el-table-column type="index" label="序号" width="180">
                          </el-table-column>
                          <el-table-column prop="paramsColumn" label="参数名" show-overflow-tooltip width="280">
                            <template slot-scope="{row,$index}">
                              <span>{{ row.paramsColumn }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="paramsType" show-overflow-tooltip label="参数类型">
                            <template slot-scope="{row,$index}">
                              <span>{{ row.paramsType }}</span>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="8">
            <div class="grid-content bg-purple" :style="divclass3">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                <!-- {{exampleMessage}} -->
                {{ objJson }}
              </div>
            </div>
            <div style="height:20px;"></div>
            <div class="grid-content bg-purple" :style="divclass3">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                {{ objParamsJson }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="showWhichOutLims" gutter="10">
          <el-col span="16">
            <div class="grid-content bg-purple" :style="divclass">
              <div style="height:82%;">
                <div class="spanStyle" style="margin-bottom: 10px">
                  LIMS厂商及版本：
                  <el-select size="small" style="width: 35%" v-model="versionValue" placeholder="请选择"
                             @change="catchMatchDetail(2)">
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionName"
                      :value="item.versionId">
                    </el-option>
                  </el-select>
                  <template>
                    <el-checkbox style="margin-left: 10%;" v-model="accessVersion" @change="updateAccessVersion">
                      是否为取数版本
                    </el-checkbox>
                  </template>
                </div>
                <div class="spanStyle" style="height:4%;"><span style="color: #409EFF">数据字段设置</span></div>
                <div class="contentStyle" style="height:89%;width:96%;">
                  <el-table ref="multipleTableLims" :data="tableDataOutMatch" tooltip-effect="dark" style="width: 100%"
                            @select="handleSelectionChange"
                            @selection-change="handleSelectionChangeJson" @select-all="handleSelectionChangeAll"
                            border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                            :height="tableheight2">
                    <el-table-column type="selection" width="55" :selectable='checkboxT'></el-table-column>
                    <el-table-column prop="columnName" label="字段"></el-table-column>
                    <el-table-column prop="columnComment" label="字段描述"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div style="height:18%;">
                <div class="spanStyle"><span style="color: #409EFF">接口方式设置</span></div>
                <el-button size="small" type="primary" style="width: 10%;float:right;margin-top:20px;margin-right:20px;"
                           @click="saveIftypeByinterfaceTypeOut">保存
                </el-button>
                <div class="contentStyle">
                  <div style="margin-left: 20px;margin-top: 20px">
                    接口URL：
                    <el-input size="small" style="display:inline-block;width: 15%" v-model="inputApiUrlOut"
                              placeholder="请输入内容"></el-input>
                    <span style="margin-left: 3%">文件或返回值格式：</span>
                    <el-radio-group v-model="inputApiTextTypeOut" @change="showJson1">
                      <el-radio :disabled="disabled4" label="1">XML</el-radio>
                      <el-radio :disabled="disabled4" label="2">JSON</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="8">
            <div class="grid-content bg-purple" :style="divclass">
              <div class="spanStyle"><span style="color: #409EFF">接口返回数据示例</span></div>
              <div class="contentStyle">
                {{ objJsonOut }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="showWhichOutMes" gutter="10">
          <el-col span="16">
            <div class="grid-content bg-purple" :style="divclass">
              <div style="height:82%;">
                <div class="spanStyle" style="margin-bottom: 10px">
                  MES厂商及版本：
                  <el-select size="small" style="width: 35%" v-model="versionValue" placeholder="请选择"
                             @change="catchMatchDetail(3)">
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionName"
                      :value="item.versionId">
                    </el-option>
                  </el-select>
                  <template>
                    <el-checkbox style="margin-left: 10%;" v-model="accessVersion" @change="updateAccessVersion">
                      是否为取数版本
                    </el-checkbox>
                  </template>
                </div>
                <div class="spanStyle" style="height:4%;"><span style="color: #409EFF">数据字段设置</span>
                </div>
                <div class="contentStyle" style="height:89%;width:96%;">
                  <el-table ref="multipleTableMes" :data="tableDataOutMatch" tooltip-effect="dark" style="width: 100%"
                            @select="handleSelectionChange"
                            @selection-change="handleSelectionChangeJson"
                            border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                            :height="tableheight2">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="columnName" label="字段"></el-table-column>
                    <el-table-column prop="columnComment" label="字段描述"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div style="height:18%;">
                <div class="spanStyle"><span style="color: #409EFF">接口方式设置</span></div>
                <el-button size="small" type="primary" style="width: 10%;float:right;margin-top:20px;margin-right:20px;"
                           @click="saveIftypeByinterfaceTypeOut">保存
                </el-button>
                <div class="contentStyle">
                  <div style="margin-left: 20px;margin-top: 20px">
                    接口URL：
                    <el-input size="small" style="display:inline-block;width: 15%" v-model="inputApiUrlOut"
                              placeholder="请输入内容"></el-input>
                    <span style="margin-left: 3%">文件或返回值格式：</span>
                    <el-radio-group v-model="inputApiTextTypeOut" @change="showJson1">
                      <el-radio :disabled="disabled4" label="1">XML</el-radio>
                      <el-radio :disabled="disabled4" label="2">JSON</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="8">
            <div class="grid-content bg-purple" :style="divclass">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                {{ objJsonOut }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-else-if="showWhichDevice">
          <div class="grid-content bg-purple" :style="divclass">
            <div class="spanStyle"><span style="color: #409EFF">装置编码对照</span><span
              style="margin-left:10px;color: #409EFF">{{ dataInType }}</span>
              <el-upload
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :on-error="onError"
                :disabled="importDisabled"
                style="margin-right: 30px;float: right;margin-top: -10px;"
                action="/api/qcadmin-interfaceconfig/version/import"
                :data="{dataInType,dataInType}">
                <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                  {{ importDataText }}
                </el-button>
              </el-upload>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-download" @click="handleexport">导出
              </el-button>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-document" @click="saveDeviceAll">保存
              </el-button>
              <div style="display: inline-block;float: right">
                <el-input placeholder="请输入内容" v-model="devicecodeorname"
                          style="margin-right: 30px;float: right;margin-top: -10px;">
                  <el-button slot="append" icon="el-icon-search" @click="selectDevicecodeorname"></el-button>
                </el-input>
              </div>
            </div>
            <div class="contentStyle">
              <el-table key="deviceTable" :data="tableDataDevice" size="small" border
                        :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                        style="width: 100%" :height=tableheight1>
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="devicecode" label="装置编码" width="100">
                </el-table-column>
                <el-table-column prop="devicename" label="装置名称" width="120">
                </el-table-column>
                <el-table-column prop="deviceshortname" label="简称" width="120">
                </el-table-column>
                <el-table-column prop="capacity" label="产能(吨)" width="80">
                </el-table-column>
                <el-table-column prop="productiontime" label="投产日期" width="140">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" width="140">
                </el-table-column>
                <el-table-column prop="limsDeviceId" label="装置编码" >
                  <template slot-scope="{row,$index}">
                    <el-input v-if="isTrue" class="input__inner" size="small" v-model="row.limsDeviceId"
                              placeholder="请输入编码"></el-input>
                    <el-input v-else class="input__inner" size="small" v-model="row.mesDeviceId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsDeviceName" label="装置中文名称" >
                  <template slot-scope="{row,$index}">
                    <el-input v-if="isTrue" class="input__inner" size="small" v-model="row.limsDeviceName"
                              placeholder="请输入名称"></el-input>
                    <el-input v-else class="input__inner" size="small" v-model="row.mesDeviceName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-row>
        <el-row v-else-if="showWhichSample">
          <div class="grid-content bg-purple" :style="divclass">
            <div class="spanStyle"><span style="color: #409EFF">采样点编码对照</span><span
              style="margin-left:10px;color: #409EFF">{{ dataInType }}</span>
              <el-upload
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="onSuccessSample"
                :on-error="onErrorSample"
                :disabled="importDisabled"
                style="margin-right: 30px;float: right;margin-top: -10px;"
                action="/api/qcadmin-interfaceconfig/version/importSample"
                :data="{dataInType,dataInType}">
                <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                  {{ importDataText }}
                </el-button>
              </el-upload>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-download" @click="handleexportSample">导出
              </el-button>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-document" @click="saveSampleAll">保存
              </el-button>
              <div style="display: inline-block;float: right">
                <el-input placeholder="请输入内容" v-model="samplecodeorname"
                          style="margin-right: 30px;float: right;margin-top: -10px;">
                  <el-button slot="append" icon="el-icon-search" @click="selectSamplecodeorname"></el-button>
                </el-input>
              </div>
            </div>
            <div class="contentStyle">
              <el-table key="sampleTable" :data="tableDataSample" size="small" border
                        :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                        style="width: 100%" :height=tableheight1>
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="sampleCode" label="采样点编码" width="140">
                </el-table-column>
                <el-table-column prop="sampleName" label="采样点名称" width="180">
                </el-table-column>
                <el-table-column prop="sampleSimpleName" label="采样点简称" width="180">
                </el-table-column>
                <!-- <el-table-column prop="isDeleted" label="是否有效" width="120" :formatter="sfktFormate">
                </el-table-column> -->
                <!-- <el-table-column prop="note" label="描述" width="180">
                </el-table-column> -->
                <el-table-column prop="limsSampleId" label="采样点编码" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsSampleId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesSampleId" label="采样点编码" v-else>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesSampleId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsSampleName" label="采样点中文名称" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsSampleName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesSampleName" label="采样点中文名称" v-else>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesSampleName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-row>
        <el-row v-else-if="showWhichMateriel">
          <div class="grid-content bg-purple" :style="divclass">
            <div class="spanStyle"><span style="color: #409EFF">物料编码对照</span><span
              style="margin-left:10px;color: #409EFF">{{ dataInType }}</span>
              <el-upload
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="onSuccessMateriel"
                :on-error="onErrorMateriel"
                :disabled="importDisabled"
                style="margin-right: 30px;float: right;margin-top: -10px;"
                action="/api/qcadmin-interfaceconfig/version/importMateriel"
                :data="{dataInType,dataInType}">
                <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                  {{ importDataText }}
                </el-button>
              </el-upload>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-download" @click="handleexportMateriel">导出
              </el-button>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-document" @click="saveMaterielAll">保存
              </el-button>
              <div style="display: inline-block;float: right">
                <el-input placeholder="请输入内容" v-model="materielcodeorname"
                          style="margin-right: 30px;float: right;margin-top: -10px;">
                  <el-button slot="append" icon="el-icon-search" @click="selectMaterielcodeorname"></el-button>
                </el-input>
              </div>
            </div>
            <div class="contentStyle">
              <el-table key="materielTable" :data="tableDataMateriel" size="small" border @header-dragend="changeColWidth"
                        :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                        style="width: 100%" :height=tableheight1>
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="materielCode" label="物料编码"  show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materielName" label="物料名称" show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column prop="isDeleted" label="是否有效" :formatter="sfktFormate">
                </el-table-column> -->
                <!-- <el-table-column prop="note" label="描述">
                </el-table-column> -->
                <el-table-column prop="limsMaterielId" label="物料编码" v-if="isTrue" show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsMaterielId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesMaterielId" label="物料编码" v-else show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesMaterielId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsMaterielName" label="物料中文名称" v-if="isTrue" show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsMaterielName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesMaterielName" label="物料中文名称" v-else show-overflow-tooltip>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesMaterielName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-row>
        <el-row v-else-if="showWhichMatterpro">
          <div class="grid-content bg-purple" :style="divclass">
            <div class="spanStyle"><span style="color: #409EFF">物性编码对照</span><span
              style="margin-left:10px;color: #409EFF">{{ dataInType }}</span>
              <el-upload
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="onSuccessMatterpro"
                :on-error="onErrorMatterpro"
                :disabled="importDisabled"
                style="margin-right: 30px;float: right;margin-top: -10px;"
                action="/api/qcadmin-interfaceconfig/version/importMatterpro"
                :data="{dataInType,dataInType}">
                <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                  {{ importDataText }}
                </el-button>
              </el-upload>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-download" @click="handleexportMatterpro">导出
              </el-button>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-document" @click="saveMatterproAll">保存
              </el-button>
              <div style="display: inline-block;float: right">
                <el-input placeholder="请输入内容" v-model="matterprocodeorname"
                          style="margin-right: 30px;float: right;margin-top: -10px;">
                  <el-button slot="append" icon="el-icon-search" @click="selectMatterprocodeorname"></el-button>
                </el-input>
              </div>
            </div>
            <div class="contentStyle">
              <el-table key="matterproTable" :data="tableDataMatterpro" size="small" border @header-dragend="changeColWidth"
                        :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                        style="width: 100%" :height=tableheight1>
                <el-table-column type="index" label="序号" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip width="150">
                </el-table-column>
                <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip width="200">
                </el-table-column>

                <!-- <el-table-column prop="isDeleted" label="是否有效" :formatter="sfktFormate">
                </el-table-column> -->
                <!-- <el-table-column prop="note" label="描述">
                </el-table-column> -->
                <el-table-column prop="limsMatterproId" label="物性编码" v-if="isTrue" width="200">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsMatterproId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesMatterproId" label="物性编码" width="200" v-else >
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesMatterproId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsMatterproName" label="物性中文名称" v-if="isTrue" width="250">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsMatterproName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>

                <el-table-column prop="mesMatterproName" label="物性中文名称" v-else width="250">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesMatterproName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsMatterproUnits" label="同步单位" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{isTrue?scope.row.limsMatterproUnits:scope.row.mesMatterproUnits}}</span>
                  </template>
                </el-table-column>
                <!--                <el-table-column prop="mesMatterproUnits" label="同步单位" show-overflow-tooltip   v-else>-->
                <!--                </el-table-column>-->
                <el-table-column prop="limsMatterproUnit" label="同步单位设置" width="100" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <!--                    <el-input class="input__inner" size="small" v-model="row.limsMatterproUnit"-->
                    <!--                              placeholder="请输入单位"></el-input>-->
                    <a v-if="row.matterproUnit.length>0" type="primary" style="color: #409EFF" @click="showSyncUnitSetting(row)" >设置</a>
                  </template>
                </el-table-column>
                <el-table-column prop="mesMatterproUnit" label="同步单位设置"  width="100" v-else>
                  <template slot-scope="{row,$index}">
                    <!--                    <el-input class="input__inner" size="small" v-model="row.mesMatterproUnit"-->
                    <!--                              placeholder="请输入单位"></el-input>-->
                    <a v-if="row.matterproUnit.length>0" type="primary" style="color: #409EFF" @click="showSyncUnitSetting(row)" >设置</a>
                  </template>
                </el-table-column>
                <!--                <el-select-->
                <!--                  v-model="alarmStatu"-->
                <!--                  size="small"-->
                <!--                  multiple-->
                <!--                  collapse-tags-->
                <!--                  clearable-->
                <!--                  :loading="loading"-->
                <!--                  width="220px"-->
                <!--                  @change="selectAll"-->
                <!--                  @remove-tag="removeTag"-->
                <!--                >-->
                <!--                  <el-option-->
                <!--                    v-for="items in alarmStatus"-->
                <!--                    :key="items.roleId"-->
                <!--                    :label="items.roleName"-->
                <!--                    :value="items.roleId"-->
                <!--                  >-->
                <!--                    <span class="check" />-->
                <!--                    <span style="margin-left: 0.08rem;">{{ items.roleName }}</span>-->
                <!--                  </el-option>-->
                <!--                </el-select>-->
              </el-table>
              <div v-if="pageNum < matterproCount" style="text-align: center;cursor: pointer;color: rgb(64, 158, 255);"
                   @click="loadMore">点击加载更多
              </div>
              <!--              <div style="text-align: center;" v-else>没有更多了</div>-->
              <!-- <div v-for="product in tableDataMatterpro.slice(0,pageSize)" :key="product.id" class="product -item"> -->
              <!-- 判断a的值是否小于数组的长度，小于就显示点击加载更多 -->
              <!-- <div class="load-more mr-bottom" v-if="a<tableDataMatterpro.length" @click='loadMore' >点击加载更多</div>
              <div class="load-more mr-bottom" v-else >没有更多了</div> -->
              <!-- </div> -->
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
  <div v-else>
    <el-row>
      <div style="background-color: #409EFF;height: 50px;line-height: 50px;border-radius: 5px">
        <span style="font-size: 20px;margin-left: 20px;color: white;">接口服务配置器</span>
        <!-- <div style="display: inline-block;float: right;margin-right:10px;">
          <el-input placeholder="请输入内容" v-model="input3" >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div> -->
      </div>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col span="5">
        <div class="grid-content bg-purple" :style="divclass1">
          <el-card class="box-card" style="height:100%;">
            <div slot="header" class="clearfix">
              <span class="spanStyleLeft">输入数据</span>
            </div>
            <el-row :gutter="10">
              <el-col span="10">
                <div v-if="menuselect == 1" class="spanOptionSelect" style="width:50%" @click="changeMenu(1)">
                  <img src="/icon/btn_lims_a.png"/>
                  <span style="color:#409EFF;">LIMS</span>
                </div>
                <div v-else class="spanOption" style="width:50%" @click="changeMenu(1)">
                  <img src="/icon/btn_lims.png"/>
                  <span>LIMS</span>
                </div>
              </el-col>
              <el-col span="10">
                <div v-if="menuselect == 2" class="spanOptionSelect" style="width:50%;" @click="changeMenu(2)">
                  <img src="/icon/btn_mes_a.png"/>
                  <span style="color:#409EFF;">MES</span>
                </div>
                <div v-else class="spanOption" style="width:50%;" @click="changeMenu(2)">
                  <img src="/icon/btn_mes.png"/>
                  <span>MES</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <div style="height:20px;"></div>
        <div class="grid-content bg-purple" :style="divclass1">
          <el-card class="box-card" style="height:100%;">
            <div slot="header" class="clearfix">
              <span class="spanStyleLeft">输出数据</span>
            </div>
            <el-row :gutter="10">
              <el-col span="10">
                <div v-if="menuselect == 3" class="spanOptionSelect" style="width:50%;" @click="changeMenu(3)">
                  <img src="/icon/btn_lims_a.png"/>
                  <span style="color:#409EFF;">LIMS</span>
                </div>
                <div v-else class="spanOption" style="width:50%;" @click="changeMenu(3)">
                  <img src="/icon/btn_lims.png"/>
                  <span>LIMS</span>
                </div>
              </el-col>
              <el-col span="10">
                <div v-if="menuselect == 4" class="spanOptionSelect" style="width:50%;" @click="changeMenu(4)">
                  <img src="/icon/btn_mes_a.png"/>
                  <span style="color:#409EFF;">MES</span>
                </div>
                <div v-else class="spanOption" style="width:50%;" @click="changeMenu(4)">
                  <img src="/icon/btn_mes.png"/>
                  <span>MES</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <div style="height:20px;"></div>
        <div class="grid-content bg-purple" :style="divclass2">
          <el-card class="box-card" style="height:100%;">
            <div slot="header" class="clearfix">
              <span class="spanStyleLeft">编码对照</span>
            </div>
            <el-row :gutter="10">
              <el-col span="10">
                <div v-if="menuselect == 5" class="spanOptionSelect" style="width:50%;" @click="changeMenu(5)">
                  <div>
                    <img src="/icon/btn_mes_a.png"/>
                  </div>
                  <span style="color:#409EFF;">装置</span>
                </div>
                <div v-else class="spanOption" style="width:50%;" @click="changeMenu(5)">
                  <div>
                    <img src="/icon/btn_mes.png"/>
                  </div>
                  <span>装置</span>
                </div>
              </el-col>
              <el-col span="10">
                <div v-if="menuselect == 6" class="spanOptionSelect" style="width:50%;" @click="changeMenu(6)">
                  <div>
                    <img src="/icon/btn_caiyangdian_a.png"/>
                  </div>
                  <span style="color:#409EFF;">采样点</span>
                </div>
                <div v-else class="spanOption" style="width:50%;" @click="changeMenu(6)">
                  <div>
                    <img src="/icon/btn_caiyangdian.png"/>
                  </div>
                  <span>采样点</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col span="10">
                <div v-if="menuselect == 7" class="spanOptionSelect" style="width:50%;" @click="changeMenu(7)">
                  <div>
                    <img src="/icon/btn_wuliao_a.png"/>
                  </div>
                  <span style="color:#409EFF;">物料</span>
                </div>
                <div v-else class="spanOption" style="width:50%;" @click="changeMenu(7)">
                  <div>
                    <img src="/icon/btn_wuliao.png"/>
                  </div>
                  <span>物料</span>
                </div>
              </el-col>
              <el-col span="10">
                <div v-if="menuselect == 8" class="spanOptionSelect" style="width:50%;" @click="changeMenu(8)">
                  <div>
                    <img src="/icon/btn_wuxing_a.png"/>
                  </div>
                  <span style="color:#409EFF;">物性</span>
                </div>
                <div v-else class="spanOption" style="width:50%;" @click="changeMenu(8)">
                  <div>
                    <img src="/icon/btn_wuxing.png"/>
                  </div>
                  <span>物性</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col span="19">
        <el-row v-if="showWhich" gutter="10">
          <el-col span="16">
            <div class="grid-content bg-purple" :style="divclass">
              <div style="height:45%;">
                <div class="spanStyle" style="margin-bottom: 10px">
                  LIMS厂商及版本：
                  <el-select size="small" style="width: 50%" v-model="versionValue" placeholder="请选择"
                             @change="catchMatchDetail(1)">
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionName"
                      :value="item.versionId">
                    </el-option>
                  </el-select>
                  <template>
                    <el-checkbox style="margin-left: 10%;" v-model="accessVersion" @change="updateAccessVersion">
                      是否为数据输入版本
                    </el-checkbox>
                  </template>
                </div>
                <div class="spanStyle" style="height:7%;"><span style="color: #409EFF">数据字段设置</span>
                  <el-button size="small" type="primary" style="width: 10%;float:right;margin-top: -1%;"
                             @click="saveMatch">保存
                  </el-button>
                </div>
                <div class="contentStyle" style="height:89%;width:96%;">
                  <div style="width:100%;height:75%;border-radius: 10px 10px 10px 10px;">
                    <div style="height:10px;"></div>
                    <el-row :gutter="10">
                      <el-col span="12">
                        <div style="background-color: #409EFF;color:white;height: 35px;width:90%;">
                          <span style="margin-left: 20px;position: absolute;margin-top: 5px;">目标字段(IRAS):</span>
                        </div>
                      </el-col>
                      <el-col span="12">
                        <div style="background-color: #409EFF;color:white;height: 35px;width:90%;float:right;">
                          <span style="margin-left: 20px;position: absolute;margin-top: 5px;">源字段(LIMS):</span>
                        </div>
                      </el-col>
                    </el-row>
                    <div v-if="size > 0" style="overflow: auto;overflow-x: hidden;height:80%">
                      <el-row :gutter="10">
                        <el-col span="11">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;transform: translateY(50%);">
                                {{ item.tcolumn }}
                                <div style="margin-left:100px;margin-top:-20px;"><span
                                  style="margin-left:100px;">{{ item.tcolumnName }}</span></div>
                              </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col span="2">
                          <div v-for="item in matchList">
                            <div style="height:35px;margin-left:30%;margin-top:5%;"><img src="/icon/ic_zuo.png"/></div>
                          </div>
                        </el-col>
                        <el-col span="11" style="float: right;">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;">
                                <el-input size="mini" class="styltyzdclass" v-model="item.scolumn"
                                          placeholder="源字段"></el-input>
                                <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                          v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-else style="overflow: auto;overflow-x: hidden;height:80%">
                      <el-row :gutter="10">
                        <el-col span="11">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;transform: translateY(50%);">
                                {{ item.columnName }}
                                <div style="margin-left:100px;margin-top:-20px;"><span
                                  style="margin-left:100px;">{{ item.columnComment }}</span></div>
                              </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col span="2">
                          <div v-for="item in matchList">
                            <div style="height:35px;margin-left:30%;margin-top:5%;"><img src="/icon/ic_zuo.png"/></div>
                          </div>
                        </el-col>
                        <el-col span="11" style="float: right;">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;">
                                <el-input size="mini" class="styltyzdclass" :style="styltyzd" v-model="item.scolumn"
                                          placeholder="源字段"></el-input>
                                <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                          v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <div style="height:55%;">
                <div class="spanStyle"><span style="color: #409EFF">接口方式设置</span></div>
                <el-button size="small" type="primary" style="width: 10%;float:right;margin-top:10px;margin-right:20px;"
                           @click="saveIftypeByinterfaceType">保存
                </el-button>
                <div class="contentStyle">
                  <el-radio-group v-model="interfaceTypeRadio" style="width: 100%" @change="radioChange">
                    <div style="font-size: 15px;margin-bottom: 25px">
                      <el-radio label="2">指定目录文件交换</el-radio>
                      <div style="margin-left: 20px;margin-top: 20px">
                        文件路径：
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 8%">文件名：</span>
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextFile"
                                  placeholder="请输入内容"></el-input>
                      </div>
                    </div>
                    <div style="font-size: 15px;margin-bottom: 25px">
                      <el-radio label="1">API模式（IRAS调用LIMS接口)</el-radio>
                      <div style="margin-left: 20px;margin-top: 20px">
                        接口URL：
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputApiUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 8%">文件或返回值格式：</span>
                        <el-radio-group v-model="inputApiTextType" @change="showJson">
                          <el-radio :disabled="disabled3" label="1">XML</el-radio>
                          <el-radio :disabled="disabled3" label="2">JSON</el-radio>
                        </el-radio-group>
                      </div>
                      <div style="margin-left: 20px;margin-top: 20px">
                        <div style="margin-top: 10px;"><span style="margin-top:10px;position: absolute;">参数列表：</span>
                        </div>
                        <!-- <i class="el-icon-plus" @click="addParams" title="添加参数" style="float:right;margin-bottom: 10px;margin-right: 10px;"></i> -->
                        <el-table :data="tableDataParams" size="small" border
                                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                                  style="width: 90%;margin-left: 10%;" :height=tableheight>
                          <el-table-column type="index" label="序号" width="180">
                          </el-table-column>
                          <el-table-column prop="paramsColumn" label="参数名" show-overflow-tooltip width="280">
                            <template slot-scope="{row,$index}">
                              <!-- <el-input
                                class="input__inner"
                                v-if="row.paramsColumnEdit"
                                v-model="row.paramsColumn"
                                :controls="false"
                                @blur="saveParams(row,1)"
                              ></el-input> -->
                              <span>{{ row.paramsColumn }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="paramsType" show-overflow-tooltip label="参数类型">
                            <template slot-scope="{row,$index}">
                              <!-- <el-input
                                class="input__inner"
                                v-if="row.paramsTypeEdit"
                                v-model="row.paramsType"
                                :controls="false"
                                @blur="saveParams(row,2)"
                              ></el-input> -->
                              <span>{{ row.paramsType }}</span>
                            </template>
                          </el-table-column>
                          <!-- <el-table-column prop="paramsValue" label="参数值">
                            <template slot-scope="{row,$index}">
                              <el-input
                                class="input__inner"
                                v-if="row.paramsValueEdit"
                                v-model="row.paramsValue"
                                :controls="false"
                                @blur="saveParams(row,3)"
                              ></el-input>
                              <span v-else @dblclick="changeCode(row,3)">{{row.paramsValue}}</span>
                            </template>
                          </el-table-column> -->
                          <!-- <el-table-column fixed="right" label="操作" width="70">
                            <template slot-scope="{row,$index}">
                              <i class="el-icon-delete" @click="handleDelete($index, row)"
                                style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"></i>
                            </template>
                          </el-table-column> -->
                        </el-table>
                      </div>
                    </div>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="8">
            <div class="grid-content bg-purple" :style="divclass3">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                <!-- {{exampleMessage}} -->
                {{ objJson }}
              </div>
            </div>
            <div style="height:20px;"></div>
            <div class="grid-content bg-purple" :style="divclass3">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                {{ objParamsJson }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="showWhichMes" gutter="10">
          <el-col span="16">
            <div class="grid-content bg-purple" :style="divclass">
              <div style="height:45%;">
                <div class="spanStyle" style="margin-bottom: 10px">
                  MES厂商及版本：
                  <el-select size="small" style="width: 50%" v-model="versionValue" placeholder="请选择"
                             @change="catchMatchDetail(1)">
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionName"
                      :value="item.versionId">
                    </el-option>
                  </el-select>
                  <template>
                    <el-checkbox style="margin-left: 10%;" v-model="accessVersion" @change="updateAccessVersion">
                      是否为数据输入版本
                    </el-checkbox>
                  </template>
                </div>
                <div class="spanStyle" style="height:7%;"><span style="color: #409EFF">数据字段设置</span>
                  <el-button size="small" type="primary" style="width: 10%;float:right;margin-top: -1%;"
                             @click="saveMatch">保存
                  </el-button>
                </div>
                <div class="contentStyle" style="height:89%;width:96%;">
                  <div style="width:100%;height:75%;border-radius: 10px 10px 10px 10px;">
                    <div style="height:10px;"></div>
                    <el-row :gutter="10">
                      <el-col span="12">
                        <div style="background-color: #409EFF;color:white;height: 35px;width:90%;">
                          <span style="margin-left: 20px;position: absolute;margin-top: 5px;">目标字段(IRAS):</span>
                        </div>
                      </el-col>
                      <el-col span="12">
                        <div style="background-color: #409EFF;color:white;height: 35px;width:90%;float:right;">
                          <span style="margin-left: 20px;position: absolute;margin-top: 5px;">源字段(LIMS):</span>
                        </div>
                      </el-col>
                    </el-row>
                    <div v-if="size > 0" style="overflow: auto;overflow-x: hidden;height:80%">
                      <el-row :gutter="10">
                        <el-col span="11">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;transform: translateY(50%);">
                                {{ item.tcolumn }}
                                <div style="margin-left:100px;margin-top:-20px;"><span
                                  style="margin-left:100px;">{{ item.tcolumnName }}</span></div>
                              </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col span="2">
                          <div v-for="item in matchList">
                            <div style="height:35px;margin-left:30%;margin-top:5%;"><img src="/icon/ic_zuo.png"/></div>
                          </div>
                        </el-col>
                        <el-col span="11" style="float: right;">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;">
                                <el-input size="mini" class="styltyzdclass" v-model="item.scolumn"
                                          placeholder="源字段"></el-input>
                                <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                          v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-else style="overflow: auto;overflow-x: hidden;height:80%">
                      <el-row :gutter="10">
                        <el-col span="11">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;transform: translateY(50%);">
                                {{ item.columnName }}
                                <div style="margin-left:100px;margin-top:-20px;"><span
                                  style="margin-left:100px;">{{ item.columnComment }}</span></div>
                              </div>
                            </div>
                          </div>
                        </el-col>
                        <el-col span="2">
                          <div v-for="item in matchList">
                            <div style="height:35px;margin-left:30%;margin-top:5%;"><img src="/icon/ic_zuo.png"/></div>
                          </div>
                        </el-col>
                        <el-col span="11" style="float: right;">
                          <div v-for="item in matchList">
                            <div style="width:100%;height:35px;backgroundColor: white;border-bottom: 1px solid #ccc;">
                              <div style="margin-left:10px;">
                                <el-input size="mini" class="styltyzdclass" :style="styltyzd" v-model="item.scolumn"
                                          placeholder="源字段"></el-input>
                                <el-input size="mini" style="width: 40%;margin-left:10px;margin-top:3px;"
                                          v-model="item.scolumnName" placeholder="源字段说明"></el-input>
                              </div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <div style="height:55%;">
                <div class="spanStyle"><span style="color: #409EFF">接口方式设置</span></div>
                <el-button size="small" type="primary" style="width: 10%;float:right;margin-top:10px;margin-right:20px;"
                           @click="saveIftypeByinterfaceType">保存
                </el-button>
                <div class="contentStyle">
                  <el-radio-group v-model="interfaceTypeRadio" style="width: 100%" @change="radioChange">
                    <div style="font-size: 15px;margin-bottom: 25px">
                      <el-radio label="2">指定目录文件交换</el-radio>
                      <div style="margin-left: 20px;margin-top: 20px">
                        文件路径：
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 8%">文件名：</span>
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputTextFile"
                                  placeholder="请输入内容"></el-input>
                      </div>
                    </div>
                    <div style="font-size: 15px;margin-bottom: 25px">
                      <el-radio label="1">API模式（IRAS调用LIMS接口)</el-radio>
                      <div style="margin-left: 20px;margin-top: 20px">
                        接口URL：
                        <el-input size="small" style="display:inline-block;width: 30%" v-model="inputApiUrl"
                                  placeholder="请输入内容"></el-input>
                        <span style="margin-left: 8%">文件或返回值格式：</span>
                        <el-radio-group v-model="inputApiTextType" @change="showJson">
                          <el-radio :disabled="disabled3" label="1">XML</el-radio>
                          <el-radio :disabled="disabled3" label="2">JSON</el-radio>
                        </el-radio-group>
                      </div>
                      <div style="margin-left: 20px;margin-top: 20px">
                        <div style="margin-top: 10px;"><span style="margin-top:10px;position: absolute;">参数列表：</span>
                        </div>
                        <!-- <i class="el-icon-plus" @click="addParams" title="添加参数" style="float:right;margin-bottom: 10px;margin-right: 10px;"></i> -->
                        <el-table :data="tableDataParams" size="small" border
                                  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                                  style="width: 90%;margin-left: 10%;" :height=tableheight>
                          <el-table-column type="index" label="序号" width="180">
                          </el-table-column>
                          <el-table-column prop="paramsColumn" label="参数名" show-overflow-tooltip width="280">
                            <template slot-scope="{row,$index}">
                              <!-- <el-input
                                class="input__inner"
                                v-if="row.paramsColumnEdit"
                                v-model="row.paramsColumn"
                                :controls="false"
                                @blur="saveParams(row,1)"
                              ></el-input> -->
                              <span>{{ row.paramsColumn }}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="paramsType" show-overflow-tooltip label="参数类型">
                            <template slot-scope="{row,$index}">
                              <!-- <el-input
                                class="input__inner"
                                v-if="row.paramsTypeEdit"
                                v-model="row.paramsType"
                                :controls="false"
                                @blur="saveParams(row,2)"
                              ></el-input> -->
                              <span>{{ row.paramsType }}</span>
                            </template>
                          </el-table-column>
                          <!-- <el-table-column prop="paramsValue" label="参数值">
                            <template slot-scope="{row,$index}">
                              <el-input
                                class="input__inner"
                                v-if="row.paramsValueEdit"
                                v-model="row.paramsValue"
                                :controls="false"
                                @blur="saveParams(row,3)"
                              ></el-input>
                              <span v-else @dblclick="changeCode(row,3)">{{row.paramsValue}}</span>
                            </template>
                          </el-table-column> -->
                          <!-- <el-table-column fixed="right" label="操作" width="70">
                            <template slot-scope="{row,$index}">
                              <i class="el-icon-delete" @click="handleDelete($index, row)"
                                style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"></i>
                            </template>
                          </el-table-column> -->
                        </el-table>
                      </div>
                    </div>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="8">
            <div class="grid-content bg-purple" :style="divclass3">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                <!-- {{exampleMessage}} -->
                {{ objJson }}
              </div>
            </div>
            <div style="height:20px;"></div>
            <div class="grid-content bg-purple" :style="divclass3">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                {{ objParamsJson }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="showWhichOutLims" gutter="10">
          <el-col span="16">
            <div class="grid-content bg-purple" :style="divclass">
              <div style="height:82%;">
                <div class="spanStyle" style="margin-bottom: 10px">
                  LIMS厂商及版本：
                  <el-select size="small" style="width: 50%" v-model="versionValue" placeholder="请选择"
                             @change="catchMatchDetail(2)">
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionName"
                      :value="item.versionId">
                    </el-option>
                  </el-select>
                  <template>
                    <el-checkbox style="margin-left: 10%;" v-model="accessVersion" @change="updateAccessVersion">
                      是否为数据输出版本
                    </el-checkbox>
                  </template>
                </div>
                <div class="spanStyle" style="height:4%;"><span style="color: #409EFF">数据字段设置</span></div>
                <div class="contentStyle" style="height:89%;width:96%;">
                  <el-table ref="multipleTableLims" :data="tableDataOutMatch" tooltip-effect="dark" style="width: 100%"
                            @select="handleSelectionChange"
                            @selection-change="handleSelectionChangeJson" @select-all="handleSelectionChangeAll"
                            border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                            :height="tableheight2">
                    <el-table-column type="selection" width="55" :selectable='checkboxT'></el-table-column>
                    <el-table-column prop="columnName" label="字段"></el-table-column>
                    <el-table-column prop="columnComment" label="字段描述"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div style="height:18%;">
                <div class="spanStyle"><span style="color: #409EFF">接口方式设置</span></div>
                <el-button size="small" type="primary" style="width: 10%;float:right;margin-top:20px;margin-right:2.3%;"
                           @click="saveIftypeByinterfaceTypeOut">保存
                </el-button>
                <div class="contentStyle">
                  <div style="margin-left: 20px;margin-top: 20px">
                    接口URL：
                    <el-input size="small" style="display:inline-block;width: 30%" v-model="inputApiUrlOut"
                              placeholder="请输入内容"></el-input>
                    <span style="margin-left: 8%">文件或返回值格式：</span>
                    <el-radio-group v-model="inputApiTextTypeOut" @change="showJson1">
                      <el-radio :disabled="disabled4" label="1">XML</el-radio>
                      <el-radio :disabled="disabled4" label="2">JSON</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="8">
            <div class="grid-content bg-purple" :style="divclass">
              <div class="spanStyle"><span style="color: #409EFF">接口返回数据示例</span></div>
              <div class="contentStyle">
                {{ objJsonOut }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="showWhichOutMes" gutter="10">
          <el-col span="16">
            <div class="grid-content bg-purple" :style="divclass">
              <div style="height:82%;">
                <div class="spanStyle" style="margin-bottom: 10px">
                  MES厂商及版本：
                  <el-select size="small" style="width: 50%" v-model="versionValue" placeholder="请选择"
                             @change="catchMatchDetail(3)">
                    <el-option
                      v-for="item in versionList"
                      :key="item.versionId"
                      :label="item.versionName"
                      :value="item.versionId">
                    </el-option>
                  </el-select>
                  <template>
                    <el-checkbox style="margin-left: 10%;" v-model="accessVersion" @change="updateAccessVersion">
                      是否为数据输出版本
                    </el-checkbox>
                  </template>
                </div>
                <div class="spanStyle" style="height:4%;"><span style="color: #409EFF">数据字段设置</span>
                </div>
                <div class="contentStyle" style="height:89%;width:96%;">
                  <el-table ref="multipleTableMes" :data="tableDataOutMatch" tooltip-effect="dark" style="width: 100%"
                            @select="handleSelectionChange"
                            @selection-change="handleSelectionChangeJson"
                            border :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
                            :height="tableheight2">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="columnName" label="字段"></el-table-column>
                    <el-table-column prop="columnComment" label="字段描述"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div style="height:18%;">
                <div class="spanStyle"><span style="color: #409EFF">接口方式设置</span></div>
                <el-button size="small" type="primary" style="width: 10%;float:right;margin-top:20px;margin-right:20px;"
                           @click="saveIftypeByinterfaceTypeOut">保存
                </el-button>
                <div class="contentStyle">
                  <div style="margin-left: 20px;margin-top: 20px">
                    接口URL：
                    <el-input size="small" style="display:inline-block;width: 30%" v-model="inputApiUrlOut"
                              placeholder="请输入内容"></el-input>
                    <span style="margin-left: 8%">文件或返回值格式：</span>
                    <el-radio-group v-model="inputApiTextTypeOut" @change="showJson1">
                      <el-radio :disabled="disabled4" label="1">XML</el-radio>
                      <el-radio :disabled="disabled4" label="2">JSON</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col span="8">
            <div class="grid-content bg-purple" :style="divclass">
              <div class="spanStyle"><span style="color: #409EFF">示例</span></div>
              <div class="contentStyle">
                {{ objJsonOut }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row v-else-if="showWhichDevice">
          <div class="grid-content bg-purple" :style="divclass">
            <div class="spanStyle"><span style="color: #409EFF">装置编码对照</span><span
              style="margin-left:10px;color: #409EFF">{{ dataInType }}</span>
              <el-upload
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :on-error="onError"
                :disabled="importDisabled"
                style="margin-right: 30px;float: right;margin-top: -10px;"
                action="/api/qcadmin-interfaceconfig/version/import"
                :data="{dataInType,dataInType}">
                <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                  {{ importDataText }}
                </el-button>
              </el-upload>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-download" @click="handleexport">导出
              </el-button>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-document" @click="saveDeviceAll">保存
              </el-button>
              <div style="display: inline-block;float: right">
                <el-input placeholder="请输入内容" v-model="devicecodeorname"
                          style="margin-right: 30px;float: right;margin-top: -10px;">
                  <el-button slot="append" icon="el-icon-search" @click="selectDevicecodeorname"></el-button>
                </el-input>
              </div>
            </div>
            <div class="contentStyle">
              <el-table key="deviceTable" :data="tableDataDevice" size="small" border
                        :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                        style="width: 100%" :height=tableheight1>
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="devicecode" label="装置编码" width="100">
                </el-table-column>
                <el-table-column prop="devicename" label="装置名称" width="120">
                </el-table-column>
                <el-table-column prop="deviceshortname" label="简称" width="120">
                </el-table-column>
                <el-table-column prop="capacity" label="产能(吨)" width="80">
                </el-table-column>
                <el-table-column prop="productiontime" label="投产日期" width="140">
                </el-table-column>
                <!-- <el-table-column prop="isDeleted" label="是否有效" width="80" :formatter="sfktFormate">
                </el-table-column> -->
                <el-table-column prop="updateTime" label="更新时间" width="140">
                </el-table-column>
                <!-- <el-table-column prop="describeinfo" label="描述" width="140">
                </el-table-column> -->
                <el-table-column prop="limsDeviceId" label="装置编码" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsDeviceId"
                              placeholder="请输入编码"></el-input>
                    <!-- <el-input v-if="!row.edit" class="input__inner" size="small" v-model="row.limsDeviceId" placeholder="请输入编码"></el-input>
                    <span v-else>{{row.limsDeviceId}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column prop="mesDeviceId" label="装置编码" v-else>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesDeviceId"
                              placeholder="请输入编码"></el-input>
                    <!-- <el-input v-if="!row.edit" class="input__inner" size="small" v-model="row.mesDeviceId" placeholder="请输入编码"></el-input>
                    <span v-else>{{row.mesDeviceId}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column prop="limsDeviceName" label="装置中文名称" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsDeviceName"
                              placeholder="请输入名称"></el-input>
                    <!-- <el-input v-if="!row.edit" class="input__inner" size="small" v-model="row.limsDeviceName"></el-input>
                    <span v-else>{{row.limsDeviceName}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column prop="mesDeviceName" label="装置中文名称" v-else>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesDeviceName"
                              placeholder="请输入名称"></el-input>
                    <!-- <el-input v-if="!row.edit" class="input__inner" size="small" v-model="row.mesDeviceName"></el-input>
                    <span v-else>{{row.mesDeviceName}}</span> -->
                  </template>
                </el-table-column>
                <!-- <el-table-column fixed="right" label="操作" width="80">
                  <template slot-scope="{row,$index}">
                    <i
                      class="el-icon-edit"
                      @click="handleEditRight($index, row)"
                      style="cursor: pointer;font-size: 15px;color: #409EFF"
                      v-if="row.edit"
                    ></i>
                    <i
                      class="el-icon-close"
                      @click="handelCancel($index, row)"
                      style="cursor: pointer;font-size: 15px;color: #409EFF;margin-left: 10px"
                      v-if="!row.edit"
                    ></i>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
          </div>
        </el-row>
        <el-row v-else-if="showWhichSample">
          <div class="grid-content bg-purple" :style="divclass">
            <div class="spanStyle"><span style="color: #409EFF">采样点编码对照</span><span
              style="margin-left:10px;color: #409EFF">{{ dataInType }}</span>
              <el-upload
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="onSuccessSample"
                :on-error="onErrorSample"
                :disabled="importDisabled"
                style="margin-right: 30px;float: right;margin-top: -10px;"
                action="/api/qcadmin-interfaceconfig/version/importSample"
                :data="{dataInType,dataInType}">
                <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                  {{ importDataText }}
                </el-button>
              </el-upload>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-download" @click="handleexportSample">导出
              </el-button>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-document" @click="saveSampleAll">保存
              </el-button>
              <div style="display: inline-block;float: right">
                <el-input placeholder="请输入内容" v-model="samplecodeorname"
                          style="margin-right: 30px;float: right;margin-top: -10px;">
                  <el-button slot="append" icon="el-icon-search" @click="selectSamplecodeorname"></el-button>
                </el-input>
              </div>
            </div>
            <div class="contentStyle">
              <el-table key="sampleTable" :data="tableDataSample" size="small" border
                        :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                        style="width: 100%" :height=tableheight1>
                <el-table-column type="index" label="序号" width="100">
                </el-table-column>
                <el-table-column prop="sampleCode" label="采样点编码" width="140">
                </el-table-column>
                <el-table-column prop="sampleName" label="采样点名称" width="180">
                </el-table-column>
                <el-table-column prop="sampleSimpleName" label="采样点简称" width="180">
                </el-table-column>
                <!-- <el-table-column prop="isDeleted" label="是否有效" width="120" :formatter="sfktFormate">
                </el-table-column> -->
                <!-- <el-table-column prop="note" label="描述" width="180">
                </el-table-column> -->
                <el-table-column prop="limsSampleId" label="采样点编码" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsSampleId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesSampleId" label="采样点编码" v-else>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesSampleId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsSampleName" label="采样点中文名称" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsSampleName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesSampleName" label="采样点中文名称" v-else>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesSampleName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-row>
        <el-row v-else-if="showWhichMateriel">
          <div class="grid-content bg-purple" :style="divclass">
            <div class="spanStyle"><span style="color: #409EFF">物料编码对照</span><span
              style="margin-left:10px;color: #409EFF">{{ dataInType }}</span>
              <el-upload
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="onSuccessMateriel"
                :on-error="onErrorMateriel"
                :disabled="importDisabled"
                style="margin-right: 30px;float: right;margin-top: -10px;"
                action="/api/qcadmin-interfaceconfig/version/importMateriel"
                :data="{dataInType,dataInType}">
                <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                  {{ importDataText }}
                </el-button>
              </el-upload>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-download" @click="handleexportMateriel">导出
              </el-button>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-document" @click="saveMaterielAll">保存
              </el-button>
              <div style="display: inline-block;float: right">
                <el-input placeholder="请输入内容" v-model="materielcodeorname"
                          style="margin-right: 30px;float: right;margin-top: -10px;">
                  <el-button slot="append" icon="el-icon-search" @click="selectMaterielcodeorname"></el-button>
                </el-input>
              </div>
            </div>
            <div class="contentStyle">
              <el-table key="materielTable" :data="tableDataMateriel" size="small" border
                        :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                        style="width: 100%" :height=tableheight1>
                <el-table-column type="index" label="序号" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="materielCode" label="物料编码" show-overflow-tooltip  width="250">
                </el-table-column>
                <el-table-column prop="materielName" label="物料名称" show-overflow-tooltip width="250">
                </el-table-column>
                <!-- <el-table-column prop="isDeleted" label="是否有效" :formatter="sfktFormate">
                </el-table-column> -->
                <!-- <el-table-column prop="note" label="描述">
                </el-table-column> -->
                <el-table-column prop="limsMaterielId" label="物料编码" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsMaterielId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesMaterielId" label="物料编码" v-else>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesMaterielId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsMaterielName" label="物料中文名称" v-if="isTrue">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsMaterielName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesMaterielName" label="物料中文名称" v-else>
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesMaterielName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-row>
        <el-row v-else-if="showWhichMatterpro">
          <div class="grid-content bg-purple" :style="divclass">
            <div class="spanStyle"><span style="color: #409EFF">物性编码对照</span><span
              style="margin-left:10px;color: #409EFF">{{ dataInType }}</span>
              <el-upload
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="onSuccessMatterpro"
                :on-error="onErrorMatterpro"
                :disabled="importDisabled"
                style="margin-right: 30px;float: right;margin-top: -10px;"
                action="/api/qcadmin-interfaceconfig/version/importMatterpro"
                :data="{dataInType,dataInType}">
                <el-button size="small" :disabled="importDisabled" type="primary" :icon="importDataIcon">
                  {{ importDataText }}
                </el-button>
              </el-upload>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-download" @click="handleexportMatterpro">导出
              </el-button>
              <el-button style="margin-right: 30px;float: right;margin-top: -10px;" type="primary" size="small"
                         icon="el-icon-document" @click="saveMatterproAll">保存
              </el-button>
              <div style="display: inline-block;float: right">
                <el-input placeholder="请输入内容" v-model="matterprocodeorname"
                          style="margin-right: 30px;float: right;margin-top: -10px;">
                  <el-button slot="append" icon="el-icon-search" @click="selectMatterprocodeorname"></el-button>
                </el-input>
              </div>
            </div>
            <div class="contentStyle">
              <el-table key="matterproTable" :data="tableDataMatterpro" size="small" border
                        :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}"
                        style="width: 100%" :height=tableheight1>
                <el-table-column type="index" label="序号" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="matterproCode" label="物性编码" show-overflow-tooltip width="150">
                </el-table-column>
                <el-table-column prop="matterproName" label="物性名称" show-overflow-tooltip width="200">
                </el-table-column>

                <!-- <el-table-column prop="isDeleted" label="是否有效" :formatter="sfktFormate">
                </el-table-column> -->
                <!-- <el-table-column prop="note" label="描述">
                </el-table-column> -->
                <el-table-column prop="limsMatterproId" label="物性编码" v-if="isTrue" width="200">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsMatterproId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mesMatterproId" label="物性编码" width="200" v-else >
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesMatterproId"
                              placeholder="请输入编码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsMatterproName" label="物性中文名称" v-if="isTrue" width="250">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.limsMatterproName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>

                <el-table-column prop="mesMatterproName" label="物性中文名称" v-else width="250">
                  <template slot-scope="{row,$index}">
                    <el-input class="input__inner" size="small" v-model="row.mesMatterproName"
                              placeholder="请输入名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="limsMatterproUnits" label="同步单位" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{isTrue?scope.row.limsMatterproUnits:scope.row.mesMatterproUnits}}</span>
                  </template>
                </el-table-column>
<!--                <el-table-column prop="mesMatterproUnits" label="同步单位" show-overflow-tooltip   v-else>-->
<!--                </el-table-column>-->
                <el-table-column prop="limsMatterproUnit" label="同步单位设置" width="100" v-if="isTrue">
                  <template slot-scope="{row,$index}">
<!--                    <el-input class="input__inner" size="small" v-model="row.limsMatterproUnit"-->
<!--                              placeholder="请输入单位"></el-input>-->
                    <a v-if="row.matterproUnit.length>0" type="primary" style="color: #409EFF" @click="showSyncUnitSetting(row)" >设置</a>
                  </template>
                </el-table-column>
                <el-table-column prop="mesMatterproUnit" label="同步单位设置"  width="100" v-else>
                  <template slot-scope="{row,$index}">
<!--                    <el-input class="input__inner" size="small" v-model="row.mesMatterproUnit"-->
<!--                              placeholder="请输入单位"></el-input>-->
                    <a v-if="row.matterproUnit.length>0" type="primary" style="color: #409EFF" @click="showSyncUnitSetting(row)" >设置</a>
                  </template>
                </el-table-column>
<!--                <el-select-->
<!--                  v-model="alarmStatu"-->
<!--                  size="small"-->
<!--                  multiple-->
<!--                  collapse-tags-->
<!--                  clearable-->
<!--                  :loading="loading"-->
<!--                  width="220px"-->
<!--                  @change="selectAll"-->
<!--                  @remove-tag="removeTag"-->
<!--                >-->
<!--                  <el-option-->
<!--                    v-for="items in alarmStatus"-->
<!--                    :key="items.roleId"-->
<!--                    :label="items.roleName"-->
<!--                    :value="items.roleId"-->
<!--                  >-->
<!--                    <span class="check" />-->
<!--                    <span style="margin-left: 0.08rem;">{{ items.roleName }}</span>-->
<!--                  </el-option>-->
<!--                </el-select>-->
              </el-table>
              <div v-if="pageNum < matterproCount" style="text-align: center;cursor: pointer;color: rgb(64, 158, 255);"
                   @click="loadMore">点击加载更多
              </div>
              <el-dialog
                title="同步单位设置"
                :visible.sync="syncUnitDialog"
                :before-close="approvehandleClose"
                :append-to-body="true"
                width="33%">
                <div>{{matchMatterpro.matterproName}}</div>
                <el-checkbox v-if="false" :indeterminate="isIndeterminate" style="margin-top: 15px" v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedMatterproUnits" @change="handleCheckedMatterprosChange">
<!--                  <el-checkbox v-for="matterproUnit in matterproUnits" :label="matterproUnit" :key="matterproUnit">{{matterproUnit}}</el-checkbox>-->
                  <el-checkbox v-for="matterpro in matterproList" :label="matterpro.unitCode" :key="matterpro.unitCode">{{matterpro.MATTERPRO_UNIT}}</el-checkbox>
                </el-checkbox-group>
<!--                <basic-container>-->
<!--                  <div class="block" style="overflow: auto;height: 400px;">-->
<!--                    <el-timeline style="margin-left:5%;">-->
<!--                      <el-timeline-item-->
<!--                        v-for="(activity, index) in timelines"-->
<!--                        :key="index"-->
<!--                        :icon="activity.icon"-->
<!--                        :type="activity.type"-->
<!--                        :color="activity.color"-->
<!--                        :size="activity.size">-->
<!--                        <div class="timeline-name">-->
<!--                          <div style="float: right;margin-right: 10%;">{{ activity.approve_time }}</div>-->
<!--                          <div>审核人：{{ activity.real_name }}</div>-->
<!--                        </div>-->
<!--                        <div class="timeline-content">审核节点：{{ activity.dict_value }}</div>-->
<!--                        <div class="timeline-content">审核意见：{{ activity.note }}</div>-->
<!--                      </el-timeline-item>-->
<!--                    </el-timeline>-->
<!--                  </div>-->
<!--                </basic-container>-->
                <span v-if="!canSubmit" style="float: right;color: red">请至少选择一个物性单位!</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="syncUnitDialog = false">取 消</el-button>
                  <el-button type="primary" :disabled="!canSubmit" @click="submitSyncUnit">确 定</el-button>
                </span>
                <!-- <el-table class="el-table"
                          :data="approvetableData"
                          border
                          height="250">
                  <el-table-column
                    v-for="(item,index) in timelines"
                    :fixed="index==0||index==1"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    align="center">
                  </el-table-column>
                </el-table> -->
              </el-dialog>
              <!--              <div style="text-align: center;" v-else>没有更多了</div>-->
              <!-- <div v-for="product in tableDataMatterpro.slice(0,pageSize)" :key="product.id" class="product -item"> -->
              <!-- 判断a的值是否小于数组的长度，小于就显示点击加载更多 -->
              <!-- <div class="load-more mr-bottom" v-if="a<tableDataMatterpro.length" @click='loadMore' >点击加载更多</div>
              <div class="load-more mr-bottom" v-else >没有更多了</div> -->
              <!-- </div> -->
            </div>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  catchMatterproByUnit,
  selectCheckedMatterproUnits,
  submitCheckedMatterproUnits
} from "../../api/tuozhuai/tuoyedemo";

import {
  catchVersionDetail,
  catchMatchDetail,
  updateMatchS,
  catchIfTypeByVersion,
  catchParamsByInterfaceType,
  saveIftypeByinterfaceType,
  saveMatch,
  addIftype,
  addParams,
  updateParams,
  deleteParams,
  catchDevice,
  updateDevice,
  dragExcel,
  saveDeviceAll,
  selectDevicecodeorname,
  catchSample,
  dragExcelSample,
  saveSampleAll,
  selectSamplecodeorname,
  catchMateriel,
  selectMaterielcodeorname,
  saveMaterielAll,
  dragExcelMateriel,
  catchMatterpro,
  selectMatterprocodeorname,
  saveMatterproAll,
  dragExcelMatterpro,
  catchOutMatch,
  selectIftypeOutByVersion,
  addIftypeOut,
  updateIftypeOut,
  updateSelectionType,
  catchSelectionData,
  deleteAllCancelSelect,
  selectMatterproCount,
  catchMatterproAll,
  selectAccessVersion,
  updateAccessVersion,
  updateNotAccessVersion,
  defaultSelect
} from "@/api/qcadmin/interfaceconfig";

export default {
  name:'/qcadmin/interfaceconfig',
  data() {
    return {
      innerFBL: 0,
      objParamsJson: {},
      objJsonOut: {},
      objJson: {},
      isshownull: false,
      accessVersion: false,
      matterproCount: 0,
      pageNum: 500,
      styltyzd: "",
      versionType: "",
      devicecodeorname: "",
      samplecodeorname: "",
      materielcodeorname: "",
      matterprocodeorname: "",
      // 导入按钮的文本
      importDataText: '导入数据',
      // 导入按钮的图标
      importDataIcon: 'el-icon-upload2',
      // 导入按钮是否被禁用
      importDisabled: false,
      isTrue: true,
      dataInType: "(LIMS)",//输入类型
      tableheight: 0,
      tableheight1: 0,
      tableheight2: 0,
      disabled3: false,
      disabled4: false,
      size: 0,
      inputTextFile: '',
      inputTextUrl: '',
      inputApiUrl: '',
      inputApiTextType: '',
      inputApiUrlOut: '',
      inputApiTextTypeOut: '2',
      tableDataParams: [],
      tableDataDevice: [],
      tableDataSample: [],
      tableDataMateriel: [],
      tableDataMatterpro: [],
      tableDataOutMatch: [],
      interfaceTypeRadio: '',
      matchList: [],//数据字段设置信息
      versionList: [],//版本信息集合
      versionValue: '',
      divclass: {
        backgroundColor: "#FFFFFF",
        height: '',
        borderRadius: '5px',
        padding: '5px',
      },
      divclass1: {
        backgroundColor: "#FFFFFF",
        height: '',
        borderRadius: '5px',
        padding: '5px',
      },
      divclass2: {
        backgroundColor: "#FFFFFF",
        height: '',
        borderRadius: '5px',
        padding: '5px',
      },
      divclass3: {
        backgroundColor: "#FFFFFF",
        height: '',
        borderRadius: '5px',
        padding: '5px',
      },
      form: {
        account: '',
        password: ''
      },
      menuselect: 1,
      showWhich: true,
      showWhichDevice: true,
      showWhichSample: true,
      showWhichMateriel: true,
      showWhichMatterpro: true,
      showWhichMes: true,
      showWhichOutLims: true,
      showWhichOutMes: true,
      exampleMessage: [],
      exampleMessageOut: [],
      allMatterpro: [],
      syncUnitDialog: false, //同步单位弹出框
      isIndeterminate: true,
      checkedMatterproUnits: [], //已选物性单位编码集合
      // matterproUnits: [],//matterproOptions, //目标物性单位全集
      showSelectAll: true,//显示全选
      matchMatterpro: { //匹配物性
        matterproCode: '',
        matterproName: ''
      },
      matterproList: [], //物性list,
      canSubmit: true, //物性单位同步可提交
      checkAll: false,
      obj: {
        obj_matterproCode: "",
        obj_checkedMatterproUnits: [],
        obj_dataInType: "",
        obj_isChangeStatus: false
      },
      showSetting: true
    }
  },
  beforeMount() {
    this.innerFBL = window.innerWidth;
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    this.divclass.height = h - 190 + "px";
    if (window.innerWidth != 1366) {
      this.divclass1.height = h / 3 - 130 + "px";
      this.divclass2.height = h / 2 - 125 + "px";
      this.tableheight2 = h - 450;
    } else {
      this.tableheight2 = h - 360;
      this.divclass1.height = h / 3 - 95 + "px";
      this.divclass2.height = h / 2 - 140 + "px";
    }
    this.divclass3.height = h / 2 - 110 + "px";
    if (h > 820) {
      this.tableheight = h - 820;
    } else {
      this.tableheight = h - 570;
    }
    this.tableheight1 = h - 260;
  },
  mounted() {
    this.showWhichMes = false;
    this.showWhichDevice = false,
      this.showWhichSample = false,
      this.showWhichMateriel = false,
      this.showWhichMatterpro = false,
      this.showWhichOutLims = false,
      this.showWhichOutMes = false,
      this.catchVersionDetail();
    this.catchDevice();
    this.catchSample();
    this.catchMateriel();
    this.catchMatterpro(this.pageNum);
    this.catchMatterproAll();
    this.selectMatterproCount();
    defaultSelect(0).then((res) => {
      this.versionValue = res.data.data.versionId;
      this.catchMatchDetail(1);
    })
  },
  watch: {

  },
  methods: {
    changeColWidth(nw,ow,col,evt){
      if (nw < 70) {
        col.width = 60;
      }
    },
    //复选框
    checkboxT(row, rowIndex) {
      if (row.columnName == "MATTERPRO_CODE" || row.columnName == "MATTERPRO_NAME" || row.columnName == "MATTERPRO_UNIT" || row.columnName == "MATTERPRO_VALUE") {
        return false;
      } else {
        return true;
      }
    },
    //是否为取数版本修改
    updateAccessVersion(data) {
      var type = 0;
      if (this.dataInType != "(LIMS)") {
        type = 1;
      }
      if (this.versionValue != "") {
        if (data == true) {
          //修改当前版本为取数版本 其余置为0
          updateAccessVersion(this.versionValue, type).then((res) => {
          });
        } else {
          //当前取数版本置为0
          updateNotAccessVersion(this.versionValue).then((res) => {
          });
        }
      }
    },
    //查询全部物性
    catchMatterproAll() {
      catchMatterproAll().then((res) => {
        this.allMatterpro = res.data.data;
      })
    },
    //计算物性记录总数
    selectMatterproCount() {
      selectMatterproCount().then((res) => {
        this.matterproCount = res.data.data;
      })
    },
    //点击加载更多
    loadMore() {
      this.pageNum += 20;
      this.catchMatterpro(this.pageNum);
    },
    //数据输出接口方式设置保存
    saveIftypeByinterfaceTypeOut() {
      if (this.versionValue != "") {
        if (this.inputApiUrlOut == "") {
          this.$message.warning("请输入接口URL！");
          return;
        }
        //根据版本查询输出接口方式
        selectIftypeOutByVersion(this.versionValue).then((res) => {
          if (res.data.data.length > 0) {
            updateIftypeOut(this.versionValue, this.inputApiUrlOut, this.inputApiTextTypeOut).then((res) => {
              this.$message.success("保存成功！");
            })
          } else {
            addIftypeOut(this.versionValue, this.inputApiUrlOut, this.inputApiTextTypeOut).then((res) => {
              this.$message.success("保存成功！");
            })
          }
        })
      } else {
        this.$message.warning("请选择版本！");
      }
    },
    //全选
    handleSelectionChangeAll(row) {
      var objMap = {};
      this.$set(objMap, "row", row);
      this.$set(objMap, "versionId", this.versionValue);
      if (row.length > 0) {
        updateSelectionType(objMap).then((res) => {
        });
      } else {
        deleteAllCancelSelect(this.versionValue).then((res) => {
        });
      }
    },
    //加载输出数据选中json
    handleSelectionChangeJson(row) {
      this.objJsonOut = {};
      this.exampleMessageOut = [];
      var obj = {};
      row.forEach(element => {
        if (element.columnName != "") {
          if (element.columnName != "MATTERPRO_CODE" && element.columnName != "MATTERPRO_NAME" && element.columnName != "MATTERPRO_UNIT" && element.columnName != "MATTERPRO_VALUE") {
            this.$set(obj, element.columnName, "");
          }
        }
      })
      if (row.length == 0) {
        return;
      }
      //存放物性obj
      var matterpros = [];
      var objMatterpro = {};
      this.$set(objMatterpro, "MATTERPRO_CODE", "");
      this.$set(objMatterpro, "MATTERPRO_NAME", "");
      this.$set(objMatterpro, "MATTERPRO_UNIT", "");
      this.$set(objMatterpro, "MATTERPRO_VALUE", "");
      matterpros.push(objMatterpro);
      this.$set(obj, "ALALYSE_DATA", matterpros);
      this.exampleMessageOut.push(obj);
      this.$set(this.objJsonOut, "jsondata", this.exampleMessageOut);
    },
    //数据输出目标字段table复选框选中事件
    handleSelectionChange(row) {
      this.objJsonOut = {};
      this.exampleMessageOut = [];
      var obj = {};
      row.forEach(element => {
        if (element.columnName != "") {
          if (element.columnName != "MATTERPRO_CODE" && element.columnName != "MATTERPRO_NAME" && element.columnName != "MATTERPRO_UNIT" && element.columnName != "MATTERPRO_VALUE") {
            this.$set(obj, element.columnName, "");
          }
        }
      })
      //存放物性obj
      var matterpros = [];
      var objMatterpro = {};
      this.$set(objMatterpro, "MATTERPRO_CODE", "");
      this.$set(objMatterpro, "MATTERPRO_NAME", "");
      this.$set(objMatterpro, "MATTERPRO_UNIT", "");
      this.$set(objMatterpro, "MATTERPRO_VALUE", "");
      matterpros.push(objMatterpro);
      this.$set(obj, "ALALYSE_DATA", matterpros);
      this.exampleMessageOut.push(obj);
      this.$set(this.objJsonOut, "jsondata", this.exampleMessageOut);
      var objMap = {};
      this.$set(objMap, "row", row);
      this.$set(objMap, "versionId", this.versionValue);
      updateSelectionType(objMap).then((res) => {
      });
    },
    //查询数据输出目标字段信息
    catchOutMatch(type) {
      if (type == 1) {
        catchOutMatch(this.versionValue).then((res) => {
          this.tableDataOutMatch = res.data.data;
          //查询选中数据
          catchSelectionData(this.versionValue).then((res) => {
            this.$nextTick(() => {
              for (let i = 0; i < this.tableDataOutMatch.length; i++) {
                if (res.data.data.length == 0) {
                  if (this.tableDataOutMatch[i].columnName == "MATTERPRO_CODE" || this.tableDataOutMatch[i].columnName == "MATTERPRO_NAME" || this.tableDataOutMatch[i].columnName == "MATTERPRO_UNIT" || this.tableDataOutMatch[i].columnName == "MATTERPRO_VALUE") {
                    this.$refs.multipleTableLims.toggleRowSelection(this.tableDataOutMatch[i]);
                  }
                } else {
                  for (let j = 0; j < res.data.data.length; j++) {
                    if (this.tableDataOutMatch[i].columnName == res.data.data[j].tcolumn && res.data.data[j].versionId == this.versionValue) {
                      this.$refs.multipleTableLims.toggleRowSelection(this.tableDataOutMatch[i]);
                    }
                  }
                }
              }
            })
          })
        })
      } else {
        catchOutMatch(this.versionValue).then((res) => {
          this.tableDataOutMatch = res.data.data;
          //查询选中数据
          catchSelectionData(this.versionValue).then((res) => {
            this.$nextTick(() => {
              for (let i = 0; i < this.tableDataOutMatch.length; i++) {
                if (res.data.data.length == 0) {
                  if (this.tableDataOutMatch[i].columnName == "MATTERPRO_CODE" || this.tableDataOutMatch[i].columnName == "MATTERPRO_NAME" || this.tableDataOutMatch[i].columnName == "MATTERPRO_UNIT" || this.tableDataOutMatch[i].columnName == "MATTERPRO_VALUE") {
                    this.$refs.multipleTableMes.toggleRowSelection(this.tableDataOutMatch[i]);
                  }
                } else {
                  for (let j = 0; j < res.data.data.length; j++) {
                    if (this.tableDataOutMatch[i].columnName == res.data.data[j].tcolumn && res.data.data[j].versionId == this.versionValue) {
                      this.$refs.multipleTableMes.toggleRowSelection(this.tableDataOutMatch[i]);
                    }
                  }
                }
              }
            })
          })
        })
      }
    },
    //物性查询
    catchMatterpro(pageNum) {
      catchMatterpro(pageNum).then((res) => {
        this.tableDataMatterpro = res.data;
      })
    },
    //物料查询
    catchMateriel() {
      catchMateriel().then((res) => {
        this.tableDataMateriel = res.data.data;
      })
    },
    //采样点查询
    catchSample() {
      catchSample().then((res) => {
        this.tableDataSample = res.data.data;
      })
    },
    //模糊查询装置
    selectDevicecodeorname() {
      selectDevicecodeorname(this.devicecodeorname).then((res) => {
        this.tableDataDevice = res.data.data;
      })
    },
    //模糊查询采样点
    selectSamplecodeorname() {
      selectSamplecodeorname(this.samplecodeorname).then((res) => {
        this.tableDataSample = res.data.data;
      })
    },
    //模糊查询物料
    selectMaterielcodeorname() {
      selectMaterielcodeorname(this.materielcodeorname).then((res) => {
        this.tableDataMateriel = res.data.data;
      })
    },
    //模糊查询物性
    selectMatterprocodeorname() {
      selectMatterprocodeorname(this.matterprocodeorname).then((res) => {
        this.tableDataMatterpro = res.data.data;
      })
    },
    //源字段编辑框失去焦点
    saveScolumn(item, type) {
      if (type == 1) {
        item.scolumnEdit = false;
      } else {
        item.scolumnNameEdit = false;
      }
      if (item.scolumn == "") {
        item.scolumn = "源字段";
      }
      if (item.scolumnName == "") {
        item.scolumnName = "源字段说明";
      }
    },
    //源字段编辑
    changeScolumnCode(item, type) {
      if (type == 1) {
        item.scolumnEdit = true;
      } else {
        item.scolumnNameEdit = true;
      }
    },
    // 装置导入文件失败后回调
    onError() {
      this.importDataText = '导入数据';
      this.importDataIcon = 'el-icon-upload2';
      this.importDisabled = false;
      this.catchDevice();
      this.$message.error("导入失败！");
    },
    // 装置导入文件成功后回调
    onSuccess() {
      // 成功后文本修改为原来的导入数据
      this.importDataText = '导入数据';
      // 图标修改
      this.importDataIcon = 'el-icon-upload2';
      // 将上传组件改为允许使用
      this.importDisabled = false;
      // 调用刷新数据的方法
      this.catchDevice();
      this.$message.success("导入成功！");
    },
    // 采样点导入文件失败后回调
    onErrorSample() {
      this.importDataText = '导入数据';
      this.importDataIcon = 'el-icon-upload2';
      this.importDisabled = false;
      this.catchSample();
      this.$message.error("导入失败！");
    },
    // 采样点导入文件成功后回调
    onSuccessSample() {
      // 成功后文本修改为原来的导入数据
      this.importDataText = '导入数据';
      // 图标修改
      this.importDataIcon = 'el-icon-upload2';
      // 将上传组件改为允许使用
      this.importDisabled = false;
      // 调用刷新数据的方法
      this.catchSample();
      // message 弹出消息
      this.$message.success("导入成功！");
    },
    // 物料导入文件失败后回调
    onErrorMateriel() {
      this.importDataText = '导入数据';
      this.importDataIcon = 'el-icon-upload2';
      this.importDisabled = false;
      this.catchMateriel();
      this.$message.error("导入失败！");
    },
    // 物料导入文件成功后回调
    onSuccessMateriel(data) {
      // 成功后文本修改为原来的导入数据
      this.importDataText = '导入数据';
      // 图标修改
      this.importDataIcon = 'el-icon-upload2';
      // 将上传组件改为允许使用
      this.importDisabled = false;
      // 调用刷新数据的方法
      this.catchMateriel();
      if (data.msg == "导入失败!请严格按照导出模板导入") {
        this.$message.warning(data.msg);
        return;
      }
      // message 弹出消息
      this.$message.success("导入成功！");
    },
    // 物性导入文件失败后回调
    onErrorMatterpro() {
      this.importDataText = '导入数据';
      this.importDataIcon = 'el-icon-upload2';
      this.importDisabled = false;
      this.catchMatterpro(this.pageNum);
      this.$message.error("导入失败！");
    },
    // 物性导入文件成功后回调
    onSuccessMatterpro(data) {
      // 成功后文本修改为原来的导入数据
      this.importDataText = '导入数据';
      // 图标修改
      this.importDataIcon = 'el-icon-upload2';
      // 将上传组件改为允许使用
      this.importDisabled = false;
      // 调用刷新数据的方法
      this.catchMatterpro(this.pageNum);
      if (data.status != 200) {
        this.$message.error(data.msg);
        return;
      }
      // message 弹出消息
      this.$message.success("导入成功！");
    },
    // 上传文件调用
    beforeUpload() {
      // 将文本修改为正在导入
      this.importDataText = '正在导入';
      // 修改其图标
      this.importDataIcon = 'el-icon-loading';
      // 将其上传组件暂时禁用
      this.importDisabled = true;
    },
    //导出装置excel
    handleexport() {
      this.tableDataDevice.forEach(element => {
        this.$set(element, "dataInType", this.dataInType)
      })
      dragExcel(this.tableDataDevice).then((res) => {
        const content = res.data;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          elink.setAttribute('download', '装置编码对照' + this.dataInType + '.xlsx');
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //导出采样点excel
    handleexportSample() {
      this.tableDataSample.forEach(element => {
        this.$set(element, "dataInType", this.dataInType)
      })
      dragExcelSample(this.tableDataSample).then((res) => {
        const content = res.data;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          elink.setAttribute('download', '采样点编码对照' + this.dataInType + '.xlsx');
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //导出物料excel
    handleexportMateriel() {
      this.tableDataMateriel.forEach(element => {
        this.$set(element, "dataInType", this.dataInType)
      })
      dragExcelMateriel(this.tableDataMateriel).then((res) => {
        const content = res.data;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          elink.setAttribute('download', '物料编码对照' + this.dataInType + '.xlsx');
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //导出物性excel
    handleexportMatterpro() {
      this.allMatterpro.forEach(element => {
        this.$set(element, "dataInType", this.dataInType)
      })
      dragExcelMatterpro(this.dataInType).then((res) => {
        const content = res.data;
        const blob = new Blob([content], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        let fileName = window.decodeURI(res.headers['pragma'], "UTF-8");
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          elink.setAttribute('download', '物性编码对照' + this.dataInType + '.xlsx');
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //装置保存
    saveDeviceAll() {
      this.tableDataDevice.forEach(element => {
        this.$set(element, "dataInType", this.dataInType);
      })
      saveDeviceAll(this.tableDataDevice).then((res) => {
        if (res.data == true) {
          this.catchDevice();
          this.$message.success("保存成功!");
        } else {
          this.$message.warning("保存失败!");
        }
      })
    },
    //采样点保存
    saveSampleAll() {
      this.tableDataSample.forEach(element => {
        this.$set(element, "dataInType", this.dataInType);
      })
      saveSampleAll(this.tableDataSample).then((res) => {
        if (res.data.data == true) {
          this.catchSample();
          this.$message.success("保存成功!");
        } else {
          this.$message.warning("保存失败!");
        }
      })
    },
    //物料保存
    saveMaterielAll() {
      this.tableDataMateriel.forEach(element => {
        this.$set(element, "dataInType", this.dataInType);
      })
      saveMaterielAll(this.tableDataMateriel).then((res) => {
        if (res.data.data == true) {
          this.catchMateriel();
          this.$message.success("保存成功!");
        } else {
          this.$message.warning("保存失败!");
        }
      })
    },
    //物性保存
    saveMatterproAll() {
      this.tableDataMatterpro.forEach(element => {
        this.$set(element, "dataInType", this.dataInType);
      })

      let tempObj = [];
      this.tableDataMatterpro.forEach(item => {
        tempObj.push(escape(JSON.stringify(item)));
      })

      saveMatterproAll(tempObj).then((res) => {
        if (res.data == true) {
          this.catchMatterpro(this.pageNum);
          this.$message.success("保存成功!");
        } else {
          this.$message.warning("保存失败!");
        }
      })
    },
    //点击右侧表格编辑
    //index 索引 row 行对象
    handleEditRight(index, row) {
      row.edit = false;
    },
    //取消编辑
    //index 索引 row 行对象
    handelCancel(index, row) {
      updateDevice(row).then((res) => {
        row.edit = true;
      })
    },
    //table表格格式化
    sfktFormate(row, index) {
      if (row.isDeleted == 0) {
        return "有效";
      } else {
        return "无效";
      }
    },
    //查询装置信息
    catchDevice() {
      catchDevice().then((res) => {
        this.tableDataDevice = res.data.data;
        // for (var i = 0; i < this.tableDataDevice.length; i++) {
        //   this.$set(this.tableDataDevice[i], "edit", true);
        // }
      })
    },
    //参数删除
    handleDelete(index, row) {
      this.$confirm("确定将资源删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteParams(row.paramsId).then((res) => {
          //根据接口方式查询输入参数
          catchParamsByInterfaceType(row.iftypeId).then((res) => {
            this.tableDataParams = res.data.data;
          })
          this.$message.success("删除成功！");
        })
      }).catch(() => {
      });
    },
    //保存参数信息
    saveParams(row, type) {
      if (type == 1) {
        this.$set(row, "paramsColumnEdit", false);
        if (row.paramsColumn == "") {
          row.paramsColumn = "参数名";
        }
        updateParams(row).then((res) => {
        })
      } else if (type == 2) {
        this.$set(row, "paramsTypeEdit", false);
        if (row.paramsType == "") {
          row.paramsType = "参数类型";
        }
        updateParams(row).then((res) => {
        })
      } else {
        this.$set(row, "paramsValueEdit", false);
        if (row.paramsValue == "") {
          row.paramsValue = "参数值";
        }
        updateParams(row).then((res) => {
        })
      }
    },
    //修改input显示
    changeCode(row, type) {
      if (type == 1) {
        this.$set(row, "paramsColumnEdit", true);
      } else if (type == 2) {
        this.$set(row, "paramsTypeEdit", true);
      } else {
        this.$set(row, "paramsValueEdit", true);
      }
    },
    //添加参数
    addParams() {
      if (this.versionValue == "" || this.interfaceTypeRadio == "2") {
        this.$message.warning("版本为空或未选择API模式!");
        return;
      }
      //根据已有的list将
      let newLine = {
        paramsId: "",
        iftypeId: this.iftypeId,
        paramsColumn: "参数名",
        paramsType: "参数类型",
        paramsValue: "参数值",
        paramsColumnEdit: false,
        paramsTypeEdit: false,
        paramsValueEdit: false
      };
      this.tableDataParams.push(newLine); // 移到第一行
      addParams(newLine).then((res) => {
        newLine.paramsId = res.data.data;
      })
    },
    //接口方式改变
    radioChange() {
      if (this.interfaceTypeRadio == "1") {
        this.disabled3 = false;
        this.inputTextUrl = "";
        this.inputTextFile = "";
        if (this.versionValue != "") {
          //根据版本id输入接口方式
          catchIfTypeByVersion(this.versionValue).then((res) => {
            this.inputApiUrl = res.data.data.apiUrl;
            if (res.data.data.apiTextType == 1) {
              this.inputApiTextType = "1";
            } else {
              this.inputApiTextType = "2";
              this.showJson();
            }
            //根据接口方式查询输入参数
            catchParamsByInterfaceType(res.data.data.iftypeId).then((res) => {
              this.tableDataParams = res.data.data;
              this.showParamsJson(this.tableDataParams);
            })
          });
        }
      } else {
        this.objJson = {};
        this.disabled3 = true;
        this.inputApiUrl = "";
        this.inputApiTextType = "";
        this.tableDataParams = [];
        this.exampleMessage = [];
        this.objParamsJson = {};
        //根据版本id输入接口方式
        catchIfTypeByVersion(this.versionValue).then((res) => {
          this.inputTextUrl = res.data.data.textUrl;
          this.inputTextFile = res.data.data.textFile;
        });
      }
    },
    //数据字段设置保存
    saveMatch() {
      var flag = true;
      if (this.versionValue == "") {
        this.$message.warning("请选择LIMS厂商及版本!");
        return;
      }
      for (var i = 0; i < this.matchList.length; i++) {
        if (this.matchList[i].scolumn == "") {
          this.$message.warning("请补全源字段！");
          return;
        }
      }
      saveMatch(this.matchList).then((res) => {
        if (res.data.data) {
          this.$message.success("保存成功");
          this.catchMatchDetail(1);
        } else {
          this.$message.warning("保存失败");
        }
      })
    },
    //展示json数据
    showJson() {
      if (this.versionValue != "") {
        // this.isshownull = false;
        this.objJson = {};
        this.objParamsJson = {};
        this.exampleMessage = [];
        if (this.inputApiTextType == "2") {
          this.$set(this.objJson, "code", "200");
          this.$set(this.objJson, "msg", "success");
          var obj = {};
          this.matchList.forEach(element => {
            if (element.scolumn != "") {
              this.$set(obj, element.scolumn, "");
              // this.isshownull = true;
            }
          });
          this.exampleMessage.push(obj);
          this.$set(this.objJson, "jsondata", this.exampleMessage);
          this.showParamsJson(this.tableDataParams);
        }
      }
    },
    //输入接口方式保存
    saveIftypeByinterfaceType() {
      if (this.versionValue == "") {
        this.$message.warning("请选择LIMS厂商及版本!");
        return;
      }
      //根据版本id输入接口方式
      catchIfTypeByVersion(this.versionValue).then((res) => {
        if (res.data != null && res.data != "" && res.data != undefined) {
          if (this.interfaceTypeRadio == "1") {
            saveIftypeByinterfaceType(this.interfaceTypeRadio, this.versionValue, this.inputApiUrl, this.inputApiTextType).then((res) => {
              if (res.data.code === 200)
                this.$message.success("保存成功");
            })
          } else if (this.interfaceTypeRadio == "2") {
            saveIftypeByinterfaceType(this.interfaceTypeRadio, this.versionValue, this.inputTextUrl, this.inputTextFile).then((res) => {
              if (res.data.code === 200)
                this.$message.success("保存成功");
            })
          } else {
            this.$message.warning("保存失败");
          }
        } else {
          addIftype(this.versionValue, this.interfaceTypeRadio, this.inputApiUrl, this.inputApiTextType, this.inputTextUrl, this.inputTextFile).then((res) => {
            if (res.data.code === 200)
              this.$message.success("保存成功");
            else
              this.$message.warning("保存失败");
          })
        }
      });
    },
    //修改数据字段信息中元数据字段
    updateMatchS(vmatchId, sColumn, sColumnName) {
      updateMatchS(vmatchId, sColumn, sColumnName).then((res) => {
        console.log(res);
      })
    },
    //查询版本信息
    catchVersionDetail() {
      catchVersionDetail(0).then((res) => {
        this.versionList = res.data.data;
      });
    },
    //展示参数参数的json数据
    showParamsJson(tableDataParams) {
      this.objParamsJson = {};
      if (tableDataParams.length > 0) {
        var objParams = ["", "", "", "", ""];
        if (tableDataParams.length == 1) {
          this.$set(this.objParamsJson, tableDataParams[0].paramsColumn, objParams);
        } else if (tableDataParams.length == 2) {
          this.$set(this.objParamsJson, tableDataParams[0].paramsColumn, objParams);
          this.$set(this.objParamsJson, tableDataParams[1].paramsColumn, "2020-12-01 00:00:00");
        } else if (tableDataParams.length == 3) {
          this.$set(this.objParamsJson, tableDataParams[0].paramsColumn, objParams);
          this.$set(this.objParamsJson, tableDataParams[1].paramsColumn, "2020-12-01 00:00:00");
          this.$set(this.objParamsJson, tableDataParams[2].paramsColumn, "2022-12-01 00:00:00");
        }
      }
    },
    //根据版本id查询数据字段信息
    catchMatchDetail(type) {
      this.objParamsJson = {};
      //根据版本id查询是否为取数版本
      if (this.versionValue != "") {
        selectAccessVersion(this.versionValue).then((res) => {
          if (res.data.data.isAccessVersion == 1) {
            this.accessVersion = true;
          } else {
            this.accessVersion = false;
          }
        })
      }
      if (type == 1) {
        this.exampleMessage = [];
        this.tableDataParams = [];
        catchMatchDetail(this.versionValue).then((res) => {
          this.matchList = res.data.matches;
          this.matchList.forEach(element => {
            this.$set(element, "scolumnEdit", false);
            this.$set(element, "scolumnNameEdit", false);
            element.versionId = this.versionValue;
          })
          this.size = res.data.size;
          //根据版本id输入接口方式
          catchIfTypeByVersion(this.versionValue).then((res) => {
            if (res.data != null && res.data != "" && res.data != undefined) {
              if (res.data.interfaceType == 2) {
                this.objJson = {};
                this.interfaceTypeRadio = "2";
                this.inputApiUrl = "";
                this.inputApiTextType = "";
                this.tableDataParams = [];
                this.disabled3 = true;
                this.inputTextUrl = res.data.textUrl;
                this.inputTextFile = res.data.textFile;
              } else {
                this.interfaceTypeRadio = "1";
                this.inputTextUrl = "";
                this.inputTextFile = "";
                this.disabled3 = false;
                this.inputApiUrl = res.data.apiUrl;
                if (res.data.apiTextType == 1) {
                  this.inputApiTextType = "1";
                } else {
                  this.inputApiTextType = "2";
                  this.showJson();
                }
              }
              this.iftypeId = res.data.iftypeId;
              if (this.interfaceTypeRadio == 1) {
                //根据接口方式查询输入参数
                catchParamsByInterfaceType(res.data.iftypeId).then((res) => {
                  this.tableDataParams = res.data;
                  this.showParamsJson(this.tableDataParams);
                })
              }
            } else {
              this.interfaceTypeRadio = "1";
              this.inputTextUrl = "";
              this.inputTextFile = "";
              this.inputApiUrl = "";
              this.inputApiTextType = "2";
              this.showJson();
            }
          });
        });
      } else if (type == 2) {
        this.inputApiUrlOut = "";
        this.inputApiTextTypeOut = "2";
        this.catchOutMatch(1);
        selectIftypeOutByVersion(this.versionValue).then((res) => {
          if (res.data.data.length > 0) {
            this.inputApiUrlOut = res.data[0].apiUrl;
            if (res.data[0].apiTextType == 1) {
              this.inputApiTextTypeOut = "1";
            } else {
              this.inputApiTextTypeOut = "2";
            }
          }
        })
      } else if (type == 3) {
        this.inputApiUrlOut = "";
        this.inputApiTextTypeOut = "2";
        this.catchOutMatch(2);
        selectIftypeOutByVersion(this.versionValue).then((res) => {
          if (res.data.data.length > 0) {
            this.inputApiUrlOut = res.data.data[0].apiUrl;
            if (res.data.data[0].apiTextType == 1) {
              this.inputApiTextTypeOut = "1";
            } else {
              this.inputApiTextTypeOut = "2";
            }
          }
        })
      }
    },
    //切换菜单
    changeMenu(flag) {
      this.objJson = {};
      this.accessVersion = false;
      this.menuselect = flag;
      if (flag == 1) {
        // this.versionValue = "";
        this.matchList = [];
        this.inputTextUrl = "";
        this.inputTextFile = "";
        this.inputApiUrl = "";
        this.tableDataParams = [];
        this.interfaceTypeRadio = "1";
        this.inputApiTextType = "2";
        this.exampleMessage = [];
        this.objParamsJson = {};
        this.disabled3 = false;
        this.dataInType = "(LIMS)";
        catchVersionDetail(0).then((res) => {
          this.versionList = res.data.data;
        });
        this.showWhich = true;
        this.showWhichMes = false;
        this.showWhichDevice = false;
        this.showWhichSample = false;
        this.showWhichMateriel = false;
        this.showWhichMatterpro = false;
        this.showWhichOutLims = false;
        this.showWhichOutMes = false;
        this.isTrue = true;
        defaultSelect(0).then((res) => {
          this.versionValue = res.data.data.versionId;
          this.catchMatchDetail(1);
        })
      } else if (flag == 2) {
        // this.versionValue = "";
        this.matchList = [];
        this.inputTextUrl = "";
        this.inputTextFile = "";
        this.inputApiUrl = "";
        this.tableDataParams = [];
        this.interfaceTypeRadio = "1";
        this.inputApiTextType = "2";
        this.exampleMessage = [];
        this.objParamsJson = {};
        this.disabled3 = false;
        this.dataInType = "(MES)";
        catchVersionDetail(1).then((res) => {
          this.versionList = res.data.data;
        });
        this.showWhich = false;
        this.showWhichMes = true;
        this.showWhichDevice = false;
        this.showWhichSample = false;
        this.showWhichMateriel = false;
        this.showWhichMatterpro = false;
        this.showWhichOutLims = false;
        this.showWhichOutMes = false;
        this.isTrue = false;
        defaultSelect(1).then((res) => {
          this.versionValue = res.data.data.versionId;
          this.catchMatchDetail(1);
        })
      } else if (flag == 3) {

        this.inputApiUrlOut = "";
        this.inputApiTextTypeOut = "2";
        this.tableDataOutMatch = [];
        // this.versionValue = "";
        this.dataInType = "(LIMS)";
        this.showWhichOutLims = true;
        this.showWhich = false;
        this.showWhichMes = false;
        this.showWhichDevice = false;
        this.showWhichSample = false;
        this.showWhichMateriel = false;
        this.showWhichMatterpro = false;
        this.showWhichOutMes = false;
        this.isTrue=true;
        catchVersionDetail(0).then((res) => {
          this.versionList = res.data.data;
          defaultSelect(0).then((res) => {
            this.versionValue = res.data.data.versionId;
            this.catchMatchDetail(2);
          })
        });
      } else if (flag == 4) {
        this.isTrue=false;
        this.inputApiUrlOut = "";
        this.inputApiTextTypeOut = "2";
        this.tableDataOutMatch = [];
        this.versionValue = "";
        this.dataInType = "(MES)";
        this.showWhichOutMes = true;
        this.showWhich = false;
        this.showWhichMes = false;
        this.showWhichDevice = false;
        this.showWhichSample = false;
        this.showWhichMateriel = false;
        this.showWhichMatterpro = false;
        this.showWhichOutLims = false;
        catchVersionDetail(1).then((res) => {
          this.versionList = res.data.data;
          defaultSelect(1).then((res) => {
            this.versionValue = res.data.data.versionId;
            this.catchMatchDetail(3);
          })
        });
      } else if (flag == 5) {
        this.showWhich = false;
        this.showWhichMes = false;
        this.showWhichDevice = true;
        this.showWhichSample = false;
        this.showWhichMateriel = false;
        this.showWhichMatterpro = false;
        this.showWhichOutLims = false;
        this.showWhichOutMes = false;
      } else if (flag == 6) {
        this.showWhich = false;
        this.showWhichMes = false;
        this.showWhichDevice = false;
        this.showWhichSample = true;
        this.showWhichMateriel = false;
        this.showWhichMatterpro = false;
        this.showWhichOutLims = false;
        this.showWhichOutMes = false;
      } else if (flag == 7) {
        this.showWhich = false;
        this.showWhichMes = false;
        this.showWhichDevice = false;
        this.showWhichSample = false;
        this.showWhichMateriel = true;
        this.showWhichMatterpro = false;
        this.showWhichOutLims = false;
        this.showWhichOutMes = false;
      } else if (flag == 8) {
        this.showWhich = false;
        this.showWhichMes = false;
        this.showWhichDevice = false;
        this.showWhichSample = false;
        this.showWhichMateriel = false;
        this.showWhichMatterpro = true;
        this.showWhichOutLims = false;
        this.showWhichOutMes = false;
        this.catchMatterpro(this.pageNum);
      }
    },
    getexampleMessage() {

    },
    //同步单位配置
    showSyncUnitSetting(row){

      this.isIndeterminate = false;
      this.checkAll = false; //全选
      this.canSubmit = true;
      this.matterproList = [];
      this.syncUnitDialog = true;
      this.matterpros = [];
      let checkedCount = '';
        //根据物性编码查询主数据对应所有物性单位
      catchMatterproByUnit(row.matterproCode).then((res) => {
        this.matterproList = res.data.data;
        //若只有一个物性单位不显示全选功能
        if (this.matterproList.length <= 1){
          this.showSelectAll = false;
        }else {
          this.showSelectAll = true;
        }
      })
      //根据物性编码查询已选物性单位集合
      selectCheckedMatterproUnits(row.matterproCode,this.dataInType).then((res) => {
        this.checkedMatterproUnits = res.data.data;
        let checkedCount = res.data.data.length;
        this.checkAll = checkedCount === this.matterproList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.matterproList.length;
      })
      this.matchMatterpro.matterproCode = row.matterproCode;
      this.matchMatterpro.matterproName = row.matterproName;
    },
    //全选
    handleCheckAllChange(val){
      this.checkedMatterproUnits = val ? this.matterproList : [];
      this.isIndeterminate = false;
      if (this.checkedMatterproUnits.length<1){
        this.canSubmit = false;
      }else {
        this.canSubmit = true;
      }
    },
    //提交同步单位配置
    submitSyncUnit(){
      this.obj.obj_matterproCode = this.matchMatterpro.matterproCode;
      this.obj.obj_checkedMatterproUnits = this.checkedMatterproUnits;
      this.obj.obj_dataInType = this.dataInType =='(LIMS)' ? 'L' : 'M';
      if (this.matterproList.length - this.checkedMatterproUnits.length == 0){ //无未选提交
        this.obj.obj_isChangeStatus = false;
      }else { //有未选提交
        this.obj.obj_isChangeStatus = true;
      }
      submitCheckedMatterproUnits(this.obj).then((res) => {
        if (res.data.code==200){
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.syncUnitDialog = false;
        }
      })
    },
    //复选框状态处理
    handleCheckedMatterprosChange(value){
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.matterproList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.matterproList.length;
      if (this.checkedMatterproUnits.length<1){
        this.canSubmit = false;
      }else {
        this.canSubmit = true;
      }
    }
  },
};
</script>

<style slot-scope="scope">
.spanStyleLeft {
  font-size: 19px;
  color: #409EFF;
  padding: 10px 10px 5px 10px;
  /* margin-right: 10px; */
  margin-left: -10px;
}

.spanOption:hover {
  color: #FFFFFF;
  border-radius: 20px;
  background-color: #409EFF;
  padding: 10px 10px 10px 10px;
  margin: 5px 70px 5px 30px;
  text-align: center;
  cursor: pointer;
}

.spanOptionSelect {
  color: #FFFFFF;
  border-radius: 20px;
  background-color: #FFFFFF;
  padding: 10px 10px 10px 10px;
  margin: 5px 70px 5px 30px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 1px 1px #c0c4cc;
}

.spanOption {
  padding: 10px 10px 10px 10px;
  margin: 5px 70px 5px 30px;
  text-align: center;
  cursor: pointer;
}

.spanStyle {
  font-size: 17px;
  padding: 10px 10px 5px 10px;
  margin-right: 10px;
  margin-left: 10px;
  border-bottom: solid 1px #cbccce;
}

.contentStyle {
  font-size: 15px;
  /* margin-top: 10px; */
  margin-left: 20px;
  margin-right: 20px;
}

.el-input__inner {
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  height: 35px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}

.el-input--mini .el-input__inner {
  height: 28px;
  line-height: 28px;
  color: #409EFF;
}

.styltyzdclass {
  width: 40%;
  margin-top: 3px;
}
</style>
