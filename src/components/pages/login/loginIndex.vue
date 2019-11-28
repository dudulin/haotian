<template>
  <div>
    <div class="loginArea-box">
      <div
        class="loginArea"
        style="width: 140px;margin-left: -14px;margin-right: 15px;"
        @click="loginMode('phoneCode')"
        :class="pageType === '1' ? 'is-active': ''"
      >
        <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">手机号+验证码登录</span>
      </div>
      <div
        class="loginArea"
        style="margin: 0px 44px;"
        @click="loginMode('phonePassword')"
        :class="pageType === '2' ? 'is-active': ''"
      >
        <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">手机号+密码登录</span>
      </div>
      <div
        class="loginArea"
        style="width: 111px;margin-right: -15px;margin-left: 38px;"
        @click="loginMode('mailboxPassword')"
        :class="pageType === '3' ? 'is-active': ''"
      >
        <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">邮箱+密码登录</span>
      </div>
      <!-- <span class="type" @click="() => pageType='1'" :class="pageType === '1' ? 'is-active': ''">登录</span>
      <span class="type" @click="() => pageType='2'" :class="pageType === '2' ? 'is-active': ''">注册</span>-->
    </div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="row" v-if="pageType === '1' || pageType === '2'">
        <div class="phoneLogin" style="display: inline-block;width: 28vw;">
          <el-form-item class="marginLeft" prop="username">
            <el-input
              :placeholder="loginPH"
              v-model="ruleForm.username"
              class="input-with-select"
              style="width: 100%;"
            >
              <el-select
                v-model="ruleForm.countryCode"
                slot="prepend"
                style="width: 100px;"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in country"
                  :key="item.zh"
                  :label="item.zh"
                  :value="item.code"
                ></el-option>
              </el-select>
              <div
                slot="prefix"
                style="height: 40px;width: 42px;line-height: 40px;font-weight: 700;"
              >+{{ruleForm.countryCode}}</div>
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row" v-if="pageType === '3'">
        <div style="display: inline-block;width: 28vw;">
          <el-form-item class="marginLeft" prop="username">
            <el-input
              :placeholder="loginMailbox"
              v-model="ruleForm.username"
              class="input-with-select"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row" v-if="pageType === '1'">
        <span style="width: 20vw;display: inline-block;">
          <el-form-item prop="captcha">
            <el-input placeholder="请输入验证码" v-model="ruleForm.captcha"></el-input>
          </el-form-item>
        </span>
        <el-button class="resend" @click="sendCode" :disabled="sendCodeDisabled">{{sendCodeText}}</el-button>
      </div>
      <div class="row" v-if="pageType === '2' || pageType === '3'">
        <el-form-item class="marginLeft" prop="password">
          <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="row">
      <el-button class="login-btn" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import qs from "qs";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        countryCode: "86",
        captcha: "",
        password: ""
      },
      pageType: "1", // 1 登录 2 注册
      loginPH: "请输入手机号码",
      loginMailbox: "请输入邮箱",
      sendCodeText: "发送验证码",
      sendCodeDisabled: false,
      country: []
    };
  },
  created() {
    axios.get("/auth/v1/countries").then(res => {
      this.country = res.data;
    });
  },
  methods: {
    loginMode(val) {
      this.ruleForm = {
        username: "",
        countryCode: "86",
        captcha: "",
        password: ""
      };
      if (val === "phoneCode") {
        this.pageType = "1";
      }
      if (val === "phonePassword") {
        this.pageType = "2";
      }
      if (val === "mailboxPassword") {
        this.pageType = "3";
      }
    },
    loginGo() {
      // 登录按钮
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
    sendCode() {
      // 发送验证码
      if (!this.username) {
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
      // 邮箱正则
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
</style>
