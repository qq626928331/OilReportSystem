<template>
  <el-row>
    <el-col span="5">
      <el-scrollbar>
        <basic-container style="padding-right: 0px; padding-left: 0px">
          <el-tree
            :data="treeData"
            class="filter-tree"
            :props="defaultProps"
            node-key="id"
            accordion
            ref="tree"
            @node-click="nodeClick"
            :current-node-key="currentkey" :default-expanded-keys="expandedKey"
            highlight-current
            :style="treeStyle"
          >
          </el-tree>
        </basic-container>
      </el-scrollbar>
    </el-col>
    <el-col span="19">
      <div class="dlwlpp1 dbi1 ov1" :style="rightStyle" v-if="innerFBL == 1366">
        <!--图例-->
        <div class="fr1">
          <span class="tulil1">装置进料</span>
          <span class="tulih1">装置出料</span>
        </div>
        <!--装置-->
        <div class="zzbf1">
          <!--左侧-->
          <div class="fl dbi1 mt280">
            <div class="boxleft1 fl1">
              <span class="lanyoutong1 dbi1">装置进料</span>
            </div>
            <div class="lanxian1 fl1"></div>
          </div>
          <!--中间-->
          <div id="wxppzz"  class="fl wxppzz3"></div>
          <!--右侧-->
          <div class="fl dbi1">
            <!--状态1-->
            <div id="div1" class="">
              <div class="boxright1-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span1_1' effect="dark" content="" placement="top">
                    <span id="span1_1" class="huangyoutong1 dbi1"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span1_1_1" style="display: none"></span>
                </div>
              </div>
            </div>
            <!--状态2-->
            <div id="div2">
              <div class="boxright2-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span2_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span2_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span2_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover2"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span2_1_1')"
                      slot="reference"
                      v-popover:popover2
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright2-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <span id="span2_2" class="huangyoutong1 dbi1"></span>
                  <span id="span2_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover3"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span2_2_2')"
                      slot="reference"
                      v-popover:popover3
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态3-->
            <div id="div3">
              <div class="boxright3-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span3_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span3_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span3_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover4"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span3_1_1')"
                      slot="reference"
                      v-popover:popover4
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright3-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span3_2' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span3_2" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span3_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover5"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span3_2_2')"
                      slot="reference"
                      v-popover:popover5
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright3-31">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span3_3' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span3_3" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>

                  <span id="span3_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover6"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span3_3_3')"
                      slot="reference"
                      v-popover:popover6
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态4-->
            <div id="div4">
              <div class="boxright4-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span4_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span4_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span4_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover7"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span4_1_1')"
                      slot="reference"
                      v-popover:popover7
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright4-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span4_2' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span4_2" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span4_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover8"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span4_2_2')"
                      slot="reference"
                      v-popover:popover8
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright4-31">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span4_3' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span4_3" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span4_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover9"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span4_3_3')"
                      slot="reference"
                      v-popover:popover9
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright4-41">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span4_4' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span4_4" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span4_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover10"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span4_4_4')"
                      slot="reference"
                      v-popover:popover10
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态5-->
            <div id="div5">
              <div class="boxright5-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span5_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span5_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span5_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover11"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span4_4_4')"
                      slot="reference"
                      v-popover:popover11
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright5-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span5_2' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span5_2" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span5_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover12"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span4_4_4')"
                      slot="reference"
                      v-popover:popover12
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright5-31">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span5_3' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span5_3" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span5_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover13"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span4_4_4')"
                      slot="reference"
                      v-popover:popover13
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright5-41">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span5_4' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span5_4" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span5_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover14"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span4_4_4')"
                      slot="reference"
                      v-popover:popover14
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright5-51">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span5_5' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span5_5" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span5_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover15"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span5_5_5')"
                      slot="reference"
                      v-popover:popover15
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态6-->
            <div id="div6">
              <div class="boxright6-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span6_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span6_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span6_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover16"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span6_1_1')"
                      slot="reference"
                      v-popover:popover16
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span6_2' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span6_2" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span6_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover17"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span6_2_2')"
                      slot="reference"
                      v-popover:popover17
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-31">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span6_3' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span6_3" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span6_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover18"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span6_3_3')"
                      slot="reference"
                      v-popover:popover18
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-41">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span6_4' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span6_4" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span6_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover19"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span6_4_4')"
                      slot="reference"
                      v-popover:popover19
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-51">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span6_5' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span6_5" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span6_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover20"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span6_5_5')"
                      slot="reference"
                      v-popover:popover20
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-61">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span6_6' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span6_6" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span6_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover21"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span6_6_6')"
                      slot="reference"
                      v-popover:popover21
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态7-->
            <div id="div7">
              <div class="boxright7-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span7_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span7_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span7_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover22"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span7_1_1')"
                      slot="reference"
                      v-popover:popover22
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span7_2' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span7_2" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span7_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover23"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span7_2_2')"
                      slot="reference"
                      v-popover:popover23
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-31">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span7_3' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span7_3" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span7_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover24"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span7_3_3')"
                      slot="reference"
                      v-popover:popover24
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-41">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span7_4' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span7_4" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span7_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover25"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span7_4_4')"
                      slot="reference"
                      v-popover:popover25
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-51">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span7_5' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span7_5" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span7_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover26"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span7_5_5')"
                      slot="reference"
                      v-popover:popover26
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-61">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span7_6' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span7_6" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span7_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover27"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span7_6_6')"
                      slot="reference"
                      v-popover:popover27
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-71">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span7_7' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span7_7" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span7_7_7" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover28"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span7_7_7')"
                      slot="reference"
                      v-popover:popover28
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态8-->
            <div id="div8">
              <div class="boxright8-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span8_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span8_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span8_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover29"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span8_1_1')"
                      slot="reference"
                      v-popover:popover29
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span8_2' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span8_2" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span8_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover30"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span8_2_2')"
                      slot="reference"
                      v-popover:popover30
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-31">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span8_3' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span8_3" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span8_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover31"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span8_3_3')"
                      slot="reference"
                      v-popover:popover31
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-41">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span8_4' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span8_4" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span8_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover32"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span8_4_4')"
                      slot="reference"
                      v-popover:popover32
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-51">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span8_5' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span8_5" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span8_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover33"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span8_5_5')"
                      slot="reference"
                      v-popover:popover33
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-61">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span8_6' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span8_6" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span8_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover34"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span8_6_6')"
                      slot="reference"
                      v-popover:popover34
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-71">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span8_7' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span8_7" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span8_7_7" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover35"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span8_7_7')"
                      slot="reference"
                      v-popover:popover35
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-81">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span8_8' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span8_8" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span8_8_8" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover36"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span8_8_8')"
                      slot="reference"
                      v-popover:popover36
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态9-->
            <div id="div9">
              <div class="boxright9-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover37"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_1_1')"
                      slot="reference"
                      v-popover:popover37
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_2' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_2" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover38"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_2_2')"
                      slot="reference"
                      v-popover:popover38
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-31">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_3' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_3" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover39"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_3_3')"
                      slot="reference"
                      v-popover:popover39
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-41">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_4' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_4" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover40"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_4_4')"
                      slot="reference"
                      v-popover:popover40
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-51">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_5' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_5" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover41"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_5_5')"
                      slot="reference"
                      v-popover:popover41
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-61">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_6' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_6" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover42"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_6_6')"
                      slot="reference"
                      v-popover:popover42
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-71">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_7' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_7" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_7_7" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover43"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_7_7')"
                      slot="reference"
                      v-popover:popover43
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-81">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_8' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_8" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_8_8" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover44"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_8_8')"
                      slot="reference"
                      v-popover:popover44
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-91">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span9_9' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span9_9" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span9_9_9" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover45"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span9_9_9')"
                      slot="reference"
                      v-popover:popover45
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态10-->
            <div id="div10">
              <div class="boxright10-11">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_1' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_1" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover46"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_1_1')"
                      slot="reference"
                      v-popover:popover46
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-21">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_2' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_2" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover47"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_2_2')"
                      slot="reference"
                      v-popover:popover47
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-31">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_3' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_3" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover48"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_3_3')"
                      slot="reference"
                      v-popover:popover48
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-41">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_4' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_4" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover49"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_4_4')"
                      slot="reference"
                      v-popover:popover49
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-51">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_5' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_5" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover50"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_5_5')"
                      slot="reference"
                      v-popover:popover50
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-61">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_6' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_6" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover51"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_6_6')"
                      slot="reference"
                      v-popover:popover51
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-71">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_7' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_7" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_7_7" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover52"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_7_7')"
                      slot="reference"
                      v-popover:popover52
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-81">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_8' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_8" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_8_8" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover53"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_8_8')"
                      slot="reference"
                      v-popover:popover53
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-91">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_9' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_9" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_9_9" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover54"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_9_9')"
                      slot="reference"
                      v-popover:popover54
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-101">
                <div class="huangxian1 fl1"></div>
                <div class="zzcl1 fl1">
                  <el-tooltip class="item" ref='span10_10' effect="dark" content="装置出料1字数超出隐藏藏藏藏藏" placement="top">
                    <span id="span10_10" class="huangyoutong1 dbi1"
                    >装置出料1字数超出隐藏藏藏藏藏</span
                    >
                  </el-tooltip>
                  <span id="span10_10_10" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover55"
                    placement="right"
                    width="260"
                    trigger="click"
                  >
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column
                        width="100"
                        property="sampleName"
                        label="采样点名称"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleCode"
                        label="采样点编码"
                      ></el-table-column>
                      <el-table-column
                        width="80"
                        property="sampleOrder"
                        label="排序"
                      ></el-table-column>
                    </el-table>
                    <a
                      class="chakan1"
                      @click="handleRowClick('span10_10_10')"
                      slot="reference"
                      v-popover:popover55
                      href="#"
                    ></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dlwlpp dbi ov" :style="rightStyle" v-else>
        <!--图例-->
        <div class="fr">
          <span class="tulil">装置进料</span>
          <span class="tulih">装置出料</span>
        </div>
        <!--装置-->
        <div class="zzbf" v-if="innerFBL != 1366">
          <!--左侧-->
          <div class="fl dbi mt280 ">
            <div class="boxleft fl">
              <span class="lanyoutong dbi">装置进料</span>
            </div>
            <div class="lanxian fl"></div>
          </div>
          <!--中间-->
          <div id="wxppzz"  class="wxppzz fl"></div>
          <!--右侧-->
          <div class="fl dbi">
            <!--状态1-->
            <div id="div1" class="">
              <div class="boxright1-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span1_1' effect="dark" content="" placement="top">
                    <span id="span1_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span1_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover1"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span1_1_1')" slot="reference" v-popover:popover1 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态2-->
            <div  id="div2" >
              <div class="boxright2-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span2_1' effect="dark" content="" placement="top">
                    <span id="span2_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span2_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover2"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span2_1_1')" slot="reference" v-popover:popover2 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright2-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span2_2' effect="dark" content="" placement="top">
                    <span id="span2_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span2_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover3"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span2_2_2')" slot="reference" v-popover:popover3 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态3-->
            <div  id="div3" >
              <div class="boxright3-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span3_1' effect="dark" content="" placement="top">
                    <span id="span3_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span3_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover4"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span3_1_1')" slot="reference" v-popover:popover4 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright3-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span3_2' effect="dark" content="" placement="top">
                    <span id="span3_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span3_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover5"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span3_2_2')" slot="reference" v-popover:popover5 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright3-3">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span3_3' effect="dark" content="" placement="top">
                    <span id="span3_3" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span3_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover6"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span3_3_3')" slot="reference" v-popover:popover6 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态4-->
            <div  id="div4" >
              <div class="boxright4-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span4_1' effect="dark" content="" placement="top">
                    <span id="span4_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span4_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover7"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span4_1_1')" slot="reference" v-popover:popover7 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright4-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span4_2' effect="dark" content="" placement="top">
                    <span id="span4_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span4_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover8"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span4_2_2')" slot="reference" v-popover:popover8 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright4-3">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span4_3' effect="dark" content="" placement="top">
                    <span id="span4_3" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span4_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover9"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span4_3_3')" slot="reference" v-popover:popover9 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright4-4">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span4_4' effect="dark" content="" placement="top">
                    <span id="span4_4" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span4_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover10"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span4_4_4')" slot="reference" v-popover:popover10 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态5-->
            <div  id="div5" >
              <div class="boxright5-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span5_1' effect="dark" content="" placement="top">
                    <span id="span5_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span5_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover11"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span4_4_4')" slot="reference" v-popover:popover11 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright5-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span5_2' effect="dark" content="" placement="top">
                    <span id="span5_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span5_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover12"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span4_4_4')" slot="reference" v-popover:popover12 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright5-3">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span5_3' effect="dark" content="" placement="top">
                    <span id="span5_3" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span5_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover13"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span4_4_4')" slot="reference" v-popover:popover13 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright5-4">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span5_4' effect="dark" content="" placement="top">
                    <span id="span5_4" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span5_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover14"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span4_4_4')" slot="reference" v-popover:popover14 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright5-5">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span5_5' effect="dark" content="" placement="top">
                    <span id="span5_5" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span5_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover15"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span5_5_5')" slot="reference" v-popover:popover15 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态6-->
            <div  id="div6" >
              <div class="boxright6-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span6_1' effect="dark" content="" placement="top">
                    <span id="span6_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span6_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover16"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span6_1_1')" slot="reference" v-popover:popover16 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span6_2' effect="dark" content="" placement="top">
                    <span id="span6_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span6_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover17"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span6_2_2')" slot="reference" v-popover:popover17 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-3">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span6_3' effect="dark" content="" placement="top">
                    <span id="span6_3" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span6_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover18"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span6_3_3')" slot="reference" v-popover:popover18 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-4">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span6_4' effect="dark" content="" placement="top">
                    <span id="span6_4" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span6_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover19"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span6_4_4')" slot="reference" v-popover:popover19 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-5">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span6_5' effect="dark" content="" placement="top">
                    <span id="span6_5" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span6_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover20"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span6_5_5')" slot="reference" v-popover:popover20 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright6-6">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span6_6' effect="dark" content="" placement="top">
                    <span id="span6_6" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span6_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover21"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span6_6_6')" slot="reference" v-popover:popover21 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态7-->
            <div  id="div7" >
              <div class="boxright7-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span7_1' effect="dark" content="" placement="top">
                    <span id="span7_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span7_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover22"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span7_1_1')" slot="reference" v-popover:popover22 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span7_2' effect="dark" content="" placement="top">
                    <span id="span7_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span7_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover23"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span7_2_2')" slot="reference" v-popover:popover23 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-3">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span7_3' effect="dark" content="" placement="top">
                    <span id="span7_3" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span7_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover24"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span7_3_3')" slot="reference" v-popover:popover24 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-4">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span7_4' effect="dark" content="" placement="top">
                    <span id="span7_4" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span7_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover25"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span7_4_4')" slot="reference" v-popover:popover25 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-5">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span7_5' effect="dark" content="" placement="top">
                    <span id="span7_5" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span7_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover26"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span7_5_5')" slot="reference" v-popover:popover26 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-6">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span7_6' effect="dark" content="" placement="top">
                    <span id="span7_6" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span7_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover27"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span7_6_6')" slot="reference" v-popover:popover27 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright7-7">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span7_7' effect="dark" content="" placement="top">
                    <span id="span7_7" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span7_7_7" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover28"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span7_7_7')" slot="reference" v-popover:popover28 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态8-->
            <div  id="div8" >
              <div class="boxright8-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span8_1' effect="dark" content="" placement="top">
                    <span id="span8_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span8_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover29"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span8_1_1')" slot="reference" v-popover:popover29 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span8_2' effect="dark" content="" placement="top">
                    <span id="span8_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span8_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover30"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span8_2_2')" slot="reference" v-popover:popover30 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-3">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span8_3' effect="dark" content="" placement="top">
                    <span id="span8_3" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span8_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover31"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span8_3_3')" slot="reference" v-popover:popover31 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-4">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span8_4' effect="dark" content="" placement="top">
                    <span id="span8_4" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span8_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover32"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span8_4_4')" slot="reference" v-popover:popover32 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-5">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span8_5' effect="dark" content="" placement="top">
                    <span id="span8_5" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span8_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover33"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span8_5_5')" slot="reference" v-popover:popover33 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-6">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span8_6' effect="dark" content="" placement="top">
                    <span id="span8_6" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span8_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover34"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span8_6_6')" slot="reference" v-popover:popover34 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-7">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span8_7' effect="dark" content="" placement="top">
                    <span id="span8_7" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span8_7_7" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover35"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span8_7_7')" slot="reference" v-popover:popover35 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright8-8">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span8_8' effect="dark" content="" placement="top">
                    <span id="span8_8" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span8_8_8" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover36"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span8_8_8')" slot="reference" v-popover:popover36 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态9-->
            <div  id="div9" >
              <div class="boxright9-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_1' effect="dark" content="" placement="top">
                    <span id="span9_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover37"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_1_1')" slot="reference" v-popover:popover37 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_2' effect="dark" content="" placement="top">
                    <span id="span9_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover38"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_2_2')" slot="reference" v-popover:popover38 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-3">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_3' effect="dark" content="" placement="top">
                    <span id="span9_3" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover39"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_3_3')" slot="reference" v-popover:popover39 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-4">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_4' effect="dark" content="" placement="top">
                    <span id="span9_4" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover40"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_4_4')" slot="reference" v-popover:popover40 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-5">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_5' effect="dark" content="" placement="top">
                    <span id="span9_5" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover41"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_5_5')" slot="reference" v-popover:popover41 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-6">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_6' effect="dark" content="" placement="top">
                    <span id="span9_6" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover42"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_6_6')" slot="reference" v-popover:popover42 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-7">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_7' effect="dark" content="" placement="top">
                    <span id="span9_7" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_7_7" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover43"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_7_7')" slot="reference" v-popover:popover43 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-8">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_8' effect="dark" content="" placement="top">
                    <span id="span9_8" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_8_8" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover44"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_8_8')" slot="reference" v-popover:popover44 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright9-9">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span9_9' effect="dark" content="" placement="top">
                    <span id="span9_9" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span9_9_9" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover45"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span9_9_9')" slot="reference" v-popover:popover45 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
            <!--状态10-->
            <div  id="div10" >
              <div class="boxright10-1">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_1' effect="dark" content="" placement="top">
                    <span id="span10_1" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_1_1" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover46"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_1_1')" slot="reference" v-popover:popover46 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-2">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_2' effect="dark" content="" placement="top">
                    <span id="span10_2" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_2_2" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover47"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_2_2')" slot="reference" v-popover:popover47 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-3">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_3' effect="dark" content="" placement="top">
                    <span id="span10_3" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_3_3" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover48"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_3_3')" slot="reference" v-popover:popover48 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-4">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_4' effect="dark" content="" placement="top">
                    <span id="span10_4" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_4_4" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover49"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_4_4')" slot="reference" v-popover:popover49 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-5">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_5' effect="dark" content="" placement="top">
                    <span id="span10_5" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_5_5" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover50"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_5_5')" slot="reference" v-popover:popover50 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-6">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_6' effect="dark" content="" placement="top">
                    <span id="span10_6" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_6_6" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover51"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_6_6')" slot="reference" v-popover:popover51 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-7">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_7' effect="dark" content="" placement="top">
                    <span id="span10_7" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_7_7" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover52"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_7_7')" slot="reference" v-popover:popover52 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-8">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_8' effect="dark" content="" placement="top">
                    <span id="span10_8" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_8_8" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover53"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_8_8')" slot="reference" v-popover:popover53 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-9">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_9' effect="dark" content="" placement="top">
                    <span id="span10_9" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_9_9" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover54"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_9_9')" slot="reference" v-popover:popover54 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
              <div class="boxright10-10">
                <div class="huangxian fl"></div>
                <div class="zzcl fl">
                  <el-tooltip class="item" ref='span10_10' effect="dark" content="" placement="top">
                    <span id="span10_10" class="huangyoutong dbi"
                    ></span
                    >
                  </el-tooltip>
                  <span id="span10_10_10" style="display: none"></span>
                  <!-- <el-popover
                    ref="popover55"
                    placement="right"
                    width="260"
                    trigger="click">
                    <el-table :data="gridData" size="small" v-loading="loading">
                      <el-table-column width="100" property="sampleName" label="采样点名称"></el-table-column>
                      <el-table-column width="80" property="sampleCode" label="采样点编码"></el-table-column>
                      <el-table-column width="80" property="sampleOrder" label="排序"></el-table-column>
                    </el-table>
                    <a class="chakan" @click="handleRowClick('span10_10_10')" slot="reference" v-popover:popover55 href="#"></a>
                  </el-popover> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getDeptTreeDevice } from "@/api/system/dept";
