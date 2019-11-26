<template>
  <div id="loginView">
    <pc-header theme="blue" />
    <div class="content">
      <p class="headline">呼吸新鲜空气</p>
      <p class="text">是每个人生来的权利</p>
      <div class="login-box">
        <div class="tab-title row">
          <span class="type">账户{{userType}}</span>
          <!-- <span class="type" @click="() => pageType='1'" style="margin-right: 2vw;" :class="pageType === '1' ? 'is-active': ''">登录</span>
          <span class="type" @click="() => pageType='2'" :class="pageType === '2' ? 'is-active': ''">注册</span>-->
        </div>
        <div v-if="showLogin">
          <div class="loginArea-box">
            <div class="loginArea" style="width: 140px;margin-left: -14px;margin-right: 15px;" @click="() => pageType='1'" :class="pageType === '1' ? 'is-active': ''">
              <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">手机号+验证码登录</span>
            </div>
            <div class="loginArea" style="margin: 0px 44px;" @click="() => pageType='2'" :class="pageType === '2' ? 'is-active': ''">
              <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">手机号+密码登录</span>
            </div>
            <div class="loginArea" style="width: 111px;margin-right: -15px;margin-left: 38px;" @click="() => pageType='3'" :class="pageType === '3' ? 'is-active': ''">
              <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">邮箱+密码登录</span>
            </div>
            <!-- <span class="type" @click="() => pageType='1'" :class="pageType === '1' ? 'is-active': ''">登录</span>
            <span class="type" @click="() => pageType='2'" :class="pageType === '2' ? 'is-active': ''">注册</span>-->
          </div>
          <div class="row" v-if="pageType === '1' || pageType === '2'">
            <div class="phoneLogin" style="display: inline-block;width: 28vw;">
              <el-input :placeholder="loginPH" v-model="username" class="input-with-select" style="width: 100%;">
                <el-select v-model="countryCode" slot="prepend" style="width: 100px;" placeholder="请选择">
                  <el-option v-for="item in country" :key="item.code" :label="item.zh" :value="item.code"></el-option>
                </el-select>
                <div slot="prefix" style="height: 40px;width: 42px;line-height: 40px;font-weight: 700;">+{{countryCode}}</div>
              </el-input>
            </div>
          </div>
          <div class="row" v-if="pageType === '3'">
            <div style="display: inline-block;width: 28vw;">
              <el-input :placeholder="loginPH" v-model="username" class="input-with-select"></el-input>
            </div>
          </div>
          <div class="row" v-if="pageType === '1'">
            <span style="width: 20vw;display: inline-block;">
              <el-input placeholder="请输入验证码" v-model="captcha"></el-input>
            </span>
            <el-button class="resend" @click="sendCode" :disabled="sendCodeDisabled">{{sendCodeText}}</el-button>
          </div>
          <div class="row" v-if="pageType === '2' || pageType === '3'">
            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
          </div>
        </div>
        <div v-if="!showLogin">
          <div class="row">
            <div class="phoneLogin" style="display: inline-block;width: 28vw;">
              <el-input :placeholder="loginPH" v-model="username" class="input-with-select" style="width: 100%;">
                <el-button slot="prepend" @click="showRegionChoice">
                  中国
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <div slot="prefix" style="height: 40px;width: 42px;line-height: 40px;font-weight: 700;">+{{countryCode}}</div>
              </el-input>
            </div>
          </div>
          <div class="row">
            <span style="width: 20vw;display: inline-block;">
              <el-input placeholder="请输入验证码" v-model="captcha"></el-input>
            </span>
            <el-button class="resend" @click="sendCode" :disabled="sendCodeDisabled">{{sendCodeText}}</el-button>
          </div>
        </div>
        <!-- <div class="row" v-if="pageType === '2'">
          <el-select v-model="registerType" style="width: 6vw;" slot="prepend" placeholder="请选择" @change="handleChange">
            <el-option label="手机号" value="1"></el-option>
            <el-option label="邮箱" value="2"></el-option>
          </el-select>
          <div style="display: inline-block;width: 22vw;">
            <el-input :placeholder="registerPH" v-model="username" @blur="usernameBlur" prop="username">
              <el-select v-model="countryCode" slot="prepend" style="width: 120px;" placeholder="请选择" v-if="registerType === '1'">
                <el-option v-for="item in country" :label="item.zh + ' ' + item.code" :value="item.code"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>-->
        <!-- <div class="row" v-if="pageType === '2'">
          <el-input placeholder="请再次输入密码" v-model="cPassword" show-password></el-input>
        </div>-->
        <div class="row">
          <el-button v-if="showLogin" class="login-btn" type="primary" @click="login">登录</el-button>
          <el-button v-if="!showLogin" class="login-btn" @click="registerNext">下一步</el-button>
        </div>
        <div style="margin-top: -18px;margin-bottom: 15px;">
          <div v-if="!showLogin" style="display: inline-block;margin-right: 110px;font-size: 14px;">
            <span style="margin-right: 5px;">点击"注册"或"继续"即表示同意</span>
            <el-button class="login-btn" type="text" @click="showPrivacyClause">浩天隐私条款</el-button>
          </div>
          <div v-if="!showLogin" style="display: inline-block;font-size: 14px;">
            <span style="margin-right: 5px;">已有账号？</span>
            <el-button class="login-btn" type="text" @click="loginGo">立即登录</el-button>
          </div>
          <div v-if="showLogin" style="display: inline-block;font-size: 14px;margin-right: -390px;">
            <span style="margin-right: 5px;">还没有账号？</span>
            <el-button class="login-btn" type="text" @click="registerGo">立即注册</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="padding-box" style></div>
    <footer-plus theme="blue" />
    <el-dialog class="privacyClauseCon" title="皓天用户协议及隐私条款" :visible.sync="centerDialogVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" width="900px" center style="background: rgba(0,13,23,0.9);">
      <div class="privacyClauseText">
        <div class="privacyClauseTitle">隐私条款</div>
        <div class="privacyClauseValue" style="font-weight: 500;color: #222222;">皓天承诺将保护用户隐私作为一项基本政策，将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项基本政策，皓天承诺将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。</div>
        <div class="privacyClauseTitle">本政策将帮助您了解以下内容：</div>
        <div class="privacyClauseValue">皓天承诺将保护用户隐私作为一项基本政策，将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项基本政策，皓天承诺将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。</div>
        <div class="privacyClauseTitle">本政策将帮助您了解以下内容：</div>
        <div class="privacyClauseValue">皓天承诺将保护用户隐私作为一项基本政策，将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项基本政策，皓天承诺将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项基本政策，将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项基本政策，皓天承诺将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项基本政策，皓天承诺将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项基本政策，将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。皓天承诺将保护用户隐私作为一项基本政策，皓天承诺将保护用户隐私作为一项最基本政策，也就是说本政策同样适用于该部分产品或服务。</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" style="width: 380px;height: 70px;font-size: 20px;">不同意</el-button>
        <el-button type="primary" @click="centerDialogVisible = false" style="width: 380px;height: 70px;font-size: 20px;">同意并继续</el-button>
      </span>
    </el-dialog>
    <el-dialog class="regionChoiceCon" title="选择地区" :visible.sync="regionChoiceCon" :close-on-click-modal="false" :close-on-press-escape="false" width="900px" center style="background: rgba(0,13,23,0.9);">
      <div class="regionChoiceInput">
        <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="regionChoiceVal"></el-input>
      </div>
      <div class="regionChoiceABC">
        <span class="ABC" @click="setABC(item)" v-for="item in ABCarr" :class="activeABC === item ? 'isActive' : ''" :key="item">{{item}}</span>
      </div>
      <div class="regionChoiceClick">
        <div class="clickDiv"  v-for="item in country" :key="item.code" @click="clickCountry(item)"><span style="color: #222222;">{{item.zh}}</span><span style="color: #999999; margin-left: 50px;">+{{item.code}}</span></div>
      </div>
    </el-dialog>
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
      showLogin: true,
      userType: "登录",
      loginType: "1", // 1 手机+验证码登录 2 手机+密码 3 邮箱+密码
      username: "",
      password: "",
      cPassword: "",
      captcha: "",
      pageType: "1", // 1 登录 2 注册
      registerType: "1",
      registerPH: "请输入手机号码",
      loginPH: "请输入手机号码",
      loginMailbox: "请输入邮箱",
      sendCodeText: "发送验证码",
      sendCodeDisabled: false,
      country: [],
      countryCode: "86",
      centerDialogVisible: false,
      regionChoiceCon: false,
      ABCarr: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"],
      regionChoiceVal: '',
      activeABC: ''
    };
  },
  created() {
    axios.get("/auth/v1/countries").then(res => {
      this.country = res.data;
    });
  },
  methods: {
    setABC(item) {
      // 选中ABC
      this.activeABC = item
      debugger
    },
    clickCountry(item) {
      // 选中国家
      console.log(item)
      debugger
    },
    registerGo() {
      // 注册按钮
      this.userType = "注册";
      this.showLogin = false;
    },
    showRegionChoice() {
      // 展示 地区选择弹窗
      this.regionChoiceCon = true;
    },
    registerNext() {
      // 注册 下一步
    },
    loginGo() {
      this.userType = "登录";
      this.showLogin = true;
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
