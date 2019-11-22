<template>
  <div class="">
    <div class="title">
      <div class="headline">
        <span class="cn">发展过程中</span>
        <span class="en">In the process of development</span>
      </div>
      <div class="msg">
        <span>我们不断变革我们的管理和风控模式以适应新的团队规模和提升最终的效能</span>
      </div>
    </div>
    <div class="certificateList">
      <div class="item" v-for="(item, index) in certificateList" :key="item.id">
        <img :src="item.img_s" :alt="item.name" />
        <div class="msg">
          <div class="num">
            0{{index + 1}}
          </div>
          <div class="introduce">
            <p class="name">{{item.name}}</p>
            <p class="authority">发证单位：{{item.authority}}</p>
          </div>
          <div class="operation">
            <el-button class="review" :data-img="[item.img_l]" :data-name="item.name" @click="$imgPreview">查看证书</el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 190px;width:100%;border: 2px solid rgba(237,237,237,1);">

    </div>
    <div style="height: 350px;width:100%;background:rgb(244,244,244);"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      certificateList: [
        {
          name: 'IOS9001质量认证',
          authority: '认证局',
          img_s: require('./img/certificate.png'),
          img_l: require('./img/pic3.jpg')
        },
        {
          name: 'IOS9001质量认证',
          authority: '认证局',
          img_s: require('./img/certificate.png'),
          img_l: require('./img/pic3.jpg')
        },
        {
          name: 'IOS9001质量认证',
          authority: '认证局',
          img_s: require('./img/certificate.png'),
          img_l: require('./img/pic3.jpg')
        },
        {
          name: 'IOS9001质量认证',
          authority: '认证局',
          img_s: require('./img/certificate.png'),
          img_l: require('./img/pic3.jpg')
        },
        {
          name: 'IOS9001质量认证',
          authority: '认证局',
          img_s: require('./img/certificate.png'),
          img_l: require('./img/pic3.jpg')
        },
        {
          name: 'IOS9001质量认证',
          authority: '认证局',
          img_s: require('./img/certificate.png'),
          img_l: require('./img/pic3.jpg')
        },
        {
          name: 'IOS9001质量认证',
          authority: '认证局',
          img_s: require('./img/certificate.png'),
          img_l: require('./img/pic3.jpg')
        },
        {
          name: 'IOS9001质量认证',
          authority: '认证局',
          img_s: require('./img/certificate.png'),
          img_l: require('./img/pic3.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  margin-top: 75px
  width: 100%
  padding: 0 360px
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
    float: left
    width: 400px
.certificateList
  margin-top: 50px
  display: flex
  padding: 0 350px
  flex-wrap: wrap
  justify-content: space-between
  .msg
    width: 100%
    display: flex
    margin: 35px 0
    .num
      width: 90px
      font-size:20px
      font-weight:normal
      color:rgba(34,34,34,1)
      line-height:35px
      opacity:0.2
    .introduce
      flex: 1 auto
      text-align: left
      .name
        font-size: 20px
        font-weight: 500
        line-height: 35px
      .authority
        font-size: 14px
        font-weight: 400
        line-height: 35px
    .operation
      width: 160px
      button
        width: 100%
        height: 50px
        border-radius: 0
</style>
