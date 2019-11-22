<template>
  <div id="tab1">
    <div style="width: 100%;background: RGB(248,248,248);">
      <div class="title">
        <div class="headline">
          <span class="cn">通过我们的专业技能，帮你构建更好的除尘效果</span>
          <span class="en">Through our expertise<br />Helps you build better dust removal</span>
        </div>
        <div class="msg">
          <span>除尘流程规划</span>
          <span>除尘材料和效率优化</span>
          <span>成本优化除尘效率</span>
        </div>
      </div>
    </div>
    <div class="card-type1-right" style="padding-top: 100px;">
      <div class="pic"></div>
      <div class="msg">
        <span class="cn">除尘器规划和设计</span>
        <span class="en">Planning and design</span>
        <span class="text">皓天从端到端的除尘经验能够<br />帮助你设计更加符合发展规划的除尘器<br />解决方案和除尘耗材的选择</span>
        <span class="num">01</span>
      </div>
    </div>
    <div class="card-type2-left" style="padding-bottom: 100px">
      <div class="msg">
        <span class="h1">场景</span>
        <span class="line"></span>
        <span class="text">随着技术的发展，除尘设备的制造工艺和除尘袋的媒介都发生了天翻地覆的变化，传统除尘器能满足你的需求，但是在一个高昂的维护成本和耗材的使用成本，让我们的专家帮助你规划更加合理的除尘方案，在我们的帮助下，除尘过程优化使得许多成熟企业每年减少30%以上的费用在除尘耗材的使用。</span>
      </div>
      <div class="connect" @click="connect">
        <span class="pic"></span>
        <span class="text">请求技术专家</span>
      </div>
    </div>
    <div class="card-type1-left">
      <div class="msg">
        <span class="cn">除尘效率优化</span>
        <span class="en">Efficiency optimization</span>
        <span class="text">除尘效率优化是我们提供给已经在运行的工厂<br />因为监管对于排放标准的要求而进行的必要的优化<br />其中包括，除尘器的改造和<br />过滤材质的重新优化以达到绿色生产的目标</span>
        <span class="num">02</span>
      </div>
      <div class="pic"></div>
    </div>
    <div style="width: 100%;background: #f8f8f8;">
      <div class="card-type2-right">
        <div class="connect">
          <span class="pic"></span>
          <span class="text">请求技术专家</span>
        </div>
        <div class="msg">
          <span class="h1">场景</span>
          <span class="line"></span>
          <span class="text">随着技术的发展，除尘设备的制造工艺和除尘袋的媒介都发生了天翻地覆的变化，传统除尘器能满足你的需求，但是在一个高昂的维护成本和耗材的使用成本，让我们的专家帮助你规划更加合理的除尘方案，在我们的帮助下，除尘过程优化使得许多成熟企业每年减少30%以上的费用在除尘耗材的使用。</span>
        </div>
      </div>
    </div>
    <div class="card-type1-right" style="padding-top: 100px;">
      <div class="pic" :style="'background-image: url('+bg1+')'"></div>
      <div class="msg">
        <span class="cn">成本优化（除尘效率）</span>
        <span class="en">Cost optimization</span>
        <span class="text">皓天从端到端的除尘经验能够<br />帮助你设计更加符合发展规划的除尘器<br />解决方案和除尘耗材的选择</span>
        <span class="num">03</span>
      </div>
    </div>
    <div class="card-type2-left" style="padding-bottom: 100px">
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
    <div style="height: 350px;width:100%;background:rgb(244,244,244);"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bg1: require('./img/pic3.png')
    }
  },
  methods: {
    connect() {
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
  .card-type1-right
    background: #fff
    height: 500px
    overflow: hidden
    .pic
      width: 1120px
      height: 100%
      background: url('./img/pic1.png')
      float: left
    .msg
      height: 100%
      float: left
      position: relative
      span
        display: block
        text-align: left
        margin-left: 80px
      .cn
        margin-top: 90px
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
        bottom: 80px
        font-size: 20px
        opacity: 0.2
  .card-type1-left
    background: RGB(248,248,248)
    height: 500px
    overflow: hidden
    .pic
      width: 1120px
      height: 100%
      background: url('./img/pic2.png')
      float: right
    .msg
      height: 100%
      float: left
      position: relative
      margin-left: 360px
      span
        display: block
        text-align: left
      .cn
        margin-top: 90px
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
        bottom: 80px
        font-size: 20px
        opacity: 0.2
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
  .card-type2-right
    margin: 0 auto
    width: 1200px
    overflow: hidden
    .msg
      margin-top: 50px
      text-align: left
      float: right
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
      float: left
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
        color:rgba(153,153,153,1)
</style>
