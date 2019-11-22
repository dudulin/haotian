<template>
  <div id="connectUs">
    <div style="width: 100%;background: RGB(248,248,248);overflow: hidden;">
      <div class="contact">
        <div class="phone">
          <span class="num">400 - 898 - 3781</span>
          <span class="text">全国统一销售热线</span>
        </div>
        <div class="email">
          <span class="num">info@hotian.com</span>
          <span class="text">业务咨询邮箱</span>
        </div>
        <div class="sendEmail" @click="sendEmail">
          发送邮件
        </div>
      </div>
    </div>
    <div class="msg" v-for="type in locationMsg" :key="type.id">
      <p class="title">{{type.type}}</p>
      <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
        <div class="box" v-for="item in type.msg" :key="item.id">
          <div class="card">
            <div class="map">
              <Map :vid="item.vid" :position="item.position" />
            </div>
            <div class="visitingCard">
              <div class="name">{{item.name}}</div>
              <div class="line"></div>
              <span class="phone">电话：{{item.phone}}</span>
              <span class="telautogram">传真：{{item.telautogram}}</span>
              <span class="address">地址：{{item.address}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 350px;width:100%;background:rgb(244,244,244);"></div>
  </div>
</template>

<script>
import Map from './map.vue'

export default {
  data() {
    return {
      locationMsg: [
        {
          type: '业务中心',
          msg: [
            {
              name: '国内内贸部',
              phone: '0576-3661670',
              telautogram: '0761-7889922',
              address: '浙江台州平桥工业区',
              position: [114.119764, 22.531621],
              vid: 'id1'
            },
            {
              name: '深圳研究中心',
              phone: '0576-3661670',
              telautogram: '0761-7889922',
              address: '浙江台州平桥工业区',
              position: [114.119764, 22.531621],
              vid: 'id2'
            },
            {
              name: '深圳研究中心',
              phone: '0576-3661670',
              telautogram: '0761-7889922',
              address: '浙江台州平桥工业区',
              position: [114.119764, 22.531621],
              vid: 'id6'
            }
          ]
        },
        {
          type: '生产基地',
          msg: [
            {
              name: '国内内贸部',
              phone: '0576-3661670',
              telautogram: '0761-7889922',
              address: '浙江台州平桥工业区',
              position: [114.119764, 22.531621],
              vid: 'id3'
            },
            {
              name: '深圳研究中心',
              phone: '0576-3661670',
              telautogram: '0761-7889922',
              address: '浙江台州平桥工业区',
              position: [114.119764, 22.531621],
              vid: 'id4'
            },
          ]
        }
      ]
    }
  },
  methods: {
    sendEmail() {
      parent.location.href = 'mailto:info@hotian.com?subject=test&subject=联系皓天&body='

    }
  },
  components: {
    Map
  }
}
</script>

<style lang="stylus" scoped>
  #connectUs
    .contact
      width: 1200px
      margin: 90px auto 130px
      overflow: hidden
      div
        float: left
      .phone,
      .email
        height: 120px
        background: #fff
        border: 2px solid rgb(234, 234, 234)
        display: flex
        flex-direction: column
        justify-content:center
        box-sizing: border-box
        span
          margin-left: 30px
          text-align: left
        .num
          font-size: 40px
          font-weight: 300
        .text
          font-size: 14px
          font-weight: 300
      .phone
        width: 590px
        margin-right: 20px
      .email
        width: 460px
      .sendEmail
        width: 120px
        height: 120px
        background: RGB(12,128,208)
        line-height: 120px
        font-size: 16px
        color: #fff
        cursor: pointer
    .msg
      width: 1200px
      margin: 0 auto
      text-align: left
      .title
        font-size: 24px
        font-weight: 400
        height: 85px
        line-height: 85px
      .box
        width: 585px
        height: 535px
        border: 2px solid rgb(234, 234, 234)
        margin-bottom: 70px
        .map
          width: 100%
          height: 280px
          background: rgb(234, 234, 234)
        .visitingCard
          width: 100%
          height: 255px
          background: #fff
          div,
          span
            margin-left: 50px
            display: block
            height: 30px
            line-height: 30px
            font-size: 14px
            font-weight: 400
            box-sizing: border-box
          .name
            width: 100%
            height: 90px
            font-size: 18px
            font-weight: 600
            line-height: 90px
          .line
            width: 20px
            height: 2px
            background: rgba(12, 127, 208,1)
          .phone
            margin-top: 30px
</style>
