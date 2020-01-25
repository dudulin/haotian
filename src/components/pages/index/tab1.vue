<template>
  <div id="tab1" style="display: flex;flex-direction: column;justify-content: space-around;">
    <div style="width: 100%;height: 90px;background: #fff; position: absolute;top: 0;">
      <pc-header theme="white" />
    </div>
    <div class="headline">
      <span class="cn">皓天 - 我们保护你的空气</span>
      <span class="en">We clean up the air</span>
    </div>
    <div class="enquiry">
      <div class="title">
        <span style="font-size: 50px;font-weight: 600;">开启你的询价</span>
        <span style="font-size: 28px;font-weight: 500;">我知道我需要的产品</span>
      </div>
      <div class="search">
        <span class="text">查询我的订单状态</span>
        <span class="searchBody">
          <select v-model="searchIn">
            <option value="phone">手机</option>
            <option value="email">邮箱</option>
          </select>
          <span style="display: flex;" v-if="searchIn === 'phone'">
            <span class="num86" @click="showRegionChoice" style="cursor: pointer;">
              <span class="text">+ 86</span>
            </span>
            <el-input v-model="input" placeholder="请输入手机号码" clearable></el-input>
            <el-button type="primary">查询</el-button>
          </span>
          <span style="display: flex;" v-if="searchIn === 'email'">
            <el-input v-model="input2" placeholder="请输入邮箱" clearable style="width: 325px;"></el-input>
            <el-button type="primary">查询</el-button>
          </span>
        </span>
      </div>
    </div>
    <div class="productList">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in productList" :key="item.id">
          <div class="img">
            <img :src="item.imgUrl" alt />
          </div>
          <p class="name">{{item.name}}</p>
        </swiper-slide>
      </swiper>
    </div>
    <div
      style="width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.5);
    z-index: 2000;"
      v-if="dialogVisible"
    >
      <div
        style="position: relative;
    background: #fff;
    width: 70%;
    margin: auto;
    top: 50%;
    height: 600px;
    margin-top: -300px;"
      >
        <div
          style="width: 52px;
    display: inline-block;
    float: right;
    margin-right: 11px;"
        >
          <el-button
            type="text"
            icon="el-icon-close"
            style="color: #303133;font-size: 25px;"
            @click="dialogVisible = false"
          ></el-button>
        </div>
        <div
          style="height: 80px;
    line-height: 80px;
    font-size: 30px;
    padding-left: 80px;border-bottom: 2px solid #e1e1e1;"
        >选择地区</div>
        <div class="regionChoiceInput">
          <el-input
            placeholder="请输入关键字"
            suffix-icon="el-icon-search"
            v-model="regionChoiceVal"
            @change="regionChoiceSearch"
          ></el-input>
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
          <div
            class="clickDiv"
            v-for="item in countryABC"
            :key="item.zh"
            @click="clickCountry(item)"
          >
            <span class="countryZh">{{item.zh}}</span>
            <span class="countryCode">+{{item.code}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pcHeader from "../../public/header.vue";
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      input: "",
      input2: "",
      searchIn: "phone",
      productList: [
        {
          name: "原材料（圆形布料）",
          imgUrl: require("./img/product3.png")
        },
        {
          name: "除尘袋（工业制品）",
          imgUrl: require("./img/product2.png")
        },
        {
          name: "除尘器管理",
          imgUrl: require("./img/product3.png")
        },
        {
          name: "高性能纤维",
          imgUrl: require("./img/product4.png")
        },
        {
          name: "原材料（圆形布料）",
          imgUrl: require("./img/product3.png")
        },
        {
          name: "除尘袋（工业制品）",
          imgUrl: require("./img/product2.png")
        },
        {
          name: "除尘器管理",
          imgUrl: require("./img/product3.png")
        },
        {
          name: "高性能纤维",
          imgUrl: require("./img/product4.png")
        }
      ],
      swiperOption: {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 19,
        autoplay: true
      },
      country: [],
      dialogVisible: false,
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
      regionChoiceData: {
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
      let that = this;
      that.activeABC = "searchInput";
      that.countryABC = [];
      let reg = new RegExp("[\\u4E00-\\u9FFF]+");
      if (reg.test(val)) {
        that.AAcountry.map(i => {
          if (i.chinese_name.search(val) != -1) {
            that.countryABC.push(i);
          }
        });
      } else {
        that.AAcountry.map(i => {
          if (i.name.search(val) != -1) {
            that.countryABC.push(i);
          }
        });
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
      this.dialogVisible = true;
    },
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
    }
  },
  components: {
    pcHeader,
    swiper,
    swiperSlide
  }
};
</script>

<style scoped lang="stylus">
#tab1 {
  width: 100%;
  height: 100%;
  background: url('./img/bg1.png');

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

  .headline {
    margin-top: 100px;

    span {
      display: block;
      margin-left: 80px;
      text-align: left;
    }

    .cn {
      font-size: 54px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 70px;
      height: 70px;
    }

    .en {
      font-size: 34px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 45px;
    }
  }

  .enquiry {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    .title {
      color: #fff;
      margin-left: 80px;
      width: 350px;
      text-align: left;

      span {
        display: block;
      }
    }

    .search {
      .text {
        font-size: 30px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        display: block;
        text-align: right;
        margin-right: 85px;
      }

      .searchBody {
        display: block;
        margin-right: 85px;
        display: flex;
        margin: 20px 85px 0 0;

        select {
          width: 110px;
          height: 70px;
          border: none;
          text-align: center;
          text-align-last: center;
          font-size: 16px;
          font-weight: 400;
          color: rgba(34, 34, 34, 1);
        }

        .num86 {
          height: 70px;
          width: 90px;
          display: flex;
          align-items: center;
          background: #fff;

          .text {
            width: 90px;
            height: 25px;
            font-size: 22px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            margin: 0;
            text-align: center;
            border-right: 2px solid rgba(3, 3, 3, 0.1);
          }
        }

        .el-button {
          border-radius: 0;
          width: 140px;
          background: #4790D3;
          font-size: 18px;
          font-weight: 300;
        }
      }
    }
  }

  .productList {
    margin: 60px 80px 0;

    .swiper-container {
      .swiper-wrapper {
        .swiper-slide {
          width: 330px;
          height: 220px;
          background: #f0f8fd;

          .img {
            width: 265px;
            height: 150px;
            margin: 7px auto;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
