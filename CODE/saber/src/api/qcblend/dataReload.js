import $ from "jquery";

export {
  reloadData
}

function reloadData(tankinfo_temp,tanks_num_value){
  // debugger;
  let dom = document.getElementsByClassName('tabletype')
  let dom2 =document.getElementsByClassName('tabletype01')[0]
  let inpdom = document.getElementsByClassName('box1-2-2-1')
  // console.log(inpdom)
  // console.log(tankinfo_temp)
  if (!tankinfo_temp){
    for(let i = 0;i<dom.length;i++){
      dom[i].style.display = 'none';
    }
    inpdom[0].style.display= 'none'
    inpdom[1].style.display= 'none'
    dom2.style.display= 'none'
  }else {
    for(let i = 0;i<dom.length;i++){
      dom[i].style.display = 'block';
    }
    inpdom[0].style.display= 'none'
    inpdom[1].style.display= 'none'
    dom2.style.display= 'block'
    var d = [] ;
    for(var i=0;i<tankinfo_temp.length;i++){
      var matterpro_code1=  tankinfo_temp[i].matterpro_name_1;
      var v1=  tankinfo_temp[i].v1;
      var matterpro_code2=  tankinfo_temp[i].matterpro_name_2;
      var v2=  tankinfo_temp[i].v2;
      var matterpro_code3=  tankinfo_temp[i].matterpro_name_3;
      var v3=  tankinfo_temp[i].v3;
      var tank_code=  tankinfo_temp[i].tank_code;
      var blending_scale=  tankinfo_temp[i].blending_scale; //调合比例
      var blending_scale_=  tankinfo_temp[i].blending_scale_f; //调合比例

      var tank_name=tankinfo_temp[i].tank_name;//罐名称

      var a = "";
      if(v1==-1){
        a = "<tr ><td class='td1' >"+matterpro_code1+"</td><td ></td></tr>";
      }else{
        a = "<tr ><td class='td1' >"+matterpro_code1+"</td><td >"+v1+"</td></tr>";
      }
      if(v2==-1){
        a = a + "<tr ><td class='td1' >"+matterpro_code2+"</td><td ></td></tr>";
      }else{
        a = a + "<tr ><td class='td1' >"+matterpro_code2+"</td><td >"+v2+"</td></tr>";
      }
      if(v3==-1){
        a = a+ "<tr ><td class='td1' >"+matterpro_code3+"</td><td ></td></tr>";
      }else{
        a = a + "<tr ><td class='td1' >"+matterpro_code3+"</td><td >"+v3+"</td></tr>";
      }
      var tbodyStr = a;

      var data_ = {blending_scale:blending_scale,tbodyStr:tbodyStr};
      d.push(data_);

      if(tank_name==null||tank_name=='null'||tank_name==undefined){
        tank_name='';
      }

      if(tank_code=='0'){
        var a = "#tab2";
        $(a).html("");
        $(a).html(tbodyStr);

        var b="[name='datong']"; //获取大桶罐ID
        $(b).find('span').remove();
        $(b).append("<span style=\"text-align:center;display:block;position: relative;top: -50px; \"><font color=\"white\">"+tank_name+"</font></span> ");


      }else{
        var a = "#tab1-"+tanks_num_value+"-"+tank_code;
        $(a).html("");
        $(a).html(tbodyStr);

        if(blending_scale_!=null&&blending_scale_!=''&&blending_scale_!=undefined){
          var div = "div1-"+tanks_num_value+"-"+tank_code;
          document.getElementById(div).style.display = "block" ;
          var input = "#input1-"+tanks_num_value+"-"+tank_code;
          $(input).attr("value",blending_scale_+'%' );
        }


        //var b="#tong-"+tanks_num_value+"-"+tank_code;  //获取每个小桶罐ID
        var b="[name='tong"+tank_code+"']";
        $(b).find('span').remove();

        $(b).append("<span style=\"text-align:center;display:block;position: relative;top: -30px;\"><font color=\"white\">"+tank_name+"</font></span> ");
      }
    }

    if (tankinfo_temp.length===0){

    }
  }


}
