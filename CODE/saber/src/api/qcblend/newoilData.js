import $ from "jquery";

export {
  getnewOilData
}


function getnewOilData(data_) {
  var isSelect = data_.isAlloilid ;

  var key_matterpro = data_.key_matterpro;
  var matterpro = data_.matterpro;
  var blending = data_.blending;
  //1展现新油关键物性
  var tab2bodyStr = "" ;
  for(var key in key_matterpro){
    tab2bodyStr += "<tr><td class='td1'>"+key+"</td><td>"+key_matterpro[key]+"</td></tr>" ;
  }
  var a = "#tab2";
  $(a).html("");
  $(a).html(tab2bodyStr);

  //2展现罐中调合比例
  var box3blbodyStr = "<tr> <td class='tdthzf1'><strong>组分名称<strong></td><td  class='tdthzf1'><strong>调合比例(%)<strong></td><td  class='tdthzf1'><strong>调合数量(吨)<strong></td> </tr>" ;
  for(var i=0 ; i<blending.length ; i++){
    box3blbodyStr += "<tr><td>"+blending[i].tank_name+"</td><td>"+blending[i].BLENDING_SCALE_F+"</td><td>"+blending[i].blending_scale+"</td></tr>" ;
  }
  var b = "#box3bl";
  $(b).html("");
  $(b).html(box3blbodyStr);

  //3展现新油物性数据
  var box3oilbodyStr = "<tr> <td  class='tdthcp0'><strong>物性名称<strong></td><td  class='tdthcp'><strong>物性数据<strong></td> </tr>" ;
  for(var key in matterpro){
    box3oilbodyStr += "<tr><td >"+key+"</td><td>"+matterpro[key]+"</td></tr>" ;
  }
  var c = "#box3oil";
  $(c).html("");
  $(c).html(box3oilbodyStr);

  var oDiv = document.getElementById("kuangtu");
  oDiv.style.display = "none";
  $(".kuangtu").fadeIn(1000);

  //模拟切割结果展现
  var oDiv2 = document.getElementById("zhuangzhi");
  oDiv2.style.display = "none";
  // debugger

  let dom = document.getElementsByClassName('box3tablediv')[0]
  console.log(dom,'dom')
  dom.style.display = "block";

}
