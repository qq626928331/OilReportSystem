//系统中可用区域高度
const topHeight = 64;

const defaultHeight = window.innerHeight - 64 - 40 - 20;
//是否为小屏  1366 true   1920  flase
const isSmall = document.body.clientWidth;

export default {
  topHeight,
  defaultHeight,
  isSmall
}

export function errorMsgbox(obj,msg) {
  const h = obj.$createElement;
  if(!msg){
    return
  }else if(msg == '当前账号已在异地登录,如非本人操作,请修改密码'){
    return
  }else {
    obj.$msgbox({
      title: '错误',
      message: h('p', null, [
        h('span', {style: 'color: red'}, msg )
      ]),
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          done();
        } else {
          done();
        }
      }
    });
  }

}

