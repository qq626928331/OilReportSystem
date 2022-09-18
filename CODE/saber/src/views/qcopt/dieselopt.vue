<template>
  <div :style="note" v-loading="load"
       element-loading-text="优化计算中，请稍候..."  element-loading-spinner="el-icon-loading">
    <basic-container>
      <OptblendComp ref="child" :materieltypeId="5" @load="setloading"></OptblendComp>
    </basic-container>
    <div class="container" id="container">
      <div class="box1">
        <div id="box1-2" class="box1-2">
          <div class="box1-2-1">
            <img src="../../../public/html814_/image/guandao2.gif">
          </div>
          <div class="box1-2-2">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-2-1"  class="tabletype">

                </table>
              </div>
              <div style="position: relative;text-align:center" name="tong1" class="tong">
                <img @dblclick="opentongdialog(1)" src="../../../public/html814_/image/汽柴油.gif"   >
              </div>
              <div  id="div1-2-1" class="box1-2-2-1"  style="display:none;"  >
                <input disabled="true" id="input1-2-1" type="text" name="FirstName" value="" >
              </div>
            </div>
          </div>
          <div class="box1-2-3">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-2-2" class="tabletype">

                </table>
              </div>
              <div style="position: relative" name="tong2" class="tong">
                <img @dblclick="opentongdialog(2)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-2-2" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-2-2" type="text" name="FirstName" value="">
              </div>
            </div>
          </div>
        </div>
        <div id="box1-3" class="box1-3">
          <div class="box1-3-1">
            <img src="../../../public/html814_/image/guandao3.gif">
          </div>
          <div class="box1-3-2">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-3-1" class="tabletype">

                </table>
              </div>
              <div style="position: relative" name="tong1" class="tong">
                <img @dblclick="opentongdialog(1)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-3-1" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-3-1" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-3-3">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-3-2" class="tabletype">

                </table>
              </div>
              <div style="position: relative" name="tong2" class="tong">
                <img @dblclick="opentongdialog(2)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-3-2" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-3-2" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-3-4">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-3-3" class="tabletype">

                </table>
              </div>
              <div style="position: relative" name="tong3" class="tong">
                <img @dblclick="opentongdialog(3)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-3-3" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-3-3" type="text" name="FirstName" >
              </div>
            </div>
          </div>
        </div>
        <div id="box1-4" class="box1-4">
          <div class="box1-4-1">
            <img src="../../../public/html814_/image/guandao4.gif">
          </div>
          <div class="box1-4-2">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-4-1" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong1" class="tong">
                <img @dblclick="opentongdialog(1)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-4-1" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-4-1" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-4-3">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-4-2" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong2" class="tong">
                <img @dblclick="opentongdialog(2)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-4-2" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-4-2" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-4-4">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-4-3" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong3" class="tong">
                <img @dblclick="opentongdialog(3)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-4-3" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-4-3" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-4-5">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-4-4" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong4" class="tong">
                <img @dblclick="opentongdialog(4)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-4-4" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-4-4" type="text" name="FirstName" >
              </div>
            </div>
          </div>
        </div>
        <div id="box1-5" class="box1-5">
          <div class="box1-5-1">
            <img src="../../../public/html814_/image/guandao5.gif">
          </div>
          <div class="box1-5-2">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-5-1" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong1" class="tong">
                <img @dblclick="opentongdialog(1)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-5-1" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-5-1" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-5-3">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-5-2" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong2" class="tong">
                <img @dblclick="opentongdialog(2)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-5-2" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-5-2" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-5-4">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-5-3" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong3" class="tong">
                <img @dblclick="opentongdialog(3)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-5-3" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-5-3" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-5-5">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-5-4" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong4" class="tong">
                <img @dblclick="opentongdialog(4)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-5-4" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-5-4" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-5-6">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-5-5" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong5" class="tong">
                <img @dblclick="opentongdialog(5)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-5-5" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-5-5" type="text" name="FirstName" >
              </div>
            </div>
          </div>
        </div>
        <div id="box1-6" class="box1-6">
          <div class="box1-6-1">
            <img src="../../../public/html814_/image/guandao6.gif">
          </div>
          <div class="box1-6-2">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-6-1" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong1" class="tong">
                <img @dblclick="opentongdialog(1)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-6-1" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-6-1" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-6-3">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-6-2" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong2" class="tong">
                <img @dblclick="opentongdialog(2)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-6-2" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-6-2" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-6-4">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-6-3" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong3" class="tong">
                <img @dblclick="opentongdialog(3)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-6-3" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-6-3" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-6-5">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-6-4" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong4" class="tong">
                <img @dblclick="opentongdialog(4)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-6-4" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-6-4" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-6-6">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-6-5" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong5" class="tong">
                <img @dblclick="opentongdialog(5)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-6-5" class="box1-2-2-1" style="display:none;" >
                <input disabled="true"="input1-6-5" type="text" name="FirstName" >
              </div>
            </div>
          </div>
          <div class="box1-6-7">
            <div class="guan">
              <div class="shuzi01">
                <table id="tab1-6-6" class="tabletype">
                </table>
              </div>
              <div style="position: relative" name="tong6" class="tong">
                <img @dblclick="opentongdialog(6)" src="../../../public/html814_/image/汽柴油.gif">
              </div>
              <div  id="div1-6-6" class="box1-2-2-1" style="display:none;" >
                <input disabled="true" id="input1-6-6" type="text" name="FirstName" >
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="box2">
        <div style="position: relative" name="datong" class="datong">
          <img src="../../../public/html814_/image/大汽柴油.gif" alt="youtong">
        </div>
        <div  id ="shuzi" class="shuzi" >
          <table id="tab2" class="tabletype01">
          </table>
        </div>
      </div>

      <div class="box3" id="box3">
        <div id="kuangtu" class="kuangtu" style="display:none;">
          <img src="../../../public/html814_/image/border2.png">
          <div class="box3tablediv">
            <span id="span1" class="span1">&nbsp;&nbsp;调合组分</span>
            <table id = "box3bl" class="box3table">


            </table>
            <span id="span2" class="span2">&nbsp;&nbsp;调合产品</span>
            <table id="box3oil" class="box3table1">


            </table>

          </div>
        </div>
        <div class="zhuangzhi" id="zhuangzhi">
          <img class="zhuangzhijiantou"  src="../../../public/html814_/image/jiantou.gif">
          <img src="../../../public/html814_/image/常减压塔.png">
          <div class="zhuangzhitable">
            <table id="zzttd"  class="zzttd" cellpadding="0" cellspacing="0">

            </table>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import OptblendComp from "../../components/qcdialog/optblendComp";

  export default {
    name:'/qcopt/dieselopt',
    components: {OptblendComp},
    data () {
      return {
        load:false,
        winHeight:0,
        note:{
          backgroundImage:"url("+require('../../../public/html814_/image/bg.jpg')+")",
          backgroundRepeat:"no-repeat",
          margin:"0px",
          height:'96%',
        },
      }
    },
    mounted(){
      //已经能打印出来了

      if(this.winHeight>=700){
        //	$("#container").removeClass("container"); //移除
        //  $("#container").addClass("container_800"); // 追加样式

      }
      else if(this.winHeight>=600&&this.winHeight<700){
        $("#container").removeClass("container"); //移除
        $("#container").addClass("container_600"); // 追加样式
      }else if(this.winHeight>=500&&this.winHeight<600){
        //app.Win_detail.setHeight(500);
        $("#container").removeClass("container"); //移除
        $("#container").addClass("container_500"); // 追加样式
      }else if(this.winHeight>=400&&this.winHeight<500){
        // app.Win_detail.setHeight(425);
        $("#container").removeClass("container"); //移除
        $("#container").addClass("container_400"); // 追加样式
      }else if(this.winHeight<400){
        //app.Win_detail.setHeight(350);
        $("#container").removeClass("container"); //移除
        $("#container").addClass("container_0"); // 追加样式
      }
      this.$nextTick(() => {
        this.$refs.child.deleteAllTempData();
      })
    },
    beforeMount() {//动态获取窗口高度用于自适应
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.winHeight=h-210;
    },
    methods:{
      //桶图标的点击事件
      opentongdialog(index){
        this.$refs.child.openmatterdialog(index);
      },
      //加载
      setloading(data){
        this.load=data;
      },
    },
  }
