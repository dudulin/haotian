<template>
  <div>
    <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
      <div class="row">
        <div style="display: inline-block;width: 28vw;">
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div class="titleTip">
          方便下次登陆 请设置下列登陆方式（选填）
        </div>
      </div>
      <div class="row">
        <div style="display: inline-block;width: 28vw;">
          <el-form-item class="marginLeft" prop="mailbox">
            <el-input placeholder="设置邮箱" v-model="form.mailbox" class="input-with-select" style="width: 100%;" @focus="onRadio('mailboxRadio')">
              <el-radio slot="suffix" v-model="form.radio" label="mailboxRadio"> </el-radio>
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div style="display: inline-block;width: 28vw;">
          <el-form-item class="marginLeft" prop="password">
            <el-input placeholder="设置密码" v-model="form.password" class="input-with-select" style="width: 100%;" @focus="onRadio1('passwordRadio')">
              <el-radio slot="suffix" v-model="form.radio" label="passwordRadio"> </el-radio>
            </el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="row">
      <el-button class="login-btn" type="primary">完成</el-button>
    </div>
  </div>
</template>

<script>
import pcHeader from "../../public/header.vue";
import footerPlus from "../../public/footer-plus.vue";
import axios from "axios";
// import qs from "qs";

export default {
  data() {
    return {
      form: {
        name: "",
        mailbox: '',
        radio: '',
        password: ''
      }
    };
  },
  created() {
    axios.get("/auth/v1/countries").then(res => {
      this.country = res.data;
    });
  },
  methods: {
    onRadio(item) {
      if (item) {
        this.form.radio = item
      }
      console.log(item)
    },
    onRadio1(item) {
      if (item) {
        this.form.radio = item
      }
      console.log(item)
    },
    loginGo() {
      this.userType = "登录";
      this.showLogin = true;
      let data = {
        country_code: this.countryCode,
        phone: this.username,
        captcha: this.captcha
      };
      this.$http.post("/auth/v1/phone-captcha-login", data).then(res => {
        if (res.status === 201) {
          this.$router.push({
            //核心语句
            path: "/" //跳转的路径
          });
        } else if (res.status === 400) {
          this.$message({
            message: "验证码错误",
            type: "error"
          });
        } else if (res.status === 404) {
          this.$message({
            message: "验证码已经过期",
            type: "error"
          });
        } else if (res.status === 410) {
          this.$message({
            message: "验证码错误次数太多",
            type: "error"
          });
        }
      });
    },
    showPrivacyClause() {
      // 隐私条款
      this.centerDialogVisible = true;
    },
    validateUsername() {
      if (!this.username) {
        if (
          (this.pageType === "1" && this.loginType === "3") ||
          (this.pageType === "2" && this.registerType === "2")
        ) {
          this.$message({
            message: "邮箱不能为空",
            type: "error"
          });
        } else {
          this.$message({
            message: "手机号不能为空",
            type: "error"
          });
        }
      }
    },
    // 切换登录方式更改提示文字
    handleChange(val) {
      if (this.pageType === "1") {
        if (val === "3") {
          this.loginPH = "请输入邮箱";
        } else {
          this.loginPH = "请输入手机号码";
        }
      } else {
        if (val === "2") {
          this.registerPH = "请输入邮箱";
        } else {
          this.registerPH = "请输入手机号码";
        }
      }
    },
    sendCode() {
      if (!this.username) {
        this.validateUsername();
        return;
      }
      if (this.pageType === "1") {
        axios
          .post(
            `/auth/v1/countries/${this.countryCode}/phones/${this.username}/phone-login-captcha`
          )
          .then(res => {
            if (res.status === 201) {
              if (res.data.captcha) {
                this.sendCodeDisabled = true;
                let num = 60;
                this.sendCodeText = `${num}秒重新发送`;
                let time = setInterval(() => {
                  num--;
                  this.sendCodeText = `${num}秒重新发送`;
                  if (num === 0) {
                    this.sendCodeDisabled = true;
                    this.sendCodeText = "重新发送";
                    clearInterval(time);
                  }
                }, 1000);
              }
            } else if (res.status === 429) {
              this.$message({
                message: "验证码请求过于频繁",
                type: "error"
              });
            } else {
              this.$message({
                message: "接口错误",
                type: "error"
              });
            }
          });
      } else {
        axios
          .post(
            `/auth/v1/countries/${this.countryCode}/phones/${this.username}/register-captcha`
          )
          .then(res => {
            if (res.data.captcha) {
              this.sendCodeDisabled = true;
              let num = 60;
              this.sendCodeText = `${num}秒重新发送`;
              let time = setInterval(() => {
                num--;
                this.sendCodeText = `${num}秒重新发送`;
                if (num === 0) {
                  this.sendCodeDisabled = true;
                  this.sendCodeText = "重新发送";
                  clearInterval(time);
                }
              }, 1000);
            }
          });
      }
    },
    usernameBlur() {
      if (this.username) {
        if (
          (this.pageType === "1" && this.loginType === "3") ||
          (this.pageType === "2" && this.registerType === "2")
        ) {
          let regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!regex.test(this.username)) {
            this.$message({
              message: "请输入正确的邮箱",
              type: "error"
            });
          }
        }
      } else {
        this.validateUsername();
      }
    },
    register() {
      let data = {
        country_code: this.countryCode,
        phone: this.username,
        captcha: this.captcha,
        language: "zh_CN",
        nickname: "Felix"
      };
      // data = qs.stringify(data)
      this.$http.post("/auth/v1/users", data).then(res => {
        if (res.status === 201) {
          this.$router.push({
            //核心语句
            path: "/" //跳转的路径
          });
        } else if (res.status === 400) {
          this.$message({
            message: "验证码错误",
            type: "error"
          });
        } else if (res.status === 404) {
          this.$message({
            message: "验证码已经过期",
            type: "error"
          });
        } else if (res.status === 410) {
          this.$message({
            message: "验证码错误次数太多",
            type: "error"
          });
        } else if (res.status === 409) {
          this.$message({
            message: "用户已注册",
            type: "error"
          });
        } else {
          this.$message({
            message: "接口错误",
            type: "error"
          });
        }
      });
    },
    login() {
      let data = {
        country_code: this.countryCode,
        phone: this.username,
        captcha: this.captcha
      };
      this.$http.post("/auth/v1/phone-captcha-login", data).then(res => {
        if (res.status === 201) {
          this.$router.push({
            //核心语句
            path: "/" //跳转的路径
          });
        } else if (res.status === 400) {
          this.$message({
            message: "验证码错误",
            type: "error"
          });
        } else if (res.status === 404) {
          this.$message({
            message: "验证码已经过期",
            type: "error"
          });
        } else if (res.status === 410) {
          this.$message({
            message: "验证码错误次数太多",
            type: "error"
          });
        }
      });
    }
  },
  components: {

  }
};
</script>

<style scoped lang="stylus">
.row {
  margin: 2vh 2vw;
  text-align: left;
  .titleTip {
    display: inline-block;
    width: 28vw;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    color: #222222;
  }
  .marginLeft>>>.el-radio {
    margin-right: 10px;
  }
  .marginLeft>>>.el-radio .el-radio__label {
    display: none;
  }
  .login-btn {
    padding: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: block;
    background: rgba(36, 142, 216, 1);
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 40px;
  }
}

.row>>>.el-form-item {
  margin-bottom: 0;
}

.row>>>.el-form-item .el-form-item__content {
  margin-left: 0 !important;
}

</style>
