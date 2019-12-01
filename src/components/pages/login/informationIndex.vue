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
        <div style="display: inline-block;width: 28vw;text-align: center;font-weight: bold;font-size: 18px;color: #222222;">
          方便下次登陆 请设置下列登陆方式（选填）
        </div>
      </div>
      <div class="row">
        <div style="display: inline-block;width: 28vw;">
          <el-form-item class="marginLeft" prop="username">
            <el-input
              placeholder="设置邮箱"
              v-model="form.email"
              class="input-with-select"
              style="width: 100%;"
            >
            <el-radio slot="suffix" v-model="form.radio" label="emill"> </el-radio>
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <div style="display: inline-block;width: 28vw;">
          <el-form-item class="marginLeft" prop="username">
            <el-input
              placeholder="设置密码"
              v-model="form.email1"
              class="input-with-select"
              style="width: 100%;"
            >
            <el-radio slot="suffix" v-model="form.radio" label="proww"> </el-radio>
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
        email: '',
        radio: '',
        email1: ''
      }
    };
  },
  created() {
    axios.get("/auth/v1/countries").then(res => {
      this.country = res.data;
    });
  },
  methods: {
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
    pcHeader,
    footerPlus
  }
};
</script>

<style scoped lang="stylus">
#loginView {
  width: 100%;
  height: 100%;
  background: url('./img/bg.png');
  background-size: cover;
  overflow: hidden;

  .padding-box {
    height: 350px;
    width: 100%;
    background: rgba(36, 142, 216, 0.2);
    position: absolute;
    bottom: 0;
    border-top: 2px solid rgba(244, 244, 244, 0.4);
  }

  .privacyClauseCon>>>.el-dialog__header {
    padding-top: 35px;
    padding-bottom: 32px;

    .el-dialog__title {
      font-size: 30px;
    }
  }

  .privacyClauseCon>>>.el-dialog__body {
    height: 423px;
    padding: 40px 60px;
    overflow: hidden;
    border-top: 2px solid #EDEDED;

    .privacyClauseTitle {
      color: #222222;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 18px;
    }

    .privacyClauseValue {
      color: #999999;
      font-size: 16px;
      margin-bottom: 28px;
      padding-right: 36px;
    }
  }

  .privacyClauseCon {
    .privacyClauseText {
      height: 423px;
      overflow-y: auto;
    }

    .privacyClauseText::-webkit-scrollbar {
      width: 4px;
      height: 1px;
    }

    .privacyClauseText::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #999999;
    }

    .privacyClauseText::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }
  }

  .regionChoiceCon>>>.el-dialog__header {
    padding-top: 35px;
    padding-bottom: 32px;

    .el-dialog__title {
      font-size: 30px;
    }
  }

  .regionChoiceCon>>>.el-dialog__body {
    height: 423px;
    padding: 40px 60px;
    overflow: hidden;
    border-top: 2px solid #EDEDED;

    .regionChoiceInput .el-input--suffix .el-input__inner {
      height: 60px;
      background: #F3F6F9;
    }

    .regionChoiceInput .el-input__suffix {
      margin-right: 15px;
    }

    .regionChoiceInput .el-input__icon {
      font-size: 20px;
    }

    .regionChoiceABC {
      margin-top: 28px;
      font-size: 16px;
      display: flex;
      padding-bottom: 15px;
      border-bottom: 1px solid #DDDDDD;

      .ABC {
        margin: 0 auto;
        cursor: pointer;

        &.isActive {
          color: #007FD7;
        }
      }
    }

    .regionChoiceClick {
      margin-top: 25px;
      height: 280px;
      overflow-y: auto;

      .clickDiv {
        display: inline-block;
        width: 50%;
        font-size: 22px;
        margin-bottom: 15px;
        cursor: pointer;

        .countryZh {
          color: #222222;
        }

        .countryCode {
          color: #999999;
          float: right;
          margin-right: 50px;
        }
      }

      .clickDiv:hover {
        .countryZh {
          color: #007FD7;
        }

        .countryCode {
          color: #007FD7;
        }
      }
    }

    .regionChoiceClick::-webkit-scrollbar {
      width: 4px;
      height: 1px;
    }

    .regionChoiceClick::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #999999;
    }

    .regionChoiceClick::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #ededed;
    }
  }

  .content {
    .headline {
      margin-top: 100px;
      font-size: 40px;
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 52px;
    }

    .text {
      font-size: 20px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
    }

    .login-box {
      width: 32vw;
      /* height: 40vh */
      background: #fff;
      border-radius: 10px;
      margin: 0 auto;
      margin-top: 2vh;
      overflow: hidden;
      position: relative;
      z-index: 200;

      .loginArea-box {
        border-top: 2px solid #E5E5E5;
        width: 28vw;
        margin: auto;

        .loginArea {
          color: #BBBBBB;
          display: inline-block;
          padding: 0 2px;
          cursor: pointer;
          width: 140px;
          margin-left: -43px;

          &.is-active {
            font-weight: 700;
            color: #007FD7;

            span {
              border-top: 2px solid #007FD7;
            }
          }
        }
      }

      .row {
        margin: 2vh 2vw;
        text-align: left;

        .el-select {
          width: 180px;
        }

        .phoneLogin>>>.input-with-select .el-input-group__prepend {
          background-color: #fff;
        }

        .phoneLogin>>>.input-with-select .el-input__inner:first-child {
          padding-left: 30px;
        }

        .phoneLogin>>>.input-with-select .el-input__inner {
          padding-left: 45px;
        }

        .resend {
          padding: 0;
          width: 6vw;
          border: 2px solid rgba(102, 102, 102, 0.2);
          text-align: center;
          line-height: 40px;
          display: inline-block;
          height: 40px;
          box-sizing: border-box;
          float: right;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(34, 34, 34, 1);
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
          margin-bottom: 30px;
        }
      }

      .row>>>.el-form-item {
        margin-bottom: 0;
      }

      .row>>>.el-form-item .el-form-item__content {
        margin-left: 0 !important;
      }

      .tab-title {
        text-align: center;
        margin-top: 2vh;

        // padding: 2vh;
        .type {
          display: inline-block;
          font-size: 20px;
          font-family: PingFangSC;
          font-weight: bold;
          color: #007FD7;

          &.is-active {
            font-weight: 500;
            color: #007FD7;
          }
        }
      }
    }
  }
}
</style>
