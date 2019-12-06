<template>
  <div>
    <div class="loginArea-box">
      <div class="loginArea" style="width: 140px;margin-left: -14px;margin-right: 15px;" @click="loginMode('1')" :class="pageType === '1' ? 'is-active': ''">
        <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">手机号+验证码登录</span>
      </div>
      <div class="loginArea" style="margin: 0px 44px;" @click="loginMode('2')" :class="pageType === '2' ? 'is-active': ''">
        <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">手机号+密码登录</span>
      </div>
      <div class="loginArea" style="width: 111px;margin-right: -15px;margin-left: 38px;" @click="loginMode('3')" :class="pageType === '3' ? 'is-active': ''">
        <span style="display: inline-block;padding: 18px 0;margin-top: -2px;">邮箱+密码登录</span>
      </div>
      <!-- <span class="type" @click="() => pageType='1'" :class="pageType === '1' ? 'is-active': ''">登录</span>
      <span class="type" @click="() => pageType='2'" :class="pageType === '2' ? 'is-active': ''">注册</span>-->
    </div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="row" v-if="pageType === '1' || pageType === '2'">
        <div class="phoneLogin" style="display: inline-block;width: 28vw;">
          <el-form-item style="margin-bottom:10px" class="marginLeft" prop="username" :rules="pageType==='3'?[]:thisRules.phone">
            <el-input :placeholder="loginPH" v-model="ruleForm.username" class="input-with-select" style="width: 100%;">
              <el-select v-model="ruleForm.countryCode" slot="prepend" style="width: 100px;" placeholder="请选择">
                <el-option v-for="item in country" :key="item.zh" :label="item.zh" :value="item.code"></el-option>
              </el-select>
              <div slot="prefix" style="height: 40px;width: 42px;line-height: 40px;font-weight: 700;">+{{ruleForm.countryCode}}</div>
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row" v-if="pageType === '3'">
        <div style="display: inline-block;width: 28vw;">
          <el-form-item style="margin-bottom:10px" class="marginLeft" prop="username" :rules="pageType!=='3'?[]:thisRules.email">
            <el-input :placeholder="loginMailbox" v-model="ruleForm.username" class="input-with-select"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row" v-if="pageType === '1'">
        <span style="width: 20vw;display: inline-block;">
          <el-form-item style="margin-bottom:10px" prop="captcha" :rules="pageType!=='1'?[]:thisRules.one">
            <el-input placeholder="请输入验证码" v-model="ruleForm.captcha"></el-input>
          </el-form-item>
        </span>
        <el-button class="resend" @click="sendCode" :disabled="sendCodeDisabled">{{sendCodeText}}</el-button>
      </div>
      <div class="row" v-if="pageType === '2' || pageType === '3'">
        <el-form-item style="margin-bottom:18px" class="marginLeft" prop="password" :rules="pageType!=='1'?thisRules.one:[]">
          <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="row">
      <el-button class="login-btn" type="primary" @click="checkRules">登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {rules} from '../../../common/js/tool.js'
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
      country: [],
      thisRules: { /* 把rules 封装到这里 格式化 */
        email: [ /* 1.不能空 2.邮箱格式 */
          { validator: rules.check0, trigger: 'blur' },
          { validator: rules.checkEmail, trigger: 'blur' }
        ],
        phone: [ /* 1.不能空 2.电话格式 */
          { validator: rules.check0, trigger: 'blur' },
          { validator: rules.checkPhone, trigger: 'blur' }
        ],
        one: [ /* 1.不能空 */
          { validator: rules.check0, trigger: 'blur' }
        ]
      },
    };
  },
  created() {
    console.log(rules,'dserses')
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
      if(this.pageType != val){
        this.resetForm()
      }
      this.pageType = val;
    },
    sendCode() {
      debugger
      // 发送验证码
      if (!this.ruleForm.username) {
        return;
      }
      if (this.pageType === "1") {
        axios
          .head(
            `auth/v1/countries/${this.ruleForm.countryCode}/phones/${this.ruleForm.username}`
          )
          .then(res => {
            debugger
            if (res.status === 204) {
              // 手机号码已注册
              axios
                .post(
                  `/auth/v1/countries/${this.ruleForm.countryCode}/phones/${this.ruleForm.username}/phone-login-captcha`
                )
                .then(res => {
                  if (res.status === 201) {
                    if (res.data.captcha) {
                      this.sendCodeDisabled = true;
                      let num = 60;
                      this.sendCodeText = `${num}`;
                      let time = setInterval(() => {
                        num--;
                        this.sendCodeText = `${num}`;
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
            } else if (res.status === 404) {
              // 手机号码已注册
            }
          })
      }
      // if (this.pageType === "1") {
      //   
      // } else {
      //   axios
      //     .post(
      //       `/auth/v1/countries/${this.countryCode}/phones/${this.username}/register-captcha`
      //     )
      //     .then(res => {
      //       if (res.data.captcha) {
      //         this.sendCodeDisabled = true;
      //         let num = 60;
      //         this.sendCodeText = `${num}`;
      //         let time = setInterval(() => {
      //           num--;
      //           this.sendCodeText = `${num}`;
      //           if (num === 0) {
      //             this.sendCodeDisabled = true;
      //             this.sendCodeText = "重新发送";
      //             clearInterval(time);
      //           }
      //         }, 1000);
      //       }
      //     });
      // }
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
    /* 检查填写的数据是否正常 */
    checkRules(){
      const that = this
      this.$refs.ruleForm.validate((valid) => {
          if (valid) { // 通过验证 执行数据提交
            console.log('ok------------')
            that.login()
          } else {
            return false;
          }
        });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    login() {
      let url = ''
      let data = {}
      if (this.pageType === '1') {
        url = 'auth/v1/phone-captcha-login'
        data = {
          country_code: this.ruleForm.countryCode,
          phone: this.ruleForm.username,
          captcha: this.ruleForm.captcha
        }
      }
      if (this.pageType === '2') {
        url = 'auth/v1/phone-password-login'
        data = {
          country_code: this.ruleForm.countryCode,
          phone: this.ruleForm.username,
          password: this.ruleForm.password
        }
      }
      if (this.pageType === '3') {
        url = 'auth/v1/login'
        data = {
          username: this.ruleForm.username,
          password: this.ruleForm.password
        }
      }
      this.$http.post(url, data).then(res => {
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
