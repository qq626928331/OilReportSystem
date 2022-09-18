//手机号校验
const VERIFY_PASSWORD = (rule, value, callback)=>{
  var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
  var val=value.replace(/^\s+|\s+$/g,"");
  if (!reg.test(val)&&val!=='') {
    callback(new Error('手机号格式有误'));
  }else {
    callback();
  }
};
//邮箱校验
const VERIFY_EMAIL = (rule, value, callback)=>{
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  var val=value.replace(/^\s+|\s+$/g,"");
  if (!reg.test(val)&&val!=='') {
    callback(new Error('邮箱格式有误'));
  }else {
    callback();
  }
};

// //新密码和原密码校验
// const AFFIM_PASSWORD = (rule, value, callback)=>{
//   var val=value.replace(/^\s+|\s+$/g,"");
//   if (val!==this.form.newPassword) {
//     callback(new Error('两次密码一致'));
//   }else if(val===''){
//     callback(new Error('请确认新密码'));
//   }else {
//     callback();
//   }
// };
// //新旧密码校验
// const NEW_PASSWORD = (rule, value, callback)=>{
//   var val=value.replace(/^\s+|\s+$/g,"");
//   if (val===this.form.oldPassword) {
//     callback(new Error('新旧密码一致,请重新输入'));
//   }else if(val===''){
//     callback(new Error('请输入新密码'));
//   } else {
//     callback();
//   }
// };

export default {
  tabs: true,
  tabsActive: 1,
  group: [
    {
      label: '个人信息',
      prop: 'info',
      column: [  {
        label: '用户名',
        span: 12,
        row: true,
        prop: 'account',
        disabled: true
      }, {
        label: '姓名',
        span: 12,
        row: true,
        prop: 'realName',
        rules: [{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        }]
      },{
        label: '手机号',
        span: 12,
        row: true,
        prop: 'phone',
        rules: [{ validator: VERIFY_PASSWORD, trigger: 'blur',required: false }]
      }, {
        label: '邮箱',
        prop: 'email',
        span: 12,
        row: true,
        rules: [{ validator: VERIFY_EMAIL, trigger: 'blur' }]
      }]
    },
  ],
}


// {
//   label: '修改密码',
//     prop: 'password',
//   column: [{
//   label: '用户名',
//   span: 12,
//   row: true,
//   prop: 'account',
//   disabled: true
// },{
//   label: '原密码',
//   span: 12,
//   row: true,
//   type: 'password',
//   prop: 'oldPassword',
// }, {
//   label: '新密码',
//   span: 12,
//   row: true,
//   type: 'password',
//   prop: 'newPassword',
//   // rules: [{ validator: NEW_PASSWORD, trigger: 'blur' }]
// }, {
//   label: '确认密码',
//   span: 12,
//   row: true,
//   type: 'password',
//   prop: 'newPassword1'
// }]
// }
