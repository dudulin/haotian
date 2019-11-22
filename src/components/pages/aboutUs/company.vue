<template >
  <div class="">
    <div class="title">
      <div class="headline">
        <span class="cn">创始期</span>
        <span class="en">FOUNDING PERIOD</span>
        <span class="num">01</span>
      </div>
      <div class="msg" style="margin-bottom: 130px;">
        <span>在1997年7月，对了应对中国改革开放后不断的工业除尘需求，董事长庞瑞清先生在从事了5年除尘相关领域的海外对接和销售，在浙江金华市开启了自己的两套设备的建立，命名为”星光滤布厂”。成长于中国工业化最迅猛的年代，董事长庞瑞清先生感受到经济发展给社会发展带来的勃勃生机<br /><br />同时看到自己少年时期曾经熟悉的青山绿水被发展所带来的污染所破坏。庞瑞清董事长为为星光滤布厂定义了全新的企业使命。</span>
      </div>
    </div>
    <div class="card-right" :style="'background-image: url('+bg1+');height:300px;'">
      <span class="title1">呼吸新鲜空气 是每个人生来的权利</span>
    </div>
    <div class="card-left">
      <div style="width: 1180px;margin: 0 auto;display: flex;justify-content: space-between;align-items: center;">
        <div class="headline">
          <span class="cn">扩展期限</span>
          <span class="en">EXPANSION PERIOD</span>
          <span class="subheading">确定了奋斗目标皓天全体员工开启了第一个五年征程。</span>
          <span class="num">02</span>
        </div>
        <div class="msg">
          <div class="item">
            <span class="year">2002</span>
            2002年得益于创业初期的艰苦奋斗，和中国环保市场的成熟，皓天在浙江台州开启了第二个生产基地以应对日益增长的需求。
          </div>
          <div class="line"></div>
          <div class="item">
            <span class="year">2008</span>
            2008年上海业务市场建立企业开始面对北美和欧洲市场，为大型企业进行OEM生产。
          </div>
          <div class="line"></div>
          <div class="item">
            <span class="year">2010</span>
            2010年旧金山全资子公司”stego INC"建立我们的点对点技术和服务拓展到了北美 。
          </div>
          <div class="line"></div>
          <div class="item">
            <span class="year">2008</span>
            2006年安徽广德生产基地建设完成，使得我们有能力给华中地区提供环保材料。
          </div>
          <div class="line"></div>
          <div class="item">
            <span class="year">2012</span>
            2012年孟买服务中心设立。
          </div>
        </div>
      </div>
    </div>
    <div class="card-right" :style="'background-image: url('+bg2+');height:300px;'">
      <span class="title1">人类社会发展是一个永远的命题，而发展所带来的风险和<br />污染，皓天人在董事长的带领下，愿意为之付出不懈努力</span>
    </div>
    <div class="title">
      <div class="headline">
        <span class="cn">再次出发</span>
        <span class="en">START AGAIN</span>
        <span class="num">03</span>
      </div>
      <div class="msg" style="margin-bottom: 130px;">
        <span>随着全球经济的发展，和产业结构的变更，在很多发展中国家，<br />环保问题再次延续了中国的问题，而现在我们皓天能经验和能力，帮助我们构建更加好的生活环境<br />2015年，我们在香港建立了我们面向东南亚和世界的总部中心。<br />2018年，我们在深圳建立了新型材料研究中心<br /></span>
      </div>
    </div>
    <div style="height: 350px;width:100%;background:rgb(244,244,244);"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bg1: require('./img/bg3.png'),
      bg2: require('./img/bg4.png')
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  width: 1180px
  padding: 75px 0
  margin: 0 auto
  box-sizing: border-box
  overflow: hidden
  position: relative
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
      width: 310px
      line-height: 30px
    .num
      font-size: 20px
      color: #222222
      opacity: 0.2
      display: block
      line-height: 40px
      position: absolute
      bottom: 130px
  .msg
    text-align: left
    font-size: 16px
    font-weight: 400
    line-height: 35px
    width: 590px
    float: left
.carousel
  width: 100%
  padding: 0 360px
  margin-top: 80px
  box-sizing: border-box
.card-left
  padding: 100px 0
  text-align: left
  display: flex
  justify-content: space-between
  position: relative
  .headline
    height: 200px
    span
      display: block
    .cn
      font-size: 24px
    .en
      font-size: 26px
    .subheading
      margin-top: 30px
      font-size: 16px
      line-height: 30px
      font-weight: 400
    .num
      font-size: 20px
      color: #222222
      opacity: 0.2
      display: block
      line-height: 40px
      position: absolute
      bottom: 100px
  .msg
    width: 600px
    .item
      font-size: 16px
      .year
        font-size:36px
        font-weight:100
        color:rgba(34,34,34,1)
        line-height:45px
        display: block
    .line
      height: 0
      width: 100%
      border-top: 1px dotted rgba(0, 0, 0, 0.3)
      margin: 40px 0
.card-right
  padding: 100px 0
  text-align: center
  display: flex
  justify-content: space-between
  color: #fff
  .title1
    display: flex
    font-size: 30px
    color: #fff
    line-height: 50px
    align-items: center
    margin: 100px
  .headline
    height: 200px
    span
      display: block
    .cn
      font-size: 24px
    .en
      font-size: 26px
    .num
      font-size: 20px
      color: #222222
      opacity: 0.2
      margin-top: 90px
  .msg
    width: 600px
    .item
      font-size: 16px
    .line
      height: 0
      width: 100%
      border-top: 1px dotted rgba(255, 255, 255, 0.3)
      margin: 40px 0
</style>
