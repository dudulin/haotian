<template>
  <div class="tab3">
    <div style="width: 100%;height: 90px;background: #fff;">
      <pc-header theme="white" />
    </div>
    <div class="box">
      <div class="left">
        <div class="text">
          <span class="toAboutUs">全球布局</span>
          <span class="title">出口超过77个国家<br />每年过滤超过一个地球的立方的空气</span>
          <span class="text1">皓天成立于1997年，作为第一代针对环保的企业<br />我们的使命是通过我们的专业和决心，让天空更加湛蓝</span>
        </div>
        <div class="btn">
          <span class="text">在网上就能够跟踪<br />你的所有订单信息</span>
          <router-link to="/service">
            <div class="service">
              网上询盘
            </div>
          </router-link>
        </div>
      </div>
      <div class="displayDiv"></div>
      <div class="right rightDiv">
        <div class="item">
          <span class="num">01</span>
          <span class="img">
            <img src="./img/icon1.png" alt="">
          </span>
          <span class="cn">询价咨询</span>
          <span class="en">Advisory</span>
        </div>
        <div class="item">
          <span class="num">02</span>
          <span class="img">
            <img src="./img/icon2.png" alt="">
          </span>
          <span class="cn">便捷下单</span>
          <span class="en">Order</span>
        </div>
        <div class="item">
          <span class="num">03</span>
          <span class="img">
            <img src="./img/icon3.png" alt="">
          </span>
          <span class="cn">生产过程</span>
          <span class="en">Produce</span>
        </div>
        <div class="item">
          <span class="num">04</span>
          <span class="img">
            <img src="./img/icon4.png" alt="">
          </span>
          <span class="cn">物流信息</span>
          <span class="en">Logistics</span>
        </div>
        <div class="item">
          <span class="num">05</span>
          <span class="img">
            <img src="./img/icon5.png" alt="">
          </span>
          <span class="cn">优质售后</span>
          <span class="en">After sale</span>
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
      bg1: require('./img/bg2.png'),
      bg2: require('./img/bg4.png')
    }
  },
  created() {
    let that = this
    window.onresize = function () {
      that.reckonWidth()
    }
    that.$nextTick(() => {
      that.reckonWidth()
    })
  },
  methods: {
    reckonWidth() {
        document.getElementsByClassName('rightDiv')[0].setAttribute('style', 'max-width: none')
        let rightWidth = document.getElementsByClassName('rightDiv')[0].offsetWidth
        if (rightWidth - 800 > 0) {
          document.getElementsByClassName('displayDiv')[0].style.width = (rightWidth - 800) + 'px'
        } else {
          document.getElementsByClassName('displayDiv')[0].style.width = '0px'
          document.getElementsByClassName('rightDiv')[0].setAttribute('style', 'max-width: 800px')
        }
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
  background: url('./img/bg5.png');
  text-align: left;
  color: #fff;

  .box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;

    .left {
      width: 500px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 0 80px;
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

        .text1 {
          margin-top: 15px;
          font-size: 16px;
          font-weight: 300;
          line-height: 30px;
        }
      }

      .btn {
        width: 100%;

        .text {
          display: block;
          font-size: 30px;
          font-weight: 400;
        }

        div {
          width: 110px;
          height: 40px;
          margin-top: 30px;
          font-size: 14px;
          line-height: 40px;
          color: #248ED8;
          background-color: #fff;
          text-align: center;
        }
      }
    }

    .right {
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: flex-start;
      align-content: flex-start;
      flex: 1;
      margin-left: 30px;
      // max-width: 800px;

      .item {
        float: left;
        width: 40vh;
        height: 25vh;
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        margin-right: -1px;
        margin-bottom: -1px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span {
          display: block;
        }

        .num {
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
          font-weight: bold;
          margin: 1vh;
          right: 0;
          top: 0;
          display: inline-block;
          position: absolute;
        }

        .img {
          width: 8vh;
          height: 8vh;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .cn {
          margin-top: 3vh;
          font-size: 3vh;
        }

        .en {
          margin-top: 0.5vh;
          font-size: 2vh;
          opacity: 0.4;
        }
      }
    }
  }
}
</style>
