import $ from "jquery";

export {
  leftdataReload
}
 function leftdataReload(tankinfo_temp,tanks_num_value) {
   let dom = document.getElementsByClassName('tabletype')
   let dom2 =document.getElementsByClassName('tabletype01')[0]
   let inpdom = document.getElementsByClassName('box1-2-2-1')
   // console.log(inpdom)
   // console.log(tankinfo_temp)
   if (!tankinfo_temp){
     for(let i = 0 ; i<=dom.length-1;i++){
       dom[i].style.display= 'none'
     }
    //  dom.forEach(item=>{
    //    item.style.display= 'none'
    //  })
     inpdom[0].style.display= 'none'
     inpdom[1].style.display= 'none'
     dom2.style.display= 'none'
   }else {
    for(let i = 0 ; i<=dom.length-1;i++){
      dom[i].style.display= 'block'
    }
    //  dom.forEach(item=>{
    //    item.style.display= 'block'
    //  })
     inpdom[0].style.display= 'none'
     inpdom[1].style.display= 'none'
     dom2.style.display= 'block'
     var d = [] ;
     for(var i=0;i<tankinfo_temp.length;i++) {
       var matterpro_code1 = tankinfo_temp[i].matterpro_name_1;
       var v1 = tankinfo_temp[i].v1;
       var logical_sign1 = tankinfo_temp[i].logical_sign1;
       var matterpro_code2 = tankinfo_temp[i].matterpro_name_2;
       var v2 = tankinfo_temp[i].v2;
       var logical_sign2 = tankinfo_temp[i].logical_sign2;
       var matterpro_code3 = tankinfo_temp[i].matterpro_name_3;
       var v3 = tankinfo_temp[i].v3;
       var logical_sign3 = tankinfo_temp[i].logical_sign3;
       var tank_code = tankinfo_temp[i].tank_code;
       var tank_name = tankinfo_temp[i].tank_name; //罐名称
       if (tank_name == null || tank_name == 'null' || tank_name == undefined) {
         tank_name = '';
       }
       //var zf_name = tankinfo_temp[i].zf_name; //组分名称
       //var num_lower = tankinfo_temp[i].num_lower; //数量下限
       //var num_upper = tankinfo_temp[i].num_upper; //数量上限
       //var num_price = tankinfo_temp[i].num_price; //价格
       var tbodyStr = "";
       if (tank_code === '0') {
         var a = "";
         if(v1==-1){
           a = "<tr ><td class='td1' >"+matterpro_code1+"</td><td ></td></tr>";
         }else{
           a = "<tr ><td class='td1' >"+matterpro_code1+"</td><td >"+ logical_sign1 + v1 +"</td></tr>";
         }
         if(v2==-1){
           a = a + "<tr ><td class='td1' >"+matterpro_code2+"</td><td ></td></tr>";
         }else{
           a = a + "<tr ><td class='td1' >"+matterpro_code2+"</td><td >"+ logical_sign2 + v2 +"</td></tr>";
         }
         if(v3==-1){
           a = a + "<tr ><td class='td1' >"+matterpro_code3+"</td><td ></td></tr>";
         }else{
           a = a + "<tr ><td class='td1' >"+matterpro_code3+"</td><td >"+ logical_sign3 + v3 +"</td></tr>";
         }
         tbodyStr = a;
         var aa = "#tab2";
         $(aa).html("");
         $(aa).html(tbodyStr);

         var b = "[name='datong']"; //获取大桶罐ID
         $(b).find('span').remove();
         $(b).append("<span style=\"text-align:center;display:block;position: relative;top: -50px;\"><font color=\"white\">" + tank_name + "</font></span> ");

       } else {
         var b = "";
         if(v1==-1){
           b = "<tr ><td class='td1' >"+matterpro_code1+"</td><td ></td></tr>";
         }else{
           b = "<tr ><td class='td1' >"+matterpro_code1+"</td><td >"+ logical_sign1 + v1 +"</td></tr>";
         }
         if(v2==-1){
           b = b + "<tr ><td class='td1' >"+matterpro_code2+"</td><td ></td></tr>";
         }else{
           b = b + "<tr ><td class='td1' >"+matterpro_code2+"</td><td >"+ logical_sign2 + v2 +"</td></tr>";
         }
         if(v3==-1){
           b = b+ "<tr ><td class='td1' >"+matterpro_code3+"</td><td ></td></tr>";
         }else{
           b = b + "<tr ><td class='td1' >"+matterpro_code3+"</td><td >"+ logical_sign3 + v3 +"</td></tr>";
         }
         tbodyStr = b;
         var a = "#tab1-" + tanks_num_value + "-" + tank_code;
         $(a).html("");
         $(a).html(tbodyStr);

         var b = "[name='tong" + tank_code + "']";  //获取每个小桶罐ID
         $(b).find('span').remove();
         $(b).append("<span style=\"text-align:center;display:block;position: relative;top: -30px;\"><font color=\"white\">" + tank_name + "</font></span> ");

       }

       //var data_ = {tank_name:tank_name,zf_name:zf_name,num_lower:num_lower,num_upper:num_upper,num_price:num_price,tank_code:tank_code,tbodyStr:tbodyStr};
       var data_ = {tank_code: tank_code, tbodyStr: tbodyStr};
       d.push(data_);
     }
   }



}
