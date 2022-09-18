<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
 <!--   <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.tenantId"
                auto-complete="off"
                :placeholder="$t('login.tenantId')">
        <i slot="prefix" class="icon-quanxian"/>
      </el-input>
    </el-form-item>-->
    <el-form-item prop="username" style='border: 1px solid #969696; border-radius: 22px;height: 38px;margin-bottom: 20px;'>
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.username"
                auto-complete="off"
                :placeholder="$t('login.username')">
        <i slot="prefix" class="icon-yonghu"/>
      </el-input>
    </el-form-item>
    <el-form-item prop="password" style='border: 1px solid #969696; border-radius: 22px; height: 38px;'>
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                :placeholder="$t('login.password')">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"/>
        <i slot="prefix" class="icon-mima"/>
      </el-input>
    </el-form-item>
    <el-form-item  v-show='false' v-if="this.website.captchaMode" prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.code"
                    auto-complete="off"
                    :placeholder="$t('login.code')">
            <i slot="prefix" class="icon-yanzhengma"/>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img :src="loginForm.image" class="login-code-img" @click="refreshCode"
            />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin" round style="width: 45%; background-color: #2882fe; color: #fff;margin-right: 6%;"
                 class="login-submit">{{$t('login.submit')}}
      </el-button>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleReset" round  style="width: 45%;background: none;"
                 class="login-submit">{{$t('login.reset')}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {mapGetters} from "vuex";
  import {info} from "@/api/system/tenant";
  import {getCaptcha} from "@/api/user";
  import {getTopUrl} from "@/util/util";

  export default {
    name: "userlogin",
    data() {
      return {
        tenantMode: this.website.tenantMode,
        loginForm: {
          //租户ID
          tenantId: "000000",
          //用户名
          username: "",
          //密码
          password: "",
          //账号类型
          type: "account",
          //验证码的值
          code: "",
          //验证码的索引
          key: "",
          //预加载白色背景
          image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        },
        loginRules: {
          tenantId: [
            {required: false, message: "请输入租户ID", trigger: "blur"}
          ],
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {min: 1, message: "密码长度最少为6位", trigger: "blur"}
          ]
        },
        passwordType: "password"
      };
    },
    created() {
      this.getTenant();
      this.refreshCode();
    },
    mounted() {
    },
    computed: {
      ...mapGetters(["tagWel"])
    },
    props: [],
    methods: {
      refreshCode() {
        getCaptcha().then(res => {
          console.log(res,'asdsad')
          const data = res.data;
          this.loginForm.key = data.key;
          this.loginForm.image = data.image;
        })
      },
      showPassword() {
        this.passwordType === ""
          ? (this.passwordType = "password")
          : (this.passwordType = "");
      },
      //重置
      handleReset(){
        this.loginForm.username='';
        this.loginForm.password='';
        this.loginForm.code='';
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '登录中,请稍后。。。',
              spinner: "el-icon-loading"
            });
            this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
              this.$router.push({path: this.tagWel.value});
              loading.close();
            }).catch(() => {
              loading.close();
              this.refreshCode();
            });
          }
        });
      },
      getTenant() {
        let domain = getTopUrl();
        // 临时指定域名，方便测试
        //domain = "https://bladex.vip";
        info(domain).then(res => {
          const data = res.data;
          if (data.success && data.data.tenantId) {
            this.tenantMode = false;
            this.loginForm.tenantId = data.data.tenantId;
            this.$parent.$refs.login.style.backgroundImage = `url(${data.data.backgroundUrl})`;
          }
        })
      }
    }
  };
</script>

<style scoped>


  /deep/ .el-form-item__content {
           line-height: 34px;
         }
  /deep/ .el-button--primary.is-active, .el-button--primary:active {
    color: #409EFF;
  }
  /deep/ .el-button--primary.is-active, .el-button--primary:hover {
           color: #409EFF;
         }
  /deep/.el-button--primary:focus {
          color: #409EFF;
        }
</style>