</script>
<style slot-scope="scope">
  .hisresTable { border-collapse:collapse;}
  .hisresTable tr td{border:1px solid #d4dedd;}
  .hisresTable tr th{border:1px solid #d4dedd;}

  .hisresTable input{height: 22px;float:center;margin-top:1px;background-color:transparent;border:0;}
  /*未选中时*/
  /*.my_protocol .input_agreement_protocol+span {
    width: 16px;
    height: 16px;
    background-color: red;
    display: inline-block;
    background: url(../../Images/TalentsRegister/icon_checkbox.png) no-repeat;
    background-position-x: 0px;
    background-position-y: -25px;
    position: relative;
    top: 3px;
  }*/
  /*选中checkbox时,修改背景图片的位置*/
  .my_protocol .input_agreement_protocol:checked+span {
    background-position: 0 0px
  }



  .tdclass {width:135px;}
  .wxTable input{width:80px;height: 18px;float:right;margin-top:3px}
  .wxTable tr{line-height:24px;}
  .wxTable td{font-family:"微软雅黑"; font-size:12px;text-align: right;}
  .wxTable { margin: 0 auto}
  .yhwxTable input{width:60px;height: 18.8px;float:right;box-sizing: border-box;}
  .yhwxTable td{font-family:"微软雅黑"; font-size:12px;text-align: right;}
  .yhwxTable { margin: 0 auto;margin-top:20px;}



  .thTable tr{line-height:24px;}
  .thTableinput1{width:140px;height: 22px;float:center;margin-top:3px}
  .thTableinput2{width:90px;height: 22px;float:center;margin-top:3px}
  .xhclass {width:60px; }
  .guanclass {font-family:"微软雅黑"; font-size:12px;text-align: center;width:130px; }

  .thtdclass{font-family:"微软雅黑"; font-size:12px;text-align: center;width:160px;}
  .thTable td{font-family:"微软雅黑"; font-size:12px;text-align: center;}
  .thTable { margin:5px 5px 5px 5px;}


  .bodytype{margin:0;background:url(../../../public/html814_/image/bg.jpg);overflow: hidden;}

  .container{position:relative;font-family:"微软雅黑";color:#18355a;font-size:14px;transform:scale(1);margin-left:60px}
  .container_600{position:relative;font-family:"微软雅黑";color:#18355a;font-size:14px;transform:scale(0.96);margin-left:-25px;}
  .container_500{position:relative;font-family:"微软雅黑";color:#18355a;font-size:14px;transform:scale(0.85);margin-top:-40px;margin-left:-65px}
  .container_400{position:relative;font-family:"微软雅黑";color:#18355a;font-size:14px;transform:scale(0.74);margin-top:-94px;margin-left:-150px}
  .container_0 {position:relative;font-family:"微软雅黑";color:#18355a;font-size:14px;transform:scale(0.6);margin-top:-150px;margin-left:-150px}






  .box1{width:698px;}
  .box2{height:248px;position:absolute; left:586px;top:206px;}
  .box3{width:680px;height:650px;position:absolute;left:780px;top:0px;}
  .box333{width:734px;height:650px;position:absolute;left:780px;top:0px;}
  .shuzi{width:190px;margin-top:189px;margin-left:18px;background-color:rgba(229,229,229,0.5);border-bottom: 2px solid #869dad;border-top:2px solid #869dad;height:66px;}
  .tabletype{margin:auto;line-height:15px;margin-top:5px}
  .tabletype01{margin:auto;line-height:15px;font-size:12px;margin-top:5px}
  .tabletype td{line-height:16px;font-size:12px;}
  .container input{height:17px;width:47px;padding:0;margin:4px 0 0 0;text-align:center; border:none;border-bottom: 3px solid #52758b;font-family:"微软雅黑"; font-size:13px;background-color:rgba(255,255,255,0);}
  .container_600 input{height:17px;width:47px;padding:0;margin:4px 0 0 0;text-align:center; border:none;border-bottom: 3px solid #52758b;font-family:"微软雅黑"; font-size:13px;background-color:rgba(255,255,255,0);}
  .container_500 input{height:17px;width:47px;padding:0;margin:4px 0 0 0;text-align:center; border:none;border-bottom: 3px solid #52758b;font-family:"微软雅黑"; font-size:13px;background-color:rgba(255,255,255,0);}
  .container_400 input{height:17px;width:47px;padding:0;margin:4px 0 0 0;text-align:center; border:none;border-bottom: 3px solid #52758b;font-family:"微软雅黑"; font-size:13px;background-color:rgba(255,255,255,0);}
  .container_0 input{height:17px;width:47px;padding:0;margin:4px 0 0 0;text-align:center; border:none;border-bottom: 3px solid #52758b;font-family:"微软雅黑"; font-size:13px;background-color:rgba(255,255,255,0);}
  .datong{margin-top:20px;float:left;text-align: center;}
  .kuangtu{/*display:none;*/}
  .shuzi01{background-color:rgba(229,229,229,0.5);float:left;margin-top:5px;border-bottom: 2px solid #869dad;border-top:2px solid #869dad;width:190px;height:66px;}
  .tong{float:left;padding-left:20px;padding-right:0px;text-align: center;}
  .box1-2{width:592px;height:650px;position:relative;display:block;}
  .box1-2-1{height: 313px; padding-top:180px;padding-left:333px;}
  .box1-2-2{width:388px;position: absolute;top:127px;left:90px;}
  .box1-2-3{width:388px;position: absolute;top:433px;left:90px;}
  .box1-2-2-1{float:left;padding-top:14px;margin-left:20px;}
  .box1-2-2-6{float:left;padding-top:14px;margin-left:119px;}
  .box1-3{width:592px;height:650px;position:relative;display: none;}
  .box1-3-1{height:313px; padding-top:180px;padding-left:333px;}
  .box1-3-2{width:388px;position: absolute;top:127px;left:90px;}
  .box1-3-3{width:388px;position: absolute;top:280px;left:90px;}
  .box1-3-4{width:388px;position: absolute;top:433px;left:90px;}
  .box1-4{width:592px;height:650px;position:relative;display:none;}
  .box1-4-1{height:313px; padding-top:143px;padding-left:279px;}
  .box1-4-2{width:388px;position: absolute;top:92px;left:90px;}
  .box1-4-3{width:465px;position: absolute;top:207px;left:0px;}
  .box1-4-4{width:388px;position: absolute;top:321px;left:90px;}
  .box1-4-5{width:465px;position: absolute;top:436px;left:0px;}
  .box1-5{width:592px;height:650px;position:relative;display:none;}
  .box1-5-1{height:313px; padding-top:101px;padding-left:273px;}
  .box1-5-2{width:388px;position: absolute;top:44px;left:90px;}
  .box1-5-3{width:465px;position: absolute;top:163px;left:0px;}
  .box1-5-4{width:388px;position: absolute;top:280px;left:90px;}
  .box1-5-5{width:465px;position: absolute;top:396px;left:0px;}
  .box1-5-6{width:388px;position: absolute;top:513px;left:90px;}
  .box1-6{width:592px;height:650px;position:relative;display:none;}
  .box1-6-1{height:313px; padding-top:98px;padding-left:273px;}
  .box1-6-2{width:388px;position: absolute;top:44px;left:90px;}
  .box1-6-3{width:465px;position: absolute;top:138px;left:0px;}
  .box1-6-4{width:388px;position: absolute;top:231px;left:90px;}
  .box1-6-5{width:465px;position: absolute;top:325px;left:0px;}
  .box1-6-6{width:388px;position: absolute;top:418px;left:90px;}
  .box1-6-7{width:465px;position: absolute;top:512px;left:0px;}
  .zhuangzhi{margin-top:76px;display:none;}
  .zhuangzhi img{float:left;}
  .zhuangzhijiantou{margin-top:242px;margin-left:20px;}
  .zhuangzhitable{position:relative;}
  .zzttd{position:absolute;left:255px;margin-top:35px;}
  .zzttd1{padding-left:20px;}
  .zzttd2{padding-right:10px;}
  .zzttd td{line-height:35px;border-bottom: 2px solid #546a7a;}
  .kuangtu img{margin-top:322px;float:left;}
  .box3tablediv{margin: 0 auto;float:left;background-color:rgba(255,255,255,0.2);border:3px solid #52758b;margin-top:11%;height:488px;overflow-x:auto;}
  .box3table{margin: 0 auto;margin-left: 10px;margin-top: 10px;text-align:left;  border-spacing:3px 3px;}
  .box3table1{margin: 0 auto;margin-left: 10px;margin-top: 10px;text-align:left; border-spacing:3px 3px; }
  .box3table td{color:#18355a;}
  .box3table1 td{color:#18355a;}
  .th1{width:200px;font-size:15px;padding-top:15px;color:#fff;background:url(../../../public/html814_/image/BG1.png) no-repeat;text-align: left;}
  .span1{display:block;font-weight:bold;height:35px;margin-left:10px;font-size:15px;padding-top:15px;color:#fff;background:url(../../../public/html814_/image/BG2_yh.png) no-repeat;text-align: left;}
  .span2{display:block;font-weight:bold;height:35px;margin-left:10px;font-size:15px;padding-top:15px;color:#fff;background:url(../../../public/html814_/image/BG2_yh.png) no-repeat;text-align: left;}
  .span_jg1{display:block;font-weight:bold;height:35px;margin-left:10px;font-size:15px;padding-top:15px;color:#fff;background:url(../../../public/html814_/image/BG2_yhjg.png) no-repeat;text-align: left;}
  .span_jg2{display:block;font-weight:bold;height:35px;margin-left:10px;font-size:15px;padding-top:15px;color:#fff;background:url(../../../public/html814_/image/BG2_yhjg.png) no-repeat;text-align: left;}
  .th2{width:200px;font-size:15px;padding-top:15px;color:#fff;background:url(../../../public/html814_/image/BG1.png) no-repeat;text-align: left;}

  .tdthzf1{width:88px;font-size:14px;}
  .tdthzf2{width:82px;font-size:14px;}
  .tdthcp{width:130px;font-size:14px;}
  .tdthcp0{width:150px;font-size:14px;}
  .td1{text-align:right;}
</style>
