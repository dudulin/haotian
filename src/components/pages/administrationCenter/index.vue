<template>
  <el-container style="height:100%;" class="container">
    <el-header class="header" style="border:1px solid #ddd;">headerheaderheaderheader</el-header>
    <el-container>
      <el-aside style="border:1px solid #ddd;">asideasideasideaside</el-aside>
      <el-main style="border:1px solid #ddd;">mainmainmain</el-main>
    </el-container>
  </el-container>
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
.header {
  background-color: #824;
  border: 2px solid #ddd;
  // width:100%
  // height:100px
}

.aside {
  background-color: #654;
  border: 2px solid #ddd;
  width: 100px;
  // height:100px
}

.main {
  background-color: #185;
  border: 2px solid #ddd;
  // width:100%
  // height:100px
}
</style>
