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
                {{countryZhClick}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <div
                slot="prefix"
                style="height: 40px;width: 42px;line-height: 40px;font-weight: 700;"
              >+{{countryCodeClick}}</div>
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
    <el-dialog
      class="regionChoiceCon"
      title="选择地区"
      :visible.sync="regionChoiceCon"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="900px"
      center
      style="background: rgba(0,13,23,0.9);"
    >
      <div class="regionChoiceInput">
        <el-input placeholder="请输入关键字" suffix-icon="el-icon-search" v-model="regionChoiceVal"></el-input>
      </div>
      <div class="regionChoiceABC">
        <span
          class="ABC"
          @click="setABC('special')"
          :class="activeABC === 'special' ? 'isActive' : ''"
        >
          <i class="el-icon-star-on"></i>
        </span>
        <span
          class="ABC"
          @click="setABC(item)"
          v-for="item in ABCarr"
          :class="activeABC === item ? 'isActive' : ''"
          :key="item"
        >{{item}}</span>
      </div>
      <div class="regionChoiceClick" v-if="activeABC === 'special'">
        <div
          class="clickDiv"
          v-for="item in majorCountry"
          :key="item.zh"
          @click="clickCountry(item)"
        >
          <span class="countryZh">{{item.name}}</span>
          <span class="countryCode">+{{item.code}}</span>
        </div>
      </div>
      <div class="regionChoiceClick" v-if="activeABC !== 'special'">
        <div class="clickDiv" v-for="item in countryABC" :key="item.zh" @click="clickCountry(item)">
          <span class="countryZh">{{item.zh}}</span>
          <span class="countryCode">+{{item.code}}</span>
        </div>
      </div>
    </el-dialog>
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
      loginPH: "请输入手机号码",
      sendCodeText: "发送验证码",
      sendCodeDisabled: false,
      country: [],
      majorCountry: [],
      countryABC: [],
      countryCode: "86",
      regionChoiceCon: false,
      ABCarr: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "X",
        "Y",
        "Z"
      ],
      regionChoiceVal: "",
      activeABC: "special",
      countryZhClick: "中国",
      countryCodeClick: "86"
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
      let that = this;
      that.countryABC = [];
      let countryArr = that.country;
      countryArr.map(i => {
        if (i.name.substr(0, 1) === item) {
          that.countryABC.push(i);
        }
      });
      this.activeABC = item;
    },
    clickCountry(item) {
      // 选中国家
      this.countryZhClick = item.zh;
      this.countryCodeClick = item.code;
      this.regionChoiceCon = false;
    },
    registerGo() {
      // 立即注册按钮
      this.userType = "注册";
      this.showLogin = false;
    },
    showRegionChoice() {
      // 展示 地区选择弹窗
      this.majorCountry = [
        {
          iso_code: "CN",
          name: "中国",
          code: "86",
          zh: "中国",
          chinese_name: "中国"
        },
        {
          iso_code: "US",
          name: "USA",
          code: "1",
          zh: "美国",
          chinese_name: "美国"
        },
        {
          chinese_name: "俄罗斯",
          code: "7",
          iso_code: "RU",
          name: "Россия",
          zh: "俄罗斯"
        },
        {
          chinese_name: "日本",
          code: "81",
          iso_code: "JP",
          name: "ソフトウェア",
          zh: "日本"
        },
        {
          chinese_name: "德国",
          code: "49",
          iso_code: "DE",
          name: "Bundesrepublik Deutschland",
          zh: "德国"
        },
        {
          chinese_name: "印度",
          code: "91",
          iso_code: "IN",
          name: "INDIA",
          zh: "印度"
        },
        {
          chinese_name: "韩国",
          code: "82",
          iso_code: "KR",
          name: "대한민국",
          zh: "韩国"
        },
        {
          chinese_name: "英国",
          code: "44",
          iso_code: "GB",
          name: "ENGLAND",
          zh: "英国"
        }
      ];
      this.regionChoiceCon = true;
    },
    registerNext() {
      // 注册 下一步
    },
    sendCode() {
      // 发送验证码
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
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus">
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
