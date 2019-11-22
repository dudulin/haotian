<template >
  <div class="">
    <div class="title">
      <div class="headline">
        <span class="cn">用我们的科研力量，塑造更加美好的未来。</span>
        <span class="en">Use our research strength Shape a better future</span>
      </div>
      <div class="msg">
        <span>自2000年我们的R&D团队组建起来，在绍辉博士的带领下已经产出了很多可惜的成绩围绕着我们4个目标，皓天人在继续奋斗。</span>
      </div>
    </div>
    <div class="carousel" >
      <el-carousel indicator-position="outside" type="card" height="390px" autoplay="">
        <el-carousel-item v-for="item in productList" :key="item.id">
          <img :src="item.url" :alt="item.name">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="card-left">
      <div class="headline">
        <span class="cn">高性能</span>
        <span class="en">HIGH PERFORMANCE</span>
        <span class="num">01</span>
      </div>
      <div class="msg">
        <div class="item">
          皓天产出的除尘布和除尘袋能够比同类产品提高20%的除尘效率和过滤面积。
        </div>
        <div class="line"></div>
        <div class="item">
          皓天与世界上具备最前瞻能力的纤维生产厂商合作，加上自己独特的制毡和覆膜浸渍处理，滤材能够在恶劣的环境中保持更高的表现标准。
        </div>
      </div>
    </div>
    <div class="card-right" :style="'background-image: url('+bg1+')'">
      <div style="width: 1180px;margin: 0 auto;display: flex;justify-content: space-between;align-items: center;">
        <div class="msg">
          <div class="item">
            我们的R&D团队不断通过创新，在民生和工业除尘领域贡献了45款专利产品其中包括皓天快洁，氟耐斯，皓洁等耳熟能详的专利产品。
          </div>
          <div class="line"></div>
          <div class="item">
            除尘行业在去除粉尘之外也对粉尘衍生的有害物质的排放有更加严苛的要求，包括二氧化硫，硝酸和二恶英等有害物质，我们的R&D团队，通过在除尘表面添加催化剂等新型工艺，帮助我们的除尘袋能够满足更加严苛的监管要求。
          </div>
        </div>
        <div class="headline">
          <span class="cn">多场景</span>
          <span class="en">MULTI-SCENARIO</span>
          <span class="num">02</span>
        </div>
      </div>
    </div>
    <div class="card-left">
      <div class="headline">
        <span class="cn">自动化</span>
        <span class="en">AUTOMATION</span>
        <span class="num">03</span>
      </div>
      <div class="msg">
        <div class="item">
          从1997年开始，皓天对于制毡技术和缝纫技术不断优化，在现有工人的配备上通过生产设备的自动化改造，平均每年提升了30%的产能。
        </div>
        <div class="line"></div>
        <div class="item">
          皓天人除了在拥抱自动化设备，减少人员成本，同时我们在生产过程中也拥抱了自动化系统，你可以轻松跟踪你的订单从下单，排单，生产，物流等状态，使整个货品从下单到送达无缝对接。
        </div>
      </div>
    </div>
    <div class="card-right" :style="'background-image: url('+bg2+')'">
      <div style="width: 1180px;margin: 0 auto;display: flex;justify-content: space-between;align-items: center;">
        <div class="msg">
          <div class="item">
            皓天致力于给全世界各国提供有效的除尘解决方案。随着污染产业向发展中国家迁移而环保的能力确没有保障，皓天人通过技术创新和产业优化确保提供“全球最低价保障”给所有有需要的客户。
          </div>
          <div class="line"></div>
          <div class="item">
            核心生产能力的建立，帮助皓天形成了一条龙的服务，从除尘器的设计，到除尘布袋的制作，安装，皓天通过打通产业链，形成各产业之间的无缝对接，我们的除尘器和除尘袋一起，将减少你30%的安装和维护成本。
          </div>
        </div>
        <div class="headline">
          <span class="cn">性价比</span>
          <span class="en">VALUE MONEY</span>
          <span class="num">04</span>
        </div>
      </div>
    </div>
    <div style="height: 350px;width:100%;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productList: [
        {
          url: require('./img/pic1.jpg'),
          name: '显微镜'
        },
        {
          url: require('./img/pic2.jpg'),
          name: '纤维'
        },
        {
          url: require('./img/pic1.jpg'),
          name: '显微镜'
        },
        {
          url: require('./img/pic2.jpg'),
          name: '纤维'
        },
        {
          url: require('./img/pic1.jpg'),
          name: '显微镜'
        },
        {
          url: require('./img/pic2.jpg'),
          name: '纤维'
        },
        {
          url: require('./img/pic1.jpg'),
          name: '显微镜'
        },
        {
          url: require('./img/pic2.jpg'),
          name: '纤维'
        },
        {
          url: require('./img/pic1.jpg'),
          name: '显微镜'
        },
        {
          url: require('./img/pic2.jpg'),
          name: '纤维'
        }
      ],
      bg1: require('./img/bg1.png'),
      bg2: require('./img/bg2.png')
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
  .msg
    text-align: left
    font-size: 20px
    font-weight: 400
    line-height: 35px
.carousel
  width: 1180px
  margin: 0 auto
  margin-top: 80px
  box-sizing: border-box
.card-left
  width: 1180px
  padding: 100px 0
  margin: 0 auto
  text-align: left
  display: flex
  justify-content: space-between
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
      border-top: 1px dotted rgba(0, 0, 0, 0.3)
      margin: 40px 0
.card-right
  padding: 100px 0
  text-align: left
  display: flex
  justify-content: space-between
  color: #fff
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
