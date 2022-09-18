import $ from "jquery";

export {
  rightdataReload
}

function rightdataReload(data_all,tanks_num_value) {
  //新油属性展示
  var key_matterpro = data_all.key_matterpro;//关键物性值
  var matterpro = data_all.matterpro;//物性值
  var blending = data_all.blending;//比率
  var yh_type = data_all.yh_type;//类型 1:质量调合 2：比例调和
  var th_fs = data_all.th_fs;//调合分组 1：质量过剩 2：经济最优
  var zf_name = data_all.zf_name==null?"产品标准":data_all.zf_name;

  //1展现新油关键物性
  var tab2bodyStr = "" ;
  for(var key in key_matterpro){
    tab2bodyStr += "<tr><td class=\"td1\">"+key+"</td><td >"+key_matterpro[key]+"</td></tr>" ;
  }
  var a = "#tab2";
  $(a).html("");
  console.log("========="+tab2bodyStr);
  $(a).html(tab2bodyStr);
  if(yh_type=='1'){//质量过剩最小
    if(th_fs=='1'){ // 质量过剩
      //2展现罐中调合比例
      var box3blbodyStr = "<tr><tr> <td class='tdthzf1'><strong>调合组分</strong></td><td class='tdthzf1'><strong>调合比例(%)</strong></td> <td class='tdthzf1'><strong>调合数量(吨)</strong></td><td class='tdthzf1'><strong>最小值(吨)</strong></td><td class='tdthzf1'><strong>最大值(吨)</strong></td></tr>" ;
      for(var ii=1;ii<blending.length+1 ; ii++){

        var div = "div1-"+tanks_num_value+"-"+ii;
        document.getElementById(div).style.display = "block" ;
        var input = "#input1-"+tanks_num_value+"-"+ii;
        var b_scalea = (blending[ii-1].BLENDING_SCALE*100).toFixed(2);
        $(input).attr("value",b_scalea+'%');//追加比率
        box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name+"</td><td>"+b_scalea+"</td><td>"+blending[ii-1].thsl+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].NUM_UPPER+"</td></tr>" ;
      }
      var b = "#box3bl";
      $(b).html("");
      $(b).html(box3blbodyStr);//具体比率值
    }else if(th_fs=='2')//经济最优
    // {
    //   var box3blbodyStr = "<tr><tr> <td class='tdthzf1'><strong>调合组分</strong></td><td class='tdthzf1'><strong>调合比例(%)</strong></td> <td class='tdthzf1'><strong>最小值(%)</strong></td><td class='tdthzf1'><strong>最大值(%)</strong></td></tr>" ;
    //   for(var ii=1;ii<blending.length+1 ; ii++){
    //     var div = "div1-"+tanks_num_value+"-"+ii;
    //     document.getElementById(div).style.display = "block" ;
    //     var input = "#input1-"+tanks_num_value+"-"+ii;
    //     var b_scalea = (blending[ii-1].BLENDING_SCALE*100).toFixed(2);
    //     $(input).attr("value",b_scalea+'%');//追加比率
    //     box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name+"</td><td>"+b_scalea+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].NUM_UPPER+"</td></tr>" ;
    //   }
    //   var b = "#box3bl";
    //   $(b).html("");
    //   $(b).html(box3blbodyStr);
    // }
      {
        //2展现罐中调合比例
        var box3blbodyStr = "<tr><tr> <td class='tdthzf2'><strong>调合组分</strong></td><td class='tdthzf2'><strong>调合比例(%)</strong></td> <td class='tdthzf2'><strong>调合数量(吨)</strong></td><td class='tdthzf2'><strong>最小值(吨)</strong></td><td class='tdthzf2'><strong>最大值(吨)</strong></td><td class='tdthzf2'><strong>价格(元/吨)</strong></td></tr>" ;
        for(var ii=1;ii<blending.length+1 ; ii++){
          var div = "div1-"+tanks_num_value+"-"+ii;
          document.getElementById(div).style.display = "block" ;
          var input = "#input1-"+tanks_num_value+"-"+ii;
          var b_scalea = (blending[ii-1].BLENDING_SCALE*100).toFixed(2);
          $(input).attr("value",b_scalea+'%');//追加比率
          box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name+"</td><td>"+b_scalea+"</td><td>"+blending[ii-1].thsl+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].NUM_UPPER+"</td><td>"+blending[ii-1].NUM_PRICE+"</td></tr>" ;
        }
        $("#box3").removeClass("box3"); //移除
        $("#box3").addClass("box333"); // 追加样式   加宽
        var b = "#box3bl";
        $(b).html("");
        $(b).html(box3blbodyStr);
      }
  }else  if(yh_type=='2'){//效益最大
    if(th_fs=='1'){
      //2展现罐中调合比例
      var box3blbodyStr = "<tr><tr> <td class='tdthzf2'><strong>调合组分</strong></td><td class='tdthzf2'><strong>调合比例(%)</strong></td> <td class='tdthzf2'><strong>调合数量(吨)</strong></td><td class='tdthzf2'><strong>最小值(吨)</strong></td><td class='tdthzf2'><strong>最大值(吨)</strong></td><td class='tdthzf2'><strong>价格(元/吨)</strong></td></tr>" ;
      for(var ii=1;ii<blending.length+1 ; ii++){
        var div = "div1-"+tanks_num_value+"-"+ii;
        document.getElementById(div).style.display = "block" ;
        var input = "#input1-"+tanks_num_value+"-"+ii;
        var b_scalea = (blending[ii-1].BLENDING_SCALE*100).toFixed(2);
        $(input).attr("value",b_scalea+'%');//追加比率
        box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name+"</td><td>"+b_scalea+"</td><td>"+blending[ii-1].thsl+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].NUM_UPPER+"</td><td>"+blending[ii-1].NUM_PRICE+"</td></tr>" ;
      }
      $("#box3").removeClass("box3"); //移除
      $("#box3").addClass("box333"); // 追加样式   加宽
      var b = "#box3bl";
      $(b).html("");
      $(b).html(box3blbodyStr);
    }else if(th_fs=='2'){
      var box3blbodyStr = "<tr><tr> <td class='tdthzf1'><strong>调合组分</strong></td><td class='tdthzf1'><strong>调合比例(%)</strong></td> <td class='tdthzf1'><strong>最小值(%)</strong></td><td class='tdthzf1'><strong>最大值(%)</strong></td><td class='tdthzf1'><strong>价格(元/吨)</strong></td></tr>" ;
      for(var ii=1;ii<blending.length+1 ; ii++){
        var div = "div1-"+tanks_num_value+"-"+ii;
        document.getElementById(div).style.display = "block" ;
        var input = "#input1-"+tanks_num_value+"-"+ii;
        var b_scalea = (blending[ii-1].BLENDING_SCALE*100).toFixed(2);
        $(input).attr("value",b_scalea+'%');//追加比率
        box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name+"</td><td>"+b_scalea+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].NUM_UPPER+"</td><td>"+blending[ii-1].NUM_PRICE+"</td></tr>" ;
      }
      var b = "#box3bl";
      $(b).html("");
      $(b).html(box3blbodyStr);
    }
  }




  //3展现新油物性数据
  var box3oilbodyStr = "<tr> <td class='tdthcp0'><strong>物性名称</strong></td><td class='tdthcp'><strong>物性数据</strong></td> <td class='tdthcp'><strong>"+zf_name+"</strong></td></tr>" ;

  for(var ccc=1;ccc<matterpro.length+1 ; ccc++){
    var da = matterpro[ccc-1].data_value;
    var lo = matterpro[ccc-1].LOGICAL_SIGN ;
    var dab = ""
    if (matterpro[ccc-1].value_!=undefined){
      dab = matterpro[ccc-1].value_ ;
    }
    if(lo!=''&&lo!=null&&lo!=undefined){
      if(lo=='≤'){
        lo='<=';
      }else if(lo=='≥'){
        lo='>=';
      }
      if(eval(da+lo+dab)){//满足 优化条件
        box3oilbodyStr += "<tr><td>"+matterpro[ccc-1].matterpro_name+"</td><td>"+matterpro[ccc-1].data_value+"</td><td>"+matterpro[ccc-1].LOGICAL_SIGN+" "+matterpro[ccc-1].value_+"</td></tr>" ;
      }else{//不满足优化条件    物性值赋予红色
        box3oilbodyStr += "<tr><td>"+matterpro[ccc-1].matterpro_name+"</td><td><font color='red'>"+matterpro[ccc-1].data_value+"</font></td><td>"+matterpro[ccc-1].LOGICAL_SIGN+" "+matterpro[ccc-1].value_+"</td></tr>" ;
      }
    }else{
      box3oilbodyStr += "<tr><td>"+matterpro[ccc-1].matterpro_name+"</td><td>"+matterpro[ccc-1].data_value+"</td><td>"+matterpro[ccc-1].LOGICAL_SIGN+" "+dab+"</td></tr>" ;


    }


  }

  var c = "#box3oil";
  $(c).html("");
  $(c).html(box3oilbodyStr);

  var oDiv = document.getElementById("kuangtu");
  oDiv.style.display = "block";

  let dom = document.getElementsByClassName('box3tablediv')[0]
  dom.style.display = "block";
}
