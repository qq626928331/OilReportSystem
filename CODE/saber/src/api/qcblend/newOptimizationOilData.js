import $ from "jquery";

export {
  getnewOilData
}

function getnewOilData(data_,tanks_num_value) {

  var key_matterpro = data_.key_matterpro;
  var matterpro = data_.matterpro;
  var blending = data_.blending;
  var yh_type = data_.yh_type;
  var th_fs = data_.th_fs;
  var total_num = data_.total_num;
  var zf_name = data_.zf_name==null?"产品标准":data_.zf_name;
  var p_type = data_.p_type;

   //1展现新油关键物性
   var tab2bodyStr = "" ;
   for(var key in key_matterpro){
     tab2bodyStr += "<tr><td>"+key+"</td><td>"+key_matterpro[key]+"</td></tr>" ;
   }
   var a = "#tab2";
   $(a).html("");
   $(a).html(tab2bodyStr);
  if(yh_type=='1'){//质量过剩最小
    if(th_fs=='1'){ //质量调合
      //2展现罐中调合比例
      var box3blbodyStr = "<tr><tr> <td class='tdthzf1'><strong>调合组分</strong></td><td class='tdthzf1'><strong>调合比例(%)</strong></td> <td class='tdthzf1'><strong>调合数量(吨)</strong></td><td class='tdthzf1'><strong>最小值(吨)</strong></td><td class='tdthzf1'><strong>最大值(吨)</strong></td></tr>" ;
      for(var ii=1;ii<blending.length+1 ; ii++){
        var div = "div1-"+tanks_num_value+"-"+ii;
        document.getElementById(div).style.display = "block" ;
        var input = "#input1-"+tanks_num_value+"-"+ii;
        $(input).attr("value",blending[ii-1].BLENDING_SCALE_F+'%');
        box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name+"</td><td>"+blending[ii-1].BLENDING_SCALE_F+"</td><td>"+blending[ii-1].blending_scale+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].num_upper+"</td></tr>" ;
      }

      var b = "#box3bl";
      $(b).html("");
      $(b).html(box3blbodyStr);

    }else if(th_fs=='2'){//比例调合
      var box3blbodyStr = "<tr><tr> <td class='tdthzf1'><strong>调合组分</strong></td><td class='tdthzf1'><strong>调合比例(%)</strong></td> <td class='tdthzf1'><strong>最小值(%)</strong></td><td class='tdthzf1'><strong>最大值(%)</strong></td></tr>" ;
      for(var ii=1;ii<blending.length+1 ; ii++){

        var div = "div1-"+tanks_num_value+"-"+ii;
        document.getElementById(div).style.display = "block" ;
        var input = "#input1-"+tanks_num_value+"-"+ii;
        $(input).attr("value",blending[ii-1].BLENDING_SCALE_F+'%');
        box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name_text+"</td><td>"+blending[ii-1].BLENDING_SCALE_F+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].num_upper+"</td></tr>" ;
      }

      var b = "#box3bl";
      $(b).html("");
      $(b).html(box3blbodyStr);
    }

    $("#box3").removeClass("box333"); //移除
    $("#box3").addClass("box3"); // 追加样式   加宽


    $("#span1").removeClass("span_jg1"); //移除
    $("#span1").addClass("span1"); // 追加样式   加宽

    $("#span2").removeClass("span_jg2"); //移除
    $("#span2").addClass("span2"); // 追加样式   加宽


  }else  if(yh_type=='2'){//效益最大
    if(th_fs=='1'){
      //2展现罐中调合比例
      var box3blbodyStr = "<tr><tr> <td class='tdthzf2'><strong>调合组分</strong></td><td class='tdthzf2'><strong>调合比例(%)</strong></td> <td class='tdthzf2'><strong>调合数量(吨)</strong></td><td class='tdthzf2'><strong>最小值(吨)</strong></td><td class='tdthzf2'><strong>最大值(吨)</strong></td><td class='tdthzf2'><strong>价格(元/吨)</strong></td></tr>" ;
      for(var ii=1;ii<blending.length+1 ; ii++){

        var div = "div1-"+tanks_num_value+"-"+ii;
        document.getElementById(div).style.display = "block" ;
        var input = "#input1-"+tanks_num_value+"-"+ii;
        $(input).attr("value",blending[ii-1].BLENDING_SCALE_F+'%');
        box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name_text+"</td><td>"+blending[ii-1].BLENDING_SCALE_F+"</td><td>"+blending[ii-1].blending_scale+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].num_upper+"</td><td>"+blending[ii-1].num_price+"</td></tr>" ;
      }


      var b = "#box3bl";
      $(b).html("");
      $(b).html(box3blbodyStr);


    }else if(th_fs=='2'){
      var box3blbodyStr = "<tr><tr> <td class='tdthzf1'><strong>调合组分</strong></td><td class='tdthzf1'><strong>调合比例(%)</strong></td> <td class='tdthzf1'><strong>最小值(%)</strong></td><td class='tdthzf1'><strong>最大值(%)</strong></td><td class='tdthzf1'><strong>价格(元/吨)</strong></td></tr>" ;
      for(var ii=1;ii<blending.length+1 ; ii++){

        var div = "div1-"+tanks_num_value+"-"+ii;
        document.getElementById(div).style.display = "block" ;
        var input = "#input1-"+tanks_num_value+"-"+ii;
        $(input).attr("value",blending[ii-1].BLENDING_SCALE_F+'%');
        box3blbodyStr += "<tr><td>"+blending[ii-1].tank_name_text+"</td><td>"+blending[ii-1].BLENDING_SCALE_F+"</td><td>"+blending[ii-1].num_lower+"</td><td>"+blending[ii-1].num_upper+"</td><td>"+blending[ii-1].num_price+"</td></tr>" ;
      }




      var b = "#box3bl";
      $(b).html("");
      $(b).html(box3blbodyStr);

    }

    $("#box3").removeClass("box3"); //移除
    $("#box3").addClass("box333"); // 追加样式   加宽


    $("#span1").removeClass("span1"); //移除
    $("#span1").addClass("span_jg1"); // 追加样式   加宽

    $("#span2").removeClass("span2"); //移除
    $("#span2").addClass("span_jg2"); // 追加样式   加宽

  }




  //3展现新油物性数据
  var box3oilbodyStr = "<tr> <td class='tdthcp0'><strong>物性名称</strong></td><td class='tdthcp'><strong>物性数据</strong></td> <td class='tdthcp'><strong>"+zf_name+"</strong></td></tr>" ;

  for(var ccc=1;ccc<matterpro.length+1 ; ccc++){
    var da = matterpro[ccc-1].data_value;
    var lo = matterpro[ccc-1].logic ;
    var dab = matterpro[ccc-1].value_ ;
    if(lo!=''&&lo!=null&&lo!=undefined){
      if(lo=='≤'){
        lo='<=';
      }else if(lo=='≥'){
        lo='>=';
      }else if(lo=='='){
        lo='==';
      }
      if(eval(da+lo+dab)){//满足 优化条件
        box3oilbodyStr += "<tr><td>"+matterpro[ccc-1].matterpro_name+"</td><td>"+matterpro[ccc-1].data_value+"</td><td>"+matterpro[ccc-1].logic+" "+matterpro[ccc-1].value_+"</td></tr>" ;
      }else{//不满足优化条件    物性值赋予红色
        box3oilbodyStr += "<tr><td>"+matterpro[ccc-1].matterpro_name+"</td><td><font color='red'>"+matterpro[ccc-1].data_value+"</font></td><td>"+matterpro[ccc-1].logic+" "+matterpro[ccc-1].value_+"</td></tr>" ;
      }


    }else{
      box3oilbodyStr += "<tr><td>"+matterpro[ccc-1].matterpro_name+"</td><td>"+matterpro[ccc-1].data_value+"</td><td>"+matterpro[ccc-1].logic+" "+matterpro[ccc-1].value_+"</td></tr>" ;


    }
  }

  var c = "#box3oil";
  $(c).html("");
  $(c).html(box3oilbodyStr);

  var oDiv = document.getElementById("kuangtu");
  oDiv.style.display = "block";
}
