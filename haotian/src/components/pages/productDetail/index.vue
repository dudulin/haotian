<template>
  <div id="productD">
    <pc-header theme="blue" />
    <div class="banner">
      <div class="title">产品详情</div>
    </div>
    <div class="content">
      <div class="back-list">
        <div class="left">
          <span class="item" v-for="item in backList" :key="item.id">{{item.text}}</span>
        </div>
        <div class="right">
          <el-button class="go">返回列表</el-button>
        </div>
      </div>
      <div class="synopsis">
        <div class="left">
          <div class="title">
            <p class="cn">皓洁PTFE针刺毡</p>
            <p class="en">Haojie PTFE needled felt</p>
          </div>
          <div class="msg">
            PTFE针刺毡是来自于PTFE纤维通过膜裂法拉丝形成的耐高温布袋 <br />
            在除尘和相关领域都有重点的应用场景
          </div>
          <div class="btn-area">
            <el-button class="inquiry">发起一个询价</el-button>
            <el-button class="contact">查看联系方式</el-button>
          </div>
        </div>
        <div class="right">
          <div class="img-box">
            <img src="./img/pic5.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <footer-plus theme="white" />
  </div>
</template>

<script>
import pcHeader from '../../public/header.vue'
import footerPlus from '../../public/footer-plus.vue'

export default {
  data() {
    return {
      backList: [
        {
          text: 'PTFE',
          params: 'PTFE'
        },
        {
          text: 'PPS',
          params: 'PPS'
        },
        {
          text: 'NOMEX',
          params: 'PTFE'
        },
        {
          text: '涤纶',
          params: 'PTFE'
        },
        {
          text: '丙纶',
          params: 'PTFE'
        },
      ]
    }
  },
  components: {
    pcHeader,
    footerPlus
  }
}
</script>

<style lang="stylus" scoped>
#productD
  width: 100%
  min-height: 100%
  position: relative
  .banner
    width: 100%
    height: 400px
    background-image: url('./img/bg1.png')
    overflow: hidden
    .title
      margin-top: 180px
      margin-left: 80px
      font-size: 40px
      text-align: left
      color: #fff
  .content
    width: 1200px
    margin: 0 auto
    .back-list
      width: 100%
      height: 80px
      overflow: hidden
      border-bottom: 1px solid rgba(34,34,34,0.1)
      .left
        float: left
        .item
          font-size: 20px
          font-family: PingFang SC
          font-weight: 400
          color: rgba(0,0,0,1)
          height: 100%
          line-height: 80px
          margin-right: 40px
          cursor: pointer
      .right
        float: right
        display: flex
        height: 100%
        align-items: center
        .go
          background: rgba(36,142,216,1)
          font-size: 14px
          font-family: PingFang SC
          font-weight: 400
          color: rgba(255,255,255,1)
          border-radius: 0
    .synopsis


/style>
