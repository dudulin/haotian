<template>
  <div id="tab1">
    <div style="width: 100%;background: RGB(248,248,248);">
      <div class="title">
        <div class="headline">
          <span class="cn">数字化你的除尘系统，提高你的生产效率</span>
          <span class="en">Digital dust removal system<br />improve production efficiency</span>
        </div>
        <div class="msg">
          <span>建立RFID/袋</span>
          <span>扫码设置除尘器集群</span>
          <span>问题一键报错</span>
        </div>
      </div>
    </div>
    <div style="width: 100%;">
      <div class="overview">
        <div class="headline">
          <span class="cn">概览</span>
          <span class="en">Overview</span>
          <span class="num">01</span>
        </div>
        <div class="msg">
          <span>“数说"排放监控系统，为每一个个除尘袋建立单独ID<br />用户可以迅速组建全新的除尘器，通过可视化界面得到整个系统的运行情况</span>
        </div>
      </div>
    </div>
    <div style="width: 100%;">
      <div class="picArea">
        <div class="item">
          <img src="./img/tab2-icon1.png" alt="">
          <span class="cn">全生命周期管理</span>
          <span class="en">DS PLM</span>
        </div>
        <div class="item">
          <img src="./img/tab2-icon2.png" alt="">
          <span class="cn">实时动态监控</span>
          <span class="en">Monitor</span>
        </div>
        <div class="item">
          <img src="./img/tab2-icon3.png" alt="">
          <span class="cn">实时动态预警</span>
          <span class="en">Early Warning</span>
        </div>
        <div class="item" style="margin-top: -44px;">
          <img src="./img/tab2-icon4.png" alt="">
          <span class="cn">快速定位和修复</span>
          <span class="en">Location Repair</span>
        </div>
      </div>
    </div>
    <div class="card-type2-left" style="padding-bottom: 80px">
      <div class="msg">
        <span class="h1">场景</span>
        <span class="line"></span>
        <span class="text">随着技术的发展，除尘设备的制造工艺和除尘袋的媒介都发生了天翻地覆的变化，传统除尘器能满足你的需求，但是在一个高昂的维护成本和耗材的使用成本，让我们的专家帮助你规划更加合理的除尘方案，在我们的帮助下，除尘过程优化使得许多成熟企业每年减少30%以上的费用在除尘耗材的使用。</span>
      </div>
      <div class="connect">
        <span class="pic"></span>
        <span class="text">请求技术专家</span>
      </div>
    </div>
    <div class="card-type3">
      <div style="width: 1180px;margin: 0 auto;display: flex;justify-content: space-between;align-items: center;">
        <div class="circular">
          <div class="item" style="width: 140px;height: 140px;border: 2px solid rgba(255,255,255,0.1);margin-top: 210px;">
            <span class="num" style="font-size: 50px;">1</span>
            <span class="text">组建除尘器机组</span>
          </div>
          <div class="item" style="width: 160px;height: 160px;margin-top: 100px;">
            <span class="num" style="font-size: 56px;">2</span>
            <span class="text">动态加入除尘配置</span>
          </div>
          <div class="item" style="width: 120px;height: 120px;border: 2px solid rgba(255,255,255,0.1);margin-top: 245px;">
            <span class="num" style="font-size: 40px;">3</span>
            <span class="text">进入生产周期</span>
          </div>
          <div class="item" style="width: 140px;height: 140px;border: 2px solid rgba(255,255,255,0.1);margin-top: 115px;">
            <span class="num" style="font-size: 50px;">4</span>
            <span class="text">工作过程监控</span>
          </div>
          <div class="item" style="width: 150px;height: 150px;margin-top: 200px;">
            <span class="num" style="font-size: 70px;">5</span>
            <span class="text">检修</span>
          </div>
          <div class="item" style="width: 100px;height: 100px;border: 2px solid rgba(255,255,255,0.1);margin-top: 145px;">
            <span class="num" style="font-size: 40px;">6</span>
            <span class="text">报废</span>
          </div>
        </div>
        <div class="headline" style="text-align: right;">
          <span class="cn">滤袋生命周期管理</span>
          <span class="en">Life cycle<br />Management</span>
          <span class="msg">从组建新的除尘器到除尘器的安装<br />监控和报废流程<br />都由一个软件来管理</span>
          <span class="num" style="right: 360px;">02</span>
        </div>
      </div>
    </div>
    <div class="card-type1-left">
      <div class="msg">
        <span class="cn">实时动态监控</span>
        <span class="en">Real-time dynamic <br />monitoring</span>
        <span class="text">“数说”为除尘袋集群提供实时的监控</span>
        <span class="num">03</span>
      </div>
      <div class="pic"></div>
    </div>
    <div class="card-type1-right" style="padding-top: 100px;">
      <div class="pic"></div>
      <div class="msg">
        <span class="cn">实时动态预警</span>
        <span class="en">Real-time dynamic <br />early warning</span>
        <span class="text">“数说”根据大数据提供动态预警</span>
        <span class="num">04</span>
      </div>
    </div>
    <div class="card-type3" :style="'background-image: url('+bg3+')'">
      <div style="width: 1180px;margin: 0 auto;display: flex;justify-content: space-between;align-items: center;">
        <div class="headline" style="text-align: left;">
          <span class="cn">快速定位和修复</span>
          <span class="en">Rapid positioning<br />and repair</span>
          <span class="msg">拥有数说平台<br />用户可以对每一个除尘袋进行动态的跟踪和检测<br />免去了停机检查的时间和排查问题的效率</span>
          <span class="num" style="left: 360px;">05</span>
        </div>
        <div class="circular">
          <div class="item" style="width: 140px;height: 140px;border: 2px solid rgba(255,255,255,0.1);margin-top: 205px;">
            <span class="num" style="font-size: 50px;">1</span>
            <span class="text">健康情况</span>
          </div>
          <div class="item" style="width: 160px;height: 160px;border: 2px solid rgba(255,255,255,0.2);margin-top: 105px;margin-left: 30px;">
            <span class="num" style="font-size: 40px;">2</span>
            <span class="text">检修情况</span>
          </div>
          <div class="item" style="width: 120px;height: 120px;border: 2px solid rgba(255,255,255,0.1);margin-top: 245px;">
            <span class="num" style="font-size: 40px;">3</span>
            <span class="text">破碎情况</span>
          </div>
          <div class="item" style="width: 140px;height: 140px;border: 2px solid rgba(255,255,255,0.2);margin-top: 195px;margin-left: 30px;">
            <span class="num" style="font-size: 50px;">4</span>
            <span class="text">性能情况</span>
          </div>
        </div>
      </div>
    </div>

    <div style="height: 350px;width:100%;background:RGB(244,244,244);"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bg3: require('./img/tab2-bg3.png')
    }
  }
}
</script>

