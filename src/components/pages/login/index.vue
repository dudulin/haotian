<template>
  <div id="loginView">
    <pc-header theme="blue" />
    <div class="content">
      <p class="headline">呼吸新鲜空气</p>
      <p class="text">是每个人生来的权利</p>
      <div class="login-box">
        <div class="tab-title row">
          <span class="type">{{userType}}</span>
        </div>
        <login-index v-if="showLogin === 'login'"></login-index>
        <register-index v-if="showLogin === 'register'" :regionChoicedata="regionChoiceData" @func="register_next"></register-index>
        <information-index v-if="showLogin === 'information'"></information-index>
        <div style="margin-top: -18px;margin-bottom: 15px;">
          <div v-if="showLogin === 'register'" style="display: inline-block;margin-right: 110px;font-size: 14px;">
            <span style="margin-right: 5px;">点击"注册"或"继续"即表示同意</span>
            <el-button class="login-btn" type="text" @click="showPrivacyClause">浩天隐私条款</el-button>
          </div>
          <div v-if="showLogin === 'register'" style="display: inline-block;font-size: 14px;">
            <span style="margin-right: 5px;">已有账号？</span>
            <el-button class="login-btn" type="text" @click="loginGo">立即登录</el-button>
          </div>
          <div v-if="showLogin === 'login'" style="display: inline-block;font-size: 14px;margin-right: -390px;">
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
        <el-input placeholder="请输入关键字" suffix-icon="el-icon-search" v-model="regionChoiceVal" @change="regionChoiceSearch"></el-input>
      </div>
      <div class="regionChoiceABC">
        <span class="ABC" @click="setABC('special')" :class="activeABC === 'special' ? 'isActive' : ''">
          <i class="el-icon-star-on"></i>
        </span>
        <span class="ABC" @click="setABC(item)" v-for="item in ABCarr" :class="activeABC === item ? 'isActive' : ''" :key="item">{{item}}</span>
      </div>
      <div class="regionChoiceClick" v-if="activeABC === 'special'">
        <div class="clickDiv" v-for="item in majorCountry" :key="item.zh" @click="clickCountry(item)">
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
import pcHeader from "../../public/header.vue";
import footerPlus from "../../public/footer-plus.vue";
import axios from "axios";
import loginIndex from "./loginIndex"
import registerIndex from "./registerIndex"
import informationIndex from "./informationIndex"
// import qs from "qs";

export default {
  data() {
    return {
      ruleForm: {
        username: '',
        countryCode: '86',
        captcha: '',
        sendCodeText: '发送验证码',
        password: ''
      },
      showLogin: 'login',
      userType: "账户登录",
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
      majorCountry: [],
      countryABC: [],
      countryCode: "86",
      centerDialogVisible: false,
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
      regionChoiceData:{
        countryZhClick: "中国",
        countryCodeClick: "86"
      },
      regionChoiceVal: "",
      activeABC: "special"
    };
  },
  created() {
    axios.get("/auth/v1/countries").then(res => {
      this.country = res.data;
    });
  },
  methods: {
    regionChoiceSearch(val) {
      // 地区选择 中文 或 非中文 输入 搜索
      let that = this
      that.activeABC = 'searchInput'
      that.countryABC = []
      let reg = new RegExp("[\\u4E00-\\u9FFF]+")
      if (reg.test(val)) {
        that.AAcountry.map(i => {
          if (i.chinese_name.search(val) != -1) {
            that.countryABC.push(i)
          }
        })
      } else {
        that.AAcountry.map(i => {
          if (i.name.search(val) != -1) {
            that.countryABC.push(i)
          }
        })
      }
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
          chinese_name: '俄罗斯',
          code: "7",
          iso_code: "RU",
          name: "Россия",
          zh: "俄罗斯"
        },
        {
          chinese_name: '日本',
          code: "81",
          iso_code: "JP",
          name: "ソフトウェア",
          zh: "日本"
        },
        {
          chinese_name: '德国',
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
    register_next(data) {
      // 注册 下一步按钮 页面展示变更
      this.showLogin = data,
      this.userType = "请您完善以下资料"
    },
    setABC(item) {
      // 选中ABC
      let that = this
      that.countryABC = []
      let countryArr = that.country
      countryArr.map(i => {
        if (i.name.substr(0,1) === item) {
          that.countryABC.push(i)
        }
      })
      this.activeABC = item;
    },
    clickCountry(item) {
      // 选中国家
      this.regionChoiceData = {
        countryZhClick: item.zh,
        countryCodeClick: item.code
      }
      this.regionChoiceCon = false
    },
    registerGo() {
      // 立即注册按钮
      this.userType = "账户注册";
      this.showLogin = 'register'
    },
    registerNext() {
      // 注册 下一步
    },
    loginGo() {
      // 立即登录按钮
      this.userType = "账户登录";
      this.showLogin = 'login'
    },
    showPrivacyClause() {
      // 隐私条款
      this.centerDialogVisible = true;
    }
  },
  components: {
    pcHeader,
    footerPlus,
    loginIndex,
    registerIndex,
    informationIndex
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

      .row {
        margin: 2vh 2vw;
        text-align: left;

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
