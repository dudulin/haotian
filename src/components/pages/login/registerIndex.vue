<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="row">
        <div class="phoneLogin" style="display: inline-block;width: 28vw;">
          <el-form-item class="marginLeft" prop="username">
            <el-input
              :placeholder="loginPH"
              v-model="ruleForm.username"
              class="input-with-select"
              style="width: 100%;"
            >
              <el-button slot="prepend" @click="showRegionChoice">
                {{regionChoicedata.countryZhClick}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <div
                slot="prefix"
                style="height: 40px;width: 42px;line-height: 40px;font-weight: 700;"
              >+{{regionChoicedata.countryCodeClick}}</div>
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="row">
        <span style="width: 20vw;display: inline-block;">
          <el-form-item prop="captcha">
            <el-input placeholder="请输入验证码" v-model="ruleForm.captcha"></el-input>
          </el-form-item>
        </span>
        <el-button class="resend" @click="sendCode" :disabled="sendCodeDisabled">{{sendCodeText}}</el-button>
      </div>
    </el-form>
    <div class="row">
      <el-button class="login-btn" @click="registerNext">下一步</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import qs from "qs";

export default {
  props: {
    regionChoicedata: Object
  },
  data() {
    return {
      ruleForm: {
        username: "",
        countryCode: this.regionChoicedata.countryCodeClick,
        captcha: "",
        password: ""
      },
      loginPH: "请输入手机号码",
      sendCodeText: "发送验证码",
      sendCodeDisabled: false
    };
  },
  created() {
  },
  methods: {
    showRegionChoice() {
      // 展示 地区选择弹窗
      this.$parent.showRegionChoice();
    },
    registerNext() {
      // 注册 下一步
      this.$emit("func", "information");
      // let data = {
      //   country_code: this.ruleForm.countryCode,
      //   phone: this.ruleForm.username,
      //   captcha: this.ruleForm.captcha,
      //   language: "zh_CN",
      //   nickname: "Felix"
      // };
      // data = qs.stringify(data)
      // this.$http.post("/auth/v1/users", data).then(res => {
      //   if (res.status === 201) {
      //     this.$emit("func", "information");
      //     // this.$router.push({
      //     //   //核心语句
      //     //   path: "/" //跳转的路径
      //     // });
      //   } else if (res.status === 400) {
      //     this.$message({
      //       message: "验证码错误",
      //       type: "error"
      //     });
      //   } else if (res.status === 404) {
      //     this.$message({
      //       message: "验证码已经过期",
      //       type: "error"
      //     });
      //   } else if (res.status === 410) {
      //     this.$message({
      //       message: "验证码错误次数太多",
      //       type: "error"
      //     });
      //   } else if (res.status === 409) {
      //     this.$message({
      //       message: "用户已注册",
      //       type: "error"
      //     });
      //   } else {
      //     this.$message({
      //       message: "接口错误",
      //       type: "error"
      //     });
      //   }
      // });
    },
    sendCode() {
      // 发送验证码
      if (!this.ruleForm.username) {
        return;
      }
      axios
        .post(
          `/auth/v1/countries/${this.ruleForm.countryCode}/phones/${this.ruleForm.username}/register-captcha`
        )
        .then(res => {
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
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
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
