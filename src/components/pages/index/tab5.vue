<template>
  <div class="tab3">
    <div style="width: 100%;height: 90px;background: #fff;">
      <pc-header theme="white" />
    </div>
    <div class="box">
      <div class="left">
        <div class="text">
          <span class="toAboutUs">全球布局</span>
          <span class="title">极致的质量和最低的价格<br />确保洁净是我们提供的基本权利</span>
        </div>
        <div class="number">
          <div class="item">
            <span class="num">234</span>
            <span class="text1">专利授权</span>
          </div>
          <div class="item">
            <span class="num">11</span>
            <span class="text1">自主品牌</span>
          </div>
        </div>
        <div class="btn">
          了解全部
        </div>
      </div>
      <div class="right">
        <div style="overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      flex: 1;width: 570px;">
          <div class="yuan" style="width: 220px;height: 220px;margin-top: 18vh;margin-right: 3vh;margin-left: 3vh;">
            <span class="icon">
              <img src="./img/icon6.png" alt="">
            </span>
            <span class="cn">高性能</span>
            <span class="en">Permance</span>
          </div>
          <div class="yuan" style="margin-top: 13vh;">
            <span class="icon">
              <img src="./img/icon7.png" alt="">
            </span>
            <span class="cn">性价比</span>
            <span class="en">Value</span>
          </div>
          <div class="yuan" style="margin-top: 3vh;margin-right: 3vh;border: none;background: #fff;color: #248ED8;">
            <span class="icon">
              <img src="./img/icon8.png" alt="">
            </span>
            <span class="cn">多场景</span>
            <span class="en"> scenes</span>
            <span style="color: #222222;font-size:14px;margin-top: 1vh;text-align: center;">各种工业场景我们 <br />都能够适用</span>
          </div>
          <div class="yuan" style="width: 170px;height: 170px;margin-top: 3vh;">
            <span class="icon">
              <img src="./img/icon9.png" alt="">
            </span>
            <span class="cn">自动化</span>
            <span class="en">automatic</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pcHeader from '../../public/header.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    pcHeader
  }
}
</script>

<style scoped lang="stylus">
.tab3 {
  width: 100%;
  height: 100%;
  background: url('./img/bg8.png');
  text-align: left;
  color: #fff;

  .box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;

    .left {
      width: 620px;
      height: 100%;
      margin: 10vh 80px;
      padding-bottom: 70px;
      box-sizing: border-box;

      .text {
        width: 100%;

        span {
          display: block;
        }

        .toAboutUs {
          font-size: 14px;
          font-weight: 400;
          height: 60px;
          line-height: 60px;
        }

        .title {
          font-size: 38px;
          font-weight: 400;
        }
      }

      .number {
        margin-top: 5vh;

        .item {
          display: inline-block;
          margin-right: 6vh;
          text-align: center;

          span {
            display: block;
          }

          .num {
            font-size: 70px;
          }

          .text1 {
            font-size: 14px;
          }
        }
      }

      .btn {
        width: 110px;
        height: 40px;
        background: #fff;
        color: #248ED8;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        margin-top: 10vh;
      }
    }

    .right {
      // overflow: hidden;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: flex-start;
      // align-items: flex-start;
      // align-content: flex-start;
      // flex: 1;
      // margin: 0 20vh;
      .yuan {
        border-radius: 50%;
        width: 260px;
        height: 260px;
        display: flex;
        flex-direction: column;
        border: 2px solid rgba(255, 255, 255, 0.2);
        justify-content: center;
        align-items: center;

        .cn {
          margin-top: 1vh;
        }

        .en {
          margin-top: 0.4vh;
          font-size: 12px;
        }
      }
    }

    @media screen and (max-width: 1600px) {
      .right {
        margin: 0;
      }
    }

    @media screen and (min-width: 1600px) and (max-width: 1800px) {
      .right {
        margin: 0 10vh;
      }
    }

    @media screen and (min-width: 1800px) and (max-width: 1920px) {
      .right {
        margin: 0 20vh;
      }
    }
  }
}
</style>
