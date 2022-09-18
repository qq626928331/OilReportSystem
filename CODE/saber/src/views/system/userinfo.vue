<template>
  <div>
    <basic-container>
      <avue-form :option="option"
                 v-model="form"
                 @tab-click="handleTabClick"
                 @reset-change="emptytChange"
                 @submit="handleSubmit">
      </avue-form>
    </basic-container>
  </div>
</template>

<script>
  import option from "@/const/user/info";
  import {getUserInfo, updateInfo, updatePassword} from "@/api/system/user";
  import md5 from 'js-md5';
  import func from "@/util/func";
  import {errorMsgbox} from "@/api/global_variable";


  export default {
    data() {

      return {
        index: 0,
        form:{},
        option:option,
        userId:''
      };
    },
    created() {
      this.handleWitch();
    },
    methods: {
      handleSubmit(form, done) {
        console.log(this.form,'提交时form')
        // if (this.index === 0) {
        //   console.log(form,'个人信息')
          updateInfo(this.form).then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改信息成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
            done();
          }, error => {
            window.console.log(error);
            done();
          })
        // } else {
        //   console.log(form,'修改密码')
        //   updatePassword(md5(form.oldPassword), md5(form.newPassword), md5(form.newPassword1)).then(res => {
        //     if (res.data.success) {
        //       this.$message({
        //         type: "success",
        //         message: res.data.msg
        //       });
        //     } else {
        //       this.$message({
        //         type: "error",
        //         message: res.data.msg
        //       });
        //     }
        //     done();
        //   }, error => {
        //     window.console.log(error);
        //     done();
        //   })
        // }
      },
      handleWitch() {
        // if (this.index === 0) {
          getUserInfo().then(res => {
            if (res.data.code != 200){
              let that = this;
              errorMsgbox(that, res.data.msg);
            }
            const user = res.data.data;
            this.userId = user.id
            this.form = {
              id: user.id,
              avatar: user.avatar,
              account: user.account,
              realName: user.realName,
              phone: user.phone,
              email: user.email,
            }
          });
        // }
      },
      emptytChange(){
        this.form.email =''
        this.form.phone=''
        this.form.realName=''
        getUserInfo().then(res => {
          if (res.data.code != 200){
            let that = this;
            errorMsgbox(that, res.data.msg);
          }
          this.form.account = res.data.data.account;

this.form.id = this.userId
          console.log(this.form,'清空后form')
          // console.log(this.option,'清空后')
        });
      },
      tip(){

      },
      handleTabClick(tabs) {
        // this.index = func.toInt(tabs.index);
        this.handleWitch();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 18px !important;
  }


</style>