import {errorMsgbox} from "@/api/global_variable";

import {
  getList,
  getDetail,
  add,
  update,
  remove,
  getsampleInfo,
} from "@/api/qcadmin/materiel";
import { mapGetters } from "vuex";

export default {
  name:'/qcadmin/materiel',
  data() {
    return {
      innerFBL: 0,
      gridData: [], //弹窗表格
      treeStyle: "", //树高的样式
      form: {}, //物料表单绑定
      form1: {}, //采样点表单绑定
      selectionList: [], //选择数据
      treeDeptId: "", //组织机构树id
      devicename: "", //装置名称
      treeData: [], //组织机构树数据
      data: [],
      data1: [],
      selectedrow: [],
      defaultProps: {
        //组织机构数默认绑定
        children: "children",
        label: "title",
      },
      currentkey: "", //组织机构数当前节点key值
      expandedKey:[],//首次进入默认展开的key值
      rightStyle: "", //右侧样式
      loading: false, //表格加载状态
    };
  },
  mounted() {
    this.init();
    this.setClientHight()
    window.addEventListener('resize', () => this.setClientHight(), false)
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: false,
        viewBtn: this.vaildData(this.permission.materiel_view, false),
        delBtn: this.vaildData(this.permission.materiel_delete, false),
        editBtn: this.vaildData(this.permission.materiel_edit, false),
      };
    },
    ids() {
      //拼装id
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    // 设置页面高度
    setClientHight(){
      //页面加载前
      this.innerFBL = window.innerWidth;
      this.treeStyle = "height:" + (window.innerHeight - 140) + "px;overflow:auto;";
      this.rightStyle = "height:" + (window.innerHeight  - 115) + "px;";
    },
    //组织机构树点击（data：点击行数据）
    nodeClick(data) {
      if(data.islevel == 2){
        this.data = [];
        this.treeDeptId = data.id.split('DEVI_')[1];
        this.devicename = data.title;
        // for (let i = 1; i < 56; i++) {
        //   //关闭popover
        //   let popover = "popover" + i;
        //   this.$refs[popover].doClose();
        // }
        //查询点击的装置的物料
        this.onLoad();
      }
    },
    //初始加载组织机构默认选中
    init() {
      getDeptTreeDevice().then((res) => {
        var temp = [];
        var forFn = function (arr) {
          if (arr && arr.length > 0) {
            if (arr[0].children) {
              forFn(arr[0].children);
            } else {
              temp.push(arr[0]);
            }
          }
        };
        forFn(res.data.data);
        this.currentkey = temp[0].value;
        this.treeData = res.data.data;
        this.expandedKey = [res.data.data[0].id,res.data.data[0].children[0].id]
        this.$nextTick(function () {
          this.$refs.tree.setCurrentKey(this.currentkey);
        });
        this.nodeClick(temp[0]);
      });
    },
    //初始加载物料（page：分页对象；params：分页数据对象）
    onLoad(page, params = {}) {
      if (
        this.treeDeptId == null ||
        this.treeDeptId == undefined ||
        this.treeDeptId == ""
      ) {
      } else {
        this.loading = true;
        getList(Object.assign(params), this.treeDeptId).then((res) => {
          if (res.data.code != 200){
            return errorMsgbox(this,res.data.msg)
          }
          this.data = res.data.data;
          this.loading = false;
          const number_ = this.data.length; //物料个数
          document.getElementById("wxppzz").innerHTML = this.devicename;
          //将当前个数的div的物料  span 赋值
          for (var aa = 1; aa <= number_; aa++) {
            var span = "span" + number_ + "_" + aa;
            var materielName = this.data[aa - 1].materielName +" "+this.data[aa - 1].materielCode;
            document.getElementById(span).innerHTML = materielName.split(' ')[0];
            this.$refs[span].content = materielName
            var span1 = "span" + number_ + "_" + aa + "_" + aa;
            var materielid = this.data[aa - 1].materielid;
            document.getElementById(span1).innerHTML = materielid;
          }
          //显示 当前个数的 div  其它div 隐藏
          for (var bb = 1; bb <= 10; bb++) {
            var div = "div" + bb;
            if (bb === number_) {
              document.getElementById("div" + number_).style.display = "block";
            } else {
              document.getElementById(div).style.display = "none";
            }
          }
        });
      }
    },
    //根据物料查询采样点
    handleRowClick(htmlid) {
      var materielid = document.getElementById(htmlid).innerText;
      var treeId = this.treeDeptId - 10000;
      this.onLoad1(treeId, materielid, "");
    },
    //加载采样点数据（deptid 装置id,materielid 物料id,sampleName 采样点名称）
    onLoad1(deptid, materielid, sampleName) {
      this.loading = true;
      getsampleInfo(deptid, materielid, sampleName).then((res) => {
        this.gridData = res.data.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped="scoped">
@import "../../../public/htmlmateriel/wuxingpipei.css";
@import "../../../public/htmlmateriel/margin.css";
.ov1 {
  overflow: hidden;
}
.fl1 {
  float: left;
}
.fr1 {
  float: right;
  margin-top: -15px;
}
.dbi1 {
  display: inline-block;
  margin-left: -163px;
}

.wxppzz1 {
  background: url("../../../public/htmlmateriel/image/ic_zhuangzhi.png")
    no-repeat center;
  height: 600px;
  width: 132px;
  font-size: 28px;
  text-align: center;
  writing-mode: tb-rl;
  line-height: 132px;
  letter-spacing: 6px;
}
.wxppzz2 {
  background: url("../../../public/htmlmateriel/image/ic_zhuangzhic.png")
  no-repeat center;
  height: 670px;
  width: 132px;
  font-size: 28px;
  text-align: center;
  writing-mode: tb-rl;
  line-height: 132px;
  letter-spacing: 6px;
  margin-left: -376px;
  background-size: 50% 80%;
  margin-top: -78px;
}
.wxppzz3 {
  background: url("../../../public/htmlmateriel/image/ic_zhuangzhic.png")
  no-repeat center;
  height: 600px;
  width: 132px;
  font-size: 28px;
  text-align: center;
  writing-mode: tb-rl;
  line-height: 132px;
  letter-spacing: 6px;
  margin-left: -376px;
  background-size: 50% 80%;
  margin-top: -109px;
}
.dlwlpp1 {
  height: 750px;
  width: 99%;
  background: #fff;
  border-radius: 5px;
  margin-left: 10px;
}
.dlwlpp1 .tulil1 {
  background: url("../../../public/htmlmateriel/image/ic_lanxian.png") no-repeat
    left center;
  height: 16px;
  width: 120px;
  display: block;
  font-size: 14px;
  color: #00050e;
  line-height: 16px;
  text-align: right;
  margin: 30px 30px 10px 0px;
}
.dlwlpp1 .tulih1 {
  background: url("../../../public/htmlmateriel/image/ic_huangxian.png")
    no-repeat left center;
  height: 16px;
  width: 120px;
  display: block;
  font-size: 14px;
  color: #00050e;
  line-height: 16px;
  text-align: right;
  margin: 10px 30px 10px 0px;
}
.dlwlpp1 .zzbf1 {
  margin-left: 13%;
  margin-top: 80px;
}
.dlwlpp1 .boxleft1 {
  background: url("../../../public/htmlmateriel/image/bg_zzjll.png") no-repeat
    bottom;
  height: 40px;
  width: 220px;
  line-height: 40px;
  border-radius: 999px;
  box-shadow: 0px 0px 20px #888888;
  font-size: 14px;
  font-weight: 550;
  margin-top: -92px;
  margin-left: 85px;
}
.dlwlpp1 .zzcl1 {
  background: url("../../../public/htmlmateriel/image/bg_zzclh.png") no-repeat
    bottom;
  height: 40px;
  width: 258px;
  line-height: 40px;
  border-radius: 999px;
  box-shadow: 0px 0px 20px #888888;
  font-size: 14px;
  font-weight: 550;
  margin-top: -43px;
  margin-left: -30px;
}
.dlwlpp1 .lanyoutong1 {
  background: url("../../../public/htmlmateriel/image/ic_youtongl.png")
    no-repeat left center;
  height: 26px;
  width: 165px;
  line-height: 26px;
  margin-left: 20px;
  display: inline-block;
  margin-top: 7px;
  padding-left: 35px;
  overflow: hidden;
}
.dlwlpp1 .huangyoutong1 {
  background: url("../../../public/htmlmateriel/image/ic_youtongh.png")
    no-repeat left center;
  height: 26px;
  width: 165px;
  line-height: 26px;
  margin-left: 30px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 7px;
  padding-left: 35px;
  overflow: hidden;
}
.zzbf1 .lanxian1 {
  background: url("../../../public/htmlmateriel/image/ic_lanxian.gif") no-repeat
    center;
  height: 22px;
  width: 83px;
  margin-top: -84px;
  display: block;
  overflow: hidden;
  margin-left: 305px;
}
.zzbf1 .huangxian1 {
  background: url("../../../public/htmlmateriel/image/ic_huangxian.gif")
    no-repeat center;
  height: 15px;
  width: 84px;
  margin-top: -29px;
  margin-left: -114px;
}
.zzcl1 .chakan1 {
  background: url("../../../public/htmlmateriel/image/btn_eyeh.png") no-repeat
    center;
  height: 14px;
  width: 24px;
  float: right;
  margin-top: -33px;
  margin-right: 12px;
}
.wxppzz1 {
  background: url("../../../public/htmlmateriel/image/ic_zhuangzhi.png")
    no-repeat center;
  height: 600px;
  width: 132px;
  margin-left: -376px;
  background-size: 50% 80%;
  margin-top: -96px;
}
/*右侧状态*/
.zzbf1 .boxright1-11 {
  position: absolute;
  margin-top: 280px;
}

.zzbf1 .boxright2-11 {
  position: absolute;
  margin-top: 130px;
}
.zzbf1 .boxright2-21 {
  position: absolute;
  margin-top: 390px;
}

.zzbf1 .boxright3-11 {
  position: absolute;
  margin-top: 80px;
}
.zzbf1 .boxright3-21 {
  position: absolute;
  margin-top: 18%;
}
.zzbf1 .boxright3-31 {
  position: absolute;
  margin-top: 30%;
}

.zzbf1 .boxright4-11 {
  position: absolute;
  margin-top: 55px;
}
.zzbf1 .boxright4-21 {
  position: absolute;
  margin-top: 205px;
}
.zzbf1 .boxright4-31 {
  position: absolute;
  margin-top: 355px;
}
.zzbf1 .boxright4-41 {
  position: absolute;
  margin-top: 505px;
}

.zzbf1 .boxright5-11 {
  position: absolute;
  margin-top: 40px;
}
.zzbf1 .boxright5-21 {
  position: absolute;
  margin-top: 160px;
}
.zzbf1 .boxright5-31 {
  position: absolute;
  margin-top: 280px;
}
.zzbf1 .boxright5-41 {
  position: absolute;
  margin-top: 400px;
}
.zzbf1 .boxright5-51 {
  position: absolute;
  margin-top: 520px;
}

.zzbf1 .boxright6-11 {
  position: absolute;
  margin-top: 30px;
}
.zzbf1 .boxright6-21 {
  position: absolute;
  margin-top: 130px;
}
.zzbf1 .boxright6-31 {
  position: absolute;
  margin-top: 230px;
}
.zzbf1 .boxright6-41 {
  position: absolute;
  margin-top: 330px;
}
.zzbf1 .boxright6-51 {
  position: absolute;
  margin-top: 430px;
}
.zzbf1 .boxright6-61 {
  position: absolute;
  margin-top: 530px;
}

.zzbf1 .boxright7-11 {
  position: absolute;
  margin-top: 23px;
}
.zzbf1 .boxright7-21 {
  position: absolute;
  margin-top: 8%;
}
.zzbf1 .boxright7-31 {
  position: absolute;
  margin-top: 14%;
}
.zzbf1 .boxright7-41 {
  position: absolute;
  margin-top: 20%;
}
.zzbf1 .boxright7-51 {
  position: absolute;
  margin-top: 26%;
}
.zzbf1 .boxright7-61 {
  position: absolute;
  margin-top: 32%;
}
.zzbf1 .boxright7-71 {
  position: absolute;
  margin-top: 38%;
}

.zzbf1 .boxright8-11 {
  position: absolute;
  margin-top: 18px;
}
.zzbf1 .boxright8-21 {
  position: absolute;
  margin-top: 93px;
}
.zzbf1 .boxright8-31 {
  position: absolute;
  margin-top: 168px;
}
.zzbf1 .boxright8-41 {
  position: absolute;
  margin-top: 243px;
}
.zzbf1 .boxright8-51 {
  position: absolute;
  margin-top: 318px;
}
.zzbf1 .boxright8-61 {
  position: absolute;
  margin-top: 393px;
}
.zzbf1 .boxright8-71 {
  position: absolute;
  margin-top: 468px;
}
.zzbf1 .boxright8-81 {
  position: absolute;
  margin-top: 543px;
}

.zzbf1 .boxright9-11 {
  position: absolute;
  margin-top: 10px;
}
.zzbf1 .boxright9-21 {
  position: absolute;
  margin-top: 60px;
}
.zzbf1 .boxright9-31 {
  position: absolute;
  margin-top: 110px;
}
.zzbf1 .boxright9-41 {
  position: absolute;
  margin-top: 160px;
}
.zzbf1 .boxright9-51 {
  position: absolute;
  margin-top: 211px;
}
.zzbf1 .boxright9-61 {
  position: absolute;
  margin-top: 260px;
}
.zzbf1 .boxright9-71 {
  position: absolute;
  margin-top: 311px;
}
.zzbf1 .boxright9-81 {
  position: absolute;
  margin-top: 361px;
}
.zzbf1 .boxright9-91 {
  position: absolute;
  margin-top: 412px;
}

.zzbf1 .boxright10-11 {
  position: absolute;
  margin-top: 10px;
}
.zzbf1 .boxright10-21 {
  position: absolute;
  margin-top: 70px;
}
.zzbf1 .boxright10-31 {
  position: absolute;
  margin-top: 130px;
}
.zzbf1 .boxright10-41 {
  position: absolute;
  margin-top: 190px;
}
.zzbf1 .boxright10-51 {
  position: absolute;
  margin-top: 250px;
}
.zzbf1 .boxright10-61 {
  position: absolute;
  margin-top: 310px;
}
.zzbf1 .boxright10-71 {
  position: absolute;
  margin-top: 370px;
}
.zzbf1 .boxright10-81 {
  position: absolute;
  margin-top: 430px;
}
.zzbf1 .boxright10-91 {
  position: absolute;
  margin-top: 490px;
}
.zzbf1 .boxright10-101 {
  position: absolute;
  margin-top: 550px;
}
</style>