<style lang="stylus" scoped>
#tab1
  .title
    width: 1180px
    padding: 75px 0
    margin: 0 auto
    box-sizing: border-box
    background: RGB(248,248,248)
    overflow: hidden
    .headline
      float: left
      width: 590px
      text-align: left
      .cn
        font-size: 24px
        fongt-weight: bold
        line-height: 50px
        display: block
      .en
        font-size: 26px
        display: block
        line-height: 30px
    .msg
      float: right
      text-align: right
      font-size: 14px
      font-weight: 400
      font-weight: 400
      span
        display: block
        margin: 10px 0
        padding-right: 15px
        border-right: 3px solid rgba(0, 0, 0, 0.2)
  .overview
    width: 1180px
    padding: 100px 0 80px
    margin: 0 auto
    box-sizing: border-box
    position: relative
    display: flex
    justify-content: space-between
    text-align: left
    .headline
      span
        display: block
      .cn
        font-size: 24px
        fongt-weight: 500
      .en
        font-size: 26px
        margin-top: 15px
      .num
        position: absolute
        left: 360px
        bottom: 15px
        font-size: 20px
        color: rgba(0, 0, 0, 0.2)
  .picArea
    width: 1200px
    height: 460px
    margin: 0 auto 40px
    background-image: url('./img/tab2-bg1.png')
    display: flex
    justify-content: space-around
    align-items: center
    .item
      span
        display: block
      .cn
        margin-top: 20px
        font-size: 20px
        color: #fff
        height: 36px
        line-height: 36px
      .en
        font-size: 14px
        color: rgba(255, 255, 255, 0.4)
  .card-type2-left
    margin: 0 auto
    width: 1200px
    overflow: hidden
    .msg
      margin-top: 50px
      text-align: left
      float: left
      width: 700px
      span
        display: block
      .h1
        font-size: 20px
        font-weight: 500
      .line
        width: 100%
        height 0
        border-top: 1px dotted rgba(0, 0, 0, 0.3)
        margin: 15px 0
      .text
        font-size: 16px
        font-weight: 400
        color: rgba(0,0,0,1)
        line-height: 28px
    .connect
      width: 430px
      height: 230px
      float: right
      border: 6px solid RGB(242,242,242)
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      box-sizing: border-box
      cursor: pointer
      &:hover
        border: 6px solid RGB(12,127,208)
        .text
          color: rgba(12,127,208,1)
        .pic
          background: url('./img/user-light.png')
      .pic
        width: 35px
        height: 40px
        background: url('./img/user.png')
        display: block
      .text
        display: block
        margin-top: 20px
        font-size:14px;
        font-weight:400;
        color: rgba(153,153,153,1)
  .card-type3
    width: 100%
    height: 500px
    background: url('./img/tab2-bg2.png')
    position: relative
    color: #fff
    .headline
      span
        display: block
      .cn
        font-size: 24px
      .en
        margin-top: 10px
        font-size: 26px
      .msg
        font-size: 16px
        line-height: 30px
        margin-top: 40px
      .num
        position: absolute

        bottom: 80px
        font-size: 20px
        opacity: 0.2
    .circular
      display: flex
      height: 100%
      .item
        border-radius: 50%
        width: 100px
        height: 100px
        position: relative
        border: 3px solid rgba(255, 255, 255, 0.2)
        .num
          text-align: center
          font-size: 40px
          opacity: 0.2
          margin-top: 20%
          display: block
        .text
          font-size: 18px
          display: block
          padding: 0 20%
          box-sizing: border-box
          width: 100%
          position: absolute
          top: 50%
          left: 0
  .card-type1-right
    width: 1200px
    margin: 0 auto 100px
    height: 360px
    overflow: hidden
    position: relative
    .pic
      width: 600px
      height: 100%
      background: url('./img/tab2-pic2.png')
      float: left
    .msg
      height: 100%
      float: left
      span
        display: block
        text-align: left
        margin-left: 150px
      .cn
        margin-top: 70px
        line-height: 45px
        font-size: 24px
        font-weight: 500
      .en
        line-height: 45px
        font-size: 26px
        font-weight: normal
      .text
        margin-top: 30px
        line-height: 30px
        font-size: 16px
      .num
        position: absolute
        bottom: 0
        font-size: 20px
        opacity: 0.2
  .card-type1-left
    width: 1200px
    margin: 100px auto 0
    height: 360px
    overflow: hidden
    position: relative
    .pic
      width: 600px
      height: 100%
      background: url('./img/tab2-pic1.png')
      float: right
    .msg
      height: 100%
      float: left
      span
        display: block
        text-align: left
      .cn
        margin-top: 70px
        line-height: 45px
        font-size: 24px
        font-weight: 500
      .en
        line-height: 45px
        font-size: 26px
        font-weight: normal
      .text
        margin-top: 30px
        line-height: 30px
        font-size: 16px
      .num
        position: absolute
        bottom: 0
        font-size: 20px
        opacity: 0.2
</style>
